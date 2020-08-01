class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
            })
    }

    draw() {
        const x = this.game.canvas.width / 2
        this.game.context.font = '25px serif'
        this.game.context.textAlign = 'center'
        this.game.context.fillText('游戏结束，按 r 重新开始游戏', x, 150)
    }
}
