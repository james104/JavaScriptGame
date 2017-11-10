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
    var check = true;
    function callIntervalFunction(){
       
        if (stage == 1) {
            stage1Ai();
        }
        playerAction();
        if(ai.face == faceLeft){
            drawInCanvas(image, ai.walkLeftXy["x"+ai.walkAnimate], ai.walkLeftXy["y"+ai.walkAnimate], ai);
        }else if(ai.face == faceRight){
            drawInCanvas(image, ai.walkRightXy["x"+ai.walkAnimate], ai.walkRightXy["y"+ai.walkAnimate], ai);
        }
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

    //player object
    function playerObject() {
        this.name = "keyLovers";
        this.type = "player";
        this.hp = 100;
        this.mp = 100;
        this.speed = 5;
        this.posX = 100;
        this.posY = 400;
        this.imageWidth = 80;
        this.imageHeight = 80;
        this.wantedWidth = 80;
        this.wantedHeight = 80;
        this.face = faceRight;
        this.shortAttackLaunched = false;
        //animate = animation count, repeat = after few times change animation
        this.walkAnimate = 1;
        this.walkRepeat = 0;
        this.attackAnimte = 1;
        this.attackRepeat = 0;
    }
    playerObject = new playerObject();

    function aiObject(imageX, imageY, imageWidth, imageHeight, posX, posY, wantedWidth, wantedHeight, speed) {
        this.imageX = imageX;
        this.imageY = imageY;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.posX = posX;
        this.posY = posY;
        this.wantedWidth = wantedWidth;
        this.wantedHeight = wantedHeight;
        this.speed = speed;
        this.face = faceLeft;

        this.shortAttackLaunched = false;
        this.walkAnimate = 1; //picture number
        this.walkRepeat = 0; //duration to change walkAnimate (number of loop)
        this.attackAnimte = 1; 
        this.attackRepeat = 0;
        this.walkLeftXy = [];
        this.walkRightXy = [];
        this.attackLeftXy = [];
        this.attackRightXy = [];
    }
    
    ai = new aiObject(325, 80, 80, 80, 900, 400, 100, 100, playerObject.speed);

    count = 1;
    attackFinished = true;
    ai = new aiObject(325, 80, 80, 80, 900, 400, 80, 80, playerObject.speed);
    ai.attackLeftXy["x1"] = 0, ai.attackLeftXy["y1"] = 160,
    ai.attackLeftXy["x2"] = 80, ai.attackLeftXy["y2"] = 160,
    ai.attackLeftXy["x3"] = 160, ai.attackLeftXy["y3"] = 160,
    ai.attackLeftXy["x4"] = 240, ai.attackLeftXy["y4"] = 160;
    ai.attackRightXy["x1"] = 400, ai.attackRightXy["y1"] = 0,
    ai.attackRightXy["x2"] = 480, ai.attackRightXy["y2"] = 0,
    ai.attackRightXy["x3"] = 560, ai.attackRightXy["y3"] = 0,
    ai.attackRightXy["x4"] = 640, ai.attackRightXy["y4"] = 0;
    
    ai.walkLeftXy["x1"] = 570, ai.walkLeftXy["y1"] = 80,
    ai.walkLeftXy["x2"] = 490, ai.walkLeftXy["y2"] = 80,
    ai.walkLeftXy["x3"] = 410, ai.walkLeftXy["y3"] = 80,    
    ai.walkLeftXy["x4"] = 330, ai.walkLeftXy["y4"] = 80;
    ai.walkRightXy["x1"] = 80, ai.walkRightXy["y1"] = 0,
    ai.walkRightXy["x2"] = 160, ai.walkRightXy["y2"] = 0,
    ai.walkRightXy["x3"] = 240, ai.walkRightXy["y3"] = 0,
    ai.walkRightXy["x4"] = 320, ai.walkRightXy["y4"] = 0;

    //setInterval(function(){
    //    aiAttackCall(image,ai.attackLeftXy,ai.attackRightXy,ai);
    //},1000);
    

    chaseSpeed = "";
    chaseType = "";
    distance = "";
    
    function stage1Ai() {
        //if (ensurePlayerCollision(ai)) {
        //    console.log("yes");
        //}
        setFace(ai);
        //random number from 1 to 2
        if (attackFinished) {
            attackType = Math.floor(Math.random() * 2 + 1);
        }

        // Randomly perform either 1) or 2) attack (every randomly 1-4s).
        //1: Faster, Chase (random within 2-4s), after that, Must perform short attack.
        //2: same speed, keep distance and Long attack (chase horizontally)
        if (attackType == 1) {
            attackFinished = false;
            chaseSpeed = "normal";
            chaseType = "basicChase";
        }
        else if (attackType == 2) {
            attackFinished = false;
            chaseSpeed = "normal";
            chaseType = "horizontalChase";
        }

        aiChase(chaseSpeed, chaseType);
        
    }

    function ensurePlayerCollision(obj) {
        //fuzzy sets
    }
    faceCountR = 0;
    faceCountL = 0;
    function setFace(obj) {
        if (playerObject.posX > obj.posX) {
            faceCountL = 0;
            obj.face = faceRight;
            if (faceCountR == 0) {
                obj.imageX = 0;
                obj.imageY = 0;
                faceCountR++;
            }
        }

        else if (playerObject.posX < obj.posX) {
            faceCountR = 0;
            obj.face = faceLeft;
            if (faceCountL == 0) {
                obj.imageX = 325;
                obj.imageY = 80;
                faceCountL++;
            }
        }
    }
    position = "";
    
    function aiAttackCall (image,attackLeftXy,attackRightXy,aiObject){
        ai.shortAttackLaunched = true;
        attackAnimation(image, attackLeftXy, attackRightXy, aiObject);
        //user timeout to enable ai attack again
        setTimeout(function () {
            ai.shortAttackLaunched = false;
        }, 400);
    }
    
    function aiChase(chaseSpeed, chaseType) {
        if (chaseSpeed == "fast") {
            ai.speed = playerObject.speed * 2;
        }
        else if (chaseSpeed == "normal") {
            ai.speed = playerObject.speed;
        }
        check = false;
        //if (ai.face == faceRight) {
        //    if (position == "Down") {
        //        clearImage(ai.posX - ai.speed, ai.posY - ai.speed, ai.wantedWidth, ai.wantedHeight + ai.speed);
        //    }
        //    else {
        //        clearImage(ai.posX - ai.speed, ai.posY, ai.wantedWidth, ai.wantedHeight + ai.speed);
        //    }
        //}
        //else {
        //    if (position == "Down") {
        //        clearImage(ai.posX, ai.posY - ai.speed, ai.wantedWidth + ai.speed, ai.wantedHeight + ai.speed);
        //    }
        //    else {
        //        clearImage(ai.posX, ai.posY, ai.wantedWidth + ai.speed, ai.wantedHeight + ai.speed);
        //    }  
        //}
        clearImage(ai.posX, ai.posY, ai.wantedWidth, ai.wantedHeight);
        //if (ensureAIcollision(ai)) {
        //    ai.speed = 0;
        //}
        
        if (chaseType == "basicChase") {
            chase(ai);
        }
        else if (chaseType == "horizontalChase") {
            horizontalChase(ai);
        }
        walkAnimation(image, ai.walkLeftXy, ai.walkRightXy, ai);
        //draw(ai);
        //ai.imageX += 80;
        //count++;
        
        //if(!ai.shortAttackLaunched){
                
        //}
        
        //if (count > 4 && ai.face == faceLeft) {
        //    ai.imageX = 325;
        //    count = 1;
        //}

        //else if (count > 4 && ai.face == faceRight) {
        //    ai.imageX = 0;
        //    count = 1;
        //}
        //setTimeout(function () {
        //    check = true;
        //}, 60);
    }

    function horizontalChase(obj) {
        preX = obj.posX;
        preY = obj.posY;
        currX = obj.posX;
        currY = obj.posY;

        if (obj.posY > playerObject.posY) {
            position = "";
            if (obj.posY - 5 == playerObject.posY) {

            }
            else {
                currY -= obj.speed;
            }
        }
        else if (obj.posY < playerObject.posY) {
            position = "Down";
            if (obj.posY + 5 == playerObject.posY) {

            }
            else {
                currY += obj.speed;
            }
        }
        else {
            position = "";
        }

        ensureCollision(obj, preX, preY, currX, currY);
    }

    function chase(obj) {
        preX = obj.posX;
        preY = obj.posY;
        currX = obj.posX;
        currY = obj.posY;
        if (chaseSpeed == "fast") {
            if (obj.posX > playerObject.posX) {
                if (obj.posX - 5 == playerObject.posX){

                }
                else {
                    currX -= obj.speed;
                }
            }
            else if (obj.posX < playerObject.posX) {
                if (obj.posX + 5 == playerObject.posX) {

                }
                else {
                    currX += obj.speed;
                }
            }
            if (obj.posY > playerObject.posY) {
                position = "";
                if (obj.posY - 5 == playerObject.posY) {

                }
                else {
                    currY -= obj.speed;
                }
            }
            else if (obj.posY < playerObject.posY) {
                position = "Down";
                if (obj.posY + 5 == playerObject.posY) {

                }
                else {
                    currY += obj.speed;
                }
            }
            else {
                position = "";
            }
        }
        else {
            if (obj.posX > playerObject.posX) {
                currX -= obj.speed;
            }
            else if (obj.posX < playerObject.posX) {
                currX += obj.speed;
            }
            if (obj.posY > playerObject.posY) {
                currY -= obj.speed;
                position = "";
            }
            else if (obj.posY < playerObject.posY) {
                currY += obj.speed;
                position = "Down";
            }
            else {
                position = "";
            }
        }

        ensureCollision(obj, preX, preY, currX, currY);
    }

    function normalAiChase() {
        check = false;
        clearImage(ai.posX, ai.posY, ai.wantedWidth + ai.speed, ai.wantedHeight);
        if (ensureAIcollision(ai)) {
            ai.speed = 0;
        }
        draw(ai);
        if (ai.face == faceLeft) {
            ai.posX -= ai.speed;
        }
        else if (ai.face == faceRight) {
            ai.posX += ai.speed;
        }

        ai.imageX += 80;
        count++;

        if (count > 4) {
            ai.imageX = 325;
            count = 1;
        }
        setTimeout(function () {
            check = true;
        }, 70);
    }

    function ensureAIcollision(obj) {
        if (obj.posX <= 0 || obj.posX + obj.imageWidth >= 1500 ||
            obj.posY <= 225 || obj.posY + obj.imageWidth >= 700) {
            return true;
        }
        return false;
    }
    
    function drawInCanvas(image, imageX, imageY, object){
        //if (stage == 1) {
        //    stage1Ai();
        //}
        ctx.drawImage(image, imageX, imageY, object.imageWidth, object.imageHeight, object.posX, object.posY, object.imageWidth, object.imageHeight);
    }
    
    function clearPreviousImage(posX, posY, wantedWidth, wantedHeight) {
        ctx.clearRect(posX, posY, wantedWidth, wantedHeight);
    }
    
    function walkAnimation(image, walkLeftXy, walkRightXy, object) {
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
            walkXyArr = walkLeftXy;
        }else if(object.face == faceRight){
            walkXyArr = walkRightXy;
        }
        drawInCanvas(image, walkXyArr["x"+object.walkAnimate], walkXyArr["y"+object.walkAnimate], object);
    }

    function attackAnimation(image, attackLeftXy, attackRightXy, object) {
        //check facing left/right for attack animation   
        var attackXyArr;
        if(object.face == faceLeft){
            attackXyArr = attackLeftXy;
        }else if(object.face == faceRight){
            attackXyArr = attackRightXy;
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
        if (currX <= 0 || currX + obj.wantedWidth >= 1500) {
            obj.posX = preX;
        }
        else {
            obj.posX = currX;
        }
        if (currY <= 225 || currY + obj.wantedHeight >= 700) {
            obj.posY = preY;
        }
        else {
            obj.posY = currY;
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


    
    drawSpriteStatus(playerObject);
    
    var keyStatus = [];

    //player image position face left (L)
    var playerImageLeftStandX = 330, playerImageLeftStandY = 323;//stand
    var playerWalkLeftXy = []; //walk animation
        playerWalkLeftXy["x1"] = 410, playerWalkLeftXy["y1"] = 323,
        playerWalkLeftXy["x2"] = 490, playerWalkLeftXy["y2"] = 323,
        playerWalkLeftXy["x3"] = 570, playerWalkLeftXy["y3"] = 323,
        playerWalkLeftXy["x4"] = 0, playerWalkLeftXy["y4"] = 403;
    var playerAttackLeftXy = []; //attack animation
        playerAttackLeftXy["x1"] = 83, playerAttackLeftXy["y1"] = 403,
        playerAttackLeftXy["x2"] = 163, playerAttackLeftXy["y2"] = 403,
        playerAttackLeftXy["x3"] = 243, playerAttackLeftXy["y3"] = 403,
        playerAttackLeftXy["x4"] = 323, playerAttackLeftXy["y4"] = 403;

    //player image position face right (R)
    var playerImageRightStandX = 0, playerImageRightStandY = 242;//stand
    var playerWalkRightXy = [];//walk animation
        playerWalkRightXy["x1"] = 80, playerWalkRightXy["y1"] = 242,
        playerWalkRightXy["x2"] = 160, playerWalkRightXy["y2"] = 242,
        playerWalkRightXy["x3"] = 240, playerWalkRightXy["y3"] = 242,
        playerWalkRightXy["x4"] = 320, playerWalkRightXy["y4"] = 242;
    var playerAttackRightXy = []; //attack animation
        playerAttackRightXy["x1"] = 400, playerAttackRightXy["y1"] = 242,
        playerAttackRightXy["x2"] = 480, playerAttackRightXy["y2"] = 242,
        playerAttackRightXy["x3"] = 560, playerAttackRightXy["y3"] = 242,
        playerAttackRightXy["x4"] = 640, playerAttackRightXy["y4"] = 242;

    //create player image
    playerImage = new Image();
    playerImage.id = "playerImage";
    playerImage.src = gameImage;
    playerImage.onload = drawInCanvas(playerImage, playerImageRightStandX, playerImageRightStandY, playerObject);
    
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
        clearPreviousImage(playerObject.posX, playerObject.posY, playerObject.imageWidth, playerObject.imageHeight);
       
        if (keyStatus[90] && !playerObject.shortAttackLaunched) {//Z(attack)
            playerObject.shortAttackLaunched = true;
            attackAnimation(playerImage, playerAttackLeftXy, playerAttackRightXy, playerObject);
            
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
                attackXyArr = playerAttackLeftXy;
            } else if (playerObject.face == faceRight) {
                attackXyArr = playerAttackRightXy;
            }
            drawInCanvas(playerImage, attackXyArr["x" + playerObject.attackAnimte], attackXyArr["y" + playerObject.attackAnimte], playerObject);
        } 
        else {
            //check player movement only for arrow key
            if (keyStatus[37] || keyStatus[38] || keyStatus[39] || keyStatus[40]) {
                var preX = playerObject.posX;
                var preY = playerObject.posY;
                var currX = playerObject.posX;
                var currY = playerObject.posY;
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
                walkAnimation(playerImage, playerWalkLeftXy, playerWalkRightXy, playerObject);   
                return true;         
            }

            //when no movement or action draw player standing image
            //walkAnimate = 1, walkRepeat = 0;
            //playerAttackAnimte = 1, playerAttackRepeat = 0;
            if (playerObject.face == faceLeft) {
                drawInCanvas(playerImage, playerImageLeftStandX, playerImageLeftStandY, playerObject);
            } else if (playerObject.face == faceRight) {
                drawInCanvas(playerImage, playerImageRightStandX, playerImageRightStandY, playerObject);
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