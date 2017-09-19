  function hideCalendar (calendarID){
            slideup(calendarID+"_calendar_widget");
            var caldrs=calendarID+"_calendar";
            var calbut=calendarID+"_but";
            var cal = document.getElementById(caldrs);
            var but = document.getElementById(calbut);
            cal.style.display="none";
            but.style.display="none";
        }
  function  updateCalendar (calendarID){

        slideup(calendarID+"_calendar_widget");
        var caldrs=calendarID+"_calendar";
        var calbut=calendarID+"_but";
        var calmnt=calendarID+"_inline_month";
        var calday=calendarID+"_inline_day";
        var calyer=calendarID+"_inline_year";
        var caltxtfld=calendarID+"_caltxtfld";
        var cal = document.getElementById(caldrs);
        var but = document.getElementById(calbut);
        cal.style.display="none";
        but.style.display="none";
        var tmpmn = document.getElementById(calmnt);
        var tmpyr = document.getElementById(calyer);
        var tmpdy = document.getElementById(calday);
        var tmphl = document.getElementById(caltxtfld);
        var mn = tmpmn.selectedIndex+1;
        var Year = tmpyr[tmpyr.selectedIndex].text;
        var day= tmpdy[tmpdy.selectedIndex].text
        var format=tmphl.getAttribute("format");
        var frmt=format.split("/",2);
        if(frmt[0]=="mm")
        tmphl.value=mn+"/"+day +"/"  +Year;
        else
        tmphl.value=day+"/"+mn +"/"  +Year;
    }

    function showCalendar(crid){

             slidedown(crid+"_calendar_widget");
           	var caldtxtfld=crid+"_caltxtfld";
                var calmnt=crid+"_inline_month";
                var calday=crid+"_inline_day";
                var calyer=crid+"_inline_year";
                var caltxtfldnode = document.getElementById(caldtxtfld);
                var tmpmn = document.getElementById(calmnt);
                var tmpyr = document.getElementById(calyer);
                var tmpdy = document.getElementById(calday);

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
                updateDaysforInlineMode(crid);

            var caldrs=crid+"_calendar";
            var calbut=crid+"_but";
            var cal = document.getElementById(caldrs);
            var but = document.getElementById(calbut);

            cal.style.display="block";
            but.style.display="block";
        }

    /**
	 * Verifies if the calendar widget has been placed in the page and if it is
	 * an inline calendar perform the initialization of the calendar widget.
	 */
    function checkCalendarwidget() {


        var inlineCalendarViewElement=document.getElementsByName("calendar_inline");

        // Verify if the inline view is
        if(inlineCalendarViewElement)
        {
            for(var i=0;i<inlineCalendarViewElement.length;i++)
            {
                var id= inlineCalendarViewElement[i].getAttribute( "id");

                var crid= id.split("_")[0];
                var caldtxtfld=crid+"_inlinemode";
                var calmnt=crid+"_inline_month";
                var calday=crid+"_inline_day";
                var calyer=crid+"_inline_year";
                var caltxtfldnode = document.getElementById(caldtxtfld);
                var tmpmn = document.getElementById(calmnt);
                var tmpyr = document.getElementById(calyer);
                var tmpdy = document.getElementById(calday);

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
                updateDaysforInlineMode(crid);
            }
        }

    }

    function updateDaysforInlineMode(crid){
        //var types = "inline_day,inline_month,inline_year";
        var calmnt=crid+"_inline_month";
        var calday=crid+"_inline_day";
        var calyer=crid+"_inline_year";

        var selection = document.getElementById(calyer);
        var year =  selection.options[selection.selectedIndex].value ;
        selection = document.getElementById(calmnt);
        var month = selection.selectedIndex;
        month = parseInt(month);
        selection = document.getElementById(calday);
        var day =  selection.options[selection.selectedIndex].value ;

        if(!isValidDate(day, month, year)){
            selection = document.getElementById(calday);
            selection.selectedIndex = 0;
            day=1;
        }
        updatedDaysInMonth(selection,daysInMonth(month+1, year));
        updateHiddenField  (crid,day,month,year);
    }

    function updatedDaysInMonth  (selection , days){
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

    }

    function updateHiddenField  (crid,day,month,year){
    	var caldtxtfld=crid+"_inlinemode";
        var caltxtfldnode = document.getElementById(caldtxtfld);
        if(caltxtfldnode){
        	month++;
        	if(month < 10){
        		month="0"+month;
        	}
  			 var format=caltxtfldnode.getAttribute("format");
  			var frmt=format.split("/",2);
  			if(frmt[0]=="mm")
  				caltxtfldnode.value = month+"/"+day +"/"  +year;
  			else
  	        	caltxtfldnode.value = day+"/"+month +"/"  +year;  	        
  		}
    }

/**
 * Calendar As popup is available in advansed clients.
 * This uses yahoo yui.
 *
 */
var calObj = null;

function closeHandler() {
	   calObj.dialog.hide();
}

function calendarObject(){
    var Event = YAHOO.util.Event,Dom = YAHOO.util.Dom;
    this.dialog = null;
    this.calendar = null;
    this.eid = null;
    this.title = null;
    this.showBtn = 'showCal';
    var calId = 'calContainer' ;
    this.closeCalendar = function(e) {
        var el = Event.getTarget(e);
        var dialogEl = calObj.dialog.element;
        if (el != dialogEl
            && !Dom.isAncestor(dialogEl, el)
            && el != Dom.get(calObj.showBtn)
            && !Dom.isAncestor(Dom.get(calObj.showBtn), el)) {
            calObj.dialog.hide();
        //calObj.removeCloser();
        }
    }
    this.addCloser = function(){
        // Hide Calendar if we click anywhere in the document other than the calendar
        Event.on(document, "click", this.closeCalendar);
    }
    this.removeCloser = function(){
        // Hide Calendar if we click anywhere in the document other than the calendar
        Event.removeListener(document, "click", this.closeCalendar);
    }
    this.createCalendar = function(){

        if(!this.dialog){
            this.dialog = new YAHOO.widget.Dialog("container", {
                visible:true,
                width:100,
                draggable:false,
                buttons:[{text:"Close", handler: closeHandler}],
                iframe:false,
                close:false
            });
            this.dialog.setBody('<div id="' + calId +'"></div>');
            this.dialog.render(document.body);
        }

        if(!this.calendar){
            var curDate = new Date();
            var minDate = (curDate.getMonth() + 1 ) + "/" + curDate.getDate() + "/" + curDate.getFullYear();
            if(this.title){
            this.calendar = new YAHOO.widget.Calendar(calId, {
                iframe:false,          // Turn iframe off, since container has iframe support.
                hide_blank_weeks:true,  // Enable, to demonstrate how we handle changing height, using changeContent
                locale_weekdays:"1char",
                    mindate:minDate,
                    title:this.title,
                    close:false
            });
            }else{
                this.calendar = new YAHOO.widget.Calendar(calId, {
                    iframe:false,          // Turn iframe off, since container has iframe support.
                    hide_blank_weeks:true,  // Enable, to demonstrate how we handle changing height, using changeContent
                    locale_weekdays:"1char",
                    mindate:minDate,
                    close:false
                });
            }

            this.calendar.render();

            this.calendar.selectEvent.subscribe(function(e) {
                var el = Dom.get(calObj.eid);
                var formater = new DateFormater(el.getAttribute("format"));

                if (calObj.calendar.getSelectedDates().length > 0) {
                    var selDate = calObj.calendar.getSelectedDates()[0];
                    selDate = formater.format(selDate)
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
                calObj.dialog.fireEvent("changeContent");
            });
        }
    }
    this.destroyCalendar = function(){
        this.dialog = undefined;
        this.calendar = undefined;
    }
}

function showCalenderPopup(eid,overlayCorner, contextCorner,title){
    if(!calObj){
        calObj = new calendarObject();
        calObj.eid = eid;
        if(title && title != ''){
            calObj.title = title;
        }
        calObj.createCalendar();
    }else{
        if(!YAHOO.util.Dom.get('calContainer')){
            calObj.destroyCalendar();
            if(title && title != ''){
                calObj.title = title;
            }
            calObj.createCalendar();
        }
        calObj.eid = eid;
    }
    calObj.dialog.cfg.setProperty("context",[document.getElementById(eid)],true);
    //calObj.dialog.align(overlayCorner,contextCorner );
    //Added below logic to reset current date to previously selected date.
    var selDates = calObj.calendar.getSelectedDates();
    var resetDate;
    if (selDates.length > 0) {
        resetDate = selDates[0];
    } else {
        resetDate = calObj.calendar.today;
    }
    calObj.calendar.cfg.setProperty("pagedate", resetDate);

    //calObj.dialog.center();
    calObj.dialog.moveTo(overlayCorner,contextCorner);
    calObj.showBtn = 'show'+eid;
    calObj.dialog.show();
    calObj.addCloser();
}
/** Javascript dataformater for format
 *javascript date object in given format
 **/
DateFormater = function(dateformat) {
    DateFormater.prototype.DD = 'dd';
    DateFormater.prototype.MM = 'MM';
    DateFormater.prototype.mm = 'mm';
    DateFormater.prototype.yyyy = 'yyyy';
    DateFormater.prototype.yy = 'yy';
    DateFormater.prototype.separator_ = '-';
    DateFormater.prototype.seperator = '/';
    DateFormater.prototype.cseperator = '/';
    DateFormater.prototype.dateformat =dateformat;
    DateFormater.prototype.format = function(date){
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
                case this.yy    :value = date.getYear() - 100;
                    break;
            }
            if(value < 10){
                value = "0"+value;
            }
            result  = result + value + this.cseperator;
        }
        return result.substr(0, result.length-1);
    };

    DateFormater.prototype.formatArray = function(){
        var array = null;
        if(dateformat != null ){
            array = dateformat.split(this.seperator);
            if(!array || array.length == 1){
                array = dateformat.split(this.seperator_);
                this.cseperator = this.seperator_;
            }
        }
        return array;
    }

}


    function isValidDate (day,month,year){
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
    }

    function daysInMonth   (month,year) {
        var dd = new Date(year, month, 0);
        return dd.getDate();
    }
