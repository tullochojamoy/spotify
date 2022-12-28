const express = require('express');
const app = express();

const stripe = require("stripe")('sk_test_51MJf0VGkviSamXGKO9U0cEOq6ZJUvjKeI97ImkbknwpEXLJSL5s1lptrt3tVEwUw2lPL0ppW8ryTIdEF78QWSl9z0079hN2WLk', {
    apiVersion: "2022-08-01",
});

app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "EUR",
        amount: 1999,
        automatic_payment_methods: { enabled: true },
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);