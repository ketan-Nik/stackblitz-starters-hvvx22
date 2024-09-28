const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function totalBill(newItemPrice, cartTotalto) {
  return 'Total Bill is ' + (newItemPrice + cartTotalto);
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotalto = parseFloat(req.query.cartTotalto);
  res.send(totalBill(newItemPrice, cartTotalto).toString());
});

function discount(cartTotal, isMember) {
  if (isMember) {
    let discountPercentage = 10;
    return (
      'Total Price for Membership is ' +
      (cartTotal - (cartTotal * discountPercentage) / 100)
    );
  } else {
    return 'Total Price for non membership is ' + cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(discount(cartTotal, isMember).toString());
});

function tax(cartTotal, taxRate) {
  //let taxRate = 5;
  return 'Total Cart After Tax ' + (cartTotal + (cartTotal * taxRate) / 100);
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(tax(cartTotal, taxRate).toString());
});

function deliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'Standard') {
    return (
      'Total Delivery Time for Standerd Shipping Method is ' + distance / 50
    );
  }
  if (shippingMethod === 'Express') {
    return (
      'Total Delivery Time for Express Shipping Method is ' + distance / 100
    );
  }
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(deliveryTime(shippingMethod, distance).toString());
});

function shippingCost(weight, distance) {
  return 'Shipping Cost is ' + weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(shippingCost(weight, distance).toString());
});

function loyalityPoint(purchaseAmount) {
  //let loyaltyRate = 2;
  return 'The Loyality Point is ' + purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyalityPoint(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
