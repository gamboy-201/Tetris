/// <reference path = "../DTS/pixi.d.ts"/>
namespace Tetris{
    export let Texture = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    CreateGraphics: PIXI.Graphics,
    loader = PIXI.Loader.shared,
    app: PIXI.Application,
    tickerShared = PIXI.Ticker.shared,
    SpriteArray:any = {},
    compoundCorrectness: number[] = [0,0,0],
    loadingController:any,
    loadingView:any,
    gameController:any,
    gameView:any,
    finalScreenController:any,
    finalScreenView:any
    ;
}