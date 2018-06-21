// initialization
var sessionPaused = false;
var sessionStarted = false;
var sessionLength = 25*60;
var breakLength = 5*60;


// session length time
var sessionLengthTime = document.querySelector('.session-length.time');
refreshSessionLengthTime();

var sessionLengthDecrease = document.querySelector('.session-length.decrease');
sessionLengthDecrease.addEventListener('click', (e) => {
  sessionLength = fixRange(sessionLength - 60);
  refreshTimerValue();
  refreshSessionLengthTime();
});

var sessionLengthIncrease = document.querySelector('.session-length.increase');
sessionLengthIncrease.addEventListener('click', (e) => {
  sessionLength = fixRange(sessionLength + 60);
  refreshTimerValue();
  refreshSessionLengthTime();
});

function refreshSessionLengthTime() {
  sessionLengthTime.textContent = getMinutes(sessionLength);
}

// break length time
var breakLengthTime = document.querySelector('.break-length.time');
refreshBreakLengthTime();

var breakLengthDecrease = document.querySelector('.break-length.decrease');
breakLengthDecrease.addEventListener('click', (e) => {
  breakLength = fixRange(breakLength - 60);
  refreshTimerValue();
  refreshBreakLengthTime();
});

var breakLengthIncrease = document.querySelector('.break-length.increase');
breakLengthIncrease.addEventListener('click', (e) => {
  breakLength = fixRange(breakLength + 60);
  refreshTimerValue();
  refreshBreakLengthTime();
});

function refreshBreakLengthTime() {
  breakLengthTime.textContent = getMinutes(breakLength);
}

// pause
var pauseButton = document.querySelector('.pause');
pauseButton.addEventListener('click', (e) => {
  pauseTimer();
});

function pauseTimer() {
  if (sessionPaused == false) {
    clearInterval(loop);
    sessionStarted = false;
    sessionPaused == true;
  } else {
    startSession();
    sessionPaused = false;
  }
}

var startButton = document.querySelector('.start-session');
startButton.addEventListener('click', (e) => {
  if (!sessionStarted) {
    startSession();
  }
});

var timerValue = document.querySelector('.timer-value');
timerValue.textContent = toTime(getMinutes(sessionLength), getSeconds(sessionLength));
var loop;
function startSession() {
  // var timerValue = document.querySelector('.timer-value');
      sessionStarted = true;
      loop = setInterval(function() {
      sessionLength -= 1;
      refreshTimerValue();
    }, 1000);
}

function refreshTimerValue() {
  timerValue.textContent = toTime(getMinutes(sessionLength), getSeconds(sessionLength));
}

function getMinutes(seconds) {
  return Math.floor(seconds / 60);
}

function getSeconds(seconds) {
  return (seconds % 60);
}

function toTime(minutes, seconds) {
  return (addZero(minutes) + ":" + addZero(seconds));
}

function addZero(string) {
  if (typeof string != "string") {
    string = string.toString();
  }
  if (string.length == 1) {
    return ("0" + string);
  } else
      return string;
}

function fixRange(time) {
  return (time > 59*60 ? 60 : (time < 60 ? 59*60 : time));
}
