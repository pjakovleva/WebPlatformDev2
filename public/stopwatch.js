// Defining variables that hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

// Defining variables that hold display values
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

// Defining a variable that holds the setInterval() function
let interval = null;

// Defining a variable that holds stopwatch status
let status = 'stopped';

// Stopwatch function 
function stopWatch(){

    seconds++;

    // Logic that determines when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

    }

    // Logic that adds a leading 0 to the value of seconds/minutes/hours that are only one digit
    if(seconds < 10){
        displaySeconds = '0' + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = '0' + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = '0' + hours.toString();
    }
    else{
        displayHours = hours;
    }

    document.getElementById('display').innerHTML = displayHours + ':' + displayMinutes + ':' + displaySeconds;

}


// Stopwatch start/stop function
function startStop(){
    if(status === 'stopped'){
        // Starting the stopwatch by calling the setInterval() function
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById('startStop').innerHTML = 'Stop';
        status = 'started';
    }
    else{
        window.clearInterval(interval);
        document.getElementById('startStop').innerHTML = 'Start';
        status = 'stopped';

    }
}

// Stopwatch reset function
function reset(){
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('display').innerHTML = '00:00:00';
    document.getElementById('startStop').innerHTML = 'Start';
}
