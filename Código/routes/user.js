module.exports = function(app) {
    app.post("/register", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
    })
    
    app.get("/register", (req, res) => {
        res.render("register/register", {

        });
    });

    app.post("/removal", (req, res) => {

    });

    app.get("/removal", (req, res) => {
        res.render("removal/removal", {

        });
    });
}