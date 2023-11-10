import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/messages.js';
import SYSTEM from './constants/system.js';

const OutputView = Object.freeze({
  /**
   * 사용자에게 콘솔로 메세지를 출력합니다.
   * @param {string} message - 출력할 문구입니다.
   */
  print(message) {
    Console.print(message);
  },

  /**
   * 시작 문구를 출력합니다.
   */
  startComment() {
    this.print(MESSAGES.startComment);
  },

  /**
   * 주문한 메뉴를 출력합니다.
   */
  preview() {
    this.print(MESSAGES.benefitPreview);
  },

  /**
   * 주문한 메뉴를 출력합니다.
   * @param {string[]} orders - 주문한 메뉴입니다.
   */
  orders(orders) {
    this.print(MESSAGES.orderTitle);
    orders.forEach((order) => {
      this.print(order);
    });
  },

  /**
   * 할인 전 총 주문금액을 출력합니다.
   * @param {number} cost - 할인 전 총 주문금액입니다.
   */
  costPrice(cost) {
    this.print(MESSAGES.costTitle);
    this.print(`${cost.toLocaleString()}${SYSTEM.currency}`);
  },

  /**
   * @param {string} message - 에러의 메세지입니다.
   * 에러를 출력합니다.
   */
  error(message) {
    this.print(`${message}`);
  },
});

export default OutputView;
