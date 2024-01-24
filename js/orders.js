class Address {
    constructor(_firstName, _lastName, _username, _phoneNumber, _additionalNumber, _address, _additionalInformation, _region, _city) {
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.username = _username;
        this.phoneNumber = _phoneNumber;
        this.additionalNumber = _additionalNumber;
        this.address = _address;
        this.additionalInformation = _additionalInformation;
        this.region = _region;
        this.city = _city;
    }
}
class Item {
    constructor(_productId, _productName, _image, _option, _quantity, _price, _totalPrice, _seller) {
        this.productId = _productId;
        this.productName = _productName;
        this.image = _image;
        this.option = _option;
        this.quantity = _quantity;
        this.price = _price;
        this.totalPrice = _totalPrice;
        this.seller = _seller;
    }
}


class Order {
    constructor(_id, _userId, _clientName, _clientAddress, _date, _shipping, _totalPrice, _orderStatus, _items) {
        this.id = _id;
        this.userId = _userId;
        this.clientName = _clientName;
        this.clientAddress = _clientAddress;
        this.date = _date;
        this.shipping = _shipping;
        this.totalPrice = _totalPrice;
        this.orderStatus = _orderStatus;
        this.items = _items;
    }
}

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
        if (orders != null) {
            loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser.userRole != 'seller') {
                if (loggedInUser.userRole == 'customer') {
                    orders = orders.filter(order => order.userId == loggedInUser.userID);
                }
                else {//admin
                    $('#search-div').removeAttr('hidden');
                    // data depend on the Even
                    $('#input').on('keyup', function () {
                        // console.log(this.value);
                        $("tbody")[0].innerHTML = '';
                        //orders.some(order=>order.id==1); // return bool
                        orders.forEach(order => {
                            order.items.some(item => {
                                if (item.seller.toLowerCase().includes(this.value.toLowerCase()) || this.value == '') {
                                    createdtr = document.createElement("tr");//<tr>
                                    createdtr.innerHTML = `                         
                                <td>${order.id}</td>
                                <td>${order.date}</td>
                                <td>${order.totalPrice}</td>
                                <td>${order.orderStatus}</td>
                                <td> <a href="orderDetails.html?orderId=${order.id}">View Details</a></td>`
                                    $("tbody")[0].appendChild(createdtr);
                                    return true;
                                }
                            })
                        })
                    })
                }
                // All data displayed 
                orders.forEach(order => {
                    createdtr = document.createElement("tr");//<tr>
                    createdtr.innerHTML = `                         
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.totalPrice}</td>
            <td>${order.orderStatus}</td>
            <td> <a href="orderDetails.html?orderId=${order.id}">View Details</a></td>`
                    $("tbody")[0].appendChild(createdtr);
                });
            }
            else if (loggedInUser.userRole == 'seller') {
                orders = orders.filter(order => order.items.some(item => item.seller == loggedInUser.userName));
                orders.forEach(order => {
                    createdtr = document.createElement("tr");//<tr>
                    createdtr.innerHTML = `                         
                <td>${order.id}</td>
                <td>${order.date}</td>
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

                $(".status").on("change", function () {
                    const selectedStatus = this.value;
                    const orderId = $(this).data("ordid");
                    orders.forEach(order => {
                        if (order.id === orderId) {
                            order.orderStatus = selectedStatus;
                        }
                    });
                    localStorage.setItem("orders", JSON.stringify(orders));

                })

            }
        }else{
            $("tbody")[0].innerHTML = '<div><h2>No Data Yet</h2></div>';
        }
    }
    else
        window.location.href = "Login/login.html";

}
