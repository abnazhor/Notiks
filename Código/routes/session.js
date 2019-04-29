module.exports = function(app) {
    app.post("/login", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
    });
    
    app.get("/login", (req, res) => {
        res.render("login/login", {

        });
    });
}