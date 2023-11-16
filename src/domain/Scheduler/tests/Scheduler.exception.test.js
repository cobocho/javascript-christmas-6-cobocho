import Scheduler from '../Scheduler.js';

const INVALID_DATES = [
  { invalidDate: '2023-13-01' },
  { invalidDate: '2021-00-01' },
  { invalidDate: '2023-12-00' },
  { invalidDate: '2023-12-32' },
  { invalidDate: '2023-33-42' },
];

describe('Scheduler 예외 테스트', () => {
  /** @type {Scheduler} */
  let scheduler;

  beforeEach(() => {
    scheduler = Scheduler.of();
  });

  it.each(INVALID_DATES)(
    '`isEventDate` 호출 시 존재하지 않는 일자를 입력할시 에러를 발생시킨다.',
    ({ invalidDate }) => {
      // given
      const date = new Date(invalidDate);

      // when
      const result = () => scheduler.isEventDate(date);

      // then
      expect(result).toThrow(Scheduler.ERROR_MESSAGES.invalidDate);
    },
  );

  it.each(INVALID_DATES)(
    '`addEventDate` 호출 시 존재하지 않는 일자를 입력할시 에러를 발생시킨다.',
    ({ invalidDate }) => {
      // given
      const date = new Date(invalidDate);

      // when
      const result = () => scheduler.addEventDate(date);

      // then
      expect(result).toThrow(Scheduler.ERROR_MESSAGES.invalidDate);
    },
  );

  it.each(INVALID_DATES)(
    '`addEventPeriod` 호출 시 start에 존재하지 않는 일자를 입력할시 에러를 발생시킨다.',
    ({ invalidDate }) => {
      // given
      const date = new Date(invalidDate);

      // when
      const result = () => scheduler.addEventPeriod(date, new Date());

      // then
      expect(result).toThrow(Scheduler.ERROR_MESSAGES.invalidDate);
    },
  );

  it.each(INVALID_DATES)(
    '`addEventPeriod` 호출 시 end에 존재하지 않는 일자를 입력할시 에러를 발생시킨다.',
    ({ invalidDate }) => {
      // given
      const date = new Date(invalidDate);

      // when
      const result = () => scheduler.addEventPeriod(new Date(), date);

      // then
      expect(result).toThrow(Scheduler.ERROR_MESSAGES.invalidDate);
    },
  );

  it.each([
    { year: 1999, month: 1 },
    { year: 2100, month: 3 },
    { year: 2020, month: 0 },
    { year: 2000, month: 13 },
    { year: 2100, month: 13 },
  ])('`addEventMonth` 호출 시 않는 년도나 월을 입력할시 에러를 발생시킨다.', ({ year, month }) => {
    // given & when
    const result = () => scheduler.addEventMonth(year, month);

    // then
    expect(result).toThrow(Scheduler.ERROR_MESSAGES.invalidDate);
  });

  it.each([
    { start: '2023-03-01', end: '2023-02-23' },
    { start: '2023-04-11', end: '2023-04-10' },
    { start: '2023-03-01', end: '2022-09-11' },
  ])('`addEventPeriod` 호출 시 종료일이 시작일보다 이를시 에러를 발생시킨다.', ({ start, end }) => {
    // given
    const startDate = new Date(start);
    const endDate = new Date(end);

    // when
    const result = () => scheduler.addEventPeriod(startDate, endDate);

    // then
    expect(result).toThrow(Scheduler.ERROR_MESSAGES.invalidPeriod);
  });
});
