import Food from '../Food/Food.js';

/**
 * @typedef OrderDetailRequirement 주문 내역에 대한 생성 요구조건입니다.
 * @property {number} foodName - 음식의 이름입니다.
 * @property {number} foodCategory - 음식의 카테고리입니다.
 * @property {number} quantity - 음식의 갯수입니다.
 * @property {number} price - 음식의 가겨입니다.
 */

class OrderDetail {
  /**
   * 주문 내역의 메뉴 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * 주문 내역의 메뉴 리스트입니다.
   * @type {Food[]}
   */
  #foods;

  /**
   * @param {OrderDetailRequirement} orderDetailRequirement
   */
  constructor({ foodName, foodCategory, quantity, price }) {
    this.#name = foodName;
    this.#foods = Array.from({ length: quantity }, () => foodCategory.of(foodName, price));
  }

  /**
   * @param {OrderDetailRequirement} orderDetailRequirement
   * @returns {OrderDetail}
   */
  static of({ foodName, foodCategory, quantity, price }) {
    return new OrderDetail({ foodName, foodCategory, quantity, price });
  }

  /**
   * 주문내역의 음식 이름을 반환합니다.
   * @returns {number} - 주문 내역의 음식 이름입니다.
   */
  getName() {
    return this.#name;
  }

  /**
   * 주문내역의 음식 갯수를 반환합니다.
   * @returns {number} - 음식의 갯수입니다.
   */
  getQuantity() {
    return this.#foods.length;
  }

  /**
   * 주문내역의 음식을 반환합니다.
   * @returns {Food[]} - 음식입니다.
   */
  getFoods() {
    return this.#foods;
  }

  /**
   * 주문내역의 음식 총 가격 정보를 반환합니다.
   * @returns {import('../../types/price.js').PriceInfo} - 음식 총 가격 정보입니다.
   */
  getPrice() {
    return this.#foods.reduce(
      (price, food) => {
        const { cost, discount, payment } = food.getPrice();
        return {
          cost: price.cost + cost,
          discount: price.discount + discount,
          payment: price.payment + payment,
        };
      },
      { cost: 0, discount: 0, payment: 0 },
    );
  }

  /**
   * 주문 내역을 문자열로 변환합니다.
   * @returns {string} - '${name} ${quantity}개' 형식의 주문 내역입니다.
   */
  toString() {
    return `${this.#name} ${this.getQuantity()}개`;
  }
}

export default OrderDetail;
