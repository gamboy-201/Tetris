namespace Tetris {
    export class LoadingController {
        protected view;
        constructor(view:LoadingView){
            this.view=view;
        }
        protected showLoadingScreen():void{
            this.view.ShowLoadingScreen();
        }
    }
}