namespace Tetris {
    export class FinalScreenView {
        public mainContainer: PIXI.Container;
        public innerContainer: PIXI.Container;
        public backgroundImage: PIXI.Sprite;
        public backgroundShader: PIXI.Sprite;
        public bg_full: PIXI.Sprite;
        public maskObj: PIXI.Graphics;
        private restartBtn:any;
        constructor() {
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
        public showFinalScreen(): void {
            this.mainContainer.visible = true;
            this.innerContainer.visible = true;
            this.createShapes();
            window.onresize = this.resize.bind(this);
        }

        protected AddBackgroundImage() {          
            let resourceBackground = globalResourcesBg["backgroundStars"];
            this.backgroundImage = this.mainContainer.addChild(new Sprite(resourceBackground.texture));
            let resourceBG = globalResourcesBg["bg_full"];
            this.bg_full = this.innerContainer.addChild(new Sprite(resourceBG.texture));
            this.bg_full.position.set(370,-120);
            this.bg_full.scale.set(0.85);
        }

        protected createShapes(): void {
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
        }

        protected addRestartButton(){
            let btnResource = globalResources["but_restart"];
            this.restartBtn = new Sprite(btnResource.texture);
            this.restartBtn.on('mousedown', this.ContinueToLoading,this);
            this.restartBtn.on('touchstart', this.ContinueToLoading, this);
            this.restartBtn.interactive = true;
            this.restartBtn.position.set(490,500);
            this.innerContainer.addChild(this.restartBtn);
        }

        protected ContinueToLoading(): void {
            loadingController.showLoadingScreen();
            this.mainContainer.visible = false;
            this.innerContainer.visible = false;
        }

        protected addAllToStage(): void {
            app.stage.addChild(this.mainContainer);
            app.stage.addChild(this.innerContainer);
            this.addRestartButton();
        }

        protected resize():void{
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
    }
}