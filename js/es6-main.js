const app = {
    cartCtrl(arg) {
        arg = arg || {
                       products : undefined,//class of products to be add or add butttons
                       removeAllElement: undefined,//class
                       increase: undefined,//class
                       decrease: undefined,
                       priceElement: undefined,//id
                       serviceChargeElement: undefined, // id of service charge elememt
                       serviceChargeValue: undefined, //percentage value
                       deliveryFeeElement: undefined,//id of delivery fee element
                       deliveryFeeValue: undefined, //integer
                       cartContentElement: undefined,//id of cart content listings..
                       cartNodeOutput: "li", //node which we be added to cartContentElement
                       grandTotalElement: undefined
                       
                   }
        
        let cart = [];
        
        //Object constructor that create items using a spread operator...
        class Item {
            constructor(...arr){
                this.name = name;
                this.price = price;
                this.count = Number(count);
                this.unit = unit;
                this.img = img;
            }
        }
    
        //addItemToCart(name, price, count)...
        function addItemToCart(arr){
            // console.log(arr);
            for(var i in cart){
                if(cart[i].name === arr[0]){
                    cart[i].count += Number(arr[2]);
                    //console.log(cart);
                    saveCart();
                    return;
                }
            }
            
            //Create new instance of the Item object...
            let item = new Item(...arr);
            cart.unshift(item);
            saveCart();
        }

        //removeItemFromCart(name) from the cart, just one item...
        function removeItemFromCart(name){
            for(var i in cart){
                if(cart[i].name === name){
                cart[i].count--;
                if(cart[i].count === 0){
                    cart.splice(i, 1);
                }
                break;
                }
            }
            saveCart();
        }

        //removeItemFromCartAll, all items....
        function removeItemFromCartAll(name){
            for(var i in cart){
                if(cart[i].name === name){
                    cart.splice(i, 1);
                    break;
                }
            }
            saveCart();
        }

        //clear cart...
        function clearCart(){
            cart = [];
            saveCart();
        }

        //return total count in the cart...
        function countCart(){
            let totalCount = 0;
            for(var i in cart){
                totalCount += cart[i].count;
            }
            return totalCount;
        }

        //return total cost...
        function totalCart(){
            let totalCost = 0;
            for(var i in cart){
                totalCost += cart[i].price * cart[i].count;
            }
            return totalCost;
        }

        //return array of cart items...
        function listCart(){
            let cartCopy = [];
            
            for(var i in cart){
                let item = cart[i];
                let itemCopy = {};
                for(var p in item){
                    itemCopy[p] = item[p];
                }
                cartCopy.push(itemCopy);
            }
            return cartCopy;
        }

         //calculate service charges...
        function serviceChargeCtrl(percent){
            serviceCharge = 0;
            if(isNaN(percent)){
                return serviceCharge;
            }
            serviceCharge = (percent/100) * totalCart();
            return serviceCharge;
        }

        //return delivery fee....
        function deliveryCtrl(dvFee){
            if(isNaN(dvFee)){
                return 0;
            }
            if(totalCart() == 0){
                return 0;
            }
            return dvFee;
        }

        //save cart...
        function saveCart(){
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
        }

        //load the cart...
        function loadCart(){
            cart = JSON.parse(localStorage.getItem("shoppingCart"));
        }
       
        //display items in cart...
        function displayCart(){
            let cartArray = listCart();
        
            let output = "";
            for(var i in cartArray){
                output += `<${arg.cartNodeOutput} ${arg.dataAttr[0]} = ${cartArray[i].name}>
                                ${cartArray[i].name} -- 
                                <span class="${arg.removeAllElement}">X</span>
                                <span class="${arg.increase}"> + </span>
                                <span class="${arg.decrease}"> - </span>
                          </${arg.cartNodeOutput}>`;
            }

            $jvcart(arg.cartContentElement).innerHTML = output;
            $jvcart(arg.priceElement).innerHTML = totalCart();
            $jvcart(arg.itemCountElement).innerHTML =  countCart();
            $jvcart(arg.serviceChargeElement).innerHTML = serviceChargeCtrl(Number(arg.serviceChargeValue));
            $jvcart(arg.deliveryFeeElement).innerHTML = deliveryCtrl(Number(arg.deliveryFeeValue));
            $jvcart(arg.grandTotalElement).innerHTML = totalCart() + serviceChargeCtrl(Number(arg.serviceChargeValue)) + deliveryCtrl(Number(arg.deliveryFeeValue));
            
        }

        //add an item to cart...
        document.addEventListener('click', (e) => {
            let arr = [];
                if(e.target.className !== arg.products){
                    return;
                }

            //saving each attribute passed into an empty array i.e arr...
            for(var i = 0; i < arg.dataAttr.length; i++){
                for(var p in arg.dataAttr){
                    arr[p] = e.target.getAttribute(arg.dataAttr[i]) || e.target.parentElement.getAttribute(arg.dataAttr[i]);
                    i++;
                }
                break;
            }  
           
            addItemToCart(arr);
            displayCart();
            document.querySelector('html').classList.add('open');
        
        });

       // remove an item from cart...
       document.addEventListener('click', (e) => {
            if(e.target.className !== arg.removeAllElement){
                return;
            }

            e.target.parentElement.remove();

            let name = e.target.parentElement.getAttribute(arg.dataAttr[0]);
            removeItemFromCartAll(name);
            displayCart();

        });

        // increase the count of an item...
         document.addEventListener('click', (e) => {
            if(e.target.className !== arg.increase){
                return;
            }
            
            let name = e.target.parentElement.getAttribute(arg.dataAttr[0]);

            //pass in an array here...
            addItemToCart([name, 0, 1, 0, 0]);
            displayCart();

        });

        //decrease the count of an item...
        document.addEventListener('click', (e) => {
            if(e.target.className !== arg.decrease){
                return;
            }
            let name = e.target.parentElement.getAttribute(arg.dataAttr[0]);
            removeItemFromCart(name);
            displayCart();

        });

        //checks if product or add to cart button is defined...
        if(arg.products == undefined){
            console.log(`You did not define add to cart element it's currently ${arg.products}.`);
            return;
        }

        //checks if remove all cart items button is defined...
        if(arg.removeAllElement == undefined){
            console.log(`You did not specify the element to remove all item.. You can continue however or make a custom button to remove all item.`);
        }

        //select element with ID or class...
        function $jvcart(elem){
            return document.querySelector('.' + elem) || document.querySelector('#' + elem);
        }
        
        saveCart();
        loadCart();
        displayCart();
    }
}