//RichText Constructor
konyLua.RichText = function(bconfig, lconfig, pspconfig) {

    konyLua.RichText.baseConstructor.call(this, bconfig, lconfig, pspconfig);
    
    this.text = bconfig.text || "";
	 
	this.linkskin = bconfig.linkskin;
	this.linkfocusskin = pspconfig.linkfocusskin;
      
    //Internal Usage
    this.wType = "RichText";
    this.name = "konyLua.RichText";
}; 

kony.inherits(konyLua.RichText,konyLua.Widget);