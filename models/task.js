import mongoose from 'mongoose'
const taskSchema=new mongoose({
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
        default:'12:00:00',
    },
    endDate:{
        type:Date,
        required:true,
    },
    endTime:{
        type:String,
        default:'23:59:59',
    },
    dateComplete:{
type:date,
    },
status:{
    type:String,
}
})
const task=mongoose.model('todo',taskSchema)
export default task