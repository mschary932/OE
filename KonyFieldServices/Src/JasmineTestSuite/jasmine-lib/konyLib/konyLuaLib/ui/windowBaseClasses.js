kony.inherits = function(subClass, baseClass) {
   
   function inherit() {}
   
   inherit.prototype = baseClass.prototype;

   subClass.prototype = new inherit();
   subClass.prototype.constructor = subClass;
   subClass.baseConstructor = baseClass;
   subClass.superClass = baseClass.prototype;
};

konyLua = {

	Widget: function(bconfig, lconfig, pspconfig) {

		// Exception handling
		if(arguments.length < 3)
			throw new KonyError(101, "Error", "Invalid number of arguments");	// (errorcode, name, message)
			
		if (bconfig.id === undefined || bconfig.id === null || bconfig.id === '') {
			throw new KonyError(1102,'WidgetError','Widget cannot be created due to invalid input data.');
		}

		this.id = bconfig.id;
		this.skin = bconfig.skin;	
		this.focusskin =  bconfig.focusskin;			
        this.isvisible =  bconfig.isvisible===undefined ? true : (bconfig.isvisible && true);
		bconfig.i18n_text && (this.i18n_text = bconfig.i18n_text);
	
		this.contentalignment = lconfig.contentalignment;   //1-topleft, 2-topcenter, 3-topright, 4-middleleft, 5-center, 6-middleright, 7-bottomleft, 8-bottomcenter, 9-bottomright
		this.widgetalignment = lconfig.widgetalignment;
        this.margininpixel = lconfig.margininpixel;
        this.paddinginpixel = lconfig.paddinginpixel;
        this.margin = (!lconfig.margin) ? [null,0,0,0,0] : lconfig.margin ;   
        this.padding = (!lconfig.padding) ? [null,0,0,0,0] : lconfig.padding ; 
		this.containerweight = lconfig.containerweight || 0;

		this.blockeduiskin = this.buiskin =  pspconfig.blockeduiskin; 		
		this.onclick = bconfig.onclick;
		//Internal usage 
		this.enabled = false;
		
	},
	
	ContainerWidget: function(bconfig, lconfig, pspconfig) {
		
		konyLua.ContainerWidget.baseConstructor.call(this, bconfig, lconfig, pspconfig);

		this.orientation = bconfig.orientation || constants.BOX_LAYOUT_HORIZONTAL;		

		this.percent = (lconfig.percent === undefined) ? true : lconfig.percent;
		if(this.percent == false) this.widgetdirection = lconfig.layoutalignment;	  //1-LEFT,  2-MIDDLE, 3-RIGHT
		
		//Internal usage ( need to decide if  setters and getters are the way)
		this.ownchildrenref = [];
		this.children = [];	         
	},
	
	GroupWidget: function(bconfig, lconfig, pspconfig) {
		
		konyLua.GroupWidget.baseConstructor.call(this, bconfig, lconfig, pspconfig);

		this.onselection = bconfig.onselection;
		this.masterdata =  bconfig.masterdata;
		this.masterdatamap =  bconfig.masterdatamap; 	
	    this.selectedkeyvalue = null;
		this.selectedkey = bconfig.selectedkey || null;		
	}
	 	   
};

kony.inherits(konyLua.GroupWidget,konyLua.Widget);
kony.inherits(konyLua.ContainerWidget,konyLua.Widget);

//ContainerWidget Methods
konyLua.ContainerWidget.prototype.add = function(widgetarray) {	
	containerWidgetExtendAdd.call(this, widgetarray);
};
	
konyLua.ContainerWidget.prototype.addAt = function(widgetref, index) {
    containerWidgetExtendAddAt.call(this, widgetref, index);
};
	
konyLua.ContainerWidget.prototype.remove = function(widgetref) {
	containerWidgetExtendRemove.call(this, widgetref);
};

konyLua.ContainerWidget.prototype.removeAt = function(index) {
	return containerWidgetExtendRemoveAt.call(this, index);
};

konyLua.ContainerWidget.prototype.widgets = function() {
	var obj = this.ownchildrenref.slice(0);
	obj.unshift(null);		//Lua indexing 
	return obj;
};
	
//Internal Methods
konyLua.ContainerWidget.prototype.setparent = function(widgetarray) {
	containerWidgetExtendSetParent.call(this, widgetarray);
};

konyLua.ContainerWidget.prototype.createhierarchy = function (widgetarray) {
	containerWidgetExtendCreateHierarchy.call(this, widgetarray);
};

konyLua.ContainerWidget.prototype.removeReferences = function(widgetref) {
	containerWidgetExtendRemoveReferences.call(this, widgetref);
};

_konyConstNS = IndexJL ? konyLua : kony.ui;