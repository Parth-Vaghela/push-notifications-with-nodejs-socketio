const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webpush = require('web-push');
const dotenv = require('dotenv')
const port = process.env.PORT || 3000;
require('dotenv').config()

app.use(express.static(path.join(__dirname, "./public")))
app.use(bodyParser.json());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:test@xyz.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'chat-app-notification' });

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error);
  });
});

app.listen(port, ()=> {
  console.log(`Server starts on port * ${port}`);
});