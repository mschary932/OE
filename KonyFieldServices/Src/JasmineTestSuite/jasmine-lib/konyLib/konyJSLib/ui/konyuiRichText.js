//RichText Constructor
kony.ui.RichText = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("RichText")); 
    
	kony.ui.RichText.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  
	var text = bconfig.text || "";
	defineGetter(this, "text", function() {
		return text;
	});	
	defineSetter(this, "text", function(val) {
		text = val;
		if(this.canUpdateUI)
		{
			// i18n status lost
			this.i18n_text = "";
			$KW[this.wType]["updateView"](this, "text" , val);
		}
	});
	
	this.linkskin = bconfig.linkSkin;
	this.linkfocusskin = pspconfig.linkFocusSkin;
	
	defineGetter(this, "linkSkin", function() {
		return this.linkskin;
	});	
	defineSetter(this, "linkSkin", function(val) {
		this.linkskin = val;
		$KW[this.wType]["updateView"](this, "linkskin", val);
	});
	
	defineGetter(this, "linkFocusSkin", function() {
		return this.linkfocusskin;
	});	
	defineSetter(this, "linkFocusSkin", function(val) {
		this.linkfocusskin = val;
		$KW[this.wType]["updateView"](this, "linkfocusskin", val);
	});



	
	//Internal Usage
	this.canUpdateUI = true;
	this.wType = "RichText";
	this.name = "kony.ui.RichText";
	
};
kony.inherits(kony.ui.RichText,kony.ui.Widget);