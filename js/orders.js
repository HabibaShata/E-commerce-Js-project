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
    constructor(_id, _clientName, _clientAddress, _seller, _date, _shipping, _totalPrice, _orderStatus, _items, _updateStatus) {
        this.id = _id;
        this.clientName = _clientName;
        this.clientAddress = _clientAddress;
        this.seller = _seller;
        this.date = _date;
        this.shipping = _shipping;
        this.totalPrice = _totalPrice;
        this.orderStatus = _orderStatus;
        this.items = _items;
        this.updateStatus = _updateStatus;
    }
}

let orders = [
    new Order(1, "John Doe", "123 Main St, Cityville", "Lacasa Store", "2022-04-20", 10, 290.0, "Order Received", [
        new Item(1, "Jewellery", "images/p1.png", "Red", 5, 50.0, 250.0),
        new Item(3, "Artwork", "images/p2.png", "Black", 4, 6.0, 24.0),
        new Item(2, "Accessories", "images/p3.png", "White", 2, 3.0, 6.0)
    ], "Processing"),
    new Order(2, "Alice Smith", "456 Oak St, Townsville", "Zara Store", "2022-04-19", 12, 18.0, "Processing", [
        new Item(2, "Accessories", "images/p2.png", "Black", 2, 3.0, 6.0)
    ], "In Transit"),
    new Order(3, "Bob Johnson", "789 Pine St, Villagetown", "LC WAIKIKI Store", "2022-04-18", 15, 40.0, "Order Shipped", [
        new Item(3, "Artwork", "images/p3.png", "White", 4, 6.25, 25.0)
    ], "Delivered"),
];

localStorage.setItem("orders", JSON.stringify(orders));


$(function () {
    GetOrders();
});

function GetOrders(ordersList) {
    var orders;
    var createdtr;

    if (ordersList != undefined)
        orders = ordersList;
    else 
        orders = JSON.parse(localStorage.getItem("orders"));
    

    orders.forEach(order => {
        createdtr = document.createElement("tr");//<tr>
        createdtr.innerHTML = `                         
          <td>${order.id}</td>
          <td>${order.date}</td>
         <td>${order.seller}</td>
         <td>${order.totalPrice}</td>
         <td>${order.updateStatus}</td>
         <td> <a href="orderDetails.html?orderId=${order.id}">View Details</a></td>`
        $("tbody")[0].appendChild(createdtr);
    });

}
