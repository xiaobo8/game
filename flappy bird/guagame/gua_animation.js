class GuaAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 2; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        // for (var i = 1; i < 9; i++) {
        //     var name = `run${i}`
        //     var t = game.textureByName(name)
        //     this.animations['run'].push(t)
        // }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        //
        this.w = this.texture.width
        this.h = this.texture.height
        //
        this.frameIndex = 0
        this.frameCount = 3
        this.flipX = false
        this.rotation = 0
        //
        this.gy = 10
        this.vy = 0
    }

    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        this.y += this.vy
        this.vy += this.gy * 0.2
        //
        var h = 430
        if (this.y > h) {
            this.y = h
        }
        //更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        var x = this.x + this.w / 2
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        // log('this', this)

        context.drawImage(this.texture, 0, 0)

        context.restore()
        // log('this', this.frames)
        // this.game.drawImage(this)
    }

    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle'
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
