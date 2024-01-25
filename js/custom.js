// to get current year
// function getYear() {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     document.querySelector("#displayYear").innerHTML = currentYear;
// }

// getYear();
//Product class function

class Product
{
    constructor(_productId, _productName, _category, _sellerName, _quantity, _quantity_sold, _images, _price, _description, _options)
    {
        this.productId=_productId;
        this.productName = _productName;
        this.category = _category;
        this.sellerName = _sellerName;
        this.quantity = _quantity;
        this.quantity_sold = _quantity_sold;
        this.images = _images;
        this.price = _price;
        this.description = _description;
      this.options = _options;
    }
}

//random data

//random data
let products = [
   new Product(1, "Jewellery", "jewellery", "Lacasa Store", 10, 0, ["images/p1.png", "images/p2.png", "images/p3.png"], 50.0, "Lorem ipsum dolor sit amet, consect", ["Red", "White", "Black"]),
   new Product(2, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p2.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(3, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p3.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(4, "Artwork", "jewellery", "Zara Store", 20, 0, ["images/p4.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(5, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p5.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(6, "Artwork", "jewellery", "Zara Store", 20, 0, ["images/p6.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(7, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p7.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(8, "Artwork", "jewellery", "Zara Store", 20, 0, ["images/p8.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(9, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p9.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(10, "Artwork", "jewellery", "Zara Store", 20, 0, ["images/p10.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(11, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p11.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(12, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p12.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(13, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p9.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
   new Product(14, "Artwork", "artwork", "Zara Store", 20, 0, ["images/p12.png", "images/p5.png", "images/p6.png"], 40.0, "Lorem ipsum dolor sit amet, consect", ["Red","White", "Black"]),
]
// checking if the key  is not exist in the localStorage we will set the arr;
if(!localStorage.getItem("products")){
   //add the products to the local storage
   localStorage.setItem("products", JSON.stringify(products));
}



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
   for (let i = 0; i < maxNumber; i++) {
      productCards +=
      
         `<div class="col-sm-6 col-md-4 col-lg-4 data-id=${products[i].productId}">

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
                <div class="detail-box">
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



   return productCards;
}


/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

export { GetProducts, products };