FROM node:12.4.0

# Read the set variables
ARG vue_app_lcd
ARG vue_app_rpc
ARG vue_app_ws

# Copy all arguments into the environment variables
ENV VUE_APP_LCD ${vue_app_lcd}
ENV VUE_APP_RPC_LOGIN ${vue_app_rpc}
ENV VUE_APP_WS ${vue_app_ws}

# Set unsafe perm in order to avoid npm errors
RUN npm config set unsafe-perm true

# Install static server
RUN npm install -g serve

# Create a 'tmp' folder for the build and make it the current working directory
WORKDIR /app/tmp

# Copy only the package.json to take advantage of cached Docker layers
COPY package.json .

# Install project dependencies
RUN npm install

# Copy project files and folders to the working directory
COPY . .

# build for production with minification
RUN npm run build

# Make the 'app' folder the current working directory
WORKDIR /app

# Clean up (i.e. extract 'dist' folder and remove everything else)
RUN mv tmp/dist dist && rm -fr tmp

# Start the server
CMD [ "serve", "--single", "dist" ]
