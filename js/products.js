import { GetProducts, products } from "./custom.js";
// products.js
// main.js
import { addToCart } from './addtoCart.js';

// Now you can use addToCart in this file


let categories = ["All", "Jewellery", "Accessories", "Artwork", "Pet-supplies", "Sweets"];
let filter = "All";

function searchProductsByName(productName) {
    //filter the array according to the name

    let searchedArr = products.filter(function (product) {
        if (filter != "All") {
            return product.productName.toLowerCase().includes(productName.toLowerCase()) && product.category == filter;
        }
        else {
            return product.productName.toLowerCase().includes(productName.toLowerCase());
        }
    });
    //update the products display with the searched array
    document.getElementById("all-products-section").innerHTML = GetProducts(searchedArr.length, searchedArr);
}

window.addEventListener("load", function () {
    //Check if the user is logged in then change the Account dropdown menu and change the links urls
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser != null) {
        if(JSON.parse(loggedInUser).userRole=="admin")
        {
            document.querySelector(".content").innerHTML = `
            
               <nav class="navbar navbar-expand-lg custom_nav-container ">
                  <a class="navbar-brand" href="index.html"><img width="250" src="images/logo.png" alt="#" /></a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class=""> </span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul class="navbar-nav">
                        <li class="nav-item">
                           <a class="nav-link" href="customer.html">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item dropdown">
                           <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"> <span class="nav-label" id="welcome-user">${JSON.parse(loggedInUser).userName} <span class="caret"></span></a>
                           <ul class="dropdown-menu" id="user-DropDown">
                              <li><a href="#">Profile</a></li>
                              <li><a href="usersCRUD.html">Users</a></li>
                              <li><a href="#" id="logOut">Log out</a></li>
                           </ul>
                        </li>
                        <li class="nav-item active">
                           <a class="nav-link" href="product.html">Products</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="blog_list.html">Orders</a>
                        </li>     
                     </ul>
                  </div>
               </nav>
            `;
        }
        else 
        {
            //add the list items to the dropdown menu
            let userDropDown = document.getElementById("user-DropDown");
            userDropDown.innerHTML = `
            <li><a href="profile.html">Profile</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#" id="logOut">Log out</a></li>
            `;
            //change the a href to the customer page
            document.getElementById("homeLink").setAttribute("href", "customer.html");
            document.getElementById("loggedInUser").innerHTML = "Welcome, " + JSON.parse(localStorage.getItem("loggedInUser")).userName;
        }
    } else {
        document.getElementById("loggedInUser").innerHTML = "Account";
        //add the list items to the dropdown menu
        let userDropDown = document.getElementById("user-DropDown");
        userDropDown.innerHTML = `
        <li><a href="sign-up/sign-up.html">Sign up</a></li>
        <li><a href="Login/login.html">Log in</a></li>
        `;
        //change the a href to the index page
        document.getElementById("homeLink").setAttribute("href", "index.html");
    }
    //categories
    MakingCategories();

    //logout
    LogOut();

    let allProducts = GetProducts(-1);
    document.getElementById("all-products-section").innerHTML = allProducts;

    //filtering
    let categoryItems = document.getElementById("categories").children;
    document.getElementById("categories").addEventListener("click", function (e) {
        console.log(e.target);
        console.log(this);
        if (e.target.nodeName == "LI") {
           console.log(e.target.nodeName );
            filter = e.target.innerHTML;
            //Removing the active class from all list items
            for (let i = 0; i < categoryItems.length; i++) {
                categoryItems[i].classList.remove("active");
            }
            //Add the active class to the clicked item
            e.target.classList.add("active");

            //change the category title to the clicked category name
            document.getElementById("category-title").innerHTML = `Our <span>${e.target.innerHTML}`;

            let allFilteredProducts;
            //If the user clicked all then display all products
            if (e.target.innerHTML == "All") {
                allFilteredProducts = GetProducts(-1);
            } else {
                //filtering by category name
                let filteredProducts = products.filter(product => product.category == e.target.innerHTML);
                // to make sure Dom[html code] loaded
                console.log(filteredProducts);
                //Making the new products list
                allFilteredProducts = GetProducts(filteredProducts.length, filteredProducts);
                console.log(allFilteredProducts);
                var product_Id;
                // window.addEventListener("load", function () {
                    var addCartLink = document.querySelectorAll(".addCart");
                    console.log(addCartLink);
                    for (var i = 0; i < addCartLink.length; i++) {
                        addCartLink[i].addEventListener("click", function (event) {
                            event.preventDefault();
                            console.log(event.target);
                            product_Id = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.classList[3].split('=')[1]);
                            addToCart(product_Id);
            
                        })
                    }
            
                // })

            }

            //Updating the displayed products with the filtered products
            document.getElementById("all-products-section").innerHTML = allFilteredProducts;
        }
    })
     
    var product_Id;
    // window.addEventListener("load", function () {
        var addCartLink = document.querySelectorAll(".addCart");
        console.log(addCartLink);
        for (var i = 0; i < addCartLink.length; i++) {
            addCartLink[i].addEventListener("click", function (event) {
                event.preventDefault();
                console.log(event.target);
                product_Id = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.classList[3].split('=')[1]);
                addToCart(product_Id);

            })
        }

    // })

    //adding search functionality
    document.getElementById("search-input").addEventListener("keyup", function () {
        searchProductsByName(this.value);
    })
})

function MakingCategories() {
    for (let i = 0; i < categories.length; i++) {
        if (categories[i] == filter) {
            document.getElementById("categories").innerHTML += `<li class="list-inline-item py-4 px-4 active">${categories[i]}</li>`;
            continue;
        }
        document.getElementById("categories").innerHTML += `<li class="list-inline-item py-4 px-4">${categories[i]}</li>`;
    }
}

export function LogOut() {
    document.getElementById("user-DropDown").addEventListener("click", function (e) {
        if (e.target.id == "logOut") {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        }
    })
}