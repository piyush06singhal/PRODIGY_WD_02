let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 10);
    running = true;
    startStopBtn.innerHTML = 'Stop';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function stopStopwatch() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = 'Start';
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    display.innerHTML = '00:00:00.00';
    laps.innerHTML = '';
    lapNumber = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function recordLap() {
    lapNumber++;
    const lapTime = document.createElement('li');
    lapTime.innerHTML = `Lap ${lapNumber}: ${display.innerHTML}`;
    laps.appendChild(lapTime);
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
