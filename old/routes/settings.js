module.exports = function (app) {
    app.get("/settings", (req, res) => {
        if (req.session.loggedin) {
            res.render("settings/settings", {

            });
        } else {
            res.redirect("/login");
        }
    });
}