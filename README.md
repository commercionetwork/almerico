# Almerico

![GitHub release](https://img.shields.io/github/release/commercionetwork/almerico?color=brightgreen&style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/commercionetwork/almerico?color=orange&style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/commercionetwork/almerico?color=yellow&style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/commercionetwork/almerico?color=blue&style=for-the-badge)

Almerico (tribute to [Almerico from Schio](https://it.wikipedia.org/wiki/Almerico_da_Schio))
is the official Commercio.network explorer.

## Install

In order to properly build the project, first you have to install all of its dependencies.
To do so run:

```shell
npm install
```

## Project setup

### Development

In order to run this project as a developer with the hot reload option enabled,
you have to:

1. Create a file named `.env.development.local` inside the project root folder;
2. Inside the `.env.development.local` file add the following data:

    ```env
    VUE_APP_ANCESTORS=VALUE (e.g., [{"lcd_ledger":"http://lcd.com", "lcd": "http://lcd.com", "ver": "0.12"}])
    VUE_APP_API_VERSION=VALUE (e.g., v1)
    VUE_APP_BLOCKS_MONITOR=VALUE (e.g., true)
    VUE_APP_FIRST_CONVERSION_RATE=VALUE (e.g., 1)
    VUE_APP_FIRST_HEIGHT=VALUE (e.g., 1234)
    VUE_APP_LCD=VALUE (e.g., http://lcd.com)
    VUE_APP_MAIN_TITLE=VALUE (e.g., Testnet)
    VUE_APP_MINTER_ACCOUNT=VALUE (e.g., did:com:1lhk7zyhvzn07zw48ydyh6fq0unwnv64xguvtlk)
    VUE_APP_SPREADSHEET_ACCOUNTS=VALUE (e.g., [{},{}.{}])
    VUE_APP_WS=VALUE (e.g., ws://rpc.com/websocket)
    ```

#### Compiles and hot-reloads for development

To execute the explorer run:

```shell
npm run serve
```

This will start a local web server and publish a web page to <http://localhost:8080>

### Production

Create a file named `.env.production` inside the project root folder
and set the following data with your values:

```env
VUE_APP_ANCESTORS=VALUE (e.g., [{"lcd_ledger":"https://lcd.com", "lcd": "https://lcd.com", "ver": "0.12"}])
VUE_APP_API_VERSION=VALUE (e.g., v1)
VUE_APP_BLOCKS_MONITOR=VALUE (e.g., false)
VUE_APP_FIRST_CONVERSION_RATE=VALUE (e.g., 1)
VUE_APP_FIRST_HEIGHT=VALUE (e.g., 1)
VUE_APP_LCD=VALUE (e.g., https://lcd.com)
VUE_APP_MAIN_TITLE=VALUE (e.g., Mainnet)
VUE_APP_MINTER_ACCOUNT=VALUE (e.g., did:com:1lhk7zyhvzn07zw48ydyh6fq0unwnv64xguvtlk)
VUE_APP_SPREADSHEET_ACCOUNTS=VALUE (e.g., [{"name":"community","address":"did:com:"},{"name":"liquidityPool","address":"did:com:"},{"name":"validator","address":"did:com:"}])
VUE_APP_WS=VALUE (e.g., wss://rpc.com/websocket)
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
  --build-arg ANCESTORS_LIST=<Ancestors list> \
  --build-arg API_VERSION=<API version> \
  --build-arg BLOCKS_MONITOR=<Boolean> \
  --build-arg FIRST_CONVERSION_RATE=<First conversion rate> \
  --build-arg FIRST_HEIGHT=<First height> \
  --build-arg LCD_URL=<LCD URL> \
  --build-arg MAIN_TITLE=<App title> \
  --build-arg MINTER_ACCOUNT=<Minter account address> \
  --build-arg SPREADSHEET_ACCOUNTS=<Spreadsheet accounts list> \
  --build-arg WS_URL=<WebSocket URL> \
  .
```

### Use the Docker image

```shell
docker run --name almerico --rm almerico
```

## Customize the explorer

To customize the configuration edit the `config.json` file
which is in the `/src/config` folder.

## Customize the Vue.js CLI configuration

In order to properly customize the Vue.js CLI configuration
please refer to the [official configuration page](https://cli.vuejs.org/config/).
