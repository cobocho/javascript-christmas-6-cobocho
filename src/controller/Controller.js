import InputView from '../InputView.js';
import OutputView from '../OutputView.js';
import { OrderService } from '../service/index.js';

class Controller {
  /**
   * 입출력을 담당하는 View입니다.
   */
  #view = {
    input: InputView,
    output: OutputView,
  };

  /**
   * 비즈니스 로직을 담당하는 Service입니다.
   */
  #service = {
    order: OrderService,
  };

  async start() {
    this.#printStartComment();
    let receipt;
    await this.#handleError(async () => {
      const date = await this.#readVisitDate();
      receipt = this.#service.order.publishReceipt(date);
    });
  }

  async #readVisitDate() {
    const date = await this.#view.input.readVisitDate();
    return date;
  }

  #printStartComment() {
    this.#view.output.startComment();
  }

  /**
   * 해당 콜백 함수 실행 중 에러가 발생할 시 함수를 다시 시작합니다.
   * @param {Function} action 에러 핸들링 대상이 될 함수입니다.
   */
  async #handleError(action) {
    try {
      await action();
    } catch ({ message }) {
      this.#view.output.error(message);
      await this.#handleError(action);
    }
  }
}

export default Controller;
