const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Sweet = require("../models/Sweet");
const authMiddleware = require("../middleware/authMiddleware");

// ADMIN DASHBOARD DATA
router.get("/", authMiddleware, async (req, res) => {
  try {
    // total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (sum, o) => sum + o.totalAmount,
      0
    );

    // profit = 30% of revenue (simple demo logic)
    const totalProfit = Math.round(totalRevenue * 0.3);

    // monthly revenue
    const monthly = {};

    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short"
      });
      monthly[month] = (monthly[month] || 0) + order.totalAmount;
    });

    const chartData = Object.keys(monthly).map(m => ({
      month: m,
      revenue: monthly[m],
      profit: Math.round(monthly[m] * 0.3)
    }));

    const totalOrders = orders.length;
    const totalSweets = await Sweet.countDocuments();

    res.json({
      totalRevenue,
      totalProfit,
      totalOrders,
      totalSweets,
      chartData
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
