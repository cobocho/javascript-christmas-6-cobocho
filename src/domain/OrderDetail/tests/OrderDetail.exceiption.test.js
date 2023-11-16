import DUMMY_INPUTS from '../../../constants/test-dummy.js';
import Food from '../../Food/Food.js';
import OrderDetail from '../OrderDetail.js';

describe('OrderDetail 예외 테스트', () => {
  it.each(DUMMY_INPUTS.withoutString)(
    '`foodName`이 문자열이 아니면 에러를 발생시킨다.',
    ({ input: foodName }) => {
      // given & when
      const result = () => OrderDetail.of({ foodName, foodCategory: Food, quantity: 1, price: 1 });

      // then
      expect(result).toThrow(OrderDetail.ERROR_MESSAGES.notStringOrderDetailName);
    },
  );

  it('`foodCategory`가 `Food`의 서브 클래스가 아니면 에러를 발생시킨다.', () => {
    // given
    const foodCategory = class NotFood {};

    // when
    const result = () => OrderDetail.of({ foodName: '음식', foodCategory, quantity: 1, price: 1 });

    // then
    expect(result).toThrow(OrderDetail.ERROR_MESSAGES.invalidCategory);
  });
});
