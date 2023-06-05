//* HTML elements

//value trackers
const displacement = document.getElementById('d-st');
const time = document.getElementById('t-st');
const velocity = document.getElementById('v-st');
const acceleration = document.getElementById('a-st');
const timerText = document.getElementById('t-st');
const mass = document.getElementById('w-st');

//buttons
const goBtn = document.getElementById('go-btn');
const resetBtn = document.getElementById('reset-btn');

resetBtn.classList.add('is-hovered');

//input fields
const gCheck = document.getElementById('g-check');
const arCheck = document.getElementById('a-check');
const arVal = document.getElementById('ar-input');
const mdVal = document.getElementById('md-input');
const wVal = document.getElementById('w-input');

//misc
const elem = document.getElementById('sc-standing');
const notif = document.getElementById('notif');

//* numerical values
const imgOffset = elem.offsetTop; //find y-pos of image in order to calculate displacement
const maxY = 690 + imgOffset; 
var msec = 0;
var sec = 0;
var min = 0; 
var totalMsec = 0;
var tmsc = 0;

//* parsed 
var di = parseInt(mdVal.value);
var m = parseInt(wVal.value);
var ar = parseInt(arVal.value);
var prevAr = 0;


//* booleans
var cancelled = false;
var finished = false;
var hasAr = false;
var madeGraph = false;

//* chart js
const vtGraph = document.getElementById('vt-graph');
const dyGraph = document.getElementById('dy-graph');
var labels = null;
var tvelo = [];
var myChart = null;


function myMove() {   
    //!setInterval methods for the falling image had been depreciated in order to properly calculate velocity
    var pos = imgOffset; //default position  of image (subject)
    //!var id = null;
    var timer = null;
    var meter = mdVal.value / 690;
    var frames = 0;

    msec = 0;
    sec = 0;
    min = 0;
    totalMsec = 0;

    //!clearInterval(id);
    //!clearInterval(timer);

    //!id = setInterval(frame, 10);  
    timer = setInterval(runTimer, 10);
    displayTime(0, 0, 0);

    finished = false;

    frame();

    function frame() {
        if (cancelled) {
            if(pos === maxY) {
                //things
                elem.style.top = imgOffset + 'px';

                //buttons
                goBtn.disabled = false;
                goBtn.classList.remove('is-hovered');
                resetBtn.disabled = true;
                resetBtn.classList.add('is-hovered');

                //value modifiers
                
                
                //misc
                cancelled = false;
            } else {
                //intervals
                //!clearInterval(id);
                clearInterval(timer);

                //thing
                elem.style.top = imgOffset + 'px';

                //buttons
                goBtn.disabled = false;
                goBtn.classList.remove('is-hovered');
                resetBtn.disabled = true;
                resetBtn.classList.add('is-hovered');

                //value modifiers
                displacement.textContent = di;
                velocity.textContent = 0;
                displayTime(0, 0, 0);
                
                //misc
                cancelled = false;
            }
        } else if (pos == maxY) {
            //intervals
            //!clearInterval(id);
            clearInterval(timer);

            //console logs
            console.log(pos === maxY);

            //booleans
            finished = true;

            //chart js
            makeVt();
        } else {
            //image modifiers
            pos++; 
            frames++;

            elem.style.top = pos + 'px'; 

            //value modifiers
            velocity.textContent = vf(accel(ar, m), (totalMsec / 1000)).toFixed(2);
            displacement.textContent = (di - (meter * frames)).toFixed(2);


            //buttons
            goBtn.disabled = true;
            goBtn.classList.add('is-hovered');
            resetBtn.disabled = false;
            resetBtn.classList.remove('is-hovered');

            //console logs
            //console.log(pos - imgOffset);
            id = setTimeout(frame, speed((vf(accel(ar, m), (totalMsec / 1000))) / (di / 100)));
        }
    }

    function runTimer() {
        msec++;
        totalMsec++;
        if (msec === 100) {
            msec = 0;
            sec++;

            if(sec === 60) {
                min++;
                sec = 0;
            }
        } 

        displayTime(min, sec, msec);
    }
}

//display time
function displayTime(m, s, ms) {
    if (m === 0 && s === 0 && ms === 0) {
        timerText.textContent = '00:00.00';
    } else {
        m = m < 10 ? '0' + m : m; //if m is less than ten, add a zero in front 
        s = s < 10 ? '0' + s : s;
        ms = ms < 10 ? '0' + ms : ms;
    
        timerText.textContent = m + ':' + s + '.' + ms;
    }
}

//boolean functions
function cancel() {
    if (cancelled) {
        cancelled = false;
    } else {
        cancelled = true;
    }

    if (finished && cancelled) {
        elem.style.top = imgOffset + 'px'; 
        cancelled = false;

        goBtn.disabled = false;
        goBtn.classList.remove('is-hovered');
        resetBtn.disabled = true;
        resetBtn.classList.add('is-hovered');

        displacement.textContent = di;
        velocity.textContent = 0;
        displayTime(0, 0, 0);
    }
}

function arChecked() {
    if (!hasAr) {
        hasAr = true;
        arVal.disabled = false;
    } else {
        hasAr = false;
        arVal.disabled = true;
        arVal.value = 0;
    }
    
    console.log(hasAr);
}

//equations
function vf(a, t) {
    return (a * t);
}

function accel(ar, m) {
    if (hasAr) {
        return ((m * 9.81) - ar) / m; //net accel => net force / mass => (mg - force of air resistance) / mass
    } else {
        return 9.81;
    } 
}

function speed(vf) {
    if (!isFinite(10 / vf) || (10 / vf) > 100)
        return 100;
    else
        return 10 / vf;
}

//submit function
function submitVals() {
    prevAr = ar;
    m = parseInt(wVal.value);
    ar = parseInt(arVal.value);
    di = parseInt(mdVal.value);

    if (((m * 9.81) - ar) <= 0) {
        notif.classList.remove('my-is-invisible-yay');
        ar = prevAr;
    }

    /*console.log(ar);
    console.log(((m * 9.81) - ar) / m);
    console.log(accel(ar, m)); */
    acceleration.textContent = accel(ar, m).toFixed(2);
    mass.textContent = m;
    displacement.textContent = di;
    //console.log('submitted!');

    console.log(ar);
}

//track mouse position for testing and improving functionality
document.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;
    var txt = e.target.title = "X is " + x + " and Y is " + y;

    //!console.log(txt);
} 

//remove notif
function removeNotif() {
    notif.classList.add('my-is-invisible-yay');
}

//* chart.js code here
function makeVt() {
    tvelo = [];
    tmsc = totalMsec;
    labels = [0, tmsc, tmsc * 2, tmsc * 3, tmsc * 4, tmsc * 5, tmsc * 6, tmsc * 7, tmsc * 8, tmsc * 9, tmsc * 10];
    console.log(labels);

    for (var i = 0; i < labels.length; i++) {
        tvelo.push(vf(accel(ar, m), labels[i] / 10000).toFixed(2));
    }

    console.log(tvelo);

    if(madeGraph) {
        myChart.destroy();

        myChart = new Chart(vtGraph, {
            type: 'line',
    
            data: {
                labels: labels,
        
                datasets: [{
                    label: 'Velocity-Time Graph',
                    data: tvelo,
                    fill: false,
                    borderColor: 'rgb(238, 246, 252)',
                    tension: 0.1
                }]
            },
    
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (ms)'
                        }
                    },
    
                    y: {
                        title: {
                            display: true,
                            text: 'Velocity (m/s)'
                        },
    
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        myChart = new Chart(vtGraph, {
            type: 'line',
    
            data: {
                labels: labels,
        
                datasets: [{
                    label: 'Velocity-Time Graph',
                    data: tvelo,
                    fill: false,
                    borderColor: 'rgb(238, 246, 252)',
                    tension: 0.1
                }]
            },
    
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (ms)'
                        }
                    },
    
                    y: {
                        title: {
                            display: true,
                            text: 'Velocity (m/s)'
                        },
    
                        beginAtZero: true
                    }
                }
            }
        });
            
        madeGraph = true;
    }
}