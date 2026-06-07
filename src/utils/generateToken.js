import jwt from "jsonwebtoken"

const generateToken = (data) => {
    return jwt.sign({...data}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
};

export default generateToken;