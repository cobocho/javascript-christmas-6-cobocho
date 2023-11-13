import OrderTaker from '../../OrderTaker/OrderTaker.js';
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
    const orderDetails = Array.from(orders, (order) => {
      const { name, quantity } = order;
      return OrderTaker.takeOrder(name, quantity);
    });
    receipt.order(orderDetails);

    // when
    const { name, benefit } = dayOfWeekDiscounter.run(receipt);

    // then
    expect(name).toBe(DayOfWeekDiscounter.WEEKEND_EVENT_NAME);
    expect(benefit).toBe(discount);
  });

  it.each([
    // 일요일
    {
      date: '2023-12-03',
      orders: [{ name: '초코케이크', quantity: 1 }],
      discount: 2_023,
    },
    {
      date: '2023-12-03',
      orders: [
        { name: '초코케이크', quantity: 1 },
        { name: '아이스크림', quantity: 1 },
      ],
      discount: 2_023 * 2,
    },
    // 월요일
    {
      date: '2023-12-04',
      orders: [{ name: '초코케이크', quantity: 1 }],
      discount: 2_023,
    },
    {
      date: '2023-12-04',
      orders: [
        { name: '초코케이크', quantity: 1 },
        { name: '아이스크림', quantity: 1 },
      ],
      discount: 2_023 * 2,
    },
    // 화요일
    {
      date: '2023-12-05',
      orders: [{ name: '초코케이크', quantity: 1 }],
      discount: 2_023,
    },
    {
      date: '2023-12-05',
      orders: [
        { name: '초코케이크', quantity: 1 },
        { name: '아이스크림', quantity: 1 },
      ],
      discount: 2_023 * 2,
    },
    // 수요일
    {
      date: '2023-12-06',
      orders: [{ name: '초코케이크', quantity: 1 }],
      discount: 2_023,
    },
    {
      date: '2023-12-06',
      orders: [
        { name: '초코케이크', quantity: 1 },
        { name: '아이스크림', quantity: 1 },
      ],
      discount: 2_023 * 2,
    },
    // 목요일
    {
      date: '2023-12-07',
      orders: [{ name: '초코케이크', quantity: 1 }],
      discount: 2_023,
    },
    {
      date: '2023-12-07',
      orders: [
        { name: '초코케이크', quantity: 1 },
        { name: '아이스크림', quantity: 1 },
      ],
      discount: 2_023 * 2,
    },
  ])('평일에는 디저트를 개당 2,023원 할인한다.', ({ date, orders, discount }) => {
    // given
    const receipt = Receipt.of(new Date(date));
    const orderDetails = Array.from(orders, (order) => {
      const { name, quantity } = order;
      return OrderTaker.takeOrder(name, quantity);
    });
    receipt.order(orderDetails);

    // when
    const { name, benefit } = dayOfWeekDiscounter.run(receipt);

    // then
    expect(name).toBe(DayOfWeekDiscounter.WEEKDAY_EVENT_NAME);
    expect(benefit).toBe(discount);
  });

  it.each([
    // 금요일
    {
      date: '2023-12-01',
      orders: [{ name: '양송이수프', quantity: 3 }],
    },
    {
      date: '2023-12-01',
      orders: [{ name: '초코케이크', quantity: 1 }],
    },
    {
      date: '2023-12-01',
      orders: [
        { name: '제로콜라', quantity: 1 },
        { name: '양송이수프', quantity: 2 },
      ],
    },
    // 월요일
    {
      date: '2023-12-04',
      orders: [{ name: '티본스테이크', quantity: 1 }],
    },
    {
      date: '2023-12-04',
      orders: [{ name: '양송이수프', quantity: 2 }],
    },
    {
      date: '2023-12-04',
      orders: [
        { name: '제로콜라', quantity: 1 },
        { name: '양송이수프', quantity: 2 },
      ],
    },
  ])('요일 이벤트 적용대상이 아니면 할인이 되지 않는다.', ({ date, orders }) => {
    // given
    const receipt = Receipt.of(new Date(date));
    const orderDetails = Array.from(orders, (order) => {
      const { name, quantity } = order;
      return OrderTaker.takeOrder(name, quantity);
    });
    receipt.order(orderDetails);

    // when
    const result = dayOfWeekDiscounter.run(receipt);

    // then
    expect(result).toBeNull();
  });

  it.each([
    // 월요일
    {
      date: '2023-12-04',
      orders: [{ name: '아이스크림', quantity: 1 }],
    },
  ])('10,000원 이하라면 할인이 되지 않는다.', ({ date, orders }) => {
    // given
    const receipt = Receipt.of(new Date(date));
    const orderDetails = Array.from(orders, (order) => {
      const { name, quantity } = order;
      return OrderTaker.takeOrder(name, quantity);
    });
    receipt.order(orderDetails);

    // when
    const result = dayOfWeekDiscounter.run(receipt);

    // then
    expect(result).toBeNull();
  });
});
