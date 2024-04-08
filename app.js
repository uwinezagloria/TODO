import  express  from "express";
import dotenv from"dotenv"
import router from "./routes/task.js";
import connectDB from "./db/connect.js";
dotenv.config()
const app=express()
app.use(express.json())
app.use(router)
const port=process.env.PORT
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        console.log(`Running on port ${port}`)
    }
    catch(error){
        console.log(error)
    }
}
start()
