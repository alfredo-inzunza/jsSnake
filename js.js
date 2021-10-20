
var cuerpos = [];
var alimentos = [];
var lienzo = document.getElementById('lienzo');
var ctx = lienzo.getContext('2d');
var derecha = false;
var izquierda = false;
var arriba = false;
var abajo = false;
var ctr = 0;
var locker = 0;
var gameover = false;
var intervalo = false;
var speed = 0;
var scoreHeight = 60;
var bodyWidth = 20;
var foodWidth = bodyWidth;
var nextWidth = lienzo.width;
var startWidth = lienzo.width;
var lastPress = 'derecha';
var giros = [];
var vel_inicio = 10;
var next_foods;
var maxComidas = 200;
var comidas = [];





function keyDownHandler(e) {

if(e.keyCode == 39&&lastPress!='derecha') {
arriba = false;
abajo = false;
derecha = true;
izquierda = false;
lastPress = 'derecha';
giros.push(lastPress);
} else if(e.keyCode == 37&&lastPress!='izquierda') {
arriba = false;
abajo = false;
derecha = false;
izquierda = true;
lastPress = 'izquierda';
giros.push(lastPress);
} else if(e.keyCode == 38&&lastPress!='arriba') {
arriba = true;
abajo = false;
izquierda = false;
derecha = false;
lastPress = 'arriba';
giros.push(lastPress);
} else if(e.keyCode == 40&&lastPress!='abajo') {
abajo = true;
arriba = false;
izquierda = false;
derecha = false;
lastPress = 'abajo';
giros.push(lastPress);
}
if(e.keyCode == 32) {
dibujar();
}
    console.log(giros);
}

function keyUpHandler(e) {
arriba = false;
abajo = false;
derecha = false;
izquierda = false;
}



class Alimento {
constructor(x,y,width,color){
this.x = x;
this.y = y;
this.width = width;
this.color = color;
this.active = true;
}
}

class Cuerpo {
constructor(x,y,width,color,dy,dx){
ctr++;
if(cuerpos.length==0) {
var tipo = 'cabeza';
var next = lastPress;
var xf = -100;
var yf = -100;
this.xf = [xf];
this.yf = [yf];
}
else {
var tipo = 'tronco';
var next = cuerpos[0].next[0];
this.xf = [];
this.yf = [];
}

this.x = x;
this.y = y;
this.dx = dx;
this.dy = dy;
this.width = width;
this.color = color;
this.tipo = tipo;
this.ctr = ctr;
this.following = ctr-1;
this.next = [];
}
}

function lienzoWidth(){
    if(score>=120) nextWidth = 800;
    else if(score>=100) nextWidth = 700;
    else if(score>=85) nextWidth = 600;
    else if(score>=65) nextWidth = 500;
    else if(score>=50) nextWidth = 400;
    if(lienzo.width<nextWidth) lienzo.width = lienzo.width+1;
}

function calcularMovimientos(){
for(cuerpo of cuerpos){
if(cuerpo.tipo=='cabeza'){
if(Math.abs(locker%bodyWidth)==0&&giros[0]=='derecha'&&cuerpo.dx!=1) {
if(cuerpo.dx==-1&&cuerpos.length>1) gameover = true;
    giros.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('derecha');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
console.log("ctr:"+cuerpo.ctr+", x:"+cuerpo.x+", y:"+cuerpo.y+" pushed(xynext):"+cuerpos[cuerpo.ctr].xf+" "+cuerpos[cuerpo.ctr].yf+" "+cuerpos[cuerpo.ctr].next);
}
cuerpo.dx = 1;
cuerpo.dy = 0;
derecha = false;
locker = (cuerpo.width/Math.abs(cuerpo.dx));
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='izquierda'&&cuerpo.dx!=-1) {
if(cuerpo.dx==1&&cuerpos.length>1) gameover = true;
    giros.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('izquierda');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
console.log("ctr:"+cuerpo.ctr+", x:"+cuerpo.x+", y:"+cuerpo.y+" pushed(xynext):"+cuerpos[cuerpo.ctr].xf+" "+cuerpos[cuerpo.ctr].yf+" "+cuerpos[cuerpo.ctr].next);
}
cuerpo.dx = -1;
cuerpo.dy = 0;
izquierda = false;
locker = (cuerpo.width%Math.abs(cuerpo.dx));
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='arriba'&&cuerpo.dy!=-1) {
if(cuerpo.dy==1&&cuerpos.length>1) gameover = true;
    giros.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('arriba');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
console.log("ctr:"+cuerpo.ctr+", x:"+cuerpo.x+", y:"+cuerpo.y+" pushed(xynext):"+cuerpos[cuerpo.ctr].xf+" "+cuerpos[cuerpo.ctr].yf+" "+cuerpos[cuerpo.ctr].next);
}
cuerpo.dx = 0;
cuerpo.dy = -1;
arriba = false;
locker = (cuerpo.width/Math.abs(cuerpo.dy));
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='abajo'&&cuerpo.dy!=1) {
if(cuerpo.dy==-1&&cuerpos.length>1) gameover = true;
giros.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('abajo');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
console.log("ctr:"+cuerpo.ctr+", x:"+cuerpo.x+", y:"+cuerpo.y+" pushed(xynext):"+cuerpos[cuerpo.ctr].xf+" "+cuerpos[cuerpo.ctr].yf+" "+cuerpos[cuerpo.ctr].next);
}
cuerpo.dx = 0;
cuerpo.dy = 1;
abajo = false;
locker = (cuerpo.width/Math.abs(cuerpo.dy));
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='abajo'&&cuerpo.dy==1&&cuerpos.length>=2) {
gameover = true;
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='arriba'&&cuerpo.dy==-1&&cuerpos.length>=2) {
    gameover = true;
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='derecha'&&cuerpo.dx==1&&cuerpos.length>=2) {
    gameover = true;
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='izquierda'&&cuerpo.dy==-1&&cuerpos.length>=2) {
    gameover = true;
}else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='abajo'&&cuerpo.dy==0&&cuerpos.length==1) {
console.log("OK1");
    giros.shift();
    cuerpo.dy = 1;
    cuerpo.dx = 0;
abajo = false;
locker = (cuerpo.width%Math.abs(cuerpo.dy));
    }else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='arriba'&&cuerpo.dy==0&&cuerpos.length==1) {
console.log("OK2");
        giros.shift();
        cuerpo.dy = -1;
    cuerpo.dx = 0;
arriba = false;
locker = (cuerpo.width%Math.abs(cuerpo.dy));
    }else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='derecha'&&cuerpo.dx==0&&cuerpos.length==1) {
console.log("OK3");
        giros.shift();
        cuerpo.dy = 0;
    cuerpo.dx = 1;
derecha = false;
locker = (cuerpo.width%Math.abs(cuerpo.dx));
    }else if(Math.abs(locker%bodyWidth)==0&&giros[0]=='izquierda'&&cuerpo.dy==0&&cuerpos.length==1) {
console.log("OK4");
        giros.shift();
        cuerpo.dy = 0;
cuerpo.dx = -1;
izquierda = false;
locker = (cuerpo.width%Math.abs(cuerpo.dx));
    }
cuerpo.x = cuerpo.x+cuerpo.dx;
cuerpo.y = cuerpo.y+cuerpo.dy;
ctx.beginPath();
ctx.rect(cuerpo.x, cuerpo.y, cuerpo.width, cuerpo.width);
ctx.fillStyle = cuerpo.color;
ctx.fill();
ctx.closePath();
break;
locker--;
}
}
}

function calcularMovimientosCuerpo(){
for(cuerpo of cuerpos){
if(cuerpo.tipo=='tronco'&&cuerpo.x==cuerpo.xf[0]&&cuerpo.y==cuerpo.yf[0]){

console.log(" next:"+cuerpo.next+" x:"+ cuerpo.x+" y:"+cuerpo.y+" ctr:"+cuerpo.ctr+" xf:"+cuerpo.xf+" yf:"+cuerpo.yf);
if(cuerpo.next[0]=='derecha') {
cuerpo.next.shift();
cuerpo.yf.shift();
cuerpo.xf.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('derecha');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
}
cuerpo.dx = 1;
cuerpo.dy = 0;
}else if(cuerpo.next[0]=='izquierda') {
cuerpo.next.shift();
cuerpo.yf.shift();
cuerpo.xf.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('izquierda');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
}
cuerpo.dx = -1;
cuerpo.dy = 0;
}else if(cuerpo.next[0]=='arriba') {
cuerpo.next.shift();
cuerpo.yf.shift();
cuerpo.xf.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('arriba');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
}
cuerpo.dx = 0;
cuerpo.dy = -1;
}else if(cuerpo.next[0]=='abajo') {
cuerpo.next.shift();
cuerpo.yf.shift();
cuerpo.xf.shift();
if(cuerpos.length>cuerpo.ctr) {
cuerpos[cuerpo.ctr].next.push('abajo');
cuerpos[cuerpo.ctr].xf.push(cuerpo.x);
cuerpos[cuerpo.ctr].yf.push(cuerpo.y);
}
cuerpo.dx = 0;
cuerpo.dy = 1;
}
//cuerpo.xf = cuerpos[cuerpo.following-1].x;
//cuerpo.yf = cuerpos[cuerpo.following-1].y;
cuerpo.x = cuerpo.x+cuerpo.dx;
cuerpo.y = cuerpo.y+cuerpo.dy;
ctx.beginPath();
ctx.rect(cuerpo.x, cuerpo.y, cuerpo.width, cuerpo.width);
ctx.fillStyle = cuerpo.color;
ctx.fill();
ctx.closePath();
console.log("------");
}else if(cuerpo.tipo=="tronco"){
cuerpo.x = cuerpo.x+cuerpo.dx;
cuerpo.y = cuerpo.y+cuerpo.dy;
ctx.beginPath();
ctx.rect(cuerpo.x, cuerpo.y, cuerpo.width, cuerpo.width);
ctx.fillStyle = cuerpo.color;
ctx.fill();
ctx.closePath();
}
}
}

function dibujarScore(){
   
    ctx.beginPath();
        if(gameover) color = 'red';
        else color = 'blue';
        if(alimentos.length-1<0) score = 0;
        else score = alimentos.length-1;
        if(speed>15) var speedtxt = 15;
        else var speedtxt = speed;
        ctx.rect(0,0,lienzo.width,scoreHeight);
        ctx.fillStyle = '#fff';;
        ctx.fill();
        ctx.closePath();
        ctx.font = "35px Arial";
        ctx.fillStyle = color;
        ctx.fillText("Score:"+score, 20,42);
        ctx.fillText("Speed:"+speedtxt, 220, 42);
    }
   



function dibujarCuerpo(){
for(cuerpo of cuerpos){
ctx.beginPath();
    ctx.rect(cuerpo.x, cuerpo.y, cuerpo.width, cuerpo.width);
    ctx.fillStyle = cuerpo.color;
    ctx.fill();
    ctx.closePath();
}
}

function dibujarAlimento(){
for(alimento of alimentos){
//console.log("dibujando alimento")
if(alimento.active == true){
	ctx.beginPath();
    ctx.rect(alimento.x, alimento.y, alimento.width, alimento.width);
    ctx.fillStyle = alimento.color;
    ctx.fill();
    ctx.closePath();
}else {
    if(alimento.width>0){
    alimento.x = alimento.x+1;
    alimento.y = alimento.y+1;
    alimento.width=alimento.width-2;
    ctx.beginPath();
    ctx.rect(alimento.x, alimento.y, alimento.width, alimento.width);
    ctx.fillStyle = alimento.color;
    ctx.fill();
    ctx.closePath();
   
 
    }
}
}
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle=comidas[0].color;
	ctx.rect(comidas[0].x, comidas[0].y, comidas[0].width, comidas[0].width);
    ctx.stroke();
    ctx.closePath();
}


function dibujarGameOver(){
var color = 'rgb(' + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 50)) + ", " + String(Math.floor(Math.random() * 50)) + ")"
for(cuerpo of cuerpos){
if(cuerpo.width>=28||cuerpo.following == -1) {
var inv = 1;
cuerpo.following = -1;
}
else if(cuerpo.following!=-1) var inv = -1;
cuerpo.dx = 0;
cuerpo.dy = 0;
cuerpo.x = cuerpo.x+0.7*inv;
cuerpo.y = cuerpo.y+0.7*inv;
cuerpo.width=cuerpo.width-1.4*inv;
ctx.beginPath();
    ctx.rect(cuerpo.x, cuerpo.y, cuerpo.width, cuerpo.width);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
if(cuerpos[0].width<=0){
ctx.clearRect(0, 0, lienzo.width, lienzo.height);
clearInterval(intervalo);
dibujarScore();
intervalo = false;
cuerpos = [];
alimentos = [];
gameover = false;
ctr = 0;
speed = 0;
}
}

function detectarColisiones(){
    for(var cuerpo of cuerpos){
        if((locker<=0)){
if(cuerpos[0].dx>0){
if(cuerpos[0].x+cuerpos[0].width>cuerpo.x&&cuerpos[0].x+cuerpos[0].width<cuerpo.x+cuerpos[0].width&&cuerpos[0].y>cuerpo.y&&cuerpos[0].y<cuerpo.y+cuerpo.width&&cuerpo.following!=0){
console.log("hit con:"+cuerpo.ctr);
gameover = true;
}
}else if(cuerpos[0].dx<0){
if(cuerpos[0].x<cuerpo.x+cuerpo.width&&cuerpos[0].x>cuerpo.x&&cuerpos[0].y>cuerpo.y&&cuerpos[0].y<cuerpo.y+cuerpo.width&&cuerpo.following!=0){
console.log("hit con:"+cuerpo.ctr);
gameover = true;
}
}else if(cuerpos[0].dy>0){
if(cuerpos[0].y+cuerpos[0].width>cuerpo.y&&cuerpos[0].y+cuerpos[0].width<cuerpo.y+cuerpos[0].width&&cuerpos[0].x>cuerpo.x&&cuerpos[0].x<cuerpo.x+cuerpo.width&&cuerpo.following!=0){
console.log("hit con:"+cuerpo.ctr);
gameover = true;
}
}else if(cuerpos[0].dy<0){
if(cuerpos[0].y<cuerpo.y+cuerpo.width&&cuerpos[0].y>cuerpo.y&&cuerpos[0].x>cuerpo.x&&cuerpos[0].x<cuerpo.x+cuerpo.width&&cuerpo.following!=0){
console.log("hit con:"+cuerpo.ctr);
//clearInterval(intervalo);
gameover = true;
}
}
    }
}
if(cuerpos[0].x+cuerpos[0].width>lienzo.width||cuerpos[0].x<0||cuerpos[0].y+cuerpos[0].width>lienzo.height||cuerpos[0].y<scoreHeight) gameover=true;
}
   
   
   function detectarAlimento(){
    for(var alimento of alimentos){
if(alimento.active){
if(cuerpos[0].dx>0){
    if(cuerpos[0].x+cuerpos[0].width>alimento.x&&cuerpos[0].x+cuerpos[0].width<alimento.x+alimento.width){
    if((cuerpos[0].y==alimento.y)) {
        alimento.active = false;
        addCuerpo();
        feed();
        if(alimentos.length%8==0) {
            speed++;
            clearInterval(intervalo);
            intervalo = setInterval(dibujar,vel_inicio-speed);
            console.log("Velocidad:"+speed);
        }
       
    }
}
} else if(cuerpos[0].dx<0){
    if(cuerpos[0].x<alimento.x+alimento.width&&cuerpos[0].x>alimento.x){
    if((cuerpos[0].y==alimento.y)){
     alimento.active = false;
     addCuerpo();
     feed();
     if(alimentos.length%8==0){
      speed++;
      clearInterval(intervalo);
      intervalo = setInterval(dibujar,vel_inicio-speed);
      console.log("Velocidad:"+speed);
     }
    }
}
} else if(cuerpos[0].dy>0){
    if(cuerpos[0].y+cuerpos[0].width>alimento.y&&cuerpos[0].y+cuerpos[0].width<alimento.y+alimento.width){
    if((cuerpos[0].x==alimento.x)){
        alimento.active = false;
        addCuerpo();
        feed();
        if(alimentos.length%8==0) {
            speed++;
            clearInterval(intervalo);
            intervalo = setInterval(dibujar,vel_inicio-speed);
            console.log("Velocidad:"+speed);
        }
    }
}
} else if(cuerpos[0].dy<0){
    if(cuerpos[0].y<alimento.y+alimento.width&&cuerpos[0].y>alimento.y){
        if((cuerpos[0].x==alimento.x)) {
            alimento.active = false;
            addCuerpo();
            feed();
            if(alimentos.length%8==0) {
                speed++;
                clearInterval(intervalo);
                intervalo = setInterval(dibujar,vel_inicio-speed);
                console.log("Velocidad:"+speed);
            }
        }
}
}
    }
}

   }




function dibujar(){
lienzoWidth();
ctx.clearRect(0, 0, lienzo.width, lienzo.height);
dibujarScore();
if(gameover) dibujarGameOver();
else {
calcularMovimientos();
calcularMovimientosCuerpo();
dibujarCuerpo();
dibujarAlimento();
detectarColisiones();
detectarAlimento();


}
locker--;
//console.log(locker);
}

function start(){
    
  if(!intervalo){
	 crearAlimentos();
     giros = [];
    locker=0;
    lienzo.width = startWidth;
    nextWidth = lienzo.width;
    intervalo = setInterval(dibujar,vel_inicio-speed);  
    var color = 'blue';//'rgb(' + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ")"
    if(cuerpos.length==0)var origin = new Cuerpo(bodyWidth*(Math.round((lienzo.width/2)/bodyWidth)),bodyWidth*(Math.round((lienzo.height/2)/bodyWidth)),bodyWidth,color,0,1);
    console.log("cabeza x/y:"+bodyWidth*(Math.round((lienzo.width/2)/bodyWidth))+" y:"+bodyWidth*(Math.round((lienzo.height/2)/bodyWidth)));
    cuerpos.push(origin);
    feed();
  }
}

function addCuerpo(){
          var color = 'rgb(' + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ")"
         
              if(cuerpos[cuerpos.length-1].dx>0) var origin = new Cuerpo(cuerpos[cuerpos.length-1].x-cuerpos[cuerpos.length-1].width,cuerpos[cuerpos.length-1].y,bodyWidth,color,0,1);
              else if(cuerpos[cuerpos.length-1].dx<0) var origin = new Cuerpo(cuerpos[cuerpos.length-1].x+cuerpos[cuerpos.length-1].width,cuerpos[cuerpos.length-1].y,bodyWidth,color,0,-1);
              else if(cuerpos[cuerpos.length-1].dy>0) var origin = new Cuerpo(cuerpos[cuerpos.length-1].x,cuerpos[cuerpos.length-1].y-cuerpos[cuerpos.length-1].width,bodyWidth,color,1,0);
              else if(cuerpos[cuerpos.length-1].dy<0) var origin = new Cuerpo(cuerpos[cuerpos.length-1].x,cuerpos[cuerpos.length-1].y+cuerpos[cuerpos.length-1].width,bodyWidth,color,-1,0);
     
         
          cuerpos.push(origin);
}

function ocupado(x,y){
for(cuerpo of cuerpos){
if(x==cuerpo.x&&y==cuerpo.y){
return true;
}
}
return false;
}

function feed(){
if(comidas.length>0){
alimentos.push(comidas[0]);
console.log("food x/y:"+comidas[0].x+" y:"+comidas[0].y);
comidas.shift();
}
}

function crearAlimentos(){
    console.log("creando alimentos");
    comidas = [];
    for(var i=0;i<=maxComidas;i++){
    let intento = 0;
    do{
        //console.log(intento);
    var x = Math.round(Math.random()*(lienzo.width-foodWidth));
    var y = Math.round(Math.random()*((lienzo.height-foodWidth)-(scoreHeight))+scoreHeight);
    //intento++;
    }while(x%bodyWidth!=0||y%bodyWidth!=0||ocupado(x,y))
    var food = new Alimento(x,y,foodWidth,'#aa1166');    
    comidas.push(food);
    }
    console.log(comidas);
}

document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);
$("#inicio").on("click",start);
//$("#feed").on("click",feed);
document.addEventListener("click",function(){console.log(cuerpos[0].next);console.log(cuerpos[0].xf);console.log(cuerpos[0].yf);});
dibujarScore();
$( "#lienzo" ).on( "swipeleft", function (){
arriba = false;
abajo = false;
derecha = false;
izquierda = true;
} );
$( "#lienzo" ).on( "swiperight", function (){
arriba = false;
abajo = false;
derecha = true;
izquierda = false;
} );

$( "#lienzo" ).on( "swipeup", function (){
arriba = true;
abajo = false;
derecha = false;
izquierda = false;
} );

$( "#lienzo" ).on( "swipedown", function (){
arriba = false;
abajo = true;
derecha = false;
izquierda = false;
} );
