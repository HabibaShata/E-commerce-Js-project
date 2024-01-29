///////////// selectors///////////////
import { categories } from "./products.js"

loginCheck() // check if user is login as a seller

var tbody = document.querySelector("tbody")
var btnAdd = document.querySelector(".add-new");
var submit = document.querySelector(".submitLink");
//selector modal //  
var closex = document.querySelector(".clsBtn");
//selectors form//
var _ProductName = document.getElementById("ProductName");
var _price = document.getElementById("price");
var _Quntity = document.getElementById("Quntity");
var description = document.getElementById("description");
var select = document.getElementById("category");
// var category = document.getElementById("category");
var img1 = document.getElementById("productImage");
// var img2 = document.getElementById("productImage2");
var checkboxes = document.querySelectorAll('.color-checkbox');

// Declare variables for later use; these will be assigned values at runtime
var deleteButtons;
var table_headings, table_rows;
/////

let allProducts;

if (localStorage.getItem("products")) {
    allProducts = JSON.parse(localStorage.getItem("products"));
}else{

    allProducts=[];
}
let sellerName = JSON.parse(localStorage.getItem("loggedInUser")).userName;
let sellerArr = allProducts.filter((product) => product.sellerName == sellerName)

let cart;
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

function loginCheck(){
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if(Object.keys(loggedInUser) == 0 || loggedInUser.userRole != "seller")
    {
        Swal.fire({ // fire a sweet alert
            icon: "error",
            title: "Oops...",
            text: "you must login as a seller",
          }).then(() => {
            window.location.href = "index.html" // redirect user to home page
          });
    }
}

function creatTableofData() {
    sellerArr = allProducts.filter((product) => product.sellerName == sellerName)
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





// Function to update local storage with an array of products
function updateLocalStorage(arrOfproduct) {
    console.log("Updating local storage with products:", arrOfproduct);
    localStorage.setItem("products", JSON.stringify(arrOfproduct));
}
// 
// // first thing when window loaded 
window.addEventListener("load", function () {
    if (localStorage.getItem("products")) {
        allProducts = JSON.parse(localStorage.getItem("products"));
    }else{
    
        allProducts=[];
    }
    // Iterate through each category in the 'categories' array and  Set the 'value' attribute of the <option> to the current category
    categories.forEach((category) => {
        var option = document.createElement("option");
        option.value = category;
        option.text = category;
        select.add(option);
    })

    creatTableofData();
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
        if (i == 1 || i == 4) {
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


    //info about seller

    this.document.querySelector("#dropdownUser2").innerHTML =
        `<img src="images/favicon.png" alt="" width="32" height="32" class="rounded-circle me-2">
         <strong> ${sellerName}</strong> 
        `


})


//    /*------------------------ delete function --------------*/
function deleteProduct(idDeleProduct) {

    var positionThisProductInProduct;
    var positionThisProductInCart;
    console.log("id elem  clicked", idDeleProduct);
    var actualDeleted = idDeleProduct;

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

            positionThisProductInCart = cart.findIndex((value) => {
                
                return value.product_id ==idDeleProduct;
            }
            );
            console.log(positionThisProductInCart);

            // Find the position of the product in the product array
            positionThisProductInProduct = allProducts.findIndex((value) => {

                return idDeleProduct == value.productId;   // return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
            })
            console.log("index", positionThisProductInProduct, "ele", actualDeleted);

            if (positionThisProductInCart > -1) {  // check if product extist in cart 
                // console.log(allProducts);
                cart.splice(positionThisProductInCart, 1);

                // console.log(allProducts);
                localStorage.setItem("cart", JSON.stringify(cart));
                // sweet alert
            } 

                allProducts.splice(positionThisProductInProduct, 1);
                localStorage.setItem("products", JSON.stringify(allProducts));
                location.reload();
            

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

//                       /------------- sort------------/
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
function Add() {


    var selectedValues = [];
    // Add a change event listener to each checkbox
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });
    var imgesInput = [];// arr of imges

    var lastIndex = img1.value.lastIndexOf("\\");
    img1 = img1.value.slice(lastIndex + 1);
    img1 = `images/${img1}` // concat src
    imgesInput.push(img1)

    // var lastIndex2 = img2.value.lastIndexOf("\\");
    // img2 = img2.value.slice(lastIndex2 + 1);
    // img2 = `images/${img2}` // concat src
    // imgesInput.push(img2)
    // console.log(imgesInput);
    var lastID = Math.max(...allProducts.map(product => product.productId), 0); // to get max id 

    var newProduct = {
        productId: lastID + 1,
        productName: _ProductName.value,
        category: select.value,
        sellerName: `${sellerName}`,
        quantity: _Quntity.value,
        quantity_sold: "0",
        images: imgesInput,
        price: _price.value + "$",
        description: description.value,
        options: selectedValues,
    };
    allProducts.push(newProduct);
    updateLocalStorage(allProducts);
    location.reload();
}

// open modal
btnAdd.addEventListener("click", function () {

    $('#myModal2').modal('show');

})



// close.addEventListener("click", closeModal)
closex.addEventListener("click", closeModal)



function closeModal() {
    // Hide the modal after deletion
    $('#myModal2').removeClass('fade');
    // Hide the modal after deletion
    $('#myModal2').modal('hide');
}