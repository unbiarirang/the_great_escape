class StartBackGround extends Laya.Sprite {
    bgFirst: Laya.Sprite;
    bgSecond: Laya.Sprite;
    Play: Laya.Button;
    Help: Laya.Button;
    constructor() {
        super();
        this.init();
    }
    init(): void {
        //创造两个背景并连接，轮流播放
        this.bgFirst = new Laya.Sprite();
        this.bgFirst.loadImage("res/background.jpg");
        this.addChild(this.bgFirst);

        this.bgSecond = new Laya.Sprite();
        this.bgSecond.loadImage("res/background.jpg");
        this.bgSecond.pos(-800,0);
        this.addChild(this.bgSecond);

        this.Help = new Laya.Button();
        this.Help.x = 730;
        this.Help.y = 0;
        this.Help.width = 70;
        this.Help.height = 70;
        this.Help.loadImage("res/Help.png");
        this.addChild(this.Help);

        this.Play = new Laya.Button();
        this.Play.x = 272;
        this.Play.y = 350;
        this.Play.width = 250;
        this.Play.height = 100;
        this.Play.loadImage("res/Play.png");
        this.addChild(this.Play);

        this.DisplayTitle();

        Laya.timer.frameLoop(1, this ,this.onLoop);
    }
    onLoop(): void {
        this.bgFirst.x = this.bgFirst.x + 1;
        this.bgSecond.x = this.bgSecond.x + 1;

        if (this.bgFirst.x + this.x >= 800)
            this.bgFirst.x = this.bgFirst.x - 800 * 2;
        if (this.bgSecond.x + this.x >= 800)
            this.bgSecond.x = this.bgSecond.x - 800 * 2;
    }
    DisplayTitle(): void {
        //字符串总宽度
        let w: number = 500;
        let w2: number = 300;
        
        //文本创建时的起始x位置
        let offsetX: number = Laya.stage.width - w >> 1;
        let offsetX2: number = Laya.stage.width - w2 >> 1;

        let title1: string = "The GReat";
        let title2: string = "Escape";
        let letterText: Laya.Text;
        
        //根据字符串长度创建单个字符，并对每个单独字符使用缓动动画
        for (let i: number = 0, len: number = title1.length; i < len; ++i) {
            letterText = this.createLetter(title1.charAt(i));
            letterText.x = w / len * i + offsetX;     
            letterText.y = 0;     
            Laya.Tween.to(letterText, { y: 100, update: new Laya.Handler(this, this.updateColor,[letterText])}, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this, this.changeColor, [letterText]), 100);
        }
        for (let i: number = 0, len: number = title2.length; i < len; ++i) {
            letterText = this.createLetter(title2.charAt(i));
            letterText.x = w2/len*i+offsetX2;
            letterText.y = 0;
            Laya.Tween.to(letterText, { y: 200, update: new Laya.Handler(this, this.updateColor,[letterText])}, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this, this.changeColor, [letterText]), 100);
        }
    }
    
    private updateColor(txt: Laya.Text): void {
        let c: number = Math.floor(Math.random() * 3);
        switch (c) {
            case 0:
                txt.color = "#912299";
                break;
            case 1:
                txt.color = "#ffffff";
                break;
            case 2:
                txt.color = "#8080ff";
                break;
            default:
                txt.color = "#eee000";
                break;
        }
    } 
    private changeColor(txt: Laya.Text): void {
        txt.color = "#f9e3f3";
    }
    private createLetter(char: string): Laya.Text {
        let letter: Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 100;
        this.addChild(letter);
        return letter;
    }
    
}

class Instruction extends Laya.Sprite{
    public bg: Laya.Sprite;
    public Back: Laya.Button;
    constructor(){
        super();
        this.Back = new Laya.Button();
        this.bg = new Laya.Sprite();
        this.bg.loadImage("res/instruction.png");
        this.Back = new Laya.Button();
        this.Back.x = 10;
        this.Back.y = 510;
        this.Back.width = 90;
        this.Back.height = 45;
        this.Back.loadImage("res/back.png");
        this.addChild(this.bg);
        this.addChild(this.Back);
        this.Back.on(Laya.Event.CLICK,this,this.backtoStart);
    }
    backtoStart(): void{
        this.bg.removeSelf();
        this.Back.removeSelf();
        Laya.stage.addChild(game.bg);
    }
}


class ThunderMode1 extends Laya.Sprite {
 
    private bg: Laya.Sprite;
    private hero: Hero;
    public startline: Tile;
    public challenge: Tile;
    public finishline: Tile;
    public def: number;
    public Tmap1: Map;
    constructor() {
        super();
        this.def = 0;
        this.init();

        this.frameLoop(1, this, this.Loop);
        this.frameLoop(1, this, this.judstate);
    }
    setmap(): void {
        this.challenge = this.Tmap1.challenge;
        this.startline = this.Tmap1.startline;
        this.finishline = this.Tmap1.finishline;
        
        this.stage.addChild(this.challenge);
        this.stage.addChild(this.startline);
        this.stage.addChild(this.finishline);
        this.hero = game.hero;
        this.hero.pos(0, 300);
        this.stage.addChild(this.hero);
        this.stage.addChild(game.hero);
        this.stage.addChild(game.ctrl_rocker);
        this.stage.addChild(game.ctrl_rocker_move);
        this.stage.addChild(game.ctrl_back);
        this.createTrap(20, 3);
        this.def = 1;
    }        
    judstate(): void {
        if (this.def === 1){
            let m_tile = this.finishline;
            if (this.hero.alive === 1) {
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                
                    for (let i: number = 0; i < this.stage.numChildren; i++) {
                        let m_child: Laya.Sprite = this.stage.getChildAt(i) as Laya.Sprite;
                        m_child.removeSelf();
                    }
                
                    let bg = new BombMode1();
                    bg.setmap();
                    this.timer.clear(this,this.judstate);
                    this.timer.clear(this,this.Loop);
                    Laya.stage.addChild(bg);
                }    
            }
            let cnt:number = 0;
            for (let i: number = 1; i < this.stage.numChildren - 2; i++) {
                let m_tile: Tile = this.stage.getChildAt(i) as Tile;
                
                if (i === 1) { 
                    for (let j: number = 0; j < this.challenge.numChildren; j++) {
                        let _tile: Tile = this.challenge.getChildAt(j) as Tile;
                        if ((this.hero.x + 20 >= _tile.posX && this.hero.x + 20 <= _tile.posX + _tile.width * 45 && this.hero.y + 23 >= _tile.posY && this.hero.y + 23 <= _tile.posY + 45 * _tile.height))
                            break;

                        cnt++;
                    }
                } else {
                    if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && 
                        this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                        break;

                    cnt++;
                }
            }
            if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
                console.log(cnt, this.stage.numChildren,this.challenge.numChildren);
                Laya.SoundManager.playMusic("res/sound/fall.wav",1);
                DisplayWords();
                this.hero.alive = 0;
                makeunvisible(this.hero);
                this.hero.body.visible = true;
                this.hero.body.play(0,false);

                if (this.hero.speedX < 0)
                    this.hero.x -= 20;
                                            
                if (this.hero.speedY < 0)
                    this.hero.y -= 20;
                        
                if (this.hero.speedX > 0)
                    this.hero.x += 20;         
                
                if (this.hero.speedY > 0)
                    this.hero.y += 20;
            }
        }
    }
    Loop(): void {
        for (let i: number = this.numChildren - 1; i >= 0; i--) {
            let trap: Thunder = this.getChildAt(i) as Thunder;
            
            let temp: number = Math.random();
            if(temp > 0.7 && trap.x + 5 < 660 )
                trap.x += trap.speed;
            else if(temp < 0.7 && temp > 0.4 && trap.x - 5 > 90)
                trap.x -= trap.speed;
            
            let temp2: number = Math.random();
            if (temp2 > 0.7 && trap.y + 55 < 600)
                trap.y += trap.speed;
            else if(temp2 < 0.7 && temp2 > 0.4 && trap.y - 5 > 0)
                trap.y -= trap.speed;

            judelectricshock(this.hero,trap);
        }
    }  
    init(): void {
        this.bg = new Laya.Sprite();
        this.hero = game.hero;
        this.stage.addChild(this.bg);
        this.bg.loadImage("res/stage.png");
        
        this.startline = new Tile();
        this.challenge = new Tile();
        this.finishline = new Tile();
        this.Tmap1 = new Map();
        this.Tmap1.startline.makeblock('5', 1, 9, 0, 90);
        this.Tmap1.finishline.makeblock('1', 2, 9, 720, 90);
        this.Tmap1.challenge.makeblock('2', 15, 9, 45, 90);
    
    }
    createTrap(num: number,speed: number): void {
        for (let i = 0; i < num; i++) {
            let trap: Thunder = Laya.Pool.getItemByClass("thunder", Thunder);
            trap.init(speed);
            trap.pos(Math.random() * 600 + 90, Math.random() * 500 + 50);
            this.addChild(trap);
        }
    }
}

class BombMode1 extends Laya.Sprite {
    private bg: Laya.Sprite;
    private hero: Hero;
    public startline: Tile;
    public challenge: Tile;
    public finishline: Tile;
    public Bmap1: Map;

    constructor() {
        super();
        this.init();
        this.frameLoop(5, this, this.normal);
        this.timer.frameLoop(100, this, this.onfire);
        this.timer.frameLoop(1, this, this.judstate);
    }
    setmap(): void {
        this.startline = this.Bmap1.startline;
        this.challenge = this.Bmap1.challenge;
        this.finishline = this.Bmap1.finishline;
        
        this.stage.addChild(this.challenge);
        this.stage.addChild(this.startline);
        this.stage.addChild(this.finishline);
        this.hero = game.hero;
        this.hero.pos(0, 300);
        this.stage.addChild(this.hero);
        this.stage.addChild(game.hero);
        this.stage.addChild(game.ctrl_rocker);
        this.stage.addChild(game.ctrl_rocker_move);
        this.stage.addChild(game.ctrl_back)
    }        
    init(): void {
        this.bg = new Laya.Sprite();
        this.stage.addChild(this.bg);
        this.bg.loadImage("res/stage2.png");
        this.Bmap1 = new Map();
           for (let i = 0; i < 5; i++){
            if (i % 2 === 0)
                 this.Bmap1.challenge.makeblock('2', 3, 4, 45 + i * 135, 90 + 45 * 3);
            else
                 this.Bmap1.challenge.makeblock('3', 3, 4, 45 + i * 135, 90 + 45 * 3);
           }
        this.Bmap1.challenge.makeblock('5', 1, 1, 45 * 3, 180);
        this.Bmap1.challenge.makeblock('5', 1, 1, 45 * 6, 180);
        this.Bmap1.challenge.makeblock('5', 1, 1, 45 * 9, 180);
        this.Bmap1.challenge.makeblock('5', 1, 1, 45 * 12, 180);
        this.Bmap1.challenge.makeblock('5', 1, 1, 45 * 15, 180);   
                  
        this.Bmap1.startline.makeblock('5', 1, 9, 0, 90);
        this.Bmap1.finishline.makeblock('1', 2, 9, 720, 90);
    }
    normal(): void {
        for (let i: number = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
            m_tile.fire = false;
        }
    }
    onfire(): void {
        for (let i: number = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
            m_tile.fire = true;
            for (let j: number = 0; j < m_tile.numChildren; j++) {
                let _tile: Tile = m_tile.getChildAt(j) as Tile;
                _tile.bomb.play(0, false);
                Laya.SoundManager.playSound("res/sound/bomb.wav",1);
            }
        }
    }
    judstate(): void{
        if (this.hero.alive === 1) {
            let i: number = 0;
            let cnt: number = 0;
            for (i = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                    break;

                cnt++;
            }
            let _tile: Tile = this.challenge.getChildAt(i) as Tile;
            if (cnt != this.challenge.numChildren) {
                if (_tile.fire === true && _tile.type != "5") {
                    DisplayWords();
                    this.hero.alive = 0;
                    makeunvisible(this.hero);
                    this.hero.burn.visible = true;
                    this.hero.burn.play(0,false);
                    Laya.SoundManager.playMusic("res/sound/gameover.wav",1);
                }
            }   
        }
        if (this.hero.alive === 1){
                let cnt: number = 0;
            for (let i: number = 1; i < this.stage.numChildren - 2; i++) {
                let m_tile: Tile = this.stage.getChildAt(i) as Tile;
                
                if (i === 1) {
                    for (let j: number = 0; j < this.challenge.numChildren; j++) {
                        let _tile: Tile = this.challenge.getChildAt(j) as Tile;
                        if ((this.hero.x + 20 >= _tile.posX && this.hero.x + 20 <= _tile.posX + _tile.width * 45 && this.hero.y + 23 >= _tile.posY && this.hero.y + 23 <= _tile.posY + 45 * _tile.height))
                            break;      
                            
                        cnt++;
                    }
                } else {
                    if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && 
                        this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                        break;

                    cnt++;
                }
            }
            if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
                this.hero.alive = 0;
                Laya.SoundManager.playMusic("res/sound/fall.wav", 1);
                makeunvisible(this.hero);      
                this.hero.body.visible = true;
                this.hero.body.play(0,false);
                DisplayWords();
                if(this.hero.speedX < 0)
                this.hero.x -= 20;
                                    
                if(this.hero.speedY < 0)
                    this.hero.y -= 20;
                        
                if(this.hero.speedX > 0)
                    this.hero.x += 20;         
                
                if(this.hero.speedY > 0)
                    this.hero.y += 20;
            }
        }     
    }
}

function DisplayWords(): void {
        var w: number = 800;
        var offsetX: number = Laya.stage.width - w >> 1;
        var demoString: string = "GameOver";
        var letterText: Laya.Text;
        for (var i: number = 0,len: number = demoString.length; i < len; ++i) {
            letterText = this.createLetter(demoString.charAt(i));
            letterText.x = w / len * i + offsetX;
            letterText.y = -200;
            Laya.Tween.to(letterText, { y: 100 }, 3000, Laya.Ease.elasticOut, null, i * 100);
        }
}
function createLetter(char: string): Laya.Text {
    var letter: Laya.Text = new Laya.Text();
    letter.text = char;
    letter.color = "#ffffff";
    letter.font = "Impact";
    letter.fontSize = 180;
    Laya.stage.addChild(letter);
    return letter;
}
function judelectricshock(hero: Hero,trap: Thunder){
    if(Math.abs(hero.x - trap.x) < 13 && Math.abs(hero.y - trap.y) < 30 && hero.alive === 1){//判断碰撞
        hero.right.visible = false;
        hero.left.visible = false;
        hero.up.visible = false;
        hero.down.visible = false;
        hero.stand.visible = false;  
        hero.burn.visible = true;
        hero.burn.play(0,false);
        DisplayWords();
        Laya.SoundManager.playMusic("res/sound/thunder.wav",1);
        hero.alive = 0 ;        
    }
}
function makeunvisible(hero:Hero){
   hero.right.visible = false;
   hero.left.visible = false;
   hero.up.visible = false;
   hero.down.visible = false;
   hero.stand.visible = false;      
   hero.body.visible = false;
}
