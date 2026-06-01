/* global __dirname */

const { execFile, spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const expoBinary = path.resolve(__dirname, '../node_modules/.bin/expo');
const expoArguments = ['start', ...process.argv.slice(2)];
const defaultAndroidSdkRoot =
  process.env.ANDROID_SDK_ROOT ||
  process.env.ANDROID_HOME ||
  path.join(process.env.HOME ?? '', 'Library/Android/sdk');
const androidSdkPathEntries = [
  path.join(defaultAndroidSdkRoot, 'emulator'),
  path.join(defaultAndroidSdkRoot, 'platform-tools'),
].filter((entry) => fs.existsSync(entry));
const expoEnvironment = {
  ...process.env,
  ANDROID_HOME: process.env.ANDROID_HOME ?? defaultAndroidSdkRoot,
  ANDROID_SDK_ROOT: defaultAndroidSdkRoot,
  PATH: [...androidSdkPathEntries, process.env.PATH ?? ''].join(path.delimiter),
  REACT_NATIVE_PACKAGER_HOSTNAME:
    process.env.REACT_NATIVE_PACKAGER_HOSTNAME ?? '127.0.0.1',
};
const isMac = process.platform === 'darwin';
const metroLogPath = path.resolve(__dirname, '../.expo/dev/logs/start.log');

const runExpo = () => {
  const expoProcess = spawn(expoBinary, expoArguments, {
    env: expoEnvironment,
    stdio: 'inherit',
  });

  if (!isMac) {
    expoProcess.on('exit', (code) => {
      process.exit(code ?? 0);
    });

    return;
  }

  let metroLogPosition = fs.existsSync(metroLogPath)
    ? fs.statSync(metroLogPath).size
    : 0;
  let metroPort = 8081;
  let pendingMetroLogContent = '';
  let isReopeningIosSimulator = false;
  const bundlingPlatforms = new Map();

  const reopenRunningIosSimulator = () => {
    if (isReopeningIosSimulator) {
      return;
    }

    isReopeningIosSimulator = true;

    execFile(
      'xcrun',
      ['simctl', 'spawn', 'booted', 'launchctl', 'list'],
      (_listError, stdout) => {
        if (!stdout.includes('UIKitApplication:host.exp.Exponent')) {
          isReopeningIosSimulator = false;
          return;
        }

        execFile(
          'xcrun',
          ['simctl', 'terminate', 'booted', 'host.exp.Exponent'],
          () => {
            // Expo Go iOS does not stay connected to Metro's reload socket.
            setTimeout(() => {
              execFile(
                'xcrun',
                ['simctl', 'openurl', 'booted', `exp://127.0.0.1:${metroPort}`],
                () => {
                  isReopeningIosSimulator = false;
                },
              );
            }, 1500);
          },
        );
      },
    );
  };

  const readMetroEvents = () => {
    if (!fs.existsSync(metroLogPath)) {
      return;
    }

    const metroLogSize = fs.statSync(metroLogPath).size;

    if (metroLogSize < metroLogPosition) {
      metroLogPosition = 0;
      pendingMetroLogContent = '';
    }

    if (metroLogSize === metroLogPosition) {
      return;
    }

    const newLogContent = fs
      .readFileSync(metroLogPath, 'utf8')
      .slice(metroLogPosition);

    metroLogPosition = metroLogSize;

    const lines = `${pendingMetroLogContent}${newLogContent}`.split('\n');
    pendingMetroLogContent = lines.pop() ?? '';

    lines.filter(Boolean).forEach((line) => {
      let event;

      try {
        event = JSON.parse(line);
      } catch {
        return;
      }

      if (event._e === 'metro:instantiate') {
        metroPort = event.port;
      }

      if (event._e === 'metro:bundling:started') {
        bundlingPlatforms.set(event.id, event.platform);
      }

      if (event._e === 'metro:bundling:done') {
        const platform = bundlingPlatforms.get(event.id);
        bundlingPlatforms.delete(event.id);

        if (platform === 'android') {
          reopenRunningIosSimulator();
        }
      }
    });
  };

  fs.watchFile(metroLogPath, { interval: 250 }, readMetroEvents);

  expoProcess.on('exit', (code) => {
    fs.unwatchFile(metroLogPath, readMetroEvents);
    process.exit(code ?? 0);
  });

  process.on('SIGINT', () => {
    fs.unwatchFile(metroLogPath, readMetroEvents);
    expoProcess.kill('SIGINT');
  });
};

runExpo();
