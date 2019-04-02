"use strict";
cc._RF.push(module, 'd350auLPq5IppYFt6cMG6hr', 'Game');
// scripts/Game.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        maxStarDuration: 0,
        minStarDuration: 0,

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },

        resetBtn: {
            default: null,
            type: cc.Button
        }
    },

    onLoad: function onLoad() {
        this.score = 0;
        this.timer = 0;
        this.starDuration = 0;
        this.resetBtn.node.active = false;
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawNewStar();
    },


    spawNewStar: function spawNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);

        newStar.setPosition(this.getNewStarPosition());
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;

        newStar.getComponent('Star').game = this;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },

    // start () {

    // },

    update: function update(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }

        this.timer += dt;
    },

    gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        this.scoreDisplay.string = 'Game Over!';
        this.player.stopAllActions();

        var playerNode = this.player.getComponent('Player');
        playerNode.jumpHeight = 0;
        playerNode.accel = 0;
        playerNode.xSpeed = 0;

        this.resetBtn.node.active = true;
        this.resetBtn.node.on('click', this.resetGame, this);
    },

    resetGame: function resetGame() {
        this.scoreDisplay.string = '0';
        cc.director.loadScene('game');
    }
});

cc._RF.pop();