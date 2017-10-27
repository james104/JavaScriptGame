//------------------------------------------------//
//menu for game.js (search keyword before hyphen)
//1.canvas
//2.global_variable
//3.global_function
//4.player_function
//5.start_function
//6.game_data
//------------------------------------------------//

//  start of 1 canvas ---//
var canvasElement = document.getElementById("gameCanvas");
var ctx = canvasElement.getContext && canvasElement.getContext('2d');
if(ctx){
    //--- 2 start of global_variable ---//

    var gameImage = "img/gameImage.gif";
    var playerType = "player";
    var faceLeft = "left", faceRight = "right";

    

    //--- 2 end of global_variable ---//
// 
//     
// 
// 
// 
    //--- 3 start of global_function ---//

    function callIntervalFunction(){
        playerAction();
    }
    
    function drawInCanvas(image, x, y, object){
        if(object.type == playerType){
            ctx.drawImage(image, x, y, object.imgWidth, object.imgHeight, object.x, object.y, object.imgWidth, object.imgHeight);
        }
    }

    function clearPreviousImage(x, y, width, height){
        ctx.clearRect(x, y, width, height);
    }
    
    function walkAnimation(image, walkXyL, walkXyR, object) {
        //add 1 for each move
        object.walkRepeat++;
        if (object.walkRepeat == 5) {
            //reset walkAnimate
            if(object.walkAnimate == 4){
                object.walkAnimate = 0;
            }
            //add 1 for count the walk animation
            object.walkAnimate++;
            //reset for next walk animation
            object.walkRepeat = 0;
        }
        //check facing left/right for walk animation
        var walkXyArr;
        if(object.face == faceLeft){
            walkXyArr = walkXyL;
        }else if(object.face == faceRight){
            walkXyArr = walkXyR;
        }
        drawInCanvas(image, walkXyArr["x"+object.walkAnimate], walkXyArr["y"+object.walkAnimate], object);
    }

    function attackAnimation(image, attackXyL, attackXyR, object) {
        var interval = setInterval(function(){
            //add 1 for each move
            object.attackRepeat++;
            if (object.attackRepeat == 5) {
               //reset attackAnimte
               if(object.attackAnimte == 4){
                   object.attackAnimte = 0;
                   clearInterval(interval);
               }
               //add 1 for count the attack animation
               object.attackAnimte++;
               //reset for next attack animation
               object.attackRepeat = 0;
            }
            //check facing left/right for attack animation
            var attackXyArr, animateLength;
            if(object.face == faceLeft){
                attackXyArr = attackXyL;
            }else if(object.face == faceRight){
                attackXyArr = attackXyR;
            }

            drawInCanvas(image, attackXyArr["x" + object.attackAnimte], attackXyArr["y" + object.attackAnimte], object);
        },25);        
    }

    function ensureCollision(obj, preX, preY, currX, currY) {        
        if (currX <= 0) {
            obj.x = preX;
        }
        else if (currX + obj.imgWidth >= 1500) {
            obj.x = preX;
        }
        else {
            obj.x = currX;
        }
        if (currY <= 0) {
            obj.y = preY;
        }
        else if (currY + obj.imgHeight >= 400) {
            obj.y = preY;
        }
        else {
            obj.y = currY;
        }
    }

    //--- 3 end of global_function ---//
//     
//     
//     
// 
//     
    //--- 4 start of player_function ---//
   
    //player object add status
    function playerObject() {
        this.type = "player";
        this.speed = 5;
        this.x = 100;
        this.y = 100;
        this.face = faceRight;
        //animate = animation count, repeat = after few times change animation
        this.walkAnimate = 1;
        this.walkRepeat = 0;
        this.attackAnimte = 1;
        this.attackRepeat = 0;
        this.shortAttackLaunched = false;
        this.imgWidth = 80;
        this.imgHeight = 80;
        this.actionInterval;
    }
    playerObject = new playerObject();
    var keyStatus = [];

    //player image position face left (L)
    var playerImageXL = 720, playerImageYL = 460;//stand
    var playerWalkL = []; //walk animation
        playerWalkL["x1"] = 400, playerWalkL["y1"] = 460,
        playerWalkL["x2"] = 320, playerWalkL["y2"] = 460,
        playerWalkL["x3"] = 240, playerWalkL["y3"] = 460,
        playerWalkL["x4"] = 160, playerWalkL["y4"] = 460;
    var playerAttackL = []; //attack animation
        playerAttackL["x1"] = 720, playerAttackL["y1"] = 540,
        playerAttackL["x2"] = 640, playerAttackL["y2"] = 540,
        playerAttackL["x3"] = 560, playerAttackL["y3"] = 540,
        playerAttackL["x4"] = 480, playerAttackL["y4"] = 540;

    //player image position face right (R)
    var playerImageXR = 0, playerImageYR = 300;//stand
    var playerWalkR = [];//walk animation
        playerWalkR["x1"] = 320, playerWalkR["y1"] = 300,
        playerWalkR["x2"] = 400, playerWalkR["y2"] = 300,
        playerWalkR["x3"] = 480, playerWalkR["y3"] = 300,
        playerWalkR["x4"] = 560, playerWalkR["y4"] = 300;
    var playerAttackR = []; //attack animation
        playerAttackR["x1"] = 0, playerAttackR["y1"] = 380,
        playerAttackR["x2"] = 80, playerAttackR["y2"] = 380,
        playerAttackR["x3"] = 160, playerAttackR["y3"] = 380,
        playerAttackR["x4"] = 240, playerAttackR["y4"] = 380;

    //create player image
    playerImage = new Image();
    playerImage.id = "playerImage";
    playerImage.src = gameImage;
    playerImage.onload = drawInCanvas(playerImage, playerImageXR, playerImageYR, playerObject);

    //record player input
    document.onkeydown = function (key) {
        key.returnValue = false;
        if(key.keyCode != 90 || keyStatus[90] != false){
            keyStatus[key.keyCode] = true;
        }
    };
    
    //remove player input
    document.onkeyup = function (key) {
        delete keyStatus[key.keyCode];
    };
            
    //define all player action in here
    function playerAction() {
        clearPreviousImage(playerObject.x, playerObject.y, playerImage.width, playerImage.height);
       
        if (keyStatus[90] && !playerObject.shortAttackLaunched) {//Z(attack)
            playerObject.shortAttackLaunched = true;
            attackAnimation(playerImage, playerAttackL, playerAttackR, playerObject);
            setTimeout(function(){playerObject.shortAttackLaunched = false;keyStatus[90] = false;},510);
            return true;
        }
        
        if (playerObject.shortAttackLaunched) {
            var attackXyArr;
            if (playerObject.face == faceLeft) {
                attackXyArr = playerAttackL;
            } else if (playerObject.face == faceRight) {
                attackXyArr = playerAttackR;
            }
            drawInCanvas(playerImage, attackXyArr["x" + playerObject.attackAnimte], attackXyArr["y" + playerObject.attackAnimte], playerObject);
        } 
        else {
            //check player movement only for arrow key
            if (keyStatus[37] || keyStatus[38] || keyStatus[39] || keyStatus[40]) {
                var preX = playerObject.x;
                var preY = playerObject.y;
                var currX = playerObject.x;
                var currY = playerObject.y;
                //assign new postion and dicide facing
                if (keyStatus[37]) {//left           
                    //playerObject.x -= playerObject.speed;
                    currX = currX -  playerObject.speed;
                    playerObject.face = faceLeft;
                }
                if (keyStatus[38]) {//up
                    //playerObject.y -= playerObject.speed;
                    currY = currY -  playerObject.speed;
                }
                if (keyStatus[39]) {//right
                    //playerObject.x += playerObject.speed;
                    currX = currX +  playerObject.speed;
                    playerObject.face = faceRight;
                }
                if (keyStatus[40]) {//down
                    //playerObject.y += playerObject.speed;
                    currY = currY +  playerObject.speed;
                }
                ensureCollision(playerObject, preX, preY, currX, currY);
                walkAnimation(playerImage, playerWalkL, playerWalkR, playerObject);   
                return true;         
            }

            //when no movement or action draw player standing image
            //walkAnimate = 1, walkRepeat = 0;
            //playerAttackAnimte = 1, playerAttackRepeat = 0;
            if (playerObject.face == faceLeft) {
                drawInCanvas(playerImage, playerImageXL, playerImageYL, playerObject);
            } else if (playerObject.face == faceRight) {
                drawInCanvas(playerImage, playerImageXR, playerImageYR, playerObject);
            }
        }
    }
    
    //--- 4 end of player_function ---//
//     
//     
// 
// 
//     
    //--- 5 start of start_function ---//
    function init(){
        var gameStatus = "start";
        
        //player status and function
        setInterval(callIntervalFunction, 20);
    }
    
    init();
    //--- 5 end of start_function ---//
// 
// 
// 
// 
//     
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