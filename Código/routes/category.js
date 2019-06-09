module.exports = function (app) {
    //Rutas para el uso de la API.

    app.get("/api/categories", (req, res) => {
        const SQL = "SELECT style, title FROM categories;";
        con.query(SQL, (err, result) => {
            try {
                if (err || result.length != 0) throw error;
                res.status(200).send({
                    status: 200,
                    categories: result
                });
            } catch (error) {
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