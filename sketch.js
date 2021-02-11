var balloon, balloonPosition;
var database;

function preload(){
  bg = loadImage("images/images/bg.png");
  balloonImage1 = loadImage("images/images/Hot Air Balloon-01.png");
  balloonImage2 = loadImage("images/images/Hot Air Balloon-02.png");
  balloonImage3 = loadImage("images/images/Hot Air Balloon-03.png");
}

function setup() {
  database = firebase.database();
  balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
  createCanvas(1400, 800);
  balloon = createSprite(150, 550, 50, 50);
  balloon.addAnimation("image1", balloonImage1);
}

function draw() {
  background(bg);
  drawSprites();

  strokeWeight(5);
  textFont("Copperplate")
  stroke("navy");
  fill("yellow");
  textSize(20);
  text("Use the Arrow Keys to Move the Balloon", 40, 50);
  
  if(keyDown(LEFT_ARROW)){
    updatePosition(-10, 0);
    balloon.addAnimation("image1", balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10, 0);
    balloon.addAnimation("image1", balloonImage3);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0, -10);
    balloon.scale = balloon.scale - 0.01;
    balloon.addAnimation("image1", balloonImage1);
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0, 10);
    balloon.scale = balloon.scale + 0.01;
    balloon.addAnimation("image1", balloonImage2);
  }
}

function updatePosition(x, y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}