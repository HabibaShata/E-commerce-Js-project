let cs, lyerCSOverlay;
window.addEventListener("load", function(){
	let arrowBack = document.querySelector(".arrowBackCS");
	cs = document.querySelector(".customerService");
	lyerCSOverlay = document.querySelector(".customerService-overlay");
	let btnCS = document.querySelector("#btnCS");

	//add the event listeners
	arrowBack.addEventListener("click", hideCustomerService);
	btnCS.addEventListener("click", showCustomerService);
})

function showCustomerService() {
    cs.classList.add("show");
    lyerCSOverlay.classList.add("show");
}

function hideCustomerService() {
    lyerCSOverlay.classList.remove("show");
    cs.classList.remove("show");
}
