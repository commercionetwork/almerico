import { CONFIG } from '@/constants';

const validatorsTailor = {
  get() {
    return localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS);
  },
  set(address) {
    const validators =
      localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS) || [];
    validators.push(address);
    localStorage.setItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS, validators);
  },
  remove(address) {
    const validators = localStorage.getItem(
      CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS,
    );
    const index = validators.findIndex((v) => v === address);
    if (index > -1) validators.splice(index, 1);
    localStorage.setItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS, validators);
  },
  reset() {
    localStorage.setItem(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS, []);
  },
};

export default validatorsTailor;
