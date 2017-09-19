kony.widgets.Calendar.Inlineview = {

    hideCalendar : function (calendarID){
            var domElement = new kony.dom.Element();
            slideup(calendarID+"_calendar_widget");
            var caldrs=calendarID+"_calendar";
            var calbut=calendarID+"_but";
            var cal = domElement.getElementByIDNS(caldrs);
            var but = domElement.getElementByIDNS(calbut);
            cal.style.display="none";
            but.style.display="none";
        },
    updateCalendar: function (calendarID){
        var domElement = new kony.dom.Element();
        slideup(calendarID+"_calendar_widget");
        var caldrs=calendarID+"_calendar";
        var calbut=calendarID+"_but";
        var calmnt=calendarID+"_inline_month";
        var calday=calendarID+"_inline_day";
        var calyer=calendarID+"_inline_year";
        var caltxtfld=calendarID+"_caltxtfld";
        var cal = domElement.getElementByIDNS(caldrs);
        var but = domElement.getElementByIDNS(calbut);
        cal.style.display="none";
        but.style.display="none";
        var tmpmn = domElement.getElementByIDNS(calmnt);
        var tmpyr = domElement.getElementByIDNS(calyer);
        var tmpdy = domElement.getElementByIDNS(calday);
        var tmphl = domElement.getElementByIDNS(caltxtfld);
        var mn = tmpmn.selectedIndex+1;
        var Year = tmpyr[tmpyr.selectedIndex].text;
        var day= tmpdy[tmpdy.selectedIndex].text
        var format=tmphl.getAttribute("format");
        var frmt=format.split("/",2);
        if(frmt[0]=="mm")
        tmphl.value=mn+"/"+day +"/"  +Year;
        else
        tmphl.value=day+"/"+mn +"/"  +Year;
    },

    showCalendar:function(crid){
             var domElement = new kony.dom.Element();
             slidedown(crid+"_calendar_widget");
           	var caldtxtfld=crid+"_caltxtfld";
                var calmnt=crid+"_inline_month";
                var calday=crid+"_inline_day";
                var calyer=crid+"_inline_year";
                var caltxtfldnode = domElement.getElementByIDNS(caldtxtfld);
                var tmpmn = domElement.getElementByIDNS(calmnt);
                var tmpyr = domElement.getElementByIDNS(calyer);
                var tmpdy = domElement.getElementByIDNS(calday);

                var format=caltxtfldnode.getAttribute("format");
                var frmt=format.split("/",2);
                var valuer = caltxtfldnode.value;
                var value=valuer.split("/",3);
                if(frmt[0]=="mm")
                {
                    tmpdy.selectedIndex=parseInt(value[1],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[0],10)-1;
                }
                else
                {
                    tmpdy.selectedIndex=parseInt(value[0],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[1],10)-1;
                }
                this.updateDaysforInlineMode(crid);

            var caldrs=crid+"_calendar";
            var calbut=crid+"_but";
            var cal = domElement.getElementByIDNS(caldrs);
            var but = domElement.getElementByIDNS(calbut);

            cal.style.display="block";
            but.style.display="block";
        },

    /**
	 * Verifies if the calendar widget has been placed in the page and if it is
	 * an inline calendar perform the initialization of the calendar widget.
	 */
    checkCalendarwidget:function () {

        var domElement = new kony.dom.Element();
        var inlineCalendarViewElement=domElement.getElementByNameNS("calendar_inline");

        // Verify if the inline view is
        if(inlineCalendarViewElement)
        {
            for(var i=0;i<inlineCalendarViewElement.length;i++)
            {
                var id= domElement.getAttributeValueNS(inlineCalendarViewElement[i], "id");

                var crid= id.split("_")[0];
                var caldtxtfld=crid+"_inlinemode";
                var calmnt=crid+"_inline_month";
                var calday=crid+"_inline_day";
                var calyer=crid+"_inline_year";
                var caltxtfldnode = domElement.getElementByIDNS(caldtxtfld);
                var tmpmn = domElement.getElementByIDNS(calmnt);
                var tmpyr = domElement.getElementByIDNS(calyer);
                var tmpdy = domElement.getElementByIDNS(calday);

                var format=caltxtfldnode.getAttribute("format");
                var frmt=format.split("/",2);
                var valuer = caltxtfldnode.value;
                var value=valuer.split("/",3);
                if(frmt[0]=="mm")
                {
                    tmpdy.selectedIndex=parseInt(value[1],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[0],10)-1;
                }
                else
                {
                    tmpdy.selectedIndex=parseInt(value[0],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[1],10)-1;
                }
                this.updateDaysforInlineMode(crid);
            }
        }

    },

    updateDaysforInlineMode:function (crid){
         var domElement = new kony.dom.Element();
        //var types = "inline_day,inline_month,inline_year";
        var calmnt=crid+"_inline_month";
        var calday=crid+"_inline_day";
        var calyer=crid+"_inline_year";

        var selection = domElement.getElementByIDNS(calyer);
        var year =  selection.options[selection.selectedIndex].value ;
        selection = domElement.getElementByIDNS(calmnt);
        var month = selection.options[selection.selectedIndex].value ;
        month = parseInt(month)-1;
        selection = domElement.getElementByIDNS(calday);
        var day =  selection.options[selection.selectedIndex].value ;
        var calUtil = kony.widgets.Calendar.Util;
        if(!calUtil.isValidDate(day, month, year)){
            selection = domElement.getElementByIDNS(calday);
            selection.selectedIndex = 0;
            day=1;
        }
        this.updatedDaysInMonth(selection,calUtil.daysInMonth(month+1, year));
        /*Sumanth Divvela: Sep 20, 2011: Fixed issue with date not getting submited to server.*/
        this.updateHiddenField(crid, day, month, year);
    },

    updatedDaysInMonth : function (selection , days){
        if(!selection)
            return;
        var noofDays = selection.length;
        var i = 0;
        if(noofDays < days){
            i = noofDays +1;
            for(;i<=days;i++){
                var elOptNew = document.createElement('option');
                elOptNew.value =i ;
                elOptNew.text =i ;
                try
                {
                    selection.add(elOptNew,null);
                }
                catch(ex) {
                    selection.add(elOptNew); // IE only
                }
            }
        }else{
            for(i=noofDays-1;i >= days;i--)
            {
                selection.remove(i);
            }
        }

    },
    
    updateHiddenField: function (crid,day,month,year){
    	var caldtxtfld=crid+"_inlinemode";
        var caltxtfldnode = document.getElementById(caldtxtfld);
        if(caltxtfldnode){
        	month++;
        	if(month < 10){
        		month="0"+month;
        	}
  			 var format=caltxtfldnode.getAttribute("format");
  			var frmt=format.split("/",2);
  			if(frmt[0]=="mm" || frmt[0]=="MM"){
                caltxtfldnode.setAttribute("value",month+"/"+day +"/"  +year);
            }
  			else{
  	        	caltxtfldnode.setAttribute("value",day+"/"+month +"/"  +year);  	        
            }
  		}
    }

}


/**
 * Calendar As popup is available in advansed clients.
 * This uses yahoo yui.
 *
 */
kony.widgets.Calendar.Popupview = {
    calObj : null,
    clientH : null,
    targetH : null,
    //SUMA:Sep27 Implemented calendar internationalization
    showCalenderPopup : function(eid,overlayCorner, contextCorner,title,startDate,endDate,months,weekdays,days,
                                 calendarenableddates,calendarskin,calendarskinfordates,enabledisableflag,enabledstartdate,enabledenddate,calendarskindates,mtdlist, dateval){
		if (this.calObj) {
			this.calObj.destroyCalendar();
		}
		this.calObj = kony.widgets.Calendar.Popupview.calendarObject;
		this.calObj.eid = eid;
		this.calObj.mindate = startDate;
		this.calObj.maxdate = endDate;
		// SUMA:Sep27 Implemented calendar internationalization
		this.calObj.months = months;
		this.calObj.weekdays = weekdays;
		this.calObj.days = days;
		// SUMA:Dec16,2011 Supporting dates enabling and disabling feature in
		// konycalendar
		this.calObj.calendarenableddates = null;
		this.calObj.calendarskin = calendarskin;
                this.calObj.calendarskinfordates = calendarskinfordates;
		this.calObj.enabledisableflag = enabledisableflag;
		this.calObj.enabledstartdate = null;
		this.calObj.enabledenddate = null;
		this.calObj.calendarskindates = null;
                this.calObj.mtdlist = mtdlist;
            
		if (title && title != '') {
			this.calObj.title = title;
		}
		this.calObj.createCalendar();
		// Suma:Dec27,2011 Added to support popup calendar enhancement.
		if (enabledstartdate != null) {			
			var arr1 = enabledstartdate.split(",");
            this.calObj.enabledstartdate = new Date(arr1[1]+"/"+arr1[0]+"/"+arr1[2]);
			this.calObj.calendar.cfg.setProperty("enabledstartdate", this.calObj.enabledstartdate);
		}
		if (enabledenddate != null) {			
			var arr1 = enabledenddate.split(",");  
			this.calObj.enabledenddate = new Date(arr1[1]+"/"+arr1[0]+"/"+arr1[2]);		
			this.calObj.calendar.cfg.setProperty("enabledenddate", this.calObj.enabledenddate);
		}
		if (calendarenableddates != null) {
			var arr1 = null;
			for ( var i = 0; i < calendarenableddates.length; ++i) {
				var aDate = calendarenableddates[i];
				if (aDate != null) {	
					arr1 = aDate.toString().split(",");
					calendarenableddates[i] = new Date(arr1[1]+"/"+arr1[0]+"/"+arr1[2]);
                
				}
			}
			this.calObj.calendarenableddates = calendarenableddates;
			this.calObj.calendar.cfg.setProperty("enableddatesarray", this.calObj.calendarenableddates);
		}
		if(enabledisableflag != null && calendarskin != null){
				this.calObj.calendar.cfg.setProperty("calendarskin", this.calObj.calendarskin);
		}
		
		if(calendarskindates !=null && calendarskinfordates != null){
			var arr1 = null;
			for ( var i = 0; i < calendarskindates.length; ++i) {
				var aDate = calendarskindates[i];
				if (aDate != null) {	
					arr1 = aDate.toString().split(",");
					calendarskindates[i] = new Date(arr1[1]+"/"+arr1[0]+"/"+arr1[2]);
                
				}
			}
			this.calObj.calendarskindates = calendarskindates;
			this.calObj.calendar.cfg.setProperty("calendarskinfordates", this.calObj.calendarskinfordates);
			this.calObj.calendar.cfg.setProperty("calendarskindatesarray", this.calObj.calendarskindates);
		}
		
		this.calObj.dialog.cfg.setProperty("context", [ document.getElementById(eid) ], true);
		// calObj.dialog.align(overlayCorner,contextCorner );
		// Added below logic to reset current date to previously selected date.
		var selDates = this.calObj.calendar.getSelectedDates();
		var resetDate;
		if (selDates.length > 0) {
			resetDate = selDates[0];
		} else {
			if(dateval){
				var formater = kony.widgets.Calendar.DateFormater;
				resetDate = formater.format(dateval,"mm/dd/yyyy");				
				this.calObj.calendar.cfg.setProperty("selected", resetDate);
				resetDate=formater.format(dateval,"mm/yyyy");
			}
			else
				resetDate = this.calObj.calendar.today;
		}
		this.calObj.calendar.cfg.setProperty("pagedate", resetDate);
		
		this.calObj.calendar.cfg.setProperty("enabledisableflag", this.calObj.enabledisableflag);
                this.calObj.calendar.cfg.setProperty("mtdlist", this.calObj.mtdlist);
		this.calObj.calendar.render();
                var calLayoutWidth = 0;
		if (overlayCorner && overlayCorner < 0) {
			var dialog = this.calObj.dialog.element.clientWidth;
                        calLayoutWidth = dialog;
			var clientW = kony.widgets.Utils.scrollInterface.getClientW();
			overlayCorner = Math.floor((clientW - dialog) / 2);
		}
        var delta = this.calObj.dialog.element.clientHeight;
       var getPositions = function (e) {
            var posx = 0;
            var posy = 0;
            if (!e) var e = window.event;
            if (e.pageX || e.pageY)   {
                   posx = e.pageX;
                  posy = e.pageY;
            }
            else if (e.clientX || e.clientY)   {
                  posx = e.clientX + document.body.scrollLeft     + document.documentElement.scrollLeft;
                 posy = e.clientY + document.body.scrollTop   + document.documentElement.scrollTop;
            }
            var obj = {};
            obj.posx = posx;
            obj.posy = posy;
           return obj;
        };

        var posyy;
        if(contextCorner+delta > this.clientH)
        {
            if(contextCorner-delta < 0)
        	{
            	//Suma jan8,2013,Fix for #13105 introducing scroll when rendering the popup calendar
            	var x = contextCorner-(delta/2);
				posyy = (x+this.targetH);
                this.calObj.dialog.moveTo(overlayCorner,posyy);
        	}
            else
            {
            	//Suma jan8,2013,Fix for #13105 introducing scroll when rendering the popup calendar
            	var z = contextCorner-(delta);
				posyy = z-this.targetH;
                this.calObj.dialog.moveTo(overlayCorner,posyy);
            }
        }
        else
        {
        	//Suma jan8,2013,Fix for #13105 introducing scroll when rendering the popup calendar
        	posyy = contextCorner+this.targetH;
        	this.calObj.dialog.moveTo(overlayCorner, posyy);
        }
                var calElement = document.getElementById('container_c');
                calElement.style.left = "50%";
                //Sumanth Aug 28 2013: Removed this from getPositions() method as it is causing issue with positioning of calendar.                
                var topPosition = getPositions().posy;    
                //Suma jan8,2013,Fix for #13105 introducing scroll when rendering the popup calendar
                calElement.style.top = posyy + "px !important";
		calElement.style.marginLeft = -(calLayoutWidth / 2) + "px";// Half of the calender width.
		this.calObj.showBtn = 'show' + eid;
		this.calObj.dialog.show();
		this.calObj.addCloser();
}
}
/**
 * Javascript dataformater for format javascript date object in given format
 */
kony.widgets.Calendar.DateFormater = {
    DD : 'dd',
    MM : 'MM',
    mm : 'mm',
    yyyy : 'yyyy',
    yy : 'yy',
    separator_ : '-',
    seperator : '/',
    cseperator : '/',
    dateformat : 'MM/dd/yyyy',
    setformat : function(dateFormat){
        this.dateformat = dateFormat;
    },
    format : function(date,dateFormat){
        if(dateFormat)
            this.dateformat = dateFormat;
        var array = this.formatArray();
        var key = null, value =null;
        var result = "";
        for(var i=0,size = array.length; i < size; i++){
            key = array[i];
            value = "00";
            switch (key){
                case this.DD    :value = date.getDate();
                    break;
                case this.mm    :
                case this.MM    :value = date.getMonth()+1;
                    break;
                case this.yyyy  :value = date.getFullYear();
                    break;
   
                case this.yy    :value = date.getFullYear() % 100;
                    break;
            }
            if(value < 10){
                value = "0"+value;
            }
            result  = result + value + this.cseperator;
        }
        return result.substr(0, result.length-1);
    },
	convertToDate : function(datevalue,dateFormat){
	   	if(dateFormat)
            this.dateformat = dateFormat;
        var temp = datevalue.split(this.seperator);
        if(!temp || temp.length == 1){
                temp = datevalue.split(this.seperator_);
                this.cseperator = this.seperator_;
        }
        var dateObject = new Date();
        var array = this.formatArray();
        var key = null, value =null;
        var result = "";        
        var val = dateObject.getFullYear() - 2000 ;
         for(var i=0,size = array.length; i < size; i++){
            key = array[i];   
            value = temp[i];
            value = eval(value);
            switch (key){
                case this.DD    :dateObject.setDate(value);
                    break;
                case this.mm    :
                case this.MM    :dateObject.setMonth(value-1);
                    break;
                case this.yyyy  :dateObject.setFullYear(value);
                    break;
                case this.yy    :
                    if(val - value < 0)
                        dateObject.setFullYear(1900+value);
                    else
                        dateObject.setFullYear(2000+value);
                    break;
            }           
        }
        return dateObject;
	},
    formatArray : function(){
        var array = null;
        if(this.dateformat != null ){
            array = this.dateformat.split(this.seperator);
            if(!array || array.length == 1){
                array = this.dateformat.split(this.seperator_);
                this.cseperator = this.seperator_;
            }
        }
        return array;
    }
}

kony.widgets.Calendar.Popupview.calendarObject = {
    dialog : null,
    calendar : null,
    eid : null,
    title : null,
    showBtn : 'showCal',
    mindate : null, /* (curDate.getMonth() + 1 ) + "/" + curDate.getDate() + "/" + curDate.getFullYear(); */
    maxdate : null,
    calId : 'calContainer',
    closeCalendar : function(e) {
        var el = YAHOO.util.Event.getTarget(e);
        var calObj =kony.widgets.Calendar.Popupview.calObj;
        var calEl = YAHOO.util.Dom.get(calObj.calId);
        if (el != calEl
            && !YAHOO.util.Dom.isAncestor(calEl, el)
            && el != YAHOO.util.Dom.get(calObj.showBtn)
            && !YAHOO.util.Dom.isAncestor(YAHOO.util.Dom.get(calObj.showBtn), el)) {
            calObj.dialog.hide();
        //calObj.removeCloser();
        }
    },
    addCloser : function(){
        // Hide Calendar if we click anywhere in the document other than the calendar
        YAHOO.util.Event.on(document, "click", this.closeCalendar);
    },
    removeCloser : function(){
        // Hide Calendar if we click anywhere in the document other than the calendar
        YAHOO.util.Event.removeListener(document, "click", this.closeCalendar);
    },
    createCalendar : function(){
        if(!this.dialog){
            this.dialog = new YAHOO.widget.Dialog("container", {
                visible:true,
                //Commenting it, as width:100% is appearing in the div style and the popup is looking small with width 100%.
                //This is not the case in 4.1 even though width property is used here.
                //width:100,
                draggable:false,
                //Suma Nov4,2011 added to remove the extra border in Popup calendar
                underlay:"none",
                buttons:[{text:"Close", handler: this.closeCalendar}],
                iframe:false,
                close:false
            });
            this.dialog.setBody('<div id="' + this.calId +'"></div>');
            this.dialog.render(document.body);
        }

        if(!this.calendar){
            var config = new Object();
            config.iframe=false;
            config.hide_blank_weeks=true;
            config.close=false;

            if(this.title){
               config.title=this.title;
            }
            if(this.mindate){
               config.mindate=this.mindate;
            }
            if(this.maxdate){
               config.maxdate=this.maxdate;
            }
            /*SUMA:Sep27,2011 :Implemented calendar internationalization.*/
            if(this.months){
               config.months_long=this.months;
            }
			if(this.days){
               config.locale_days="long";
               config.days_long=this.days;
            }
            if(this.weekdays){
               config.locale_weekdays="long";
               config.weekdays_long=this.weekdays;
            }	
            else{
               config.locale_weekdays="1char";    
            }

            this.calendar = new YAHOO.widget.Calendar(this.calId,  config);

            //this.calendar.render();

            this.calendar.selectEvent.subscribe(function(e) {
                var calObj =kony.widgets.Calendar.Popupview.calObj;
                var el = YAHOO.util.Dom.get(calObj.eid);
                var formater = kony.widgets.Calendar.DateFormater;
                if (calObj.calendar.getSelectedDates().length > 0) {
                    var selDate = calObj.calendar.getSelectedDates()[0];
                    selDate = formater.format(selDate,el.getAttribute("format"))
                    el.setAttribute('value',selDate);
                    el.value = selDate;
                } else {
                    el.value = "";
                }
                calObj.dialog.hide();
            });

            this.calendar.renderEvent.subscribe(function() {
                // Tell Dialog it's contents have changed, which allows
                // container to redraw the underlay (for IE6/Safari2)
                kony.widgets.Calendar.Popupview.calObj.dialog.fireEvent("changeContent");
            });
        }
    },
    destroyCalendar : function(){
        this.dialog = undefined;
        this.calendar = undefined;
    }
}


kony.widgets.Calendar.Util = {
    isValidDate : function(day,month,year){
        var isValid = false;
        var selDate=new Date();
        try{
            selDate.setFullYear(year,month,day);
            //If set Date is valid then date, month and year should be same.
            if(selDate.getDate() == day && selDate.getMonth() == month && selDate.getFullYear() == year)
                isValid = true;
        }catch(e){
            isValid = false;
        }
        return isValid;
    },

    daysInMonth : function (month,year) {
        var dd = new Date(year, month, 0);
        return dd.getDate();
    }
}
