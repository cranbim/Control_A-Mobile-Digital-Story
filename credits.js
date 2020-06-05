function CreditScreen(x,y,w,h,params){
  this.invoked=false;
  var ready=false;
  var media=null;
  var invokeWait=20;
  var creditControls;
  var creditText=params.creditText;
  var begin=false;
  
  this.invoke=function(){
    ready=true;
    this.invoked=true;
    creditControls=new CreditControls(x,y,w,h);
  };
  
  this.reset=function(){
    // media.loop();
    creditControls.setActive(true);
    // fortune=random(params.fortunes);
    begin=false;
  };
  
  this.stop=function(){
    console.log("!!! stop credits");
    // media.stop();
    begin=false;
  };
  
  this.isBegin=function(){
    return begin;
  }
  
  this.controls=function(cPos,click){
    var option=-1;
    if(ready){
      creditControls.show();
      creditControls.run(cPos);
      var uiSel=creditControls.click();
      if(uiSel===0 && click){
        option=uiSel;
      }
    }
    return option;
  };
  

  this.run=function(){

  };
  
  this.show=function(){
    textFont(fMain);
    push();
    translate(x,y);
    fill(50,10,0);
    noStroke();
    rectMode(CORNER);
    rect(0,0,w,h);
    
    if(ready){
      textSize(w/25);
      textAlign(LEFT, TOP);
      fill(255);
      text(creditText,w*0.05,h*0.05,w*0.9,h*0.6);//"Do you think you are in control?"
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
    push();
    translate(x,y);
    creditControls.show();
    pop();
  };
  
}