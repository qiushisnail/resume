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

		// 给每个li添加点击事件
		for(var i=0;i<liArr.length;i++){
			liArr[i].index = i;
			liArr[i].onclick = function(){
				//切换li的active状态
				for(var i=0;i<liArr.length;i++){
					zqs.removeClass(liArr[i],'active')
				}
				zqs.addClass(liArr[this.index],'active')
				// all
				if(this.index == 0){

				}else if (this.index == 1){
					//photography
				}else if (this.index == 2){
					//UX DESIGN
				}
			}
		}


	}
	
}