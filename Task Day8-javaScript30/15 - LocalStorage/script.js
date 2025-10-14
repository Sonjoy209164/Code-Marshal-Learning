const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const alarmSound = document.getElementById("alarm-sound");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item priority-${task.priority}`;
    li.innerHTML = `
      <div class="task-header">
        <span class="task-title">${task.name}</span>
        <div class="task-actions">
          <button onclick="startTask(${index})">▶ Start</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      </div>
      <div class="task-meta">📅 ${task.date} | 🔥 ${task.priority}</div>
      ${task.remaining ? `<div class="timer">⏱ ${formatTime(task.remaining)}</div>` : ""}
    `;
    taskList.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("task-name").value.trim();
  const date = document.getElementById("task-date").value;
  const priority = document.getElementById("task-priority").value;
  const duration = Number(document.getElementById("task-duration").value) || 0;

  const newTask = {
    name,
    date,
    priority,
    duration,
    remaining: duration * 60,
    active: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  form.reset();
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

let timerInterval = null;

function startTask(index) {
  const task = tasks[index];
  if (task.active) return alert("Task already running!");

  task.active = true;
  saveTasks();

  timerInterval = setInterval(() => {
    if (task.remaining > 0) {
      task.remaining--;
      renderTasks();
    } else {
      clearInterval(timerInterval);
      task.active = false;
      alarmSound.play();
      alert(`⏰ Time up for: ${task.name}`);
    }
    saveTasks();
  }, 1000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

renderTasks();
