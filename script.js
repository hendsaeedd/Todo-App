
    const form = document.querySelector(".create-task-form");
    const formInput = document.querySelector("#create-task-input");
    const todoList = document.querySelector("#todo-list");
    const activeListItems = document.querySelector("#active-list");
    const completedList = document.querySelector("#completed-list");
    const listCount = document.querySelector("#item-count");
    const listCountMobile = document.querySelector("#item-count-mobile");
    const taskTemplate = document.querySelector("#task-template");

    const slides = document.querySelector("#slides");

    const clearCompletedTasksBtn = document.querySelector("#clear-completed-tasks");
    const clearCompletedBtnMobile = document.querySelector("#clear-completed-mobile");
    const showAllTasksBtn = document.querySelector("#show-all");
    const showCompletedTasksBtn = document.querySelector("#show-completed");
    const showActiveTasksBtn = document.querySelector("#show-active");

    const toggleModeCheckBox = document.querySelector("#change-mode-checkbox");
    const modeChangeIcon = document.querySelector(".mode-change-icon");

    
    const LOCAL_STORAGE_LIST_KEY = 'todo.lists';
    const LOCAL_STORAGE_LIST_ID_KEY = 'todo.listsId';
    let listItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
    let listItemId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY);

    modeChangeIcon.addEventListener('click', e => {
        if(toggleModeCheckBox.checked){
            document.body.classList.add("dark-mode");
            modeChangeIcon.innerHTML = "<img src='images/icon-sun.svg'>";
        } else {
            document.body.classList.remove("dark-mode");
            modeChangeIcon.innerHTML = "<img src='images/icon-moon.svg'>";
        }
    });


    todoList.addEventListener('click', e => {
        if(e.target.tagName.toLowerCase() === 'input'){
            const selectedTask = listItems.find(task => task.id === e.target.id)
            selectedTask.status = e.target.checked;
            saveAndRenderList();
        }
        if(e.target.classList.contains('delete')){
            listItems = listItems.filter(task => task.id !== e.target.id)
            console.log(e.target);
            saveAndRenderList();
        }
    });

    completedList.addEventListener('click', e => {
        if(e.target.tagName.toLowerCase() === 'input'){
            const selectedTask = listItems.find(task => task.id === e.target.id)
            selectedTask.status = e.target.checked;
            saveAndRenderList();
        }
        if(e.target.classList.contains('delete')){
            listItems = listItems.filter(task => task.id !== e.target.id)
            console.log(e.target);
            saveAndRenderList();
        }
    });

    activeListItems.addEventListener('click', e => {
        if(e.target.tagName.toLowerCase() === 'input'){
            const selectedTask = listItems.find(task => task.id === e.target.id)
            selectedTask.status = e.target.checked;
            saveAndRenderList();
        }
        if(e.target.classList.contains('delete')){
            listItems = listItems.filter(task => task.id !== e.target.id)
            console.log(e.target);
            saveAndRenderList();
        }
    });


    clearCompletedTasksBtn.addEventListener('click', e => {
        listItems = listItems.filter(task => !task.status);
        saveAndRenderList();
    })

    clearCompletedBtnMobile.addEventListener('click', e => {
        listItems = listItems.filter(task => !task.status);
        saveAndRenderList();
    })

    showAllTasksBtn.addEventListener('click', e => {
        slides.style.marginLeft = "0%";
    })

    showCompletedTasksBtn.addEventListener('click', e => {
        slides.style.marginLeft = "-200%";
    })

    showActiveTasksBtn.addEventListener('click', e => {
        slides.style.marginLeft = "-100%";
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = formInput.value;
        const listItem = makeListItem(task);
        formInput.value = "";

        listItems.push(listItem);
        
        saveAndRenderList();
        

    });

    function makeListItem(name){
        return({name: name, id: Date.now().toString(), status: false});
    }
    
    function saveAndRenderList(){
        saveList();
        renderList();
    }

    function saveList() {
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(listItems));
        localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, listItemId);
    }

    function renderList() {
        clearElements(todoList);
        listItems.forEach(listItem => {
            const list = document.importNode(taskTemplate.content, true);
            const checkBox = list.querySelector("input");
            checkBox.id = listItem.id;
            checkBox.checked = listItem.status;

            const label = list.querySelector("label")
            label.htmlFor = listItem.id;

            const deleteBtn =  list.querySelector(".delete");
            deleteBtn.id = listItem.id;

            const taskName = list.querySelector(".task-name");
            taskName.innerText = listItem.name;

            todoList.appendChild(list);
        });

        clearElements(completedList)
        const completeList = listItems.filter(task => task.status);
        completeList.forEach(item => {
            const completeTask = document.importNode(taskTemplate.content, true);
            
            const checkBox = completeTask.querySelector("input");
            checkBox.id = item.id;
            checkBox.checked = item.status;

            const label = completeTask.querySelector("label")
            label.htmlFor = item.id;

            const deleteBtn =  completeTask.querySelector(".delete");
            deleteBtn.id = item.id;

            const taskName = completeTask.querySelector(".task-name");
            taskName.innerText = item.name;

            completedList.appendChild(completeTask);
            
        });

        clearElements(activeListItems)
        const activeList = listItems.filter(task => !task.status);
        activeList.forEach(item => {
            const activeTask = document.importNode(taskTemplate.content, true);
            
            const checkBox = activeTask.querySelector("input");
            checkBox.id = item.id;
            checkBox.checked = item.status;

            const label = activeTask.querySelector("label")
            label.htmlFor = item.id;

            const deleteBtn =  activeTask.querySelector(".delete");
            deleteBtn.id = item.id;

            const taskName = activeTask.querySelector(".task-name");
            taskName.innerText = item.name;

            activeListItems.appendChild(activeTask);
            
        });
        

        renderListCount();
    }

    function renderListCount() {
        const incompleteTasks = listItems.filter(task => 
            !task.status).length;
        const taskString = incompleteTasks <= 1 ? "task" : "tasks";
        listCount.innerText = `${incompleteTasks} ${taskString} remaining`;
        listCountMobile.innerText = `${incompleteTasks} ${taskString} remaining`;
    }

    function clearElements(element) {
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    renderList();
