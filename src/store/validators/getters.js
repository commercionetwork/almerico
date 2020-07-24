/**
 * Validators getters
 */

export default {
  validators: state => state.all,
  validatorSet: state => state.set,
  isFetching: state => state.isFetching,
  message: state => state.message,
};