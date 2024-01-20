class Item {
    constructor(_productId, _productName, _image, _option, _quantity, _price, _totalPrice) {
        this.productId = _productId;
        this.productName = _productName;
        this.image = _image;
        this.option = _option;
        this.quantity = _quantity;
        this.price = _price;
        this.totalPrice = _totalPrice;
    }
}

class Order {
    constructor(_id, _userId, _clientName, _clientAddress, _seller, _date, _shipping, _totalPrice, _orderStatus, _items) {
        this.id = _id;
        this.userId = _userId;
        this.clientName = _clientName;
        this.clientAddress = _clientAddress;
        this.seller = _seller;
        this.date = _date;
        this.shipping = _shipping;
        this.totalPrice = _totalPrice;
        this.orderStatus = _orderStatus;
        this.items = _items;
    }
}

let orders = [
    new Order(1, 2, "John Doe", "123 Main St, Cityville", "Lacasa Store", "2022-04-20", 10, 290.0, "Order Received", [
        new Item(1, "Jewellery", "images/p1.png", "Red", 5, 50.0, 250.0),
        new Item(3, "Artwork", "images/p2.png", "Black", 4, 6.0, 24.0),
        new Item(2, "Accessories", "images/p3.png", "White", 2, 3.0, 6.0)
    ]),
    new Order(2, 1, "Alice Smith", "456 Oak St, Townsville", "Zara Store", "2022-04-19", 12, 18.0, "Processing", [
        new Item(2, "Accessories", "images/p2.png", "Black", 2, 3.0, 6.0)
    ]),
    new Order(3, 2, "John Doe", "789 Pine St, Villagetown", "LC WAIKIKI Store", "2022-04-18", 15, 40.0, "Order Shipped", [
        new Item(3, "Artwork", "images/p3.png", "White", 4, 6.25, 25.0)
    ]),
];

localStorage.setItem("orders", JSON.stringify(orders));


$(function () {
    GetOrders();
});

function GetOrders() {
    var orders;
    var createdtr;
    var loggedInUser;
    var userCheck;

    orders = JSON.parse(localStorage.getItem("orders"));
    userCheck = localStorage.getItem("loggedInUser");

    if (userCheck != null || userCheck != undefined) {

        loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser.userRole == 'admin') {
            orders.forEach(order => {
                createdtr = document.createElement("tr");//<tr>
                createdtr.innerHTML = `                         
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.seller}</td>
            <td>${order.totalPrice}</td>
            <td>${order.orderStatus}</td>
            <td> <a href="orderDetails.html?orderId=${order.id}">View Details</a></td>
            <td><span class="delete-icon" data-ordid="${order.id}">❌</span></td>`
                $("tbody")[0].appendChild(createdtr);
            });

            $(".delete-icon").on('click', function () {
                const orderId = $(this).data("ordid");
                orders = orders.filter(order => order.id != orderId);
                localStorage.setItem("orders", JSON.stringify(orders));
                $(this).closest("tr").remove();
            })

        }
        else if (loggedInUser.userRole == 'seller') {
            orders = orders.filter(order => order.seller == loggedInUser.userName);
            orders.forEach(order => {
                createdtr = document.createElement("tr");//<tr>
                createdtr.innerHTML = `                         
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.seller}</td>
                <td>${order.totalPrice}</td>
                <td>
                <select class="form-control status" data-ordid="${order.id}" >
                 <option selected hidden >${order.orderStatus}</option>
                 <option>New</option>
                 <option>In progress</option>
                 <option>Completed</option>
                </select>
                </td>
                <td> <a href="orderDetails.html?orderId=${order.id}">View Details</a></td>`
                $("tbody")[0].appendChild(createdtr);
            });
            
           $(".status").on("change", function(){
            const selectedStatus =this.value;
                const orderId = $(this).data("ordid");
                orders.forEach(order => {
                    if (order.id === orderId) {
                        order.orderStatus = selectedStatus;
                    }
                });
                localStorage.setItem("orders", JSON.stringify(orders));

           })

        }
        else {
            orders = orders.filter(order => order.userId == loggedInUser.userID);
            orders.forEach(order => {
                createdtr = document.createElement("tr");//<tr>
                createdtr.innerHTML = `                         
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.seller}</td>
                <td>${order.totalPrice}</td>
                <td>${order.orderStatus}</td>
                <td> <a href="orderDetails.html?orderId=${order.id}">View Details</a></td>`
                $("tbody")[0].appendChild(createdtr);
            });
        }
    }
    else
        window.location.href = "Login/login.html";

}
