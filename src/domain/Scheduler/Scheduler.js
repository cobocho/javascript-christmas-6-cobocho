import { isSameDate } from '../../utils/date/date.js';
import { isInvalidDate, isOutOfRange } from '../../utils/validator/validator.js';

import ApplicationError from '../../exceptions/ApplicationError.js';

class Scheduler {
  /**
   * 스케쥴러의 날짜 제한입니다.
   * @readonly
   */
  static DATE_LIMIT = {
    minYear: 2000,
    maxYear: 2099,
  };

  /**
   * 스케쥴러의 에러 메세지입니다.
   * @readonly
   */
  static ERROR_MESSAGES = {
    invalidDate: '유효하지 않은 날짜입니다!',
    invalidPeriod: '시작일을 종료일보다 이전으로 설정해주세요!!',
  };

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
    this.#validateDate(date);
    return this.#eventDate.some((day) => isSameDate(day, date));
  }

  /**
   * 이벤트 일정에 date를 추가합니다.
   * @param {Date} date - 이벤트 일정에 추가할 일자입니다.
   */
  addEventDate(date) {
    this.#validateDate(date);
    this.#eventDate.push(date);
  }

  /**
   * 이벤트 일정에 해당 기간을 추가합니다.
   * @param {Date} start 이벤트 시작일입니다.
   * @param {Date} end 이벤트 종료일입니다.
   */
  addEventPeriod(start, end) {
    this.#validatePeriod(start, end);
    const currentDate = new Date(start);

    while (currentDate <= end) {
      this.addEventDate(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  #validatePeriod(start, end) {
    this.#validateDate(start);
    this.#validateDate(end);

    if (end < start) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidPeriod);
    }
  }

  /**
   * 이벤트 일정에 해당 월을 추가합니다.
   * @param {Date} year 이벤트 년도입니다.
   * @param {Date} month 이벤트 월입니다.
   */
  addEventMonth(year, month) {
    this.#validateEventMonth(year, month);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    this.addEventPeriod(startDate, endDate);
  }

  #validateDate(date) {
    if (isInvalidDate(date)) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidDate);
    }
  }

  #validateEventMonth(year, month) {
    if (
      isOutOfRange(year, { min: Scheduler.DATE_LIMIT.minYear, max: Scheduler.DATE_LIMIT.maxYear })
    ) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidDate);
    }
    const january = 1;
    const december = 12;
    if (isOutOfRange(month, { min: january, max: december })) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidDate);
    }
  }
}

export default Scheduler;
