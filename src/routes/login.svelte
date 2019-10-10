<script>
let translation = "translate(100%)";
let signUpOpacity = "0";
let loginOpacity = "1";

const moveCurtain = () => {
    if (translation != "translate(0%)") {
        translation = "translate(0%)";
        signUpOpacity = "1";
        loginOpacity = "0";
    } else {
        translation = "translate(100%)";
        signUpOpacity = "0";
        loginOpacity = "1";
    }
}

const verifySignUp = () => {
    let fields = document.forms[1].getElementsByTagName("input");
    let valid = true;
    try {
        if (!/^[a-zA-Z0-9\s\_]{4,15}$/.test(fields[0].value) && valid) {
            if (fields[0].value.length < 4) {
                display("Username must have a length between 4 and 15 characters.");
            } else {
                display("Username can only contain numbers, letters and spaces.", 1);
            }
            valid = false;
        }

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(fields[1].value) && valid) {
            display("The inserted email is not a correct one.", 1);
            valid = false;
        }

        if (!/^^(?=.*\d).{8,20}$$/.test(fields[2].value) && valid) {
            if(fields[2].value.length < 8) {
                display("Password must have at least 8 characters.", 1);
            } else if (fields[2].value.indexOf(/[0-9]/) === -1) {
                display("Password must have at least one number.", 1);
            } else {
                display("Password contains illegal characters.", 1);
            }
            valid = false;
        }

        if (fields[2].value != fields[3].value && valid) {
            display("Passwords don't match.", 1);
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
                        display("Email has already been registered. Please try again.", 1);
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
</script>

<style>
  body {
    z-index: -2;
    font-family: Arial, Helvetica, sans-serif;
  }

  #base {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    background-size: cover;
    height: 100vh;
    width: 100%;
    z-index: -1;
  }

  #operation {
    background-color: #fff;
    width: 60%;
    height: 70vh;
    min-width: 900px;
    min-height: 450px;
    max-height: 600px;
    margin: auto;
    z-index: -1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 2px;
  }

  #login_sc {
    display: block;
    margin: auto;
    width: 50%;
    height: 100%;
    float: left;
    position: relative;
    z-index: -1;
    transition: opacity 0.75s ease-out;
    display: flex;
    align-items: center;
  }

  #signup_sc {
    display: block;
    margin: auto;
    height: 100%;
    float: right;
    position: relative;
    width: 50%;
    z-index: -1;
    transition: opacity 0.75s ease-out;
    opacity: 0;
    display: flex;
    align-items: center;
  }

  form {
    width: 100%;
    height: 55%;
  }

  form input[type="password"],
  form input[type="text"] {
    width: 90%;
    display: block;
    margin: auto;
  }

  form input[type="submit"] {
    width: 30%;
    display: block;
    margin: auto;
    transition: background-color 0.35s, border 0.35s;
  }

  form input[type="submit"]:hover {
    cursor: pointer;
    background-color: #57576b;
    border: 3px solid #57576b;
  }

  form input {
    margin-bottom: 5px;
    background-color: #3b3b4e;
    padding: 2% 1% 2% 1%;
    border: 3px solid #3b3b4e;
    margin-bottom: 10px !important;
    color: #fff;
  }

  form p {
    text-align: center;
    font-family: "Assistant", sans-serif;
    font-size: 1.15em;
  }

  form a {
    text-decoration: none;
    color: rgb(235, 105, 53);
  }

  #transitioner {
    background-color: #3b3b4e;
    height: 100%;
    width: 50%;
    z-index: 2;
    transition: transform 0.85s ease-in-out, background-image 1s ease-in-out, width 0.25s ease-in;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    border-radius: 2px;
  }

  #display_msg {
    background-color: rgba(255, 0, 0, 0.432);
    color: white;
    text-align: center;
  }

  #bg-blurred {
    background-image: url("login_bg.jpeg");
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -2;
  }

  #display_log {
    position: absolute;
    width: 100%;
    height: 15%;
    bottom: 20%;
    display: flex;
    align-items: center;
    display: none;
    opacity: 0;
    transition: opacity 0.5s;
  }

  #display_msg {
    width: 50%;
    margin: auto;
    background-color: rgba(255, 0, 0, 0.63);
    font-size: 18px;
    padding: 1.3% 0% 1.3% 0%;
    border-radius: 2px;
  }
</style>

<body>
    <div id="base">
        <div id="operation">
            <div id="login_sc" style="opacity: {loginOpacity};">
            <form action="javascript:verifyLogIn()" method="post">
                <input type="text" name="email" placeholder="Insert your email" required>  
                <input type="password" name="password" placeholder="Insert your password" required>
                <input type="submit" name="validate" value="Log in">
            <p>
                Don't have an account? <a href="javascript:void(0)" on:click={moveCurtain}>Sign up</a>.
            </p>
            </form>
            </div>
            <div id="signup_sc" style="opacity: {signUpOpacity}">
            <form action="javascript:void(0)" method="post">
                <input type="text" name="name" placeholder="Choose your username" maxlength="15" required>
                <input type="text" name="email" placeholder="Choose your email" required>
                <input type="password" name="password" placeholder="Type your password" required>
                <input type="password" name="password" placeholder="Repeat your password" required>
                <input type="submit" on:click={verifySignUp} value="Sign up"/>
                <p>
                Already have an account? <a href="javascript:void(0)" on:click={moveCurtain}>Log in</a>.
                </p>
            </form>
            </div>
            <div id="transitioner" style="transform: {translation};">
            </div>
        </div>

        <div id="display_log">
            <p id="display_msg">
            </p>
        </div>
    </div>
    <div id="bg-blurred"></div>
</body>