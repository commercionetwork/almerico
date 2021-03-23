# Almerico

![GitHub release](https://img.shields.io/github/release/commercionetwork/almerico?color=green)
![GitHub license](https://img.shields.io/github/license/commercionetwork/almerico?color=blue)
![GitHub top language](https://img.shields.io/github/languages/top/commercionetwork/almerico?color=yellow)

Almerico (tribute to [Almerico from Schio](https://it.wikipedia.org/wiki/Almerico_da_Schio)) is the official Commercio.network explorer.

## Install

In order to properly build the project, first you have to install all of its dependencies. To do so run:

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
    VUE_APP_WS=<YOUR_WS_URL>
    VUE_APP_ANCESTORS=<YOUR_ANCESTORS_LIST>
    VUE_APP_MAIN_TITLE=<YOUR_APP_TITLE>
    ```

    E.g.:

    ```env
    VUE_APP_LCD=http://lcd.com
    VUE_APP_WS=ws://rpc.com/websocket
    VUE_APP_ANCESTORS= [{"lcd_ledger":"http://lcd.com", "lcd": "http://lcd.com", "ver": "0.12"}]
    VUE_APP_MAIN_TITLE=Testnet
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
VUE_APP_WS=<YOUR_WS_URL>
VUE_APP_ANCESTORS= <YOUR_ANCESTORS_LIST>
VUE_APP_MAIN_TITLE=<YOUR_APP_TITLE>
```
  
E.g.:

```env
VUE_APP_LCD=https://lcd.com
VUE_APP_WS=wss://rpc.com/websocket
VUE_APP_ANCESTORS= [{"lcd_ledger":"https://lcd.com", "lcd": "https://lcd.com", "ver": "0.12"}]
VUE_APP_MAIN_TITLE=Mainnet
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
  --build-arg WS_URL=<WebSocket URL> \
  --build-arg ANCESTORS_LIST=<Ancestors list> \
  --build-arg MAIN_TITLE=<App title> \
  .
```

### Use the Docker image

```shell
docker run --name almerico --rm almerico
```

## Customize the explorer

To customize the configuration edit the `config.json` file which is in the `/src/config` folder.

## Customize the Vue.js CLI configuration

In order to properly customize the Vue.js CLI configuration please refer to the [official configuration page](https://cli.vuejs.org/config/).
