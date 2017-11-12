//------------------------------------------------///
//menu for game.js (search keyword before hyphen)
//1.canvas
//2.global_variable
//3.global_function
//4.player_function
//5.start_function
//6.game_data
//7.stage 1 - finish a mad dog and get the key
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
    var gameImage = "assets/spriteSheetNew.png";
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
        if (stage == 1) {
            stage1Ai(aiDog);
        }

        //stage5Ai(ai);

        if (stage == 1) {
            draw(aiDog);
        }
        draw(playerObject);
    }
    this.image = new Image();
    this.image.src = "assets/spriteSheetNew.png";
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
        this.wantedHeight = wantedHeight;
        this.speed = speed;
        this.face = faceLeft;

        this.attackLaunched = false;
        this.walkAnimate = 1; //picture number
        this.walkRepeat = 0; //duration to change walkAnimate (number of loop)
        this.attackAnimte = 1; 
        this.attackRepeat = 0;
        this.standXy = [];
        this.walkLeftXy = [];
        this.walkRightXy = [];
        this.shortAttackLeftXy = [];
        this.shortAttackRightXy = [];
        this.longAttackLeftXy = [];
        this.longAttackRightXy = [];
        this.emissionAnimateXy = [];
    }
    
    ai = new aiObject(325, 80, 80, 80, 900, 400, 80, 80, playerObject.speed);
    ai.shortAttackLeftXy["x1"] = 0, ai.shortAttackLeftXy["y1"] = 160,
    ai.shortAttackLeftXy["x2"] = 80, ai.shortAttackLeftXy["y2"] = 160,
    ai.shortAttackLeftXy["x3"] = 160, ai.shortAttackLeftXy["y3"] = 160,
    ai.shortAttackLeftXy["x4"] = 240, ai.shortAttackLeftXy["y4"] = 160;
    ai.shortAttackRightXy["x1"] = 400, ai.shortAttackRightXy["y1"] = 0,
    ai.shortAttackRightXy["x2"] = 480, ai.shortAttackRightXy["y2"] = 0,
    ai.shortAttackRightXy["x3"] = 560, ai.shortAttackRightXy["y3"] = 0,
    ai.shortAttackRightXy["x4"] = 640, ai.shortAttackRightXy["y4"] = 0;
    
    ai.walkLeftXy["x1"] = 570, ai.walkLeftXy["y1"] = 80,
    ai.walkLeftXy["x2"] = 490, ai.walkLeftXy["y2"] = 80,
    ai.walkLeftXy["x3"] = 410, ai.walkLeftXy["y3"] = 80,    
    ai.walkLeftXy["x4"] = 330, ai.walkLeftXy["y4"] = 80;
    ai.walkRightXy["x1"] = 80, ai.walkRightXy["y1"] = 0,
    ai.walkRightXy["x2"] = 160, ai.walkRightXy["y2"] = 0,
    ai.walkRightXy["x3"] = 240, ai.walkRightXy["y3"] = 0,
    ai.walkRightXy["x4"] = 320, ai.walkRightXy["y4"] = 0;

    ai.longAttackLeftXy["x1"] = 410, ai.longAttackLeftXy["y1"] = 160,
    ai.longAttackLeftXy["x2"] = 490, ai.longAttackLeftXy["y2"] = 160,
    ai.longAttackLeftXy["x3"] = 570, ai.longAttackLeftXy["y3"] = 160,
    ai.longAttackLeftXy["x4"] = 650, ai.longAttackLeftXy["y4"] = 160;
    ai.longAttackRightXy["x1"] = 0, ai.longAttackRightXy["y1"] = 80,
    ai.longAttackRightXy["x2"] = 80, ai.longAttackRightXy["y2"] = 80,
    ai.longAttackRightXy["x3"] = 160, ai.longAttackRightXy["y3"] = 80,
    ai.longAttackRightXy["x4"] = 240, ai.longAttackRightXy["y4"] = 80;
 
    ai.emissionAnimateXy["x1"] = 0, ai.emissionAnimateXy["y1"] = 870,
    ai.emissionAnimateXy["x2"] = 40, ai.emissionAnimateXy["y2"] = 870,
    ai.emissionAnimateXy["x3"] = 80, ai.emissionAnimateXy["y3"] = 870,
    ai.emissionAnimateXy["x4"] = 120, ai.emissionAnimateXy["y4"] = 870;

    //ai long attack
    // setInterval(function(){
    //     aiAttackCall(image, ai.longAttackLeftXy, ai.longAttackRightXy, ai);
    //     aiEmission = new emissionObject(ai);
    // },2000);

    //ai short attack
    // setInterval(function(){
    //     aiAttackCall(image, ai.shortAttackLeftXy, ai.shortAttackRightXy, ai);
    // },1000);

    attackFinished = true;
    chaseSpeed = "";
    chaseType = "";
    
    var attackType;
    function stage5Ai(aiObject) {
        clearImage(aiObject.posX, aiObject.posY, aiObject.wantedWidth, aiObject.wantedHeight);
        //if (ensurePlayerCollision(ai)) {
        //    console.log("yes");
        //}
        setFace(aiObject);
        //random number from 1 to 2
        if (attackFinished) {
            attackType = Math.floor(Math.random() * 2 + 1);
        }
        
        // Randomly perform either 1) or 2) attack (every randomly 1-4s).
        //1: Faster, Chase (random within 2-4s), after that, Must perform short attack.
        //2: same speed, keep distance and Long attack (chase horizontally)        
        if(!aiObject.attackLaunched){
            if (attackType == 1) {
                attackFinished = false;
                chaseSpeed = "normal";
                chaseType = "basicChase";
            }
            else if (attackType == 2) {
                attackFinished = false;
                chaseSpeed = "slow";
                chaseType = "horizontalChase";
            }
    
            aiChase(chaseSpeed, chaseType, aiObject);
        }
        draw(aiObject);
    }

    function findDistanceBetweenPlayerAndAi (aiObj) {
        distance = Math.sqrt(Math.pow((aiObj.posX - playerObject.posX), 2) + Math.pow((aiObj.posY - playerObject.posY), 2));
        return Math.round(distance);
    }

    //w: 1500; h: 700
    function distanceFuzzySets(obj) {
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
    
    //call for short or long attack
    function aiAttackCall (image,attackLeftXy,attackRightXy,aiObject){
        aiObject.attackLaunched = true;
        attackAnimation(image, attackLeftXy, attackRightXy, aiObject);
        //user timeout to enable ai attack again
        setTimeout(function () {
            aiObject.attackLaunched = false;
        }, 400);
    }

    function aiChase(chaseSpeed, chaseType, aiObject) {
        
        if (chaseSpeed == "fast") {
            aiObject.speed = playerObject.speed * 2;
        }
        else if (chaseSpeed == "normal") {
            aiObject.speed = playerObject.speed;
        }
        else if (chaseSpeed == "slow") {
            aiObject.speed = playerObject.speed - 2;
        }
        
        if(!aiObject.attackLaunched){
            if (chaseType == "basicChase") {
                chase(aiObject);
            }
            else if (chaseType == "horizontalChase") {
                verticalChase(aiObject);
            }
            walkAnimation(image, aiObject.walkLeftXy, aiObject.walkRightXy, aiObject);    
        }

    }

    function verticalChase(obj) {
        preX = obj.posX;
        preY = obj.posY;
        currX = obj.posX;
        currY = obj.posY;

        if (obj.posY > playerObject.posY) {
            if (obj.posY - 2 == playerObject.posY) {

            }
            else {
                currY -= obj.speed;
            }
        }
        else if (obj.posY < playerObject.posY) {
            if (obj.posY + 2 == playerObject.posY) {

            }
            else {
                currY += obj.speed;
            }
        }
        else {
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
                if (obj.posX - playerObject.speed == playerObject.posX) {

                }
                else {
                    currX -= obj.speed;
                }
            }
            else if (obj.posX < playerObject.posX) {
                if (obj.posX + playerObject.speed == playerObject.posX) {

                }
                else {
                    currX += obj.speed;
                }
            }
            if (obj.posY > playerObject.posY) {
                if (obj.posY - playerObject.speed == playerObject.posY) {

                }
                else {
                    currY -= obj.speed;
                }
            }
            else if (obj.posY < playerObject.posY) {
                if (obj.posY + playerObject.speed == playerObject.posY) {

                }
                else {
                    currY += obj.speed;
                }
            }
            else {
            }
        }
        else if (chaseSpeed == "slow") {
            if (obj.posX > playerObject.posX) {
                if (obj.posX - 2 == playerObject.posX) {

                }
                else {
                    currX -= obj.speed;
                }
            }
            else if (obj.posX < playerObject.posX) {
                if (obj.posX + 2 == playerObject.posX) {

                }
                else {
                    currX += obj.speed;
                }
            }
            if (obj.posY > playerObject.posY) {
                if (obj.posY - 2 == playerObject.posY) {

                }
                else {
                    currY -= obj.speed;
                }
            }
            else if (obj.posY < playerObject.posY) {
                if (obj.posY + 2 == playerObject.posY) {

                }
                else {
                    currY += obj.speed;
                }
            }
            else {
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
            }
            else if (obj.posY < playerObject.posY) {
                currY += obj.speed;
            }
            else {
            }
        }

        ensureCollision(obj, preX, preY, currX, currY);
    }

    function playerApporach(aiObject) {
        var distance;
        if(playerObject.posX == aiObject.posX){
            if(playerObject.posY > aiObject.posY){
                distance = playerObject.posY - aiObject.posY;
            }else{
                distance = aiObject.posY - playerObject.posY;
            }
        }else if(playerObject.posY == aiObject.posY){
            if(playerObject.posX > aiObject.posX){
                distance = playerObject.posX - aiObject.posX;
            }else{
                distance = aiObject.posX - playerObject.posX;
            }
        }else{
           
        }
        if(distance <= 200){
            return true;
        }
        return false;
    }

    // function ensureAIcollision(obj) {
    //     if (obj.posX <= 0 || obj.posX + obj.imageWidth >= 1500 ||
    //         obj.posY <= 225 || obj.posY + obj.imageWidth >= 700) {
    //         return true;
    //     }
    //     return false;
    // }
    
    function drawInCanvas(image, object){
        ctx.drawImage(image, object.imageX, object.imageY, object.imageWidth, object.imageHeight, object.posX, object.posY, object.wantedWidth, object.wantedHeight);
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
        object.imageX = walkXyArr["x"+object.walkAnimate], object.imageY = walkXyArr["y"+object.walkAnimate];        
        drawInCanvas(image, object);
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
        drawInCanvas(image, object);

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
            object.imageX = attackXyArr["x" + object.attackAnimte], object.imageY = attackXyArr["y" + object.attackAnimte];
            drawInCanvas(image, object);
        },15);
    }

    function keyObject(posX, poxY){
        this.posX = posX;
        this.poxY = poxY;
        this.imageX = 345;
        this.imageY = 865;
        this.imageWidth = 35;
        this.imageHeight = 35;
        this.wantedWidth = 35;
        this.wantedHeight = 35;        
    }

    function emissionObject (aiObject){        
        this.imageWidth = 40;
        this.imageHeight = 30;
        this.wantedWidth = 40;
        this.wantedHeight = 30;
        this.posX = aiObject.posX - this.wantedWidth;
        this.posY = aiObject.posY + (aiObject.wantedHeight / 2);
        this.speed = 20;
        this.face = aiObject.face;
        this.animateArrXy = aiObject.emissionAnimateXy;
        this.animate = 1;
        this.repeat = 0;        
        if(this.face == faceRight){
            this.posX += aiObject.wantedWidth + this.wantedWidth;            
        }
        emissionAnimation(playerImage,this);
    }    

    function emissionAnimation(image,emissionObject){
        //random to prevent same name of interval 
        var intervalNo = Math.floor(Math.random() * 100) + 1;
        
        intervalNo = setInterval(function(){            
            if(emissionObject.face == faceLeft){
                clearPreviousImage(emissionObject.posX, emissionObject.posY, emissionObject.wantedWidth + 20, emissionObject.wantedHeight);
            }else if(emissionObject.face == faceRight){
                clearPreviousImage(emissionObject.posX - 20, emissionObject.posY, emissionObject.wantedWidth, emissionObject.wantedHeight);                
            }
            emissionObject.repeat++;
            if (emissionObject.repeat == 1) {
                if(emissionObject.animate == 4){
                    emissionObject.animate = 0;
                }
                emissionObject.animate++;
                emissionObject.repeat = 0;
            }
            drawInCanvas(image, emissionObject);
            if(emissionObject.face == faceLeft){
                emissionObject.posX -= emissionObject.speed;
            }else if(emissionObject.face == faceRight){
                emissionObject.posX += emissionObject.speed;
            }
            checkEmissionCollision(emissionObject, playerObject, intervalNo);
        },50);
    }

    function checkEmissionCollision(emissionObject, playerObject, intervalNo){
        if(emissionObject.posX < 0 - emissionObject.wantedWidth || emissionObject.posX > 1500){
            if(emissionObject.face == faceLeft){
                clearPreviousImage(emissionObject.posX, emissionObject.posY, emissionObject.wantedWidth + 20, emissionObject.wantedHeight);
            }else if(emissionObject.face == faceRight){
                clearPreviousImage(emissionObject.posX - 20, emissionObject.posY, emissionObject.wantedWidth, emissionObject.wantedHeight);                
            }
            clearInterval(intervalNo);
        }
        else{
            if(emissionObject.face == faceLeft && playerObject.posX + playerObject.wantedWidth > emissionObject.posX && playerObject.posY < emissionObject.posY + emissionObject.wantedHeight && playerObject.posY + playerObject.wantedHeight > emissionObject.posY){
                reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
                clearPreviousImage(emissionObject.posX, emissionObject.posY, emissionObject.wantedWidth + 20, emissionObject.wantedHeight);
                clearInterval(intervalNo);
            }else if(emissionObject.face == faceRight && playerObject.posX < emissionObject.posX && playerObject.posY < emissionObject.posY + emissionObject.wantedHeight && playerObject.posY + playerObject.wantedHeight > emissionObject.posY){
                reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
                clearPreviousImage(emissionObject.posX - 20, emissionObject.posY, emissionObject.wantedWidth, emissionObject.wantedHeight);
                clearInterval(intervalNo);
            }
        }
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
        object.mp -= consumption;
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

    if(false){
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
    }
    

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
    playerImage.onload = drawInCanvas(playerImage, playerObject);
    
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
            drawInCanvas(playerImage, playerObject);
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
                playerObject.imageX = playerImageLeftStandX, playerObject.imageY = playerImageLeftStandY;
                drawInCanvas(playerImage, playerObject);
            } else if (playerObject.face == faceRight) {
                playerObject.imageX = playerImageRightStandX, playerObject.imageY = playerImageRightStandY;
                drawInCanvas(playerImage, playerObject);
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
        stage1Initial();
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
// 
// 
// 
// 
//     
    //--- 7 start of stage 1 ---//

    //stage1Ai(ai);

    //ai long attack
    // setInterval(function(){
    //     aiAttackCall(image, aiDog.longAttackLeftXy, aiDog.longAttackRightXy, aiDog);
    //     aiEmission = new emissionObject(aiDog);
    // },2000);

    //ai short attack
    // setInterval(function(){
    //     aiAttackCall(image, aiDog.shortAttackLeftXy, aiDog.shortAttackRightXy, aiDog);
    // },1000);

    function stage1Initial(){
        aiDog = new aiObject(415, 2835, 65, 65, 900, 250, 65, 65, 1);
        aiDog.originPosX = 900, aiDog.originPosX = 250;
        aiDog.standXy["leftX"] = 415, aiDog.standXy["leftY"] = 2835;
        aiDog.standXy["rightX"] = 15, aiDog.standXy["rightY"] = 2670;
        aiDog.walkLeftXy["x1"] = 315, aiDog.walkLeftXy["y1"] = 2835,
        aiDog.walkLeftXy["x2"] = 215, aiDog.walkLeftXy["y2"] = 2835,
        aiDog.walkLeftXy["x3"] = 115, aiDog.walkLeftXy["y3"] = 2835,
        aiDog.walkLeftXy["x4"] = 15, aiDog.walkLeftXy["y4"] = 2835;
        aiDog.walkRightXy["x1"] = 115, aiDog.walkRightXy["y1"] = 2670,
        aiDog.walkRightXy["x2"] = 215, aiDog.walkRightXy["y2"] = 2670,
        aiDog.walkRightXy["x3"] = 315, aiDog.walkRightXy["y3"] = 2670,
        aiDog.walkRightXy["x4"] = 415, aiDog.walkRightXy["y4"] = 2670;
        aiDog.shortAttackLeftXy["x1"] = 415, aiDog.shortAttackLeftXy["y1"] = 2920,
        aiDog.shortAttackLeftXy["x2"] = 315, aiDog.shortAttackLeftXy["y2"] = 2920,
        aiDog.shortAttackLeftXy["x3"] = 215, aiDog.shortAttackLeftXy["y3"] = 2920,
        aiDog.shortAttackLeftXy["x4"] = 115, aiDog.shortAttackLeftXy["y4"] = 2920;
        aiDog.shortAttackRightXy["x1"] = 15, aiDog.shortAttackRightXy["y1"] = 2750,
        aiDog.shortAttackRightXy["x2"] = 115, aiDog.shortAttackRightXy["y2"] = 2750,
        aiDog.shortAttackRightXy["x3"] = 215, aiDog.shortAttackRightXy["y3"] = 2750,
        aiDog.shortAttackRightXy["x4"] = 315, aiDog.shortAttackRightXy["y4"] = 2750;
    }

    function stage1Ai(aiObject) {
        clearImage(aiObject.posX, aiObject.posY, aiObject.wantedWidth, aiObject.wantedHeight);
        setFace(aiObject);

        if(playerApporach(aiObject)){
            attackFinished = false;
            chaseType = "basicChase";
            chaseSpeed = "slow";
            aiChase(chaseSpeed, chaseType, aiObject);
        }else{
            if(aiObject.face = faceLeft){
                aiObject.imageX = aiDog.standXy["leftX"], aiObject.imageY = aiDog.standXy["leftY"];
            }else{
                aiObject.imageX = aiDog.standXy["rightX"], aiObject.imageY = aiDog.standXy["rightY"];
            }
        }
        draw(aiObject);
    }

    //--- 7 end of stage 1 ---//
}