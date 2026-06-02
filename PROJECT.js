// To-Do List

let completedTasks = 0;

function addTask(){

    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value;

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        ${taskText}
        <div>
            <button onclick="completeTask(this)">✓</button>
            <button class="delete-btn" onclick="deleteTask(this)">X</button>
        </div>
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}

function deleteTask(button){

    button.parentElement.parentElement.remove();

    updateProgress();
}

function completeTask(button){

    button.parentElement.parentElement.style.textDecoration = "line-through";

    completedTasks++;

    updateProgress();
}

function updateProgress(){

    let totalTasks = document.querySelectorAll("#taskList li").length;

    let progress = 0;

    if(totalTasks > 0){
        progress = (completedTasks / totalTasks) * 100;
    }

    document.querySelector(".progress").style.width = progress + "%";

    document.getElementById("progressText").innerText = completedTasks + " Tasks Completed";
}

// Pomodoro Timer

let time = 1500;
let timerRunning = false;
let interval;

function updateTimer(){

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerText = `${minutes}:${seconds}`;
}

function startTimer(){

    if(timerRunning) return;

    timerRunning = true;

    interval = setInterval(() => {

        if(time > 0){
            time--;
            updateTimer();
        }
        else{
            clearInterval(interval);
            alert("Pomodoro Session Completed");
        }

    },1000);
}

function pauseTimer(){

    clearInterval(interval);

    timerRunning = false;
}

function resetTimer(){

    clearInterval(interval);

    timerRunning = false;

    time = 1500;

    updateTimer();
}

// Notes Section

function saveNotes(){

    let notes = document.getElementById("notes").value;

    localStorage.setItem("studentNotes", notes);

    alert("Notes Saved Successfully");
}

window.onload = function(){

    let savedNotes = localStorage.getItem("studentNotes");

    if(savedNotes){
        document.getElementById("notes").value = savedNotes;
    }
}

// Dark Mode

let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeBtn.innerText = "Dark Mode";
    }
    else{
        themeBtn.innerText = "Light Mode";
    }
});
