function WordPopper(x,y,w,h,params){
  this.invoked=false;
  var loadedSounds=0;
  var numSounds=37;
  var sounds=[];
  var ready=false;
  var blobs=[];
  var numBlobs=12;
  var cpx=-1000;
  var cpy=-1000;
  
  this.reset=function(){
    console.log("!!!!reset word popper");
    cpx=-1000;
    cpy=-1000;
  };
  
  this.stop=function(){
    //do nothing
    console.log("!!! stop word popper");
    sounds.forEach(function(s){
      s.stop();
      blobs=[];
    });
  };
  
  
  this.invoke=function(){
    for(var i=0; i<numSounds; i++){
      sounds.push(loadSound("assets/cw"+nf(i+1,3,0)+".wav",soundLoaded));
    }
    this.invoked=true;
  };
  
  function soundLoaded(){
    loadedSounds++;
    if(loadedSounds>=numSounds){
      ready=true;
    }
  }
  
  this.reset=function(){
    sounds.forEach(function(s){
      s.stop();
      blobs=[];
    });
  };
  
  this.controls=function(cPos){
    if(cPos.x>x && cPos.x<x+w && cPos.y>y && cPos.y<y+h){
      zoomButtonActive=false;
    } else {
      zoomButtonActive=true;
    }
    cpx=cPos.x;
    cpy=cPos.y;
  }

  this.run=function(){
    push();
    translate(x,y);
    fill(0,0,150);
    noStroke();
    rectMode(CORNER);
    rect(0,0,w,h);
    // yOff=-h+map(mouseY,0,h,0,textMaxY);
    if(ready){
      fill(50);
      noStroke();
      rectMode(CORNER);
      rect(0,0,w,h);
      for(var i=blobs.length-1; i>=0; i--){
        blobs[i].show();
        if(!blobs[i].run(cpx,cpy)){
          blobs.splice(i,1);
        }
      }
      if(blobs.length<numBlobs && random(100)<10){
        var blob=new Blob(random(0.1,0.9)*w,random(0.1,0.9)*h,w*0.1);
        blob.assignSound(random(sounds));
        blobs.push(blob);
      }
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
  
  function Blob(x,y,r){
    // var x=random(0.1,0.9)*w;
    // var y=random(0.1,0.9)*h;
    var sound;
    var playing=false;
    var hover=false;
    var live=false;
    var ttbMax=30;
    var ttb=ttbMax;
    var ttdMax=60;
    var ttd=ttdMax;
    var ttl=2000;
    var s=0;
    var triggered=false;
    
    this.assignSound=function(ns){
      sound=ns;
      sound.setVolume(0.5);
      sound.stop();
      sound.onended(soundEnded);
    };
    
    this.show=function(){
      fill(235,100,0);
      if(hover){
        fill(200,0,0);
      }
      noStroke();
      if(playing){
        stroke(255);
        stroke(r*0.2);
      }
      ellipse(x,y,r*2*s);
    };
    
    this.run=function(mx, my){
      playing=triggered && sound.isPlaying();
      hover=dist(mx,my,x,y)<r;
      if(live && !triggered && hover){
        triggerSound();
      }
      
      if(ttb>0){
        live=false;
        ttb--;
        s=1-ttb/ttbMax;
      } else {
        if(ttl>0){
          live=true;
          if(triggered){
            ttl--;
          }
          // if(playing){
          //   // ttl--;
          //   if(!sound.isPlaying()){
          //     ttl=0;
          //   }
          // }
          s=1;
        } else {
          live=false;
          if(ttd>0){
            ttd--;
            s=ttd/ttdMax;
          }
        }
      }
      return ttd>0;
    };
    
    
    
    function triggerSound(){
      sound.play();
      sound.pan(random(-1,1));
      triggered=true;
      // playing=true;
    }
    
    function soundEnded(){
      // playing=false;
      ttl=0;
    }
    
  }

}
