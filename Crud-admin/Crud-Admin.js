

window.addEventListener("load",function(){

    //thead
    let thead= document.querySelector("thead");
    let headTr =document.createElement("tr");

    //select head

    let selectTh =document.createElement("td");
    selectTh.classList=`align-top `;
    let checkBoxThDiv = document.createElement("div");
    checkBoxThDiv.classList = "custom-control custom-control-inline custom-checkbox custom-control-nameless m-0";
    checkBoxThDiv.innerHTML = `
        <input type="checkbox" class="custom-control-input" id="all-items">
        <label class="custom-control-label" for="all-items"><strong>Select All</strong></label>`;
    
    
    
    selectTh.append(checkBoxThDiv);
    headTr.append(selectTh);


    // img head
     
    let imgTh = document.createElement ('td');
    imgTh.classList='max-width';
    imgTh.innerText ="Image";
    headTr.append(imgTh);
    //

    let nameTh= this.document.createElement("th");
    nameTh.classList=`sortable`
    nameTh.innerHTML="userName";
    headTr.append(nameTh);
    //
    let typeTh= document.createElement("td");
    typeTh.classList=`sortable`;
    typeTh.innerHTML="type";
    headTr.append(typeTh);
    //

    let catgoryTh= this.document.createElement("td");
    catgoryTh.classList=`sortable`;
    catgoryTh.innerHTML="category";
    headTr.append(catgoryTh);
    //
    
    let priceTh= this.document.createElement("td");
    priceTh.classList=`sortable`;
    priceTh.innerHTML="Price";
    headTr.append(priceTh);

    //
    let actionTh= this.document.createElement("td");
    actionTh.classList=`sortable`;
    actionTh.innerHTML="Action";
    headTr.append(actionTh);








thead.append(headTr);
//tbody
    let mainTr = document.createElement("tr");
    let checkboxTd= document.createElement("td");
    checkboxTd.classList="align-middle";
    let checkboxDiv= document.createElement("div");
    checkboxDiv.classList="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top";
    checkboxDiv.innerHTML =`<input type="checkbox" class="custom-control-input" id="item-2"><label class="custom-control-label" for="item-2"></label>`;
    checkboxTd.append(checkboxDiv);
    mainTr.append(checkboxTd);
    let tbody= document.querySelector("tbody") ;
    
    let imgTd=document.createElement("td");
    imgTd.classList= "align-middle text-center";
    let imgDiv= document.createElement("div")
    imgDiv.classList =`bg-light d-inline-flex justify-content-center align-items-center align-top`
    imgDiv.style =`width: 35px; height: 35px; border-radius: 3px;`
    imgDiv.innerHTML = '<i class="fas fa-image" style="opacity: 0.8;"></i>';
    imgTd.append(imgDiv);
    mainTr.append(imgTd);
    
    let nameTd=document.createElement('td');
    nameTd.classList=`text-nowrap align-middle`;
    nameTd.innerText='husien';
    mainTr.append(nameTd);

    let productTd = document.createElement("td");

    productTd.classList =`text-nowrap align-middle`;
    productTd.innerHTML="shirt";
    mainTr.append(productTd)

    let catgoryTd= document.createElement("td");
    catgoryTd.classList=`text-nowrap align-middle`
    catgoryTd.innerText='winter';
    mainTr.append(catgoryTd);

    let priceTd= document.createElement("td");
    priceTd.classList=`text-nowrap align-middle`
    priceTd.innerHTML="15000";
    mainTr.append(priceTd);
    
    let actionTd =document.createElement("td");
    actionTd.classList=`text-center align-middle`;

    let actionDiv =document.createElement("div");
    actionDiv.innerHTML =`
    <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">
        <i class="fas fa-edit"></i> Edit
    </button>
    <button class="btn btn-sm btn-outline-secondary badge" type="button">
        <i class="fas fa-trash"></i> Delete
    </button>`;

    actionTd.append(actionDiv);
    mainTr.append(actionTd);

     




















    tbody.append(mainTr);


    


      





});//end of load 
