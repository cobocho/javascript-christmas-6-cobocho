import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/messages.js';

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
   * @param {string} message - 에러의 메세지입니다.
   * 에러를 출력합니다.
   */
  error(message) {
    this.print(`\n${message}\n`);
  },
});

export default OutputView;
