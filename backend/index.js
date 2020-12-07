var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var dotenv=require('dotenv');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;
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
//const logInRouter = require('./routes/login')
app.use('/addItems', addItemsRouter);
app.use('/addUser', addUserRouter);
//app.use('/login', logInRouter);


//Run the server
app.listen(port, function() {
  console.log('listening on port 3000!');
});