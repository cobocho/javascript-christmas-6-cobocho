import { Appetizer, Dessert, MainCourse } from '../../Food/index.js';
import OrderTaker from '../../OrderTaker/OrderTaker.js';
import Receipt from '../Receipt.js';

describe('Receipt 테스트', () => {
  /** @type {Receipt} */
  let receipt;

  beforeEach(() => {
    receipt = Receipt.of(new Date('2023-12-01'));
  });

  it('`getDate` 호출시 발행일자를 반환한다.', () => {
    // given & when
    const result = receipt.getDate();

    // then
    expect(result).toEqual(new Date('2023-12-01'));
  });

  it('`getAllFoods` 호출 시 모든 `orderDetails`의 모든 `Food`를 반환한다.', () => {
    // given
    const orderDetails = [
      OrderTaker.takeOrder('시저샐러드', 1),
      OrderTaker.takeOrder('크리스마스파스타', 3),
      OrderTaker.takeOrder('아이스크림', 2),
      OrderTaker.takeOrder('제로콜라', 1),
    ];
    receipt.order(orderDetails);

    // when
    const allFoods = receipt.getAllFoods();

    // then
    expect(allFoods).toEqual([
      Appetizer.of('시저샐러드', 8_000),
      MainCourse.of('크리스마스파스타', 25_000),
      MainCourse.of('크리스마스파스타', 25_000),
      MainCourse.of('크리스마스파스타', 25_000),
      Dessert.of('아이스크림', 5_000),
      Dessert.of('아이스크림', 5_000),
      MainCourse.of('제로콜라', 3_000),
    ]);
  });

  it('`getPrice` 호출 시 `ReceiptPriceInfo`를 반환한다.', () => {
    // given

    const orderDetails = [
      OrderTaker.takeOrder('시저샐러드', 3), // 8,000원 * 3ea = 24,000원
      OrderTaker.takeOrder('아이스크림', 2), // 5,000원 * 2ea = 10,000원
      OrderTaker.takeOrder('제로콜라', 1), // 3,000원 * 1ea = 3,000원, 총 37,000원
    ];
    receipt.order(orderDetails);

    // when
    const price = receipt.getPrice();

    // then
    expect(price).toEqual({
      cost: 37_000,
      discount: 0,
      benefit: 0,
      payment: 37_000,
    });
  });

  it('`order` 호출 시 주문 내역을 `orderDetails`에 반영한다.', () => {
    // given
    const orderDetails = [
      OrderTaker.takeOrder('초코케이크', 1),
      OrderTaker.takeOrder('티본스테이크', 1),
    ];

    // when
    receipt.order(orderDetails);

    // then
    expect(receipt.getOrderDetails()).toEqual(orderDetails);
  });

  it('`receiveGiveaway` 호출 시 현재 총 주문금액에 따라 `orderDetails`에 가격이 음수인 `OrderDetail`이 추가된다.', () => {
    // given
    const orderDetails = [
      OrderTaker.takeOrder('초코케이크', 1),
      OrderTaker.takeOrder('티본스테이크', 3),
    ];
    receipt.order(orderDetails);

    // when
    receipt.receiveGiveaway();
    const [gift] = receipt.getGifts();

    // then
    expect(gift).toBeDefined();
    expect(receipt.getPrice().benefit).toBe(25_000);
  });
});
