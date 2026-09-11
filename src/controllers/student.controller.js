// create student
// update student
// delete student
// get student by id
// get all students

import Student from "../model/student.model.js"
import Enrollment from "../model/enrollement.model.js"
import multer from "multer";
import cloudinary from "../../middlewares/cloudinary.js";
export const upload = multer({
    storage: multer.memoryStorage(),   //RAM 
});

export const createStudent = async(req, res) => {
   try{
        const {firstName, lastName, email, age} = req.body;

         if (!req.file) {       // req.file is for media file request
                return res.status(400).json({
                    message: "Image required",
                });
            }

    if(!firstName || !email || !age){
        return res.status(400).json({message: "complete details are required"})
    }



    const existingStudent = await Student.findOne({email});
    if(existingStudent){
        return res.status(400).json({message: "student already exists"})
    }

    if (Number.isNaN(Number(age))) {
        return res.status(400).json({
            message: "age should be in numbers"
        });
    }   
    
    const fileString =
                `data:${req.file.mimetype};base64,` +
                req.file.buffer.toString("base64");

            const uploadResult =
                await cloudinary.uploader.upload(
                    fileString,
                    {
                        folder: "clothes",
                    }
                );


    const student = await Student.create({
        firstName,
        lastName: lastName || null,
        email,
        age,
        imageUrl: uploadResult.secure_url,
    })

    res.status(200).json(
        {message: "Student is added successfully ", student}
    );
   }catch(error){
    res.status(500).json({message: error.message});
   }

}

export const getStudentById = async(req, res) => {
    try{
        const { id } = req.params;

        const existingStudent = await Student.findById(id);
        if(!existingStudent){
            return res.status(404).json("Student not found");
        }
        return res.status(200).json(existingStudent);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getAllStudent = async(req, res) => {
    try{
        const totalStudent = await Student.find({});
        return res.status(200).json({totalStudent});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}


export const updateStudent = async(req, res) => {
    try{
        const { id } = req.params;
        const toBeUpdated = req.body;
        const existingStudent = await Student.findById(id);
        if(!existingStudent){
            return res.status(404).json({message: "student not found!"})
        }
        const updatedStudent = await Student.findByIdAndUpdate(id, toBeUpdated, { returnDocument: "after" });
        return res.status(200).json({updatedStudent});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}


export const deleteStudent = async(req, res) => {
    const { id } = req.params;

    const studentToBeDeleted = await Student.findById(id);
    if(!studentToBeDeleted){
        return res.status(404).json({message:"student not found!!!"})
    }

    await Enrollment.deleteMany({
        studentId: id
    })

    await Student.findByIdAndDelete(id);

    return res.status(200).json({message: "student deleted successfully"})
}


