import { DDayDiscounter } from '../domain/Discounter/index.js';
import { Receipt } from '../domain/index.js';

/**
 * @typedef BenefitResult 할인결과입니다.
 * @property {string} name - 이벤트명입니다.
 * @property {number} benefit - 할인 내역입니다.
 */

const DiscountService = Object.freeze({
  /**
   *
   * @param {Receipt} receipt
   * @returns {BenefitResult}
   */
  dDay(receipt) {
    const discounter = DDayDiscounter.of();
    discounter.run(receipt);
    const discountDetail = receipt
      .getAdditionalDiscounts()
      .find((additional) => additional.getName() === DDayDiscounter.EVENT_NAME);
    return discountDetail
      ? {
          name: discountDetail.getName(),
          benefit: discountDetail.getDiscount(),
        }
      : null;
  },
});

export default DiscountService;
