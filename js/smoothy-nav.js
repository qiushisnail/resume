!function(){
  /*点击导航，导航对应的部分平滑移动到上方 */
  //获取nav元素
  var view = header.querySelectorAll('.header .header-nav .header-wrap .nav>ul>li>a.valid');
  var controller = {
    view: null,
    time: null,
    init: function(view){
      this.view = view;
      this.bindEvents();
      this.initAnimation();
    },
    bindEvents: function(){
      var  view = this.view;
      for(let i = 0; i < view.length; i++ ){
        view[i].addEventListener('click',(ev)=>{
          ev = ev || event;
          //获取nav对应的元素
          var element = document.querySelector(view[i].getAttribute('href').trim());
          this.scrollToElement(element);
          ev.preventDefault();
        })
      }
    },
    initAnimation: function(){
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    },
    scrollToElement: function(element){
      /* 计算的是滚动条要滚动的距离*/
      var top = element.offsetTop 
      // 目标位置
      var target = top  - 80;
      // 当前位置
      var current = window.scrollY;
      var dis = target - current;
      //根据距离分配时间，每移动100px需要1毫秒，最大不超过5ms
      var t = Math.abs(dis/100);
      if( t > 5){t = 5;}
      var coords = { x:0, y: current }
      var tween = new TWEEN.Tween(coords) 
	      .to({ x: 0, y: target }, t*100) 
        .easing(TWEEN.Easing.Quadratic.Out) 
	      .onUpdate(function() { 
          window.scrollTo(0,coords.y);
	      })
        .start(); 
    }
  }
  controller.init(view)
}.call()