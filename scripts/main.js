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

//input fields
const gCheck = document.getElementById('g-check');
const arCheck = document.getElementById('ar-check');
const arVal = document.getElementById('ar-val');

//misc
const elem = document.getElementById("sc-standing");


resetBtn.classList.add('is-hovered');
pauseBtn.classList.add('is-hovered');

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
    var di = displacement.textContent;

    clearInterval(id);
    id = setInterval(frame, 2);

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
            
            //misc
            cancelled = false;
        } else if (pos == maxY) {
            //image modifiers
            clearInterval(id);

            //buttons
            goBtn.disabled = false;
            goBtn.classList.remove('is-hovered');

            //console logs
            console.log(pos === maxY);
        } else {
            //image modifiers
            pos++; 
            elem.style.top = pos + 'px'; 

            //value modifiers
            displacement.textContent = parseInt(di) - (parseInt(di) / 690).toFixed(2);
            velocity.textContent = 


            //buttons
            goBtn.disabled = true;
            goBtn.classList.add('is-hovered');
            resetBtn.disabled = false;
            resetBtn.classList.remove('is-hovered');
            pauseBtn.disabled = false;
            pauseBtn.classList.remove('is-hovered');

            //console logs
            console.log(pos - imgOffset);
        }
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

function d()

