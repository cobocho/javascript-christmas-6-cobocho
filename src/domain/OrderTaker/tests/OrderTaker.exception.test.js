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
});
