class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.jianju = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = false
            p1.x = 500 + i * this.jianju
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            log('jjj', p1.y, p2.y)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-150, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        for (var i = 0; i < this.pipes.length / 2; i+=2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.jianju * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.jianju * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context

        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var lable = GuaLable.new(game, 'hello')
        // this.addElement(lable)
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        //
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        //
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g =GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5

        var b = GuaAnimation.new(game)
        b.x = 180
        b.y = 200
        this.bird = b
        this.addElement(b)

        this.setupInputs()
    }
    update() {
        super.update()
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }

    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-5, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(5, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }

    // draw() {
    //     super.draw()
        // this.game.context.fillText('按 k 开始游戏', 100, 200)
    // }
}
