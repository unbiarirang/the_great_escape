var WebGL = Laya.WebGL;
var Game = /** @class */ (function () {
    function Game() {
        Laya.init(800, 600, WebGL);
        // 初始屏幕适配
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        // 添加开始画面
        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK, this, this.clickHandler);
    }
    // 点击事件
    Game.prototype.clickHandler = function () {
        console.log('on click');
        this.bg.removeSelf();
        this.bg2 = new IngameBackground;
        Laya.stage.addChild(this.bg2);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Main.js.map