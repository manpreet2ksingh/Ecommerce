const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors')
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


// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())    
app.use(morgan('dev'))
app.use(expressValidator());
app.use(cors());

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