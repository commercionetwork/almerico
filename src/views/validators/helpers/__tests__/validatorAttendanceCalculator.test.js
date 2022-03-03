import { mockBlocks, mockValidator } from '@/__mocks__';
import validatorAttendanceCalculator from '../validatorAttendanceCalculator';
import { VALIDATORS } from '@/constants';

describe('views/validators/helpers/validatorAttendanceCalculator', () => {
  test('if "validatorAttendanceCalculator" methods return the defined blocks, the attendance count and percentage', () => {
    const limit = 100;
    const blocks = mockBlocks(limit);
    const validator = mockValidator();

    const definedBlocks = validatorAttendanceCalculator.getDefinedBlocks({
      blocks,
      validator,
      limit,
    });
    expect(definedBlocks.length).toBe(limit);

    const attendanceCount =
      validatorAttendanceCalculator.getAttendanceCount(definedBlocks);
    expect(attendanceCount).toBe(limit);

    const attendancePercentage =
      validatorAttendanceCalculator.getAttendancePercentage(
        attendanceCount,
        limit
      );
    const splitPercentage = attendancePercentage.split(/[,.]/);
    expect(splitPercentage[0]).toBe(`${limit}`);
  });

  test('if "validatorAttendanceCalculator.getDefinedBlocks" method return an empty list if a validator is not found in validatorsets', () => {
    const limit = 100;
    const blocks = mockBlocks(limit);
    const validator = mockValidator({
      operator_address:
        'did:com:valoper1ttxcnevaxlk58u4uuec2n7cm44rk9tsgmyj4hg',
      key: 'wTj1mgzDVQ+1nPrSdp+7te/+Vxbvpa4kOr5zgG4xQOI=',
      status: VALIDATORS.STATUS.BONDED,
    });

    const definedBlocks = validatorAttendanceCalculator.getDefinedBlocks({
      blocks,
      validator,
      limit,
    });

    expect(definedBlocks.length).toBe(0);
  });
});
