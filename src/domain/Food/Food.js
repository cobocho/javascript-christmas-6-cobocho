/**
 * @typedef {import("../../types/price").PriceInfo} PriceInfo
 */

class Food {
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
    if (this.#price.payment - amount < 0) {
      this.#price.discount = this.#price.cost;
      this.#price.payment = 0;
      return;
    }

    this.#price.discount += amount;
    this.#price.payment -= amount;
  }
}

export default Food;
