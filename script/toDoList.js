document.addEventListener('DOMContentLoaded', function() {
    const taskListContainer = document.createElement('ul');
    taskListContainer.id = 'toDoList';
    document.body.appendChild(taskListContainer);

    const form = document.createElement('form');
    form.id = 'toDoForm';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'taskInput';
    input.placeholder = 'Enter a new task';
    form.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Task';
    form.appendChild(submitButton);

    document.body.appendChild(form);
});
function Task(description) {
    this.description = description;
    this.isDone = false;
}
function ToDoList() {
    this.tasks = [];
}

ToDoList.prototype.addTask = function(task) {
    this.tasks.push(task);
    this.displayTasks();
};

ToDoList.prototype.toggleTask = function(index) {
    if (index > -1 && index < this.tasks.length) {
        this.tasks[index].isDone = !this.tasks[index].isDone;
        this.displayTasks();
    }
};

ToDoList.prototype.removeTask = function(index) {
    if (index > -1 && index < this.tasks.length) {
        this.tasks.splice(index, 1);
        this.displayTasks();
    }
};

ToDoList.prototype.displayTasks = function() {
    const taskList = document.getElementById('toDoList');
    taskList.innerHTML = '';

    this.tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.description;
        listItem.className = task.isDone ? 'done' : '';

    
        listItem.addEventListener('click', () => {
            this.toggleTask(index);
        });

    
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            this.removeTask(index);
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    });
};

const myToDoList = new ToDoList();

document.getElementById('toDoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
        const newTask = new Task(taskDescription);
        myToDoList.addTask(newTask);

        taskInput.value = '';
    }
});