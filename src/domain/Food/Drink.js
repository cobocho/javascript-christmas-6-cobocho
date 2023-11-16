import Food from './Food.js';

class Drink extends Food {
  static of(name, price) {
    return new Drink(name, price);
  }
}

export default Drink;
