FROM node:lts

# Read the set variables
ARG LCD_URL
ARG RPC_URL
ARG WS_URL

# Copy all arguments into the environment variables
ENV VUE_APP_LCD ${LCD_URL}
ENV VUE_APP_RPC ${RPC_URL}
ENV VUE_APP_WS ${WS_URL}
ENV VUE_APP_ANCESTORS ${ANCESTORS_LIST}

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
