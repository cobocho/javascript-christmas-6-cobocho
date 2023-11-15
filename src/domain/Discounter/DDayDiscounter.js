import Discounter from './Discounter.js';
import Receipt from '../Receipt/Receipt.js';
import Scheduler from '../Scheduler/Scheduler.js';
import AdditionalDiscount from '../AdditionalDiscount/AdditionalDiscount.js';

class DDayDiscounter extends Discounter {
  /**
   * 크리스마스 디데이 이벤트명입니다.
   * @readonly
   */
  static EVENT_NAME = '크리스마스 디데이 할인';

  /**
   * 크리스마스 디데이 일자입니다.
   * @readonly
   */
  static D_DAY = new Date('2023-12-25');

  /**
   * 크리스마스 디데이 할인 기간 입니다.
   * @readonly
   */
  static PERIOD = {
    start: '2023-12-01',
    end: '2023-12-25',
  };

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
    return new DDayDiscounter();
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

    const visitDate = receipt.getDate().getTime();
    const dayDifference = Math.floor((visitDate - DDayDiscounter.D_DAY) / (1000 * 60 * 60 * 24));
    const reduction = DDayDiscounter.DISCOUNT_AMOUNT_PER_D_DAY * dayDifference;
    const discount = DDayDiscounter.MAX_DISCOUNT_AMOUNT + reduction;

    receipt.addAdditionalDiscount(AdditionalDiscount.of(DDayDiscounter.EVENT_NAME, discount));

    return { name: DDayDiscounter.EVENT_NAME, benefit: discount };
  }

  /**
   * 이벤트 기간을 확인합니다.
   * @param {Date} visitDate - 방문일입니다.
   * @returns {boolean} - 방문일의 이벤트 기간 여부입니다.
   */
  #isEventPeriod(visitDate) {
    const scheduler = Scheduler.of();
    const { start, end } = DDayDiscounter.PERIOD;

    scheduler.addEventPeriod(new Date(start), new Date(end));

    return scheduler.isEventDate(visitDate);
  }
}

export default DDayDiscounter;
