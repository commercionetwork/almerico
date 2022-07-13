VARS=("ALMERICO_DEVNET_ANCESTORS_LIST" "ALMERICO_DEVNET_API_VERSION" "ALMERICO_DEVNET_BACKEND" "ALMERICO_DEVNET_BACKEND_API_VERSION" "ALMERICO_DEVNET_BACKEND_WS" "ALMERICO_DEVNET_BLOCKS_MONITOR" "ALMERICO_DEVNET_FIRST_CONVERSION_RATE" "ALMERICO_DEVNET_FIRST_HEIGHT" "ALMERICO_DEVNET_LCD_URL" "ALMERICO_DEVNET_MAIN_TITLE" "ALMERICO_DEVNET_MINTER_ACCOUNT" "ALMERICO_DEVNET_SPREADSHEET_ACCOUNTS" "ALMERICO_DEVNET_WS_URL" "ALMERICO_MAINNET_ANCESTORS_LIST" "ALMERICO_MAINNET_API_VERSION" "ALMERICO_MAINNET_BACKEND" "ALMERICO_MAINNET_BACKEND_API_VERSION" "ALMERICO_MAINNET_BACKEND_WS" "ALMERICO_MAINNET_BLOCKS_MONITOR" "ALMERICO_MAINNET_FIRST_CONVERSION_RATE" "ALMERICO_MAINNET_FIRST_HEIGHT" "ALMERICO_MAINNET_LCD_URL" "ALMERICO_MAINNET_MAIN_TITLE" "ALMERICO_MAINNET_MINTER_ACCOUNT" "ALMERICO_MAINNET_SPREADSHEET_ACCOUNTS" "ALMERICO_MAINNET_WS_URL" "ALMERICO_TESTNET_ANCESTORS_LIST" "ALMERICO_TESTNET_API_VERSION" "ALMERICO_TESTNET_BACKEND" "ALMERICO_TESTNET_BACKEND_API_VERSION" "ALMERICO_TESTNET_BACKEND_WS" "ALMERICO_TESTNET_BLOCKS_MONITOR" "ALMERICO_TESTNET_FIRST_CONVERSION_RATE" "ALMERICO_TESTNET_FIRST_HEIGHT" "ALMERICO_TESTNET_LCD_URL" "ALMERICO_TESTNET_MAIN_TITLE" "ALMERICO_TESTNET_MINTER_ACCOUNT" "ALMERICO_TESTNET_SPREADSHEET_ACCOUNTS" "ALMERICO_TESTNET_WS_URL")

echo "Variables control in progress..."
for variable in "${VARS[@]}"; do
    if ! [[ -v $variable ]]; then
        echo "Undefined $variable" 1>&2
        exit 1
    fi
done
echo "Completed variables control"