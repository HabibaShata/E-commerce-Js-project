//import { Item } from "../orders.js";
import { clearCart } from "./addtoCart.js"
import { Item, Order, Address } from "./classes.js";

//Check if the user is a guuest then navigate to the log in page
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let cart = JSON.parse(localStorage.getItem("cart"));

if (!loggedInUser) {
    location.href = "../Login/login.html";
} else if (loggedInUser.userRole != "customer") { //if the user is not a customer then go back
    history.back();
}

if (cart.length == 0) {
    history.back();
}


let address = JSON.parse(localStorage.getItem("address"));
address = address == null ? [] : address;


var containerOreders = document.querySelector(".ordersBody");
let totalPrice = document.querySelector(".cart-total");
let btnCheckout = document.querySelector(".checkout");

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
          <div class="allDiv">
           <h3 class="name" >Name: ${products[order["product_id"] - 1].productName}</h3>

            <h3 class="seller">seller: ${order["seller"]}</h3>
         </div>
 
        <div class="allDiv">
    <h5 class="quantity">quantity:  ${order["quantity"]}</h5>
    <h5 class="color">color:  ${order["colorOptions"]}</h5>
    </div>
        <span class="orderItem-price">
        price:  ${products[order["product_id"] - 1].price * order["quantity"]} $
        </span>
</div>
</div> 
`
        totalPrice.innerHTML = total + parseInt(totalPrice.innerHTML) + "$";
        //console.log(totalPrice.innerHTML);
    });

    $('.checkout').on('click', () => {
        const userAddress = address.find(add => add.username == loggedInUser.userName);
        if (userAddress != null && userAddress != undefined) {
            createOrder(userAddress);
            clearCart();
        } else {
            alert('Please Fill the Address and Save it')
        }
    })

    $('#addressForm').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();
        let btn = document.getElementById("submetbtn");
        if(btn.classList.contains("disabled")){return;}
        // Retrieve values from form fields
        const phone = $('#phone').val();
        const additionalphone = $('#additionalphone').val();
        const adreess = $('#address').val();
        const info = $('#info').val();
        const region = $('#region').find(":selected").text();;
        const city = $('#city').val();

        const addressObject = new Address(loggedInUser.userName, phone, additionalphone, adreess, info, region, city);
        const userAddressIndex = address.findIndex(add => add.username === loggedInUser.userName);

        if (userAddressIndex !== -1) {
            address[userAddressIndex] = addressObject;
        } else {
            address.push(addressObject);
        }

        localStorage.setItem("address", JSON.stringify(address));
        console.log(addressObject);
        btn.classList.add("disabled")
        alert("Your address has been saved successfully")
    });

})

function createOrder(userAddress) {
    const address = new Address(
        userAddress.username,
        userAddress.phoneNumber,
        userAddress.additionalNumber,
        userAddress.address,
        userAddress.additionalInformation,
        userAddress.region,
        userAddress.city
    );

    let orders = JSON.parse(localStorage.getItem("orders"));
    orders = orders == null ? [] : orders;
    let lastOrderId = 1;
    if (orders.length > 0) {
        lastOrderId = orders[orders.length - 1].id + 1;
    }

    var cartTotal = parseInt($('.cart-total').text().replace('$', ''));

    var items = []

    const orderItems = $('.orderItem').toArray();
    orderItems.forEach(x => {
        const item = $(x); // Wrap the raw DOM element in a jQuery object

        const productId = item.data('id');
        const productName = item.find('.name').text().replace('Name: ', '');
        const image = item.find('img').attr('src');
        const option = item.find('.color').text().replace('color: ', '');
        const quantity = parseInt(item.find('.quantity').text().replace('quantity: ', ''), 10);
        const totalPrice = parseFloat(item.find('.orderItem-price').text().replace('price: ', '').replace('$', ''));
        const price = totalPrice / quantity;
        const seller = item.find('.seller').text().replace('seller: ', '');

        items.push(new Item(productId, productName, image, option, quantity, price, totalPrice, seller, "New"));


        localStorage.setItem("products", JSON.stringify(products));

    })

    const newOrder =
        new Order(
            lastOrderId,
            loggedInUser.userID,
            loggedInUser.userName,
            userAddress,
            new Date().toLocaleDateString(),
            10,
            cartTotal + 10,
            "New",
            items
        );
    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    window.location.href = `orderDetails.html?orderId=${lastOrderId}`

}
// -----  first validate ---















btnCheckout.addEventListener("click", function (e) {
//    e.preventDefault();


    cart.forEach((v) => {
        //  console.log(products[v.product_id - 1]);

        products[v.product_id - 1].quantity_sold = parseInt(products[v.product_id - 1].quantity_sold) + parseInt(v.quantity) + "";
        products[v.product_id - 1].quantity = parseInt(products[v.product_id - 1].quantity) - parseInt(v.quantity) + "";
        //add modifiy countity to cart 
        localStorage.setItem('products', JSON.stringify(products));

        // console.log(v.product_id);//id product
    })
    localStorage.setItem('cart', JSON.stringify([]));

    //localStorage.setItem('cart', JSON.stringify(cart));
    // localStorage.setItem('cart', JSON.stringify(cart));

})

// console.log(order["product_id"]);//  idProduct

// cart.forEach(order => {
//     console.log(order["product_id"]);//  id

// });

// console.log(cart);
// console.log(products);

