// DOM elements
const LIST = document.getElementById('taskList');
const ADD = document.getElementById('addBtn');
const ADDNAME = document.getElementById('taskName');
const ADDTIME = document.getElementById('taskTime');
const DELETE = document.getElementById('deleteBtn');
const DELETEINPUT = document.getElementById('deleteName');

// Local sounds
const ADD_SOUND = new Audio("sounds/add.mp3");
const DELETE_SOUND = new Audio("sounds/delete.mp3");
const COMPLETE_SOUND = new Audio("sounds/completed.mp3");

// Add task
function addTask(name, time) {
    const TRIMMED = name.trim();
    const TIME = time.trim();
    if (TRIMMED === '' || TIME === '') {
        alert('Please fill in both fields.');
        return;
    }

    const LI = document.createElement('li');
    LI.className = 'task-item';

    const SPAN = document.createElement('span');
    SPAN.className = 'taskText';
    SPAN.textContent = `${TRIMMED} - ${TIME} `;
    LI.appendChild(SPAN);

    const STATUS = document.createElement('span');
    STATUS.className = 'statusLabel';
    STATUS.textContent = '(incomplete)';
    STATUS.style.marginLeft = '8px';
    LI.appendChild(STATUS);

    const STATUSBTN = document.createElement('button');
    STATUSBTN.textContent = 'Change status';
    STATUSBTN.className = 'statusBtn';
    STATUSBTN.addEventListener('click', () => {
        if (STATUS.textContent === '(incomplete)') {
            STATUS.textContent = '(complete)';
            LI.style.textDecoration = 'line-through';
            LI.style.opacity = '0.6';
            COMPLETE_SOUND.play();
            showConfetti();
        } else {
            STATUS.textContent = '(incomplete)';
            LI.style.textDecoration = 'none';
            LI.style.opacity = '1';
        }
    });
    LI.appendChild(STATUSBTN);

    const REMOVE = document.createElement('button');
    REMOVE.textContent = 'Delete';
    REMOVE.className = 'removeBtn';
    REMOVE.addEventListener('click', () => {
        LIST.removeChild(LI);
        DELETE_SOUND.play();
    });
    LI.appendChild(REMOVE);

    LIST.appendChild(LI);
    ADD_SOUND.play();
    ADDNAME.value = '';
    ADDTIME.value = '';
}

// Add task button
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

// Delete by name
DELETE.addEventListener('click', () => {
    const TARGET = DELETEINPUT.value.trim().toLowerCase();
    if (!TARGET) return;

    const ITEMS = LIST.querySelectorAll('li');
    let found = false;

    ITEMS.forEach(item => {
        const TEXT = item.querySelector('.taskText').textContent.toLowerCase();
        if (TEXT.startsWith(TARGET)) {
            LIST.removeChild(item);
            DELETE_SOUND.play();
            found = true;
        }
    });

    if (!found) alert('The selected task was not found.');
    DELETEINPUT.value = '';
});

// Enter key to delete
DELETEINPUT.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') DELETE.click();
});

// Dark/light mode
document.addEventListener("DOMContentLoaded", () => {
    const MODE = document.getElementById('modeBtn');
    if (!MODE) return;

    const SAVEDMODE = localStorage.getItem('todo_dark_mode');
    if (SAVEDMODE === 'true') {
        document.body.classList.add('dark-mode');
        MODE.textContent = 'Modo claro';
    } else {
        MODE.textContent = 'Modo oscuro';
    }

    MODE.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        MODE.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
        localStorage.setItem('todo_dark_mode', isDark ? 'true' : 'false');
    });
    askNotification();
});

// Confetti
function showConfetti() {
    const DURATION = 1500;
    const END = Date.now() + DURATION;
    (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });
        if (Date.now() < END) requestAnimationFrame(frame);
    })();
}

// Notifications
function askNotification() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

function sendNotification(title, hour) {
    if (Notification.permission === "granted") {
        new Notification("¡Tarea pendiente!", {
            body: `${title} - ${hour}`,
            icon: "https://cdn-icons-png.flaticon.com/512/6286/6286665.png"
        });
    }
}

// Verify times
setInterval(() => {
    const ITEMS = LIST.querySelectorAll('li');
    const NOW = new Date();
    const CURRENT_TIME = NOW.toTimeString().slice(0,5);

    ITEMS.forEach(item => {
        const text = item.querySelector('.taskText').textContent;
        const [name, hour] = text.split('-').map(t => t.trim());
        const status = item.querySelector('.statusLabel').textContent;

        if (hour === CURRENT_TIME && status === '(incomplete)') {
            sendNotification(name, hour);
        }
    });
}, 60000);

// Download .exe
document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'To-Do-List.exe';
    link.download = 'To-Do-List.exe';
    link.click();
});
