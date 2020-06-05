function WelcomeScreen(x,y,w,h,params){
  this.invoked=false;
  var ready=false;
  var media=null;
  var invokeWait=20;
  var introControls;
  var introText=params.text;
  var media;
  var mh;
  var begin=false;
  
  this.invoke=function(){
    // media=createVideo(params.media,mediaReady);
    ready=true;
    this.invoked=true;
    introControls=new SplashControls(x,y,w,h);
  };
  
  function mediaReady(){
    ready=true;
    media.hide();
    media.elt.setAttribute('playsinline', '');
    mh=w*media.height/media.width;
    media.loop();
  }
  
  this.reset=function(){
    // media.loop();
    introControls.setActive(true);
    begin=false;
    
  };
  
  this.stop=function(){
    console.log("!!! stop welcome");
    // media.stop();
    begin=false;
  };
  
  this.isBegin=function(){
    return begin;
  }
  
  this.controls=function(cPos,click){
    if(ready){
      introControls.show();
      introControls.run(cPos);
      var uiSel=introControls.click();
      // console.log("readerControls: " + uiSel);
      if(uiSel===0 && click){
        console.log("begin");
        begin=true;
      }
    }
  };
  

  this.run=function(){
  };
  
  this.show=function(){
    textFont(fMain);
    push();
    translate(x,y);
    fill(0);
    noStroke();
    rectMode(CORNER);
    rect(0,0,w,h);
    if(ready){
      // image(media,0,0,w,mh);//video
      image(mainLogo,0,0,w,mh);//temp logo
    }
    if(ready){
      textSize(w/20);
      textAlign(LEFT, TOP);
      fill(255);
      text(introText,w*0.05,h*0.8,w*0.9,h*0.2);//"Do you think you are in control?"
      
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
    introControls.show();
    pop();
  };
  
}