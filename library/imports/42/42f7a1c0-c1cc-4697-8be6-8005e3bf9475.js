"use strict";
cc._RF.push(module, '42f7aHAwcxGl4vmgAXjv5R1', 'Star');
// scripts/Star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0
    },

    getPlayerDistance: function getPlayerDistance() {
        var playerPos = this.game.player.getPosition();
        var dist = this.node.position.sub(playerPos).mag();

        return dist;
    },

    onPicked: function onPicked() {
        this.game.spawNewStar();
        this.game.gainScore();
        this.node.destroy();
    },

    // onLoad () {

    // },

    // start () {

    // },

    update: function update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }

        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
});

cc._RF.pop();