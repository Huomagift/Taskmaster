function toggleNavbar() {
    const navigation = document.querySelector('.navigation');
    navigation.classList.toggle('collapsed');
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function toggleOptions(id) {
    const option = document.getElementById(id);
    option.style.display = option.style.display === 'none' ? 'block' : 'none';
}

const taskList = document.getElementById('task-list');

function addTask() {
    const title = document.querySelector('#readOptions input').value;
    const description = document.querySelector('#readOptions textarea').value;
    const priority = document.getElementById('priorityLevel').value;

    if (title && description) {
        const taskItem = document.createElement('li');
        taskItem.classList.add(priority);

        taskItem.innerHTML = 
            `<div>
                <strong>${title}</strong>
                <p>${description}</p>
            </div>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>`
        ;

        taskList.appendChild(taskItem);
        document.querySelector('#readOptions input').value = '';
        document.querySelector('#readOptions textarea').value = '';
    } else {
        alert('Please fill out the task title and description');
    }
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const title = taskItem.querySelector('strong').innerText;
    const description = taskItem.querySelector('p').innerText;

    document.querySelector('#readOptions input').value = title;
    document.querySelector('#readOptions textarea').value = description;

    deleteTask(button);
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}
