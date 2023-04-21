const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");
const stripe = require('stripe')(process.env.STRIPE_KEY);
require('dotenv').config();
const cors= require("cors");

//http://localhost:8000/api/orders/64362fade8d168035a4cb92f

app.use(cors());

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
      const { amount } = req.body;
      console.log(req.body)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
      });
      res.status(200).send(paymentIntent.client_secret);
      console.log(paymentIntent)
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: err.message });
    }
  }); 

 /*  http://127.0.0.1:8000/create-payment-intent */
/*  {
    "amount":2000
    
} */


/*   app.post('/create-payment-intent', async (req, res) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 199,
        currency: 'usd',
        automatic_payment_methods:{
            enabled:true,
        },

    });
    res.send({clientSecret: paymentIntent.client_secret});
  });
 */
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