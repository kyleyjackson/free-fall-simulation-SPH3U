//* HTML elements
const elem = document.getElementById("sc-standing");
const displacement = document.getElementById('d-st');
const time = document.getElementById('t-st');
const velocity = document.getElementById('v-st');
const acceleration = document.getElementById('d-st');
const goBtn = document.getElementById('go-btn');
const resetBtn = document.getElementById('reset-btn');

const dVal = document.getElementById

//* numerical values
const imgOffset = elem.offsetTop; //find y-pos of image in order to calculate displacement
const maxY = 690 + imgOffset; //*864px 
console.log(maxY);

//* booleans
var cancelled = false;
resetBtn.disabled = true;


function myMove() {   
    var pos = imgOffset; //defaukt position  of image (subject)
    var id = null;

    clearInterval(id);
    id = setInterval(frame, 10);

    function frame() {
        if (cancelled === true) {
            clearInterval(id);
            cancelled = false;
            elem.style.top = imgOffset + 'px';
            goBtn.disabled = false;
            resetBtn.disabled = true;
        } else if (pos == maxY) {
            clearInterval(id);

            goBtn.disabled = false;
        } else {
            pos++; 
            elem.style.top = pos + 'px'; 
            console.log(pos - imgOffset);
            goBtn.disabled = true;
            resetBtn.disabled = false;
        }
    }
}

function cancel() {
    if (cancelled) {
        cancelled = false;
    } else {
        cancelled = true;
    }
}

//track mouse position for testing and improving functionality
document.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;
    var txt = e.target.title = "X is " + x + " and Y is " + y;

    //!console.log(txt);
}