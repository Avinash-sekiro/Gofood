const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// POST: Save order data
router.post('/orderData', async (req, res) => {
  const { email, order_data } = req.body;

  try {
    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // Create new order document
      await Order.create({
        email,
        order_data: [order_data]  // Wrap order_data array inside another array
      });
    } else {
      // Append new order to existing orders
      await Order.updateOne(
        { email },
        { $push: { order_data: order_data } }  // Do NOT wrap in [] again
      );
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Error saving order:", error.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// POST: Retrieve order history
router.post('/myorderData', async (req, res) => {
  const { email } = req.body;

  try {
    const myData = await Order.findOne({ email });

    if (!myData) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    return res.json({ success: true, orderData: myData.order_data });
  } catch (error) {
    console.error("Error fetching order data:", error.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
