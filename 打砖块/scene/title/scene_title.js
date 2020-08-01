class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
                var s = Scene(game)
                game.replaceScene(s)
            })
    }

    draw() {
        // log('this.canvas', this.game.canvas.width)
        const x = this.game.canvas.width / 2
        this.game.context.font = '30px serif'
        this.game.context.textAlign = 'center'
        this.game.context.fillText('按 k 开始游戏', x, 150)
    }
}
