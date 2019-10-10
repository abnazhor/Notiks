module.exports = function(app) {

    // Esta página teóricamente debe de ser donde se muestre la información y los datos que los usuarios que todavía
    // no han iniciado sesión pueden ver. Debido a que esto es un proyecto de fin de ciclo y el tiempo es limitado,
    // se redirige a la página de inicio de sesión o a la principal en caso de que ya haya iniciado sesión.
    app.get("/", (req, res) => {
        if(req.session.loggedin) {
            res.redirect("/boards");
        } else {
            res.redirect("/login");
        }
    });
}