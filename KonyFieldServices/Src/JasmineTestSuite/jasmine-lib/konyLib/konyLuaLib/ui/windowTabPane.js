//Tab Constructor 
konyLua.TabPane = function(bconfig, lconfig, pspconfig) {  
  
  konyLua.TabPane.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  this.activeskin = bconfig.activeskin;
  this.activefocusskin = bconfig.activefocusskin;
  this.inactiveskin = bconfig.inactiveskin;
  
  if(bconfig.activetabs)
	   this.activetabs = bconfig.activetabs;
  else
	   this.activetabs = [null,1];

  this.activetab = this.activetabs[1];
  this.viewtype = bconfig.viewtype;           //New 5.0
  
  if(bconfig.viewconfig && bconfig.viewconfig.collapsibleviewconfig){
    var configparams =  bconfig.viewconfig.collapsibleviewconfig;
    this.collapsedimage = configparams.collapsedimage;
    this.expandedimage = configparams.expandedimage;
    this.toggletabs = configparams.toggletabs;
    this.imageposition = configparams.imageposition;
    this.tabnamealignment = configparams.tabnamealignment;
  }

  this.ontabclick = bconfig.ontabclick;       //New 5.0
  this.retainpositionintab = bconfig.retainpositionintab;   //New 5.0
  this.needpageindicator = bconfig.needpageindicator;
  this.selectedtabindex = bconfig.selectedtabindex;

  //Internal Usage  
  this.wType = "TabPane";
  this.name = "konyLua.TabPane";
};

kony.inherits(konyLua.TabPane,konyLua.ContainerWidget);

konyLua.TabPane.prototype.addTab = function(tabId, tabName, tabImage, box, masterDataLoad) {  
  var widgetref = box;
  widgetref.id = tabId;
  widgetref.tabname = tabName;
  widgetref.image = tabImage;
  widgetref.oninit = masterDataLoad;
  this.allboxes=[];
	
  konyLua.ContainerWidget.prototype.add.call(this, [widgetref]);
  konyLua.Form2.prototype.createFormLevelHierarchy.call(this,[widgetref]);
  konyLua.ContainerWidget.prototype.createhierarchy.call(this, widgetref.ownchildrenref);
  $KW.TabPane.addChildTab(this,widgetref); 
};

konyLua.TabPane.prototype.addTabAt = function(tabId, tabName, tabImage, box, index) {  
 
  var widgetref = box;
  widgetref.id = tabId;
  widgetref.tabname = tabName;
  widgetref.image = tabImage;
  this.allboxes=[];
  
  konyLua.ContainerWidget.prototype.addAt.call(this, widgetref, index);
  konyLua.Form2.prototype.createFormLevelHierarchy.call(this,[widgetref]);
  konyLua.ContainerWidget.prototype.createhierarchy.call(this, widgetref.ownchildrenref);
  
  $KW.TabPane.addChildTabAt(this,widgetref,index);
  
};