import { mockBlocks, mockValidator } from '@/__mocks__';
import validatorAttendanceCalculator from '../validatorAttendanceCalculator';

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
        limit,
      );
    const splitPercentage = attendancePercentage.split(/[,.]/);
    expect(splitPercentage[0]).toBe(`${limit}`);
  });
});
