var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  
  ghost = createSprite(300,400,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4
}

function draw() {
  background(200);
  


  if (gameState === "play") {
    if(tower.y > 400){
      tower.y = 300;
    }

    if(keyDown("SPACE")){
      ghost.velocityY = -12;
    }
    ghost.velocityY = ghost.velocityY + 1;
  
    if(keyDown("right_arrow")){
      ghost.x = ghost.x +2;
    }
  
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -2;
    }
    
    if(ghost.x > 600 || ghost.x < 0 || ghost.y > 600 || ghost.y < 0 || doorsGroup.isTouching(ghost)){
      gameState = "end";
    }

    spawnObstacles();
  }
  
  if(gameState === "end") {
   tower.velocityY = 0;
   ghost.velocityY = 0;
   door.velocityY = 0;
  }

  
  
  
  drawSprites();
}

function spawnObstacles() {
 if(frameCount % 300 === 0){
  door = createSprite(300,-10);
  door.addImage(doorImg);
  door.velocityY = 1;
  door.x = Math.round(random(100,500));
  door.lifetime = 650;
  doorsGroup.add(door);
  
  ghost.depth = door.depth
  ghost.depth = ghost.depth +1
 }
}

