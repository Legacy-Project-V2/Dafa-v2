const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("addUser-token");
    if (!token)
      return res
        .status(401)
        .send({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .send({ msg: "Token verification failed, authorization denied." });

     // in the req object i want to add a user and verifie it ,, and from the verified object we get the id
    //  so the delete now knows the user try to uncomment the console.log in routes/auth line 78 and see your user id <3
    req.user = verified._id;
    console.log(verified)
    next();
  } catch (err) {
    res.status(500).send({msg:"holaaa"});
  }
};

module.exports = verifyToken;