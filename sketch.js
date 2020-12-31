//defining variables
var dog, database, foodS, foodStock;
var dogImage, happyDogImage;

function preload()
{
  //loading images
  dogImage = loadImage("dogimg.png");
  happyDogImage = loadImage("dogimg1.png");
}

function setup() {
  database = firebase.database();


  createCanvas(500,500);
  
  dog = createSprite(250,290);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  dog.addImage(dogImage);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

 

  drawSprites();
  
  textSize(20);
  fill("red");
  stroke("pink");
  strokeWeight(1);
  text("Press the UP ARROW key continuously to feed Drago",10,40);

  textSize(20);
  fill("yellow");
  stroke("lightgreen");
  strokeWeight(2);
  text("Food remaining: " + foodS,150,200);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
  Food:x
  })
}


