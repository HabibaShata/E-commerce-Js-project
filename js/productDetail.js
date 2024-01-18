
import {products} from "./custom.js";

window.addEventListener("load", function () {
    const searchParams = new URLSearchParams(window.location.search);

    // Get the value of the 'productId' parameter
    const productId = searchParams.get('productId');

    const product = products.find(x => x.productId == productId);

    FillDetail(product);

    FillImgList(product.images);

    FillMainImg(product.images[0]);
})

function FillDetail(product) {
    $('.product-title').text(product.productName);
    $(".catigory").text("Catigory: " + product.category);
    $('.product-description').text(product.description);
    $('.price span').text(product.price + '$');

    const select = $('select')[0];
    product.options.forEach(color => {
        const creatoption = document.createElement('option');//<option>
        creatoption.text = color;
        select.add(creatoption);
    });
}

function FillMainImg(img) {
    const createdimg2 = document.createElement('img');//<img>
    createdimg2.src = img;
    createdimg2.classList.add('view_img', 'card-img', 'top');
    $('#mainimg')[0].appendChild(createdimg2);
}

function FillImgList(imges) {
    const imglist = $('#imglist')[0];
    imges.forEach(item => {
        const creatimg = document.createElement('img');//<img>
        creatimg.src = item;
        creatimg.addEventListener('click' ,function(event){
            $('#mainimg img')[0].src=event.target.src;
        });
        creatimg.classList.add('img_list', 'card-img', 'top');
        imglist.appendChild(creatimg);
    })
}