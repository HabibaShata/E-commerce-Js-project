//import { cart as arrCart} from "./addtoCart"


var containerOreders=document.querySelector(".ordersBody");
let totalPrice=document.querySelector(".cart-total");

let cart = JSON.parse(localStorage.getItem('cart'))
let products = JSON.parse(localStorage.getItem('products'))

window.addEventListener("load", function () {
    var  total=0;
    cart.forEach(order => {
        total=products[order["product_id"] - 1].price * order["quantity"];
        // totalPrice.innerHTML="0";
        containerOreders.innerHTML += '';
        var orderItem = this.document.createElement("div");
        orderItem.classList.add("order");
        containerOreders.appendChild(orderItem);
        orderItem.innerHTML = `

<div class="orderItem" data-id="${order["product_id"]}">
<img src="${products[order["product_id"] - 1].images[0]}"/>
<div class="orderItem-detail">
    <h3>Name: ${products[order["product_id"] - 1].productName}</h3>
    <h5>quantity:  ${order["quantity"]}</h5>
    <h5>size:  ${order["quantity"]}</h5>
        <span class="orderItem-price">
        price:  ${products[order["product_id"] - 1].price * order["quantity"]} $
        </span>
</div>
</div> 
`
totalPrice.innerHTML=parseInt(total)+parseInt(totalPrice.innerHTML); 
//console.log(totalPrice.innerHTML);
    });


})
// console.log(order["product_id"]);//  idProduct

// cart.forEach(order => {
//     console.log(order["product_id"]);//  id 

// });

// console.log(cart);
// console.log(products);

