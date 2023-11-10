import InputView from '../InputView.js';
import OutputView from '../OutputView.js';
import SYSTEM from '../constants/system.js';
import { Receipt } from '../domain/index.js';
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
    const receipt = await this.#createReceipt();
    await this.#processOrder(receipt);
    this.#printCostPrice(receipt);
  }

  /**
   * 방문 일자를 기록한 영수증을 발행합니다.
   * @returns {Promise<Receipt>} - 발행된 영수증입니다.
   */
  async #createReceipt() {
    let receipt;
    await this.#handleError(async () => {
      const date = await this.#readVisitDate();
      receipt = this.#service.order.publishReceipt(date);
    });
    return receipt;
  }

  /**
   * 메뉴를 주문합니다.
   * @param {Receipt} receipt - 주문을 기록할 영수증입니다.
   */
  async #processOrder(receipt) {
    await this.#handleError(async () => {
      const orders = await this.#readOrderMenus();
      this.#service.order.orderFoods(receipt, orders);
    });
    this.#printOrders(receipt);
  }

  async #readVisitDate() {
    const date = await this.#view.input.readVisitDate();
    return date;
  }

  async #readOrderMenus() {
    const menus = (await this.#view.input.readOrderMenus()).split(SYSTEM.menuSeparator);
    const orders = Array.from(menus, (menu) => {
      const [name, quantity] = menu.split(SYSTEM.priceSeparator);
      return { name, quantity: Number(quantity) };
    });

    return orders;
  }

  #printStartComment() {
    this.#view.output.startComment();
  }

  /**
   * 주문 내역을 출력합니다.
   * @param {Receipt} receipt - 출력할 영수증입니다.
   */
  #printOrders(receipt) {
    const orders = Array.from(receipt.getOrderDetails(), (order) => order.toString());
    this.#view.output.preview();
    this.#view.output.orders(orders);
  }

  /**
   * 주문 전 총가격을 출력합니다.
   * @param {Receipt} receipt - 출력할 영수증입니다.
   */
  #printCostPrice(receipt) {
    const { cost } = receipt.getPrice();
    this.#view.output.costPrice(cost);
  }

  /**
   * 해당 콜백 함수 실행 중 에러가 발생할 시 함수를 다시 시작합니다.
   * @param {Function} action - 에러 핸들링 대상이 될 함수입니다.
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
