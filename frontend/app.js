const apiUrl = 'http://localhost:3000/api/tasks';

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Obtener las tareas existentes
async function fetchTasks() {
const response = await fetch(apiUrl);
const tasks = await response.json();
taskList.innerHTML = '';
tasks.forEach(task => {
renderTask(task);
});

}

// Renderizar una tarea en la lista
function renderTask(task) {
const li = document.createElement('li');
li.textContent = task.title;
if (task.completed) {
li.style.textDecoration = 'line-through';
}
li.addEventListener('click', () => toggleComplete(task._id));
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Eliminar';
deleteBtn.addEventListener('click', () => deleteTask(task._id));
li.appendChild(deleteBtn);
taskList.appendChild(li);
}

// Agregar nueva tarea
addTaskBtn.addEventListener('click', async () => {
const title = taskInput.value;
const response = await fetch(apiUrl, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({ title })
});
const newTask = await response.json();

renderTask(newTask);
taskInput.value = '';
});

// Alternar estado de completado
async function toggleComplete(id) {
await fetch(`${apiUrl}/${id}`, {
method: 'PUT'
});
fetchTasks();
}

// Eliminar tarea
async function deleteTask(id) {
await fetch(`${apiUrl}/${id}`, {
method: 'DELETE'
});
fetchTasks();
}

// Inicializar tareas
fetchTasks();