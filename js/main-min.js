jQuery(document).ready((function(o){o("img.lazy").lazyload({effect:"fadeIn"}),o(window).width()>1200&&o(".zoom").click((function(){zoom.to({element:o(this)[0]})})),o(".scroll-indicator").click((function(){o("html, body").animate({scrollTop:o("section:eq(0)").offset().top-80},1e3)}))}));