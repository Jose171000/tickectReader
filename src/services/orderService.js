const {ThermalPrinter, PrinterTypes} = require("node-thermal-printer");
const QRCode = require("qrcode");
const axios = require("axios");

const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: process.env.PRINTER_INTERFACE
});

exports.printOrder = async (order)=>{
    try {
        printer.println(`Nombre: ${order.billing.first_name} ${order.billing.last_name}`);
        printer.println(`Pedido: ${order.id}`);
        printer.println(`Dirección: ${order.billing.address_1}`);
        printer.println(`Teléfono: ${order.billing.phone}`);

        const qrCodeData = await QRCode.toBuffer(order.line_items[0].product_permalink);
        await printer.printImage(qrCodeData);

        printer.cut();
        await printer.execute();
    } catch (error) {
        throw new Error("Error en la impresión");
    }
};