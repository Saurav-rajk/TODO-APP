const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
//SIGN IN

router.post("/register",async (req,res)=>{
    try{
         const {email,username,password} = req.body;
         const hashpassword = bcrypt.hashSync(password);
         const user = new User({email,username, password: hashpassword});
         await user.save().then(()=>
            res.status(200).json({message:"Sign Up Succefully"})
         );
    }catch (error){
      
      res.status(200).json({message: "User already exist"});
    }
});

// SIGN IN

router.post("/signin",async (req,res)=>{
    try{
         const user = await User.findOne({email: req.body.email});
         if(!user){
          res.status(400).json({message:"Please Sign Up first"});
         }

         const Ispassword = bcrypt.compareSync(req.body.password, user.password);
         if(!Ispassword){
          res.status(400).json({message:"Password is Not Correct"});
         }
         const {password, ...others} = user._doc;
         res.status(200).json({others});
    }catch (error){
      console.log(error);
      
      res.status(400).json({message: "User already exist"});
    }
});
module.exports=router;
