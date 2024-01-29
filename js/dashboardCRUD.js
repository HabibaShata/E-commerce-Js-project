
// new from seller     ///////////// selectors///////////////
import  {categories} from "./products.js"
 var tbody = document.querySelector("tbody")
//selector modal //  
 var closex = document.querySelector(".clsBtn");
//selectors form//



//  
// Declare variables for later use; these will be assigned values at runtime
var deleteButtons;
var table_headings, table_rows;
/////

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

    //    /*------------------------ create function --------------*/

function creatTableofData() {

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
// first thing when window loaded 
window.addEventListener("load", function () {
    // Function to create and populate a table with product data
    creatTableofData();
    //   ----delete -----

    // Select all elements with the class 'delete' and store them in the 'deleteButtons' variable
    deleteButtons = document.querySelectorAll('.delete');
    var idProduct;

    deleteButtons.forEach((delBtn) => {
        // console.log(delBtn);
        delBtn.addEventListener("click", function (e) {
            e.preventDefault();
            idProduct = parseInt(e.target.parentElement.dataset.id);
            deleteProduct(idProduct);
            // console.log(e.target.parentElement.dataset.id);

        });
    })

     
//     /*////////////////////////////////////////////////////
//         Functionality for sorting table columns
//     ////////////////////////////////////////////////////*/
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
    })
    

})

    //    /*------------------------ delete function --------------*/
function deleteProduct(idDeleProduct) {
   
    var positionThisProductInProduct;
    var positionThisProductInCart;
       console.log("id elem  clicked",idDeleProduct);
       var actualDeleted=idDeleProduct;

    // ------sweet alert ------
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            positionThisProductInCart = cart.findIndex((value) =>{
               
                    return value.product_id === actualDeleted;
                }
                 );
                //  console.log(positionThisProductInCart);
    
                // Find the position of the product in the product array
                positionThisProductInProduct = arrOfproduct.findIndex((value) => {
    
                    return actualDeleted == value.productId;   // return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
                })
            
                if(positionThisProductInCart>-1){  // check if product extist in cart 


                    
                     arrOfproduct.splice(positionThisProductInProduct, 1);
                     cart.splice(positionThisProductInCart, 1);
                     localStorage.setItem("products", JSON.stringify(arrOfproduct));
                     localStorage.setItem("cart", JSON.stringify(cart));
                     location.reload();
                    //  console.log("in cart and delete done");
                }else{

                    arrOfproduct.splice(positionThisProductInProduct, 1);
                    localStorage.setItem("products", JSON.stringify(arrOfproduct));
                    location.reload();
                }

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });


}



// // Event handler for the click event on the "submit" form 
//  submit.onclick = function (e) {
//     // Check the validity of the data using the vaildData() function
//     if (true) {
//         closeModal();
//         Add();
//     } else {
//         e.preventDefault();
//     }
// }
//     //    /*------------------------ Add function --------------*/

//  function Add() {
     
   
//     var selectedValues = [];
//     // Add a change event listener to each checkbox
//     checkboxes.forEach(function (checkbox) {
//         if (checkbox.checked) {
//             selectedValues.push(checkbox.value);
//         }
//     });
//     var imgesInput = [];// arr of imges

//      var lastIndex = img1.value.lastIndexOf("\\");
//      img1 = img1.value.slice(lastIndex + 1);
//      img1 = `images/${img1}` // concat src
//      imgesInput.push(img1)

//      var lastIndex2 = img2.value.lastIndexOf("\\");
//      img2 = img2.value.slice(lastIndex2 + 1);
//      img2 = `images/${img2}` // concat src
//     imgesInput.push(img2)
//     console.log(imgesInput);
//     var lastID = Math.max(...arrOfproduct.map(product => product.productId), 0); // to get max id 

//     var newProduct = {
//         productId: lastID + 1,
//         productName: _ProductName.value,
//         category: select.value,
//         sellerName:`${sellerName}`,
//         quantity: _Quntity.value,
//         quantity_sold: "0",
//         images: imgesInput,
//         price: _price.value +"$",
//         description: description.value,
//         options: selectedValues,
//     };
//     arrOfproduct.push(newProduct);
//     console.log(arrOfproduct);
//     updateLocalStorage(arrOfproduct);
//     location.reload();
//     //creatTableofData();
   


// }

// // open modal Add new product
//  btnAdd.addEventListener("click", function () {

//     $('#myModal2').modal('show');

// })



// close.addEventListener("click", closeModal)
closex.addEventListener("click",closeModal)

function closeModal(){
    // Hide the modal after deletion
    $('#myModal2').removeClass('fade');
    // Hide the modal after deletion
    $('#myModal2').modal('hide');
}

//             /------------- sort------------/
function sortTable(column, sort_asc) {

    //  console.log([...tableTr]);
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();
            
            if(first_row == second_row){return 0;}

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));



}

// Event handler for the click event on the "submit" form 
$('#addressForm').submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();
    // Check the validity of the data using the vaildData() function
    closeModal();
    Add();
});
function saveItem(){
    closeModal();
    Add();
}



/*start hissen*/ 
//get the date from the table into the modal
function attachEditEventListeners() {
    document.querySelectorAll('.edit').forEach(function(editIcon) {
        editIcon.addEventListener('click', function(event) {
            event.preventDefault();
            const row = editIcon.closest('tr');
            const productData = getProductDataFromRow(row);
            populateFormWithProductData(productData);
            $('#userFormModal').modal('show');
        });
    });
}

// Fetch data from a table row
function getProductDataFromRow(row) {
    return {
        productId: row.cells[0].innerText.trim(),
        productName: row.cells[1].innerText.trim(),
        images: row.cells[2].querySelector('img').src,
        sellerName: row.cells[3].innerText.trim(),
        category: row.cells[4].innerText.trim(),
        price: row.cells[5].innerText.trim()
    };
}

// Populate the form fields with product data
function populateFormWithProductData(data) {
    document.querySelector("#productId").value = data.productId;
    document.querySelector("#productName").value = data.productName;
    document.querySelector("#price").value = data.price;
    document.querySelector("#sellerName").value = data.sellerName;
    document.querySelector("#category").value = data.category;
}

//update the product date on submit
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (validateFormData()) {
        let editedProduct = getEditedValues();
        updateProductData(editedProduct);
        $('#userFormModal').modal('hide'); // Close the modal
    } else {
        console.log("Validation failed. Product data not updated.");
    }
});

// Update product data in the array and local storage
function updateProductData(editedValues) {
    const index = arrOfproduct.findIndex(product => product.productId == editedValues.productId);
    if (index !== -1) {
        // Update the product details in the array
        arrOfproduct[index] = { ...arrOfproduct[index], ...editedValues };

        // Update the local storage
        updateLocalStorage(arrOfproduct);

        // Refresh the table to reflect the changes
        creatTableofData();
    } else {
        console.error("Product not found in array.");
    }
}



// Handle search functionality
function handleSearch() {
    let searchValue = searchBar.value.toLowerCase();
    let allRows = tbody.getElementsByTagName("tr");
    for (let row of allRows) {
        let rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchValue) ? "" : "none";
    }
}
/*end hissen*/ 













