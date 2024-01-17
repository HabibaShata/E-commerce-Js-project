import { LogOut } from "./products.js";

window.addEventListener("load", function(){
    this.document.getElementById("welcome-user").innerHTML ="Welcome, " +  JSON.parse(localStorage.getItem("loggedInUser")).userName;
    LogOut();
})