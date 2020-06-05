function Zone(x,y,w,h,dw, dh){
  var shade=random(10,100);
  var hover=false;
  var disp=1;
  this.selected=false;
  this.fragmentIndex=-1;
  var cb=new ContentBlob(x,y,w*0.95,h*0.95,dw, dh,5);
  
  this.finished=false;
  
  this.asignFragment=function(fragIndex){
    this.fragmentIndex=fragIndex;
  };
  
  this.run=function(cPos, complete){
    hover=cPos.x>x-w/2 && cPos.x<x+w/2 && cPos.y>y-h/2 && cPos.y<y+h/2;
    cb.run(cPos.active, this.selected, complete);
    this.finished=cb.finished;
  };
  
  this.click=function(){
    if(hover){
      if(!this.selected){
        this.selected=true;
      }
      return true;
    }
    return false;
  };
  
  this.show=function(){
    cb.show();
  };
  
  this.getMask=function(buf){
    buf=cb.getMask(buf);
    return buf;
  };
}

function ContentBlob(x,y,w,h,dw, dh,n){
  var baseX=x;
  var baseY=y;
  var points=[];
  var stepX=w/n;
  var stepY=h/n;
  var nPoints=[];
  var npRad=w/2;
  var npRange=w;
  var numPoints=0;
  var noisiness=0;
  var pointsNow=[];
  var driftVel=createVector(0,0);
  var driftAcc;
  var driftLimit=2;
  var cHue=random(360);//60+floor(random(3))*120+random(-10,10);
  var cSat=random(50,65);
  var nOff=random(10);
  var pattern=new Pattern(w*2,h*2);
  var buf=createGraphics(w*2, h*2);
  var touching=false;
  var isDone=false;
  var endRot=PI/400;
  var vc=createVector(dw/2,dw/2);
  this.finished=false;
  
  for(var i=-w/2; i<w/2; i+=stepX){
    points.push(createVector(i,-h/2));
  }
  for(var i=-h/2; i<h/2; i+=stepY){
    points.push(createVector(w/2,i));
  }
  for(var i=w/2; i>-w/2; i-=stepX){
    points.push(createVector(i,h/2));
  }
  for(var i=h/2; i>-h/2; i-=stepY){
    points.push(createVector(-w/2,i));
  }
  pointsNow=points.map(function(p){
    return (p.copy());
  });
  
  function touchCheck(){
    touching=false;
    if(touches.length>0){
      if(dist(touches[0].x, touches[0].y, x,y)<npRad*0.65){
        touching=true;
      }
    }
    if(mouseIsPressed){
      if(dist(mouseX, mouseY, x,y)<npRad){
        touching=true;
      }
    }
  }
  
  this.run=function(control, done, complete){
    isDone=done;
    if(complete){
      var pos=createVector(x,y);
      var dif=p5.Vector.sub(pos,vc);
      var da=dif.heading();
      var dm=dif.mag();
      if(dm>dw*0.01){
        dif.rotate(endRot*1000/dm);
        dif.mult(0.99);
        dif.add(vc);
        x=dif.x;
        y=dif.y;
        for(var i=0; i<points.length; i++){
          pointsNow[i].mult(0.995);
        }
      } else {
        this.finished=true;
      }
    } else {
      touchCheck();
      if(control || done){
        noisiness+=(0-noisiness)/30;
      } else {
        noisiness+=(1-noisiness)/30;
      }
      var n;
      // noisiness=mouseX/width;
      for(var i=0; i<points.length; i++){
        n=noise(nOff+(x+points[i].x)/300, (y+points[i].y)/300+frameCount/100);
        nPoints[i]=points[i].copy().setMag(npRad-npRange/2+npRange*n);
        pointsNow[i]=p5.Vector.add(points[i].copy().mult(1-noisiness),nPoints[i].copy().mult(noisiness));
      }
      if(control || isDone){
        x+=(baseX-x)/15;
        y+=(baseY-y)/15;
      } else {
        if(!touching){
          n=noise(x/100+frameCount/50,nOff+y/100);
          driftAcc=p5.Vector.fromAngle(n*4*TWO_PI).mult(0.03);
          driftVel.add(driftAcc);
          driftVel.limit(driftLimit);
          x+=driftVel.x;
          y+=driftVel.y;
          edges();
        }
      }
    }
  };
  
  function edges(){
    // x=(x+width)%width;
    // y=(y+height)%height;
    if(x<-w/2) x=dw+w/2;
    if(x>dw+w/2) x=-w/2;
    if(y<-h/2) y=dh+h/2;
    if(y>dh+h/2) y=-h/2;
  }
  
  this.showMask=function(){
    buf.clear();
    buf.push();
    buf.translate(w,h);
    buf.fill(255,255);
    buf.noStroke();
    buf.beginShape();
    pointsNow.forEach(function(p){
      buf.vertex(p.x, p.y);
    });
    buf.endShape(CLOSE);
    buf.pop();
    var masker=buf.get();
    // var masked=pattern.get();
    // masked.mask(masker);
    push();
    translate(x,y);
    image(masker,-w,-h,w*2,h*2);
    pop();
  }
  
  this.getMask=function(buf){
    // buf.clear();
    buf.push();
    buf.translate(x,y);
    buf.fill(255,150);
    if(touching){
      buf.fill(255,255);
    }
    buf.noStroke();
    buf.beginShape();
    pointsNow.forEach(function(p){
      buf.vertex(p.x, p.y);
    });
    buf.endShape(CLOSE);
    buf.pop();

    return buf;
    // image(masked,0,0,dw,dh);
  }
  
  this.show=function(){
    push();
    colorMode(HSB);
    translate(x,y);
    // fill(cHue,cSat,50,0.6);
    stroke(noise(x/100, y/100+frameCount/100)*50-10,90,90,0.7);
    strokeWeight(w*0.1);
    noFill();
    if(touching){
      fill(0,100,100,0.7);
    }
    // noStroke();
    scale(0.95);
    if(isDone){
      stroke(220,90,90,0.7);
      strokeWeight(w*0.1);
      noFill();
      beginShape();
      pointsNow.forEach(function(p){
        // ellipse(p.x,p.y,5);
        vertex(p.x, p.y);
      });
      endShape(CLOSE);
    } else {
      var rot=(noise(x/200, y/200+frameCount/300)-0.5)*PI;
      for(var i=0; i<3;i++){
        beginShape();
        pointsNow.forEach(function(p){
          // ellipse(p.x,p.y,5);
          vertex(p.x, p.y);
        });
        endShape(CLOSE);
        rotate(rot);
        scale(0.67);
      }
    }
    pop();
  };
}

function Pattern(w,h,spots){
  var len=max(w,h);
  // var spots=random(10)<5;
  var size=len*random(0.01,0.03);
  var stride=random(size*1,size*2);
  if(spots){
    stride=random(size*1.2,size*2.5);
  }
  console.log(stride/size);
  var buf=createGraphics(w,h);
  var img;
  buf.translate(w/2,h/2);
  buf.rotate(random(PI));
  buf.translate(-len,-len);
  buf.background(235,115,0);
  
  if(spots){
    var strideV=sin(PI/3)*stride;
    buf.fill(0);
    buf.noStroke();
    var nv=len*2/strideV;
    var nh=len*2/stride;
    for(var j=0; j<nv; j++){
      for(var i=0; i<nh; i++){
        buf.ellipse((i+(j%2===0?0:0.5))*stride,j*strideV,size);
      }
    }
  } else {
    buf.stroke(0);
    buf.noFill();
    buf.strokeWeight(size);
    var nv=len*2/stride;
    for(var j=0; j<nv; j++){
      // for(var i=0; i<nh; i++){
        // buf.ellipse((i+(j%2===0?0:0.5))*stride,j*strideV,size);
        buf.line(0,j*stride,len*2,j*stride);
      // }
    }
  }
  img=buf.get();
  
  this.get=function(){
    return buf.get();
  }
}