var PLAY = 1;
var END = 0;
var gameState = PLAY;

var chicken, chicken_running, chicken_collided;
var ground, groundImage;

// var blueG, redG, silverG, yellowG, turquoiseG;
var blueCar, yellowCar, redCar, turquoiseCar, silverCar;
var blueCarImg, yellowCarImg, redCarImg, turquoiseCarImg, silverCarImg;
var blueG, yellowG, redG, turquoiseG, silverG; 


var score=0;
var gameOverImg, restartImg;

function preload(){
 chicken_running = loadAnimation ("Chicken 1.png", "chicken 2.png", "chicken 3.png", "chicken 4.png", "chicken 5.png", "chicken 6.png");
 chicken_collided = loadAnimation ("dying chick.png");
 groundImage = loadImage ("path.png");

  blueCarImg = loadImage("blueCar.png");
  redCarImg = loadImage("redCar.png");
  silverCarImg = loadImage("silverCar.png");
  turquoiseCarImg = loadImage("turquoiseCar.png");
  yellowCarImg = loadImage("yellowCar.png");
  
   restartImg = loadImage("restartButton.png"); 
 gameOverImg = loadImage("Game-Over.png");

}

function setup() {
 createCanvas(windowWidth,windowHeight);

 ground = createSprite(width/2,height/2);
 ground.addImage (groundImage);
 ground.velocityX = -4;
 ground.scale = 1.75;

 chicken = createSprite (width/2, height-20,20,20);
 chicken.addAnimation ("run", chicken_running);
 chicken.addAnimation("died", chicken_collided);
 chicken.scale = 0.8;

 gameOver = createSprite(windowWidth/2, windowHeight/2-50,200,130);
 gameOver.addImage(gameOverImg);

 restart = createSprite(width/50,height/50);
 restart.addImage (restartImg);

 gameOver.scale = 2.85;
 restart.scale = 0.1;

 gameOver.visible = false;
 restart.visible = false;


 blueG = new Group();
 yellowG = new Group();
 redG = new Group();
 turquoiseG = new Group();
 silverG = new Group();

 carsGroup = new Group();

 chicken.setCollider("rectangle",0,50,100,1);
 chicken.debug = true
 score = 0;
}

function draw() {


  
 if(ground.x < 525){
   ground.x = ground.width-50;

  }


 if(gameState === PLAY){
    background(groundImage);
   chicken.y = World.mouseY;
   chicken.x = World.mouseX;
   gameOver.visible = false
   ground.velocityX = -4;
   restart.visible = false
   score = score + Math.round(frameCount/40);
   ground.depth = score.depth
   score.depth +=1;
   score = score + Math.round(getFrameRate()/200);
   

 //var block = createSprite(0,400,500,1000);

  
 

 edges = createEdgeSprites();
 chicken.collide(edges);
 
 
 createBlueCar();


}


 if(blueG.isTouching(chicken)){
  gameState = END;
}
  else if (yellowG.isTouching(chicken)){
  gameState = END;
  }
  else if (redG.isTouching(chicken)){
  gameState = END;
  }
  else if (turquoiseG.isTouching(chicken)){
  gameState = END;
  }
  else if (silverG.isTouching(chicken)){
  gameState = END;
 }
  
 else if (gameState === END){
   gameOver.visible = true;
    ground.velocityX = 0;
   chicken.velocityY = 0;
   chicken.changeAnimation("collided",chicken_collided);

   restart.visible = true;
   blueG.setVelocityEach(0);
   blueG.setLifetimeEach(-1);
   redG.setVelocityEach(0);
   redG.setLifetimeEach(-1);
   yellowG.setVelocityEach(0);
   yellowG.setLifetimeEach(-1);
   turquoiseG.setVelocityEach(0);
   turquoiseG.setLifetimeEach(-1);
   silverG.setVelocityEach(0);
   silverG.setLifetimeEach(-1);
  ground.depth = score.depth
   score.depth +=1;
}


  drawSprites();
  textSize(20);
  fill("green")
  text("Score: "+ score,width-200,height/2-200);
 }

 if(carsGroup.collide(chicken)){
  gameState = END;
 } 


function score(){
  if (blueG.isTouching(rightEdge)){
    score += 1;
  }
}


 
function createBlueCar(){
  if(World.frameCount % 200 === 0){
     var blueCar = createSprite(100,random(40,600),10,10);
     blueCar.addImage(blueCarImg);
     blueCar.velocityX = random(2,8);
     blueCar.lifetime = 400
     blueG.add(blueCar);
     blueCar.scale = 1.5
     blueCar.setCollider("rectangle",0,0,200,100)
     blueCar.debug = false
     blueCar.depth = chicken.depth
     chicken.depth = chicken.depth +1
     blueCar.depth = gameOver.depth
     gameOver.depth +=1

  }
  if(World.frameCount % 140 === 0){
    var redCar = createSprite(100,random(60,650),10,10);
    redCar.addImage(redCarImg);
    redCar.velocityX = random(10,15);
    redCar.lifetime = 400
    redG.add(redCar);
    redCar.scale = 1.5
    redCar.depth = gameOver.depth
     gameOver.depth +=1
  }
  if (World.frameCount % 225 === 0){
    var yellowCar = createSprite(100,random(40,650),10,10);
    yellowCar.addImage(yellowCarImg);
    yellowCar.velocityX = random(2,5)
    yellowCar.lifetime = 400;
    yellowG.add(yellowCar);
    yellowCar.scale = 1.5
    yellowCar.depth = gameOver.depth
    gameOver.depth +=1
  }
  if (World.frameCount % 159 === 0){
    var silverCar = createSprite(100,random(60,650),10,10);
    silverCar.addImage(silverCarImg);
    silverCar.velocityX = random(2,10);
    silverCar.lifetime = 400;
    silverG.add(silverCar);
    silverCar.scale = 1.5
    silverCar.depth = gameOver.depth
    gameOver.depth +=1
  }
  if (World.frameCount % 176 === 0){
    var turquoiseCar = createSprite(100,random(60,650),10,10);
    turquoiseCar.addImage(turquoiseCarImg);
    turquoiseCar.velocityX = random(2,9);
    turquoiseCar.lifetime = 400;
    turquoiseG.add(turquoiseCar);
    turquoiseCar.scale = 0.6;
    turquoiseCar.depth = gameOver.depth
    gameOver.depth +=1
  }
  
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  blueG.destroyEach();
  redG.destroyEach();
  yellowG.destroyEach();
  turquoiseG.destroyEach();
  silverG.destroyEach();
  
  chicken.changeAnimation("running",chicken_running);
  
  score = 0;
  
}





