import {
  DDayDiscounter,
  DayOfWeekDiscounter,
  SpecialDiscounter,
} from '../domain/Discounter/index.js';
import { Receipt } from '../domain/index.js';

/**
 * @typedef BenefitResult 할인결과입니다.
 * @property {string} name - 이벤트명입니다.
 * @property {number} benefit - 할인 내역입니다.
 */

const DiscountService = Object.freeze({
  /**
   * 크리스마스 디데이 할인을 진행합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {BenefitResult | null} - 할인 결과입니다.
   */
  dDay(receipt) {
    const discounter = DDayDiscounter.of();
    const result = discounter.run(receipt);
    return result;
  },

  /**
   * 요일 할인을 진행합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {BenefitResult | null} - 할인 결과입니다.
   */
  dayOfWeek(receipt) {
    const discounter = DayOfWeekDiscounter.of();
    const result = discounter.run(receipt);
    return result;
  },

  /**
   * 특별 할인을 진행합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {BenefitResult | null} - 할인 결과입니다.
   */
  special(receipt) {
    const discounter = SpecialDiscounter.of();
    const result = discounter.run(receipt);
    return result;
  },
});

export default DiscountService;
