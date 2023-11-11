import { Receipt, Scheduler } from '../domain/index.js';

const GiftService = Object.freeze({
  /**
   * 총 가격에 따라 증정품을 부여합니다.
   * @param {Receipt} receipt - 증정품을 기록할 영수증입니다.
   */
  giveaway(receipt) {
    const giftEventScheduler = Scheduler.of();
    giftEventScheduler.addEventMonth(2023, 12);
    if (giftEventScheduler.isEventDate(receipt.getDate())) {
      receipt.receiveGiveaway();
    }
  },
});

export default GiftService;
