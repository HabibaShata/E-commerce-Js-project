var tbody = document.querySelector("tbody")
// var tableTr = document.querySelectorAll("table  tr")
var btnAdd = document.querySelector(".add-new");
var submit = document.querySelector(".submitLink");
//selector modal //  
var close = document.querySelector(".close");
var closex = document.querySelector(".clsBtn");
//selectors form//

var checkboxes = document.querySelectorAll('.color-checkbox');
var submitButton=document.getElementById('submitButton');
var searchBar = document.getElementById('searchBar');

// Declare variables for later use; these will be assigned values at runtime
var deleteButtons;
var table_headings, table_rows;
/////
let arrOfproduct, cart;
if (localStorage.getItem("products")) {
    console.log("Local storage exists.");
    arrOfproduct = JSON.parse(localStorage.getItem("products"));
}

// first thing when window loaded 
window.addEventListener("load", function () {
    creatTableofData();
    
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


   searchBar.addEventListener('input', handleSearch);

   ///////////////event to dispaly (button display product details)
    document.querySelectorAll('.view').forEach(function(display){ display.addEventListener('click', function(event) {
        let clickedRow = event.target.closest('tr');
        console.log(clickedRow)
        if (clickedRow) {
            
                displayProduct(Product);   
            }
        })
    });
    submitButton.addEventListener("click", function(event) {
    if(event.target.dataset.id){
        console.log(event.target.dataset.id);
        event.preventDefault();
        console.log("yarab");
        if (validateFormData(editedProduct)== getEditedValues()) {
            editedProduct.productID=Number(event.target.dataset.id);
            updateProductData(editedProduct).then((res)=>{
                alert("The Product has been updated successfully!");
                location.reload()  ;
                }).catch((err)=>console.log(err));
        }else{
            alert("Please fill in all the fields correctly")
        }
        }
});
    
    attachEditEventListeners();
})

/*start hissen*/ 
 
 

// Event listener to handle table row edit button clicks
function attachEditEventListeners() {
    tbody.addEventListener("click", function(e){
        if(e.target.classList.contains("edit")) {
            let productID = e.target.dataset.id;
            let productData = arrOfproduct.find(product => product.productId == productID);
       
            populateFormWithProductData(productData);
        }
    });
}
// Fetch data from a table row

// Populate the form fields with product data
function populateFormWithProductData(data) {
    //make the modal fields
   
    const modalFields = document.querySelector('.modal-fields');
    modalFields.innerHTML =  `
            <div class="form-group">
            <label>Product ID</label>
            <input class="form-control" type="text" name="productId" id="productId" value="${data.productId}">
        </div>
        <div class="form-group">
            <label>Category</label>
            <small id="categoryMessage" class="form-text  text-danger"></small>

            <input class="form-control" type="text" name="category" id="category" value="${data.category}">
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

   document.querySelector("#productId").setAttribute("value", data.productId);
    document.querySelector("#productName").value = data.productName;
    document.querySelector("#images").value = data.images[0];
    document.querySelector("#sellerName").value = data.sellerName;
    document.querySelector("#category").value = data.category;
    document.querySelector("#price").value = data.price;

   
}
////validations
var errors = {};
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
////
function displayErrors(errors) {
    // Clear previous error messages
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
}
// Extract edited values from the form
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
// Update product data
function updateProductData(editedValues) {
    const index = products.findIndex(product => product.productId == editedValues.productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...editedValues };
        updateLocalStorage();
        updateTableDisplay(editedValues);
    } else {
        console.error("Product not found in array.");
    }
}
s
//update the product date on submit




//display the product details
function displayProduct(productId){
    let productDetails = arrOfproduct.filter(item => item.productId == productId);
    if(productDetails.length > 0){
        console.log("helloo")
        document.querySelector('#exampleModalLong2 .modal-body2 ').innerHTML = `
            <p>Product Name: ${productDetails[0].productName}</p>
            <p>Price: ${productDetails[0].price}</p>
            <p>Sold by: ${productDetails[0].sellerName}</p>
            <p>Category: ${productDetails[0].category}</p>
            <img src="${productDetails[0].images[0]}" alt="Product Image">
        `;
    } else {
        console.log("No such product exists");
    }
}

// Handle search functionality
function handleSearch(e) {
    console.log(e.target.value);
   let searchValue = searchBar.value.toLowerCase();
    let allRows = tbody.getElementsByTagName("tr");
    for (let row of allRows) {
        let rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchValue) ? "" : "none";
    }
}

///


/*end hissen*/ 

///////////////// sort////////////////
function sortTable(column, sort_asc) {

    //  console.log([...tableTr]);
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));



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

    tbody.innerHTML = ''
    //print the products from end to start (newest first)
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
    attachEditEventListeners();
    //add view event listener
    tbody.addEventListener("click", function(e){
        console.log(e.target.dataset.id)
        if(e.target.classList.contains("view")){
            let productId = e.target.dataset.id;
            console.log(productId);
            
            displayProduct(productId);
        }
    })
}