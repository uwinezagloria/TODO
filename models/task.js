import mongoose from 'mongoose'
const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    startTime:{
        type:String,

    },
    endDate:{
        type:Date,
        required:true,
    },
    endTime:{
        type:String,
        
    },
    dateComplete:{
type:Date,
    },
status:{
    type:String
}
})
const taskModel=mongoose.model('todo',taskSchema)
export default taskModel