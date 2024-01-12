// to get current year
// function getYear() {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     document.querySelector("#displayYear").innerHTML = currentYear;
// }

// getYear();

//Product class function
function Product(_productId, _productName, _category, _sellerName, _images, _price, _description, _options)
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

//random data
let products = [
    new Product(1, "Laptop", "Electronics", "Seller1", ["images/p1.png", "images/p1.png", "images/p1.png"], 50000, "This is a laptop", ["Black", "White", "Red"]),
    new Product(2, "Mobile", "Electronics", "Seller2", ["images/p2.png", "images/p2.png", "images/p2.png"], 20000, "This is a mobile", ["Black", "White", "Red"]),
    new Product(3, "TV", "Electronics", "Seller3", ["images/p3.png", "images/p3.png", "images/p3.png"], 30000, "This is a tv", ["Black", "White", "Red"]),
    new Product(4, "Shirt", "Clothing", "Seller4", ["images/p4.png", "images/p4.png", "images/p4.png"], 1000, "This is a shirt", ["Black", "White", "Red"]),
    new Product(5, "Pants", "Clothing", "Seller5", ["images/p5.png", "images/p5.png", "images/p5.png"], 2000, "This is pants", ["Black", "White", "Red"]),
    new Product(6, "Shoes", "Clothing", "Seller6", ["images/p6.png", "images/p6.png", "images/p6.png"], 3000, "This is shoes", ["Black", "White", "Red"]),
    new Product(7, "Watch", "Accessories", "Seller7", ["images/p7.png", "images/p7.png", "images/p7.png"], 4000, "This is watch", ["Black", "White", "Red"]),
    new Product(8, "Bag", "Accessories", "Seller8", ["images/p8.png", "images/p8.png", "images/p8.png"], 5000, "This is bag", ["Black", "White", "Red"]),
    new Product(9, "Belt", "Accessories", "Seller9", ["images/p9.png", "images/p9.png", "images/p9.png"], 6000, "This is belt", ["Black", "White", "Red"]),
    new Product(10, "Hat", "Accessories", "Seller10", ["images/p10.png", "img/hat.jpg", "img/hat.jpg"], 7000, "This is hat", ["Black", "White", "Red"]),
]

//add the products to the local storage
localStorage.setItem("products", JSON.stringify(products));


// client section owl carousel
$(function(){
    // $(".client_owl-carousel").owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     dots: false,
    //     nav: true,
    //     navText: [],
    //     autoplay: true,
    //     autoplayHoverPause: true,
    //     navText: [
    //         '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    //         '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    //     ],
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         768: {
    //             items: 2
    //         },
    //         1000: {
    //             items: 2
    //         }
    //     }
    // });

    //get the products from the local storage and make a card for each product
    /*
        <div class="col-sm-6 col-md-4 col-lg-4">
            <div class="box">
                <div class="option_container">
                        <div class="options">
                           <a href="" class="option1">
                           Men's Shirt
                           </a>
                           <a href=productId class="option2">
                           View Details
                           </a>
                        </div>
                     </div>
                     <div class="img-box">
                        <img src="images/p1.png" alt="">
                     </div>
                     <div class="detail-box">
                        <h5>
                           Men's Shirt
                        </h5>
                        <h6>
                           $75
                        </h6>
                     </div>
                  </div>
               </div>
    */
    let products = JSON.parse(localStorage.getItem("products"));
    let productCards = "";
    for(let i = 0; i < 9; i++)
    {
        productCards += `<div class="col-sm-6 col-md-4 col-lg-4">
        <div class="box">
            <div class="option_container">
                    <div class="options">
                       <a href="" class="option1">
                       ${products[i].productName}
                       </a>
                       <a href="product.html?productId=${products[i].productId}" class="option2">
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

    document.getElementById("products-Landing").innerHTML = productCards;
    
})




/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}