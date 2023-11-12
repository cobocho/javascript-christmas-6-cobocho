import { isWeekday } from '../../utils/date/date.js';
import MainCourse from '../Food/MainCourse.js';
import Receipt from '../Receipt/Receipt.js';
import Scheduler from '../Scheduler/Scheduler.js';
import Discounter from './Discounter.js';

class DayOfWeekDiscounter extends Discounter {
  /**
   * 평일 할인 이벤트명입니다.
   * @readonly
   */
  static WEEKDAY_EVENT_NAME = '평일 할인';

  /**
   * 주말 할인 이벤트명입니다.
   * @readonly
   */
  static WEEKEND_EVENT_NAME = '주말 할인';

  /**
   * 주말 할인 대상 카테고리입니다.
   * @readonly
   */
  static WEEKEND_EVENT_CATEGORY = MainCourse;

  /**
   * 요일 할인 기간 입니다.
   * @readonly
   */
  static PERIOD = {
    start: '2023-12-01',
    end: '2023-12-31',
  };

  /**
   * 주말 할인의 개당 할인 금액입니다.
   * @readonly
   */
  static DISCOUNT_PER_FOOD = 2_023;

  static of() {
    return new DayOfWeekDiscounter();
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

    return isWeekday(receipt.getDate()) ? null : this.#weekendDiscount(receipt);
  }

  /**
   * 주말 할인을 적용합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {import('../../service/DiscountService.js').BenefitResult | null} 할인 결과입니다.
   */
  #weekendDiscount(receipt) {
    const beforeDiscountPrice = receipt.getPrice().discount;
    const foods = receipt
      .getAllFoods()
      .filter((food) => food instanceof DayOfWeekDiscounter.WEEKEND_EVENT_CATEGORY);
    foods.forEach((food) => food.discount(DayOfWeekDiscounter.DISCOUNT_PER_FOOD));
    return {
      name: DayOfWeekDiscounter.WEEKEND_EVENT_NAME,
      benefit: beforeDiscountPrice - receipt.getPrice().discount,
    };
  }

  /**
   * 이벤트 기간을 확인합니다.
   * @param {Date} visitDate - 방문일입니다.
   * @returns {boolean} - 방문일의 이벤트 기간 여부입니다.
   */
  #isEventPeriod(visitDate) {
    const scheduler = Scheduler.of();
    const { start, end } = DayOfWeekDiscounter.PERIOD;
    scheduler.addEventPeriod(new Date(start), new Date(end));

    return scheduler.isEventDate(visitDate);
  }
}

export default DayOfWeekDiscounter;
