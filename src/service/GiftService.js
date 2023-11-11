import { Receipt } from '../domain/index.js';

const GiftService = Object.freeze({
  /**
   * 총 가격에 따라 증정품을 부여합니다.
   * @param {Receipt} receipt - 증정품을 기록할 영수증입니다.
   */
  giveaway(receipt) {
    receipt.receiveGiveaway();
  },
});

export default GiftService;
