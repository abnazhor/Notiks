module.exports = function (app) {
    // Las rutas que forman este conjunto son todas aquellas que se utilizan para servir las páginas de gestión de los
    // tableros y la gestión en sí de los tableros.

    // Sirve la página completa sin los tableros cargados. De eso se encarga el javascript del cliente, ya que
    // se necesita que la aplicación haga uso de AJAX para cargar los tableros al realizar una modificación.
    app.get("/boards", (req, res) => {
        if (req.session.loggedin != null) {
            const SQL = `SELECT * FROM boards WHERE user_id = '${req.session.loggedin}' LIMIT 10;`;
            con.query(SQL, (err, result) => {
                res.render("boards/boards", {
                    boards: result
                });
            });
        } else {
            res.redirect("/login");
        }
    });

    // Genera la página con los datos cargados del tablero que se está modificando, no utiliza AJAX per se, salvo para
    // la actualización de los datos en el sistema, en la que muestra un mensaje de éxito o error al guardar los datos.
    // También existe la opción a borrar los datos del tablero.
    app.get("/board/:id", (req, res) => {
        if (req.session.loggedin != null) {

            const SQL = `SELECT note_id, title, content FROM notes WHERE board_id = ${req.params.id};`;
            const SQL2 = `SELECT title FROM boards WHERE board_id = ${req.params.id} and user_id = '${req.session.loggedin}';`;

            con.query(SQL2, (err, result) => {
                if(result.length != 0) {
                    con.query(SQL, (err2, result2) => {
                        res.render("board/board", {
                            board_title: result[0].title,
                            notes: result2
                        });
                    })
                } else {
                    res.redirect("/boards");
                }
            });
        }
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