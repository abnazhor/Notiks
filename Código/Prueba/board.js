module.exports = function(app) {
    app.get("/boards", (req, res) => {
        res.render("/boards/boards", {

        });
    });

    // Elimina un tablero con el id indicado. En caso negativo, muestra un mensaje de error.
    app.delete("/boards/:id", (req, res) => {

    });

    // Crea un nuevo tablero. En caso afirmativo, recarga la página para mostrar los tableros.
    app.post("/boards/:id", (req, res) => {

    });
}