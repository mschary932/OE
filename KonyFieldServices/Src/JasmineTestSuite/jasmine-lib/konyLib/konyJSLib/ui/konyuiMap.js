//Map Constructor
kony.ui.Map = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Map")); 
    
	kony.ui.Map.baseConstructor.call(this, bconfig, lconfig, pspconfig);
		
	this.provider = bconfig.provider || constants.MAP_PROVIDER_GOOGLE;
	this.mapKey = bconfig.mapKey;										//Not Supported
	this.mapClientId = bconfig.clientId; // support for client-id
	this.navControlsImageConfig = pspconfig.navControlsImageConfig;     
	this.mapSource = this.mapsrc = pspconfig.mapSource;
	this.screenLevelWidget = bconfig.screenLevelWidget;	
	this.defaultpinimage = bconfig.defaultPinImage;	
	this.locationdata =  bconfig.locationData;		
	this.zoomlevel = pspconfig.zoomLevel;
	this.markers = [];
	this.displaymaptypecontrols = true;
	
	this.onpinclick = bconfig.onPinClick;
	this.onselection = bconfig.onSelection;
	
	
	this.containerheight = lconfig.containerHeight;	
	this.containerheightreference = lconfig.containerHeightReference || constants.CONTAINER_HEIGHT_BY_FORM_REFERENCE;
	
	defineGetter(this, "containerHeight", function() {
		return this.containerheight;
	});
	defineSetter(this, "containerHeight", function(val) {
		this.containerheight = val;
		kony.model.updateView(this, "containerheight", val);
	});
	
	defineGetter(this, "displayMapTypeControls", function() {
		return this.displaymaptypecontrols;
	});
	defineSetter(this, "displayMapTypeControls", function(val) {
		this.displaymaptypecontrols = val;
	});
	
	defineGetter(this, "containerHeightReference", function() {
		return this.containerheightreference;
	});
	defineSetter(this, "containerHeightReference", function(val) {
		this.containerheightreference = val;
		kony.model.updateView(this, "containerheightreference", val);
	});
	
	
	//Internal Usage
    this.wType = "Map";
    this.name = "kony.ui.Map";
    
	var address =  pspconfig.address;		
	defineGetter(this, "address", function() {
		return address;
	});	
	defineSetter(this, "address", function(val) {
		address = val;
		$KW[this.wType]["updateView"](this, "address", val);
	});
	
	this.widgetdatamapforcallout = bconfig.widgetDataMapForCallout; // Added widgetDataMapForCallout mapping to fix JSPFQA11350, 26488
	defineGetter(this, "widgetDataMapForCallout", function() {
		return this.widgetdatamapforcallout;
	});	
	defineSetter(this, "widgetDataMapForCallout", function(val) {
		this.widgetdatamapforcallout = val;
	});
	
	this.callouttemplate = bconfig.calloutTemplate;   
	this.callouttemplate && (this.callouttemplate.containerWeight = lconfig.containerWeight);
    defineGetter(this, "calloutTemplate", function() {
        return this.callouttemplate;
    });
    defineSetter(this, "calloutTemplate", function(val) {
        this.callouttemplate = val;       
    });
	
	/* calloutwidth getter and setter */
	defineGetter(this, "calloutWidth", function() {
		return this.callouttemplate ? this.callouttemplate.containerWeight : null;
	});
	defineSetter(this, "calloutWidth", function(val) {
		!!val && this.callouttemplate && (this.callouttemplate.containerWeight = val);
		$KW.Map.setUpInteractiveCanvasMap();
	});

	var mode = pspconfig.mode || constants.MAP_VIEW_MODE_NORMAL;
	defineGetter(this, "mode", function() {
		return mode;
	});	
	defineSetter(this, "mode", function(val) {
		mode = val;
		$KW[this.wType]["updateView"](this, "mode", val);
	});		
	

	this.setGetterSetter();
    bconfig.locationData && $KW[this.wType]["updateView"](this, "locationdata", bconfig.locationData);
};

kony.inherits(kony.ui.Map,kony.ui.Widget);

kony.ui.Map.prototype.setGetterSetter = function() {

	defineGetter(this, "zoomLevel", function() {
		return this.zoomlevel;
	});	
	defineSetter(this, "zoomLevel", function(val) {
		this.zoomlevel = val;
		$KW[this.wType]["updateView"](this, "zoomlevel", val);
	});

	defineGetter(this, "locationData", function() {
		return this.locationdata;
	});	
	defineSetter(this, "locationData", function(val) {
		this.locationdata = val;
		$KW[this.wType]["updateView"](this, "locationdata", val);
	});

	defineGetter(this, "defaultPinImage", function() {
		return this.defaultpinimage;
	});	
	defineSetter(this, "defaultPinImage", function(val) {
		this.defaultpinimage = val;
		$KW[this.wType]["updateView"](this, "defaultpinimage", val);
	});	

	defineGetter(this, "onPinClick", function() {
		return this.onpinclick;
	}); 
	defineSetter(this, "onPinClick", function(val) {
		this.onpinclick = val;
	});

	defineGetter(this, "onSelection", function() {
		return this.onselection;
	}); 
	defineSetter(this, "onSelection", function(val) {
		this.onselection = val;
	});

}

//Map Methods	
kony.ui.Map.prototype.navigateTo = function(index, showcallout) {   
  	$KW.Map.navigateTo(this, index, showcallout);
};

kony.ui.Map.prototype.navigateToLocation = function(locationData,showcallout,dropPin) {
	$KW.Map.navigateToLocation(this,locationData,showcallout,dropPin);
};
kony.ui.Map.prototype.routeLocations = function(startLocation,endLocation,locations,routeConfig) {
	$KW.Map.routeLocations(this,startLocation,endLocation,locations,routeConfig);
};
kony.ui.Map.prototype.dismissCallout = function(mapid, location) {
	$KW.Map.dismissCallout(this,mapid, location);
};