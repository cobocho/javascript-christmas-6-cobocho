import { Receipt, Scheduler } from '../domain/index.js';

const GiftService = Object.freeze({
  /**
   * 증정 이벤트의 기간입니다.
   * @readonly
   */
  EVENT_PERIOD: {
    year: 2023,
    month: 12,
  },

  /**
   * 총 가격에 따라 증정품을 부여합니다.
   * @param {Receipt} receipt - 증정품을 기록할 영수증입니다.
   */
  giveaway(receipt) {
    const giftEventScheduler = Scheduler.of();
    giftEventScheduler.addEventMonth(GiftService.EVENT_PERIOD.year, GiftService.EVENT_PERIOD.month);
    if (giftEventScheduler.isEventDate(receipt.getDate())) {
      receipt.receiveGiveaway();
    }
  },
});

export default GiftService;
