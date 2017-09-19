//Calendar Constructor
kony.ui.Calendar = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Calendar"));

	kony.ui.Calendar.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	//Internal Usage
	this.wType = "Calendar";
	this.name = "kony.ui.Calendar";
	this.datecomponents = bconfig.dateComponents || [];		
	this.dateformat = this.format = bconfig.dateFormat || constants.CALENDAR_DATE_FORMAT_DEFAULT ;
	this.formatteddate = this.date;		//TODO
	this.startdate = bconfig.validStartDate;
	this.enddate = bconfig.validEndDate;
	this.validstartdate = bconfig.validStartDate;
	this.validenddate = bconfig.validEndDate;
	this.viewtype = this.advview = bconfig.viewType || constants.CALENDAR_VIEW_TYPE_DEFAULT;
	this.viewconfig = bconfig.viewConfig;		
	this.calendaricon = this.Image = bconfig.calendarIcon;
	this.onselection = bconfig.onSelection;
    this.titleonpopup = this.title = pspconfig.titleOnPopup;
	this.noofmonths = pspconfig.noOfMonths || pspconfig.noofmonths || 1;
	this.dateeditable = true;
	this.calimgheight = pspconfig.calImgHeight;
	defineGetter(this, "calImgHeight", function() {
		return this.calimgheight;
	});	
	defineSetter(this, "calImgHeight", function(val) {
		this.calimgheight = val;
	});
	
	var placeholder = bconfig.placeholder;		
	defineGetter(this, "placeholder", function() {
		return placeholder;
	});	
		
	defineSetter(this, "placeholder", function(val) {
		placeholder = val;
		this.canUpdateUI && $KW[this.wType]["updateView"](this,  "placeholder" , val);
	});
	
    defineGetter(this, "dateEditable", function() {
		return this.dateeditable;
	});	
		
	defineSetter(this, "dateEditable", function(val) {
		if(!val == true || !!val == true){
			this.dateeditable = val;
			this.canUpdateUI && $KW[this.wType]["updateView"](this,  "dateeditable" , val);
		}
	});    
	
	var date = bconfig.date;		
	defineGetter(this, "date", function() {
		$KW.Calendar.updateCalDOMNode(this,false);
		if(this.formatteddate)
			return this.formatteddate;
		else
			return null;
	});	
		
	defineSetter(this, "date", function(val) {
		this.Date = val;
		if(!val || !val.length) { return false; }
		if(typeof val == "string"){
			var dEY = $KW.Calendar.__dp.getDat(val, this);
		}else{
			var dEY = {dd:val[0 + IndexJL],mm:val[1 + IndexJL],yyyy:val[2 + IndexJL]};
		}
		if(val && val.length){
			this.day = dEY.dd;
			this.month = dEY.mm;
			this.year = dEY.yyyy || dEY.yy;
			
			if(!this.datecomponents)
				this.datecomponents = [];
				
			this.datecomponents[IndexJL+0] = dEY.dd;
			this.datecomponents[IndexJL+1] = dEY.mm;
			this.datecomponents[IndexJL+2] = dEY.yyyy || dEY.yy;
			this.datecomponents[IndexJL+3] = 0;
			this.datecomponents[IndexJL+4] = 0;
			this.datecomponents[IndexJL+5] = 0;
			
		}else{
			this.day = this.month = this.year = null;
		}
		this.hour = this.minutes = this.seconds = 0;
		this.canUpdateUI && $KW[this.wType]["updateView"](this,  "date" , val);
	});
	

	this.setGetterSetter();
};

kony.inherits(kony.ui.Calendar,kony.ui.Widget);

kony.ui.Calendar.prototype.setGetterSetter = function() {

	defineGetter(this, "titleOnPopup", function() {
		return this.title;
	});	
	defineSetter(this, "titleOnPopup", function(val) {
		this.titleonpopup = this.title = val;
	});

	defineGetter(this, "onSelection", function() {
		return this.onselection;
	});
	defineSetter(this, "onSelection", function(val) {
		 this.onselection = val;
	});

	defineGetter(this, "calendarIcon", function() {
		return this.calendaricon;
	});	
	defineSetter(this, "calendarIcon", function(val) {
		this.calendaricon = this.Image = val;
		$KW[this.wType]["updateView"](this, "calendaricon" , val);
	});

	defineGetter(this, "viewConfig", function() {
		return this.viewconfig;
	});	
	defineSetter(this, "viewConfig", function(val) {
		this.viewconfig = val;
		$KW[this.wType]["updateView"](this,  "viewconfig" , val);
	});

	defineGetter(this, "viewType", function() {
		return this.advview;
	});
	defineSetter(this, "viewType", function(val) {
		this.advview = val;
		$KW[this.wType]["updateView"](this,  "viewtype" , val);
	});

	defineGetter(this, "validEndDate", function() {
		return this.enddate;
	});
	defineSetter(this, "validEndDate", function(val) {
		this.enddate = val;
		$KW[this.wType]["updateView"](this,  "validenddate" , val);
	});
	
	defineGetter(this, "validStartDate", function() {
		return this.startdate;
	});
	defineSetter(this, "validStartDate", function(val) {
		this.startdate = val;
		$KW[this.wType]["updateView"](this,  "validstartdate" , val);
	});

	defineGetter(this, "dateFormat", function() {
		return this.format;
	});
	defineSetter(this, "dateFormat", function(val) {
		this.dateformat = this.format = val;
		$KW[this.wType]["updateView"](this,  "dateformat" , val);
		$KW[this.wType]["updateView"](this,  "placeholder" , this.placeholder || this.dateformat || this.format);
	});

	defineGetter(this, "dateComponents", function() {
		if(this.hour === undefined ){
			this.hour = this.datecomponents[3];
		}
		if(this.minutes === undefined){
			this.minutes = this.datecomponents[4];
		}
		if(this.seconds === undefined){
			this.seconds = this.datecomponents[5];
		}
		return [this.day,this.month,this.year,this.hour,this.minutes,this.seconds];
	});	
	defineSetter(this, "dateComponents", function(val) {
		this.datecomponents = this.date = val.slice(0,3);
		$KW[this.wType]["updateView"](this,  "datecomponents", val);
	});

	defineGetter(this, "formattedDate", function() {
		$KW.Calendar.updateCalDOMNode(this, false);
		return this.formatteddate;
	});

	
}

//Calendar Methods
kony.ui.Calendar.prototype.setEnabled = function(dates, skin, enable) {
	if(typeof dates == "boolean"){ // To support frm.calendarMod.setEnabled(true/false);
		$KW.Widget.setenabled(this, dates);
		return false;
	}else{
		$KW.Calendar.setEnabled(this,dates,0,skin,enable);
	}
}
kony.ui.Calendar.prototype.displayedMonth = function(month, year) {
	$KW.Calendar.displayedMonth(this,month,year);	
};
kony.ui.Calendar.prototype.navigateToPreviousMonth = function() {
	$KW.Calendar.navigateToPreviousMonth(this);	
};
kony.ui.Calendar.prototype.navigateToNextMonth = function() {
	$KW.Calendar.navigateToNextMonth(this);	
};


kony.ui.Calendar.prototype.enableRangeOfDates = function(startdate, enddate, skin, enable) {
	$KW.Calendar.setEnabled(this, startdate, enddate, skin, enable);
};

kony.ui.Calendar.prototype.setEnableAll = function() {
	$KW.Calendar.setEnableAll(this);
};

kony.ui.Calendar.prototype.setDatesSkin = function(dates, skin) {
	$KW.Calendar.setDateSkin(this,dates,skin,true);
};

kony.ui.Calendar.prototype.clear = function() {
	$KW.Calendar.clear(this)
};


kony.ui.Calendar.prototype.setContext = function(context){
	$KW.Calendar.setcontext(this,context);
};

