var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");
canvas.height=2000;
canvas.width=2000;
 function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }



$(window).bind("resize", function(){
    var w = $(window).width();
    var h = $(window).height();

    $("#paper").css("width", w + "px");
    $("#paper").css("height", h + "px"); 
});

//using HTML5 for fullscreen (only newest Chrome + FF)

//...

//now i want to cancel fullscreen



function drawGrid(r1,g1,b1,r2,g2,b2) {
  var width = canvas.width;
  var height = canvas.height;
  var box_pcol = 9; 
  var box_prow = 9; 
  var box_height = height/box_prow;
  var box_width = width/box_pcol;

  for(var i = 0; i<box_pcol; i++){
    for(var k = 0; k<box_prow; k++){
      var red = r1 + (r2-r1) * k / box_pcol ; 
      var green = g1 + (g2-g1) * i / box_prow ; 
      var blue = b1 + (b2-b1) * (i+k) / (box_prow + box_pcol) ; 
      red = Math.floor(red);
      green = Math.floor(green);
      blue= Math.floor(blue);

      ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";

      var box_x = k * box_width;
      var box_y = i * box_height;
      ctx.fillRect(box_x,box_y,box_width,box_height); 
    }  
  }
}

function cap(val, max, min){
  if(val > max) return max;
  if(val < min) return min;
  return val;
}
 
function generateRandomRGB(min, max){
   var colors = [];
   for(var i = 0; i<3; i++){
        colors.push(Math.round(Math.random() * (max - min) + min)); 
   }
   return colors;
}

var colorSet1= []; 
var colorSet2= []; 
function changeSetpoint(){
    colorSet2 = generateRandomRGB(140, 255);
    colorSet1 = generateRandomRGB(150, 255);
}

var startCol = [0,75,100] ; 
var endCol = [255,255,150]; 
changeSetpoint();
function update() {
  drawGrid(startCol[0],startCol[1],startCol[2],endCol[0],endCol[1],endCol[2]); 
  var kP = 0.0001; 
  var inc = 0.5;
  for(var i = 0; i<3; i++){
    var err = colorSet1[i] - startCol[i];
    startCol[i] += kP * err + err < 0 ? -inc : inc;
    startCol[i] = cap(startCol[i],255,100);
    
    var err2= colorSet2[i] - endCol[i];
    endCol[i] += kP * err + err2< 0 ? -inc : inc;
    endCol[i] = cap(endCol[i],0,150);
  }
}
setInterval(update,20);
setInterval(changeSetpoint,900);
