(function(w){
	w.zqs = {};
	w.zqs.carousel = function(){
		
	}

	w.zqs.addClass = function(node,className){
		
		var reg = new RegExp("\\b" + className+"\\b")
		if(!reg.test(node.className)){
			node.className += (' '+className);
		}
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