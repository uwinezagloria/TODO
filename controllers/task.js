import mongoose from "mongoose"
import moment from "moment"
import task from "../models/task.js"
const TaskControllers={
createTask:async(req,res)=>{
    res.send("morning")
    try{
       
         const {name, startDate, startTime, endDate, endTime} = req.body
         if(!name  || !startDate || !endDate){
             res.status(400).json({error:'provide all the required'});
         }
         if(moment(startDate).diff(moment(endDate), 'days') > 0){
             res.status(400).json({error:'your deadline is less than the start time'});
         }
        const newTask = new task();
         if(startTime === null){
             newTask.startTime ='12:00:00'
         }
         if(endTime === null){
             newTask.endTime = '00:00:00'
         }
         if(moment(startDate).diff(moment(), 'days') > 0){
             newTask.status = 'Todo'
         }else if(moment(startDate).diff(moment(), 'days') < 0 && moment(endDate).diff(moment()), 'days' > 0){
             newTask.status = 'In progress'
         }else if(moment().diff(moment(endDate), 'days') === 1){
             newTask.status = 'Late'
         }else if(moment().diff(moment(endDate), 'days') > 1){
             newTask.status = 'Over-due'
         }

         await newTask.save();
    
        res.status(201).json({
            message: 'Task added successfully',
            task: newTask
        });
        

    }
    catch(err){
        res.status(500).json({msg:err})
    }
},
completeTask:async(req,res)=>{
try{
const taskID=req.params
 const getTask=await task.findByIdAndUpdate(taskID,req.body,{new:true})
if(!getTask){
    res.status(404).json({msg:"not found"})
}
if(getTask.status==="complete"){
    res.status(400).json({msg:"already completed"})
}
getTask.status="complete"
getTask.dateComplete=Date.now()
await getTask.save()
res.status(200).json({msg:"task completed"})
}
catch(err){
res.status(500).json({msg:err})
}},
getAllTasks:async(req,res)=>{
    try{
    res.send("hy")
const tasks=await task.find()
res.status(200).json({tasks:tasks})
}
catch(error){
    res.status(500).json({error:error})
}
},
getTaskById:async(req,res)=>{
    try{
        const taskId=req.params
const getOneTask=await task.findById(taskId)
if(!getOneTask){
    res.status(404).json({msg:`No Task with id ${taskId}`})
}
res.status(200).json({task:getOneTask})
    }
    catch(error){
        res.status(500).json({error:error})
    }
},
updateTask:async(req,res)=>{
    try{
const taskId=req.params
const update=await task.findByIdAndUpdate(taskId,req.body,{new:true})
if(!update){
    res.status(404).json({msg:`no task with id ${taskId}`})
}
res.status(200).json({updated:update})
    }
    catch(error){
        res.status(500).json({error:error})
    }
}

}
export default TaskControllers

