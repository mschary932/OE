//Video Constructor
konyLua.Video = function(bconfig, lconfig, pspconfig) {
		
	konyLua.Video.baseConstructor.call(this, bconfig, lconfig, pspconfig);
		
	this.source = bconfig.source;	
	this.controls =  bconfig.controls;	
	this.poster = pspconfig.poster;	

	//Internal Usage
    this.wType = "Video";
    this.name =  "window.Video";
};

kony.inherits(konyLua.Video,konyLua.Widget);