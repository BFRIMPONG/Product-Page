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

    deleteProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.pop(product);
        this.cartItems = updatedItems;
    }

    removeProduct(product){
        
        const updatedItems = [...this.items];
        console.log(updatedItems);
        if (updatedItems.includes(product)) {
            updatedItems.pop(product);
            this.cartItems = updatedItems;
            alert(JSON.stringify(product.title) + " is being deleted from cart");
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

    deleteFromProduct() {
        ProductPage.deleteFromProduct(this.product);
        alert(JSON.stringify(this.product.title) + " is being deleted from the product list");

    }

    render() {
        const prodEl = this.createRootElement ('li', 'product-item');
        prodEl.innerHTML = `
            <div class = "pro">
                <div><img src ="${this.product.imageUrl}" alt= "${this.product.title}"></div>
                <div class = "product-items_content">
                    <h2>${this.product.title}</h2>
                    <p>${this.product.description}</p>
                    <h3>\$${this.product.price}</h3>
                    <h3>${this.product.stock}</h3>
                    
                    <button>Add to Cart</button>
                    <button class ="del">Remove from Cart</button>
                    <button class ="rem">Delete</button>
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
        const remProdButton = prodEl.querySelector('.rem')
        // remProdButton.addEventListener('click',this.deleteFromProduct.bind(this))
        remProdButton.addEventListener('click', displayNumberOfItems)

    }
}



class ProductList extends Component {
    
    products = [
        new Product(
           'iPhone 12 Pro',
           999.99,
           'Stock: Available',
           'The phone comes with a 6.10-inch touchscreen display with a resolution of 1170x2532 pixels at a pixel density of 460 pixels per inch (ppi). The iPhone 12 Pro supports wireless charging, as well as proprietary fast charging.',
           'img/mobilephone.jpg',
        ),
        new Product(
            'HP Pavilion x360 Laptop',
            1320.00,
            'Stock: Available',
            'Be free to create, share, and connect in more ways on a powerful convertible laptop designed to move with you. Streaming, chatting, and getting things done is way more fun when you find your perfect position. Flex, bend and flip from anywhere with a 360-degree hinge and long-lasting battery life.',
            'img/laptop.png',
         ),
        new Product(
            'TCL andriod TV',
            250.00,
            'Stock: Available',
            'More movies and games, music and photos, internet and apps are ready. With TCL Android TV™, discover a new worlds of entertainment with you and your family. ',
            'img/tv.jpg',
        ),
        new Product(
            'Epson Full HD Projector',
            999.99,
            'Stock: Available',
            'Built from the ground up to deliver an exceptionally immersive viewing experience, the Epson Home Cinema 2250 displays vivid, true-to-life content with Best-in-Class Color Brightness1, advanced 3-chip, 3LCD technology and an amazing contrast ratio of up to 70,000:1. The perfect choice for streaming TV shows, sporting events, movies and more, this dynamic projector features Image Enhancement and Frame Interpolation for smooth, crisp images and accepts up to 4K content – for an astounding Full HD picture.',
            'img/projector.jpg',
        ),
        new Product(
            'HP DeskJet 2320 All-in-One Printer',
            129.99,
            'Stock: Available',
            'The simple way to get the essentials. With seamless setup from PC and dependable printing, you can handle your everyday printing, scanning, and copying needs with an affordable printer. Use HP Smart app for a simple setup, and you are ready to go.',
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
    static deleteFromProduct(product){
        this.cart.removeProduct(product);
    }
}

ProductPage.init();



// const productList = new ProductList();
// productList.render();

 
//   delete functionality
  const prodArray = document.querySelectorAll('.product-item');
  const deleteProdButton = document.querySelectorAll('.rem');
  console.log(deleteProdButton);
  
  function deleteItem(buttonsClass, childClass){
    for(var i = 0; i < buttonsClass.length; i++){
  
      (function(child){
        buttonsClass[i].addEventListener('click', function(e){
          child.parentNode.removeChild(child);
        //   alert(JSON.stringify(this.product.title) + " is being deleted from the product list");
        //   displayNumberOfItems();
        },false);
      })(childClass[i]);
    }
  }
  
  deleteItem(deleteProdButton, prodArray);

  function displayNumberOfItems(){
    const span = document.querySelector("#number");
     span.innerText = ProductPage.cart.items.length;
 }