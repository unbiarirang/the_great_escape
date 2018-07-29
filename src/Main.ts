class Game {
    public bg: StartBackGround;
    public bg2: ThunderMode1;
    public bg3: BombMode1;
    public instruction: Instruction;
    public rebutton: Laya.Button;

    hero: Hero;
    ctrl_rocker: Laya.Image;
    ctrl_rocker_move: Laya.Image;
    ctrl_back: Laya.Image;
    isHold: boolean = false;
    
    stageW: number = 800;
    stageH: number = 600;
    ctrl_rocker_x: number = 50;
    ctrl_rocker_y: number = 400;
    hr_get: Laya.HttpRequest;
    hr_post: Laya.HttpRequest;

    constructor() {
      // 初始屏幕适配
        Laya.MiniAdpter.init();
        Laya.init(800, 600);

        // 初始屏幕适配
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.on("mouseup", this, this.ctrlRockerUp)

        this.init_ingame_images();
        this.init_server_connection();

        this.sendRanking('user5', '50');
        this.getRanking();

        // main game loop
        Laya.timer.frameLoop(1, this, this.gameLoop);
    }

    init_ingame_images(): void {
        this.hero = new Hero();
        this.hero.pos(10, 300);
        this.rebutton = new Laya.Button();

        this.ctrl_back = new Laya.Image();
        this.ctrl_back.loadImage("res2/control-back.png");
        this.ctrl_back.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_back.pivot(40, 40);

        this.ctrl_rocker = new Laya.Image();
        this.ctrl_rocker.loadImage("res2/control-rocker.png");
        this.ctrl_rocker.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_rocker.pivot(17.5, 17.5);
        this.ctrl_rocker.on(Laya.Event.MOUSE_DOWN, this, ()=> {this.isHold = true;});

        this.ctrl_rocker_move = new Laya.Image();
        this.ctrl_rocker_move.loadImage("res2/control-rocker.png");
        this.ctrl_rocker_move.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_rocker_move.pivot(17.5, 17.5);
        this.ctrl_rocker_move.visible = false;
        this.ctrl_rocker_move.on(Laya.Event.MOUSE_DOWN, this, ()=> {this.isHold = true;});

        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK,this,this.clickHandler);
        this.bg.Help.on(Laya.Event.CLICK,this,this.helpHandler);
    }

    init_server_connection(): void {
        this.hr_get = new Laya.HttpRequest();
        this.hr_get.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.hr_get.once(Laya.Event.COMPLETE, this, this.onHttpRequestCompleteGet);

        this.hr_post = new Laya.HttpRequest();
        this.hr_post.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.hr_post.once(Laya.Event.COMPLETE, this, this.onHttpRequestCompletePost);
    }

    gameLoop(): void {
        if (this.hero.alive === 1) { 
            if (this.isHold)
                this.ctrlRockerDown();
            this.hero.right.visible = false;
            this.hero.left.visible = false;
            this.hero.up.visible = false;
            this.hero.down.visible = false;
            this.hero.stand.visible = false;
            if(this.hero.speedX === 0 && this.hero.speedY === 0)
                this.hero.stand.visible = true;
            else if(this.hero.speedX > 0 && (Math.abs(this.hero.speedX) > Math.abs(this.hero.speedY)))
                this.hero.right.visible = true;
            else if(this.hero.speedX < 0 && (Math.abs(this.hero.speedX) > Math.abs(this.hero.speedY)))
                this.hero.left.visible = true;
            else if(this.hero.speedY > 0 && (Math.abs(this.hero.speedY) > Math.abs(this.hero.speedX)))
                this.hero.down.visible = true;
            else if(this.hero.speedY < 0 && (Math.abs(this.hero.speedY) > Math.abs(this.hero.speedX)))
                this.hero.up.visible = true;
            
            this.hero.x += this.hero.speedX;
            this.hero.y += this.hero.speedY;
        }
        //  if(this.hero.alive === 0){
        //         this.rebutton.pos(400, 400);
        //         this.rebutton.width = 45;
        //         this.rebutton.height = 45;
        //         this.rebutton.loadImage("res2/regame.png");
        //         this.rebutton.on(Laya.Event.CLICK,this,this.regame);
        //         Laya.stage.addChild(this.rebutton);
        //     }
    }
    // regame(): void {
    //       let bg = new ThunderMode1();
    //       bg.setmap();
    //       this.hero.speedX = 0;
    //       this.hero.speedY = 0;
    //       this.hero.alive = 1;
    //       this.hero.burn.visible = false;
    //       this.hero.body.visible = false;
    //       Laya.stage.addChild(bg);
    // }

    clickHandler(): void {
       this.bg.removeSelf();
       this.bg2 = new ThunderMode1();
       this.bg2.setmap();
       Laya.stage.addChild(this.bg2);
    }
    helpHandler():void{
       this.instruction = new Instruction();
       Laya.stage.addChild(this.instruction);
    }
    ctrlRockerUp(): void {
        if (Laya.stage.mouseX <= this.stageW / 2) {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            this.isHold = false;
        }
    }
    ctrlRockerDown(): void {
        // stop moving. control rocker is centered
        if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= 0.2 * this.ctrl_back.width) {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            return;
        }

        // moving
        if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= 2 * this.ctrl_back.width) {
            this.ctrl_rocker.visible = false;
            this.ctrl_rocker_move.visible = true;

            // move control rocker
            if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2))
                this.ctrl_rocker_move.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            else
                this.ctrl_rocker_move.pos(
                    this.ctrl_back.x + (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2) * Math.cos(Math.atan2(Laya.stage.mouseY - this.ctrl_back.y, Laya.stage.mouseX - this.ctrl_back.x))
                    ,
                    this.ctrl_back.y + (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2) * Math.sin(Math.atan2(Laya.stage.mouseY - this.ctrl_back.y, Laya.stage.mouseX - this.ctrl_back.x))
                );

            // move hero
            let angle = Math.atan2(Laya.stage.mouseY - this.ctrl_rocker_y, Laya.stage.mouseX - this.ctrl_rocker_x);
            this.hero.speedX = 2 * Math.cos(angle);
            this.hero.speedY = 2 * Math.sin(angle);
    
        } else {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
        }
    }

    onHttpRequestError(err): void {
        if (err) console.log('err' + err);
    }
    // send GET ranking request to redis server
    getRanking(): void {
        this.hr_get.send('http://192.144.144.22:12306/ranking', null, 'get', 'text');
    }
    // send POST ranking request to redis server
    sendRanking(name, score): void {
         this.hr_post.send('http://192.144.144.22:12306/ranking', 'name=' + name + '&score=' + score, 'post', 'text');
    }
    // get GET response from redis server
    onHttpRequestCompleteGet(): void {
        let data = this.hr_get.data;
        console.log(data);
    }
    // get POST response from redis server
    onHttpRequestCompletePost(res): void {
        console.log('post complete' + res);
    }
}
let game = new Game();