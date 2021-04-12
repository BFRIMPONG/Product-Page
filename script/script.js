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

class ShoppingCart {
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

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }
    
    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now</button>
        `;
        cartEl.className = 'cart'
        this.totalOutput = cartEl.querySelector('h2')
        return cartEl;
    }
}

class ProductItem{
    constructor(product){
        this.product= product; 
    }

    addToCart () {
        Products.addProductToCart(this.product);
        // console.log('Adding to cart...');
        // alert(JSON.stringify(this.product.title) + " added to cart");
        // cart.addProduct();
    } 
    
    deleteItem () {
        alert(JSON.stringify(this.product.title) + " deleted from cart");
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src ="${this.product.imageUrl}" alt= "${this.product.title}">
                <div class = "product-items_content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <h3>${this.product.stock}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                    <button id ="del">Delete</button>

                </div>
            </div>
        `; 
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this))
        const deleteButton = prodEl.querySelector('#del');
        deleteButton.addEventListener('click', this.deleteItem.bind(this))
        return prodEl;

    }
}



class ProductList {
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

    constructor() {}
    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod)
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;

    }   
}

class Shop {
    render () {
        const renderHook = document.getElementById('products');
        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();
        const productList = new ProductList();
        // productList.render();
        const prodListEl = productList.render();

        renderHook.append(cartEl);
        renderHook.append(prodListEl);
    }
}

class Products {
    static cart;

    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
        
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

Products.init();



const productList = new ProductList();
productList.render();

