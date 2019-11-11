jQuery(document).ready(function($)
{
	// LAZYLOADING DES IMAGES AVEC LA CLASSE "LAZY"
	$("img.lazy").lazyload({
		effect : "fadeIn"
	});

	setTimeout(function() 
	{
		$('footer').nextAll('div').css('display', 'none');
	}, 5000);

	// ZOOM SUR LES IMAGES DISPOSANT DE LA CLASSE ZOOM
	if ($(window).width() > 1200 )
	{
		$(".zoom").click(function()
		{
			zoom.to({
				element: $(this)[0]
			});
		});
	}

	// SCROLL WHEN CLICK ON SCROLL INDICATOR
	$(".scroll-indicator").click(function(){
		$('html, body').animate({
			scrollTop:$('section:eq(0)').offset().top -80
		}, 1000);
	});

/*
var $top5chart = $('#top5chart'),
top5ChartDone = false;

$(window).scroll(function(){
	if ( $top5chart.is(':in-viewport') && top5ChartDone === false) {
		console.log('Add USA')
		setTimeout(function () {
			top5chart.load({
				columns:[
					['États-Unis', 141.1, 161.3, 170 , 148.3,  80.2,  87.2,  81.9,  63.4,  67.1,
					79 ,  64.3,  62 ,  43.2]
				],
				type: 'line'
			});
		}, 1500);
		top5ChartDone = true;
	}
*/
});
