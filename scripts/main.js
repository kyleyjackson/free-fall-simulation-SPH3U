//* HTML elements
const elem = document.getElementById("sc-standing");
const displacement = document.getElementById('d-st');
const time = document.getElementById('t-st');
const velocity = document.getElementById('v-st');
const acceleration = document.getElementById('d-st');

const dVal = document.getElementById

//* numerical values
const imgOffset = elem.offsetTop; //find y-pos of image in order to calculate displacement
var displaceY = 0;
var maxY = 0;



function myMove() {   
    var pos = imgOffset; //defaukt position  of image (subject)
    var id = null;

    maxY = imgOffset + parseInt();

    clearInterval(id);
    id = setInterval(frame, 10);

    function frame() {
        if (pos == maxY) {
            clearInterval(id);
        } else {
            pos++; 
            elem.style.top = pos + 'px'; 
            console.log(pos);
        }
    }
}

//track mouse position for testing and improving functionality
document.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;
    var txt = e.target.title = "X is " + x + " and Y is " + y;

    //!console.log(txt);
}