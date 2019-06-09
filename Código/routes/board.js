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

            const SQL = `SELECT title, board_id FROM boards WHERE board_id = ${req.params.id} and user_id = '${req.session.loggedin}';`;
            const SQL2 = `SELECT note_id, title, posX, posY, content FROM notes WHERE board_id = ${req.params.id};`;

            con.query(SQL, (err, result) => {
                if (result.length != 0) {
                    con.query(SQL2, (err2, result2) => {
                        req.session.board_id = result[0].board_id;
                        res.render("board/board", {
                            board_title: result[0].title,
                            notes: result2
                        });
                    });
                } else {
                    res.redirect("/boards");
                }
            });
        } else {
            res.redirect("/login");
        }
    });


    // Rutas utilizadas para la API.

    // Elimina un tablero con el id indicado. Debe de mostrarse un mensaje en la web donde se ejecuta este método, ya sea de error o de éxito.
    app.delete("/api/board/:id", (req, res) => {

    });

    // Crea un nuevo tablero. Debe de mostrarse un mensaje en la web donde se ejecuta este método, ya sea de error o de éxito.
    app.post("/api/board", (req, res) => {
        if (req.session.loggedin) {
            const title = req.body.title;
            const email = req.session.loggedin;
            const sql = `INSERT INTO boards(user_id, title) VALUES('${email}', '${title}')`;
            con.query(sql, (err, result) => {
                try {
                    if (err) throw err;
                    res.status(200).send({
                        message: "Board has been created successfully",
                        status: 200
                    });
                } catch (error) {
                    res.status(400).send({
                        message: "An error has occured",
                        status: 400
                    });
                }
            });
        } else {
            res.status(400).send({
                message: "Forbidden"
            });
        }
    });

    // Devuelve el listado completo de tableros disponibles en formato JSON.
    app.get("/api/boards", (req, res) => {
        if (req.session.loggedin != null) {
            const SQL = `SELECT board_id, title FROM boards WHERE user_id = '${req.session.loggedin}';`;
            con.query(SQL, (err, result) => {
                res.status(200).send(result);
            });
        } else {
            res.status(400).send({
                message: "Boards couldn't be processed."
            });
        }
    });

    app.get("/api/board", (req, res) => {
        if (req.session.loggedin) {
            const SQL2 = 'SELECT user_id, board_id FROM boards WHERE user_id = ? and board_id = ?';
            const SQL = `SELECT note_id, title, posX, posY, content FROM notes WHERE board_id = ?;`;

            con.query(SQL2, [
                req.session.loggedin, 
                req.session.board_id
            ],
            (err, result) => {
                if(err) throw err;
                if(result.length != 0) {
                    con.query(SQL, [req.session.board_id], (err, result) => {
                        if(err) throw err;
                        res.status(200).send({
                            notes: result
                        });
                    });
                } else {
                    res.status(403).send({
                        status : 403
                    });
                }
            });
        }
    });
};