let itemCount = 0;
let uncheckedCount = 0;
const todoList = document.getElementById('todo-list');

function updateCounts() {
  document.getElementById('item-count').innerText = itemCount;
  document.getElementById('unchecked-count').innerText = uncheckedCount;
}

function newTodo() {
  const titleInput = document.getElementById('new-todo-title');
  const title = titleInput.value.trim();

  if (title !== '') {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', toggleTodo);

    const titleDisplay = document.createElement('span');
    titleDisplay.innerText = title;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', deleteTodo);

    todoItem.appendChild(checkbox);
    todoItem.appendChild(titleDisplay);
    todoItem.appendChild(deleteButton);

    todoList.appendChild(todoItem);

    titleInput.value = '';
    titleInput.focus();

    itemCount++;
    uncheckedCount++;
    updateCounts();
  }
}

function toggleTodo() {
  uncheckedCount += this.checked ? -1 : 1;
  updateCounts();
}

function deleteTodo() {
  const todoItem = this.parentNode;

  if (!todoItem.querySelector('.checkbox').checked) {
    uncheckedCount--;
  }

  todoList.removeChild(todoItem);
  itemCount--;
  updateCounts();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    newTodo();
  }
}

function saveToLocalStorage() {
  const todos = [];
  const todoItems = document.querySelectorAll('.todo-item');

  todoItems.forEach((item) => {
    const title = item.querySelector('span').innerText;
    const isChecked = item.querySelector('.checkbox').checked;
    todos.push({ title, isChecked });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    const todos = JSON.parse(savedTodos);

    todos.forEach((todo) => {
      const todoItem = document.createElement('li');
      todoItem.className = 'todo-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.checked = todo.isChecked;
      checkbox.addEventListener('change', toggleTodo);

      const titleDisplay = document.createElement('span');
      titleDisplay.innerText = todo.title;

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', deleteTodo);

      todoItem.appendChild(checkbox);
      todoItem.appendChild(titleDisplay);
      todoItem.appendChild(deleteButton);

      todoList.appendChild(todoItem);

      if (!todo.isChecked) {
        uncheckedCount++;
      }
      itemCount++;
    });

    updateCounts();
  }
}