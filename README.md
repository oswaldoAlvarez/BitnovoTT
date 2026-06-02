# BitnovoTT

Aplicación móvil Expo + React Native para crear solicitudes de pago FIAT en
testnet, compartir el enlace o QR y mostrar la confirmación en tiempo real
mediante websocket.

https://github.com/user-attachments/assets/09622bf3-3e3b-4579-966e-e46e24c9a2e3

https://github.com/user-attachments/assets/a7a48bb6-22dd-4327-b822-aeccaed04565

https://github.com/user-attachments/assets/1cba38ac-035a-42e3-b86d-eccdbd9b1910

https://github.com/user-attachments/assets/f346f58b-7ea4-4bac-a94c-fe324a291eae

## Stack

- Expo SDK 55 y Expo Router
- React Native 0.83 y TypeScript
- Redux Toolkit para la moneda elegida y la orden de pago activa
- React Query para `POST /orders`
- NativeWind para estilos
- Jest, React Native Testing Library, ESLint y Husky

## Arquitectura

```text
app/                         # rutas finas de Expo Router
src/
  core/                      # providers, store y devtools
  features/                  # casos de uso por flujo
  shared/                    # UI reutilizable, API, config, utils y theme
assets/                      # assets estáticos
```

Las rutas de `app/` solo renderizan pantallas de features. Los componentes
compartidos se extraen cuando existe reutilización real y la lógica con side
effects se mueve a hooks.

## Requisitos

- Node.js 22
- npm
- Expo Go instalado en el dispositivo físico
- Android Studio para emulador Android, opcional
- Xcode para simulador iOS, opcional y solo disponible en macOS

## Configuración

1. Instala dependencias:

```bash
npm install
```

2. Crea el archivo local `.env` desde el ejemplo:

```bash
cp .env.example .env
```

3. Completa las variables:

```env
EXPO_PUBLIC_BITNOVO_API_BASE_URL=https://payments.pre-bnvo.com/api/v1
EXPO_PUBLIC_BITNOVO_DEVICE_ID=replace-with-your-device-id
```

El identificador de dispositivo se envía en `X-Device-Id` y Bitnovo lo entrega
por correo para la prueba. Las variables `EXPO_PUBLIC_*` quedan visibles en el
bundle del cliente: no guardes secretos, tokens privados ni credenciales ahí.

`.env.example` sí debe versionarse porque documenta las variables necesarias
sin exponer valores locales.

## Iniciar Con Expo Go

1. Conecta el ordenador y el teléfono a la misma red Wi-Fi.
2. Ejecuta Metro:

```bash
npm start
```

3. Abre Expo Go en el teléfono.
4. Escanea el QR mostrado por Metro.

Desde la terminal de Metro también puedes usar:

- `a` para abrir Android
- `i` para abrir iOS
- `r` para recargar

## Compatibilidad NativeWind

`npm install` ejecuta `scripts/fix-nativewind-metro.js`. NativeWind 4 usa
`react-native-css-interop`, cuya notificación interna de cambios no coincide con
el formato esperado por la versión actual de Metro. El script adapta esa
notificación después de instalar dependencias y evita que Metro se cierre al
editar estilos.

`npm start` ejecuta `scripts/start-expo.js`. Este wrapper agrega Android SDK al
`PATH`, fuerza el host local IPv4 y reabre Expo Go en el simulador iOS después
de un bundle Android para mantener operativo el reload conjunto en el entorno
local de desarrollo.

## Scripts

```bash
npm start
npm run android
npm run ios
npm run lint
npm run typecheck
npm test
npm run doctor
npm run quality
```

`npm run quality` ejecuta lint, typecheck, tests y Expo Doctor. Husky lo ejecuta
antes de crear commits.

## APK Local

Genera un release instalable en Android:

```bash
cd android
./gradlew assembleRelease
```

El APK nativo queda en:

```text
android/app/build/outputs/apk/release/app-release.apk
```

Para compartir una copia local de prueba usamos:

```text
output/bitnovo-release.apk
```

`output/` y los APK están ignorados por Git para evitar versionar binarios.

## Flujo Implementado

1. Crear una orden FIAT con importe, concepto y moneda mediante `POST /orders`.
2. Compartir `web_url` por copia, QR, correo, WhatsApp u otras aplicaciones.
3. Escuchar `wss://payments.pre-bnvo.com/ws/merchant/<identifier>`.
4. Navegar automáticamente a pago recibido cuando llega un estado completado.
