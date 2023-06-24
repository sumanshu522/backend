const jwt = require("jsonwebtoken")


const generateToken = (_id)=>{
    // console.log({_id})
    return jwt.sign({_id},"MY@MAN123",{
        expiresIn:'10d'
    })
}

module.exports = generateToken
