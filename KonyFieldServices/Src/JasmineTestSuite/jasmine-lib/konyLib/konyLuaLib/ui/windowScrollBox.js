//ScrollBox Constructor
konyLua.ScrollBox = function(bconfig, lconfig, pspconfig) {
  
	konyLua.ScrollBox.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	this.totalWt = 0;
	this.position = bconfig.position || constants.BOX_POSITION_AS_NORMAL;
	this.enablescrollbypage = bconfig.enablescrollbypage || false;
	this.scrolldirection = bconfig.scrolldirection || constants.SCROLLBOX_SCROLL_HORIZONTAL;
	this.isvisible = bconfig.isvisible === undefined ? true : bconfig.isvisible;
	this.showscrollbars = bconfig.showscrollbars === undefined ? true : bconfig.showscrollbars;
	this.scrollbar = this.showscrollbars ? "scrollbar" : "none";

	this.containerheight = lconfig.containerheight;
	this.containerheightreference = lconfig.containerheightreference;

	this.scrollarrowconfig = (pspconfig.scrollarrowconfig && (pspconfig.scrollarrowconfig[0] || pspconfig.scrollarrowconfig[1] || pspconfig.scrollarrowconfig[2] || pspconfig.scrollarrowconfig[3])) ? pspconfig.scrollarrowconfig : undefined;
	if (this.scrollarrowconfig) this.scrollbar = "arrows";

	if (this.scrollarrowconfig && this.scrollarrowconfig.length >= 4) {
	this.leftarrowimage = this.scrollarrowconfig[1];
	this.toparrowimage = this.scrollarrowconfig[2];
	this.rightarrowimage = this.scrollarrowconfig[3];
	this.bottomarrowimage = this.scrollarrowconfig[4];
	}
  
	// scrollingevents
	this.scrollingevents = bconfig.scrollingEvents;
  
	this.wType = "ScrollBox";
	this.name = "konyLua.ScrollBox";
};

kony.inherits(konyLua.ScrollBox, konyLua.Box);

konyLua.ScrollBox.prototype.scrollToBeginning = function(){
  $KW.ScrollBox.scrollToBegining(this);
};

konyLua.ScrollBox.prototype.scrollToEnd = function(){
  $KW.ScrollBox.scrollToBegining(this);
};