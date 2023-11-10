import Food from '../Food.js';

describe('Food 테스트', () => {
  it('`getPrice` 호출 시 `PriceInfo`를 반환한다.', () => {
    // given
    const food = Food.of('케이크', 4_500);

    // when
    const result = food.getPrice();

    expect(result).toEqual({ cost: 4_500, discount: 0, payment: 4_500 });
  });
});
