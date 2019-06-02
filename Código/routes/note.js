module.exports = function (app) {
    // Crea una nota. En este caso devuelve los datos finales de la nota en formato JSON para ser procesada por el cliente.
    // Además debe de obtener los datos pasados por POST para poder crear la nota en la base de datos. Realiza validación.
    app.post("/api/note", (req, res) => {
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
            })
        });
    });

    app.post("/api/notes/save", (req, res) => {
        const SQL = `UPDATE notes SET title = ?, content = ?, posX = ?, posY = ? WHERE note_id = ?;`
        let notes = req.body.notes;

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].note_id != 'X') {
                con.query(SQL, [
                    notes[i].title,
                    notes[i].content,
                    notes[i].posX,
                    notes[i].posY,
                    notes[i].note_id
                ], (err, result) => {
                    if (err) throw err;
                });
            }
        }
    });
}