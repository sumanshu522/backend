const jwt = require("jsonwebtoken")


const generateToken = (_id)=>{
    // console.log({_id})
    return jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn:'10d'
    })
}

module.exports = generateToken