const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

let finalDate = 0;
let intervalId = 0;
let diff = 0;

if(localStorage.getItem("timer")){
    finalDate = localStorage.getItem("timer");
    intervalId = setInterval(timer, 1000);
}

function start(){
    let calendarDate = document.querySelector("section.config input").value;    
    finalDate = new Date(calendarDate).getTime();    
    localStorage.setItem("timer", finalDate)
    intervalId = setInterval(timer, 1000);
}

function timer(){
    let nowTime = new Date().getTime();

    diff = finalDate - nowTime;

    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour) + 3;
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / second);

    document.querySelector("section.emoji h1").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s.`

}

function stop(){
    document.querySelector("section.emoji h1").innerHTML = `&#x1F914`;
    clearInterval(intervalId);
    localStorage.removeItem("timer");
}