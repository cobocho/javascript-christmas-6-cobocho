import SYSTEM from './system.js';

const QUERIES = Object.freeze({
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  orderMenus: `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타${SYSTEM.menuSeparator}2,레드와인${SYSTEM.menuSeparator}1,초코케이크${SYSTEM.menuSeparator}1)`,
});

export default QUERIES;
