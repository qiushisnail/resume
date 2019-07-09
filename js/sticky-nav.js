!function(){
  /*固定头部*/
  //获取头部导航元素
	var view = header.querySelector('.header-nav');
	var controller = {
    view: null,
    init: function(view){
      this.view = view;
      this.bindEvents();
    },
    bindEvents: function(){
      window.addEventListener('scroll',()=>{
        if(window.scrollY>0){
          this.active();
        }else{
          this.deactive();
        }
      },false);
      
    },
    active: function(){
      zqs.addClass(this.view,'header-sticky');
    },
    deactive: function(){
      zqs.removeClass(this.view,'header-sticky');
    }
  }
  controller.init(view);
}.call()