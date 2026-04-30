// ── engine.js ── Core rendering & input engine ──
var Engine = (function(){
  var cvs = document.getElementById('gameCanvas');
  var ctx = cvs.getContext('2d');
  var W = cvs.width, H = cvs.height;
  var mouseX=0, mouseY=0, clicks=[], keys={};

  cvs.addEventListener('mousemove',function(e){
    var r=cvs.getBoundingClientRect();
    mouseX=(e.clientX-r.left)*(W/r.width);
    mouseY=(e.clientY-r.top)*(H/r.height);
  });
  cvs.addEventListener('click',function(e){
    var r=cvs.getBoundingClientRect();
    clicks.push({x:(e.clientX-r.left)*(W/r.width),y:(e.clientY-r.top)*(H/r.height)});
  });

  function circle(x,y,r,c){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=c;ctx.fill();}
  function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h);}
  function roundRect(x,y,w,h,r,c){
    ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();ctx.fillStyle=c;ctx.fill();
  }
  function text(t,x,y,sz,c,al){
    ctx.fillStyle=c;ctx.font=sz+'px Inter,sans-serif';ctx.textAlign=al||'left';ctx.textBaseline='middle';ctx.fillText(t,x,y);
  }
  function textB(t,x,y,sz,c,al){
    ctx.fillStyle=c;ctx.font='bold '+sz+'px Inter,sans-serif';ctx.textAlign=al||'left';ctx.textBaseline='middle';ctx.fillText(t,x,y);
  }
  function titleText(t,x,y,sz,c){
    ctx.fillStyle=c;ctx.font='bold '+sz+'px Creepster,cursive';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(t,x,y);
  }
  function strokeRect(x,y,w,h,c,lw){ctx.strokeStyle=c;ctx.lineWidth=lw||2;ctx.strokeRect(x,y,w,h);}
  function line(x1,y1,x2,y2,c,lw){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=c;ctx.lineWidth=lw||2;ctx.stroke();}
  function clear(){ctx.clearRect(0,0,W,H);}
  function alpha(a){ctx.globalAlpha=a;}
  function resetAlpha(){ctx.globalAlpha=1;}

  function rand(a,b){return Math.random()*(b-a)+a;}
  function randInt(a,b){return Math.floor(rand(a,b+1));}
  function dist(x1,y1,x2,y2){var dx=x2-x1,dy=y2-y1;return Math.sqrt(dx*dx+dy*dy);}
  function consumeClicks(){var c=clicks.slice();clicks=[];return c;}

  return {
    cvs:cvs,ctx:ctx,W:W,H:H,
    circle:circle,rect:rect,roundRect:roundRect,text:text,textB:textB,titleText:titleText,
    strokeRect:strokeRect,line:line,clear:clear,alpha:alpha,resetAlpha:resetAlpha,
    rand:rand,randInt:randInt,dist:dist,consumeClicks:consumeClicks,
    mouse:function(){return{x:mouseX,y:mouseY}}
  };
})();
