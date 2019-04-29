module.exports = function(app) {

    // Rutas principales
    
    // Muestra la página principal de registro para usuarios. En caso de que ya haya una sesión iniciada, se redirigirá a
    // la página de inicio.
    app.get("/register", (req, res) => {
        res.render("register/register" , {
            
        })
    });

    // Muestra la página de borrado de cuenta. En caso de que el borrado salga como debe, se debe de borrar la sesión
    // y redirigir a una página de despedida.
    app.get("/removal", (req, res) => {
        res.render("removal/removal", {

        });
    });

    // Rutas de la API

    app.post("/api/register", (req, res) => {

    });

    app.delete("/api/removal", (req, res) => {

    });
}