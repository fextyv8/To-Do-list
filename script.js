// Obtain elements
const LIST = document.getElementById('list');
const ADD = document.getElementById('addTask');
const ADDINPUT = document.getElementById('taskAddInput');
const DELETE = document.getElementById('deleteTask');
const DELETEINPUT = document.getElementById('taskDeleteInput');

// Add task function (with delete button)
function addTask(text) {
    const TRIMMED = text.trim();
    if (TRIMMED === '') return;
    const LI = document.createElement('li');
    const SPAN = document.createElement('span')
    SPAN.className = 'taskText';
    SPAN.textContent = TRIMMED + ' ';
    LI.appendChild(SPAN);
    const REMOVE = document.createElement('button');
    REMOVE.textContent = 'Delete';
    REMOVE.className = 'removeBtn';
    REMOVE.addEventListener('click', () => {
        LIST.removeChild(LI);
        console.log('Task deleted (button):', TRIMMED);
    });
    LI.appendChild(REMOVE);
    LIST.appendChild(LI);
    console.log('Task added:', TRIMMED);
}

// Add click event
ADD.addEventListener('click', () => {
    addTask(ADDINPUT.value);
    ADDINPUT.value = '';
});

// Let enter to add
ADDINPUT.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        ADD.click();
    }
});

// Delete click event (by text)
DELETE.addEventListener('click', () => {
    const TARGET = DELETEINPUT.value.trim();
    if (!TARGET) return;
    const ITEMS = LIST.querySelectorAll('li');
    let found = false;
    for (let i = 0; i < ITEMS.length; i++) {
        const SPAN = ITEMS[i].querySelector('span');
        if (SPAN && SPAN.textContent === TARGET) {
            LIST.removeChild(ITEMS[i])
            found = true;
            console.log('Task deleted (by text):', TARGET);
            break;
        }
    }
    if (!found) {
        console.log('The selected by text task was not found:', TARGET);
        alert('The selected by text task was not found.');
    }
    DELETEINPUT.value = '';
});

// Let enter to delete
DELETEINPUT.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        DELETE.click();
    }
});
