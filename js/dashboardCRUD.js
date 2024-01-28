import {Product} from "./classes.js";
import { products } from "./custom.js";
///////////// selectors///////////////
// Selectors

var tbody = document.querySelector("tbody");
var submitButton = document.getElementById('submitButton');
var searchBar = document.getElementById('searchBar');
// Select all elements with the class 'delete' and store them in the 'deleteButtons' variable
 var deleteButtons = document.querySelectorAll('.delete');
 var submit = document.querySelector(".submitLink");
 ////formaddingSelectors
 var _ProductName = document.getElementById("ProductName");
var _price = document.getElementById("price");
var _Quntity = document.getElementById("Quntity");
var description = document.getElementById("description");
var category = document.getElementById("category");
var _productImage = document.getElementById("productImage");
 var btnAdd = document.querySelector(".add-new");
 var checkboxes = document.querySelectorAll('.color-checkbox');


// Data Arrays
let arrOfproduct = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Initialize table and event listeners on window load
window.addEventListener("load", function () {
    creatTableofData();
    attachEventListeners();
    deleteProduct();

    
table_rows = document.querySelectorAll('tbody tr'),
table_headings = document.querySelectorAll('thead th');
    
   
    table_headings.forEach((head, i) => {

        let sort_asc = true;
        if (i == 1 || i == 3 || i == 4) {
            head.onclick = (e) => {
                // console.log(e.target);
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


    });
    
    


function attachEventListeners() {
    // Edit and View button event listeners
    tbody.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit")) {
            handleEditClick(e.target.dataset.id);
        } else if (e.target.classList.contains("view")) {
            handleViewClick(e.target.dataset.id);
        }
    });

    searchBar.addEventListener('input', handleSearch);

    submitButton.addEventListener("click", handleSubmitButtonClick);
}

function handleEditClick(productId) {
    let productData = arrOfproduct.find(product => product.productId == productId);
    populateFormWithProductData(productData);
}

function handleViewClick(productId) {
    displayProduct(productId);
}

function handleSubmitButtonClick(event) {
    event.preventDefault();
    let editedProduct = getEditedValues();
    
        updateProductData(editedProduct);
        
        location.reload();
    
}

function populateFormWithProductData(data) {
    const modalFields = document.querySelector('.modal-fields');
    modalFields.innerHTML =  `
            <div class="form-group">
            <label>Product ID</label>
            <small id="productIdMessage" class="form-text  text-danger"></small>
            <input class="form-control" type="text" name="productId" id="productId" value="${data.productId}">
        </div>
        <div class="form-group">
            <label>Category</label>
            <small id="categoryMessage" class="form-text  text-danger"></small>
            <select class="form-select form-select-sm"
            aria-label=".form-select-sm example" id="category" value="${data.category}">>
            <label for="">
                seclect category
            </label>
            <option selected disabled>category</option>
            <option value="jewellery">jewellery</option>
            <option value="artwork">artwork</option>
            <!-- span invalid input -->
            <span class="is-invalid"> *must choose catigery </span>
        </select> 
        </div>
        <div class="form-group">
            <label>Product Name</label>
            <small id="nameMessage" class="form-text  text-danger"></small>
            <input class="form-control" type="text" name="productName"
                id="productName" value="${data.productName}">
        </div>
        <div class="form-group">
            <label>Images</label>
            <small id="imagesMessage" class="form-text  text-danger"></small>
            <input class="form-control" type="text" name="images" id="images" value="${data.images[0]}">
        </div>

        <div class="form-group">
            <label>Seller Name</label>
            <small id="sellerMessage" class="form-text  text-danger"></small>
            <input class="form-control" type="text" name="sellerName" value="${data.sellerName}"
                id="sellerName">
        </div>


        <div class="form-group">
            <label>Price</label>
            <small id="priceMessage" class="form-text  text-danger"></small>
            <input class="form-control" type="text" name="price" id="price" value="${data.price}">
        </div>
        </div>
        `
}

function validateFormData(originalData) {
    

    // Validate Product ID
    if (document.querySelector("#productId").value !== originalData.productId) {
        errors.productId = "Product ID cannot be changed.";
    }

    // Validate Product Name
    if (!/^[0-9]+$/.test(document.querySelector("#productName").value)) {
        errors.productName = "Product Name should only contain numbers.";
    }

    // Validate Images
    if (!document.querySelector("#images").value.endsWith(".jpg")) {
        errors.images = "Image must be a .jpg file.";
    }

    // Validate Seller Name
    if (document.querySelector("#sellerName").value !== originalData.sellerName) {
        errors.sellerName = "Seller Name cannot be changed.";
    }

    // Validate Price
    if (!/^[0-9]+(\.[0-9]+)?$/.test(document.querySelector("#price").value)) {
        errors.price = "Price should only contain numbers.";
    }

    displayErrors(errors);

    return Object.keys(errors).length === 0;
}

function displayErrors(errors) {
    document.querySelectorAll('.form-text.text-danger').forEach(small => {
        small.textContent = '';
    });

    // Set error messages
    if (errors.productId) {
        document.querySelector("#productIdMessage").textContent = errors.productId;
    }
    if (errors.productName) {
        document.querySelector("#nameMessage").textContent = errors.productName;
    }
    if (errors.images) {
        document.querySelector("#imagesMessage").textContent = errors.images;
    }
    if (errors.sellerName) {
        document.querySelector("#sellerMessage").textContent = errors.sellerName;
    }
    if (errors.price) {
        document.querySelector("#priceMessage").textContent = errors.price;
    }
    // Show or hide the error message box
    const anyErrorMessagesVisible = [...document.querySelectorAll(`.form-text.text-danger`)].some(m => m.textContent);


}

function getEditedValues() {
    return {
        productId: document.querySelector("#productId").value,
        productName: document.querySelector("#productName").value,
        images: [document.querySelector("#images").value], 
        sellerName: document.querySelector("#sellerName").value,
        category: document.querySelector("#category").value,
        price: document.querySelector("#price").value
    };
}

function updateProductData(EditedValues) {
    const index = arrOfproduct.findIndex(products => products.productId == EditedValues.productId);
    if (index !== -1) {
        arrOfproduct[index] = { ...arrOfproduct[index], ...EditedValues };
        console.log("Updated Product Data", arrOfproduct[index]);
        updateLocalStorage(arrOfproduct);
        creatTableofData();
    } else {
        console.error("Product not found in array. ID: ", EditedValues.productId);
    }
}

function displayProduct(productId) {
    let productDetails = arrOfproduct.find(item => item.productId == productId);
    if (productDetails) {
        document.querySelector('#exampleModalLong2 .modal-body2').innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Product Name:</strong> ${productDetails.productName}</p>
                        <p><strong>Price:</strong> ${productDetails.price}</p>
                        <p><strong>Sold by:</strong> ${productDetails.sellerName}</p>
                        <p><strong>Category:</strong> ${productDetails.category}</p>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <img src="${productDetails.images[0]}" alt="Product Image" class="img-fluid">
                    </div>
                </div>
            </div>
        `;
    } else {
        console.log("No such product exists");
    }
}


function handleSearch(e) {
    let searchValue = searchBar.value.toLowerCase();
    let allRows = tbody.getElementsByTagName("tr");
    for (let row of allRows) {
        let rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchValue) ? "" : "none";
    }
}



function updateLocalStorage(arrOfproduct) {
    localStorage.setItem("products", JSON.stringify(arrOfproduct));
}

function creatTableofData() {
    for (let index = arrOfproduct.length-1; index >= 0; index--) {
        var element = arrOfproduct[index];
        tbody.innerHTML += `
          <tr>
          <td>${element.productId}</td>
          <td>${element.productName}</td>
          <td><img src="${element["images"][0]}"/></td>
          <td>${element.sellerName}</td>
          <td>${element.category}</td>
          <td>${element.price}</td>
          <td>
                      <a href="#" class="edit" title="Edit" data-bs-toggle="modal" data-bs-target="#userFormModal">
                      <i class="material-icons edit" data-id="${element.productId}">&#xE254;</i>
                  </a>
                  <!-- View Link -->
                  <a href="#" title="View" data-bs-toggle="modal" data-bs-target="#exampleModalLong2" >
                      <i data-id="${element.productId}" class="view material-icons">&#xE417;</i>
                  </a>
              <a href="#"  title="Delete"  data-id="${element.productId}" class="delete trigger-btn"><i
                      class=" material-icons text-danger">&#xE872;</i></a>
          </td>
         </tr>`

    }
    
}


// Declare variables for later use; these will be assigned values at runtime

var table_headings, table_rows;
/////

function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));

}



/*end hissen*/ 

///////////////// sort////////////////

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}
// Function to update local storage with an array of products






//     let isnotvalidForm = true;
//     if (!istextvalid(_ProductName.value)) {
//         document.getElementById("ProductName").classList.toggle("is-invalid");
//         isnotvalidForm = false;
//         //return false;  
//     } else {
//         document.getElementById("ProductName").classList.remove("is-invalid");
//     }
//     if (!isnumbervalid(_Quntity.value)) {
//         document.getElementById("Quntity").classList.add("is-invalid");
//         isnotvalidForm = false;
//         // return false;
//     } else {
//         document.getElementById("Quntity").classList.remove("is-invalid");
//     }
//     if (!isnumbervalid(_price.value)) {
//         document.getElementById("price").classList.add("is-invalid");
//         isnotvalidForm = false;
//         // return false;
//     } else {
//         document.getElementById("price").classList.remove("is-invalid");
//     } if (!istextvalid(description.value)) {
//         document.getElementById("description").classList.add("is-invalid");
//         isnotvalidForm = false;
//         //return false;
//     } else {
//         document.getElementById("description").classList.remove("is-invalid");
//     }

//     if (!istextvalid(category.value)) {
//         document.getElementById("Catogry").classList.add("is-invalid");
//         isnotvalidForm = false;
//         //return false;
//     }
//     else {
//         document.getElementById("category").classList.remove("is-invalid");
//     }

//     return isnotvalidForm;
// }
// Event handler for the click event on the "submit" form 
submit.addEventListener('click',Add)

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

    var newProduct = new Product(lastID + 1, _ProductName.value, category.value, JSON.parse(localStorage.getItem("loggedInUser")).userName, _Quntity.value, "0", imgesInput, _price.value, description.value, selectedValues);

    // console.log(newProduct);
    // console.log(newProduct["images"]);
    arrOfproduct.push(newProduct);

    updateLocalStorage(arrOfproduct);

    console.log("arr => html", arrOfproduct);
    // updateLocalStorage(arrOfproduct);
    location.reload();
    // creatTableofData();
   


}

// open modal
btnAdd.addEventListener("click", function () {

    $('#myModal2').modal('show');

})

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

        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {// Show the Bootstrap modal when a delete button is clicked
                trdeleted = $(e.target.parentElement).closest('tr');
                idProduct = e.target.parentElement.dataset.id; // id product
                $('#myModal').modal('show'); // Display the modal to confirm the deletion
                // console.log(trdeleted);
    
            });
    
    
        });
            deleteButtons.forEach(function (button) {
                button.addEventListener('click', function (e) {// Show the Bootstrap modal when a delete button is clicked
                    trdeleted = $(e.target.parentElement).closest('tr');
                    idProduct = e.target.parentElement.dataset.id; // id product
                    $('#myModal').modal('show'); // Display the modal to confirm the deletion
                    // console.log(trdeleted);
        
                });
        
        
            });
        }
        // trdeleted = $(e.target.parentElement).closest('tr');

        
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
});

