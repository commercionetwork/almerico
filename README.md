# Almerico

![GitHub release](https://img.shields.io/github/release/commercionetwork/almerico.svg)
![GitHub](https://img.shields.io/github/license/commercionetwork/almerico.svg)
![GitHub top language](https://img.shields.io/github/languages/top/Commercionetwork/almerico.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Commercionetwork/Almerico.svg)
![Travis (.org)](https://img.shields.io/travis/Commercionetwork/Almerico.svg)

Almerico (tribute to [Almerico from Schio](https://it.wikipedia.org/wiki/Almerico_da_Schio)) is the official Commercio.network explorer.

## Install

In order to properly build the project, first you have to download all of its dependencies. To do so run:

```shell
npm install
```

## Development setup

In order to run this project as a developer with the hot reload option enabled you have to:

**1.** Create a file named `.env.development.local` inside the project root folder.

**2.** Inside the `.env.development.local` file add the following data:

```js
VUE_APP_LCD=<YOUR_LCD_ULR>
VUE_APP_RPC=<YOUR_RPC_URL>
VUE_APP_WS=<YOUR_WS_URL>
VUE_APP_API_VERSION=<Sdk Api version>
```

The supported API versions are:

* 0.36
* 0.38
  
E.g.:

```js
VUE_APP_LCD=https://lcd.com
VUE_APP_RPC=https://rpc.com
VUE_APP_WS=ws://rpc.com
VUE_APP_API_VERSION=0.38
```

### Running

To execute the explorer run:

```shell
npm run serve
```  

This will start a local web server and publish a web page to <http://localhost:8080.>

## Production setup

**1.** Create a file named `.env.production` inside the project root folder.

**2.** Inside the `.env.production` file add the following data:

```js
VUE_APP_LCD=<YOUR_LCD_ULR>
VUE_APP_RPC=<YOUR_RPC_URL>
VUE_APP_WS=<YOUR_WS_URL>
VUE_APP_API_VERSION=<Sdk Api version>
```

The supported API versions are:

* 0.36
* 0.38
  
E.g.:

```js
VUE_APP_LCD=https://lcd.com
VUE_APP_RPC=https://rpc.com
VUE_APP_WS=ws://rpc.com
VUE_APP_API_VERSION=0.38
```

### Building

To build the project run:

```shell
npm run build
```

## Testing

To test the code base run:

```shell
npm run test
```

## Docker

### Build the Docker image

```shell
docker build -t almerico \
  --build-arg LCD_URL=<LCD URL> \
  --build-arg RPC_URL=<RPC URL> \
  --build-arg WS_URL=<WebSocket URL> \
  --build-arg API_VERSION=<Sdk Api version> \
  .
```

### Use the Docker image

```shell
docker run --name almerico --rm almerico
```

## Customize the explorer

### Theme

To customize the theme edit the `theme.json` file which is in the `/src/config` folder; the dark theme can be enabled by setting the property `theme_light` to `false`.

### Configuration

To customize the configuration edit the `config.json` file which is in the `/src/config` folder; logo, coins, address prefixes and sections to be displayed can be customized. Custom transactions are also supported.

#### Customize transactions

To support a custom transaction, first create a new Vue component inside the `/src/views/transactions/msgs` folder. Then update the `config.json` file changing the `supported_types` key, located inside the `transactions` key; add to the array a new object that must have 3 keys:

* `name`, for the name of the previously added Vue component;
* `tag`, for the search string of this kind of transaction;
* `type`, for the custom transaction type.

## Customize the Vue.js CLI configuration

In order to properly customize the Vue.js CLI configuration please refer to 
the [official configuration page](https://cli.vuejs.org/config/).
