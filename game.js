// ── game.js ── Complete Game Logic ──
(function(){
  var E = Engine;
  var PD = PlantData;

  // Game states: menu → selection → battle → gameover
  var state = 'menu';
  var sunCount = 150;
  var selectedSeeds = [];
  var activeSeeds = [];
  var currentPlant = null;
  var grid=[], defenders=[], enemies=[], projectiles=[], suns=[];
  var lastTs=0, wave=1, waveTimer=0, skyTimer=0;
  var startTimer = 0;

  var ROWS=5, COLS=9, CELL=60;
  var GRID_X=220, GRID_Y=130;
  var SIDEBAR_W = 140;

  // ─── Grid ───
  function initGrid(){
    grid=[];
    for(var r=0;r<ROWS;r++)
      for(var c=0;c<COLS;c++)
        grid.push({c:c,r:r,x:GRID_X+c*CELL,y:GRID_Y+r*CELL,occupied:false});
  }

  // ─── Zombie spawning ───
  function spawnZombie(){
    var keys=Object.keys(PD.ZOMBIE_TYPES);
    var idx=E.randInt(0,Math.min(Math.floor(wave/3),keys.length-1));
    var t=PD.ZOMBIE_TYPES[keys[idx]];
    var row=E.randInt(0,ROWS-1);
    enemies.push({
      x:E.W+E.rand(20,120), y:GRID_Y+row*CELL, row:row,
      w:CELL, h:CELL, hp:t.hp, maxHp:t.hp, speed:t.speed+wave*0.002,
      variant:t.drawVariant, dead:false, eatTimer:0, frozen:0
    });
  }

  // ═══════════════════════════════════════
  //  MENU SCREEN
  // ═══════════════════════════════════════
  function drawMenu(clicks){
    var m=E.mouse();
    // Background gradient
    var g=E.ctx.createLinearGradient(0,0,0,E.H);
    g.addColorStop(0,'#1b5e20');g.addColorStop(1,'#0d3b13');
    E.rect(0,0,E.W,E.H,g);

    // Decorative zombies in background
    var t=performance.now()*0.001;
    for(var i=0;i<5;i++){
      E.alpha(0.15);
      PD.drawZombie(100+i*200+Math.sin(t+i)*20, 350+Math.cos(t*0.7+i)*15, 90, ['basic','cone','bucket','flag','basic'][i]);
    }
    E.resetAlpha();

    // Title with shadow
    E.titleText('PLANTS vs ZOMBIES', E.W/2+3, 153, 80, '#0a2e0a');
    E.titleText('PLANTS vs ZOMBIES', E.W/2, 150, 80, '#a5d6a7');

    // Subtitle
    E.text('🌻 Mini Edition 🧟', E.W/2, 230, 20, '#66bb6a', 'center');

    // Start button
    var bx=E.W/2-140, by=320, bw=280, bh=70;
    var hover=m.x>bx&&m.x<bx+bw&&m.y>by&&m.y<by+bh;
    E.roundRect(bx,by,bw,bh,16, hover?'#43a047':'#2e7d32');
    E.roundRect(bx+3,by+3,bw-6,bh-6,13, hover?'#66bb6a':'#4caf50');
    E.titleText('BẮT ĐẦU', E.W/2, by+36, 36, '#fff');

    // Instructions
    E.text('Click chuột để chọn cây và trồng trên sân cỏ', E.W/2, 440, 14, '#81c784', 'center');
    E.text('Thu thập mặt trời ☀ để mua thêm cây', E.W/2, 462, 14, '#81c784', 'center');

    if(clicks.some(function(c){return c.x>bx&&c.x<bx+bw&&c.y>by&&c.y<by+bh;})){
      state='selection'; selectedSeeds=[];
    }
  }

  // ═══════════════════════════════════════
  //  SEED SELECTION SCREEN
  // ═══════════════════════════════════════
  function drawSelection(clicks){
    var m=E.mouse();
    E.rect(0,0,E.W,E.H,'#263238');

    E.textB('CHỌN CÂY CỦA BẠN (tối đa 8)', E.W/2, 40, 26, '#fff', 'center');
    E.text('Click vào cây để chọn/bỏ chọn', E.W/2, 68, 14, '#90a4ae', 'center');

    var keys=Object.keys(PD.TYPES);
    var perRow=7;
    for(var i=0;i<keys.length;i++){
      var k=keys[i];
      var col=i%perRow, row=Math.floor(i/perRow);
      var px=80+col*145, py=100+row*160;
      var sel=selectedSeeds.indexOf(k)!==-1;
      var hov=m.x>px&&m.x<px+125&&m.y>py&&m.y<py+140;

      // Card background
      E.roundRect(px,py,125,140,10, sel?'#33691e':(hov?'#37474f':'#1e272e'));
      if(sel) E.strokeRect(px,py,125,140,'#76ff03',3);

      // Draw plant sprite
      PD.TYPES[k].drawFn(px+32, py+10, 60);

      // Name and cost
      E.text(PD.TYPES[k].name, px+62, py+85, 12, '#fff', 'center');
      E.text(PD.TYPES[k].desc, px+62, py+102, 10, '#aaa', 'center');
      E.textB(PD.TYPES[k].cost+'☀', px+62, py+122, 14, '#fdd835', 'center');

      // Handle click
      for(var ci=0;ci<clicks.length;ci++){
        var c=clicks[ci];
        if(c.x>px&&c.x<px+125&&c.y>py&&c.y<py+140){
          if(sel) selectedSeeds=selectedSeeds.filter(function(s){return s!==k;});
          else if(selectedSeeds.length<8) selectedSeeds.push(k);
        }
      }
    }

    // Selected count
    E.text('Đã chọn: '+selectedSeeds.length+'/8', E.W/2, E.H-50, 16, '#b0bec5', 'center');

    // Fight button
    if(selectedSeeds.length>0){
      var bx=E.W/2-80, by=E.H-90, bw=160, bh=50;
      var bh2=m.x>bx&&m.x<bx+bw&&m.y>by&&m.y<by+bh;
      E.roundRect(bx,by,bw,bh,12, bh2?'#558b2f':'#33691e');
      E.titleText('CHIẾN!', E.W/2, by+26, 28, '#fff');
      if(clicks.some(function(c){return c.x>bx&&c.x<bx+bw&&c.y>by&&c.y<by+bh;})){
        activeSeeds=selectedSeeds.slice();
        currentPlant=null;
        defenders=[];enemies=[];projectiles=[];suns=[];
        sunCount=150;wave=1;waveTimer=0;skyTimer=0;startTimer=0;
        initGrid();
        state='starting';
      }
    }
  }

  // ═══════════════════════════════════════
  //  BATTLE UPDATE
  // ═══════════════════════════════════════
  function updateBattle(dt,clicks){
    // Sky suns
    skyTimer+=dt;
    if(skyTimer>8000){
      suns.push({x:E.rand(GRID_X,GRID_X+COLS*CELL-40),y:-40,r:18,targetY:E.rand(GRID_Y,GRID_Y+ROWS*CELL-40),collected:false,life:12000});
      skyTimer=0;
    }

    // Update defenders
    for(var di=0;di<defenders.length;di++){
      var p=defenders[di];
      var cfg=PD.TYPES[p.type];

      // Attack plants: shoot projectiles
      if(cfg.cat==='attack'||cfg.cat==='slow'){
        p.timer=(p.timer||0)+dt;
        if(p.timer>=cfg.cooldown){
          var hasTarget=false;
          for(var ei=0;ei<enemies.length;ei++){
            if(!enemies[ei].dead&&enemies[ei].row===p.row&&enemies[ei].x>p.x){hasTarget=true;break;}
          }
          if(hasTarget){
            projectiles.push({x:p.x+CELL-5,y:p.y+CELL*0.38,type:p.type,row:p.row,dead:false});
            if(p.type==='repeater'){
              // Second pea after small delay offset
              projectiles.push({x:p.x+CELL+10,y:p.y+CELL*0.38,type:p.type,row:p.row,dead:false});
            }
            p.timer=0;
          }
        }
      }

      // Snapdragon: area damage in front
      if(p.type==='snapdragon'){
        p.timer=(p.timer||0)+dt;
        if(p.timer>=cfg.cooldown){
          for(var ei=0;ei<enemies.length;ei++){
            var e=enemies[ei];
            if(!e.dead&&Math.abs(e.row-p.row)<=1&&e.x>p.x&&e.x<p.x+CELL*2.5){
              e.hp-=30;
            }
          }
          p.timer=0;
        }
      }

      // Support plants: produce sun
      if(cfg.cat==='support'){
        p.timer=(p.timer||0)+dt;
        var interval=p.type==='twinsun'?8000:10000;
        if(p.timer>interval){
          var sunVal=p.type==='twinsun'?2:1;
          for(var si=0;si<sunVal;si++){
            suns.push({x:p.x+E.rand(0,30),y:p.y-10-si*20,r:14,targetY:p.y+E.rand(10,40),collected:false,life:10000});
          }
          p.timer=0;
        }
      }

      // Chomper digestion timer
      if(p.type==='chomper'&&p.digesting){
        p.digestTimer=(p.digestTimer||0)+dt;
        if(p.digestTimer>15000){p.digesting=false;p.digestTimer=0;}
      }
    }

    // Update projectiles
    for(var pi=0;pi<projectiles.length;pi++){
      var pr=projectiles[pi];
      if(pr.dead) continue;
      pr.x+=4;
      if(pr.x>E.W){pr.dead=true;continue;}
      for(var ei=0;ei<enemies.length;ei++){
        var e=enemies[ei];
        if(!e.dead&&e.row===pr.row&&pr.x>e.x&&pr.x<e.x+CELL*0.7){
          var dmg=pr.type==='firepea'?40:20;
          e.hp-=dmg;
          if(pr.type==='snowpea'){e.frozen=3000;e.speed=Math.max(0.005,e.speed*0.5);}
          pr.dead=true;
          break;
        }
      }
    }
    projectiles=projectiles.filter(function(p){return !p.dead;});

    // Update enemies
    for(var ei=0;ei<enemies.length;ei++){
      var e=enemies[ei];
      if(e.dead) continue;

      // Frozen timer
      if(e.frozen>0){e.frozen-=dt;}

      var eating=false;
      for(var di=0;di<defenders.length;di++){
        var p=defenders[di];
        if(p.row===e.row&&e.x<p.x+CELL*0.6&&e.x+CELL*0.5>p.x){
          var cfg=PD.TYPES[p.type];

          // Trap: instant kill zombie
          if(cfg.cat==='trap'){
            e.hp-=1800; p.hp=0; break;
          }
          // Freeze: slow zombie
          if(cfg.cat==='freeze'){
            e.frozen=5000; e.speed=0.005; p.hp=0; break;
          }
          // Chomper: eat zombie
          if(p.type==='chomper'&&!p.digesting){
            e.dead=true; p.digesting=true; p.digestTimer=0; eating=true; break;
          }
          // Normal eating
          eating=true;
          e.eatTimer=(e.eatTimer||0)+dt;
          if(e.eatTimer>800){p.hp-=25;e.eatTimer=0;}
          break;
        }
      }

      // Move zombie (with sin wave sway)
      if(!eating){
        var spd=e.frozen>0?e.speed*0.3:e.speed;
        e.x-=spd*dt;
        e.y=GRID_Y+e.row*CELL+Math.sin(performance.now()*0.003+e.row)*2;
      }

      if(e.hp<=0) e.dead=true;
      if(e.x<GRID_X-80) state='gameover';
    }
    enemies=enemies.filter(function(e){return !e.dead;});

    // Clean dead plants
    defenders=defenders.filter(function(p){
      if(p.hp<=0){
        var idx=p.row*COLS+Math.round((p.x-GRID_X)/CELL);
        if(grid[idx]) grid[idx].occupied=false;
        return false;
      }
      return true;
    });

    // Update suns
    for(var i=0;i<suns.length;i++){
      var s=suns[i];
      if(s.y<s.targetY) s.y+=0.8;
      s.life-=dt;
    }
    suns=suns.filter(function(s){return !s.collected&&s.life>0;});

    // Handle clicks
    for(var ci=0;ci<clicks.length;ci++){
      var c=clicks[ci];

      // Collect sun?
      var sunCollected=false;
      for(var i=suns.length-1;i>=0;i--){
        var s=suns[i];
        if(E.dist(c.x,c.y,s.x+s.r,s.y+s.r)<35){
          s.collected=true; sunCount+=25; sunCollected=true; break;
        }
      }
      if(sunCollected) continue;

      // Click sidebar seed?
      var seedClicked=false;
      for(var i=0;i<activeSeeds.length;i++){
        var sy=100+i*62;
        if(c.x>10&&c.x<SIDEBAR_W-10&&c.y>sy&&c.y<sy+56){
          currentPlant=(currentPlant===activeSeeds[i])?null:activeSeeds[i];
          seedClicked=true; break;
        }
      }
      if(seedClicked) continue;

      // Place plant on grid?
      if(currentPlant){
        var gc=Math.floor((c.x-GRID_X)/CELL), gr=Math.floor((c.y-GRID_Y)/CELL);
        if(gc>=0&&gc<COLS&&gr>=0&&gr<ROWS){
          var cell=grid[gr*COLS+gc];
          var cost=PD.TYPES[currentPlant].cost;
          if(!cell.occupied&&sunCount>=cost){
            var newP={x:cell.x,y:cell.y,row:gr,type:currentPlant,hp:PD.TYPES[currentPlant].hp,timer:0};
            defenders.push(newP);
            cell.occupied=true;
            sunCount-=cost;

            // Bomb plants: explode after delay
            if(PD.TYPES[currentPlant].cat==='bomb'){
              var plantRef=newP, plantType=currentPlant, bombRow=gr, bombX=cell.x;
              setTimeout(function(){
                for(var ei=0;ei<enemies.length;ei++){
                  var e=enemies[ei];
                  if(plantType==='jalapeno'&&e.row===bombRow) e.dead=true;
                  if(plantType==='cherrybomb'&&Math.abs(e.row-bombRow)<=1&&Math.abs(e.x-bombX)<150) e.dead=true;
                }
                plantRef.hp=0;
              },600);
            }
          }
        }
      }
    }

    // Wave spawning
    waveTimer+=dt;
    var interval=Math.max(3000, 12000-wave*500);
    if(waveTimer>interval){
      var count=1+Math.floor(wave/4);
      for(var i=0;i<count;i++) spawnZombie();
      waveTimer=0;
      wave++;
    }
  }

  // ═══════════════════════════════════════
  //  BATTLE DRAW
  // ═══════════════════════════════════════
  function drawBattle(){
    var m=E.mouse();

    // Sky
    var sky=E.ctx.createLinearGradient(0,0,0,E.H);
    sky.addColorStop(0,'#64b5f6');sky.addColorStop(0.45,'#e3f2fd');sky.addColorStop(0.55,'#a5d6a7');sky.addColorStop(1,'#388e3c');
    E.rect(0,0,E.W,E.H,sky);

    // House on left
    E.roundRect(GRID_X-55,GRID_Y+10,50,ROWS*CELL-20,8,'#6d4c41');
    E.text('🏠',GRID_X-45,GRID_Y+ROWS*CELL/2,28,'#fff','center');

    // Lawn grid
    for(var r=0;r<ROWS;r++){
      for(var c=0;c<COLS;c++){
        var x=GRID_X+c*CELL, y=GRID_Y+r*CELL;
        E.rect(x,y,CELL-1,CELL-1,(r+c)%2===0?'#4caf50':'#66bb6a');
      }
    }

    // Draw defenders
    for(var i=0;i<defenders.length;i++){
      var p=defenders[i];
      PD.TYPES[p.type].drawFn(p.x+4,p.y+2,CELL-8);
      // HP bar if damaged
      if(p.hp<PD.TYPES[p.type].hp){
        var ratio=p.hp/PD.TYPES[p.type].hp;
        E.rect(p.x+8,p.y-4,CELL-16,3,'#333');
        E.rect(p.x+8,p.y-4,(CELL-16)*ratio,3,ratio>0.3?'#66bb6a':'#ef5350');
      }
      // Chomper digesting indicator
      if(p.digesting){E.text('💤',p.x+CELL/2,p.y-10,14,'#fff','center');}
    }

    // Draw enemies
    for(var i=0;i<enemies.length;i++){
      var e=enemies[i];
      if(e.dead) continue;
      if(e.frozen>0){E.alpha(0.8);}
      PD.drawZombie(e.x,e.y,CELL+10,e.variant);
      E.resetAlpha();
      // HP bar
      var ratio=e.hp/e.maxHp;
      E.rect(e.x+8,e.y-5,(CELL-10),3,'#333');
      E.rect(e.x+8,e.y-5,(CELL-10)*ratio,3,ratio>0.3?'#c5e1a5':'#ef5350');
      // Frozen indicator
      if(e.frozen>0){E.text('❄',e.x+CELL/2,e.y-12,12,'#fff','center');}
    }

    // Draw projectiles
    for(var i=0;i<projectiles.length;i++){
      var pr=projectiles[i];
      var col=pr.type==='snowpea'?'#42a5f5':(pr.type==='firepea'?'#ff5722':'#c5e1a5');
      E.circle(pr.x,pr.y,7,col);
      E.circle(pr.x,pr.y,3,'#fff');
    }

    // Draw suns
    for(var i=0;i<suns.length;i++){
      var s=suns[i];
      PD.drawSun(s.x+s.r,s.y+s.r,s.r);
    }

    // Ghost preview
    if(currentPlant){
      var gc=Math.floor((m.x-GRID_X)/CELL), gr=Math.floor((m.y-GRID_Y)/CELL);
      if(gc>=0&&gc<COLS&&gr>=0&&gr<ROWS){
        E.alpha(0.45);
        PD.TYPES[currentPlant].drawFn(GRID_X+gc*CELL+4,GRID_Y+gr*CELL+2,CELL-8);
        E.resetAlpha();
      }
    }

    // ── Sidebar ──
    E.roundRect(5,5,SIDEBAR_W,E.H-10,12,'rgba(0,0,0,0.6)');

    // Sun counter
    PD.drawSun(35,40,16);
    E.textB(String(sunCount),60,40,22,'#fdd835','left');

    // Wave counter
    E.text('Wave '+wave,SIDEBAR_W/2+5,70,14,'#b0bec5','center');

    // Seed cards
    for(var i=0;i<activeSeeds.length;i++){
      var k=activeSeeds[i];
      var sy=100+i*62;
      var sel=currentPlant===k;
      var canAfford=sunCount>=PD.TYPES[k].cost;

      E.roundRect(12,sy,SIDEBAR_W-24,56,6, sel?'rgba(76,175,80,0.6)':'rgba(255,255,255,0.12)');
      if(!canAfford){E.alpha(0.4);}
      PD.TYPES[k].drawFn(16,sy+2,40);
      E.text(PD.TYPES[k].name,60,sy+16,11,sel?'#c5e1a5':'#ddd','left');
      E.textB(PD.TYPES[k].cost+'☀',60,sy+36,13,'#fdd835','left');
      E.resetAlpha();
    }
  }

  // ═══════════════════════════════════════
  //  MAIN LOOP
  // ═══════════════════════════════════════
  function loop(ts){
    if(!lastTs) lastTs=ts;
    var dt=ts-lastTs; lastTs=ts;
    if(dt>100) dt=16;
    E.clear();
    var clicks=E.consumeClicks();

    if(state==='menu'){
      drawMenu(clicks);
    }
    else if(state==='selection'){
      drawSelection(clicks);
    }
    else if(state==='starting'){
      drawBattle();
      // Countdown overlay
      startTimer+=dt;
      E.alpha(0.55);E.rect(0,0,E.W,E.H,'#000');E.resetAlpha();
      if(startTimer<1000) E.titleText('3',E.W/2,E.H/2,100,'#fff');
      else if(startTimer<2000) E.titleText('2',E.W/2,E.H/2,100,'#fdd835');
      else if(startTimer<3000) E.titleText('1',E.W/2,E.H/2,100,'#ff9800');
      else{
        E.titleText('TRỒNG CÂY!',E.W/2,E.H/2,70,'#76ff03');
        if(startTimer>3800){state='battle';spawnZombie();}
      }
    }
    else if(state==='battle'){
      updateBattle(dt,clicks);
      drawBattle();
    }
    else if(state==='gameover'){
      drawBattle();
      E.rect(0,0,E.W,E.H,'rgba(0,0,0,0.75)');
      E.titleText('ZOMBIE ĐÃ THẮNG!',E.W/2,E.H/2-40,56,'#ef5350');
      E.text('Wave đạt được: '+wave,E.W/2,E.H/2+10,20,'#ffcc80','center');
      E.roundRect(E.W/2-100,E.H/2+40,200,50,12,'#43a047');
      E.textB('CHƠI LẠI',E.W/2,E.H/2+65,22,'#fff','center');
      if(clicks.some(function(c){return c.x>E.W/2-100&&c.x<E.W/2+100&&c.y>E.H/2+40&&c.y<E.H/2+90;})){
        state='menu';
      }
    }

    requestAnimationFrame(loop);
  }

  // Start!
  initGrid();
  requestAnimationFrame(loop);
})();
