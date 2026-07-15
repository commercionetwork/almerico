# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Entries for versions prior to `4.0.0` have been moved to
[CHANGELOG-archive.md](CHANGELOG-archive.md).

## [4.17.0] - 2026-07-15

### Added

- Render the dedicated sharedoc message detail, including document hash
  verification, on `/transactions/sharedoc/[HASH]/uuid/[UUID]` also for
  transactions retrieved from archive nodes running Cosmos SDK `0.45`;
  previously the generic message component was shown

### Changed

- Bump `axios` from `~1.17.0` to `~1.18.0` and update patch-level
  dependencies

## [4.16.1] - 2026-06-11

### Changed

- Read the node's lowest available block height from the Tendermint RPC
  `/status` endpoint (`sync_info.earliest_block_height`) instead of probing
  the LCD and parsing its error message. This requires the new `VUE_APP_RPC`
  environment variable pointing at the node's RPC. `VUE_APP_FIRST_HEIGHT` is
  removed: when the RPC is unreachable the explorer now surfaces an error,
  with no fallback

## [4.16.0] - 2026-06-09

### Changed

- Auto-detect the node's lowest available block height instead of relying
  on `VUE_APP_FIRST_HEIGHT`. On startup the explorer probes the node and,
  on a pruning node, reads the lowest height it reports; the env variable
  is now an optional fallback used only when the node does not provide it.
  This keeps the blocks list and search bounds aligned with the node as it
  prunes, without manual reconfiguration

### Fixed

- Keep the transaction-detail fallback chain going when an intermediate
  node returns an error the browser cannot read (e.g. a CORS-blocked or
  otherwise response-less failure). The lookup previously aborted on the
  first such error and showed it even when a later ancestor still held
  the transaction. It now tries every configured ancestor in order and
  surfaces an error only when all of them fail, restoring `v0.38`
  transaction lookups when the `v0.45` archive sits earlier in the chain

## [4.15.0] - 2026-06-08

### Added

- Fall back to a dedicated archive node running the current Cosmos SDK
  (`v0.45`) when fetching a transaction detail. The lookup now queries
  the live LCD first, then the archive node, and finally the legacy
  `v0.38` ancestor, all driven by the existing `VUE_APP_ANCESTORS`
  list. List the archive node (`"ver": "0.45"`) before older ancestors,
  as the array is queried in order

## [4.14.1] - 2026-05-05

### Changed

- Update log format

## [4.14.0] - 2026-05-04

### Changed

- Switch the runtime stage of the Docker image from `node:24-alpine`
  + `serve` to `nginxinc/nginx-unprivileged:1.27-alpine`. nginx is
  purpose-built for serving static assets and the resulting image
  is ~74 MB instead of ~200 MB, runs as the non-root `nginx` user
  (uid 101) with `pid` and temp paths under `/tmp`, and removes
  Node.js from the runtime surface entirely
- Add `nginx.conf` with SPA fallback (`try_files $uri $uri/
  /index.html`) so Vue Router handles deep links, long-lived
  `Cache-Control: public, immutable` for hashed assets under
  `/js`, `/css`, `/img`, `/fonts`, `Cache-Control: no-store` on
  `index.html` so clients always pick up the latest bundle hashes
  after a deploy, and gzip on the usual text/JS/CSS MIME types
- Reorder `Dockerfile` so the `ARG`/`ENV` block sits after
  `npm ci`. Vue CLI inlines `VUE_APP_*` into the JS bundle at
  build time so they cannot be deferred to the runtime stage, but
  placing them after the install layer means changing any
  build-arg now invalidates only `npm run build`, not the
  dependency install layer
- Bump `axios` from `~1.15.0` to `~1.16.0`
- Move pre-`4.0.0` changelog entries to `CHANGELOG-archive.md` to
  keep the active changelog focused on the current major line. The
  archive preserves the full historical record (45 entries
  spanning 2021–2022) and is linked from the `CHANGELOG.md` intro

## [4.13.7] - 2026-04-22

### Changed

- Update dependencies

## [4.13.6] - 2026-04-21

### Fixed

- Fix vulnerability upgrading dependencies

## [4.13.5] - 2026-04-14

### Changed

- Bump `chart.js` from `~3.9.0` to `~4.5.0` (resolved to `4.5.1`). The
  codebase only consumes Chart.js through the thin
  `src/components/chart/helpers/chartBuilder.js` wrapper that imports
  `chart.js/auto`; none of the v4 breaking changes apply (no
  `scales[id].grid.drawBorder`/`borderColor`/`borderWidth`, no `time`
  scale using `time.stepSize`, no `fontColor` fallback, no custom
  plugin relying on the removed `destroy` hook), so the upgrade is a
  pure version bump for all chart helpers
- Bump `uuid` from `~11.1.0` to `~13.0.0`. Only the `v4` export is
  used and Node 24 already runs in CI/Docker, so the v12 drop of
  Node 16 and v13 browser-default exports are both satisfied
- Convert `src/__mocks__/chart-mock.js` and
  `src/__mocks__/overview-mock.js` to ESM `import { v4 as uuidv4 } from
  'uuid'`. `uuid` v12+ removed its CommonJS build, so the previous
  `require('uuid')` would throw at test load
- Extend `jest.config.js` `transformIgnorePatterns` to also transpile
  `chart.js` and `uuid` out of `node_modules`, since both packages now
  ship as ESM-only and Jest 27 cannot parse them otherwise
- Remove unused imports (`TRANSFER`, `bech32`, `TRANSACTIONS`,
  `mockPagination`) from
  `src/store/assets/ibc/__tests__/actions.test.js` and
  `src/store/transactions/__tests__/actions.test.js` to clear the
  `no-unused-vars` lint warnings

### Fixed

- Polyfill `global.crypto` from Node's `webcrypto` in `tests/setup.js`.
  `uuid` v13 ships only the browser rng, which reads a bare `crypto`
  identifier; the jsdom bundled with Jest 27 does not expose Web
  Crypto globally, so without this polyfill every test suite
  transitively importing `uuid` (via `BaseFormTextField` /
  `BaseFormNumberField` registered in `tests/setup.js`) fails at
  runtime with `crypto.getRandomValues() not supported`

## [4.13.4] - 2026-04-13

### Changed

- Bump `@cosmjs/stargate` and `@cosmjs/cosmwasm-stargate` from `~0.33.0`
  to `~0.34.0` (resolved to `0.34.1`). This is the last cosmjs release
  that still ships `Tendermint34Client`, required to talk to the
  Commercio mainnet RPC (Cosmos SDK `v0.45.16` / Tendermint 0.34), and
  the last one that keeps `cosmjs-types` on `^0.9.0`, so
  `src/utils/msg-builder.js` is unaffected. The `0.38` line was
  evaluated and rejected because it removes `Tendermint34Client`
  entirely, which would break the Keplr sign-and-broadcast flow against
  Commercio

### Fixed

- Polyfill `TextEncoder` / `TextDecoder` on `global` in `tests/setup.js`.
  `@cosmjs/crypto` 0.34 pulls in `@noble/hashes`, which constructs a
  `TextEncoder` at module load time; the jsdom bundled with Jest 27
  does not expose it globally, so every test suite that transitively
  imports `@cosmjs/*` failed to load before this fix

## [4.13.3] - 2026-04-09

### Changed

- Bump the reusable build-and-test workflow from Node 20 to Node 24 to
  match the runtime shipped by the Dockerfile
- Bump all GitHub Actions to versions that declare Node 24 as their
  default runtime, silencing the Node 20 deprecation annotations:
  `actions/checkout@v6`, `actions/setup-node@v6`,
  `docker/setup-buildx-action@v4`, `docker/login-action@v4`,
  `docker/build-push-action@v7`

## [4.13.2] - 2026-04-09

### Added

- Add multi-stage Dockerfile based on `node:24-alpine`, producing a much
  smaller runtime image that only ships the built SPA and a static file
  server, running as a non-root user with OCI-compliant labels and a
  BusyBox-compatible healthcheck
- Add `.dockerignore` to shrink the Docker build context
- Forward `APP_VERSION` from `package.json` to the Docker image labels in
  the Mainnet, Testnet and Devnet CI workflows

### Changed

- Upgrade axios to `~1.15.0` and core-js to `~3.49.0`

### Fixed

- Fix the `__WEBPACK_DEFAULT_EXPORT__ is not defined` error thrown by
  webpack 5 against the raw ESM sources shipped by axios `>=1.8` under
  the `browser` > `default` export condition, by aliasing axios to its
  prebuilt CJS browser bundle in `vue.config.js`

## [4.13.1] - 2025-09-24

### Changed

- Update account transaction filter labels to accurately describe that they include
  all transactions with transfer events, not just native tokens

## [4.13.0] - 2025-09-23

### Added

- Add CW20 transaction types to account dashboard

## [4.12.7] - 2025-09-15

### Fixed

- Fix vulnerability upgrading dependencies

## [4.12.6] - 2025-02-06

### Fixed

- Fix vulnerability upgrading dependencies

## [4.12.5] - 2024-09-26

### Fixed

- Fix vulnerability upgrading dependencies

## [4.12.4] - 2024-08-26

### Fixed

- Fix vulnerability upgrading dependencies

## [4.12.3] - 2024-07-01

### Chnaged

- Update format of Dockerfile

## [4.12.2] - 2024-07-01

### Fixed

- Fix vulnerability upgrading dependencies

## [4.12.1] - 2024-05-21

### Added

- Add missed blocks counter to validator detail

## [4.12.0] - 2024-05-06

### Changed

- Update to 20 the Node.js version of Docker file

## [4.11.6] - 2024-04-23

### Changed

- Update withdraw IBC transfer

## [4.11.5] - 2024-04-23

### Fixed

- Fix withdraw IBC transfer

## [4.11.4] - 2024-04-09

### Fixed

- Fix MsgTransfer transaction template

## [4.11.3] - 2024-04-08

### Fixed

- Fix IBC transfer transaction building

## [4.11.2] - 2024-04-04

### Changed

- Get connections data from API

## [develop] 4.11.1 - 2024-04-02

### Added

- Add suggest chains to IBC transfer

## [develop] 4.11.0 - 2024-03-29

### Added

- Add assets IBC transfer

## [4.10.11] - 2024-03-05

### Added

- Add manage button to delegations list of validators page

### Fixed

- Fix loading data for statistics page

## [4.10.10] - 2024-03-05

### Fixed

- Fix loading data for account page

## [4.10.9] - 2024-03-05

### Changed

- Update the layout of delegations list

## [4.10.8] - 2024-03-05

### Added

- Add unbonding txs to delegations list of validators page

## [4.10.7] - 2024-03-04

### Changed

- Update the exchange rate value

## [4.10.6] - 2024-02-08

### Changed

- Update the text content of DEX page

## [4.10.5] - 2024-01-16

### Fixed

- Fix Github Actions config to stop the deploy if an env variable is not set

## [4.10.4] 2024-01-15

### Fixed

- Fix checking of DEX contract env variable

## [4.10.3] 2024-01-12

### Changed

- Update the layout of DEX page

## [develop] 4.10.2 - 2024-01-11

### Changed

- Update the behavior of DEX page

## [develop] 4.10.1 - 2024-01-10

### Changed

- Simplify the DEX page

## [develop] 4.10.0 - 2023-12-21

### Added

- Add GitHub Actions configuration
- Add new DEX page
- Add env variable to enable Pools pages

### Changed

- Filter assets list to remove unwanted items
- Rename the old DEX pages to Pools pages

### Removed

- Delete Travis configuration

## [develop] 4.9.0 - 2023-12-15

### Added

- Add DEX list page
- Add DEX detail page
- Add DEX swap functionality

## [4.8.13] 2023-11-16

### Changed

- Update dependencies

## [4.8.12] 2023-11-13

### Fixed

- Fix dependency vulnerabilities

## [4.8.11] 2023-10-11

### Changed

- Update global search bar to accept a contract address

## [4.8.10] 2023-10-10

### Added

- Add minting CW20 tokens
- Add updating logo of CW20 tokens

### Fixed

- Fix configuration of Keplr suggest chain to new requirements

## [4.8.9] 2023-10-06

### Fixed

- Fix the action to create a new CW20 token

## [4.8.8] 2023-10-06

### Fixed

- Fix the action to create a new CW20 token

## [4.8.7] 2023-10-05

### Changed

- Change the landing route after CW20 transfer

## [4.8.6] 2023-10-04

### Changed

- Replace modal to transfer CW20 tokens with a page

## [4.8.5] 2023-10-03

### Added

- Add modal to send CW20 tokens

## [4.8.4] 2023-09-29

### Added

- Add marketing dialog reset on opening
- Add store and view tests

## [alfa] 4.8.3 - 2023-09-28

### Added

- Add assets section:
  - CW20 create.

## [alfa] 4.8.2 - 2023-09-22

### Added

- Add assets section:
  - CW20 management.

## [alfa] 4.8.1 - 2023-09-22

### Added

- Add assets section:
  - CW20 detail.

## [alfa] 4.8.0 - 2023-09-21

### Added

- Add assets section:
  - CW20 list.

## [4.7.0] - 2023-08-01

### Added

- Add maintenance page

## [4.6.3] - 2023-07-06

### Changed

- Update drawer:

  - Localization selector;
  - Opening icon.

### Fixed

- Fix chart of proposal detail page

## [4.6.2] - 2023-06-07

### Fixed

- Update LCDs detection

## [4.6.1] - 2023-05-10

### Fixed

- Fix the execution of a transaction using a Ledger

## [4.6.0] - 2023-05-09

### Changed

- Update the account page to show both received and sent transactions

## [4.5.3] - 2023-02-09

### Changed

- Update Kepler config

### Fixed

- Fix account txs sorting

## [4.5.2] - 2023-02-07

### Added

- Subscribe to events of backend websocket

### Changed

- Always enable the block monitor

## [4.5.1] - 2023-01-26

### Added

- Add template to support `MsgWithdrawValidatorCommission` tx message

### Changed

- Switch to v2 of the backend APIs

## [4.5.0] - 2022-12-20

### Added

- Implement file hash verification in sharedoc transactions

## [4.4.1] - 2022-12-05

### Changed

- Update parameter to search a tx to create a validator

### Fixed

- Fix txs list sorting by date

## [4.4.0] - 2022-11-29

### Changed

- Update to support chain v4.2.0

## [4.3.5] - 2022-11-29

### Changed

- Update values of statistics constants

## [4.3.4] - 2022-11-28

### Changed

- Update statistics page

## [4.3.3] - 2022-11-22

### Changed

- Update txs filter

### Fixed

- Fix account all balances page
- Fix proposals list order

## [4.3.2] - 2022-10-19

### Changed

- Update modal to manage tokens

## [4.3.1] - 2022-10-14

### Changed

- Update modal to redelagate tokens

## [4.3.0] - 2022-10-14

### Added

- Add transaction execution functions in the chain using Keplr:  
  1. Delegating tokens
  2. Undelegating tokens
  3. Redelegating tokens
  4. Claim tokens
  5. Voting on proposals
- Add local wallet update when changed by Keplr
- Add proposal stats

### Changed

- Update value of voting transactions filter

## [4.2.3] - 2022-09-21

### Changed

- Replace backend endpoints deprecated

## [4.2.2] - 2022-09-21

### Added

- Add translations

## [4.2.1] - 2022-09-15

### Fixed

- Fix accounts statistics

## [4.2.0] - 2022-09-14

### Added

- Add statistics route

## [4.1.3] - 2022-09-13

### Added

- Add social media links

### Changed

- Update component to switch theme

## [4.1.2] - 2022-09-01

### Fixed

- Fix the display of CW20 tokens using the value of their decimals.

## [4.1.1] - 2022-09-01

### Changed

- Update the display of CW20 tokens using the value of their decimals.

## [4.1.0] - 2022-09-01

### Added

- Add wallet connection by Keplr

### Fixed

- Fix the display of CW20 tokens

## [alfa] - 4.0.2 - 2022-08-29

### Fixed

- Fix proposals chart title

## [alfa] - 4.0.1 - 2022-07-29

### Changed

- Improve proposals list filter

## [4.0.0] - 2022-07-29

### Added

- Add account balance page to show CW20 token

### Changed

- Replace legacy endpoints
- Replace governance endpoints with backend endpoints
- Update value to enable searching of `MsgExecuteContract` txs

### Fixed

- Fix reactivity of account dashboard

[4.17.0]: https://github.com/commercionetwork/almerico/compare/v4.16.1...v4.17.0
[4.16.1]: https://github.com/commercionetwork/almerico/compare/v4.16.0...v4.16.1
[4.16.0]: https://github.com/commercionetwork/almerico/compare/v4.15.0...v4.16.0
[4.15.0]: https://github.com/commercionetwork/almerico/compare/v4.14.1...v4.15.0
[4.14.1]: https://github.com/commercionetwork/almerico/compare/v4.13.7...v4.14.1
[4.14.0]: https://github.com/commercionetwork/almerico/compare/v4.13.7...v4.14.0
[4.13.7]: https://github.com/commercionetwork/almerico/compare/v4.13.6...v4.13.7
[4.13.6]: https://github.com/commercionetwork/almerico/compare/v4.13.5...v4.13.6
[4.13.5]: https://github.com/commercionetwork/almerico/compare/v4.13.4...v4.13.5
[4.13.4]: https://github.com/commercionetwork/almerico/compare/v4.13.3...v4.13.4
[4.13.3]: https://github.com/commercionetwork/almerico/compare/v4.13.2...v4.13.3
[4.13.2]: https://github.com/commercionetwork/almerico/compare/v4.13.1...v4.13.2
[4.13.1]: https://github.com/commercionetwork/almerico/compare/v4.13.0...v4.13.1
[4.13.0]: https://github.com/commercionetwork/almerico/compare/v4.12.7...v4.13.0
[4.12.7]: https://github.com/commercionetwork/almerico/compare/v4.12.6...v4.12.7
[4.12.6]: https://github.com/commercionetwork/almerico/compare/v4.12.5...v4.12.6
[4.12.5]: https://github.com/commercionetwork/almerico/compare/v4.12.4...v4.12.5
[4.12.4]: https://github.com/commercionetwork/almerico/compare/v4.12.3...v4.12.4
[4.12.3]: https://github.com/commercionetwork/almerico/compare/v4.12.2...v4.12.3
[4.12.2]: https://github.com/commercionetwork/almerico/compare/v4.12.1...v4.12.2
[4.12.1]: https://github.com/commercionetwork/almerico/compare/v4.12.0...v4.12.1
[4.12.0]: https://github.com/commercionetwork/almerico/compare/v4.11.6...v4.12.0
[4.11.6]: https://github.com/commercionetwork/almerico/compare/v4.11.5...v4.11.6
[4.11.5]: https://github.com/commercionetwork/almerico/compare/v4.11.4...v4.11.5
[4.11.4]: https://github.com/commercionetwork/almerico/compare/v4.11.3...v4.11.4
[4.11.3]: https://github.com/commercionetwork/almerico/compare/v4.11.2...v4.11.3
[4.11.2]: https://github.com/commercionetwork/almerico/compare/v4.10.11...v4.11.2
[4.10.11]: https://github.com/commercionetwork/almerico/compare/v4.10.10...v4.10.11
[4.10.10]: https://github.com/commercionetwork/almerico/compare/v4.10.9...v4.10.10
[4.10.9]: https://github.com/commercionetwork/almerico/compare/v4.10.8...v4.10.9
[4.10.8]: https://github.com/commercionetwork/almerico/compare/v4.10.7...v4.10.8
[4.10.7]: https://github.com/commercionetwork/almerico/compare/v4.10.6...v4.10.7
[4.10.6]: https://github.com/commercionetwork/almerico/compare/v4.10.5...v4.10.6
[4.10.5]: https://github.com/commercionetwork/almerico/compare/v4.10.4...v4.10.5
[4.10.4]: https://github.com/commercionetwork/almerico/compare/v4.10.3...v4.10.4
[4.10.3]: https://github.com/commercionetwork/almerico/compare/v4.8.13...v4.10.3
[4.8.13]: https://github.com/commercionetwork/almerico/compare/v4.8.12...v4.8.13
[4.8.12]: https://github.com/commercionetwork/almerico/compare/v4.8.11...v4.8.12
[4.8.11]: https://github.com/commercionetwork/almerico/compare/v4.8.10...v4.8.11
[4.8.10]: https://github.com/commercionetwork/almerico/compare/v4.8.9...v4.8.10
[4.8.9]: https://github.com/commercionetwork/almerico/compare/v4.8.8...v4.8.9
[4.8.8]: https://github.com/commercionetwork/almerico/compare/v4.8.7...v4.8.8
[4.8.7]: https://github.com/commercionetwork/almerico/compare/v4.8.6...v4.8.7
[4.8.6]: https://github.com/commercionetwork/almerico/compare/v4.8.5...v4.8.6
[4.8.5]: https://github.com/commercionetwork/almerico/compare/v4.8.4...v4.8.5
[4.8.4]: https://github.com/commercionetwork/almerico/compare/v4.7.0...v4.8.4
[4.7.0]: https://github.com/commercionetwork/almerico/compare/v4.6.3...v4.7.0
[4.6.3]: https://github.com/commercionetwork/almerico/compare/v4.6.2...v4.6.3
[4.6.2]: https://github.com/commercionetwork/almerico/compare/v4.6.1...v4.6.2
[4.6.1]: https://github.com/commercionetwork/almerico/compare/v4.6.0...v4.6.1
[4.6.0]: https://github.com/commercionetwork/almerico/compare/v4.5.3...v4.6.0
[4.5.3]: https://github.com/commercionetwork/almerico/compare/v4.5.2...v4.5.3
[4.5.2]: https://github.com/commercionetwork/almerico/compare/v4.5.1...v4.5.2
[4.5.1]: https://github.com/commercionetwork/almerico/compare/v4.5.0...v4.5.1
[4.5.0]: https://github.com/commercionetwork/almerico/compare/v4.4.1...v4.5.0
[4.4.1]: https://github.com/commercionetwork/almerico/compare/v4.4.0...v4.4.1
[4.4.0]: https://github.com/commercionetwork/almerico/compare/v4.3.5...v4.4.0
[4.3.5]: https://github.com/commercionetwork/almerico/compare/v4.3.4...v4.3.5
[4.3.4]: https://github.com/commercionetwork/almerico/compare/v4.3.3...v4.3.4
[4.3.3]: https://github.com/commercionetwork/almerico/compare/v4.3.2...v4.3.3
[4.3.2]: https://github.com/commercionetwork/almerico/compare/v4.3.1...v4.3.2
[4.3.1]: https://github.com/commercionetwork/almerico/compare/v4.3.0...v4.3.1
[4.3.0]: https://github.com/commercionetwork/almerico/compare/v4.2.3...v4.3.0
[4.2.3]: https://github.com/commercionetwork/almerico/compare/v4.2.2...v4.2.3
[4.2.2]: https://github.com/commercionetwork/almerico/compare/v4.2.1...v4.2.2
[4.2.1]: https://github.com/commercionetwork/almerico/compare/v4.2.0...v4.2.1
[4.2.0]: https://github.com/commercionetwork/almerico/compare/v4.1.3...v4.2.0
[4.1.3]: https://github.com/commercionetwork/almerico/compare/v4.1.2...v4.1.3
[4.1.2]: https://github.com/commercionetwork/almerico/compare/v4.1.1...v4.1.2
[4.1.1]: https://github.com/commercionetwork/almerico/compare/v4.1.0...v4.1.1
[4.1.0]: https://github.com/commercionetwork/almerico/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/commercionetwork/almerico/compare/v3.3.1...v4.0.0
