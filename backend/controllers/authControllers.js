const crypto=require('crypto');
const userModel=require('../models/user');
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');

const signup= async (req,res)=>{
    const { fullname, username, email, password, confirmpassword, gender, year, branch} = req.body;

    try{
        if(!password || !confirmpassword){
            return res.status(400).send("Password and confirm password are required");
        }
        if(password!==confirmpassword){
            return res.status(401).send("Passwords do not match");
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(401).send("User already exists");
        }
        const passwordHash = await bcrypt.hash(password,10);
        const newuser=await new User({
            fullname,
            username,
            email,
            password:passwordHash,
            gender,
            year,
            branch,
        }).save();

        res.status(200).json({
            _id: newuser._id,
            fullname: newuser.fullname,
            username: newuser.username,
            email: newuser.email,
            gender: newuser.gender,
            year: newuser.year,
            branch:newuser.branch
        });


    }catch(error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
}

const login = async (req, res) => {
    try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        const isValidPassword=await bcrypt.compare(password,user.password);

        if(!user || !isValidPassword){
            return res.status(400).send({message:"Invalid username or password"})
        }

        generatejwt(user._id,res)


        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            year: newuser.year,
            branch:newuser.branch
        })
    }
    catch (error) {
        res.status(500).send({error:"Internal servre Error"});
    }
};

module.exports={login,signup}