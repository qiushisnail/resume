window.onload  = function(){

    //获取头部元素 
	var header = document.getElementById('header'); 
	var headerNav = header.querySelector('.header-nav');
	// 头部元素初始高度
	var headerNavHeight = headerNav.offsetHeight;

    // 监听滚轮事件
	listenMouseScroll();

	// 监听滚轮事件
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
	zqs.carousel();
	
}