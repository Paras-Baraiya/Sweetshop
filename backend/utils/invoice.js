const PDFDocument = require("pdfkit");

function generateInvoice(res, order) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order._id}.pdf`
  );

  doc.pipe(res);

  // 🧾 HEADER
  doc.fontSize(20).text("Sweet Shop Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Order Date: ${new Date(order.createdAt).toDateString()}`);
  doc.text(`Status: ${order.status}`);
  doc.moveDown();

  // 📦 ITEMS
  doc.fontSize(14).text("Items:");
  doc.moveDown(0.5);

  order.items.forEach(item => {
    doc.fontSize(12).text(
      `${item.name}  |  ₹${item.price}  ×  ${item.qty}  =  ₹${item.price * item.qty}`
    );
  });

  doc.moveDown();
  doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, {
    align: "right"
  });

  doc.moveDown(2);
  doc.text("Thank you for shopping with us!", { align: "center" });

  doc.end();
}

module.exports = generateInvoice;
