import { CONFIG } from '@/constants';

const validatorsStorageHandler = {
  get() {
    const validators =
      JSON.parse(
        localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS),
      ) || [];
    return validators;
  },
  set(address) {
    const validators =
      JSON.parse(
        localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS),
      ) || [];
    const index = validators.findIndex((v) => v === address);
    if (index > -1) return;
    validators.push(address);
    localStorage.setItem(
      CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS,
      JSON.stringify(validators),
    );
  },
  remove(address) {
    const validators = JSON.parse(
      localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS),
    );
    const index = validators.findIndex((v) => v === address);
    if (index < 0) return;
    validators.splice(index, 1);
    localStorage.setItem(
      CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS,
      JSON.stringify(validators),
    );
  },
};

export default validatorsStorageHandler;
