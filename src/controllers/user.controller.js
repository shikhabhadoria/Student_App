import User from "../model/user.model.js"

export const deleteUserById = async(req, res) => {
    try{
        const { id } = req.params;
        const existingUser = await User.findByIdAndDelete(id);
        if(!existingUser){
            return res.status(400).json({message:"user not found"})
        }

        res.status(200).json({message:"user is deleted successfully"})

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getAllUsers = async(req, res) => {
    try{
        const users = await User.find({});

        res.status(200).json({
            users
        })
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateUserById = async(req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const updateUser = await User.findByIdAndUpdate(id, changes);

    if(!updateUser){
        return res.status(400).json({message: "user not found"})
    }

    res.status(200).json({message: "user is updated successfully",
        updateUser
    })
}