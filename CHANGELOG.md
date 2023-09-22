# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.8.1] - 2023-09-22

### Added

- Add assets section:
  - CW20 detail.

## [develop] 4.8.0 - 2023-09-21

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

## [3.3.1] - 2022-07-13

### Changed

- Update errors management of account view

## [3.3.0] - 2022-06-22

### Added

- Add countdown to future block

### Changed

- Improve Update data from backend only when required
- Update version of Nodejs in `Dockerfile`

## [alfa] - 3.2.1 - 2022-06-16

### Added

- Add chart backend endpoint
- Add overview backend endpoint

## Chnaged

- Update fetch validators data from backend
- Update backend event

## [alfa] - 3.2.0 - 2022-06-08

### Added

- Add fetch validators data from backend endpoints
- Add subscribe to backend events

## [3.1.6] - 2022-05-12

### Added

- Add max lead time to fetch validator/s logo

## [3.1.5] - 2022-05-06

### Added

- Add support for many types of proposals

### Changed

- Update proposals chart

## [3.1.4] - 2022-04-20

### Fixed

- Fix `MsgEditValidator` transaction component

### Changed

- Improve `MsgCreateValidator` transaction component

## [3.1.3] - 2022-04-14

### Added

- Add validator logo on list view

### Changed

- Update validator logo on detail view

## [3.1.2] - 2022-04-13

### Fixed

- Fix crash of token charts

## [3.1.1] - 2022-04-12

### Fixed

- Fix component to display an unjail's transaction message

## [3.1.0] - 2022-04-12

### Added

- Add new governace module
- Add validator logo on detail view
- Add animation to the change of route
- Add new transaction components:
  - MsgExecuteContract;
  - MsgInstantiateContract;
  - MsgStoreCode;
  - MsgSubmitProposal;
  - MsgVote.

### Changed

- Replace icons installation
- Align style of actions and getters imports
- Rename components
- Update routes to use props

### Fixed

- Fix the missing UUID in the Sharedoc detail

## [3.0.11] - 2022-03-29

### Changed

- Move icons import to Vuetify plugin setup

## [3.0.10] - 2022-03-25

### Fixed

- Browser hang on Windows OS, rif. [https://github.com/Templarian/MaterialDesign-Webfont/issues/84](https://github.com/Templarian/MaterialDesign-Webfont/issues/84)

## [3.0.9] - 2022-03-23

### Changed

- Update Vue CLI dependencies

## [3.0.8] - 2022-03-22

### Changed

- Update style of block monitor

## [3.0.7] - 2022-03-21

### Added

- Add style change during data update to block monitor

## [3.0.6] - 2022-03-07

### Changed

- Update copyright
- [#110](https://github.com/commercionetwork/almerico/issues/110)
  Filter validator delegator amounts box to show only amounts over 0

## [3.0.5] - 2022-03-04

### Added

- Add `emits` option to components
- Add `item per page` to `delegator amounts` table of validator detail view

### Changed

- Filter account delegations box to show only amounts over 0
- Update Block's monitor layout

### Fixed

- Fix [List of validators doesn't show the percentage of validated blocks](https://github.com/commercionetwork/almerico/issues/104)

## [3.0.4] - 2022-03-01

### Changed

- Update the code to follow the naming convention of Vue.js

## [3.0.3] - 2022-02-25

### Changed

- Move the star button to bookmark a validator inside the list
  on the left of the moniker

### Fixed

- Fix missing reset offset on refreshing transactions dashboard

## [3.0.2] - 2022-02-24

### Fixed

- Fix fetch membership

## [3.0.1] - 2022-02-24

### Removed

- Remove from Travis configuration the build of image tagged `mainnet-v3`  

## [3.0.0] - 2022-02-23

### Added

- Add the italian localization
- Add the feature to save a custom list of validators
- Add new exchange rate overview
- Add the route to show the detail of a sharedoc transaction

### Changed

- Update the layout of all views
- Update to the new Cosmos REST API
- Improve the page load time
- Improve transaction search
- Improve error management

### Removed

- Remove configuration file
- Remove old exchange rate overview

### Fixed

- Fix account page that displays transactions not related to the account

## [2.2.21] - 2022-01-13

### Changed

- Update method to fetch dashboard transactions
- Update dashboard error management

## [2.2.20] - 2021-10-11

### Changed

- Update validators utilities
- Update transactions utilities
- Update blocks utilities

## [2.2.19] - 2021-10-07

### Added

- Add chart helpers

### Changed

- Replace doughnut with pie chart

## [2.2.18] - 2021-10-06

### Fixed

- Fix calculation of tokens graph values

## [2.2.17] - 2021-10-04

### Changed

- Upgrade `Chart.js` library to v3
- Update all charts
- Change text content

### Removed

- Uninstall `vue-chartjs` library

## [2.2.16] - 2021-09-17

### Added

- Add blocks bar to exchange rate page

### Changed

- Improve tokens exchange rate helper
- Improve tokens chart helper

## [2.2.15] - 2021-09-15

### Added

- Exchange rate page

### Changed

- Update dashboard chart

## [2.2.14] - 2021-07-30

### Changed

- Update error message if account not exist

## [2.2.13] - 2021-06-10

### Fixed

- Update stored data when websocket emit many tx events in the same block

## [2.2.12] - 2021-06-09

### Changed

- Amounts format of dashborad and overview pages

## [2.2.11] - 2021-06-04

### Fixed

- Txs list rendering when a tx has no fee

## [2.2.10] - 2021-05-21

### Fixed

- Rewards amount of account page

## [2.2.9] - 2021-05-19

### Added

- Add new page "Token Exchange Rate"
- Add link from account details to buy membership tx

## [2.2.8] - 2021-04-30

### Added

- Add CCC value to dashboard

## [2.2.7] - 2021-04-30

### Fixed

- Dashboard pool chart
- Toggle theme

## [2.2.6] - 2021-04-23

### Changed

- Account view
- Chain selector
- Persistence of selected theme

## [2.2.5] - 2021-04-13

### Added

- Dashboard price chart
- Support to `MsgSetCCCConversionRate` & `MsgSetCCCFreezePeriod` txs

### Changed

- Top body layout
- Websocket events

### Fixed

- Readme guide

## [2.2.4] - 2021-03-30

### Changed
  
- Coins rendering
- Dashboard data

## [2.2.3] - 2021-03-26

### Changed

- Function to fetch tx from ancestors
- Displaying the account details page error
- Displaying the validator details page error
- Add env variable to toggle the missing blocks monitor
- Coins rendering

### Fixed

- Account infinite scroll

## [2.2.2] - 2021-03-25

### Fixed

- Pipeline config

## [2.2.1] - 2021-03-25

### Changed

- GUI style
- Coins rendering

### Fixed

- Display values of the validator tokens
- Display values of the account tokens
- Fetch validators list on new transatin
- Rendering of `MsgShareDocument` message template
- Chian chooser addresses

## [2.2.0] - 2021-03-23

### Added

- Completely redesign GUI
- Improv application responsiveness
- Add infinite scroll to the list of transactions and blocks
- Add RFC cross chain navigation
- Add a switch to selcet a dark theme from navigation drawer

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
[3.3.1]: https://github.com/commercionetwork/almerico/compare/v3.3.0...v3.3.1
[3.3.0]: https://github.com/commercionetwork/almerico/compare/v3.1.6...v3.3.0
[3.1.6]: https://github.com/commercionetwork/almerico/compare/v3.1.5...v3.1.6
[3.1.5]: https://github.com/commercionetwork/almerico/compare/v3.1.4...v3.1.5
[3.1.4]: https://github.com/commercionetwork/almerico/compare/v3.1.3...v3.1.4
[3.1.3]: https://github.com/commercionetwork/almerico/compare/v3.1.2...v3.1.3
[3.1.2]: https://github.com/commercionetwork/almerico/compare/v3.1.1...v3.1.2
[3.1.1]: https://github.com/commercionetwork/almerico/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/commercionetwork/almerico/compare/v3.0.11...v3.1.0
[3.0.11]: https://github.com/commercionetwork/almerico/compare/v3.0.10...v3.0.11
[3.0.10]: https://github.com/commercionetwork/almerico/compare/v3.0.9...v3.0.10
[3.0.9]: https://github.com/commercionetwork/almerico/compare/v3.0.8...v3.0.9
[3.0.8]: https://github.com/commercionetwork/almerico/compare/v3.0.7...v3.0.8
[3.0.7]: https://github.com/commercionetwork/almerico/compare/v3.0.6...v3.0.7
[3.0.6]: https://github.com/commercionetwork/almerico/compare/v3.0.5...v3.0.6
[3.0.5]: https://github.com/commercionetwork/almerico/compare/v3.0.4...v3.0.5
[3.0.4]: https://github.com/commercionetwork/almerico/compare/v3.0.3...v3.0.4
[3.0.3]: https://github.com/commercionetwork/almerico/compare/v3.0.2...v3.0.3
[3.0.2]: https://github.com/commercionetwork/almerico/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/commercionetwork/almerico/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/commercionetwork/almerico/compare/v2.2.21...v3.0.0
[2.2.21]: https://github.com/commercionetwork/almerico/compare/v2.2.20...v2.2.21
[2.2.20]: https://github.com/commercionetwork/almerico/compare/v2.2.19...v2.2.20
[2.2.19]: https://github.com/commercionetwork/almerico/compare/v2.2.18...v2.2.19
[2.2.18]: https://github.com/commercionetwork/almerico/compare/v2.2.17...v2.2.18
[2.2.17]: https://github.com/commercionetwork/almerico/compare/v2.2.16...v2.2.17
[2.2.16]: https://github.com/commercionetwork/almerico/compare/v2.2.15...v2.2.16
[2.2.15]: https://github.com/commercionetwork/almerico/compare/v2.2.14...v2.2.15
[2.2.14]: https://github.com/commercionetwork/almerico/compare/v2.2.13...v2.2.14
[2.2.13]: https://github.com/commercionetwork/almerico/compare/v2.2.12...v2.2.13
[2.2.12]: https://github.com/commercionetwork/almerico/compare/v2.2.11...v2.2.12
[2.2.11]: https://github.com/commercionetwork/almerico/compare/v2.2.10...v2.2.11
[2.2.10]: https://github.com/commercionetwork/almerico/compare/v2.2.9...v2.2.10
[2.2.9]: https://github.com/commercionetwork/almerico/compare/v2.2.8...v2.2.9
[2.2.8]: https://github.com/commercionetwork/almerico/compare/v2.2.7...v2.2.8
[2.2.7]: https://github.com/commercionetwork/almerico/compare/v2.2.6...v2.2.7
[2.2.6]: https://github.com/commercionetwork/almerico/compare/v2.2.5...v2.2.6
[2.2.5]: https://github.com/commercionetwork/almerico/compare/v2.2.4...v2.2.5
[2.2.4]: https://github.com/commercionetwork/almerico/compare/v2.2.3...v2.2.4
[2.2.3]: https://github.com/commercionetwork/almerico/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/commercionetwork/almerico/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/commercionetwork/almerico/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/commercionetwork/almerico/compare/v0.0.4...v2.2.0
