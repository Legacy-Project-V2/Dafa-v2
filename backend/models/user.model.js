const mongoose= require('mongoose');
// const schema  = require('./addItems.model');

const Schema = mongoose.Schema;
//creat the Schema, what data we want to be saved
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        minlength:3,
        trim: true
    },
    password : {
        type: String,
        minlength: 5,
        required: true
        
    },
    phone: {
        
        type: Number,
         unique:true,
        min:10
    },
    address:{
        type: String,
        minlength: 4,
        required: true
    },
    date:{
    type: Date,
    default: Date.now    
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
