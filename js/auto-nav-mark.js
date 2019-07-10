!function(){
  var view = header.querySelector('.header-nav');
  var controller = {
    view: null,
    init: function(view){
      this.view = view;
      this.bindEvents();
    },
    bindEvents: function(){
      // 获取nav对应的各部分内容
      var  sections = document.querySelectorAll('[data-nav]')
      window.onscroll = function(ev){
        ev =  ev || event;
        var minIndex = 0;
        // 获取当前离body顶部距离最近的元素
        for(var i=1;i<sections.length;i++){
          minIndex = Math.abs(sections[i].offsetTop - window.scrollY) >  Math.abs(sections[minIndex].offsetTop - window.scrollY)?minIndex:i;
        }
      
      }
    }
  }
  controller.init(view)
}.call()