//Form Constructor
kony.ui.Form2 = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Form2"));
	
	this.layouttype = (typeof bconfig.layoutType == "undefined") ? kony.flex.VBOX_LAYOUT : bconfig.layoutType;   
	if(this.layouttype == kony.flex.VBOX_LAYOUT)	
		kony.ui.Form2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
	else{
		kony.ui.FlexScrollContainer.call(this, bconfig, lconfig, pspconfig);
		$KU.extend(Object.getPrototypeOf ? Object.getPrototypeOf(this) : this.constructor.prototype, kony.ui.FlexScrollContainer.prototype);
	}	
	
	this.type = bconfig.type;    //1 = Native 2 = SPA 3 = TC
    this.needAppMenu = this.needappmenu = bconfig.needAppMenu === undefined ? true :(bconfig.needAppMenu && true);
	this.enabledForIdleTimeout = this.enabledforidletimeout = bconfig.enabledForIdleTimeout || pspconfig.enabledForIdleTimeout || false;
	
	this.headers = bconfig.headers && bconfig.headers.splice(0);
	this.footers = bconfig.footers && bconfig.footers.splice(0);
	
	this.addWidgets = bconfig.addWidgets;
    this.onDestroy = bconfig.onDestroy;
	this.init = bconfig.init;
	this.preshow = bconfig.preShow;
	this.postshow = bconfig.postShow;
	this.onhide = bconfig.onHide || pspconfig.onHide;
	this.onorientationchange = bconfig.onOrientationChange;
	this.layouttype = (typeof bconfig.layoutType == "undefined") ? kony.flex.VBOX_LAYOUT : bconfig.layoutType;
	defineGetter(this, "layoutType", function() {
		return this.layouttype;
	});	
	
	
	this.displayOrientation = lconfig.displayOrientation || constants.FORM_DISPLAY_ORIENTATION_BOTH;  //1-Landscape, 2-Portrait, 3-Both
	this.resetFocusToTop = pspconfig.resetFocusToTop;
	this.useTransform = pspconfig.useTransform;
	this.retainScrollPosition = this.retainscrollposition = pspconfig.retainScrollPosition || false;
	this.dockableAppmenu = this.dockableappmenu = pspconfig.dockableAppmenu;
	this.dockableHeader	= this.dockableheader = pspconfig.dockableHeader;
  	this.dockableFooter = this.dockablefooter = pspconfig.dockableFooter;
	this.intransitionconfig = pspconfig.inTransitionConfig;
	this.outtransitionconfig = pspconfig.outTransitionConfig;
	
	this.allboxes = [];	
	this.wType = "Form";
	this.addWidgetsdone = this.initdone = false;
	this.name = "kony.ui.Form2";
    $KG.allforms[this.id] = this;
	
	defineGetter(this, "layoutType", function() {
		return this.layouttype;
	});	

    var title = bconfig.title;		
	defineGetter(this, "title", function() {
		return title;
	});	
	defineSetter(this, "title", function(val) {
		title = val;
		$KW[this.wType]["updateView"](this,  "title" , val);
	});
	
	bconfig.i18n_title && (this.i18n_title = bconfig.i18n_title);
	
	kony.ui.Form2.prototype.setGetterSetter();

	this.headers && this.commonHeaderFooterSetup("headers"); 
    this.footers && this.commonHeaderFooterSetup("footers");

	var addWidgets = bconfig.addWidgets;
	defineGetter(this, "addWidgets", function() {
		return addWidgets;
	});	
	defineSetter(this, "addWidgets", function(val) {
		addWidgets = val;
		this.addWidgetsdone = false;

	}); 

	this.formgetter = function () {
	 var id = bconfig.id;
	 var that = this;
	 defineGetter(window, id, function() {
	  if(!that.addWidgetsdone) {
	   that.addWidgetsdone=true;
	   that.ownchildrenref = [];
	   that.children = [];
	   that.addWidgets && that.addWidgets(that);
	  }
	  return that;
	 }); 
	};
	   
	this.formsetter = function() {
	 var id = bconfig.id; 
	 var that = this;
	 defineSetter(window, id, function() { 
	  return that;
	 }); 
	};
	this.formgetter();
	this.formsetter();	
	
	this.ondeviceback = pspconfig.onDeviceBack;
	defineGetter(this, "onDeviceBack", function() {
		return this.ondeviceback;
	});	
		
	defineSetter(this, "onDeviceBack", function(val) {
		this.ondeviceback = val;
	});
};   	 	   

kony.inherits(kony.ui.Form2, kony.ui.ContainerWidget);


//Form Methods
kony.ui.Form2.prototype.add = function() {
	var widgetarray = [].slice.call(arguments);
	formWidgetExtendAdd.call(this, widgetarray);
};
	
kony.ui.Form2.prototype.addAt = function(widgetref, index) {	    
   formWidgetExtendAddAt.call(this, widgetref, index);	
};
	
kony.ui.Form2.prototype.destroy = function() {
	this.onDestroy && this.onDestroy(this);
	var widgets = this.widgets();
	for(var i=0; i<widgets.length; i++){
		delete this[widgets[i].id];
	}
	this.addWidgetsdone = false;
	this.initdone = false;
	this.ownchildrenref = [];
	this.children = [];
};
	
kony.ui.Form2.prototype.remove =  function(widgetref) {	
 	formWidgetExtendRemove.call(this, widgetref);
};
	
kony.ui.Form2.prototype.removeAt = function(index) {
	return formWidgetExtendRemoveAt.call(this, index);
};

kony.ui.Form2.prototype.removeAll = function() {
	formWidgetExtendRemoveAll.call(this);
};
	
kony.ui.Form2.prototype.show = function() {  

	if(!this.addWidgetsdone) { 
	 this.addWidgetsdone = true;
	 this.ownchildrenref = [];
	 this.children = [];	
        if(this.addWidgets){
            if(typeof this.addWidgets == "string"){
                window[this.addWidgets](this);
            }else if(typeof this.addWidgets == "function"){
                this.addWidgets(this);
            }
        }
    }
	
	if(this.name == "kony.ui.Form") {
		!this.masterdataloaddone && this.masterdataload && this.masterdataload.call(this);
		!this.transactionaldataloaddone && this.transactionaldataload && this.transactionaldataload.call(this);
		this.transactionaldataloaddone = this.masterdataloaddone = true;
	} else {
		!this.initdone && this.init && this.init(this);
		this.initdone = true;
	}
	$KU.setActiveInput();
	if($KU.isAndroid && $KG.activeInput)
		$KU.hideKeyboard($KW.Form.show, this);
	else	
		$KW.Form.show(this);
	
};

kony.ui.Form2.prototype.scrollToWidget = function(widgetref){
	$KW.Form.scrollToWidget(this, widgetref);
};

kony.ui.Form2.prototype.scrollToBeginning = function(){
	$KW.Form.scrollToBeginning(this);
};

kony.ui.Form2.prototype.scrollToEnd = function(){
	$KW.Form.scrollToEnd(this);
};

kony.ui.Form2.prototype.widgets = function(){
	return kony.ui.ContainerWidget.prototype.widgets.call(this);
};

//Internal Methods
kony.ui.Form2.prototype.createFormLevelHierarchy = function(widgetarray) {
	formWidgetExtendCreateFormLevelHierarchy.call(this, widgetarray);
};

kony.ui.Form2.prototype.commonHeaderFooterSetup = function(containertype) {
	formWidgetExtendCommonHeaderFooterSetup.call(this, containertype);
};

kony.ui.Form2.prototype.setGetterSetter = function() {

	defineGetter(this, "preShow", function() {
		return this.preshow;
	});	
	defineSetter(this, "preShow", function(val) {
		this.preshow = val;
	});

	defineGetter(this, "postShow", function() {
		return this.postshow;
	});	
	defineSetter(this, "postShow", function(val) {
		this.postshow = val;
	});

	defineGetter(this, "onHide", function() {
		return this.onhide;
	});	
	defineSetter(this, "onHide", function(val) {
		this.onhide = val;
	});
	
	defineGetter(this, "onOrientationChange", function() {
		return this.onorientationchange;
	});	
	defineSetter(this, "onOrientationChange", function(val) {
		this.onorientationchange = val;
	});

	defineGetter(this, "inTransitionConfig", function() {
		return this.intransitionconfig;
	});
	defineSetter(this, "inTransitionConfig", function(val) {
		this.intransitionconfig = val;
	});

	defineGetter(this, "outTransitionConfig", function() {
		return this.outtransitionconfig;
	});
	defineSetter(this, "outTransitionConfig", function(val) {
		this.outtransitionconfig = val;
	});

};

//Functions used by Box Templates too
kony.ui.Form2.getallboxes = function(widgetarray){
    var wArray = widgetarray;
    if(!(widgetarray instanceof Array))     
      wArray = [ widgetarray ];
    formWidgetExtendGetAllBoxes.call(this, wArray);
};

kony.ui.Form2.addHeaderorFooter = function() {
	formWidgetExtendaddHeaderorFooter.call(this, arguments);	
};




// Earlier Version of Form (All Deprecated properties are to be supported)
kony.ui.Form = function(bconfig, lconfig, pspconfig) {

	kony.ui.Form.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	this.transactionaldataload = bconfig.transactionalDataLoad;  
	this.masterdataload =  bconfig.masterDataLoad;			
	this.transactionaldataloaddone = this.masterdataloaddone = false;
	
	this.type = pspconfig.formType;     //1 = Native 2 = SPA 3 = TC 
		this.preShow = this.preshow = pspconfig.preShow;
		this.postShow = this.postshow = pspconfig.postShow;
		this.onHide = this.onhide = pspconfig.onHide;
		
	this.needAppMenu = this.needappmenu = pspconfig.needAppLevelMenu === undefined ? true :(pspconfig.needAppLevelMenu && true);
	
  	this.headers = pspconfig.globalHeaders && pspconfig.globalHeaders.splice(0);
  	this.footers = pspconfig.globalFooters && pspconfig.globalFooters.splice(0);

  	this.headers && this.commonHeaderFooterSetup("headers"); 
  	this.footers && this.commonHeaderFooterSetup("footers"); 

	this.name = "kony.ui.Form";
}

kony.inherits(kony.ui.Form, kony.ui.Form2);
