function SPRControls(x,y,w,h){
  var xm=x+w*0.5;
  var ym=y+h*0.85;
  var r=w*0.1;
  var spin=new UIButton(xm,ym,r,"spin","",UIButtonImages["Spin"],[]);

  var spinActive=true;
  
  this.setActive=function(){
    spinActive=true;
  }
  
  this.show=function(){
    spin.show(spinActive,1);
  };
  
  this.run=function(cPos){
    spin.run(cPos);
  };
  
  this.click=function(){
    var button=-1;
    if(spinActive && spin.click()){
      button=0;
    }
    // if(scrollDownActive && scrollDown.click()){
    //   button=1;
    // }
    return button;
  };
}


function CreditControls(x,y,w,h){
  var x1=x+w*0.5;
  var y1=y+h*0.25;
  var xx=x+w*0.2;
  var yx=y+h*0.8;
  var r=w*0.15;
  // var begin=new UIButton(x1,y1,r,"reset frags","",UIButtonImages["ResetFrag"],[]);
  var exit=new UIButton(xx,yx,r,"return","",UIButtonImages["Back"],[]);

  // var beginActive=true;
  var exitActive=true;
  
  this.setActive=function(){
    // beginActive=true;
    exitActive=true;
  }
  
  this.show=function(){
    // begin.show(beginActive,1);
    exit.show(exitActive,1);
  };
  
  this.run=function(cPos){
    // begin.run(cPos);
    exit.run(cPos);
  };
  
  this.click=function(){
    var button=-1;
    if(exitActive && exit.click()){
      button=0;
    }
    // if(beginActive && begin.click()){
    //   button=1;
    // }
    // if(scrollDownActive && scrollDown.click()){
    //   button=1;
    // }
    return button;
  };
}

function OptionControls(x,y,w,h){
  var x1=x+w*0.5;
  var y1=y+h*0.25;
  var y2=y+h*0.45;
  var xx=x+w*0.2;
  var yx=y+h*0.8;
  var r=w*0.15;
  var begin=new UIButton(x1,y1,r,"reset frags","",UIButtonImages["ResetFrag"],[]);
  var exit=new UIButton(xx,yx,r,"return","",UIButtonImages["Back"],[]);
  var credit=new UIButton(x1,y2,r,"credits","",UIButtonImages["Credits"],[]);

  var beginActive=true;
  var creditActive=true;
  var exitActive=true;
  
  this.setActive=function(){
    beginActive=true;
    creditActive=true;
    exitActive=true;
  }
  
  this.show=function(){
    begin.show(beginActive,1);
    credit.show(creditActive,1);
    exit.show(exitActive,1);
  };
  
  this.run=function(cPos){
    begin.run(cPos);
    credit.run(cPos);
    exit.run(cPos);
  };
  
  this.click=function(){
    var button=-1;
    if(exitActive && exit.click()){
      button=0;
    }
    if(beginActive && begin.click()){
      button=1;
    }
    if(creditActive && credit.click()){
      button=2;
    }
    // if(scrollDownActive && scrollDown.click()){
    //   button=1;
    return button;
  };
}

function SplashControls(x,y,w,h){
  var xm=x+w*0.25;
  var ym=y+h*0.5;
  var r=w*0.2;
  var begin=new UIButton(xm,ym,r,"GO!","",UIButtonImages["Go"],[]);

  var beginActive=true;
  
  this.setActive=function(go){
    beginActive=go;
  }
  
  this.show=function(){
    begin.show(beginActive,1);
  };
  
  this.run=function(cPos){
    begin.run(cPos);
  };
  
  this.click=function(){
    var button=-1;
    if(beginActive && begin.click()){
      button=0;
    }
    // if(scrollDownActive && scrollDown.click()){
    //   button=1;
    // }
    return button;
  };
}

function IntroControls(x,y,w,h){
  var xm=x+w*0.75;
  var ym=y+h*0.5;
  var r=w*0.2;
  var begin=new UIButton(xm,ym,r,"enter","",UIButtonImages["Enter"],[]);

  var beginActive=true;
  
  this.setActive=function(go){
    beginActive=go;
  }
  
  this.show=function(){
    begin.show(beginActive,1);
  };
  
  this.run=function(cPos){
    begin.run(cPos);
  };
  
  this.click=function(){
    var button=-1;
    if(beginActive && begin.click()){
      button=0;
    }
    // if(scrollDownActive && scrollDown.click()){
    //   button=1;
    // }
    return button;
  };
}

function ReaderControls(x,y,w,h){
  var xm=x+w*0.7;
  var y1=y+h*0.1;
  var y2=y+h*0.9;
  var r=h*0.1;
  var scrollUp=new UIButton(xm,y1,r,"^","",UIButtonImages["PageUp"],[]);
  var scrollDown=new UIButton(xm,y2,r,"v","",UIButtonImages["PageDown"],[]);

  var scrollUpActive=true;
  var scrollDownActive=true;
  
  this.setActive=function(su, sd){
    scrollUpActive=su;
    scrollDownActive=sd;
  }
  
  this.show=function(){
    scrollUp.show(scrollUpActive,0.5);
    scrollDown.show(scrollDownActive,0.5);
  };
  
  this.run=function(cPos){
    scrollUp.run(cPos);
    scrollDown.run(cPos);
  };
  
  this.click=function(){
    var button=-1;
    if(scrollUpActive && scrollUp.click()){
      button=0;
    }
    if(scrollDownActive && scrollDown.click()){
      button=1;
    }
    return button;
  };
}

function MediaControls(x,y,w,h){
  var ym=y+h*0.9;
  var x1=x+w*0.2;
  var x2=x+w*0.5;
  var x3=x+w*0.8;
  var r=h*0.1;
  var restart=new UIButton(x1,ym,r,"R","",UIButtonImages["Restart"],[]);
  var playpause=new UIButton(x2,ym,r,"||",">",UIButtonImages["Pause"],UIButtonImages["Play"]);
  var soundonoff=new UIButton(x3,ym,r,"><","o<",UIButtonImages["SoundOff"],UIButtonImages["SoundOn"]);
  
  var restartActive=true;
  var playpauseActive=true;
  var soundonoffActive=false;
  
  this.setActive=function(re, pp, so){
    restartActive=re;
    playpauseActive=pp;
    soundonoffActive=so;
  }
  
  this.show=function(){
    restart.show(restartActive,0.5);
    playpause.show(playpauseActive,0.5);
    soundonoff.show(soundonoffActive,0.5);
  };
  
  this.run=function(cPos){
    restart.run(cPos);
    playpause.run(cPos);
    soundonoff.run(cPos);
  };
  
  this.click=function(){
    var button=-1;
    if(restartActive && restart.click()){
      button=0;
    }
    if(playpauseActive && playpause.click()){
      button=1;
    }
    if(soundonoffActive && soundonoff.click()){
      button=2;
    }
    return button;
  };
}

function UIControls(x,y,w,h){
  var ym=y+h*0.65;
  var x1=x+w*0.2;
  var x2=x+w*0.8;
  var y1=y+h*0.8;
  var xm=x+w*0.5;
  var r=h*0.2;
  var back=new UIButton(x1,ym,r,"<","",UIButtonImages["Back"],[]);
  var quit=new UIButton(x2,ym,r,"X","",UIButtonImages["Option"],[]);
  // var play=new UIButton(xm,y1,r,"*");
  var uiActive=true;
  
  var backActive=true;
  var quitActive=true;
  // var playActive=false;
  
  this.setActive=function(ua,actives){
    uiActive=ua;
    backActive=actives[0];
    quitActive=actives[1];
    // playActive=pa;
  }
  
  this.show=function(){
    if(uiActive){
      back.show(backActive,1);
      quit.show(quitActive,1);
      // play.show(playActive,1);
    }
  };
  
  this.run=function(cPos){
    if(uiActive){
      back.run(cPos);
      quit.run(cPos);
      // play.run(cPos);
    }
  };
  
  this.click=function(){
    if(uiActive){
      var button=-1;
      if(backActive && back.click()){
        button=0;
      }
      if(quitActive && quit.click()){
        button=1;
      }
      // if(playActive && play.click()){
      //   button=2;
      // }
      return button;
    }
    return -1;
  };
  

}

function UIButton(x,y,r,t,t2,img1,img2){
  var hover=false;
  var isToggle=!!t2;
  var toggle=false;
  var isImage=!!img1;
  // console.log("isToggle:"+isToggle);
  
  this.run=function(cPos){
    hover=dist(cPos.x,cPos.y,x,y)<r;
  };
  
  this.click=function(){
    if(hover){
      toggle=!toggle;
    }
    return hover;
  };
  
  this.show=function(active,alph){
    push();
    translate(x,y);
    // colorMode(RGB);
    if(isImage){
      if(active){
        if(hover){
          tint(0,200,50);
        } else {
          tint(255,200);
        }
        imageMode(CENTER);
        if(isToggle && toggle){
          image(img2[floor(frameCount/10)%img1.length],0,0,r*2, r*2);
        } else {
          image(img1[floor(frameCount/10)%img1.length],0,0,r*2, r*2);
        }
        
      }
    } else {
      strokeWeight(r*0.1);
      if(active){
        fill(100,alph*255);
        stroke(200,alph*255);
        if(hover){
          stroke(0,200,50,alph*255);
          fill(0,120,50,alph*255);
        }
        ellipse(0,0,r*2);
        fill(200,alph*255);
        if(hover){
          fill(255,alph*255);
        }
        noStroke();
        textSize(r*0.5);
        textAlign(CENTER, CENTER);
        if(isToggle && toggle){
          text(t2,0,0);
        } else {
          text(t,0,0);
        }
      } else {
        fill(20,alph*255);
        stroke(40,alph*255);
        ellipse(0,0,r*2);
        fill(40,alph*255);
        noStroke();
        textSize(r*0.5);
        textAlign(CENTER, CENTER);
        text(t,0,0);
      }
    }
    pop();
  };
}

function DragControl(x,y,r){
  var dragging=false;
  var hover=false
  var moving=false;
  var home=false;
  var nx=x;
  var ny=y;
  var tx=x;
  var ty=y;
  var ease=3;
  var offX=0;
  var offY=0;
  var countDownMax=15;
  var countDown=0;

  
  this.getPos=function(){
    return {x:nx, y:ny, active:dragging};
  };
  
  
  this.run=function(){
    nx+=(tx-nx)/(dragging?ease:ease*4);
    ny+=(ty-ny)/(dragging?ease:ease*4);
    home=dist(nx,ny,x,y)<1;
    moving=dist(nx,ny,tx,ty)>1;
    hover=dist(mouseX, mouseY,nx,ny)<r;
    if(hover && mouseIsPressed && !dragging){
      dragging=true;
      offX=nx-mouseX;
      offY=ny-mouseY;
    }
    if(touches.length>0 && dist(touches[0].x, touches[0].y,nx,ny)<r && !dragging){
      dragging=true;
      offX=nx-mouseX;
      offY=ny-mouseY;
    }
    if(!mouseIsPressed && touches.length<1){
      dragging=false;
      offX=offY=0;
      tx=x;
      ty=y;
    }
    if(dragging){
      if(touches.length>0){
        tx=touches[0].x+offX;
        ty=touches[0].y+offY;
      } else {
        tx=mouseX+offX;
        ty=mouseY+offY;
      }
    }
    if(moving){
      countDown=countDownMax;
    } else {
      if(countDown>0){
        countDown--;
        if(countDown==0){
          return true;
        }
      }
    }
    return false;
    // console.log(dragging, nx, ny);
  };
  
  this.show=function(zoomButtonActive){
    fill(180);
    noStroke();
    ellipse(x,y,r*2);
    stroke(255);
    strokeWeight(r*0.1);
    noFill();
    // ellipse(nx,ny,r*2);
    renderControl(nx,ny,r*2,1);
    noStroke();
    if(dragging){
      if(moving){
        fill(200,200,0);
      } else {
        fill(235,135,0);
      }
    } else if(hover){
      fill(0,180,0);
    } else {
      fill(180);
    }
    fill(255,200*(1-countDown/countDownMax));
    noStroke();
    // strokeWeight(r*0.5*countDown/countDownMax);
    if(!home && zoomButtonActive){
      ellipse(nx,ny,r*2+r*8*countDown/countDownMax);
    }
  };
}

function renderControl(x,y,s,a){
  var cycle=150;
  var t=s/6;
  var p1=(frameCount%cycle)/cycle;
  var p2=((frameCount+cycle/3)%cycle)/cycle;
  var p3=((frameCount+2*cycle/3)%cycle)/cycle;
  strokeWeight(t);
  noFill();
  stroke(235,100,0,255*a);
  ellipse(x,y,s*p1);
  stroke(0,0,0,255*a);
  ellipse(x,y,s*p2);
  stroke(255,255,255,255*a);
  ellipse(x,y,s*p3);
}

