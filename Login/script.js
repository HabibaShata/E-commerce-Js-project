document.addEventListener("DOMContentLoaded", function () {
    let submit = document.getElementById("submit");
    submit.addEventListener("click", login);

    function checkCredentials(_username, _password) {
        // Retrieve existing users from local storage
        var existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        var user = existingUsers.find(function (user) {
            return user.email === _username && user.password === _password;
        });

        return user ? user.role : false;
    }

    function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        return password.length >= 7;
    }

    
        function login(event) {
            event.preventDefault();
            let username = document.getElementById("email");
            let password = document.getElementById("Password");
        
            let emailError = document.getElementById("emailError");
            let passwordError = document.getElementById("passwordError");
            let validationPopup = document.getElementById("validationPopup");
        
            emailError.style.visibility = "hidden";
            passwordError.style.visibility = "hidden";
        
            let role = checkCredentials(username.value, password.value);
            if (role) {
                switch (role) {
                    case "customer":
                        window.location.assign("../Users/customer.html");
                        break;
                    case "seller":
                        window.location.assign("../Users/seller.html");
                        break;
                    case "admin":
                        window.location.assign("../Users/admin.html");
                        break;
                    default:
                        alert("Role not recognized");
                }
            } else {
                validationPopup.style.animation = "";
                validationPopup.style.display = "block";
        
                void validationPopup.offsetWidth;
        
                validationPopup.style.animation = "fadeOut 4s forwards";
        
                if (!validateEmail(username.value) && !validatePassword(password.value)) {
                    validationPopup.innerText = "Invalid email and password";
                } else if (!validateEmail(username.value)) {
                    validationPopup.innerText = "Invalid email";
                } else if (!validatePassword(password.value)) {
                    validationPopup.innerText = "Invalid password";
                } else {
                    validationPopup.innerText = "Invalid email or password";
                }
        
                setTimeout(function () {
                    validationPopup.style.display = "none";
                }, 5000);
            }
        }
    
        
});
