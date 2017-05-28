const app = {
    cartCtrl() {
        // empty cart...
        let cart = [];

        // Object constructor for creating items...
        function Item(name, price, count, unit, img) {
            this.name = name;
            this.price = price;
            this.count = count;
            this.unit = unit;
            this.img = img;
        }

        // Add items to cart...
        function addItemToCart(name, price, count, unit, img) {
            for(var i in cart){
                if (cart[i].name === name){
                    cart[i].count += count;
                    return;
                }
            }
            let item = new Item(name, price, count, unit, img)
            cart.unshift(item);
            console.log(cart);
            
        }

        // remove an item from cart
        function removeAnItemFromCart(name) {
            for(var i in cart){
                if (cart[i].name === name){
                    cart[i].count--
                    if(cart[i].count === 0){
                        cart.splice(i, 1);
                    }
                    break;
                }
            }
        }

        // remove all items from cart
        function removeItemFromCartAll(name) {
            for (var i in cart) {
                if (cart[i].name === name){
                    cart.splice(i, 1);
                    break;
                }
            }
        }

        // clear cart...
        function clearAllItemsFromCart() {
            cart = [];
            // console.log(cart);
        }

        function totalCountOfItems() {
            let total = 0;
            for (var i in cart) {
                total += cart[i].count;
            }
            return total;
        }

        function totalAmount() {
            let amount = 0;
            for (var i in cart) {
                amount += (cart[i].price)*cart[i].count;
            }
            return totalAmount;
        }

        function deliveryFee(fee) {
            return fee;
        }

        function serviceCharge(percent) {
            var service = 0;
            service = (percent/100) * totalAmount();
            return service;
        }

        function grandTotal(percent, fee) {
            let grossTotal = 0;
            grossTotal += (totalAmount() + serviceCharge(percent) + deliveryFee(fee));
            return grossTotal;
        }

        function duplicateCart() {
            let cartCopy = [];

            for (var i in cart) {
                let item = cart[i];
                let itemCopy = {};
                for (var p in item) {
                    itemCopy[p] = item[p];
                }
                cartCopy.push(itemCopy)
            }
            return cartCopy;
        }

        function displayCartChanges() {
            let cartArray = duplicateCart();
            let output = '';

            for (var i in cartArray) {
                output += `<li>${cartArray[i].name}<li>`;
            }

            var cartItems = document.getElementById('cartItems');

            cartItems.innerHTML = output;
        }

        function saveOurCart() {
            localStorage.setItem("switchCart", JSON.stringify(cart));
        }

        function loadOurCart() {
            cart = JSON.parse(localStorage.getItem("switchCart"));
        }

        var products = Array.from(document.getElementById('products').querySelectorAll('.card'));
    
        //console.log(products);
        
        function productHandler(){
            let name = this.getAttribute('data-name');
            let price = this.getAttribute('data-price');
            let unit = this.getAttribute('data-unit');
            let img = this.getAttribute('data-img');
            addItemToCart(name, price, 1, unit, img);
            displayCartChanges();
        }
        
        products.forEach(function(product){
            product.addEventListener('click', productHandler);
        });

        // addItemToCart("bag", 100, 2, "kg", "bag.png");
        // addItemToCart("bag", 100, 2, "kg", "bag.png");
        // addItemToCart("bag", 100, 2, "kg", "bag.png");
        // addItemToCart("chair", 120, 2, "kg", "chair.png");
        // totalAmount();
        // clearAllItemsFromCart();
    }
}