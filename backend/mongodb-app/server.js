const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_KEY);
require('dotenv').config();
const cors= require("cors");

//http://localhost:8000/api/orders/64362fade8d168035a4cb92f

app.use(cors());

app.use(bodyParser.json({ verify: (req, res, buf) => req.rawBody = buf }));

module.exports = (req, res) => {
  res.status(200).json({ message: 'Hello from Vercel!' });
};

const Controllers = require("./controllers"); //index.js
app.use(express.json());

let userRoutes = require("./routes/userRoutes")
app.use('/api/users', userRoutes)

let productRoutes = require("./routes/productRoutes")
app.use('/api/products', productRoutes)

let orderRoutes = require("./routes/orderRoutes")
app.use('/api/orders', orderRoutes)


// parse requests of content-type -application/json
//STRIPE TEST

app.get("/config", (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });

  /* http://127.0.0.1:8000/config */

 app.post('/create-payment-intent', async (req, res) => {
    try {
      let { amount } = req.body;
      /* console.log(req.body) */
      console.log(amount)
      amount = Math.round(amount)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
      });
      res.status(200).send(paymentIntent.client_secret);
      /* console.log(paymentIntent) */
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: err.message });
    }
  }); 

 /*  http://127.0.0.1:8000/create-payment-intent */
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

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent.id);
      break;
    // Add more cases to handle other webhook events
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.sendStatus(200);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my MongoDB application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
/* Controllers.productController.getProducts(); */
/* Controllers.userController.getUsers(); */
});


/* app.listen(5173, () =>
  console.log(`Node server listening at http://localhost:5173`)
); */

export default app
