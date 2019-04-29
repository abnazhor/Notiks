module.exports = function(app) {
    // Las rutas que forman este conjunto son todas aquellas que se utilizan para servir las páginas de gestión de los
    // tableros y la gestión en sí de los tableros.
    
    // Sirve la página completa sin los tableros cargados. De eso se encarga el javascript del cliente, ya que
    // se necesita que la aplicación haga uso de AJAX para cargar los tableros al realizar una modificación.
    app.get("/boards", (req, res) => {
        res.render("boards/boards", {

        });
    });

    // Genera la página con los datos cargados del tablero que se está modificando, no utiliza AJAX per se, salvo para
    // la actualización de los datos en el sistema, en la que muestra un mensaje de éxito o error al guardar los datos.
    // También existe la opción a borrar los datos del tablero.
    app.get("/board/:id", (req, res) => {
        res.render("board/board", {

        });
    });


    // Rutas utilizadas para la API.

    // Elimina un tablero con el id indicado. Debe de mostrarse un mensaje en la web donde se ejecuta este método, ya sea de error o de éxito.
    app.delete("/api/board/:id", (req, res) => {

    });

    // Crea un nuevo tablero. Debe de mostrarse un mensaje en la web donde se ejecuta este método, ya sea de error o de éxito.
    app.post("/api/board/:id", (req, res) => {

    });

    // Devuelve el listado completo de tableros disponibles en formato JSON.
    app.get("/api/boards", (req, res) => {

    });
}