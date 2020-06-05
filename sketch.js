var zones=[];
var za=3;
var zd=3;
var control;
var cPos;
var ar=4/7;
var dw,dh;
var fragHistory;//=[];//fillArrayWithFalse(za*zd);
var fragPool=[];

const modes={
  NULL:-1,
  SPLASH:0,
  INTRO:1,
  OPTION:2,
  BROWSE:3,
  CHOOSE:4,
  PLAY:5,
  FRAG:6,
  CRED:7
};
var prevMode=modes.NULL;
var currentMode=modes.SPLASH;
var modeChanged=false;

var modeHistory=[];


var fragments=[];
var players=[];
var intro;
var splash;
var options;
var uiControls;
var credit;

var currentFragID=-1;
var bgAudio1;
var bgAudioReady=true;
var fMain;
var UIButtonImages={};
var mainLogo;

var zoomButtonActive=true;

// var testImage0, testImage1;

function preload(){
  fMain = loadFont("assets/Bitter-Regular.ttf");
  mainLogo=loadImage("assets/ControlLogo.png");
  loadButtonImages();
}

function loadButtonImages(){
  var UIBIK=Object.keys(UIButtonConfig);
  // console.log(UIBIK);
  UIBIK.forEach(function(k){
    var imageList=[];
    for(var i=0; i<UIButtonConfig[k].numImages; i++){
      imageList.push(loadImage(UIButtonConfig[k].imageBase+nf(i,2,0)+".png"));
    }
    UIButtonImages[k]=imageList;
  });
}

function setup() {
  fragHistory=new PersistStore(za*zd);
  // fragHistory.reset();
  dh=windowHeight;
  // dw=windowWidth;
  // dh=windowHeight;
  dw=windowWidth<windowHeight?windowWidth:dh*ar;
  createCanvas(dw,dh);
  pixelDensity(1);
  bgAudio1=createAudio(generalParams.params.bgAudio1,audReady);

  loadAndShuffleContent();
  buildZonesAndAssignFragments()
  control=new DragControl(dw/2, dh*0.7,dw*0.15);
  
  uiControls=new UIControls(0,dw,dw,dh-dw);
  intro=new IntroScreen(0,0,dw,height,introConfig.params);
  splash=new WelcomeScreen(0,0,dw,height,splashConfig.params);
  options=new OptionScreen(0,0,dw,height,optionConfig.params);
  credit=new CreditScreen(0,0,dw,height,creditConfig.params);
}

function loadAndShuffleContent(){
   // load all content
  // playerConfig.forEach(function(pc){
  //   var player=new Player(0,0,dw,dw,pc.params);
  //   players.push(player);
  //   fragPool.push({type: "PLAYER", fragment:player});
  // });

  fragmentConfig.forEach(function(fc){
    var fragment=new window[fc.obj](0,0,dw,dw,fc.params);
    fragments.push(fragment);
    fragPool.push({type: "FRAGMENT", fragment:fragment});
  });
  console.log(fragPool);
  // fragPool=shuffleFrags(fragPool,fragmentOrder);
  console.log(fragPool);
}

function buildZonesAndAssignFragments(){
  // build zones and assign a fragment
  var zw=dw/za;
  var zh=dw/zd;
  var zCount=0;
  for(var j=0; j<zd; j++){
    for(var i=0; i<za; i++){
      var zone=new Zone((i+0.5)*zw, (j+0.5)*zh, zw, zh,dw,dh);
      zone.asignFragment(zCount%fragPool.length);
      zone.selected=fragHistory.vals[zCount];
      zones.push(zone);
      zCount++;
    }
  }
}

function mousePressed(){
  // console.log("simulated click");
}

function audReady(){
  bgAudioReady=true;
}

function resetFragments(){
  zones.forEach(function(zone){
    zone.selected=false;
  });
}

function draw() {
  colorMode(RGB);
  background(255,0,0);
  rectMode(CORNER);
  fill(0);
  noStroke();
  rect(0,0,dw,dh);
  fill(128);
  rect(dw,dh,width-dw, height-dh);
  cPos=control.getPos();
  var click=control.run();
  if(currentMode==modes.OPTION){
    uiControls.setActive(false,[]);
    processOptionControls(cPos, click);
  } else if(currentMode==modes.CRED){
    uiControls.setActive(false,[]);
    processCreditControls(cPos, click);
  } else if(currentMode==modes.SPLASH){
    uiControls.setActive(false,[]);
    processSplashControls(cPos, click);
  } else if(currentMode==modes.INTRO){
    uiControls.setActive(false,[]);
    processIntroControls(cPos, click)
  } else if(currentMode==modes.BROWSE){
    uiControls.setActive(true,[false, true, true]);
    // buf.clear();
    // bufSel.clear();
    processBrowseControls(cPos, click);
  } else if(currentMode==modes.PLAY){
    uiControls.setActive(true,[true, false, false]);
    processPlayControls(cPos, click);
  }  else if(currentMode==modes.FRAG){
    uiControls.setActive(true,[true, false, false]);
    processFragControls(cPos, click);
  }
  uiControls.show();
  uiControls.run(cPos);
  processUIcontrols(cPos, click);
  control.show(zoomButtonActive);
  prevMode=currentMode;
}

function processBrowseControls(cPos, click){
  var selZone=-1;
    var zonesComp=0;
    var zonesFinished=0;
    zones.forEach(function(z){
      if(z.selected){
        zonesComp++;
      }
      if(z.finished){
        zonesFinished++;
      }
    });
    if(zonesFinished==zd*za){
      console.log("All finished");
      fragHistory.reset();
      resetFragments();
    }
    var complete=zonesComp==zd*za;
    zones.forEach(function(z,i){
      if(click){
        if(z.click()){
          selZone=i;
        };
      }
      z.run(cPos,complete);
      z.show();
    });
    if(selZone>-1){
      if(!fragHistory.vals[selZone]){
        fragHistory.vals[selZone]=true;
        fragHistory.update();
        // localStorage.fragmentHistory=JSON.stringify(fragHistory);
        currentFragID=zones[selZone].fragmentIndex;
        if(fragPool[currentFragID].type=="PLAYER"){
          changeMode(modes.PLAY);
        } else if(fragPool[currentFragID].type=="FRAGMENT"){
          changeMode(modes.FRAG);
        }
      }
    }
}

function processSplashControls(cPos, click){
  if(true){
      splash.controls(cPos,click);
      if(splash.isBegin()){
        changeMode(modes.INTRO);
      }
    }
    if(!splash.invoked){
      splash.invoke();
    } else {
      if(didModeChange()){
        splash.reset();
      }
      splash.show();
      splash.run();
    }
}

function processCreditControls(cPos, click){
  if(true){
      var choice=credit.controls(cPos,click);
      if(choice==0){
        changeMode(modes.OPTION);
      }
    }
    if(!credit.invoked){
      credit.invoke();
    } else {
      if(didModeChange()){
        credit.reset();
      }
      credit.show();
      credit.run();
    }
}

function processIntroControls(cPos, click){
  if(true){
      intro.controls(cPos,click);
      if(intro.isBegin()){
        changeMode(modes.BROWSE);
      }
    }
    if(!intro.invoked){
      intro.invoke();
    } else {
      if(didModeChange()){
        intro.reset();
      }
      intro.show();
      intro.run();
    }
}

function processOptionControls(cPos, click){
    // uiControls.setActive(false, false, true);
    if(true){
      var choice=options.controls(cPos,click);
      if(choice==0){
        changeMode(modes.BROWSE);
      } else if(choice==2){
        changeMode(modes.CRED);
      } else if(choice==1){
        console.log("reset frags", choice);
        fragHistory.reset();
        resetFragments();
      }
    }
    if(!options.invoked){
      options.invoke();
    } else {
      if(didModeChange()){
        options.reset();
      }
      options.show();
      options.run();
    }
}

function processPlayControls(cPos, click){
  if(click){
      fragPool[currentFragID].fragment.controls(cPos);
    }
    if(!fragPool[currentFragID].fragment.invoked){
      fragPool[currentFragID].fragment.invoke();
    } else {
      if(didModeChange()){
        fragPool[currentFragID].fragment.reset();
      }
      fragPool[currentFragID].fragment.show();
      if(!fragPool[currentFragID].fragment.run()){
        changeMode(modes.BROWSE);
      }
    }
    
}

function processFragControls(cPos, click){
  if(!fragPool[currentFragID].fragment.invoked){
      fragPool[currentFragID].fragment.invoke();
    } else {
      if(true){
        fragPool[currentFragID].fragment.controls(cPos,click);
      }
      // fragments[0].show();
      if(didModeChange()){
        // console.log(tempSelFrag);
        fragPool[currentFragID].fragment.reset();
      }
    
      fragPool[currentFragID].fragment.run();
    }
    fill(0);
    noStroke();
    rect(0,dw,dw,dh-dw);
}

function processUIcontrols(cPos, click){
  var uiSel=uiControls.click();
  if(click && uiSel>-1){
    if(uiSel==0 && currentMode==modes.FRAG){
      changeMode(modes.BROWSE);
    }
    if(uiSel==0 && currentMode==modes.PLAY){
      changeMode(modes.BROWSE);
    }
    if(uiSel==2 && currentMode==modes.INTRO){
      changeMode(modes.BROWSE);
    }
    if(uiSel==1 && currentMode==modes.BROWSE){
      changeMode(modes.OPTION);
    }
  }
}

function changeMode(newMode){
  modeChanged=false;
  currentMode=newMode;
  if(currentMode!=prevMode){
    modeChanged=true;
    modeStop(prevMode);
    modeHistory.unshift(currentMode);
  }
  prevMode=currentMode;
}

function modeStop(mode){
  fragments.forEach(function(frag){
    frag.stop();
  });
  players.forEach(function(player){
    player.stop();
  });
}

function didModeChange(){
  var changed=modeChanged;
  modeChanged=false;
  return changed;
}

function touchMoved(){
	return false;
}

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function shuffleFrags(pool,order){
  // var aOrder=order.split(',');
  var newPool=[];
  order.forEach(function(frag,i){
    newPool[i]=pool[frag];
  });
  return newPool;
}
