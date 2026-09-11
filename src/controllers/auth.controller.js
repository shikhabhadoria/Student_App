import User from "../model/user.model.js"

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


const cookieOptions = {
  httpOnly: true, // JS on the client cannot read it → protects against XSS
  secure: false,
  sameSite: "lax", // protects against CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

export const signup = async(req, res) => {
    try{
    const {name, email, password, role} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"all the details are required"})
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"this user already occurs"});
    }


    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    })


    const token = generateToken(user);
    res.cookie("token", token, cookieOptions);


    res.status(200).json({message: "signup successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const login = async(req, res) => {
    try{
    const { email, password } = req.body;
    console.log("1")
    if(!email || !password){
        return res.status(400).json({message:"requirements are not fullfilled"})
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({message: "user does not exist pleasse signup"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "password is wrong"});
    }

    const token = generateToken(user)
    res.cookie("token", token, cookieOptions)
   
    res.status(200).json({
        message:"Login Succesfull",
        user:{
            id:user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const logout = async(req, res) => {
    try{
        res.clearCookie("token", cookieOptions);
        return res.status(200).json({
            message: "logout successfully!",
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



