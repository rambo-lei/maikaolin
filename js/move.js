// 获取某元素节点对象的某属性值
// obj 要获取的属性的元素节点对象 oBox
// attr 要获取的属性 'left'
function getStyleAttr(obj, attr) {
    if (window.getComputedStyle) {
        // IE9+ ....
        return getComputedStyle(obj, null)[attr];
    }
    return obj.currentStyle[attr];
}


// 封装的动画函数
// obj 需要移动的元素节点对象
// attr 需要改变的属性
// iTarget 目标值
// fn 回调函数
function startMove(obj, attr, iTarget, fn) {

    // 1. 先清空上一次动画的定时器
    clearInterval(obj.timer);

    // 2. 开启动画，设置一个定时器
    obj.timer = setInterval(function() {
        // 1> 获取当前值
        if (attr == 'opacity') {
            var current = parseFloat(getStyleAttr(obj, attr) * 100);
            current = Math.round(current);
        } else {
            // left top width height
            var current = parseFloat(getStyleAttr(obj, attr));
            current = Math.round(current);
        }

        // 2. 给定一个速度
        var iSpeed = (iTarget - current) / 8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

        // 3. 判断一个临界值，来停止我们的动画
        if (current == iTarget) {
            clearInterval(obj.timer);

            // 回调函数
            if (fn) {
                fn();
            }

            // fn && fn();

            return; // 退出函数，不再执行下面的代码
        }

        // 4. 运动
        if (attr == 'opacity') {
            obj.style[attr] = (current + iSpeed) / 100;
            obj.style.filter = 'alpha(opacity=' + (current + iSpeed) + ')';
        } else {
            obj.style[attr] = current + iSpeed + 'px';
        }
    }, 30);
}