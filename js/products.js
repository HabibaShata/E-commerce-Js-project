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
    if (this.localStorage.getItem("loggedInUser") != null) {
        document.getElementById("loggedInUser").innerHTML = "Welcome, " + JSON.parse(localStorage.getItem("loggedInUser")).userName;
        //add the list items to the dropdown menu
        let userDropDown = document.getElementById("user-DropDown");
        userDropDown.innerHTML = `
        <li><a href="profile.html">Profile</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#" id="logOut">Log out</a></li>
        `;
        //change the a href to the customer page
        document.getElementById("homeLink").setAttribute("href", "customer.html");
    } else {
        loggedInUser.innerHTML = "Account";
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
    console.log(allProducts);
    document.getElementById("all-products-section").innerHTML = allProducts;

    //filtering
    let categoryItems = document.getElementById("categories").children;
    console.log(categoryItems);
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