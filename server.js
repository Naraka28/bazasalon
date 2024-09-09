const express = require("express");
const { Pool } = require("pg"); // Para la conexión con PostgreSQL
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); // Permite recibir datos JSON en las peticiones

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "postgres",
    password: "admin",
    port: 5432,
});

app.use(cors());

// Ruta para el login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
            const result = await pool.query("SELECT * FROM usuarios WHERE email = $1 AND pwd = $2", [email, password]);
            console.log(result.rows);
        if (result.rows.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.post("/loginAdmin", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
            const result = await pool.query("SELECT * FROM usuarios WHERE email = $1 AND pwd = $2 AND rol = 1", [email, password]);
            console.log(result.rows);
        if (result.rows.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/register", async (req, res) => {
    const { nombre, apellido, rol, correo_personal, celular, correo_acceso, contraseña } = req.body;
    console.log(nombre, apellido, rol, correo_personal, celular, correo_acceso, contraseña);
  
    try {
      const result = await pool.query(
        "INSERT INTO usuarios (nombre, apellido, email, numero_celular, pwd, rol, personal_email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [nombre, apellido, correo_acceso, celular, contraseña, rol, correo_personal] 
      );

  
      if (result.rows.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  
// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});
