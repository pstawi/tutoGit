document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    
    // Charger les tâches depuis localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const text = input.value.trim();
        if (text === '') return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        todos.push(todo);
        saveTodos();
        renderTodos();
        input.value = '';
    });
    
    function renderTodos() {
        list.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            if (todo.completed) {
                li.classList.add('completed');
            }
            
            li.innerHTML = `
                <span onclick="toggleTodo(${todo.id})">${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Supprimer</button>
            `;
            list.appendChild(li);
        });
    }
    
    function toggleTodo(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
        renderTodos();
    }
    
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }
    
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Exposer les fonctions globalement pour les onclick
    window.toggleTodo = toggleTodo;
    window.deleteTodo = deleteTodo;
});
