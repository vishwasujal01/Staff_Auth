import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

//Route for Login
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//Route for user login
const loginUser  = async (req, res) => {
    const { staffID, password } = req.body;
    const user = await userModel.findOne({ staffID });

    if (!user) {
        return res.status(404).json({ success: false, message: "User  doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({
        success: true,
        token,
        user: {
            fullName: user.fullName, 
            staffID: user.staffID,
        }
    });
};


//Route for staff register
const staffRegister = async (req, res) => {
    try {
        const { fullName, staffID, department, password } = req.body;

        // ✅ Validate input fields
        if (!fullName || !staffID || !department || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please Enter a Strong Password"});
        }

        const exist = await userModel.findOne({ staffID });

        if (exist) {
            return res.json({ success: false, message: "User  already exists" });
        }

        const image = req.file; // Use req.file for single file upload

        let imageUrl = null;
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
            imageUrl = uploadResult.secure_url; // Get the secure URL from the upload result
            console.log("Cloudinary Upload Result:", uploadResult);
            console.log("Uploaded Image URL:", imageUrl);
        }

        // Hashing user password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = new userModel({
            fullName,
            staffID,
            password: hashedPassword,
            department,
            profileImage: imageUrl || null // Assign the imageUrl directly
        });

        console.log(userData);

        await userData.save();

        res.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Route for admin login 
const adminlogin = async (req, res) => {
    try {
        
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.json({success:true, token})
        } else {
            res.json({success: false, message: "Invalid Email or Password"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

//Route for list user
const listUser = async (req, res) => {

    try {
        const user = await userModel.find({});
        res.json({success: true, user});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

//function for single user info
const singleUser = async (req, res) => {

    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        res.json({success: true, user});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


//Route for remove user
const removeUser = async (req, res) => {

    try {
        await userModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "User removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}



export {adminlogin, staffRegister, listUser, removeUser, loginUser, singleUser}  //exporting the functions to be used in other files.  //export {admin
