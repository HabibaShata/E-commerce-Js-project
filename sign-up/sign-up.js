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
    let validationErrors = validateForm();

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
        showValidationMessages(validationErrors);
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
        showValidationMessages({ email: 'This email is already signed up. Please use a different email.' });
        return;

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
    // Get the input values
    var email = document.querySelector('input[name="email"]').value;
    var username = document.querySelector('input[name="username"]').value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Get the small elements for displaying messages
    const emailMessage = document.getElementById('emailMessage');
    const usernameMessage = document.getElementById('usernameMessage'); // Make sure you have this in HTML
    const passwordMessage = document.getElementById('passwordMessage');
    const confirmPasswordMessage = document.getElementById('confirmPasswordMessage'); // Make sure you have this in HTML

    // Clear previous messages
    emailMessage.textContent = '';
    usernameMessage.textContent = '';
    passwordMessage.textContent = '';
    confirmPasswordMessage.textContent = '';

    // Validate each field and set messages
    if (!isValidEmail(email)) {
        emailMessage.textContent = "Invalid email format.";
    }

    if (!isValidName(username)) {
        usernameMessage.textContent = "Username is not valid.";
    }

    if (!isValidPassword(password)) {
        passwordMessage.textContent = "Password does not meet criteria.";
    }

    if (password !== confirmPassword) {
        confirmPasswordMessage.textContent = "Passwords do not match.";
    }

    // Return true if all validations pass, otherwise false
    return emailMessage.textContent === '' && 
           usernameMessage.textContent === '' && 
           passwordMessage.textContent === '' && 
           confirmPasswordMessage.textContent === '';
}

// Make sure to update isValidEmail, isValidPassword, and isValidName functions to only return true/false
// and not manipulate the DOM directly.




function showValidationMessages(errors) {
    document.querySelectorAll('.form-text.text-danger').forEach(elem => {
        elem.textContent = '';
    });

    // Display new error messages
    for (const key in errors) {
        const errorMessage = errors[key];
        const errorElement = document.getElementById(`${key}Error`);
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes('.com');
}
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
function isValidName(username) {
    return username.length >= 3;
}

export {validateForm, handleFormSubmit, showValidationMessages};
