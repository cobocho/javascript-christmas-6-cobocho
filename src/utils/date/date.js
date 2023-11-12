/**
 * 입력된 Date들이 같은 년도인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 년도의 동일 여부입니다.
 */
export const isSameYear = (date1, date2) => {
  const originalDateYear = date1.getFullYear();
  const preparedDateYear = date2.getFullYear();

  return originalDateYear === preparedDateYear;
};

/**
 * 입력된 Date들이 같은 월인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 월의 동일 여부입니다.
 */
export const isSameMonth = (date1, date2) => {
  const originalDateMonth = date1.getMonth();
  const preparedDateMonth = date2.getMonth();

  return originalDateMonth === preparedDateMonth;
};

/**
 * 입력된 Date들이 같은 일인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 월의 동일 여부입니다.
 */
export const isSameDay = (date1, date2) => {
  const originalDateDay = date1.getDate();
  const preparedDateDay = date2.getDate();

  return originalDateDay === preparedDateDay;
};

/**
 * 입력된 Date들이 같은 날짜인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 날짜의 동일 여부입니다.
 */
export const isSameDate = (date1, date2) => {
  const sameYear = isSameYear(date1, date2);
  const sameMonth = isSameMonth(date1, date2);
  const sameDate = isSameDay(date1, date2);

  return sameYear && sameMonth && sameDate;
};

export const dateStringGenerator = ({ year, month, day }) => {
  const parsedMonth = month >= 10 ? month : `0${month}`;
  const parsedDay = day >= 10 ? day : `0${day}`;

  return `${year}-${parsedMonth}-${parsedDay}`;
};

/**
 * 입력된 Date가 평일인지 확인합니다.
 * @param {Date} date 확인할 날짜입니다.
 * @returns {boolean} 날짜의 평일 여부입니다.
 */
export const isWeekday = (date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 0 && dayOfWeek <= 4;
};
