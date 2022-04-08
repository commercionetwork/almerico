import { regExpBuilder } from '@/utils';

const txHandler = {
  /**
   *
   * @param {Array.<Object>} msgs
   * @param {String} multiTypes
   * @returns {String}
   */
  getType_current(msgs, multiTypes) {
    if (msgs === null || !msgs.length) return '';

    return msgs.length === 1 ? _getType(msgs[0]['@type']) : multiTypes;
  },
  /**
   *
   * @param {Array.<Object>} msgs
   * @param {String} multiTypes
   * @returns {String}
   */
  getType_v038(msgs, multiTypes) {
    if (msgs === null || !msgs.length) return '';

    return msgs.length === 1 ? msgs[0]['type'].split('/').pop() : multiTypes;
  },
};

const _getType = (type) => {
  const lastSegment = type.match(regExpBuilder.getTypeRegExp())[0];
  return lastSegment.substring(1);
};

export default txHandler;
