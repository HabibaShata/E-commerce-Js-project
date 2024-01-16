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
    constructor(_productId, _productName, _category, _sellerName, _images, _price, _description, _options)
    {
        this.productId = _productId;
        this.productName = _productName;
        this.category = _category;
        this.sellerName = _sellerName;
        this.images = _images;
        this.price = _price;
        this.description = _description;
        this.options = _options;
    }
}

//random data
let products = [
      new Product(1, "Jewellery", "Jewellery", "Seller1", ["images/p1.png", "images/p2.png", "images/p3.png"], 50000, "This is a Jewellery", ["Black", "White", "Red"]),
      new Product(2, "Accessories", "Accessories", "Seller2", ["images/p2.png", "images/p2.png", "images/p2.png"], 20000, "This is a Accessories", ["Black", "White", "Red"]),
      new Product(3, "Artwork", "Artwork", "Seller3", ["images/p3.png", "images/p3.png", "images/p3.png"], 30000, "This is a Artwork", ["Black", "White", "Red"]),
      new Product(4, "Accessories", "Accessories", "Seller4", ["images/p4.png", "images/p4.png", "images/p4.png"], 1000, "This is a Accessories", ["Black", "White", "Red"]),
      new Product(5, "Artwork", "Artwork", "Seller5", ["images/p5.png", "images/p5.png", "images/p5.png"], 2000, "This is Artwork", ["Black", "White", "Red"]),
      new Product(6, "Pet-supplies", "Pet-supplies", "Seller6", ["images/p6.png", "images/p6.png", "images/p6.png"], 3000, "This is Pet-supplies", ["Black", "White", "Red"]),
      new Product(7, "Sweets", "Sweets", "Seller7", ["images/p7.png", "images/p7.png", "images/p7.png"], 4000, "This is Sweets", ["Black", "White", "Red"]),
      new Product(8, "Sweets", "Sweets", "Seller8", ["images/p8.png", "images/p8.png", "images/p8.png"], 5000, "This is Sweets", ["Black", "White", "Red"]),
      new Product(9, "Jewellery", "Jewellery", "Seller9", ["images/p9.png", "images/p9.png", "images/p9.png"], 6000, "This is Jewellery", ["Black", "White", "Red"]),
      new Product(10, "Accessories", "Accessories", "Seller10", ["images/p10.png", "img/Accessories.jpg", "img/hat.jpg"], 7000, "This is hat", ["Black", "White", "Red"]),
      new Product(11, "Artwork", "Accessories", "Seller11", ["images/p11.png", "img/Accessories.jpg", "img/hat.jpg"], 8000, "This is hat", ["Black", "White", "Red"]),
      new Product(12, "Accessories", "Accessories", "Seller12", ["images/p12.png", "img/Accessories.jpg", "img/hat.jpg"], 9000, "This is hat", ["Black", "White", "Red"]),
      new Product(13, "Artwork", "Accessories", "Seller13", ["images/p1.png", "img/Accessories.jpg", "img/hat.jpg"], 10000, "This is hat", ["Black", "White", "Red"]),
      new Product(14, "Accessories", "Accessories", "Seller14", ["images/p2.png", "img/Accessories.jpg", "img/hat.jpg"], 11000, "This is hat", ["Black", "White", "Red"]),
      new Product(15, "Artwork", "Accessories", "Seller15", ["images/p3.png", "img/Accessories.jpg", "img/hat.jpg"], 12000, "This is hat", ["Black", "White", "Red"]),
      new Product(16, "Accessories", "Accessories", "Seller16", ["images/p4.png", "img/Accessories.jpg", "img/hat.jpg"], 13000, "This is hat", ["Black", "White", "Red"]),
      new Product(17, "Artwork", "Accessories", "Seller17", ["images/p5.png", "img/Accessories.jpg", "img/hat.jpg"], 14000, "This is hat", ["Black", "White", "Red"]),
      new Product(18, "Accessories", "Accessories", "Seller18", ["images/p6.png", "img/Accessories.jpg", "img/hat.jpg"], 15000, "This is hat", ["Black", "White", "Red"]),
      new Product(19, "Artwork", "Accessories", "Seller19", ["images/p7.png", "img/Accessories.jpg", "img/hat.jpg"], 16000, "This is hat", ["Black", "White", "Red"]),
      new Product(20, "Accessories", "Accessories", "Seller20", ["images/p8.png", "img/Accessories.jpg", "img/hat.jpg"], 17000, "This is hat", ["Black", "White", "Red"]),
      new Product(21, "Artwork", "Accessories", "Seller21", ["images/p9.png", "img/Accessories.jpg", "img/hat.jpg"], 18000, "This is hat", ["Black", "White", "Red"]),
]

//add the products to the local storage
localStorage.setItem("products", JSON.stringify(products));


// client section owl carousel
$(function(){
   //  $(".client_owl-carousel").owlCarousel({
   //      loop: true,
   //      margin: 0,
   //      dots: false,
   //      nav: true,
   //      navText: [],
   //      autoplay: true,
   //      autoplayHoverPause: true,
   //      navText: [
   //          '<i class="fa fa-angle-left" aria-hidden="true"></i>',
   //          '<i class="fa fa-angle-right" aria-hidden="true"></i>'
   //      ],
   //      responsive: {
   //          0: {
   //              items: 1
   //          },
   //          768: {
   //              items: 2
   //          },
   //          1000: {
   //              items: 2
   //          }
   //      }
   //  });
   let productCards = GetProducts(9);
   document.getElementById("products-Landing").innerHTML = productCards;
})

function GetProducts(maxNumber, productsList)
{
   let products;
   if (productsList!=undefined) {
      products = productsList;
   } 
   else {
      products = JSON.parse(localStorage.getItem("products"));
   }

   if(maxNumber == -1)
   {
      maxNumber = products.length;
   }
   let productCards = "";
   for(let i = 0; i < maxNumber; i++)
   {
       productCards += `<div class="col-sm-6 col-md-4 col-lg-4">
       <div class="box">
           <div class="option_container">
                   <div class="options">
                      <a href="" class="option1">
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

export {GetProducts, products};