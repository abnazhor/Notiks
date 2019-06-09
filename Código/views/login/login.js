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

function verifyLogIn() {
    let fields = document.forms[0].getElementsByTagName("input");
    let valid = true;

    try {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(fields[0].value) && valid) {
            display("The inserted email is not a correct one.", 1);
            valid = false;
        }

        if (valid) {
            fetch("/api/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: fields[0].value,
                        password: fields[1].value
                    })
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 200) {
                        display("You have successfully logged in.", 2);
                        setTimeout(() => location.replace("/boards"), 1000);
                    } else {
                        display("Provided email or password are wrong.", 1);
                    }
                });
        }
    } catch (err) {
        display("Something is wrong. Please check the information provided.", 1);
    } 
}

function verifySignUp() {
    let fields = document.forms[1].getElementsByTagName("input");
    let valid = true;
    try {
        if (!/^[a-zA-Z0-9]{4,15}$/.test(fields[0].value) && valid) {
            display("Username contains illegal characters.", 1);
            valid = false;
        }

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(fields[1].value) && valid) {
            display("The inserted email is not a correct one.", 1);
            valid = false;
        }

        if (!/^^(?=.*\d).{8,20}$$/.test(fields[2].value) && valid) {
            display("Password contains illegal characters.", 1);
            valid = false;
        }

        if (fields[2].value != fields[3].value && valid) {
            displayError("Passwords don't match.", 1);
            valid = false;
        }

        if (valid) {
            fetch("/api/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: fields[0].value,
                        email: fields[1].value,
                        password: fields[2].value
                    })
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 200) {
                        display("You have been successfully registered. You can now log in.", 2);
                        moveCurtain();
                    } else {
                        display("Something went wrong. Please try again.",1);
                    }
                });
        }

    } catch (err) {
        display("Something is wrong. Please check the information provided.", 1);
    }
}

function display(message, code) {
    let error_msg = document.getElementById("display_msg");
    let error_log = document.getElementById("display_log");
    error_msg.innerHTML = message;
    error_log.style.display = "block";
    if (code == 1) {
        error_msg.style.backgroundColor = "rgba(255, 0, 0, 0.63)";
    } else if (code == 2) {
        display_msg.style.backgroundColor = "rgba(17, 219, 84, 0.493)";
    }
    setTimeout(() => {
        error_log.style.opacity = 1;
        document.getElementsByTagName("form")[1].action = "javascript:void";
    }, 250);
    setTimeout(() => error_log.style.opacity = 0, 4000);
    setTimeout(() => {
        error_log.style.display = "none";
        document.getElementsByTagName("form")[1].action = "javascript:verifySignUp()";
    }, 4500);
}