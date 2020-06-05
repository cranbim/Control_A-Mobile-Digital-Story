function TextFight(x,y,w,h,params){
  this.invoked=false;
  var ready=false;
  
  var wbs=[];
  var words1;
  var words2;
  var message1="I am; comfortable with; rules and; conventions.;Rules; let me know; where I; stand,;and what is; expected of me.;Rules are; essential; for maintaining; peace; and order.;When someone; breaks; a rule,; they spit in the; eye; of their peers,; and such behaviour; must be; accounted for.;For me,; rules; are the backbone; of any community or; society.";
  var message2="I cannot; bear; to be told what to; do.;I am my;own; person and I am; smart; enough to make up; my own mind; how to behave; given; any situation.;Rules; are followed by; mindless; drones; who have given themselves; over to control by; others.; They are; door; mats.; I am free; and I will; fight; for the; right; to remain so.";
  var yDrift=h*1/1000;
  var myFrameCount=0;
  var yOff=h;//+i*h/10;
  
  words1=message1.split(';');
  words2=message2.split(';');
  console.log(words1.length, words2.length);

  
  this.reset=function(){
    console.log("!!!!reset");
    wbs=[];
    for(var i=0; i<words1.length; i++){
      wbs.push(new WordBattle(words1[i],words2[i],h+i*h/10,1));
    }
    myFrameCount=0;
    yOff=h;
  };
  
  this.stop=function(){
    //do nothing
    console.log("!!! stop TF");
    wbs=[];
  };
  
  this.controls=function(cPos){
    
  }
  
  
  this.invoke=function(){
    this.invoked=true;
    ready=true;
  }
  
  this.run=function(){
    myFrameCount++;
    yOff-=yDrift;
    var verts=[];
    var numSteps=10;
    for(var i=0;i<(words1.length+1)*numSteps;i++){
      var n=noise((h-yDrift*myFrameCount+i*(h/10)/numSteps)/200+frameCount/200,frameCount/105);
      verts.push({x:n*w, y:h-yDrift*myFrameCount+i*(h/10)/numSteps});
    }
    push();
    translate(x,y);
    colorMode(RGB);
    background(50);
    fill(200);
    noStroke();
    beginShape();
    vertex(0,0);
    vertex(verts[0].x,0);
    verts.forEach(function(v){
      vertex(v.x, v.y);
    });
    vertex(verts[verts.length-1].x,h);
    vertex(0,h);
    endShape();
    wbs.forEach(function(wb,i){
      wb.run(yOff+i*h/10,yDrift);
      wb.show();
    });
    pop();
  };


  function WordBattle(w1,w2,tys){
    var yOff;
    var split=0.5;
    var ts=h/2;
    textSize(ts);
    var tw1=textWidth(w1);
    var tw2=textWidth(w2);
    var aw=split*w;
    var aw1=w*split-0.1;
    var ts1=ts*aw1/tw1;
    var aw2=w*(1-split-0.2);
    var ts2=ts*aw2/tw2;
    var shade1=shade2=0;

    this.run=function(yOffn,yd){
      yOff=yOffn;
      
      split=noise(yOff/200+frameCount/200,frameCount/105);
      shade1=noise(yOff/50+frameCount/170,frameCount/70);
      shade2=noise(1+yOff/50+frameCount/170,1-frameCount/70);
      aw=split*w;
      aw1=w*(split-0.1);
      ts1=ts*aw1/tw1;
      aw2=w*(1-split-0.1);
      ts2=ts*aw2/tw2;
    }
    
    this.getVert=function(){
      return {x:aw,y:yOff};
    };
    
    this.show=function(){
      noStroke();
      push();
      translate(0,yOff);
      if(yOff>-ts && yOff<h+ts){
        // push();
        textSize(ts1);
        textAlign(LEFT,CENTER);
        fill(150*shade1);
        text(w1,0,0);
        pop();
        push();
        translate(w,yOff);
        textSize(ts2);
        textAlign(RIGHT,CENTER);
        fill(255-150*shade2);
        text(w2,0,0);
        // pop();
      }
      pop();
    };
  }
  
}