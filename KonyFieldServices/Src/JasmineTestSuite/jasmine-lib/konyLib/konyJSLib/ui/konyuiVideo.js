//Video Constructor
kony.ui.Video = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Video")); 
		
	kony.ui.Video.baseConstructor.call(this, bconfig, lconfig, pspconfig);
		
    ////Internal Usage
    this.wType = "Video";
    this.name =  "kony.ui.Video";

   
	var source = bconfig.source;	
	defineGetter(this, "source", function() {
		return source;
	});	
	defineSetter(this, "source", function(val) {
		source = val;
		$KW[this.wType]["updateView"](this, "source", val);
	});
	
	//JSPFQA8002 bug fix: controls property is in PSPconfig
	var controls =  pspconfig.controls;
	this.controls = pspconfig.controls;
	defineGetter(this, "controls", function() {
		return controls;
	});	
	defineSetter(this, "controls", function(val) {
		controls = val;
		$KW[this.wType]["updateView"](this,  "controls" , val);
	});	
	
	var poster = pspconfig.poster;	
	defineGetter(this, "poster", function() {
		return poster;
	});	
	defineSetter(this, "poster", function(val) {
		poster = val;
		$KW[this.wType]["updateView"](this,  "poster" , val);
	});	
	
};
kony.inherits(kony.ui.Video,kony.ui.Widget);