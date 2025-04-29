import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
         const tasks = await Task.find({ user: req.user.id });
         res.status(200).json(tasks);
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

export const getTask = async (req, res) => {
    try{
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        res.status(200).json(task);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });
        res.status(201).json(task);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate({
            _id: req.params.id,
            user: req.user.id
        }, req.body, {
            new: true,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};