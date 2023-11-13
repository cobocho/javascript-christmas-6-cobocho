import Food from '../Food.js';

describe('Food 테스트', () => {
  it('`getName` 호출 시 음식의 이름을 반환한다.', () => {
    // given
    const food = Food.of('케이크', 4_500);

    // when
    const result = food.getName();

    // then
    expect(result).toBe('케이크');
  });

  it('`getPrice` 호출 시 `PriceInfo`를 반환한다.', () => {
    // given
    const food = Food.of('케이크', 4_500);

    // when
    const result = food.getPrice();

    // then
    expect(result).toEqual({ cost: 4_500, discount: 0, payment: 4_500 });
  });

  it.each([{ discount: 1_000 }, { discount: 2_000 }, { discount: 3_000 }])(
    '`discount` 호출 시 인자만큼 가격을 할인한다.',
    ({ discount }) => {
      // given
      const food = Food.of('케이크', 4_500);

      // when
      food.discount(discount);
      const result = food.getPrice();

      // then
      expect(result).toEqual({ cost: 4_500, discount, payment: 4_500 - discount });
    },
  );

  it('`discount` 호출 시 0원 이하로는 할인되지 않는다.', () => {
    // given
    const food = Food.of('케이크', 4_500);

    // when
    food.discount(5000);
    const result = food.getPrice();

    // then
    expect(result).toEqual({ cost: 4_500, discount: 4_500, payment: 0 });
  });
});
