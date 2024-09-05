const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "baza_salon"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos");
});

// Ruta para el login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Consulta a la base de datos
    const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // Login exitoso
            res.json({ success: true });
        } else {
            // Credenciales incorrectas
            res.json({ success: false });
        }
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://:3000");
});
