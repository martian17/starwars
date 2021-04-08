var StarWarsAnimation = function(width,height,parent){
    var w2 = width/2;
    var h2 = height/2;
    var vw = width/100;
    var vh = height/100;
    parent.classList.add("star-wrapper");
    parent = new ELEM(parent);
    //console.log(parent);
    var c1 = parent.add("canvas").e;
    c1.style.backgroundColor = "#000";
    var c2 = parent.add("canvas").e;
    var canvases = [c1,c2];
    var [ctx1,ctx2] = canvases.map((c)=>{
        c.width = width;
        c.height = height;
        return c.getContext("2d");
    });
    this.c1 = c1;
    this.c2 = c2;
    
    var drawArc = function(ctx,x,y,r1,r2,sa,ea,color){
        /*ctx.beginPath()
        ctx.arc(x,y,r2,sa,ea, false); // outer (filled)
        ctx.arc(x,y,r1,ea,sa, true); // outer (unfills it)
        ctx.fill();*/
        ctx.fillStyle = color || "#000";
        ctx.beginPath()
        ctx.arc(x,y,r2,sa,ea, false); // outer (filled)
        ctx.arc(x,y,r1,ea,sa, true); // outer (unfills it)
        ctx.closePath();
        ctx.fill();
    };
    
    var drawRim = function(ctx,x,y,r1,r2,r3){
        drawArc(ctx2,x,y,r1,r3,3.14-0.5,6.28+0.5);
        drawArc(ctx2,x,y,r2,r3,3.14-0.5,6.28+0.5,"#888");
    };
    
    var drawSpoke = function(ctx,x1,y1,x2,y2,r1,r2,r3,r4,a1,a2){
        r1 *= 0.999;
        r3 *= 1.001;
        ctx2.beginPath();
        ctx2.moveTo(x1+r1*Math.cos(a1),y1+r1*Math.sin(a1));
        ctx2.lineTo(x1+r2*Math.cos(a1),y1+r2*Math.sin(a1));
        ctx2.lineTo(x2+r4*Math.cos(a1),y2+r4*Math.sin(a1));
        ctx2.lineTo(x2+r3*Math.cos(a1),y2+r3*Math.sin(a1));
        ctx2.closePath();
        ctx2.fillStyle = "#888";
        ctx2.fill();
        ctx2.beginPath();
        ctx2.moveTo(x1+r1*Math.cos(a2),y1+r1*Math.sin(a2));
        ctx2.lineTo(x1+r2*Math.cos(a2),y1+r2*Math.sin(a2));
        ctx2.lineTo(x2+r4*Math.cos(a2),y2+r4*Math.sin(a2));
        ctx2.lineTo(x2+r3*Math.cos(a2),y2+r3*Math.sin(a2));
        ctx2.closePath();
        ctx2.fillStyle = "#888";
        ctx2.fill();
        ctx2.beginPath();
        ctx2.moveTo(x1+r1*Math.cos(a1),y1+r1*Math.sin(a1));
        ctx2.lineTo(x1+r1*Math.cos(a2),y1+r1*Math.sin(a2));
        ctx2.lineTo(x2+r3*Math.cos(a2),y2+r3*Math.sin(a2));
        ctx2.lineTo(x2+r3*Math.cos(a1),y2+r3*Math.sin(a1));
        ctx2.closePath();
        ctx2.fillStyle = "#000";
        ctx2.fill();
    };
    
    
    this.pxd = 0;
    this.pyd = 0;
    this.px = 0;//spring force
    this.py = 0;
    
    this.drawOverlay = function(){
        that.px += (that.pxd-that.px)*0.1;
        that.py += (that.pyd-that.py)*0.1;
        ctx2.clearRect(0,0,width,height);
        /*
        ctx2.beginPath();
        ctx2.arc(w2,h2,200,0,6.28,false);
        ctx2.arc(w2,h2,180,0,6.28,true);
        ctx2.closePath();
        ctx2.fill();
        */
        var ax = w2;
        var ay = 80*vh;
        
        
        //1st arc
        var px1 = ax+that.px/w2*10;
        var py1 = ay+that.py/h2*10;
        //2nd
        var px2 = ax+that.px/w2*20;
        var py2 = ay+that.py/h2*20+5*vh;
        //3rd
        var px3 = ax+that.px/w2*100;
        var py3 = ay+that.py/h2*100+10*vh;
        
        var r11 = 18*vw;
        var r12 = 19*vw;
        var r13 = 20*vw;
        var r21 = 33*vw;
        var r22 = 34.5*vw;
        var r23 = 36*vw;
        var r31 = 60*vw;
        var r32 = 62*vw;
        var r33 = 64*vw;
        //insturments
        ctx2.beginPath();
        ctx2.moveTo(px1-18.1*vw,py1-5*vw);
        ctx2.lineTo(px1+18.1*vw,py1-5*vw);
        ctx2.lineTo(px1+18.1*vw,py1+10*vw);
        ctx2.lineTo(px1-18.1*vw,py1+10*vw);
        ctx2.closePath();
        ctx2.fillStyle = "#000";
        ctx2.fill();
        
        drawRim(ctx2,px1,py1,r11,r12,r13);
        var aa = 3.14+0.5;
        drawSpoke(ctx2,px1,py1,px2,py2,r12,r13,r21,r23,aa,aa+0.05);
        var aa = 6.28-0.5;
        drawSpoke(ctx2,px1,py1,px2,py2,r12,r13,r21,r23,aa,aa-0.05);
        var aa = 3.14-0.1;
        drawSpoke(ctx2,px1,py1,px2,py2,r12,r13,r21,r23,aa,aa+0.05);
        var aa = 6.28+0.1;
        drawSpoke(ctx2,px1,py1,px2,py2,r12,r13,r21,r23,aa,aa-0.05);
        
        drawRim(ctx2,px2,py2,r21,r22,r23);
        var aa = 3.14+1.1;
        drawSpoke(ctx2,px2,py2,px3,py3,r22,r23,r31,r33,aa,aa+0.05);
        var aa = 3.14+0.2;
        drawSpoke(ctx2,px2,py2,px3,py3,r22,r23,r31,r33,aa,aa+0.05);
        var aa = 6.28-1.1;
        drawSpoke(ctx2,px2,py2,px3,py3,r22,r23,r31,r33,aa,aa+0.05);
        var aa = 6.28-0.2;
        drawSpoke(ctx2,px2,py2,px3,py3,r22,r23,r31,r33,aa,aa+0.05);
        
        drawRim(ctx2,px3,py3,r31,r32,r33);
        
        drawRim(ctx2,px3,py3,r31*1,r32*1.9,r33*2);
        
        
    };
    
    var that = this;
    
    this.drawUnderlay = function(t){
        that.fade();
        if(t < 2){
            that.drawfirstPhase(t);
        }else{
            for(var i = 0; i < 100; i++){
                that.explosion();
            }
        }
        c1.style.transform = "translate("+(-that.px/10)+"px,"+(-that.py/10)+"px) scale(1.2)";
    };
    
    var dist = function(a,b){
        return Math.sqrt(a*a+b*b);
    };
    
    
    var startingPoints = [];
    //initializing
    for(var i = 0; i < 2000; i++){
        var x = Math.random()*width-w2;
        var y = Math.random()*height-h2;
        startingPoints[i] = [x,y,dist(x,y)];
    }
    for(var i = 0; i < 1000; i++){
        var a = Math.random()*2-1;
        var b = Math.random()*2-1;
        var magn = dist(a,b);
        var x = a*(magn**2)*width;
        var y = b*(magn**2)*height;
        startingPoints[i] = [x,y,dist(x,y)];
    }
    this.fade = function(){
        ctx1.save();
        ctx1.globalAlpha = 1;
        ctx1.globalCompositeOperation = "destination-in";
        var fade = 0.99;
        ctx1.fillStyle = "rgba(0, 0, 0, "+fade+")";
        ctx1.fillRect(0, 0, width, height);
        ctx1.restore();
    };
    this.drawfirstPhase = function(t){
        for(var i = 0; i < startingPoints.length; i++){
            var [w,h,r] = startingPoints[i];
            var span = r*(Math.E**(t**2.5))/1000+1;//constant acceleration
            if(span > 1000)span = 1000;
            ctx1.beginPath();
            ctx1.moveTo(w2+w,h2+h);
            ctx1.lineTo(w2+w*span,h2+h*span);
            ctx1.strokeStyle = "#fff";
            ctx1.stroke();
        }
    };
    var randomVector = function(){
        var x = Math.random()*2-1;
        var y = Math.random()*2-1;
        while(x*x+y*y > 1){
            x = Math.random()*2-1;
            y = Math.random()*2-1;
        }
        var r = Math.sqrt(x*x+y*y);
        return [x/r,y/r];//maybe implement inverse sqrt function
    };
    this.explosion = function(n){
        var [x,y] = randomVector();
        /*var hit = false;
        if(x < 0){
            if(-tan05 < y/x && y/x < tan05){
                //hitrays++;
                hit = true;
            }
        }*/
        //allrays++;
        //this.pi = allrays/2/hitrays;
        //ray
        ctx1.beginPath();
        ctx1.moveTo(w2,h2);
        ctx1.lineTo(w2+x*1000,h2+y*1000);
        ctx1.strokeStyle = "#fff";
        ctx1.stroke();
    }
};


window.onload = function(){
    setTimeout(()=>{
        var wrapper = document.getElementById("wrapper");

        var sa = new StarWarsAnimation(window.innerWidth,window.innerHeight,wrapper);

        var animate = function(t){
            sa.drawUnderlay(t/1000);
            sa.drawOverlay();
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);


        //now make the paralax animation

        document.body.addEventListener("mousemove",function(e){
            sa.pxd = -e.clientX+window.innerWidth/2;
            sa.pyd = -e.clientY+window.innerHeight/2;
        });
    },100);
};


