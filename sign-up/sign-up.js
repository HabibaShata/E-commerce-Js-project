document.addEventListener("DOMContentLoaded", function () {
    function handleFormSubmit(event) {
        event.preventDefault();

        // Validate the form before proceeding
        let validationMessages = validateForm();

        if (validationMessages.length > 0) {
            showValidationMessages(validationMessages);
            return;
        }

        let role = document.getElementById('sellerBtn').checked ? 'seller' : 'customer';
        let email = document.querySelector('input[name="email"]').value;
        let password = document.querySelector('input[name="password"]').value;

        let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        let emailExists = existingUsers.some(function (user) {
            return user.email === email;
        });

        if (emailExists) {
            showValidationMessages(['This email is already signed up. Please use a different email.']);
        } else {
            let user = {
                role: role,
                
                email: email,
                password: password
            };

            existingUsers.push(user);

            localStorage.setItem('users', JSON.stringify(existingUsers));
            

            window.location.href = (`../Users/${role}.html`);

            console.log('User added to local storage.');
        }
    }

    // Attach the form submission handler to the form
    let signUpForm = document.getElementById('signupForm');
    signUpForm.addEventListener('submit', handleFormSubmit);
});

function validateForm() {
    let email = document.querySelector('input[name="email"]').value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let validationMessages = [];

    // You can add more specific validation if needed
    if (!validateEmail(email)) {
        validationMessages.push("Invalid email format.");
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
    let validationPopup = document.getElementById("validationPopup");
    validationPopup.innerHTML = messages.map(message => `<p>${message}</p>`).join('');
    validationPopup.style.animation = ""; // Reset animation
    validationPopup.style.display = "block";

    void validationPopup.offsetWidth;

    // Start the animation by adding the class
    validationPopup.style.animation = "fadeOut 5s forwards";

    // Hide the popup after 2 seconds
    setTimeout(function () {
        validationPopup.style.display = "none";
    }, 5000);
}
