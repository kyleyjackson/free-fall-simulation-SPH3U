//* HTML elements

//value trackers
const displacement = document.getElementById('d-st');
const time = document.getElementById('t-st');
const velocity = document.getElementById('v-st');
const acceleration = document.getElementById('d-st');

//buttons
const goBtn = document.getElementById('go-btn');
const resetBtn = document.getElementById('reset-btn');
const pauseBtn = document.getElementById('pause-btn');

resetBtn.classList.add('is-hovered');
pauseBtn.classList.add('is-hovered');

//input fields
const gCheck = document.getElementById('g-check');
const arCheck = document.getElementById('ar-check');
const arVal = document.getElementById('ar-input');
const mdVal = document.getElementById('md-input');
const wVal = document.getElementById('w-input');
const csaVal = document.getElementById('csa-input');

//misc
const elem = document.getElementById("sc-standing");

//* numerical values
const imgOffset = elem.offsetTop; //find y-pos of image in order to calculate displacement
const maxY = 690 + imgOffset; //*864px 
console.log(maxY);

//* booleans
var cancelled = false;
var paused = false;


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
            goBtn.disabled = false;
            goBtn.classList.remove('is-hovered');
            resetBtn.disabled = true;
            resetBtn.classList.add('is-hovered');
            pauseBtn.disabled = true;
            pauseBtn.classList.add('is-hovered');

            //console logs
            console.log(pos === maxY);
        } else {
            //image modifiers
            pos++; 
            frames++;
            elem.style.top = pos + 'px'; 

            //value modifiers
            displacement.textContent = (di - (meter * frames)).toFixed(2);
            velocity.textContent = 


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

function cancel() {
    if (cancelled) {
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

//track mouse position for testing and improving functionality
/*document.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;
    var txt = e.target.title = "X is " + x + " and Y is " + y;

    //!console.log(txt);
} */

//kinematic equations
function vf(vi, a, t) {

    return vi + (a * t);
}

function accel(vi, vf, t) {
    return (vf - vi) / t;
}

//submit function
function submitVals() {
    //console.log('submitted!');

}