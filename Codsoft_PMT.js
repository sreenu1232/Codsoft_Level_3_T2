let projects = [];

function createProject() {
    const projectName = document.getElementById("project-name").value;
    if (!projectName) return;

    const newProject = {
        id: Date.now(),
        name: projectName,
        tasks: []
    };

    projects.push(newProject);
    document.getElementById("project-name").value = "";
    renderProjects();
}

function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";

    projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");

        const projectTitle = document.createElement("h2");
        projectTitle.innerText = project.name;
        projectElement.appendChild(projectTitle);

        const taskForm = document.createElement("div");
        taskForm.classList.add("task-form");

        const taskNameInput = document.createElement("input");
        taskNameInput.placeholder = "Task Name";
        taskForm.appendChild(taskNameInput);

        const taskDeadlineInput = document.createElement("input");
        taskDeadlineInput.type = "date";
        taskForm.appendChild(taskDeadlineInput);

        const addTaskButton = document.createElement("button");
        addTaskButton.innerText = "Add Task";
        addTaskButton.onclick = () => addTask(project.id, taskNameInput, taskDeadlineInput);
        taskForm.appendChild(addTaskButton);

        projectElement.appendChild(taskForm);

        const taskList = document.createElement("div");
        project.tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            const taskName = document.createElement("p");
            taskName.innerText = `${task.name} (Deadline: ${task.deadline})`;
            taskElement.appendChild(taskName);

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.onclick = () => deleteTask(project.id, task.id);
            taskElement.appendChild(deleteButton);

            taskList.appendChild(taskElement);
        });

        projectElement.appendChild(taskList);
        projectsContainer.appendChild(projectElement);
    });
}

function addTask(projectId, taskNameInput, taskDeadlineInput) {
    const project = projects.find(p => p.id === projectId);
    if (!taskNameInput.value || !taskDeadlineInput.value) return;

    const newTask = {
        id: Date.now(),
        name: taskNameInput.value,
        deadline: taskDeadlineInput.value
    };

    project.tasks.push(newTask);
    taskNameInput.value = "";
    taskDeadlineInput.value = "";
    renderProjects();
}

function deleteTask(projectId, taskId) {
    const project = projects.find(p => p.id === projectId);
    project.tasks = project.tasks.filter(task => task.id !== taskId);
    renderProjects();
}
