import Food from './Food.js';

class Dessert extends Food {
  static of(name, price) {
    return new Dessert(name, price);
  }
}

export default Dessert;
