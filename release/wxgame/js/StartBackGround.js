var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])};return function(e,a){function o(){this.constructor=e}t(e,a),e.prototype=null===a?Object.create(a):(o.prototype=a.prototype,new o)}}(),StartBackGround=function(t){function e(){var e=t.call(this)||this;return e.init(),e}return __extends(e,t),e.prototype.init=function(){this.bgFirst=new Laya.Sprite,this.bgFirst.loadImage("res/background.jpg"),this.addChild(this.bgFirst),this.bgSecond=new Laya.Sprite,this.bgSecond.loadImage("res/background.jpg"),this.bgSecond.pos(-800,0),this.addChild(this.bgSecond),this.Play=new Laya.Button,this.Play.x=272,this.Play.y=350,this.Play.width=250,this.Play.height=100,this.Play.loadImage("res/Play.png"),this.addChild(this.Play),this.DisplayTitle(),Laya.timer.frameLoop(1,this,this.onLoop)},e.prototype.onLoop=function(){this.bgFirst.x=this.bgFirst.x+1,this.bgSecond.x=this.bgSecond.x+1,this.bgFirst.x+this.x>=800&&(this.bgFirst.x=this.bgFirst.x-1600),this.bgSecond.x+this.x>=800&&(this.bgSecond.x=this.bgSecond.x-1600)},e.prototype.DisplayTitle=function(){for(var t,e=Laya.stage.width-500>>1,a=Laya.stage.width-300>>1,o=0,i="The GReat".length;o<i;++o)(t=this.createLetter("The GReat".charAt(o))).x=500/i*o+e,t.y=0,Laya.Tween.to(t,{y:100,update:new Laya.Handler(this,this.updateColor,[t])},1e3,Laya.Ease.bounceIn,Laya.Handler.create(this,this.changeColor,[t]),100);for(var o=0,i="Escape".length;o<i;++o)(t=this.createLetter("Escape".charAt(o))).x=300/i*o+a,t.y=0,Laya.Tween.to(t,{y:200,update:new Laya.Handler(this,this.updateColor,[t])},1e3,Laya.Ease.bounceIn,Laya.Handler.create(this,this.changeColor,[t]),100)},e.prototype.updateColor=function(t){switch(Math.floor(3*Math.random())){case 0:t.color="#912299";break;case 1:t.color="#ffffff";break;case 2:t.color="#8080ff";break;default:t.color="#eee000"}},e.prototype.changeColor=function(t){t.color="#f9e3f3"},e.prototype.createLetter=function(t){var e=new Laya.Text;return e.text=t,e.color="#ffffff",e.font="Impact",e.fontSize=100,this.addChild(e),e},e}(Laya.Sprite),IngameBackground=function(t){function e(){var e=t.call(this)||this;return e.init(),e.stage.on(Laya.Event.KEY_DOWN,e,e.down),e}return __extends(e,t),e.prototype.init=function(){this.bg=new Laya.Sprite,this.addChild(this.bg),this.bg.loadImage("res/stage.png");for(var t=0;t<8;t++){var e=new tile;t%2==0?e.makeblock("2",15,2,90+90*t,225):e.makeblock("3",15,2,90+90*t,225),this.addChild(e)}var a=new tile;a.makeblock("1",2,9,0,90),this.addChild(a);var o=new tile;o.makeblock("1",1,9,755,90),this.addChild(o)},e.prototype.down=function(t){console.log(t.keyCode),37===t.keyCode&&(this.hero.x-=10),38===t.keyCode&&(this.hero.y-=10),39===t.keyCode&&(this.hero.x+=10),40===t.keyCode&&(this.hero.y+=10)},e}(Laya.Sprite);