import { Badge, Receipt, Scheduler } from '../domain/index.js';

const BadgeService = Object.freeze({
  /**
   * 배지 이벤트의 기간입니다.
   * @readonly
   */
  EVENT_PERIOD: {
    year: 2023,
    month: 12,
  },

  /**
   * 총 가격에 따라 배지를 부여합니다.
   * @param {Receipt} receipt - 배지를 판별할 영수증입니다.
   * @returns {Badge | null} - 배지입니다.
   */
  getBadge(receipt) {
    const badgeEventScheduler = Scheduler.of();
    badgeEventScheduler.addEventMonth(
      BadgeService.EVENT_PERIOD.year,
      BadgeService.EVENT_PERIOD.month,
    );

    if (!badgeEventScheduler.isEventDate(receipt.getDate())) {
      return null;
    }

    const result = Badge.valueOf(receipt.getPrice().benefit);

    return result ? result.getName() : result;
  },
});

export default BadgeService;
