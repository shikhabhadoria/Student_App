// add course
// get course by id
// update course
// delete course
// get all course

import Course from "../model/courses.model.js"
import Enrollment from "../model/enrollement.model.js";

export const addCourse = async(req, res) => {
    const {title, description, durationWeeks} = req.body;
    if(!title || !description || !durationWeeks){
        return res.status(400).json({message: "Requirements are not fullfilled!"})
    }

    if(Number.isNaN(Number(durationWeeks))) {
        return res.status(400).json({
            message: "durationWeeks should be a number"
        });
    }

    const existingCourseByTitle = await Course.findOne({title});

    if(existingCourseByTitle){
        return res.status(400).json({message: "Course with the given title already exist!"})
    }

    const createCourse = await Course.create({
        title,
        description,
        durationWeeks
    });

    res.status(200).json(
        {message: "course is added successfully ", createCourse}
    );
}

export const getCourseById = async(req, res) => {
    try{
        const { id } = req.params;

        const existingCourse = await Course.findById(id);

        if(!existingCourse){
            return res.status(404).json({message: "course not found"})
        }

        res.status(200).json({existingCourse});
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const getAllCourses = async(req, res) => {
   try{
        const courses = await Course.find({});
        return res.status(200).json({courses});
    }catch(error){
        return res.status(500).json({error: error.message});
   }
}

export const updateCourse = async(req, res) => {
    try{
        const { id } = req.params;
        const dataToBeUpdated = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(id, dataToBeUpdated, { returnDocument: "after" });

        if(!updatedCourse){
            return res.status(404).json({message: "course not find"});
        }
        res.status(200).json({updatedCourse});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

export const deleteCourse = async(req, res) => {
    try{
  const { id } = req.params;

  const courseToBeDeleted = await Course.findById(id);
  if(!courseToBeDeleted){
    return res.status(400).json({message:"course not found!!!"})
  }

  await Enrollment.deleteMany({
    courseId: id
  })

  await Course.findByIdAndDelete(id)

  res.status(200).json({message:"Course deleted succesfullt"});
}catch(error){
    return res.status(500).json({error: error.message});
}

}






