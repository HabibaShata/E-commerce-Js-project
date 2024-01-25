

//let allProducts = JSON.parse(localStorage.getItem("products"))

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
            td.innerHTML = key === "images" ? `<img src="${product[key][0]}" alt="Product Image">` : product[key];
        }

        let actionTd = rowTD.insertCell(-1);
        console.log(actionTd);
        actionTd.classList = "text-center";

        let editButton = `
            <i class="btn btn-sm btn-outline-secondary badge fas fa-edit Edit"></i> 
        `;

        let deleteButton = `
        <a href="#myModal" class="trigger-btn" data-toggle="modal"><i class="btn btn-sm btn-outline-secondary badge fa-solid fa-trash-can deleteItem"></i></a>
        

        `;

        actionTd.innerHTML = editButton + deleteButton;
    });
    deleteBueditButtontton.addEventListener("click",function(){
        console.log("#######");
    })
});


// var tbody=document.querySelector("tbody");
// console.log(tbody);
// tbody.addEventListener("click",function(e){
//     if(e.target.classList.contains("deleteItem")){
//         // console.log( document.querySelector(".Delete"));
//         document.querySelector(".Delete").addEventListener("click",function(){
//             console.log("#####");
//         })
//         //  document.querySelector(".Delete").addEventListener("click",function(){
//         //        console.log("doneeeeeeeeeee");
//         //  })
//         e.target.parentElement;
//     }
// // console.log(e.target.classList.contains("deleteItem"));
//   console.log(e.target.parentElement );
// })
