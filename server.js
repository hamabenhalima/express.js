const express = require('express');
const app = express();

const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = date.getHours();

  console.log('Current day:', dayOfWeek);
  console.log('Current hour:', hour);

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    console.log('Within working hours. Proceeding with the request.');
    next();
  } else {
    console.log('Outside working hours. Sending response.');
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 AM to 5 PM).');
  }
};

app.use(workingHoursMiddleware);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home page!</h1>');
});

app.get('/services', (req, res) => {
  res.send('<h1>Our Services</h1><p>Here are our services.</p>');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact Us</h1><p>Contact us for any inquiries.</p>');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


  