import Badge from '../Badge.js';

describe('Badge 테스트', () => {
  it.each([{ price: 0 }, { price: 2_500 }, { price: 4_999 }])(
    '5,000원 이하일시 배지가 부여되지 않는다.',
    ({ price }) => {
      // given & when
      const badge = Badge.valueOf(price);

      // then
      expect(badge).toBeNull();
    },
  );

  it.each([{ price: 5_000 }, { price: 7_500 }, { price: 9_999 }])(
    '5,000원 이상 10,000원 미만일시 별 배지가 부여된다.',
    ({ price }) => {
      // given & when
      const badge = Badge.valueOf(price);

      // then
      expect(badge.getName()).toBe('별');
    },
  );

  it.each([{ price: 10_000 }, { price: 15_000 }, { price: 19_999 }])(
    '10,000원 이상 20,000원 미만일시 트리 배지가 부여된다.',
    ({ price }) => {
      // given & when
      const badge = Badge.valueOf(price);

      // then
      expect(badge.getName()).toBe('트리');
    },
  );

  it.each([{ price: 20_000 }, { price: 99_999 }])(
    '20,000원 이상일시 산타 배지가 부여된다.',
    ({ price }) => {
      // given & when
      const badge = Badge.valueOf(price);

      // then
      expect(badge.getName()).toBe('산타');
    },
  );
});
