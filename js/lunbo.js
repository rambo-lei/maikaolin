
        onload = function() {
            var oList = document.getElementById('list');
            var aLi = oList.getElementsByTagName('li');

            var oBtns = document.getElementById('btns');
            var aBtn = oBtns.getElementsByTagName('li');

            var oPrev = document.getElementById('prev');
            var oNext = document.getElementById('next');

            // 自动轮播
            // 1. 复制， 下标，宽度，设置UL的宽度
            oList.innerHTML += oList.innerHTML;
            var iWidth = aLi[0].offsetWidth;
            var i = 0;
            oList.style.width = aLi.length * iWidth + 'px';

            // 2. 设置定时器，隔3秒切换一次
            var timer = setInterval(move, 3000);

            // 3. 切换函数
            function move() {
                i++;
                var iLeft = -i * iWidth;
                startMove(oList, 'left', iLeft, next);

                for (var j = 0; j < aBtn.length; j++) {
                    if (i == j) {
                        aBtn[j].className = 'active';
                    } else {
                        aBtn[j].className = '';
                    }
                }

                if (i == aLi.length / 2) {
                    aBtn[0].className = 'active';
                }
            }

            // 4. 回调函数
            function next() {
                // 判断最后一张的下一张
                if (i >= aLi.length / 2) {
                    // 立即将图片显示为第一张
                    oList.style.left = 0;
                    i = 0;
                }
            }

            // 按钮加上点击事件
            for (var j = 0; j < aBtn.length; j++) {

                aBtn[j].index = j;
                aBtn[j].onclick = function() {
                    i = this.index - 1;
                    btnmove();
                }
            }

            // 点击执行
            function btnmove() {
                move();

                clearInterval(timer);
                timer = setInterval(move, 3000);
            }

            // 上一页
            oPrev.onclick = function() {
                if (i == 0) {
                    // 立即让他变为最后一张的下一张  5
                    oList.style.left = -aLi.length / 2 * iWidth + 'px';
                    i = aLi.length / 2 - 2;
                } else {
                    i = i - 2;
                }
                btnmove();
            }

            // 下一页
            oNext.onclick = function() {
                next();
                btnmove();
            }

            window.onblur = function() {
                clearInterval(timer);
            }

            window.onfocus = function() {
                clearInterval(timer);
                timer = setInterval(move, 3000);
            }

        }
  