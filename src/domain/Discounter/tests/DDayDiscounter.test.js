import Receipt from '../../Receipt/Receipt.js';
import DDayDiscounter from '../DDayDiscounter.js';

describe('DDayDiscounter 테스트', () => {
  /** @type {DDayDiscounter} */
  let dDayDiscounter;

  beforeEach(() => {
    dDayDiscounter = DDayDiscounter.of();
  });

  it.each([
    { date: '2023-12-01', discount: 1_000 },
    { date: '2023-12-11', discount: 2_000 },
    { date: '2023-12-21', discount: 3_000 },
    { date: '2023-12-25', discount: 3_400 },
  ])('크리스마스 디데이에 비례하여 할인한다.', ({ date, discount }) => {
    // given
    const receipt = Receipt.of(new Date(date));
    receipt.orderMany([{ name: '티본스테이크', quantity: 1 }]);

    // when
    dDayDiscounter.run(receipt);

    // then
    expect(receipt.getAdditionalDiscount()).toEqual([{ name: '크리스마스 디데이 할인', discount }]);
    expect(receipt.getPrice().cost).toBe(55_000);
    expect(receipt.getPrice().discount).toBe(discount);
  });

  it.each([{ date: '2023-12-26' }, { date: '2023-12-30' }, { date: '2024-01-01' }])(
    '크리스마스가 지나면 할인이 되지 않는다.',
    ({ date }) => {
      // given
      const receipt = Receipt.of(new Date(date));
      receipt.orderMany([{ name: '티본스테이크', quantity: 1 }]);

      // when
      dDayDiscounter.run(receipt);

      // then
      expect(receipt.getAdditionalDiscount()).toHaveLength(0);
    },
  );
});
