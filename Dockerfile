FROM node:16-slim

# Read the set variables
ARG ANCESTORS_LIST
ARG API_VERSION
ARG API_VERSION_COSMWASM
ARG BACKEND
ARG BACKEND_API_VERSION
ARG BACKEND_WS
ARG BLOCKS_MONITOR
ARG FIRST_CONVERSION_RATE
ARG FIRST_HEIGHT
ARG LCD_URL
ARG MAIN_TITLE
ARG WASM_CW20_CODE_ID
ARG WS_URL

# Copy all arguments into the environment variables
ENV VUE_APP_ANCESTORS ${ANCESTORS_LIST}
ENV VUE_APP_API_VERSION ${API_VERSION}
ENV VUE_APP_API_VERSION_COSMWASM ${API_VERSION_COSMWASM}
ENV VUE_APP_BACKEND ${BACKEND}
ENV VUE_APP_BACKEND_API_VERSION ${BACKEND_API_VERSION}
ENV VUE_APP_BACKEND_WS ${BACKEND_WS}
ENV VUE_APP_BLOCKS_MONITOR ${BLOCKS_MONITOR}
ENV VUE_APP_FIRST_CONVERSION_RATE ${FIRST_CONVERSION_RATE}
ENV VUE_APP_FIRST_HEIGHT ${FIRST_HEIGHT}
ENV VUE_APP_LCD ${LCD_URL}
ENV VUE_APP_MAIN_TITLE ${MAIN_TITLE}
ENV VUE_APP_WASM_CW20_CODE_ID ${WASM_CW20_CODE_ID}
ENV VUE_APP_WS ${WS_URL}

# Set unsafe perm in order to avoid npm errors
RUN npm config set unsafe-perm true

# Install static server
RUN npm install -g serve

# Create a 'tmp' folder for the build and make it the current working directory
WORKDIR /app/tmp

# Copy only the package.json to take advantage of cached Docker layers
COPY package.json .

# Install project dependencies
RUN npm install -s --no-audit --no-fund

# Copy project files and folders to the working directory
COPY . .

# build for production with minification
RUN npm run build

# Make the 'app' folder the current working directory
WORKDIR /app

# Clean up (i.e. extract 'dist' folder and remove everything else)
RUN mv tmp/dist dist && rm -fr tmp

# Start the server
CMD [ "serve", "--single", "-p", "5000", "dist" ]
