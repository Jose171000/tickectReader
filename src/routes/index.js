const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController.js");

//Ruta para imprimir pedido
router.post("/print-order", orderController.printOrder);

module.exports = router;