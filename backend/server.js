import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'  
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'


// App config
const app = express()
const port = process.env.PORT || 3000
connectDB();
connectCloudinary();

//middlewares
app.use(express.json())
app.use(cors())


//api endpoint 
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`server started on PORT: ` + port);
})