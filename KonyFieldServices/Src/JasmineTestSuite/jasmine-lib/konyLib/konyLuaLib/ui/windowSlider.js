//Slider Constructor 
konyLua.Slider = function(bconfig, lconfig, pspconfig) {  
  
  konyLua.Slider.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  this.min = bconfig.min;
  this.max = bconfig.max;
  this.step = bconfig.step;
  this.onslide = bconfig.onslide;        
  this.onselection = bconfig.onselection;
  this.leftskin = bconfig.leftskin;       
  this.rightskin = bconfig.rightskin;   
  this.thumbimage = bconfig.thumbimage;
  this.focusthumbimage = bconfig.focusthumbimage;
  this.selectedvalue = bconfig.selectedvalue;

  //Internal Usage  
  this.wType = "Slider";
  this.name = "konyLua.Slider";
};

kony.inherits(konyLua.Slider, konyLua.Widget);