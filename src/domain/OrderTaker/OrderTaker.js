import { Appetizer, Dessert, Drink, MainCourse } from '../Food/index.js';
import OrderDetail from '../OrderDetail/OrderDetail.js';

/**
 * @typedef MenuInfo 메뉴에 대한 정보입니다.
 * @property {number} foodName - 음식의 이름입니다.
 * @property {number} foodCategory - 음식의 카테고리입니다.
 * @property {number} price - 음식의 가격입니다.
 */

class OrderTaker {
  /** @type {MenuInfo[]} */
  #menu = [
    {
      foodName: '양송이수프',
      foodCategory: Appetizer,
      price: 6_000,
    },
    {
      foodName: '타파스',
      foodCategory: Appetizer,
      price: 5_500,
    },
    {
      foodName: '시저샐러드',
      foodCategory: Appetizer,
      price: 8_000,
    },
    {
      foodName: '티본스테이크',
      foodCategory: MainCourse,
      price: 55_000,
    },
    {
      foodName: '바비큐립',
      foodCategory: MainCourse,
      price: 54_000,
    },
    {
      foodName: '해산물파스타',
      foodCategory: MainCourse,
      price: 35_000,
    },
    {
      foodName: '크리스마스파스타',
      foodCategory: MainCourse,
      price: 25_000,
    },
    {
      foodName: '초코케이크',
      foodCategory: Dessert,
      price: 15_000,
    },
    {
      foodName: '아이스크림',
      foodCategory: Dessert,
      price: 5_000,
    },
    {
      foodName: '제로콜라',
      foodCategory: Drink,
      price: 3_000,
    },
    {
      foodName: '레드와인',
      foodCategory: Drink,
      price: 60_000,
    },
    {
      foodName: '샴페인',
      foodCategory: Drink,
      price: 25_000,
    },
  ];

  static of() {
    return new OrderTaker();
  }

  /**
   * @param {string} name
   * @param {number} quantity
   * @returns {OrderDetail}
   */
  takeOrder(name, quantity) {
    const { foodName, price, foodCategory } = this.#findMenu(name);
    const orderDetail = OrderDetail.of({ foodName, price, foodCategory, quantity });
    return orderDetail;
  }

  #findMenu(name) {
    return this.#menu.find((food) => food.foodName === name);
  }
}

export default OrderTaker;
