function SPR(x,y,dw,dh,params){
  var spinners=[];
  var symbols=[];
  this.invoked=false;
  var ready=false;
  var loadedPics=0;
  var numPics=3;
  var stopCount=0;
  var stopMax=60;
  var hasSpun=false;
  var message="blank";
  var messageBox;
  var controls;
  
  this.invoke=function(){
    // ready=true;
    this.invoked=true;
    controls=new SPRControls(x,y,dw,dh);
    // creditControls=new CreditControls(x,y,w,h);
    for(var i=0; i<3; i++){
      symbols.push(loadImage("assets/oab_spr"+(nf(i+1,2,0))+".png", picLoaded));
    }
    spinners.push(new Spinner(dw*0.5-dw*0.17,dh*0.5,9,dh*0.33, "you"));
    spinners.push(new Spinner(dw*0.5+dw*0.17,dh*0.5,9,dh*0.33, "life"));
    messageBox=new MessageBox(message,dw*0.1,dh*0.525,dw*0.8,dh*0.2);
  };
  
  function picLoaded(){
    loadedPics++;
    ready=loadedPics==numPics;
    console.log(ready, loadedPics);
  }
  
  this.reset=function(){
    spinners=[];
    spinners.push(new Spinner(dw*0.5-dw*0.17,dh*0.5,9,dh*0.33, "you"));
    spinners.push(new Spinner(dw*0.5+dw*0.17,dh*0.5,9,dh*0.33, "life"));
    stopCount=0;
    hasSpun=false;
  };
  
  this.stop=function(){
    console.log("!!! stop SPR");
    spinners=[];
  };
  
  this.controls=function(cPos,click){
    if(ready){
      // controls.show();
      controls.run(cPos);
      var uiSel=controls.click();
      if(uiSel===0 && click){
        console.log("spin");
        this.spin();
      }
    }
  };
  
  this.spin=function(){
    if(ready){
      spinners.forEach(function(spinner,i){
        spinner.spin(4-i*2.5);
      });
    }
    hasSpun=true;
  };
  
  this.show=function(){
    
  };

  this.run=function(){
    push();
    translate(x,y);
    noStroke();
    fill(128);
    rectMode(CORNER);
    rect(0,0,dw,dh);
    if(ready){
      var stopped=0;
      spinners.forEach(function(spinner){
        spinner.show(dw/2, dh/2);
        spinner.run();
        if(spinner.isStopped()){
          stopped++;
        }
      });
      if(stopped==2){
        stopCount++;
        
      } else {
        stopCount=0;
      }
      if(hasSpun && stopCount==stopMax){
        console.log(spinners[0].frontPic+" "+spinners[1].frontPic);
        var you=spinners[0].frontPic;
        var life=spinners[1].frontPic;
        
        if(you==life){
          message="draw: play again";
        } else if(you+1==life || you==life+2){
          message="Life beat you";
        } else if(you+2==life || you==life+1){
          message="You win!";
        }
        console.log(message);
        messageBox=new MessageBox(message,dw*0.1,dh*0.6,dw*0.8,dh*0.2);
      }
      if(hasSpun && stopCount>=stopMax){
        messageBox.show();
      }
      controls.show();
    }
    pop();
  };
  


  function cosRule(s1,s2,a){
    var s3sq=s1*s1+s2*s2-2*s1*s2*cos(a);
    var s3=sqrt(s3sq);
    return s3;
  }
  
  function Spinner(x,y,n,r, label){
    var pics=[];
    this.frontPic=-1;
    var aNow=0;
    var aRotInit=PI/25;
    var aRot=0;
    var aRotRange=PI/120;
    var aRotVar=0;
    var aRotNow=0;
    var aFriction=0.985;
    // var r=100;
    var aStep=TWO_PI/n;
    var side=cosRule(r,r,aStep);
    for(var i=0; i<n; i++){
      var ind=i%symbols.length;
      pics.push(new Pic2(i,i*aStep,side,ind,symbols[ind]));
    }
    
    this.spin=function(strength){
      aRot=aRotInit*random(0.8,1)*strength;
    }
    
    this.run=function(){
      var aRotRel=(aNow%aStep)/aStep
      aRotVar=1-2*abs(0.5-aRotRel);
      aRotNow=aRot+aRotVar*aRotRange;
      aNow=(aNow+aRotNow)%TWO_PI;
      if(aRot>0.01){
        aRot*=aFriction;
      } else {
        aRot=0;
      }
    }
    
    this.isStopped=function(){
      if(aRot==0){
        this.frontPic=this.getFront();
      } else {
        this.frontPic=-1;
      }
      return this.frontPic>-1;//aRot==0;
    };
    
    this.getFront=function(){
      var frontPic=-1;
      pics.forEach(function(pic){
        var front=pic.isFront();
        if(front>-1){
          frontPic=front;
        }
      });
      return frontPic;
    };
    
    this.show=function(){
      push();
      textAlign(CENTER, CENTER);
      textSize(r*0.2);
      translate(x,y-r*1.2);
      fill(255);
      noStroke(0);
      text(label,0,0);
      pop();
      pics.forEach(function(pic){
        pic.show(x,y,r,aNow,PI/2);
      });
    }
    
    function Pic2(id,a,s,imgType,img){
      this.isFront=function(){
        return cos(a+aNow)>0.95?imgType:-1;
      };
      
      this.show=function(x,y,r,aNow, targetA){
        push();
        translate(x,y);
        translate(0,sin(aNow+a)*r);
        scale(1,cos(aNow+a));
        imageMode(CENTER);
        rectMode(CENTER);
        noStroke();
        if(cos(aNow+a)>0){
          image(img,0,0,s,s);
          if(cos(a+aNow)>0.95){
            fill(255,100);
          } else {
            fill(0,0,0,100);
          }
          rect(0,0,s,s);
          image(img,0,0,s,s);
        }
        pop();
      }
    }
    
  //   function Pic(id,a,s){
  //     var buf=createGraphics(s,s);
  //     buf.background(id%2==0?255:40,255);
  //     buf.textAlign(CENTER, CENTER);
  //     buf.fill(id%2==0?40:255,255);
  //     buf.noStroke();
  //     buf.textSize(s);
  //     buf.text(i,buf.width/2, buf.height/2);
      
  //     this.show=function(x,y,r,aNow){
  //       push();
  //       translate(x,y);
  //       translate(0,sin(aNow+a)*r);
  //       scale(1,cos(aNow+a));
  //       imageMode(CENTER);
  //       if(cos(aNow+a)>0){
  //         image(buf.get(),0,0);
  //       }
  //       pop();
  //     }
  //   }
  }
  
  function MessageBox(message,x,y,w,h){
    var shifter=0;
    var shift=0.01;
    
    this.show=function(){
      push();
      translate(x,y);
      fill(255,180);
      noStroke();
      rect(0,0,w,h,h*0.1);
      translate(w/2, h/2);
      
      strokeJoin(ROUND);
      noFill();
      textSize(w*0.12);
      textAlign(CENTER, CENTER);
      stroke(10,(1-(shifter)%1)*150);
      noFill();//fill(100,100,200,(1-(shifter)%1)*150);
      strokeWeight(15*shifter);
      text(message,0,0);
      stroke(230,50,0,(1-shifter+0.33)*150);
      noFill();//fill(205,200,0,(1-(shifter+0.5)%1)*180);
      strokeWeight(12*((shifter+0.33)%1));
      text(message,0,0);
      stroke(255,150);
      fill(255,(1-(shifter+0.67)%1)*150);
      strokeWeight(10*((shifter+0.67)%1));
      text(message,0,0);
      pop();
      shifter=(shifter-shift+1)%1;
    };
  }
}