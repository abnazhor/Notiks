function moveCurtain() {
    let element = document.getElementById("transitioner");
    let login = document.getElementById("login_sc");
    let signup = document.getElementById("signup_sc");
    if (element.style.transform != "translate(0%)") {
        element.style.transform = "translate(0%)";
        signup.style.opacity = "1";
        login.style.opacity = "0";
    } else {
        element.style.transform = "translate(100%)";
        signup.style.opacity = "0";
        login.style.opacity = "1";
    }
}

function verifyLogin() {

}

function verifySignUp() {
    let fields = document.forms[1].getElementsByTagName("input");
    let valid = true;
    try {
        if (!/^[a-zA-Z0-9]{4,15}$/.test(fields[0].value) && valid) {
            displayError("Username contains illegal characters.");
            valid = false;
        }

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(fields[1].value) && valid) {
            displayError("The inserted email is not a correct one.");
            valid = false;
        }

        if (!/^^(?=.*\d).{8,20}$$/.test(fields[2].value) && valid) {
            displayError("Password contains illegal characters.");
            valid = false;
        }

        if (fields[2].value != fields[3].value && valid) {
            displayError("Passwords don't match.");
            valid = false;
        }

        if (valid) {
            
        }

    } catch (err) {
        displayError("Something is wrong. Please check the information provided.");
    }
}

function displayError(message) {
    let error_msg = document.getElementById("error_msg");
    let error_log = document.getElementById("error_log");
    error_msg.innerHTML = message;
    error_log.style.display = "block";
    let showTO = setTimeout(() => {
        error_log.style.opacity = 1;
        document.getElementsByTagName("form")[1].action = "javascript:void";
    }, 250);
    let hideTO1 = setTimeout(() => error_log.style.opacity = 0, 4000);
    let hideTO2 = setTimeout(() => {
        error_log.style.display = "none";
        document.getElementsByTagName("form")[1].action = "javascript:verifySignUp()";
    }, 4500);
}