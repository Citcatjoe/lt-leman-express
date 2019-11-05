jQuery(document).ready(function($) 
{


    var $counterOneVar = $('.counter-one'),
        counterOne = false;
    

    $(window).scroll(function(){
        if ( $counterOneVar.is(':in-viewport') && counterOne ==false) {
            // alert('coucou');
            $('.counter-one').counterUp({
                delay: 10, // the delay time in ms
                time: 3000 // the speed time in ms
            });
            counterOne = true;
        }
        
    });

    var $counterTwoVar = $('.counter-two'),
        counterTwo = false;
    

    $(window).scroll(function(){
        if ( $counterTwoVar.is(':in-viewport') && counterTwo ==false) {
            // alert('coucou');
            $('.counter-two').counterUp({
                delay: 10, // the delay time in ms
                time: 3000 // the speed time in ms
            });
            counterTwo = true;
        }
        
    });

    var $counterThreeVar = $('.counter-three'),
        counterThree = false;
    

    $(window).scroll(function(){
        if ( $counterThreeVar.is(':in-viewport') && counterThree ==false) {
            // alert('coucou');
            $('.counter-three').counterUp({
                delay: 10, // the delay time in ms
                time: 3000 // the speed time in ms
            });
            counterThree = true;
        }
        
    });

    var $counterFourVar = $('.counter-four'),
        counterFour = false;
    

    $(window).scroll(function(){
        if ( $counterFourVar.is(':in-viewport') && counterFour ==false) {
            // alert('coucou');
            $('.counter-four').counterUp({
                delay: 10, // the delay time in ms
                time: 3000 // the speed time in ms
            });
            counterFour = true;
        }
        
    });


	setTimeout(function() 
	{
		$('footer').nextAll('div').css('display', 'none');
	}, 5000);

	//********************************************************************************
	
	mainTl = new TimelineMax(),
    $baloonz = $('svg.baloonz'),
    $baloonzBlue = $baloonz.find('#blue_x5F_baloon'),
    $baloonzBlueTxt = $baloonz.find('#blue_x5F_text'),
    $baloonzRed = $baloonz.find('#red_x5F_baloon'),
    $baloonzRedTxt = $baloonz.find('#red_x5F_text'),
    $sceneBaloonzCap1 = $('.scene-baloonz-cap1'),
    $sceneBaloonzCap2 = $('.scene-baloonz-cap2');

    clearStage();
    function clearStage() {
        var clearTl = new TimelineMax();

        clearTl
            .set($baloonzBlue, { scale: 0, transformOrigin: "center center" })
            .set($baloonzBlueTxt, { autoAlpha: 0, transformOrigin: "center center" })
            .set($baloonzRed, { scale: 0, transformOrigin: "center bottom" })
            .set($baloonzRedTxt, { autoAlpha: 0, transformOrigin: "center center" })
            .set($sceneBaloonzCap1, { autoAlpha: 0, transformOrigin: "center center" })
            .set($sceneBaloonzCap2, { autoAlpha: 0, transformOrigin: "center center" });
           

        return clearTl;
    }

    var controller = new ScrollMagic.Controller();
    var step = 500;

     // build scene
    new ScrollMagic.Scene({
        triggerElement: 'section.scene-baloonz',
        triggerHook: .0,
        duration: step * 5.5
    })
        .setPin('section.scene-baloonz', { pushFollowers: true })
        .offset(0)
        .addIndicators()
        .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "section.scene-baloonz",
      triggerHook: .0,
      duration: step
    })
      .setTween($baloonzBlue, { scale: 1, ease: Power0.easeNone })
      .offset(step * 0) //VOLONTAIRE
      .addTo(controller);

			  new ScrollMagic.Scene({
			  triggerElement: "section.scene-baloonz",
			  triggerHook: .0,
			  duration: step / 2
		    })
		      .setTween($baloonzBlueTxt, { autoAlpha: 1, ease: Power0.easeNone })
		      .offset(step * 1) //VOLONTAIRE
		      .addTo(controller);

		      new ScrollMagic.Scene({
			  triggerElement: "section.scene-baloonz",
			  triggerHook: .0,
			  duration: step / 2
		    })
		      .setTween($sceneBaloonzCap1, { autoAlpha: 1, ease: Power0.easeNone })
		      .offset(step * 1) //VOLONTAIRE
		      .addTo(controller);

    new ScrollMagic.Scene({
    triggerElement: "section.scene-baloonz",
    triggerHook: .0,
    duration: step
    })
    .setTween($baloonzRed, { scale: 1, ease: Power0.easeNone })
    .offset(step * 2.5) //VOLONTAIRE
    .addTo(controller);

		    new ScrollMagic.Scene({
		    triggerElement: "section.scene-baloonz",
		    triggerHook: .0,
		    duration: step / 2
		    })
		    .setTween($baloonzRedTxt, { autoAlpha: 1, ease: Power0.easeNone })
		    .offset(step * 3.5) //VOLONTAIRE
		    .addTo(controller);

		     new ScrollMagic.Scene({
		    triggerElement: "section.scene-baloonz",
		    triggerHook: .0,
		    duration: step / 2
		    })
		    .setTween($sceneBaloonzCap2, { autoAlpha: 1, ease: Power0.easeNone })
		    .offset(step * 3.5) //VOLONTAIRE
		    .addTo(controller);



	secondTl = new TimelineMax(),
    $sunGaz = $('svg.sun-gaz'),
    $sun = $sunGaz.find('#sun'),
    $gaz = $sunGaz.find('#gaz'),
    $sceneSunGazCap1 = $('.scene-sun-gaz-cap1'),
    $sceneSunGazCap2 = $('.scene-sun-gaz-cap2');
   

    clearSecondStage();
    function clearSecondStage() {
        var clearSecondTl = new TimelineMax();

        clearSecondTl
            .set($sun, { autoAlpha: 0, transformOrigin: "center center" })
            .set($gaz, { autoAlpha: 0, transformOrigin: "center center" })
            .set($sceneSunGazCap1, { autoAlpha: 0, transformOrigin: "center center" })
            .set($sceneSunGazCap2, { autoAlpha: 0, transformOrigin: "center center" });
           

        return clearSecondTl;
    }

  	new ScrollMagic.Scene({
        triggerElement: 'section.scene-sun-gaz',
        triggerHook: .2,
        duration: step * 5
    })
        .setPin('section.scene-sun-gaz', { pushFollowers: true })
        .offset(0)
        .addIndicators()
        .addTo(controller);    

			    new ScrollMagic.Scene({
			    triggerElement: "section.scene-sun-gaz",
			    triggerHook: .0,
			    duration: step
			    })
			    .setTween($sun, { autoAlpha: 1, ease: Power0.easeNone })
			    .offset(step * 0) //VOLONTAIRE
			    .addTo(controller);

			    new ScrollMagic.Scene({
			    triggerElement: "section.scene-sun-gaz",
			    triggerHook: .0,
			    duration: step
			    })
			    .setTween($sceneSunGazCap1, { autoAlpha: 1, ease: Power0.easeNone })
			    .offset(step * 0) //VOLONTAIRE
			    .addTo(controller);



    new ScrollMagic.Scene({
    triggerElement: "section.scene-sun-gaz",
    triggerHook: .0,
    duration: step
    })
    .setTween($gaz, { autoAlpha: 1, ease: Power0.easeNone })
    .offset(step * 2) //VOLONTAIRE
    .addTo(controller);

      new ScrollMagic.Scene({
    triggerElement: "section.scene-sun-gaz",
    triggerHook: .0,
    duration: step
    })
    .setTween($sceneSunGazCap2, { autoAlpha: 1, ease: Power0.easeNone })
    .offset(step * 2) //VOLONTAIRE
    .addTo(controller);

});
