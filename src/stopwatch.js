/* holds stopwatch function */
function Stopwatch(id){

    var that = this;

    var startTime = 0;
    var pausedAt = 0;

    this.elt = document.getElementById(id);
    this.elt.innerHTML = "<span id='time'>00:00:00:000</span> \
      <button id='start' name='start'>Start</button> \
      <button id='pause' name='pause'>Pause</button> \
      <button id='clear' name='clear'>Clear</button>";

    this.timeElt = document.getElementById('time');
    this.buttonStartElt = document.getElementById('start');
    this.buttonPauseElt = document.getElementById('pause');
    this.buttonClearElt = document.getElementById('clear');

    //* Event handlers *//
    /* Start button */
    this.buttonStartElt.addEventListener("click", function(){
        that.start();
    })

    /* Pause button */
    this.buttonPauseElt.addEventListener('click', function() {
        that.pause();
    })

    /* Clear Button */
    this.buttonClearElt.addEventListener("click", function(){
        that.clear();
    });

    this.start = function() {
        console.log(startTime, pausedAt);
        if(!startTime) {
          startTime = Date.now();
        }
        if(pausedAt) {
          startTime = Date.now() - (pausedAt - startTime);
        }
        that.updateTimeField();
    }

    this.pause = function() {
        window.clearInterval(that.timer);
        pausedAt = Date.now();
    }

    this.clear = function() {
        window.clearInterval(that.timer);
        pausedAt = 0;
        startTime = 0;
        that.timeElt.textContent = that.convertMsToTime(0);
    }

    this.updateTimeField = function(startTime) {
        that.timer = window.setInterval(function() {
          that.timeElt.textContent = that.convertMsToTime(that.getTimeDiff());
        }, 10);
    }

    /* e.g 6 will convert to 00:00:00:006 */
    this.convertMsToTime = function(duration){
        var milliseconds = parseInt((duration%1000)),
            seconds = parseInt((duration/1000)%60),
            minutes = parseInt((duration/(1000*60))%60),
            hours = parseInt((duration/(1000*60*60))%24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
            milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
    }

    this.getTimeDiff = function() {
        return Date.now() - startTime;
    }

}
