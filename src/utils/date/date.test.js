import { isSameDate, isSameDay, isSameMonth, isSameYear, isWeekday } from './date.js';

describe('Date 관련 유틸리티 테스트', () => {
  it.each([
    { date: '2023-03-01', otherDate: '2023-03-01' },
    { date: '2023-03-01', otherDate: '2023-12-01' },
    { date: '2021-03-01', otherDate: '2021-03-01' },
  ])('isSameYear는 입력받은 두 날짜가 년도가 같을 시 true를 반환한다.', ({ date, otherDate }) => {
    // given
    const originalDate = new Date(date);
    const compareDate = new Date(otherDate);

    // when
    const result = isSameYear(originalDate, compareDate);

    // then
    expect(result).toBeTruthy();
  });

  it.each([
    { date: '2023-03-01', otherDate: '2022-03-01' },
    { date: '2023-03-01', otherDate: '2024-12-01' },
    { date: '2021-03-01', otherDate: '2020-03-01' },
  ])('isSameYear는 입력받은 두 날짜가 년도가 다를 시 false를 반환한다.', ({ date, otherDate }) => {
    // given
    const originalDate = new Date(date);
    const compareDate = new Date(otherDate);

    // when
    const result = isSameYear(originalDate, compareDate);

    // then
    expect(result).toBeFalsy();
  });

  it.each([
    { date: '2023-03-01', otherDate: '2023-03-01' },
    { date: '2021-03-01', otherDate: '2023-03-01' },
    { date: '2026-01-01', otherDate: '2021-01-01' },
  ])('isSameMonth는 입력받은 두 날짜가 월이 같을 시 true를 반환한다.', ({ date, otherDate }) => {
    // given
    const originalDate = new Date(date);
    const compareDate = new Date(otherDate);

    // when
    const result = isSameMonth(originalDate, compareDate);

    // then
    expect(result).toBeTruthy();
  });

  it.each([
    { date: '2023-03-01', otherDate: '2022-07-01' },
    { date: '2023-03-01', otherDate: '2024-12-01' },
    { date: '2021-03-01', otherDate: '2020-04-01' },
  ])('isSameMonth는 입력받은 두 날짜가 월이 다를 시 false를 반환한다.', ({ date, otherDate }) => {
    // given
    const originalDate = new Date(date);
    const compareDate = new Date(otherDate);

    // when
    const result = isSameMonth(originalDate, compareDate);

    // then
    expect(result).toBeFalsy();
  });

  it.each([
    { date: '2023-03-01', otherDate: '2023-03-01' },
    { date: '2021-07-01', otherDate: '2023-01-01' },
    { date: '2026-06-01', otherDate: '2021-03-01' },
  ])('isSameDay는 입력받은 두 날짜가 일이 같을 시 true를 반환한다.', ({ date, otherDate }) => {
    // given
    const originalDate = new Date(date);
    const compareDate = new Date(otherDate);

    // when
    const result = isSameDay(originalDate, compareDate);

    // then
    expect(result).toBeTruthy();
  });

  it.each([
    { date: '2023-03-01', otherDate: '2022-07-03' },
    { date: '2023-03-01', otherDate: '2024-12-02' },
    { date: '2021-03-01', otherDate: '2020-04-05' },
  ])('isSameDay는 입력받은 두 날짜가 일이 다를 시 false를 반환한다.', ({ date, otherDate }) => {
    // given
    const originalDate = new Date(date);
    const compareDate = new Date(otherDate);

    // when
    const result = isSameDay(originalDate, compareDate);

    // then
    expect(result).toBeFalsy();
  });

  it.each([
    { date: '2023-03-01', otherDate: '2023-03-01' },
    { date: '2023-12-31', otherDate: '2023-12-31' },
    { date: '2021-03-11', otherDate: '2021-03-11' },
  ])('isSameDate는 입력받은 두 날짜가 같을 시 true를 반환한다.', ({ date, otherDate }) => {
    // given
    const originalDate = new Date(date);
    const compareDate = new Date(otherDate);

    // when
    const result = isSameDate(originalDate, compareDate);

    // then
    expect(result).toBeTruthy();
  });

  it.each([
    { date: '2023-12-03' },
    { date: '2023-12-04' },
    { date: '2023-12-05' },
    { date: '2023-12-06' },
    { date: '2023-12-07' },
  ])('isWeekday는 입력받은 날짜가 평일이면 true를 반환한다.', ({ date }) => {
    // given
    const weekday = new Date(date);

    // when
    const result = isWeekday(weekday);

    // then
    expect(result).toBeTruthy();
  });

  it.each([{ date: '2023-12-08' }, { date: '2023-12-09' }])(
    'isWeekday는 입력받은 날짜가 주말이면 false를 반환한다.',
    ({ date }) => {
      // given
      const weekend = new Date(date);

      // when
      const result = isWeekday(weekend);

      // then
      expect(result).toBeFalsy();
    },
  );
});
