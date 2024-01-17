import { LogOut } from "./products.js";

window.addEventListener("load", function(){
    this.document.getElementById("welcome-user").innerHTML ="Welcome, " +  localStorage.getItem("loggedInUser");
    LogOut();
})