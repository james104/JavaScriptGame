//------------------------------------------------///
//menu for game.js (search keyword before hyphen)
//1.canvas
//2.global_variable
//3.global_function
//4.player_function
//5.start_function
//6.game_data
//------------------------------------------------//

//--- 1 start of canvas ---//

var canvasElement = document.getElementById("gameCanvas");
canvasElement.width = "1500";
canvasElement.height = "700";
canvasElement.style.background = "url(img/newBackground.bmp)";
canvasElement.style.backgroundSize = "cover";
var ctx = canvasElement.getContext && canvasElement.getContext('2d');
var stage = 1;

//--- 1 end of canvas ---//

if (ctx) {

    //--- 2 start of global_variable ---//


    //img/gameImage.gif here for testing
    var gameImage = "assets/spriteSheet.png";
    var playerType = "player";
    var faceLeft = "left", faceRight = "right";
    var gameSpriteNo = 0;
    var textColor = "white", hpColor = "red", mpColor = "blue";
    var spriteHpX = 150, spriteHpY = 20, 
        spriteMpX = spriteHpX, spriteMpY = spriteHpY + 20,
        spriteStatusW = 200, spriteStatusH = 15,
        spriteHpTextX = spriteHpX + spriteStatusW, spriteHpTextY = spriteHpY + 15,
        spriteMpTextX = spriteHpTextX, spriteMpTextY = spriteHpTextY + 20;
    var spriteStatusArr = [];
    ctx.font = "20px Arial";
    ctx.fillStyle = textColor;

    //--- 2 end of global_variable ---//
// 
//     
// 
// 
// 
    //--- 3 start of global_function ---//

    function callIntervalFunction(){
        playerAction();
        ctx.drawImage(image, 325, 80, 80, 80, testSpeed, testY, testW, testH);
        ctx.drawImage(image, ai.imageX, ai.imageY, ai.imageWidth, ai.imageHeight, ai.posX, ai.posY, ai.wantedWidth, ai.wantedHeight);
        // if (stage == 1) {
        //     stage1Ai();
        // }
    }
    this.image = new Image();
    this.image.src = "assets/spriteSheet.png";
    this.image.onload = init;

    function draw(obj) {
        ctx.drawImage(this.image, obj.imageX, obj.imageY, obj.imageWidth, obj.imageHeight, obj.posX, obj.posY, obj.wantedWidth, obj.wantedHeight);
    }

    function clearImage(posX, posY, wantedWidth, wantedHeight) {
        ctx.clearRect(posX, posY, wantedWidth, wantedHeight);
    }

    function aiObject(imageX, imageY, imageWidth, imageHeight, posX, posY, wantedWidth, wantedHeight, speed) {
        this.imageX = imageX;
        this.imageY = imageY;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.posX = posX;
        this.posY = posY;
        this.wantedWidth = wantedWidth;
        this.wantedHeight = wantedHeight
        this.speed = 1;
        this.face = faceLeft;
    }
    width = 80; height = 80;
    count = 1;
    ai = new aiObject(325, 80, 80, 80, 900, 400, 100, 100, 5);
    draw(ai);
    function stage1Ai() {
        clearImage(ai.posX, ai.posY, ai.wantedWidth + 10, ai.wantedHeight);

        ai.posX -= ai.speed;
        ai.imageX += 80;
        count++;
        if (ensureAIcollision(ai)) {
            ai.speed = 0;
        }
        draw(ai);
        if (count >= 4) {
            ai.imageX = 325;
            count = 1;
        }
    }

    function ensureAIcollision(obj) {
        if (obj.posX <= 0 || obj.posX + obj.imageWidth >= 1500 ||
            obj.posY <= 225 || obj.posY + obj.imageWidth >= 700) {
            return true;
        }
        return false;
    }
    var testSpeed = 0, testY = 350, testW = 80,testH=80; 
    function drawInCanvas(image, x, y, object){
        if(object.type == playerType){
            testSpeed += 5;
            clearPreviousImage(testSpeed,testY,testW,testH);
            ctx.drawImage(image, 325, 80, 80, 80, testSpeed, testY, testW, testH);
            stage1Ai();
            ctx.drawImage(image, x, y, object.imgWidth, object.imgHeight, object.x, object.y, object.imgWidth, object.imgHeight);
            //here here for testing
            
        }

    }

    
    
    function clearPreviousImage(x, y, width, height) {
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
        //check facing left/right for attack animation   
        var attackXyArr;
        if(object.face == faceLeft){
            attackXyArr = attackXyL;
        }else if(object.face == faceRight){
            attackXyArr = attackXyR;
        }
        //draw one first to prevent sparkle
        drawInCanvas(image, attackXyArr["x" + object.attackAnimte], attackXyArr["y" + object.attackAnimte], object);

        //use interval to ensure finish whole animation
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
            drawInCanvas(image, attackXyArr["x" + object.attackAnimte], attackXyArr["y" + object.attackAnimte], object);
        },15);
    }

    function ensureCollision(obj, preX, preY, currX, currY) {        
        if (currX <= 0 || currX + obj.imgWidth >= 1500) {
            obj.x = preX;
        }
        else {
            obj.x = currX;
        }
        if (currY <= 225 || currY + obj.imgHeight >= 700) {
            obj.y = preY;
        }
        else {
            obj.y = currY;
        }
    }

    function drawSpriteStatus(object){
        gameSpriteNo++;
        spriteStatusArr[object.name] = {fullHp : object.hp, hpX : spriteHpX, hpY : spriteHpY, fullMp : object.mp, mpX : spriteMpX, mpY : spriteMpY};
        
        //for hp bar
        ctx.fillStyle = hpColor;
        ctx.fillRect(spriteHpX, spriteHpY, spriteStatusW, spriteStatusH);        

        // //for mp bar
        ctx.fillStyle = mpColor;
        ctx.fillRect(spriteMpX, spriteMpY, spriteStatusW, spriteStatusH);

        ctx.fillStyle = textColor;
        ctx.fillText(object.hp, spriteHpTextX, spriteHpTextY);
        ctx.fillText(object.mp, spriteMpTextX, spriteMpTextY);

        if(gameSpriteNo % 4 == 0){
            spriteHpX = 150, spriteHpY = spriteHpY + 50;            
        }
        else{
            spriteHpX = spriteHpTextX + 150;
        }
        spriteMpX = spriteHpX, spriteMpY = spriteHpY + 20,
        spriteHpTextX = spriteHpX + spriteStatusW, spriteHpTextY = spriteHpY + 15,
        spriteMpTextX = spriteHpTextX, spriteMpTextY = spriteHpTextY + 20;
    }

    function reduceHp(object, damage){
        x = spriteStatusArr[object.name].hpX;
        y = spriteStatusArr[object.name].hpY;        
        spriteHpTextX = x + spriteStatusW, spriteHpTextY = y + 15;

        clearPreviousImage(x, y, spriteStatusW + 40, spriteStatusH);

        orignHp = spriteStatusArr[object.name].fullHp;
        object.hp -= damage;
        currHp = object.hp;
        hpPercentage = currHp / orignHp;
      
        if(currHp <= 0){
            currHp = 0;
            hpPercentage = 0;
        }

        //for hp bar
        ctx.fillStyle = hpColor;
        ctx.fillRect(x, y, spriteStatusW * hpPercentage, spriteStatusH);
        ctx.fillStyle = textColor;
        ctx.fillText(currHp, spriteHpTextX, spriteHpTextY);

        console.log("damage: " + damage);
    }

    function reduceMp(object, consumption){
        x = spriteStatusArr[object.name].mpX;
        y = spriteStatusArr[object.name].mpY;
        spriteMpTextX = x + spriteStatusW, spriteMpTextY = y + 15;

        clearPreviousImage(x, y, spriteStatusW + 40, spriteStatusH);

        orignMp = spriteStatusArr[object.name].fullMp;
        object.mp -= consumption
        currMp = object.mp;
        mpPercentage = currMp / orignMp;

        if(currMp <= 0){
            currMp = 0;
            mpPercentage = 0;
        }

        //for mp bar
        ctx.fillStyle = mpColor;
        ctx.fillRect(x, y, spriteStatusW * mpPercentage, spriteStatusH);
        ctx.fillStyle = textColor;
        ctx.fillText(currMp, spriteMpTextX, spriteMpTextY);

        console.log("consumption: " + consumption);
    }

    //start for test reduce hp & mp
    // test1 = {name:"test1",hp:100,mp:100};
    // drawSpriteStatus(test1);
    // test2 = {name:"test2",hp:100,mp:100};
    // drawSpriteStatus(test2);
    // test3 = {name:"test3",hp:100,mp:100};
    // drawSpriteStatus(test3);    
    // test4 = {name:"test4",hp:100,mp:100};
    // drawSpriteStatus(test4);
    
    //setTimeout(function(){
    //    reduceHp(playerObject,33);
    //    reduceMp(test3,20);
    //},1000);
    //setTimeout(function(){
    //    reduceHp(test4,29);
    //    reduceMp(playerObject,46);
    //},2000);
    //setTimeout(function(){
    //    reduceHp(test1,33);
    //    reduceMp(test4,20);
    //},3000);
    //setTimeout(function(){
    //    reduceHp(test2,33);
    //    reduceMp(test3,20);
    //},4000);
    //setTimeout(function(){
    //    reduceHp(test3,29);
    //    reduceMp(playerObject,46);
    //},5000);
    //setTimeout(function(){
    //    reduceHp(test2,33);
    //    reduceMp(test1,20);
    //},6000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },1000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },2000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },3000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },4000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },5000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },6000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },7000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },8000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },9000);
  //  setTimeout(function(){
  //      reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
  //      reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);
  //  },10000);
    //end for test reduce hp & mp

    //--- 3 end of global_function ---//
//     
//     
//     
// 
//     
    //--- 4 start of player_function ---//
   
    //player object
    function playerObject() {
        this.name = "keyLovers";
        this.type = "player";
        this.hp = 100;
        this.mp = 100;
        this.speed = 5;
        this.x = 100;
        this.y = 400;        
        this.imgWidth = 80;
        this.imgHeight = 80;
        this.face = faceRight;
        this.shortAttackLaunched = false;
        //animate = animation count, repeat = after few times change animation
        this.walkAnimate = 1;
        this.walkRepeat = 0;
        this.attackAnimte = 1;
        this.attackRepeat = 0;        
    }
    playerObject = new playerObject();
    drawSpriteStatus(playerObject);
    
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
        //key.returnValue = false;
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
        clearPreviousImage(playerObject.x, playerObject.y, playerObject.imgWidth, playerObject.imgHeight);
       
        if (keyStatus[90] && !playerObject.shortAttackLaunched) {//Z(attack)
            playerObject.shortAttackLaunched = true;
            attackAnimation(playerImage, playerAttackL, playerAttackR, playerObject);
            
            //user timeout to enable player attack
            setTimeout(function () {
                playerObject.shortAttackLaunched = false;
                if (keyStatus[90] != undefined) {
                    keyStatus[90] = false;
                }                
            }, 400);
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

    function init() {
        var gameStatus = "start";
        setInterval(timerFunction, 1000);
        //player status and function
        setInterval(callIntervalFunction, 20);
    }

    //--- 5 end of start_function ---//
// 
// 
// 
// 
//     
    //--- 6 start of game_data ---//

    
    
    var timerMin = 0, timerSec = 0;
    var timerX = 10, timerY = 35, timerW = 100, timerH = 100;
    
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
        clearPreviousImage(0,0,100,35);
        ctx.fillStyle = textColor;
        ctx.fillText(lessThanTenMin + timerMin + ":" + lessThanTenSec + timerSec, timerX, timerY);
    }
    
    //--- 6 end of game_data ---//

}