# Almerico

![GitHub](https://img.shields.io/github/license/commercionetwork/almerico.svg)
![GitHub top language](https://img.shields.io/github/languages/top/Commercionetwork/almerico.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Commercionetwork/Almerico.svg)
![Travis (.org)](https://img.shields.io/travis/Commercionetwork/Almerico.svg)


Almerico (tribute to [Almerico from Schio](https://it.wikipedia.org/wiki/Almerico_da_Schio)) is the official \
Commercio.network explorer.


## Building
### 1. Install dependencies
In order to properly build the project, first you have to download all of its dependencies. To do so, please run

```bash
npm install
``` 

### 2. Setup environments variables
Inside the `.env` file assign the proper values to the written variables:

```
VUE_APP_LCD=<YOUR_LCD_ULR>
VUE_APP_RPC=<YOUR_RPC_URL>
VUE_APP_WS=<YOUR_WS_URL>
```
  
Example
```
VUE_APP_LCD=https://lcd.n01c01p1f2.commercio.network
VUE_APP_RPC=https://rpc.n01c01p1f2.commercio.network
VUE_APP_WS=ws://rpc.n01c01p1f2.commercio.network
```

### 3. Run
#### Development
In order to run the project, simply execute the `npm run serve` command.  
This will start a local web server and publish a web page to http://localhost:8080. 

#### Production
In order to build the project run `npm run build`.  
This will create a `dist` folder that you can serve using your favourite method. 


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
docker build -t almerico .
```

## Use the Docker image
```shell
docker run --rm -d --name almerico \
  -e VUE_APP_LCD=<LCD_URL> \
  -e VUE_APP_RPC=<VUE_APP_RPC > \
  almerico
```

## Customize the Vue.js CLI configuration
In order to properly customize the Vue.js CLI configuration please refer to 
the [official configuration page](https://cli.vuejs.org/config/).
