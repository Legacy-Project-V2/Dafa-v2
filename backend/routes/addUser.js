const router = require('express').Router();
const AddUser = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const {SignUpValidation, loginValidation} = require('../validation.js');
const verifyToken = require("../token.middleware/middlwere");




// router.route('/').get((req, res) => {
//       AddUser.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
  
//   });


  // SignUp
  router.post('/adduser', async (req, res) => {
    const {error} = SignUpValidation(req.body);
    // if !email or !password or !name --> 400 status and senad a message
if(error) return res.status(400).send({ msg: "Not all fields have been entered." });
  //checking if the number already signed up
  const numberadded = await AddUser.findOne({phone: req.body.phone})
  if (numberadded) return res.status(401).send({msg:"there is an account with this number,do you want to log in?"});

    //checking if the username is used
       
  const useradded = await AddUser.findOne({username: req.body.username})
  if (useradded) return res.status(402).send({msg: "there is an account with this username,please choose another one?"});
  // const username = req.body.username;

  //hashing password
  //sorry it is a mass it is leterlly 2 am
  const salt = await bcrypt.genSalt(10)
   const hashedPassword =  await bcrypt.hash(req.body.password, salt)
  // const phone = req.body.phone;
  // const address = req.body.address;
//every thing is readdy here we send the data to the server  
  
       // create a new user 
    const newUser = new AddUser ({ 
      username: req.body.username,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address
  });
  //the code should wait until this request is finished 
    //save function
   try{
   const saveUser= await newUser.save()
      res.send(saveUser)
     // const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET )
    //   console.log(token)
    //localStorage.setItem('token', token)
     //res.header('addUser-token',token).send(token);
     //res.json({ token: token})
    //  console.log(token)
   }catch(err){
     res.status(400).send(err)
   }
  
 
    });

    ///loggingggg innnn
    router.post('/login', async (req, res) => {
      const {error} = loginValidation(req.body);
      if(error) return res.status(400).send({ msg: "Not all fields have been entered." });
    //checking if the username is signed up 

      const user = await AddUser.findOne({
        username: req.body.username
      })
      if (!user) {return res.status(400).send("there is no account with this username, please check your username?")};

    //checking if password is correct

      const validpassword = await bcrypt.compare(req.body.password, user.password)
      if (!validpassword) return res.status(400).send('Invalid Password');

    //create and assign a TOKEN
const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET );
res.header('addUser-token', token).send({
    token:token,
      user:{
    id: user._id,
    username: user.username,
  },
});
console.log(token)
// res.send('Logged In!')
});
  
       
    //endpoint
// this will not be a private  
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("addUser-token");
      console.log(token, 'faded')
      if (!token) return res.send(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.send(false);
  
      const user = await AddUser.findById(verified._id);
      if (!user) return res.send(false);
  
      return res.send(true);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  router.get("/", verifyToken, async (req, res) => {
    const user = await User.findById(req.user);
    // res.send(user)
    res.send({
      name: user.name,
      id: user._id,
    });
  });

    module.exports= router;
