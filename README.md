# Commerc.io Explorer

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
Add to the project'S root a file named ".env.development.local" to set the following environment variables:
* VUE_APP_LCD=VALUE (e.g.: https://lcd.n01c01p1f2.commercio.network)
* VUE_APP_RPC=VALUE (e.g.: https://rpc.n01c01p1f2.commercio.network)

WARNING: do not use these variables in the ".env" file because they will be set during compilation

Finally run:
npm run serve
```

### Compiles and minifies for production
```
Run the following commands, without quotes, from the command line for each variable:
* "set VARIABLE_NAME=VALUE" for "Windows" environment
* "export VARIABLE_NAME=VALUE" for "Linux" environment

Available variables:
* VUE_APP_LCD=VALUE (e.g.: https://lcd-mainnet.commercio.network)
* VUE_APP_RPC=VALUE (e.g.: https://rpc-mainnet.commercio.network)

Finally run:
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
