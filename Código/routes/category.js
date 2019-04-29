module.exports = function(app) {

    // Rutas para la carga de vistas.

    // Sirve la página con las categorías disponibles.
    app.get("/categories", (req, res) => {

    });

    // Sirve la página con los datos de la categoría. En esta página se debe de poder editar la categoría.
    app.get("/category/:id", (req, res) => {

    });

    // Sirve la página por la que se podrá crear una nueva categoría. Utiliza AJAX para completar la funcionalidad. 
    app.get("/category/new", (req, res) => {

    });

    
    //Rutas para el uso de la API.

    // Elimina una categoría del sistema. Devuelve JSON con booleano indicando el éxito de la operación.
    app.delete("/api/category/:id", (req, res) => {

    });

    // Modifica una categoría del sistema. Devuelve JSON con booleano indicando el éxito de la operación.
    app.post("/api/category/:id", (req, res) => {

    });

    // Crea una categoría en el sistema. Devuelve JSON con booleano indicando el éxito de la operación.
    app.post("/api/category/:id", (req, res) => {

    });
}