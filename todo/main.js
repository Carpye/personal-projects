// variables

let addTaskInput = document.getElementById("add_task");
let submitTaskInput = document.getElementById("submit_task");
let clearListInput = document.getElementById("clear_list");
let taskValue = "";
let tasksList = document.getElementById("tasks_list");
let doneBtn = document.getElementsByClassName("done_btn");
let removeBtn = document.querySelectorAll(".remove_btn");
let taskNumber = 1;
let squareT = document.querySelector(".T");
let squareA = document.querySelector(".A");


let totalTasks = 0;
let activeTasks = 0;

// event listeners
    // "enter" task
addTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
            taskValue = addTaskInput.value;
        if (taskValue) {
            createTask(taskValue);
            addTaskInput.value = "";
        }
    }
});
    // submit task
submitTaskInput.addEventListener("click", () => {
    taskValue = addTaskInput.value;
    if (taskValue) {
        createTask(taskValue);
        addTaskInput.value = "";
    }
});

    // clear list
clearListInput.addEventListener("click",clearList);

    // task options
tasksList.addEventListener("click", function(e){

        // done button
    if (e.target.classList.contains("done_btn")) {
        console.log("done button");
        let taskChild = e.target.parentElement.childNodes;
        taskChild[1].classList.toggle("done");
            if (taskChild[1].classList.contains("done")) {
                activeTasks--;
            }
            else{
                activeTasks++;
            }
        updateCounters()


    }
    
        // remove button
    if (e.target.classList.contains("remove_btn")) {
        console.log("remove button");
        if (!e.target.parentElement.childNodes[1].classList.contains("done")) {
            activeTasks--;
        }
        totalTasks--;
        updateCounters()
        e.target.parentElement.addEventListener("transitionend", () => {
            e.target.parentElement.remove();
            console.log("task removed");
            taskNumber--;
        });


        let anim = getRandomInt(-1,2);
            if (anim) {
                e.target.parentElement.classList.toggle("leftAnim");
            }       
            else{
                e.target.parentElement.classList.toggle("rightAnim");
            }
    }
});

function createTask(text) {
    tasksList.innerHTML += `
        <div class="task task${taskNumber}">
            <span>${text}</span>
            <button class="done_btn">\u2714</button><button class="remove_btn">\u2716</button>
        </div>`
    taskNumber++;
    totalTasks++;
    activeTasks++;
    updateCounters()
}

function clearList() {
    tasksList.innerHTML = "";
    taskNumber = 1;
    totalTasks = 0;
    activeTasks = 0;
    updateCounters()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function updateCounters() {
    squareT.innerHTML = `Total Tasks: ${totalTasks}`;
    squareA.innerHTML = `Active Tasks: ${activeTasks}`;
    console.log("counters updated");
}

setInterval(() => {
    console.log(activeTasks);
}, 1000);