/*
 * Widget : SlotView
*/

// prefix
//$KW.SlotView = function(container, imagePath, totalFrames, options, imagesArray)
// index
$KW.SlotView = function(container, imagesArray, options)
{
	this.arguments = {};
	this.arguments.container = container;
	//this.arguments.imagePath = imagePath;
	//this.arguments.totalFrames = totalFrames;
	this.arguments.totalFrames = imagesArray.length;
	this.imagesArray = imagesArray;
	
	// default options
	this.options = {
		imageIndexOffset: 1,        // (number)   maps the position [0,0] to image 001.jpg, etc.
		loaders: 3,                 // (number)   how many concurrent image loaders
		initialLoad: 4,             // (number)   images to load initially per row (4 = every 90 degrees)
		noCache: false,             // (boolean)  append a random query string to the image URLs?
		initialPos: [0,0],          // (mixed)    initial VR position (number or array)
		invert: [true,false],      // (mixed)    invert the x/y axes?

		infiniteAxis: [true,false], // (array)    defines which axes can spin infinitely

		autoPlay: false,            // (boolean)  begin auto spin right away?
		fps: 25,                    // (number)   frames per second (used for the intro, auto spinning, and throwing)

		grabbable: true,            // (boolean)  can the user grab the VR to manually spin it?
		grabRotateDistance: 1000,   // (number)   pixels the cursor must travel to view a full axis

		throwable: true,            // (boolean)  does the VR have inertia when releasing a grab?
		minThrowDuration: 0.5,      // (number)   minimum throw duration in seconds
		maxThrowDuration: 1.5,      // (number)   maximum throw duration in seconds

		spinnable: true,            // (boolean)  add spinners to on axes marked as infinite?
		minSpinDuration: 3,         // (number)   minimum time in seconds the VR will take to rotate 360 degrees

		intro: $KW.SlotView.SpinIntro,     // (function) function that returns the intro sequence (array of position arrays)
		introSpins: 0.5,            // (number)   times the VR rotates 360 degrees in the intro
		introDuration: 1,           // (number)   intro duration in seconds

		mobileTotalFrames: null     // (mixed)    total frames to show on a mobile device (number or array)
	}
	
	// override with user defined options
	for (i in options) this.options[i] = options[i];

	this.initialize();
}

// TODO
$KW.SlotView.SpinIntro = function(vr){
	var totalFrames = vr.options.fps * vr.options.introDuration,
		introInitialRow = (typeof vr.options.introInitialRow != 'undefined') ? vr.options.introInitialRow : vr.options.initialPos[1],
		rowDiff = introInitialRow - vr.options.initialPos[1],
		queue = [];

	for (var i=0; i<totalFrames; i++) {
		var percent = i/totalFrames,
			speed = Math.pow(percent-1,4),
			posX = Math.floor(speed * vr.totalFrames[0] * vr.options.introSpins) + vr.options.initialPos[0],
			posY = Math.floor(speed * rowDiff) + vr.options.initialPos[1];

		// prevent doubles
		//if (!queue.length || queue.last()[0] != posX || queue.last()[1] != posY) 
		if (!queue.length || queue[queue.length-1][0] != posX || queue[queue.length-1][1] != posY) 
		{
			queue.push(vr.validatePos([posX, posY], true));
		}
	}

	return queue;
};

$KW.SlotView.options = {
	
};

$KW.SlotView.prototype.initialize = function()
{
	// No cache
	function convertToArray(mixed, second)
	{
		return (typeof mixed[0] == 'undefined') ? [mixed, second] : mixed;
	}

	if (this.options.noCache) this.random = Math.floor(Math.random()*10000000);
	
	// mobile
	//this.mobile = $KU.isMobile();
	this.mobile = $KU.isTouchSupported;
	if (this.mobile) 
	{
		//this.options.intro = null;
		this.options.autoPlay = true;
		this.options.spinnable = false;
		this.options.throwable = true;

		this.mobileStrings = {
			mousedown: 'touchstart',
			mousemove: 'touchmove',
			mouseup:   'touchend'
		};
	}

	// dom
	this.container = document.getElementById(this.arguments.container);
	//this.vr = document.createElement('div');
	this.vr = document.getElementById(this.arguments.container).children[0];
	//this.container.appendChild(this.vr);

	// images
	//this.imagePathParts = this.arguments.imagePath.match(/^([^#]*)(#+)([^#]*)$/);
	//this.numDigits = this.imagePathParts[2].length;

	// convert totalFrames and initialPos to x,y coordinates
	this.totalFrames = convertToArray(this.arguments.totalFrames, 1);
	if (this.mobile && this.options.mobileTotalFrames) {
		var actual = this.totalFrames;
		this.totalFrames = convertToArray(this.options.mobileTotalFrames, 1);
		this.frameMultipliers = [ actual[0] / this.totalFrames[0], actual[1] / this.totalFrames[1] ];
	} else {
		this.frameMultipliers = [1,1];
	}
	this.options.initialPos = convertToArray(this.options.initialPos, 0);

	this.options.invert = convertToArray(this.options.invert, false);

	this.frames = [];
	for (var i=0; i<this.totalFrames[0]; i++) {
		this.frames[i] = [];
	}

	// options conversions
	this.playIntervalDuration = 1000 / this.options.fps;
	this.minSpinIntervalDuration = (this.options.minSpinDuration * 1000) / this.totalFrames[0];
	this.minThrowFrames = Math.floor(this.options.minThrowDuration * this.options.fps);
	this.maxThrowFrames = Math.floor(this.options.maxThrowDuration * this.options.fps);

	// state
	this.currentPos;
	this.playing = false;
	this.grabbing = false;
	this.spinning = false;

	if (this.options.intro) {
		// load and play the intro
		this.introSequence = this.options.intro(this);
		this.loader = new $KW.SlotView.LoaderController(this, this.introSequence.slice(0), this.playIntro.bind(this));
	}
	else {
		this.loadAllFrames();
		this.gotoPos(this.options.initialPos);
		this.makeInteractive();

		// auto play?
		if (this.options.autoPlay) {
			this.play();
		}
	}
};

/* Mobile */
$KW.SlotView.prototype.getStr = function(str)
{
	return this.mobile ? this.mobileStrings[str] : str;
};

$KW.SlotView.prototype.getEvent = function(event)
{
	if(!event)
		event = window.event;
	if (event.touches) {
		// ignore multi-touch
		if (event.touches.length > 1) return false;

		if (event.touches.length) {
			event.clientX = event.touches[0].clientX;
			event.clientY = event.touches[0].clientY;
		}
	}

	return event;
};

/* Intro */

$KW.SlotView.prototype.playIntro = function()
{
	this.introInterval = setInterval(this.gotoNextIntroFrame.bind(this), this.playIntervalDuration);
	this.loadAllFrames();
},

$KW.SlotView.prototype.gotoNextIntroFrame = function()
{
	this.gotoPos(this.introSequence.shift());

	// finished?
	if (!this.introSequence.length) {
		clearInterval(this.introInterval);
		this.makeInteractive();
	}
};

/* Loading */
$KW.SlotView.prototype.isPosLoaded = function(pos)
{
	return (typeof this.frames[pos[0]] != 'undefined' && typeof this.frames[pos[0]][pos[1]] != 'undefined');
};

$KW.SlotView.prototype.createLoadPlan = function(total, skip)
{
	if (!skip) return [0];
	var plan = [];
	do {
		for (var i=0; i<total; i+=skip) {
			var f = Math.floor(i);
			if (plan.indexOf(f) == -1) {
				plan.push(f);
			}
		}
		if (skip == 1) return plan;
		if ((skip /= 2) < 1) skip = 1;
	} while (true);
};

$KW.SlotView.prototype.loadAllFrames = function()
{
	// create the queue
	var queue = [],
		skipX = Math.floor(this.totalFrames[0] / this.options.initialLoad),
		planX = this.createLoadPlan(this.totalFrames[0], skipX),
		skipY = Math.floor(this.totalFrames[1] / this.options.initialLoad),
		planY = this.createLoadPlan(this.totalFrames[1], skipY);

	for (var y=0; y<planY.length; y++) {
		for (var x=0; x<planX.length; x++) {
			queue.push(this.validatePos([ planX[x]+this.options.initialPos[0], planY[y]+this.options.initialPos[1] ], true));
		}
	}

	// load the images
	this.loader = new $KW.SlotView.LoaderController(this, queue);
	
	queue = null;
	skipX = null;
	planX = null;
	skipY = null;
	planY = null;
};

$KW.SlotView.prototype.getImageSource = function(pos)
{
	var x = this.options.invert[0] ? (this.totalFrames[0]-1) - pos[0] : pos[0],
		y = this.options.invert[1] ? (this.totalFrames[1]-1) - pos[1] : pos[1],
		frame = (Math.floor(y*this.totalFrames[0]*this.frameMultipliers[0]*this.frameMultipliers[1]) + Math.floor(x*this.frameMultipliers[0]) + this.options.imageIndexOffset) + '';

	
	/*
	while (frame.length < this.numDigits)
	{
		frame = '0'+frame;
	}
	*/
	
	// prefix based image fetching
	//return this.imagePathParts[1] + frame + this.imagePathParts[3] + (this.options.noCache ? '?'+this.random : '');
	return $KU.getImageURL(this.imagesArray[frame-1]) + (this.options.noCache ? '?'+this.random : '');	
};

$KW.SlotView.prototype.makeInteractive = function()
{
	if (this.options.grabbable) 
	{
		// grab events
		this.bindGrabStart = this.onGrabStart.bind(this);
		this.bindGrabChange = this.onGrabChange.bind(this);
		this.bindGrabEnd = this.onGrabEnd.bind(this);
		//kony.events.addEventListener(this.vr, this.getStr('mousedown'), this.bindGrabStart);
		kony.events.addEventListener(this.vr.parentNode, this.getStr('mousedown'), this.bindGrabStart);
	}
};

$KW.SlotView.prototype.destroy = function() 
{
	this.unmakeInteractive();
	delete this.frames;
	delete this.introSequence;
	delete this.loader;
};

$KW.SlotView.prototype.unmakeInteractive = function() 
{
	if (this.mobile) 
	{
		if(this.vr && this.vr.children[0])
		{
			kony.events.removeEventListener(this.vr.children[0], 'touchmove', this.bindGrabChange);
			kony.events.removeEventListener(this.vr.children[0], 'touchend', this.bindGrabEnd);
		}
	}
	
	if (this.options.grabbable) 
	{
		// grab events
		if(this.vr && this.vr.parentNode)
			kony.events.removeEventListener(this.vr.parentNode, this.getStr('mousedown'), this.bindGrabStart);
	}
};

$KW.SlotView.prototype.atPosition = function(pos)
{
	return (this.currentPos && pos[0] == this.currentPos[0] && pos[1] == this.currentPos[1]);
};

$KW.SlotView.prototype.play = function()
{
	if (this.playing) return;
	this.playing = true;
	this.playInterval = setInterval(this.gotoNextFrame.bind(this), this.playIntervalDuration);
};

$KW.SlotView.prototype.pause = function()
{
	if (!this.playing) return;
	this.playing = false;
	clearInterval(this.playInterval);
};

$KW.SlotView.prototype.gotoNextFrame = function()
{
	this.gotoPos([ this.currentPos[0]+1, this.currentPos[1] ]);
};

$KW.SlotView.prototype.validatePos = function(pos, forceContinuous)
{
	for (var i=0; i<2; i++) {
		if (forceContinuous || this.options.infiniteAxis[i]) {
			while (pos[i] > this.totalFrames[i]-1) {
				pos[i] -= this.totalFrames[i];
			}
			while (pos[i] < 0) {
				pos[i] += this.totalFrames[i];
			}
		} else{
			if (pos[i] > this.totalFrames[i]-1) {
				pos[i] = this.totalFrames[i]-1;
			}
			if (pos[i] < 0) {
				pos[i] = 0;
			}
		}
	}
	return pos;
};

$KW.SlotView.prototype.gotoPos = function(pos, force)
{
	// keep the pos in bounds
	pos = this.validatePos(pos);

	// are we already here?
	if (!force && this.atPosition(pos)) return;

	// go to the pos
	this.currentPos = pos;

	this.frame = this.frames[pos[0]][pos[1]];
	if (typeof this.frame != 'undefined' && this.frame.nodeType) 
	{
		if (this.currentFrame) 
			this.vr.removeChild(this.currentFrame);
		else if(this.vr.children[0]) 
			this.vr.removeChild(this.vr.children[0]); //DEF2290
		this.currentFrame = this.frame;
		//kony.print("this.currentFrame: " + this.currentFrame);
		this.vr.appendChild(this.currentFrame);
	} 
	else 
	{
		this.loader.loadNow(pos);
	}
	delete this.frame;
};

/* Grabbing */
$KW.SlotView.prototype.onGrabStart = function(event)
{
	if (!(event = this.getEvent(event))) return;

	this.grabbing = true;
	
	kony.events.addEventListener(document, this.getStr('mousemove'), this.bindGrabChange);
	kony.events.addEventListener(document, this.getStr('mouseup'), this.bindGrabEnd);
	
	if (this.mobile) 
	{
		// bind events to img
		kony.events.addEventListener(this.vr.children[0], 'touchmove', this.bindGrabChange);
		kony.events.addEventListener(this.vr.children[0], 'touchend', this.bindGrabEnd);
	}

	this.grabHistory = [event];
	this.onGrabChange.clientX = this.onGrabChange.clientY = null;
	this.grabHistoryInterval = setInterval(this.updateGrabHistory.bind(this), 10);

	// save state for later
	this.onGrabStart.clientX = event.clientX;
	this.onGrabStart.clientY = event.clientY;
	this.onGrabStart.playing = this.playing;
	this.onGrabStart.pos = this.currentPos;

	// pause and stop throwing
	this.pause();
	this.stopThrowing();

	// prevent default event behavior
	kony.events.preventDefault(event);
};

$KW.SlotView.prototype.onGrabChange = function(event)
{
	if (!(event = this.getEvent(event))) return;

	// IE likes to fire onmousemove even when the mouse has not moved
	if (!(event.clientX == this.onGrabStart.clientX && event.clientY == this.onGrabStart.clientY)) {

		// save the event for later
		this.onGrabChange.clientX = event.clientX;
		this.onGrabChange.clientY = event.clientY;

		var pos = this.getGrabPos(event);
		if (pos) this.gotoPos(pos);
	}

	// prevent the default behavior
	kony.events.preventDefault(event);
};

$KW.SlotView.prototype.getGrabPos = function(event)
{
	if(!event)
		event = window.event;
		
	var diffX = event.clientX - this.onGrabStart.clientX,
		diffY = event.clientY - this.onGrabStart.clientY,
		percentDiffX = diffX / this.options.grabRotateDistance,
		percentDiffY = diffY / this.options.grabRotateDistance,
		frameDiffX = Math.round(this.totalFrames[0] * percentDiffX),
		frameDiffY = Math.round(this.totalFrames[1] * percentDiffY),
		posX = this.onGrabStart.pos[0] + frameDiffX,
		posY = this.onGrabStart.pos[1] + frameDiffY;

	return [posX, posY];
};

$KW.SlotView.prototype.updateGrabHistory = function()
{
	var func = this.onGrabChange.clientX ? this.onGrabChange : this.onGrabStart;
	this.grabHistory.unshift({ clientX: func.clientX, clientY: func.clientY });
	if (this.grabHistory.length > 3) {
		this.grabHistory.splice(3);
	}
};

$KW.SlotView.prototype.onGrabEnd = function(event)
{
	if (!(event = this.getEvent(event))) return;

	this.grabbing = false;
	kony.events.removeEventListener(document, this.getStr('mousemove'), this.bindGrabChange);
	kony.events.removeEventListener(document, this.getStr('mouseup'), this.bindGrabEnd);
	clearInterval(this.grabHistoryInterval);

	// resume playing?
	if (this.onGrabStart.playing) {
		this.play();
	}
	else if (this.options.throwable) 
	{
		var diffX = event.clientX - this.grabHistory[this.grabHistory.length-1].clientX,
			diffY = event.clientY - this.grabHistory[this.grabHistory.length-1].clientY,
			loaded = true;

		if (diffX || diffY) 
		{
			var dist = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2)),
				frames = Math.floor(dist/5),
				clientX = this.grabHistory[this.grabHistory.length-1].clientX,
				clientY = this.grabHistory[this.grabHistory.length-1].clientY,
				changeX = true,
				changeY = true;

			// keep # of frames in-bounds
			if (frames < this.minThrowFrames) frames = this.minThrowFrames;
			else if (frames > this.maxThrowFrames) frames = this.maxThrowFrames;

			this.throwSequence = [];

			for (var i=0; i<frames; i++) 
			{
				var percent = i/frames,
					speed = Math.pow(percent-1,2),
					clientX = Math.floor(speed * diffX) + clientX,
					clientY = Math.floor(speed * diffY) + clientY,
					pos = this.validatePos(this.getGrabPos({ clientX: clientX, clientY: clientY }));

				// once an axis rotates slowly enough to use the same row/column for two frames,
				// stop rotating that axis entirely
				if (!changeX) pos[0] = this.throwSequence[this.throwSequence.length - 1][0];
				else if (this.throwSequence.length && pos[0] == this.throwSequence[this.throwSequence.length - 1][0]) changeX = false;
				if (!changeY) pos[1] = this.throwSequence[this.throwSequence.length - 1][1];
				else if (this.throwSequence.length && pos[1] == this.throwSequence[this.throwSequence.length - 1][1]) changeY = false;

				// cancel if every frame isn't loaded
				if (!this.isPosLoaded(pos)) {
					loaded = false;
					break;
				}

				this.throwSequence.push(pos);
			}

			if (loaded) {
				this.throwing = true;
				this.throwInterval = setInterval(this.throwStep.bind(this), this.playIntervalDuration);
			}
		}
	}
};

$KW.SlotView.prototype.throwStep = function()
{
	this.gotoPos(this.throwSequence.shift());
	if (!this.throwSequence.length) {
		this.stopThrowing();
	}
};

$KW.SlotView.prototype.stopThrowing = function()
{
	if (!this.throwing) return;
	this.throwing = false;
	clearInterval(this.throwInterval);
};

$KW.SlotView.prototype.onclick = function(event)
{
	if (this.focussed) return;

	this.vr.focus();
};

//
$KW.SlotView.LoaderController = function(vr, queue, onLoad)
{
	this.vr = vr;
	this.queue = queue;
	this.onLoad = onLoad;
	this.retiredLoaders = new Array();

	for (var i=0; i<this.vr.options.loaders; i++) 
	{
		this.loadNext(new $KW.SlotView.Loader(this));
	}
};

$KW.SlotView.LoaderController.prototype.loadNext = function(loader)
{
	if (this.queue.length) {
		loader.load(this.queue.shift());
	} else {
		this.retiredLoaders.push(loader);
		if (this.retiredLoaders.length == this.vr.options.loaders && typeof this.onLoad == 'function'){
			this.onLoad();
			this.onLoad = null;
		}
	}
};

$KW.SlotView.LoaderController.prototype.loadNow = function(pos)
{
	if (this.retiredLoaders.length) {
		this.retiredLoaders.shift().load(pos);
	} else {
		this.queue.unshift(pos);
	}
};

//
$KW.SlotView.Loader = function(controller) 
{
	this.controller = controller;
	this.loadNext = this.controller.loadNext.bind(this.controller);
};

$KW.SlotView.Loader.prototype.load = function(pos) 
{ 
	this.pos = pos;

	// skip if already loaded
	if (this.controller.vr.isPosLoaded(pos)) {
		this.controller.loadNext(this);
		return;
	}

	this.img = new Image();
	this.img.onload = this.onLoad.bind(this);
	var widgetModel = this.controller.vr.options.model;	
	var heightwidth = widgetModel.heightwidth;
	if((heightwidth && heightwidth != "0,0") || (widgetModel.referencewidth || widgetModel.referenceheight)) {
		var dimensions = heightwidth ? heightwidth.split(",") : [widgetModel.referenceheight, widgetModel.referencewidth];
		this.img.style.width = dimensions[1] + "px";
		this.img.style.height = dimensions[0] + "px";
	} else {
		this.img.style.width = "100%";     // DEF2124
 	}

	this.controller.vr.frames[this.pos[0]][this.pos[1]] = true;
	this.img.src = this.controller.vr.getImageSource(this.pos);
	delete this.img;
};

$KW.SlotView.Loader.prototype.onLoad = function(event)
{
	if(!event)
		event = window.event;
	var target = event.target || event.srcElement || this.img;
	this.controller.vr.frames[this.pos[0]][this.pos[1]] = target;
	if(target && target.onload)
		delete target.onload;
	$KU.setImgAspectRatio(this.controller.vr.options.model, target);
	if (this.controller.vr.atPosition(this.pos)) 
		this.controller.vr.gotoPos(this.pos, true);
	// load next
	this.loadNext(this);
};