document.getElementById('new-todo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addNewTodo();
    }
})

function addNewTodo(text = null, isCompleted = false, priority = 'priority-low') {
    let todoInput = document.getElementById('new-todo');
    let todoText = text !== null ? text : todoInput.value.trim();

    if (todoText !== '') {
        let newTodoItem = document.createElement('div');
        newTodoItem.className = 'todo-item';

        const prioritySelector = document.getElementById('priority-selector');
        const priority = prioritySelector.value;
        newTodoItem.classList.add(`priority-${priority}`);

        if (isCompleted) {
            todoTextElement.classList.add('completed');
        }

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

        saveToLocalStorage();
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

    saveToLocalStorage();
}

function deleteTodoItem(todoItem) {
    todoItem.remove();
    saveToLocalStorage();
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
    saveToLocalStorage();
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

function sortTodoList(sortOrder) {
    const todoList = document.getElementById('todo-list');
    const todoItems = Array.from(todoList.children);

    todoItems.sort(function (a, b) {
        const priorityA = a.classList.contains('priority-high') ? 'priority-high' : a.classList.contains('priority-medium') ? 'priority-medium' : 'priority-low';
        const priorityB = b.classList.contains('priority-high') ? 'priority-high' : b.classList.contains('priority-medium') ? 'priority-medium' : 'priority-low';

        if (sortOrder === 'high-to-low') {
            return priorityA === priorityB ? 0 : priorityA === 'priority-high' || priorityB === 'priority-low' ? -1 : 1;
        }

        if (sortOrder === 'low-to-high') {
            return priorityA === priorityB ? 0 : priorityA === 'priority-low' || priorityB === 'priority-high' ? -1 : 1;
        }

        return 0;
    })

    todoList.innerHTML - '';
    for (const item of todoItems) {
        todoList.appendChild(item);
    }
}

document.getElementById('sort-btn').addEventListener('click', function (){
    const sortOrder = prompt('Pilih urutan prioritas: \n1. high-to-low\n2. low-to-high\nKetik nomor pilihan Anda:');

    if (sortOrder === '1') {
        sortTodoList('high-to-low');
    } else if (sortOrder === '2') {
        sortTodoList('low-to-high');
    } else {
        alert('Pilihan tidak valid. Daftar tidak diurutkan');
    }
})

function filterTodoList(filter) {
    const todoList = document.getElementById('todo-list');
    const todoItems = Array.from(todoList.children);

    for (const item of todoItems) {
        const isCompleted = item.querySelector('span.completed') !== null;

        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (filter === 'completed' && isCompleted) {
            item.style.display = 'flex';
        } else if (filter === 'uncompleted' && !isCompleted) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    }
}

document.getElementById('filter-selector').addEventListener('change', function(event) {
    const filter = event.target.value;
    filterTodoList(filter);
})

function saveToLocalStorage() {
    const todoList = document.getElementById("todo-list");
    const todoItems = Array.from(todoList.children);
    const todosData = todoItems.map((todoItem) => {
        const todoText = todoItem.querySelector(".todo-text").textContent;
        const completed = todoItem.querySelector(".completed") !== null;
        const priority = todoItem.classList.contains('priority-high') ? 'priority-high' : todoItem.classList.contains('priority-medium') ? 'priority-medium' : 'priority-low';

        return {
            text: todoText,
            isCompleted: completed,
            priority: priority,
        };
    });

    localStorage.setItem("todos", JSON.stringify(todosData));
}

function loadFromLocalStorage() {
    const todosData = JSON.parse(localStorage.getItem("todos"));

    if (todosData) {
        for (const todoData of todosData) {
            addNewTodo(
                todoData.text,
                todoData.isCompleted,
                todoData.priority
            );
        }
    }
}

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);