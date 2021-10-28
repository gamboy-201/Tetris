namespace Tetris {
    let view:LoadingView;
    export class LoadingView {
        public mainContainer: PIXI.Container;
        public innerContainer: PIXI.Container;
        public backgroundImage: PIXI.Sprite;
        public backgroundShader: PIXI.Sprite;
        public bg_full: PIXI.Sprite;
        public maskObj: PIXI.Graphics;
        private playbtn:any;
        constructor(){
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
        public ShowLoadingScreen():void{
            this.mainContainer.visible = true;
            this.innerContainer.visible = true;
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

        protected createShapes():void{
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
        }

        protected ContinueToTheGame():void{
            this.mainContainer.visible = false;
            this.innerContainer.visible = false;
            gameView = new GameView();
            gameController = new GameController(gameView);
            gameController.ShowTheGame();
            this.mainContainer.visible = false;
        }

        protected addAllToStage():void{
            app.stage.addChild(this.mainContainer);
            app.stage.addChild(this.innerContainer);
            this.addPlayButton();
        }

        protected addPlayButton(){
            let btnResource = globalResources["PlayBtn"];
            this.playbtn = new Sprite(btnResource.texture);
            this.playbtn.on('mousedown', this.ContinueToTheGame,this);
            this.playbtn.on('touchstart', this.ContinueToTheGame, this);
            this.playbtn.interactive = true;
            this.playbtn.position.set(490,450);
            this.innerContainer.addChild(this.playbtn);
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