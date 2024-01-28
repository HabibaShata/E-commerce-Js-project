///////////// selectors///////////////
var tbody = document.querySelector("tbody")
// var tableTr = document.querySelectorAll("table  tr")
var btnAdd = document.querySelector(".add-new");
var submit = document.querySelector(".submitLink");
//selector modal //  
var close = document.querySelector(".close");
var closex = document.querySelector(".clsBtn");
//selectors form//
var _ProductName = document.getElementById("ProductName");
var _price = document.getElementById("price");
var _Quntity = document.getElementById("Quntity");
var _sellerName = document.getElementById("sellerName");
var description = document.getElementById("description");
var category = document.getElementById("category");
var img1 = document.getElementById("productImage");
var img2 = document.getElementById("productImage2");
var checkboxes = document.querySelectorAll('.color-checkbox');

// Declare variables for later use; these will be assigned values at runtime
var deleteButtons;
var table_headings, table_rows;
/////

let allProducts;

if (localStorage.getItem("products")) {
    allProducts = JSON.parse(localStorage.getItem("products"));
}
let sellerName = JSON.parse(localStorage.getItem("loggedInUser")).userName;

let sellerArr = allProducts.filter((product) => product.sellerName == sellerName
)
function creatTableofData() {

    tbody.innerHTML = ''
    sellerArr.forEach(product => {
        tbody.innerHTML += `
          <tr>
          <td>${product.productId}</td>
          <td>${product.productName}</td>
          <td><img src="${product["images"][0]}"/></td>
          <td>${product.sellerName}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>
              <a href="#" class="view" title="View" data-toggle="tooltip"><i
                      class="material-icons">&#xE417;</i></a>
              <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i
                      class="material-icons">&#xE254;</i></a>
              <a href="#"  title="Delete"  data-id="${product.productId}" class="delete trigger-btn"><i
                      class=" material-icons text-danger">&#xE872;</i></a>
          </td>
         </tr>`

    });
}




let cart;
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}
// Function to update local storage with an array of products
function updateLocalStorage(arrOfproduct) {
    console.log("Updating local storage with products:", arrOfproduct);
    localStorage.setItem("products", JSON.stringify(arrOfproduct));
}
// 
// first thing when window loaded 
window.addEventListener("load", function () {
    creatTableofData();
    // Select all elements with the class 'delete' and store them in the 'deleteButtons' variable
    deleteButtons = document.querySelectorAll('.delete');
    var idProduct;

    deleteButtons.forEach((delBtn) => {
        console.log(delBtn);
        delBtn.addEventListener("click", function (e) {
            e.preventDefault();
            idProduct = parseInt(e.target.parentElement.dataset.id);
            deleteProduct(idProduct);
            // console.log(e.target.parentElement.dataset.id);
        });
    })

})
    /*//////////////////funcyion  Delete ////////////   */
function deleteProduct(idDeleProduct) {
    $('#myModal').modal('show'); // Display the modal to confirm the deletion
    var bodyMsgConfirm = document.querySelector(".modal-content");
    var element = document.querySelector('[data-id="' + idDeleProduct + '"]');
    var parentTrDeleted = element.closest('tr');
    var positionThisProductInArrSeller;
    var positionThisProductInProduct;
    var positionThisProductInCart;

    // Iterate through each delete button and attach a click event listener


    // Add a click event listener to the delete confirmation button
    bodyMsgConfirm.addEventListener('click', function (e) {
        console.log(e.target);
        // Delete the item from the HTML and product array
        if (e.target.classList.contains("Delete")) {
            // Find the position of the product in the cart array
            positionThisProductInCart = cart.findIndex((value) => value.product_id == idDeleProduct);

            // Find the position of the product in the product array
            positionThisProductInProduct = allProducts.findIndex((value) => {

                return idDeleProduct == value.productId;   // return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
            })
            positionThisProductInArrSeller = sellerArr.findIndex((value) => {

                return idDeleProduct == value.productId;   // return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
            })


            console.log(idDeleProduct);
            console.log("#3###$$$$");
            console.log(cart,"ind",positionThisProductInCart);
            console.log(allProducts,"index",positionThisProductInProduct);
            console.log(sellerArr,"index",positionThisProductInArrSeller);


            if (positionThisProductInCart == -1) {
                // Remove the product from the product array  in localStorage and SellerArr 
               allProducts.splice(positionThisProductInProduct, 1);
               sellerArr.splice(positionThisProductInArrSeller, 1);
                localStorage.setItem("products", JSON.stringify(allProducts));

               parentTrDeleted.remove();
               creatTableofData();
                // Remove the corresponding row from the HTML table
                $('#myModal').removeClass('fade');
                $('#myModal').modal('hide');


            } else {
                // If the item is already in the cart, display an alert
                alert("Item already in cart");
                // console.log("Item already in cart");
            }
        } else {
            // Hide the modal after deletion
            $('#myModal').removeClass('fade');
            $('#myModal').modal('hide');
        }



    })

}



// Event handler for the click event on the "submit" form 
submit.onclick = function (e) {
    // Check the validity of the data using the vaildData() function
    if (true) {
        closeModal();
        Add();
    } else {
        e.preventDefault();
    }
}

function Add() {
    var selectedValues = [];
    // Add a change event listener to each checkbox
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });
    var imgesInput = [];// arr of imges
     console.log(img1.value);
     console.log(img2.value);

     var lastIndex = img1.value.lastIndexOf("\\");
     img1 = img1.value.slice(lastIndex + 1);
     img1 = `images/${img1}` // concat src
     imgesInput.push(img1)

     var lastIndex2 = img2.value.lastIndexOf("\\");
     img2 = img2.value.slice(lastIndex2 + 1);
     img2 = `images/${img2}` // concat src
    imgesInput.push(img2)
    console.log(imgesInput);
    var lastID = Math.max(...allProducts.map(product => product.productId), 0); // to get max id 

    var newProduct = {
        productId: lastID + 1,
        productName: _ProductName.value,
        category: category.value,
        sellerName:`${sellerName}`,
        quantity: _Quntity.value,
        quantity_sold: "0",
        images: imgesInput,
        price: _price.value,
        description: description.value,
        options: selectedValues,
    };
    sellerArr.push(newProduct);
    console.log(sellerArr);
    updateLocalStorage(sellerArr);
    location.reload();
    //creatTableofData();
   


}

// open modal
btnAdd.addEventListener("click", function () {

    $('#myModal2').modal('show');

})
close.addEventListener("click", closeModal)
closex.addEventListener("click", closeModal)

function closeModal() {
    // Hide the modal after deletion
    $('#myModal2').removeClass('fade');
    // Hide the modal after deletion
    $('#myModal2').modal('hide');
}




