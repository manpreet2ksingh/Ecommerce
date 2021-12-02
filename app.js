const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors')
const path = require('path')
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order')


mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser:true,
    useUnifiedTopology:true}
    ).then(() => console.log('DB connected'))
    .catch(error => console.log(error)); 
    

const whitelist = ['http://localhost:8000', 'http://localhost:8080', 'https://secret-crag-89303.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("Origin acceptable")
        callback(null, true)
    } else {
        console.log("Origin rejected")
        callback(new Error('Not allowed by CORS'))
    }
    }
}
app.use(cors(corsOptions))


// Middlewares
app.use(express.json())
app.use(cookieParser())    
app.use(morgan('dev'))
app.use(expressValidator());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

// Routes Middleware
app.use("/api",authRoutes); // '/api' prefix in all routes
app.use("/api",userRoutes); 
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`);
})