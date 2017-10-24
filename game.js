//------------------------------------------------//
//menu for game.js (search keyword before hyphen)
//1.canvas
//2.global_variable
//3.global_function
//4.player_function
//5.start_function
//6.game_data
//------------------------------------------------//


//not done yet


//  start of 1 canvas ---//
var canvasElement = document.getElementById("gameCanvas");
var ctx = canvasElement.getContext && canvasElement.getContext('2d');
if(ctx){

    //--- 2 start of global_variable ---//

    var gameImage = "img/gameImage.jpg";
    var faceLeft = "left", faceRight = "right";

    //--- 2 end of global_variable ---//




    //--- 3 start of global_function ---//

    function drawInCanvas(drawType,oriImage,reqImageX,reqImageY,reqImageW,reqImageH,canvasX,canvasY){
        if(drawType == "player"){
            ctx.drawImage(oriImage,reqImageX,reqImageY,reqImageW,reqImageH,canvasX,canvasY,reqImageW,reqImageH);
        }
        removeBackground(canvasX,canvasY,reqImageW,reqImageH);
    }

    function removeBackground(canvasX,canvasY,reqImageW,reqImageH){
        //remove image background
        var imgd = ctx.getImageData(canvasX, canvasY, reqImageW, reqImageH), pix = imgd.data, newColor = {r:0,g:0,b:0, a:0};
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var r = pix[i],g = pix[i+1],b = pix[i+2];
            
            if(r == 0 && g == 0 && b == 0){
                // Change the white to the new color.
                pix[i] = newColor.r;
                pix[i+1] = newColor.g;
                pix[i+2] = newColor.b;
                pix[i+3] = newColor.a;
            }
        }
        ctx.putImageData(imgd, canvasX, canvasY);
    }

    function clearPreviousImage(x, y, width, height){
        ctx.clearRect(x, y, width, height);
    }

    //--- 3 end of global_function ---//
    
    
    
    //--- 4 start of player_function ---//

    //create player image
    playerImage = new Image();
    playerImage.id = "playerImage";
    playerImage.src = gameImage;
    playerImage.onload = drawInCanvas("player", playerImage, 0, 0, 80, 80, 100, 100);
    
    //player status
    function playerObject() {
        this.speed = 5;
        this.x = 100;
        this.y = 100;
    }
    
    var playerObject = new playerObject();
    var keyStatus = [];
    
    //record player input
    document.onkeydown = function (key) {
        keyStatus[key.keyCode] = true;
    };
    
    //remove player input
    document.onkeyup = function (key) {
        delete keyStatus[key.keyCode];
    };
    
    //x = start x, y = start y, w = width, h = height, face = direction facing
    var playerImageX, playerImageY, playerImageW, playerImageH, playerFace = faceRight;
    //animate = animation count, repeat = after few times change animation
    var playerWalkAnimate = 1, playerWalkRepeat = 0;
    var playerAttackAnimte = 1, playerAttackRepeat = 0;
        
    //define all player action in here
    function playerAction() {
        //check player movement only for arrow key
        if (keyStatus[37] || keyStatus[38] || keyStatus[39] || keyStatus[40]) {
            //clear the previous player image
            clearPreviousImage(playerObject.x, playerObject.y, playerImage.width, playerImage.height);
    
            //assign new postion and dicide facing
            if (keyStatus[37]) {//left            
                playerObject.x -= playerObject.speed;
                playerFace = faceLeft;
            }
            if (keyStatus[38]) {//up
                playerObject.y -= playerObject.speed;
            }
            if (keyStatus[39]) {//right
                playerObject.x += playerObject.speed;
                playerFace = faceRight;
            }
            if (keyStatus[40]) {//down
                playerObject.y += playerObject.speed;
            }
            playerWalkAnimation();
            return true;
        }
    
    
        if (keyStatus[68]) {//D(attack)
            playerAttackAnimation();
            return true;
        }
    
        //when no movement draw player standing image
        playerWalkAnimate = 1, playerWalkRepeat = 0;
        playerAttackAnimte = 1, playerAttackRepeat = 0;
        if (playerFace == faceLeft) {
            playerImageX = 720, playerImageY = 0, playerImageW = 80, playerImageH = 80;
            drawInCanvas("player", playerImage, playerImageX, playerImageY, playerImageW, playerImageH, playerObject.x, playerObject.y);
        } else if (playerFace == faceRight) {
            playerImageX = 0, playerImageY = 0, playerImageW = 80, playerImageH = 80;
            drawInCanvas("player", playerImage, playerImageX, playerImageY, playerImageW, playerImageH, playerObject.x, playerObject.y);
        }
    }
    
    function playerWalkAnimation() {
        //add 1 for each move
        playerWalkRepeat++;
        if (playerWalkRepeat == 5) {
            //add 1 for count the walk animation
            playerWalkAnimate++;
            //reset for next walk animation
            playerWalkRepeat = 0;
        }    
        //check facing left/right and assign image position for walk animation
        if (playerFace == faceLeft) {
            switch (playerWalkAnimate) {
                case 1:
                    playerImageX = 480, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    break;
                case 2:
                    playerImageX = 400, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    break;
                case 3:
                    playerImageX = 320, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    break;
                case 4:
                    playerImageX = 240, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    //reset to 0 and repeat walk animation
                    playerWalkAnimate = 0;
                    break;
                default:
                    break;
            }
        } else if (playerFace == faceRight) {
            switch (playerWalkAnimate) {
                case 1:
                    playerImageX = 240, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    break;
                case 2:
                    playerImageX = 320, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    break;
                case 3:
                    playerImageX = 400, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    break;
                case 4:
                    playerImageX = 480, playerImageY = 0, playerImageW = 80, playerImageH = 80;
                    //reset to 0 and repeat walk animation
                    playerWalkAnimate = 0;
                    break;
                default:
                    break;
            }
        }
        drawInCanvas("player", playerImage, playerImageX, playerImageY, playerImageW, playerImageH, playerObject.x, playerObject.y);
    }
    
    function playerAttackAnimation() {
        //add 1 for each move
        playerAttackRepeat++;
        if (playerAttackRepeat == 5) {
            //add 1 for count the walk animation
            playerAttackAnimte++;
            //reset for next walk animation
            playerAttackRepeat = 0;
        }
    
        //check facing left/right and assign image position for walk animation
        if (playerFace == faceLeft) {
            switch (playerAttackAnimte) {
                case 1:
                    playerImageX = 720, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    break;
                case 2:
                    playerImageX = 640, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    break;
                case 3:
                    playerImageX = 560, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    break;
                case 4:
                    playerImageX = 480, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    //reset to 0 and repeat walk animation
                    playerAttackAnimte = 0;
                    break;
                default:
                    break;
            }
        } else if (playerFace == faceRight) {
            switch (playerAttackAnimte) {
                case 1:
                    playerImageX = 0, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    break;
                case 2:
                    playerImageX = 80, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    break;
                case 3:
                    playerImageX = 160, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    break;
                case 4:
                    playerImageX = 240, playerImageY = 80, playerImageW = 80, playerImageH = 80;
                    //reset to 0 and repeat walk animation
                    playerAttackAnimte = 0;
                    break;
                default:
                    break;
            }
        }
        drawInCanvas("player", playerImage, playerImageX, playerImageY, playerImageW, playerImageH, playerObject.x, playerObject.y);
    }
    
    //--- 4 end of player_function ---//
    
    
    //--- 5 start of start_function ---//
    function init(){
        var gameStatus = "start";
        
        //player status and function
        setInterval(playerAction, 20);
    }
    
    init();
    //--- 5 end of start_function ---//
    
    //--- 6 start of game_data ---//
    setInterval(timerFunction, 1000);
    
    var timerMin = 0;
    var timerSec = 0;
    var gameTime = document.getElementById("gameTime");
    
    function timerFunction() {
        timerSec += 1;
        if (timerSec == 60) {
            timerMin++;
            timerSec = 0;
        }
        if (timerSec < 10) {
            var lessThanTenSec = "0";
        } else {
            var lessThanTenSec = "";
        }
        if (timerMin < 10) {
            var lessThanTenMin = "0";
        } else {
            var lessThanTenMin = "";
        }
        gameTime.innerText = lessThanTenMin + timerMin + ":" + lessThanTenSec + timerSec;
    }
    //--- 6 end of game_data ---//    
}