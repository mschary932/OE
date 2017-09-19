// Segment constructor

konyLua.SegmentedUI2 = function(bconfig, lconfig, pspconfig) {

  konyLua.SegmentedUI2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  
  this.groupcells = bconfig.groupcells || false;
  this.separatorrequired = bconfig.separatorrequired || false; 
  this.widgetskin = bconfig.widgetskin;  
  this.rowskin = this.skin = bconfig.rowskin;         //TODO: replace skin with rowskin to make it readable too.
  this.rowfocusskin = this.focusskin = bconfig.rowfocusskin; //TODO: replace focusskin with rowfocusskin to make it readable too.
  this.alternaterowskin = this.askin = bconfig.alternaterowskin;  //TODO: replace askin with alternaterowskin to make it readable too
  this.sectionheaderskin = bconfig.sectionheaderskin; 
  this.widgetdatamap = bconfig.widgetdatamap;
  this.rowtemplate = bconfig.rowtemplate;
  this.sectionheadertemplate = bconfig.sectionheadertemplate;
  this.data = bconfig.data;
  this.separatorthickness = bconfig.separatorthickness;
  this.separatorcolor = bconfig.separatorcolor;
  this.viewtype = bconfig.viewtype;
  this.screenlevelwidget = bconfig.screenlevelwidget || false;
  this.retainselection = bconfig.retainselection || false;
  this.needpageindicator = bconfig.isPageIndicatorNeeded || bconfig.needpageindicator || false; 
  this.pageondotimage = bconfig.pageondotimage || false;
  this.pageoffdotimage = bconfig.pageoffdotimage || false;
  this.scrollingevents = bconfig.scrollingevents ;
  this.selectionbehavior  = bconfig.selectionbehavior || constants.SEGUI_DEFAULT_BEHAVIOR;
  this.selectionbehaviorconfig = bconfig.selectionbehaviorconfig;
  this.selectedindex = bconfig.selectedindex || null;
  this.selecteditems = null;
  this.selectedindices = bconfig.selectedindices || null;
  this.onrowclick = bconfig.onrowclick;
  this.onswipe = bconfig.onswipe;
  this.showscrollbars = bconfig.showscrollbars;

   //Internal Usage
  this.wType = "Segment";
  this.name = "konyLua.SegmentedUI2";
  this.canUpdateUI = true; 
};

kony.inherits(konyLua.SegmentedUI2, konyLua.Widget);

konyLua.SegmentedUI = function(bconfig, lconfig, pspconfig) {

  konyLua.SegmentedUI.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  
  this.skin = bconfig.skin;
  this.askin = bconfig.askin;
  this.sectionheaderskin = pspconfig.secskin;
  this.focusedindex = bconfig.focusedindex || null;
  this.focuseditem =  null;
  this.retainselection = pspconfig.retainselection || false;
  this.viewtype = pspconfig.view;  
  this.selectionbehavior  = pspconfig.behavior || constants.SEGUI_DEFAULT_BEHAVIOR;
  this.separatorrequired = true;
  this.separatorthickness = pspconfig.septhickness;
  this.separatorcolor = pspconfig.sepcolor;
  this.onrowclick = bconfig.onclick;
  this.needpageindicator = pspconfig.ispageindicatorneeded;

  this.name ="konyLua.SegmentedUI";
}

kony.inherits(konyLua.SegmentedUI, konyLua.SegmentedUI2);