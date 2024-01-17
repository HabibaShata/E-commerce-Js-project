document.addEventListener("DOMContentLoaded", function () {
    let submit = document.getElementById("submit");
    submit.addEventListener("click", login);

    function checkCredentials(_username, _password) {
        let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const adminUser = { email: 'admin@example.com', password: 'adminpassword', role: 'admin' };
        
        existingUsers.push(adminUser);

        let user = existingUsers.find(function (user) {
            return user.userEmail == _username && user.userPassword == _password;
        });
        return user ? user : false;
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
            let userEmail = document.getElementById("email");
            let password = document.getElementById("Password");
            

            let emailError = document.getElementById("emailError");
            let passwordError = document.getElementById("passwordError");
            let validationPopup = document.getElementById("validationPopup");
        
            emailError.style.visibility = "hidden";
            passwordError.style.visibility = "hidden";
        
            let user = checkCredentials(userEmail.value, password.value);
            if (user) {

                localStorage.setItem("loggedInUser",JSON.stringify(user));
                    
                window.location.assign(`../${user.userRole}.html`);           
            }
            else 
            {
                validationPopup.style.animation = "";
                validationPopup.style.display = "block";
        
                void validationPopup.offsetWidth;
        
                validationPopup.style.animation = "fadeOut 4s forwards";
        
                if (!validateEmail(userEmail.value) && !validatePassword(password.value)) {
                    validationPopup.innerText = "Invalid email and password";
                } else if (!validateEmail(userEmail.value)) {
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
