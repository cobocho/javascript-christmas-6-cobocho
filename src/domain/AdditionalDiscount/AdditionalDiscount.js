class AdditionalDiscount {
  /**
   * 부가요소의 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * 부가요소의 가격입니다.
   * @type {number}
   */
  #discount;

  constructor(name, discount) {
    this.#name = name;
    this.#discount = discount;
  }

  static of(name, discount) {
    return new AdditionalDiscount(name, discount);
  }

  getName() {
    return this.#name;
  }

  getDiscount() {
    return this.#discount;
  }
}

export default AdditionalDiscount;
