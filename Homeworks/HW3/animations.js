window.onload = function() {
    document.getElementsByClassName("time")[0].animate([
        // keyframes
        { transform: 'translateX(0px) translateY(-25px)' },
        { transform: 'translateX(+25px)' },
        { transform: 'translateX(-25px) translateY(+25px)' },
        { transform: 'translateY(+50px) translateX(+25px)' },
        ], { 
        // timing options
        duration: 4000,
        iterations: Infinity,
        direction: "alternate",
        easing: 'ease-in-out'
    });
    
    startTime()
};

function changeColor() {
    let clock = document.getElementsByClassName("time")[0];
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    clock.style.color = '#' + randomColor;
}

function startTime() {
    let el = document.getElementsByClassName("time")[0]
    let today = new Date()
    let h = today.getHours()
    let m = today.getMinutes()
    let s = today.getSeconds()
    h = checkTime(h)
    m = checkTime(m)
    s = checkTime(s)
    el.innerHTML = h + ":" + m + ":" + s
    let t = setTimeout(startTime, 1000)
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}
    return i
}