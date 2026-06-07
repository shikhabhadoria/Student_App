import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect(
            process.env.DB_URL,
        );
        console.log("DB is successfully connected");
    }catch(error){
        console.log("DB is failed to get connected!!!", error);
        process.exit(1);
    }
}

export default connectDB;