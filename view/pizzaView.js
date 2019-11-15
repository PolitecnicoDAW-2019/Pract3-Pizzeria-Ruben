class View {
  constructor() {
    this.selectedIngredients = [];
  }

  DOM = {
    pizzaDiv: document.getElementById('pizzaDiv'),
    cart: document.getElementById('cart'),
    totalPrice: document.getElementById('totalPrice'),
    addCustom: document.getElementById('addCustom'),
    radioSize: document.getElementsByName('radioSizes'),
    checkIngredient: document.getElementsByName('checkIngredient')
  };

  constructPizzas = (handler, handlerPrice) => {
    const defaultPizzasPromise = handler();
    defaultPizzasPromise.then(myJson => {
      myJson.forEach(({ name, image, prices }) => {
        const h3 = document.createElement('h3');
        const img = document.createElement('img');
        const divP = document.createElement('div');
        const divB = document.createElement('div');
        this.addStyles(divP, img);
        h3.innerHTML = name;
        h3.align = 'center';

        prices.forEach(({ size, price }) => {
          const button = document.createElement('button');
          button.className = 'btn btn-outline-dark';
          button.name = 'default';
          button.style.margin = '5px';
          button.innerHTML = size + ' ' + price + '€';
          button.value = price;
          button.addEventListener('click', () => {
            this.addCart(name, size, price, handlerPrice);
          });
          divB.appendChild(button);
        });
        img.src = image;

        divP.appendChild(h3);
        divP.appendChild(img);
        divP.appendChild(document.createElement('br'));
        divP.appendChild(divB);
        this.DOM.pizzaDiv.appendChild(divP);
      });
    });
  };

  addStyles = (divP, img) => {
    divP.style.display = 'inline-block';
    divP.style.padding = '10px';
    divP.style.margin = '10px';
    divP.style.border = '3px solid black';
    divP.style.borderRadius = '34px';
    divP.style.backgroundColor = 'white';

    img.style.width = '140px';
    img.style.height = '140px';
    img.style.margin = '0 auto';
    img.style.display = 'block';
  };

  addCart = (name, size, price, handler) => {
    const cartChildren = this.DOM.cart.children;
    const arrayChildren = [...cartChildren];
    const currentPizza = arrayChildren.find(element => {
      return element.textContent.includes(name + '-' + size);
    });

    if (currentPizza && !currentPizza.textContent.includes('Custom')) {
      const childs = currentPizza.children;
      const currentQuantity = childs[1].textContent;
      childs[1].textContent = parseInt(currentQuantity) + 1;
    } else {
      const textNodeName = document.createTextNode(name + '-' + size);
      const textNodePrice = document.createTextNode(price + '€');
      const textNodeDelete = document.createTextNode('DELETE');
      const textNodeQuantity = document.createTextNode('1');
      const spanPrice = document.createElement('span');
      const quantity = document.createElement('span');
      const a = document.createElement('a');
      const li = document.createElement('li');

      spanPrice.className = 'badge badge-dark badge-pill';
      spanPrice.style.position = 'absolute';
      spanPrice.style.left = '188px';
      quantity.className = 'badge badge-dark badge-pill';
      quantity.style.position = 'absolute';
      quantity.style.left = '300px';
      li.className = 'list-group-item d-flex align-items-center';
      a.className = 'badge badge-danger';
      a.style.marginLeft = 'auto';
      a.href = '#';

      a.addEventListener('click', () => {
        this.removeCart(price, handler, li);
      });

      spanPrice.appendChild(textNodePrice);
      quantity.appendChild(textNodeQuantity);
      a.appendChild(textNodeDelete);
      li.appendChild(textNodeName);
      li.appendChild(spanPrice);
      li.appendChild(quantity);
      li.appendChild(a);
      this.DOM.cart.appendChild(li);
    }

    const total = handler(price);
    this.DOM.totalPrice.innerHTML = total + '€';
  };

  removeCart = (price, handler, li) => {
    if (parseInt(li.children[1].textContent) > 1) {
      li.children[1].textContent = parseInt(li.children[1].textContent) - 1;
    } else {
      li.parentNode.removeChild(li);
    }
    const total = handler(-price);
    this.DOM.totalPrice.innerHTML = total + '€';
  };

  bindAddCustom = handler => {
    this.DOM.addCustom.addEventListener('click', () => {
      const price = parseFloat(this.DOM.addCustom.value);
      const size = document.querySelector('input[name="radioSizes"]:checked')
        .value;
      const name = 'Custom';
      this.addCart(name, size, price, handler);

      this.DOM.checkIngredient.forEach(check => (check.checked = false));
      this.DOM.radioSize.forEach(radio => (radio.checked = false));

      this.DOM.addCustom.value = 0;
      this.DOM.addCustom.innerHTML = 'Agregar';
      this.selectedIngredients = [];
    });
  };

  bindRadioSize = handler => {
    this.DOM.radioSize.forEach(radio => {
      const size = radio.value;
      radio.addEventListener('change', () => {
        const price = handler(size, this.selectedIngredients);
        this.DOM.addCustom.value = price;
        this.DOM.addCustom.innerHTML = 'Agregar: ' + price + '€';
      });
    });
  };

  bindCheckIngredients = handler => {
    this.DOM.checkIngredient.forEach(checkBox => {
      checkBox.addEventListener('click', () => {
        const ingredients = this.selectedIngredients;
        !ingredients.includes(checkBox.value)
          ? this.selectedIngredients.push(checkBox.value)
          : (this.selectedIngredients = ingredients.filter(
              ingredient => ingredient !== checkBox.value
            ));

        const size = document.querySelector('input[name="radioSizes"]:checked')
          .value;
        const price = handler(size, this.selectedIngredients);
        this.DOM.addCustom.value = price;
        this.DOM.addCustom.innerHTML = 'Agregar: ' + price + '€';
      });
    });
  };
}
