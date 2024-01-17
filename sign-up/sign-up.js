export class users
{
    constructor(userID, userName, userPassword, userEmail, userRole) {
        this.userID = userID;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.userRole = userRole;
    }
}

let usersArray = [];

if(localStorage.getItem("users") != null)
{
    usersArray = JSON.parse(localStorage.getItem("users"));
}


let admin = new users(0, "admin", 1234567, "admin@gmail.com", "admin");

usersArray.push(admin);

localStorage.setItem("users", JSON.stringify(usersArray));

document.addEventListener("DOMContentLoaded", function () {
    function handleFormSubmit(event) {
        event.preventDefault();

        // Validate the form before proceeding
        var validationMessages = validateForm();

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
            return user.email === email;
        });

        if (emailExists) {
            showValidationMessages(['This email is already signed up. Please use a different email.']);
        } else {
            var user = new users(usersArray.length+1, username, password, email, role);

            usersArray.push(user);

            localStorage.setItem('users', JSON.stringify(usersArray));

            localStorage.setItem('loggedInUser', username);

            window.location.href = "../customer.html";
        }
    }

    // Attach the form submission handler to the form
    var signUpForm = document.getElementById('signupForm');
    signUpForm.addEventListener('submit', handleFormSubmit);
});

function validateForm() {
    var email = document.querySelector('input[name="email"]').value;
    var username = document.querySelector('input[name="username"]').value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var validationMessages = [];

    // You can add more specific validation if needed
    if (!validateEmail(email)) {
        validationMessages.push("Invalid email format.");
    }

    if (username.length < 4) {
        validationMessages.push("Username must be at least 4 characters.");
    }

    if (password.length < 7) {
        validationMessages.push("Password must be at least 7 characters.");
    }

    if (password !== confirmPassword) {
        validationMessages.push("Passwords do not match.");
    }

    return validationMessages;
}

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showValidationMessages(messages) {
    var validationPopup = document.getElementById("validationPopup");
    validationPopup.innerHTML = messages.map(message => `<p>${message}</p>`).join('');
    validationPopup.style.animation = ""; // Reset animation
    validationPopup.style.display = "block";

    void validationPopup.offsetWidth;

    // Start the animation by adding the class
    validationPopup.style.animation = "fadeOut 4s forwards";

    // Hide the popup after 2 seconds
    // setTimeout(function () {
    //     validationPopup.style.display = "none";
    // }, 2000);
}
