window.onload  = function(){

    //获取头部元素 
	var header = document.getElementById('header'); 
	var headerNav = header.querySelector('.header-nav');
	// 头部元素初始高度
	var headerNavHeight = headerNav.offsetHeight;

	// 监听滚轮事件
	listenMouseScroll();
	function listenMouseScroll(){

		var scrollHeight = 0;//滚动条滚动的距离
		
		window.addEventListener('scroll',scrollFun,false);

		function scrollFun(){			
			// 只要滚动就改变样式
			if(window.scrollY>0){
				zqs.addClass(headerNav,'header-sticky');
			}else{
				zqs.removeClass(headerNav,'header-sticky');
			}
		}
	}

	//开启twitter轮播图
	twitterCarousel();
	function twitterCarousel(){
		zqs.carousel();
	}
	

	//作品切换
	portfolioChange();
	function portfolioChange(){
		var liArr = document.querySelectorAll('.portfolio .nav>ul>li')
		//var article =  document.querySelector('.content .portfolio .article');

		// 给每个li添加点击事件
		for(var i=0;i<liArr.length;i++){
			liArr[i].index = i;
			var flag = false;
			liArr[i].onclick = function(){
				
				var _that = this;
				//切换li的active状态
				for(var i=0;i<liArr.length;i++){
					zqs.removeClass(liArr[i],'active')
				}
				zqs.addClass(liArr[this.index],'active')

				var allNodes = document.querySelectorAll('.article .pf-grid');
                var photographyNodes = document.querySelectorAll('.article .pf-grid.photography');
                var uxdesignNodes= document.querySelectorAll('.article .pf-grid.uxdesign');

                function showFn(){
                	this.removeEventListener("transitionend",showFn);
                	this.removeEventListener("webkitTransitionEnd",showFn);
                	this.style.cssText ='';
                }
                function hideFn(){
                	this.removeEventListener("transitionend",hideFn);
                	this.removeEventListener("webkitTransitionEnd",hideFn);
                	this.style.cssText ='display:none;';
                }
				// all
				if(_that.index == 0){
					for(var j = 0;j< allNodes.length;j++){
						var node = allNodes[j];
						if(zqs.haveClass(node,'photography')){
							if(flag){
								node.style.cssText ='display:none;';
						    }
						}else{
							if(flag){
								node.style.cssText ='';
						    }
						}

						(function(node,j){
							if(node.style.display == 'none'){
								node.style.cssText = 'opacity:0;transform:scale(0);';
								window.requestAnimationFrame(function(){
									node.style.cssText = 'transform:scale(1);opacity:1;'+
		                                                    'transition:transform 0.4s,opacity 0.4s;';
									node.addEventListener('transitionend',showFn);
									node.addEventListener('webkitTransitionEnd',showFn);
								})
							
							}else{
								if(flag){
									//第一张图片
									var first = node.parentNode.children[0];
									//var pW= node.parentNode.offsetWidth;
									//var PH = node.parentNode.offsetHeight;
									var x = first.offsetWidth+'px';
									var y = '0px';
									if(node.offsetLeft !== 0){
									   x = first.offsetWidth-node.offsetWidth*2+'px'
									}
									window.requestAnimationFrame(function(){
										node.style.cssText = 'transform:translate3d('+x+','+y+',0px);opacity:1;'+
				                                             'transition-delay:0.1s;transition-property:opacity,transform;transition-duration: 0.4s;';
										node.addEventListener('transitionend',showFn);
									    node.addEventListener('webkitTransitionEnd',showFn);
									});
								}
							}
						})(node,j);
					}
					flag = false;
				}else if (_that.index == 1){
					//photography

					//隐藏undesign
					for(var j = 0;j< allNodes.length;j++){
						var node = allNodes[j];
						
						if(zqs.haveClass(node,'photography')){
							if(flag){
								node.addEventListener('transitionend',hideFn);
								node.addEventListener('webkitTransitionEnd',hideFn);
								
						    }
							(function(node,j){
								window.requestAnimationFrame(function(){
									node.style.cssText = 'transform:scale(1);opacity:1;'+
		                                                 'transition-property:opacity,transform;transition-duration: 0.4s';
								    node.addEventListener('transitionend',showFn);
								    node.addEventListener('webkitTransitionEnd',showFn);
								})
							})(node)
						}else{
							if(flag){
								node.addEventListener('transitionend',showFn);
								node.addEventListener('webkitTransitionEnd',showFn);
								
						    }
							(function(node,j){
								window.requestAnimationFrame(function(){
									node.style.cssText = ' transform:scale(0.001);opacity:0;'+
		                                                  'transition-property:opacity,transform;transition-duration: 0.4s';
								    node.addEventListener('transitionend',hideFn);
								    node.addEventListener('webkitTransitionEnd',hideFn);
							    });
							})(node);
						}
					}

					flag = false;
				}else if (_that.index == 2){
					//UX DESIGN
					//隐藏 photography
					flag = true;
					// }
                    // 显示 ux design
					for(var j = 0;j< allNodes.length;j++){
						var node = allNodes[j];
						if(zqs.haveClass(node,'uxdesign')){
							node.style.cssText ='display:block;opacity:0;';
							(function(node,j){
								var x = -node.offsetLeft+'px';
								var y = -node.offsetTop+'px';
								if(node.offsetTop !== 0){
									x= -(node.offsetLeft-node.offsetWidth)+'px';
								}
								window.requestAnimationFrame(function(){
									node.style.cssText = 'transform:translate3d('+x+','+y+',0px);opacity:1;'+
			                                             'transition-property:opacity,transform;transition-duration: 0.4s;'
			                                             ;
								});
							})(node,j);
							
						}else{
							(function(node){
								window.requestAnimationFrame(function(){
									node.style.cssText = 'transform:scale(0.01);opacity:0;'+
			                                                         'transition-property:opacity,transform;transition-duration: 0.4s';
								})
							})(node)
						}
					}


					
				}
			}
		}


	}
	
}