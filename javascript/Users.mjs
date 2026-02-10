function register(event) {
    event.preventDefault();
    
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;
    let email = document.getElementById("emailAddress").value;
    let phone = document.getElementById("phoneNumber").value;

    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; //at least one uppercase, one lowercase, one number, one special char - all in 8 chars
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email format
    let regexPhone = /^\d{11}$/; //11 digits

    let result = document.getElementById("Result");

    if (!regexPassword.test(password)) {
        result.innerHTML = "Invalid password. Must be at least 8 characters, with uppercase, lowercase, a number, and a special character.";
        return false;}

    if (!regexEmail.test(email)) {
        result.innerHTML = "Invalid email. Please use a valid email (e.g. myName@gmail.com).";
        return false;}

    if (!regexPhone.test(phone)) {
        result.innerHTML = "Invalid phone number. Must be 11 digits.";
        return false;}

    let user = {
        username: document.getElementById("registerUsername").value,
        password: document.getElementById("registerPassword").value,
        email: document.getElementById("emailAddress").value,
        phone: document.getElementById("phoneNumber").value,
        score: 0 
    };

    //store user data in local storage using the username as the key
    localStorage.setItem(user.username, JSON.stringify(user));
    result.innerHTML = "<b>Registration Successful</b>";
    return true;
}

  function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("scoreDisplay"); 

    if (scoreDisplay) {
        scoreDisplay.textContent = "Score: " + score;

        let username = sessionStorage.loggedInUsername;
        if (username) {
            let user = JSON.parse(localStorage.getItem(username));
            if (user) {
                user.score = score; //update the score in the user's account
                localStorage.setItem(username, JSON.stringify(user)); //save it back to localStorage
            }
        }
    }
}

function login() {
    let username = document.getElementById("loginUsername").value;

    if (localStorage.getItem(username) === null) {
        document.getElementById("loginFailure").innerHTML = "Username not registered.";
        return;}
        else {
        let user = JSON.parse(localStorage.getItem(username));
        let password = document.getElementById("loginPassword").value;

        if (password === user.password) {
            document.getElementById("loginDiv").innerHTML = user.username + " logged in.";
            document.getElementById("loginFailure").innerHTML = "";

            //store logged-in username and score in sessionStorage
            sessionStorage.setItem('loggedInUsername', user.username);
            sessionStorage.setItem('score', user.score);

            //update score display with user's saved score
            score = user.score;
            updateScoreDisplay();
        } else {
            document.getElementById("loginFailure").innerHTML = "Password incorrect. Please try again.";
        }
    }
}
  
function logout() {
    sessionStorage.removeItem('loggedInUsername'); 
    alert("You have been logged out.");
    window.location.href = "../Index.html"; //bring user back to homepage
}

function updateNavLinks() {
    const logoutLink = document.getElementById('logoutLink');
    
    if (sessionStorage.getItem('loggedInUsername')) {
        logoutLink.style.display = 'block'; //show logout link
    } else {
        logoutLink.style.display = 'none'; //hide logout link
    }
}

document.addEventListener('DOMContentLoaded', updateNavLinks);


window.onload = checkLogin;
function checkLogin() {
    if(sessionStorage.loggedInUsername !== undefined) {
        let user = JSON.parse(localStorage[sessionStorage.loggedInUsername]);
        document.getElementById("loginDiv").innerHTML = user.username + " logged in!";
    }
}