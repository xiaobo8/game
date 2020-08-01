// var SceneEnd = function(game) {
//     // log('game2', game)
//     var s = {
//         game: game,
//     }
//     game.registerAction('r', function() {
//         var s = SceneTitle.new(game)
//         game.replaceScene(s)
//     })
//     // 初始化
//     s.draw = function() {
//         // draw labels
//         // log('game', game)
//         game.context.fillText('游戏结束，按 r 重新开始游戏', 100, 290)
//     }
//     s.update = function() {
//
//     }
//     return s
// }

class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
            })
    }
    
    draw() {
        this.game.context.fillText('游戏结束，按 r 重新开始游戏', 100, 290)
    }
}
