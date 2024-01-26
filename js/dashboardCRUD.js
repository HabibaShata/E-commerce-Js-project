///////////// selectors///////////////
var tbody = document.querySelector("tbody")
var tableTr = document.querySelectorAll("table  tr")
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
var _productImage = document.getElementById("productImage");
var checkboxes = document.querySelectorAll('.color-checkbox');

// Declare variables for later use; these will be assigned values at runtime
var deleteButtons;
var cancledBtn;
var deleteConfirmBtn;
var table_headings, table_rows;
/////


// first thing when window loaded 
window.addEventListener("load", function () {
    creatTableofData();
    // Select all elements with the class 'delete' and store them in the 'deleteButtons' variable
    deleteButtons = document.querySelectorAll('.delete');
    // Select the first element with the class 'Delete' and store it in the 'deleteConfirmBtn' variable
    deleteConfirmBtn = document.querySelector('.confirmDelete');
    cancledBtn = document.querySelector('.cancle');
    deleteProduct();

    /*////////////////////////////////////////////////////
        Functionality for sorting table columns
    ////////////////////////////////////////////////////*/
        table_rows = document.querySelectorAll('tbody tr'),
        table_headings = document.querySelectorAll('thead th');
    //
   
    table_headings.forEach((head, i) => {

        let sort_asc = true;
        if (i == 1 || i == 3 || i == 4) {
            head.onclick = (e) => {
                // console.log(e.0target);
                table_headings.forEach(head => head.classList.remove('active'));
                head.classList.add('active');

                document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
                table_rows.forEach(row => {
                    row.querySelectorAll('td')[i].classList.add('active');
                })

                head.classList.toggle('asc', sort_asc);
                sort_asc = head.classList.contains('asc') ? false : true;

                sortTable(i, sort_asc);
            }
            // console.log(head);
        }


    })


})

///////////////// sort////////////////
function sortTable(column, sort_asc) {

     console.log([...tableTr]);
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));



}

let arrOfproduct, cart;
if (localStorage.getItem("products")) {
    console.log("Local storage exists.");
    arrOfproduct = JSON.parse(localStorage.getItem("products"));
}
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}
// Function to update local storage with an array of products
function updateLocalStorage(arrOfproduct) {
    console.log("Updating local storage with products:", arrOfproduct);
    localStorage.setItem("products", JSON.stringify(arrOfproduct));
}
// Function to create and populate an HTML table with product data
function creatTableofData() {
    //  let products = JSON.parse(localStorage.getItem("products"));

    tbody.innerHTML = ''
    arrOfproduct.forEach(product => {
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
function istextvalid(val) {
    console.log(val != null && /^[a-zA-Z\s]*$/.test(val) && val.length >= 3);
    return val != null && /^[a-zA-Z\s]*$/.test(val) && val.length >= 3;
}
function isnumbervalid(val) {
    console.log(val != null && val.trim() != "" && /^[0-9]+$/.test(val));

    return val != null && val.trim() != "" && /^[0-9]+$/.test(val);
}

function vaildData() {
    let isnotvalidForm = true;
    if (!istextvalid(_ProductName.value)) {
        document.getElementById("ProductName").classList.toggle("is-invalid");
        isnotvalidForm = false;
        //return false;  
    } else {
        document.getElementById("ProductName").classList.remove("is-invalid");
    }
    if (!istextvalid(_sellerName.value)) {
        document.getElementById("sellerName").classList.toggle("is-invalid");
        isnotvalidForm = false;
        //return false;
    } else {
        document.getElementById("sellerName").classList.remove("is-invalid");
    }
    if (!isnumbervalid(_Quntity.value)) {
        document.getElementById("Quntity").classList.add("is-invalid");
        isnotvalidForm = false;
        // return false;
    } else {
        document.getElementById("Quntity").classList.remove("is-invalid");
    }
    if (!isnumbervalid(_price.value)) {
        document.getElementById("price").classList.add("is-invalid");
        isnotvalidForm = false;
        // return false;
    } else {
        document.getElementById("price").classList.remove("is-invalid");
    } if (!istextvalid(description.value)) {
        document.getElementById("description").classList.add("is-invalid");
        isnotvalidForm = false;
        //return false;
    } else {
        document.getElementById("description").classList.remove("is-invalid");
    }

    if (!istextvalid(category.value)) {
        document.getElementById("Catogry").classList.add("is-invalid");
        isnotvalidForm = false;
        //return false;
    }
    else {
        document.getElementById("category").classList.remove("is-invalid");
    }

    /*if (!istextvalid(checkboxes.values)) {
        document.getElementById("color-checkbox").classList.add("is-invalid");
        isnotvalidForm = false;
        //return false;
    }
    else {
        document.getElementById("color-checkbox").classList.remove("is-invalid");
    } 
    // if (!isImgValid(_productImage)) {
    //     document.getElementById("productImage").classList.add("is-invalid");
    //     isnotvalidForm = false;
    //     //return false;
    // } else {
    //     document.getElementById("productImage").classList.remove("is-invalid");
    // }
   */

    return isnotvalidForm;
}
// Event handler for the click event on the "submit" form 
submit.onclick = function (e) {
    // Check the validity of the data using the vaildData() function
    // console.log(vaildData());
    // if (!vaildData())
    if (true) {
        // Close the modal (assuming closeModal() is a function that handles modal closure)
        closeModal();

        // Call the Add() function (assuming Add() is a function that adds the data)
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
    // "images/p12.png"
    // console.log(_productImage.value);
    var lastIndex = _productImage.value.lastIndexOf("\\");
    _productImage = _productImage.value.slice(lastIndex + 1);
    _productImage = `images/${_productImage}` // concat src
    imgesInput.push(_productImage)
    // console.log(_productImage);
    // console.log(imgesInput);
    var lastID = Math.max(...arrOfproduct.map(product => product.productId), 0); // to get max id 

    var newProduct = {
        productId: lastID + 1,
        productName: _ProductName.value,
        category: category.value,
        sellerName: _sellerName.value,
        quantity: _Quntity.value,
        quantity_sold: "0",
        images: imgesInput,
        price: _price.value,
        description: description.value,
        options: selectedValues,
    };


    // console.log(newProduct);
    // console.log(newProduct["images"]);
    arrOfproduct.push(newProduct);

    updateLocalStorage(arrOfproduct);

    console.log("arr => html", arrOfproduct);
    // updateLocalStorage(arrOfproduct);
    creatTableofData();

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
/*//////////////----Delete--/////////////////*/

function deleteProduct() {
    console.log("___________");

    var positionThisProductInCart;
    var bodyMsgConfirm = document.querySelector(".modal-content");
    var trdeleted;
    var idProduct;
    var positionThisProductInProduct;;
    // Iterate through each delete button and attach a click event listener

    tbody.addEventListener('click', function (e) {// Show the Bootstrap modal when a delete button is clicked
        e.preventDefault();
        if (e.target.parentElement.classList.contains("delete")) {

            console.log(e.target.parentElement.dataset.id);
            idProduct = e.target.parentElement.dataset.id; // id product
            $('#myModal').modal('show'); // Display the modal to confirm the deletion
        }
        // trdeleted = $(e.target.parentElement).closest('tr');

        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {// Show the Bootstrap modal when a delete button is clicked
                trdeleted = $(e.target.parentElement).closest('tr');
                idProduct = e.target.parentElement.dataset.id; // id product
                $('#myModal').modal('show'); // Display the modal to confirm the deletion
                // console.log(trdeleted);
    
            });
    
    
        });0
    });


 
    // console.log(bodyMsgConfirm);

    // Add a click event listener to the delete confirmation button
    bodyMsgConfirm.addEventListener('click', function (e) {
        // Delete the item from the HTML and product array
        if (e.target.classList.contains("confirmDelete")) {
            // Find the position of the product in the cart array
            positionThisProductInCart = cart.findIndex((value) => value.product_id == idProduct);

            // Find the position of the product in the product array
            positionThisProductInProduct = arrOfproduct.findIndex((value) => {

                return idProduct == value.productId;   // return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
            })
            console.log(positionThisProductInProduct, arrOfproduct[idProduct - 1]);
            if (positionThisProductInCart == -1) {
                // Remove the product from the product array
                arrOfproduct.splice(positionThisProductInProduct, 1);
                localStorage.setItem("products", JSON.stringify(arrOfproduct));
                creatTableofData();
                // Remove the corresponding row from the HTML table
                $(trdeleted).remove();
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
