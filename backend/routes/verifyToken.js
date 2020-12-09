
const jwt = require('jsonwebtoken');

//middlwere function
module.exports = function(req,res,next){
    const token = req.header('addUser-token');
    // if !token Unauthorized Error
    if (!token) return res.status(401).send('No authentication token, Access Denied!');

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET );
        if (!verified) return res.status(401).send('Token verification failed,Access Denied!');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid TOKEN');
    }
    
}

