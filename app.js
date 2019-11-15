const service = new Service();
const view = new View();
const cartService = new CartService();
const pizzaModel = new Pizza();
new Controller(view, service, cartService, pizzaModel);