const errorHandler = {
  /**
   *
   * @param {Function} translator
   * @param {Object} context The context to bind to the translator function
   * @param {Error} error
   * @returns {Object}
   */
  process(translator, context, error) {
    return error.response
      ? composeWithResponse(error)
      : composeNoResponse(translator, context, error);
  },
};

export default errorHandler;

/**
 *
 * @param {Error} error
 * @returns {Object}
 */
const composeWithResponse = (error) => error.response;

/**
 * @param {Error} error
 * @returns {Object}
 */
const composeNoResponse = (translator, context, error) => {
  const $t = translator.bind(context);
  return {
    data: {
      message: error.request
        ? $t('msgs.unansweredRequest')
        : $t('msgs.triggeredAnError'),
    },
    status: 503,
  };
};
