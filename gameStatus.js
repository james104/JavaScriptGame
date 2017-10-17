//game status
var timerMin = 0;
var timerSec = 0;

setInterval(timerFunction,1000);

function timerFunction(){
    timerSec += 1;
    if(timerSec == 60){
        timerMin++;
        timerSec = 0;
    }
    if(timerSec < 10){
        var lessThanTenSec = "0";
    }else{
        var lessThanTenSec = "";
    }
    if(timerMin < 10){
        var lessThanTenMin = "0";
    }else{
        var lessThanTenMin = "";
    }
    document.getElementById("gameTime").innerText = lessThanTenMin + timerMin + ":" + lessThanTenSec + timerSec;
}