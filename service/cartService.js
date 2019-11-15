class CartService {
  constructor() {
    this.total = 0;
  }
  totalPrice = price => {
    this.total += price;
    return this.total.toFixed(2);
  };
}
