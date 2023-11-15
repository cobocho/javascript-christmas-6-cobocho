/**
 * 배열에 constructor의 instance가 아닌 값이 존재하는지 판별합니다.
 * @param {unknown[]} instances 체크할 배열입니다.
 * @param {Function} constructor 체크할 클래스입니다.
 * @returns {boolean} instance가 아닌 값의 존재여부입니다.
 */
export const invalidInstanceElement = (instances, constructor) => {
  const result = instances.some((instance) => !(instance instanceof constructor));
  return result;
};

/**
 *  배열에 중복된 값이 존재하는지 판별합니다.
 * @param {any[]} array 체크할 배열입니다.
 * @returns {boolean} 중복여부입니다.
 */
export const isDuplicated = (array) => new Set(array).size !== array.length;

/**
 *  값이 범위를 초과하였는지 판별합니다.
 * @param {number} value 체크할 값입니다.
 * @param {{ min: number, max: number}} range 유효 범위입니다.
 * @returns {boolean} 범위 초과 여부입니다.
 */
export const isOutOfRange = (value, { min, max }) => value < min || value > max;

/**
 * 값이 특정 값으로 정확이 나누어 떨어지는지 판별합니다.
 * @param {number} value 체크할 값입니다.
 * @param {number} dividedValue 나눌 값입니다.
 * @returns {boolean} 나머지의 존재유무입니다.
 */
export const isIndivisible = (value, dividedValue) => dividedValue % value !== 0;

/**
 * 유효한 Date 객체인지 판별합니다.
 * @param {Date} date 판별할 Date 객체입니다.
 * @returns {boolean} Date의 유효성 여부입니다.
 */
export const isInvalidDate = (date) => Number.isNaN(date.valueOf());

/**
 * 문자열이 공백인지 판별합니다.
 * @param {string} value 체크할 문자열입니다.
 * @returns {boolean} 공백 여부입니다.
 */
export const isBlank = (value) => value.trim().length === 0;

/**
 * 해당 클래스가 특정 클래스의 서브클래스인지 판별합니다.
 * @param {Function} subClass 체크할 서브클래스입니다.
 * @param {Function} superClass 체크할 슈퍼클래스입니다.
 * @returns {boolean} 상속 여부입니다.
 */
export const isSubClass = (subClass, superClass) => {
  const superPrototype = superClass.prototype;
  let targetPrototype = subClass.prototype;
  do {
    if (targetPrototype === superPrototype) return true;
    targetPrototype = Object.getPrototypeOf(targetPrototype);
  } while (targetPrototype);
  return false;
};
