const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "productos"
});

const handleErrors = (err, res) => {
  console.error(err);
  res.status(500).send("Error interno del servidor");
};

app.post("/create", (req, res) => {
  const { marca, estilo, ram, almacenamiento, procesador, estiloteclado, definicionpantalla, precio, descripcion, imagen_Url } = req.body;

  db.query(
    'INSERT INTO productos(marca,estilo,ram,almacenamiento,procesador,estiloteclado,definicionpantalla,precio,descripcion,imagen_url) VALUES(?,?,?,?,?,?,?,?,?,?)',
    [marca, estilo, ram, almacenamiento, procesador, estiloteclado, definicionpantalla, precio, descripcion, imagen_Url],
    (err, result) => {
      if (err) {
        handleErrors(err, res);
      } else {
        res.send("Producto registrado con éxito");
      }
    }
  );
});

app.get("/products", (req, res) => {
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) {
      handleErrors(err, res);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { marca, estilo, ram, almacenamiento, procesador, estiloteclado, definicionpantalla, precio, descripcion, imagen_Url } = req.body;

  db.query(
    'UPDATE productos SET marca=?, estilo=?, ram=?, almacenamiento=?, procesador=?, estiloteclado=?, definicionpantalla=?, precio=?, descripcion=?, imagen_url=? WHERE id=?',
    [marca, estilo, ram, almacenamiento, procesador, estiloteclado, definicionpantalla, precio, descripcion, imagen_Url, id],
    (err, result) => {
      if (err) {
        handleErrors(err, res);
      } else {
        res.send("Producto actualizado con éxito");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM productos WHERE id=?', [id], (err, result) => {
    if (err) {
      handleErrors(err, res);
    } else {
      res.send("Producto eliminado con éxito");
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
