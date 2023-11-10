import { Receipt } from '../domain/index.js';

const OrderService = Object.freeze({
  /**
   * 영수증을 발행합니다.
   * @param {Date} date 2023년의 12월 내 발행일입니다.
   * @returns {Receipt} 발행된 영수증입니다.
   */
  publishReceipt(date) {
    const receiptDate = new Date(`2023-12-${date}`);
    return Receipt.of(receiptDate);
  },
});

export default OrderService;
