!function(){
  var view =  document.querySelectorAll('[data-nav]')
  var controller = {
    view: null,
    bodyHeight: null,
    init: function(view){
      this.view = view;
      this.bodyHeight =  document.documentElement.clientHeight;
      this.bindEvents();
      this.markNav();
      this.showUp();
      this.hideProgress();
      this.twitterCarousel();
    },
    bindEvents: function(){
      // 获取nav对应的各部分内容
      var lastScroll = 0;
      window.onscroll = (ev) => {
        ev =  ev || event;
        this.markNav();
        this.showUp();
      }
    },
    twitterCarousel: function(){
        zqs.carousel(); // twitter部分轮播
    },
    markNav: function(){
      var view = this.view;
      var minIndex = 0;
      // 获取当前离body顶部距离最近的元素
      for(var i= 0;i<view.length;i++){
        var top = view[i].getBoundingClientRect().top;
        if(top >= 0 && top < this.bodyHeight*0.8){
           minIndex = i
           break;
        }else if(i == view.length-1 && top < 0){
          minIndex = i
          break;
        }
      }
      var element = view[minIndex]
      var nav = header.querySelector('a[href="#'+element.id+'"]').parentNode;
      var navs = header.querySelectorAll('.header .header-nav .header-wrap .nav>ul>li');
      //先移除所有nav元素的active
      var currentNav = -1; // 标记当前点击的导航
      for(var i=0;i<navs.length;i++){
        if(zqs.haveClass(navs[i],'current-nav')){
          currentNav = i;
        }else{
          zqs.removeClass(navs[i],'active');
        }
      }
      if(currentNav == -1){
        //防止在滑动过程中，前面的active状态被触发闪现
        zqs.addClass(nav,'active');
      }
      setTimeout(function(){ // 点击事件完毕后，移除标记
        zqs.removeClass(nav,'current-nav');
      })
     
    },
    showUp: function(){

       var animate = document.querySelectorAll('.animate-up');
       var minIndex = 0;
       for(var i=1;i<animate.length;i++){
         // 当滚动条滚动的距离大于nav对应的元素与可视区域的底部的距离时，加载该nav对应的元素
         var dis =  window.scrollY - Math.abs(this.bodyHeight-animate[i].offsetTop) 
         if( dis > 20 ){
           minIndex = i;
         }
      }
      if(minIndex == 2){
        this.showProgress()
      }
      if(minIndex !== 0){ // 刷新时，防止上面出现空白
        zqs.addClass(animate[minIndex-1],'animated');
        if(minIndex -1 == 2){
          this.showProgress()
        }
      }
      //向上出现特效，只在页面初始加载时生效
      zqs.addClass(animate[minIndex],'animated');

    },
    hideProgress: function(){
      var processes = document.querySelectorAll('section.skills .skills-content li .progress-fill');
      for(var i=0;i<processes.length;i++){
        processes[i].style.transition = 'width 0.3s 300ms'
      }
    },
    showProgress: function(){
      var arr = [80,90,78,60,90,98];
      var processes = document.querySelectorAll('section.skills .skills-content li .progress-fill');
      for(var i=0;i<processes.length;i++){
        processes[i].style.width = arr[i]+'%'
        zqs.addClass(processes[i],'showProcess')
      }
    }
  }
  
  controller.init(view)
}.call()