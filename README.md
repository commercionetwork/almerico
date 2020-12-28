# Almerico

Almerico (tribute to [Almerico from Schio](https://it.wikipedia.org/wiki/Almerico_da_Schio)) is the official Commercio.network explorer.

## Install

In order to properly build the project, first you have to download all of its dependencies. To do so run:

```shell
npm install
```

## Project setup

### Development

In order to run this project as a developer with the hot reload option enabled you have to:

1. Create a file named `.env.development.local` inside the project root folder;
2. Inside the `.env.development.local` file add the following data:

    ```env
    VUE_APP_LCD=<YOUR_LCD_ULR>
    VUE_APP_RPC=<YOUR_RPC_URL>
    VUE_APP_WS=<YOUR_WS_URL>
    ```

    E.g.:

    ```env
    VUE_APP_LCD=http://lcd.com
    VUE_APP_RPC=http://rpc.com
    VUE_APP_WS=ws://rpc.com
    ```

#### Compiles and hot-reloads for development

To execute the explorer run:

```shell
npm run serve
```

This will start a local web server and publish a web page to <http://localhost:8080>

### Production

Create a file named `.env.production` inside the project root folder and set the following data with your values:

```env
VUE_APP_LCD=<YOUR_LCD_ULR>
VUE_APP_RPC=<YOUR_RPC_URL>
VUE_APP_WS=<YOUR_WS_URL>
```
  
E.g.:

```env
VUE_APP_LCD=https://lcd.com
VUE_APP_RPC=https://rpc.com
VUE_APP_WS=wss://rpc.com
```

#### Compiles and minifies for production

To build the project run:

```shell
npm run build
```

### Run your unit tests

To test the code base run:

```shell
npm run test
```

### Lints and fixes files

```shell
npm run lint
```

## Docker

### Build the Docker image

```shell
docker build -t almerico \
  --build-arg LCD_URL=<LCD URL> \
  --build-arg RPC_URL=<RPC URL> \
  --build-arg WS_URL=<WebSocket URL> \
  .
```

### Use the Docker image

```shell
docker run --name almerico --rm almerico
```

## Customize the Vue.js CLI configuration

In order to properly customize the Vue.js CLI configuration please refer to the [official configuration page](https://cli.vuejs.org/config/).
