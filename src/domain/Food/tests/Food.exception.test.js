import DUMMY_INPUTS from '../../../constants/test-dummy.js';
import Food from '../Food.js';

describe('Food 예외 테스트', () => {
  it.each(DUMMY_INPUTS.withoutString)(
    '`name`이 문자열이 아니면 에러를 발생시킨다.',
    ({ input }) => {
      // given & when
      const result = () => Food.of(input, 4_500);

      // then
      expect(result).toThrow(Food.ERROR_MESSAGES.notStringFoodName);
    },
  );

  it.each([{ name: '' }, { name: ' ' }, { name: '  ' }])(
    '`name`이 공백이면 에러를 발생시킨다.',
    ({ name }) => {
      // given & when
      const result = () => Food.of(name, 4_500);

      // then
      expect(result).toThrow(Food.ERROR_MESSAGES.blankFoodName);
    },
  );

  it.each(DUMMY_INPUTS.withoutNumber)('`price`가 숫자가 아니면 에러를 발생시킨다.', ({ input }) => {
    // given & when
    const result = () => Food.of('케이크', input);

    // then
    expect(result).toThrow(Food.ERROR_MESSAGES.notNumberPrice);
  });

  it.each(DUMMY_INPUTS.withoutNumber)(
    '할인금액이 숫자가 아니면 에러를 발생시킨다.',
    ({ input }) => {
      // given
      const food = Food.of('케이크', 4_500);

      // when
      const result = () => food.discount(input);

      // then
      expect(result).toThrow(Food.ERROR_MESSAGES.notNumberDiscountAmount);
    },
  );
});
