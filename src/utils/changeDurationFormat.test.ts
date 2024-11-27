import { changeDurationFormat } from './changeDurationFormat'; // Предполагается, что функция находится в файле changeDurationFormat.ts

describe('changeDurationFormat', () => {
  it('should format 90 seconds as "1:30"', () => {
    expect(changeDurationFormat(90)).toBe("1:30");
  });

  it('should format 0 seconds as "0:00"', () => {
    expect(changeDurationFormat(0)).toBe("0:00");
  });

  it('should format 45 seconds as "0:45"', () => {
    expect(changeDurationFormat(45)).toBe("0:45");
  });

  it('should format 300 seconds as "5:00"', () => {
    expect(changeDurationFormat(300)).toBe("5:00");
  });

  it('should format 3675 seconds as "61:15"', () => {
    expect(changeDurationFormat(3675)).toBe("61:15");
  });

  it('should round 59.5 seconds to "1:00"', () => {
    expect(changeDurationFormat(59.5)).toBe("1:00");
  });

  it('should handle negative values gracefully (e.g., -90 as "0:00")', () => {
    expect(changeDurationFormat(-90)).toBe("0:00");
  });
});
