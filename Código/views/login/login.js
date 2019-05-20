function moveCurtain() {
    let element = document.getElementById("transitioner");
    let login = document.getElementById("login_sc");
    let signup = document.getElementById("signup_sc");
    console.log(element.style.transform);
    if(element.style.transform != "translate(0%)") {
        element.style.transform = "translate(0%)";
        signup.style.opacity = "1";
        login.style.opacity = "0";
    } else {
        element.style.transform = "translate(100%)";
        signup.style.opacity = "0";
        login.style.opacity = "1";
    }
}