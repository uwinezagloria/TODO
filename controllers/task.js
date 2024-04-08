import { now } from "mongoose"
import task from "../models/task"
import moment from "moment"
const TaskControllers={
createTask:async(req,res)=>{
    try{
        const {name, startDate, startTime, endDate, endTime} = req.body
        if(name === null || startDate === null || endDate === null){
            res.status(400).json({error:'provide all the required'});
        }
        if(moment(startDate).diff(moment(endDate), 'days') > 0){
            res.status(400).json({error:'your deadline is less than the start time'});
        }
        const newTask = new task(req.body);
        if(startTime === null){
            newTask.startTime = '12:00:00'
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
// const getTask=await task.findByIdAndUpdate(taskID,req.body,{new:true})
const getTask=await task.findById(taskID)
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
}
}
}

