/* eslint-disable max-classes-per-file */

import {
  isDuplicated,
  isOutOfRange,
  invalidInstanceElement,
  isIndivisible,
  isInvalidDate,
  isBlank,
  isSubClass,
} from './validator.js';

describe('유효성 검사 함수 테스트', () => {
  it.each([
    {
      input: 1,
      min: 0,
      max: 3,
      result: false,
    },
    {
      input: 3,
      min: 2,
      max: 3,
      result: false,
    },
    {
      input: 2,
      min: 2,
      max: 2,
      result: false,
    },
    {
      input: 1,
      min: -1,
      max: 1,
      result: false,
    },
    {
      input: 4,
      min: 0,
      max: 3,
      result: true,
    },
    {
      input: 1,
      min: 2,
      max: 3,
      result: true,
    },
    {
      input: 3,
      min: 2,
      max: 2,
      result: true,
    },
    {
      input: -2,
      min: -1,
      max: 1,
      result: true,
    },
  ])('범위 외 숫자 확인', ({ input, min, max, result }) => {
    // given & when
    const validateResult = isOutOfRange(input, { min, max });

    // then
    expect(validateResult).toBe(result);
  });

  it.each([
    { input: [1, 2, 3], result: false },
    { input: [3, 4, 5, 6, 7, 8], result: false },
    { input: ['1', '2', '3'], result: false },
    { input: [1, '1'], result: false },
    { input: [1, 1, 1], result: true },
    { input: [1, 2, 3, 1], result: true },
    { input: [3, 4, 3], result: true },
  ])('중복 확인', ({ input, result }) => {
    // given & when
    const validateResult = isDuplicated(input);

    // then
    expect(validateResult).toBe(result);
  });

  it('인스턴스 확인', () => {
    // given
    class A {}

    // when
    const falsyResult = invalidInstanceElement([new A(), new A()], A);
    const truthyResult = invalidInstanceElement([new A(), {}], A);
    const emptyResult = invalidInstanceElement([], A);

    // then
    expect(emptyResult).toBeFalsy();
    expect(falsyResult).toBeFalsy();
    expect(truthyResult).toBeTruthy();
  });

  it.each([
    {
      input: 10,
      dividedValue: 3,
      result: true,
    },
    {
      input: 7,
      dividedValue: 3,
      result: true,
    },
    {
      input: -10,
      dividedValue: 3,
      result: true,
    },
    {
      input: 2,
      dividedValue: 2,
      result: false,
    },
    {
      input: 5,
      dividedValue: 10,
      result: false,
    },
    {
      input: -10,
      dividedValue: -10,
      result: false,
    },
  ])('나머지 몫 확인', ({ input, dividedValue, result }) => {
    // given & when
    const validateResult = isIndivisible(input, dividedValue);

    // then
    expect(validateResult).toBe(result);
  });

  it.each([
    {
      date: '2023-01-01',
      result: false,
    },
    {
      date: '2023-03-01',
      result: false,
    },
    {
      date: '2023-00-01',
      result: true,
    },
    {
      date: '2023-13-01',
      result: true,
    },
    {
      date: '2023-13-12',
      result: true,
    },
  ])('유효하지 않은 날짜 확인', ({ date, result }) => {
    // given & when
    const invalidDate = new Date(date);

    // then
    expect(isInvalidDate(invalidDate)).toBe(result);
  });

  it.each([
    {
      input: 10,
      dividedValue: 3,
      result: true,
    },
    {
      input: 7,
      dividedValue: 3,
      result: true,
    },
    {
      input: -10,
      dividedValue: 3,
      result: true,
    },
    {
      input: 2,
      dividedValue: 2,
      result: false,
    },
    {
      input: 5,
      dividedValue: 10,
      result: false,
    },
    {
      input: -10,
      dividedValue: -10,
      result: false,
    },
  ])('나머지 몫 확인', ({ input, dividedValue, result }) => {
    // given & when
    const validateResult = isIndivisible(input, dividedValue);

    // then
    expect(validateResult).toBe(result);
  });

  it.each([{ input: '' }, { input: '  ' }, { input: '   ' }])(
    '유효하지 않은 날짜 확인',
    ({ input }) => {
      // given & when
      const result = isBlank(input);

      // then
      expect(result).toBeTruthy();
    },
  );

  it.each([{ input: '글자' }, { input: '글자  ' }, { input: ' 글자 ' }, { input: ' 글자' }])(
    '유효하지 않은 날짜 확인',
    ({ input }) => {
      // given & when
      const result = isBlank(input);

      // then
      expect(result).toBeFalsy();
    },
  );

  it('서브클래스 확인', () => {
    // given
    class SuperClass {}
    class SubClass extends SuperClass {}

    // when
    const result = isSubClass(SubClass, SuperClass);

    // then
    expect(result).toBeTruthy();
  });

  it('재상속 서브클래스 확인', () => {
    // given
    class SuperClass {}
    class SubClass extends SuperClass {}
    class SubSubClass extends SubClass {}

    // when
    const result = isSubClass(SubSubClass, SuperClass);

    // then
    expect(result).toBeTruthy();
  });

  it('서브클래스 확인', () => {
    // given
    class SuperClass {}
    class OtherSuperClass {}
    class OtherSubClass extends OtherSuperClass {}

    // when
    const result = isSubClass(OtherSubClass, SuperClass);

    // then
    expect(result).toBeFalsy();
  });
});
