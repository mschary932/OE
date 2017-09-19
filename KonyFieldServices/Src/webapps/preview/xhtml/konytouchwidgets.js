/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Namespace containing the touch handling and related objects.
 *
 */
kony.widgets.touch =
{

    /**
     *  Retrieves the parent widget container that raised the event.
     *
     */
    getTouchParent   : function(node){
        while (node && ((node.getAttribute("konywidgettype")
            && node.getAttribute("konywidgettype").indexOf("Touch") == -1 )
        || !node.getAttribute("konywidgettype")) ){
            node = node.parentNode;
            if(node && node.nodeName=='FORM')
                return null;
        }
        return node;
    },



    /**
     * Represents the Coordinates of the touch - Time of touch, Screen X and Screen Y
     *
     */
    TouchCoordinates :function(touch)
    {
        this.time = Date.now();
        this.screenX = touch.screenX;
        this.screenY = touch.screenY;
        this.clientX = touch.clientX;
        this.clientY = touch.clientY;
        this.startX = touch.pageX;
        this.startY = touch.pageY;

    },

    /**
     * Using the touch Event, the touch Context is updated at every stage of the touch event (Start, Move, End).
     *
     * The touchContext will be the same object for a given touch identifier. It always keeps track of the current
     * touch coordinates and previous touch coordinates.
     *
     */
    TouchContext :function(touch)
    {
        this.identifier = touch.identifier;
        this.touchMove = false;

        this.startingTouchCoordinates = new kony.widgets.touch.TouchCoordinates(touch);
        this.previousTouchCooridinates = new kony.widgets.touch.TouchCoordinates(touch);

        this.type = this.UNDEFINED_EVENT;

        this.direction = null;
        this.distance = null;

        this.targetWidgetID = null;
        this.targetWidgetType = null;

        this.currentTouchPhase = null;
    }

}

/**
     * Directions
     */
kony.widgets.touch.TouchContext.UP = "UP",
    kony.widgets.touch.TouchContext.DOWN = "DOWN",
    kony.widgets.touch.TouchContext.LEFT = "LEFT",
    kony.widgets.touch.TouchContext.RIGHT = "RIGHT",

    /**
     * Event Types
     */
    kony.widgets.touch.TouchContext.UNDEFINED_EVENT = -1;
kony.widgets.touch.TouchContext.TAP = 0;
kony.widgets.touch.TouchContext.DOUBLE_TAP = 1;
kony.widgets.touch.TouchContext.LONG_PRESS = 2;
kony.widgets.touch.TouchContext.SWIPE = 3;
kony.widgets.touch.TouchContext.DRAG = 4;

/**
     *  Touch States
     */
kony.widgets.touch.TouchContext.STATE_START = 0;
kony.widgets.touch.TouchContext.STATE_END = 1;
kony.widgets.touch.TouchContext.STATE_CANCEL = 3;
kony.widgets.touch.TouchContext.STATE_MOVE = 2;

/**
     * Touch Threshold for identifying different types of events
     *
     *  1.  Tap
     *  2.  Long Press
     *  3.  Double Tap
     *
     */
kony.widgets.touch.LONG_PRESS_THRESHOLD = 2000 // in Milli Secs.

kony.widgets.touch.DRAG_THRESHOLD = 5 // in px.

kony.widgets.touch.HANDLE_TOUCH_END = false // in px.

kony.widgets.touch.TOUCH_FINGERS = 1


kony.widgets.touch.TouchContext.prototype.updateCurrentTouchPhase = function(currentTouchPhase)
{
    this.currentTouchPhase = currentTouchPhase;
}

kony.widgets.touch.TouchContext.prototype.updateTargetWidgetDetails = function(targetWidgetID, targetWidgetType)
{
    this.targetWidgetID = targetWidgetID;
    this.targetWidgetType = targetWidgetType;
}

kony.widgets.touch.TouchContext.prototype.absDeltaX = function()
{
    var deltaX = this.previousTouchCooridinates.startX - this.startingTouchCoordinates.startX;
    return Math.abs(deltaX);
}

kony.widgets.touch.TouchContext.prototype.absDeltaX = function()
{
    var deltaX = this.previousTouchCooridinates.startX - this.startingTouchCoordinates.startX;
    return Math.abs(deltaX);
}


kony.widgets.touch.TouchContext.prototype.absDeltaY = function()
{
    var deltaY = this.previousTouchCooridinates.startY - this.startingTouchCoordinates.startY;
    return Math.abs(deltaY);
}

kony.widgets.touch.TouchContext.prototype.updateMovement = function(touch)
{
    this.touchMove = true;
    this.previousTouchCooridinates = new kony.widgets.touch.TouchCoordinates(touch);
}

kony.widgets.touch.TouchContext.prototype.updateTouchEnd = function(touch)
{
    this.previousTouchCooridinates = new kony.widgets.touch.TouchCoordinates(touch);
}

kony.widgets.touch.TouchContext.prototype.deltaTime = function()
{
    return(Date.now() - this.startingTouchCoordinates.time);
}

kony.widgets.touch.TouchContext.prototype.previousDeltaTime = function()
{
    return(Date.now() - this.previousTouchCooridinates.time);
}

kony.widgets.touch.TouchContext.prototype.gapBetweenTouchStartAndEnd = function()
{
    return (this.previousTouchCooridinates.time - this.startingTouchCoordinates.time);
}

kony.widgets.touch.TouchContext.prototype.getDistanceMoved = function()
{
    this.distance = Math.round(Math.sqrt(Math.pow( this.absDeltaX(),2) + Math.pow(this.absDeltaY(),2)));
}

kony.widgets.touch.TouchContext.prototype.getAngleOfMovement = function()
{

    var absX = this.startingTouchCoordinates.startX - this.previousTouchCooridinates.startX;
    var absY = this.previousTouchCooridinates.startY - this.startingTouchCoordinates.startY;

    var radians = Math.atan2(absY,absX); //radians
    var angle = Math.round(radians*180/Math.PI); //degrees

    //ensure value is positive
    if (angle < 0)
        angle = 360 - Math.abs(angle);


    return angle;
}

kony.widgets.touch.TouchContext.prototype.getMoveDirection = function()
{
    var angle = this.getAngleOfMovement();

    if ( (angle <= 45) && (angle >= 0) )
        this.direction = kony.widgets.touch.TouchContext.LEFT;

    else if ( (angle <= 360) && (angle >= 315) )
        this.direction = kony.widgets.touch.TouchContext.LEFT;

    else if ( (angle >= 135) && (angle <= 225) )
        this.direction = kony.widgets.touch.TouchContext.RIGHT;

    else if ( (angle > 45) && (angle < 135) )
        this.direction = kony.widgets.touch.TouchContext.DOWN;

    else
        this.direction = kony.widgets.touch.TouchContext.UP;

/*  var el = document.getElementById("details");
       var txtHtml = el.innerHTML;
        el.innerHTML = txtHtml + " Angle " + angle + " Direction " + this.direction;*/
}


kony.widgets.touch.TouchContext.prototype.resolveEventType = function()
{

    /**
             * Calculate the velocity or the speed of the action. This determines if the the action has a move then if that move is
             * a swipe or a scroll.
             */
    if (this.touchMove === true)
    {
        this.getMoveDirection();
        this.getDistanceMoved();

        if (kony.widgets.touch.HANDLE_TOUCH_END && this.distance > kony.widgets.touch.DRAG_THRESHOLD)
        {
            this.type = kony.widgets.touch.TouchContext.DRAG;
            return kony.widgets.touch.TouchContext.DRAG;
        }
        else if (!kony.widgets.touch.HANDLE_TOUCH_END && this.distance > kony.widgets.touch.DRAG_THRESHOLD)
        {
            this.type = kony.widgets.touch.TouchContext.SWIPE;
            return kony.widgets.touch.TouchContext.SWIPE;
        }
    }
    else
    {
        if (this.gapBetweenTouchStartAndEnd() <  kony.widgets.touch.LONG_PRESS_THRESHOLD)
        {
            this.type = kony.widgets.touch.TouchContext.TAP;
            return kony.widgets.touch.TouchContext.TAP;
        }
        else if (this.gapBetweenTouchStartAndEnd() >=  kony.widgets.touch.LONG_PRESS_THRESHOLD)
        {
            this.type = kony.widgets.touch.TouchContext.LONG_PRESS;
            return kony.widgets.touch.TouchContext.LONG_PRESS;
        }
    }

}

kony.widgets.touch.TouchContext.prototype.printContext = function()
{
    var prtStr = "";

    //this.resolveEventType();
    if (this.identifier)
        prtStr += this.identifier;



    prtStr += "  is Move :: " + this.touchMove;


    prtStr += "  Direction  :: " + this.direction;
    prtStr += "  Distance :: " + this.distance;

    prtStr += "  CurrentTouchPhase :: " + this.currentTouchPhase;

    prtStr += "  TargetWidgetID  :: " + this.targetWidgetID;
    prtStr += "  TargetWidgetType  :: " + this.targetWidgetType;
    return prtStr;
}

/**************************/
/* Scroller */
/**************************/

kony.widgets.touch.konyScroller = function(el, options)
{
    var that = this;
    that.wrapper = document.getElementById(el);
	that.scroller = that.wrapper.children[0];
    //that.wrapper = that.scroller.parentNode;

    // Default options
    that.options = {
        hScroll: false,
        vScroll: false,

        // scrollbar options
        hScrollbar: false,
        vScrollbar: false,
		
        fixedScrollbar: false,  // Set true for Android
        hideScrollbar: true,
        fadeScrollbar: true,
        scrollbarClass: '',
		checkDOMChanges: false,

        useTransform: true,  // Set useTransform to false if the form contains input / select	NR


        // Events
        onBeforeScrollStart: function (e) {
           // e.preventDefault();
        }
    };

    // Overwrite with user defined options
    for (var i in options) that.options[i] = options[i];

    that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
    that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;

    // Set some default styles

    that.scroller.style.webkitTransitionProperty = that.options.useTransform ? '-webkit-transform'  : 'top left';
    that.scroller.style.webkitTransitionDuration = '0';
    that.scroller.style.webkitTransformOrigin = '0 0';

    //that.scroller.style.webkitTransform = "translate3d(0,0,0)";

    if (that.options.useTransform)
	{
        that.scroller.style.webkitTransform = "translate3d(0,0,0)";
		if(!that.options.scrollbox)
			that.scroller.style.position = "absolute";
	}
    else
        that.scroller.style.cssText += ';position:absolute;top:0;xleft:0';

    that.refresh();

	
	// Attach events
    if(kony.events.touchSupported)  // 'ontouchstart' in window
    {
        that.scroller.addEventListener("touchstart", that, false);
    }
    else
    {
		that.scroller.addEventListener("mousedown", that, false);
    }
	

	if('onorientationchange' in window)
            {
		window.addEventListener("orientationchange", that, false);
                window.addEventListener("orientationchange", handleOrientationSpecificEvents, false);
            }
	else
		window.addEventListener("resize", that, false);
		
	if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
		that._checkDOMChanges();
	}, 500);
}

kony.widgets.touch.konyScroller.prototype = {
    x: 0,
    y: 0,
    steps: [],
    aniTime: null
}

kony.widgets.touch.konyScroller.prototype._checkDOMChanges = function () 
{
	if (this.moved || this.animating ||
		(this.scrollerW == this.scroller.offsetWidth * 1 && this.scrollerH == this.scroller.offsetHeight * 1)) return;

	this.refresh();
}

// Resets scroller to initial values (0)
kony.widgets.touch.konyScroller.prototype.refresh = function()
{
    var that = this;

    //that.wrapper = that.scroller.parentNode;
    that.wrapperW = that.wrapper.clientWidth || 1;
    that.wrapperH = that.wrapper.clientHeight || 1;

    that.minScrollY = -that.options.topOffset || 0;
    that.scrollerW = Math.round(that.scroller.offsetWidth);

	that.scrollerH = Math.round((that.scroller.offsetHeight + that.minScrollY));
	
	
    that.maxScrollX = that.wrapperW - that.scrollerW;
    that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
    that.dirX = 0;
    that.dirY = 0;

    that.hScroll = that.options.hScroll && that.maxScrollX < 0;
    that.vScroll = that.options.vScroll && (!that.hScroll || that.scrollerH > that.wrapperH);

    that.hScrollbar = that.hScroll && that.options.hScrollbar;
    that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

    var offset = that._offset(that.wrapper);
    that.wrapperOffsetLeft = -offset.left;
    that.wrapperOffsetTop = -offset.top;

    that.scroller.style.webkitTransitionDuration = '0';
    
    // Prepare scrollbars
    that._scrollbar('h');
    that._scrollbar('v');

	
	//alert("b4 reset");
	that._resetPos(200);
	//that.options.hStrip	&& that.toggleFadeImgs();
}

// Handle events - outsourced to get context
kony.widgets.touch.konyScroller.prototype.handleEvent = function (e)
{
    var that = this;
	
	// Fix for select jump issue on iPhone
	if(e.target.tagName == "SELECT")
	{
		if(!that.transformed)
		{
		
			var matrix = getComputedStyle(that.scroller).webkitTransform.replace(/[^0-9-.,]/g, '').split(',');
			
			//console.warn("1: " + matrix.toString());
			//console.warn("11" + that.scroller.style.webkitTransform);
			
			that.transformed = true;
			
			that.scroller.style.webkitTransform = "none";
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
			
			that.scroller.style.webkitTransform = "translate3d(" + left + "," + top + ",0)";

			// Reset left, top
			// TODO: fix slight jerky effect
			that.scroller.style.left  = 0;
			that.scroller.style.top =  0;

		}
	}
	
	// Enable angular direction for imgstrip
	if(e.type!= "orientationchange" && e.type!= "resize")
	{
		if(e && e.target && e.target.getAttribute && e.target.getAttribute("konywidgettype") == "Khstrip")
			this.angularDirection = true;
	}
	else
		this.angularDirection = false;
	
    switch(e.type)
    {
		case "touchstart":
		case "mousedown":
			that.onTouchStart(e);
			break;
		case "touchmove": 
		case "mousemove": 
			that.onTouchMove(e); 
			break;
		case "touchend":
		case "mouseup": 
			that.onTouchEnd(e); 
			break;
        case 'mouseout':
           	that.onMouseOut(e);
           	break;
		case 'orientationchange':
		case 'resize':
			that.resize(e); break;
    }
}

// Refresh when window is resized / orientation is changed
kony.widgets.touch.konyScroller.prototype.resize = function () 
{
	var that = this;
	//if(!that.options.scrollbox)
	//	kony.widgets.Scroller.setHeight(that.options.formid);
	
    setTimeout(function () {
        that.refresh();
    }, 0);	
}


// Handle mousedown / touchstart - _start
kony.widgets.touch.konyScroller.prototype.onTouchStart = function(event)
{
   console.log("konyScroller onTouchStart");
   
    if (this.options.onBeforeScrollStart)
        this.options.onBeforeScrollStart.call(this, event);

    var touch = event.touches && event.touches[0] || event;
    this.extendTouchStart(touch);
}

// Handle mousemove / touchmove
kony.widgets.touch.konyScroller.prototype.onTouchMove = function(event)
{
	console.log("konyScroller onTouchMove");
	
    var touch = event.touches && event.touches[0] || event;
	// Prevent the default action
	event.preventDefault();
    this.extendTouchMove(touch);
}

kony.widgets.touch.konyScroller.prototype.onTouchEnd = function(event)
{
    console.log("konyScroller onTouchEnd");
	var touch = event.touches && event.touches[0] || event;
	this.extendTouchEnd(touch);
}

kony.widgets.touch.konyScroller.prototype.onMouseOut = function(e)
{
    var t = e.relatedTarget;

    if (!t) {
        this.onTouchEnd(e);
        return;
    }

    while (t = t.parentNode) if (t == this.wrapper) return;

    this.onTouchEnd(e);
}

kony.widgets.touch.konyScroller.prototype.extendTouchStart = function(touch)
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
        var matrix = getComputedStyle(this.scroller, null).webkitTransform.replace(/[^0-9-.,]/g, '').split(',');
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

    this.startTime = new Date().getTime();

    if(kony.events.touchSupported)		// 'ontouchstart' in window || kony.supports.Touch
    {
        this.scroller.addEventListener("touchmove", this, false);
        this.scroller.addEventListener("touchend", this, false);
    }
    else
    {
        this.scroller.addEventListener("mousemove", this, false);
        this.scroller.addEventListener("mouseup", this, false);
		this.scroller.addEventListener("mouseout", this, false);
    }

}

kony.widgets.touch.konyScroller.prototype.getAngle = function(deltaX, deltaY)
{
	// Calcualte direction
	var radians = Math.atan2(deltaY, deltaX); //radians
	var angle = Math.round(radians*180/Math.PI); //degrees

	//ensure value is positive
	if (angle < 0)
		angle = 360 - Math.abs(angle);
	
	return angle;
}

kony.widgets.touch.konyScroller.prototype.getMoveDirection = function(deltaX, deltaY)
{
    var angle = this.getAngle(deltaX, deltaY);
	//alert(angle);
	var direction;

    if ( (angle <= 45) && (angle >= 0) )
        direction = kony.widgets.touch.TouchContext.LEFT;

    else if ( (angle <= 360) && (angle >= 315) )
        direction = kony.widgets.touch.TouchContext.LEFT;

    else if ( (angle >= 135) && (angle <= 225) )
        direction = kony.widgets.touch.TouchContext.RIGHT;

    else if ( (angle > 45) && (angle < 135) )
		direction = kony.widgets.touch.TouchContext.DOWN;

    else
        direction = kony.widgets.touch.TouchContext.UP;
	
	return direction;
}

kony.widgets.touch.konyScroller.prototype.extendTouchMove = function(touch)
{
    var	deltaX = touch.pageX - this.pointX,
    deltaY = touch.pageY - this.pointY,
    newX = this.x + deltaX,
    newY = this.y + deltaY,
    c1, c2,
    timestamp = new Date().getTime();
	
	
	// direction
	if(this.angularDirection)
	{
		var direction = this.getMoveDirection(deltaX, deltaY);
		if ((this.vScroll && (direction != kony.widgets.touch.TouchContext.UP && direction != kony.widgets.touch.TouchContext.DOWN)) || (this.hScroll && (		direction != kony.widgets.touch.TouchContext.LEFT && direction != kony.widgets.touch.TouchContext.RIGHT)))
			return;
	}
	
    this.pointX = touch.pageX;
    this.pointY = touch.pageY;


    // Slow down if outside of the boundaries
    if (newX > 0 || newX < this.maxScrollX)
        newX = this.x + (deltaX / 2);
    if (newY > this.minScrollY || newY < this.maxScrollY)
        newY = this.y + (deltaY / 2);

    // Ignore  if displacement is little
    if (this.absDistX < 6 && this.absDistY < 6)
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

    this.moved = true;
    this.animateTo(newX, newY);

    if (timestamp - this.startTime > 300)
    {
        this.startTime = timestamp;
        this.startX = this.x;
        this.startY = this.y;
    }
}

kony.widgets.touch.konyScroller.prototype.extendTouchEnd = function(touch)
{
    // Detach events
    
	if(kony.events.touchSupported)
    {
        this.scroller.removeEventListener("touchmove", this, false);
        this.scroller.removeEventListener("touchend", this, false);
    }
    else
    {
        this.scroller.removeEventListener("mousemove", this, false);
        this.scroller.removeEventListener("mouseup", this, false);
		this.scroller.removeEventListener("mouseout", this, false);
    }
	
    var momentumX = {
        dist:0,
        time:0
    },
    momentumY = {
        dist:0,
        time:0
    },
    duration = (new Date().getTime()) - this.startTime,
    newPosX = this.x,
    newPosY = this.y,
    newDuration;

	// direction
	if(this.angularDirection)
	{
		var direction = this.getMoveDirection(newPosX - this.startX, newPosY - this.startY);
		if ((this.vScroll && (direction != kony.widgets.touch.TouchContext.UP && direction != kony.widgets.touch.TouchContext.DOWN)) || (this.hScroll && (direction != kony.widgets.touch.TouchContext.LEFT && direction != kony.widgets.touch.TouchContext.RIGHT)))
			return;
	}
	
	
    // Calculate the momentum / friction for motion after user releases finger
    if (duration < 300)
    {
        momentumX = newPosX ? this._momentum(newPosX - this.startX, duration, -this.x, this.scrollerW - this.wrapperW + this.x, this.wrapperW) : momentumX;
        momentumY = newPosY ? this._momentum(newPosY - this.startY, duration, -this.y, (this.maxScrollY < 0 ? this.scrollerH - this.wrapperH + this.y - this.minScrollY : 0), this.wrapperH) : momentumY;

        newPosX = this.x + momentumX.dist;
        newPosY = this.y + momentumY.dist;

        if ((this.x > 0 && newPosX > 0) || (this.x < this.maxScrollX && newPosX < this.maxScrollX))
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
}


// _pos - Translate to specified location
kony.widgets.touch.konyScroller.prototype.animateTo = function(offsetX, offsetY)
{
    //alert("animateTo");
    var x = this.options.hScroll && !isNaN(offsetX) ? offsetX: 0;
    var y = this.options.vScroll && !isNaN(offsetY) ? offsetY: 0;


    // We use webkit-transforms with translate3d because these animations
    // will be hardware accelerated, and therefore significantly faster
    // than changing the top value.

    if (this.options.useTransform)
    {
        this.scroller.style.webkitTransform =  "translate3d(" + x + "px," + y + "px, 0)";
    }
    else
    {
        x = Math.round(x);
        y = Math.round(y);
        this.scroller.style.left = x + 'px';
        this.scroller.style.top = y + 'px';
    }

    // ??
    this.x = x;
    this.y = y;

    // Adjust scrollbars
    this._scrollbarPos('h');
    this._scrollbarPos('v');
}

// Adjusts the scrollbar position according to the scrollee offset
kony.widgets.touch.konyScroller.prototype._scrollbarPos = function (dir, hidden)
{
    var that = this,
    pos = dir == 'h' ? that.x : that.y,
    size;

    if (!that[dir + 'Scrollbar']) return;

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

    that[dir + 'ScrollbarWrapper'].style['webkit' + 'TransitionDelay'] = '0';
    that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
    that[dir + 'ScrollbarIndicator'].style['webkit' + 'Transform'] = 'translate3d(' + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + ',0)';
}

// Scrollbar markup
kony.widgets.touch.konyScroller.prototype._scrollbar = function (dir)
{
    //alert("in _scrollbar");
	
	var that = this,
    doc = document,
    bar;

    if (!that[dir + 'Scrollbar']) 
	{
           // alert("dir exists: " + dir);
		if (that[dir + 'ScrollbarWrapper']) 
		{
            if (that.options.useTransform) that[dir + 'ScrollbarIndicator'].style['webkit' + 'Transform'] = '';
            that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
            that[dir + 'ScrollbarWrapper'] = null;
            that[dir + 'ScrollbarIndicator'] = null;
        }

        return;
    }

    if (!that[dir + 'ScrollbarWrapper']) 
	{
        // Create the scrollbar wrapper
        //alert("dir: " + dir);
		bar = doc.createElement('div');

        if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
        else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

        bar.style.cssText += ';pointer-events:none; -webkit-transition-property:opacity; -webkit-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden; opacity:' + (that.options.hideScrollbar ? '0' : '1');

        that.wrapper.appendChild(bar);
        that[dir + 'ScrollbarWrapper'] = bar;

        // Create the scrollbar indicator
        bar = doc.createElement('div');
        if (!that.options.scrollbarClass) {
            bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9); -webkit-background-clip:padding-box; -webkit-box-sizing:border-box; ' + (dir == 'h' ? 'height:100%' : 'width:100%') + '; -webkit-border-radius:3px;border-radius:3px';
        }
        bar.style.cssText += ';pointer-events:none;-webkit-transition-property:-webkit-transform; -webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1); -webkit-transition-duration:0; -webkit-transform: translate3d(0,0,0)';
        //if (that.options.useTransition) bar.style.cssText += ';-' + 'webkit' + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

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
}

// Reset scroller position
kony.widgets.touch.konyScroller.prototype._resetPos = function (time)
{
    var that = this,
    resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
    resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

    if (resetX == that.x && resetY == that.y)
    {
        if (that.moved)
            that.moved = false;
		if (that.hScrollbar && that.options.hideScrollbar) 
		{
			that.hScrollbarWrapper.style.webkitTransitionDelay = '100ms';
			that.hScrollbarWrapper.style.opacity = '0';
		}
		if (that.vScrollbar && that.options.hideScrollbar) 
		{
			that.vScrollbarWrapper.style.webkitTransitionDelay = '100ms';
			that.vScrollbarWrapper.style.opacity = '0';
		}

        return;
    }
	
    that.scrollTo(resetX, resetY, time || 0);
}

kony.widgets.touch.konyScroller.prototype.scrollTo = function (x, y, time, relative) {
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
}

// kony.setFocus()
kony.widgets.touch.konyScroller.prototype.scrollToElement = function (el, time) 
{
	if (!el) return;
	if(!time)	time = 2000;	// 2s
	
	var that = this;
	pos = that._offset(el);
	pos.left += that.wrapperOffsetLeft;
	pos.top += that.wrapperOffsetTop;

	pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
	pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
	time = time === undefined ? Math.max(Math.abs(pos.left)*2, Math.abs(pos.top)*2) : time;

	//that.scrollTo(pos.left, pos.top, time);
	that.scrollTo(0, pos.top, time);
},

// Negate variables
kony.widgets.touch.konyScroller.prototype.stop= function () {
    cancelFrame(this.aniTime);
    this.steps = [];
    this.moved = false;
    this.animating = false;
},

kony.widgets.touch.konyScroller.prototype._startAni= function () {

    var that = this,
    startX = that.x, startY = that.y,
    startTime = Date.now(),
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
        var now = Date.now(),
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
        //alert(nextFrame);
        if (that.animating) that.aniTime = nextFrame(animate);
    })();
}

// Calculate the momentum - alter speed n time here
kony.widgets.touch.konyScroller.prototype._momentum = function (dist, time, maxDistUpper, maxDistLower, size)
{
    var deceleration = 0.0006,
    speed = Math.abs(dist) / time, /* Multiply the speed for ssmoother scroll*/
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
}

kony.widgets.touch.konyScroller.prototype._offset =  function (el)
{
    var left = -el.offsetLeft,
    top = -el.offsetTop;

    while (el = el.offsetParent)
    {
        left -= el.offsetLeft;
        top -= el.offsetTop;
    }

    return {
        left: left,
        top: top
    };
}

kony.widgets.touch.konyScroller.prototype.destroy =  function ()
{
    var that = this;
	// Remove the event listeners
    if(kony.events.touchSupported)
        that.scroller && that.scroller.removeEventListener("touchstart", that, false);
    else
		that.scroller && that.scroller.removeEventListener("mousedown", that, false);
	
	if('onorientationchange' in window)
		window.removeEventListener("orientationchange", that, false);
	else
		window.removeEventListener("resize", that, false);
	
	if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
}

var nextFrame =  window.webkitRequestAnimationFrame|| function(callback) {
    return setTimeout(callback, 1);
};

var cancelFrame = window.webkitCancelRequestAnimationFrame || clearTimeout;

function handleOrientationSpecificEvents()
{
    
 //   alert("hi");
    var popupelem = document.getElementById("popup");
    //  alert("popupelem"+popupelem);
        
    if(popupelem)
    {
        var b=document.getElementById("dCover");
        if(b)
            b.parentNode.removeChild(b);
        
        setTimeout(function () {
        kony.widgets.Popup.Util.pCover(true);
        kony.widgets.Popup.Util.positionLayer("popup");
        }, 100);	
         
           
       
    }
}