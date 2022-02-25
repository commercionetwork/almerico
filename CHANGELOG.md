# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.4]

## [3.0.3] - 2022.02.25

### Changed

- Move the star button to bookmark a validator inside the list
  on the left of the moniker

### Fixed

- Fix missing reset offset on refreshing transactions dashboard

## [3.0.2] - 2022.02.24

### Fixed

- Fix fetch membership

## [3.0.1] - 2022.02.24

### Removed

- Remove from Travis configuration the build of image tagged `mainnet-v3`  

## [3.0.0] - 2022.02.23

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
