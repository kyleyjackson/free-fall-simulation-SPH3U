//HTML elements
const goButton = document.getElementById('go-button');
const velocityDisplay = document.getElementById('velo');
const accelerationDisplay = document.getElementById('accel');
const displacementDisplay = document.getElementById('displace');
const elem = document.getElementById('animate'); 
const gravCheck = document.getElementById('grav-check');
const null1 = 'null' + 1;

//!main functions
function myMove() {
  let id;  
  let pos = 0; //position of the bottom of the object (350 max since animation-container's height is 400px)
  let interval = 5; //essentially sets the 'velocity' of the object (framerate)

  clearInterval(id);
  id = setInterval(frame, interval); 

  goButton.classList.add('not-visible');
  console.log(gravCheck.checked); //checking if the gravity checkbox is checked

  function frame() {
    if (pos == 350) {  //when the object has hit the bottom
      clearInterval(id);
      console.log('done');
      goButton.classList.remove('not-visible');
    } else {
      pos++; 
      elem.style.top = pos + "px"; 
      console.log(pos);
      displacementDisplay.textContent = (pos / 3.5).toFixed(2);
      velocityDisplay.textContent = 9.81;
      accelerationDisplay.textContect = 9.81;
    }
  }
}

//!logic functions
function determineNull(a, vi, vf, t) {
  if(a === null) {
    a = null1;
    determineNull(a, vi, vf, t);
  } else if(vi === null) {
    vi = null1;
    determineNull(a,  vi, vf, t);
  } else if(vf === null) {
    vf = null1;
    determineNull(a, vi, vf, t);
  } else if(t === null) {
    t = null1;
    determineNull(a,  vi, vf, t);
  } else {
    return a + '-' + vi + '-' + vf + '-' + t;
  }
}

function determineEquation(a, vi, vf, t) {

}

//!kinematic equation functions

