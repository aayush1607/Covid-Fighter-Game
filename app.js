

function load_images(){


    //enemy image
    eimage=new Image;
    eimage.src="images/v1.png";

    e2image=new Image;
    e2image.src="images/v2.png";

    //player image
    pimage=new Image;
    pimage.src="images/superhero.png";


    //gem image
    gimage=new Image;
    gimage.src="images/gemm.png";




}


function init(){


    

    canvas= document.getElementById("mycanvas");
    console.log(canvas);
    W=700;
    H=400;
    canvas.width=W;
    canvas.height=H;
    game_over=false;


    // create a context object
    pen = canvas.getContext('2d');


    e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 40,
	};
	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 40,
	};
	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 60,
	};
    
    enemy = [e1,e2,e3];


    player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
        moving  : false,
        health : 100,
	};
    
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
    };



    // listener
    canvas.addEventListener('mousedown',function(){

        player.moving=true;
    });
    canvas.addEventListener('mouseup',function(){

        player.moving=false;
    });
    

    




}

function detect_collison(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
         return true
         }
         
         return false;
}

function draw(){


    pen.clearRect(0,0,W,H);

    pen.drawImage(pimage,player.x,player.y,player.w,player.h);
    pen.drawImage(gimage,gem.x,gem.y,gem.w,gem.h);


    for(let i=0;i<enemy.length;i++){

        if(i==1){


            pen.drawImage(e2image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);

        }
        else
        {
        pen.drawImage(eimage,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
        }
    }

    pen.fillText("Score: "+player.health,10,10);

    
   



}

function update(){



    //check for overlap



    if(detect_collison(player,gem)){

        game_over=true;
        return;
    }

    for(let i=0;i<enemy.length;i++){

        if(detect_collison(player,enemy[i])){

            player.health-=130;
        }

        if(player.health<0){
            pen.clearRect(0,0,100,100);
            pen.fillText("Score: "+player.health,10,10);

            game_over=true;
            
        }
    }

    


    //move player
    if(player.moving==true){

        player.x+=player.speed;
        player.health+=5;
    }


    //enemy movement
    for(let i=0;i<enemy.length;i++){

        enemy[i].y+=enemy[i].speed;

        if(enemy[i].y>=H-enemy[i].h || enemy[i].y<=0){
            enemy[i].speed*=-1;
        }

    }


}

function gameloop(){

    if(game_over==true){

        clearInterval(f);
        if(player.health<0){

            alert("You Lose");
            return;

        }
        else{

            pen.fillText("Score: "+player.health,10,10);
            alert("You Won "+player.health);
            
        
        return;
        }
    }


    draw();
    update();


}

load_images();
init();
var f= setInterval(gameloop,100);
