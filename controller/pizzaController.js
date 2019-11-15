class Controller {
    constructor(view, service, cartService, pizzaModel) {
        this.view = view;
        this.service = service;
        this.cartService = cartService;
        this.pizzaModel = pizzaModel;
        this.view.constructPizzas(this.handleDefaultPizzas, this.handlePriceCart);
        this.view.bindAddCustom(this.handlePriceCart);
        this.view.bindRadioSize(this.handleCustomPizzas);
        this.view.bindCheckIngredients(this.handleCustomPizzas);
    }

    handleDefaultPizzas = () => {
        return this.service.fetchDefaultPizzas();
    }

    handlePriceCart = (price) => {
        return this.cartService.totalPrice(price);
    }

    handleCustomPizzas = (size, selectedIngredients) => {
        return this.pizzaModel.calculatePrice(size, selectedIngredients);
    }
}