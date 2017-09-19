//Form Constructor
konyLua.Form2 = function(bconfig, lconfig, pspconfig) {
      
  konyLua.Form2.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  this.title = bconfig.title;    
  this.type = bconfig.type ;    //1 = Native 2 = SPA 3 = TC
  this.needappmenu = bconfig.needappmenu === undefined ? true :(bconfig.needappmenu && true);
  this.enabledforidletimeout = bconfig.enabledforidletimeout || pspconfig.enabledforidletimeout || false;
  this.headers = bconfig.headers && bconfig.headers.splice(0);
  this.footers = bconfig.footers && bconfig.footers.splice(0);
  this.addwidgets = bconfig.addwidgets;
  this.preshow = bconfig.preshow;
  this.postshow = bconfig.postshow;
  this.onhide = bconfig.onhide;
  this.onorientationchange = bconfig.onorientationchange;
  this.init = bconfig.init;
  this.ondestroy = bconfig.ondestroy;
  bconfig.i18n_title && (this.i18n_title = bconfig.i18n_title);
  
  this.displayorientation = lconfig.displayorientation || constants.FORM_DISPLAY_ORIENTATION_BOTH;  //1-Landscape, 2-Portrait, 3-Both
 
  this.resetfocustotop = pspconfig.resetfocustotop;
  this.usetransform = pspconfig.usetransform;
  this.retainscrollposition = pspconfig.retainscrollposition || false;

  this.intransitionconfig = pspconfig.intransitionconfig;
  
 
  this.outtransitionconfig = pspconfig.outtransitionconfig;
  
	this.dockableheader = pspconfig.dockableheader;
	this.dockablefooter = pspconfig.dockablefooter;
	this.dockableappmenu = pspconfig.dockableappmenu;


  var addwidgets = bconfig.addwidgets;
  defineGetter(this, "addwidgets", function() {
    return addwidgets;
  }); 
    
  defineSetter(this, "addwidgets", function(val) {
    addwidgets = val;
    this.addwidgetsdone = false;
  }); 

  //Internal Usage
  this.allboxes = []; 
  this.wType = "Form";
  this.addwidgetsdone = this.initdone = false;
  this.name = "konyLua.Form2";
  
  $KG.allforms[this.id] = this;

  this.headers && this.commonHeaderFooterSetup("headers"); 
  this.footers && this.commonHeaderFooterSetup("footers");   
  
  this.formgetter = function () {
   var id = bconfig.id;
   var that = this;
   defineGetter(window, id, function() {
    if(!that.addwidgetsdone) {
     that.addwidgetsdone=true;
     that.ownchildrenref = [];
     that.children = [];
     that.addwidgets && that.addwidgets(that);
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
};         

kony.inherits(konyLua.Form2, konyLua.ContainerWidget);

//Form Methods
konyLua.Form2.prototype.add = function() {
  var widgetarray = [].slice.call(arguments[0]);
  formWidgetExtendAdd.call(this, widgetarray);
};
  
konyLua.Form2.prototype.addAt = function(widgetref, index) {  
   formWidgetExtendAddAt.call(this, widgetref, index);  
};
  
konyLua.Form2.prototype.destroy = function() {    

  this.ondestroy && this.ondestroy(this);
  this.addwidgetsdone = false;
  this.initdone = false;
  this.ownchildrenref = [];
  this.children = [];
};
  
konyLua.Form2.prototype.remove =  function(widgetref) { 
  formWidgetExtendRemove.call(this, widgetref);
};
  
konyLua.Form2.prototype.removeAt = function(index) {
  return formWidgetExtendRemoveAt.call(this, index);
};
  
konyLua.Form2.prototype.show = function() {  

  if(!this.addwidgetsdone) {
    this.addwidgetsdone = true;
    this.ownchildrenref = [];
    this.children = []; 
    this.addwidgets && this.addwidgets(this);
  }
  
  if(this.name == "konyLua.Form") {
    !this.masterdataloaddone && this.masterdataload && this.masterdataload.call(this);
    !this.transactionaldataloaddone && this.transactionaldataload && this.transactionaldataload(this);
    this.transactionaldataloaddone = this.masterdataloaddone = true;
  } else {
    !this.initdone && this.init && this.init(this);
    this.initdone = true;
  }
  $KW.Form.show(this);
};

konyLua.Form2.prototype.scrollToWidget = function(widgetref){
  $KW.Form.scrollToWidget(widgetref, this);
};

konyLua.Form2.prototype.scrollToBeginning = function(){
  $KW.Form.scrollToBegining(this);
};

konyLua.Form2.prototype.scrollToEnd = function(){
  $KW.Form.scrollToEnd(this);
};

konyLua.Form2.prototype.widgets = function(){
  return konyLua.ContainerWidget.prototype.widgets.call(this);
};

//Internal Methods
konyLua.Form2.prototype.createFormLevelHierarchy = function(widgetarray) { 
  formWidgetExtendCreateFormLevelHierarchy.call(this, widgetarray);
};

konyLua.Form2.prototype.commonHeaderFooterSetup = function(containertype) {
  formWidgetExtendCommonHeaderFooterSetup.call(this, containertype);
};

//Functions used by Box Templates too.
konyLua.Form2.getallboxes = function(widgetarray){
  formWidgetExtendGetAllBoxes.call(this, widgetarray);
};

//Used by Segment Box Template too.
konyLua.Form2.addHeaderorFooter = function() {
  formWidgetExtendaddHeaderorFooter.call(this, arguments);
};

// Earlier Version of Form (All Deprecated properties are to be supported)
konyLua.Form = function(bconfig, lconfig, pspconfig) {

  konyLua.Form.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  this.transactionaldataload = bconfig.transactionaldataload;  
  this.masterdataload =  bconfig.masterdataload;      
  this.transactionaldataloaddone = this.masterdataloaddone = false;
  this.type = pspconfig.formtype;     //1 = Native 2 = SPA 3 = TC 
  this.preshow = pspconfig.preshow;
  this.postshow = pspconfig.postshow;
  this.needappmenu = pspconfig.needapplevelmenu === undefined ? true :(pspconfig.needapplevelmenu && true);
  this.onhide = pspconfig.onhide; 

  this.headers = pspconfig.globalheaders && pspconfig.globalheaders.splice(0);
  this.footers = pspconfig.globalfooters && pspconfig.globalfooters.splice(0);

  this.headers && this.commonHeaderFooterSetup("headers"); 
  this.footers && this.commonHeaderFooterSetup("footers"); 
 
  this.name = "konyLua.Form";
};
kony.inherits(konyLua.Form, konyLua.Form2);