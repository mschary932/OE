//Calendar Constructor
konyLua.Calendar = function(bconfig, lconfig, pspconfig) {

  konyLua.Calendar.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  
  this.onselection = bconfig.onselection;
  this.validstartdate = this.startdate = bconfig.validstartdate;    //TODO : Replace startdate with validstartdate in view files
  this.validenddate = this.enddate = bconfig.validenddate;          //TODO : Replace endate with validenddate in view files
  this.viewtype = this.advview = bconfig.viewtype || constants.CALENDAR_VIEW_TYPE_DEFAULT;   //TODO : Replace advview with viewtype in view files
  this.formattedate = this.date = bconfig.date;    
  this.calendaricon = this.Image = bconfig.calendaricon;        //TODO
  this.dateformat = this.format = bconfig.dateformat || constants.CALENDAR_DATE_FORMAT_DEFAULT ;  //TODO
  this.datecomponents = bconfig.datecomponents;  
  if(this.datecomponents)
	this.datecomponents[IndexJL+3] = this.datecomponents[IndexJL+4] = this.datecomponents[IndexJL+5] = 0;
  this.viewconfig = bconfig.viewconfig;    
  this.placeholder = bconfig.placeholder;     

  this.titleonpopup = this.title = pspconfig.titleonpopup || pspconfig.titleOnPopup;           //TODO : Replace title with titleonpopup in view files    

   //Internal Usage
  this.wType = "Calendar";
  this.name = "konyLua.Calendar"; 
};

kony.inherits(konyLua.Calendar,konyLua.Widget);