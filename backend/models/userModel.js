import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    staffID: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false }, 
});

const userModel = mongoose.model.User || mongoose.model("User", userSchema);

export default userModel;
