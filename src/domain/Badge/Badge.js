class Badge {
  /**
   * 혜택 금액별 배지입니다.
   */
  static #BADGE_LIST = [
    { badge: new Badge('별'), minimumPrice: 5_000 },
    { badge: new Badge('트리'), minimumPrice: 10_000 },
    { badge: new Badge('산타'), minimumPrice: 20_000 },
  ].sort((badge1, badge2) => badge2.minimumPrice - badge1.minimumPrice);

  /**
   * 배지의 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * @param {string} name 배지의 이름입니다.
   */
  constructor(name) {
    this.#name = name;
  }

  /**
   * 혜택 금액에 따른 배지를 반환합니다.
   * @param {number} price 혜택 금액입니다.
   * @returns {Badge | null} 금액에 따른 배지입니다.
   */
  static valueOf(price) {
    const result = Badge.#BADGE_LIST.find((badge) => badge.minimumPrice <= price);
    return result ? result.badge : null;
  }

  /**
   * 배지의 이름을 반환합니다.
   * @returns {string} 배지의 이름입니다.
   */
  getName() {
    return this.#name;
  }
}

export default Badge;
