// create student
// update student
// delete student
// get student by id
// get all students

import Student from "../model/student.model.js"
import Enrollment from "../model/enrollement.model.js"

export const createStudent = async(req, res) => {
   try{
        const {firstName, lastName, email, age} = req.body;

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

    const student = await Student.create({
        firstName,
        lastName: lastName || null,
        email,
        age
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


