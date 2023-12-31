import OrderTaker from '../../OrderTaker/OrderTaker.js';
import Receipt from '../Receipt.js';

const INVALID_DATES = [
  { invalidDate: '2023-13-01' },
  { invalidDate: '2021-00-01' },
  { invalidDate: '2023-12-00' },
  { invalidDate: '2023-12-32' },
  { invalidDate: '2023-33-42' },
];

describe('Receipt 예외 테스트', () => {
  it.each(INVALID_DATES)('발행일자가 유효하지 않으면 에러가 발생한다.', ({ invalidDate }) => {
    // given
    const date = new Date(invalidDate);

    // when
    const result = () => Receipt.of(date);

    // then
    expect(result).toThrow(Receipt.ERROR_MESSAGES.invalidDate);
  });

  it('`order` 호출 시 동일한 메뉴를 재주문 시 에러가 발생한다.', () => {
    // given
    const receipt = Receipt.of(new Date());
    const orderDetails = [
      OrderTaker.takeOrder('아이스크림', 1),
      OrderTaker.takeOrder('아이스크림', 1),
    ];

    // when
    const result = () => receipt.order(orderDetails);

    // then
    expect(result).toThrow(Receipt.ERROR_MESSAGES.invalidOrder);
  });

  it.each([
    {
      orders: [{ name: '아이스크림', quantity: 21 }],
    },
    {
      orders: [
        { name: '아이스크림', quantity: 16 },
        { name: '제로콜라', quantity: 5 },
      ],
    },
  ])(`${Receipt.MAX_FOOD_QUANTITY}개 이상 주문 시 에러가 발생한다.`, ({ orders }) => {
    // given
    const receipt = Receipt.of(new Date());
    const orderDetails = Array.from(orders, (order) => {
      const { name, quantity } = order;
      return OrderTaker.takeOrder(name, quantity);
    });

    // when
    const result = () => receipt.order(orderDetails);

    // then
    expect(result).toThrow(Receipt.ERROR_MESSAGES.invalidOrder);
  });

  it.each([
    {
      orders: [
        { name: '제로콜라', quantity: 1 },
        { name: '레드와인', quantity: 1 },
        { name: '샴페인', quantity: 1 },
      ],
    },
    {
      orders: [
        { name: '제로콜라', quantity: 1 },
        { name: '레드와인', quantity: 1 },
      ],
    },
    {
      orders: [{ name: '제로콜라', quantity: 1 }],
    },
  ])('음료만 주문 시 에러가 발생한다.', ({ orders }) => {
    // given
    const receipt = Receipt.of(new Date());
    const orderDetails = Array.from(orders, (order) => {
      const { name, quantity } = order;
      return OrderTaker.takeOrder(name, quantity);
    });

    // when
    const result = () => receipt.order(orderDetails);

    // then
    expect(result).toThrow(Receipt.ERROR_MESSAGES.invalidOrder);
  });
});
