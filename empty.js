function Empty(x,y,w,h,params){
  this.invoked=false;
  var ready=false;
  
  this.reset=function(){
    console.log("!!!!reset empty");
  };
  
  this.stop=function(){
    //do nothing
    console.log("!!! stop empty");
  };
  
  
  this.invoke=function(){
    this.invoked=true;
    ready=true;
  };
  

  this.reset=function(){
    
  };
  
  this.controls=function(cPos){

  };

  this.run=function(){
    push();
    translate(x,y);
    fill(0,0,150);
    noStroke();
    rectMode(CORNER);
    rect(0,0,w,h);
    // yOff=-h+map(mouseY,0,h,0,textMaxY);
    if(ready){
      translate(w/2, h/2);
      rotate(-PI/4+frameCount*PI/100);
      textAlign(CENTER, CENTER);
      textSize(w*0.2);
      fill(235,135,0);
      stroke(0);
      strokeWeight(1);text("empty",0,0);
    } else {
      translate(w/2, h/2);
      rotate(-PI/4+frameCount*PI/100);
      textAlign(CENTER, CENTER);
      textSize(w*0.2);
      fill(255);
      stroke(0);
      strokeWeight(1);text("waiting",0,0);
    }
    pop();
  };
  


}
