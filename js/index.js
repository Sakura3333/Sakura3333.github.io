var count = 0;
var right = document.getElementById("right");
var main = document.getElementById("main");
var opera = document.getElementById("opera");
var timer1 = null;
right.onclick = handlerRight;

var num = 250;
var peachs = []; // 大桃心上个点的坐标
var shakeScope = 10;
var a = 23;
var len = 50;
for (let i = 0; i < len; i++) {
    let step = i / len * (Math.PI * 2);//递增的θ
    let vector = {
        x: a * (16 * Math.pow(Math.sin(step), 3)),
        y: -a * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
    };
    peachs.push(vector);
}

var circles = [];
var stars = [];
var dir = ["sin", "cos"];
for (var i = 0; i < num; i++) {
    circles.push({
        x: Math.random() * innerWidth,
        y: -Math.random() * innerHeight / 2 - 20,
        r: Math.random() * 2 + 2,
        c: "rgba(" + 255 + ", " + 0 + ", " + Math.random() * 255 + ", " + Math.random() + ")",
        d: dir[Math.random() * 2],
        s: Math.floor(Math.random() * 4 + 1),
        tx: peachs[i % 50].x + innerWidth / 2 + Math.cos(new Date().getTime() /100),
        ty: peachs[i % 50].y + innerHeight / 2.5 + Math.sin(new Date().getTime() /100)
    });
    stars.push({
        x: Math.random() * innerWidth,
        y: -Math.random() * innerHeight / 2,
        r: Math.random()*2+2,
        c: "rgba(" + 255 + ", " + Math.random()*10 + 240 + ", " + 0 + ", " + Math.random() + ")",
        s: Math.floor(Math.random() * 4 + 1),
        tx: peachs[i % 50].x + innerWidth / 2,
        ty: peachs[i % 50].y + innerHeight / 2.5
    })
}
init();
// 初始化
function init() {
    loadCube(100);
    loadImg();
    drawBubble();
    var typed = new Typed("#typed", {
        strings: ["非常抱歉，不善言辞的我只能以这种方式与你交流..."],
        typeSpeed: 100,
        backSpeed: 0,
        cursorChar: '_',
        shuffle: true,
        smartBackspace: false,
        loop: false
    })
}
// 画气泡
function drawBubble() {
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    window.requestAnimationFrame(draw);
}
// 绘制
function draw() {
    var canvas = document.getElementsByTagName("canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < num; i++) {
        var time = new Date().getTime();
        var circle = circles[i];
        var star = stars[i];
        if (count === 5) {
            if (timer1 === null) {
                opera.style.display = "none";
                timer1 = setInterval(() => {
                    main.style.transition = "5s";
                    main.style.opacity = "0";
                    setTimeout(() => {
                        main.style.display = "none";
                    }, 5000);
                    clearInterval(timer1);
                }, 5000);
            }
            if (circle.x < circle.tx - shakeScope) {
                circle.x += time / 1000000000000 * 0.15 * circle.s;
            } else if (circle.x > circle.tx + shakeScope) {
                circle.x -= time / 1000000000000 * 0.15 * circle.s;
            }
            if (star.x < star.tx - shakeScope) {
                star.x += time / 1000000000000 * 0.15 * star.s;
            } else if (star.x > star.tx + shakeScope) {
                star.x -= time / 1000000000000 * 0.15 * star.s;
            }
            if (circle.y < circle.ty - shakeScope) {
                circle.y += time / 1000000000000 * 0.15 * circle.s;
            } else if (circle.y > circle.ty + shakeScope) {
                circle.y -= time / 1000000000000 * 0.15 * circle.s;
            } else {
                circle.y += 0.1;
            }
            if (star.y < star.ty - shakeScope) {
                star.y += time / 1000000000000 * 0.15 * star.s;
            } else if (star.y > star.ty + shakeScope) {
                star.y -= time / 1000000000000 * 0.15 * star.s;
            } else {
                star.y += 0.1;
            }
        } else {
            if (circle.d === "sin") {
                circle.x += Math.sin(time)*0.5;
            } else if (circle.d === "cos") {
                circle.x += Math.cos(time)*0.5;
            }
            circle.y += time / 1000000000000 * 0.15 * circle.s;
        }
        star.y += time / 1000000000000 * 0.15 * star.s;
        ctx.beginPath();
        ctx.fillStyle = circle.c;
        ctx.arc(circle.x, circle.y, circle.r, Math.PI / 4 * 3, 0, false);
        ctx.arc(circle.x + circle.r * 2, circle.y, circle.r, Math.PI, Math.PI / 4, false);
        ctx.moveTo(circle.x - Math.sqrt(circle.r * circle.r / 2), circle.y + Math.sqrt(circle.r * circle.r / 2));
        ctx.lineTo(circle.x + circle.r * 2 + Math.sqrt(circle.r * circle.r / 2), circle.y + Math.sqrt(circle.r * circle.r / 2));
        ctx.lineTo(circle.x + circle.r, circle.y + Math.sqrt(circle.r * circle.r / 2) + (Math.sqrt(circle.r * circle.r / 2) * 2 + circle.r * 2) / 2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = star.c;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
        if (circle.y > innerHeight) {
            circle.y = -5;
            circle.x = Math.random() * innerWidth;
            circle.s = Math.floor(Math.random() * 10 + 1);
        }
        if (star.y > innerHeight) {
            star.y = -5;
            star.x = Math.random() * innerWidth;
            star.s = Math.floor(Math.random() * 10 + 1);
        }
    }
    window.requestAnimationFrame(draw);
}
// 加载立方体
function loadCube(num) {
    var text1 = Array.from("人生十九载，春风与伊逢，吹鼓万物齐生长。人生十九载，夏至与伊恋，蝉鸣声快心切之。人生十九载，秋来与伊庆，月洁风和心悦之。人生二十载，立秋伤伊心，余心黯然愧意生。人生二十载，责己日深，厌犹不及，歉意浓。");
    var text2 = Array.from("感性的我啊，理性的你呀，我的心去了哪里。笨拙的我啊，灵巧的你呀，我的心去了哪里。自卑的我啊，自信的你呀，我的心去了哪里。幼稚的我啊，浪漫的你呀，我的心去了哪里。无心的我啊，有心的你呀，我的心去了哪里。");
    var text3 = Array.from("天高气爽，心旷神怡，我心之所需硕果累累。秋色宜人，心身疲惫，我心之所想略有所成。西风叶落，心神衰落，我心之所向无所能及。奋斗的心，自信的心，浪漫的心，我丢掉了。恐惧的心，懦弱的心，躁动的心，却给你了。");
    var text4 = Array.from("无耻的心，给予的心，寻回良心，能否给你？人生二十载，埋藏心底的爱意辞书如何叙？言语如苏打的泡沫般涌现而出。雨声嘈杂，千言万语汇一句，唯传心中意；彩虹灿烂，难掩心中念你情；暖风丝丝，碎片般的感情缓缓吹入");
    var text5 = Array.from("你的掌中；与秋日已至时的你，我愿放声呐喊木槿满开，羞红之颜，我心向之；     可怜木槿心，我心向之；         木槿满开，灿烂焰火，我心悦之；     木槿微笑，我心悦之。");
    var textArr = [text1, text2, text3, text4, text5];
    console.log(textArr);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < num; i++) {
        var cube = document.createElement("div");
        cube.classList.add("cube");
        for (var j = 0; j < 6; j++) {
            var side = document.createElement("span");
            side.classList.add("side");
            if (textArr[j] !== undefined) {
                if (textArr[j][i] !== undefined) {
                    side.innerText = textArr[j][i];
                } else {
                    side.innerText = "";
                }
            } else {
                side.innerText = "";
            }
            cube.appendChild(side);
        }
        fragment.appendChild(cube);
    }
    var main = document.getElementById("main");
    main.appendChild(fragment);
}
// 加载图片
function loadImg() {
    var cubes, uris, imgAttrs;
    var main = document.getElementById("main");
    cubes = document.getElementsByClassName("cube");
    uris = ["", "", "", "", "", "./img/4.jpg"];
    imgAttrs = [[1918, 513], [1919, 513], [1920, 513], [1920, 513], [1920, 513], [3000, 802]];
    for (var i = 0; i < cubes.length; i++) {
        var sides = cubes[i].children;
        for (var j = 0; j < sides.length; j++) {
            if (j === sides.length - 1) {
                var scale = imgAttrs[j][0] / main.offsetWidth;
                sides[j].style.background = "url('" + uris[j] + "') no-repeat";
                sides[j].style.backgroundSize = imgAttrs[j][0] / scale + "px";
                sides[j].style.backgroundPosition = -40 * (i % 20) + "px " + (-40 * (Math.floor(i / 20))) + "px";
            }
        }
        var redCubes = [1, 2, 3, 7, 8, 10, 11, 15, 18, 22, 26, 29, 32, 35, 38, 42, 47, 51, 55, 58, 62, 68, 70, 75, 78, 81, 82, 83, 89, 96, 97];
        if (redCubes.indexOf(i) !== -1) {
            sides[sides.length - 1].classList.add("redCube");
        }
    }
}
// 过渡动画
function animate(count) {
    var cubes = document.getElementsByClassName("cube");
    var i = 0;
    var timer = setInterval(function () {
        if (i < cubes.length) {
            right.onclick = null;
            if (count < 4) {
                cubes[i].style.transform = "rotateY(" + (-90 * count) + "deg)";
            } else if (count === 4) {
                cubes[i].style.transform = "rotateX(-90deg)";
            } else if (count === 5) {
                cubes[i].style.transform = "rotateX(90deg)";
            }
            i++;
        } else {
            clearInterval(timer);
            right.onclick = handlerRight;
        }
    }, 25);
}
// 监听右按钮
function handlerRight() {
    if (count > 4) {
        count = 0;
    } else {
        count++;
    }
    animate(count);
}
