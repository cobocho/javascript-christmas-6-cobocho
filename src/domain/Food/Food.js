import { isBlank } from '../../utils/validator/validator.js';

import ERROR_MESSAGE_GENERATOR from '../../constants/error.js';

import ApplicationError from '../../exceptions/ApplicationError.js';

/**
 * @typedef {import("../../types/price").PriceInfo} PriceInfo
 */

class Food {
  /**
   * 음식의 에러 메세지입니다.
   * @readonly
   */
  static ERROR_MESSAGES = {
    notStringFoodName: ERROR_MESSAGE_GENERATOR.notString('음식의 이름'),
    blankFoodName: ERROR_MESSAGE_GENERATOR.blank('음식의 이름'),
    notNumberPrice: ERROR_MESSAGE_GENERATOR.notNumber('음식의 가격'),
    notNumberDiscountAmount: ERROR_MESSAGE_GENERATOR.notNumber('음식의 할인할 가격'),
  };

  /**
   * 음식의 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * 음식의 가격입니다.
   * @type {PriceInfo}
   */
  #price = {
    cost: 0,
    discount: 0,
    payment: 0,
  };

  /**
   * @param {string} name - 음식의 이름입니다.
   * @param {number} price - 음식의 가격입니다.
   */
  constructor(name, price) {
    this.#validate(name, price);
    this.#name = name;
    this.#price.cost = price;
    this.#price.payment = price;
  }

  /**
   * @param {string} name - 음식의 이름입니다.
   * @param {number} price - 음식의 가격입니다.
   * @returns {Food} 생성된 음식입니다.
   */
  static of(name, price) {
    return new Food(name, price);
  }

  #validate(name, price) {
    if (typeof name !== 'string') {
      throw new ApplicationError(Food.ERROR_MESSAGES.notStringFoodName);
    }
    if (isBlank(name)) {
      throw new ApplicationError(Food.ERROR_MESSAGES.blankFoodName);
    }
    if (typeof price !== 'number') {
      throw new ApplicationError(Food.ERROR_MESSAGES.notNumberPrice);
    }
  }

  /**
   * 음식의 가격을 반환합니다.
   * @returns {PriceInfo} - 음식의 가격입니다.
   */
  getPrice() {
    return this.#price;
  }

  /**
   * 음식을 할인합니다.
   * @param {number} amount 음식의 할인될 금액입니다.
   */
  discount(amount) {
    this.#validateAmount(amount);

    if (this.#price.payment - amount < 0) {
      this.#price.discount = this.#price.cost;
      this.#price.payment = 0;
      return;
    }

    this.#price.discount += amount;
    this.#price.payment -= amount;
  }

  #validateAmount(amount) {
    if (typeof amount !== 'number') {
      throw new ApplicationError(Food.ERROR_MESSAGES.notNumberDiscountAmount);
    }
  }
}

export default Food;
