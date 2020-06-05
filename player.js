function Player(x,y,w,h,params){
  this.invoked=false;
  var ready=false;
  var media=null;
  var mediaAud=null;
  var invokeWait=20;
  var numMedia=params.media.length;
  var loadedMedia=0;
  var playerControls;
  var paused=false;
  var soundOff=false;
  var vidLength, audLength;
  var vidComp=0;
  var audComp=0;
  var animText=params.animText;
  var maxDoneness=0;
  var doneness=0;
  var done=0;
  var amplitude=null;
  
  this.invoke=function(){
    for(var i=0; i<numMedia; i++){
      console.log(i,params.media[i].media);
      if(params.media[i].type=="video"){
        media=createVideo(params.media[i].media,vidReady);
      }
      if(params.media[i].type=="audio"){
        // soundFormats('wav');
        mediaAud=createAudio(params.media[i].media,audReady);
      }
    }
    this.invoked=true;
    playerControls=new MediaControls(x,y,w,h);
    // media.pause();
    paused=false;
    if(ready && media){
      media.volume(1);
      media.play();
    }
    if(ready && mediaAud){
      mediaAud.volume(1);
      mediaAud.play();
    }
    soundOff=false;
  };
  
  this.reset=function(){
    paused=false;
    // soundOff=false;
    if(ready && media){
      media.stop();
      media.play();
      // media.volume(1);
    }
    if(ready && mediaAud){
      mediaAud.stop();
      mediaAud.play();
      
    }
    if(!soundOff){
        if(ready && media){
          media.volume(1);
        }
        if(ready && mediaAud){
          mediaAud.volume(1);
        }
        // soundOff=false;
      } else {
        if(ready && media){
          media.volume(0);
        }
        if(ready && mediaAud){
          mediaAud.volume(0);
        }
        // soundOff=true;
      }
    playerControls.setActive(true, true, true);
    vidComp=0;
    audComp=0;
  };
  
  this.controls=function(cPos){
    playerControls.show();
    playerControls.run(cPos);
    var uiSel=playerControls.click();
    console.log("PlayerControls: " + uiSel);
    if(uiSel===0){
      console.log("restart media");
      this.reset();
    } else if(uiSel===1){
      console.log("play/pause media");
      if(paused){
        if(media) media.play();
        if(mediaAud) mediaAud.play();
        paused=false;
      } else {
        if(media){
          media.pause();
          console.log("pauseVid at "+media.time());
        } 
        if(mediaAud){
          mediaAud.pause();
          console.log("pauseAud at "+mediaAud.time());
        }
        paused=true;
      }
    } else if(uiSel===2){
      console.log("sound on/off media");
      if(soundOff){if(ready && media){
          media.volume(1);
        }
        if(ready && mediaAud){
          mediaAud.volume(1);
        }
        // media.volume(1);
        // mediaAud.volume(1);
        soundOff=false;
      } else {
        if(ready && media){
          media.volume(0);
        }
        if(ready && mediaAud){
          mediaAud.volume(0);
        }
        // media.volume(0);
        // mediaAud.volume(0);
        soundOff=true;
      }
    }
  }
  
  this.stop=function(){
    console.log("!!! stop Player");
    audComp=0;
    vidComp=0;
    if(media){
      vidComp=media.time()/vidLength;
      media.stop();
    }
    if(mediaAud){
      audComp=mediaAud.time()/audLength;
      mediaAud.stop();
    }
    console.log("media stopped: "+nf(vidComp,0,2)+" "+nf(audComp,0,2));
  };
  
  function vidReady(){
    console.log("vid ready");
    media.hide();
    media.play();
    media.onended(videoEnded);
    loadedMedia++;
    mediaReady();
    vidLength=media.duration();
  }
  
  function videoEnded(){
    console.log("videoEnded");
  }
  
  function audioEnded(){
    console.log("audioEnded");
  }
  
  function audReady(){
    console.log("aud ready");
    mediaAud.play();
    mediaAud.onended(audioEnded);
    loadedMedia++;
    mediaReady();
    audLength=mediaAud.duration();
    amplitude = new p5.Amplitude();
  }
  
  var mediaReady=function(){
    console.log(loadedMedia, numMedia);
    if(loadedMedia>=numMedia){
      ready=true;
    }
  }
  
  this.run=function(){
    if(ready){
      maxDoneness=0;
      doneness=0;
      done=0;
      if(media){
        vidComp=media.time()/vidLength;
        // media.stop();
        maxDoneness++;
        doneness+=vidComp;
      }
      if(mediaAud){
        audComp=mediaAud.time()/audLength;
        // mediaAud.stop();
        maxDoneness++;
        doneness+=audComp;
      }
      done=doneness/maxDoneness;
      return done<0.9995;
    }
    return true;
  };
  
  this.show=function(){
    push();
    translate(x,y);
    fill(0,0,50);
    noStroke();
    rectMode(CORNER);
    rect(0,0,w,h);
    
    if(ready){
      if(media){
        image(media,0,0,w,h);
      }
      if(animText){
        push();
        fill(235,50,0);
        noStroke();
        rectMode(CORNER);
        rect(0,0,w,h);
        translate(w/2, h/2);
        rotate(-PI/4+frameCount*PI/250);
        textAlign(CENTER, CENTER);
        textSize(w*0.09);
        fill(255);
        stroke(0);
        strokeWeight(1);
        text(animText,0,0);
        pop();
        push();
        translate(w/2,h/2);
        stroke(255,180);
        strokeWeight(w*0.03);
        noFill();
        console.log(amplitude.getLevel());
        ellipse(0,0,amplitude.getLevel()*w/2);
        pop();
      }
      strokeCap(ROUND);
      strokeWeight(h*0.06);
      stroke(255,100);
      line(w*0.1,h*0.1,w*0.9,h*0.1);
      strokeWeight(h*0.05);
      stroke(100,50,255,100);
      line(w*0.1,h*0.1,w*0.1+w*0.8*done,h*0.1);
    } else {
      push();
      translate(w/2, h/2);
      rotate(-PI/4+frameCount*PI/100);
      textAlign(CENTER, CENTER);
      textSize(w*0.2);
      fill(255);
      stroke(0);
      strokeWeight(1);text("waiting",0,0);
      pop();
    }
    pop();
    push();
    translate(x,y);
    playerControls.show();
    pop();
  };
}