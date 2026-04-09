# syntax=docker/dockerfile:1.7

############################
# Stage 1 — build
############################
FROM node:24-alpine AS build

WORKDIR /app

# Build-time configuration forwarded from CI / --build-arg
ARG ANCESTORS_LIST
ARG API_VERSION
ARG API_VERSION_COSMWASM
ARG BACKEND
ARG BACKEND_WS
ARG CONNECTIONS
ARG CONTRACT_DEX
ARG FIRST_CONVERSION_RATE
ARG FIRST_HEIGHT
ARG HAS_POOLS
ARG LCD_URL
ARG MAIN_TITLE
ARG WASM_CW20_CODE_ID
ARG WASM_SWAP_CODE_ID
ARG WS_URL

ENV VUE_APP_ANCESTORS=${ANCESTORS_LIST} \
    VUE_APP_API_VERSION=${API_VERSION} \
    VUE_APP_API_VERSION_COSMWASM=${API_VERSION_COSMWASM} \
    VUE_APP_BACKEND=${BACKEND} \
    VUE_APP_BACKEND_WS=${BACKEND_WS} \
    VUE_APP_CONNECTIONS=${CONNECTIONS} \
    VUE_APP_CONTRACT_DEX=${CONTRACT_DEX} \
    VUE_APP_FIRST_CONVERSION_RATE=${FIRST_CONVERSION_RATE} \
    VUE_APP_FIRST_HEIGHT=${FIRST_HEIGHT} \
    VUE_APP_HAS_POOLS=${HAS_POOLS} \
    VUE_APP_LCD=${LCD_URL} \
    VUE_APP_MAIN_TITLE=${MAIN_TITLE} \
    VUE_APP_WASM_CW20_CODE_ID=${WASM_CW20_CODE_ID} \
    VUE_APP_WASM_SWAP_CODE_ID=${WASM_SWAP_CODE_ID} \
    VUE_APP_WS=${WS_URL}

# Install deps from lockfile (reproducible, cache-friendly)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

RUN npm run build

############################
# Stage 2 — runtime
############################
FROM node:24-alpine

ARG APP_VERSION=0.0.0

LABEL org.opencontainers.image.title="almerico" \
      org.opencontainers.image.description="Almerico Explorer — Commercio.network blockchain explorer" \
      org.opencontainers.image.version="${APP_VERSION}" \
      org.opencontainers.image.source="https://github.com/commercionetwork/almerico"

# Static file server + non-root user
RUN npm install -g serve@14 \
    && npm cache clean --force \
    && addgroup -S nodejs -g 1001 \
    && adduser  -S nodejs -G nodejs -u 1001

WORKDIR /app

COPY --from=build --chown=nodejs:nodejs /app/dist ./dist

USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:5000/ || exit 1

CMD ["serve", "--single", "-p", "5000", "dist"]
