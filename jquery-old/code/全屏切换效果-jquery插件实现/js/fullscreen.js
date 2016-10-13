(function ($) {
	
	var defaults = {
		'container' : '#container',//容器
		'pages' : '.page',//子容器
		'direction' : 'vertical',//滑动的方向 horizontal,vertical,
	};

	//$.fn === $.prototpye 增加方法函数
	$.fn.fullScreen = function (options) {
		options = $.extend(defaults, options || {});

		var $container = $(options.container);
		var $pages = $container.find(options.pages);
		
	}



})(jQuery);