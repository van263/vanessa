const Task = require('../models/task');

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
const tasks = await Task.find();
res.json(tasks);
};

// Crear nueva tarea
exports.createTask = async (req, res) => {
const { title } = req.body;
if (title.length > 100) {
return res.status(400).json({ error: 'El título de la tarea no debe superar los 100
caracteres' });
}
const newTask = new Task({ title });
await newTask.save();
res.status(201).json(newTask);
};

// Marcar tarea como completada
exports.completeTask = async (req, res) => {
const { id } = req.params;
const task = await Task.findById(id);
if (!task) {
return res.status(404).json({ error: 'Tarea no encontrada' });
}
task.completed = !task.completed;

await task.save();
res.json(task);
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
const { id } = req.params;
const task = await Task.findByIdAndDelete(id);
if (!task) {
return res.status(404).json({ error: 'Tarea no encontrada' });
}
res.json({ message: 'Tarea eliminada' });
};