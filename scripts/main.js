//HTML elements
const goButton = document.getElementById('go-button');
const velocityDisplay = document.getElementById('velo');
const accelerationDisplay = document.getElementById('accel');
const displacementDisplay = document.getElementById('displace');
const elem = document.getElementById("animate"); 

//main functions
function myMove() {
  let id;  
  let pos = 0; //position of the bottom of the object (350 max since animation-container's height is 400px)
  let interval = 5; //essentially sets the 'velocity' of the object (framerate)

  clearInterval(id);
  id = setInterval(frame, interval); 

  goButton.classList.add('not-visible')

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
