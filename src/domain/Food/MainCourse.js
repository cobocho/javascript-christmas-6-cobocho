import Food from './Food.js';

class MainCourse extends Food {
  static of(name, price) {
    return new MainCourse(name, price);
  }
}

export default MainCourse;
