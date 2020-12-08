var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');

require('dotenv').config();

var app = express();





//midleware
app.use(cors());
app.use(express.json());

//Connect to MONGODB ATLAS
const uri = process.env.ATLAS_URI;
mongoose.connect( uri , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB Connected!')
});

//Connect to routers
const addItemsRouter = require('./routes/addItems');
const addUserRouter = require('./routes/addUser');
const postRoute = require('./routes/posts')

//const logInRouter = require('./routes/login')
app.use('/addItems', addItemsRouter);
app.use('/addUser', addUserRouter);
app.use('/posts', postRoute);
//app.use('/login', logInRouter);

var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
