import  express  from "express";
import TaskControllers from "../controllers/task.js";
const router=express.Router()
router.route('/todo/tasks').post(TaskControllers.createTask).get(TaskControllers.getAllTasks)
router.route('/todo/tasks/:id').put(TaskControllers.completeTask).get(TaskControllers.getTaskById).patch(TaskControllers.updateTask)
export default router
