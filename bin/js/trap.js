var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Thunder = /** @class */ (function (_super) {
    __extends(Thunder, _super);
    function Thunder() {
        return _super.call(this) || this;
    }
    Thunder.prototype.init = function (_speed) {
<<<<<<< HEAD
        this.loadImage("res/thunder.png");
=======
        this.loadImage("res2/thunder.png");
>>>>>>> 99f1a3b81d7d66b851109cb2aa61cc9f6987a636
        this.speed = _speed;
    };
    return Thunder;
}(Laya.Sprite));
