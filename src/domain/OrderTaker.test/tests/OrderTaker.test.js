import { Appetizer, Dessert, Drink, MainCourse } from '../../Food/index.js';
import OrderDetail from '../../OrderDetail/OrderDetail.js';
import FoodProvider from '../OrderTaker.js';

describe('FoodProvider 테스트', () => {
  /** @type {FoodProvider} */
  let foodProvider;

  beforeEach(() => {
    foodProvider = FoodProvider.of();
  });

  it.each([
    { name: '양송이수프', category: Appetizer, price: 6_000 },
    { name: '타파스', category: Appetizer, price: 5_500 },
    { name: '시저샐러드', category: Appetizer, price: 8_000 },
    { name: '티본스테이크', category: MainCourse, price: 55_000 },
    { name: '바비큐립', category: MainCourse, price: 54_000 },
    { name: '해산물파스타', category: MainCourse, price: 35_000 },
    { name: '크리스마스파스타', category: MainCourse, price: 25_000 },
    { name: '초코케이크', category: Dessert, price: 15_000 },
    { name: '아이스크림', category: Dessert, price: 5_000 },
    { name: '제로콜라', category: Drink, price: 3_000 },
    { name: '레드와인', category: Drink, price: 60_000 },
    { name: '샴페인', category: Drink, price: 25_000 },
  ])(
    '`receiveFoods` 호출 시 주문 내역을 반환한다. (메뉴: $name, 가격: $price, 카테고리: $category.name)',
    ({ name, category, price }) => {
      // given & when
      const result = foodProvider.receiveFoods(name, 1);

      expect(result).toBeInstanceOf(OrderDetail);
      expect(result.getPrice()).toEqual({ cost: price, discount: 0, payment: price });
      result.getFoods().forEach((food) => expect(food).toBeInstanceOf(category));
    },
  );
});
