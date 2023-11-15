import ERROR_MESSAGE_GENERATOR from '../../constants/error.js';
import ApplicationError from '../../exceptions/ApplicationError.js';
import { Appetizer, Dessert, Drink, MainCourse } from '../Food/index.js';
import OrderDetail from '../OrderDetail/OrderDetail.js';

/**
 * @typedef MenuInfo 메뉴에 대한 정보입니다.
 * @property {number} foodName - 음식의 이름입니다.
 * @property {number} foodCategory - 음식의 카테고리입니다.
 * @property {number} price - 음식의 가격입니다.
 */

/**
 * @typedef GiftsInfo 증정품에 대한 정보입니다.
 * @property {number} minimumCost - 증정품의 최소 결제금액입니다.
 * @property {number} giftName - 증정품의 이름입니다.
 * @property {number} quantity - 증정품의 갯수입니다.
 */

const OrderTaker = Object.freeze({
  /**
   * 메뉴판입니다.
   * @readonly
   * @type {MenuInfo[]}
   */
  menu: [
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
  ],

  /**
   * 증정품 목록 입니다.
   * @readonly
   * @type {GiftsInfo[]}
   */
  gifts: [
    {
      minimumCost: 120_000,
      giftName: '샴페인',
      quantity: 1,
    },
  ],

  /**
   * 오더 테이커의 에러 메세지입니다.
   * @readonly
   */ ERROR_MESSAGES: {
    invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
    notNumberPrice: ERROR_MESSAGE_GENERATOR.notNumber('증정품을 확인할 결제 금액'),
  },

  /**
   * 주문을 받아 주문 내역을 반환합니다.
   * @param {string} name 주문한 메뉴의 이름입니다.
   * @param {number} quantity 주문한 메뉴의 갯수입니다.
   * @returns {OrderDetail} 주문 내역입니다.
   */
  takeOrder(name, quantity) {
    const { foodName, price, foodCategory } = this.findMenu(name);
    const MIN_QUANTITY = 1;

    if (quantity < MIN_QUANTITY || !Number.isInteger(quantity)) {
      throw new ApplicationError(this.ERROR_MESSAGES.invalidOrder);
    }
    const orderDetail = OrderDetail.of({ foodName, price, foodCategory, quantity });

    return orderDetail;
  },

  /**
   * 총 주문 금액에 따른 증정품을 반환합니다.
   * @param {number} costPrice 총 주문 금액입니다.
   * @returns {OrderDetail[]} 증정품 목록입니다.
   */
  giveaway(costPrice) {
    if (typeof costPrice !== 'number') {
      throw new ApplicationError(OrderTaker.ERROR_MESSAGES.notNumberPrice);
    }

    const gifts = this.gifts.filter((giveaway) => giveaway.minimumCost <= costPrice);

    return Array.from(gifts, ({ giftName }) => {
      const { foodName, foodCategory, price } = this.findMenu(giftName);
      return OrderDetail.of({ foodName, price, foodCategory, quantity: 1 });
    });
  },

  /**
   * 메뉴판에서 메뉴를 찾아 반환합니다.
   * @param {string} name 메뉴의 이름입니다.
   * @returns {MenuInfo} 메뉴입니다.
   */
  findMenu(name) {
    const result = this.menu.find((food) => food.foodName === name);

    if (!result) {
      throw new ApplicationError(this.ERROR_MESSAGES.invalidOrder);
    }

    return result;
  },
});

export default OrderTaker;
