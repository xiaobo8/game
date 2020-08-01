class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        var self = this     //因为this会变化
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event) {
            log('event', event)

            self.keydowns[event.key] = false
        })
        this.init()
    }

    // static instance(...args) {
    //     this.i = this.i || new this(...args)
    //     return this.i
    // }
    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        // log('ccc')
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // log('aaa')
        g.update()
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        g.draw()
        setTimeout(function() {
            g.runloop()
            // log('bbb')
        }, 1000/window.fps)
    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        // log('111')
        var g = this
        g.scene = scene
        setTimeout(function() {
            // log('222')
            g.runloop()
            // log('333')
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    run(scene) {
        this.runCallback(this)
        // g.scene = scene

    }

    init() {
        var g = this
        var loads = []
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                g.images[name] = img
                loads.push(1)
                if (loads.length == names.length) {
                    g.run()
                }
            }
        }
    }
}
