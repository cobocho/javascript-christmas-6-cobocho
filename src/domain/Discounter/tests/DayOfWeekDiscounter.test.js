import Receipt from '../../Receipt/Receipt.js';
import DayOfWeekDiscounter from '../DayOfWeekDiscounter.js';

describe('DayOfWeekDiscounter 테스트', () => {
  /** @type {DayOfWeekDiscounter} */
  let dayOfWeekDiscounter;

  beforeEach(() => {
    dayOfWeekDiscounter = DayOfWeekDiscounter.of();
  });

  it.each([
    // 금요일
    {
      date: '2023-12-01',
      orders: [{ name: '티본스테이크', quantity: 1 }],
      discount: 2_023,
    },
    {
      date: '2023-12-01',
      orders: [
        { name: '티본스테이크', quantity: 2 },
        { name: '양송이수프', quantity: 1 },
      ],
      discount: 2_023 * 2,
    },
    // 토요일
    {
      date: '2023-12-02',
      orders: [{ name: '티본스테이크', quantity: 1 }],
      discount: 2_023,
    },
    {
      date: '2023-12-02',
      orders: [
        { name: '티본스테이크', quantity: 2 },
        { name: '양송이수프', quantity: 1 },
      ],
      discount: 2_023 * 2,
    },
  ])('주말에는 메인메뉴를 개당 2,023원 할인한다.', ({ date, orders, discount }) => {
    // given
    const receipt = Receipt.of(new Date(date));
    receipt.orderMany(orders);

    // when
    const { benefit } = dayOfWeekDiscounter.run(receipt);

    // then
    expect(benefit).toBe(discount);
  });
});
