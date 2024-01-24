import { users as usersClass } from "../sign-up/sign-up.js";

window.addEventListener('load', function () {

  // Fetch user data from local storage
  const userDataString = localStorage.getItem('loggedInUser');

  if (!userDataString) {
    alert('User data not found. Please create a customer first.');
    return;
  }

  const userData = JSON.parse(userDataString);

  // Populate form with user data
  document.getElementById('firstName').value = userData.userName || '';
  document.getElementById('role').value = userData.userRole || '';
  document.getElementById('email').value = userData.userEmail || '';
  document.getElementById('password').value = userData.userPassword || '';


  // Handle form submission
  document.getElementById('profileForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get updated user information
    const updatedUserData = {
      firstName: document.getElementById('firstName').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    // Check if the data is the same as the existing data
    if (JSON.stringify(updatedUserData) === JSON.stringify(userData)) {
      return;
    }

    // Validate user information
    const firstNameMessage = document.getElementById('firstNameMessage');
    const emailMessage = document.getElementById('emailMessage');
    const passwordMessage = document.getElementById('passwordMessage');
    const validationMessage = document.getElementById('validationMessage');
    const successMessage = document.getElementById('successMessage');

    // Clear previous validation messages
    firstNameMessage.innerText = '';
    emailMessage.innerText = '';
    passwordMessage.innerText = '';
    validationMessage.innerText = '';

    const isFirstNameValid = isValidName(updatedUserData.firstName, firstNameMessage);
    const isEmailValid = isValidEmail(updatedUserData.email, emailMessage);
    const isPasswordValid = isValidPassword(updatedUserData.password, passwordMessage);

    if (!isFirstNameValid || !isEmailValid || !isPasswordValid) {

      document.getElementById('firstName').value = updatedUserData.firstName || '';
      document.getElementById('email').value = updatedUserData.email || '';
      document.getElementById('password').value = updatedUserData.password || '';
      return;
    }

    //make a new user object
    let updatedUserObj = new usersClass(userData.userID, updatedUserData.firstName, updatedUserData.password, updatedUserData.email, userData.userRole);
    // Update user data in local storage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUserObj));
    
    ////////////////////////////////////////////////////////////////////////////////////
    //get all the users from the local storage
    let users = JSON.parse(localStorage.getItem('users'));
    //find the index of the user with the same userID
    let userIndex = users.findIndex(user => user.userID === userData.userID);
    //update the user data with the updated user data
    users.splice(userIndex, 1, updatedUserObj);
    //save the updated users array to the local storage with the key 'users'
    localStorage.setItem('users', JSON.stringify(users));

    // Display success message only if data is updated
    successMessage.innerText = 'Profile updated successfully!';

    // Clear success message after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      successMessage.innerText = '';
    }, 3000);
  });

  if(userData.userRole == "seller")
  {
      var sellerProducts = JSON.parse(this.localStorage.getItem('products'))
                              .filter((product) => product.sellerName == userData.userName);
      var sellerProductscategories = sellerProducts.map((product) => product.category);
      var ProductsInCategory=[];
      for(var i=0; i<sellerProductscategories.length;i++)
      {
        ProductsInCategory[i]=0;
        sellerProducts.forEach(product =>
        {
            if(product.category == sellerProductscategories[i])
              ProductsInCategory[i]+=1;
        });  
      }

      const createdChart = document.getElementById("myChart1");
      new Chart(createdChart, {type: 'bar',
        data: {
          labels: sellerProductscategories,
          datasets: [{
            label: 'products in each category',
            data: ProductsInCategory,
            borderWidth: 5
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  
  }

 });

// Function to validate first name and last name
function isValidName(name, messageElement) {
  // Name must be at least three characters long and at most 15 characters
  if (name.length < 3 || name.length > 15) {
    messageElement.innerText = 'Name must be between 3 and 15 characters.';
    return false;
  }

  // Name can't be all numbers
  if (/^\d+$/.test(name)) {
    messageElement.innerText = 'Name can\'t be all numbers.';
    return false;
  }

  // Validation passed
  return true;
}

// Function to validate email
function isValidEmail(email, messageElement) {
  // Email must contain @ and a dot after @
  if (!/@.*\.[a-zA-Z]{2,}/.test(email)) {
    messageElement.innerText = 'Invalid email format. Make sure it contains "@" and a dot (.) after "@" (e.g., example@example.com).';
    return false;
  }

  // Validation passed
  return true;
}

// Function to validate password
function isValidPassword(password, messageElement) {
  // Password must be at least eight characters long and at most 20 characters
  if (password.length < 8 || password.length > 20) {
    messageElement.innerText = 'Password must be between 8 and 20 characters.';
    return false;
  }

  // Password must contain at least one alphabet
  if (!/[a-zA-Z]/.test(password)) {
    messageElement.innerText = 'Password must contain at least one alphabet.';
    return false;
  }

  // Password must contain at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    messageElement.innerText = 'Password must contain at least one special character.';
    return false;
  }

  // Validation passed
  return true;
}

export {isValidEmail, isValidName, isValidPassword};
