import {Product} from "./classes.js"
// to get current year
// function getYear() {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     document.querySelector("#displayYear").innerHTML = currentYear;
// }

// getYear();
//Product class function



//random data
let products = JSON.parse(localStorage.getItem("products"))|| [];
// checking if the key  is not exist in the localStorage we will set the arr;
if(!localStorage.getItem("products")){
   //add the products to the local storage
   localStorage.setItem("products", JSON.stringify(products));
}

//get the loggedInUser
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));



// client section owl carousel
$(function () {

   let productCards = GetProducts(9);
   if (document.getElementById("products-Landing")) {
      document.getElementById("products-Landing").innerHTML = productCards;   
   }
})

function GetProducts(maxNumber, productsList) {
   let products;
   if (productsList != undefined) {
      products = productsList;
   }
   else {
      products = JSON.parse(localStorage.getItem("products"));
   }

   if (maxNumber == -1) {
      maxNumber = products.length;
   }
   let productCards = "";
   for (let i = maxNumber - 1; i >= 0; i--) {
      if (loggedInUser && loggedInUser.userRole == "admin") {
         productCards +=
         `<div class="col-sm-6 col-md-6 col-lg-4 data-id=${products[i].productId}">

           <div class="box">
              <div class="option_container">
                   <div class="options">
                      <a href="productDetails.html?productId=${products[i].productId}" class="option2">
                      View Details
                      </a>
                   </div>
               </div>
                <div class="img-box">
                   <img src="${products[i].images[0]}" alt="">
                </div>
                <div class="detail-box" style="display: flex !important;
                justify-content: center;
                align-items: center;
                flex-direction: column !important;">
                   <h5>
                      ${products[i].productName}
                   </h5>
                   <h6>
                      $${products[i].price}
                   </h6>
                </div>
             </div>
         
          </div>`;
      } else if (loggedInUser && loggedInUser.userRole == "seller") {
         if(products[i].sellerName == loggedInUser.userName) {
            productCards +=
         `<div class="col-sm-6 col-md-6 col-lg-4 data-id=${products[i].productId}">

           <div class="box">
              <div class="option_container">
                   <div class="options">
                      <a href="productDetails.html?productId=${products[i].productId}" class="option2">
                      View Details
                      </a>
                   </div>
               </div>
                <div class="img-box">
                   <img src="${products[i].images[0]}" alt="">
                </div>
                <div class="detail-box" style="display: flex !important;
                justify-content: center;
                align-items: center;
                flex-direction: column !important;">
                   <h5>
                      ${products[i].productName}
                   </h5>
                   <h6>
                      $${products[i].price}
                   </h6>
                </div>
             </div>
         
          </div>`;
         }
      } else { //if the product is out of stock we will remove the add to cart button and add the out of stock butto
         if(products[i].quantity == 0)
         {
            productCards +=
         `<div class="col-sm-6 col-md-6 col-lg-4 data-id=${products[i].productId}">

           <div class="box">
               <a class="out-of-stock bg-danger text-light py-2 px-3">
               Out of stock
               </a>
              <div class="option_container">
                   <div class="options">
                      <a href="productDetails.html?productId=${products[i].productId}" class="option2">
                      View Details
                      </a>
                   </div>
               </div>
                <div class="img-box">
                   <img src="${products[i].images[0]}" alt="">
                </div>
                <div class="detail-box" style="display: flex !important;
                justify-content: center;
                align-items: center;
                flex-direction: column !important;">
                   <h5>
                      ${products[i].productName}
                   </h5>
                   <h6>
                      $${products[i].price}
                   </h6>
                </div>
             </div>
         
          </div>`;
         } else {
            productCards +=
      
         `<div class="col-sm-6 col-md-6 col-lg-4 data-id=${products[i].productId}">

           <div class="box">
              <div class="option_container">
                   <div class="options">
                      <a href="#" class="option1 addCart">
                      Add to cart
                      </a>
                      <a href="productDetails.html?productId=${products[i].productId}" class="option2">
                      View Details
                      </a>
                   </div>
               </div>
                <div class="img-box">
                   <img src="${products[i].images[0]}" alt="">
                </div>
                <div class="detail-box" style="display: flex !important;
                justify-content: center;
                align-items: center;
                flex-direction: column !important;">
                   <h5>
                      ${products[i].productName}
                   </h5>
                   <h6>
                      $${products[i].price}
                   </h6>
                </div>
             </div>
         
          </div>`;
         }
      }
   }

   return productCards;
}

export { GetProducts, products, Product };