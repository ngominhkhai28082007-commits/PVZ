// ── data.js ── Plant & Zombie sprite drawing + config ──
var PlantData = (function(){
  var E = Engine;

  function drawPeashooter(x,y,s){
    E.rect(x+s*.4,y+s*.5,s*.2,s*.5,'#2e7d32');
    E.circle(x+s*.5,y+s*.35,s*.28,'#4caf50');
    E.circle(x+s*.42,y+s*.28,s*.06,'#fff');E.circle(x+s*.58,y+s*.28,s*.06,'#fff');
    E.circle(x+s*.43,y+s*.29,s*.03,'#111');E.circle(x+s*.59,y+s*.29,s*.03,'#111');
    E.rect(x+s*.62,y+s*.32,s*.22,s*.09,'#388e3c');
  }
  function drawRepeater(x,y,s){
    E.rect(x+s*.38,y+s*.5,s*.24,s*.5,'#1b5e20');
    E.circle(x+s*.5,y+s*.35,s*.28,'#388e3c');
    E.circle(x+s*.42,y+s*.27,s*.06,'#fff');E.circle(x+s*.58,y+s*.27,s*.06,'#fff');
    E.circle(x+s*.43,y+s*.28,s*.03,'#111');E.circle(x+s*.59,y+s*.28,s*.03,'#111');
    E.rect(x+s*.62,y+s*.28,s*.24,s*.07,'#2e7d32');
    E.rect(x+s*.62,y+s*.36,s*.24,s*.07,'#2e7d32');
  }
  function drawSnowPea(x,y,s){
    E.rect(x+s*.4,y+s*.5,s*.2,s*.5,'#1565c0');
    E.circle(x+s*.5,y+s*.35,s*.28,'#42a5f5');
    E.circle(x+s*.42,y+s*.28,s*.06,'#e3f2fd');E.circle(x+s*.58,y+s*.28,s*.06,'#e3f2fd');
    E.circle(x+s*.43,y+s*.29,s*.03,'#0d47a1');E.circle(x+s*.59,y+s*.29,s*.03,'#0d47a1');
    E.rect(x+s*.62,y+s*.32,s*.22,s*.09,'#1e88e5');
  }
  function drawFirePea(x,y,s){
    E.rect(x+s*.4,y+s*.5,s*.2,s*.5,'#bf360c');
    E.circle(x+s*.5,y+s*.35,s*.28,'#ff5722');
    E.circle(x+s*.42,y+s*.28,s*.06,'#fff9c4');E.circle(x+s*.58,y+s*.28,s*.06,'#fff9c4');
    E.circle(x+s*.43,y+s*.29,s*.03,'#b71c1c');E.circle(x+s*.59,y+s*.29,s*.03,'#b71c1c');
    E.rect(x+s*.62,y+s*.32,s*.22,s*.09,'#d84315');
    E.circle(x+s*.86,y+s*.35,s*.06,'#ff9800');
  }
  function drawSunflower(x,y,s){
    E.rect(x+s*.42,y+s*.55,s*.16,s*.45,'#558b2f');
    for(var i=0;i<8;i++){var a=Math.PI*2/8*i;
      E.circle(x+s*.5+Math.cos(a)*s*.2,y+s*.36+Math.sin(a)*s*.2,s*.11,'#fdd835');}
    E.circle(x+s*.5,y+s*.36,s*.14,'#5d4037');
    E.circle(x+s*.46,y+s*.33,s*.035,'#fff');E.circle(x+s*.54,y+s*.33,s*.035,'#fff');
  }
  function drawTwinSun(x,y,s){
    E.rect(x+s*.42,y+s*.6,s*.16,s*.4,'#558b2f');
    for(var j=0;j<2;j++){var ox=j===0?s*.35:s*.65,oy=j===0?s*.3:s*.38;
      for(var i=0;i<7;i++){var a=Math.PI*2/7*i;
        E.circle(x+ox+Math.cos(a)*s*.12,y+oy+Math.sin(a)*s*.12,s*.07,'#ffeb3b');}
      E.circle(x+ox,y+oy,s*.09,'#6d4c41');}
  }
  function drawWallnut(x,y,s){
    E.circle(x+s*.5,y+s*.52,s*.36,'#8d6e63');E.circle(x+s*.5,y+s*.52,s*.3,'#a1887f');
    E.circle(x+s*.42,y+s*.44,s*.055,'#fff');E.circle(x+s*.58,y+s*.44,s*.055,'#fff');
    E.circle(x+s*.43,y+s*.45,s*.03,'#3e2723');E.circle(x+s*.59,y+s*.45,s*.03,'#3e2723');
    E.ctx.beginPath();E.ctx.arc(x+s*.5,y+s*.58,s*.07,0,Math.PI);E.ctx.strokeStyle='#4e342e';E.ctx.lineWidth=2;E.ctx.stroke();
  }
  function drawTallnut(x,y,s){
    E.roundRect(x+s*.25,y+s*.1,s*.5,s*.85,8,'#6d4c41');
    E.roundRect(x+s*.3,y+s*.15,s*.4,s*.75,6,'#8d6e63');
    E.circle(x+s*.42,y+s*.35,s*.06,'#fff');E.circle(x+s*.58,y+s*.35,s*.06,'#fff');
    E.circle(x+s*.43,y+s*.36,s*.03,'#3e2723');E.circle(x+s*.59,y+s*.36,s*.03,'#3e2723');
    E.ctx.beginPath();E.ctx.arc(x+s*.5,y+s*.5,s*.06,0,Math.PI);E.ctx.strokeStyle='#4e342e';E.ctx.lineWidth=2;E.ctx.stroke();
  }
  function drawCherryBomb(x,y,s){
    E.rect(x+s*.45,y+s*.1,s*.04,s*.2,'#33691e');E.rect(x+s*.55,y+s*.1,s*.04,s*.15,'#33691e');
    E.circle(x+s*.38,y+s*.55,s*.24,'#c62828');E.circle(x+s*.62,y+s*.55,s*.24,'#d32f2f');
    E.circle(x+s*.32,y+s*.48,s*.05,'#fff');E.circle(x+s*.56,y+s*.48,s*.05,'#fff');
    E.circle(x+s*.33,y+s*.49,s*.025,'#111');E.circle(x+s*.57,y+s*.49,s*.025,'#111');
    E.circle(x+s*.5,y+s*.08,s*.04,'#ff9800');
  }
  function drawJalapeno(x,y,s){
    E.roundRect(x+s*.2,y+s*.25,s*.6,s*.55,12,'#d32f2f');
    E.roundRect(x+s*.25,y+s*.3,s*.5,s*.45,8,'#e53935');
    E.rect(x+s*.45,y+s*.1,s*.08,s*.2,'#2e7d32');
    E.circle(x+s*.38,y+s*.45,s*.05,'#fff');E.circle(x+s*.58,y+s*.45,s*.05,'#fff');
    E.circle(x+s*.39,y+s*.46,s*.025,'#111');E.circle(x+s*.59,y+s*.46,s*.025,'#111');
    E.circle(x+s*.49,y+s*.08,s*.06,'#ff9800');E.circle(x+s*.49,y+s*.04,s*.04,'#ffeb3b');
  }
  function drawPotatoMine(x,y,s){
    E.circle(x+s*.5,y+s*.6,s*.3,'#795548');E.circle(x+s*.5,y+s*.58,s*.25,'#8d6e63');
    E.circle(x+s*.42,y+s*.52,s*.05,'#fff');E.circle(x+s*.58,y+s*.52,s*.05,'#fff');
    E.circle(x+s*.43,y+s*.53,s*.025,'#111');E.circle(x+s*.59,y+s*.53,s*.025,'#111');
    E.circle(x+s*.45,y+s*.35,s*.07,'#558b2f');E.circle(x+s*.55,y+s*.33,s*.06,'#689f38');
  }
  function drawSnapdragon(x,y,s){
    E.rect(x+s*.42,y+s*.55,s*.16,s*.45,'#2e7d32');
    E.roundRect(x+s*.2,y+s*.2,s*.6,s*.4,10,'#e65100');
    E.roundRect(x+s*.25,y+s*.25,s*.5,s*.3,6,'#ff8f00');
    E.circle(x+s*.38,y+s*.32,s*.06,'#fff');E.circle(x+s*.58,y+s*.32,s*.06,'#fff');
    E.circle(x+s*.39,y+s*.33,s*.03,'#b71c1c');E.circle(x+s*.59,y+s*.33,s*.03,'#b71c1c');
    E.circle(x+s*.5,y+s*.15,s*.06,'#ff5722');E.circle(x+s*.5,y+s*.1,s*.04,'#ffab00');
  }
  function drawChomper(x,y,s){
    E.rect(x+s*.42,y+s*.55,s*.16,s*.45,'#1b5e20');
    E.circle(x+s*.5,y+s*.35,s*.3,'#7b1fa2');
    E.roundRect(x+s*.25,y+s*.35,s*.5,s*.15,4,'#880e4f');
    for(var i=0;i<4;i++){E.rect(x+s*(.3+i*.12),y+s*.34,s*.06,s*.06,'#fff');}
    E.circle(x+s*.42,y+s*.25,s*.05,'#fff');E.circle(x+s*.58,y+s*.25,s*.05,'#fff');
    E.circle(x+s*.43,y+s*.26,s*.025,'#111');E.circle(x+s*.59,y+s*.26,s*.025,'#111');
  }
  function drawIceberg(x,y,s){
    E.circle(x+s*.5,y+s*.55,s*.32,'#b3e5fc');E.circle(x+s*.5,y+s*.53,s*.26,'#e1f5fe');
    E.circle(x+s*.42,y+s*.48,s*.04,'#0277bd');E.circle(x+s*.58,y+s*.48,s*.04,'#0277bd');
    E.circle(x+s*.35,y+s*.38,s*.05,'#4fc3f7');E.circle(x+s*.65,y+s*.38,s*.05,'#4fc3f7');
    E.circle(x+s*.5,y+s*.33,s*.05,'#29b6f6');
  }

  var TYPES = {
    peashooter:  {name:'Peashooter', cost:100,hp:300,cat:'attack',cooldown:1500,drawFn:drawPeashooter,desc:'Bắn hạt đậu'},
    repeater:    {name:'Repeater',   cost:200,hp:300,cat:'attack',cooldown:1500,drawFn:drawRepeater,desc:'Bắn 2 đậu'},
    snowpea:     {name:'Snow Pea',   cost:175,hp:300,cat:'slow',  cooldown:1500,drawFn:drawSnowPea,desc:'Đạn đông lạnh'},
    firepea:     {name:'Fire Pea',   cost:225,hp:300,cat:'attack',cooldown:1500,drawFn:drawFirePea,desc:'Đạn lửa x2 dmg'},
    snapdragon:  {name:'Snapdragon', cost:175,hp:300,cat:'attack',cooldown:1200,drawFn:drawSnapdragon,desc:'Phun lửa 2x3'},
    chomper:     {name:'Chomper',    cost:150,hp:300,cat:'attack',cooldown:0,   drawFn:drawChomper,desc:'Nuốt 1 zombie'},
    sunflower:   {name:'Sunflower',  cost:50, hp:200,cat:'support',cooldown:0, drawFn:drawSunflower,desc:'Tạo mặt trời'},
    twinsun:     {name:'Twin Sun',   cost:125,hp:200,cat:'support',cooldown:0, drawFn:drawTwinSun,desc:'Tạo 2x mặt trời'},
    wallnut:     {name:'Wall-nut',   cost:50, hp:800,cat:'defense',cooldown:0, drawFn:drawWallnut,desc:'Tường chắn'},
    tallnut:     {name:'Tall-nut',   cost:125,hp:1500,cat:'defense',cooldown:0,drawFn:drawTallnut,desc:'Tường cao'},
    cherrybomb:  {name:'Cherry Bomb',cost:150,hp:1,  cat:'bomb',  cooldown:0,  drawFn:drawCherryBomb,desc:'Nổ vùng 3x3'},
    jalapeno:    {name:'Jalapeno',   cost:125,hp:1,  cat:'bomb',  cooldown:0,  drawFn:drawJalapeno,desc:'Đốt cả hàng'},
    potatomine:  {name:'Potato Mine',cost:25, hp:100,cat:'trap',  cooldown:0,  drawFn:drawPotatoMine,desc:'Mìn nổ'},
    iceberg:     {name:'Iceberg',    cost:0,  hp:1,  cat:'freeze',cooldown:0,  drawFn:drawIceberg,desc:'Đóng băng 1 zombie'},
  };

  function drawZombie(x,y,s,variant){
    var bodyC='#546e7a';
    E.rect(x+s*.3,y+s*.45,s*.4,s*.55,bodyC);
    E.rect(x+s*.32,y+s*.85,s*.12,s*.15,'#455a64');
    E.rect(x+s*.56,y+s*.85,s*.12,s*.15,'#455a64');
    E.circle(x+s*.5,y+s*.3,s*.24,'#8bc34a');
    if(variant==='cone'){E.roundRect(x+s*.35,y+s*.08,s*.3,s*.2,4,'#ff6f00');}
    if(variant==='bucket'){E.roundRect(x+s*.3,y+s*.06,s*.4,s*.22,4,'#78909c');E.rect(x+s*.28,y+s*.22,s*.44,s*.05,'#607d8b');}
    if(variant==='flag'){E.rect(x+s*.55,y+s*.1,s*.04,s*.3,'#795548');E.rect(x+s*.59,y+s*.1,s*.18,s*.12,'#e53935');}
    E.circle(x+s*.42,y+s*.26,s*.05,'#ffeb3b');E.circle(x+s*.58,y+s*.26,s*.05,'#ffeb3b');
    E.circle(x+s*.42,y+s*.27,s*.025,'#b71c1c');E.circle(x+s*.58,y+s*.27,s*.025,'#b71c1c');
    E.rect(x+s*.12,y+s*.48,s*.2,s*.07,'#8bc34a');E.rect(x+s*.68,y+s*.5,s*.2,s*.07,'#8bc34a');
  }

  var ZOMBIE_TYPES = {
    basic:  {name:'Zombie',     hp:200, speed:0.022,drawVariant:'basic'},
    cone:   {name:'Conehead',   hp:500, speed:0.025,drawVariant:'cone'},
    bucket: {name:'Buckethead', hp:900, speed:0.02, drawVariant:'bucket'},
    flag:   {name:'Flag Zombie',hp:180, speed:0.035,drawVariant:'flag'},
  };

  function drawSun(x,y,r){
    for(var i=0;i<8;i++){var a=Math.PI*2/8*i;
      E.line(x,y,x+Math.cos(a)*r*1.5,y+Math.sin(a)*r*1.5,'#fff176',2);}
    E.circle(x,y,r,'#fdd835');E.circle(x,y,r*.55,'#ffee58');
  }

  return {TYPES:TYPES,ZOMBIE_TYPES:ZOMBIE_TYPES,drawZombie:drawZombie,drawSun:drawSun};
})();
