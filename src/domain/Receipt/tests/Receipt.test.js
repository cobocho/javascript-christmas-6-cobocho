import { Appetizer, Dessert, MainCourse } from '../../Food/index.js';
import Receipt from '../Receipt.js';

describe('Receipt 테스트', () => {
  /** @type {Receipt} */
  let receipt;

  beforeEach(() => {
    receipt = Receipt.of();
  });

  it('`getAllFoods` 호출 시 모든 `orderDetails`의 모든 `Food`를 반환한다.', () => {
    // given
    receipt.order('시저샐러드', 1);
    receipt.order('크리스마스파스타', 3);
    receipt.order('아이스크림', 2);
    receipt.order('제로콜라', 1);

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
    receipt.order('시저샐러드', 3); // 8,000원 * 3ea = 24,000원
    receipt.order('아이스크림', 2); // 5,000원 * 2ea = 10,000원
    receipt.order('제로콜라', 1); // 3,000원 * 1ea = 3,000원, 총 37,000원

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
});
