function WordReader(x,y,w,h,params){
  this.invoked=false;
  var ready=false;
  var fMain;
  var fAlternates=[];
  var fontReady=0;
  var numFonts=6;
  var readerControls;
  
  w*=0.9;
  x=w*0.05;
  
  var message=params.text;
  var words;
  var textMaxY=0;
  var textSizeRel=0.08;
  var yOff=-h+h*0.2;
  var progress=0;
  
  
  this.reset=function(){
    console.log("!!!!reset Text Reader");
    yOff=h;
    readerControls.setActive(true, true);
  };
  
  this.stop=function(){
    //do nothing
    console.log("!!! stop WR");
    if(bgAudioReady){
      bgAudio1.stop();
    }
  };
  
  
  this.invoke=function(){
    fMain = loadFont("assets/Bitter-Regular.ttf", mediaReady);
    fAlternates.push(loadFont("assets/Bitter-Regular.ttf", mediaReady));
    fAlternates.push(loadFont("assets/Quattrocento-Regular.ttf", mediaReady));
    fAlternates.push(loadFont("assets/Lobster-Regular.ttf", mediaReady));
    fAlternates.push(loadFont("assets/Righteous-Regular.ttf", mediaReady));
    fAlternates.push(loadFont("assets/FredokaOne-Regular.ttf", mediaReady));
    this.invoked=true;
    readerControls=new ReaderControls(x,y,w,h);
    if(bgAudioReady){
      bgAudio1.loop();
      bgAudio1.volume(0.6);
    }
  };
  
  var mediaReady=function(){
    fontReady++;
    if(fontReady>=numFonts){
      ready=true;
      analyseText(w,h);
      console.log("text reader ready");
    }
    console.log(fontReady, fAlternates.length);
    console.log(fAlternates);
  }
  
  this.reset=function(){
    // media.loop();
    yOff=-h+h*0.2;
    if(bgAudioReady){
      bgAudio1.loop();
      bgAudio1.volume(0.6);
    }
  };
  
  
  var placeWordEffects=[];
  
  this.controls=function(cPos){
    if(cPos.x>x && cPos.x<x+w && cPos.y>y && cPos.y<y+h){
      zoomButtonActive=false;
    } else {
      zoomButtonActive=true;
    }
    readerControls.show();
    readerControls.run(cPos);
    var uiSel=readerControls.click();
    // console.log("readerControls: " + uiSel);
    if(uiSel===0){
      console.log("scrollup");
      if(progress>0){
        progress-=h*0.005;
      }
    } else if(uiSel===1){
      console.log("scrolldown");
      if(progress<textMaxY){
        progress+=h*0.005;
      }
    }
  }
  
  this.run=function(){
    yOff=-h*0.5+progress;
    push();
    translate(x,y);
    fill(0,0,150);
    noStroke();
    rectMode(CORNER);
    rect(0,0,w,h);
    if(ready){
      renderText(0,0,w,h,yOff);
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
  
  function analyseText(w,h){
    var splitWords=message.split(' ');
    var ts=w*textSizeRel;
    var pitch=ts*1.2;
    var space=ts*0.25;
    var xOff=0;
    var yOff=pitch;
    textFont(fMain);
    fill(40);
    noStroke();
    textSize(ts);
    textAlign(CENTER, CENTER);
    words=splitWords.map(function(word,i){
      if(word==="/"){
        yOff+=pitch;
        xOff=0;
        word=" ";
      } else if(word==="//"){
        yOff+=pitch*2;
        xOff=0;
        word=" ";
      }
        var wordBits={word:word};
        wordBits.i=i;
        var tb=fMain.textBounds(word,0,0,ts);
        wordBits.w=tb.w;
        wordBits.h=tb.h;
        wordBits.ts=ts;
        var tcx=tb.w/2;
        var tcy=tb.h/2;
        // console.log(word+tb.w);
        if(xOff+space+tb.w>w){
          yOff+=pitch;
          xOff=0;
          wordBits.x=xOff+tcx;
          wordBits.y=yOff;
          xOff+=tb.w;
        } else {
          xOff+=space;
          wordBits.x=xOff+tcx;
          wordBits.y=yOff;
          xOff+=tb.w;
        }
        if(params.effect==0 || params.effect==3){
          wordBits.flipH=false;//random(10)<1.5;
          wordBits.flipV=false;//random(10)<2;
          wordBits.flipCycle=random(0.02,0.07);
          wordBits.noiseShift=false;//random(10)<5;
        } else if(params.effect==1){
          wordBits.flipH=random(10)<1.5;
          wordBits.flipV=random(10)<2;
          wordBits.flipCycle=random(0.02,0.07);
          wordBits.noiseShift=random(10)<5;
        } else if(params.effect==2){
          wordBits.flipH=false;//random(10)<1.5;
          wordBits.flipV=false;//random(10)<2;
          wordBits.flipCycle=random(0.02,0.07);
          wordBits.noiseShift=false;//random(10)<5;
          wordBits.altFont=random(10)<7;
          wordBits.altFontDelay=floor(random(10,50));
        }
        return wordBits;
      
    });
    textMaxY=yOff+pitch;
  }
  
  function renderText(x,y,w,h,yOff){
    push();
    translate(x,y);
    blendMode(BLEND);
    var shade=sin(frameCount*PI/(noise(frameCount/100)*100+400))*70+128;
    fill(0);
    noStroke();
    if(params.effect==3){
      fill(shade);
    }
    rectMode(CORNER);
    rect(0,0,w,h);
    var ts=w*textSizeRel;
    if(params.effect==0){
      blendMode(ADD);
    }
    textFont(fMain);
    fill(255);
    if(params.effect==3){
      fill(255-shade);
    }
    noStroke();
    textSize(ts);
    textAlign(CENTER, CENTER);
    words.forEach(function(word){
      placeWord(word,x,y,w,h,yOff);
    });
    pop();
    push();
    translate(x,y);
    readerControls.show();
    pop();
  }
  

  
  function placeWord(word,x,y,w,h,yOff){
    if(word.y-yOff>-w*textSizeRel && word.y-yOff<h+w*textSizeRel){
      push();
      translate(word.x,word.y-yOff);

      placeWordEffects[params.effect](word,x,y,w,h,yOff);
      pop();
    }
  }
  
  placeWordEffects[0]=function(word,x,y,w,h,yOff){
    var shift=(noise(word.x/200, word.y/10+frameCount/10)-0.5)*word.ts*0.5;
  
    var sh=word.flipH?sin(frameCount*word.flipCycle):1;
    var sv=word.flipV?sin(frameCount*word.flipCycle*0.7):1;
    if(word.noiseShift){
      var nx=noise(word.x/100, word.y/100+frameCount/200)-0.5;
      var ny=noise(7+word.x/110, word.y/90+frameCount/185)-0.5;
      translate(nx*word.ts, ny*word.ts);
    } else {
      scale(sh,sv);
    }
    fill(255,0,0);
    text(word.word,0,word.ts*-0.2-shift);
    fill(0,255,0);
    text(word.word,-shift*0.707,word.ts*-0.2+shift*0.35);
    fill(0,0,255);
    text(word.word,shift*0.707,word.ts*-0.2+shift*0.35);
  };
  
  placeWordEffects[1]=function(word,x,y,w,h,yOff){
    var sh=word.flipH?sin(frameCount*word.flipCycle):1;
    var sv=word.flipV?sin(frameCount*word.flipCycle*0.7):1;
    if(!word.flipH && !word.flipV){
      var ns=noise(word.x/150, word.y/150+frameCount/250);
      sh=0.15+ns*1.3;
      sv=0.15+ns*1.3;
    }
    if(word.noiseShift){
      var nx=noise(word.x/100, word.y/100+frameCount/200)-0.5;
      var ny=noise(7+word.x/110, word.y/90+frameCount/185)-0.5;
      translate(nx*word.ts, ny*word.ts);
    } else {
      scale(sh,sv);
    }
    text(word.word,0,word.ts*-0.2);
  };
  
  placeWordEffects[2]=function(word,x,y,w,h,yOff){
    var sh=word.flipH?sin(frameCount*word.flipCycle):1;
    var sv=word.flipV?sin(frameCount*word.flipCycle*0.7):1;
    if(word.noiseShift){
      var nx=noise(word.x/100, word.y/100+frameCount/200)-0.5;
      var ny=noise(7+word.x/110, word.y/90+frameCount/185)-0.5;
      translate(nx*word.ts, ny*word.ts);
    } else {
      scale(sh,sv);
    }
    textFont(fMain);
    // console.log(floor((((word.i+frameCount)/word.altFontDelay)+word.i)%fAlternates.length));
    if(word.altFont){
      textFont(fAlternates[floor((((word.i+frameCount)/word.altFontDelay)+word.i)%fAlternates.length)]);
    }
    textSize(word.ts);
    text(word.word,0,word.ts*-0.2);
  };


  placeWordEffects[3]=function(word,x,y,w,h,yOff){
    var sh=word.flipH?sin(frameCount*word.flipCycle):1;
    var sv=word.flipV?sin(frameCount*word.flipCycle*0.7):1;
    if(word.noiseShift){
      var nx=noise(word.x/100, word.y/100+frameCount/200)-0.5;
      var ny=noise(7+word.x/110, word.y/90+frameCount/185)-0.5;
      translate(nx*word.ts, ny*word.ts);
    } else {
      scale(sh,sv);
    }
    text(word.word,0,word.ts*-0.2);
  };
}

