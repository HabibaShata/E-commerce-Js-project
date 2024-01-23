let allProducts = JSON.parse(localStorage.getItem("products"))

let selectedProduct={
    productId : 1,
    productName : '',
    category : '',
    sellerName : '',
    images : [],
    price : '',
    description :'' ,
    options : '',
    Action:''
}     

window.addEventListener("load", function () {
    let allProducts = JSON.parse(localStorage.getItem("products"));

    let tbody = document.querySelector("tbody");
    let thead = document.querySelector("thead");
    let headTr = document.createElement("tr");

    let productKeys = ["productId", "productName", "category", "sellerName", "images", "price", "description", "options"];

    for (const key of productKeys) {
        headTr.innerHTML += `<th class="col-2">${key}</th>`;
    }

    let actionTh = document.createElement("th");
    actionTh.classList = "col-2 sortable";
    actionTh.innerHTML = "<strong>Action</strong>";
    headTr.append(actionTh);

    thead.append(headTr);

    allProducts.forEach(product => {
        let rowTD = tbody.insertRow(-1);

        for (const key of productKeys) {
            let td = rowTD.insertCell(-1);
            td.classList = "text-nowrap";
            if(key=="images")
            {
                console.log(product[key][0]);
            }
            td.innerHTML = key === "images" ? `<img src="${product[key][0]}" alt="Product Image" class="img-fluid">` : product[key];
        }

        let actionTd = rowTD.insertCell(-1);
        actionTd.classList = "text-center";

        let editButton = `<button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#product-form-modal">
            <i class="fas fa-edit"></i> Edit
        </button>`;

        let deleteButton = `<button class="btn btn-sm btn-outline-secondary badge" type="button">
            <i class="fas fa-trash"></i> Delete
        </button>`;

        actionTd.innerHTML = editButton + deleteButton;
    });

    //if clicked on edit or delete
    this.document.querySelector("tbody").addEventListener("click", function(event){
        if(event.target.nodeName=="BUTTON")
        {
            if(event.target.innerHTML.includes("Edit"))
            {
                let row = event.target.parentNode.parentNode;
                //Set the userName and the userId to delete with the current row info
                selectedProduct.productId = row.children[1].innerHTML;
                selectedProduct.productName = row.children[2].innerHTML;
                selectedProduct.category = row.children[3].innerHTML;
                selectedProduct.sellerName = row.children[4].innerHTML;
                selectedProduct.images = row.children[5].innerHTML;
                selectedProduct.price = row.children[6].innerHTML;
                selectedProduct.description = row.children[7].innerHTML;
                selectedProduct.options = row.children[8].innerHTML;

                //prepare the modal form
                prepareEditModal();
            }
        }
    })
});

function prepareEditModal()
{
    
    document.querySelector("[name='productName']").value = selectedProduct.productName;
    document.querySelector("[name=category]").value = selectedProduct.category;
    document.querySelector("[name=sellerName]").value = selectedProduct.sellerName;
    document.querySelector("[name=images]").value = selectedProduct.images;
    document.querySelector("[name=price]").value = selectedProduct.price;
    document.querySelector("[name=description]").value = selectedProduct.description;
    document.querySelector("[name=options]").value = selectedProduct.options;
}

function saveEditing()
{
    //get the updated data from the modal form
    let name = document.querySelector("[name=productName]").value;
    console.log("helloooo");
    let category = document.querySelector("[name=category]").value;
    let sellerName = document.querySelector("[name=sellerName]").value;
    let images = document.querySelector("[name=images]").value;
    let price = document.querySelector("[name=price]").value;
    let description = document.querySelector("[name=description]").value;
    let options = document.querySelector("[name=options]").value;

    //validate the data
    

    //check if the data is valid

    //make a new product with the updated data
    let product = new product(selectedProduct.productId, name, category, sellerName, images, price, description, options);

    //get the index of the product to be updated
    let oldProduct = allProducts.find(product => product.productId == selectedProduct.productId);
    let oldProductIndex = allProducts.indexOf(oldProduct);
    allProducts.splice(oldProductIndex, 1, product);

    //update the local storage
    localStorage.setItem("products", JSON.stringify(allProducts));

    //reload the page
    //location.reload();
}