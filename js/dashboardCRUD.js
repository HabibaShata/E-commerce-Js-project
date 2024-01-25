import { products as arr } from "./custom.js";
import { arrCart } from "./addtoCart.js";

var tbody = document.querySelector("tbody")
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
// console.log(_price);
// first thing when window loaded 
let arrOfproduct;
if (localStorage.getItem("products") !== null) {
    console.log("Local storage exists.");
    arrOfproduct = JSON.parse(localStorage.getItem("products"));
    //creatTableofData();
} else {
    console.log("Local storage does not exist. Using default array.");
    arrOfproduct = arr;
}


// console.log(arrOfproduct);
function updateLocalStorage(arrOfproduct) {

    console.log("Updating local storage with products:", arrOfproduct);
    localStorage.setItem("products", JSON.stringify(arrOfproduct));
}

window.addEventListener("load", function () {
    creatTableofData();

    /* Deleteeeeeeee*/
    // select icon delete 
   /* var deleteButtons = document.querySelectorAll('.delete');
    var deleteConfirmBtn = document.querySelector('.Delete'); //confirm btn
    var actualItemDeleted;
    let positionThisProductInProduct;
    var trdeleted;
    var idProduct;
    console.log(deleteButtons);
    console.log(deleteConfirmBtn);
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            // Show the Bootstrap modal
            actualItemDeleted = e.target.parentElement;
            trdeleted = $(actualItemDeleted).closest('tr');
            console.log(trdeleted[0]);
            console.log(e.target.parentElement);
            console.log(e.target.parentElement.dataset.id);// id product
            idProduct = e.target.parentElement.dataset.id;

            $('#myModal').modal('show');
        });
        deleteConfirmBtn.addEventListener('click', function () {

            //delete item from html and product arr
            // console.log(actualItemDeleted);
    
    
            let positionThisProductInCart = arrCart.findIndex((value) => value.product_id == idProduct);
            positionThisProductInProduct = arrOfproduct.findIndex((value) => {
                console.log("id", value["productId"], "id", idProduct, arrOfproduct[idProduct - 1]["productId"]);
                return value["productId"] == arrOfproduct[idProduct - 1]["productId"];
            });
    
            if (positionThisProductInCart == -1 && positionThisProductInProduct !== -1) {//  item not exist in cart  
                // console.log(products);
                // console.log(positionThisProductInProduct);
                //   console.log(products[positionThisProductInProduct]);
                // Check if the element is found (index is not -1)
                arrOfproduct.splice(positionThisProductInProduct, 1);
                localStorage.setItem("products", JSON.stringify(arrOfproduct));
                //  console.log(products);
                $(trdeleted).remove()
    
                // console.log("done");
            } else {
    
                alert("item already in cart");
                console.log("item already in cart");
            }
    
    
    
            // Hide the modal after deletion
            $('#myModal').removeClass('fade');
            // Hide the modal after deletion
            $('#myModal').modal('hide');
        });
    });
*/
   

})
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
              <a href="#"  title="Delete"  data-id="${product.productId}" class="trigger-btn"><i
                      class="delete material-icons text-danger">&#xE872;</i></a>
          </td>
         </tr>`

    });
}

// add 
// validation

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

// add new product 
submit.onclick = function (e) {
    // Create an array to store the selected values
    console.log(vaildData());
    if (vaildData()) {
        closeModal();
        Add();

    } else {// not vaild 
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



// delete 
// function delet(){
//



// }
// sort 
// ///////// creat table









//             sort                    //  
/*
document.getElementsByTagName("thead")[0].addEventListener("click", function (e) {
  
    let products = JSON.parse(localStorage.getItem("products"));

    console.log(e.target.nodeName == "TH");
    if (products && e.target.nodeName == "TH")
     {
        var ProductProperty = e.target.innerText;
        // console.log(ProductProperty);

        if (e.target.innerText == "productName") {
            // console.log(ProductProperty);
            ProductProperty = "productName";

        } else if (e.target.innerText == "sellerName") {
            // console.log(ProductProperty);
            ProductProperty = "sellerName";
        } else if (e.target.innerText == "category") {
            // console.log(ProductProperty);

            ProductProperty="category";

        }
        // console.log(ProductProperty);              

        sortAsc(ProductProperty);

    }
});

document.getElementsByTagName("thead")[0].addEventListener("click", function (e) {
    let products = JSON.parse(localStorage.getItem("products"));
     console.log(e.target.nodeName);
    if ( e.target.nodeName == "TH") {
        var prop = e.target.innerText.trim().toLowerCase();
        console.log(prop);
        if (prop === "productname" || prop === "sellername" || prop === "category") {
            sortAsc(prop);
        }
    }
});

document.getElementsByTagName("thead")[0].addEventListener("dblclick", function (e) {
    let products = JSON.parse(localStorage.getItem("products"));

    if ( e.target.nodeName == "TH") {
        var prop = e.target.innerText;
        if (prop === "productname" || prop === "sellername" || prop === "category") {
            sortDesc(prop);
        }
    }
});




function sortAsc(prop) {
    let products = JSON.parse(localStorage.getItem("products"));
console.log(prop);
    products.sort((a, b) => {
        console.log("a", a, "prop", "b", b, prop);
        //return a[productProp].localeCompare(b[productProp])
        if (a[prop].trim().toLowerCase() > b[prop].trim().toLowerCase())
            return 1;
        if (a[prop].trim().toLowerCase() < b[prop].trim().toLowerCase())
            return -1;
        return 0;
    })
    addToLocalStorage(products);
    creatTableofData();
    console.log(products);
}

function sortDesc(prp) {
    let products = JSON.parse(localStorage.getItem("products"));

    products.sort((a, b) => {
        console.log("Before Sorting: a", a[prp], "b", b[prp]);
        const comparisonResult = b[prp].localeCompare(a[prp]);
        console.log("After Sorting: Result", comparisonResult);
        return comparisonResult;
    });

    console.log("Sorted Products:", products);
    addToLocalStorage(products);
    creatTableofData();
}

*/