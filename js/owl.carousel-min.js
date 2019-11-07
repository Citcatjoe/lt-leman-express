"function"!=typeof Object.create&&(Object.create=function(t){function i(){}return i.prototype=t,new i}),function(t,i,s){var e={init:function(i,s){var e=this;this.$elem=t(s),this.options=t.extend({},t.fn.owlCarousel.options,this.$elem.data(),i),this.userOptions=i,this.loadContent()},loadContent:function(){function i(t){var i,e="";if("function"==typeof s.options.jsonSuccess)s.options.jsonSuccess.apply(this,[t]);else{for(i in t.owl)t.owl.hasOwnProperty(i)&&(e+=t.owl[i].item);s.$elem.html(e)}s.logIn()}var s=this,e;"function"==typeof s.options.beforeInit&&s.options.beforeInit.apply(this,[s.$elem]),"string"==typeof s.options.jsonPath?(e=s.options.jsonPath,t.getJSON(e,i)):s.logIn()},logIn:function(){var t=this;this.$elem.data("owl-originalStyles",this.$elem.attr("style")),this.$elem.data("owl-originalClasses",this.$elem.attr("class")),this.$elem.css({opacity:0}),this.orignalItems=this.options.items,this.checkBrowser(),this.wrapperWidth=0,this.checkVisible=null,this.setVars()},setVars:function(){var t=this;if(0===this.$elem.children().length)return!1;this.baseClass(),this.eventTypes(),this.$userItems=this.$elem.children(),this.itemsAmount=this.$userItems.length,this.wrapItems(),this.$owlItems=this.$elem.find(".owl-item"),this.$owlWrapper=this.$elem.find(".owl-wrapper"),this.playDirection="next",this.prevItem=0,this.prevArr=[0],this.currentItem=0,this.customEvents(),this.onStartup()},onStartup:function(){var t=this;this.updateItems(),this.calculateAll(),this.buildControls(),this.updateControls(),this.response(),this.moveEvents(),this.stopOnHover(),this.owlStatus(),!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle),!0===this.options.autoPlay&&(this.options.autoPlay=5e3),this.play(),this.$elem.find(".owl-wrapper").css("display","block"),this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility(),this.onstartup=!1,this.eachMoveUpdate(),"function"==typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){var t=this;!0===this.options.lazyLoad&&this.lazyLoad(),!0===this.options.autoHeight&&this.autoHeight(),this.onVisibleItems(),"function"==typeof this.options.afterAction&&this.options.afterAction.apply(this,[this.$elem])},updateVars:function(){var t=this;"function"==typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]),this.watchVisibility(),this.updateItems(),this.calculateAll(),this.updatePosition(),this.updateControls(),this.eachMoveUpdate(),"function"==typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var t=this;i.setTimeout((function(){t.updateVars()}),0)},watchVisibility:function(){var t=this;if(!1!==t.$elem.is(":visible"))return!1;t.$elem.css({opacity:0}),i.clearInterval(t.autoPlayInterval),i.clearInterval(t.checkVisible),t.checkVisible=i.setInterval((function(){t.$elem.is(":visible")&&(t.reload(),t.$elem.animate({opacity:1},200),i.clearInterval(t.checkVisible))}),500)},wrapItems:function(){var t=this;this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),this.wrapperOuter=this.$elem.find(".owl-wrapper-outer"),this.$elem.css("display","block")},baseClass:function(){var t=this,i=this.$elem.hasClass(this.options.baseClass),s=this.$elem.hasClass(this.options.theme);i||this.$elem.addClass(this.options.baseClass),s||this.$elem.addClass(this.options.theme)},updateItems:function(){var i=this,s,e;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=!1,this.options.itemsMobile=!1,!1;if((s=t(this.options.responsiveBaseWidth).width())>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems),!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort((function(t,i){return t[0]-i[0]})),e=0;e<this.options.itemsCustom.length;e+=1)this.options.itemsCustom[e][0]<=s&&(this.options.items=this.options.itemsCustom[e][1]);else s<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),s<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),s<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),s<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),s<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var s=this,e,o;if(!0!==s.options.responsive)return!1;o=t(i).width(),s.resizer=function(){t(i).width()!==o&&(!1!==s.options.autoPlay&&i.clearInterval(s.autoPlayInterval),i.clearTimeout(e),e=i.setTimeout((function(){o=t(i).width(),s.updateVars()}),s.options.responsiveRefreshRate))},t(i).resize(s.resizer)},updatePosition:function(){var t=this;this.jumpTo(this.currentItem),!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var i=this,s=0,e=i.itemsAmount-i.options.items;i.$owlItems.each((function(o){var n=t(this);n.css({width:i.itemWidth}).data("owl-item",Number(o)),o%i.options.items!=0&&o!==e||o>e||(s+=1),n.data("owl-roundPages",s)}))},appendWrapperSizes:function(){var t=this,i=this.$owlItems.length*this.itemWidth;this.$owlWrapper.css({width:2*i,left:0}),this.appendItemsSizes()},calculateAll:function(){var t=this;this.calculateWidth(),this.appendWrapperSizes(),this.loops(),this.max()},calculateWidth:function(){var t=this;this.itemWidth=Math.round(this.$elem.width()/this.options.items)},max:function(){var t=this,i=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);return this.options.items>this.itemsAmount?(this.maximumItem=0,i=0,this.maximumPixels=0):(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=i),i},min:function(){return 0},loops:function(){var i=this,s=0,e=0,o,n,a;for(this.positionsInArray=[0],this.pagesInArray=[],o=0;o<this.itemsAmount;o+=1)e+=this.itemWidth,this.positionsInArray.push(-e),!0===this.options.scrollPerPage&&(a=(n=t(this.$owlItems[o])).data("owl-roundPages"))!==s&&(this.pagesInArray[s]=this.positionsInArray[o],s=a)},buildControls:function(){var i=this;!0!==this.options.navigation&&!0!==this.options.pagination||(this.owlControls=t('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem)),!0===this.options.pagination&&this.buildPagination(),!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var i=this,s=t('<div class="owl-buttons"/>');i.owlControls.append(s),i.buttonPrev=t("<div/>",{class:"owl-prev",html:i.options.navigationText[0]||""}),i.buttonNext=t("<div/>",{class:"owl-next",html:i.options.navigationText[1]||""}),s.append(i.buttonPrev).append(i.buttonNext),s.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',(function(t){t.preventDefault()})),s.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',(function(s){s.preventDefault(),t(this).hasClass("owl-next")?i.next():i.prev()}))},buildPagination:function(){var i=this;i.paginationWrapper=t('<div class="owl-pagination"/>'),i.owlControls.append(i.paginationWrapper),i.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",(function(s){s.preventDefault(),Number(t(this).data("owl-page"))!==i.currentItem&&i.goTo(Number(t(this).data("owl-page")),!0)}))},updatePagination:function(){var i=this,s,e,o,n,a,r;if(!1===this.options.pagination)return!1;for(this.paginationWrapper.html(""),s=0,e=this.itemsAmount-this.itemsAmount%this.options.items,n=0;n<this.itemsAmount;n+=1)n%this.options.items==0&&(s+=1,e===n&&(o=this.itemsAmount-this.options.items),a=t("<div/>",{class:"owl-page"}),r=t("<span></span>",{text:!0===this.options.paginationNumbers?s:"",class:!0===this.options.paginationNumbers?"owl-numbers":""}),a.append(r),a.data("owl-page",e===n?o:n),a.data("owl-roundPages",s),this.paginationWrapper.append(a));this.checkPagination()},checkPagination:function(){var i=this;if(!1===i.options.pagination)return!1;i.paginationWrapper.find(".owl-page").each((function(){t(this).data("owl-roundPages")===t(i.$owlItems[i.currentItem]).data("owl-roundPages")&&(i.paginationWrapper.find(".owl-page").removeClass("active"),t(this).addClass("active"))}))},checkNavigation:function(){var t=this;if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){var t=this;this.updatePagination(),this.checkNavigation(),this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){var t=this;this.owlControls&&this.owlControls.remove()},next:function(t){var i=this;if(this.isTransition)return!1;if(this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1,this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0)){if(!0!==this.options.rewindNav)return this.currentItem=this.maximumItem,!1;this.currentItem=0,t="rewind"}this.goTo(this.currentItem,t)},prev:function(t){var i=this;if(this.isTransition)return!1;if(!0===this.options.scrollPerPage&&this.currentItem>0&&this.currentItem<this.options.items?this.currentItem=0:this.currentItem-=!0===this.options.scrollPerPage?this.options.items:1,this.currentItem<0){if(!0!==this.options.rewindNav)return this.currentItem=0,!1;this.currentItem=this.maximumItem,t="rewind"}this.goTo(this.currentItem,t)},goTo:function(t,s,e){var o=this,n;return!o.isTransition&&("function"==typeof o.options.beforeMove&&o.options.beforeMove.apply(this,[o.$elem]),t>=o.maximumItem?t=o.maximumItem:t<=0&&(t=0),o.currentItem=o.owl.currentItem=t,!1!==o.options.transitionStyle&&"drag"!==e&&1===o.options.items&&!0===o.browser.support3d?(o.swapSpeed(0),!0===o.browser.support3d?o.transition3d(o.positionsInArray[t]):o.css2slide(o.positionsInArray[t],1),o.afterGo(),o.singleItemTransition(),!1):(n=o.positionsInArray[t],!0===o.browser.support3d?(o.isCss3Finish=!1,!0===s?(o.swapSpeed("paginationSpeed"),i.setTimeout((function(){o.isCss3Finish=!0}),o.options.paginationSpeed)):"rewind"===s?(o.swapSpeed(o.options.rewindSpeed),i.setTimeout((function(){o.isCss3Finish=!0}),o.options.rewindSpeed)):(o.swapSpeed("slideSpeed"),i.setTimeout((function(){o.isCss3Finish=!0}),o.options.slideSpeed)),o.transition3d(n)):!0===s?o.css2slide(n,o.options.paginationSpeed):"rewind"===s?o.css2slide(n,o.options.rewindSpeed):o.css2slide(n,o.options.slideSpeed),void o.afterGo()))},jumpTo:function(t){var i=this;"function"==typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]),t>=this.maximumItem||-1===t?t=this.maximumItem:t<=0&&(t=0),this.swapSpeed(0),!0===this.browser.support3d?this.transition3d(this.positionsInArray[t]):this.css2slide(this.positionsInArray[t],1),this.currentItem=this.owl.currentItem=t,this.afterGo()},afterGo:function(){var t=this;this.prevArr.push(this.currentItem),this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2],this.prevArr.shift(0),this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp()),"function"==typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){var t=this;this.apStatus="stop",i.clearInterval(this.autoPlayInterval)},checkAp:function(){var t=this;"stop"!==this.apStatus&&this.play()},play:function(){var t=this;if(t.apStatus="play",!1===t.options.autoPlay)return!1;i.clearInterval(t.autoPlayInterval),t.autoPlayInterval=i.setInterval((function(){t.next(!0)}),t.options.autoPlay)},swapSpeed:function(t){var i=this;"slideSpeed"===t?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===t?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!=typeof t&&this.$owlWrapper.css(this.addCssSpeed(t))},addCssSpeed:function(t){return{"-webkit-transition":"all "+t+"ms ease","-moz-transition":"all "+t+"ms ease","-o-transition":"all "+t+"ms ease",transition:"all "+t+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(t){return{"-webkit-transform":"translate3d("+t+"px, 0px, 0px)","-moz-transform":"translate3d("+t+"px, 0px, 0px)","-o-transform":"translate3d("+t+"px, 0px, 0px)","-ms-transform":"translate3d("+t+"px, 0px, 0px)",transform:"translate3d("+t+"px, 0px,0px)"}},transition3d:function(t){var i=this;this.$owlWrapper.css(this.doTranslate(t))},css2move:function(t){var i=this;this.$owlWrapper.css({left:t})},css2slide:function(t,i){var s=this;s.isCssFinish=!1,s.$owlWrapper.stop(!0,!0).animate({left:t},{duration:i||s.options.slideSpeed,complete:function(){s.isCssFinish=!0}})},checkBrowser:function(){var t=this,e="translate3d(0px, 0px, 0px)",o=s.createElement("div"),n,a,r,l;o.style.cssText="  -moz-transform:"+e+"; -ms-transform:"+e+"; -o-transform:"+e+"; -webkit-transform:"+e+"; transform:"+e,n=/translate3d\(0px, 0px, 0px\)/g,r=null!==(a=o.style.cssText.match(n))&&1===a.length,l="ontouchstart"in i||i.navigator.msMaxTouchPoints,this.browser={support3d:r,isTouch:l}},moveEvents:function(){var t=this;!1===this.options.mouseDrag&&!1===this.options.touchDrag||(this.gestures(),this.disabledEvents())},eventTypes:function(){var t=this,i=["s","e","x"];this.ev_types={},!0===this.options.mouseDrag&&!0===this.options.touchDrag?i=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:!1===this.options.mouseDrag&&!0===this.options.touchDrag?i=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(i=["mousedown.owl","mousemove.owl","mouseup.owl"]),this.ev_types.start=i[0],this.ev_types.move=i[1],this.ev_types.end=i[2]},disabledEvents:function(){var i=this;this.$elem.on("dragstart.owl",(function(t){t.preventDefault()})),this.$elem.on("mousedown.disableTextSelect",(function(i){return t(i.target).is("input, textarea, select, option")}))},gestures:function(){function e(t){if(void 0!==t.touches)return{x:t.touches[0].pageX,y:t.touches[0].pageY};if(void 0===t.touches){if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY};if(void 0===t.pageX)return{x:t.clientX,y:t.clientY}}}function o(i){"on"===i?(t(s).on(l.ev_types.move,a),t(s).on(l.ev_types.end,r)):"off"===i&&(t(s).off(l.ev_types.move),t(s).off(l.ev_types.end))}function n(s){var n=s.originalEvent||s||i.event,a;if(3===n.which)return!1;if(!(l.itemsAmount<=l.options.items)){if(!1===l.isCssFinish&&!l.options.dragBeforeAnimFinish)return!1;if(!1===l.isCss3Finish&&!l.options.dragBeforeAnimFinish)return!1;!1!==l.options.autoPlay&&i.clearInterval(l.autoPlayInterval),!0===l.browser.isTouch||l.$owlWrapper.hasClass("grabbing")||l.$owlWrapper.addClass("grabbing"),l.newPosX=0,l.newRelativeX=0,t(this).css(l.removeTransition()),a=t(this).position(),h.relativePos=a.left,h.offsetX=e(n).x-a.left,h.offsetY=e(n).y-a.top,o("on"),h.sliding=!1,h.targetElement=n.target||n.srcElement}}function a(o){var n=o.originalEvent||o||i.event,a,r;l.newPosX=e(n).x-h.offsetX,l.newPosY=e(n).y-h.offsetY,l.newRelativeX=l.newPosX-h.relativePos,"function"==typeof l.options.startDragging&&!0!==h.dragging&&0!==l.newRelativeX&&(h.dragging=!0,l.options.startDragging.apply(l,[l.$elem])),(l.newRelativeX>8||l.newRelativeX<-8)&&!0===l.browser.isTouch&&(void 0!==n.preventDefault?n.preventDefault():n.returnValue=!1,h.sliding=!0),(l.newPosY>10||l.newPosY<-10)&&!1===h.sliding&&t(s).off("touchmove.owl"),a=function(){return l.newRelativeX/5},r=function(){return l.maximumPixels+l.newRelativeX/5},l.newPosX=Math.max(Math.min(l.newPosX,a()),r()),!0===l.browser.support3d?l.transition3d(l.newPosX):l.css2move(l.newPosX)}function r(s){var e=s.originalEvent||s||i.event,n,a,r;e.target=e.target||e.srcElement,h.dragging=!1,!0!==l.browser.isTouch&&l.$owlWrapper.removeClass("grabbing"),l.newRelativeX<0?l.dragDirection=l.owl.dragDirection="left":l.dragDirection=l.owl.dragDirection="right",0!==l.newRelativeX&&(n=l.getNewPosition(),l.goTo(n,!1,"drag"),h.targetElement===e.target&&!0!==l.browser.isTouch&&(t(e.target).on("click.disable",(function(i){i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault(),t(i.target).off("click.disable")})),r=(a=t._data(e.target,"events").click).pop(),a.splice(0,0,r))),o("off")}var l=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};l.isCssFinish=!0,l.$elem.on(l.ev_types.start,".owl-wrapper",n)},getNewPosition:function(){var t=this,i=this.closestItem();return i>this.maximumItem?(this.currentItem=this.maximumItem,i=this.maximumItem):this.newPosX>=0&&(i=0,this.currentItem=0),i},closestItem:function(){var i=this,s=!0===i.options.scrollPerPage?i.pagesInArray:i.positionsInArray,e=i.newPosX,o=null;return t.each(s,(function(n,a){e-i.itemWidth/20>s[n+1]&&e-i.itemWidth/20<a&&"left"===i.moveDirection()?(o=a,!0===i.options.scrollPerPage?i.currentItem=t.inArray(o,i.positionsInArray):i.currentItem=n):e+i.itemWidth/20<a&&e+i.itemWidth/20>(s[n+1]||s[n]-i.itemWidth)&&"right"===i.moveDirection()&&(!0===i.options.scrollPerPage?(o=s[n+1]||s[s.length-1],i.currentItem=t.inArray(o,i.positionsInArray)):(o=s[n+1],i.currentItem=n+1))})),i.currentItem},moveDirection:function(){var t=this,i;return this.newRelativeX<0?(i="right",this.playDirection="next"):(i="left",this.playDirection="prev"),i},customEvents:function(){var t=this;t.$elem.on("owl.next",(function(){t.next()})),t.$elem.on("owl.prev",(function(){t.prev()})),t.$elem.on("owl.play",(function(i,s){t.options.autoPlay=s,t.play(),t.hoverStatus="play"})),t.$elem.on("owl.stop",(function(){t.stop(),t.hoverStatus="stop"})),t.$elem.on("owl.goTo",(function(i,s){t.goTo(s)})),t.$elem.on("owl.jumpTo",(function(i,s){t.jumpTo(s)}))},stopOnHover:function(){var t=this;!0===t.options.stopOnHover&&!0!==t.browser.isTouch&&!1!==t.options.autoPlay&&(t.$elem.on("mouseover",(function(){t.stop()})),t.$elem.on("mouseout",(function(){"stop"!==t.hoverStatus&&t.play()})))},lazyLoad:function(){var i=this,s,e,o,n,a;if(!1===this.options.lazyLoad)return!1;for(s=0;s<this.itemsAmount;s+=1)"loaded"!==(e=t(this.$owlItems[s])).data("owl-loaded")&&(o=e.data("owl-item"),"string"==typeof(n=e.find(".lazyOwl")).data("src")?(void 0===e.data("owl-loaded")&&(n.hide(),e.addClass("loading").data("owl-loaded","checked")),(a=!0!==this.options.lazyFollow||o>=this.currentItem)&&o<this.currentItem+this.options.items&&n.length&&this.lazyPreload(e,n)):e.data("owl-loaded","loaded"))},lazyPreload:function(t,s){function e(){t.data("owl-loaded","loaded").removeClass("loading"),s.removeAttr("data-src"),"fade"===n.options.lazyEffect?s.fadeIn(400):s.show(),"function"==typeof n.options.afterLazyLoad&&n.options.afterLazyLoad.apply(this,[n.$elem])}function o(){a+=1,n.completeImg(s.get(0))||!0===r?e():a<=100?i.setTimeout(o,100):e()}var n=this,a=0,r;"DIV"===s.prop("tagName")?(s.css("background-image","url("+s.data("src")+")"),r=!0):s[0].src=s.data("src"),o()},autoHeight:function(){function s(){var s=t(o.$owlItems[o.currentItem]).height();o.wrapperOuter.css("height",s+"px"),o.wrapperOuter.hasClass("autoHeight")||i.setTimeout((function(){o.wrapperOuter.addClass("autoHeight")}),0)}function e(){a+=1,o.completeImg(n.get(0))?s():a<=100?i.setTimeout(e,100):o.wrapperOuter.css("height","")}var o=this,n=t(o.$owlItems[o.currentItem]).find("img"),a;void 0!==n.get(0)?(a=0,e()):s()},completeImg:function(t){var i;return!!t.complete&&("undefined"===(i=typeof t.naturalWidth)||0!==t.naturalWidth)},onVisibleItems:function(){var i=this,s;for(!0===this.options.addClassActive&&this.$owlItems.removeClass("active"),this.visibleItems=[],s=this.currentItem;s<this.currentItem+this.options.items;s+=1)this.visibleItems.push(s),!0===this.options.addClassActive&&t(this.$owlItems[s]).addClass("active");this.owl.visibleItems=this.visibleItems},transitionTypes:function(t){var i=this;this.outClass="owl-"+t+"-out",this.inClass="owl-"+t+"-in"},singleItemTransition:function(){function t(t){return{position:"relative",left:t+"px"}}var i=this,s=i.outClass,e=i.inClass,o=i.$owlItems.eq(i.currentItem),n=i.$owlItems.eq(i.prevItem),a=Math.abs(i.positionsInArray[i.currentItem])+i.positionsInArray[i.prevItem],r=Math.abs(i.positionsInArray[i.currentItem])+i.itemWidth/2,l="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";i.isTransition=!0,i.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":r+"px","-moz-perspective-origin":r+"px","perspective-origin":r+"px"}),n.css(t(a,10)).addClass(s).on(l,(function(){i.endPrev=!0,n.off(l),i.clearTransStyle(n,s)})),o.addClass(e).on(l,(function(){i.endCurrent=!0,o.off(l),i.clearTransStyle(o,e)}))},clearTransStyle:function(t,i){var s=this;t.css({position:"",left:""}).removeClass(i),this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.endPrev=!1,this.endCurrent=!1,this.isTransition=!1)},owlStatus:function(){var t=this;this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){var e=this;this.$elem.off(".owl owl mousedown.disableTextSelect"),t(s).off(".owl owl"),t(i).off("resize",this.resizer)},unWrap:function(){var t=this;0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove()),this.clearEvents(),this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){var t=this;this.stop(),i.clearInterval(this.checkVisible),this.unWrap(),this.$elem.removeData()},reinit:function(i){var s=this,e=t.extend({},this.userOptions,i);this.unWrap(),this.init(e,this.$elem)},addItem:function(t,i){var s=this,e;return!!t&&(0===this.$elem.children().length?(this.$elem.append(t),this.setVars(),!1):(this.unWrap(),(e=void 0===i||-1===i?-1:i)>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(t):this.$userItems.eq(e).before(t),void this.setVars()))},removeItem:function(t){var i=this,s;if(0===this.$elem.children().length)return!1;s=void 0===t||-1===t?-1:t,this.unWrap(),this.$userItems.eq(s).remove(),this.setVars()}};t.fn.owlCarousel=function(i){return this.each((function(){if(!0===t(this).data("owl-init"))return!1;t(this).data("owl-init",!0);var s=Object.create(e);s.init(i,this),t.data(this,"owlCarousel",s)}))},t.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["Arrière","Avant"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:i,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document);