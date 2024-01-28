import { categories } from "./classes.js";
import{LogOut} from "./general-methods.js"
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
//////////
var submitButton = document.getElementById('submitButton');
var searchBar = document.getElementById('searchBar');
// Declare variables for later use; these will be assigned values at runtime
var deleteButtons;
var table_headings, table_rows;
/////

let arrOfproduct;

if (localStorage.getItem("products")) {
    arrOfproduct = JSON.parse(localStorage.getItem("products"));
}
let sellerName = JSON.parse(localStorage.getItem("loggedInUser")).userName;

let sellerArr = arrOfproduct.filter((product) => product.sellerName == sellerName
)





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
    attachEventListeners();

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
    searchBar.addEventListener('input', handleSearch);
    submitButton.addEventListener("click", handleSubmitButtonClick);
    function attachEventListeners() {
        // Edit and View button event listeners
        tbody.addEventListener("click", function (e) {
            if (e.target.classList.contains("edit")) {
                handleEditClick(e.target.dataset.id);
            } else if (e.target.classList.contains("view")) {
                handleViewClick(e.target.dataset.id);
            }
        })
        };
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
            positionThisProductInProduct = arrOfproduct.findIndex((value) => {

                return idDeleProduct == value.productId;   // return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
            })
            positionThisProductInArrSeller = sellerArr.findIndex((value) => {

                return idDeleProduct == value.productId;   // return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
            })


            console.log(idDeleProduct);
            console.log("#3###$$$$");
            console.log(cart,"ind",positionThisProductInCart);
            console.log(arrOfproduct,"index",positionThisProductInProduct);
            console.log(sellerArr,"index",positionThisProductInArrSeller);


            if (positionThisProductInCart == -1) {
                // Remove the product from the product array  in localStorage and SellerArr 
             //   arrOfproduct.splice(positionThisProductInProduct, 1);
              //  sellerArr.splice(positionThisProductInArrSeller, 1);
               //  localStorage.setItem("products", JSON.stringify(arrOfproduct));

               // parentTrDeleted.remove();
              //  creatTableofData();
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
    var lastID = Math.max(...arrOfproduct.map(product => product.productId), 0); // to get max id 

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




/////hussien
function populateFormWithProductData(data) {
    const modalFields = document.querySelector('.modal-fields');
    //save the old data in the updatedProductData object

    modalFields.innerHTML =  `
    <div class="form-group">
        <label>Product ID</label>
        <small id="productIdMessage" class="form-text  text-danger"></small>
        <input class="form-control" type="text" name="productId" id="productId" value="${data.productId}" readonly>
    </div>
    <div class="form-group">
        <label>Category</label>
        <small id="categoryMessage" class="form-text  text-danger"></small>
        <select class="form-select form-select-sm"
        aria-label=".form-select-sm example" id="category" value="${data.category}">    
        ${
            categories.map(element => 
            {
                if(element.toLowerCase() == data.category.toLowerCase())
                {
                    return `<option value="${element}" selected>${element}</option>`
                } 
                return `<option value="${element}">${element}</option>`
            }).join('')
        }
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
        <input class="form-control" required type="file" name="images" id="images" onchange="console.log(this.value)">
        <img class="img-fluid" src="${data.images[0]}" alt="">
    </div>

    <div class="form-group">
        <label>Seller Name</label>
        <small id="sellerMessage" class="form-text  text-danger"></small>
        <input class="form-control" type="text" name="sellerName" value="${data.sellerName}"
            id="sellerName" disabled>
    </div>


    <div class="form-group">
        <label>Price</label>
        <small id="priceMessage" class="form-text  text-danger"></small>
        <input class="form-control" type="number" name="price" id="price" min="1" oninput="this.value = this.value <= 0 ? 1:this.value" value="${data.price}">
    </div>
    </div>`
}

// function validateFormData(originalData) {
//     // Validate Product ID
//     if (document.querySelector("#productId").value !== originalData.productId) {
//         errors.productId = "Product ID cannot be changed.";
//     }

//     // Validate Product Name
//     if (!/^[0-9]+$/.test(document.querySelector("#productName").value)) {
//         errors.productName = "Product Name should only contain numbers.";
//     }

//     // Validate Images
//     if (!document.querySelector("#images").value.endsWith(".jpg")) {
//         errors.images = "Image must be a .jpg file.";
//     }

//     // Validate Seller Name
//     if (document.querySelector("#sellerName").value !== originalData.sellerName) {
//         errors.sellerName = "Seller Name cannot be changed.";
//     }

//     // Validate Price
//     if (!/^[0-9]+(\.[0-9]+)?$/.test(document.querySelector("#price").value)) {
//         errors.price = "Price should only contain numbers.";
//     }

//     displayErrors(errors);

//     return Object.keys(errors).length === 0;
// }

// function displayErrors(errors) {
//     document.querySelectorAll('.form-text.text-danger').forEach(small => {
//         small.textContent = '';
//     });

//     // Set error messages
//     if (errors.productId) {
//         document.querySelector("#productIdMessage").textContent = errors.productId;
//     }
//     if (errors.productName) {
//         document.querySelector("#nameMessage").textContent = errors.productName;
//     }
//     if (errors.images) {
//         document.querySelector("#imagesMessage").textContent = errors.images;
//     }
//     if (errors.sellerName) {
//         document.querySelector("#sellerMessage").textContent = errors.sellerName;
//     }
//     if (errors.price) {
//         document.querySelector("#priceMessage").textContent = errors.price;
//     }
//     // Show or hide the error message box
//     const anyErrorMessagesVisible = [...document.querySelectorAll(`.form-text.text-danger`)].some(m => m.textContent);


// }

function getEditedValues() {
    //get the info from the edit form
    let editForm = document.querySelector("#editForm").children[0].children[0];
    let img = editForm.children[3].children[2].value, oldImg = editForm.children[3].children[3].src;
    let imgSrc;
    console.log(oldImg);
    if(!img) //if no image is selected then select the old image
    {
        imgSrc = `images/${oldImg.substring(oldImg.lastIndexOf("/")+1)}`;
    } else {
        imgSrc = `images/${img.substring(img.lastIndexOf("\\")+1)}`;
    }
    return {
        productId: editForm.children[0].children[2].value,
        productName: editForm.children[2].children[2].value,
        images: [imgSrc], 
        sellerName: editForm.children[4].children[2].value,
        category: editForm.children[1].children[2].value,
        price: editForm.children[5].children[2].value
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
 
LogOut()


})