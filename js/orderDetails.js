import { renderingNavBar, LogOut } from "./general-methods.js";

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
    history.back();
}

$(function () {
    //implement the logout functionality
    renderingNavBar();
    LogOut();

    const searchParams = new URLSearchParams(window.location.search);

    const orderId = searchParams.get('orderId');
    const orders = JSON.parse(localStorage.getItem("orders"));
    const order = orders.find(x => x.id == orderId);//get the order depend on the id in search bar

    var userCheck = localStorage.getItem("loggedInUser");// to check who is in 

    if (userCheck != null || userCheck != undefined) {
        var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        var targetItems = order.items;

        if (loggedInUser.userRole == 'seller') { // if the user is seller display it"s own order  else=> display thr order as usual
            targetItems = order.items.filter(item => item.seller == loggedInUser.userName);
        }
        

        $('#id').text('#' + order.id);
        $('#date').text('Date: ' + order.date);
        $("#status").text(order.orderStatus);
        $("#seller").text('Seller:  ' + order.seller);


        targetItems.forEach(item => {
            var createdtr = document.createElement("tr");//<tr>
            createdtr.innerHTML =
                `<td>
                        <div class="d-flex mb-2">
                            <div class="flex-shrink-0" style="margin: 2%;">
                                <img src="${item.image}" width="45">
                            </div>
                            <div class="flex-lg-grow-1 ms-3" style="margin: 2%;">
                                <h6 class="small mb-0"><a href="#" class="text-reset">${item.productName}</a></h6>
                                <span class="small">${item.option}</span>
                            </div>
                        </div>
                    </td>
                    <td>${item.seller} </td>
                    <td class="text-end">${item.price}$</td>
                    <td>${item.quantity}</td>
                    <td>${item.quantity * item.price}$</td> `

            $("tbody")[0].appendChild(createdtr);
        })
      
        $("#shipping").text(order.shipping + '$');// it is the same 

       if(loggedInUser.userRole == 'seller'){
        var orderSubTotalPrice=0;
        targetItems.forEach(item=>{ // get the price from each item in seller"s order
             orderSubTotalPrice+= item.totalPrice;
        })

        $("#total").text((orderSubTotalPrice + order.shipping)+'$');
        $("#subtotal").text((orderSubTotalPrice ) + '$');

       }else{
        $("#total").text(order.totalPrice + '$');// from checkout
        $("#subtotal").text((order.totalPrice - order.shipping) + '$');
       }

        const completeAddress = `${order.clientAddress.firstName} ${order.clientAddress.lastName}<br>${order.clientAddress.address}<br>${order.clientAddress.additionalInformation ? order.clientAddress.additionalInformation + "<br>" : ""}${order.clientAddress.region}, ${order.clientAddress.city}<br>Phone: ${order.clientAddress.phoneNumber}`;
        $("#address").html(completeAddress);


    }
    else
        window.location.href = "Login/login.html";
})