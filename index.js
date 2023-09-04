const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "proyecto1",
  password: "Sistemas123",
  port: "5432",
});


class Model {
  async getItems() {
    const { rows } = await pool.query("select * from usuarios;");
    return rows;
  }

  async getItemById(id) {
    const { rows } = await pool.query("select * from usuarios where id_usuario = $1;", [
      id,
    ]);
    return rows[0];
  }

  async addItem(ci,nombres,apellidos,fecha_nac,usuario,pass) {
    await pool.query("INSERT INTO usuarios (ci, nombres, apellidos, fecha_nac, usuario, pass) values ($1,$2,$3,$4,$5,$6)", [ci,nombres,apellidos,fecha_nac,usuario,pass]);
  }

  async updateItem(id, carnet, name, lastname,date_nac,user,pws) {
    await pool.query("UPDATE usuarios SET nombres = $3, carnet = $2, apellidos = $3, fecha_nac = $5, usuario = $6, pass = $7  WHERE id_usuario = $1", [id, carnet,name, lastname, date_nac,user,pws]);
  }

  async deleteItem(id) {
    await pool.query("DELETE FROM usuarios WHERE id_usuario = $1", [id]);
  }

  async getPromedio() {
    const { rows } = await pool.query("select AVG(extract(YEAR FROM AGE(NOW(),fecha_nac))) AS promedio_edades FROM usuarios;");
    return rows;
  }
}


class Controller {
  constructor(model) {
    this.model = model;
  }

  async getItems(req, res) {
    const data = await this.model.getItems();
    res.send(data);
  }

  async getItemById(req, res) {
    const id = req.params.id;
    const data = await this.model.getItemById(id);
    res.send(data);
  }

  async addItem(req, res) {
    const name = req.body.name;
    await this.model.addItem(name);
    res.sendStatus(201);
  }

  async updateItem(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    await this.model.updateItem(id, name);
    res.sendStatus(200);
  }

  async deleteItem(req, res) {
    const id = req.params.id;
    await this.model.deleteItem(id);
    res.sendStatus(200);
  }

  async getPromedio(req, res) {
    const data = await this.model.getItems();
    res.send(data);
  }
}


const model = new Model();
const view = new view();
const controller = new Controller(model);

app.use(express.json());

app.get("/usuarios", controller.getItems.bind(controller));
app.get("/usuarios/:id", controller.getItemById.bind(controller));
app.post("/usuarios", controller.addItem.bind(controller));
app.put("/usuarios/:id", controller.updateItem.bind(controller));
app.delete("/usuarios/:id", controller.deleteItem.bind(controller));
app.get("/usuarios", controller.getPromedio.bind(controller));


app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});