import { isValidEmail, isValidPassword, isValidName } from "../js/profile.js";
import {users} from "../js/classes.js"

window.addEventListener("load", function () {
    // Attach the form submission handler to the form
    let signUpForm = document.querySelector('.signupForm');
    signUpForm.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();
    // Validate the form before proceeding
    let validationMessages = validateForm();

    if (validationMessages.length > 0) {
        showValidationMessages(validationMessages);
        return;
    }

    var role = document.getElementById('sellerBtn').checked ? 'seller' : 'customer';
    var email = document.querySelector('input[name="email"]').value;
    var password = document.querySelector('input[name="password"]').value;
    var username = document.querySelector('input[name="username"]').value;
    var usersArray = JSON.parse(localStorage.getItem('users')) || [];
    var emailExists = usersArray.some(function (user) {
        return user.userEmail.toLowerCase() === email.toLowerCase();
    });

    if (emailExists) {
        showValidationMessages(['This email is already signed up. Please use a different email.']);
        emailExists = false;
    } else {
        let maxId = Math.max(...usersArray.map(user => user.userID), 0); //get max id
        var user = new users(maxId + 1, username, password, email, role);

        usersArray.push(user);

        localStorage.setItem('users', JSON.stringify(usersArray));

        //check if the admin is the one who is trying to add a new user account then don't navigate
        let loggedInUserRole;
        if(localStorage.getItem("loggedInUser")!=null)
        {
            loggedInUserRole = JSON.parse(localStorage.getItem("loggedInUser")).userRole;
        }

        if(loggedInUserRole == "admin")
        {
            location.reload();
            return;
        }

        localStorage.setItem("loggedInUser",JSON.stringify(user));

        window.location.href =(`../${role}.html`) ;
    }
}

function validateForm() {
    var email = document.querySelector('input[name="email"]').value;
    var username = document.querySelector('input[name="username"]').value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    let validationMessages = [];

    const firstNameMessage = document.getElementById('userNameMessage');
    const emailMessage = document.getElementById('emailMessage');
    const passwordMessage = document.getElementById('passwordMessage');

    // You can add more specific validation if needed
    if (!isValidEmail(email, emailMessage)) {
        validationMessages.push("Fix the email error.");
    }

    if (!isValidName(username, firstNameMessage)) {
        validationMessages.push("Fix the username error.");
    }

    if (!isValidPassword(password, passwordMessage)) {
        validationMessages.push("Fix the password error.");
    }

    if (password !== confirmPassword) {
        validationMessages.push("Passwords do not match.");
    }

    return validationMessages;
}


export {validateForm, handleFormSubmit, showValidationMessages};