const BROWSER_STORAGE_KEYS = Object.freeze({
  LOCALE: 'almerico-locale',
  THEME: 'almerico-dark-theme',
  VALIDATORS: 'almerico-my-validators',
});

const COPYRIGHT = 'Commercio.network SpA';

const FIRST_CONVERSION_RATE =
  process.env.VUE_APP_FIRST_CONVERSION_RATE !== undefined
    ? process.env.VUE_APP_FIRST_CONVERSION_RATE
    : '1';

const FIRST_HEIGHT =
  process.env.VUE_APP_FIRST_HEIGHT !== undefined
    ? process.env.VUE_APP_FIRST_HEIGHT
    : '1';

const HAS_POOLS =
  process.env.VUE_APP_HAS_POOLS && process.env.VUE_APP_HAS_POOLS === 'true';

const LEGACY_VERSIONS = Object.freeze({
  V_038: '0.38',
});

const BECH32_HRP = Object.freeze({
  COMMERCIO: 'did:com:',
  OSMOSIS: 'osmo',
  REBUS: 'rebus',
});

const PREFIXES = Object.freeze({
  ACCOUNT: {
    ADDRESS: BECH32_HRP.COMMERCIO,
    KEY: `${BECH32_HRP.COMMERCIO}pub`,
  },
  VALIDATOR: {
    CONSENSUS: {
      ADDRESS: `${BECH32_HRP.COMMERCIO}valcons`,
      KEY: `${BECH32_HRP.COMMERCIO}valconspub`,
    },
    OPERATOR: {
      ADDRESS: `${BECH32_HRP.COMMERCIO}valoper`,
      KEY: `${BECH32_HRP.COMMERCIO}valoperpub`,
    },
  },
});

const SCROLL = Object.freeze({
  BEHAVIOR: 'smooth',
  OFFSET_X: 0,
  OFFSET_Y: 70,
});

const STABLE_COIN = Object.freeze({
  NAME: 'Commercio Cash Credits',
  SYMBOL: 'CCC',
  DENOM: 'uccc',
  EXPONENT: 6,
  VALUE: {
    AMOUNT: '1.00',
    SYMBOL: '€',
  },
  LOGO: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6dXJsKCNsaW5lYXItZ3JhZGllbnQpO30uY2xzLTJ7ZmlsbDojZmZmO30uY2xzLTN7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudC0yKTt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjczLjg1IiB5MT0iNjcxLjI4IiB4Mj0iOTIzLjk3IiB5Mj0iMzI3LjgxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOGU4OThlIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiNhN2E0YTciLz48c3RvcCBvZmZzZXQ9Ii43NiIgc3RvcC1jb2xvcj0iI2JkYmNiZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2M2YzZjNiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQtMiIgeDE9IjczLjg1IiB5MT0iNjcxLjI4IiB4Mj0iOTIzLjk3IiB5Mj0iMzI3LjgxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjhhODAwIi8+PHN0b3Agb2Zmc2V0PSIuMzQiIHN0b3AtY29sb3I9IiNmOWFmMDAiLz48c3RvcCBvZmZzZXQ9Ii44MyIgc3RvcC1jb2xvcj0iI2ZkYzMwMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZjMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNDk4LjkxIiBjeT0iNDk5LjU0IiByPSI0NTguMzIiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00OTguOTEsMTI2LjI2YzUwLjQzLDAsOTkuMzEsOS44NiwxNDUuMjcsMjkuMyw0NC40NCwxOC44LDg0LjM3LDQ1LjcyLDExOC42OCw4MC4wM3M2MS4yNCw3NC4yNCw4MC4wMywxMTguNjhjMTkuNDQsNDUuOTcsMjkuMyw5NC44NCwyOS4zLDE0NS4yN3MtOS44Niw5OS4zMS0yOS4zLDE0NS4yN2MtMTguOCw0NC40NC00NS43Miw4NC4zNy04MC4wMywxMTguNjhzLTc0LjI0LDYxLjI0LTExOC42OCw4MC4wM2MtNDUuOTcsMTkuNDQtOTQuODQsMjkuMy0xNDUuMjcsMjkuM3MtOTkuMzEtOS44Ni0xNDUuMjctMjkuM2MtNDQuNDQtMTguOC04NC4zNy00NS43Mi0xMTguNjgtODAuMDMtMzQuMzEtMzQuMzEtNjEuMjQtNzQuMjQtODAuMDMtMTE4LjY4LTE5LjQ0LTQ1Ljk3LTI5LjMtOTQuODQtMjkuMy0xNDUuMjdzOS44Ni05OS4zMSwyOS4zLTE0NS4yN2MxOC44LTQ0LjQ0LDQ1LjcyLTg0LjM3LDgwLjAzLTExOC42OCwzNC4zMS0zNC4zMSw3NC4yNC02MS4yNCwxMTguNjgtODAuMDMsNDUuOTctMTkuNDQsOTQuODQtMjkuMywxNDUuMjctMjkuM20wLTg1LjA0QzI0NS43OSw0MS4yMiw0MC41OSwyNDYuNDIsNDAuNTksNDk5LjU0czIwNS4yLDQ1OC4zMiw0NTguMzIsNDU4LjMyLDQ1OC4zMi0yMDUuMiw0NTguMzItNDU4LjMyUzc1Mi4wNCw0MS4yMiw0OTguOTEsNDEuMjJoMFoiLz48L2c+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNzA2LjU5LDYzNS4xM2MtNS4zOSw4LjIzLTExLjIyLDE2LjE0LTE3LjUyLDIzLjY2bC02MS44LTQwLjMxYzUuNzgtNi4yNCwxMS4wOS0xMi45MiwxNS45My0xOS45NWwtMjYuNzItMTUuNDNjLTIwLjY1LDI5LTUxLjcyLDUwLjA5LTg3LjczLDU3LjY5LTUuMDUtNi43My0xMy4wNy0xMS4xMS0yMi4xNC0xMS4xMS0xMC4wMywwLTE4Ljc4LDUuMzUtMjMuNjQsMTMuMzMtMzAuNzMtMy40LTU4LjU4LTE2LjQ3LTgwLjQxLTM2LjEyLC42Mi0yLjMsLjk4LTQuNzEsLjk4LTcuMjEsMC0xNS4yOS0xMi40LTI3LjY5LTI3LjY5LTI3LjY5LS41NCwwLTEuMDYsLjA1LTEuNTksLjA4LTEyLjI0LTIxLTE5LjM0LTQ1LjMzLTE5LjUzLTcxLjI5LDguNDctNC43NCwxNC4yLTEzLjc4LDE0LjItMjQuMTcsMC03LjUyLTMtMTQuMzItNy44Ny0xOS4zMSwxNS4yNS00OS41Miw1Ni41MS04Ny43MywxMDcuNzUtOTguNjYsNC45Miw0LjQ2LDExLjQyLDcuMiwxOC41OCw3LjIsOC41NywwLDE2LjIzLTMuOSwyMS4zMS0xMC4wMiwyMi43MiwxLjUzLDQ0LDguMzQsNjIuNjUsMTkuMjEsMS4xNiwxNC4yMywxMy4wNSwyNS40MiwyNy41OCwyNS40MiwxLjQzLDAsMi44Mi0uMTQsNC4xOS0uMzUsNC44Myw1LjA1LDkuMjksMTAuNDcsMTMuMzUsMTYuMTdsMjYuNzEtMTUuNDJjLTUuMjQtNy42Mi0xMS4wMy0xNC44My0xNy4zOC0yMS41MiwuNTItMi4xMSwuODItNC4zMSwuODItNi41OCwwLTMuMS0uNTMtNi4wOC0xLjQ3LTguODZsNTQuNDEtMzRjOS45OCwxMC42MSwxOS4wMSwyMi4xMiwyNy4wMywzNC4zNmwyNi43My0xNS40M2MtMzEuODctNDkuMzEtNzguODgtODcuOTYtMTM0LjM4LTEwOS4zNy0yLjg5LTEyLjIxLTEzLjgzLTIxLjMxLTI2LjkyLTIxLjMxLTcuNTUsMC0xNC4zOSwzLjAzLTE5LjM4LDcuOTMtMTcuMzgtMy40MS0zNS4zMy01LjI0LTUzLjY5LTUuMjQtNTAuOTMsMC05OC42NywxMy43OS0xMzkuOCwzNy43My0zLjE2LTEuMjUtNi41OS0xLjk2LTEwLjItMS45Ni0xNS4yOSwwLTI3LjY5LDEyLjQtMjcuNjksMjcuNjksMCwuMjEsLjAzLC40MiwuMDMsLjYzLTYxLjc3LDUxLjE5LTEwMS4xOSwxMjguNDUtMTAxLjE5LDIxNC43NiwwLDE2LjA0LDEuNDQsMzEuNzUsNC4wNSw0Ny4wNi0xMC42NSwzLjg2LTE4LjI4LDE0LjAzLTE4LjI4LDI2LjAyLDAsMTUuMjksMTIuNCwyNy42OSwyNy42OSwyNy42OSwxLjgsMCwzLjU1LS4xOSw1LjI2LS41MSwxNS41MSw0MC4xMSw0MC4wMSw3NS43Nyw3MS4wNiwxMDQuNDctLjEsLjk4LS4xNiwxLjk3LS4xNiwyLjk3LDAsMTUuMjksMTIuNCwyNy42OSwyNy42OSwyNy42OSwzLjM4LDAsNi42MS0uNjQsOS42MS0xLjc1LDQzLjc1LDI4LjU1LDk1LjkyLDQ1LjIxLDE1MS45Myw0NS4yMSwxMy44MSwwLDI3LjM4LTEuMDUsNDAuNjYtMyw1LjA4LDUuODMsMTIuNTQsOS41MywyMC44OCw5LjUzLDEyLjk3LDAsMjMuODMtOC45MywyNi44NC0yMC45OCw2MC41Ni0yMC4zLDExMS44OS02MC44NiwxNDUuOTYtMTEzLjU3bC0yNi42Ny0xNS40Wm0tMTE4LjQyLTM2Ni44NWMzMS4yMywxMi4wOSw1OS40MSwzMC4zMSw4My4wNyw1My4ybC01Mi4wMSwzMi41MWMtNS4wNi01LjQ3LTEyLjI3LTguOTEtMjAuMzEtOC45MS0uNiwwLTEuMTksLjA1LTEuNzksLjA5bC0xNC4zNS03My44MWMxLjkyLS44MSwzLjcyLTEuODYsNS4zOS0zLjA3Wm0tMzQuNDMtMS42NmM0Ljc1LDQuMTcsMTAuOTIsNi43NSwxNy43MSw2Ljg4bDE0LjQ3LDc0LjQ0Yy0yMi4xMi0xMi43My00Ny4yNS0yMC43NS03NC4wNi0yMi43My0uNDktLjkyLTEuMDItMS44Mi0xLjYxLTIuNjhsNDMuNDktNTUuOTFabS0xNzcuMTQsMTcuMzdjMzYuMTMtMjAuNTcsNzcuODYtMzIuMzksMTIyLjMyLTMyLjM5LDE2LjIyLDAsMzIuMDUsMS42MSw0Ny40MSw0LjYsLjEsLjI1LC4yLC41LC4zMSwuNzVsLTQ0LjgxLDU3LjYxYy00LjIxLTIuNTktOS4xNS00LjExLTE0LjQ2LTQuMTEtMTAuMTgsMC0xOS4wNSw1LjUxLTIzLjg2LDEzLjY5bC04Ny43NC0zMy4yYy41My0yLjEzLC44NC00LjM1LC44NC02LjY0LDAtLjEtLjAxLS4yLS4wMi0uM1ptLTI0Ljg3LDI3Ljg2YzcuNy0uNzcsMTQuNDUtNC43MiwxOC45OC0xMC40OWw3OS43OSwzMC4xOWMtNDMuNywxMi42MS04MC40MSw0MS44LTEwMi44NSw4MC4zMmw0LjA4LTEwMC4wMlptLTEwMC44OCwxODcuODRjMC03NS45NCwzNC4zMy0xNDMuOTgsODguMjUtMTg5LjUyLC4zOCwuMTQsLjc1LC4yOSwxLjE0LC40MmwtNS4yMiwxMjcuODVjLTEuNTQsNC4xLTIuOSw4LjI3LTQuMTMsMTIuNTEtMTAuMTYsNC4xLTE3LjM1LDE0LjA0LTE3LjM1LDI1LjY3LDAsNC42MywxLjE1LDguOTgsMy4xNiwxMi44MmwtNjAuNTEsNjEuNDZjLTMuNDgtMTYuNTMtNS4zNC0zMy42NS01LjM0LTUxLjIxWm04Ljg2LDY0LjA4bDY0LjI1LTY1LjI2YzAsLjQtLjAzLC43OC0uMDMsMS4xOCwwLDMyLjcyLDkuMDUsNjMuMzYsMjQuNzQsODkuNThsLTg3LjgzLTIxLjAxYy0uMjUtMS41NC0uNjMtMy4wNC0xLjEzLTQuNDlabTc5LjY2LDExNi4wMmMtLjY2LS4wNS0xLjMxLS4xLTEuOTgtLjEtMi42OSwwLTUuMjgsLjQtNy43MywxLjEyLTI5LjEyLTI3LjIzLTUxLjY3LTYxLjM2LTY1LjA0LTk5Ljc4bDgzLjYxLDIwYy40Niw5LjUsNS42OCwxNy43MiwxMy4zNCwyMi4zNWwtMjIuMiw1Ni40MVptMTEuMTQsMy4ybDIxLjk4LTU1Ljg0YzEuMSwuMTMsMi4yMiwuMjIsMy4zNiwuMjJzMi4yNi0uMDksMy4zNi0uMjJjMjAuMDgsMTguODcsNDQuNTksMzMuMDUsNzEuOCw0MC44MWwtOTAuMjUsMjQuNjFjLTIuNTQtNC4wMS02LjA3LTcuMzMtMTAuMjYtOS41OVptMTg1LjIsNjIuMDNjLTEyLjAxLDEuNzktMjQuMjksMi43NC0zNi43OCwyLjc0LTQ5LjMsMC05NS4yNC0xNC41MS0xMzMuOS0zOS40LC4wMS0uMzMsLjA1LS42NSwuMDUtLjk4LDAtMS4zNC0uMTMtMi42NS0uMzEtMy45M2wxMTEuMTYtMzAuMzJjMi44NSwuMzgsNS43MiwuNjgsOC42MSwuOTIsNS4wNiw2LjY5LDEzLjA1LDExLjAyLDIyLjA4LDExLjAyLDIuMTIsMCw0LjE3LS4yNiw2LjE1LS43MWwzMC4zNCw1MS40NmMtMy4wOSwyLjQ5LTUuNjEsNS42My03LjQsOS4yWm0yNC43Ni0xNS4zM2MtMi40MywwLTQuNzgsLjM1LTcuMDMsLjkzbC0zMC4xNi01MS4xNmMyLjc2LTIuMDksNS4xMS00LjY3LDYuOTMtNy42MywyMS44Ni0zLjk2LDQyLjMzLTExLjk3LDYwLjU3LTIzLjI3bC0yNi44Niw4MS4zNmMtMS4xMy0uMTQtMi4yOC0uMjQtMy40NS0uMjRabTE2LjQ1LDUuNDVjLS42OC0uNS0xLjM4LS45Ny0yLjEtMS40MWwzMS43Ni05Ni4yMmM0LjMtMy4zNyw4LjQ0LTYuOTIsMTIuNC0xMC42N2w2Mi40MSw0MC43MWMtMjguMjMsMzAuNjYtNjQuMDcsNTQuMTctMTA0LjQ4LDY3LjU5WiIvPjwvc3ZnPg==',
});

const TOKEN = Object.freeze({
  NAME: 'Commercio',
  SYMBOL: 'COM',
  DENOM: 'ucommercio',
  EXPONENT: 6,
  STAKEABLE: true,
  LOGO: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6dXJsKCNOZXdfR3JhZGllbnRfU3dhdGNoXzQpO308L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0iTmV3X0dyYWRpZW50X1N3YXRjaF80IiB4MT0iNzMuODUiIHkxPSI2NzEuMjgiIHgyPSI5MjMuOTciIHkyPSIzMjcuODEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxYjkzYTQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2NWI3NzYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGNsYXNzPSJjbHMtMiIgY3g9IjQ5OC45MSIgY3k9IjQ5OS41NCIgcj0iNDU4LjMyIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzU4LjUxLDY2OS4wMmMtNi43MywxMC4yOS0xNC4wMiwyMC4xOC0yMS45LDI5LjU3bC03Ny4yNS01MC4zOGM3LjIzLTcuOCwxMy44Ni0xNi4xNSwxOS45MS0yNC45NGwtMzMuNC0xOS4yOGMtMjUuODEsMzYuMjUtNjQuNjUsNjIuNjEtMTA5LjY2LDcyLjEyLTYuMzEtOC40Mi0xNi4zNC0xMy44OS0yNy42OC0xMy44OS0xMi41MywwLTIzLjQ4LDYuNjgtMjkuNTUsMTYuNjYtMzguNDEtNC4yNS03My4yMi0yMC41OS0xMDAuNTItNDUuMTUsLjc3LTIuODgsMS4yMy01Ljg5LDEuMjMtOS4wMSwwLTE5LjEyLTE1LjUtMzQuNjItMzQuNjItMzQuNjItLjY3LDAtMS4zMywuMDYtMS45OSwuMS0xNS4zLTI2LjI1LTI0LjE3LTU2LjY2LTI0LjQyLTg5LjExLDEwLjU5LTUuOTIsMTcuNzUtMTcuMjMsMTcuNzUtMzAuMjIsMC05LjM5LTMuNzYtMTcuOS05LjgzLTI0LjE0LDE5LjA3LTYxLjksNzAuNjMtMTA5LjY2LDEzNC42OS0xMjMuMzIsNi4xNCw1LjU3LDE0LjI3LDksMjMuMjIsOSwxMC43MiwwLDIwLjI5LTQuODcsMjYuNjQtMTIuNTIsMjguNCwxLjkxLDU1LDEwLjQyLDc4LjMxLDI0LjAyLDEuNDUsMTcuNzksMTYuMzEsMzEuNzgsMzQuNDcsMzEuNzgsMS43OCwwLDMuNTItLjE4LDUuMjMtLjQ0LDYuMDQsNi4zMiwxMS42MSwxMy4wOCwxNi42OSwyMC4yMmwzMy4zOC0xOS4yN2MtNi41NS05LjUyLTEzLjc5LTE4LjU0LTIxLjcyLTI2LjksLjY0LTIuNjQsMS4wMi01LjM5LDEuMDItOC4yMiwwLTMuODgtLjY3LTcuNi0xLjg0LTExLjA4bDY4LjAxLTQyLjVjMTIuNDgsMTMuMjcsMjMuNzcsMjcuNjUsMzMuNzksNDIuOTVsMzMuNDItMTkuMjljLTM5Ljg0LTYxLjYzLTk4LjYtMTA5Ljk1LTE2Ny45OC0xMzYuNzEtMy42MS0xNS4yNi0xNy4yOS0yNi42NC0zMy42NS0yNi42NC05LjQ0LDAtMTcuOTksMy43OS0yNC4yMyw5LjkxLTIxLjczLTQuMjYtNDQuMTYtNi41NS02Ny4xMi02LjU1LTYzLjY2LDAtMTIzLjM0LDE3LjI0LTE3NC43NSw0Ny4xNy0zLjk1LTEuNTctOC4yNC0yLjQ1LTEyLjc1LTIuNDUtMTkuMTIsMC0zNC42MiwxNS41LTM0LjYyLDM0LjYyLDAsLjI3LC4wMywuNTIsLjA0LC43OS03Ny4yMSw2My45OS0xMjYuNDgsMTYwLjU3LTEyNi40OCwyNjguNDQsMCwyMC4wNSwxLjgsMzkuNjksNS4wNiw1OC44My0xMy4zMiw0LjgyLTIyLjg1LDE3LjU0LTIyLjg1LDMyLjUyLDAsMTkuMTIsMTUuNSwzNC42MiwzNC42MiwzNC42MiwyLjI1LDAsNC40NC0uMjMsNi41Ny0uNjQsMTkuMzksNTAuMTQsNTAuMDEsOTQuNzEsODguODMsMTMwLjU5LS4xMywxLjIyLS4yLDIuNDYtLjIsMy43MSwwLDE5LjEyLDE1LjUsMzQuNjIsMzQuNjIsMzQuNjIsNC4yMywwLDguMjYtLjgsMTIuMDEtMi4xOCw1NC42OCwzNS42OCwxMTkuOSw1Ni41MSwxODkuOTIsNTYuNTEsMTcuMjcsMCwzNC4yMy0xLjMxLDUwLjgzLTMuNzUsNi4zNSw3LjI5LDE1LjY3LDExLjkyLDI2LjA5LDExLjkyLDE2LjIyLDAsMjkuNzktMTEuMTcsMzMuNTUtMjYuMjIsNzUuNy0yNS4zNywxMzkuODYtNzYuMDgsMTgyLjQ1LTE0MS45NmwtMzMuMzMtMTkuMjVabS0xNDguMDItNDU4LjU2YzM5LjA0LDE1LjExLDc0LjI2LDM3Ljg4LDEwMy44NCw2Ni40OWwtNjUuMDEsNDAuNjNjLTYuMzItNi44NC0xNS4zNC0xMS4xNC0yNS4zOS0xMS4xNC0uNzUsMC0xLjQ5LC4wNy0yLjIzLC4xMWwtMTcuOTQtOTIuMjZjMi40LTEuMDIsNC42NS0yLjMzLDYuNzQtMy44NFptLTQzLjA0LTIuMDdjNS45Myw1LjIyLDEzLjY1LDguNDMsMjIuMTMsOC42bDE4LjA5LDkzLjA1Yy0yNy42NS0xNS45MS01OS4wNy0yNS45NC05Mi41Ny0yOC40MS0uNjEtMS4xNS0xLjI4LTIuMjctMi4wMS0zLjM1bDU0LjM2LTY5Ljg5Wm0tMjIxLjQzLDIxLjcyYzQ1LjE2LTI1LjcxLDk3LjMzLTQwLjQ4LDE1Mi45MS00MC40OCwyMC4yNywwLDQwLjA3LDIuMDIsNTkuMjYsNS43NSwuMTMsLjMxLC4yNiwuNjMsLjM5LC45M2wtNTYuMDEsNzIuMDFjLTUuMjYtMy4yMy0xMS40NC01LjEzLTE4LjA3LTUuMTMtMTIuNzIsMC0yMy44MSw2Ljg5LTI5LjgzLDE3LjExbC0xMDkuNjgtNDEuNWMuNjYtMi42NywxLjA1LTUuNDQsMS4wNS04LjMxLDAtLjEzLS4wMi0uMjUtLjAyLS4zOFptLTMxLjA5LDM0LjgyYzkuNjMtLjk3LDE4LjA2LTUuOSwyMy43Mi0xMy4xMWw5OS43NCwzNy43NGMtNTQuNjMsMTUuNzYtMTAwLjUxLDUyLjI1LTEyOC41NywxMDAuNGw1LjEtMTI1LjAzWm0tMTI2LjEsMjM0Ljc5YzAtOTQuOTIsNDIuOTEtMTc5Ljk3LDExMC4zMS0yMzYuOSwuNDcsLjE4LC45NCwuMzYsMS40MiwuNTJsLTYuNTIsMTU5LjgxYy0xLjkyLDUuMTItMy42MiwxMC4zNC01LjE2LDE1LjY0LTEyLjcxLDUuMTMtMjEuNjgsMTcuNTUtMjEuNjgsMzIuMDksMCw1Ljc5LDEuNDQsMTEuMjMsMy45NSwxNi4wM2wtNzUuNjQsNzYuODNjLTQuMzUtMjAuNjYtNi42OC00Mi4wNy02LjY4LTY0LjAxWm0xMS4wOCw4MC4xbDgwLjMxLTgxLjU3YzAsLjQ5LS4wNCwuOTgtLjA0LDEuNDgsMCw0MC45LDExLjMxLDc5LjIsMzAuOTMsMTExLjk4bC0xMDkuNzktMjYuMjdjLS4zMi0xLjkzLS43OC0zLjgtMS40MS01LjYxWm05OS41NywxNDUuMDNjLS44Mi0uMDYtMS42NC0uMTMtMi40Ny0uMTMtMy4zNiwwLTYuNiwuNS05LjY3LDEuNC0zNi40LTM0LjA0LTY0LjU4LTc2LjctODEuMy0xMjQuNzJsMTA0LjUxLDI1LjAxYy41NywxMS44Nyw3LjEsMjIuMTUsMTYuNjgsMjcuOTRsLTI3Ljc1LDcwLjUxWm0xMy45Miw0bDI3LjQ3LTY5LjhjMS4zOCwuMTcsMi43OCwuMjgsNC4yMSwuMjhzMi44Mi0uMTEsNC4yLS4yOGMyNS4xLDIzLjU5LDU1Ljc0LDQxLjMxLDg5Ljc1LDUxLjAxbC0xMTIuODEsMzAuNzdjLTMuMTgtNS4wMS03LjU4LTkuMTYtMTIuODItMTEuOThabTIzMS41MSw3Ny41NGMtMTUuMDEsMi4yNC0zMC4zNiwzLjQzLTQ1Ljk4LDMuNDMtNjEuNjIsMC0xMTkuMDUtMTguMTQtMTY3LjM3LTQ5LjI1LC4wMS0uNDEsLjA2LS44MSwuMDYtMS4yMywwLTEuNjctLjE2LTMuMzEtLjM5LTQuOTJsMTM4Ljk1LTM3LjljMy41NiwuNDcsNy4xNSwuODUsMTAuNzcsMS4xNSw2LjMyLDguMzYsMTYuMzEsMTMuNzgsMjcuNiwxMy43OCwyLjY1LDAsNS4yMS0uMzIsNy42OS0uODlsMzcuOTIsNjQuMzJjLTMuODYsMy4xMS03LjAxLDcuMDMtOS4yNSwxMS41Wm0zMC45NC0xOS4xN2MtMy4wNCwwLTUuOTcsLjQzLTguNzksMS4xN2wtMzcuNy02My45NWMzLjQ1LTIuNjEsNi4zOS01Ljg0LDguNjYtOS41NCwyNy4zMy00Ljk1LDUyLjkxLTE0Ljk3LDc1LjcxLTI5LjA5bC0zMy41NywxMDEuN2MtMS40Mi0uMTgtMi44NS0uMy00LjMxLS4zWm0yMC41Niw2LjgxYy0uODUtLjYzLTEuNzItMS4yMS0yLjYyLTEuNzZsMzkuNzEtMTIwLjI3YzUuMzctNC4yMSwxMC41NC04LjY1LDE1LjUtMTMuMzNsNzguMDIsNTAuODhjLTM1LjI4LDM4LjMyLTgwLjA4LDY3LjcxLTEzMC42LDg0LjQ5WiIvPjwvc3ZnPg==',
});

const COIN_TYPE = 118;

const GAS_PRICE_STEP = Object.freeze({
  AVERAGE: 0.125,
  HIGH: 0.125,
  LOW: 0.125,
});

const FEE_AMOUNT = 10000;

const GAS_AMOUNT = 1000000;

// ms
const REST_LEAD_TIME = 5 * 1000;

const WASM_CW20_CODE_ID =
  process.env.VUE_APP_WASM_CW20_CODE_ID !== undefined
    ? process.env.VUE_APP_WASM_CW20_CODE_ID
    : '';

const WASM_SWAP_CODE_ID =
  process.env.VUE_APP_WASM_SWAP_CODE_ID !== undefined
    ? process.env.VUE_APP_WASM_SWAP_CODE_ID
    : '';

const CONNECTIONS =
  process.env.VUE_APP_CONNECTIONS !== undefined
    ? JSON.parse(process.env.VUE_APP_CONNECTIONS)
    : [];

export default Object.freeze({
  BECH32_HRP,
  BROWSER_STORAGE_KEYS,
  CONNECTIONS,
  COIN_TYPE,
  COPYRIGHT,
  FEE_AMOUNT,
  FIRST_CONVERSION_RATE,
  FIRST_HEIGHT,
  GAS_AMOUNT,
  GAS_PRICE_STEP,
  HAS_POOLS,
  LEGACY_VERSIONS,
  PREFIXES,
  REST_LEAD_TIME,
  SCROLL,
  STABLE_COIN,
  TOKEN,
  WASM_CW20_CODE_ID,
  WASM_SWAP_CODE_ID,
});
