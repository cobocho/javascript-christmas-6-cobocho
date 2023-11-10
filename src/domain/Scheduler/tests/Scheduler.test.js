import Scheduler from '../Scheduler.js';

describe('Scheduler 테스트', () => {
  let scheduler;

  beforeEach(() => {
    scheduler = Scheduler.of();
  });

  it.each([
    { addedDate: '2023-01-01', today: '2023-01-01' },
    { addedDate: '2023-12-11', today: '2023-12-11' },
  ])(
    '`isEventDate` 호출 시 해당 일자가 이벤트 진행 일자면 true를 반환한다.',
    ({ addedDate, today }) => {
      // given & when
      scheduler.addEventDate(new Date(addedDate));

      // then
      expect(scheduler.isEventDate(new Date(today))).toBeTruthy();
    },
  );

  it.each([
    { addedDate: '2023-01-01', today: '2023-01-02' },
    { addedDate: '2023-01-01', today: '2022-01-01' },
  ])(
    '`isEventDate` 호출 시 해당 일자가 이벤트 진행 일자가 아니면 false를 반환한다.',
    ({ addedDate, today }) => {
      // given & when
      scheduler.addEventDate(new Date(addedDate));

      // then
      expect(scheduler.isEventDate(new Date(today))).toBeFalsy();
    },
  );

  it.each([
    { start: '2023-12-01', end: '2023-12-31', today: '2023-12-15' },
    { start: '2023-01-01', end: '2023-01-01', today: '2023-01-01' },
    { start: '2023-01-01', end: '2023-01-31', today: '2023-01-02' },
  ])(
    '`addEventPeriod` 호출 시 해당 기간를 이벤트 진행 일자에 추가한다.',
    ({ start, end, today }) => {
      // given & when
      const startDate = new Date(start);
      const endDate = new Date(end);
      const todayDate = new Date(today);
      scheduler.addEventPeriod(startDate, endDate);

      // then
      expect(scheduler.isEventDate(todayDate)).toBeTruthy();
    },
  );

  it.each([
    { year: 2023, month: 12, today: '2023-12-15' },
    { year: 2023, month: 10, today: '2023-10-31' },
    { year: 2021, month: 4, today: '2021-4-1' },
  ])('`addEventMonth` 호출 시 해당 월을 이벤트 진행 일자에 추가한다.', ({ year, month, today }) => {
    // given & when
    scheduler.addEventMonth(year, month);

    // then
    expect(scheduler.isEventDate(new Date(today))).toBeTruthy();
  });
});
