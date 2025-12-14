const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Sweet = require("../models/Sweet");
const authMiddleware = require("../middleware/authMiddleware");
const generateInvoice = require("../utils/invoice");

/* =========================
   PLACE ORDER + REDUCE STOCK
========================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // stock check
    for (let item of items) {
      const sweet = await Sweet.findById(item.sweetId);
      if (!sweet) {
        return res.status(404).json({ msg: "Sweet not found" });
      }
      if (sweet.stock < item.qty) {
        return res.status(400).json({
          msg: `Only ${sweet.stock} available for ${sweet.name}`
        });
      }
    }

    // reduce stock
    for (let item of items) {
      await Sweet.findByIdAndUpdate(
        item.sweetId,
        { $inc: { stock: -item.qty } }
      );
    }

    // save order
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      status: "Placed"
    });

    await order.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

/* =========================
   GET MY ORDERS (ALL)
========================= */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    }).sort({ _id: -1 });

    // ⚠️ IMPORTANT: empty array is OK
    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

/* =========================
   DOWNLOAD INVOICE (PDF)
========================= */
router.get("/:id/invoice", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send("Invoice not found");
    }

    // security check
    if (order.user.toString() !== req.user.id) {
      return res.status(403).send("Unauthorized");
    }

    generateInvoice(res, order);

  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
