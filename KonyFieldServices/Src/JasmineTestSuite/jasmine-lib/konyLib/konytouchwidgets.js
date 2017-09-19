/**
 * Namespace containing the touch handling and related objects.
 *
 */
$KW.touch =
{
	/**
      * As different image strips in the application might have different events for which they might have registered
      * besides the normal swipe. The event information for which the strip might have registered should be part of the
      * widget itself.
      *
      * Also for each of the strip widget there is a state associated which is needed when the swipe event happens.
      * Based on the direction of the movement of the swipe, the strip should move either left or right.
      *
      * This state is maintained for the image strip in a WidgetContext
      */
    computeSnapWidths: function(formId, widgetType, initialize)
	{
        //var swipeElements = document.getElementsByName("touchcontainer_" + widgetType);
		var swipeElements = document.querySelectorAll("#" + formId + " div[name='touchcontainer_" + widgetType + "']");
		for (var i = 0; i < swipeElements.length; i++) 
		{
			var swipeElement = swipeElements[i];
			var widgetModel = $KU.getModelByNode(swipeElement);
			$KW.touch.computeWidths(swipeElement, widgetModel);
		}
    },
	
    computeWidths: function(swipeElement, widgetModel){
    
        var imgsElement = swipeElement.children[0];
        var slides = imgsElement.children;
        var noOfSwipePages = slides.length;
        imgsElement.style.width = noOfSwipePages * 100 + "%";
        var widthRatio = 0;
        var IMG_WIDTH = 0;
        var percent = 100 / noOfSwipePages;
		
        if (slides.length > 0) {
            for (var j = 0; j < slides.length; j++) {
                slides[j].style.display = "inline";
                
				
				if(widgetModel.wType == "Segment")
					slides[j].style.width = percent + "%"; //"100%";
				else
					slides[j].style.width = Math.floor(slides[j].clientWidth / noOfSwipePages) + 'px';
					

				
            }
            slides[0].style.display = "block";
            IMG_WIDTH = slides[0].clientWidth;
            
        }
        
        if (window.orientation === 90 || window.orientation === -90) // portrait
            widthRatio = IMG_WIDTH / screen.height;
        else 
            if (window.orientation === 0 || window.orientation === 180) // landscape
                widthRatio = IMG_WIDTH / screen.width;
        swipeElement.setAttribute("imageWidth", IMG_WIDTH);
        swipeElement.setAttribute("ratio", widthRatio);
        
		// swipeContext
		if(!widgetModel.swipeContext)
			widgetModel.swipeContext = {};
		var swipeContext = widgetModel.swipeContext;
		swipeContext.imageWidth = IMG_WIDTH;
		swipeContext.widthRatio = widthRatio;
		swipeContext.wType = widgetModel.wType;
        
        if (widgetModel.focusedindex) {
            if (widgetModel.wType === "Segment") 
                swipeContext.currentPage = widgetModel.focusedindex - IndexJL;
            else 
                swipeContext.currentPage = Math.ceil(widgetModel.focusedindex / widgetModel.recperpage) - IndexJL;
        }
        else {
            swipeContext.currentPage = 0;
			
        }
        
        $KW.touch.scrollImages(imgsElement, swipeContext.imageWidth * swipeContext.currentPage, $KU.swipeDuration, true);
        $KW.touch.updatePageIndicator(swipeElement, swipeContext, widgetModel);
        
    },
	
	updateFocusedIndex: function(widgetModel, dir)
	{
		// Update focused index n focused item in the model and excute ongesture for seg
        widgetModel.focusedindex = widgetModel.swipeContext.currentPage + IndexJL;
		widgetModel.focuseditem = (widgetModel.data && widgetModel.data[widgetModel.focusedindex]) || (widgetModel.masterdata && widgetModel.masterdata[widgetModel.focusedindex]);
		
        if (dir && widgetModel.ongesture) {
			var ongestureEventHandler = $KU.returnEventReference(widgetModel.ongesture);
			var gesturecode = (dir == "next" ? 1 : (dir == "previous" ? 2 : -1));
            ongestureEventHandler.call(widgetModel,widgetModel, gesturecode);
		}
        
	},
	
    updatePageIndicator: function(touchContainerElement, swipeContext, widgetModel){
    
        var index = swipeContext.currentPage;		
        var navTable = kony.utils.getElementById(touchContainerElement.id + "_footer");
        if (navTable && navTable.childNodes[0]){		
            var row = navTable.childNodes[0];
            var cell = row.childNodes[0];
            var spans = cell.childNodes;
            for (var j = 0; j < spans.length; j++) 
			{
                var img = spans[j].childNodes[0];
				var src = (j == index) ? (widgetModel.pageondotimage ? widgetModel.pageondotimage : "whitedot.gif") : (widgetModel.pageoffdotimage ? widgetModel.pageoffdotimage : "blackdot.gif");				
				if(img.src && img.src.substring(img.src.lastIndexOf("/") + 1) == src)
					continue;
				img.src = $KU.getImageURL(src);
            }
        }
		(widgetModel.wType == "HStrip") && $KW.touch.updateArrows(touchContainerElement, swipeContext, widgetModel);
    },
	
	updateArrows: function(swipeElement, swipeContext, widgetModel){
		var arrows = swipeElement.childNodes[1];
		if(arrows){
			var leftImg = arrows.childNodes[0];
			var rightImg = arrows.childNodes[1];
			var noOfImgs = swipeElement.childNodes[0].childNodes.length;
			if(swipeContext.currentPage == IndexJL)
				leftImg.style.display = "none";
			else
				leftImg.style.display = "";
			if(swipeContext.currentPage == (IndexJL ? noOfImgs : noOfImgs - 1))
				rightImg.style.display = "none";
			else
				rightImg.style.display = "";	
		}
	
	},
	previousPage: function(src) {
		var wType = src.parentNode.getAttribute("wType");
		var widgetID = src.id.substr(0,src.id.lastIndexOf('_'));
		var node = (wType == "HStrip") ? src.parentNode.parentNode : document.getElementById(widgetID);
        var wModel = $KU.getModelByNode(node);
		var scroller = src.parentNode.parentNode.childNodes[1];
		var vScroll = src.childNodes[0].getAttribute("type") == "VImg" ? true : false;
		var sInstance = wModel.scrollInstance || $KG[scroller.id];
		if(sInstance) {
			var scrolle = scroller.childNodes[0];
			if(vScroll){
				var y = Math.abs(sInstance.y) < scroller.clientHeight ? 0 : (sInstance.y + scroller.clientHeight);
				sInstance.animateTo(0, y);
			}
			else{
				var x = Math.abs(sInstance.x) < scroller.clientWidth ? 0 : (sInstance.x + scroller.clientWidth);
				sInstance.animateTo(x, 0);
			}
        }
    },

    nextPage: function(src) {
	
		var wType = src.parentNode.getAttribute("wType");
		var widgetID = src.id.substr(0,src.id.lastIndexOf('_'));
		var node = (wType == "HStrip") ? src.parentNode.parentNode : document.getElementById(widgetID);
        var wModel = $KU.getModelByNode(node);
		var scroller = src.parentNode.parentNode.childNodes[1];
		var vScroll = src.childNodes[0].getAttribute("type") == "VImg" ? true : false;
		var sInstance = wModel.scrollInstance || $KG[scroller.id];
		if(sInstance) {
			var scrolle = scroller.childNodes[0];
			scrolle.style[vendor + 'Transition'] = "-" + vendor + "-transform " + "0.5s ";
			if(vScroll){
				var delta = scrolle.clientHeight - Math.abs(sInstance.y) - scroller.clientHeight;
				var y = delta < scroller.clientHeight ? (sInstance.y - delta) : (sInstance.y - scroller.clientHeight);
				sInstance.animateTo(0, y);
			}
			else{
				var delta = scrolle.clientWidth - Math.abs(sInstance.x) - scroller.clientWidth;
				var x = delta < scroller.clientWidth ? (sInstance.x - delta) : (sInstance.x - scroller.clientWidth);
				sInstance.animateTo(x, 0);
			}
        }       
    },

    fadeHImages: function(boxModel){
	
		var style = "display:none;";
		var leftSrc = $KU.getImageURL(boxModel.leftarrowimage);
		var rightSrc = $KU.getImageURL(boxModel.rightarrowimage);
		var wID = boxModel.pf + "_" + boxModel.id;

		var str = "<div id='" + wID + "_scrollFades_H' class='scroll_view' wType='" + boxModel.wType + "'>" +
					"<div id='" + wID + "_leftimg' class='scroll_fades leftfade' style='" + style + "'" + (($KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9))  ? " onclick='$KW.touch.previousPage(this)'" : "") +
						"><img type='HImg' src='" + leftSrc + "' onload='$KW.touch.setHeight(this)' >" + 
					"</div>" +
					"<div id='" + wID + "_rightimg' class='scroll_fades rightfade' style='" + style + "'" + (($KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9)) ? " onclick='$KW.touch.nextPage(this)'" : "") + "><img type='HImg' src='" + rightSrc + "' onload='$KW.touch.setHeight(this)' >" + 
					"</div>" +
				"</div>";
        return str;
    },

    fadeVImages: function(boxModel){
	
		var style = "display:none;";
		var topSrc = $KU.getImageURL(boxModel.toparrowimage);
		var bottomSrc = $KU.getImageURL(boxModel.bottomarrowimage);
		var wID = boxModel.pf + "_" + boxModel.id;
		var str = "<div id='" + wID + "_scrollFades_V' class='scroll_view' style='height:inherit;' wType='" + boxModel.wType + "'>" + 
						"<div id='" + wID + "_topimg' class='scroll_fades topfade' style='" + style + "'" + (($KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9))  ? " onclick='$KW.touch.previousPage(this)'" : "") +
							"><img type='VImg' src='" + topSrc + "' onload='$KW.touch.setHeight(this)' >" + 
						"</div>" +
						"<div id='" + wID + "_bottomimg' class='scroll_fades bottomfade' style='" + style + "'" + (($KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9)) ? " onclick='$KW.touch.nextPage(this)'" : "") + 
							"><img type='VImg' src='" + bottomSrc + "' onload='$KW.touch.setHeight(this)' >" + 
						"</div>" +
					"</div>";
		return str;
	},

	setHeight: function(src)
	{
		var parentDiv = src.parentNode;
		src.naturalHeight = src.naturalHeight || src.height;
		src.naturalWidth = src.naturalWidth || src.width;
		parentDiv.style.height = src.naturalHeight + "px";
		parentDiv.style.width = src.naturalWidth + "px";
		var type = src.getAttribute("type");
		if(type == 'HImg')
			parentDiv.style.top = Math.floor((parentDiv.parentNode.offsetHeight - src.naturalHeight) / 2) + "px";		
		else
			parentDiv.style.left = Math.floor((parentDiv.parentNode.offsetWidth - src.naturalWidth) / 2) + "px";
	},
    
    orientationHandler: function(formId, orientation, widgetType)
	{
       	var swipeElements = document.querySelectorAll("#" + formId + " div[name='touchcontainer_" + widgetType + "']");
        var platform = $KU.getPlatform().name;
		for (var i = 0; i < swipeElements.length; i++) 
		{
			var swipeElement = swipeElements[i];
			var id = swipeElement.id;
			var widgetModel = $KU.getModelByNode(swipeElement);
			var swipeContext = widgetModel.swipeContext;
			
			if (!swipeContext) 
				continue;
			
			var imgsElement = swipeElement.children[0];
			// Retrieve the Individual Images pages of the imagestrip
			var individualImages = imgsElement.children;
			var noOfSwipePages = individualImages.length;
			if (noOfSwipePages > 0) 
			{
				imgsElement.style.width = noOfSwipePages * 100 + "%";
				var IMG_WIDTH = 0;
				
				/**
				 * First set all the images to display none except the current Image /Page. This is done
				 * to avoid flickering while performing the width calculations on change in the orientation.
				 */
				for (var j = 0; j < individualImages.length; j++) 
				{
					if (j != (swipeContext.currentPage + 1)) 
					{
						individualImages[j].style.display = "none";
					}
					
				}
				
				var pageWidthInLandScape = screen.height * swipeContext.widthRatio + 'px';
				var pageWidthInPortrait = screen.width * swipeContext.widthRatio + 'px';

				
				for(var k = 0; k < individualImages.length; k++) 
				{
					if(platform == "android" || platform == "blackberry")
					{
						if (orientation === "landscape") 
							individualImages[k].style.width = pageWidthInPortrait;
						else if (orientation === "portrait") 
							individualImages[k].style.width = pageWidthInPortrait;
					}
					else 
					{
						if (orientation === "landscape") 
							individualImages[k].style.width = pageWidthInLandScape;
						else if (orientation === "portrait") 
							individualImages[k].style.width = pageWidthInPortrait;
					}
				}
				
				IMG_WIDTH = individualImages[0].parentNode.clientWidth / noOfSwipePages;
				swipeContext.imageWidth = IMG_WIDTH;
				swipeElement.setAttribute("imageWidth", IMG_WIDTH);
				
				if (swipeContext.currentPage === (noOfSwipePages - 1)) 
				{
					$KW.touch.previousImage(swipeElement, swipeContext, true);
					$KW.touch.nextImage(swipeElement, swipeContext, true);
				}
				else 
				{
					$KW.touch.nextImage(swipeElement, swipeContext, true);
					$KW.touch.previousImage(swipeElement, swipeContext, true);
				}
				
				for (var j = 0; j < individualImages.length; j++) 
				{
					individualImages[j].style.display = "inline";
				}
			}
		}
    },
	
	/*
     *  Get the previous Page
     */
    previousImage : function(touchContainerElement, swipeContext, orientationChanged)
    {
        var imgsElement = touchContainerElement.children[0];        
        swipeContext.currentPage = Math.max(swipeContext.currentPage-1, 0);
        $KW.touch.scrollImages(imgsElement, swipeContext.imageWidth * swipeContext.currentPage, $KU.swipeDuration, orientationChanged);
    },

    /*
     * Get the Next Page
     */
    nextImage : function(touchContainerElement, swipeContext, orientationChanged)
    {
        var elem = touchContainerElement.children[0];
        var noOfSwipePages = elem.children.length;
        swipeContext.currentPage = Math.min(swipeContext.currentPage+1, noOfSwipePages-1);
        $KW.touch.scrollImages( elem,swipeContext.imageWidth * swipeContext.currentPage, $KU.swipeDuration, orientationChanged);
    },
	
	/*
     * Scroll Images given the distance, duration and the orentation flag.
     */
    scrollImages: function(elem, distance, duration, isOriented, isTabContext)
	{
        if (!isOriented)
            elem.style[vendor + 'Transition'] = "-" + vendor + "-transform " + (duration / 1000).toFixed(1) + "s ";
        else
            elem.style[vendor + 'Transition'] = "-" + vendor + "-transform 0 0";
		
        //inverse the number we set in the css
        var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
		elem.style[vendor + 'Transform'] = translateOpen + value + "px,0" + translateClose;
    },
	
	navigationDotsHandler: function(src)
	{
		var index = parseInt(src.getAttribute("index"), 10);

		var segment = src.parentNode.parentNode.parentNode.previousSibling;	
		if (segment) 
		{
			var widgetModel = $KU.getModelByNode(segment);
			if(widgetModel){
			var swipeContext = widgetModel.swipeContext;
			var imgsElement = segment.children[0];
			swipeContext.currentPage = parseInt(index) - IndexJL;
			$KW.touch.scrollImages(imgsElement, swipeContext.imageWidth * swipeContext.currentPage, $KU.swipeDuration, false);
			$KW.touch.updatePageIndicator(segment, swipeContext, widgetModel);
			widgetModel.selectedRows = (IndexJL) ? [null, [null, IndexJL, index]] : [[IndexJL, index]];
			$KW.Segment.setSelectedItemsAndIndices(widgetModel);
			}else{
				var tabpane = src.parentNode.parentNode.parentNode.parentNode;
				var tabPaneModel = $KU.getModelByNode(tabpane);
				var swipeContext = tabPaneModel.swipeContext;
				var imgsElement = tabpane.children[1].children[0];
				swipeContext.currentPage = parseInt(index) - IndexJL;
				tabPaneModel.activetab = swipeContext.currentPage;	
				tabPaneModel.activetabs[IndexJL] = tabPaneModel.activetab;
				$KW.touch.scrollImages(imgsElement, swipeContext.imageWidth * swipeContext.currentPage, $KU.swipeDuration, false);
				$KW.touch.updatePageIndicator(tabpane, swipeContext, tabPaneModel);
				
			}
		}
	},
	
	TouchContext: function()
	{
		
	},
		
	preventDefault: function (e) { kony.events.preventDefault(e);}
}

/* Touch directions */
$KW.touch.TouchContext.UP = "UP";
$KW.touch.TouchContext.DOWN = "DOWN";
$KW.touch.TouchContext.LEFT = "LEFT";
$KW.touch.TouchContext.RIGHT = "RIGHT";


/* Segment Pageview */
$KW.touch.pageviewScroller = function(element, options)
{
	this.element = element;
	
	// Attach events

    if('ontouchstart' in window)
        kony.events.addEventListener(element, "touchstart", this, false);
	else if($KU.isPointerSupported) {
		if("onpointerdown" in window) 
        	kony.events.addEventListener(element, "pointerdown", this, false);
        else
			kony.events.addEventListener(element, "MSPointerDown", this, false);
	}        
    else
    {
		kony.events.addEventListener(element, "mousedown", this, false);
		
		//kony.events.addEventListener(element, "mouseout", this, false);
    }

	// orientation handled globally, also take care of resize
	/*
	if($KU.isOrientationSupported && !$KU.isAndroid)
		kony.events.addEventListener(window, "orientationchange", this, false); 
	else
		kony.events.addEventListener(window, "resize", this, false);
	*/
	
	this.widgetModel = options.widgetModel;
}

$KW.touch.pageviewScroller.prototype = 
{
	// Handle events
	handleEvent: function (e)
	{
		switch(e.type)
		{
			case "touchstart":
			case "mousedown":
			case "MSPointerDown":
			case "pointerdown":
				this.onTouchStart(e);
				break;
			case "touchmove": 
			case "mousemove": 
			case "MSPointerMove":
			case "pointermove":
				this.onTouchMove(e); 
				break;
			case "touchend":
			case "touchcancel":
			case "mouseup":
			case "MSPointerUp":
			case "MSPointerCancel":
			case "pointerup":
			case "pointercancel":			
				this.onTouchEnd(e); 
				break;
			case 'mouseout':
				this.onMouseOut(e);
				break;
		}
	},

	// Handle mousedown / touchstart
	onTouchStart: function(event)
	{
		//kony.print("pageviewScroller onTouchStart");
		
		var touch = event.touches && event.touches[0] || event;
		if($KU.isTouchSupported)
		{
			kony.events.addEventListener(this.element, "touchmove", this, false);
			kony.events.addEventListener(this.element, "touchend", this, false);
			kony.events.addEventListener(this.element, "touchcancel", this, false);
		}
		else if($KU.isPointerSupported)
		{
			if("onpointerdown" in window) {
				kony.events.addEventListener(this.element, "pointermove", this, false);
				kony.events.addEventListener(this.element, "pointerup", this, false);
				kony.events.addEventListener(this.element, "pointercancel", this, false);	
			}
			else {
				kony.events.addEventListener(this.element, "MSPointerMove", this, false);
				kony.events.addEventListener(this.element, "MSPointerUp", this, false);
				kony.events.addEventListener(this.element, "MSPointerCancel", this, false);
			}
		}	
		else
		{
			kony.events.addEventListener(this.element, "mousemove", this, false);
			kony.events.addEventListener(this.element, "mouseup", this, false);
			kony.events.addEventListener(this.element, "mouseout", this, false);
		}
		
		// Save start coods
		this.x = this.lastx = this.startX = touch.pageX;
		this.y = this.lasty = this.startY = touch.pageY;
		
		var swipeContext = this.widgetModel.swipeContext;
		if(!swipeContext) 
		{
            swipeContext = new Object();
            swipeContext.imageWidth = this.element.getAttribute("imageWidth");
            swipeContext.widthRatio = this.element.getAttribute("ratio");
			swipeContext.currentPage = 0;
        }   
	},

	// Handle mousemove / touchmove
	onTouchMove: function(event)
	{
		//kony.print("pageviewScroller onTouchMove");
		
		var touch = event.touches && event.touches[0] || event;
		var newX = touch.pageX;
		var newY = touch.pageY;

		/*
		var deltaX = newX - this.x;
		var deltaY = newY - this.y;	
		*/
		
		var deltaX = newX - this.startX;
		var deltaY = newY - this.startY;
		this.lastx,this.lasty = this.x,this.y;
		this.x = newX;
		this.y = newY;

		var direction = $KU.getSwipeDirection(deltaX, deltaY);
		var distance = $KU.getDistanceMoved(deltaX, deltaY);
		var imgsElement = this.element.children[0];
		var swipeContext = this.widgetModel.swipeContext;
		
		if($KG["nativeScroll"])
		{
			// Disabling hscroll on strip when scrolling vertically; Disabling vscroll on form when scrolling horizontally
			if(Math.abs(deltaX) >= Math.abs(deltaY))
				kony.events.preventDefault(event);
			else
				return;
		}
		else
			kony.events.preventDefault(event);
			
		
		
		if(direction == $KW.touch.TouchContext.LEFT) 
            $KW.touch.scrollImages(imgsElement, (swipeContext.imageWidth * swipeContext.currentPage) + distance, 0);
        else if (direction == $KW.touch.TouchContext.RIGHT) 
            $KW.touch.scrollImages(imgsElement, (swipeContext.imageWidth * swipeContext.currentPage) - distance, 0);
		
		$KW.touch.updateFocusedIndex(this.widgetModel);
	},

	onTouchEnd: function(event)
	{
		//kony.print("pageviewScroller onTouchEnd");
		this.detachEvents();
		var touch = event.changedTouches && event.changedTouches[0] || event;

		var newX = touch.pageX;
		var newY = touch.pageY;

		//kony.print("newX: " + newX);
		//kony.print("newY: " + newY);
		
		/*
		var deltaX = newX - this.x;
		var deltaY = newY - this.y;
		*/
	
		var deltaX = newX - this.lastx;
		var deltaY = newY - this.lasty;
		

		var swipeContext = this.widgetModel.swipeContext;
		var dir;
		//var direction = $KU.getSwipeDirection(deltaX, deltaY);
		
		//if(direction == $KW.touch.TouchContext.LEFT) 
		if(deltaX <= -7) 
		{
            $KW.touch.nextImage(this.element, swipeContext, false);
            dir = "next";
		}
        //else if (direction == $KW.touch.TouchContext.RIGHT)
	        else if (deltaX >= 7)
		{
            $KW.touch.previousImage(this.element, swipeContext, false);
            dir = "previous";
		}
		$KW.touch.updatePageIndicator(this.element, swipeContext, this.widgetModel);
		$KW.touch.updateFocusedIndex(this.widgetModel, dir);
        
        if(dir){
			if(this.widgetModel.wType == "Segment" && this.widgetModel.viewType == constants.SEGUI_VIEW_TYPE_PAGEVIEW){
				this.widgetModel.onswipe && this.widgetModel.onswipe(this.widgetModel, -1, this.widgetModel.focusedindex, this.widgetModel.selectedState); // for onswipe callback for pageView segment
			}else{
				this.widgetModel.onswipe && this.widgetModel.onswipe(this.widgetModel); // Change the return variable from widgetModel if necessary.
            }
		}
	},

	
	detachEvents: function()
	{
		// Detach events
		if($KU.isTouchSupported)
		{
			kony.events.removeEventListener(this.element, "touchmove", this, false);
			kony.events.removeEventListener(this.element, "touchend", this, false);
			kony.events.removeEventListener(this.element, "touchcancel", this, false);
		}		
		else if($KU.isPointerSupported)
		{
			if("onpointerdown" in window) {
				kony.events.removeEventListener(this.element, "pointermove", this, false);
				kony.events.removeEventListener(this.element, "pointerup", this, false);
				kony.events.removeEventListener(this.element, "pointercancel", this, false);
			}else {
				kony.events.removeEventListener(this.element, "MSPointerMove", this, false);
				kony.events.removeEventListener(this.element, "MSPointerUp", this, false);
				kony.events.removeEventListener(this.element, "MSPointerCancel", this, false);			
			}

		}
		else
		{
			kony.events.removeEventListener(this.element, "mousemove", this, false);
			kony.events.removeEventListener(this.element, "mouseup", this, false);
			kony.events.removeEventListener(this.element, "mouseout", this, false);
		}
	},
	
	onMouseOut: function(event)
	{
		this.onTouchEnd(event);
	},
	
	destroy: function ()
	{
		// Remove the event listeners
		if(this.element)
		{
			if($KU.isTouchSupported)
			{
				kony.events.removeEventListener(this.element, "touchstart", this, false);
				kony.events.removeEventListener(this.element, "touchcancel", this, false);
			}			
			else if($KU.isPointerSupported)
			{
				if("onpointerdown" in window) {				
					kony.events.removeEventListener(this.element, "pointerdown", this, false);
					kony.events.removeEventListener(this.element, "pointercancel", this, false);	
				}else {
					kony.events.removeEventListener(this.element, "MSPointerDown", this, false);
					kony.events.removeEventListener(this.element, "MSPointerCancel", this, false);			
				}
			}
		
			else
			{
				kony.events.removeEventListener(this.element, "mousedown", this, false);
				kony.events.removeEventListener(this.element, "mouseout", this, false);				
			}
		}
	}
	
	// Refresh when window is resized / orientation is changed
	/*
	orientationHandler: function (event) 
	{
		var orientation = window.orientation;
        switch(orientation)
        {
            case 0:
				orientation = "portrait";
				break;
            case 180:
				orientation = "portrait";
				break;
            case 90:
				orientation = "landscape";
				break;
            case -90:
				orientation = "landscape";
				break;
        }
	
    	var widgetType = this.widgetModel.wType;
		var swipeContext = this.widgetModel.swipeContext;
		$KW.touch.orientationHandler(orientation, widgetType, swipeContext)
	},
	*/
	
	


}

/**************************/
/* Scroller */
/**************************/

$KW.touch.konyScroller = function(el, options)
{
    var that = this;
    that.wrapper = document.getElementById(el);
	var widgetModel = options.widgetModel;
	that.scroller = that.wrapper.children[0];
    //that.wrapper = that.scroller.parentNode;

    // Default options
    that.options = {
        hScroll: false,
        vScroll: false,

        // scrollbar options
        hScrollbar: false,
        vScrollbar: false,
        bounce: true,
        hBounce:true,
        vBounce:true,
		
        fixedScrollbar: !$KU.isIDevice,  // Set true for Android
        hideScrollbar: true,
        fadeScrollbar: $KU.isIDevice && $KU.has3d,
        scrollbarClass: '',
		checkDOMChanges: false,		// Set true to listen to DOM changes

        useTransform: true,  // Set useTransform to false if the form contains input / select
		
		x: 0,
		y: 0,
		topOffset: 0,
		bottomOffset: 0,

       // Events
        onBeforeScrollStart: function (e) { /* kony.events.preventDefault(e); */ },
		onRefresh: null,
		onScrollStart: null,
		onScrollMove: null,
		onScrollEnd: null
    };

    // Overwrite with user defined options
    for (var i in options) that.options[i] = options[i];

	// Set starting position
	that.x = that.options.x;
	that.y = that.options.y;
	that.pullDownOffset = that.options.topOffset || 0;
	that.pullUpOffset = that.options.bottomOffset || 0;
    /* Sumanth: Added vBounce and hbounce for flexscrollcontainer. for other scrollboxs it will use bounce option only and only for flex it will consider hbounce and vbounce options.*/
    that.options.hBounce = that.options.bounce ? (typeof options.hBounce === "undefined" ? true : options.hBounce) : false;
    that.options.vBounce = that.options.bounce ? (typeof options.vBounce === "undefined" ? true : options.vBounce) : false;
		
    that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
    that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
	
	that.options.useTransform = $KU.hasTransform ? that.options.useTransform : false;

    // Set some default styles

    that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? ("-" + vendor + '-transform')  : 'top left';
    that.scroller.style[vendor + 'TransitionDuration'] = '0';
    that.scroller.style[vendor + 'TransformOrigin'] = '0 0';

    //that.scroller.style[vendor + 'Transform'] = translateOpen + "0,0" + translateClose;

    if (that.options.useTransform)
	{
        that.scroller.style[vendor + 'Transform'] = translateOpen +  (that.x - (that.options.hScroll? that.pullDownOffset : 0)) + "px," + (that.y - (that.options.vScroll? that.pullDownOffset : 0)) + "px" + translateClose;
		if(!that.options.scrollbox)
			that.scroller.style.position = "absolute";
	}
    else{
        //that.scroller.style.cssText += ';position:absolute;top:0;xleft:0';
		
		that.scroller.style.cssText += ';position:absolute;top:' + (that.y - (that.options.vScroll? that.pullDownOffset : 0)) + 'px;left:' + (that.x - (that.options.hScroll? that.pullDownOffset : 0)) + 'px';
	}	
    that.refresh();

	if(that.options.showImages)
	{
		//if(that.options.vScroll) //Not required here..Needs to be called once the height is set
			//that.toggleVFadeImgs();
		if(that.options.hScroll)
			that.toggleFadeImgs();
	}
	

	// Disable touchmove on form
	var isPopup = that.wrapper.getAttribute("kformname");
	if(!isPopup && !that.options.scrollbox)
		kony.events.addEventListener(document, 'touchmove', $KW.touch.preventDefault);

	// Attach events
    if(!that.options.disableUserScroll)
	{
		if($KU.isTouchSupported)  // 'ontouchstart' in window
			kony.events.addEventListener(that.scroller, "touchstart", that, false);
		else if($KU.isPointerSupported) {
			if("onpointerdown" in window) {
				kony.events.addEventListener(that.scroller, "pointerdown", that, false);
			}else {
				kony.events.addEventListener(that.scroller, "MSPointerDown", that, false);			
			}
		}				
		else
		{
			kony.events.addEventListener(that.scroller, "mousedown", that);
			kony.events.addEventListener(that.scroller, "mouseout", that);
		}
    }

	if($KU.isOrientationSupported && !$KU.isAndroid)
		kony.events.addEventListener(window, "orientationchange", that, false); 
	else{
		kony.events.addEventListener(window, "resize", that);
	}	
		
	if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
		that._checkDOMChanges();
	}, 1000);
};

$KW.touch.konyScroller.prototype = 
{
    x: 0,
    y: 0,
    steps: [],
    aniTime: null,
	
	_checkDOMChanges: function () 
	{
		var scroller = document.getElementById(this.scroller.id);
		if(scroller === null){
			return;
		}
		//if(this.options.hScroll == true) //Need to adjust width when the widgets are removed in horizontal scrollbox.
			//scroller.style.width = "auto";
		var contentHeight, contentWidth;	
		var wModel = this.options.widgetModel;
		var wType = wModel.wType;
		var formAsFlex = ((wType == 'Form' || wType == 'Popup') && wModel.layouttype != kony.flex.VBOX_LAYOUT);
		if(formAsFlex){
			var formNode = document.getElementById(wModel.id);
			contentHeight = formNode.scrollHeight;
			contentWidth = formNode.scrollWidth;
		}	
		else if(wType == 'FlexScrollContainer'){
			contentHeight = scroller.childNodes[0].scrollHeight;
			contentWidth = scroller.childNodes[0].scrollWidth;
		}
		else{
			contentHeight = scroller.offsetHeight;
			contentWidth = scroller.offsetWidth;
		}
		
		if (this.moved || this.animating || (this.scrollerW == contentWidth * 1 && this.scrollerH == contentHeight * 1)) 
			return;
			
		if(this.options.hScroll == true){
			if (formAsFlex || wType == 'FlexScrollContainer'){
				scroller.style.width = (contentWidth / scroller.parentNode.offsetWidth) * 100 + "%";
			}
			else
				scroller.style.width = (scroller.scrollWidth / scroller.parentNode.offsetWidth) * 100 + "%"; //onorientation change
			//scroller.style.width = scroller.scrollWidth + "px";
		}	
		
		if(this.options.vScroll == true){
			if (formAsFlex || wType == 'FlexScrollContainer'){
				scroller.style.height = contentHeight + "px";
			}
		}		
		this.refresh();
	},
	
	// Resets scroller to initial values (0)
	refresh: function()
	{
		var that = this;

		if(this.refreshDisabled)
			return;
		
		//that.wrapper = that.scroller.parentNode;
		that.wrapperW = that.wrapper.clientWidth || 1;
		that.wrapperH = that.wrapper.clientHeight || 1;

		that.minScrollY = that.options.vScroll ? -that.pullDownOffset: 0;
		that.maxBiasY = that.options.vScroll ? -that.pullUpOffset: 0;
		that.minScrollX = that.options.hScroll ? -that.pullDownOffset: 0;
		that.maxBiasX = that.options.hScroll ? -that.pullUpOffset: 0;

		//that.scrollerW = Math.round(that.scroller.offsetWidth);
		that.scrollerW = Math.round(that.minScrollX  + that.scroller.scrollWidth + that.maxBiasX);
		//that.scrollerH = Math.round(that.scroller.offsetHeight + that.minScrollY);
		that.scrollerH = Math.round(that.minScrollY + that.scroller.scrollHeight +  + that.maxBiasY);
		
		var wModel = that.options.widgetModel;
		var right = 0;
		var bottom = 0;
		var parentFrame = wModel.frame;
		//Respecting right & bottom for last widget if it is in FlexScrollContainer
		if(wModel.wType == 'FlexScrollContainer' && parentFrame){
			var widgets = wModel.widgets();
			if(widgets.length > 0){
				var lastWidget = widgets[widgets.length - 1];
				if(wModel.layouttype == kony.flex.FLOW_HORIZONTAL){
					var valueObj = $KW.FlexLayoutEngine.getComputedValue(lastWidget, parentFrame, lastWidget.right, 'x');
					if(valueObj)
						right = $KU.getValueByParentFrame(lastWidget, valueObj, 'x');
				}	
				if(wModel.layouttype == kony.flex.FLOW_VERTICAL){
					var valueObj = $KW.FlexLayoutEngine.getComputedValue(lastWidget, parentFrame, lastWidget.bottom, 'y');
					if(valueObj)
						bottom = $KU.getValueByParentFrame(lastWidget, valueObj, 'y');
				}
			}	
		}
			
		that.maxScrollX = (that.wrapperW - that.scrollerW) + that.minScrollX - right;
		that.maxScrollY = (that.wrapperH - that.scrollerH) + that.minScrollY - bottom;

		that.dirX = 0;
		that.dirY = 0;

		if (that.options.onRefresh) that.options.onRefresh.call(that);
		
		that.hScroll = that.options.hScroll && that.maxScrollX < 0;
		that.vScroll = that.options.vScroll && (!that.hScroll || that.scrollerH > that.wrapperH);

		that.hScrollbar = that.hScroll && that.options.hScrollbar;
		that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

		var offset = that._offset(that.wrapper);
		that.wrapperOffsetLeft = -offset.left;
		that.wrapperOffsetTop = -offset.top;

		that.scroller.style[$KU.vendor + 'TransitionDuration'] = '0';
		
		// Prepare scrollbars
		that._scrollbar('h');
		that._scrollbar('v');

		
		//alert("b4 reset");
		that._resetPos(200);
		
		if(that.options.showImages){
			if(that.options.vScroll)
				that.toggleVFadeImgs();
			if(that.options.hScroll)
				that.toggleFadeImgs();
		}
	},

	// Handle events - outsourced to get context
	handleEvent: function (e)
	{
		var that = this;
		// Reset the idle Time Out if the app has been set for it.
		if($KG["__idletimeout"] && $KG["__idletimeout"].enabled) {
			$KI.appevents.resettimer();
		}
		
		// Fix for select jump issue on iPhone - Uncomment when useTransform is used in a form containing selects
		/*
		if(e.target.tagName == "SELECT")
		{
			if(!that.transformed)
			{
			
				var matrix = getComputedStyle(that.scroller)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
				
				//console.warn("1: " + matrix.toString());
				//console.warn("11" + that.scroller.style[vendor + 'Transform']);
				
				that.transformed = true;
				
				that.scroller.style[vendor + 'Transform'] = "none";
				that.scroller.style.left = parseInt(matrix[4], 10) + "px";
				that.scroller.style.top = parseInt(matrix[5], 10) + "px";
			}
			return;
		}
		else
		{
			if(that.transformed)
			{
				that.transformed = false;
				//console.warn(that.matrix[4]);
				//console.warn(that.matrix[5]);

				var left = that.scroller.style.left;
				var top  = that.scroller.style.top;
				
				//console.warn("that.scroller.style.left: " + that.scroller.style.left);
				//console.warn("that.scroller.style.top: " + that.scroller.style.top);
				
				that.scroller.style[vendor + 'Transform'] = translateOpen + left + "," + top + ",0" + translateClose ;

				// Reset left, top
				// TODO: fix slight jerky effect
				that.scroller.style.left  = 0;
				that.scroller.style.top =  0;

			}
		}
		*/
		
		if($KG.activeInput && $KG.appbehaviors.disableScrollOnInputFocus == true && e.type != 'resize')
			return;
			
		// Enable angular direction for imgstrip
		if(e.type!= "orientationchange" && e.type!= "resize")
		{
			//kony.print("e.target.getAttribute('kwidgettype') :" + e.target.getAttribute("kwidgettype"));
		if(e && e.target && e.target.getAttribute && (e.target.getAttribute("kwidgettype") == "Khstrip" || e.target.getAttribute("kwidgettype") == "ScrollBox"))
				this.angularDirection = true;
		}
		else
			this.angularDirection = false;
		
		switch(e.type)
		{
			case "touchstart":
			case "mousedown":
			case "MSPointerDown":
			case "pointerdown":
				that.onTouchStart(e);
				break;
			case "touchmove": 
			case "mousemove":
			case "MSPointerMove":	
			case "pointermove":	
				that.onTouchMove(e); 
				break;
			case "touchend":
			case "touchcancel":
			case "mouseup":
			case "MSPointerUp":
			case "MSPointerCancel":
			case "pointerup":
			case "pointercancel":			
				that.onTouchEnd(e); 
				break;
			case 'mouseout':
				that.onMouseOut(e);
				break;
			case 'orientationchange':
			case 'resize':
				that.resize(e); break;
		}
	},

	// Refresh when window is resized / orientation is changed
	resize: function () 
	{
		var that = this;
		if(!that.options.scrollbox)
		{
			$KW.Scroller.setHeight(that.options.formid);
			//In ipad mini, after orientation change top level element in form is scrolled up by the browser.
			if(!$KG["nativeScroll"] && $KU.isIOS7){
				window.scrollTo(0, 0);
				if($KG["__currentForm"])
					$KU.getElementById($KG["__currentForm"].id + "_container").style.height = "100%";
				var formModel = window[that.options.formid];
				formModel && $KW.Scroller.setSLWHeight(formModel, that.wrapper, true);
			}
		}
		setTimeout(function () { that.refresh(); }, $KU.isAndroid ? 200 : 0);
		if($KU.isAndroid && !$KU.isTablet && !that.options.scrollbox){
			window.clearTimeout(that.resizeTimeoutId);
			that.resizeTimeoutId = setTimeout(function(){
				if(document.activeElement){
					var inputModel = $KU.getModelByNode(document.activeElement);
					if(inputModel && (inputModel.wType == "TextField" || inputModel.wType == "TextArea")){
						var winNewHeight = $KU.getWindowHeight();
						var screenHeight = $KU.getPlatformVersion("android").startsWith("2") ? window.outerHeight : screen.height;
						if($KG["__orientation"] == "landscape" && screenHeight - winNewHeight < 100) //Don't scroll when the keypad is closed by back key and input has focus
							return;
						if($KG['__innerHeight'] >= winNewHeight){
							setTimeout(function() {							
								that.refresh();
								that.scrollToElement(document.activeElement, 200);
							}, 100);
						}
						else
							that.refresh();
					}
				}
			}, $KU.orientationDelay);
		}	
	},

	// Handle mousedown / touchstart - _start
	onTouchStart: function(event)
	{
		var targetWidget = event.target || event.srcElement;
		targetWidget = $KU.getParentByAttribute(targetWidget, kony.constants.KONY_WIDGET_TYPE);
		if(targetWidget){
			var pf = $KU.getContainerForm(targetWidget) || (targetWidget.getAttribute && targetWidget.getAttribute("kformname"));
			if ($KW.Popup && $KW.Popup.dismissPopup(pf)) 
				return;
		}	
	   //kony.print("konyScroller onTouchStart");
		var touch = event.touches && event.touches[0] || event;
		$KG.disableViewPortScroll && $KU.setPointerEvents(event.srcElement, "auto");
		if(this.options.scrollbox)
         {
			kony.events.ontouchstartHandler(event);
             if(!this.options.HStrip && (typeof this.options.bubbleEvents == "undefined" ||
                                         !this.options.bubbleEvents))
				kony.events.stopPropagation(event); //Avoiding the bubbling of event to form when multiple scrollboxes are placed with in scrollbox
         }
		//if (this.options.onBeforeScrollStart && ((touch.pageY < 0 && this.y < this.minScrollY) || (touch.pageY > 0 && this.y > this.maxScrollY)))
		if(this.options.onBeforeScrollStart)
			this.options.onBeforeScrollStart.call(this, event);

		this.extendTouchStart(touch);
        this.dragging =false;
        this.tracking =true;
        
	},

	// Handle mousemove / touchmove
	onTouchMove: function(event)
	{
        this.dragging = true;
        this.tracking = true;
		//kony.print("konyScroller onTouchMove");
		
		var touch = event.touches && event.touches[0] || event;
		$KG.disableViewPortScroll && $KU.setPointerEvents(event.srcElement, "none");
		if(this.options.scrollbox)
			kony.events.ontouchmoveHandler(event);
		this.extendTouchMove(touch,event);
	},

	onTouchEnd: function(event)
	{
        this.dragging = false;
        this.tracking = false;
		//kony.print("konyScroller onTouchEnd");
		var touch = event.touches && event.touches[0] || event;
		this.extendTouchEnd(touch);
	},

	onMouseOut: function(e)
	{
		var t = e.relatedTarget || e.srcElement;
		if (!t) {
			this.onTouchEnd(e);
			return;
		}
		while (t = t.parentNode) if (t == this.wrapper) return;

		this.onTouchEnd(e);
	},

	extendTouchStart: function(touch)
	{
		
		// Reset all
		this.moved = false;
		this.animating = false;
		this.distX = 0;
		this.distY = 0;
		this.absDistX = 0;
		this.absDistY = 0;

		var x,y;

		if (this.options.useTransform)
		{
			// Alternative to CSSMatrix - a 2x2 transformation matrix
			// matrix(m11, m12, m21, m22, tX, tY)  :: tX, tY - translation elements.
			var matrix = getComputedStyle(this.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
			x = matrix[4] * 1;		// to int
			y = matrix[5] * 1;
		}
		else
		{
			x = getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
			y = getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
		}

		this.startX = this.x;
		this.startY = this.y;

		// Save start coods
		this.pointX = touch.pageX;
		this.pointY = touch.pageY;

		this.startTime = new Date().valueOf();

		//if (this.options.onScrollStart) this.options.onScrollStart.call(this, e);
		
		if($KU.isTouchSupported)
		{
			kony.events.addEventListener(this.scroller, "touchmove", this, false);
			kony.events.addEventListener(this.scroller, "touchend", this, false);
			kony.events.addEventListener(this.scroller, "touchcancel", this, false);
		}	
		else if($KU.isPointerSupported)
		{
			if("onpointerdown" in window) {
				kony.events.addEventListener(window, "pointermove", this, false);
				kony.events.addEventListener(window, "pointerup", this, false);
				kony.events.addEventListener(window, "pointercancel", this, false);				
			}else {
				kony.events.addEventListener(window, "MSPointerMove", this, false);
				kony.events.addEventListener(window, "MSPointerUp", this, false);
				kony.events.addEventListener(window, "MSPointerCancel", this, false);
			}
		}
		else
		{
			kony.events.addEventListener(this.scroller, "mousemove", this, false);
			kony.events.addEventListener(this.scroller, "mouseup", this, false);
			//kony.events.addEventListener(this.scroller, "mouseout", this, false);
		}
		
		this.direction = "";
	},

	extendTouchMove: function(touch,event)
	{
	    event = event || touch;
		var	deltaX = touch.pageX - this.pointX,
		deltaY = touch.pageY - this.pointY,
		newX = this.x + deltaX,
		newY = this.y + deltaY,
		c1, c2,
		timestamp = new Date().valueOf();
		
		var direction = $KU.getSwipeDirection(deltaX, deltaY);
		// direction
		if(this.angularDirection)
		{
			//var direction = $KU.getSwipeDirection(deltaX, deltaY);
			if ((this.vScroll && (direction != $KW.touch.TouchContext.UP && direction != $KW.touch.TouchContext.DOWN)) || (this.hScroll && (direction != $KW.touch.TouchContext.LEFT && direction != $KW.touch.TouchContext.RIGHT)))
				return;
		}
		
       
        if((typeof this.options.bubbleEvents != "undefined" && this.options.bubbleEvents) 
			&& ( (this.vScroll && (direction == $KW.touch.TouchContext.UP || direction == $KW.touch.TouchContext.DOWN)) || 
				 (this.hScroll && (direction == $KW.touch.TouchContext.LEFT || direction == $KW.touch.TouchContext.RIGHT)) )
        ){
           
            kony.events.stopPropagation(event);
        }
        
		if($KG["nativeScroll"])
		{
			// Disabling hscroll on strip when scrolling vertically; Disabling vscroll on form when scrolling horizontally
			if(Math.abs(deltaX) >= Math.abs(deltaY))
				kony.events.preventDefault(touch);
			else
				return;
		}
		else
			kony.events.preventDefault(event);

		this.direction = direction;
		
		this.pointX = touch.pageX;
		this.pointY = touch.pageY;


		// Slow down if outside of the boundaries
		if (newX > this.minScrollX || newX < this.maxScrollX)
            newX = this.options.hBounce ? this.x + (deltaX / 2) : newX >= this.minScrollX || this.maxScrollX >= 0 ? this.minScrollX : this.maxScrollX;
		if (newY > this.minScrollY || newY < this.maxScrollY)
            newY = this.options.vBounce ? this.y + (deltaY / 2) : newY >= this.minScrollY || this.maxScrollY >= 0 ? this.minScrollY : this.maxScrollY;

		// Ignore if displacement is little
		if (this.absDistX < $KU.minTouchMoveDisplacement && this.absDistY < $KU.minTouchMoveDisplacement)
		{
			this.distX += deltaX;
			this.distY += deltaY;
			this.absDistX = Math.abs(this.distX);
			this.absDistY = Math.abs(this.distY);

			return;
		}

		// Lock direction
		if (this.absDistX > this.absDistY + 5)
		{
			newY = this.y;
			deltaY = 0;
		}
		else if (this.absDistY > this.absDistX + 5)
		{
			newX = this.x;
			deltaX = 0;
		}

		// TODO: In case of custom scroll and non-modal docked popup, alter top as well
		//popShop.style.top = 84 -43 + "px"
		
		this.moved = true;
		this.animateTo(newX, newY);

		if (timestamp - this.startTime > 300)
		{
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;
		}
		
		if (this.options.onScrollMove) this.options.onScrollMove.call(this, event);
	},

	extendTouchEnd: function(touch)
	{
		// Detach events
		if($KU.isTouchSupported)
		{
			kony.events.removeEventListener(this.scroller, "touchmove", this, false);
			kony.events.removeEventListener(this.scroller, "touchend", this, false);
			kony.events.removeEventListener(this.scroller, "touchcancel", this, false);
		}
		else if($KU.isPointerSupported)
		{
			if("onpointerdown" in window) {
				kony.events.removeEventListener(window, "pointermove", this, false);
				kony.events.removeEventListener(window, "pointerdown", this, false);
				kony.events.removeEventListener(window, "pointercancel", this, false);	
			}else {
				kony.events.removeEventListener(window, "MSPointerMove", this, false);
				kony.events.removeEventListener(window, "MSPointerDown", this, false);
				kony.events.removeEventListener(window, "MSPointerCancel", this, false);
			}
		}	
		else
		{
			kony.events.removeEventListener(this.scroller, "mousemove", this, false);
			kony.events.removeEventListener(this.scroller, "mouseup", this, false);
			//this.scroller.removeEventListener("mouseout", this, false);
		}
		
		var momentumX = {
			dist:0,
			time:0
		},
		momentumY = {
			dist:0,
			time:0
		},
		duration = (new Date().valueOf()) - this.startTime,
		newPosX = this.x,
		newPosY = this.y,
		newDuration;

		// direction
		var direction = $KU.getSwipeDirection(newPosX - this.startX, newPosY - this.startY);
		
		if(this.angularDirection)
		{
			//var direction = $KU.getSwipeDirection(newPosX - this.startX, newPosY - this.startY);
			if ((this.vScroll && (direction != $KW.touch.TouchContext.UP && direction != $KW.touch.TouchContext.DOWN)) || (this.hScroll && (direction != $KW.touch.TouchContext.LEFT && direction != $KW.touch.TouchContext.RIGHT)))
				return;
		}
		
		this.direction = direction;
		
		// Calculate the momentum / friction for motion after user releases finger
		if (duration < 300)
		{
			//momentumX = newPosX ? this._momentum(newPosX - this.startX, duration, -this.x, this.scrollerW - this.wrapperW + this.x - this.minScrollX, this.options.bounce ? this.wrapperW : 0) : momentumX;
            momentumX = newPosX ? this._momentum(newPosX - this.startX, duration, -this.x, (this.maxScrollX < 0 ? this.scrollerW - this.wrapperW + this.x - this.minScrollX : 0), this.options.hBounce ? this.wrapperW : 0) : momentumX;
            momentumY = newPosY ? this._momentum(newPosY - this.startY, duration, -this.y, (this.maxScrollY < 0 ? this.scrollerH - this.wrapperH + this.y - this.minScrollY : 0), this.options.vBounce ? this.wrapperH : 0) : momentumY;

			newPosX = this.x + momentumX.dist;
			newPosY = this.y + momentumY.dist;

			if ((this.x > this.minScrollX && newPosX > this.minScrollX) || (this.x < this.maxScrollX && newPosX < this.maxScrollX))
				momentumX = {
					dist:0,
					time:0
				};
			if ((this.y > this.minScrollY && newPosY > this.minScrollY) || (this.y < this.maxScrollY && newPosY < this.maxScrollY))
				momentumY = {
					dist:0,
					time:0
				};
		}

		if (momentumX.dist || momentumY.dist)
		{
			newDuration = Math.max(Math.max(momentumX.time, momentumY.time), 10);
			this.scrollTo(Math.round(newPosX), Math.round(newPosY), newDuration);
			return;
		}

		this._resetPos(200);
	},

	// _pos - Translate to specified location
	animateTo: function(offsetX, offsetY)
	{
		var x = this.options.hScroll && !isNaN(offsetX) ? offsetX: 0;
		var y = this.options.vScroll && !isNaN(offsetY) ? offsetY: 0;

		if (this.options.useTransform)
		{
			this.scroller.style[vendor + 'Transform'] =  translateOpen + x + "px," + y + "px" + translateClose;
		}
		else
		{
			x = Math.round(x);
			y = Math.round(y);
			this.scroller.style.left = x + 'px';
			this.scroller.style.top = y + 'px';
		}
		
		this.x = x;
		this.y = y;
		
		if(this.options.showImages)
		{
			if(this.options.vScroll)
				this.toggleVFadeImgs();
			if(this.options.hScroll)
				this.toggleFadeImgs();
		}

		// Adjust scrollbars
		this._scrollbarPos('h');
		this._scrollbarPos('v');	
	},

	toggleFadeImgs: function(){
		
		var id = this.options.widgetID;
		var formId = this.options.formid;
		var wID = formId + "_" + id;
		var sn = $KU.getElementById(wID + "_scrollee");
		if(!sn)
			return;
		
		// scroll width + (margin) + (border)
		var w = sn.scrollWidth + sn.offsetLeft + (sn.offsetWidth - sn.clientWidth);
		var right = Math.min(0, $KU.getElementById(wID + "_scroller").clientWidth - w);
		var leftImg = $KU.getElementById(wID + "_leftimg");
		var rightImg = $KU.getElementById(wID + "_rightimg");
		leftImg && $KW.touch.setHeight(leftImg.childNodes[0]); //Adjust imgs top when the horizontal scrollbox grows vertically
		rightImg && $KW.touch.setHeight(rightImg.childNodes[0]);
		var l = -this.x;	
		if (l > sn.offsetLeft) 
			leftImg && $KU.applyFade(leftImg, "fadeIn", 500);
		else 
			leftImg && $KU.applyFade(leftImg, "fadeOut", 1000);
			
		if (l < -right) 
			rightImg && $KU.applyFade(rightImg, "fadeIn", 500);	
		else 
			rightImg && $KU.applyFade(rightImg, "fadeOut", 1000);
	},
	
	toggleVFadeImgs: function(){
	
		var id = this.options.widgetID;
		var formId = this.options.formid;
		var wID = formId + "_" + id;		
		var sn = $KU.getElementById(wID + "_scrollee");
		// scroll width + (margin) + (border)
		var h = sn.scrollHeight + sn.offsetTop + (sn.offsetHeight - sn.clientHeight);
		var bottom = Math.min(0, $KU.getElementById(wID + "_scroller").clientHeight - h);
		var topImg = $KU.getElementById(wID + "_topimg");
		var bottomImg = $KU.getElementById(wID + "_bottomimg");
		var l = -this.y;	
		if (l > sn.offsetTop) 
			topImg && $KU.applyFade(topImg, "fadeIn", 500);
		else 
			topImg && $KU.applyFade(topImg, "fadeOut", 1000);
		if (l < -bottom) 
			bottomImg && $KU.applyFade(bottomImg, "fadeIn", 500);	
		else 
			bottomImg && $KU.applyFade(bottomImg, "fadeOut", 1000);
		
	},

	// Adjusts the scrollbar position according to the scrollee offset
	_scrollbarPos: function (dir, hidden)
	{
		var that = this,
		pos = dir == 'h' ? that.x : that.y,
		size;

		if (!that[dir + 'Scrollbar'] || ((this.direction == "LEFT" || this.direction == "RIGHT") && !this.options.scrollbox)) return;

		pos = that[dir + 'ScrollbarProp'] * pos;

		if (pos < 0) {
			if (!that.options.fixedScrollbar) {
				size = that[dir + 'ScrollbarIndicatorSize'] + Math.round(pos * 3);
				if (size < 8) size = 8;
				that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
			}
			pos = 0;
		} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
			if (!that.options.fixedScrollbar) {
				size = that[dir + 'ScrollbarIndicatorSize'] - Math.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
				if (size < 8) size = 8;
				that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
				pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
			} else {
				pos = that[dir + 'ScrollbarMaxScroll'];
			}
		}

		that[dir + 'ScrollbarWrapper'].style[vendor + 'TransitionDelay'] = '0';
		that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
		if(that.options.useTransform)
			that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = translateOpen + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + translateClose;
		else
		{
			if(dir == 'h')
			{
				that[dir + 'ScrollbarIndicator'].style.left =  pos + 'px';
				that[dir + 'ScrollbarIndicator'].style.top = 0;
			}
			else
			{
				that[dir + 'ScrollbarIndicator'].style.left =  0;
				that[dir + 'ScrollbarIndicator'].style.top =  pos + 'px';
			}
		}
	},

	// Scrollbar markup
	_scrollbar: function (dir)
	{
		//alert("in _scrollbar");
		
		var that = this,
		doc = document,
		bar;

		if (!that[dir + 'Scrollbar']) 
		{
			if (that[dir + 'ScrollbarWrapper']) 
			{
				if ($KU.hasTransform) 
					that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = '';
				that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
				that[dir + 'ScrollbarWrapper'] = null;
				that[dir + 'ScrollbarIndicator'] = null;
			}

			return;
		}

		if (!that[dir + 'ScrollbarWrapper']) 
		{
			// Create the scrollbar wrapper
			bar = doc.createElement('div');

			if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
			else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

			bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:opacity;-' + vendor + '-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden; opacity:' + (that.options.hideScrollbar ? '0' : '1');

			that.wrapper.appendChild(bar);
			that[dir + 'ScrollbarWrapper'] = bar;

			// Create the scrollbar indicator
			bar = doc.createElement('div');
			if (!that.options.scrollbarClass) {
				bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9); -' + vendor + '-background-clip:padding-box;-' + vendor + '-box-sizing:border-box; ' + (dir == 'h' ? 'height:100%' : 'width:100%') + '; -' + vendor + '-border-radius:3px;border-radius:3px';
			}

			if(that.options.useTransform)
				bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:-' + vendor + '-transform; -' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-' + vendor + '-transition-duration:0;-' + vendor + '-transform:' + translateOpen +'0,0' + translateClose;

			//if (that.options.useTransition) bar.style.cssText += ';-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

			that[dir + 'ScrollbarWrapper'].appendChild(bar);
			that[dir + 'ScrollbarIndicator'] = bar;
		}

		if (dir == 'h') {
			that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
			that.hScrollbarIndicatorSize = Math.max(Math.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
			that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
			that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
			that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
		} else {
			that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
			that.vScrollbarIndicatorSize = Math.max(Math.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
			that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
			that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
			that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
		}

		// Reset position
		that._scrollbarPos(dir, true);
	},

	// Reset scroller position
	_resetPos: function (time)
	{
		var that = this,
		resetX = that.x >= that.minScrollX ? that.minScrollX : that.x < that.maxScrollX ? that.maxScrollX : that.x,
		resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

		if (resetX == that.x && resetY == that.y)
		{
			if (that.moved)
			{
				that.moved = false;
                if (that.options.onScrollEnd && !that.contentoffsetmove) that.options.onScrollEnd.call(that);
			}
			
			if (that.hScrollbar && that.options.hideScrollbar) 
			{
				that.hScrollbarWrapper.style[vendor + 'TransitionDelay'] = '100ms';
				that.hScrollbarWrapper.style.opacity = '0';
			}
			if (that.vScrollbar && that.options.hideScrollbar) 
			{
				that.vScrollbarWrapper.style[vendor + 'TransitionDelay'] = '100ms';
				that.vScrollbarWrapper.style.opacity = '0';
			}
			return;
		}
		
		that.scrollTo(resetX, resetY, time || 0);
	},

	scrollTo: function (x, y, time, relative) 
	{
		var that = this,
		step = x,
		i, l;

		that.stop();

		if (!step.length) step = [{
			x: x,
			y: y,
			time: time,
			relative: relative
		}];

		for (i=0, l=step.length; i<l; i++)
		{
			if (step[i].relative) {
				step[i].x = that.x - step[i].x;
				step[i].y = that.y - step[i].y;
			}
			that.steps.push({
				x: step[i].x,
				y: step[i].y,
				time: step[i].time || 0
			});
		}

		that._startAni();
	},

	// kony.setFocus()
	scrollToElement: function (el, time, returnTop) 
	{
		if (!el) return;
		if(!time)	time = 1000;	// 1s
		
		var that = this;

		pos = that._offset(el);
		pos.left += that.wrapperOffsetLeft;
		pos.top += that.wrapperOffsetTop;

		pos.left = pos.left >= that.minScrollX ? that.minScrollX : pos.left <= that.maxScrollX ? that.maxScrollX : pos.left;
		pos.top = pos.top >= that.minScrollY ? that.minScrollY : pos.top <= that.maxScrollY ? that.maxScrollY : pos.top;
		time = time === undefined ? Math.max(Math.abs(pos.left)*2, Math.abs(pos.top)*2) : time;

		// HACK // Updated to handle setFocus for widgets in horizontal scroll conatiner also
		if(this.scrollerH > this.wrapperH || this.scrollerW > this.wrapperW)
		{
			//For non-windows phone, element is scrolled if its not in view. For windows offsetParent return wrong value if element is in table.
			if(((Math.abs(this.y) + this.wrapperH) < (el.offsetTop+el.offsetHeight)) || (el.offsetTop < Math.abs(this.y)) || $KU.isWindowsPhone){
				if(returnTop)
					return pos.top;
				that.scrollTo(0, pos.top, time);
			}	
            if(((Math.abs(this.x) + this.wrapperW) < (el.offsetLeft+el.offsetWidth)) || (el.offsetLeft < Math.abs(this.x)) || $KU.isWindowsPhone){
				that.scrollTo(pos.left, 0, time);
			}
			//In iPhone safari browser time out for focus is not working so setting focus directly.
			if(kony.appinit.isiPhone)
			{
				el.focus();
			}
			else
			{
				setTimeout(function(){
					try
					{
						// TODO: focus() doesn't work on mobile safari when called in a timeout
						el.focus();
					}
					catch(e){}
				}, time);
			}
		}
		else if($KU.isWindowsTablet){
		
		//Using setTimeout with delay 0 to defer the execution of code to a separate, subsequent event loop.		 
				setTimeout(function(){
				try
				{			
					el.focus();
				}
				catch(e){}
			}, 0);
		}
		else
		{
			try
			{
				el.focus();
			}
			catch(e){}
		}
        return pos;
	},

	// Negate variables
	stop: function () 
	{
		cancelFrame(this.aniTime);
		this.steps = [];
		this.moved = false;
		this.animating = false;
	},

	_startAni: function () 
	{
		var that = this,
		startX = that.x, startY = that.y,
		startTime = new Date().valueOf(),
		step, easeOut;

		if (that.animating) return;

		if (!that.steps.length)
		{
			that._resetPos(400);
			return;
		}

		step = that.steps.shift();

		if (step.x == startX && step.y == startY) step.time = 0;

		that.animating = true;
		that.moved = true;

		(function animate () {
			var now = new Date().valueOf(),
			newX, newY;

			if (now >= startTime + step.time) {
				that.animateTo(step.x, step.y);
				that.animating = false;
				that._startAni();
				return;
			}

			now = (now - startTime) / step.time - 1;
			easeOut = Math.sqrt(1 - now * now);
			newX = (step.x - startX) * easeOut + startX;
			newY = (step.y - startY) * easeOut + startY;
			that.animateTo(newX, newY);
			if (that.animating) that.aniTime = nextFrame(animate);
		})();
	},

	// Calculate the momentum - alter speed n time here
	_momentum: function (dist, time, maxDistUpper, maxDistLower, size)
	{
		var factor = ($KU.isWindowsTouch ? 4 : 1);
		var deceleration = 0.0006,
		speed = Math.abs(dist) / time * factor, /* Multiply the speed for ssmoother scroll*/
		newDist = (speed * speed) / (2 * deceleration),
		newTime = 0, outsideDist = 0;

		// Proportinally reduce speed if we are outside of the boundaries
		if (dist > 0 && newDist > maxDistUpper)
		{
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistUpper = maxDistUpper + outsideDist;
			speed = speed * maxDistUpper / newDist;
			newDist = maxDistUpper;
		}
		else if (dist < 0 && newDist > maxDistLower)
		{
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistLower = maxDistLower + outsideDist;
			speed = speed * maxDistLower / newDist;
			newDist = maxDistLower;
		}

		newDist = newDist * (dist < 0 ? -1 : 1);
		newTime = speed / deceleration;

		return {
			dist: newDist,
			time: Math.round(newTime)
		};
	},

	_offset: function (el)
	{
		var left = -el.offsetLeft,
		top = -el.offsetTop;

		try{ //to handle issue in IE8 ( Undefined error . )
			while (el = el.offsetParent)
			{
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
		}catch(err){};

		return {
			left: left,
			top: top
		};
	},

	destroy: function ()
	{
		//this.scroller.style[vendor + 'Transform'] = '';
		// Remove scrollbars
		this.hScrollbar = false;
		this.vScrollbar = false;
		this._scrollbar('h');
		this._scrollbar('v');
		// Remove the event listeners
		if(this.scroller)
		{
			if($KU.isTouchSupported)
			{
				kony.events.removeEventListener(this.scroller, "touchstart", this, false);
				kony.events.removeEventListener(this.scroller, "touchcancel", this, false);
			}		
			else if($KU.isPointerSupported)
			{
				if("onpointerdown" in window) {
					kony.events.removeEventListener(this.scroller, "pointerdown", this, false);
					kony.events.removeEventListener(this.scroller, "pointercancel", this, false);	
				}else {
					kony.events.removeEventListener(this.scroller, "MSPointerDown", this, false);
					kony.events.removeEventListener(this.scroller, "MSPointerCancel", this, false);				
				}
			}
			else
			{
				kony.events.removeEventListener(this.scroller, "mousedown", this);
				kony.events.removeEventListener(this.scroller, "mouseout", this);
			}
		}
		
		if($KU.isOrientationSupported)
			kony.events.removeEventListener(window, "orientationchange", this, false);
		else
			kony.events.removeEventListener(window, "resize", this);
			
		
		if (this.options.checkDOMChanges) clearInterval(this.checkDOMTime);
		
		var isPopup = this.wrapper.getAttribute("kformname");
		if(!isPopup && !this.options.scrollbox)
			kony.events.removeEventListener(document, "touchmove", $KW.touch.preventDefault);
	}
};


/* Sticky headers */
$KW.touch.StickyScroller = function()
{
	var that = this;

	var forms = document.forms;
	var curForm = forms[0];
	if(forms.length == 2)
		curForm = forms[1];	// Pick right form in case of overlay transitions
	var wrapperId = curForm.id;
	
	
	var headerId = $KG["__currentForm"].header;
	var footerId = $KG["__currentForm"].footer;
	var appmenuId = "konyappmenudiv";

	this.wrapper = document.getElementById(wrapperId);
	this.header = document.getElementById(headerId);
	this.footer = document.getElementById(footerId);
	this.appmenu = document.getElementById(appmenuId);
	
	if(this.appmenu && this.footer)
	{
		this.footer.style.bottom = this.appmenu.clientHeight + 'px';
	}
	
	setTimeout(function () {
		that.follow();
	}, 0);
	
	kony.events.addEventListener(window, 'scroll', this, false);
};
	
$KW.touch.StickyScroller.prototype = 
{
	handleEvent: function (e) 
	{
		switch(e.type)
		{		
			case "scroll":
				this.follow(e);
				break;
		}
	},
	
	follow: function()
	{
		/*
				H
				|
				F
				|
				A
		*/
	
		var scrollX = window.scrollX || document.documentElement.scrollLeft;
		var scrollY = window.scrollY || document.documentElement.scrollTop;

		this.headerH = this.header ? this.header.clientHeight: 0;
		this.footerH = this.footer ? this.footer.clientHeight: 0;
		this.appmenuH = this.appmenu ? this.appmenu.clientHeight: 0;

		this.wrapper.style.top = - (this.footerH + this.appmenuH) + 'px';
		//this.wrapper.style.bottom = - (this.headerH) + 'px';
		
		if(this.header)
		{
			var scrollY_h = scrollY;
			this.header.style[vendor + "Transform"] = translateOpen + scrollX + 'px,' + scrollY_h + 'px' + translateClose;
		}
		if(this.footer)
		{
			var scrollY_f = (window.innerHeight || document.body.clientHeight) + scrollY - (this.footerH) - (this.headerH);
			this.footer.style.bottom = this.y1 + this.appmenuH + 'px';
			this.footer.style[vendor + "Transform"] = translateOpen + scrollX + 'px,' + scrollY_f + 'px' + translateClose;
		}
		if(this.appmenu)
		{
			var scrollY_a = (window.innerHeight || document.body.clientHeight) + scrollY - (this.footerH) - (this.headerH) - (this.appmenuH);
			this.appmenu.style[vendor + "Transform"] = translateOpen + scrollX + 'px,' + scrollY_a + 'px' + translateClose;
		}
	},
		
	destroy: function()
	{
		kony.events.removeEventListener(window, 'scroll', this, false);
	}
}


// Gesture
// Ex: setGestureRecognizer(frm1.hboxSecond,1,{fingers = 1, taps = 1}, onGestureFunction1)
/*
1  TAP
	10 - Single Tap
	11 - Double Tap
2  SWIPE
3  LONGPRESS
*/
// TODO:
/*
  Multiple getsureParams on same gestureType
  Multiple taps on same getureParams

*/
$KW.touch.gesture = function(widgetModel, gestureType, gestureObj, callback)
{
	var widget = (widgetModel ? document.querySelectorAll('#' + widgetModel.pf + "_" + widgetModel.id) : document);
	if (["Form","Form2"].contains(widgetModel.wType)) widget = document.querySelector('div[id="' + widgetModel.id + '_scroller"]');
		
	if(!widgetModel)
		widgetModel = $KG;

	if(!$KG.gestures) $KG.gestures = {};
	this.gestureIdentifier = (Math.round(new Date().valueOf()*Math.random())) + "";
	$KG.gestures[this.gestureIdentifier] = {"widgetModel":widgetModel, "gestureType":gestureType};

	this.widgetModel = widgetModel;
	this.gestureType = gestureType;
	
	switch(this.gestureType)
	{
        case constants.GESTURE_TYPE_TAP :
		case 10 :
		case 11 :
			this.TAP = true;
			break;
        case constants.GESTURE_TYPE_SWIPE  :
			this.SWIPE = true;
			break;
        case constants.GESTURE_TYPE_LONGPRESS  :
			this.LONGPRESS = true;
			break;
        case constants.GESTURE_TYPE_PAN  : 
            this.PAN = true;
            break;
        case constants.GESTURE_TYPE_ROTATION  : 
            this.ROTATION = true;
            break;
        case constants.GESTURE_TYPE_PINCH : 
            this.PINCH = true;
            break;
	}
	
	this.gestureObj = gestureObj;
	this.callback = callback;

	// unused for now
	this.fingers = gestureObj.fingers || 1;
	
	this.taps = gestureObj.taps || 1;
	this.longTapDelay = parseInt(gestureObj.pressDuration, 10) * 1000 || 1000; // milliseconds
	this.swipedistance = (gestureObj.swipedistance || 50) * $KU.dpi;
    this.continousEvents = gestureObj.continousEvents || false;
	// Add instance to model
    if(gestureType == constants.GESTURE_TYPE_TAP)
	{
		if(gestureObj.taps == 1)
			widgetModel.gestures["10"]["instance"] = this;
		else
			widgetModel.gestures["11"]["instance"] = this;
	}
	else
	{
		widgetModel.gestures[gestureType]["instance"] = this;
	}
	
	if(!widget || (typeof widget.length == 'number' && widget.length == 0))
		return this.gestureIdentifier;
	
	if(typeof widget.length != 'number')
		this.widget = [widget];
	else	
		this.widget = widget;
		
	for(var i = 0; i < this.widget.length; i++){
        if(this.gestureType === constants.GESTURE_TYPE_PAN ||
           this.gestureType === constants.GESTURE_TYPE_ROTATION ||
           this.gestureType === constants.GESTURE_TYPE_PINCH ){
            kony.events.addEventListener(this.widget[i], "gesturestart", this, false);
        }else{
            if($KU.isPointerSupported)
                kony.events.addEventListener(this.widget[i], "MSPointerDown", this, false);
            else
                kony.events.addEventListener(this.widget[i], "touchstart", this, false);
	    }
	}
	return this.gestureIdentifier;
}

$KW.touch.gesture.prototype = 
{
	removeGesture: function(gestureType, updateModel)
	{
		// clear timers
		clearTimeout(this.touchTimer);
		clearTimeout(this.longPressTimer);
		
		if(updateModel != false)
			this.widgetModel.gestures[gestureType] = "";
		
		var widget = this.widget;
		
		for(var i = 0; widget && i < widget.length; i++){
			// Detach events
			if($KU.isPointerSupported)
			{
				if("onpointerdown" in window) {
					kony.events.removeEventListener(widget[i], "pointerdown", this, false);
					kony.events.removeEventListener(widget[i], "pointermove", this, false);
					kony.events.removeEventListener(widget[i], "pointerup", this, false);			

				}else {
					kony.events.removeEventListener(widget[i], "MSPointerDown", this, false);
					kony.events.removeEventListener(widget[i], "MSPointerMove", this, false);
					kony.events.removeEventListener(widget[i], "MSPointerUp", this, false);
				}

				//kony.events.removeEventListener(this.widget, "MSPointerCancel", this, false);
			}
			else
			{
				kony.events.removeEventListener(widget[i], "touchstart", this, false);
				kony.events.removeEventListener(widget[i], "touchmove", this, false);
				kony.events.removeEventListener(widget[i], "touchend", this, false);
                kony.events.removeEventListener(widget[i], "gesturestart", this, false);
                kony.events.removeEventListener(widget[i], "gesturechange", this, false);
                kony.events.removeEventListener(widget[i], "gestureend", this, false);
				//kony.events.removeEventListener(this.widget, "touchcancel", this, false);
			}
		}
		
		// Clear timers if required
	},
	
	handleEvent: function (e)
	{
		switch(e.type)
		{
			case "touchstart":
			case "MSPointerDown":
			case "pointerdown":			
				this.onTouchStart(e);
				break;
			case "touchmove":
			case "MSPointerMove":
			case "pointermove":
				this.onTouchMove(e); 
				break;
			case "touchend":
			case "MSPointerUp":
			case "pointerup":
				this.onTouchEnd(e); 
				break;
			case "touchcancel": 
			case "MSPointerCancel":
			case "pointercancel":
				this.onTouchCancel(e); 
				break;
            case "gesturestart":
                this.onGestureStart(e);
                break;
            case "gesturechange":
                this.onGestureChange(e);
                break;
            case "gestureend":
                this.onGestureEnd(e);
                break;
		}
	},
	
	onTouchStart: function(event)
	{
		var touch = event.touches && event.touches[0] || event;
		this.currentTouch = event;
		
		if($KU.isPointerSupported)
		{
			if("onpointerdown" in window){
				kony.events.addEventListener(event.currentTarget, "pointermove", this, false);
				kony.events.addEventListener(event.currentTarget, "pointerup", this, false);
				kony.events.addEventListener(event.currentTarget, "pointercancel", this, false);
			}else{
				kony.events.addEventListener(event.currentTarget, "MSPointerMove", this, false);
				kony.events.addEventListener(event.currentTarget, "MSPointerUp", this, false);
				kony.events.addEventListener(event.currentTarget, "MSPointerCancel", this, false);
			}		
		}		
		else
		{
			kony.events.addEventListener(event.currentTarget, "touchmove", this, false);
			kony.events.addEventListener(event.currentTarget, "touchend", this, false);
			kony.events.addEventListener(event.currentTarget, "touchcancel", this, false);
		}
		
		this.x1 = touch.pageX;
        this.y1 = touch.pageY;
		
		var now = new Date().valueOf();
		var delta = now - (this.doubleTimer || now);
		this.last = this.doubleTimer = now;
		
		// double tap
		if (delta > 0 && delta <= 250) 	// assuming 250ms for double tap
			this.isDoubleTap = true;
		else
			this.isDoubleTap = false;
		// Clear existsing tap timer to detect double tap
		this.touchTimer && clearTimeout(this.touchTimer);
		this.curTarget = event.currentTarget;
		// long tap
		var that = this;
		this.LONGPRESS && (this.longPressTimer = setTimeout(function () { that.onLongTap(that.curTarget); }, this.longTapDelay));
	},
	
	onTouchMove: function(event)
	{
		var touch = event.touches && event.touches[0] || event;
		this.x2 = touch.pageX;
        this.y2 = touch.pageY;
	},
	
	onTouchEnd: function(event)
	{
		var touch = event.touches && event.touches[0] || event;
		
		var that = this;
		this.currentTouch = event;

		if($KU.isPointerSupported)
		{
			if("onpointerdown" in window){
				kony.events.removeEventListener(event.currentTarget, "pointermove", this, false);
				kony.events.removeEventListener(event.currentTarget, "pointerup", this, false);
				kony.events.removeEventListener(event.currentTarget, "pointercancel", this, false);
			}
			else {
				kony.events.removeEventListener(event.currentTarget, "MSPointerMove", this, false);
				kony.events.removeEventListener(event.currentTarget, "MSPointerUp", this, false);
				kony.events.removeEventListener(event.currentTarget, "MSPointerCancel", this, false);

			}
		}
		else
		{
			kony.events.removeEventListener(event.currentTarget, "touchmove", this, false);
			kony.events.removeEventListener(event.currentTarget, "touchend", this, false);
			kony.events.removeEventListener(event.currentTarget, "touchcancel", this, false);
		}
		
		//this.x2 = touch.pageX;
        //this.y2 = touch.pageY;
		
		if (this.isDoubleTap && this.TAP && this.taps == 2) 
		{
			kony.print("DOUBLE TAP");
			this.executeCallback(event.currentTarget);
			delete this.doubleTimer;
		} 
		
		if(this.x2 > 0 || this.y2 > 0) 
	    {
			if(this.SWIPE)
			{
				var deltaX = this.x2 - this.x1;
				var deltaY = this.y2 - this.y1;
				
				var absDeltaX = Math.abs(deltaX);
				var absDeltaY = Math.abs(deltaY);
			
				if(absDeltaX > this.swipedistance || absDeltaY > this.swipedistance) // Ignore if displacement is too little
				{
					var dir = $KU.getSwipeDirection(deltaX, deltaY);
					kony.print("SWIPE: " + dir);
					this.executeCallback(event.currentTarget,dir);
				}
			}
			// clear all
			this.x1 = this.x2 = this.y1 = this.y2 = 0;
		}
		else if(this.last)
	    {
			if(this.TAP && this.taps == 1)
			{
				if($KG.gestures[that.gestureIdentifier])
					{
						kony.print("TAP");
						that.executeCallback(event.currentTarget);
					}
					
				/*
				commenting the single gesture in setTimeout. As its taking time to execute single taps continously.
				this.touchTimer = setTimeout(function(){
					if($KG.gestures[that.gestureIdentifier])
					{
						kony.print("TAP");
						that.executeCallback(event.currentTarget);
					}
				}, 250);
				*/
			}
		}
		this.last = 0;
	},
	
	onTouchCancel: function()
	{
		//var touch = event.touches && event.touches[0] || event;
	},
	
    
    /**
        Added gesture events for PAN, PINCH & ROTATION using events supported in safari browser.
        This is only supported in IOS 6 and above. For other platforms these events are not supported.
    */
    onGestureStart: function(event)
    {
        var touch = event.touches && event.touches[0] || event;
        this.currentTouch = event;

        kony.events.addEventListener(event.currentTarget, "gesturechange", this, false);
        kony.events.addEventListener(event.currentTarget, "gestureend", this, false);
        
        this.x1 = touch.pageX;
        this.y1 = touch.pageY;
        
        this.gestureStartTime = new Date().valueOf();
        
        this.excecuteGestureEvent(event,1);
    },
    
    onGestureChange: function(event)
    {
        if(!event)return;
        
        if(this.continuousEvents){
            var touch = event.touches && event.touches[0] || event;
            this.x2 = touch.pageX;
            this.y2 = touch.pageY;
            
            this.excecuteGestureEvent(event,2);
            
        }
    },
    
    onGestureEnd: function(event)
    {
        kony.events.removeEventListener(event.currentTarget, "gesturechange", this, false);
        kony.events.removeEventListener(event.currentTarget, "gestureend", this, false);
        
        var touch = event.touches && event.touches[0] || event;
        this.x2 = touch.pageX;
        this.y2 = touch.pageY;
        
        this.excecuteGestureEvent(event,3);
    },
    
    excecuteGestureEvent : function(event,gestureState){
        
            if(this.ROTATION ){
                this.rotation = event.rotation;
                this.executeCallback(event.currentTarget,null,gestureState);
            }
            
            this.scale = event.scale;
            
            /* if scale is less then 1 then gesture is pinch & if scale is more then one then it is  */
            if(this.PINCH && event.scale !== 1){
                
                if(gestureState && gestureState > 1){
                    var now = new Date().valueOf();
                    var secElapsed =  (now - this.gestureStartTime)/1000;
                    //Velocity is scale change for sec.
                    this.velocity = (1 - event.scale)/secElapsed
                    this.velocityX = (this.x2 - this.x1)/secElapsed;
                    this.velocityY = (this.y2 - this.y1)/secElapsed;
                }
                try{
                this.executeCallback(event.currentTarget,null,gestureState);
                
                }catch(e){
                   // alert(e.message);
                }
            }

            if(this.PAN ){
                this.executeCallback(event.currentTarget,null,gestureState);
        }
    },
    
	onLongTap: function(curTarget)
	{
		if(this.last && this.LONGPRESS)
		{
			var duration = new Date().valueOf() - this.last;
			if(duration >= this.longTapDelay)
			{
				if($KG.gestures[this.gestureIdentifier])
				{
					kony.print("LONGPRESS: " + this.longTapDelay + "ms");
					this.executeCallback(curTarget);
				}
			}
		}
	},
	
    executeCallback: function(curTarget,dir,gestureState)
	{
		if (this.callback) 
		{
			var gestureInfoObj = {};
			
			var setupParams = $KU.cloneObj(this.gestureObj);
			gestureInfoObj.gestureType = this.gestureType;
			gestureInfoObj.gesturesetUpParams = setupParams;

            //Added below properties for PINCH and Rotation.
            gestureInfoObj.gestureState = gestureState;
            gestureInfoObj.rotation = this.rotation ? (-this.rotation ) : 0;
            gestureInfoObj.velocity = this.velocity || 0;
            gestureInfoObj.velocityX = this.velocityX || 0;
            gestureInfoObj.velocityY = this.velocityY || 0;
            gestureInfoObj.scale = this.scale || 1;
            
            //Sumanth: DEF602 : Updated widget node to get current target if it exists, otherwise take it from widget added to gesture object when created.
            var widget = curTarget && (curTarget !== document) ? curTarget : (this.widget.length ? this.widget[0] : this.widget);

			var coords = $KW.Utils.getOffset(widget);
            //var touch = this.currentTouch.changedTouches && this.currentTouch.changedTouches[0];
			var touch = (this.currentTouch.touches && this.currentTouch.touches[0]) || this.currentTouch;
			gestureInfoObj.gesturePosition = $KU.getgesturePosition(touch.pageX,touch.pageY,widget.clientWidth,widget.clientHeight,coords.left,coords.top);

			if(gestureInfoObj.gestureType == constants.GESTURE_TYPE_SWIPE )
			    gestureInfoObj.swipeDirection = $KU.getIntegerDirection(dir);

			gestureInfoObj.gestureX = this.x2 || this.x1;
			gestureInfoObj.gestureY = this.y2 || this.y1;

			gestureInfoObj.widgetWidth = widget.clientWidth;
			gestureInfoObj.widgetHeight = widget.clientHeight;
			var widgetModel = this.widgetModel;
			if(curTarget && (curTarget !== document)){
				var containerID = curTarget.getAttribute('kcontainerid');
				var cur ="";
				if(containerID){
					 cur = curTarget;
					 while (cur && !(cur.id.split("_")[1] === containerID) ){			
						cur = cur.parentNode;
					}
				}
				var context = {};
				if(cur && cur.getAttribute("kwidgettype") ==="Segment"){
					var targetNode = $KU.getParentByTagName(curTarget, 'li');
					//sectionIndex: containerModel.currentIndex[0], rowIndex: containerModel.currentIndex[1], widgetInfo: widgetData
					
					var segmentModel = $KU.getModelByNode(cur);
					var rowData;
					context.widgetInfo = segmentModel;
					 if(segmentModel.hasSections) { 
						var secIndices = targetNode.getAttribute("secindex").split(',');
						context.rowIndex = +secIndices[1];
						context.sectionIndex = +secIndices[0];
						rowdata = segmentModel.data[context.sectionIndex][IndexJL+1][context.rowIndex];
					 }else{
						context.rowIndex = +targetNode.getAttribute('index');
						context.sectionIndex = 0;
						rowdata = segmentModel.data[context.rowIndex];
					 }
					 var rowModelData = rowdata && rowdata[segmentModel.widgetdatamap[this.widgetModel.id]];
					 widgetModel = $KU.extend({}, this.widgetModel);
					 if(rowModelData)
						widgetModel = $KU.extend(widgetModel, rowModelData);
				}
			}
			var currentForm = this.widgetModel["__currentForm"];
            if(currentForm)
			{
				this.callback(currentForm, gestureInfoObj);
			}
			else
			{	if(curTarget)
					this.callback(widgetModel, gestureInfoObj, context);
				else
					this.callback(this.widgetModel, gestureInfoObj);
			}
		}
	}
};



$KW.touch.events = {};

(function(){
	var isTouchSupported = (typeof Touch != "undefined" || "ontouchstart" in window) && typeof bbnth == "undefined";
    if(isTouchSupported){
        $KW.touch.events.touchstart = "touchstart";
        $KW.touch.events.touchmove = "touchmove";
        $KW.touch.events.touchend = "touchend";
        $KW.touch.events.touchcancel = "touchcancel";
    }else{
        $KW.touch.events.touchstart = "mousedown";
        $KW.touch.events.touchmove = "mousemove";
        $KW.touch.events.touchend = "mouseup";
        $KW.touch.events.touchcancel = "mouseout";
    }
    if(document.addEventListener){
        $KW.touch.events.eventListener = "addEventListener";
    }else{
        $KW.touch.events.eventListener = "attachEvent";
        $KW.touch.events.touchstart = "mousedown";
        $KW.touch.events.touchmove = "mousemove";
        $KW.touch.events.touchend = "mouseup";
        $KW.touch.events.touchcancel = "mouseout";
    }

	var isPointerSupported = navigator.msPointerEnabled;
    if(isPointerSupported)
    {
        if("onpointerdown" in window) {
            $KW.touch.events.touchstart = "pointerdown";
            $KW.touch.events.touchmove = "pointermove";
            $KW.touch.events.touchend = "pointerup";

        }else {
            $KW.touch.events.touchstart =  "MSPointerDown";
            $KW.touch.events.touchmove = "MSPointerMove";
            $KW.touch.events.touchend = "MSPointerUp";
        }
    }
    if(document.removeEventListener){
        $KW.touch.events.removeEventListener = "removeEventListener";
    }else{
        $KW.touch.events.removeEventListener = "detachEvent";
    }

})();


$KW.touch.TouchEvents =  function(widgetModel, widgetNode, eventType, callback){

    var touchEvent = $KW.touch.events.touchstart;
    switch(eventType)
    {
        case "touchstart":
            touchEvent = $KW.touch.events.touchstart;
            break;
        case "touchmove":
            touchEvent = $KW.touch.events.touchmove;
            break;
        case "touchend":
            touchEvent = $KW.touch.events.touchend;
            break;
        case "touchcancel":
            touchEvent = $KW.touch.events.touchcancel;
            break;
    }

    if(callback){
        this.callback = callback;
        this.widgetModel = widgetModel;
        this.widgetNode = widgetNode;
        this.widgetTopNode = $KW.Utils.getWidgetNodeFromNodeByModel(widgetModel,widgetNode) || widgetNode;
        this.handleEventListener = this.handleEvent.bind(this);
        kony.events.addEventListener(widgetNode, touchEvent, this.handleEventListener,false);
    }else{
        kony.events.removeEventListener(widgetNode, touchEvent, this.handleEventListener,false);
    }
}

$KW.touch.TouchEvents.prototype =  {
    
    removeTouch: function(eventType, updateModel)
    {

        if(updateModel != false)
            this.widgetModel.touches[gestureType] = "";

        var widgetNode = this.widgetNode;
        var touchEvent = $KW.touch.events.touchstart;
        switch(eventType)
        {
            case "touchstart":
                touchEvent = $KW.touch.events.touchstart;
                break;
            case "touchmove":
                touchEvent = $KW.touch.events.touchmove;
                break;
            case "touchend":
                touchEvent = $KW.touch.events.touchend;
                break;
            case "touchcancel":
                touchEvent = $KW.touch.events.touchcancel;
                break;
        }
        kony.events.removeEventListener(widgetNode, touchEvent, this.handleEventListener, false);
        
    },
    handleEvent: function (event)
    {
        //Added changedTouches to get x, y in touchend event.
        var touch = (event.touches && event.touches[0]) || (event.changedTouches && event.changedTouches[0] ) || event;
        var x1 = touch.pageX || touch.clientX;
        var y1 = touch.pageY || touch.clientY;
        
        //Converting touch point to widget coordinates from screen coordinates.
        var coords = $KW.Utils.getPosition(this.widgetTopNode);
        x1 = x1 - coords.left;
        y1 = y1 - coords.top;
        
        this.callback.call(this.widgetModel, this.widgetModel, x1, y1);
    }
}

$KW.touch.Drag = function (model, widget, dragableElement, containerElement, dragEvent, moveElement){
	this.model = model;
    this.widget = widget;
    this.dragEvent = dragEvent;
    this.dragableElement = dragableElement;
    this.containerElement = containerElement || document;
    this.moveElement = moveElement || dragableElement;

    if(dragableElement){
		kony.events.addEventListener(dragableElement, $KW.touch.events.touchstart, this.handleEvent.bind(this));
    }
};

$KW.touch.Drag.prototype = 
{

    addDrag: function()
    {
        if(this.dragableElement){
			kony.events.addEventListener(this.dragableElement, $KW.touch.events.touchstart, this.handleEvent.bind(this));
        }
    },

    removeDrag: function()
    {
        // Detach events
        this.dragableElement[kony.widgets.touch.events.removeEventListener ]($KW.touch.events.touchstart, this, false);
    },
    
    handleEvent: function (e)
    {
        switch(e.type)
        {
            case $KW.touch.events.touchstart:
                return this.onTouchStart(e);
                break;
            case $KW.touch.events.touchmove: 
                return this.onTouchMove(e); 
                break;
            case $KW.touch.events.touchend:
                return this.onTouchEnd(e); 
                break;
            case $KW.touch.events.touchcancel: 
                return this.onTouchCancel(e); 
                break;
        }
    },
    
    onTouchStart: function(event)
    {
        var touch = event.touches && event.touches[0] || event;
        
		this.x1 = touch.pageX || touch.clientX;
		this.y1 = touch.pageY || touch.clientY;

		if(this.model && this.model.wType == 'Popup'){	
			if(this.dragableElement.className == "resizearea"){
				this.offsetX = this.moveElement.offsetWidth;
				this.offsetY = this.moveElement.childNodes[0].children[1].clientHeight;
			}
			else{
				this.dragableElement.style.cursor = "move";
				this.offsetX = $KU.getInt(this.moveElement.offsetLeft);
				this.offsetY = $KU.getInt(this.moveElement.offsetTop);
			}
			this.dragEvent(this, $KW.touch.events.touchstart);
		}
		else{
			kony.events.stopPropagation(event);
			this.dragEvent(this.moveElement, this.x1, this.y1, "1");
		}	

		this.handleEventListener = this.handleEvent.bind(this);
		kony.events.addEventListener(this.containerElement, $KW.touch.events.touchmove, this.handleEventListener);
		kony.events.addEventListener(this.containerElement, $KW.touch.events.touchend, this.handleEventListener);
		//kony.events.addEventListener(document, kony.widgets.touch.events.touchcancel, this.handleEventListener);

		// prevent text selection in IE
		document.onselectstart = function () { return false; };
		// prevent IE from trying to drag an image
		this.dragableElement.ondragstart = function() { return false; };
        
        // prevent text selection (except IE)
        return false;
    },
    
    onTouchMove: function(event)
    {
        var touch = event.touches && event.touches[0] || event;
        this.x2 = touch.pageX || touch.clientX;
        this.y2 = touch.pageY || touch.clientY;
		
		if(this.model && this.model.wType == 'Popup'){
			var horizontalMoveDistance = this.offsetX + this.x2 - this.x1;
			var verticalMoveDistance = this.offsetY + this.y2 - this.y1;
			var verticalAvailableDistance = (document.documentElement.clientHeight || window.innerHeight ||  document.body.clientHeight) - this.widget.clientHeight;
			var horizontalAvailableDistance = (document.documentElement.clientWidth || window.innerWidth ||  document.body.clientWidth) - this.widget.clientWidth;
			
			if(this.dragableElement.className == "resizearea"){
				this.moveElement.style.width = Math.max(horizontalMoveDistance, 150) + "px";
				this.moveElement.childNodes[0].children[1].style.height = Math.max(verticalMoveDistance, 100) + "px";
			}
			else{
				if(horizontalMoveDistance < 0)
					this.moveElement.style.left = '0px';
				else if(horizontalMoveDistance > horizontalAvailableDistance)
					this.moveElement.style.left = horizontalAvailableDistance + 'px';
				else
					this.moveElement.style.left = (this.offsetX + this.x2 - this.x1) + 'px';
				
				if(verticalMoveDistance < 0)
					this.moveElement.style.top = '0px';
				else if( verticalMoveDistance >  verticalAvailableDistance )
					this.moveElement.style.top = verticalAvailableDistance + 'px';
				else
					this.moveElement.style.top = (this.offsetY + this.y2 - this.y1) + 'px';
			}	
			
			this.dragEvent(this, $KW.touch.events.touchmove);
		}
		else
			this.dragEvent(this.moveElement, this.x2, this.y2, "2");
    },
    
    onTouchEnd: function(event)
    {
        var touch = event.touches && event.touches[0] || event;
		this.x3 = touch.pageX || touch.clientX;
        this.y3 = touch.pageY || touch.clientY;
        
		if(this.model && this.model.wType == 'Popup')
			this.dragEvent(this, $KW.touch.events.touchend);
		else	
			this.dragEvent(this.moveElement, this.x3,  this.y3, "3");
        document.onselectstart = null;
        this.dragableElement.ondragstart = null;
        this.removeEvents();
    },
    
    onTouchCancel: function()
    {
        this.dragEvent(this, $KW.touch.events.touchend);
        this.removeEvents();
    },

    removeEvents: function(){
        this.dragableElement.style.cursor = "auto";
		kony.events.removeEventListener(this.containerElement, kony.widgets.touch.events.touchmove, this.handleEventListener);
		kony.events.removeEventListener(this.containerElement, kony.widgets.touch.events.touchend, this.handleEventListener);
		//kony.events.removeEventListener(this.containerElement, kony.widgets.touch.events.touchcancel, this.handleEventListener);
    }
}