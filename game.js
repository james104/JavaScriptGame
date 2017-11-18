//------------------------------------------------///
//menu for game.js (search keyword before hyphen)
//1.canvas
//2.global_variable
//3.global_function
//4.player_function
//5.start_function
//6.game_data
//7.stage 1
//8. stage 2
//9. stage 3
//10. stage 4
//11. stage 5
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
    function callIntervalFunction() {
        playerAction();
        if (stage == 1) {
            stage1Ai(aiDog, keyObject1);
        } else if (stage == 2) {

        } else if (stage == 3) {

        } else if (stage == 4) {
            stage4Ai(aiObjectArr, keyObject4);
        } else if (stage == 5) {
            stage5Ai();
        }

        //for draw one more time to prevent sparkle 
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
        this.hp = 100;
        this.mp = 100;

        this.attackFinished = true;

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

    ai5 = new aiObject(325, 80, 80, 80, 900, 400, 100, 100, playerObject.speed);
    var currAction = "";
    //weight: 1.0 1.0 1.0 1.0 1.0
    var action = ["drinkMilk", "escape", "basicChase", "shortAttack", "longAttack"];

    ai5.shortAttackLeftXy["x1"] = 0, ai5.shortAttackLeftXy["y1"] = 160,
        ai5.shortAttackLeftXy["x2"] = 80, ai5.shortAttackLeftXy["y2"] = 160,
        ai5.shortAttackLeftXy["x3"] = 160, ai5.shortAttackLeftXy["y3"] = 160,
        ai5.shortAttackLeftXy["x4"] = 240, ai5.shortAttackLeftXy["y4"] = 160;
    ai5.shortAttackRightXy["x1"] = 400, ai5.shortAttackRightXy["y1"] = 0,
        ai5.shortAttackRightXy["x2"] = 480, ai5.shortAttackRightXy["y2"] = 0,
        ai5.shortAttackRightXy["x3"] = 560, ai5.shortAttackRightXy["y3"] = 0,
        ai5.shortAttackRightXy["x4"] = 640, ai5.shortAttackRightXy["y4"] = 0;

    ai5.standXy["leftX"] = 325, ai5.standXy["leftY"] = 80;
    ai5.standXy["rightX"] = 0, ai5.standXy["rightY"] = 0;

    ai5.walkLeftXy["x1"] = 570, ai5.walkLeftXy["y1"] = 80,
        ai5.walkLeftXy["x2"] = 490, ai5.walkLeftXy["y2"] = 80,
        ai5.walkLeftXy["x3"] = 410, ai5.walkLeftXy["y3"] = 80,
        ai5.walkLeftXy["x4"] = 330, ai5.walkLeftXy["y4"] = 80;
    ai5.walkRightXy["x1"] = 80, ai5.walkRightXy["y1"] = 0,
        ai5.walkRightXy["x2"] = 160, ai5.walkRightXy["y2"] = 0,
        ai5.walkRightXy["x3"] = 240, ai5.walkRightXy["y3"] = 0,
        ai5.walkRightXy["x4"] = 320, ai5.walkRightXy["y4"] = 0;

    ai5.longAttackLeftXy["x1"] = 410, ai5.longAttackLeftXy["y1"] = 160,
        ai5.longAttackLeftXy["x2"] = 490, ai5.longAttackLeftXy["y2"] = 160,
        ai5.longAttackLeftXy["x3"] = 570, ai5.longAttackLeftXy["y3"] = 160,
        ai5.longAttackLeftXy["x4"] = 650, ai5.longAttackLeftXy["y4"] = 160;
    ai5.longAttackRightXy["x1"] = 0, ai5.longAttackRightXy["y1"] = 80,
        ai5.longAttackRightXy["x2"] = 80, ai5.longAttackRightXy["y2"] = 80,
        ai5.longAttackRightXy["x3"] = 160, ai5.longAttackRightXy["y3"] = 80,
        ai5.longAttackRightXy["x4"] = 240, ai5.longAttackRightXy["y4"] = 80;

    ai5.emissionAnimateXy["x1"] = 0, ai5.emissionAnimateXy["y1"] = 870,
        ai5.emissionAnimateXy["x2"] = 40, ai5.emissionAnimateXy["y2"] = 870,
        ai5.emissionAnimateXy["x3"] = 80, ai5.emissionAnimateXy["y3"] = 870,
        ai5.emissionAnimateXy["x4"] = 120, ai5.emissionAnimateXy["y4"] = 870;

    //drawSpriteStatus(ai5);

    chaseSpeed = "";
    chaseType = "";

    function stage5Ai() {
        clearImage(ai5.posX, ai5.posY, ai5.wantedWidth, ai5.wantedHeight);
        //if (ensurePlayerCollision(ai)) {
        //    console.log("yes");
        //}
        setFace(ai5);
        //random number from 1 to 2
        if (ai5.attackFinished) {
            attackType = Math.floor(Math.random() * 2 + 1);
        }

        // Randomly perform either 1) or 2) attack (every randomly 1-4s).
        //1: Faster, Chase (random within 2-4s), after that, Must perform short attack.
        //2: same speed, keep distance and Long attack (chase horizontally)        
        if (true && !ai5.attackLaunched) {
            if (attackType == 1) {
                ai5.attackFinished = false;
                chaseSpeed = "slow";
                chaseType = "basicChase";
            }
            else if (attackType == 2) {
                ai5.attackFinished = false;
                chaseSpeed = "slow";
                chaseType = "verticalChase";
            }
            aiChase(chaseSpeed, chaseType, ai5);
        } else if (false && !ai5.attackLaunched) {
            aiAttackCall(playerImage, ai5.shortAttackLeftXy, ai5.shortAttackRightXy, ai5);
            ai5.shortAttackObject = new shortAttackObject(50, 50);
            updateShortAttackObject(ai5.shortAttackObject, ai5.posX, ai5.posY + 50, ai5.posX + 50, ai5.posY + 50);
            if (shortAttackCollision(ai5, playerObject)) {
                reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
            }
        } else if (false && !ai5.attackLaunched) {
            aiAttackCall(playerImage, ai5.longAttackLeftXy, ai5.longAttackRightXy, ai5);
            aiEmission = new emissionObject(ai5, "horizontal");
        }
        else if (!ai5.attackLaunched) {
            if (ai5.face == faceLeft) {
                ai5.imageX = ai5.standXy["leftX"], ai5.imageY = ai5.standXy["leftY"];
            } else {
                ai5.imageX = ai5.standXy["rightX"], ai5.imageY = ai5.standXy["rightY"];
            }
        }
        draw(ai5);
    }

    function findDistanceBetweenPlayerAndAi(aiObj) {
        var distance;
        distance = Math.sqrt(Math.pow((aiObj.posX - playerObject.posX), 2) + Math.pow((aiObj.posY - playerObject.posY), 2));
        return Math.round(distance);
    }

    function drinkMilkFuzzyRules(distanceFuzzySets, hpFuzzySets, mpFuzzySets) {

        var veryNearValue = distanceFuzzySets[0];
        var nearValue = distanceFuzzySets[1];
        var farValue = distanceFuzzySets[2];
        var veryFarValue = distanceFuzzySets[3];
        var dyingValue = hpFuzzySets[0];
        var injuredValue = hpFuzzySets[1];
        var healthyValue = hpFuzzySets[2];
        var lowMpValue = mpFuzzySets[0];
        var midMpValue = mpFuzzySets[1];
        var highMpValue = mpFuzzySets[2];

        //rules

        var fuzzyRule1 = [nearValue, dyingValue, midMpValue];
        var fuzzyRule2 = [nearValue, dyingValue, highMpValue];
        var fuzzyRule3 = [farValue, dyingValue, midMpValue];
        var fuzzyRule4 = [farValue, dyingValue, highMpValue];
        var fuzzyRule5 = [veryFarValue, dyingValue, midMpValue];
        var fuzzyRule6 = [veryFarValue, dyingValue, highMpValue];

        //Conjunction
        var fuzzyAxiomsRule1 = min(fuzzyRule1);
        var fuzzyAxiomsRule2 = min(fuzzyRule2);
        var fuzzyAxiomsRule3 = min(fuzzyRule3);
        var fuzzyAxiomsRule4 = min(fuzzyRule4);
        var fuzzyAxiomsRule5 = min(fuzzyRule5);
        var fuzzyAxiomsRule6 = min(fuzzyRule6);
        var result = [fuzzyAxiomsRule1, fuzzyAxiomsRule2, fuzzyAxiomsRule3,
            fuzzyAxiomsRule4, fuzzyAxiomsRule5, fuzzyAxiomsRule6];
        //Disjunction
        return max(result);
    }

    function escapeFuzzyRules(distanceFuzzySets, hpFuzzySets, mpFuzzySets) {

        var veryNearValue = distanceFuzzySets[0];
        var nearValue = distanceFuzzySets[1];
        var farValue = distanceFuzzySets[2];
        var veryFarValue = distanceFuzzySets[3];
        var dyingValue = hpFuzzySets[0];
        var injuredValue = hpFuzzySets[1];
        var healthyValue = hpFuzzySets[2];
        var lowMpValue = mpFuzzySets[0];
        var midMpValue = mpFuzzySets[1];
        var highMpValue = mpFuzzySets[2];

        //rules
        var fuzzyRule1 = [veryNearValue, dyingValue, lowMpValue];
        var fuzzyRule2 = [veryNearValue, dyingValue, midMpValue];
        var fuzzyRule3 = [veryNearValue, dyingValue, highMpValue];
        var fuzzyRule4 = [nearValue, dyingValue, lowMpValue];
        var fuzzyRule5 = [farValue, dyingValue, lowMpValue];
        var fuzzyRule6 = [veryFarValue, dyingValue, lowMpValue];

        //Conjunction
        var fuzzyAxiomsRule1 = min(fuzzyRule1);
        var fuzzyAxiomsRule2 = min(fuzzyRule2);
        var fuzzyAxiomsRule3 = min(fuzzyRule3);
        var fuzzyAxiomsRule4 = min(fuzzyRule4);
        var fuzzyAxiomsRule5 = min(fuzzyRule5);
        var fuzzyAxiomsRule6 = min(fuzzyRule6);
        var result = [fuzzyAxiomsRule1, fuzzyAxiomsRule2, fuzzyAxiomsRule3,
            fuzzyAxiomsRule4, fuzzyAxiomsRule5, fuzzyAxiomsRule6];
        //Disjunction
        return max(result);
    }

    function longAttackFuzzyRules(distanceFuzzySets, hpFuzzySets, mpFuzzySets) {

        var nearValue = distanceFuzzySets[1];
        var farValue = distanceFuzzySets[2];
        var veryFarValue = distanceFuzzySets[3];
        var dyingValue = hpFuzzySets[0];
        var injuredValue = hpFuzzySets[1];
        var healthyValue = hpFuzzySets[2];
        var lowMpValue = mpFuzzySets[0];
        var midMpValue = mpFuzzySets[1];
        var highMpValue = mpFuzzySets[2];

        //rules
        var fuzzyRule1 = [veryFarValue, injuredValue, highMpValue];
        var fuzzyRule2 = [veryFarValue, injuredValue, midMpValue];
        var fuzzyRule3 = [veryFarValue, healthyValue, highMpValue];
        var fuzzyRule4 = [veryFarValue, healthyValue, midMpValue];
        var fuzzyRule5 = [farValue, healthyValue, highMpValue];
        var fuzzyRule6 = [farValue, healthyValue, midMpValue];
        var fuzzyRule7 = [farValue, injuredValue, highMpValue];
        var fuzzyRule8 = [farValue, injuredValue, midMpValue];
        //Conjunction
        var fuzzyAxiomsRule1 = min(fuzzyRule1);
        var fuzzyAxiomsRule2 = min(fuzzyRule2);
        var fuzzyAxiomsRule3 = min(fuzzyRule3);
        var fuzzyAxiomsRule4 = min(fuzzyRule4);
        var fuzzyAxiomsRule5 = min(fuzzyRule5);
        var fuzzyAxiomsRule6 = min(fuzzyRule6);
        var fuzzyAxiomsRule7 = min(fuzzyRule7);
        var fuzzyAxiomsRule8 = min(fuzzyRule8);
        var result = [fuzzyAxiomsRule1, fuzzyAxiomsRule2, fuzzyAxiomsRule3,
            fuzzyAxiomsRule4, fuzzyAxiomsRule5, fuzzyAxiomsRule6,
            fuzzyAxiomsRule7, fuzzyAxiomsRule8];
        //Disjunction
        return max(result);
    }

    function basicChaseFuzzyRules(distanceFuzzySets, hpFuzzySets, mpFuzzySets) {

        var nearValue = distanceFuzzySets[1];
        var farValue = distanceFuzzySets[2];
        var veryFarValue = distanceFuzzySets[3];
        var dyingValue = hpFuzzySets[0];
        var injuredValue = hpFuzzySets[1];
        var healthyValue = hpFuzzySets[2];
        var lowMpValue = mpFuzzySets[0];
        var midMpValue = mpFuzzySets[1];
        var highMpValue = mpFuzzySets[2];

        //rules
        var fuzzyRule1 = [nearValue, healthyValue, highMpValue];
        var fuzzyRule2 = [nearValue, healthyValue, midMpValue];
        var fuzzyRule3 = [nearValue, healthyValue, lowMpValue];
        var fuzzyRule4 = [nearValue, injuredValue, lowMpValue];
        var fuzzyRule5 = [nearValue, injuredValue, highMpValue];
        var fuzzyRule6 = [nearValue, injuredValue, midMpValue];
        var fuzzyRule7 = [farValue, healthyValue, lowMpValue];
        var fuzzyRule8 = [farValue, injuredValue, lowMpValue];
        var fuzzyRule9 = [veryFarValue, injuredValue, lowMpValue];
        var fuzzyRule10 = [veryFarValue, healthyValue, lowMpValue]

        //Conjunction
        var fuzzyAxiomsRule1 = min(fuzzyRule1);
        var fuzzyAxiomsRule2 = min(fuzzyRule2);
        var fuzzyAxiomsRule3 = min(fuzzyRule3);
        var fuzzyAxiomsRule4 = min(fuzzyRule4);
        var fuzzyAxiomsRule5 = min(fuzzyRule5);
        var fuzzyAxiomsRule6 = min(fuzzyRule6);
        var fuzzyAxiomsRule7 = min(fuzzyRule7);
        var fuzzyAxiomsRule8 = min(fuzzyRule8);
        var fuzzyAxiomsRule9 = min(fuzzyRule9);
        var fuzzyAxiomsRule10 = min(fuzzyRule10);
        var result = [fuzzyAxiomsRule1, fuzzyAxiomsRule2, fuzzyAxiomsRule3,
            fuzzyAxiomsRule4, fuzzyAxiomsRule5, fuzzyAxiomsRule6,
            fuzzyAxiomsRule7, fuzzyAxiomsRule8, fuzzyAxiomsRule9,
            fuzzyAxiomsRule10];
        //Disjunction
        return max(result);
    }

    function shortAttackFuzzyRules(distanceFuzzySets, hpFuzzySets, mpFuzzySets) {

        var veryNearValue = distanceFuzzySets[0];
        var dyingValue = hpFuzzySets[0];
        var injuredValue = hpFuzzySets[1];
        var healthyValue = hpFuzzySets[2];
        var lowMpValue = mpFuzzySets[0];
        var midMpValue = mpFuzzySets[1];
        var highMpValue = mpFuzzySets[2];

        //rules
        var fuzzyRule1 = [veryNearValue, injuredValue, highMpValue];
        var fuzzyRule2 = [veryNearValue, injuredValue, midMpValue];
        var fuzzyRule3 = [veryNearValue, injuredValue, lowMpValue];
        var fuzzyRule4 = [veryNearValue, healthyValue, highMpValue];
        var fuzzyRule5 = [veryNearValue, healthyValue, midMpValue];
        var fuzzyRule6 = [veryNearValue, healthyValue, lowMpValue];
        //Conjunction
        var fuzzyAxiomsRule1 = min(fuzzyRule1);
        var fuzzyAxiomsRule2 = min(fuzzyRule2);
        var fuzzyAxiomsRule3 = min(fuzzyRule3);
        var fuzzyAxiomsRule4 = min(fuzzyRule4);
        var fuzzyAxiomsRule5 = min(fuzzyRule5);
        var fuzzyAxiomsRule6 = min(fuzzyRule6);
        var result = [fuzzyAxiomsRule1, fuzzyAxiomsRule2, fuzzyAxiomsRule3,
            fuzzyAxiomsRule4, fuzzyAxiomsRule5, fuzzyAxiomsRule6];
        //Disjunction
        return max(result);
    }

    function min(valueList) {
        var minValue = valueList[0];
        for (var i = 0; i < x.length; i++) {
            if (valueList[i] < minValue)
                minValue = valueList[i];
        }
        return minValue;
    }

    function max(valueList) {
        var maxValue = valueList[0];
        for (var i = 0; i < x.length; i++) {
            if (valueList[i] > maxValue)
                maxValue = valueList[i];
        }
        return maxValue;
    }

    //w: 1500; h: 700
    //playre w: 80; h: 80
    //ai w: 100; h: 100
    function distanceFuzzySets(x) {
        var value;
        var finalResult = [];

        //very near
        var x0 = 80.0, x1 = 160.0;
        if (x <= x0)
            value = 1.0;
        else if (x > x0 && x < x1)
            value = (-x / (x1 - x0)) + (x1 / (x1 - x0));
        else
            value = 0.0;
        finalResult.push(value);

        //near
        var x2 = 240.0; x3 = 320.0;
        if (x <= x0)
            value = 0.0;
        else if (x > x0 && x < x1)
            value = (x / (x1 - x0)) - (x0 / (x1 - x0));
        else if (x >= x1 && x <= x2)
            value = 1.0;
        else if (x > x2 && x < x3)
            value = (-x / (x3 - x2)) + (x3 / (x3 - x2));
        else
            value = 0.0
        finalResult.push(value);

        //far
        x0 = 240.0; x1 = 320.0; x2 = 400.0; x3 = 480.0;
        if (x <= x0)
            value = 0.0;
        else if (x > x0 && x < x1)
            value = (x / (x1 - x0)) - (x0 / (x1 - x0));
        else if (x >= x1 && x <= x2)
            value = 1.0;
        else if (x > x2 && x < x3)
            value = (-x / (x3 - x2)) + (x3 / (x3 - x2));
        else
            value = 0.0
        finalResult.push(value);

        //very far
        x0 = 400.0; x1 = 480.0;
        if (x <= x0)
            value = 0.0;
        else if (x > x0 && x < x1)
            value = (x / (x1 - x0)) - (x0 / (x1 - x0));
        else
            value = 1.0;
        finalResult.push(value);

        return finalResult;
    }

    function hpFuzzySets(x) {
        var value;
        var finalResult = [];

        //dying
        var x0 = 20.0, x1 = 40.0, x2 = 60.0, x3 = 80.0;
        if (x <= x0)
            value = 1.0;
        else if (x > x0 && x < x1)
            value = (-x / (x1 - x0)) + (x1 / (x1 - x0));
        else
            value = 0.0;
        finalResult.push(value);

        //injured
        if (x <= x0)
            value = 0.0;
        else if (x > x0 && x < x1)
            value = (x / (x1 - x0)) - (x0 / (x1 - x0));
        else if (x >= x1 && x <= x2)
            value = 1.0;
        else if (x > x2 && x < x3)
            value = (-x / (x3 - x2)) + (x3 / (x3 - x2));
        else
            value = 0.0
        finalResult.push(value);

        //healthy
        x0 = 60.0; x1 = 80.0;
        if (x <= x0)
            value = 0.0;
        else if (x > x0 && x < x1)
            value = (x / (x1 - x0)) - (x0 / (x1 - x0));
        else
            value = 1.0;
        finalResult.push(value);

        return finalResult;
    }

    function mpFuzzySets(x) {
        var value;
        var finalResult = [];

        //low
        var x0 = 20.0, x1 = 40.0, x2 = 60.0, x3 = 80.0;
        if (x <= x0)
            value = 1.0;
        else if (x > x0 && x < x1)
            value = (-x / (x1 - x0)) + (x1 / (x1 - x0));
        else
            value = 0.0;
        finalResult.push(value);

        //middle
        if (x <= x0)
            value = 0.0;
        else if (x > x0 && x < x1)
            value = (x / (x1 - x0)) - (x0 / (x1 - x0));
        else if (x >= x1 && x <= x2)
            value = 1.0;
        else if (x > x2 && x < x3)
            value = (-x / (x3 - x2)) + (x3 / (x3 - x2));
        else
            value = 0.0
        finalResult.push(value);

        //high
        x0 = 60.0; x1 = 80.0;
        if (x <= x0)
            value = 0.0;
        else if (x > x0 && x < x1)
            value = (x / (x1 - x0)) - (x0 / (x1 - x0));
        else
            value = 1.0;
        finalResult.push(value);

        return finalResult;
    }

    function setFace(obj) {
        if (playerObject.posX > obj.posX) {
            obj.face = faceRight;
        }
        else if (playerObject.posX < obj.posX) {
            obj.face = faceLeft;
        }
    }

    //short or long attack
    function aiAttackCall(image, attackLeftXy, attackRightXy, aiObject) {
        aiObject.attackLaunched = true;
        attackAnimation(image, attackLeftXy, attackRightXy, aiObject);
        //user timeout to enable ai attack again
        setTimeout(function () {
            aiObject.attackLaunched = false;
        }, 1500);
    }

    //slower short or long attack
    function aiAttackCallSlow(image, attackLeftXy, attackRightXy, aiObject) {
        aiObject.attackLaunched = true;
        attackAnimation(image, attackLeftXy, attackRightXy, aiObject);
        //user timeout to enable ai attack again
        setTimeout(function () {
            aiObject.attackLaunched = false;
        }, 3000);
    }

    //ai long attack
    // setInterval(function(){
    //     aiAttackCall(image, ai.longAttackLeftXy, ai.longAttackRightXy, ai);
    //     aiEmission = new emissionObject(ai, ai.emissionAnimateXy);
    // },2000);

    //ai short attack
    // setInterval(function(){
    //     aiAttackCall(image, ai.shortAttackLeftXy, ai.shortAttackRightXy, ai);
    // },1000);


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

        if (!aiObject.attackLaunched) {
            if (chaseType == "basicChase") {
                chase(aiObject);
            }
            else if (chaseType == "verticalChase") {
                verticalChase(aiObject);
            }
            else if (chaseType == "returnOriginPos") {
                returnOriginPos(aiObject);
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

    function returnOriginPos(aiObject) {
        preX = aiObject.posX;
        preY = aiObject.posY;
        currX = aiObject.posX;
        currY = aiObject.posY;
        if (aiObject.posX > aiObject.originPosX) {
            currX -= aiObject.speed;
        }
        else if (aiObject.posX < aiObject.originPosX) {
            currX += aiObject.speed;
        }
        if (aiObject.posY > aiObject.originPosY) {
            currY -= aiObject.speed;
        }
        else if (aiObject.posY < aiObject.originPosY) {
            currY += aiObject.speed;
        }
        ensureCollision(aiObject, preX, preY, currX, currY);
    }

    // function ensureAIcollision(obj) {
    //     if (obj.posX <= 0 || obj.posX + obj.imageWidth >= 1500 ||
    //         obj.posY <= 225 || obj.posY + obj.imageWidth >= 700) {
    //         return true;
    //     }
    //     return false;
    // }

    function drawInCanvas(image, imageX, imageY, object) {
        ctx.drawImage(image, imageX, imageY, object.imageWidth, object.imageHeight, object.posX, object.posY, object.wantedWidth, object.wantedHeight);
    }

    function clearPreviousImage(posX, posY, wantedWidth, wantedHeight) {
        ctx.clearRect(posX, posY, wantedWidth, wantedHeight);
    }

    function walkAnimation(image, walkLeftXy, walkRightXy, object) {
        //add 1 for each move
        object.walkRepeat++;
        if (object.walkRepeat == 5) {
            //reset walkAnimate
            if (object.walkAnimate == 4) {
                object.walkAnimate = 0;
            }
            //add 1 for count the walk animation
            object.walkAnimate++;
            //reset for next walk animation
            object.walkRepeat = 0;
        }
        //check facing left/right for walk animation
        var walkXyArr;
        if (object.face == faceLeft) {
            walkXyArr = walkLeftXy;
        } else if (object.face == faceRight) {
            walkXyArr = walkRightXy;
        }
        object.imageX = walkXyArr["x" + object.walkAnimate], object.imageY = walkXyArr["y" + object.walkAnimate];
        drawInCanvas(image, walkXyArr["x" + object.walkAnimate], walkXyArr["y" + object.walkAnimate], object);
    }

    function attackAnimation(image, attackLeftXy, attackRightXy, object) {
        //check facing left/right for attack animation   
        var attackXyArr;
        if (object.face == faceLeft) {
            attackXyArr = attackLeftXy;
        } else if (object.face == faceRight) {
            attackXyArr = attackRightXy;
        }
        //draw one first to prevent sparkle
        drawInCanvas(image, attackXyArr["x" + object.attackAnimte], attackXyArr["y" + object.attackAnimte], object);

        //use interval to ensure finish whole animation
        var interval = setInterval(function () {
            //add 1 for each move
            object.attackRepeat++;
            if (object.attackRepeat == 5) {
                //reset attackAnimte
                if (object.attackAnimte == 4) {
                    object.attackAnimte = 0;
                    clearInterval(interval);
                }
                //add 1 for count the attack animation
                object.attackAnimte++;
                //reset for next attack animation
                object.attackRepeat = 0;
            }
            object.imageX = attackXyArr["x" + object.attackAnimte], object.imageY = attackXyArr["y" + object.attackAnimte];
            drawInCanvas(image, attackXyArr["x" + object.attackAnimte], attackXyArr["y" + object.attackAnimte], object);
        }, 15);
    }

    function emissionObject(aiObject, emissionType) {
        this.imageWidth = 40;
        this.imageHeight = 30;
        this.wantedWidth = 40;
        this.wantedHeight = 30;
        this.speed = 20;
        this.face = aiObject.face;
        this.animateArrXy = aiObject.emissionAnimateXy;
        this.animate = 1;
        this.repeat = 0;
        this.emissionType = emissionType;
        if (this.emissionType == "horizontal" || this.emissionType == "line") {
            this.posX = aiObject.posX - this.wantedWidth;
            this.posY = aiObject.posY + (aiObject.wantedHeight / 2);
            if (this.face == faceRight) {
                this.posX += aiObject.wantedWidth + this.wantedWidth;
            }
            if (this.emissionType == "line") {
                this.bAlgorithmLine = new bAlgorithmLine(this.posX, this.posY, playerObject.posX + (playerObject.wantedWidth / 2), playerObject.posY + (playerObject.wantedHeight / 2), this);
            }
        } else if (this.emissionType == "vertical") {
            this.posX = aiObject.posX + (this.wantedWidth / 2);
            this.posY = aiObject.posY + aiObject.wantedHeight;
        }
        emissionAnimation(playerImage, this);
    }

    function emissionAnimation(image, emissionObject) {
        //random to prevent same name of interval 
        var intervalNo = Math.floor(Math.random() * 100) + 1;

        intervalNo = setInterval(function () {
            if (emissionObject.emissionType == "horizontal") {
                if (emissionObject.face == faceLeft) {
                    clearPreviousImage(emissionObject.posX, emissionObject.posY, emissionObject.wantedWidth + 20, emissionObject.wantedHeight);
                } else {
                    clearPreviousImage(emissionObject.posX - 20, emissionObject.posY, emissionObject.wantedWidth, emissionObject.wantedHeight);
                }
            } else if (emissionObject.emissionType == "vertical") {
                clearPreviousImage(emissionObject.posX, emissionObject.posY - 20, emissionObject.wantedWidth, emissionObject.wantedHeight);
            } else if (emissionObject.emissionType == "line") {
                if (emissionObject.face == faceLeft) {
                    clearPreviousImage(emissionObject.posX, emissionObject.posY - 20, emissionObject.wantedWidth + 20, emissionObject.wantedHeight + 20);
                } else {
                    clearPreviousImage(emissionObject.posX - 20, emissionObject.posY - 20, emissionObject.wantedWidth + 20, emissionObject.wantedHeight + 20);
                }
            }

            emissionObject.repeat++;
            if (emissionObject.repeat == 1) {
                if (emissionObject.animate == 4) {
                    emissionObject.animate = 0;
                }
                emissionObject.animate++;
                emissionObject.repeat = 0;
            }
            drawInCanvas(image, emissionObject.animateArrXy["x" + emissionObject.animate], emissionObject.animateArrXy["y" + emissionObject.animate], emissionObject);

            if (emissionObject.emissionType == "horizontal") {
                if (emissionObject.face == faceLeft) {
                    emissionObject.posX -= emissionObject.speed;
                } else if (emissionObject.face == faceRight) {
                    emissionObject.posX += emissionObject.speed;
                }
            } else if (emissionObject.emissionType == "vertical") {
                emissionObject.posY += emissionObject.speed;
            } else if (emissionObject.emissionType == "line") {
                if (emissionObject.bAlgorithmLine.steep) {
                    emissionObject.posX = emissionObject.bAlgorithmLine.y;
                    emissionObject.posY += 5;
                } else {
                    if (emissionObject.face == faceLeft) {
                        emissionObject.posX -= 5;
                    } else {
                        emissionObject.posX += 5;
                    }
                    emissionObject.posY = emissionObject.bAlgorithmLine.y;
                }
                emissionObject.bAlgorithmLine.error -= emissionObject.bAlgorithmLine.deltaY;
                if (emissionObject.bAlgorithmLine.error < 0) {
                    if (emissionObject.bAlgorithmLine.steep) {
                        if (emissionObject.face == faceLeft) {
                            emissionObject.bAlgorithmLine.y += emissionObject.bAlgorithmLine.yStep - 4;
                        } else {
                            emissionObject.bAlgorithmLine.y += emissionObject.bAlgorithmLine.yStep + 4;
                        }
                    } else {
                        emissionObject.bAlgorithmLine.y += emissionObject.bAlgorithmLine.yStep + 4;
                    }
                    emissionObject.bAlgorithmLine.error += emissionObject.bAlgorithmLine.deltaX;
                }
            }
            checkEmissionCollision(emissionObject, playerObject, intervalNo);
        }, 50);
    }

    function checkEmissionCollision(emissionObject, playerObject, intervalNo) {
        if (emissionObject.posX < 0 - emissionObject.wantedWidth || emissionObject.posX > 1500) {
            if (emissionObject.face == faceLeft) {
                clearPreviousImage(emissionObject.posX, emissionObject.posY, emissionObject.wantedWidth + 20, emissionObject.wantedHeight);
            } else if (emissionObject.face == faceRight) {
                clearPreviousImage(emissionObject.posX - 20, emissionObject.posY, emissionObject.wantedWidth, emissionObject.wantedHeight);
            }
            clearInterval(intervalNo);
        }
        else {
            if (boundingBoxCollision(playerObject, emissionObject)) {
                reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
                if (emissionObject.emissionType == "horizontal") {
                    if (emissionObject.face == faceLeft) {
                        clearPreviousImage(emissionObject.posX, emissionObject.posY, emissionObject.wantedWidth + 20, emissionObject.wantedHeight);
                    } else {
                        clearPreviousImage(emissionObject.posX - 20, emissionObject.posY, emissionObject.wantedWidth, emissionObject.wantedHeight);
                    }
                } else if (emissionObject.emissionType == "vertical") {
                    clearPreviousImage(emissionObject.posX, emissionObject.posY - 20, emissionObject.wantedWidth, emissionObject.wantedHeight);
                } else if (emissionObject.emissionType == "line") {
                    if (emissionObject.face == faceLeft) {
                        clearPreviousImage(emissionObject.posX, emissionObject.posY - 20, emissionObject.wantedWidth + 20, emissionObject.wantedHeight + 20);
                    } else {
                        clearPreviousImage(emissionObject.posX - 20, emissionObject.posY - 20, emissionObject.wantedWidth + 20, emissionObject.wantedHeight + 20);
                    }
                }
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

    function boundingBoxCollision(playerObject, object) {
        var point = [];
        var posX = playerObject.posX, posY = playerObject.posY;
        point["x1"] = posX, point["y1"] = posY;
        point["x2"] = posX, point["y2"] = posY + playerObject.wantedHeight;
        point["x3"] = posX + playerObject.wantedWidth, point["y3"] = posY;
        point["x4"] = posX + playerObject.wantedWidth, point["y4"] = posY + playerObject.wantedHeight;

        //add middle point checking for object smaller than playerObject
        point["x5"] = posX + Math.round(playerObject.wantedWidth / 2), point["y5"] = playerObject.posY;
        point["x6"] = posX + Math.round(playerObject.wantedWidth / 2), point["y6"] = playerObject.posY + playerObject.wantedHeight;
        point["x7"] = posX, point["y7"] = playerObject.posY + Math.round(playerObject.wantedHeight / 2);
        point["x8"] = posX + playerObject.wantedWidth, point["y8"] = playerObject.posY + Math.round(playerObject.wantedHeight / 2);

        for (i = 1; i < 9; i++) {
            if (point["x" + i] > object.posX && point["x" + i] < object.posX + object.wantedWidth &&
                point["y" + i] > object.posY && point["y" + i] < object.posY + object.wantedHeight) {
                clearPreviousImage(object.posX, object.posY, object.wantedWidth, object.wantedHeight);
                return true;
            }
        }
        return false;
    }

    function shortAttackObject(wantedWidth, wantedHeight) {
        this.wantedWidth = wantedWidth;
        this.wantedHeight = wantedHeight;
    }

    function updateShortAttackObject(shortAttackObject, newLeftPosX, newLeftPosY, newRightPosX, newRightPosY) {
        shortAttackObject.leftPosX = newLeftPosX;
        shortAttackObject.leftPosY = newLeftPosY;
        shortAttackObject.rightPosX = newRightPosX;
        shortAttackObject.rightPosY = newRightPosY;
    }

    function shortAttackCollision(launchObject, targetObject) {
        var point = [], posX, posY, wantedWidth, wantedHeight;
        wantedWidth = launchObject.shortAttackObject.wantedWidth;
        wantedHeight = launchObject.shortAttackObject.wantedHeight;

        if (launchObject.face == faceLeft) {
            posX = launchObject.shortAttackObject.leftPosX, posY = launchObject.shortAttackObject.leftPosY;
        } else {
            posX = launchObject.shortAttackObject.rightPosX, posY = launchObject.shortAttackObject.rightPosY;
        }
        point["x1"] = posX, point["y1"] = posY;
        point["x2"] = posX, point["y2"] = posY + wantedHeight;
        point["x3"] = posX + wantedWidth, point["y3"] = posY;
        point["x4"] = posX + wantedWidth, point["y4"] = posY + wantedHeight;

        for (i = 1; i < 5; i++) {
            if (point["x" + i] - 25 > targetObject.posX && point["x" + i] + 10 < targetObject.posX + targetObject.wantedWidth &&
                point["y" + i] > targetObject.posY && point["y" + i] < targetObject.posY + targetObject.wantedHeight) {
                return true;
            }
        }
        return false;
    }

    function drawSpriteStatus(object) {
        gameSpriteNo++;
        spriteStatusArr[object.name] = { fullHp: object.hp, hpX: spriteHpX, hpY: spriteHpY, fullMp: object.mp, mpX: spriteMpX, mpY: spriteMpY };

        //for hp bar
        ctx.fillStyle = hpColor;
        ctx.fillRect(spriteHpX, spriteHpY, spriteStatusW, spriteStatusH);

        // //for mp bar
        ctx.fillStyle = mpColor;
        ctx.fillRect(spriteMpX, spriteMpY, spriteStatusW, spriteStatusH);

        ctx.fillStyle = textColor;
        ctx.fillText(object.hp, spriteHpTextX, spriteHpTextY);
        ctx.fillText(object.mp, spriteMpTextX, spriteMpTextY);

        if (gameSpriteNo % 4 == 0) {
            spriteHpX = 150, spriteHpY = spriteHpY + 50;
        }
        else {
            spriteHpX = spriteHpTextX + 150;
        }
        spriteMpX = spriteHpX, spriteMpY = spriteHpY + 20,
            spriteHpTextX = spriteHpX + spriteStatusW, spriteHpTextY = spriteHpY + 15,
            spriteMpTextX = spriteHpTextX, spriteMpTextY = spriteHpTextY + 20;
    }

    function reduceHp(object, damage) {
        x = spriteStatusArr[object.name].hpX;
        y = spriteStatusArr[object.name].hpY;
        spriteHpTextX = x + spriteStatusW, spriteHpTextY = y + 15;

        clearPreviousImage(x, y, spriteStatusW + 40, spriteStatusH);

        orignHp = spriteStatusArr[object.name].fullHp;
        object.hp -= damage;
        currHp = object.hp;
        hpPercentage = currHp / orignHp;

        if (currHp <= 0) {
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

    function reduceMp(object, consumption) {
        x = spriteStatusArr[object.name].mpX;
        y = spriteStatusArr[object.name].mpY;
        spriteMpTextX = x + spriteStatusW, spriteMpTextY = y + 15;

        clearPreviousImage(x, y, spriteStatusW + 40, spriteStatusH);

        orignMp = spriteStatusArr[object.name].fullMp;
        object.mp -= consumption;
        currMp = object.mp;
        mpPercentage = currMp / orignMp;

        if (currMp <= 0) {
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

    //Gaussian Randomness
    function gRand() {
        var p = Math.random() + Math.random() + Math.random();
        return Math.round((p / 3) * 10);
    }
    // reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
    // reduceMp(playerObject, Math.floor(Math.random() * 10) + 1);

    //Bresenham’s algorithm
    function bAlgorithmLine(x0, y0, x1, y1, emissionObject) {
        this.steep = (y0 > y1 ? y0 - y1 : y1 - y0) > (x0 > x1 ? x0 - x1 : x1 - x0);
        if (this.steep) {
            //swap(x0, y0)
            x0 = x0 + y0;
            y0 = x0 - y0;
            x0 = x0 - y0;
            //swap(x1, y1)
            x1 = x1 + y1;
            y1 = x1 - y1;
            x1 = x1 - y1;
        }
        if (x0 > x1) {
            //swap(x0, x1)
            x0 = x0 + x1;
            x1 = x0 - x1;
            x0 = x0 - x1;
            //swap(y0, y1)
            y0 = y0 + y1;
            y1 = y0 - y1;
            y0 = y0 - y1;
        }
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.deltaX = x1 - x0;
        this.deltaY = y0 > y1 ? y0 - y1 : y1 - y0;
        this.error = this.deltaX / 2;
        this.yStep = y0 < y1 ? 1 : -1;
        if (!this.steep) {
            if (emissionObject.face == faceLeft) {
                y0 = y0 + y1;
                y1 = y0 - y1;
                y0 = y0 - y1;
            }
            this.yStep = 1;
        }
        this.y = y0;
        // for (i = x0; i < collisionPosition; i++) {
        //     steep ? console.log(y, i) : console.log(i, y);
        //     error -= deltaY;
        //     if (error < 0) {
        //         y += yStep;
        //         error += deltaX;
        //     }
        // }
    }

    function keyObject(posX, posY) {
        this.imageX = 345;
        this.imageY = 865;
        this.imageWidth = 35;
        this.imageHeight = 35;
        this.posX = posX;
        this.posY = posY;
        this.wantedWidth = 35;
        this.wantedHeight = 35;
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
        this.originSpeed = this.speed;
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
        this.keyGet = false;
        this.shortAttackObject = new shortAttackObject(35, 20);
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
    playerImage.onload = drawInCanvas(playerImage, playerImageRightStandX, playerImageRightStandY, playerObject);

    //record player input
    document.onkeydown = function (key) {
        //key.returnValue = false;
        if (key.keyCode != 90 || keyStatus[90] != false) {
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

            //set small bounding box based on image attack animate 160 445 535 285
            updateShortAttackObject(playerObject.shortAttackObject, playerObject.posX, playerObject.posY + 42, playerObject.posX + 55, playerObject.posY + 43);

            if (stage == 1 && shortAttackCollision(playerObject, aiDog)) {
                reduceHp(aiDog, Math.floor(Math.random() * 10) + 1);
            }

            if (stage == 5 && shortAttackCollision(playerObject, ai5)) {
                reduceHp(ai5, 10);
            }

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
                    currX = currX - playerObject.speed;
                    playerObject.face = faceLeft;
                }
                if (keyStatus[38]) {//up
                    //playerObject.y -= playerObject.speed;
                    currY = currY - playerObject.speed;
                }
                if (keyStatus[39]) {//right
                    //playerObject.x += playerObject.speed;
                    currX = currX + playerObject.speed;
                    playerObject.face = faceRight;
                }
                if (keyStatus[40]) {//down
                    //playerObject.y += playerObject.speed;
                    currY = currY + playerObject.speed;
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
                drawInCanvas(playerImage, playerImageLeftStandX, playerImageLeftStandY, playerObject);
            } else if (playerObject.face == faceRight) {
                playerObject.imageX = playerImageRightStandX, playerObject.imageY = playerImageRightStandY;
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
        switch (stage) {
            case 1:
                stage1Initial();
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                stage4Initial();
                break;
            case 5:
                break;
            default:
                break;
        }
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
        clearPreviousImage(0, 0, 100, 35);
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
    function stage1Initial() {
        aiDog = new aiObject(415, 2835, 65, 65, 900, 250, 100, 100, 3);
        aiDog.originPosX = 900, aiDog.originPosY = 250;
        aiDog.originSpeed = aiDog.speed;
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

        aiDog.shortAttackObject = new shortAttackObject(30, 30);

        aiDog.hp = 50;
        aiDog.mp = 0;
        drawSpriteStatus(aiDog);

        keyObject1 = new keyObject(aiDog.posX + 100, aiDog.posY + 25);
        keyInterval = setInterval(function () {
            if (boundingBoxCollision(playerObject, keyObject1)) {
                playerObject.keyGet = true;
                clearInterval(keyInterval);
            } else {
                draw(keyObject1);
            }
        }, 20);
    }

    function stage1Ai(aiObject, keyObject1) {
        clearImage(aiObject.posX, aiObject.posY, aiObject.wantedWidth, aiObject.wantedHeight);
        setFace(aiObject);
        // console.log(playerObject.speed + " " + aiObject.speed);
        //here have some problem
        if (boundingBoxCollision(playerObject, aiObject)) {
            playerObject.speed = 1;
        } else {
            playerObject.speed = playerObject.originSpeed;
        }

        if (findDistanceBetweenPlayerAndAi(aiObject) <= 100) {
            if (!aiObject.attackLaunched) {
                aiAttackCall(playerImage, aiObject.shortAttackLeftXy, aiObject.shortAttackRightXy, aiObject);

                //set small bounding box based on image attack animate 315 2955 160 2790
                updateShortAttackObject(aiDog.shortAttackObject, aiDog.posX, aiDog.posY + 35, aiDog.posX + 45, aiDog.posY + 40);
                if (shortAttackCollision(aiDog, playerObject)) {
                    reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
                }
            }
        } else if (findDistanceBetweenPlayerAndAi(keyObject1) > 400) {
            if (aiDog.posX >= aiDog.originPosX - aiDog.speed && aiDog.posX <= aiDog.originPosX + aiDog.speed && aiDog.posY >= aiDog.originPosY - aiDog.speed && aiDog.posY <= aiDog.originPosY + aiDog.speed) {
                if (aiObject.face == faceLeft) {
                    aiObject.imageX = aiDog.standXy["leftX"], aiObject.imageY = aiDog.standXy["leftY"];
                } else {
                    aiObject.imageX = aiDog.standXy["rightX"], aiObject.imageY = aiDog.standXy["rightY"];
                }
            } else {
                chaseType = "returnOriginPos";
                chaseSpeed = "slow";
                aiChase(chaseSpeed, chaseType, aiObject);
            }
        } else if (findDistanceBetweenPlayerAndAi(aiObject) <= 400) {
            chaseType = "basicChase";
            chaseSpeed = "slow";
            aiChase(chaseSpeed, chaseType, aiObject);
        }
        draw(aiObject);
    }
    //--- 7 end of stage 1 ---//
    // 
    // 
    // 
    // 
    //
    //--- 8 start of stage 2 ---//

    //--- 8 end of stage 2 ---//
    // 
    // 
    // 
    // 
    //     
    //--- 9 start of stage 3 ---//

    //--- 9 end of stage 3 ---//
    // 
    // 
    // 
    // 
    //     
    //--- 10 start of stage 4 ---//
    function stage4Initial() {
        aiNinja = new aiObject(0, 0, 75, 82, 500, 100, 75, 82, 0);
        aiNinja.standXy["leftX"] = 78, aiNinja.standXy["leftY"] = 243;
        aiNinja.standXy["rightX"] = 0, aiNinja.standXy["rightY"] = 0;
        aiNinja.longAttackLeftXy["x1"] = 410, aiNinja.longAttackLeftXy["y1"] = 160,
            aiNinja.longAttackLeftXy["x2"] = 490, aiNinja.longAttackLeftXy["y2"] = 160,
            aiNinja.longAttackLeftXy["x3"] = 570, aiNinja.longAttackLeftXy["y3"] = 160,
            aiNinja.longAttackLeftXy["x4"] = 650, aiNinja.longAttackLeftXy["y4"] = 160;
        aiNinja.longAttackRightXy["x1"] = 0, aiNinja.longAttackRightXy["y1"] = 80,
            aiNinja.longAttackRightXy["x2"] = 80, aiNinja.longAttackRightXy["y2"] = 80,
            aiNinja.longAttackRightXy["x3"] = 160, aiNinja.longAttackRightXy["y3"] = 80,
            aiNinja.longAttackRightXy["x4"] = 240, aiNinja.longAttackRightXy["y4"] = 80;
        aiNinja.emissionAnimateXy["x1"] = 0, aiNinja.emissionAnimateXy["y1"] = 870,
            aiNinja.emissionAnimateXy["x2"] = 40, aiNinja.emissionAnimateXy["y2"] = 870,
            aiNinja.emissionAnimateXy["x3"] = 80, aiNinja.emissionAnimateXy["y3"] = 870,
            aiNinja.emissionAnimateXy["x4"] = 120, aiNinja.emissionAnimateXy["y4"] = 870;

        aiNinja2 = new aiObject(0, 0, 75, 82, 1250, 70, 75, 82, 0);
        aiNinja2.standXy["leftX"] = 78, aiNinja2.standXy["leftY"] = 243;
        aiNinja2.standXy["rightX"] = 0, aiNinja2.standXy["rightY"] = 0;
        aiNinja2.longAttackLeftXy["x1"] = 410, aiNinja2.longAttackLeftXy["y1"] = 160,
            aiNinja2.longAttackLeftXy["x2"] = 490, aiNinja2.longAttackLeftXy["y2"] = 160,
            aiNinja2.longAttackLeftXy["x3"] = 570, aiNinja2.longAttackLeftXy["y3"] = 160,
            aiNinja2.longAttackLeftXy["x4"] = 650, aiNinja2.longAttackLeftXy["y4"] = 160;
        aiNinja2.longAttackRightXy["x1"] = 0, aiNinja2.longAttackRightXy["y1"] = 80,
            aiNinja2.longAttackRightXy["x2"] = 80, aiNinja2.longAttackRightXy["y2"] = 80,
            aiNinja2.longAttackRightXy["x3"] = 160, aiNinja2.longAttackRightXy["y3"] = 80,
            aiNinja2.longAttackRightXy["x4"] = 240, aiNinja2.longAttackRightXy["y4"] = 80;
        aiNinja2.emissionAnimateXy["x1"] = 0, aiNinja2.emissionAnimateXy["y1"] = 870,
            aiNinja2.emissionAnimateXy["x2"] = 40, aiNinja2.emissionAnimateXy["y2"] = 870,
            aiNinja2.emissionAnimateXy["x3"] = 80, aiNinja2.emissionAnimateXy["y3"] = 870,
            aiNinja2.emissionAnimateXy["x4"] = 120, aiNinja2.emissionAnimateXy["y4"] = 870;

        aiNinja3 = new aiObject(0, 0, 75, 82, 1400, 200, 75, 82, 0);
        aiNinja3.standXy["leftX"] = 78, aiNinja3.standXy["leftY"] = 243;
        aiNinja3.standXy["rightX"] = 0, aiNinja3.standXy["rightY"] = 0;
        aiNinja3.longAttackLeftXy["x1"] = 410, aiNinja3.longAttackLeftXy["y1"] = 160,
            aiNinja3.longAttackLeftXy["x2"] = 490, aiNinja3.longAttackLeftXy["y2"] = 160,
            aiNinja3.longAttackLeftXy["x3"] = 570, aiNinja3.longAttackLeftXy["y3"] = 160,
            aiNinja3.longAttackLeftXy["x4"] = 650, aiNinja3.longAttackLeftXy["y4"] = 160;
        aiNinja3.longAttackRightXy["x1"] = 0, aiNinja3.longAttackRightXy["y1"] = 80,
            aiNinja3.longAttackRightXy["x2"] = 80, aiNinja3.longAttackRightXy["y2"] = 80,
            aiNinja3.longAttackRightXy["x3"] = 160, aiNinja3.longAttackRightXy["y3"] = 80,
            aiNinja3.longAttackRightXy["x4"] = 240, aiNinja3.longAttackRightXy["y4"] = 80;
        aiNinja3.emissionAnimateXy["x1"] = 0, aiNinja3.emissionAnimateXy["y1"] = 870,
            aiNinja3.emissionAnimateXy["x2"] = 40, aiNinja3.emissionAnimateXy["y2"] = 870,
            aiNinja3.emissionAnimateXy["x3"] = 80, aiNinja3.emissionAnimateXy["y3"] = 870,
            aiNinja3.emissionAnimateXy["x4"] = 120, aiNinja3.emissionAnimateXy["y4"] = 870;

        aiNinja4 = new aiObject(0, 0, 75, 82, 1400, 300, 75, 82, 0);
        aiNinja4.standXy["leftX"] = 78, aiNinja4.standXy["leftY"] = 243;
        aiNinja4.standXy["rightX"] = 0, aiNinja4.standXy["rightY"] = 0;
        aiNinja4.longAttackLeftXy["x1"] = 410, aiNinja4.longAttackLeftXy["y1"] = 160,
            aiNinja4.longAttackLeftXy["x2"] = 490, aiNinja4.longAttackLeftXy["y2"] = 160,
            aiNinja4.longAttackLeftXy["x3"] = 570, aiNinja4.longAttackLeftXy["y3"] = 160,
            aiNinja4.longAttackLeftXy["x4"] = 650, aiNinja4.longAttackLeftXy["y4"] = 160;
        aiNinja4.longAttackRightXy["x1"] = 0, aiNinja4.longAttackRightXy["y1"] = 80,
            aiNinja4.longAttackRightXy["x2"] = 80, aiNinja4.longAttackRightXy["y2"] = 80,
            aiNinja4.longAttackRightXy["x3"] = 160, aiNinja4.longAttackRightXy["y3"] = 80,
            aiNinja4.longAttackRightXy["x4"] = 240, aiNinja4.longAttackRightXy["y4"] = 80;
        aiNinja4.emissionAnimateXy["x1"] = 0, aiNinja4.emissionAnimateXy["y1"] = 870,
            aiNinja4.emissionAnimateXy["x2"] = 40, aiNinja4.emissionAnimateXy["y2"] = 870,
            aiNinja4.emissionAnimateXy["x3"] = 80, aiNinja4.emissionAnimateXy["y3"] = 870,
            aiNinja4.emissionAnimateXy["x4"] = 120, aiNinja4.emissionAnimateXy["y4"] = 870;

        aiNinja5 = new aiObject(0, 0, 75, 82, 1400, 400, 75, 82, 0);
        aiNinja5.standXy["leftX"] = 78, aiNinja5.standXy["leftY"] = 243;
        aiNinja5.standXy["rightX"] = 0, aiNinja5.standXy["rightY"] = 0;
        aiNinja5.longAttackLeftXy["x1"] = 410, aiNinja5.longAttackLeftXy["y1"] = 160,
            aiNinja5.longAttackLeftXy["x2"] = 490, aiNinja5.longAttackLeftXy["y2"] = 160,
            aiNinja5.longAttackLeftXy["x3"] = 570, aiNinja5.longAttackLeftXy["y3"] = 160,
            aiNinja5.longAttackLeftXy["x4"] = 650, aiNinja5.longAttackLeftXy["y4"] = 160;
        aiNinja5.longAttackRightXy["x1"] = 0, aiNinja5.longAttackRightXy["y1"] = 80,
            aiNinja5.longAttackRightXy["x2"] = 80, aiNinja5.longAttackRightXy["y2"] = 80,
            aiNinja5.longAttackRightXy["x3"] = 160, aiNinja5.longAttackRightXy["y3"] = 80,
            aiNinja5.longAttackRightXy["x4"] = 240, aiNinja5.longAttackRightXy["y4"] = 80;
        aiNinja5.emissionAnimateXy["x1"] = 0, aiNinja5.emissionAnimateXy["y1"] = 870,
            aiNinja5.emissionAnimateXy["x2"] = 40, aiNinja5.emissionAnimateXy["y2"] = 870,
            aiNinja5.emissionAnimateXy["x3"] = 80, aiNinja5.emissionAnimateXy["y3"] = 870,
            aiNinja5.emissionAnimateXy["x4"] = 120, aiNinja5.emissionAnimateXy["y4"] = 870;

        aiNinja6 = new aiObject(0, 0, 75, 82, 1400, 500, 75, 82, 0);
        aiNinja6.standXy["leftX"] = 78, aiNinja6.standXy["leftY"] = 243;
        aiNinja6.standXy["rightX"] = 0, aiNinja6.standXy["rightY"] = 0;
        aiNinja6.longAttackLeftXy["x1"] = 410, aiNinja6.longAttackLeftXy["y1"] = 160,
            aiNinja6.longAttackLeftXy["x2"] = 490, aiNinja6.longAttackLeftXy["y2"] = 160,
            aiNinja6.longAttackLeftXy["x3"] = 570, aiNinja6.longAttackLeftXy["y3"] = 160,
            aiNinja6.longAttackLeftXy["x4"] = 650, aiNinja6.longAttackLeftXy["y4"] = 160;
        aiNinja6.longAttackRightXy["x1"] = 0, aiNinja6.longAttackRightXy["y1"] = 80,
            aiNinja6.longAttackRightXy["x2"] = 80, aiNinja6.longAttackRightXy["y2"] = 80,
            aiNinja6.longAttackRightXy["x3"] = 160, aiNinja6.longAttackRightXy["y3"] = 80,
            aiNinja6.longAttackRightXy["x4"] = 240, aiNinja6.longAttackRightXy["y4"] = 80;
        aiNinja6.emissionAnimateXy["x1"] = 0, aiNinja6.emissionAnimateXy["y1"] = 870,
            aiNinja6.emissionAnimateXy["x2"] = 40, aiNinja6.emissionAnimateXy["y2"] = 870,
            aiNinja6.emissionAnimateXy["x3"] = 80, aiNinja6.emissionAnimateXy["y3"] = 870,
            aiNinja6.emissionAnimateXy["x4"] = 120, aiNinja6.emissionAnimateXy["y4"] = 870;

        aiNinja7 = new aiObject(0, 0, 75, 82, 1400, 600, 75, 82, 0);
        aiNinja7.standXy["leftX"] = 78, aiNinja7.standXy["leftY"] = 243;
        aiNinja7.standXy["rightX"] = 0, aiNinja7.standXy["rightY"] = 0;
        aiNinja7.longAttackLeftXy["x1"] = 410, aiNinja7.longAttackLeftXy["y1"] = 160,
            aiNinja7.longAttackLeftXy["x2"] = 490, aiNinja7.longAttackLeftXy["y2"] = 160,
            aiNinja7.longAttackLeftXy["x3"] = 570, aiNinja7.longAttackLeftXy["y3"] = 160,
            aiNinja7.longAttackLeftXy["x4"] = 650, aiNinja7.longAttackLeftXy["y4"] = 160;
        aiNinja7.longAttackRightXy["x1"] = 0, aiNinja7.longAttackRightXy["y1"] = 80,
            aiNinja7.longAttackRightXy["x2"] = 80, aiNinja7.longAttackRightXy["y2"] = 80,
            aiNinja7.longAttackRightXy["x3"] = 160, aiNinja7.longAttackRightXy["y3"] = 80,
            aiNinja7.longAttackRightXy["x4"] = 240, aiNinja7.longAttackRightXy["y4"] = 80;
        aiNinja7.emissionAnimateXy["x1"] = 0, aiNinja7.emissionAnimateXy["y1"] = 870,
            aiNinja7.emissionAnimateXy["x2"] = 40, aiNinja7.emissionAnimateXy["y2"] = 870,
            aiNinja7.emissionAnimateXy["x3"] = 80, aiNinja7.emissionAnimateXy["y3"] = 870,
            aiNinja7.emissionAnimateXy["x4"] = 120, aiNinja7.emissionAnimateXy["y4"] = 870;

        aiObjectArr = [aiNinja, aiNinja2, aiNinja3, aiNinja4, aiNinja5, aiNinja6, aiNinja7];

        keyObject4 = new keyObject(1200, 450);
        keyInterval = setInterval(function () {
            if (boundingBoxCollision(playerObject, keyObject4)) {
                playerObject.keyGet = true;
                clearInterval(keyInterval);
            } else {
                draw(keyObject4);
            }
        }, 20);
    }

    function stage4Ai(aiObjectArr, keyObject4) {
        var ninjaAttackOption = [3, 4, 5, 6, 7];
        var range = ninjaAttackOption.length;
        ninjaAttackOption.splice(Math.floor(Math.random() * range), 1);

        aiObjectArr.forEach(function (aiObject, aiIndex) {
            clearImage(aiObject.posX, aiObject.posY, aiObject.wantedWidth, aiObject.wantedHeight);
            setFace(aiObject);
            draw(aiObject);
            aiObject.allowAttack = false;
            if (ninjaAttackOption.indexOf(aiIndex + 1) != -1) {
                aiObject.allowAttack = true;
            }
        });
        if (!aiNinja.attackLaunched) {
            aiAttackCallSlow(playerImage, aiNinja.longAttackLeftXy, aiNinja.longAttackRightXy, aiNinja);
            aiEmission = new emissionObject(aiNinja, "vertical");
            aiAttackCallSlow(playerImage, aiNinja.longAttackLeftXy, aiNinja.longAttackRightXy, aiNinja);
            aiEmission = new emissionObject(aiNinja, "line");
        }
        if (!aiNinja2.attackLaunched) {
            aiAttackCallSlow(playerImage, aiNinja2.longAttackLeftXy, aiNinja2.longAttackRightXy, aiNinja2);
            aiEmission = new emissionObject(aiNinja2, "vertical");
            aiAttackCallSlow(playerImage, aiNinja2.longAttackLeftXy, aiNinja2.longAttackRightXy, aiNinja2);
            aiEmission = new emissionObject(aiNinja2, "line");
        }
        if (!aiNinja3.attackLaunched && !aiNinja4.attackLaunched && !aiNinja5.attackLaunched && !aiNinja6.attackLaunched && !aiNinja7.attackLaunched) {
            if (aiNinja3.allowAttack) {
                aiAttackCall(playerImage, aiNinja3.longAttackLeftXy, aiNinja3.longAttackRightXy, aiNinja3);
                aiEmission = new emissionObject(aiNinja3, "horizontal");
            }
            if (aiNinja4.allowAttack) {
                aiAttackCall(playerImage, aiNinja4.longAttackLeftXy, aiNinja4.longAttackRightXy, aiNinja4);
                aiEmission = new emissionObject(aiNinja4, "horizontal");
            }
            if (aiNinja5.allowAttack) {
                aiAttackCall(playerImage, aiNinja5.longAttackLeftXy, aiNinja5.longAttackRightXy, aiNinja5);
                aiEmission = new emissionObject(aiNinja5, "horizontal");
            }
            if (aiNinja6.allowAttack) {
                aiAttackCall(playerImage, aiNinja6.longAttackLeftXy, aiNinja6.longAttackRightXy, aiNinja6);
                aiEmission = new emissionObject(aiNinja6, "horizontal");
            }
            if (aiNinja7.allowAttack) {
                aiAttackCall(playerImage, aiNinja7.longAttackLeftXy, aiNinja7.longAttackRightXy, aiNinja7);
                aiEmission = new emissionObject(aiNinja7, "horizontal");
            }
        }
    }
    //--- 10 end of stage 4 ---//
    // 
    // 
    // 
    // 
    //     
    //--- 11 start of stage 5 ---//

    //--- 11 end of stage 5 ---//
}

//draw(ai);
        //console.log(playerObject.posX + " " + playerObject.posY + " " + ai5.posX + " " + ai5.posY);
        //console.log(ai5.hp);
        //1.aiAttackCall function is call for short or long attack for ai
        //change the attackLeft and attackRight array for short and long attack
        //it will run the animation for you
        //2.emissionObject is to create a long attack object, can apply horizontal or vertical attack for now
        //set all the status of emissionObject and then run the emissionAnimation
        //in emissionAnimation, it will also check the collision
        //checkEmissionCollision if hit the player will reduce player hp
        //!!! here launch one long attack here !!!
        // aiAttackCall(playerImage, aiNinja5.longAttackLeftXy, aiNinja5.longAttackRightXy, aiNinja5);
        // aiEmission = new emissionObject(aiNinja5, "horizontal");

        //1.shortAttackObject create a short attack for ai or player
        //set the wanted width and height for the attack collision area
        //2.aiAttackCall function is call for short or long attack for ai
        //3.updateShortAttackObject set start position x and y for collision when face left and right
        //set small bounding box based on image attack animate
        //4.shortAttackCollision pass the launch attack object and target object to check
        //if return true reduce target object hp
        //!!! here launch one short attack here !!!
        // aiNinja5.shortAttackObject = new shortAttackObject(15, 15);
        // aiAttackCall(playerImage, aiNinja5.shortAttackLeftXy, aiNinja5.shortAttackRightXy, aiNinja5);
        //
        // updateShortAttackObject(aiNinja5.shortAttackObject, aiNinja5.posX, aiNinja5.posY + 42, aiNinja5.posX + 55, aiNinja5.posY + 43);
        // if (shortAttackCollision(aiNinja5, playerObject)) {
        //     reduceHp(playerObject, Math.floor(Math.random() * 10) + 1);
        // }

        function applyStage(stageNo){
            clearInterval(keyInterval);
            console.log(playerObject.speed);
            stage = stageNo;
            init();
            ctx.clearRect(0,0,1500,700);
            console.log(playerObject.speed);
        }

setTimeout(function(){
    //applyStage(4);
},3000);
        