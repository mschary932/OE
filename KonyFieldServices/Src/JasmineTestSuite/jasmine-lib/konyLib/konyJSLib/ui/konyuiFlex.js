//FlexContainer Constructor
kony.ui.FlexContainer = function(bconfig, lconfig, pspconfig) {
	
	kony.ui.FlexContainer.baseConstructor.call(this, bconfig, lconfig, pspconfig);  
    
    this.position = pspconfig && pspconfig.position;   	//Not Supported

	this.name = "kony.ui.FlexContainer";
	this.allboxes = [];				// As Box's are used as rowTemplates
	if (this.orientation == constants.BOX_LAYOUT_HORIZONTAL)
		this.wType = "HBox";
	else 
		this.wType = "VBox";	
	
	var backgroundimage = pspconfig.backgroundimage;	
	defineGetter(this, "backgroundimage", function() {
		return backgroundimage;
	});	
	defineSetter(this, "backgroundimage", function(val) {
		backgroundimage = val;
		kony.model["updateView"](this, "backgroundimage", val);
	});	
	
};

kony.inherits(kony.ui.FlexContainer,kony.ui.ContainerWidget);

//FlexContainer Methods	
kony.ui.FlexContainer.prototype.add = function() {	
	var widgetarray = [].slice.call(arguments); 
    boxWidgetExtendAdd.call(this, widgetarray);
};

kony.ui.FlexContainer.prototype.setDefaultUnit = function() {	
	var widgetarray = [].slice.call(arguments); 
    boxWidgetExtendAdd.call(this, widgetarray);
};

kony.ui.FlexContainer.prototype.addAt = function(widgetref, index) {
	boxWidgetExtendAddAt.call(this, widgetref, index)
};

kony.ui.FlexContainer.prototype.remove = function(widgetref) {
	boxWidgetExtendRemove.call(this, widgetref);
};

kony.ui.FlexContainer.prototype.removeAt = function(index) {
	return boxWidgetExtendRemoveAt.call(this, index);
};

kony.ui.FlexContainer.prototype.widgets = function() {	
    return kony.ui.ContainerWidget.prototype.widgets.call(this);	
};

kony.ui.FlexContainer.prototype.updateBoxWeight = function(widgetarray) {
    boxWidgetExtendUpdateBoxWeight.call(this, widgetarray);
};
