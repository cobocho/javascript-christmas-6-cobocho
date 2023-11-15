import DUMMY_INPUTS from '../../../constants/test-dummy.js';
import OrderTaker from '../OrderTaker.js';

describe('OrderTaker 테스트', () => {
  it.each([{ name: '파인애플피자' }, { name: '민트초코' }, { name: '솔의눈' }])(
    '`takeOrder` 호출 시 메뉴에 없는 메뉴 요청 시 에러가 발생한다.',
    ({ name }) => {
      // given & when
      const result = () => OrderTaker.takeOrder(name, 1);

      // then
      expect(result).toThrow(OrderTaker.ERROR_MESSAGES.invalidOrder);
    },
  );

  it.each([{ quantity: 0 }, { quantity: 0.5 }, { quantity: -1 }])(
    '`takeOrder` 호출 시 유효하지 않은 갯수 입력 시 에러가 발생한다.',
    ({ quantity }) => {
      // given & when
      const result = () => OrderTaker.takeOrder('아이스크림', quantity);

      // then
      expect(result).toThrow(OrderTaker.ERROR_MESSAGES.invalidOrder);
    },
  );

  it.each(DUMMY_INPUTS.withoutNumber)(
    '`giveaway` 호출 시 유효하지 않은 결제 금액 입력 시 에러가 발생한다.',
    ({ input }) => {
      // given & when
      const result = () => OrderTaker.giveaway(input);

      // then
      expect(result).toThrow(OrderTaker.ERROR_MESSAGES.notNumberPrice);
    },
  );
});
