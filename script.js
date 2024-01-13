window.addEventListener("load", function () {
    let submit = document.getElementById("submit");
    submit.addEventListener("click", login);



var credentials = [
    { role: "customer", username: "hamada@hotmil.com", password: "12345678" },
    { role: "seller", username: "sayed@gmail.com", password: "10203040" },
    { role: "admin", username: "admin@admin.com", password: "5060708090" }
];

function checkCredentials(_username, _password) {
    for (var i = 0; i < credentials.length; i++) {
        var user = credentials[i];
        if (user.username == _username && user.password == _password) {
            return user.role;
        }
    }
    return false;
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
    let username = document.getElementById("email").value;
    let password = document.getElementById("Password").value;

    if (!validateEmail(username)) {
        alert("Invalid email address");
        return false;
    }
    if (!validatePassword(password)) {
        alert("Password must contain at least 7 characters");
        return false;
    }

    let role = checkCredentials(username, password);
    if (role) {
        switch (role) {
            case "customer":
                window.location.assign("./customer.html");
                break;
            case "seller":
                window.location.assign("./seller.html");
                break;
            case "admin":
                window.location.assign("./admin.html");
                break;
            default:
                alert("Role not recognized");
        }
    }
    else {
        alert("Wrong username or password");
    }
}
});
