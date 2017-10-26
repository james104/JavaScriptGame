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

    var gameImage = "img/gameImage.bmp";
    var playerType = "player";
    var faceLeft = "left", faceRight = "right";

    

    //--- 2 end of global_variable ---//
// 
//     
// 
// 
// 
    //--- 3 start of global_function ---//

    function drawInCanvas(drawType,oriImage,reqImageX,reqImageY,reqImageW,reqImageH,canvasX,canvasY){
        if(drawType == playerType){
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
    
    function walkAnimation(image, walkXyL, walkXyR, imageW, imageH, object) {
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
        drawInCanvas(object.type, image, walkXyArr["x"+object.walkAnimate], walkXyArr["y"+object.walkAnimate], imageW, imageH, object.x, object.y);
    }
    
    function attackAnimation(image, attackXyL, attackXyR, imageW, imageH, object) {
        //add 1 for each move
        object.attackRepeat++;
        if (object.attackRepeat == 5) {
           //reset attackAnimte
           if(object.attackAnimte == 4){
               object.attackAnimte = 0;
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

        drawInCanvas(object.type, image, attackXyArr["x" + object.attackAnimte], attackXyArr["y" + object.attackAnimte], imageW, imageH, object.x, object.y);

        //get length of attack animation, x & y are 1 animation
        // animateLength = Object.keys(attackXyArr).length / 2;
        // var count = 1;
        // while(true){
        //     count++;
        //     if(count % 5 == 0){
        //         break;
        //     }
        // }
        // console.log(object.attackAnimte);
        
        // object.attackAnimte++;

        // if(object.attackAnimte == 5){            
        //     object.shortAttackLaunched = false;
        //     object.attackAnimte = 1;
        //     return false; 
        // }

        // attackAnimation(image, attackXyL, attackXyR, imageW, imageH, object);

        
        
        
        //for(var i = 1;i <= animateLength;i++){
        //    console.log("芟");
        //}
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
    }
    var playerObject = new playerObject();
    var keyStatus = [];

    //player image width and height for crop
    var playerImageW = 80, playerImageH = 80;

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
    playerImage.onload = drawInCanvas(playerObject.type, playerImage, playerImageXR, playerImageYR, playerImageW, playerImageH, playerObject.x, playerObject.y);

    //record player input
    document.onkeydown = function (key) {
        keyStatus[key.keyCode] = true;
    };
    
    //remove player input
    document.onkeyup = function (key) {
        delete keyStatus[key.keyCode];
    };
            
    //define all player action in here
    function playerAction() {
        //check player movement only for arrow key
        if (keyStatus[37] || keyStatus[38] || keyStatus[39] || keyStatus[40]) {
            //clear the previous player image
            clearPreviousImage(playerObject.x, playerObject.y, playerImage.width, playerImage.height);
    
            //assign new postion and dicide facing
            if (keyStatus[37]) {//left            
                playerObject.x -= playerObject.speed;
                playerObject.face = faceLeft;
            }
            if (keyStatus[38]) {//up
                playerObject.y -= playerObject.speed;
            }
            if (keyStatus[39]) {//right
                playerObject.x += playerObject.speed;
                playerObject.face = faceRight;
            }
            if (keyStatus[40]) {//down
                playerObject.y += playerObject.speed;
            }
            walkAnimation(playerImage, playerWalkL, playerWalkR, playerImageW, playerImageH, playerObject);   
            return true;         
        }    
    
        if (keyStatus[68]) {//D(attack)
            if(!playerObject.shortAttackLaunched){
                //playerObject.shortAttackLaunched = true;
                attackAnimation(playerImage, playerAttackL, playerAttackR, playerImageW, playerImageH, playerObject);
            }
            
            return true;           
        }
        
        //when no movement draw player standing image
        walkAnimate = 1, walkRepeat = 0;
        playerAttackAnimte = 1, playerAttackRepeat = 0;
        if (playerObject.face == faceLeft) {
            playerImageX = 720, playerImageY = 460, playerImageW = 80, playerImageH = 80;
            drawInCanvas(playerType, playerImage, playerImageX, playerImageY, playerImageW, playerImageH, playerObject.x, playerObject.y);
        } else if (playerObject.face == faceRight) {
            playerImageX = 0, playerImageY = 300, playerImageW = 80, playerImageH = 80;
            drawInCanvas(playerType, playerImage, playerImageX, playerImageY, playerImageW, playerImageH, playerObject.x, playerObject.y);
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
        setInterval(playerAction, 20);
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