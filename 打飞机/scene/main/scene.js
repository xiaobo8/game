const config = {
    player_speed: 10,
    enemy_speed: 5,
    bullet_speed: 15,
    fire_cooldown: 1,
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
        this.alive = true
        // this.speed = 1
    }
    kill() {
        this.alive = false
    }
    collide(b) {
        return this.alive && (rectIntersects(this, b) || rectIntersects(b, this))
    }
    update() {
        this.y -= this.speed
    }
    draw() {
        if (this.alive) {
            this.game.drawImage(this)
        }
    }
}


class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.scene.bullets.push(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}



class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.alive = true
        this.setup()
    }
    kill() {
        this.alive = false
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }

    }
    collide(b) {
        return this.alive && (rectIntersects(this, b) || rectIntersects(b, this))
    }
    draw() {
        if (this.alive) {
            this.game.drawImage(this)
        }
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()

        this.setupInputs()
    }

    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        // this.player = GuaImage.new(game, 'player')
        // log('player')
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.bullets = []

        this.addElement(this.bg)
        // this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies()
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
         }
         this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function() {
           s.player.moveLeft()
       })
        g.registerAction('d', function() {
           s.player.moveRight()
       })
       g.registerAction('w', function() {
           s.player.moveUp()
       })
       g.registerAction('s', function() {
           s.player.moveDown()
       })
       g.registerAction('j', function() {
           s.player.fire()
       })
    }

    enemyCrashed() {
        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i]
            // log('enemy', enemy)
            for (var j = 0; j < this.bullets.length; j++) {
                var bullet = this.bullets[j]
                if (enemy.collide(bullet)) {
                    enemy.kill()
                    // log('position', enemy.x, enemy.y)
                    bullet.kill()
                    // this.enemies--

                    this.bullets.splice(j, 1)
                    // log('length', this.bullets.length)
                }
            }
        }
    }

    update() {
        super.update()

        // this.addEnemies()
        this.enemyCrashed()

    }
    // draw() {
    //     // this.game.(this.bg)
    //     // this.game.(this.player)
    // }
}
