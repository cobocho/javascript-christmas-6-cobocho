class Food {
  /**
   * 음식의 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * 음식의 가격입니다.
   * @type {import("../../types/price").PriceInfo}
   */
  #price = {
    cost: 0,
    discount: 0,
    payment: 0,
  };

  /**
   * @param {string} name
   * @param {number} price
   */
  constructor(name, price) {
    this.#name = name;
    this.#price.cost = price;
    this.#price.payment = price;
  }

  /**
   * @param {string} name
   * @param {number} price
   * @returns {Food}
   */
  static of(name, price) {
    return new Food(name, price);
  }

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
