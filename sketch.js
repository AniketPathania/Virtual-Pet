var dog,dogIMG, happyDog, foodS, foodStock;
var database;

function preload()
{
    dogIMG=loadImage("dogImg.png");
    happyDog=loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  
    dog = createSprite(250,250,250,100);
    dog.addImage(dogIMG);
    dog.scale = 0.2

    foodStock=database.ref("Food");
    foodStock.on("value",readStock);



}


function draw() {  
background(46, 139, 87);
if(foodS > 0){
   if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDog);
   }
  }
  drawSprites();
  //add styles here
  textSize(12);
  fill("white");
 text("food left : " + foodS,100,200);
 textSize(13);
 text("Note : Press up arrow key to feed the dog",150,100);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

if(x<=0){
  x = 0;
}else{
  x=x-1
}


  database.ref("/").update({
   Food:x
  })
}


