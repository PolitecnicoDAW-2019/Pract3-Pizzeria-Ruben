class Pizza {
    constructor() {
        this.sizes = [{ size: "small", price: 3, multiply: 1 }, { size: "medium", price: 5, multiply: 1.1 }, { size: "big", price: 7, multiply: 1.2 }];
        this.ingredients = [{ ingredient: "cheese", price: 0.20 }, { ingredient: "bacon", price: 0.30 }, { ingredient: "mushrooms", price: 0.30 }, { ingredient: "olives", price: 0.20 }, { ingredient: "pineapple", price: 0.40 }, { ingredient: "tuna", price: 0.30 }];
    }

    calculatePrice = (sizeParameter, ingredientsParameter) => {
        const requestedSize = this.sizes.find(({ size }) => size === sizeParameter);
        const ingredientsPrice = this.ingredients.reduce((accumulator, { ingredient, price }) => {
            if (ingredientsParameter.includes(ingredient)) {
                accumulator += price;
            }
            return accumulator;
        }, 0);

        return (ingredientsPrice * requestedSize.multiply) + requestedSize.price;
    }
}