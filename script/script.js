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



class ProductItem{
    constructor(product){
        this.product= product; 
    }

    addToCart () {
        // console.log('Adding to cart...');
        alert(JSON.stringify(this.product.title) + " added to cart");
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
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                    <button>Delete</button>

                </div>
            </div>
        `; 
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this))
        return prodEl;

    }
}



class ProductList {
    products = [
        new Product(
           'Mobile Phone',
           999.99,
           'Avaliable',
           'An IPhone 12 Pro',
           'https://www.apple.com/iphone/',
        ),
        new Product(
            'Laptop',
            1320.00,
            'Avaliable',
            'HP Pavilion x360 Laptop touch - 14-dw0097nr',
            'https://www.hp.com/us-en/shop/pdp/hp-pavilion-x360-laptop-14-dw0097nr',
         ),
        new Product(
            'Television',
            250.00,
            'Avaliable',
            'TCL andriod TV S6500 series',
            'https://www.tcl.com/gh/en/products/s6500/s6500-49.html',
        ),
        new Product(
            'Projector',
            999.99,
            'Avaliable',
            'An epson Home Cinema 2250 3LCD Full HD 1080p Projector',
            'https://epson.com/For-Home/Projectors/Streaming-Entertainment/Home-Cinema-2250-3LCD-Full-HD-1080p-Projector/p/V11HA11020',
        ),
        new Product(
            'Printer',
            129.99,
            'Avaliable',
            'HP DeskJet 2320 All-in-One Printer',
            'https://ssl.www8.hp.com/emea_middle_east/en/products/printers/product-detail.html?oid=33691553#!tab=specs',
         ),
    ]

    constructor() {}
    render() {
        const renderHook = document.getElementById('products');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod)
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        renderHook.append(prodList);

    }   
}



const productList = new ProductList();
productList.render();

