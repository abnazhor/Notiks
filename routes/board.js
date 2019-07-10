module.exports = function (app) {
    // Las rutas que forman este conjunto son todas aquellas que se utilizan para servir las páginas de gestión de los
    // tableros y la gestión en sí de los tableros.

    // Sirve la página completa sin los tableros cargados. De eso se encarga el javascript del cliente, ya que
    // se necesita que la aplicación haga uso de AJAX para cargar los tableros al realizar una modificación.
    app.get("/boards", (req, res) => {
        if (req.session.loggedin != null) {
            const SQL = `SELECT * FROM boards WHERE user_id = '${req.session.loggedin}' LIMIT 11;`;
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
            const SQL2 = `SELECT note_id, title, posX, posY, content, categ_id FROM notes WHERE board_id = ${req.params.id};`;

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
    app.delete("/api/board", (req, res) => {
        const VERIF_QUERY = "SELECT user_id FROM boards WHERE board_id = ?";
        const DELETE_QUERY = "DELETE FROM boards WHERE board_id = ?";
        if (req.session.loggedin) {
            con.query(VERIF_QUERY, [req.body.board_id], (err, result) => {
                try {
                    if (err) throw err;
                    if (result[0].user_id === req.session.loggedin) {
                        con.query(DELETE_QUERY, [req.body.board_id], (error, result2) => {
                            try {
                                if (error) throw error;
                                res.status(200).send({
                                    status: 200,
                                    message: "Successfully deleted board"
                                });
                            } catch (error) {
                                res.status(400).send({
                                    status: 400,
                                    message: "Something went wrong"
                                });
                            }
                        });
                    } else {
                        res.status(403).send({
                            status: 403,
                            message: "Forbidden"
                        });
                    }
                } catch (err) {
                    res.status(400).send({
                        status: 400,
                        message: "Something went wrong"
                    });
                }
            });
        } else {
            res.status(403).send({
                status: 403,
                message: "Forbidden"
            })
        }
    });

    // Crea un nuevo tablero. Debe de mostrarse un mensaje en la web donde se ejecuta este método, ya sea de error o de éxito.
    app.post("/api/board", (req, res) => {
        if (req.session.loggedin) {
            const title = req.body.title;
            const email = req.session.loggedin;
            const bg = req.body.bg;
            const sql = `INSERT INTO boards(user_id, title, bg_id) VALUES(?, ?, ?)`;
            con.query(sql, [
                email,
                title,
                bg
            ], (err, result) => {
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


    app.post("/api/board/update", (req, res) => {
        const UPDATE_TITLE = "UPDATE boards SET title = ? WHERE board_id = ?";
        let board_id = req.body.board_id,
            title = req.body.title;
        if (req.session.loggedin) {
            con.query(UPDATE_TITLE, [title, board_id], (err, result) => {
                try {
                    if (err) throw err;
                    res.status(200).send({
                        status: 200,
                        message: "Successfully updated"
                    });
                } catch (err) {
                    res.status(400).send({
                        status: 400,
                        message: "An error has occured"
                    });
                }
            });
        } else if (req.body.title.length > 40) {
            res.status(400).send({
                status: 400,
                message: "Board title must have between 1 and 40 characters"
            });
        } else {
            res.status(403).send({
                status: 403,
                message: "Forbidden"
            });
        }
    });

    app.delete("/api/board", (req, res) => {
        const CHECK_USER = "SELECT note_id FROM notes JOIN boards ON boards.board_id = notes.note_id WHERE user_id = ?";
        const DELETE_NOTE = "DELETE FROM notes WHERE note_id = ?";
        if (req.session.loggedin) {
            con.query(CHECK_USER, [
                req.session.loggedin
            ], (err, result) => {
                try {
                    if (err) throw err;
                    con.query(DELETE_NOTE, [req.body.id], (err, result) => {

                    });
                } catch (err) {
                    res.status(403).send({
                        status: 403,
                        message: "Forbidden"
                    })
                }
            });
        } else {
            res.status(403).send({
                status: 403,
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

    // Devuelve el listado completo de todas las notas del tablero, junto con sus propiedades básicas para su funcionamiento.
    app.get("/api/board", (req, res) => {
        if (req.session.loggedin) {
            const SQL2 = 'SELECT user_id, board_id FROM boards WHERE user_id = ? and board_id = ?';
            const SQL = `SELECT note_id, title, posX, posY, content FROM notes WHERE board_id = ?;`;

            con.query(SQL2, [
                    req.session.loggedin,
                    req.session.board_id
                ],
                (err, result) => {
                    if (err) throw err;
                    if (result.length != 0) {
                        con.query(SQL, [req.session.board_id], (err, result) => {
                            if (err) throw err;
                            res.status(200).send({
                                notes: result
                            });
                        });
                    } else {
                        res.status(403).send({
                            status: 403
                        });
                    }
                });
        }
    });
};