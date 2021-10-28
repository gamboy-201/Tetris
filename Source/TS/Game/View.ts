/// <reference path="../Keyboard.ts"/>

namespace Tetris {
    let view: GameView;
    export class GameView {
        public mainContainer: PIXI.Container;
        public innerContainer: PIXI.Container;
        public boxContainer: PIXI.Container;
        public backgroundImage: PIXI.Sprite;
        public backgroundShader: PIXI.Sprite;
        public bg_full: PIXI.Sprite;
        public maskObj: PIXI.Graphics;
        public arrBoxPos: any = {};
        private boxes: any = {};
        private boxCount = 0;
        private currentIndex: any;
        private currentXIndex: any;
        private currentYIndex: any;
        private shapeType: any;
        private boxTypos: string[] = [];
        private coverageArray: number[][] = [];
        private rowArray: any[][] = [];
        private intervalTetris: any;
        private timeOutTetris: any;
        private rowDestroyTimeout: any;
        private nextFourEntries: number[] = [];
        private indexInFour: number = 0;
        private boxContainerStack: PIXI.Container;
        private currentScore = 0;
        private stat1:PIXI.Text;
        private stat2:PIXI.Text;
        private stat3:PIXI.Text;
        constructor() {
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
            for (let i = 0; i < 20; i++) {
                this.coverageArray[i] = [];
                this.rowArray[i] = [];
                for (let j = 0; j < 10; j++) {
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






        protected AddBackgroundImage() {
            let resourceBackground = globalResourcesBg["backgroundStars"];
            this.backgroundImage = this.mainContainer.addChild(new Sprite(resourceBackground.texture));
            let resourceBG = globalResourcesBg["bg_full"];
            this.bg_full = this.innerContainer.addChild(new Sprite(resourceBG.texture));
            this.bg_full.position.set(370, -120);
            this.bg_full.scale.set(0.85);
        }

        public ShowTheGame(): void {
            this.mainContainer.visible = true;
            this.innerContainer.visible = true;
            window.onresize = this.resize.bind(this);
        }


        protected addAllToStage(): void {
            app.stage.addChild(this.mainContainer);
            app.stage.addChild(this.innerContainer);
            this.initializeFourEntries();
            this.addForm();
            this.addScoreAndTopText();
        }

        protected resize(): void {
            let scaleMax = Math.max(window.outerWidth / 400, window.outerHeight / 600);
            this.mainContainer.pivot.set(640, 360);
            this.mainContainer.x = (window.outerWidth) / 2;
            this.mainContainer.y = (window.outerHeight) / 2;
            this.mainContainer.scale.set(scaleMax);

            let scaleMin = Math.min(window.outerWidth / 640, window.outerHeight / 960);
            this.innerContainer.pivot.set(640, 360);
            this.innerContainer.x = (window.outerWidth) / 2;
            this.innerContainer.y = (window.outerHeight) / 2;
            this.innerContainer.scale.set(scaleMin);
        }

        protected initializeFourEntries(): void {
            for (let i = 0; i < 4; i++) {
                let indexRand = Math.floor(Math.random() * 8);
                this.nextFourEntries.push(indexRand);
            }
        }

        protected addForm(): void {
            clearTimeout(this.timeOutTetris);
            this.currentYIndex = 0;
            let indexRand = this.nextFourEntries[0];
            this.createShape(this.boxTypos[indexRand]);

            this.showPendingThree();
        }


        protected showPendingThree(): void {
            this.clearBoxStack();
            for (let i = 1; i < 4; i++) {
                this.nextFourEntries[i - 1] = this.nextFourEntries[i];
            }
            this.addNewEntry();
            for (let i = 0; i < 3; i++) {
                let indexRand = this.nextFourEntries[i];
                this.createShapeForStack(this.boxTypos[indexRand], i);
            }
        }

        protected addNewEntry(): void {
            this.nextFourEntries[3] = Math.floor(Math.random() * 8);
        }

        protected createShapeForStack(shapeType: string, ctr: number): void {
            let color: string = "";
            let indexRand = Math.floor(Math.random() * Object.keys(this.arrBoxPos[shapeType]).length);
            let numberCols = 3;
            let arr: any[] = this.numbOfCol(indexRand, shapeType, false);
            color = arr[0];
            numberCols = arr[1];

            let spawnAtCol = 1;
            if ((spawnAtCol + numberCols) > 4) {
                spawnAtCol = 4 - numberCols;
            }

            let arrayPos = this.arrBoxPos[shapeType][indexRand];
            let numberOfBoxes = arrayPos.length;


            for (let i = 0; i < numberOfBoxes; i++) {
                this.addBoxForStack(arrayPos[i][0], arrayPos[i][1], color, spawnAtCol,2 + (ctr) * 4);
            }
        }

        protected addBoxForStack(xPos: number, yPos: number, color: string, spawnAtCol: number,spawnAtRow:number): void {
            let colorResource = globalResources[color];
            let box = new Sprite(colorResource.texture);
            box.scale.set(0.85);
            box.position.set(xPos * boxWidth + spawnAtCol * 35.7, yPos*boxHeight+ spawnAtRow * 35.7);
            this.boxContainerStack.addChild(box);
        }

        protected addScoreAndTopText():void{
            this.stat1 = new PIXI.Text("Score", style);
            this.stat2 = new PIXI.Text("0", styleScore);
            this.stat3 = new PIXI.Text("Upcoming", styleSmall);
            this.innerContainer.addChild(this.stat1,this.stat2,this.stat3);
            this.stat1.position.set(770,600);
            this.stat2.position.set(770+(110-this.stat2.width)/2,530);
            this.stat3.position.set(745,-15);
        }


        protected clearBoxStack(): void {
            while (this.boxContainerStack.children.length > 0) {
                let box = this.boxContainerStack.children[0];
                this.boxContainerStack.removeChildAt(0);
                box.destroy();
            }
        }


        protected createShape(shapeType: string): void {
            let color: string = "";
            let indexRand = Math.floor(Math.random() * Object.keys(this.arrBoxPos[shapeType]).length);
            this.currentIndex = indexRand;
            let numberCols = 3;
            let arr: any[] = this.numbOfCol(indexRand, shapeType,true);
            color = arr[0];
            numberCols = arr[1];
            let spawnAtCol = Math.floor(Math.random() * 10);
            if ((spawnAtCol + numberCols) > 10) {
                spawnAtCol = 10 - numberCols;
            }
            this.currentXIndex = spawnAtCol;
            let arrayPos = this.arrBoxPos[shapeType][indexRand];
            let numberOfBoxes = arrayPos.length;


            for (let i = 0; i < numberOfBoxes; i++) {
                this.addBox(arrayPos[i][0], arrayPos[i][1], color, spawnAtCol);
            }
            if (this.checkMoveDown()) {
                this.intervalTetris = setInterval(this.moveFormDown.bind(this), 500);
            }
            else {
                this.endGameAndDestroy();
            }
        }

        protected endGameAndDestroy(): void {
            this.mainContainer.destroy();
            this.innerContainer.destroy();
            finalScreenController.showFinalScreen();
            gameController.turnOffEvents();
            gameView = null;
            gameController = null;
        }

        protected numbOfCol(indexRand: number, shapeType: string, setShapeType: boolean): any[] {
            let color = "";
            let numberCols = 3;
            switch (shapeType) {
                case "Sshape":
                    color = "block_green";
                    switch (indexRand) {
                        case 0: numberCols = 3; break;
                        case 1: numberCols = 2; break;
                        default: break;
                    }
                    break;
                case "SshapeMirror":
                    color = "block_red";
                    switch (indexRand) {
                        case 0: numberCols = 2; break;
                        case 1: numberCols = 3; break;
                        default: break;
                    }
                    break;
                case "Tshape":
                    color = "block_light_blue";
                    switch (indexRand) {
                        case 0: numberCols = 3; break;
                        case 1: numberCols = 2; break;
                        case 2: numberCols = 3; break;
                        case 3: numberCols = 2; break;
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
                        case 0: numberCols = 2; break;
                        case 1: numberCols = 3; break;
                        default: break;
                    }
                    break;
                case "Line":
                    color = "block_blue";
                    switch (indexRand) {
                        case 0: numberCols = 1; break;
                        case 1: numberCols = 4; break;
                        default: break;
                    }
                    break;
                case "LShape":
                    color = "block_violet";
                    switch (indexRand) {
                        case 0: numberCols = 2; break;
                        case 1: numberCols = 3; break;
                        case 2: numberCols = 2; break;
                        case 3: numberCols = 3; break;
                        default: break;
                    }
                    break;
                case "LShapeMirror":
                    color = "block_pink";
                    switch (indexRand) {
                        case 0: numberCols = 2; break;
                        case 1: numberCols = 3; break;
                        case 2: numberCols = 2; break;
                        case 3: numberCols = 3; break;
                        default: break;
                    }
                    break;
            }
            if (setShapeType) {
                this.shapeType = shapeType;
            }
            return [color, numberCols];
        }

        protected addBox(xPos: number, yPos: number, color: string, spawnAtCol: number): void {
            let colorResource = globalResources[color];
            this.boxes["" + this.boxCount] = new Sprite(colorResource.texture);
            this.boxes["" + this.boxCount].scale.set(0.85);
            this.boxes["" + this.boxCount].position.set(xPos * boxWidth + spawnAtCol * 35.7, yPos * boxHeight + this.currentYIndex * 35.7);
            this.boxContainer.addChild(this.boxes["" + this.boxCount]);
            this.boxCount++;
        }

        protected moveFormDown(): void {
            let arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            let numberOfBoxes = arrayPos.length;
            if (this.checkMoveDown()) {
                this.currentYIndex++;
                for (let i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].y += 35.7;
                }
            }
            else {
                this.currentScore+=10;
                this.stat2.text=this.currentScore+"";
                this.stat2.position.set(770+(110-this.stat2.width)/2,530);
                clearInterval(this.intervalTetris);
                for (let i = 0; i < numberOfBoxes; i++) {
                    let row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                    let col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
                    this.coverageArray[row][col] = 1;
                    this.rowArray[row].push(this.boxes["" + (this.boxCount - numberOfBoxes + i)]);
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].name = row + "" + col;
                }
                this.checkForWin();
                this.timeOutTetris = setTimeout(this.addForm.bind(this), 500);
            }
        }

        public hardDown(): void {
            if (this.checkMoveDown()) {
                clearInterval(this.intervalTetris);
                this.intervalTetris = setInterval(this.moveFormDown.bind(this), 20);
            }
        }


        protected checkForWin(): void {
            for (let row = 19; row >= 0; row--) {
                let winFound = true;
                for (let col = 9; col > 0; col--) {
                    if (this.coverageArray[row][col] == 0) {
                        winFound = false;
                    }
                }
                if (winFound) {
                    for (let col = 9; col >= 0; col--) {
                        this.coverageArray[row][col] = 0;
                    }
                    this.currentScore+=100;
                    this.stat2.text=this.currentScore+"";
                    this.stat2.position.set(770+(110-this.stat2.width)/2,530);
                    this.DestroyRow(row);
                }
            }
        }

        private DestroyRow(row: number): void {
            for (let i = 0; i < this.rowArray[row].length; i++) {
                this.rowArray[row][i].visible = false;
            }
            setTimeout(this.moveDownAll.bind(this, row), 300);

        }

        private moveDownAll(row: number): void {
            if (row >= 1) {
                for (let i = row - 1; i >= 0; i--) {
                    let ctr = 0;
                    for (let j = 0; j < this.coverageArray[i].length; j++) {
                        if (this.coverageArray[i][j] == 1) {
                            this.rowArray[i][ctr].y += 35.7;
                            ctr++;
                        }
                        this.coverageArray[i + 1][j] = this.coverageArray[i][j];
                    }
                }
            }
        }

        public moveFormLeft(): void {
            if (this.checkMoveLeft()) {
                this.currentXIndex--;
                let arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
                let numberOfBoxes = arrayPos.length;

                for (let i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].x -= 35.7;
                }
            }
        }

        public moveFormRight(): void {
            if (this.checkMoveRight()) {
                this.currentXIndex++;
                let arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
                let numberOfBoxes = arrayPos.length;

                for (let i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].x += 35.7;
                }
            }
        }

        public rotateForm(): void {
            let totalNumberOfRot = Object.keys(this.arrBoxPos[this.shapeType]).length;
            let prevVal = this.currentIndex;
            this.currentIndex++;
            if (this.currentIndex >= totalNumberOfRot) {
                this.currentIndex = 0;
            }
            if (this.checkMoveDown()) {
                let color: string = "";
                let indexRand = this.currentIndex;
                let arrayPos = this.arrBoxPos[this.shapeType][indexRand];
                let numberOfBoxes = arrayPos.length;
                let numberCols = 3;
                let arr: any[] = this.numbOfCol(indexRand, this.shapeType,true);
                color = arr[0];
                numberCols = arr[1];

                for (let i = 0; i < numberOfBoxes; i++) {
                    this.boxes["" + (this.boxCount - numberOfBoxes + i)].destroy();
                }

                if ((this.currentXIndex + numberCols) > 10) {
                    this.currentXIndex = 10 - numberCols;
                }

                for (let i = 0; i < numberOfBoxes; i++) {
                    this.addBox(arrayPos[i][0], arrayPos[i][1], color, this.currentXIndex);
                }
            }
            else {
                this.currentIndex = prevVal;
            }

        }



        protected checkMoveLeft(): boolean {
            let arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            let numberOfBoxes = arrayPos.length;
            let retVal = true;
            for (let i = 0; i < numberOfBoxes; i++) {
                let row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                let col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
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
        }
        protected checkMoveRight(): boolean {
            let arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            let numberOfBoxes = arrayPos.length;
            let retVal = true;
            for (let i = 0; i < numberOfBoxes; i++) {
                let row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                let col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
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
        }
        protected checkMoveDown(): boolean {
            let arrayPos = this.arrBoxPos[this.shapeType][this.currentIndex];
            let numberOfBoxes = arrayPos.length;
            let retVal = true;
            for (let i = 0; i < numberOfBoxes; i++) {
                let row = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].y / 35.7);
                let col = Math.round(this.boxes["" + (this.boxCount - numberOfBoxes + i)].x / 35.7);
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
        }
    }
}