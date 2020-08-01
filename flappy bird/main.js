var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var main = function() {
    var images = {
        bullet: 'img/bullet.png',
        sky: 'img/sky.png',
        player: 'img/player.png',
        cloud: 'img/cloud.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        //
        // w1: 'img/png/Walk1.png',
        // w2: 'img/png/Walk2.png',
        // w3: 'img/png/Walk3.png',
        // w4: 'img/png/Walk4.png',
        // w5: 'img/png/Walk5.png',
        // w6: 'img/png/Walk6.png',
        // w7: 'img/png/Walk7.png',
        // w8: 'img/png/Walk8.png',
        // w9: 'img/png/Walk9.png',
        // w10: 'img/png/Walk (10).png',
        // 闲置
        idle1: 'img/png/Idle1.png',
        idle2: 'img/png/Idle2.png',
        idle3: 'img/png/Idle3.png',
        idle4: 'img/png/Idle4.png',
        idle5: 'img/png/Idle (5).png',
        idle6: 'img/png/Idle (6).png',
        idle7: 'img/png/Idle (7).png',
        idle8: 'img/png/Idle (8).png',
        idle9: 'img/png/Idle (9).png',
        idle10: 'img/png/Idle (10).png',
        // run
        run1: 'img/png/Run (1).png',
        run2: 'img/png/Run (2).png',
        run3: 'img/png/Run (3).png',
        run4: 'img/png/Run (4).png',
        run5: 'img/png/Run (5).png',
        run6: 'img/png/Run (6).png',
        run7: 'img/png/Run (7).png',
        run8: 'img/png/Run (8).png',
        //
        bg: 'img/bg.png',
        ground: 'img/ground.png',
        b1: 'img/b1.png',
        pipe: 'img/pipe.png',
    }

    var game = new GuaGame(60, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

     enableDebugMode(game, true)
}

main()
