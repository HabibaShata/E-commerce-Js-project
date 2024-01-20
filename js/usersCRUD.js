
import { users, handleFormSubmit, validateForm, showValidationMessages} from "../sign-up/sign-up.js";
import { isValidEmail, isValidPassword, isValidName } from "./profile.js";
let allUsers = JSON.parse(localStorage.getItem("users"));

let selectedUser = {
    userID: -1,
    userName: "",
    userPassword: "",
    userEmail: "",
    userRole: ""
}

window.addEventListener("load", function(){
    //Get the users from local storage and make a table with all users except for those whose userRole is admin
    //Display all users
    let tableBody = document.getElementsByTagName("tbody")[0];
    let tableHead = document.getElementsByTagName("thead")[0];
    let row = tableHead.insertRow(-1);
    for (const key in allUsers[0]) {
    ;
    }
    row.innerHTML += `<th>Actions</th>`;

    let rowTD;
    let td;
    allUsers.forEach(user => {
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
})

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