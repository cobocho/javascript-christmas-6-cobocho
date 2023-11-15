import Discounter from './Discounter.js';
import Receipt from '../Receipt/Receipt.js';
import Scheduler from '../Scheduler/Scheduler.js';
import AdditionalDiscount from '../AdditionalDiscount/AdditionalDiscount.js';

class SpecialDiscounter extends Discounter {
  /**
   * 특별 할인 이벤트명입니다.
   * @readonly
   */
  static EVENT_NAME = '특별 할인';

  /**
   * 특별 할인 할인 금액입니다.
   * @readonly
   */
  static DISCOUNT_AMOUNT = 1_000;

  /**
   * 특별 할인 일자 목록입니다.
   * @readonly
   */
  static DAY_LIST = [
    '2023-12-03',
    '2023-12-10',
    '2023-12-17',
    '2023-12-24',
    '2023-12-25',
    '2023-12-31',
  ];

  /**
   * 크리스마스 디데이 할인의 기본 할인 금액입니다.
   * @readonly
   */
  static MAX_DISCOUNT_AMOUNT = 3_400;

  /**
   * 크리스마스 디데이 할인의 일당 할인 금액입니다.
   * @readonly
   */
  static DISCOUNT_AMOUNT_PER_D_DAY = 100;

  static of() {
    return new SpecialDiscounter();
  }

  /**
   * 할인을 적용합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {import('../../service/DiscountService.js').BenefitResult | null} 할인 결과입니다.
   */
  _discount(receipt) {
    if (!this.#isEventPeriod(receipt.getDate())) {
      return null;
    }
    receipt.addAdditionalDiscount(
      AdditionalDiscount.of(SpecialDiscounter.EVENT_NAME, SpecialDiscounter.DISCOUNT_AMOUNT),
    );

    return { name: SpecialDiscounter.EVENT_NAME, benefit: SpecialDiscounter.DISCOUNT_AMOUNT };
  }

  /**
   * 이벤트 기간을 확인합니다.
   * @param {Date} visitDate - 방문일입니다.
   * @returns {boolean} - 방문일의 이벤트 기간 여부입니다.
   */
  #isEventPeriod(visitDate) {
    const scheduler = Scheduler.of();
    SpecialDiscounter.DAY_LIST.forEach((day) => scheduler.addEventDate(new Date(day)));

    return scheduler.isEventDate(visitDate);
  }
}

export default SpecialDiscounter;
