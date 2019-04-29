module.exports = function(app) {

    // Rutas principales

    // Sirve la página de inicio de sesión. Esta página tiene validación tanto por el lado del cliente como por el lado del
    // servidor para poder evitar problemas.
    app.get("/login", (req, res) => {
        res.send("Inicio de sesión");
    });

    // Esta página solo sirve para los accesos web. En caso de utilizar otro dispositivo o utilizar un sistema externo a la
    // aplicación no será posible utilizarlo, se deberá de hacer de forma manual.
    // Esto se debe a que con esta ruta se elimina la cookie de sesión del sistema y además se redirige al usuario a la página
    // principal.
    app.get("/logout", (req, res) => {
        res.send("Cierre de sesión");
    });

    // Esta página solo sirve para los accesos web, ya que sirve para añadir una variable de sesión y así poder controlar los
    // inicios de sesión directamente a través de peticiones.
    app.post("/verify", (req, res) => {
        res.send("Verificación de inicio de sesión.");
    });

    
    // Rutas de la API (No implementadas debido a que la web lo hace todo a través de rutas normales)
}