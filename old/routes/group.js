module.exports = function (app) {
    //Rutas para el uso de la API.

    // Modifica un grupo del sistema. Devuelve JSON con booleano indicando el éxito de la operación.
    app.get("/api/groups", (req, res) => {
        const GET_GROUPS = "SELECT * FROM groups";
        con.query(GET_GROUPS, (err, result) => {
            try {
                if (err) throw err;
                res.status(200).send({
                    status: 200,
                    groups: result
                })
            } catch (err) {
                res.status(400).send({
                    status: 400,
                    message: "An error has occured"
                });
            }
        });
    });

    app.get("/api/groups/:id", (req, res) => {
        const GET_NOTE_GROUPS = "SELECT group_note.group_id, title FROM group_note JOIN groups ON groups.group_id = group_note.group_id WHERE note_id = ?";
        if (req.session.loggedin) {
            con.query(GET_NOTE_GROUPS, [req.params.id], (err, result) => {
                try {
                    if (err) throw err;
                    res.status(200).send({
                        status: 200,
                        groups: result
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
                message: "Forbidden"
            });
        }
    });

    app.post("/api/group/assign", (req, res) => {
        if (req.session.loggedin) {
            const INSERT_RELATIONSHIP = "INSERT INTO group_note VALUES(?, ?)";
            con.query(INSERT_RELATIONSHIP, [
                req.body.note_id,
                req.body.group_id
            ], (err, result) => {
                try {
                    if (err) throw err;
                    res.status(200).send({
                        status: 200,
                        message: "Successfully added"
                    });
                } catch (err) {
                    res.status(400).send({
                        status: 400,
                        message: "Couldn't add relationship."
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

    app.post("/api/group/deassign", (req, res) => {
        const DELETE_RELATIONSHIP = "DELETE FROM group_note WHERE note_id = ? AND group_id = ?";
        if (req.session.loggedin) {
            con.query(DELETE_RELATIONSHIP, [
                req.body.note_id,
                req.body.group_id
            ], (err, result) => {
                try {
                    if (err) throw err;
                    res.status(200).send({
                        status: 200,
                        message: "Successfully deleted"
                    });
                } catch (err) {
                    res.status(400).send({
                        status: 400,
                        message: "Forbidden"
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

    app.post("/api/notegroups", (req, res) => {
        const OBTAIN_NOTES = "SELECT group_note.note_id FROM group_note JOIN notes ON notes.note_id = group_note.note_id WHERE board_id = ? AND group_id = ?";
        if(req.session.loggedin) {
            let board_id = req.body.board_id;
            let group_id = req.body.group_id;

            con.query(OBTAIN_NOTES, [board_id, group_id], (err, result) => {
                try {
                    if(err) throw err;
                    res.status(200).send({
                        status:200,
                        notes: result
                    })
                } catch(err) {
                    res.status(400).send({
                        status:400,
                        message:"An error has occured"
                    })
                }
            });
        } else {
            res.status(400).send({
                status:400,
                message:"Forbidden"
            })
        }
    });
};