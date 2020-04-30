const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const PORT = process.env.PORT || 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('db connected'));

mongoose.connection.on('error', err => {
    console.log(`DB Error: ${err.message}`);
});




const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);


app.use(function(err,req,res,next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({ error: "Unauthorized !" });
    }
});



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})