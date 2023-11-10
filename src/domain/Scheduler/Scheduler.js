import { isSameDate } from '../../utils/date/date.js';

class Scheduler {
  /**
   * 이벤트 일자가 담길 Set입니다.
   * @type {Date[]}
   */
  #eventDate = [];

  static of() {
    return new Scheduler();
  }

  /**
   * 이벤트 일정에 date가 존재하는지 확인합니다.
   * @param {Date} date - 이벤트 일정인지 확인할 일자입니다.
   * @returns {boolean} 이벤트 일자의 이벤트 진행 여부입니다.
   */
  isEventDate(date) {
    return this.#eventDate.some((day) => isSameDate(day, date));
  }

  /**
   * 이벤트 일정에 date를 추가합니다.
   * @param {Date} date - 이벤트 일정에 추가할 일자입니다.
   */
  addEventDate(date) {
    this.#eventDate.push(date);
  }

  /**
   * 이벤트 일정에 해당 기간을 추가합니다.
   * @param {Date} start 이벤트 시작일입니다.
   * @param {Date} end 이벤트 종료일입니다.
   */
  addEventPeriod(start, end) {
    const currentDate = new Date(start);
    while (currentDate <= end) {
      this.addEventDate(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  /**
   * 이벤트 일정에 해당 월을 추가합니다.
   * @param {Date} year 이벤트 년도입니다.
   * @param {Date} month 이벤트 월입니다.
   */
  addEventMonth(year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    this.addEventPeriod(startDate, endDate);
  }
}

export default Scheduler;
