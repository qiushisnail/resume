!function(){
  /*、作品动画效果*/
  var view = document.querySelectorAll('.portfolio .nav>ul>li')
  var controller = {
    view: null,
    flag: false, // 标记是否点击了 UX DESIGN 按钮 true-点击了，false-没点击
    allNodes: null,
    init: function(view){
      this.view = view;
      
      this.allNodes =  document.querySelectorAll('.article .pf-grid');
      this.bindEvents();
    },
    bindEvents: function(){
      var view = this.view;
      // 给每个li添加点击事件
      for(let i=0;i<view.length;i++){
        view[i].index = i;
        view[i].onclick = (ev) => {
          ev = ev || event;
          var element = ev.currentTarget
          var index = element.index
          //切换li的active状态
          for(var i=0;i<view.length;i++){
            zqs.removeClass(view[i],'active')
          }
          zqs.addClass(view[index],'active')

          
          if(index == 0){
            this.allFun();
            // all
          }else if (index == 1){
             //photography
             this.photographyFun()
          }else if (index == 2){
             //UX DESIGN
            this.uxdesign()
          }
        }
      }
    },
    allFun: function(){
      for(let j = 0;j< this.allNodes.length;j++){
        var node = this.allNodes[j];
        if(zqs.haveClass(node,'photography')){
          if(this.flag){ 
            // 判断是否点击了ux design，如果点击了，先清除请求动画监听
            this.nodeHideFn(node);

            // 计算其余图片参照第一张的相对位置
            //第一张图片
            var first = node.parentNode.children[0];
            var x = first.offsetWidth+'px';
            var y = '0px';
            if(node.offsetLeft !== 0){
              x = first.offsetWidth-node.offsetWidth*2+'px'
            }
            window.requestAnimationFrame(() => {
              this.allNodes[j].style.cssText = 'transform:translate3d('+x+','+y+',0px);opacity:1;'+
                'transition-delay:0.1s;transition-property:opacity,transform;transition-duration: 0.4s;';
              this.nodeShowFn(this.allNodes[j]);
            });
          }
         
        }else{
          node.style.cssText = 'opacity:0;transform:scale(0);';
          window.requestAnimationFrame(() =>{
            this.allNodes[j].style.cssText = 'transform:scale(1);opacity:1;'+
                'transition:transform 0.4s,opacity 0.4s;';
            this.nodeShowFn(this.allNodes[j]);
          })
        }
        
      }
      this.flag = false;
    },
    photographyFun: function(){
      //隐藏undesign
      for(let j = 0;j< this.allNodes.length;j++){
        var node = this.allNodes[j];
        if(zqs.haveClass(node,'photography')){
          if(this.flag){ // 判断是否点击了ux design，如果点击了，先清除请求动画监听
            this.nodeHideFn(node);
          }
          window.requestAnimationFrame(() => {
            this.allNodes[j].style.cssText = 'transform:scale(1);opacity:1;'+
               'transition-property:opacity,transform;transition-duration: 0.4s';
            this.nodeShowFn(this.allNodes[j]);
          })
        }else{
          if(this.flag){// 判断是否点击了ux design，如果点击了，先清除请求动画监听
            this.nodeShowFn(node);
          }
          window.requestAnimationFrame(() => {
            this.allNodes[j].style.cssText = 'transform:scale(0.001);opacity:0;'+
              'transition-property:opacity,transform;transition-duration: 0.4s';
            this.nodeHideFn(this.allNodes[j]);
          });
        }
      }
      this.flag = false;
    },
    uxdesign: function(){
      //隐藏 photography
      this.flag = true;
      //显示 ux design
      for(let j = 0;j< this.allNodes.length;j++){
        var node = this.allNodes[j];
        if(zqs.haveClass(node,'uxdesign')){
          node.style.cssText ='display:block;opacity:0;';
         
          window.requestAnimationFrame( ()=> {
             /*因为使用的是grid布局，点击all时，如果没有translate控制，自动补齐，不会有动画效果
             为了点击all时，有动画效果，所以暂时不移除window.requestAnimationFrame
             */
            var ele = this.allNodes[j]
            var x = -ele.offsetLeft+'px';
            var y = -ele.offsetTop+'px';
            if(ele.offsetTop !== 0){
              x= -(ele.offsetLeft-ele.offsetWidth)+'px';
            }
            ele.style.cssText = 'transform:translate3d('+x+','+y+',0px);opacity:1;'+
              'transition-property:opacity,transform;transition-duration: 0.4s;';
          });
        }else{
          window.requestAnimationFrame( () => {
            /*因为使用的是grid布局，如果第一张图片display:none,就不占据页面位置，其他两个元素就自动补齐，
            所以暂时不移除window.requestAnimationFrame
             */
            this.allNodes[j].style.cssText = 'transform:scale(0.01);opacity:0;'+
              'transition-property:opacity,transform;transition-duration: 0.4s';
          })
        }
      }
    },
    nodeHideFn: function(node){
      function hideFn(){
        node.removeEventListener("transitionend",hideFn);
        node.removeEventListener("webkitTransitionEnd",hideFn);
        node.style.cssText ='display:none;';
      }
      node.addEventListener('transitionend',hideFn);
      node.addEventListener('webkitTransitionEnd',hideFn);
    },
    nodeShowFn: function(node){
      function showFn(){
        node.removeEventListener("transitionend",showFn);
        node.removeEventListener("webkitTransitionEnd",showFn);
        node.style.cssText ='';
      }
      node.addEventListener('transitionend',showFn);
      node.addEventListener('webkitTransitionEnd',showFn);
    }
  }
  controller.init(view)
}.call()