var Scene = function(game) {
    var s = {
        game: game,
    }
    // var m = 3
    // //初始化
    // balls = []
    // for (var i = 0; i < 5; i++) {
    //     var ball = Ball(game)
    //
    //     ball.x += m
    //
    //     log('ballx', ball.x)
    //     balls.push(ball)
    //     m += 6
    // }
    // var ball = Ball(game)
     var ball = Ball(game)
    var paddle = Paddle(game)
    var score = 0

    paused = false

    blocks = loadLevel(game, 1)
    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })


    game.registerAction('f', function() {
        log('fire')
        ball.fire()
    })
    s.draw = function() {
        game.drawImage(paddle)
        //
        // log('balls', balls)
        // var i = 0
        // if (balls[i].fired) {
        //     game.drawImage(balls[i])
        //     i++
        // }
        game.drawImage(ball)

        // game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        const x = game.canvas.width / 2
        game.context.textAlign = 'center'
        game.context.font = '20px serif'
        game.context.fillText('分数: ' + score, x, 20)
    }

    s.update = function() {
        if (paused) {
            return
        }

        ball.move()

        if (ball.y > paddle.y) {
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }

        if (paddle.collide(ball)) {
            ball.fantan()
        }
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                ball.fantan()
                score += 100
            }
        }
    }
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(evetn) {
        var x = event.offsetX
        var y = event.offsetY
        if (ball.hasPoint(x, y)) {
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(evetn) {
        var x = event.offsetX
        var y = event.offsetY
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(evetn) {
        var x = event.offsetX
        var y = event.offsetY
        enableDrag = false
    })
    return s
}
