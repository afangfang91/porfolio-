window.addEventListener('load', function() {
//swiper テスト
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // 1. 获取元素
  var focus = document.querySelector('.focus');
  var arrow_l = document.querySelector('.arrow-l');
  var arrow_r = document.querySelector('.arrow-r');
  var ol = document.querySelector('.circle');
  var ul = document.querySelector('.banner-ul');
  var focusWidth = focus.offsetWidth;
  var num = 0;
  var circle = 0;
  var flag = (true);
  //11.关闭节流
  // 2. 鼠标经过focus 就显示隐藏左右按钮
  focus.addEventListener('mouseenter', function() {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener('mouseleave', function() {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
    // timer=setInterval(function(){
    //   arrow_r.click();
    // },2000);
  });

  //小圈圈的部分circle
  // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li');
    ol.appendChild(li);
    li.setAttribute('index', i);
    ol.children[0].className = 'current';

    // 4. 当前的小li设置current+小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
    // 5. 点击小圆圈，移动图片 当然移动的是 ul
    // ul 的移动距离 小圆圈的索引号.circle.index 乘以 图片的宽度li.offsetWidth 注意是负值-
    // 当我们点击了某个小li 就拿到当前小li 的索引号
    li.addEventListener('click', function() {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
      }
      this.className = 'current';
      var index = this.getAttribute('index');
      animate(ul, -index * focusWidth);
    })
  }

  // 6. 克隆第一张图片(li)放到ul 最后面
  var li = ul.children[0].cloneNode(true);
  ul.appendChild(li);

  // 7. 点击右侧按钮， 图片滚动一张
  arrow_r.addEventListener('click', function() {
    if (flag) {
      flag = false;    //关闭节流
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      console.log('R key,num=' + num);
      animate(ul, -num * focusWidth,function(){
        flag=true;
      });
      // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle++
      console.log('R key,cirlce=' + circle);
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    };
  })

  // 9. 左侧按钮做法
  arrow_l.addEventListener('click', function() {
    if(flag){
      flag=false;//关闭节流
    if (num == 0) {
      num = ul.children.length - 1;
      ul.style.left = -num * focusWidth + 'px';
    }
    num--;
    console.log('back key,num=' + num);
    animate(ul, -num * focusWidth,function(){
      flag=true;
    });
    circle--;
    console.log('back key,cirlce=' + circle);
    if (circle < 0) {
      circle = ol.children.length - 1;
    }
    circleChange();
};
  })




  function circleChange() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    ol.children[circle].className = 'current';
  }

  // 10. 自动播放轮播图
  var timer = setInterval(function() {
    //手动调用点击事件
    arrow_r.click();
  }, 2000)
})
