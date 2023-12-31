import { GiftService, OrderService, DiscountService, BadgeService } from '../service/index.js';

import InputView from '../InputView.js';
import OutputView from '../OutputView.js';

import { Badge, Receipt } from '../domain/index.js';

import SYSTEM from '../constants/system.js';

/**
 * @typedef {import('../service/DiscountService.js').BenefitResult} BenefitResult
 */

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
    gift: GiftService,
    discount: DiscountService,
    badge: BadgeService,
  };

  /**
   * 할인 계산 프로그램을 시작합니다.
   */
  async start() {
    this.#printStartComment();

    const receipt = await this.#createReceipt();
    await this.#processOrder(receipt);

    const benefits = this.#processAllEvents(receipt);
    this.#printBenefits(benefits);
    this.#printBenefitAmount(receipt);
    this.#printPaymentAmount(receipt);

    const badge = this.#processBadgeEvent(receipt);
    this.#printBadge(badge);
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
    this.#printCostPrice(receipt);
  }

  /**
   * 모든 이벤트를 진행합니다.
   * @param {Receipt} receipt - 혜택을 기록할 영수증입니다.
   * @returns {BenefitResult[]} - 혜택 결과입니다.
   */
  #processAllEvents(receipt) {
    const giftResult = this.#processGiveaway(receipt);
    const dDayResult = this.#processDDayDiscount(receipt);
    const dayOfWeekResult = this.#processDayOfWeekDiscount(receipt);
    const specialResult = this.#processSpecialDiscount(receipt);

    const benefits = [dDayResult, dayOfWeekResult, specialResult, giftResult].filter(Boolean);

    return benefits;
  }

  /**
   * 증정품을 부여합니다.
   * @param {Receipt} receipt - 증정품을 기록할 영수증입니다.
   * @returns {BenefitResult | null} - 증정 결과입니다.
   */
  #processGiveaway(receipt) {
    const giftResult = this.#service.gift.giveaway(receipt);

    this.#printGifts(receipt);

    return giftResult;
  }

  /**
   * 크리스마스 디데이 할인을 진행합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {BenefitResult | null} - 할인 결과입니다.
   */
  #processDDayDiscount(receipt) {
    return this.#service.discount.dDay(receipt);
  }

  /**
   * 요일 할인을 진행합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {BenefitResult | null} - 할인 결과입니다.
   */
  #processDayOfWeekDiscount(receipt) {
    return this.#service.discount.dayOfWeek(receipt);
  }

  /**
   * 특별 할인을 진행합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {BenefitResult | null} - 할인 결과입니다.
   */
  #processSpecialDiscount(receipt) {
    return this.#service.discount.special(receipt);
  }

  /**
   * 배지 이벤트를 진행합니다.
   * @param {Receipt} receipt - 배지를 얻을 영수증입니다.
   * @returns {Badge | null} - 배지입니다.
   */
  #processBadgeEvent(receipt) {
    return this.#service.badge.getBadge(receipt);
  }

  /**
   * 방문일을 입력받습니다.
   * @returns {Promise<string | null>} 방문일입니다.
   */
  async #readVisitDate() {
    const date = await this.#view.input.readVisitDate();
    return date;
  }

  /**
   * 주문할 메뉴를 입력받습니다.
   * @returns {Promise<{name: string, quantity: number}[]>} 주문 메뉴 목록입니다.
   */
  async #readOrderMenus() {
    const menus = (await this.#view.input.readOrderMenus()).split(SYSTEM.menuSeparator);

    const orders = Array.from(menus, (menu) => {
      const [name, quantity] = menu.split(SYSTEM.priceSeparator);
      return { name, quantity: Number(quantity) };
    });

    return orders;
  }

  /**
   * 시작 문구를 출력합니다.
   */
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
   * 증정 내역을 출력합니다.
   * @param {Receipt} receipt - 출력할 영수증입니다.
   */
  #printGifts(receipt) {
    const gifts = Array.from(receipt.getGifts(), (gift) => gift.toString());

    this.#view.output.gifts(gifts);
  }

  /**
   * 혜택 내역을 출력합니다.
   * @param {BenefitResult[] | []} benefitResults - 출력할 혜택입니다.
   */
  #printBenefits(benefitResults) {
    this.#view.output.benefits(benefitResults);
  }

  /**
   * 총혜택금액을 출력합니다.
   * @param {Receipt} receipt - 출력할 영수증입니다.
   */
  #printBenefitAmount(receipt) {
    const benefitAmount = receipt.getPrice().benefit;

    this.#view.output.benefitAmount(benefitAmount);
  }

  /**
   * 할인 후 예상 결제 금액을 출력합니다.
   * @param {Receipt} receipt - 출력할 영수증입니다.
   */
  #printPaymentAmount(receipt) {
    const paymentAmount = receipt.getPrice().payment;

    this.#view.output.paymentAmount(paymentAmount);
  }

  /**
   * 배지를 출력합니다.
   * @param {Badge} badge - 출력할 배지입니다.
   */
  #printBadge(badge) {
    this.#view.output.badge(badge);
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
