const express = require("express")
const {registerUser,authUser} = require("../controllers/authController");
const {protect} = require("../middleware/protected")

const router = express.Router()

router.post('/signup',registerUser);
router.post('/login',authUser);
// Testing purpose
router.get('/test',protect,(req,res)=>{res.json({user:req.user})})

module.exports = router
