document.getElementById('new-todo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addNewTodo();
    }
})

function addNewTodo() {
    let todoInput = document.getElementById('new-todo');
    let todoText = todoInput.value.trim();

    if (todoText !== '') {
        let newTodoItem = document.createElement('div');
        newTodoItem.className = 'todo-item';

        let todoTextElement = document.createElement('span');
        todoTextElement.textContent = todoText;
        todoTextElement.className = 'todo-text';

        let completeButton = document.createElement('button');
        completeButton.textContent = 'Selesai';
        completeButton.className = 'complete-btn';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.className = 'delete-btn';

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';

        newTodoItem.appendChild(todoTextElement);
        newTodoItem.appendChild(completeButton);
        newTodoItem.appendChild(deleteButton);
        newTodoItem.appendChild(editButton);

        let todoList = document.getElementById('todo-list');
        todoList.appendChild(newTodoItem);

        todoInput.value = '';
    }
}

document.getElementById('todo-list').addEventListener('click', function(event) {
    if (event.target.className === 'complete-btn') {
        toggleTodoItem(event.target.parentElement);
    } else if (event.target.className === 'delete-btn') {
        deleteTodoItem(event.target.parentElement);
    } else if (event.target.className === 'edit-btn') {
        makeEditable(event.target.parentElement);
    }
})

function toggleTodoItem(todoItem) {
    let todoTextElement = todoItem.querySelector('span');
    todoTextElement.classList.toggle('completed');
}

function deleteTodoItem(todoItem) {
    todoItem.remove();
}

function makeEditable(todoItem) {
    const todoTextElement = todoItem.querySelector('.todo-text');
    const input = document.createElement('input');

    input.type = 'text';
    input.value = todoTextElement.textContent;
    input.className = "todo-edit-input";
    input.addEventListener("blur", saveChanges);
    input.addEventListener("keydown", handleKeyDown);

    todoItem.replaceChild(input, todoTextElement);
    input.select();
}

function saveChanges(event) {
    const input = event.target;
    const todoItem = input.parentElement;
    const newText = input.value;

    const newTodoTextElement = document.createElement("span");
    newTodoTextElement.textContent = newText;
    newTodoTextElement.className = "todo-text";
    newTodoTextElement.addEventListener("click", makeEditable);

    todoItem.replaceChild(newTodoTextElement, input);
}

function handleKeyDown(event) {
    const input = event.target;

    if (event.key === "Enter") {
        input.blur();
    } else if (event.key === "Escape") {
        const todoTextElement = input.parentElement.querySelector(".todo-text");
        input.value = todoTextElement.textContent;
        input.blur();
    }
}