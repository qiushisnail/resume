!(function(w){
	w.zqs = {};
	w.zqs.carousel = function(){
		// 获取轮播图的容器
		var carouselWrap = document.querySelector('.carousel-wrap');
		if(carouselWrap){
			var index = 0;//获取当前轮播页面的索引
			//获取容器的宽度
			var carouselWidth = parseInt(carouselWrap.offsetWidth);
			//获取轮播图中元素li
			var liArr = carouselWrap.querySelectorAll('.carousel-wrap .list>li');
			
			//设置ul的宽度
			var ulList = carouselWrap.querySelector('.carousel-wrap .list')
			//无缝滑动，复制第一个list到最后；
			ulList.appendChild(liArr[0].cloneNode(true)); // 克隆一个元素
			var liLength = liArr.length+1;
			ulList.style.width = liLength + '00%';

			//设置ul下li的宽度;
			var styleNode = document.createElement('style');
			styleNode.innerHTML = '.carousel-wrap .list>li{width:'+1/liLength*100+'%}';
			document.head.appendChild(styleNode);

			var needAuto = carouselWrap.getAttribute('needAuto');
			needAuto = needAuto==null?false:true;
      console.log(needAuto);
			//自动轮播
			if(needAuto){
				autoChange();
			}


			//设置导航点
			var pointsWrap = document.querySelector('.carousel-wrap .points-wrap');
			for(var i=0;i<liLength-1;i++){
				pointsWrap.innerHTML+='<a href="javascript:;"></a>';
			}
			var pointsWrapWidth = pointsWrap.offsetWidth;
			pointsWrap.style.marginLeft = -pointsWrapWidth/2+'px';

			// 为所有超链接赋予点击函数
			var aList = document.querySelectorAll('.carousel-wrap .points-wrap>a');
			zqs.addClass(aList[0],'active');
			for(var i =0;i<aList.length;i++){
				aList[i].indexnum = i;
				aList[i].onclick = function(){
					// 清除定时器
					clearInterval(timer);
					index = this.indexnum;// 获取当前点击的导航下标
					setPoinstWrap();
					console.log(index);
					move(ulList,'left', -index * carouselWidth,30,function(){
						if(needAuto){
							autoChange();
						}
					});

				}
			}


			function setPoinstWrap(){
				//当前索引为最后一张图片
				if(index >= liLength-1){
					index = 0;
					//运行到最后一个，将left该0，使其一直从左向右滑动
					ulList.style.left = 0;
				}
				for(var i =0;i<aList.length;i++){
					zqs.removeClass(aList[i],'active')
				}
				
				zqs.addClass(aList[index],'active');

				
			}


			
			//自动轮播
			var timer;
			function autoChange(){
				timer = setInterval(function(){
					index++;
					index = index%liLength;
					move(ulList,'left', -index * carouselWidth,30,function(){
						setPoinstWrap();	
						
					})
				},3000)
			}

		}

		/*
		  obj:对象
		  attr:属性
		  target：目标值
		  speed：速度
		  callback:回调函数
		 */
		function move(obj,attr,target,speed,callback){
			// 清除函数
			clearInterval(obj.timer);

			//获取对象指定属性的值
			var current = parseInt(zqs.getStyle(obj,attr))
			//判断速度正负
			if(current > target){
				speed = -speed;
			}

			// 开启定时器
			obj.timer = setInterval(function(){
				//获取元素当前值
				var objValue = parseInt(zqs.getStyle(obj,attr));
				// 加上速度
				var newValue = objValue + speed;

				/**
				 *当速度大于0时，newValue<=target
				 *当速度小于0时，newValue>=target
				 */
				if((speed > 0 && newValue>target) || (speed < 0 && newValue<target)){
					newValue = target;
				}

				//将新值赋值给元素
				obj.style[attr] = newValue + 'px';

				// 移动到指定位置，关闭定时器，执行回调函数
				if(newValue == target){
					clearInterval(obj.timer);
					callback && callback();
				}
				
			},30);

		}

	}

	//获取元素当前样式的值
	w.zqs.getStyle = function(obj,name){
		if(window.getComputedStyle){
			return window.getComputedStyle(obj,null)[name];
		}else{
			// ie8
			return obj.currentStyle[name]
		}

	}

	w.zqs.addClass = function(node,className){
		
		var reg = new RegExp("\\b" + className+"\\b")
		if(!reg.test(node.className)){
			node.className += (' '+className);
		}
	}

	w.zqs.haveClass=function (node,className){
		var reg=new RegExp("\\b"+className+"\\b");
		if(reg.test(node.className)){
			return true;
		}
		return false;
	}

	w.zqs.removeClass = function(node,className){
		if(node.className){
			var reg = new RegExp("\\b" + className+"\\b")
			var classes = node.className;
			node.className = classes.replace(reg,'');
			if(/^\s*$/.test(node.className)){
				node.removeAttribute('class')
			}

		}else{
			node.removeAttribute('class')
		}
	}
})(window)