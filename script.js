$(document).ready(() => {
  //initialization
  var sessionPaused = false;
  var sessionStarted = false;
  var sessionLength = 25*60;
  var breakLength = 5*60;


// session length time
  // refreshSessionLengthTime();

  $('.session-length.decrease').on('click', (e) => {
    sessionLength = fixRange(sessionLength - 60);
    refreshSessionLengthTime();
  });

  $('.session-length.increase').on('click', (e) => {
    sessionLength = fixRange(sessionLength + 60);
    refreshSessionLengthTime();
  });

  function refreshSessionLengthTime() {
    $('.session-length.time').text(getMinutes(sessionLength));
  }

// break length time
// refreshBreakLengthTime();

$('.break-length.decrease').on('click', (e) => {
  breakLength = fixRange(breakLength - 60);
  refreshBreakLengthTime();
});

$('.break-length.increase').on('click', (e) => {
  breakLength = fixRange(breakLength + 60);
  refreshBreakLengthTime();
});

function refreshBreakLengthTime() {
  $('.break-length.time').text(getMinutes(breakLength));
}

// pause button
$('.pause').on('click', (e) => {
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

//start button
$('.start-session').on('click', (e) => {
  if (!sessionStarted) {
    startSession();
  }
});

$('.timer-value').text(toTime(getMinutes(sessionLength), getSeconds(sessionLength)));
var loop;
function startSession() {
      sessionStarted = true;
      loop = setInterval(function() {
      sessionLength -= 1;
      refreshTimerValue();
    }, 1000);
}

function refreshTimerValue() {
  $('.timer-value').text(toTime(getMinutes(sessionLength), getSeconds(sessionLength)));
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
});
