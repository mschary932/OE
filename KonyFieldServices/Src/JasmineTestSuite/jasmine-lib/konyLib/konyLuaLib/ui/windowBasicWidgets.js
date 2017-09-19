//Button Constructor
konyLua.Button = function(bconfig, lconfig, pspconfig) {
      
   konyLua.Button.baseConstructor.call(this, bconfig, lconfig, pspconfig);
   
   this.text = bconfig.text || "";   
   this.rawbytes = bconfig.rawbytes;  

   this.displaytext = (lconfig.displaytext===undefined) ? true  : (lconfig.displaytext && true);
   
   //Internal Usage  
   this.wType = "Button";
   this.name = "konyLua.Button"    
}

kony.inherits(konyLua.Button,konyLua.Widget);

//Label Constructor
konyLua.Label = function(bconfig, lconfig, pspconfig) {
      
   konyLua.Label.baseConstructor.call(this, bconfig, lconfig, pspconfig);
   
   this.text = bconfig.text || "";  
   this.contentalignment = lconfig.contentalignment;

   //Internal Usage
   this.wType = "Label";    
   this.name = "konyLua.Label"; 
}

kony.inherits(konyLua.Label, konyLua.Widget);

//Line Constructor
konyLua.Line = function(bconfig, lconfig, pspconfig) {
      
   konyLua.Line.baseConstructor.call(this, bconfig, lconfig, pspconfig);
   
   this.thickness = lconfig.thickness;     
   
   //Internal Usage
   this.wType = "Line";
   this.name = "konyLua.Line";
}

kony.inherits(konyLua.Line,konyLua.Widget);

//Link Constructor
konyLua.Link = function(bconfig, lconfig, pspconfig) {

   konyLua.Link.baseConstructor.call(this, bconfig, lconfig, pspconfig);
   
   this.text = bconfig.text || "";    
   this.contentalignment = lconfig.contentalignment;
   this.externalurl = pspconfig.externalurl;
      
   //Internal Usage
   this.wType = "Link";
   this.name = "konyLua.Link";  
};

kony.inherits(konyLua.Link,konyLua.Widget);

//Switch Constructor 
konyLua.Switch = function(bconfig, lconfig, pspconfig) {  
  
  konyLua.Switch.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  this.leftsidetext = bconfig.leftsidetext;
  this.rightsidetext = bconfig.rightsidetext;
  this.onslide = bconfig.onslide;         
  this.selectedindex = bconfig.selectedindex;
 
  //Internal Usage  
  this.wType = "Switch";
  this.name = "konyLua.Switch";
};

kony.inherits(konyLua.Switch, konyLua.Widget);

//Phone Constructor
konyLua.Phone = function(bconfig, lconfig, pspconfig) {

   konyLua.Phone.baseConstructor.call(this, bconfig, lconfig, pspconfig);
        
   this.text = bconfig.text || "";
     
   //Internal Usage
   this.wType = "Phone";
   this.name = "konyLua.Phone";
};

kony.inherits(konyLua.Phone,konyLua.Widget);

konyLua.CustomWidget = function(bconfig, lconfig, pspconfig) {
   konyLua.CustomWidget.baseConstructor.call(this, bconfig, lconfig, pspconfig);

   //Internal Usage  
   this.wType = "TPW";
	for(var k in pspconfig) {
		this[k] = pspconfig[k];
	}
};

kony.inherits(konyLua.CustomWidget, konyLua.Widget);