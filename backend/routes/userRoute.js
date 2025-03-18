import express from 'express';
import { adminlogin, staffRegister, listUser, removeUser, loginUser, singleUser } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/admin', adminlogin);
userRouter.post('/register',adminAuth ,upload.single('profileImage'), staffRegister);
userRouter.get('/list', listUser);
userRouter.post('/remove', adminAuth, removeUser);
userRouter.post('/login', loginUser);
userRouter.get('/single/:id', singleUser);



export default userRouter;