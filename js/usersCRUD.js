
import { users, handleFormSubmit } from "../sign-up/sign-up.js";
import { isValidEmail, isValidPassword, isValidName } from "./profile.js";
let allUsers = JSON.parse(localStorage.getItem("users"));

let selectedUser = {
    userID: -1,
    userName: "",
    userPassword: "",
    userEmail: "",
    userRole: ""
};

let tableBody, tableHead;

let usersFilter="all";


window.addEventListener("load", function(){
    //Get the users from local storage and make a table with all users except for those whose userRole is admin
    //Display all users
    tableBody = document.getElementsByTagName("tbody")[0];
    tableHead = document.getElementsByTagName("thead")[0];
    //display table headers
    let row = tableHead.insertRow(-1);
    for (const key in allUsers[0]) {
        row.innerHTML += `<th>${key}</th>`;
    }
    row.innerHTML += `<th>Actions</th>`;
    DisplayUsers(allUsers);

    //if clicked on edit or delete
    tableBody.addEventListener("click", function(event){
        if(event.target.nodeName=="I")
        {
            let row = event.target.parentNode.parentNode.parentNode;
            //Set the userName and the userId to delete with the current row info
            selectedUser.userID = row.children[0].innerHTML;
            selectedUser.userName = row.children[1].innerHTML;
            selectedUser.userEmail = row.children[3].innerHTML;
            selectedUser.userPassword = row.children[2].innerHTML;
            selectedUser.userRole = row.children[4].innerHTML;
            
            //type the name of the user within the delete modal (are you sure you want to delete "userNameToDelete")
            document.getElementById("userToDelete").innerHTML = selectedUser.userName;
            prepareEditModal();
        }
    })

    //add the delet event to the delete button
    document.getElementById("deleteBtn").addEventListener("click", DeleteRecord);
    //add the edit event to the edit button
    document.getElementById("saveEditing").addEventListener("click", saveEditing);
    //Add search functionality
    this.document.querySelector("input[type=search]").addEventListener("keyup", search);
    //filtering event
    this.document.querySelector(".filter-category").addEventListener("click", filter);
})

function DisplayUsers(usersArray)
{
    tableBody.innerHTML = "";
    let rowTD;
    let td;
    usersArray.forEach(user => {
        if(user.userRole!="admin")
        {
            rowTD = tableBody.insertRow(-1);
            for (const key in user) {
                td = rowTD.insertCell(-1);
                td.innerHTML = user[key];
            }
            td = rowTD.insertCell(-1);
            td.innerHTML = `<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>`;
            td.innerHTML += `<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>`;
        }
    });
}

function search(e)
{
    let searchedArr;
    if(usersFilter!="all") {
        searchedArr = allUsers.filter(user=>user.userName.toLowerCase().indexOf(e.target.value)!=-1 && user.userRole == usersFilter);
    } else {
        searchedArr = allUsers.filter(user=>user.userName.toLowerCase().indexOf(e.target.value)!=-1);
    }
    
    DisplayUsers(searchedArr);
}

//filter based on user Role (All - customers - sellers)
function filter(e)
{
    if (e.target.nodeName=="BUTTON") {
        let btns = document.querySelectorAll(".filter-category button");
        btns.forEach(btn=>{btn.classList.remove("btn-primary"); btn.classList.add("btn-secondary");})

        e.target.classList.add("btn-primary");
        e.target.classList.remove("btn-secondary");
    }
    switch(e.target.innerHTML)
    {
        case "All":
            DisplayUsers(allUsers);
            usersFilter = "all";
            break;
        case "Customers":
            DisplayUsers(allUsers.filter(user=>user.userRole=="customer"));
            usersFilter = "customer";
            break;
        case "Sellers":
            DisplayUsers(allUsers.filter(user=>user.userRole=="seller"));
            usersFilter = "seller";
            break;
    }
}

function DeleteRecord()
{
    allUsers = allUsers.filter(user => user.userID != selectedUser.userID);
    localStorage.setItem("users", JSON.stringify(allUsers));
    location.reload();
}

function prepareEditModal()
{
    document.getElementById("edit_name").value = selectedUser.userName;
    document.getElementById("edit_email").value = selectedUser.userEmail;
    document.getElementById("edit_pass").value = selectedUser.userPassword;
    if (selectedUser.userRole=="customer") {
        document.getElementById("customer").setAttribute("checked", true);
    } else {
        document.getElementById("seller").setAttribute("checked", true);
    }
}

function saveEditing()
{
    //get the updated data from the modal form
    let name = document.getElementById("edit_name").value;
    let email = document.getElementById("edit_email").value;
    let pass = document.getElementById("edit_pass").value;
    let role = document.querySelector('input[name="userType"]:checked').value;

    //validate the data

    //the containers in which the data will be displayed
    const firstNameMessage = document.getElementById('nameMessage');
    const emailMessage = document.getElementById('emailMessage');
    const passwordMessage = document.getElementById('passwordMessage');

    //check if the data is valid
    const isFirstNameValid = isValidName(name, firstNameMessage);
    const isEmailValid = isValidEmail(email, emailMessage);
    const isPasswordValid = isValidPassword(pass, passwordMessage);

    if (!isFirstNameValid || !isEmailValid || !isPasswordValid) {
        return;
    }

    //make a new user with the updated data
    let user = new users(selectedUser.userID, name, pass, email, role);

    //get the index of the user to be updated
    let oldUser = allUsers.find(user => user.userID == selectedUser.userID);
    let oldUserIndex = allUsers.indexOf(oldUser);
    allUsers.splice(oldUserIndex, 1, user);

    //update the local storage
    localStorage.setItem("users", JSON.stringify(allUsers));

    //reload the page
    location.reload();
}

function AddUser()
{
    let signUpForm = document.getElementById('signupForm');
    signUpForm.addEventListener('submit', handleFormSubmit);
}