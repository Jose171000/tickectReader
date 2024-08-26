const orderService = require("../services/orderService.js");

exports.printOrder = async (req, res, next) => {
    try {
        const order = req.body;
        await orderService.printOrder(order);
        res.status(200).send("Impresión exitosa");
    } catch (error) {
        next(error);
    }
}