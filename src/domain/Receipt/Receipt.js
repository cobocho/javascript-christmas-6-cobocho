import Food from '../Food/Food.js';
import OrderDetail from '../OrderDetail/OrderDetail.js';
import OrderTaker from '../OrderTaker/OrderTaker.js';

/** */

class Receipt {
  /**
   * @type {OrderDetail}
   */
  #orderDetails = [];

  static of() {
    return new Receipt();
  }

  /**
   * 주문을 하여 주문 내역에 반영합니다.
   * @param {string} name 주문한 메뉴의 이름입니다.
   * @param {number} quantity 주문한 메뉴의 갯수입니다.
   */
  order(name, quantity) {
    const orderTaker = OrderTaker.of();
    const orderDetail = orderTaker.takeOrder(name, quantity);

    this.#orderDetails.push(orderDetail);
  }

  /**
   * 영수증의 모든 메뉴를 반환합니다.
   * @returns {Food[]} 영수증의 모든 메뉴입니다.
   */
  getAllFoods() {
    return Array.from(this.#orderDetails, (orderDetail) => orderDetail.getFoods()).flat();
  }

  /**
   * 영수증의 가격 정보를 반환합니다.
   * @returns {import('../../types/price.js').ReceiptPriceInfo} 영수증의 가격 정보입니다.
   */
  getPrice() {
    return this.#orderDetails.reduce(
      (priceInfo, orderDetail) => ({
        cost: priceInfo.cost + orderDetail.getPrice().cost,
        discount: priceInfo.discount,
        benefit: priceInfo.benefit,
        payment: priceInfo.payment + orderDetail.getPrice().payment,
      }),
      { cost: 0, discount: 0, benefit: 0, payment: 0 },
    );
  }
}

export default Receipt;
