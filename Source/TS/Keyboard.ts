namespace Tetris {
    export class Keyboard {
        public key: any = {};
        public value: any;
        public isDown: boolean;
        public isUp: boolean;
        public isAxisButton: boolean;
        constructor(value: any, isAxisButton: boolean) {
            this.value = value;
            this.isDown = false;
            this.isUp = true;
            this.isAxisButton = isAxisButton;
            this.subscribeEvents();
        }
        public subscribeEvents(): void {
            window.addEventListener("keydown", this.downHandler.bind(this));
            window.addEventListener("keyup", this.upHandler.bind(this));
        }
        public unSubscribeEvents(): void {
            window.removeEventListener("keydown", this.downHandler.bind(this));
            window.removeEventListener("keyup", this.upHandler.bind(this));
        }
        public downHandler(event: any): void {
            if (event.key === this.value) {
                this.press();
                event.preventDefault();

            }
        }
        public upHandler(event: any): void {
            if (event.key === this.value) {
                this.release();
                event.preventDefault();
            }
        }
        public press(): void {

        }
        public release(): void {

        }
    }
}