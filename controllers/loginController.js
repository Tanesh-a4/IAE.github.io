const User = require('../models/UserRest');
const Booking = require('../models/Booking');

exports.getLoginForm = (req, res) => {
  res.render('loginRest');
};

exports.handleLogin = (req, res) => {
  const { username, password, bookingTimeSlot } = req.body;

  User.findOne({ username, password })
    .then(user => {
      if (user) {
        const filterByTimeSlot = bookingTimeSlot ? { bookingTimeSlot } : {};
        Booking.find({ resName: user.resName, ...filterByTimeSlot })
          .then(bookings => {
            res.render('ordersRest', { bookings });
          })
          .catch(err => {
            console.error('Error finding bookings for restaurant:', err);
            res.status(500).send('Internal Server Error');
          });
      } else {
        res.render('loginRest', { error: 'Invalid credentials. Please try again.' });
      }
    })
    .catch(err => {
      console.error('Error finding user:', err);
      res.status(500).send('Internal Server Error');
    });
};