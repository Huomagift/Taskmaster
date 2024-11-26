const Task = require('../models/task');

/* 
C- create the task
R- get all tasks
U- update task
D- delete task
*/

const createTask = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
    
        //validate priority statment
        if(!["low", "medium", "high"].includes(data.priority)) {
            return res.status(400).json({
                error: "'priority' most be one of 'low', 'medium', or 'high'."
            })
        }
    
        const newTask = new Task(data);
        await newTask.save();
    
        res.status(201).json(newTask);
    } catch (error) {
        console.log(`error when creating a task - ${error}`);
        res.status(400).json({error: error.messsage});
        
    }
}

module.exports = (createTask);