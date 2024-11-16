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

function addTask(isPopup = false) {
    const title = isPopup ? document.getElementById('taskTitle').value : document.querySelector('#readOptions input').value;
    const description = isPopup ? document.getElementById('taskDescription').value : document.querySelector('#readOptions textarea').value;
    const priority = isPopup ? document.getElementById('taskPriority').value : document.getElementById('priorityLevel').value;
    const dueDate = isPopup ? document.getElementById('DueDate').value : document.getElementById('taskDueDate').value;

    if (title && description) {
        const task = { title, description, priority, dueDate };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        if (isPopup) {
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('DueDate').value = '';
            document.getElementById('taskPriority').value = 'low';
            closeTaskPopup();
        } else {
            document.querySelector('#readOptions input').value = '';
            document.querySelector('#readOptions textarea').value = '';
            document.getElementById('taskDueDate').value = '';
            document.getElementById('priorityLevel').value = 'low';
        }
    } else {
        alert('Please fill out the task title and description');
    }
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add(task.priority);

        taskItem.innerHTML = `
            <div>
                <h3><strong>${task.title}</strong></h3>
                <p>${task.description}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <p><strong>Due:</strong> ${task.dueDate}</p>
            </div>
            <div>
                <button onclick="editTask('${task.title}')">Edit</button>
                <button onclick="deleteTask('${task.title}')">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function editTask(title) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.title === title);

    if (task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('DueDate').value = task.dueDate;
        document.getElementById('taskPriority').value = task.priority;

        deleteTask(title);
        openTaskPopup();
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== title);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTasks();
}

function openTaskPopup() {
    document.getElementById("taskPopup").style.display = "block";
}

function closeTaskPopup() {
    document.getElementById("taskPopup").style.display = "none";
}

function addTaskFromPopup() {
    addTask(true);
    loadTasks();
}

function openSearchPopup() {
    document.getElementById("searchPopup").style.display = "flex";
}

function closeSearchPopup() {
    document.getElementById("searchPopup").style.display = "none";
    document.getElementById("searchInput").value = '';
    document.getElementById("searchResults").innerHTML = '';
}

function openTaskDetailPopup(title, description, dueDate, priority) {
    document.getElementById("taskDetailPopup").style.display = "flex";
    document.getElementById("detailTitle").innerText = title;
    document.getElementById("detailDescription").innerText = description;
    document.getElementById("detailDueDate").innerText = dueDate;
    document.getElementById("detailPriority").innerText = priority;
}

function closeTaskDetailPopup() {
    document.getElementById("taskDetailPopup").style.display = "none";
}

function searchTasks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const searchResults = document.getElementById("searchResults");

    searchResults.innerHTML = '';

    tasks.forEach((task) => {
        if (task.title.toLowerCase().includes(searchInput)) {
            const resultItem = document.createElement("li");
            resultItem.textContent = task.title;

            resultItem.addEventListener('click', () => {
                openTaskDetailPopup(task.title, task.description, task.dueDate, task.priority);
            });

            searchResults.appendChild(resultItem);
        }
    });

    if (searchResults.innerHTML === '') {
        const noTasksItem = document.createElement("li");
        noTasksItem.textContent = "No matching tasks found";
        searchResults.appendChild(noTasksItem);
    }
}

// Show tasks due today in a popup
function showTodayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => task.dueDate === today);

    const todayTasksPopup = document.getElementById('todayTasksPopup');
    const todayTasksList = document.getElementById('todayTasksList');

    todayTasksList.innerHTML = '';

    if (todayTasks.length === 0) {
        todayTasksList.innerHTML = '<li>No task is due today</li>';
    } else {
        todayTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
            `;
            todayTasksList.appendChild(taskItem);
        });
    }

    todayTasksPopup.style.display = 'block';
}

function closeTodayTasksPopup() {
    document.getElementById('todayTasksPopup').style.display = 'none';
}

// Show upcoming tasks in a popup
function showUpcomingTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date().toISOString().split('T')[0];
    const upcomingTasks = tasks.filter(task => task.dueDate > today);

    const upcomingTasksPopup = document.getElementById('upcomingTasksPopup');
    const upcomingTasksList = document.getElementById('upcomingTasksList');

    upcomingTasksList.innerHTML = '';

    if (upcomingTasks.length === 0) {
        upcomingTasksList.innerHTML = '<li>No upcoming tasks</li>';
    } else {
        upcomingTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <p><strong>Due:</strong> ${task.dueDate}</p>
            `;
            upcomingTasksList.appendChild(taskItem);
        });
    }

    upcomingTasksPopup.style.display = 'block';
}

function closeUpcomingTasksPopup() {
    document.getElementById('upcomingTasksPopup').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", loadTasks);

// Function to show the notification popup
function showNotificationPopup() {
    const notificationPopup = document.getElementById('notificationPopup');
    const notificationList = document.getElementById('notificationList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date();

    notificationList.innerHTML = ''; // Clear previous notifications

    tasks.forEach((task) => {
        const taskDueDate = new Date(task.dueDate);
        const timeDifference = taskDueDate - today;

        const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        const threeDays = 3 * oneDay;
        const oneWeek = 7 * oneDay;

        let notificationMessage = '';

        // Notify if due in 1 week, 3 days, 1 day, or today
        if (timeDifference <= oneWeek && timeDifference > threeDays) {
            notificationMessage = `Task "${task.title}" is due in 1 week.`;
        } else if (timeDifference <= threeDays && timeDifference > oneDay) {
            notificationMessage = `Task "${task.title}" is due in 3 days.`;
        } else if (timeDifference <= oneDay && timeDifference > 0) {
            notificationMessage = `Task "${task.title}" is due tomorrow.`;
        } else if (timeDifference <= 0) {
            notificationMessage = `Task "${task.title}" is due today.`;
        }

        if (notificationMessage) {
            const notificationItem = document.createElement('li');
            notificationItem.textContent = notificationMessage;
            notificationList.appendChild(notificationItem);
        }
    });

    if (notificationList.innerHTML === '') {
        const noNotificationsItem = document.createElement('li');
        noNotificationsItem.textContent = 'No upcoming tasks to notify.';
        notificationList.appendChild(noNotificationsItem);
    }

    notificationPopup.style.display = 'block';
}

// Function to close the notification popup
function closeNotificationPopup() {
    document.getElementById('notificationPopup').style.display = 'none';
}

// Function to check tasks every day and trigger notifications
function checkTaskNotifications() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date();

    tasks.forEach((task) => {
        const taskDueDate = new Date(task.dueDate);
        const timeDifference = taskDueDate - today;

        const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        const threeDays = 3 * oneDay;
        const oneWeek = 7 * oneDay;

        // Show a notification if due in 1 week, 3 days, 1 day, or today
        if (timeDifference <= oneWeek && timeDifference > threeDays) {
            alert(`Task "${task.title}" is due in 1 week.`);
        } else if (timeDifference <= threeDays && timeDifference > oneDay) {
            alert(`Task "${task.title}" is due in 3 days.`);
        } else if (timeDifference <= oneDay && timeDifference > 0) {
            alert(`Task "${task.title}" is due tomorrow.`);
        } else if (timeDifference <= 0) {
            alert(`Task "${task.title}" is due today.`);
        }
    });
}

// Call this function periodically, e.g., once a day
setInterval(checkTaskNotifications, 24 * 60 * 60 * 1000); // Every 24 hours

// Function to display the username
function displayUsername() {
    const username = localStorage.getItem('username'); // Retrieve username from localStorage
    if (username) {
        document.getElementById('username-display').textContent = username; // Display username
    } else {
        document.getElementById('username-display').textContent = 'Guest'; // Default if no username found
    }
}

// Call the function to display the username on page load
window.onload = displayUsername;
