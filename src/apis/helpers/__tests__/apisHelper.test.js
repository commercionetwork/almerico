import apisHelper from '../apisHelper';

describe('apis/helpers/apisHelper', () => {
  test('if "setupParams" return well set up parameters', () => {
    const params = { status: 'status' };
    const pagination = { key: 'key' };

    const expectedParams = {
      status: 'status',
      'pagination.key': 'key',
    };

    const res = apisHelper.setupParams(params, pagination);

    expect(res).toStrictEqual(expectedParams);
  });
});
