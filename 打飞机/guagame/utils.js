var e = sel => document.querySelector(sel)

// var log = function(s) {
//     e('#id-text-log').value += '\n' + s
// }
var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

// var rectIntersects = function(a, b) {
//     var o = a
//     if (b.y > o.y && b.y < o.y + o.image.height) {
//         if (b.x > o.x && b.x < o.x + o.image.width) {
//             return true
//         }
//     }
//     return false
// }

var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

var rectIntersects = function(a, b) {
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
            // log('相撞')
            return true
        }
    }
    return false
}
