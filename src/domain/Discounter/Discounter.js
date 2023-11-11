import Receipt from '../Receipt/Receipt.js';

class Discounter {
  /**
   * 할인의 최소 금액 조건입니다.
   * @readonly
   */
  static MINIMUM_COST = 10_000;

  /**
   * 할인의 이름입니다.
   * @abstract
   * @protected
   */
  _name;

  /**
   * @param {string} name - 할인의 이름입니다.
   */
  constructor(name) {
    this._name = name;
  }

  /**
   * 할인을 시작합니다.
   * @param {Receipt} receipt - 할인을 실행할 영수증입니다.
   */
  run(receipt) {
    if (!this.#isMeetRequirement(receipt)) {
      return;
    }
    this._discount(receipt);
  }

  /**
   * 할인의 공통 실행 조건을 체크합니다.
   * @param {Receipt} receipt - 할인을 실행할 영수증입니다.
   * @returns {boolean} - 할인 조건 충족 여부입니다.
   */
  #isMeetRequirement(receipt) {
    return receipt.getPrice().cost >= Discounter.MINIMUM_COST;
  }

  /**
   * 할인을 적용합니다.
   * @abstract
   * @protected
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   */
  // 추상 메서드를 위한 eslint off
  // eslint-disable-next-line no-unused-vars
  _discount(receipt) {}
}

export default Discounter;
