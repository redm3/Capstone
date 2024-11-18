const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_KEY);
require('dotenv').config();
const cors= require("cors");

app.use(cors());
app.use(bodyParser.json({ verify: (req, res, buf) => req.rawBody = buf }));

const Controllers = require("./controllers"); // index.js
app.use(express.json());

let userRoutes = require("./routes/userRoutes");
app.use('/api/users', userRoutes);

let productRoutes = require("./routes/productRoutes");
app.use('/api/products', productRoutes);

let orderRoutes = require("./routes/orderRoutes");
app.use('/api/orders', orderRoutes);

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    let { amount } = req.body;
    console.log(amount);
    amount = Math.round(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const rawBody = req.rawBody;
  const webhookSecret = process.env.WEBHOOK_SIGNING_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent.id);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

// Export the handler for the Vercel platform
module.exports = app;

