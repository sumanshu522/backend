const User = require('../models/user')
const genToken = require("../config/genToken")


// Sign up controller
module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        res.json({
            error:"Please Enter all the fields"
        })
        return;
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(401)
        res.json({
            error:"User already Exists"
        })
        return;
    }

    try {
        const user = await User.create({ name, email, password })
        res.status(200).json({
            _id:user._id,
            name : user.name,
            email : user.email,
            token : genToken(user._id)
        })
    }catch (e) {
        res.status(400)
        console.log(e)
        res.json({
            error:"Failed To create User"
        })
    }

}

// Login User
module.exports.authUser = async (req,res)=>{

    const { email, password } = req.body

    if ( !email || !password) {
        res.status(400)
        res.json({
            error:"Please Enter all the fields"
        })
    }

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: genToken(user._id),
          });
    }else{
        console.log("Invalid Credentilas")
        res.status(400);
        res.json({
            error:"Invalid Email or Password",
            user : user
        })
    }


}