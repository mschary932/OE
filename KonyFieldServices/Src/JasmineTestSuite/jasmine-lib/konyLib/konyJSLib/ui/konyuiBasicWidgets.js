//Button Constructor
kony.ui.Button = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Button"));
		
	kony.ui.Button.baseConstructor.call(this, bconfig, lconfig, pspconfig);
	
	this.displaytext = (lconfig.displayText===undefined) ? true  : (lconfig.displayText && true);
	this.rawBytes = bconfig.rawBytes;		//Not Supported	
	
	//Internal Usage
	this.canUpdateUI = true;
	this.wType = "Button";
	this.name = "kony.ui.Button"
        
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
			$KW[this.wType]["updateView"](this,  "text" , val);
		}
	});
    

}

kony.inherits(kony.ui.Button,kony.ui.Widget);

//Label Constructor
kony.ui.Label = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Label"));
		
	kony.ui.Label.baseConstructor.call(this, bconfig, lconfig, pspconfig);
	
	//Internal Usage
	this.canUpdateUI = true;
    this.wType = "Label";    
    this.name = "kony.ui.Label";
    
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
			$KW[this.wType]["updateView"](this,  "text" , val);
		}
	});	
	
	var textCopyable = pspconfig.textCopyable;
	 defineGetter(this, "textCopyable", function() {
		return textCopyable;
	});	
	defineSetter(this, "textCopyable", function(val) {
		textCopyable = val;
		$KW[this.wType]["updateView"](this,  "textCopyable" , val);
	});	
	
}
kony.inherits(kony.ui.Label, kony.ui.Widget);


//Line Constructor
kony.ui.Line = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Line"));
		
	kony.ui.Line.baseConstructor.call(this, bconfig, lconfig, pspconfig);
	
	//Internal Usage
    this.wType = "Line";
    this.name = "kony.ui.Line";
      
   	var thickness = lconfig.thickness;
	defineGetter(this, "thickness", function() {
		return thickness;
	});	
	defineSetter(this, "thickness", function(val) {
		thickness = val;
		$KW[this.wType]["updateView"](this,  "thickness" , val);
	});	
		
}

kony.inherits(kony.ui.Line,kony.ui.Widget);

//Link Constructor
kony.ui.Link = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Link"));

	kony.ui.Link.baseConstructor.call(this, bconfig, lconfig, pspconfig);
			

	//Internal Usage
	this.canUpdateUI = true;
	this.wType = "Link";
	this.name = "kony.ui.Link";
        
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
			$KW[this.wType]["updateView"](this,  "text" , val);
		}
	});


};

kony.inherits(kony.ui.Link,kony.ui.Widget);


//Switch Constructor 
kony.ui.Switch = function(bconfig, lconfig, pspconfig) {  

  if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Switch"));
  
  kony.ui.Switch.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  this.skin = bconfig.skin; //overriding skins set from baseConstructor
  this.leftsidetext = bconfig.leftSideText;
  this.rightsidetext = bconfig.rightSideText;

   //Internal Usage  
  this.wType = "Switch";
  this.name = "kony.ui.Switch";

  this.onslide = bconfig.onSlide || null;      
  this.selectedindex = (bconfig.selectedIndex == IndexJL ) ? IndexJL : IndexJL + 1;

  this.setGetterSetter();
};
kony.inherits(kony.ui.Switch, kony.ui.Widget);

kony.ui.Switch.prototype.setGetterSetter = function() {
	
	defineGetter(this, "onSlide", function() {
		return this.onslide;
	});
	defineSetter(this, "onSlide", function(val) {
		this.onslide = val;
	});
	    
	defineGetter(this, "selectedIndex", function() {
		return this.selectedindex;
	});
	defineSetter(this, "selectedIndex", function(val) {
		var oldvalue = this.selectedindex;
		this.selectedindex = val;
		$KW[this.wType]["updateView"](this,  "selectedindex", val, oldvalue);
	});

}

//Phone Constructor
kony.ui.Phone = function(bconfig, lconfig, pspconfig) {

  if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Phone"));

	kony.ui.Phone.baseConstructor.call(this, bconfig, lconfig, pspconfig);
       
	//Internal Usage
	this.canUpdateUI = true;
	this.wType = "Phone";
	this.name = "kony.ui.Phone";

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
			$KW[this.wType]["updateView"](this,  "text" , val);
		}
	});	
	
};
kony.inherits(kony.ui.Phone,kony.ui.Widget);


// Custom widget
kony.ui.CustomWidget = function(bconfig, lconfig, pspconfig) {
	kony.ui.CustomWidget.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	var defineGettersAndSetters = function(instance, property, pspconfig) {
		defineGetter(instance, property, function() {
			//console.log("Value:"+pspconfig[property]);
			return pspconfig[property];
		});
		defineSetter(instance, property, function(value) {
			var oldVal = pspconfig[property];
			pspconfig[property] = value;
			//console.log("Property:"+property +" -- "+ "Value:"+pspconfig[property]  +" -- "+ "Old Value:"+oldVal);
			var nsArr = pspconfig.widgetName.split('.'), namespace = window;
			for(var j=0; j<nsArr.length; j++) {namespace = namespace[nsArr[j]];}
			namespace["modelChange"](instance, property, pspconfig[property]);
		});
	};

	//Internal Usage	
	this.wType = "TPW";
	for(var k in pspconfig) {
		defineGettersAndSetters(this, k, pspconfig);
	}
};
kony.inherits(kony.ui.CustomWidget, kony.ui.Widget);


//Alert Constructor
//Indexed based Alert api to be supported for backward Compatibility
kony.ui.Alert = function(param1, param2, param3) {
    $KI.window.alert(param1, param2, param3);
};

// Dummy implementation for Camera Widget
kony.ui.Camera = function(bconfig, lconfig, pspconfig){

  if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Camera"));

kony.ui.Camera.baseConstructor.call(this, bconfig, lconfig, pspconfig);
    this.wType = "Camera";
}
kony.inherits(kony.ui.Camera,kony.ui.Widget);