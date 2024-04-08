
import mongoose from "mongoose"
const connectDB=(url)=>{
  const db= mongoose.connect(url)
  if(db){
    console.log(url)}
  
}
export default connectDB
