jQuery(document).ready(function(e){e(".fixed-map-wrapper svg #path-phoenix-nogales path");var a=e(".fixed-map-wrapper svg #nogales-dot #step1-dot_2_ circle"),t=new ScrollMagic.Controller;TweenMax.defaultOverwrite=!1,TweenLite.defaultOverwrite=!1,new ScrollMagic.Scene({triggerElement:"h4",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-phoenix-nogales path","is-drawn").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h4",triggerHook:.5}).setTween(a,.5,{scale:1.3,transformOrigin:"50% 50%",delay:1.3,ease:Bounce.easeOut}).offset(0).addIndicators().addTo(t);e(".fixed-map-wrapper svg #path-nogales-tombstone-elpaso path"),e(".fixed-map-wrapper svg #tombstone-dot #step1-dot_3_ circle");var s=e(".fixed-map-wrapper svg #elpaso-dot #step1-dot circle");new ScrollMagic.Scene({triggerElement:"h3#anim-step2",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-phoenix-nogales path","st12").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step2",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-nogales-tombstone-elpaso path","is-drawn2").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step2",triggerHook:.5}).setTween(s,.5,{scale:1.3,transformOrigin:"50% 50%",delay:1.3,ease:Bounce.easeOut}).offset(0).addIndicators().addTo(t);e(".fixed-map-wrapper svg #path-elpaso-tucson-sells path"),e(".fixed-map-wrapper svg #tucson-dot #step1-dot_4_ circle");var r=e(".fixed-map-wrapper svg #sells-dot #step1-dot_5_ circle");new ScrollMagic.Scene({triggerElement:"h3#anim-step3",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-nogales-tombstone-elpaso path","st12").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step3",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-elpaso-tucson-sells path","is-drawn3").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step3",triggerHook:.5}).setTween(r,.5,{scale:1.3,transformOrigin:"50% 50%",delay:1.3,ease:Bounce.easeOut}).offset(0).addIndicators().addTo(t);e(".fixed-map-wrapper svg #path-sells-yuma path"),e(".fixed-map-wrapper svg #ajo-dot #step1-dot_1_ circle");var o=e(".fixed-map-wrapper svg #yuma-dot #step1-dot_7_ ellipse");new ScrollMagic.Scene({triggerElement:"h3#anim-step4",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-elpaso-tucson-sells path","st12").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step4",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-sells-yuma path","is-drawn4").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step4",triggerHook:.5}).setTween(o,.5,{scale:1.3,transformOrigin:"50% 50%",delay:1.3,ease:Bounce.easeOut}).offset(0).addIndicators().addTo(t);e(".fixed-map-wrapper svg #path-yuma-sandiego path");var g=e(".fixed-map-wrapper svg #sandiego-dot #step1-dot_8_ circle");new ScrollMagic.Scene({triggerElement:"h3#anim-step5",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-sells-yuma path","st12").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step5",triggerHook:.5}).setClassToggle(".fixed-map-wrapper svg #path-yuma-sandiego path","is-drawn5").offset(0).addIndicators().addTo(t),new ScrollMagic.Scene({triggerElement:"h3#anim-step5",triggerHook:.5}).setTween(g,.5,{scale:1.3,transformOrigin:"50% 50%",delay:1.3,ease:Bounce.easeOut}).offset(0).addIndicators().addTo(t)});