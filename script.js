// DOM elements
const LIST = document.getElementById('taskList');
const ADD = document.getElementById('addBtn');
const ADDNAME = document.getElementById('taskName');
const ADDTIME = document.getElementById('taskTime');
const DELETE = document.getElementById('deleteBtn');
const DELETEINPUT = document.getElementById('deleteName');

// Add task function
function addTask(name, time) {
    const TRIMMED = name.trim();
    const TIME = time.trim();
    if (TRIMMED === '' || TIME === '') {
        alert('Please fill in both fields.');
        return;
    }
    // Create task item
    const LI = document.createElement('li');
    LI.className = 'task-item';
    // Task text + time
    const SPAN = document.createElement('span');
    SPAN.className = 'taskText';
    SPAN.textContent = `${TRIMMED} - ${TIME} `;
    LI.appendChild(SPAN);
    // Status label
    const STATUS = document.createElement('span');
    STATUS.className = 'statusLabel';
    STATUS.textContent = '(incomplete)';
    STATUS.style.marginLeft = '8px';
    LI.appendChild(STATUS);
    // Change status button
    const STATUSBTN = document.createElement('button');
    STATUSBTN.textContent = 'Change status';
    STATUSBTN.className = 'statusBtn';
    STATUSBTN.addEventListener('click', () => {
        if (STATUS.textContent === '(incomplete)') {
            STATUS.textContent = '(complete)';
            LI.style.textDecoration = 'line-through';
            LI.style.opacity = '0.6';
        } else {
            STATUS.textContent = '(incomplete)';
            LI.style.textDecoration = 'none';
            LI.style.opacity = '1';
        }
        console.log('Task status changed:', TRIMMED);
    });
    LI.appendChild(STATUSBTN);
    // Remove button
    const REMOVE = document.createElement('button');
    REMOVE.textContent = 'Delete';
    REMOVE.className = 'removeBtn';
    REMOVE.addEventListener('click', () => {
        LIST.removeChild(LI);
        console.log('Task deleted (button):', TRIMMED);
    });
    LI.appendChild(REMOVE);
    // Append to list
    LIST.appendChild(LI);
    console.log('Task added:', TRIMMED);
    // Clear fields
    ADDNAME.value = '';
    ADDTIME.value = '';
}

// Add task button click
ADD.addEventListener('click', () => {
    addTask(ADDNAME.value, ADDTIME.value);
});

// Allow Enter key to add task
ADDNAME.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ADD.click();
});
ADDTIME.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ADD.click();
});

// Delete by text button
DELETE.addEventListener('click', () => {
    const TARGET = DELETEINPUT.value.trim().toLowerCase();
    if (!TARGET) return;

    const ITEMS = LIST.querySelectorAll('li');
    let found = false;

    ITEMS.forEach(item => {
        const TEXT = item.querySelector('.taskText').textContent.toLowerCase();
        if (TEXT.startsWith(TARGET)) {
            LIST.removeChild(item);
            console.log('Task deleted (by text):', TARGET);
            found = true;
        }
    });

    if (!found) {
        console.log('The selected task was not found:', TARGET);
        alert('The selected task was not found.');
    }

    DELETEINPUT.value = '';
});

// Allow Enter key to delete task
DELETEINPUT.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') DELETE.click();
});

// Allow changing the background
document.addEventListener("DOMContentLoaded", () => {
    const MODE = document.getElementById('modeBtn');
    if (!MODE) {
        console.error("No se encontró el botón con id 'modeBtn'");
        return;
    }
    // Try there is a saved mode on localStorage
    const SAVEDMODE = localStorage.getItem('todo_dark_mode');
    if (SAVEDMODE === 'true') {
        document.body.classList.add('dark-mode');
        MODE.textContent = 'Modo claro';
    } else {
        MODE.textContent = 'Modo oscuro';
    }
    // Add click listener
    MODE.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        MODE.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
        localStorage.setItem('todo_dark_mode', isDark ? 'true' : 'false');
    });
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'To-Do List.exe';
    link.download = 'To-Do List.exe';
    link.click();

});
