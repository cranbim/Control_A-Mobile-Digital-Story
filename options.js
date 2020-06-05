function OptionScreen(x,y,w,h,params){
  this.invoked=false;
  var ready=false;
  var media=null;
  var invokeWait=20;
  var optionControls;
  var optionText=params.optionText;
  var begin=false;
  
  this.invoke=function(){
    ready=true;
    this.invoked=true;
    optionControls=new OptionControls(x,y,w,h);
  };
  
  this.reset=function(){
    optionControls.setActive(true);
    begin=false;
  };
  
  this.stop=function(){
    console.log("!!! stop options");
    begin=false;
  };
  
  this.isBegin=function(){
    return begin;
  }
  
  this.controls=function(cPos,click){
    var option=-1;
    if(ready){
      optionControls.show();
      optionControls.run(cPos);
      var uiSel=optionControls.click();
      if(uiSel===0 && click){
        option=uiSel;
      }
      else if(uiSel===1 && click){
        option=uiSel;
        console.log("reset seen fragments");
      }
      else if(uiSel===2 && click){
        option=uiSel;
        console.log("show credits");
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
    fill(100,10,0);
    noStroke();
    rectMode(CORNER);
    rect(0,0,w,h);
    
    if(ready){
      textSize(w/20);
      textAlign(LEFT, TOP);
      fill(255);
      text(optionText,w*0.05,h*0.05,w*0.9,h*0.4);
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
    optionControls.show();
    pop();
  };
  
}