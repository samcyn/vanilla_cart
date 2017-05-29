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
                    saveOurCart();
                    return;
                }
            }
            let item = new Item(name, price, count, unit, img);
            cart.unshift(item);
            saveOurCart();
            // console.log(cart);
            
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
            saveOurCart();
        }

        // clear cart...
        function clearAllItemsFromCart() {
            cart = [];
            saveOurCart();
            // console.log(cart);
        }

        // Get total no of items in cart...
        function totalCountOfItems() {
            let total = 0;
            for (var i in cart) {
                total += cart[i].count;
            }
            return total;
        }

        // Get total amount(price) of items in cart...        
        function totalAmount() {
            let amount = 0;
            for (var i in cart) {
                amount += (cart[i].price)*cart[i].count;
            }
            return totalAmount;
        }

        // Get delivery fee of all items purchased...        
        function deliveryFee(fee) {
            return fee;
        }

        // Get total service charge for purchase of items...        
        function serviceCharge(percent) {
            let service = 0;
            service = (percent/100) * totalAmount();
            return service;
        }

        // Get gross total amount(price) of items in cart...        
        function grandTotal(percent, fee) {
            let grossTotal = 0;
            grossTotal += (totalAmount() + serviceCharge(percent) + deliveryFee(fee));
            return grossTotal;
        }

        // Create a copy of all cart items to be used in displaying cart changes...
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

        // Display cart changes...
        function displayCartChanges() {
            let cartArray = duplicateCart();
            let output = '';

            for (var i in cartArray) {
                output += `<li>${cartArray[i].name} -- ${cartArray[i].price} <span class="remove" data-action = ${cartArray[i].name} >X</span> </li>`;
            }

            let cartItems = document.getElementById('cartItems');
            let counter = document.getElementById('count')

            cartItems.innerHTML = output;
            counter.innerHTML = totalCountOfItems();
        }

        // Save cart if no db present...
        function saveOurCart() {
            localStorage.setItem("switchCart", JSON.stringify(cart));
        }

        // Retrieve saved cart...
        function loadOurCart() {
            cart = JSON.parse(localStorage.getItem("switchCart"));
        }

        let products = Array.from(document.getElementById('products').querySelectorAll('.card'));
        let removes = Array.from(document.querySelectorAll('.removes'));
        let clearCart = document.getElementById('clear_cart');
        //console.log(products);
        
        function productHandler(){
            let name = this.getAttribute('data-name');
            let price = this.getAttribute('data-price');
            let unit = this.getAttribute('data-unit');
            let img = this.getAttribute('data-img');
            addItemToCart(name, price, 1, unit, img);
            displayCartChanges();
        }

        function removeHandler() {
            // alert('hi!');
            let name = this.getAttribute('data-action');
            console.log(this.parentElement);
    	    removeItemFromCart(name);
        }
        
        products.forEach(function(product){
            product.addEventListener('click', productHandler);
        });

        removes.forEach(function(remove) {
            remove.addEventListener('click', remove, removeHandler)
        });

        document.addEventListener('click', function(e){
            if(e.target.className !== 'remove'){
                return;
            }
            e.target.parentElement.remove();
            let name = e.target.getAttribute('data-action');
            removeItemFromCartAll(name);
            displayCartChanges();
            // console.log(e.target.className);

        });

        clearCart.addEventListener('click', function(){
            clearAllItemsFromCart();
            displayCartChanges();
        })

        // saveOurCart();
        loadOurCart();
        displayCartChanges();

        // addItemToCart("bag", 100, 2, "kg", "bag.png");
        // addItemToCart("bag", 100, 2, "kg", "bag.png");
        // addItemToCart("bag", 100, 2, "kg", "bag.png");
        // addItemToCart("chair", 120, 2, "kg", "chair.png");
        // totalAmount();
        // clearAllItemsFromCart();
    }
}