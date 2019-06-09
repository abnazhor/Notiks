module.exports = function (app) {

    app.get("/api/note/:id", (req, res) => {
        const SQL = "SELECT user_id, title, content FROM notes JOIN boards ON notes.board_id = boards.board_id WHERE note_id = ?";
        if (req.session.loggedin) {
            con.query(SQL, [req.params.id], (err, result) => {
                try {
                    if (result.length != 1 && err && req.session.loggedin == result[0].user_id) throw error;
                    res.status(200).send({
                        status: 200,
                        note : result[0]
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