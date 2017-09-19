//Box Constructor
konyLua.Box = function(bconfig, lconfig, pspconfig) {
  
  konyLua.Box.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  
  this.position = pspconfig.position;
  this.backgroundimage = pspconfig.backgroundimage;
  
  //Internal Usage
  this.name = "konyLua.Box";
  this.allboxes = [];       // As Box's are used as rowTemplates

  if (this.orientation == constants.BOX_LAYOUT_HORIZONTAL)
    this.wType = "HBox";
  else 
    this.wType = "VBox";    
};

kony.inherits(konyLua.Box,konyLua.ContainerWidget);

//Box Methods 
konyLua.Box.prototype.add = function() {  
  
  var widgetarray = [].slice.call(arguments[0]);
  boxWidgetExtendAdd.call(this, widgetarray);
};

konyLua.Box.prototype.addAt = function(widgetref, index) {
  boxWidgetExtendAddAt.call(this, widgetref, index);
};

konyLua.Box.prototype.remove = function(widgetref) {  
  boxWidgetExtendRemove.call(this, widgetref);
};

konyLua.Box.prototype.removeAt = function(index) {
  return boxWidgetExtendRemoveAt.call(this, index);
};

konyLua.Box.prototype.widgets = function() {  
  return konyLua.ContainerWidget.prototype.widgets.call(this);  
};

konyLua.Box.prototype.updateBoxWeight = function(widgetarray) {
  boxWidgetExtendUpdateBoxWeight.call(this, widgetarray);
};
