const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require('bcrypt');
const app = express();
const { log } = require("console");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const User = require('./models/User');
const authController = require('./controllers/authController');
const partnerFoodController = require('./controllers/partnerFoodController');
const contactModel = require('./models/contactModel')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())



app.set('views', './views')
app.set( "view engine", "ejs" );

app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'public', 'css')))



mongoose.connect('mongodb://localhost:27017/project' )
    .then(() => {
        console.log("Connected to MongoDB");
        // Insert Partner Food Credentials when the application starts
        partnerFoodController.insertPartnerFoodCredentials();
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));


const indexRoutes = require('./routes/indexRoutes');
const foodRoutes = require('./routes/foodRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const partnerFoodRoutes = require('./routes/partnerFoodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

const bookingRoutes = require('./routes/bookingRoutes');
const loginRoutes = require('./routes/loginRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


app.use('/', indexRoutes);
app.use('/', foodRoutes);
app.use('/', restaurantRoutes);
app.use('/', authRoutes);
app.use('/partner-food', partnerFoodRoutes); 
app.use('/', cartRoutes);
app.use('/', orderRoutes);

app.use('/', bookingRoutes);
app.use('/loginRest', loginRoutes);
app.use('/dashboardRest', dashboardRoutes);

app.use(express.static('scripts'));

app.get('/search-results', (req, res) => {
    res.render('search-results');
});



app.post('/delete-user', async (req, res) => {
    try {
        const { userId } = req.body; // ID of the user to delete
        await User.findByIdAndDelete(userId);
        res.redirect('/Admin'); // Redirect back to the users page
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Failed to delete user");
    }
});

app.get('/main', (req, res) => {
    res.render('main')
})

app.get('/about_us', (req,res) => {
    res.render('AboutUs')
})
app.get('/review', async (req,res) => {

    const list = await contactModel.find();
    res.render('Reviews', {
        content: list
    })
})
app.get('/contact_us', (req,res) => {
    res.render('ContactUs')
})
app.get('/biryani_hub', (req, res) => {
    res.render('BiryaniHub')
})

app.get('/DominoRest', (req, res) => {
    res.render('DominoRest')
})

app.get('/form1', (req, res) => {
    res.render('form1')
})

app.get('/form2', (req, res) => {
    res.render('form2')
})
app.get('/form3', (req, res) => {
    res.render('form3')
})

app.get('/form4', (req, res) => {
    res.render('form4')
})
app.get('/minerva', (req, res) => {
    res.render('Minerva')
})
app.get('/mck', (req, res) => {
    res.render('McDonalds')
})

app.post('/send', (req, res) => {
    const data = req.body;

    console.log(data)
    // res.end()
    const list = new contactModel({
        name: data.name,
        email: data.email,
        message: data.message
    })

    list.save();

    res.send();



})
const PORT = 10000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
