import Food from '../../Food/Food.js';
import OrderDetail from '../OrderDetail.js';

describe('OrderDetail 테스트', () => {
  it('`getQuantity` 호출 시 `foods`의 갯수를 반환한다.', () => {
    // given
    const foodCategory = Food;
    const foodName = '케이크';
    const quantity = 3;
    const price = 4_000;
    const orderDetail = OrderDetail.of({ foodName, foodCategory, quantity, price });

    // when
    const result = orderDetail.getQuantity();

    // then
    expect(result).toBe(quantity);
  });

  it('`getFoods` 호출 시 `quantity` 만큼의 `Food`를 반환한다.', () => {
    // given
    const foodCategory = Food;
    const foodName = '스테이크';
    const quantity = 2;
    const price = 45_000;
    const orderDetail = OrderDetail.of({ foodName, foodCategory, quantity, price });

    // when
    const result = orderDetail.getFoods();

    // then
    expect(result).toEqual([foodCategory.of(foodName, price), foodCategory.of(foodName, price)]);
  });

  it('`getPrice` 호출 시 `PriceInfo`를 반환한다.', () => {
    // given
    const foodCategory = Food;
    const foodName = '카레';
    const quantity = 5;
    const price = 10_000;
    const orderDetail = OrderDetail.of({ foodName, foodCategory, quantity, price });

    // when
    const result = orderDetail.getPrice();

    // then
    expect(result).toEqual({ cost: 50_000, discount: 0, payment: 50_000 });
  });

  it.each([
    { foodName: '빵', quantity: 3 },
    { foodName: '카레', quantity: 10 },
    { foodName: '케이크', quantity: 2 },
    { foodName: '스테이크', quantity: 1 },
  ])('`toString` 호출 시 "$foodName $quantity개"를 반환한다.', ({ foodName, quantity }) => {
    // given
    const foodCategory = Food;
    const price = 10_000;
    const orderDetail = OrderDetail.of({ foodName, foodCategory, quantity, price });

    // when
    const result = orderDetail.toString();

    // then
    expect(result).toBe(`${foodName} ${quantity}개`);
  });
});
