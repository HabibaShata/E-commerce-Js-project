import { GetProducts, products } from "./custom.js";

let categories = ["All", "Jewellery", "Accessories", "Artwork", "Pet-supplies", "Sweets"];
let filter = "All";

window.addEventListener("load", function(){
    let allProducts = GetProducts(-1);
    this.document.getElementById("all-products-section").innerHTML = allProducts;
    MakingCategories();

    //filtering
    let categoryItems = document.getElementById("categories").children;
    document.getElementById("categories").addEventListener("click", function(e){
        if(e.target.nodeName=="LI")
        {
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
            if(e.target.innerHTML == "All") {
                allFilteredProducts = GetProducts(-1);
            } else {
                //filtering by category name
                let filteredProducts = products.filter(product=>product.category==e.target.innerHTML);
                //Making the new products list
                allFilteredProducts = GetProducts(filteredProducts.length, filteredProducts);
            }
            //Updating the displayed products with the filtered products
            document.getElementById("all-products-section").innerHTML = allFilteredProducts;
        }
    }) 
})

function MakingCategories()
{
    for(let i = 0; i < categories.length; i++)
    {
        if(categories[i] == filter)
        {
            document.getElementById("categories").innerHTML += `<li class="list-inline-item py-4 px-4 active">${categories[i]}</li>`;
            continue;
        }
        document.getElementById("categories").innerHTML += `<li class="list-inline-item py-4 px-4">${categories[i]}</li>`;
    }
}