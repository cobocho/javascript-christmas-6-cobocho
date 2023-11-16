import { Console } from '@woowacourse/mission-utils';

import QUERIES from './constants/queries.js';

const InputView = Object.freeze({
  /**
   * 사용자에게 입력값을 받아옵니다.
   * @param {string} query - 사용자에게 질문할 쿼리입니다.
   * @returns {Promise<string>} 사용자의 입력값입니다.
   */
  async read(query) {
    const input = await Console.readLineAsync(query);

    return input;
  },

  /**
   * 사용자에게 방문 일자를 받아옵니다.
   * @returns {Promise<string | null>} 사용자의 방문일입니다.
   */
  async readVisitDate() {
    const input = await this.read(QUERIES.visitDate);

    return input || null;
  },

  /**
   * 사용자에게 메뉴를 받아옵니다.
   * @returns {Promise<string>} 사용자의 주문 메뉴입니다.
   */
  async readOrderMenus() {
    const input = await this.read(QUERIES.orderMenus);

    return input;
  },
});

export default InputView;
