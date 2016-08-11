function init_slides(){TweenMax.killTweensOf($(".skills_circles"),$(".skills_softwares"));$(".svgCircle").removeClass("animate");$(".activeThumb").css("opacity",0);$(".skills_circles").find("h1").css("opacity",0);$(".skills_softwares").children(".row").css({top:0,opacity:0});$(".skills_softwares").find(".col").children("div").css({height:0});$(".skills_softwares").find(".col").children("h1").css({marginBottom:-10,opacity:0});$(".skills_softwares").next("p").css({opacity:0})}
function anim_slide_skills_circles(){$(".svgCircle").each(function(a){$(this).delay(580*a).fadeIn(0,function(){$(this).addClass("animate")})});$(".activeThumb").each(function(a){$(this).delay(580*a).fadeIn(0,function(){TweenMax.fromTo($(this),.3,{scale:.2,opacity:0,y:-90},{opacity:1,scale:1,y:0,ease:Back.easeOut})})});$(".skills_circles").find("h1").each(function(a){$(this).delay(680*a).fadeIn(0,function(){TweenMax.fromTo($(this),.3,{opacity:0,y:-35},{opacity:1,y:0,ease:Back.easeOut})})})}
function anim_slide_skills_softwares(){1<$(".skills_softwares").length&&$(".skills_softwares").eq(0).remove();$(".skills_softwares").children(".row").each(function(a){$(this).delay(150*a).fadeIn(0,function(){TweenMax.to($(this),.3,{top:45*a,opacity:1,ease:Back.easeOut})})});setTimeout(function(){$(".skills_softwares").find(".col").children("div").each(function(a){$(this).delay(150*a).fadeIn(0,function(){TweenMax.to($(this),.3,{height:parseInt(1.8*$(this).data("skills")),ease:Back.easeOut})})})},750);
setTimeout(function(){TweenMax.to($(".skills_softwares").next("p"),1.5,{opacity:1,ease:Back.easeOut})},1500);setTimeout(function(){$(".skills_softwares").find(".col").children("h1").each(function(a){$(this).delay(150*a).fadeIn(0,function(){TweenMax.to($(this),.3,{marginBottom:20,opacity:1,ease:Back.easeOut})})})},750)}

/*welcome*/
window.onload = function() {
    var container = document.getElementById("contain");
    
    var cW = container.offsetWidth;
    var cH = container.offsetHeight;
    var gravity = 2.55;
    var lifespan1 = 100;
    var lifespan2 = 150;
    var ground = .3 * cH;
    var startX;
    var r = 38;
    var speedX;
    var speedYDown = 3;
    var speedYUp = 15;
    var fontSize = 32;    
    if (cW > 500) {
        startX = 0.25 * cW;
        speedX = 0.005 * cW;
    } else {
        startX = 0.15 * cW;
        speedX = 0.007 * cW;
    }
    
    
    // Ball object
    var Ball = function(sLetter, index) {
        this.sLetter = sLetter;
        this.node;
        this.x = startX;
        this.y = ground - 50;
        this.index = index;
        this.r = r;
        this.jumpN = 0;
        this.speedY = speedYDown;
        this.speedX = speedX;
        this.opa = 1;
        this.create();
    }
    
    Ball.prototype = {
        create: function() {
            this.node = document.createElement("div");
            this.node.className = "ball";
            this.node.style.width = this.r + "px";
            this.node.style.height = this.r + "px";
            this.node.style.left = this.x + "px";
            this.node.style.top = this.y + "px";
            this.node.innerHTML = this.sLetter;
            container.appendChild(this.node);
            this.node.style.fontSize = fontSize + "px";
        },
        move: function() {
            this.y += this.speedY;
            this.x += this.speedX;
        
        },
        display: function() {
            //this.node.style.transform = "translate("+ this.x + "px," + this.y + "px)";
            //this.node.style.top = this.y + "px";
            //this.node.style.left = this.x + "px";
          this.node.style.top = this.y / cH * 100 + "%";
            this.node.style.left = this.x / cW * 100 + "%";
        }
    }
    
    
    // TextBall object
    var TextBalls = function(sText) {
        this.sText = sText + " ";
        this.n = sText.length + 1;
        this.balls = [];
        this.timeIntv = null;
        this.life = 0;
        this.createBalls();
        
    }
    TextBalls.prototype = {
        createBalls: function() {
            for (var i = 0; i < this.n; i++) {
                var ball = new Ball(this.sText[i], i);
                this.balls.push(ball);
            }
            this.balls[this.n-1].node.className = "cover";
            this.balls[this.n-1].xTarget = cW;
        },
        
        move: function() {
            var thisObj = this;
            this.timeIntv = setInterval(function(){
                thisObj.life++;
                if (thisObj.life < lifespan2) {
                    for (var i = 0; i < thisObj.n; i++) {
                        var ball = thisObj.balls[i];                        
                        if (ball.y < ground) {
                            ball.speedY += gravity;                                
                        } else {
                            ball.y = ground;
                            if (ball.jumpN < i || i == thisObj.n - 1) {
                                ball.jumpN++;
                                ball.speedY = - speedYUp;
                            } else {
                                ball.speedY = 0;
                                ball.speedX = 0;                                                              
                            }
                        }                        
                        
                        ball.move();
                        ball.display();                    
                    }
                    if (thisObj.life > lifespan1) {
                        var coverB1 = thisObj.balls[thisObj.n-1];
                        coverB1.opa = coverB1.opa > 0? coverB1.opa-0.025 : 0;
                        coverB1.node.style.opacity = coverB1.opa;
                    }
                }  else {clearInterval(thisObj.timeIntv);}                
                
            }, 50);
        }
    }
    
    var tb = new TextBalls("WELCOME");
    tb.move();
    
}
/*fin welcome*/