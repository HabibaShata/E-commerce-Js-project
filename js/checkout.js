//import { cart as arrCart} from "./addtoCart"

//import { arrCart } from "./addtoCart";


var containerOreders = document.querySelector(".ordersBody");
let totalPrice = document.querySelector(".cart-total");
let btnCheckout = document.querySelector(".checkout a");
console.log(totalPrice);
let cart = JSON.parse(localStorage.getItem('cart'))
let products = JSON.parse(localStorage.getItem('products'))

window.addEventListener("load", function () {

    var total = 0;
    cart.forEach(order => {
        total = products[order["product_id"] - 1].price * order["quantity"];
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
    <h5>color:  ${order["colorOptions"]}</h5>
        <span class="orderItem-price">
        price:  ${products[order["product_id"] - 1].price * order["quantity"]} $
        </span>
</div>
</div> 
`
        totalPrice.innerHTML = total + parseInt(totalPrice.innerHTML) + "$";
        //console.log(totalPrice.innerHTML);
    });

})
btnCheckout.addEventListener("click", function (e) {
    e.preventDefault();
    cart.forEach((v) => {
      //  console.log(products[v.product_id - 1]);

        products[v.product_id - 1].quantity_sold =parseInt(v.quantity);
        products[v.product_id - 1].quantity = parseInt(products[v.product_id - 1].quantity)-parseInt(products[v.product_id - 1].quantity_sold);
       //add modifiy countity to cart 
        v.quantity_sold=parseInt(v.quantity);
        v.quantity=products[v.product_id - 1].quantity;

       localStorage.setItem('products', JSON.stringify(products));
       localStorage.setItem('cart', JSON.stringify(cart));

       // console.log(v.product_id);//id product
    })
   
        //localStorage.setItem('cart', JSON.stringify(cart));
       // localStorage.setItem('cart', JSON.stringify(cart));
    
})


// console.log(order["product_id"]);//  idProduct

// cart.forEach(order => {
//     console.log(order["product_id"]);//  id

// });

// console.log(cart);
// console.log(products);

