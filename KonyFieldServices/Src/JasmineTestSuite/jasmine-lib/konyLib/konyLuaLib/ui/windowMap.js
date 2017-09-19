//Map Constructor
konyLua.Map = function(bconfig, lconfig, pspconfig) {
    
  konyLua.Map.baseConstructor.call(this, bconfig, lconfig, pspconfig);
    
  this.provider = bconfig.provider || constants.MAP_PROVIDER_GOOGLE;
  this.mapkey = bconfig.mapKey;
  this.mapClientId = bconfig.clientid; // support for custom client-id
  this.onselection = bconfig.onselection;
  //this.onPinClick = this.onpinselect =bconfig.onPinClick;
  this.screenlevelwidget = bconfig.screenlevelwidget;
  this.navcontrolsimageconfig = pspconfig.navcontrolsimageconfig;   //Clone the object and expand it
  this.mapsource = this.mapsrc = pspconfig.mapsource;       //TODO
  this.defaultpinimage = bconfig.defaultpinimage; 
  this.onpinclick = this.onpinselect =bconfig.onpinclick;  //TODO
  this.locationdata =  bconfig.locationdata;     
  this.address =  pspconfig.address;   
  this.screenlevelwidget = bconfig.screenlevelwidget;  
  this.mode = pspconfig.mode || constants.MAP_VIEW_MODE_NORMAL;
  this.zoomlevel = pspconfig.zoomlevel; 
  this.callouttemplate = bconfig.callouttemplate; 
  
  //Internal Usage
  this.wType = "Map";
  this.name = "konyLua.Map"; 

  bconfig.locationdata && $KW[this.wType]["updateView"](this, "locationdata", bconfig.locationdata);
};

kony.inherits(konyLua.Map,konyLua.Widget);