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
    }
})

function toggleTodoItem(todoItem) {
    let todoTextElement = todoItem.querySelector('span');
    todoTextElement.classList.toggle('completed');
}

function deleteTodoItem(todoItem) {
    todoItem.remove();
}