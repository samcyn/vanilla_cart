/*======Activating ++ method for Loops used======*/
/*jslint plusplus: true*/
/*======End of Activating ++ method for Loops used======*/

var app = {
    cartCtrl: function (arg) {
        'use strict';
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
        };
        
        var cart = [], arr = [], sorter;

        sorter(arg.dataAttr, {
            general: function (a, b) {
                return a.localeCompare(b);
            },
            top: function (a, b) {
                return +(!b.localeCompare(this));
            },
            bottom: function (a, b) {
                return +(!a.localeCompare(this));
            }
        }, {
            top: ['data-name', 'data-price', 'data-count'],
            bottom: ['data-img']
        });
        //sorting array //
       // console.log(arg.dataAttr);

        //An object constructor that create items...
        // function Item (name, price, count, unit, img){
        //     this.name = name;
        //     this.price = price;
        //     this.count = Number(count);
        //     this.unit = unit;
        //     this.img = img;
        //     console.log(this);

        // }

        // an object constructor to create new items
        function Item() {
			var i = 0, obj = {}, p;
            for (i = 0; i < arguments.length; i++) {
                for (p = 0; p < arguments.length; p++) {
                    //dataAttr passed  is used to create  new object keys
                    //the first value in argument will match dataAttr
                    //checking id for id for example
                    obj[arg.dataAttr[p]] = arguments[i];
                    i++;
                }
                break;
            }
            return obj;
        }
		

        //saving cart to local Storage.............
        function saveCart() {
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
        }

        //load the cart
        function loadCart() {
            cart = JSON.parse(localStorage.getItem("shoppingCart"));
        }
    
		
        //addItemToCart(name, price, count)
        function addItemToCart(arr) {
			var i = 0;
            for (i in cart) {
                //a test to match the id this time we are using name ..[arg.dataAttr[0]
                if (cart[i][arg.dataAttr[0]] === arr[0]) {
                    // the second item in dataAttr must be data-count....
                    cart[i][arg.dataAttr[2]] =  Number(cart[i][arg.dataAttr[2]]) + Number(arr[2]);
                    //console.log(cart);
                    saveCart();
                    return;
                }
            }
            
            //var item = new Item(arr[0], arr[1], arr[2], arr[3], arr[4]);
            //here we used a spread operator to list the content of arr...
            var item = new Item(...arr);
            cart.unshift(item);
            console.log(cart);
            saveCart();
        }

        //removeItemFromCart(name) from the cart, just one item
        function removeItemFromCart (name) {
            for(var i in cart){
                //if what ever id passed match the first item in dataAttr...
                if(cart[i][arg.dataAttr[0]] === name){
                    //reduce count by 1
                    cart[i][arg.dataAttr[2]]--;
                    //if count is reduced to zero splice it..
                if(cart[i][arg.dataAttr[2]] === 0){
                    cart.splice(i, 1);
                }
                break;
                }
            }
            saveCart();
        }

        //removeItemFromCartAll, all items....
        function removeItemFromCartAll (name) {
            for(var i in cart){
                //if whatever is passed matches the first item...
                if(cart[i][arg.dataAttr[0]] === name){
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
                //remember dataAttr[2] is for count
                totalCount += Number(cart[i][arg.dataAttr[2]]);
            }
            return totalCount;
        }

        //return total cost
        function totalCart(){
            var totalCost = 0;
            for(var i in cart){
                totalCost += Number(cart[i][arg.dataAttr[1]]) * Number(cart[i][arg.dataAttr[2]]);
            }
            return totalCost;
        }

        
        //save a copy of cart
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
        function serviceChargeCtrl (percent) {
            serviceCharge = 0;
            if(isNaN(percent)){
                return serviceCharge;
            }
            serviceCharge = (percent/100) * totalCart();
            return serviceCharge;
        }

        //calculates service charges here....
        function deliveryCtrl (dvFee) {
            //console.log(isNaN(dvFee));
            if(isNaN(dvFee)){
                return 0;
            }
            if(totalCart() == 0){
                return 0;
            }
            return dvFee;
        }

       
        //display items in cart
        function displayCart(){
            var cartArray = listCart();
        
    
            var output = "";
            for (var i in cartArray) {
                // output cart in list..arg.dataAttr[0] is the first item in the array...
                output += `<${arg.cartNodeOutput} ${arg.dataAttr[0]} = ${cartArray[i][arg.dataAttr[0]]}>
                                ${cartArray[i][arg.dataAttr[0]]} -- 
                    
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
           
            if(event.target.className !== arg.products){
                return;
            }
            //get the attribute form the current element or its parent
            /*
            var name = event.target.getAttribute(arg.dataAttr[0]) || event.target.parentElement.getAttribute(arg.dataAttr[0]);
            var price = event.target.getAttribute(arg.dataAttr[1]) || event.target.parentElement.getAttribute(arg.dataAttr[1]);
            var unit = event.target.getAttribute(arg.dataAttr[2]) || event.target.parentElement.getAttribute(arg.dataAttr[2]);
            var img = event.target.getAttribute(arg.dataAttr[3]) || event.target.parentElement.getAttribute(arg.dataAttr[3]);*/

            //saving each attribute passed into an empty array i.e arr...
            for (var i = 0; i < arg.dataAttr.length; i++) {
                for(var p in arg.dataAttr){
                    arr[p] = event.target.getAttribute(arg.dataAttr[i]) || event.target.parentElement.getAttribute(arg.dataAttr[i]);
                    i++;
                }
                break;
            }

            //console.log(arr);     
           
            addItemToCart(arr);
            displayCart();
            document.querySelector('html').classList.add('open');
        
        });

       // remove an item from cart
       document.addEventListener('click', function(e){
            if(e.target.className !== arg.removeAllElement){
                return;
            }
            e.target.parentElement.remove();
            //console.log( e.target.parentElement.getAttribute('data-name'));
            var name = e.target.parentElement.getAttribute(arg.dataAttr[0]);
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
            var name = e.target.parentElement.getAttribute(arg.dataAttr[0]);

            //pass in an array here..
            addItemToCart([name, 0, 1, 0, 0]);
            displayCart();
            //console.log(cart);
            // console.log(e.target.className);

        });

        //decrease the count of an item
        document.addEventListener('click', function (e) {
            if(e.target.className !== arg.decrease){
                return;
            }
            var name = e.target.parentElement.getAttribute(arg.dataAttr[0]);
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