import { products } from "./custom.js";

let listProductHtml = document.getElementById("products-Landing");
let listCartHTML = document.querySelector('.cart-body');
let iconCart = document.querySelector('.cartLogo');
export let iconCartSpan = document.querySelector('.cartLogo #cntOrders');
let closeCart = document.querySelector('.cart-clear');
let checkOut = document.querySelector(".checkout");
let arrowBack = document.querySelector(".arrowBack");
let cart = document.querySelector(".cart");
let lyercartOverlay = document.querySelector(".cart-overlay");
export let temmraryDiv = document.querySelector(".addedSuccess");
let totalPrice = document.querySelector(".cart-total");

console.log(totalPrice);
let footerCart = document.querySelector('.cart-footer');
/**
cart 

     <div class="wCartIsEmpty">
         <i class="fa-solid fa-cart-plus iconEmptyCart"></i>
         <span class="cartEmpty">Your cart is empty!<br> Browse our categories and discover our best deals!</span>
           <a href="#">Start Shopping</a>
      </div>
 */
// cart is empty
// let span = document.querySelector('.cartEmpty');
var containerDivCartIsEmpty=document.createElement("div");
containerDivCartIsEmpty.classList.add("wCartIsEmpty");
// i
var iconEmptyCart = document.createElement("i");
iconEmptyCart.classList.add('fa-solid', 'fa-cart-plus');
iconEmptyCart.classList.add("iconEmptyCart");
// span
var msg = document.createElement("span");
msg.innerHTML = "Your cart is empty!<br> Browse our categories and discover our best deals!";
msg.classList.add("cartEmpty");
// a
var btnStratShopping = document.createElement("a");
btnStratShopping.href="./product.html";
btnStratShopping.innerHTML="Strat Shopping";

// 
containerDivCartIsEmpty.append(iconEmptyCart);
containerDivCartIsEmpty.append(msg);
containerDivCartIsEmpty.append(btnStratShopping);

console.log(containerDivCartIsEmpty);

export let arrCart = [];
let loggedInUser = null;

if(localStorage.getItem("loggedInUser"))
{
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
}

if (localStorage.getItem("cart") != null) {
    //check if the loggedinuser is the admin or seller so don't perform the following
    if(!(loggedInUser && (loggedInUser.userRole == "admin"|| loggedInUser.userRole == "seller")))
    {
        arrCart = JSON.parse(localStorage.getItem("cart"));
        listCartAsHTML();
    }
}

function listCartAsHTML() {
    let totalQuantity = 0;
    let total = 0;
    totalPrice.innerHTML = "0"
    iconCartSpan.innerHTML = arrCart.length;

    arrCart.forEach(item => {

        //     console.log(item);
    
        totalQuantity = totalQuantity + item.quantity;
        total = item.quantity * products[item.product_id - 1].price;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        //  console.log(products);
        //  console.log(totalPrice=Number(totalPrice)+products[item.product_id - 1].price * item.quantity);
        totalPrice.innerHTML = parseInt(totalPrice.innerHTML) + products[item.product_id - 1].price * item.quantity + "$";
        let info = products[product_Id];
        //    console.log(info['images'][0]);
        listCartHTML.appendChild(newItem);
        newItem.innerHTML =
            `
                <div class="cart-item" data-id="${item.product_id}">
                <img src="${products[item.product_id - 1].images[0]}"/>
                <div class="cart-item-detail">
                  <h3>${products[item.product_id - 1].productName}</h3>
                  <h5>${products[item.product_id - 1].price}$</h5>
                  <div class="cart-item-amount">
                  <i class="fa-solid fa-minus bi "data-btn="decr"></i>
                  <span class="qty">${item.quantity}</span>
                  <i class="fa-solid fa-plus bi"data-btn="incr"></i>
      
                    <span class="cart-item-price">
                      ${products[item.product_id - 1].price * item.quantity}$
                    </span>
                    <i class="fa-solid fa-trash-can deleteItem"></i>
                  </div>
                </div>
              </div>
              `;

        console.log(products[item.product_id - 1].price * item.quantity);

    })
    //delete clicked item 
    let itemsFromCart = document.querySelectorAll(".cart-item-detail");
    for (var i = 0; i < itemsFromCart.length; i++) {
        itemsFromCart[i].addEventListener("click", function (e) {
            if (e.target.classList.contains("deleteItem")) {
                var itemDeleted = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
                updateCart(itemDeleted);
            }
        })
    }
}


//cart events
//check if the loggedinuser is the admin or seller so don't perform the following
if(!(loggedInUser && (loggedInUser.userRole == "admin"|| loggedInUser.userRole == "seller")))
{
    iconCart.addEventListener("click", showCart);
    arrowBack.addEventListener("click", hideCart);
    closeCart.addEventListener("click", clearCart);
}


function showCart() {
    console.log(arrCart.length);
    if(arrCart.length==0){
      
        listCartHTML.prepend(containerDivCartIsEmpty);
        footerCart.style.display="none";

    }
    else{
        footerCart.style.display="grid";
    }
    cart.classList.add("show");
    lyercartOverlay.classList.add("show");
}

function hideCart() {
    console.log("hello");
    lyercartOverlay.classList.remove("show");
    cart.classList.remove("show");
}
function clearCart(e) {
    arrCart = [];
    totalPrice.innerHTML = "0"
    try {
        addCartToMemory();
        addCartToHTML();
    }
    finally {
        listCartHTML.prepend(containerDivCartIsEmpty);
        footerCart.style.display="none";
    }

};

// to make sure Dom[html code] loaded
var product_Id;
window.addEventListener("load", function () {
    var addCartLink = document.querySelectorAll(".addCart");
    for (var i = 0; i < addCartLink.length; i++) {
        addCartLink[i].addEventListener("click", function (event) {
            event.preventDefault();
            product_Id = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.classList[3].split('=')[1]);
            addToCart(product_Id);

        })
    }

})

//**   add to cart    / */

var cnt = 0;
export const addToCart = (product_id) => {

    //findindex fun return index of ele if it extist in arr else if rturn -1;
    let positionThisProductInCart = arrCart.findIndex((value) => value.product_id == product_id);
    if (arrCart.length <= 0) {
        arrCart = [{
            product_id: product_id,
            quantity: 1,
        }];
        temmraryDiv.style.display = "block";
        setTimeout(function () {
            temmraryDiv.style.display = "none";
        }, 2000)
        cnt++;

    } else if (positionThisProductInCart < 0) {
        arrCart.push({
            product_id: product_id,
            quantity: 1
        });
        temmraryDiv.style.display = "block";
        setTimeout(function () {
            temmraryDiv.style.display = "none";
        }, 2000)
        cnt++;
    } else {
        alert("Item is already in cart");
    }
    addCartToHTML();
    addCartToMemory();
}

export const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(arrCart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';

    if (arrCart.length > 0) {
        listCartAsHTML();
        //console.log(itemsFromCart);

    } else {

        let items = document.querySelectorAll(".item");
        cnt = 0
        iconCartSpan.innerText = cnt;
        listCartHTML.removeChild(items);
        // console.log(arrCart.length);
    }
}

//check if the loggedinuser is the admin or seller so don't perform the following
if(!(loggedInUser && (loggedInUser.userRole == "admin"|| loggedInUser.userRole == "seller")))
{
    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        //console.log(event.target.dataset.btn);
        if (positionClick.dataset.btn == "decr" || positionClick.dataset.btn == "incr") {
            let product_id = parseInt(positionClick.parentElement.parentElement.parentElement.dataset.id);
            console.log(product_Id);
            let type = 'decr';
            if (event.target.dataset.btn == "incr") {
                type = 'incr';
            }
            changeQuantityCart(product_id, type);
        }
    })
}

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = arrCart.findIndex((value) => value.product_id == product_id);
    // console.log(positionItemInCart);
    if (positionItemInCart >= 0) {
        //  let info = arrCart[positionItemInCart];
        switch (type) {
            case 'incr':
                arrCart[positionItemInCart].quantity = arrCart[positionItemInCart].quantity + 1;
                break;

            default:
                let changeQuantity = arrCart[positionItemInCart].quantity - 1;
                if (changeQuantity >= 1) {
                    arrCart[positionItemInCart].quantity = changeQuantity;
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

// fun delete&update 
const updateCart = (itemDeleted) => {
    var containerDeletedItem = document.querySelectorAll(".cart-item");
    // console.log(containerDeletedItem);
    // let positionItemInCart = arrCart.findIndex((value) => value.product_id == itemDeleted);
    // console.log("index arrtCart", positionItemInCart);
    // console.log("id item deleted", itemDeleted);//index 
    
    var conf = confirm(`Do you really want to remove  ${products[itemDeleted - 1].productName} from cart? `);

    if (conf) {

        let positionItemInCart = arrCart.findIndex((item) => item.product_id == itemDeleted);
        totalPrice.innerHTML = parseInt(totalPrice.innerHTML) - products[itemDeleted - 1].price * arrCart[positionItemInCart].quantity + "$";
        //delete from arrCart
        console.log(arrCart);
        arrCart = arrCart.filter((x) => x.product_id !== itemDeleted);
        console.log(arrCart);

        //delete from html
        for (var i = 0; i < containerDeletedItem.length; i++) {
            if (containerDeletedItem[i].dataset.id == itemDeleted) {
                containerDeletedItem[i].remove();
            }
        }
        if(arrCart.length==0){
            listCartHTML.prepend(containerDivCartIsEmpty);
            footerCart.style.display="none";
        }
        addCartToMemory();
        iconCartSpan.innerText = arrCart.length;
       
        console.log(arrCart[positionItemInCart].quantity);

    }
}

export * from './addtoCart.js';  // This exports everything from addtoCart.js
