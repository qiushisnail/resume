!function(){
  var view =  document.querySelectorAll('[data-nav]')
  var controller = {
    view: null,
    init: function(view){
      this.view = view;
      this.bindEvents();
      this.markNav();
      this.showUp();
    },
    bindEvents: function(){
      // 获取nav对应的各部分内容
      var lastScroll = 0;
      window.onscroll = (ev) => {
        ev =  ev || event;
        
        this.markNav();
        
      }
    },
    markNav: function(){
      var view = this.view;
      var minIndex = 0;
      // 获取当前离body顶部距离最近的元素
      for(var i=1;i<view.length;i++){
        minIndex = Math.abs(view[i].offsetTop - window.scrollY) >  Math.abs(view[minIndex].offsetTop - window.scrollY)?minIndex:i;
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
     
    },
    showUp: function(){

       var animate = document.querySelectorAll('.animate-up');
       for(var i=0;i<animate.length;i++){
         
       }
      // console.log(minIndex)
      // //向上出现特效，只在页面初始加载时生效
      // var view = this.view;
      // var navContent = view[minIndex].children[0];
      // zqs.addClass(navContent,'animated');

    }
  }
  
  controller.init(view)
}.call()