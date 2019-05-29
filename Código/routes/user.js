module.exports = function(app) {

    // Rutas principales
    // Muestra la página de borrado de cuenta. En caso de que el borrado salga como debe, se debe de borrar la sesión
    // y redirigir a una página de despedida.
    app.get("/removal", (req, res) => {
        res.render("removal/removal", {

        });
    });

    // Rutas de la API

    // Ruta de la api para poder hacer un registro adecuado. Se debe de enviar un objeto con los datos del usuario a 
    // través de JSON para poder registrarse. Devolverá un booleano en JSON en cualquiera de los casos.
    app.post("/api/signup", (req, res) => {
        
    });

    // Ruta de la api para poder borrar un usuario. Se debe de enviar un id de usuario junto con su contraseña en forma de
    // JSON para que funcione correctamente. Devolverá un booleano en JSON en cualquiera de los casos.
    app.delete("/api/removal", (req, res) => {

    });
}