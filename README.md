# Almerico

![GitHub](https://img.shields.io/github/license/commercionetwork/almerico.svg)
![GitHub top language](https://img.shields.io/github/languages/top/Commercionetwork/almerico.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Commercionetwork/Almerico.svg)
![Travis (.org)](https://img.shields.io/travis/Commercionetwork/Almerico.svg)


Almerico (tribute to [Almerico from Schio](https://it.wikipedia.org/wiki/Almerico_da_Schio)) is the official \
Commercio.network explorer.


## Building
In order to properly build the project, first you have to download all of its dependencies. To do so, please run

```bash
npm install
``` 

### Development
In order to run this project as a developer with the hot reload option enabled you have to: 

#### Setup
**1.** Create a file named `.env.development.local` inside the project root folder.
 
**2.** Inside the `.env.development.local` file write the following data:
```
VUE_APP_LCD=<YOUR_LCD_ULR>
VUE_APP_RPC=<YOUR_RPC_URL>
VUE_APP_WS=<YOUR_WS_URL>
```
  
Example

```
VUE_APP_LCD=https://lcd.com
VUE_APP_RPC=https://rpc.com
VUE_APP_WS=ws://rpc.com
```

#### Running
In order to run the project, simply execute the `npm serve` command.  
This will start a local web server and publish a web page to http://localhost:8080. 

### Production
#### Setup
**1.** Create a file named `.env.production` inside the project root folder.
 
**2.** Inside the `.env.production` file write the following data:
```
VUE_APP_LCD=<YOUR_LCD_ULR>
VUE_APP_RPC=<YOUR_RPC_URL>
VUE_APP_WS=<YOUR_WS_URL>
```
  
Example

```
VUE_APP_LCD=https://lcd.com
VUE_APP_RPC=https://rpc.com
VUE_APP_WS=ws://rpc.com
```

#### Building
In order tto build the project run `npm build`.

## Performing link checks and fixes 
In order to perform a lint check on all your files and fix any problem, you can run the following command.

```
npm run lint
```

## Testing
To test the code base, you can run
```
npm run test
```

## Using Docker
### Build the Docker image
```shell
docker build -t almerico --build-arg vue_app_lcd=<VUE_APP_LCD> --build-arg vue_app_rpc=<VUE_APP_RPC> --build-arg vue_app_ws=<VUE_APP_WS> .
```

## Use the Docker image
```shell
docker run --name almerico --rm almerico 
```

## Customize the Vue.js CLI configuration
In order to properly customize the Vue.js CLI configuration please refer to 
the [official configuration page](https://cli.vuejs.org/config/).
