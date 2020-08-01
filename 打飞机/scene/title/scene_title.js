class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var lable = GuaLable.new(game, 'hello')
        this.addElement(lable)

        var w = GuaAnimation.new(game)
        w.x = 30
        w.y = 100
        this.w = w
        this.addElement(w)

        this.setupInputs()
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function(keyStatus) {
            self.w.move(-5, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.w.move(5, keyStatus)
        })
    }

    // draw() {
    //     super.draw()
        // this.game.context.fillText('按 k 开始游戏', 100, 200)
    // }
}
