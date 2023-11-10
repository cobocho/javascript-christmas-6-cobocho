import Food from './Food.js';

class Appetizer extends Food {
  static of(name, price) {
    return new Appetizer(name, price);
  }
}

export default Appetizer;
