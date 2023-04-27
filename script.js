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

        newTodoItem.appendChild(todoTextElement);
        newTodoItem.appendChild(completeButton);
        newTodoItem.appendChild(deleteButton);

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
    } else if (event.target.className === 'todo-text') {
        makeEditable(event);
    }
})

function toggleTodoItem(todoItem) {
    let todoTextElement = todoItem.querySelector('span');
    todoTextElement.classList.toggle('completed');
}

function deleteTodoItem(todoItem) {
    todoItem.remove();
}

function makeEditable(event) {
    const todoTextElement = event.target;
    const todoItem = todoTextElement.parentElement;
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