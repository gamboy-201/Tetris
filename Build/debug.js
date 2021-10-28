"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path = "../DTS/pixi.d.ts"/>
var Tetris;
/// <reference path = "../DTS/pixi.d.ts"/>
(function (Tetris) {
    Tetris.Texture = PIXI.utils.TextureCache, Tetris.Sprite = PIXI.Sprite, Tetris.loader = PIXI.Loader.shared, Tetris.tickerShared = PIXI.Ticker.shared, Tetris.SpriteArray = {}, Tetris.compoundCorrectness = [0, 0, 0];
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    Tetris.style = {
        fontFamily: 'MS Courier New',
        fontSize: 48,
        fontStyle: '',
        fontWeight: 'bold',
        fill: ['#ffffff'],
        dropShadow: false,
        wordWrap: true,
        wordWrapWidth: 440
    }, Tetris.styleSmall = {
        fontFamily: 'MS Courier New',
        fontSize: 36,
        fontStyle: '',
        fontWeight: 'bold',
        fill: ['#ffffff'],
        dropShadow: false,
        wordWrap: true,
        wordWrapWidth: 440
    }, Tetris.styleScore = {
        fontFamily: 'MS Courier New',
        fontSize: 24,
        fontStyle: '',
        fontWeight: 'bold',
        fill: ['#ffffff'],
        dropShadow: false,
        wordWrap: true,
        wordWrapWidth: 440
    }, Tetris.boxWidth = 35, Tetris.boxHeight = 35, Tetris.assetList = ["backgroundShader", "backgroundStars", "bg_full"], 
    // assetListForms:string[]=["form_1a","form_1b","form_2ab","form_3a","form_3b","form_4a","form_4b","form_4c","form_4d","form_5a","form_5b","form_5c","form_5d","form_6a","form_6b","form_7a","form_7b","form_7c","form_7d","form_8a","form_8b"], 
    Tetris.assetListForms = ["block_blue", "block_green", "block_light_blue", "block_orange", "block_pink", "block_red", "block_violet", "block_yellow", "PlayBtn", "but_restart"], Tetris.globalResources = {}, Tetris.globalResourcesBg = {}, Tetris.ticker = Tetris.tickerShared;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var DraggingShape = /** @class */ (function (_super) {
        __extends(DraggingShape, _super);
        function DraggingShape(elementName, electronCount) {
            var _this = _super.call(this) || this;
            _this.collisionActive = true;
            _this.dragging = false;
            _this.elementName = "";
            _this.electronCount = 0;
            if (elementName) {
                _this.elementName = elementName;
            }
            if (electronCount) {
                _this.electronCount = electronCount;
            }
            _this.on('mousedown', _this.HandleMouseDown, _this);
            _this.on('mousemove', _this.HandleMouseMove, _this);
            _this.on('mouseup', _this.HandleMouseUp, _this);
            _this.dragging = false;
            return _this;
        }
        DraggingShape.prototype.CheckForCollision = function (withElement) {
            var isCollision = false;
            var ypos = this.y;
            var xpos = this.x;
            if (xpos >= withElement.x - 20 && xpos <= withElement.x + 20 && ypos >= withElement.y - 20 && ypos <= withElement.y + 20) {
                if (this.elementName = withElement.elementName) {
                    isCollision = true;
                }
            }
            return isCollision;
        };
        DraggingShape.prototype.HandleMouseDown = function (e) {
            console.log('Picked up');
            this.x = e.data.global.x - this.width;
            this.y = e.data.global.y;
            this.dragging = true;
        };
        DraggingShape.prototype.HandleMouseMove = function (e) {
            if (this.dragging) {
                console.log('Moving');
                this.x = e.data.global.x - this.width;
                this.y = e.data.global.y;
            }
            //this.dragging = false;
        };
        DraggingShape.prototype.HandleMouseUp = function (e) {
            console.log('Moving');
            this.x = e.data.global.x - this.width;
            this.y = e.data.global.y;
            this.dragging = false;
        };
        return DraggingShape;
    }(PIXI.Graphics));
    Tetris.DraggingShape = DraggingShape;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var DroppableShape = /** @class */ (function (_super) {
        __extends(DroppableShape, _super);
        function DroppableShape(elementName, electronCount) {
            var _this = _super.call(this) || this;
            _this.collisionActive = true;
            _this.elementName = "";
            _this.electronCount = 0;
            if (elementName) {
                _this.elementName = elementName;
            }
            if (electronCount) {
                _this.electronCount = electronCount;
            }
            return _this;
        }
        DroppableShape.prototype.CheckForCollision = function (withElement) {
            var isCollision = false;
            var ypos = this.y;
            var xpos = this.x;
            if (xpos >= withElement.x - 20 && xpos <= withElement.x + 20 && ypos >= withElement.y - 20 && ypos <= withElement.y + 20) {
                if (this.elementName = withElement.elementName) {
                    isCollision = true;
                }
            }
            return isCollision;
        };
        return DroppableShape;
    }(PIXI.Graphics));
    Tetris.DroppableShape = DroppableShape;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var Keyboard = /** @class */ (function () {
        function Keyboard(value, isAxisButton) {
            this.key = {};
            this.value = value;
            this.isDown = false;
            this.isUp = true;
            this.isAxisButton = isAxisButton;
            this.subscribeEvents();
        }
        Keyboard.prototype.subscribeEvents = function () {
            window.addEventListener("keydown", this.downHandler.bind(this));
            window.addEventListener("keyup", this.upHandler.bind(this));
        };
        Keyboard.prototype.unSubscribeEvents = function () {
            window.removeEventListener("keydown", this.downHandler.bind(this));
            window.removeEventListener("keyup", this.upHandler.bind(this));
        };
        Keyboard.prototype.downHandler = function (event) {
            if (event.key === this.value) {
                this.press();
                event.preventDefault();
            }
        };
        Keyboard.prototype.upHandler = function (event) {
            if (event.key === this.value) {
                this.release();
                event.preventDefault();
            }
        };
        Keyboard.prototype.press = function () {
        };
        Keyboard.prototype.release = function () {
        };
        return Keyboard;
    }());
    Tetris.Keyboard = Keyboard;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var LoadingController = /** @class */ (function () {
        function LoadingController(view) {
            this.view = view;
        }
        LoadingController.prototype.showLoadingScreen = function () {
            this.view.ShowLoadingScreen();
        };
        return LoadingController;
    }());
    Tetris.LoadingController = LoadingController;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var view;
    var LoadingView = /** @class */ (function () {
        function LoadingView() {
            this.mainContainer = new PIXI.Container();
            this.mainContainer.name = "LoadingScreenContainer";
            this.innerContainer = new PIXI.Container();
            this.innerContainer.name = "InnerLoadingScreenContainer";
            // this.mainContainer.addChild(this.innerContainer);
            this.AddBackgroundImage();
            this.createShapes();
            this.addAllToStage();
            this.mainContainer.visible = false;
            this.innerContainer.visible = false;
            this.resize();
        }
        LoadingView.prototype.ShowLoadingScreen = function () {
            this.mainContainer.visible = true;
            this.innerContainer.visible = true;
            window.onresize = this.resize.bind(this);
        };
        LoadingView.prototype.AddBackgroundImage = function () {
            var resourceBackground = Tetris.globalResourcesBg["backgroundStars"];
            this.backgroundImage = this.mainContainer.addChild(new Tetris.Sprite(resourceBackground.texture));
            var resourceBG = Tetris.globalResourcesBg["bg_full"];
            this.bg_full = this.innerContainer.addChild(new Tetris.Sprite(resourceBG.texture));
            this.bg_full.position.set(370, -120);
            this.bg_full.scale.set(0.85);
        };
        LoadingView.prototype.createShapes = function () {
            // let submitButton = new PIXI.Graphics();
            // submitButton.lineStyle(3, 0xff0000);
            // submitButton.beginFill(0xffffff, 1).drawRect(0, 0, 300, 50).endFill();
            // let submitText = new PIXI.Text("PLAY", style);
            // submitButton.addChild(submitText);
            // submitText.position.set(85,-5);
            // submitButton.on('mousedown', this.ContinueToTheGame,this);
            // submitButton.interactive = true;
            // submitButton.position.set(490,650);
            // this.innerContainer.addChild(submitButton);
        };
        LoadingView.prototype.ContinueToTheGame = function () {
            this.mainContainer.visible = false;
            this.innerContainer.visible = false;
            Tetris.gameView = new Tetris.GameView();
            Tetris.gameController = new Tetris.GameController(Tetris.gameView);
            Tetris.gameController.ShowTheGame();
            this.mainContainer.visible = false;
        };
        LoadingView.prototype.addAllToStage = function () {
            Tetris.app.stage.addChild(this.mainContainer);
            Tetris.app.stage.addChild(this.innerContainer);
            this.addPlayButton();
        };
        LoadingView.prototype.addPlayButton = function () {
            var btnResource = Tetris.globalResources["PlayBtn"];
            this.playbtn = new Tetris.Sprite(btnResource.texture);
            this.playbtn.on('mousedown', this.ContinueToTheGame, this);
            this.playbtn.on('touchstart', this.ContinueToTheGame, this);
            this.playbtn.interactive = true;
            this.playbtn.position.set(490, 450);
            this.innerContainer.addChild(this.playbtn);
        };
        LoadingView.prototype.resize = function () {
            var scaleMax = Math.max(window.outerWidth / 400, window.outerHeight / 600);
            this.mainContainer.pivot.set(640, 360);
            this.mainContainer.x = (window.outerWidth) / 2;
            this.mainContainer.y = (window.outerHeight) / 2;
            this.mainContainer.scale.set(scaleMax);
            var scaleMin = Math.min(window.outerWidth / 640, window.outerHeight / 960);
            this.innerContainer.pivot.set(640, 360);
            this.innerContainer.x = (window.outerWidth) / 2;
            this.innerContainer.y = (window.outerHeight) / 2;
            this.innerContainer.scale.set(scaleMin);
        };
        return LoadingView;
    }());
    Tetris.LoadingView = LoadingView;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var GameController = /** @class */ (function () {
        function GameController(view) {
            this.left = new Tetris.Keyboard("ArrowLeft", true);
            this.up = new Tetris.Keyboard("ArrowUp", true);
            this.right = new Tetris.Keyboard("ArrowRight", true);
            this.down = new Tetris.Keyboard("ArrowDown", true);
            this.xDown = null;
            this.yDown = null;
            this.view = view;
        }
        GameController.prototype.ShowTheGame = function () {
            var _this = this;
            this.view.ShowTheGame();
            this.left.press = function () {
                _this.view.moveFormLeft();
            };
            this.up.press = function () {
                _this.view.rotateForm();
            };
            this.right.press = function () {
                _this.view.moveFormRight();
            };
            this.down.press = function () {
                _this.view.hardDown();
            };
            document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
        };
        GameController.prototype.turnOffEvents = function () {
            document.removeEventListener('touchstart', this.handleTouchStart);
            document.removeEventListener('touchmove', this.handleTouchMove);
        };
        GameController.prototype.getTouches = function (evt) {
            return evt.touches || // browser API
                evt.originalEvent.touches; // jQuery
        };
        GameController.prototype.handleTouchStart = function (evt) {
            var firstTouch = this.getTouches(evt)[0];
            this.xDown = firstTouch.clientX;
            this.yDown = firstTouch.clientY;
        };
        ;
        GameController.prototype.handleTouchMove = function (evt) {
            if (!this.xDown || !this.yDown) {
                return;
            }
            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;
            var xDiff = this.xDown - xUp;
            var yDiff = this.yDown - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
                if (xDiff > 0) {
                    this.view.moveFormLeft();
                }
                else {
                    this.view.moveFormRight();
                }
            }
            else {
                if (yDiff > 0) {
                    /* down swipe */
                    this.view.rotateForm();
                }
                else {
                    /* up swipe */
                    this.view.hardDown();
                }
            }
            /* reset values */
            this.xDown = null;
            this.yDown = null;
        };
        ;
        return GameController;
    }());
    Tetris.GameController = GameController;
})(Tetris || (Tetris = {}));
/// <reference path="../Keyboard.ts"/>
var Tetris;
/// <reference path="../Keyboard.ts"/>
(function (Tetris) {
    var view;
    var GameView = /** @class */ (function () {
        function GameView() {
            this.arrBoxPos = {};
            this.boxes = {};
            this.boxCount = 0;
            this.boxTypos = [];
            this.coverageArray = [];
            this.rowArray = [];
            this.nextFourEntries = [];
            this.indexInFour = 0;
            this.currentScore = 0;
            this.mainContainer = new PIXI.Container();
            this.mainContainer.name = "GameScreenContainer";
            this.innerContainer = new PIXI.Container();
            this.innerContainer.name = "InnerGameScreenContainer";
            this.AddBackgroundImage();
            this.boxContainer = new PIXI.Container();
            this.boxContainer.name = "boxContainer";
            this.boxContainerStack = new PIXI.Container();
            this.boxContainerStack.name = "boxContainerStack";
            this.innerContainer.addChild(this.boxContainer);
            this.innerContainer.addChild(this.boxContainerStack);
            this.boxContainer.position.set(378, -26);
            this.boxContainerStack.position.set(745, -26);
            for (var i = 0; i < 20; i++) {
                this.coverageArray[i] = [];
                this.rowArray[i] = [];
                for (var j = 0; j < 10; j++) {
                    this.coverageArray[i][j] = 0;
                }
            }
            this.arrBoxPos = {
                "Sshape": {
                    "0": [[0, 0], [1, 0], [1, 1], [2, 1]],
                    "1": [[1, 0], [1, 1], [0, 1], [0, 2]]
                },
                "SshapeMirror": {
                    "0": [[0, 0], [0, 1], [1, 1], [1, 2]],
                    "1": [[0, 1], [1, 0], [1, 1], [2, 0]]
                },
                "Tshape": {
                    "0": [[1, 0], [0, 1], [1, 1], [2, 1]],
                    "1": [[0, 1], [1, 0], [1, 1], [1, 2]],
                    "2": [[0, 0], [1, 0], [2, 0], [1, 1]],
                    "3": [[0, 0], [0, 1], [0, 2], [1, 1]]
                },
                "Cube": { "0": [[0, 0], [0, 1], [1, 0], [1, 1]] },
                "Hex": {
                    "0": [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]],
                    "1": [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]]
                },
                "Line": {
                    "0": [[0, 0], [0, 1], [0, 2], [0, 3]],
                    "1": [[0, 0], [1, 0], [2, 0], [3, 0]]
                },
                "LShape": {
                    "0": [[0, 0], [0, 1], [0, 2], [1, 0]],
                    "1": [[0, 0], [0, 1], [1, 1], [2, 1]],
                    "2": [[1, 0], [1, 1], [1, 2], [0, 2]],
                    "3": [[0, 0], [1, 0], [2, 0], [2, 1]]
                },
                "LShapeMirror": {
                    "0": [[0, 0], [0, 1], [0, 2], [1, 2]],
                    "1": [[0, 2], [0, 1], [1, 1], [2, 1]],
                    "2": [[1, 0], [1, 1], [1, 2], [0, 0]],
                    "3": [[0, 0], [1, 0], [2, 0], [0, 1]]
                },
            };
            this.boxTypos = ["Sshape", "SshapeMirror", "Tshape", "Cube", "Hex", "Line", "LShape", "LShapeMirror"];
            this.addAllToStage();
            this.mainContainer.visible = false;
            this.innerContainer.visible = false;
            this.resize();
        }
        GameView.prototype.AddBackgroundImage = function () {
            var resourceBackground = Tetris.globalResourcesBg["backgroundStars"];
            this.backgroundImage = this.mainContainer.addChild(new Tetris.Sprite(resourceBackground.texture));
            var resourceBG = Tetris.globalResourcesBg["bg_full"];
            this.bg_full = this.innerContainer.addChild(new Tetris.Sprite(resourceBG.texture));
            this.bg_full.position.set(370, -120);
            this.bg_full.scale.set(0.85);
        };
        GameView.prototype.ShowTheGame = function () {
            this.mainContainer.visible = true;
            this.innerContainer.visible = true;
            window.onresize = this.resize.bind(this);
        };
        GameView.prototype.addAllToStage = function () {
            Tetris.app.stage.addChild(this.mainContainer);
            Tetris.app.stage.addChild(this.innerContainer);
            this.initializeFourEntries();
            this.addForm();
            this.addScoreAndTopText();
        };
        GameView.prototype.resize = function () {
            var scaleMax = Math.max(window.outerWidth / 400, window.outerHeight / 600);
            this.mainContainer.pivot.set(640, 360);
            this.mainContainer.x = (window.outerWidth) / 2;
            this.mainContainer.y = (window.outerHeight) / 2;
            this.mainContainer.scale.set(scaleMax);
            var scaleMin = Math.min(window.outerWidth / 640, window.outerHeight / 960);
            this.innerContainer.pivot.set(640, 360);
            this.innerContainer.x = (window.outerWidth) / 2;
            this.innerContainer.y = (window.outerHeight) / 2;
            this.innerContainer.scale.set(scaleMin);
        };
        GameView.prototype.initializeFourEntries = function () {
            for (var i = 0; i < 4; i++) {
                var indexRand = Math.floor(Math.random() * 8);
                this.nextFourEntries.push(indexRand);
            }
        };
        GameView.prototype.addForm = function () {
            clearTimeout(this.timeOutTetris);
            this.currentYIndex = 0;
            var indexRand = this.nextFourEntries[0];
            this.createShape(this.boxTypos[indexRand]);
            this.showPendingThree();
        };
        GameView.prototype.showPendingThree = function () {
            this.clearBoxStack();
            for (var i = 1; i < 4; i++) {
                this.nextFourEntries[i - 1] = this.nextFourEntries[i];
            }
            this.addNewEntry();
            for (var i = 0; i < 3; i++) {
                var indexRand = this.nextFourEntries[i];
                this.createShapeForStack(this.boxTypos[indexRand], i);
            }
        };
        GameView.prototype.addNewEntry = function () {
            this.nextFourEntries[3] = Math.floor(Math.random() * 8);
        };
        GameView.prototype.createShapeForStack = function (shapeType, ctr) {
            var color = "";
            var indexRand = Math.floor(Math.random() * Object.keys(this.arrBoxPos[shapeType]).length);
            var numberCols = 3;
            var arr = this.numbOfCol(indexRand, shapeType, false);
            color = arr[0];
            numberCols = arr[1];
            var spawnAtCol = 1;
            if ((spawnAtCol + numberCols) > 4) {
                spawnAtCol = 4 - numberCols;
            }
            var arrayPos = this.arrBoxPos[shapeType][indexRand];
            var numberOfBoxes = arrayPos.length;
            for (var i = 0; i < numberOfBoxes; i++) {
                this.addBoxForStack(arrayPos[i][0], arrayPos[i][1], color, spawnAtCol, 2 + (ctr) * 4);
            }
        };
        GameView.prototype.addBoxForStack = function (xPos, yPos, color, spawnAtCol, spawnAtRow) {
            var colorResource = Tetris.globalResources[color];
            var box = new Tetris.Sprite(colorResource.texture);
            box.scale.set(0.85);
            box.position.set(xPos * Tetris.boxWidth + spawnAtCol * 35.7, yPos * Tetris.boxHeight + spawnAtRow * 35.7);
            this.boxContainerStack.addChild(box);
        };
        GameView.prototype.addScoreAndTopText = function () {
            this.stat1 = new PIXI.Text("Score", Tetris.style);
            this.stat2 = new PIXI.Text("0", Tetris.styleScore);
            this.stat3 = new PIXI.Text("Upcoming", Tetris.styleSmall);
            this.innerContainer.addChild(this.stat1, this.stat2, this.stat3);
            this.stat1.position.set(770, 600);
            this.stat2.position.set(770 + (110 - this.stat2.width) / 2, 530);
            this.stat3.position.set(745, -15);
        };
        GameView.prototype.clearBoxStack = function () {
            while (this.boxContainerStack.children.length > 0) {
                var box = this.boxContainerStack.children[0];
                this.boxContainerStack.removeChildAt(0);
                box.destroy();
            }
        };
        GameView.prototype.createShape = function (shapeType) {
            var color = "";
            var indexRand = Math.floor(Math.random() * Object.keys(this.arrBoxPos[shapeType]).length);
            this.currentIndex = indexRand;
            var numberCols = 3;
            var arr = this.numbOfCol(indexRand, shapeType, true);
            color = arr[0];
            numberCols = arr[1];
            var spawnAtCol = Math.floor(Math.random() * 10);
            if ((spawnAtCol + numberCols) > 10) {
                spawnAtCol = 10 - numberCols;
            }
            this.currentXIndex = spawnAtCol;
            var arrayPos = this.arrBoxPos[shapeType][indexRand];
            var numberOfBoxes = arrayPos.length;
            for (var i = 0; i < numberOfBoxes; i++) {
                this.addBox(arrayPos[i][0], arrayPos[i][1], color, spawnAtCol);
            }
            if (this.checkMoveDown()) {
                this.intervalTetris = setInterval(this.moveFormDown.bind(this), 500);
            }
            else {
                this.endGameAndDestroy();
            }
        };
        GameView.prototype.endGameAndDestroy = function () {
            this.mainContainer.destroy();
            this.innerContainer.destroy();
            Tetris.finalScreenController.showFinalScreen();
            Tetris.gameController.turnOffEvents();
            Tetris.gameView = null;
            Tetris.gameController = null;
        };
        GameView.prototype.numbOfCol = function (indexRand, shapeType, setShapeType) {
            var color = "";
            var numberCols = 3;
            switch (shapeType) {
                case "Sshape":
                    color = "block_green";
                    switch (indexRand) {
                        case 0:
                            numberCols = 3;
                            break;
                        case 1:
                            numberCols = 2;
                            break;
                        default: break;
                    }
                    break;
                case "SshapeMirror":
                    color = "block_red";
                    switch (indexRand) {
                        case 0:
                            numberCols = 2;
                            break;
                        case 1:
                            numberCols = 3;
                            break;
                        default: break;
                    }
                    break;
                case "Tshape":
                    color = "block_light_blue";
                    switch (indexRand) {
                        case 0:
                            numberCols = 3;
                            break;
                        case 1:
                            numberCols = 2;
                            break;
                        case 2:
                            numberCols = 3;
                            break;
                        case 3:
                            numberCols = 2;
                            break;
                        default: break;
                    }
                    break;
                case "Cube":
                    color = "block_orange";
                    numberCols = 2;
                    break;
                case "Hex":
                    color = "block_yellow";
                    switch (indexRand) {
                        case 0:
                            numberCols = 2;
                            break;
                        case 1:
                            numberCols = 3;
                            break;
                        default: break;
                    }
                    break;
                case "Line":
                    color = "block_blue";
                    switch (indexRand) {
                        case 0:
                            numberCols = 1;
                            break;
                        case 1:
                            numberCols = 4;
                            break;
                        default: break;
                    }
                    break;
                case "LShape":
                    color = "block_violet";
                    switch (indexRand) {
                        case 0:
                            numberCols = 2;
                            break;
                        case 1:
                            numberCols = 3;
                            break;
                        case 2:
                            numberCols = 2;
                            break;
                        case 3:
                            numberCols = 3;
                            break;
                        default: break;
                    }
                    break;
                case "LShapeMirror":
                    color = "block_pink";
                    switch (indexRand) {
                        case 0:
                            numberCols = 2;
                            break;
                        case 1:
                            numberCols = 3;
                            break;
                        case 2:
                            numberCols = 2;
                            break;
                        case 3:
                            numberCols = 3;
                            break;
                        default: break;
                    }
                    break;
            }
            if (setShapeType) {
                this.shapeType = shapeType;
            }
            return [color, numberCols];
        };
        GameView.prototype.addBox = function (xPos, yPos, color, spawnAtCol) {
            var colorResource = Tetris.globalResources[color];
            this.boxes["" + this.boxCount] = new Tetris.Sprite(colorResource.texture);
            this.boxes["" + this.boxCount].scale.set(0.85);
            this.boxes["" + this.boxCount].position.set(xPos * Tetris.boxWidth + spawnAtCol * 35.7, yPos * Tetris.boxHeight + this.currentYIndex * 35.7);
            this.boxContainer.addChild(this.boxes["" + this.boxCount]);
            this.boxCount++;
        };
        GameView.prototype.moveFormDown = function () {
            var arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            var numberOfBoxes = arrayPos.length;
            if (this.checkMoveDown()) {
                this.currentYIndex++;
                for (var i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].y += 35.7;
                }
            }
            else {
                this.currentScore += 10;
                this.stat2.text = this.currentScore + "";
                this.stat2.position.set(770 + (110 - this.stat2.width) / 2, 530);
                clearInterval(this.intervalTetris);
                for (var i = 0; i < numberOfBoxes; i++) {
                    var row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                    var col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
                    this.coverageArray[row][col] = 1;
                    this.rowArray[row].push(this.boxes["" + (this.boxCount - numberOfBoxes + i)]);
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].name = row + "" + col;
                }
                this.checkForWin();
                this.timeOutTetris = setTimeout(this.addForm.bind(this), 500);
            }
        };
        GameView.prototype.hardDown = function () {
            if (this.checkMoveDown()) {
                clearInterval(this.intervalTetris);
                this.intervalTetris = setInterval(this.moveFormDown.bind(this), 20);
            }
        };
        GameView.prototype.checkForWin = function () {
            for (var row = 19; row >= 0; row--) {
                var winFound = true;
                for (var col = 9; col > 0; col--) {
                    if (this.coverageArray[row][col] == 0) {
                        winFound = false;
                    }
                }
                if (winFound) {
                    for (var col = 9; col >= 0; col--) {
                        this.coverageArray[row][col] = 0;
                    }
                    this.currentScore += 100;
                    this.stat2.text = this.currentScore + "";
                    this.stat2.position.set(770 + (110 - this.stat2.width) / 2, 530);
                    this.DestroyRow(row);
                }
            }
        };
        GameView.prototype.DestroyRow = function (row) {
            for (var i = 0; i < this.rowArray[row].length; i++) {
                this.rowArray[row][i].visible = false;
            }
            setTimeout(this.moveDownAll.bind(this, row), 300);
        };
        GameView.prototype.moveDownAll = function (row) {
            if (row >= 1) {
                for (var i = row - 1; i >= 0; i--) {
                    var ctr = 0;
                    for (var j = 0; j < this.coverageArray[i].length; j++) {
                        if (this.coverageArray[i][j] == 1) {
                            this.rowArray[i][ctr].y += 35.7;
                            ctr++;
                        }
                        this.coverageArray[i + 1][j] = this.coverageArray[i][j];
                    }
                }
            }
        };
        GameView.prototype.moveFormLeft = function () {
            if (this.checkMoveLeft()) {
                this.currentXIndex--;
                var arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
                var numberOfBoxes = arrayPos.length;
                for (var i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].x -= 35.7;
                }
            }
        };
        GameView.prototype.moveFormRight = function () {
            if (this.checkMoveRight()) {
                this.currentXIndex++;
                var arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
                var numberOfBoxes = arrayPos.length;
                for (var i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].x += 35.7;
                }
            }
        };
        GameView.prototype.rotateForm = function () {
            var totalNumberOfRot = Object.keys(this.arrBoxPos[this.shapeType]).length;
            var prevVal = this.currentIndex;
            this.currentIndex++;
            if (this.currentIndex >= totalNumberOfRot) {
                this.currentIndex = 0;
            }
            if (this.checkMoveDown()) {
                var color = "";
                var indexRand = this.currentIndex;
                var arrayPos = this.arrBoxPos[this.shapeType][indexRand];
                var numberOfBoxes = arrayPos.length;
                var numberCols = 3;
                var arr = this.numbOfCol(indexRand, this.shapeType, true);
                color = arr[0];
                numberCols = arr[1];
                for (var i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].destroy();
                }
                if ((this.currentXIndex + numberCols) > 10) {
                    this.currentXIndex = 10 - numberCols;
                }
                for (var i = 0; i < numberOfBoxes; i++) {
                    this.addBox(arrayPos[i][0], arrayPos[i][1], color, this.currentXIndex);
                }
            }
            else {
                this.currentIndex = prevVal;
            }
        };
        GameView.prototype.checkMoveLeft = function () {
            var arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            var numberOfBoxes = arrayPos.length;
            var retVal = true;
            for (var i = 0; i < numberOfBoxes; i++) {
                var row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                var col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
                if (col - 1 >= 0) {
                    if (this.coverageArray[row][col - 1] == 0) {
                        continue;
                    }
                    else {
                        retVal = false;
                        break;
                    }
                }
                else {
                    retVal = false;
                    break;
                }
            }
            return retVal;
        };
        GameView.prototype.checkMoveRight = function () {
            var arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            var numberOfBoxes = arrayPos.length;
            var retVal = true;
            for (var i = 0; i < numberOfBoxes; i++) {
                var row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                var col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
                if (col + 1 <= 9) {
                    if (this.coverageArray[row][col + 1] == 0) {
                        continue;
                    }
                    else {
                        retVal = false;
                        break;
                    }
                }
                else {
                    retVal = false;
                    break;
                }
            }
            return retVal;
        };
        GameView.prototype.checkMoveDown = function () {
            var arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            var numberOfBoxes = arrayPos.length;
            var retVal = true;
            for (var i = 0; i < numberOfBoxes; i++) {
                var row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                var col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
                if (row + 1 <= 19) {
                    if (this.coverageArray[row + 1][col] == 0) {
                        continue;
                    }
                    else {
                        retVal = false;
                        break;
                    }
                }
                else {
                    retVal = false;
                    break;
                }
            }
            return retVal;
        };
        return GameView;
    }());
    Tetris.GameView = GameView;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var FinalScreenController = /** @class */ (function () {
        function FinalScreenController(view) {
            this.view = view;
        }
        FinalScreenController.prototype.showFinalScreen = function () {
            this.view.showFinalScreen();
        };
        return FinalScreenController;
    }());
    Tetris.FinalScreenController = FinalScreenController;
})(Tetris || (Tetris = {}));
var Tetris;
(function (Tetris) {
    var FinalScreenView = /** @class */ (function () {
        function FinalScreenView() {
            this.mainContainer = new PIXI.Container();
            this.mainContainer.name = "FinalScreenContainer";
            this.innerContainer = new PIXI.Container();
            this.innerContainer.name = "InnerFinalScreenContainer";
            this.AddBackgroundImage();
            this.createShapes();
            this.addAllToStage();
            this.mainContainer.visible = false;
            this.innerContainer.visible = false;
            this.resize();
        }
        FinalScreenView.prototype.showFinalScreen = function () {
            this.mainContainer.visible = true;
            this.innerContainer.visible = true;
            this.createShapes();
            window.onresize = this.resize.bind(this);
        };
        FinalScreenView.prototype.AddBackgroundImage = function () {
            var resourceBackground = Tetris.globalResourcesBg["backgroundStars"];
            this.backgroundImage = this.mainContainer.addChild(new Tetris.Sprite(resourceBackground.texture));
            var resourceBG = Tetris.globalResourcesBg["bg_full"];
            this.bg_full = this.innerContainer.addChild(new Tetris.Sprite(resourceBG.texture));
            this.bg_full.position.set(370, -120);
            this.bg_full.scale.set(0.85);
        };
        FinalScreenView.prototype.createShapes = function () {
            // let submitButton = new PIXI.Graphics();
            // submitButton.lineStyle(3, 0xff0000);
            // submitButton.beginFill(0xffffff, 1).drawRect(0, 0, 400, 50).endFill();
            // let submitText = new PIXI.Text("START AGAIN", style);
            // submitButton.addChild(submitText);
            // submitText.position.set(30, -5);
            // submitButton.on('mousedown', this.ContinueToLoading, this);
            // submitButton.interactive = true;
            // submitButton.position.set(400, 650);
            // this.mainContainer.addChild(submitButton);
        };
        FinalScreenView.prototype.addRestartButton = function () {
            var btnResource = Tetris.globalResources["but_restart"];
            this.restartBtn = new Tetris.Sprite(btnResource.texture);
            this.restartBtn.on('mousedown', this.ContinueToLoading, this);
            this.restartBtn.on('touchstart', this.ContinueToLoading, this);
            this.restartBtn.interactive = true;
            this.restartBtn.position.set(490, 500);
            this.innerContainer.addChild(this.restartBtn);
        };
        FinalScreenView.prototype.ContinueToLoading = function () {
            Tetris.loadingController.showLoadingScreen();
            this.mainContainer.visible = false;
            this.innerContainer.visible = false;
        };
        FinalScreenView.prototype.addAllToStage = function () {
            Tetris.app.stage.addChild(this.mainContainer);
            Tetris.app.stage.addChild(this.innerContainer);
            this.addRestartButton();
        };
        FinalScreenView.prototype.resize = function () {
            var scaleMax = Math.max(window.outerWidth / 400, window.outerHeight / 600);
            this.mainContainer.pivot.set(640, 360);
            this.mainContainer.x = (window.outerWidth) / 2;
            this.mainContainer.y = (window.outerHeight) / 2;
            this.mainContainer.scale.set(scaleMax);
            var scaleMin = Math.min(window.outerWidth / 640, window.outerHeight / 960);
            this.innerContainer.pivot.set(640, 360);
            this.innerContainer.x = (window.outerWidth) / 2;
            this.innerContainer.y = (window.outerHeight) / 2;
            this.innerContainer.scale.set(scaleMin);
        };
        return FinalScreenView;
    }());
    Tetris.FinalScreenView = FinalScreenView;
})(Tetris || (Tetris = {}));
/// <reference path="./Alias.ts" />
/// <reference path="./Constants.ts"/>
/// <reference path="./DraggingShape.ts"/>
/// <reference path="./DroppableShape.ts"/>
/// <reference path="./Loading/Controller.ts"/>
/// <reference path="./Loading/View.ts"/>
/// <reference path="./Game/Controller.ts"/>
/// <reference path="./Game/View.ts"/>
/// <reference path="./FinalScreen/Controller.ts"/>
/// <reference path="./FinalScreen/View.ts"/>
var Tetris;
/// <reference path="./Alias.ts" />
/// <reference path="./Constants.ts"/>
/// <reference path="./DraggingShape.ts"/>
/// <reference path="./DroppableShape.ts"/>
/// <reference path="./Loading/Controller.ts"/>
/// <reference path="./Loading/View.ts"/>
/// <reference path="./Game/Controller.ts"/>
/// <reference path="./Game/View.ts"/>
/// <reference path="./FinalScreen/Controller.ts"/>
/// <reference path="./FinalScreen/View.ts"/>
(function (Tetris) {
    var Main = /** @class */ (function () {
        function Main() {
            Tetris.app = new PIXI.Application({ resizeTo: window, backgroundColor: 0x000000, antialias: true,
                resolution: 1 });
            Tetris.app.stage.interactive = true;
            document.body.appendChild(Tetris.app.view);
            this.loadAllImages();
        }
        Main.prototype.InitializeLoadingScreen = function () {
            Tetris.loadingView = new Tetris.LoadingView();
            Tetris.loadingController = new Tetris.LoadingController(Tetris.loadingView);
            Tetris.loadingController.showLoadingScreen();
        };
        Main.prototype.InitializeFinalGameScreen = function () {
            Tetris.finalScreenView = new Tetris.FinalScreenView();
            Tetris.finalScreenController = new Tetris.FinalScreenController(Tetris.finalScreenView);
        };
        Main.prototype.loadAllImages = function () {
            this.loadGeneralImages();
        };
        Main.prototype.loadGeneralImages = function () {
            for (var imageid in Tetris.assetList) {
                Tetris.loader.add(Tetris.assetList[imageid], "Assets/" + Tetris.assetList[imageid] + ".jpg");
            }
            Tetris.loader.load(this.loadFormImages.bind(this));
        };
        Main.prototype.loadFormImages = function (loader, resources) {
            Tetris.globalResourcesBg = resources;
            for (var imageid in Tetris.assetListForms) {
                loader.add(Tetris.assetListForms[imageid], "Assets/" + Tetris.assetListForms[imageid] + ".png");
            }
            loader.load(this.StartInitialize.bind(this));
        };
        Main.prototype.StartInitialize = function (loader, resources) {
            Tetris.globalResources = resources;
            this.InitializeLoadingScreen();
            this.InitializeFinalGameScreen();
        };
        return Main;
    }());
    Tetris.Main = Main;
})(Tetris || (Tetris = {}));
/// <reference path="main.ts" />
var Tetris;
/// <reference path="main.ts" />
(function (Tetris) {
    var instance = new Tetris.Main();
})(Tetris || (Tetris = {}));
