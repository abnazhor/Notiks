module.exports = function (app) {
    //Rutas para el uso de la API.

    app.get("/api/categories", (req, res) => {
        const SQL = "SELECT categ_id, style, title FROM categories";
        con.query(SQL, (err, result) => {
            try {
                if (err || result.length == 0) throw err;
                res.status(200).send({
                    status: 200,
                    categories: result
                });
            } catch (err) {
                res.status(403).send({
                    status: 403,
                    message: "Forbidden"
                });
            }
        });
    });

    app.get("/api/category/:id", (req, res) => {

    });
};