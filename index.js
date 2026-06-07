import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
import express from "express"
import connectDB from "./src/config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import courseRoutes from "./src/Routes/course.routes.js"
import studentRoutes from "./src/Routes/student.routes.js"
import enrollmentRoutes from "./src/Routes/enrollment.routes.js"
dotenv.config();
const app = express();
app.use(express.json());


app.use(cors({
    origin:"http://localhost:3000",
    credential:true
}))

app.use("/course", courseRoutes);
app.use("/student", studentRoutes);
app.use("/enrollment", enrollmentRoutes);

connectDB().
then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started!!");
    })
}).
catch((error) => {
    console.log(error.message);
})


