

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
            td.innerHTML = key === "images" ? `<img src="${product[key]}" alt="Product Image">` : product[key];
        }

        let actionTd = rowTD.insertCell(-1);
        actionTd.classList = "text-center";

        let editButton = `<button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">
            <i class="fas fa-edit"></i> 
        </button>`;

        let deleteButton = `<button class="btn btn-sm btn-outline-secondary badge" type="button">
            <i class="fas fa-trash"></i> 
        </button>`;

        actionTd.innerHTML = editButton + deleteButton;
    });

    searchBar.addEventListener('input', function (event) {
      handleSearch();
    });
});

//search bar function 
function getSearchValue() {
    let searchBar = document.getElementById("searchBar");
    return searchBar.value.toLowerCase();
}

function getRowText(row) {
    return Array.from(row.children).map(function (cell) {
        return cell.innerText.toLowerCase();
    });
}

function isSearchValueInRowText(searchValue, rowText) {
    return rowText.some(function (text) { 
        return text.includes(searchValue); 
    });
}

function handleSearch() {
    let  searchValue = getSearchValue();
    let allRows = document.getElementsByTagName("tr");

    for (var i = 1; i < allRows.length; i++) {
        let rowText = getRowText(allRows[i]);

        if (isSearchValueInRowText(searchValue, rowText)) {
            allRows[i].style.display = "table-row";
        } else {
            allRows[i].style.display = "none";
        }
    }
}
