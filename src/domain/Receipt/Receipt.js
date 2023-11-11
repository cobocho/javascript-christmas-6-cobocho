import ApplicationError from '../../exceptions/ApplicationError.js';
import { isDuplicated, isInvalidDate } from '../../utils/validator/validator.js';
import Drink from '../Food/Drink.js';
import Food from '../Food/Food.js';
import OrderDetail from '../OrderDetail/OrderDetail.js';
import OrderTaker from '../OrderTaker/OrderTaker.js';

class Receipt {
  /**
   * 영수증의 에러 메세지입니다.
   * @readonly
   */
  static ERROR_MESSAGES = Object.freeze({
    invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  });

  /**
   * 영수증 하나에 가능한 최대 음식 수 입니다.
   * @readonly
   */
  static MAX_FOOD_QUANTITY = 20;

  /**
   * 영수증의 주문 내역입니다.
   * @type {OrderDetail}
   */
  #orderDetails = [];

  /**
   * 영수증의 증정품 내역입니다.
   * @type {OrderDetail}
   */
  #gifts = [];

  /**
   * 영수증의 발행일자입니다.
   * @type {Date}
   */
  #date;

  /**
   * @param {Date} date 발행일자입니다.
   */
  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  /**
   * @param {Date} date 발행일자입니다.
   * @returns {Receipt} 영수증입니다.
   */
  static of(date) {
    return new Receipt(date);
  }

  #validate(date) {
    if (isInvalidDate(date)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidDate);
    }
  }

  /**
   * 주문을 한번에 여러개를 반영합니다.
   * @param {{ name: string, quantity: number }[]} orders 주문한 메뉴 내역들입니다.
   */
  orderMany(orders) {
    this.#validateOrderMany(orders);
    orders.forEach(({ name, quantity }) => {
      const orderDetail = OrderTaker.takeOrder(name, quantity);
      this.#orderDetails.push(orderDetail);
    });
  }

  /**
   * 주문의 유효성을 검사합니다.
   * @param {{ name: string, quantity: number }[]} orders 주문한 메뉴 내역들입니다.
   */
  #validateOrderMany(orders) {
    const names = Array.from(orders, (order) => order.name);
    const totalQuantity = orders.reduce((total, order) => total + order.quantity, 0);
    const categories = Array.from(names, (name) => OrderTaker.findMenu(name).foodCategory);
    if (isDuplicated(names)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
    if (totalQuantity > Receipt.MAX_FOOD_QUANTITY) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
    if (categories.every((category) => category === Drink)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
  }

  /**
   * 주문을 하여 주문 내역에 반영합니다.
   * @param {string} name 주문한 메뉴의 이름입니다.
   * @param {number} quantity 주문한 메뉴의 갯수입니다.
   */
  order(name, quantity) {
    const orderDetail = OrderTaker.takeOrder(name, quantity);
    this.#orderDetails.push(orderDetail);
  }

  receiveGiveaway() {
    const gifts = OrderTaker.giveaway(this.getPrice().cost);
    this.#gifts.push(...gifts);
  }

  /**
   * 영수증의 주문 내역을 반환합니다.
   * @returns {OrderDetail[]} 영수증의 모든 메뉴입니다.
   */
  getOrderDetails() {
    return this.#orderDetails;
  }

  /**
   * 영수증의 증정 내역을 반환합니다.
   * @returns {OrderDetail[]} 영수증의 모든 메뉴입니다.
   */
  getGifts() {
    return this.#gifts;
  }

  /**
   * 영수증의 모든 메뉴를 반환합니다.
   * @returns {Food[]} 영수증의 모든 메뉴입니다.
   */
  getAllFoods() {
    return Array.from(this.#orderDetails, (orderDetail) => orderDetail.getFoods()).flat();
  }

  /**
   * 영수증의 가격 정보를 반환합니다.
   * @returns {import('../../types/price.js').ReceiptPriceInfo} 영수증의 가격 정보입니다.
   */
  getPrice() {
    return this.#orderDetails.reduce(
      (priceInfo, orderDetail) => ({
        cost: priceInfo.cost + orderDetail.getPrice().cost,
        discount: priceInfo.discount,
        benefit: priceInfo.benefit,
        payment: priceInfo.payment + orderDetail.getPrice().payment,
      }),
      { cost: 0, discount: 0, benefit: 0, payment: 0 },
    );
  }
}

export default Receipt;
