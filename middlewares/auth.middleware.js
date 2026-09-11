import jwt from "jsonwebtoken"

import User from "../src/model/user.model.js"

export const protect = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: "token is not received"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._doc_.id);

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        req.user = user;
        next();

    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(400).json({message:"Not authenticated"})
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: `Access denied: requires role[${allowedRoles.join(", ")}]`
            })
        }
        next();
    }
}