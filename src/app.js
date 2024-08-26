const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes");
require("dotenv").config();

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.use("/api", routes);

//Manejo de errores
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Algo salió muy mal");
})

module.exports = app;