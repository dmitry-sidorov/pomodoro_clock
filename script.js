$(document).ready(() => {
  //initialization
  var status = {
    state: "session",
    started: false,
    paused: false,
    timerValue: 25*60
  }
  var set = {
    sessionLength: 2*60,
    breakLength: 1*60
  }
  var count = {
    sessions: 0,
    breaks: 0
  }

  var speed = 20;

// session length time
  refreshTimerValue();
  refreshSessionLengthTime();

  $('.session-length.decrease').on('click', (e) => {
    set.sessionLength = fixRange(set.sessionLength - 60);
    refreshSessionLengthTime();
  });

  $('.session-length.increase').on('click', (e) => {
    set.sessionLength = fixRange(set.sessionLength + 60);
    refreshSessionLengthTime();
  });

  function refreshSessionLengthTime() {
    $('.session-length.time').text(getMinutes(set.sessionLength));
  }

// break length time
refreshBreakLengthTime();

$('.break-length.decrease').on('click', (e) => {
  set.breakLength = fixRange(set.breakLength - 60);
  refreshBreakLengthTime();
});

$('.break-length.increase').on('click', (e) => {
  set.breakLength = fixRange(set.breakLength + 60);
  refreshBreakLengthTime();
});

function refreshBreakLengthTime() {
  $('.break-length.time').text(getMinutes(set.breakLength));
}

// pause button
$('.pause').on('click', (e) => {
  pause();
});

var blink;
function pause() {
  if (!status.paused) {
    clearInterval(loop);
    status.paused = true;
    blink = setInterval(function() {
      $(".timer-value").fadeTo(300, 0.1).fadeTo(300, 1.0);
      $(".pause").fadeTo(300, 0.1).fadeTo(300, 1.0);
    }, 600);
  } else {
    start();
    clearInterval(blink);
    status.paused = false;
    refreshStatus();
  }
}

//start button
$('.start').on('click', (e) => {
  if (!status.started) {
    start();
  }
});

//stop button
$('.stop').on('click', (e) =>{
  stop();
});

//refresh button
$('.refresh').on('click', (e) => {
  stop();
  count.sessions = 0;
  refreshSessionCounter();
  count.breaks = 0;
  refreshBreakCounter();
});


refreshTimerValue();
// $('.timer-value').text(toTime(getMinutes(sessionLength), getSeconds(sessionLength)));

var loop;
function start() {
  refreshStatus();
  if (!status.started) {
    status.timerValue = set.sessionLength;
  }
  status.started = true;
  loop = setInterval(function() {
    status.timerValue -= 1;
    refreshTimerValue();
    checkEnd();
  }, 1000/speed);
}

function stop() {
  status.started = false;
  status.paused = false;
  status.state = "session";
  status.timerValue = set.sessionLength;
  refreshTimerValue();
}

function refreshTimerValue() {
  if (!status.started) {
    switch (status.state) {
      case "session": status.timerValue = set.sessionLength;
      break;
      case "break": status.timerValue = set.breakLength;
      default: return "timer value refresh failed";
    }
  }
  $('.timer-value').text(toTime(status.timerValue));
}

function checkEnd() {
  if (status.timerValue == 0) {
    if (status.state == "session") {
      status.state = "break";
      status.timerValue = set.breakLength;
      count.sessions += 1;
      refreshSessionCounter();
      // $('.status').text(status.state.capitalize());
      refreshStatus();
    } else {
      status.state = "session";
      status.timerValue = set.sessionLength;
      count.breaks += 1;
      refreshBreakCounter();
      // $('.status').text(status.state.capitalize());
      refreshStatus();
    }
  }
}

function refreshSessionCounter() {
  $('.session-counter').text(count.sessions);
}

function refreshBreakCounter() {
  $('.break-counter').text(count.breaks);
}

function getMinutes(seconds) {
  return Math.floor(seconds / 60);
}

function getSeconds(seconds) {
  return (seconds % 60);
}

function toTime(time) {
  return (addZero(getMinutes(time)) + ":" + addZero(getSeconds(time)));
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


function refreshStatus() {
  $('.status').text(status.state.capitalize());
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
});
