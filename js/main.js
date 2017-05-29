var app = {
    cartCtrl: function(arg){
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
        
        var cart = [];
        
        //An object constructor that create items...
        function Item (name, price, count, unit, img){
            this.name = name;
            this.price = price;
            this.count = count;
            this.unit = unit;
            this.img = img;
        }
    
        //addItemToCart(name, price, count)
        function addItemToCart(name, price, count, unit, img){
            for(var i in cart){
                if(cart[i].name === name){
                cart[i].count += count;
                //console.log(cart);
                saveCart();
                return;
                }
            }
            
            var item = new Item(name, price, count, unit, img);
            cart.unshift(item);
            saveCart();
        }

        //removeItemFromCart(name) from the cart, just one item
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

        //clear cart
        function clearCart(){
            cart = [];
            saveCart();
        }

        //return total count in the cart
        function countCart(){
            var totalCount = 0;
            for(var i in cart){
                totalCount += cart[i].count;
            }
            return totalCount;
        }

        //return total cost
        function totalCart(){
            var totalCost = 0;
            for(var i in cart){
                totalCost += cart[i].price * cart[i].count;
            }
            return totalCost;
        }

        //listCart return array[] of items
        function listCart(){
            var cartCopy = [];
            
            for(var i in cart){
                var item = cart[i];
                var itemCopy = {};
                for(var p in item){
                    itemCopy[p] = item[p];
                }
                cartCopy.push(itemCopy);
            }
           // console.log(cartCopy);
            return cartCopy;
        }

         //calculates service charges here....
        function serviceChargeCtrl(percent){
            serviceCharge = 0;
            if(isNaN(percent)){
                return serviceCharge;
            }
            serviceCharge = (percent/100) * totalCart();
            return serviceCharge;
        }

        //calculates service charges here....
        function deliveryCtrl(dvFee){
            //console.log(isNaN(dvFee));
            if(isNaN(dvFee)){
                return 0;
            }
            if(totalCart() == 0){
                return 0;
            }
            return dvFee;
        }

        //save cart.............
        function saveCart(){
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
        }

        //load the cart
        function loadCart(){
            cart = JSON.parse(localStorage.getItem("shoppingCart"));
        }

       
        //display items in cart
        function displayCart(){
            var cartArray = listCart();
        
    
            var output = "";
            for(var i in cartArray){
                output += `<${arg.cartNodeOutput} data-name = ${cartArray[i].name}>
                                ${cartArray[i].name} -- 
                                <span class="${arg.removeAllElement}">X</span>
                                <span class="${arg.increase}"> + </span>
                                <span class="${arg.decrease}"> - </span>
                          </${arg.cartNodeOutput}>`;
            }

           
            $selctor(arg.cartContentElement).innerHTML = output;
            $selctor(arg.priceElement).innerHTML = totalCart();
            $selctor(arg.itemCountElement).innerHTML =  countCart();
            $selctor(arg.serviceChargeElement).innerHTML = serviceChargeCtrl(Number(arg.serviceChargeValue));
            $selctor(arg.deliveryFeeElement).innerHTML = deliveryCtrl(Number(arg.deliveryFeeValue));
            $selctor(arg.grandTotalElement).innerHTML = totalCart() + serviceChargeCtrl(Number(arg.serviceChargeValue)) + deliveryCtrl(Number(arg.deliveryFeeValue));
            
            
        }

       
        
        //add an item to cart
        document.addEventListener('click', function(event){
           // var obj = {}
            if(event.target.className !== arg.products){
                return;
            }
            //get the attribute form the current element or its parent
            var name = event.target.getAttribute(arg.dataAttr[0]) || event.target.parentElement.getAttribute(arg.dataAttr[0]);
            var price = event.target.getAttribute(arg.dataAttr[1]) || event.target.parentElement.getAttribute(arg.dataAttr[1]);
            var unit = event.target.getAttribute(arg.dataAttr[2]) || event.target.parentElement.getAttribute(arg.dataAttr[2]);
            var img = event.target.getAttribute(arg.dataAttr[3]) || event.target.parentElement.getAttribute(arg.dataAttr[3]);

            
            
            //console.log(event.target.attributes[1].nodeValue);
            //console.log(event.target.getAttribute('data-name'));
            addItemToCart(name, price, 1, unit, img);
            displayCart();
            document.querySelector('html').classList.add('open');
            console.log(cart);
        });

       // remove an item from cart
       document.addEventListener('click', function(e){
            if(e.target.className !== arg.removeAllElement){
                return;
            }
            e.target.parentElement.remove();
            //console.log( e.target.parentElement.getAttribute('data-name'));
            var name = e.target.parentElement.getAttribute('data-name');
            removeItemFromCartAll(name);
            displayCart();
            // console.log(e.target.className);

        });

        // increase the count of an item
         document.addEventListener('click', function(e){
            if(e.target.className !== arg.increase){
                return;
            }
            //e.target.parentElement.remove();
            //console.log( e.target.parentElement.getAttribute('data-name'));
            var name = e.target.parentElement.getAttribute('data-name');
            addItemToCart(name, 0, 1, 0, 0);
            displayCart();
            //console.log(cart);
            // console.log(e.target.className);

        });

        //decrease the count of an item
        document.addEventListener('click', function(e){
            if(e.target.className !== arg.decrease){
                return;
            }
            var name = e.target.parentElement.getAttribute('data-name');
            removeItemFromCart(name);
            displayCart();
            console.log(cart);
            // console.log(e.target.className);

        });

        //checks if product or add to cart button is defined 
        if(arg.products == undefined){
            console.log('You did not define add to cart element it\'s currently' + ' ' + arg.products + '.');
            return;
        }

        if(arg.removeAllElement == undefined){
            console.log('You did not specify the element to remove all item.. You can continue however or make a custom button to remove all item.');
        }

        console.log(arg);


        //select element with ID or class
        function $selctor(elem){
            return document.querySelector('.' + elem) || document.querySelector('#' + elem);
        }




    



        
        //saveCart();
        loadCart();
        displayCart();
    }
}