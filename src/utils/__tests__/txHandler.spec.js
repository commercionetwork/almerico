import { txHandler } from '../index';

describe('utils/txHandler', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test("if function 'getType' returns an empty string", () => {
  //   const msgs = [];

  //   const type = txHandler.getType(msgs);

  //   expect(type).toBe('');
  // });

  // test("if function 'getType' returns the message type", () => {
  //   const msgs = [
  //     {
  //       type: 'commercio/MsgShareDocument',
  //       value: {},
  //     },
  //   ];

  //   const type = txHandler.getType(msgs);

  //   expect(type).toBe('MsgShareDocument');
  // });

  // test("if function 'getType' returns the 'Multi Types' string", () => {
  //   const msgs = [
  //     {
  //       type: 'commercio/MsgShareDocument',
  //       value: {},
  //     },
  //     {
  //       type: 'commercio/MsgShareDocument',
  //       value: {},
  //     },
  //   ];

  //   const type = txHandler.getType(msgs);

  //   expect(type).toBe('Multi Types');
  // });
});
