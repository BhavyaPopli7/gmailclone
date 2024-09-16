const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//---------------SIGNUP-----------------------------

exports.signup = async(req,res) => {
    try{
        const {fullname,email,password} = req.body;

        if(!fullname || !email || !password){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            });
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message:"User already exists witht this email",
                success:false
            });
        }
        
        const profilePhoto = `https://avatar.iran.liara.run/public`;

        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            profilePhoto,
        });

        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        });
    }
    catch(error){
            console.log(error);
    }
}


//------------------LOGIN----------------------------

exports.login = async(req,res)=>{
     try{
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message:"Incorrect email or password",
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,smaeSite:'strict'}).json({
            message: `${user.fullname} logged in successfully.`,
            user,
            success:true
        });
     }
     catch(error){
         console.log(error); 
     }
}


//-----------------LOGOUT-----------------------

exports.logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully."
        })
    }
    catch(error){
       console.log(error);
    }
}