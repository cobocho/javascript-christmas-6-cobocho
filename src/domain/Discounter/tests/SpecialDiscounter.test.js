import Receipt from '../../Receipt/Receipt.js';
import SpecialDiscounter from '../SpecialDiscounter.js';

describe('SpecialDiscounter 테스트', () => {
  /** @type {SpecialDiscounter} */
  let specialDiscounter;

  beforeEach(() => {
    specialDiscounter = SpecialDiscounter.of();
  });

  it.each([
    { date: '2023-12-03' },
    { date: '2023-12-10' },
    { date: '2023-12-17' },
    { date: '2023-12-24' },
    { date: '2023-12-25' },
    { date: '2023-12-31' },
  ])(`방문일이 이벤트일이면 ${SpecialDiscounter.DISCOUNT_AMOUNT}원 할인한다.`, ({ date }) => {
    // given
    const receipt = Receipt.of(new Date(date));
    receipt.orderMany([{ name: '티본스테이크', quantity: 1 }]);

    // when
    const result = specialDiscounter.run(receipt);

    // then
    expect(result).toEqual({
      name: SpecialDiscounter.EVENT_NAME,
      benefit: 1_000,
    });
  });

  it.each([
    { date: '2023-12-01' },
    { date: '2023-12-02' },
    { date: '2023-12-04' },
    { date: '2023-12-05' },
    { date: '2023-12-06' },
    { date: '2023-12-07' },
    { date: '2023-12-08' },
    { date: '2023-12-09' },
    { date: '2023-12-11' },
    { date: '2023-12-12' },
    { date: '2023-12-13' },
    { date: '2023-12-14' },
    { date: '2023-12-15' },
    { date: '2023-12-16' },
    { date: '2023-12-18' },
    { date: '2023-12-19' },
    { date: '2023-12-20' },
    { date: '2023-12-21' },
    { date: '2023-12-22' },
    { date: '2023-12-23' },
    { date: '2023-12-26' },
    { date: '2023-12-27' },
    { date: '2023-12-28' },
    { date: '2023-12-29' },
    { date: '2023-12-30' },
  ])('방문일이 이벤트일이 아니면 할인하지 않는다.', ({ date }) => {
    // given
    const receipt = Receipt.of(new Date(date));
    receipt.orderMany([{ name: '티본스테이크', quantity: 1 }]);

    // when
    const result = specialDiscounter.run(receipt);

    // then
    expect(result).toBeNull();
  });
});
