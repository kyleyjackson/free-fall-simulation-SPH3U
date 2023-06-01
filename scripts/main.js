//* HTML elements

//value trackers
const displacement = document.getElementById('d-st');
const time = document.getElementById('t-st');
const velocity = document.getElementById('v-st');
const acceleration = document.getElementById('a-st');

//buttons
const goBtn = document.getElementById('go-btn');
const resetBtn = document.getElementById('reset-btn');
const pauseBtn = document.getElementById('pause-btn');

resetBtn.classList.add('is-hovered');
pauseBtn.classList.add('is-hovered');

//input fields
const gCheck = document.getElementById('g-check');
const arCheck = document.getElementById('a-check');
const arVal = document.getElementById('ar-input');
const mdVal = document.getElementById('md-input');
const wVal = document.getElementById('w-input');

//misc
const elem = document.getElementById("sc-standing");

//* numerical values
const imgOffset = elem.offsetTop; //find y-pos of image in order to calculate displacement
const maxY = 690 + imgOffset; //*864px 
console.log(maxY);

//* booleans
var cancelled = false;
var paused = false;
var finished = false;
var hasAr = false;


function myMove() {   
    var pos = imgOffset; //default position  of image (subject)
    var id = null;
    var timer = null;
    var meter = mdVal.value / 690;
    var frames = 0;

    //values
    var di = parseInt(mdVal.value);
    var m = parseInt(wVal);

    clearInterval(id);
    id = setInterval(frame, 10);

    clearInterval(timer);
    timer = setInterval(runTimer, 1000);

    finished = false;

    function frame() {
        if (paused) {
            //image modifiers
            clearInterval(id);

            //buttons
            goBtn.disabled = true;
            goBtn.classList.add('is-hovered');
            resetBtn.disabled = false;
            resetBtn.classList.remove('is-hovered');
            pauseBtn.disabled = true;
            pauseBtn.classList.add('is-hovered');

            //misc
            paused = true;
            cancelled = false;
        } else if (cancelled) {
            if(pos === maxY) {
                elem.style.top = imgOffset + 'px';

                //buttons
                goBtn.disabled = false;
                goBtn.classList.remove('is-hovered');
                resetBtn.disabled = true;
                resetBtn.classList.add('is-hovered');
                pauseBtn.disabled = true;
                pauseBtn.classList.add('is-hovered');

                //value modifiers
                displacement.textContent = di;
                
                //misc
                cancelled = false;
            } else {
                //image modifiers
                clearInterval(id);
                elem.style.top = imgOffset + 'px';

                //buttons
                goBtn.disabled = false;
                goBtn.classList.remove('is-hovered');
                resetBtn.disabled = true;
                resetBtn.classList.add('is-hovered');
                pauseBtn.disabled = true;
                pauseBtn.classList.add('is-hovered');

                //value modifiers
                displacement.textContent = di;
                
                //misc
                cancelled = false;
            }
        } else if (pos == maxY) {
            //image modifiers
            clearInterval(id);

            //buttons
            pauseBtn.disabled = true;
            pauseBtn.classList.add('is-hovered');

            //console logs
            console.log(pos === maxY);

            //booleans
            finished = true;
        } else {
            //image modifiers
            pos++; 
            frames++;
            elem.style.top = pos + 'px'; 

            //value modifiers
            displacement.textContent = (di - (meter * frames)).toFixed(2);
            velocity.textContent = vf()
            acceleration.textContent = accel();


            //buttons
            goBtn.disabled = true;
            goBtn.classList.add('is-hovered');
            resetBtn.disabled = false;
            resetBtn.classList.remove('is-hovered');
            pauseBtn.disabled = false;
            pauseBtn.classList.remove('is-hovered');

            //console logs
            //console.log(pos - imgOffset);
        }
    }

    function runTimer() {
        
    }
}

//boolean functions
function cancel() {
    if (finished && cancelled) {
        elem.style.top = imgOffset + 'px'; 
        cancelled = false;

        goBtn.disabled = false;
        goBtn.classList.remove('is-hovered');
        resetBtn.disabled = true;
        resetBtn.classList.add('is-hovered');
    } else if (cancelled) {
        cancelled = false;
    } else {
        cancelled = true;
    }

    if (paused) {
        paused = false;
        elem.style.top = imgOffset + 'px';

        //buttons
        goBtn.disabled = false;
        goBtn.classList.remove('is-hovered');
        resetBtn.disabled = true;
        resetBtn.classList.add('is-hovered');
        pauseBtn.disabled = true;
        pauseBtn.classList.add('is-hovered');

        //value modifiers
        displacement.textContent = di;
    }
}

function isPaused() {
    if (paused) {
        paused = false;
    } else {
        paused = true;
    }
}

function arChecked() {
    if (!hasAr) {
        hasAr = true;
        arVal.disabled = false;
    } else {
        hasAr = false;
        arVal.disabled = true;
    }
}

//track mouse position for testing and improving functionality
/*document.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;
    var txt = e.target.title = "X is " + x + " and Y is " + y;

    //!console.log(txt);
} */

//equations
function vf(a, t) {
    return (a * t);
}

function accel(ar, m) {
    return ((m * 9.81) - ar) / m;
}

//submit function
function submitVals() {
    //console.log('submitted!');

}