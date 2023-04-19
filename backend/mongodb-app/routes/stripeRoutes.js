const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  console.log('Request body:', req.body); // Add this line to log the request body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "nzd",
      payment_method_types: ["card"],
      payment_method: req.body.paymentMethodId,
      confirm: true,
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
