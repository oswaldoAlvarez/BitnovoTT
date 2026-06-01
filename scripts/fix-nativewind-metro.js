const fs = require('node:fs');
const path = require('node:path');

const rootDirExpression = 'process.cwd()';

const oldTsSnippet = `        haste.emit("change", {
          eventsQueue: [
            {
              filePath,
              metadata: {
                modifiedTime: Date.now(),
                size: 1, // Can be anything
                type: "virtual", // Can be anything
              },
              type: "change",
            },
          ],
        });`;

const newTsSnippet = `        const canonicalPath = path
          .relative(${rootDirExpression}, filePath)
          .split(path.sep)
          .join("/");

        haste.emit("change", {
          changes: {
            addedFiles: new Map(),
            modifiedFiles: new Map([
              [
                canonicalPath,
                {
                  isSymlink: false,
                  modifiedTime: Date.now(),
                },
              ],
            ]),
            removedFiles: new Map(),
          },
          logger: null,
          rootDir: ${rootDirExpression},
        });`;

const oldJsSnippet = `            haste.emit("change", {
                eventsQueue: [
                    {
                        filePath,
                        metadata: {
                            modifiedTime: Date.now(),
                            size: 1,
                            type: "virtual",
                        },
                        type: "change",
                    },
                ],
            });`;

const newJsSnippet = `            const canonicalPath = path_1.default
                .relative(${rootDirExpression}, filePath)
                .split(path_1.default.sep)
                .join("/");
            haste.emit("change", {
                changes: {
                    addedFiles: new Map(),
                    modifiedFiles: new Map([
                        [
                            canonicalPath,
                            {
                                isSymlink: false,
                                modifiedTime: Date.now(),
                            },
                        ],
                    ]),
                    removedFiles: new Map(),
                },
                logger: null,
                rootDir: ${rootDirExpression},
            });`;

const patchFile = (relativePath, oldSnippet, newSnippet) => {
  const filePath = path.resolve(__dirname, '..', relativePath);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');

  if (fileContent.includes(newSnippet)) {
    return;
  }

  if (!fileContent.includes(oldSnippet)) {
    throw new Error(`No se encontro el bloque esperado en ${relativePath}`);
  }

  fs.writeFileSync(filePath, fileContent.replace(oldSnippet, newSnippet));
};

patchFile(
  'node_modules/react-native-css-interop/src/metro/index.ts',
  oldTsSnippet,
  newTsSnippet,
);

patchFile(
  'node_modules/react-native-css-interop/dist/metro/index.js',
  oldJsSnippet,
  newJsSnippet,
);

console.log('Applied NativeWind Metro compatibility fix.');
