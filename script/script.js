class Product{
    // title;
    // price;
    // stock;
    // description;
    // imageUrl;

    constructor(title, price, stock, description, imageUrl){
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId) {
      this.hookId = renderHookId;
    }
  
    createRootElement(tag, cssClasses, attributes) {
      const rootElement = document.createElement(tag);
      if (cssClasses) {
        rootElement.className = cssClasses;
      }
      if (attributes && attributes.length > 0) {
        for (const attr of attributes) {
          rootElement.setAttribute(attr.name, attr.value);
        }
      } 
      document.getElementById(this.hookId).append(rootElement);
      return rootElement;
    }
  }

class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce(
            (preValue, curItem) => preValue + curItem.price,
            0
        );
        return sum;
    }

    get cartItems(){
        return this.items;
    }

    constructor(renderHookId) {
        super(renderHookId);
    }
    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    removeProduct(product){
        
        const updatedItems = [...this.items];
        console.log(updatedItems);
        if (updatedItems.includes(product)) {
            updatedItems.pop(product);
            this.cartItems = updatedItems;
            alert(JSON.stringify(product.title) + " deleted from cart");
        }
        else{
            alert(JSON.stringify(product.title) + " is not in cart");
        }
    }
    
    render() {
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
          <h2 class = totalAmount>Total: \$${0}</h2>
          <h2>Items in Cart: <span id= "number">0</span></h2>
          <button>Order Now!</button>
        `;
        this.totalOutput = cartEl.querySelector('.totalAmount');
      }


} 
 

class ProductItem extends Component {
    constructor(product, renderHookId){
        super(renderHookId);
        this.product = product; 
    }

    addToCart () {
        ProductPage.addProductToCart(this.product);
        alert(JSON.stringify(this.product.title) + " added to cart");
        // cart.addProduct();
    } 
    
    removeFromCart () {
        ProductPage.removeProductFromCart(this.product);  
    }

    render() {
        const prodEl = this.createRootElement ('li', 'product-item');
        prodEl.innerHTML = `
            <div class = "pro">
                <img src ="${this.product.imageUrl}" alt= "${this.product.title}">
                <div class = "product-items_content">
                    <h2>${this.product.title}</h2>
                    <p>${this.product.description}</p>
                    <h3>\$${this.product.price}</h3>
                    <h3>${this.product.stock}</h3>
                    
                    <button>Add to Cart</button>
                    <button class ="del">Delete</button>

                </div>
            </div>
        `; 
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this))
        const deleteButton = prodEl.querySelector('.del');
        deleteButton.addEventListener('click', this.removeFromCart.bind(this))
        addCartButton.addEventListener('click', ()=>{
            displayNumberOfItems();
        })
        deleteButton.addEventListener('click', displayNumberOfItems);
    }
}



class ProductList extends Component {
    
    products = [
        new Product(
           'Mobile Phone',
           999.99,
           'Stock: Avaliable',
           'An IPhone 12 Pro',
           'img/mobilephone.jpg',
        ),
        new Product(
            'Laptop',
            1320.00,
            'Stock: Avaliable',
            'HP Pavilion x360 Laptop touch - 14-dw0097nr',
            'img/laptop.png',
         ),
        new Product(
            'Television',
            250.00,
            'Stock: Avaliable',
            'TCL andriod TV S6500 series',
            'img/tv.jpg',
        ),
        new Product(
            'Projector',
            999.99,
            'Stock: Avaliable',
            'An epson Home Cinema 2250 3LCD Full HD 1080p Projector',
            'img/projector.jpg',
        ),
        new Product(
            'Printer',
            129.99,
            'Stock: Avaliable',
            'HP DeskJet 2320 All-in-One Printer',
            'img/printer.png',
         ),
    ]

    constructor(renderHookId) {
        super(renderHookId);
    }
    render() {
        this.createRootElement('ul', 'product-list', [
          new ElementAttribute('id', 'prod-list')
        ]);
        for (const prod of this.products) {
          const productItem = new ProductItem(prod, 'prod-list');
          productItem.render();
        }
    }
}

class Shop {
    render() {
      this.cart = new ShoppingCart('productPage');
      this.cart.render();
      const productList = new ProductList('productPage');
      productList.render();
    }
  }

class ProductPage {
    static cart;

    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
        
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }

    static removeProductFromCart(product) {
        this.cart.removeProduct(product);
    }
}

ProductPage.init();



// const productList = new ProductList();
// productList.render();

 
//   delete functionality
//   const prodArray = document.querySelectorAll('.product-item');
//   const deleteProdButton = document.querySelectorAll('.del');
//   console.log(deleteProdButton);
  
//   function deleteItem(buttonsClass, childClass){
//     for(var i = 0; i < buttonsClass.length; i++){
  
//       (function(child){
//         buttonsClass[i].addEventListener('click', function(e){
//           child.parentNode.removeChild(child);
//         },false);
//       })(childClass[i]);
//     }
//   }
  
//   deleteItem(deleteProdButton, prodArray);

  function displayNumberOfItems(){
    const span = document.querySelector("#number");
     span.innerText = ProductPage.cart.items.length;
 }