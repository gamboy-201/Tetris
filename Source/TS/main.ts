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
namespace Tetris {
    export class Main {
        
        loadingController:any;
        loadingView:any;
        gameController:any;
        gameView:any;
        
        constructor() {
            app = new PIXI.Application({ resizeTo: window, backgroundColor: 0x000000, antialias: true,  // ADDED!!!
                resolution: 1 });
            app.stage.interactive = true;
            document.body.appendChild(app.view);
            this.loadAllImages();
        }
 

        protected InitializeLoadingScreen():void{
            loadingView = new LoadingView();
            loadingController = new LoadingController(loadingView);
            loadingController.showLoadingScreen();
        }

        protected InitializeFinalGameScreen():void{
            finalScreenView = new FinalScreenView();
            finalScreenController = new FinalScreenController(finalScreenView);
        }

        private loadAllImages(): void {
            this.loadGeneralImages();
        }

        private loadGeneralImages():void{
            for (let imageid in assetList) {
                loader.add(assetList[imageid], "Assets/" + assetList[imageid] + ".jpg");
            }
            loader.load(this.loadFormImages.bind(this));
        }
        
        private loadFormImages(loader: any, resources: any):void{
            globalResourcesBg = resources;
            for (let imageid in assetListForms) {
                loader.add(assetListForms[imageid], "Assets/" + assetListForms[imageid] + ".png");
            }
            loader.load(this.StartInitialize.bind(this));
        }

        private StartInitialize(loader: any, resources: any): void {
            globalResources = resources;
            this.InitializeLoadingScreen();
            this.InitializeFinalGameScreen();
        }
    }
}
