//Popup Constructor
konyLua.Popup = function(bconfig, lconfig, pspconfig) {
      
	konyLua.Popup.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	this.ismodal = bconfig.ismodal; 
	this.transparencybehindthepopup = bconfig.transparencybehindthepopup;
  
	this.containerheight = pspconfig.containerheight;

	//Internal Usage
	this.wType = "Popup";
	this.name = "konyLua.Popup";
  
	if(this.intransitionconfig)
		this.ptran = this.ptranIn = this.intransitionconfig.popuptransition; 
	if(this.outtransitionconfig)
		this.ptranOut = this.outtransitionconfig.popuptransition;
};

kony.inherits(konyLua.Popup, konyLua.Form2);

//Popup Methods

konyLua.Popup.prototype.destroy = function() {
	this.ondestroy && this.ondestroy(this);
	$KW.Popup.dismiss(this);
	this.addwidgetsdone = false;
	this.initdone = false;
	this.ownchildrenref = [];
	this.children = [];
};
	
konyLua.Popup.prototype.show = function() {
	
	if(!this.addwidgetsdone) { 
	 this.addwidgetsdone = true;
	 this.addwidgets && this.addwidgets(this);
  }

	!this.initdone && this.init && this.init(this);
    this.initdone = true;

	$KW.Popup.show(this);
};