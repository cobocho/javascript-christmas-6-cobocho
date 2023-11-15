import Discounter from './Discounter.js';
import { Dessert, MainCourse } from '../Food/index.js';
import Receipt from '../Receipt/Receipt.js';
import Scheduler from '../Scheduler/Scheduler.js';

import { isWeekday } from '../../utils/date/date.js';

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
   * 평일 할인 대상 카테고리입니다.
   * @readonly
   */
  static WEEKDAY_EVENT_CATEGORY = Dessert;

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
    const visitDate = receipt.getDate();

    if (!this.#isEventPeriod(visitDate)) {
      return null;
    }

    const { name, category } = this.#getDiscountInfo(isWeekday(visitDate));

    return this.#discountEventFoods({ name, category, receipt });
  }

  #discountEventFoods({ name, category, receipt }) {
    const beforeDiscountPrice = receipt.getPrice().discount;
    const foods = receipt.getAllFoods().filter((food) => food instanceof category);
    foods.forEach((food) => food.discount(DayOfWeekDiscounter.DISCOUNT_PER_FOOD));
    const benefit = receipt.getPrice().discount - beforeDiscountPrice;

    if (!benefit) {
      return null;
    }

    return {
      name,
      benefit,
    };
  }

  /**
   * 요일에 따른 할인 조건을 반환합니다.
   * @param {boolean} weekday - 평일 여부입니다.
   * @returns {{ name: string, category: Function }} - 할인 조건입니다.
   */
  #getDiscountInfo(weekday) {
    const category = weekday
      ? DayOfWeekDiscounter.WEEKDAY_EVENT_CATEGORY
      : DayOfWeekDiscounter.WEEKEND_EVENT_CATEGORY;
    const name = weekday
      ? DayOfWeekDiscounter.WEEKDAY_EVENT_NAME
      : DayOfWeekDiscounter.WEEKEND_EVENT_NAME;

    return { name, category };
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
