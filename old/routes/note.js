module.exports = function (app) {

    app.get("/api/note/:id", (req, res) => {
        const SQL = "SELECT user_id, title, content FROM notes JOIN boards ON notes.board_id = boards.board_id WHERE note_id = ?";
        if (req.session.loggedin) {
            con.query(SQL, [req.params.id], (err, result) => {
                try {
                    if (result.length != 1 && err && req.session.loggedin == result[0].user_id) throw error;
                    res.status(200).send({
                        status: 200,
                        note: result[0]
                    });
                } catch (error) {

                }
            })
        } else {
            res.status(403).send({
                status: 403,
                message: "Forbidden"
            });
        }
    });

    app.delete("/api/note", (req, res) => {
        const DELETE_QUERY = "DELETE FROM notes WHERE note_id = ?";
        const VERIFY_QUERY = "SELECT user_id FROM notes JOIN boards ON boards.board_id = notes.board_id WHERE note_id = ?";

        if (req.session.loggedin) {
            con.query(VERIFY_QUERY, [req.body.note_id], (err, result) => {
                if (req.session.loggedin == result[0].user_id) {
                    con.query(DELETE_QUERY, [req.body.note_id], (error, result2) => {
                        try {
                            if (error) throw error;
                            res.status(200).send({
                                status: 200,
                                message: "Note updated"
                            });
                        } catch (error) {
                            res.status(400).send({
                                status: 400,
                                message: "Note couldn't be deleted"
                            });
                        }
                    });
                }
            });
        } else {
            res.status(403).send({
                status: 403,
                message: "Forbidden"
            });
        }
    });

    // Crea una nota. En este caso devuelve los datos finales de la nota en formato JSON para ser procesada por el cliente.
    // Además debe de obtener los datos pasados por POST para poder crear la nota en la base de datos. Realiza validación.
    app.post("/api/note", (req, res) => {
        if (req.session.loggedin) {
            let note = req.body.note;

            const SQL = "INSERT INTO notes(board_id, title, content, posX, posY) VALUES(?,?,?,?,?)";
            con.query(SQL, [
                note.board_id,
                note.title,
                note.content,
                note.posX,
                note.posY
            ], (err, result) => {
                if (err) throw err;
                res.status(200).send({
                    status: 200
                });
            });
        } else {
            res.status(403).send({
                status: 403,
                message: "Forbidden"
            });
        }
    });

    app.post("/api/note/update", (req, res) => {
        if (req.session.loggedin && req.body.note_id != null) {
            const SQL_VERIFY = "SELECT user_id FROM notes JOIN boards ON boards.board_id = notes.board_id WHERE note_id = ?;";
            con.query(SQL_VERIFY, [req.body.note_id], (error, result) => {
                try {
                    if (error) throw err;
                    //if (result.length != 1 || result[0].user_id != req.session.loggedin) throw error;
                } catch (error) {
                    res.status(400).send({
                        status: 400,
                        message: "Forbidden"
                    });
                }
                if (!res.headersSent) {
                    if (req.body.title != null && req.body.content != null && req.body.categ_id != null) {
                        const SQL = "UPDATE notes SET title = ?, content = ?, categ_id = ? WHERE note_id = ?;";
                        con.query(SQL, [
                            req.body.title,
                            req.body.content,
                            req.body.categ_id,
                            req.body.note_id
                        ], (err, result) => {
                            try {
                                if (err) throw err;
                                res.status(200).send({
                                    status: 200,
                                    message: "Note has been updated sucessfully."
                                });
                            } catch (err) {
                                res.status(400).send({
                                    status: 403,
                                    message: "An error has occured"
                                });
                            }
                        });
                    } else if (req.body.posX != null && req.body.posY != null) {
                        const SQL = "UPDATE notes SET posX = ?, posY = ? WHERE note_id = ?;";
                        con.query(SQL, [
                            req.body.posX,
                            req.body.posY,
                            req.body.note_id
                        ], (err, result) => {
                            try {
                                if (err) throw err;
                                res.status(200).send({
                                    status: 200,
                                    message: "Note has been updated successfully"
                                });
                            } catch (err) {
                                res.status(400).send({
                                    status: 400,
                                    message: "An error has occured"
                                });
                            }
                        });
                    } else {
                        res.status(400).send({
                            status: 400,
                            message: "Wrong parameters"
                        });
                    }
                }
            });
        } else {
            res.status(403).send({
                status: 403,
                message: "Forbidden"
            });
        }
    });

    /*app.post("/api/notes/save", (req, res) => {
        if (req.session.loggedin) {
            const SQL = `UPDATE notes SET posX = ?, posY = ?, title = ?, content = ? WHERE note_id = ?;`;
            let notes = req.body.notes;

            for (let i = 0; i < notes.length; i++) {
                if (notes[i].note_id != 'X') {
                    con.query(SQL, notes[i], (err, result) => {
                        try {
                            if (err) throw error;
                        } catch (error) {
                        }
                    });
                }
            }
        } else {
            res.status(400).send({
                status: 400,
                message: "Forbbiden"
            });
        }
    });*/
};