const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine , world;

var king , kingImage;
var castle , castleImage;
var rubber , enemy , button1;
var arrow , bomb , arrow1;
var platformImage , platform , backImg , back , platform1;
var enemy , enemyImg , arrowImg , enemyArrow, enemy1;
var time = 0;
var score = 0;
var ground, groundImage;
var arrowgroup;
var health = 1000;
var collide , invisibleBlock , reset , resetImage , block;
var Play = 1;
var End = 0;
var gameState = Play;

function preload(){
  kingImage = loadImage("king.png");
  castleImage = loadImage("castle.png");
  platformImage = loadImage("platform.png");
  backImg = loadImage("back.jpg");
  enemyImg = loadImage("enemy.png");
  arrowImg = loadImage("sprite_0.png");
  enemyArrow = loadImage("sprite_0enemy.png");
  groundImage = loadImage("ground-1.svg");
  resetImage = loadImage("reset.png");
}

function setup(){
  engine = Engine.create();
  world = engine.world;

  createCanvas(displayWidth , displayHeight);

  back = createSprite(displayWidth/2 , displayHeight/2 , displayWidth , displayHeight);
  back.addImage(backImg);
  back.scale = 1.2;

  collide = createSprite(30,displayHeight/2,1,displayHeight);
  collide.visible = false;

  castle = createSprite(200,400,20,200);
  castle.addImage(castleImage);
  castle.scale = 2.0;

  king = createSprite(190,170,20,200);
  king.addImage(kingImage);
  king.scale = 0.2;

  platform = createSprite(displayWidth-200 , displayHeight-300 , 50 , 700);
  platform.addImage(platformImage);
  
  enemy = createSprite(displayWidth-200 , displayHeight-450 , 80  ,180);
  enemy.addImage(enemyImg);
  enemy.scale = 0.6;

  
  invisibleBlock = new Block(580,170);
  //I want to add below line so how can I add 
  // invisibleBlock = new Block(enemy.x-52 , enemy.y+10)


  arrow = new Arrow(300,108);

  // block = createSprite(enemy.x-52 , enemy.y+10 , 10,130)

  rubber = new Sling(arrow.body , {x:210 , y:170});


  arrowgroup = new Group();

  reset = createSprite(displayWidth/2 , displayHeight/2 , 50 , 50);
  reset.addImage(resetImage);


}


function draw() {
  background(100,200,300);  
  Engine.update(engine);

  

  drawSprites();
  noStroke();
  fill(0);
  textSize(30);
  text("score : " + score, displayWidth-170,50);
  text("time : " + time , 20 , 50);
  text("health : " + health , 520 , 50);
 
  // arrow1.display();


if(gameState === Play){
          reset.visible = false;

          invisibleBlock.display();
          arrow.display();
          rubber.display();
          spawnArrows();
          //collide
          if(arrow.body.position.x == invisibleBlock.body.position.x && arrow.body.position.y == invisibleBlock.body.position.y){
            enemy.x = random(displayWidth-1000 , displayWidth-100);
            enemy.y = random(displayHeight-600 , displayHeight-300);
            Matter.body.setPosition(invisibleBlock.body , {x:enemy.x , y:enemy.y})
            platform.x = enemy.x;
            platform.y = enemy.y+150;
            score = score+1;
          
        }

        //difficulty
        if(score>0 && score%5 === 0){

          spawnArrows();
        }

        //health
        if(arrowgroup.isTouching(collide)){
          health--;
        }

        //time
        if(frameCount%30 === 0){
          time++;
        }

        //attach the arrow
        if(arrow.body.position.x > displayWidth || arrow.body.position.y > displayHeight){
          Matter.Body.setPosition(arrow.body , {x:300, y:108});
          rubber.attach(arrow.body);
        }

        
        if(time === 60 || health === 0){
          gameState = End;

        }

}

else if( gameState === End){
  textSize(70);
  strokeWeight(8);
  fill(rgb(0,0, 255));
  stroke(rgb(300,0,0));
  text("Game Over!" , displayWidth/2-200 , displayHeight/2-200 );



  arrowgroup.setVelocityXEach(0);
  arrowgroup.setLifetimeEach(-1);
  reset.visible = true;

  if(mousePressedOver(reset)){
    restart();
    
  }

}
 
}

function mouseDragged(){
  Matter.Body.setPosition(arrow.body , {x:mouseX , y:mouseY});
}

function mouseReleased(){
  rubber.release();
  
}

function spawnArrows(){
  if (frameCount % 100 === 0) {
    var cloud = createSprite(enemy.x-10,enemy.y,10,10);
    cloud.y = Math.round(random(enemy.y-10,enemy.y + 40));
    cloud.addImage(enemyArrow);
    cloud.scale = 0.13;
    cloud.velocityX = -3;
    arrowgroup.add(cloud);
  }
}

function restart(){
  gameState = Play;
  score = 0;
  time = 0;
  health = 1000;
  arrowgroup.destroyEach();
}


 
  


