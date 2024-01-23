// Define product keys and other constants
let productKeys = ["productId", "productName", "category", "sellerName", "images", "price", "description", "options"];
let searchBar = document.getElementById("searchBar");
let form = document.getElementById("editForm");
let modalId = "userFormModal";
let submitButton = document.getElementById("submitButton");

// Function to get the search value from the search bar
function getSearchValue() {
    return searchBar.value.toLowerCase();
}

// Function to get the text content of each cell in a table row
function getRowText(row) {
    return Array.from(row.children).map(function (cell) {
        return cell.innerText.toLowerCase();
    });
}

// Function to check if a search value is present in the row's text content
function isSearchValueInRowText(searchValue, rowText) {
    return rowText.some(function (text) {
        return text.includes(searchValue);
    });
}

// Function to handle search functionality
function handleSearch() {
    let searchValue = getSearchValue();
    let allRows = document.getElementsByTagName("tr");

    for (let i = 1; i < allRows.length; i++) {
        let rowText = getRowText(allRows[i]);

        if (isSearchValueInRowText(searchValue, rowText)) {
            allRows[i].style.display = "table-row";
        } else {
            allRows[i].style.display = "none";
        }
    }
}

// Function to get product data from a table row
function getProductData(row) {
    const productData = {};
    Array.from(row.querySelectorAll("td")).forEach((cell, index) => {
        if (index < productKeys.length) {
            productData[productKeys[index]] = cell.textContent;
        }
    });
    return productData;
}

// Function to populate form fields with product data
function populateFormFields(form, productData) {
    Object.keys(productData).forEach(key => {
        if (form.elements.namedItem(key)) {
            form.elements.namedItem(key).value = productData[key];
        }
    });
}

// Validation functions for different fields
function isValidProductName(name) {
    return /^[A-Za-z\s]+$/.test(name);
}

function isValidCategory(category) {
    return /^[A-Za-z\s]+$/.test(category);
}

function isValidSellerName(sellerName) {
    return /^[A-Za-z\s]+$/.test(sellerName);
}

function isValidImageURL(url) {
    return /\.(jpg|jpeg)$/i.test(url);
}

function isValidPrice(price) {
    return /^\d+(\.\d+)?$/.test(price);
}

function displayValidationError(message, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearValidationErrors() {
    // Clear all error messages
    const errorMessages = document.querySelectorAll('.form-text.text-danger');
    errorMessages.forEach(element => {
        element.textContent = '';
    });
}
// Function to get edited values from the form with validation
function getEditedValues(form) {
    clearValidationErrors(); // Clear previous errors

    const productName = form.productName.value;
    const category = form.category.value;
    const sellerName = form.sellerName.value;
    const images = form.images.value;
    const price = form.price.value;
    const description = form.description.value;
    const options = form.options.value;

    let isValid = true;

    if (!isValidProductName(productName)) {
        displayValidationError("Invalid product name. Only characters and spaces are allowed.", "nameMessage");
        isValid = false;
    }

    if (!isValidCategory(category)) {
        displayValidationError("Invalid category. Only characters and spaces are allowed.", "categoryMessage");
        isValid = false;
    }

    if (!isValidSellerName(sellerName)) {
        displayValidationError("Invalid seller name. Only characters and spaces are allowed.", "sellerMessage");
        isValid = false;
    }

    if (!isValidImageURL(images)) {
        displayValidationError("Invalid image URL. Only .jpg files are allowed.", "imagesMessage");
        isValid = false;
    }

    if (!isValidPrice(price)) {
        displayValidationError("Invalid price. Only numbers are allowed.", "priceMessage");
        isValid = false;
    }

    if (!isValid) {
        return null;
    }

    return {
        productId: form.productId.value,
        productName,
        category,
        sellerName,
        images,
        price,
        description,
        options
    };
}


// Function to update product data in the table and local storage
function updateProductData(updatedValues) {
    const productId = updatedValues.productId;

    // Update the product in local storage
    let allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const productIndex = allProducts.findIndex(product => product.productId == productId);

    if (productIndex !== -1) {
        allProducts[productIndex] = updatedValues;
        localStorage.setItem("products", JSON.stringify(allProducts));
        location.reload();
    } else {
        console.error("Product not found in local storage.");
    }
}

// Event listener for page load
window.addEventListener("load", function () {
    let tbody = document.querySelector("tbody");
    let thead = document.querySelector("thead");
    let headTr = document.createElement("tr");

    // Create table header
    for (const key of productKeys) {
        let th = document.createElement("th");
        th.classList.add("col-2");
        th.textContent = key;
        headTr.appendChild(th);
    }

    let actionTh = document.createElement("th");
    actionTh.classList.add("col-2", "sortable");
    actionTh.innerHTML = "<strong>Action</strong>";
    headTr.appendChild(actionTh);

    thead.appendChild(headTr);

    // Populate table rows with product data
    let allProducts = JSON.parse(localStorage.getItem("products")) || [];
    let existingProductIds = new Set();

    allProducts.forEach(product => {
        // Check for duplicate product IDs
        if (existingProductIds.has(product.productId)) {
            console.error(`Duplicate product found with productId: ${product.productId}`);
            return;
        }

        existingProductIds.add(product.productId);

        let rowTD = tbody.insertRow(-1);

        for (const key of productKeys) {
            let td = rowTD.insertCell(-1);
            td.classList = "text-nowrap";
            td.innerHTML = key === "images" ? `<img src="${product[key][0]}" alt="Product Image">` : product[key];
        }

        let actionTd = rowTD.insertCell(-1);
        actionTd.classList.add("text-center");

        // Create edit and delete buttons
        let editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-sm", "btn-outline-secondary", "badge");
        editButton.type = "button";
        editButton.dataset.toggle = "modal";
        editButton.dataset.target = `#${modalId}`;
        editButton.innerHTML = "<i class='fas fa-edit'></i>";

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-sm", "btn-outline-secondary", "badge");
        deleteButton.type = "button";
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";

        actionTd.appendChild(editButton);
        actionTd.appendChild(deleteButton);
    });

    // Event listener for search bar input
    searchBar.addEventListener('input', function (event) {
        handleSearch();
    });

    // Event listener for form submission
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const editedValues = getEditedValues(form);

        if (editedValues) {
            updateProductData(editedValues);
        } else {
            // Validation failed, handle accordingly
            console.log("Validation failed. Product data not updated.");
        }
    });

    // Function to disable the Product ID field in the form
    function disableProductIdField() {
        form.productId.disabled = true;
        form.sellerName.disabled =true ;
        }

    // Event listeners for edit buttons in each row
    const editButtons = document.querySelectorAll(`button[data-toggle='modal'][data-target='#${modalId}']`);

    editButtons.forEach(editButton => {
        editButton.addEventListener("click", () => {
            const row = editButton.closest("tr");
            const productData = getProductData(row);
            populateFormFields(form, productData);
            disableProductIdField();
            document.getElementById(modalId).style.display = "block";
        });
    });
});
