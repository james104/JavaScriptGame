//player status and function
setInterval(playerAction, 20);

//player status
function playerObject(){
    this.speed = 5;
    this.x = 100;
    this.y = 100;
}

//create player image
playerImage = new Image();
playerImage.id = "playerImage";
playerImage.src = "img/woody_0.bmp";
playerImage.onload = drawInCanvas(ctx,"player",playerImage,0,0,80,80,100,100);

var playerObject = new playerObject();
var keyStatus = [];

//record input
document.onkeydown = function(key){
    keyStatus[key.keyCode] = true;
};

//remove input
document.onkeyup = function(key){
    delete keyStatus[key.keyCode];
};

//x = start x, y = start y, w = width, h = height, face = direction facing
var playerImageX, playerImageY, playerImageW, playerImageH, playerFace = "right";
//animate = animation count, repeat = after few times change animation
var playerWalkAnimate = 1, playerWalkRepeat = 0;
var playerAttackAnimte = 1, playerAttackRepeat = 0;


//definc all player action in here
function playerAction(){
    //check player movement only for arrow key
    if(keyStatus[37] || keyStatus[38] || keyStatus[39] || keyStatus[40]){
        //clear the previous player image
        ctx.clearRect(playerObject.x,playerObject.y,playerImage.width,playerImage.height);
    
        //assign new postion and dicide facing
        if (keyStatus[37]){//left            
            playerObject.x -= playerObject.speed;
            playerImage.src = "img/woody_0_mirror.bmp";
            playerFace = "left";
        }
        if (keyStatus[38]){//up
            playerObject.y -= playerObject.speed;
        }
        if (keyStatus[39]){//right
            playerObject.x += playerObject.speed;
            playerImage.src = "img/woody_0.bmp";
            playerFace = "right";            
        }
        if (keyStatus[40]){//down
            playerObject.y += playerObject.speed;
        }
        playerWalkAnimation();
        return true;
    }


    if(keyStatus[68]){//D(attack)
        playerAttackAnimation();
        return true;
    }

    //when no movement draw player standing image
    playerWalkAnimate = 1, playerWalkRepeat = 0;
    playerAttackAnimte = 1, playerAttackRepeat = 0;
    if(playerFace == "left"){
        playerImageX = 720, playerImageY = 0, playerImageW = 80, playerImageH = 80;
        drawInCanvas(ctx,"player",playerImage,playerImageX,playerImageY,playerImageW,playerImageH,playerObject.x,playerObject.y);
    }else if(playerFace == "right"){
        playerImageX = 0, playerImageY = 0, playerImageW = 80, playerImageH = 80;
        drawInCanvas(ctx,"player",playerImage,playerImageX,playerImageY,playerImageW,playerImageH,playerObject.x,playerObject.y);
    }
}

function playerWalkAnimation(){
    //add 1 for each move
    playerWalkRepeat++;
    if(playerWalkRepeat == 5){
        //add 1 for count the walk animation
        playerWalkAnimate++;
        //reset for next walk animation
        playerWalkRepeat = 0;
    }
    
    //check facing left/right and assign image position for walk animation
    if(playerFace == "left"){
        switch(playerWalkAnimate){
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
    }else if(playerFace == "right"){
        switch(playerWalkAnimate){
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
    drawInCanvas(ctx,"player",playerImage,playerImageX,playerImageY,playerImageW,playerImageH,playerObject.x,playerObject.y);
}

function playerAttackAnimation(){
    //add 1 for each move
    playerAttackRepeat++;
    if(playerAttackRepeat == 5){
        //add 1 for count the walk animation
        playerAttackAnimte++;
        //reset for next walk animation
        playerAttackRepeat = 0;
    }
    
    //check facing left/right and assign image position for walk animation
    if(playerFace == "left"){
        switch(playerAttackAnimte){
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
    }else if(playerFace == "right"){
        switch(playerAttackAnimte){
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
    drawInCanvas(ctx,"player",playerImage,playerImageX,playerImageY,playerImageW,playerImageH,playerObject.x,playerObject.y);
}