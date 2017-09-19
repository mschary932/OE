/*
 * Widget : Calendar
 */
 
$KW.Calendar =
{
    initialize: function(){
       	kony.events.addEvent("click", "Calendar", this.eventHandler);
        kony.events.addEvent("onorientationchange", "Calendar", $KW.Calendar.__dp.reposition);
    },
    initializeView: function(formId){	

    	$KW.Calendar.__dp.days =  (function(){
    		if($KG["i18nArray"] && $KG["i18nArray"]["weekdayI18Nkey"]){
    			var localData = $KG["i18nArray"] && $KG["i18nArray"]["weekdayI18Nkey"] ? kony.i18n.getLocalizedString("weekdayI18Nkey") : null;
    			if(localData){
					return localData.split(',');
				}else{
					return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
				}
    		}else{
    			var localData = [];
				if($KG["i18nArray"]){
					var i18Sunday,i18Monday,i18Tuesday,i18Wednesday,i18Thursday,i18Friday,i18Saturday;
					i18Sunday = $KG["i18nArray"]["platform.calendar.sunday"] ? kony.i18n.getLocalizedString("platform.calendar.sunday") : 'SUN';
					i18Sunday && localData.push(i18Sunday);
					i18Monday = $KG["i18nArray"]["platform.calendar.monday"] ? kony.i18n.getLocalizedString("platform.calendar.monday") : 'MON';
					i18Monday && localData.push(i18Monday);
					i18Tuesday = $KG["i18nArray"]["platform.calendar.tuesday"] ? kony.i18n.getLocalizedString("platform.calendar.tuesday") : 'TUE';
					i18Tuesday && localData.push(i18Tuesday);
					i18Wednesday = $KG["i18nArray"]["platform.calendar.wednesday"] ? kony.i18n.getLocalizedString("platform.calendar.wednesday") : 'WED';
					i18Wednesday && localData.push(i18Wednesday);
					i18Thursday = $KG["i18nArray"]["platform.calendar.thursday"] ? kony.i18n.getLocalizedString("platform.calendar.thursday") : 'THU';
					i18Thursday && localData.push(i18Thursday);
					i18Friday = $KG["i18nArray"]["platform.calendar.friday"] ? kony.i18n.getLocalizedString("platform.calendar.friday") : 'FRI';
					i18Friday && localData.push(i18Friday);
					i18Saturday = $KG["i18nArray"]["platform.calendar.saturday"] ? kony.i18n.getLocalizedString("platform.calendar.saturday") : 'SAT';
					i18Saturday && localData.push(i18Saturday);
				}
				if(localData.length > 0){
					return localData;
				}else{
					return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
				}
    		}
		}());
	    $KW.Calendar.__dp.months =  (function(){
	    	if($KG["i18nArray"] && $KG["i18nArray"]["monthI18Nkey"]){
	    		var localData = $KG["i18nArray"] && $KG["i18nArray"]["monthI18Nkey"] ? kony.i18n.getLocalizedString("monthI18Nkey") : null;
	    		if(localData){
				return localData.split(',');
			}else{
				return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			}
	    	}else{
	    		var localData = [];
		    	if($KG["i18nArray"]){
		    		var i18January,i18February,i18March,i18April,i18May,i18June,i18July,i18August,i18September,i18October,i18November,i18Decemberjanuary;
					i18January = $KG["i18nArray"]["platform.calendar.january"] ? kony.i18n.getLocalizedString("platform.calendar.january") : 'January';
					i18January && localData.push(i18January);
					i18February = $KG["i18nArray"]["platform.calendar.february"] ? kony.i18n.getLocalizedString("platform.calendar.february") : 'February';
					i18February && localData.push(i18February);
					i18March = $KG["i18nArray"]["platform.calendar.march"] ? kony.i18n.getLocalizedString("platform.calendar.march") : 'March';
					i18March && localData.push(i18March);
					i18April = $KG["i18nArray"]["platform.calendar.april"] ? kony.i18n.getLocalizedString("platform.calendar.april") : 'April';
					i18April && localData.push(i18April);
					i18May = $KG["i18nArray"]["platform.calendar.may"] ? kony.i18n.getLocalizedString("platform.calendar.may") : 'May';
					i18May && localData.push(i18May);
					i18June = $KG["i18nArray"]["platform.calendar.june"] ? kony.i18n.getLocalizedString("platform.calendar.june") : 'June';
					i18June && localData.push(i18June);
					i18July = $KG["i18nArray"]["platform.calendar.july"] ? kony.i18n.getLocalizedString("platform.calendar.july") : 'July';
					i18July && localData.push(i18July);
					i18August = $KG["i18nArray"]["platform.calendar.august"] ? kony.i18n.getLocalizedString("platform.calendar.august") : 'August';
					i18August && localData.push(i18August);
					i18September = $KG["i18nArray"]["platform.calendar.september"] ? kony.i18n.getLocalizedString("platform.calendar.september") : 'September';
					i18September && localData.push(i18September);
					i18October = $KG["i18nArray"]["platform.calendar.october"] ? kony.i18n.getLocalizedString("platform.calendar.october") : 'October';
					i18October && localData.push(i18October);
					i18November = $KG["i18nArray"]["platform.calendar.november"] ? kony.i18n.getLocalizedString("platform.calendar.november") : 'November';
					i18November && localData.push(i18November);
					i18December = $KG["i18nArray"]["platform.calendar.december"] ? kony.i18n.getLocalizedString("platform.calendar.december") : 'December';
					i18December && localData.push(i18December);
				}
				if(localData.length > 0){
					return localData;
				}else{
					return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
				}
	    	}
	    	
	    	
	    }());
    },
	

	setcontext: function(popupModel, context){
	
        if (popupModel instanceof Object && context instanceof Object) {
            popupModel.context = context;
        }
    },
	

    /**
     * Updates the view of the listbox widget.
     */
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
        var element = $KU.getNodeByModel(widgetModel);
		
        switch (propertyName) {
            case "date":
                widgetModel.luadate = propertyValue;
                var formater = $KW.Calendar.DateFormater;
                var dateValue = $KW.Calendar.ideDateToString(widgetModel.date);
				widgetModel.entereddate = dateValue;
                var isValid = $KU.isValidDate(dateValue, "dd/mm/yyyy");
                if (isValid) {
                    if(!kony.appinit.isMobile && !kony.appinit.isTablet && kony.appinit.isIE8){
                		var calInput = document.getElementById(widgetModel.id);
                		calInput.value = "";
                		$KU.removeClassName(calInput, 'konyplaceholder')
                		calInput.value = dateValue;	
                	}else{
                		widgetModel.day = propertyValue[IndexJL+0];
	                    widgetModel.month = propertyValue[IndexJL+1];
	                    widgetModel.year = propertyValue[IndexJL+2];
						this.updateCalDOMNode(widgetModel, true);	
                	}
                }		
				break;

            case "datecomponents":
                widgetModel.day = propertyValue[IndexJL + 0];
                widgetModel.month = propertyValue[IndexJL + 1];
                widgetModel.year = propertyValue[IndexJL + 2];
                widgetModel.hour = 0; //propertyValue[IndexJL+3];
                widgetModel.minutes = 0; //propertyValue[IndexJL+4];
                widgetModel.seconds = 0; //propertyValue[IndexJL+5];
				this.updateCalDOMNode(widgetModel, true);
                break;

            case "placeholder":
				var node = document.getElementById(widgetModel.id);
				if(node && (node.value.indexOf('/') > -1 || node.value.indexOf('-') > -1)){
					return false;
				}
				propertyValue = propertyValue || widgetModel.dateformat || widgetModel.format;
				if(widgetModel.placeholder != propertyValue){
					widgetModel.placeholder = propertyValue;
				}				
				node && node.setAttribute("placeholder", widgetModel.placeholder );
				
                break;
				
            case "calendaricon":
                if(element) 
					element.childNodes[1].src = $KU.getImageURL(propertyValue);
					widgetModel.Image = propertyValue;
                break;
				
            case "dateformat":			
                this.updateCalDOMNode(widgetModel, true);				
                break;
				
			case "validstartdate":
			case "startdate":
				widgetModel.startdate = propertyValue;
				break;
			
			case "validenddate":
			case "enddate":
				widgetModel.enddate = propertyValue;
				break;

			case "titleonpopup":
				widgetModel.title = propertyValue;
				break;
        }
    },


    render : function(calendarModel, context){
		calendarModel.placeholder = calendarModel.placeholder || calendarModel.dateformat || calendarModel.format;
        var computedSkin = $KW.skins.getWidgetSkinList(calendarModel, context);
        var htmlString = "";
        var type = "text";
		var formater = $KW.Calendar.DateFormater;        
	    var imgsrc = calendarModel.Image ? $KU.getImageURL(calendarModel.Image) : $KU.getImageURL("calbtn.gif");			
        var marginPaddding = $KW.skins.getBaseStyle(calendarModel, context);
        if (calendarModel.viewtype === constants.CALENDAR_VIEW_TYPE_GRID_POPUP || calendarModel.viewtype == "default") {
        
            var dateObj = {};
            if (calendarModel.date instanceof Array) {
                calendarModel.luadate = calendarModel.date;
				calendarModel.entereddate = calendarModel.date;
                if (calendarModel.date && calendarModel.date.length > IndexJL) {
					var dey = [calendarModel.date[0+IndexJL], calendarModel.date[1+IndexJL], calendarModel.date[2+IndexJL]]
                    var result = $KW.Calendar.__dp.dateFormatter(calendarModel.dateformat, dey);
					if(result != false){ 
						calendarModel.dateComponents = result.date;
						calendarModel.formatteddate = result.string;
					}                    
                    calendarModel.day = result.date[0];
                    calendarModel.month = result.date[1];
                    calendarModel.year = result.date[2];
                    /*calendarModel.date = dateObj.dateText;*/
                    calendarModel.selectdate = dateObj.selectdate;
                    calendarModel.pagedate = dateObj.pagedate;
                }
                else {
                    calendarModel.day = null;
                    calendarModel.month = null;
                    calendarModel.year = null;
                }
                calendarModel.hour = calendarModel.minutes = calendarModel.seconds = 0;
            }
            else {
                calendarModel.formatteddate = calendarModel.date;
            }
            
		
			$KW.Calendar.updateCalDOMNode(calendarModel, false);
	    
			var cAlign = $KW.skins.getContentAlignment(calendarModel);
            if(context.ispercent === false)
				marginPaddding += " display: inline-block;"			
            
            
            if(kony.appinit.isAndroid || kony.appinit.isiPhone){
               htmlString = "<div role='option' " + $KW.Utils.getBaseHtml(calendarModel, context) + "class = '" + computedSkin + "'";
            }else{
            	htmlString = "<div " + $KW.Utils.getBaseHtml(calendarModel, context) + "class = '" + computedSkin + "'";            
            }
            
            htmlString += " style='" + ($KU.isAndroid ? "position:relative;" : "") + ("text-align:" + cAlign + "; vertical-align: middle;") + marginPaddding + (context.ispercent === false ?  "display:inline-block" : "") + ";overflow:hidden'>";
			
			var inputID = (context.container ? (calendarModel.id + "_" + context.container.counter) : calendarModel.id);
			if(!kony.appinit.isWindowsPhone && !kony.appinit.isBlackBerry10){
				htmlString += "<input id='" + inputID + "' style='-" + vendor + "-appearance: none; text-align: inherit; vertical-align: middle;background:transparent;width:50%;text-decoration:inherit;' name='calBody' readonly";	
			}else if(kony.appinit.isWindowsPhone || kony.appinit.isBlackBerry10){
				htmlString += "<input id='" + inputID + "' style='-" + vendor + "-appearance: none; text-align: inherit; vertical-align: middle;background:transparent;width:50%;text-decoration:inherit;' name='calBody' disabled='disabled'";
			}

            
            
            htmlString += (calendarModel.placeholder) ? " placeholder='" + calendarModel.placeholder + "'" : "";
            htmlString += (calendarModel.title) ? " title='" + calendarModel.title + "'" : "";
            htmlString += (calendarModel.disabled) ? " disabled='true'" : "";
			
			htmlString += (calendarModel.date) ? " value='" + (calendarModel.formatteddate || "") + "'" : "";

			var isDisabled = $KW.Utils.isWidgetDisabled(calendarModel, context) || false;
			
			htmlString += isDisabled ? ' kdisabled="true" disabled="true" ' : ""; 	
			
            htmlString += " type='text' />";
            
			var altText = (calendarModel.accessibilityconfig && calendarModel.accessibilityconfig.hint)? calendarModel.accessibilityconfig.hint : "Calendar" ;
            
            htmlString += "<img type='image' style='float:right;vertical-align:middle' xalign='right' src='" + imgsrc + "' onload='$KW.Calendar.setCalElementStyle(this,false)' ";
            //alt='"+ ariaString +"' -- Removed from image Tag

            
            htmlString += (calendarModel.title) ? " title='" + calendarModel.title + "'" : "";
            htmlString += " />";
			
			
			if($KU.isAndroid){
				htmlString += "<div style='position:absolute;width:100%;height:100%;background:transparent;top:0;left:0'><div style='width:100%;height:100%;background:transparent;'></div></div>";
			}
			
			
            htmlString += "</div>";
        }        
        return htmlString;
    },
	
	setCurrentDate: function(calendarModel){
		var todayDate = new Date();
		calendarModel.datecomponents = [];
		calendarModel.datecomponents[IndexJL+0] = 0;
		calendarModel.datecomponents[IndexJL+1] = todayDate.getMonth()+1;
		calendarModel.datecomponents[IndexJL+2] = todayDate.getFullYear();
		calendarModel.datecomponents[IndexJL+3] = 0;
		calendarModel.datecomponents[IndexJL+4] = 0;
		calendarModel.datecomponents[IndexJL+5] = 0;
	},
	
    eventHandler: function(eventObject, target){
    	var maxYearLimit = 2099;
    	var minYearLimit = 1900;
		var closeLink = document.getElementById('calendar_close_link');
		var titleOnPopUpVisibility = document.getElementById('-k-w-c-cal-title');
    	if(closeLink != null || closeLink != undefined){
    		closeLink.style.visibility = 'visible';
    	}
    	if(titleOnPopUpVisibility){
    		titleOnPopUpVisibility.style.visibility = 'visible';
    	}
    	if(target.getAttribute('k-w-c-id')){
			var id = target.getAttribute('k-w-c-id');
		}else{		
			var id = target.getAttribute("id");			
		}
		id = id.split('-')[0];
		var calendarId = $KU.getElementID(id);
        id = id.split("_").length > 2 ? id.substring(0, id.lastIndexOf("_")) : id;
        var calendarModel = kony.model.getWidgetModel(target.getAttribute("kformname"), $KU.getElementID(id), target.getAttribute("ktabpaneid"));
        var title = calendarModel.title;
		var model = calendarModel;
		if(!model.viewconfig){ model.viewconfig = { gridconfig : "" } }
        var startDate = calendarModel.startdate;
        var endDate = calendarModel.enddate;
        

        if (!model) return;
            var config = model.viewconfig.gridconfig || model.viewconfig.gridConfig || {};
            var mons = $KW.Calendar.__dp.months;
            if(target.className.indexOf('-kony-w-c-yemo') > -1){
        	calendarModel.currentSelectedyearMonth = target.innerHTML.split(',');
	        	for(var a=0;a<mons.length;a++){
	        		if(calendarModel.currentSelectedyearMonth[0] == mons[a]){
	        			calendarModel.currentSelectedMonth = a;
	        		}
	        	}
	        }
            if (target.className.indexOf('-kony-w-c-next-nav') > -1){
				var activeDP = document.getElementById(target.getAttribute('k-w-c-id') + "-k-w-c-datepicker");
				var div = document.querySelectorAll("#" + activeDP.id + ' .-kony-w-c-popup-container')[0];
				var mn = div.getAttribute('month'), 
				yy = div.getAttribute('year');
                if(Number(yy) < maxYearLimit){
					var ser = $KW.Calendar.__dp.series(yy, mn, (model.noofmonths || 1) * 1 + 1);
					ser.splice(0, 1);
					var undef, tar = document.getElementById(target.getAttribute('k-w-c-id'));
	            }else if(Number(yy) == maxYearLimit){
	            	if(Number(mn) < 12){
	            		var ser = $KW.Calendar.__dp.series(yy, mn, (model.noofmonths || 1) * 1 + 1);
						ser.splice(0, 1);
						var undef, tar = document.getElementById(target.getAttribute('k-w-c-id'));
					}
				}
				$KW.Calendar.__dp.show(calendarModel,ser, undef,tar);
				target.blur();
				var monthYearDiv = document.getElementsByClassName('-kony-w-c-yemo')[0];
	            if(monthYearDiv){
	            	monthYearDiv.focus();
	            }
                return;
            }else if (target.className.indexOf('-kony-w-c-prev-nav') > -1){
                var activeDP = document.getElementById(target.getAttribute('k-w-c-id') + "-k-w-c-datepicker");
				var div = document.querySelectorAll("#" + activeDP.id + ' .-kony-w-c-popup-container')[0];
				var mn = div.getAttribute('month'), yy = div.getAttribute('year');
				if (mn == 1) {
                    mn = 12;
                    yy = yy - 1;
                } else {
                    mn = mn - 1;
                }
                if(Number(yy) > minYearLimit){
                	var ser = $KW.Calendar.__dp.series(yy, mn, (model.noofmonths || 1));
					var undef, tar = document.getElementById(target.getAttribute('k-w-c-id'));		
                }else if(Number(yy) == minYearLimit){
                	if(Number(mn) > 0){
                		var ser = $KW.Calendar.__dp.series(yy, mn, (model.noofmonths || 1));
						var undef, tar = document.getElementById(target.getAttribute('k-w-c-id'));		
                	}
                }
				$KW.Calendar.__dp.show(calendarModel,ser, undef,tar);
				var monthYearDiv = document.getElementsByClassName('-kony-w-c-yemo')[0];
	            if(monthYearDiv){
	            	monthYearDiv.focus();
	            }
                return;
            } else if ( target.getAttribute("k-w-c-hold-day") ) {
                var calendarElement = document.getElementById(target.getAttribute('k-w-c-id'));
				calendarElement.className = calendarElement.className.replace('konyplaceholder',"");
                var result = $KW.Calendar.__dp.dateFormatter(model.dateformat, target.getAttribute("k-w-c-hold-day").split(','));
				if(result != false) { 
					model.dateComponents = result.date;
					if ( kony.appinit.isIE7 || kony.appinit.isIE8 || IndexJL == 1 ) {
						result.date[3] = (calendarModel.hour != 0) ? calendarModel.hour : new Date().getHours();
						result.date[4] = (calendarModel.minutes != 0) ? calendarModel.minutes : new Date().getMinutes();
						result.date[5] = (calendarModel.seconds != 0) ? calendarModel.seconds : new Date().getSeconds();
						model.date = result.date;
						model.datecomponents = result.date;
						model.day = result.date[0];
						model.month = result.date[1];
						model.year = result.date[2];
						calendarModel.formatteddate = result.string;
					}
					if(calendarElement){
						var cle = document.getElementById($KW.Calendar.__dp.invoked[calendarElement.id].i);
						cle.value = result.string;
						$KU.removeClassName(cle, 'konyplaceholder');		
					}
				}                
				var selDate = new Date();
				if(IndexJL == 1 && model.datecomponents[0] != null){
					model.datecomponents = [null].concat(model.datecomponents)
				}
				model._startG = [0, model.datecomponents[1 + IndexJL], model.datecomponents[2 + IndexJL]];
                model.month = model.datecomponents[1 + IndexJL];
                model.day = model.datecomponents[0 + IndexJL];
                model.year = model.datecomponents[2 + IndexJL];
				var selDate = new Date();
				model.minutes = selDate.getMinutes();
				model.hour = selDate.getHours();
				model.seconds = selDate.getSeconds();                
				var parent = calendarElement;
                if ( parent && parent.getAttribute("kcontainerID")){
					$KW.Utils.updateContainerData(model, parent, false, true);
				}
                //model.onselection(e,dEY);
				

                var a11yCalendarUpdate  = calendarModel.accessibilityconfig ? ((calendarModel.accessibilityconfig.a11yLabel?calendarModel.accessibilityconfig.a11yLabel:"")+' '+calendarModel.date) : ("Calendar "+calendarModel.date);
                calendarElement.setAttribute('aria-label' , a11yCalendarUpdate);
                var formElement = document.getElementById(calendarModel.pf);
				if(formElement)
		formElement.setAttribute('aria-hidden' , false);
		$KW.Calendar.__dp.destroyCalendar(undefined , parent.id);
               
                /*if(calendarModel.accessibilityconfig){
                 	setTimeout(function(){
                 		$KW.Calendar.__dp.destroyCalendar();
                 	},3000)
                 }else{
                 	$KW.Calendar.__dp.destroyCalendar();
                }
                }*/
                //calendarElement.setAttribute('tabindex' , '1');
                calendarElement.focus();
				if (!model.containerId) {
                    var calenEventref = $KU.returnEventReference(model.ondone || model.onselection);
                    calenEventref && calenEventref.call(model, model);
                }
                return;
            } else if (target.className.indexOf('-kony-w-c-yemo') > -1) {
            	closeLink.style.visibility = 'hidden' ;
            	if(titleOnPopUpVisibility){
		    		titleOnPopUpVisibility.style.visibility = 'hidden';
		    	}
            	
                var tar = target.getAttribute('k-w-c-id');
                var element = document.getElementById(tar + "-k-w-c-datepicker");
                var yearMonthValue;
                if(target.innerText == undefined){
                	yearMonthValue = target.textContent.split(','); 
                }else{
                	yearMonthValue = target.innerText.split(',');
                }
                var currentYearValue = yearMonthValue[1].trim();	
                
                /*if(IndexJL == 0){
                	var currentYearValue = kony.string.trim(yearMonthValue[1]);	
                }else{
                	var currentYearValue = $KI.string.trim(yearMonthValue[1]);
                }*/
                var template = $KW.Calendar.__dp.navigatorTemplate(model, tar, currentYearValue , "fromYearMonth");
                var div = document.createElement('div');
				div.innerHTML = template;
				div.style.position = "absolute";
				div.style.height = div.style.width = "100%";
				div.className = "-k-w-c-navigator-scrim";
				div.style['background-color'] = "White";
				div.id = tar + "-k-w-c-navigator-scrim";
				div.setAttribute('w-type',"Calendar");
				div.firstChild.position = "absolute";
				div.firstChild.style['background-color'] = "white";	
				var dp = element;
				dp.appendChild(div);
				var ht = div.clientHeight, htp = div.firstChild.clientHeight,
					wt = div.clientWidth, wtp = div.firstChild.clientWidth;
				div.firstChild.position = "absolute";
				div.firstChild.style.top = ((ht - htp) / 2) + "px";
				div.firstChild.style.left = ((wt - wtp) / 2) + "px";
				div.style.top = div.style.left = "0px";
				var previousTabIndexClear = document.querySelectorAll('[tabindex]');
				for(var i=0;i < previousTabIndexClear.length;i++){
					previousTabIndexClear[i].removeAttribute('tabindex');
				}
				document.activeElement.blur();
				document.querySelectorAll('.-kony-w-c-popup-container')[0].setAttribute('aria-hidden', true);
				div.querySelectorAll('[w-type-inactive]')[0].setAttribute('tabindex' ,1);
				div.querySelectorAll('[w-type-inactive]')[0].focus();
				return false;
            }
            if (target.className.indexOf('-kony-w-c-navigator-month') > -1) {
            	closeLink.style.visibility = "hidden";
            	if(titleOnPopUpVisibility){
		    		titleOnPopUpVisibility.style.visibility = 'hidden';
		    	}
            	var tar = target.getAttribute('k-w-c-id'), elements = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker  .-kony-w-c-navigator-month-selected");                		
                for (i = 0; i < elements.length; i++) {
                    if (elements[i] != target) {
                        $KW.Calendar.__dp.removeClass(elements[i], '-kony-w-c-navigator-month-selected');
                        $KW.Calendar.__dp.addClass(elements[i], '-kony-w-c-navigator-month');
                    }
                }
				$KW.Calendar.__dp.addClass(target, '-kony-w-c-navigator-month-selected');
				var selym = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-k-w-c-nav-selected-ym")[0];
				var selectedYear = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-year-selected")[0];
				if(selectedYear){
					var x = selectedYear.getAttribute('k-w-c-hold') * 1;
				}
				var selectedMnth = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-month-selected")[0];
				if(selectedMnth){
					var y = $KW.Calendar.__dp.months[(selectedMnth.getAttribute('k-w-c-hold') * 1) - 1];
				}
				selym.innerHTML = (y || "") + " "  + (x || "");
                return false;

            } else if (target.className.indexOf('-kony-w-c-navigator-year') > -1) {
            	closeLink.style.visibility = "hidden";
            	if(titleOnPopUpVisibility){
		    		titleOnPopUpVisibility.style.visibility = 'hidden';
		    	}
            	var tar = target.getAttribute('k-w-c-id'), elements = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker  .-kony-w-c-navigator-year-selected");
                for (i = 0; i < elements.length; i++) {
                    if (elements[i] != target) {
                        $KW.Calendar.__dp.removeClass(elements[i], '-kony-w-c-navigator-year-selected');
                        $KW.Calendar.__dp.addClass(elements[i], '-kony-w-c-navigator-year');
                    }
                }
				$KW.Calendar.__dp.addClass(target, '-kony-w-c-navigator-year-selected');
				var selym = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-k-w-c-nav-selected-ym")[0];
				var selectedYear = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-year-selected")[0];
				if(selectedYear){
					var x = selectedYear.getAttribute('k-w-c-hold') * 1;
				}
				var selectedMnth = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-month-selected")[0];
				if(selectedMnth){
					var y = $KW.Calendar.__dp.months[(selectedMnth.getAttribute('k-w-c-hold') * 1) - 1];
				}
				selym.innerHTML = (y || "") + " " + (x || "");
                return false;
            } 
			else if (target.className.indexOf("-kony-w-c-cancel-nav") > -1) 
			{
                var tar = target.getAttribute('k-w-c-id');
				var monthElement = document.querySelector( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-month-selected");
                var yearElement = document.querySelector( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-year-selected");
				monthElement && $KW.Calendar.__dp.removeClass(monthElement, '-kony-w-c-navigator-month-selected'); // clear month
				yearElement && $KW.Calendar.__dp.removeClass(yearElement, '-kony-w-c-navigator-year-selected');	// clear year
				if(monthElement || yearElement)
				{
					closeLink.style.visibility = "hidden";
					if(titleOnPopUpVisibility){
			    		titleOnPopUpVisibility.style.visibility = 'hidden';
			    	}
					var selym = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-k-w-c-nav-selected-ym")[0];
					selym.innerHTML = "";
                } 
				else 
				{
                    var ele = document.getElementById(tar + "-k-w-c-navigator-scrim");
                    ele.parentNode.removeChild(ele);
                    var previousTabIndexClear = document.querySelectorAll('[tabindex]');
					for(var i=0;i < previousTabIndexClear.length;i++){
						previousTabIndexClear[i].removeAttribute('tabindex');
					}
					document.activeElement.blur();
					document.querySelectorAll('.-kony-w-c-popup-container')[0].setAttribute('aria-hidden', false);
					var monthYearDiv = document.getElementsByClassName('-kony-w-c-yemo')[0];
				    if(monthYearDiv){
				    	monthYearDiv.setAttribute('tabindex' , 1);
				    	monthYearDiv.focus();
				    }
                }
                return false;
            } else if (target.className.indexOf("-kony-w-c-go-nav") > -1) {
				var tar = target.getAttribute('k-w-c-id'), selectedYear = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-year-selected")[0];
				if(selectedYear){
					var x = selectedYear.getAttribute('k-w-c-hold') * 1;
				}
				var selectedMnth = document.querySelectorAll( "#" + tar + "-k-w-c-datepicker .-kony-w-c-navigator-month-selected")[0];
				if(selectedMnth){
					var y = selectedMnth.getAttribute('k-w-c-hold') * 1;
				}	

				var num = x ? x : calendarModel.currentSelectedyearMonth[1].trim();

				/*if(IndexJL == 0){
                	var num = x ? x : kony.string.trim(calendarModel.currentSelectedyearMonth[1]);
                }else{
                	var num = x ? x : $KI.string.trim(calendarModel.currentSelectedyearMonth[1]);
                }*/
				
                var mn = y ? y : calendarModel.currentSelectedMonth +1;
				
				if( (mn > 0 && !(mn >= 1 && mn <= 12))){

					closeLink.style.visibility = "hidden";
					if(titleOnPopUpVisibility){
			    		titleOnPopUpVisibility.style.visibility = 'hidden';
			    	}
					alert( model.navigatorAlert);
					return false;
				}
                number = parseInt(num, 10);
                if (num || mn) {
                    var ele = document.getElementById(tar + "-k-w-c-navigator-scrim");
                    ele.parentNode.removeChild(ele);
                    var _startG = [];
					var ser = $KW.Calendar.__dp.series((num || model.year || new Date().getFullYear()), (mn || model.month || new Date().getMonth() + 1), (model.noofmonths || 1) * 1 + 1);
					var def;
					$KW.Calendar.__dp.show(model, ser,undef, document.getElementById(tar));
                } else {
                	closeLink.style.visibility = "hidden";
                	if(titleOnPopUpVisibility){
			    		titleOnPopUpVisibility.style.visibility = 'hidden';
			    	}
                	
                    alert( model.navigatorAlert );
					return false;
                }
                var previousTabIndexClear = document.querySelectorAll('[tabindex]');
				for(var i=0;i < previousTabIndexClear.length;i++){
					previousTabIndexClear[i].removeAttribute('tabindex');
				}
				document.activeElement.blur();
				document.querySelectorAll('.-kony-w-c-popup-container')[0].setAttribute('aria-hidden', false);
                var monthYearDiv = document.getElementsByClassName('-kony-w-c-yemo')[0];
			    if(monthYearDiv){
			    	monthYearDiv.setAttribute('tabindex' , 1);
			    	monthYearDiv.focus();
			    }
                return false;
            } else if (target.className.indexOf("-kony-w-c-left-ym-p") > -1) {
            	closeLink.style.visibility = "hidden";
            	if(titleOnPopUpVisibility){
		    		titleOnPopUpVisibility.style.visibility = 'hidden';
		    	}
            	
            	var tar = target.getAttribute('k-w-c-id'), elements = document.querySelectorAll('#' + tar + '-k-w-c-navigator-scrim .-kony-w-c-navigator-year');

                for (var i = 0; i < elements.length; i++){
                	if(elements[elements.length-1].innerHTML == ""){
                		elements[i].style.visibility = "visible";
                		this.cellVisibility = true;
                		if((elements[i-1] != undefined) && elements[i-1].innerHTML != ""){
                			elements[i].innerHTML =  (Number(elements[i-1].innerHTML) + 1);
                			elements[i].setAttribute("k-w-c-hold", (Number(elements[i].innerHTML)));					
						}else{
                			elements[i].innerHTML =  (Number(elements[i].innerHTML)-16);
                			elements[i].setAttribute("k-w-c-hold", (Number(elements[i].innerHTML)));					
						}
                		$KW.Calendar.__dp.removeClass(elements[i], '-kony-w-c-navigator-year-selected');

                	}else{
                		var yy = elements[i].getAttribute('k-w-c-hold') * 1;
						if(yy-16 >= minYearLimit){
	                    	elements[i].innerHTML = yy - 16;
	                    	elements[i].setAttribute("k-w-c-hold", (yy - 16));	
	                    	if(yy-minYearLimit <= 16){
	                    		for(var empty = i-1;empty>=0 ;empty --){
	                    			elements[empty].innerHTML = "";	
	                    			elements[empty].style.visibility = "hidden";
	                    			this.cellVisibility = false;
	                    		}
	                    	}else{
	                    		elements[i].style.visibility = "visible";
	                    		elements[i].setAttribute("k-w-c-hold", (yy - 16));					
								$KW.Calendar.__dp.removeClass(elements[i], '-kony-w-c-navigator-year-selected');			
	                		}
						}
                	}
                   
                }                
                return false;
            } else if (target.className.indexOf("-kony-w-c-right-ym-p") > -1) {
            	closeLink.style.visibility = "hidden";
            	if(titleOnPopUpVisibility){
		    		titleOnPopUpVisibility.style.visibility = 'hidden';
		    	}
            	
            	var tar = target.getAttribute('k-w-c-id'); 

				var elements = document.querySelectorAll('#' + tar + '-k-w-c-navigator-scrim .-kony-w-c-navigator-year');
                for (var i = 0; i < elements.length; i++){
                	if(elements[i].innerHTML == "" && this.cellVisibility == false){
                		elements[i].style.visibility = "visible";
                		if((elements[i-1] != undefined) && elements[i-1].innerHTML != ""){
                			elements[i].innerHTML =  (Number(elements[i-1].innerHTML) + 1);
                			elements[i].setAttribute("k-w-c-hold", (Number(elements[i].innerHTML)));
                			
                		}else{
                			elements[i].innerHTML =  (Number(elements[elements.length-1].innerHTML)+1);
                			elements[i].setAttribute("k-w-c-hold", (Number(elements[elements.length-1].innerHTML)+1));
                		}
                		$KW.Calendar.__dp.removeClass(elements[i], '-kony-w-c-navigator-year-selected');

                	}else{
                		var yy = elements[i].getAttribute('k-w-c-hold') * 1;
                		if(yy+16 <= maxYearLimit){
                			elements[i].innerHTML = yy + 16;
                			elements[i].setAttribute("k-w-c-hold", (yy + 16));
							if(Number(elements[i].innerHTML) == maxYearLimit){
								for(var empty = i+1; empty < 16; empty++){
									elements[empty].innerHTML = "";	
									elements[empty].style.visibility = "hidden";
								}
							}else{
								elements[i].style.visibility = "visible";	
								this.cellVisibility = true;
								elements[i].setAttribute("k-w-c-hold", (yy + 16));
								$KW.Calendar.__dp.removeClass(elements[i], '-kony-w-c-navigator-year-selected');
							}
                		}
                	}
                }
                return false;
            } else if (target.className.indexOf("-k-w-c-close-picker") > -1) {
                var tar = target.getAttribute('k-w-c-id');
				ele = document.getElementById(tar + "-k-w-c-datepicker");
				var calendarElement = $KU.getNodeByModel(calendarModel);
				if (calendarElement){
					calendarElement = calendarElement.childNodes[0];
					if(calendarElement.value == "")
						$KW.Calendar.clear(calendarModel);
				}
				ele.parentNode.removeChild(ele);
				 var formElement = document.getElementById(calendarModel.pf);
				formElement.setAttribute('aria-hidden' , false);
				$KW.Calendar.__dp.destroyCalendar(undefined , calendarElement.id);
                return;
            }else if(id==  model.id){
            	return false;
            }
			
			$KW.Calendar.__dp.reAssignData(calendarModel);
			if(target.nodeName == "INPUT" || target.nodeName == "IMG"){
				calendarModel.__id = target.parentNode.id;
			}else{
				calendarModel.__id = target.id;
				if(target.firstChild){
					calendarModel.__input = target.firstChild.id;
				}else{
					return false;
				}
			}
			$KW.Calendar && $KW.Calendar.__dp.destroyCalendar(1);
			var undef;
			target.blur();
            $KW.Calendar && $KW.Calendar.__dp.show(calendarModel,undef, undef, target);
		    var monthYearDiv = document.getElementsByClassName('-kony-w-c-yemo')[0];
		    if(monthYearDiv){
		    	monthYearDiv.focus();
		    }
	},
    
	
    updateCalDOMNode: function(widgetModel, updateDOM){
		var dateValue = "";
		var strDay = "" , strMonth = "";
		if(!widgetModel.datecomponents)
		if(!widgetModel.datecomponents){ return false; }
		if(IndexJL == 1 && widgetModel.datecomponents[0] != null ){
			widgetModel.datecomponents = [null].concat(widgetModel.datecomponents);				
		}
		widgetModel.day = widgetModel.datecomponents[0+IndexJL];
		widgetModel.month = widgetModel.datecomponents[1+IndexJL]; 
		widgetModel.year = widgetModel.datecomponents[2+IndexJL];
		if(widgetModel.day && widgetModel.month && widgetModel.year){
			var result = $KW.Calendar.__dp.dateFormatter(widgetModel.dateformat, [widgetModel.day, widgetModel.month , widgetModel.year]);
			if(result != false) { dateValue = result.string; }
			var calInput = document.getElementById(widgetModel.id);
			if(calInput && updateDOM){
				calInput.value = dateValue;
				
			}
			
			widgetModel.formatteddate = dateValue;
			widgetModel.selectdate = strMonth + "/" + strDay + "/" + widgetModel.year;
			widgetModel.pagedate = strMonth + "/" + widgetModel.year;
		}else{
			widgetModel.formatteddate = dateValue;
		}
	},
    
    clear: function(calendarModel){    
        var calendarElement = $KU.getNodeByModel(calendarModel);
        if (calendarElement){
			calendarElement = calendarElement.childNodes[0];
			calendarElement.value = "";
		}
        calendarModel.datecomponents = null;
		calendarModel.entereddate =  null;
		calendarModel.date =  null;
		calendarModel.formatteddate = null;				
		calendarModel.day = null;
		calendarModel.month = null;
		calendarModel.year = null;
		calendarModel.seconds = null;
		calendarModel.minutes = null;
		calendarModel.hour = null;
        if ( !kony.utils.placeholderSupported && calendarElement) {
            calendarModel.placeholder = calendarModel.placeholder || calendarModel.dateformat || calendarModel.format;
            calendarElement.value = calendarModel.placeholder;
            $KU.addClassName(calendarElement, 'konyplaceholder');
        }
    },
	
	setEnableAll: function(calendarModel){		
        calendarModel.datesGroup = "";
		calendarModel.datesGroupSimplified = "";
	},
	navigateToPreviousMonth :function(model){
		$KW.Calendar.__dp.reAssignData(model);
		var mn = model.displayedMonths[0], yy = model.displayedMonths[1];
		if (mn == 1) {
			mn = 12;
			yy = yy - 1;
		} else {
			mn = mn - 1;
		}
		var ser = $KW.Calendar.__dp.series(yy, mn, (model.noofmonths || 1));
		$KW.Calendar.displayedMonth(model, ser[0][0], ser[0][1]);
	},
	navigateToNextMonth : function(model){		
		$KW.Calendar.__dp.reAssignData(model);
		var ser = $KW.Calendar.__dp.series(model.displayedMonths[1], model.displayedMonths[0], (model.noofmonths || 1) * 1 + 1);
		ser.splice(0, 1);
		$KW.Calendar.displayedMonth(model, ser[0][0], ser[0][1]);
	},
	enableRangeOfDates: function(calendarModel, start, end, skin, isEnable){
		calendarModel.datesState = (isEnable == true ? 1 : 0);
		var from = new Date(start[2 + IndexJL],start[1 + IndexJL]-1,start[0 + IndexJL]);
		var to = new Date(end[2 + IndexJL],end[1 + IndexJL]-1,end[0 + IndexJL]);
		calendarModel.datesGroupSkin = skin;
		var datesComp = calendarModel.datesGroup;
		var datesAll = [];
		datesAll.push.apply(datesAll,$KW.Calendar.__dp.between(from,to));
		calendarModel.datesGroupSimplified = datesAll;
	},
	setEnabled: function(calendarModel,startdate,enddate,skin,isEnable){
		if(IndexJL == 1 && arguments.length == 4){
			isEnable = skin;
			skin = enddate;
			enddate = 0;
		}		
		calendarModel.datesState = (isEnable == true ? 1 : 0);
		calendarModel.datesGroupSkin = skin;
		var datesAll = [];
		if(startdate && startdate.length > IndexJL && startdate[IndexJL] instanceof Array){ //check array
			calendarModel.datesGroup = startdate;						
			var datesComp = calendarModel.datesGroup;			
			for (var j = 0 + IndexJL; j < datesComp.length; j++) {
				var value = datesComp[j];			
				if(+value.length == value.length){
					datesAll.push(new Date(value[2 + IndexJL],value[1 + IndexJL]-1,value[0 + IndexJL]).setHours(0, 0, 0, 0));
				}    
			}			
		}else{
			var from = new Date(startdate[2 + IndexJL],startdate[1 + IndexJL]-1,startdate[0 + IndexJL]);
			var to = new Date(enddate[2 + IndexJL],enddate[1 + IndexJL]-1,enddate[0 + IndexJL]);
			datesAll.push.apply(datesAll,$KW.Calendar.__dp.between(from,to));
		}
		calendarModel.datesGroupSimplified = datesAll;
	},
    setDateSkin: function (calendarModel, dates, skin) {
        for(var i = 0+ IndexJL, l = dates.length; i < l; i++){
			calendarModel.specialDates = calendarModel.specialDates ? calendarModel.specialDates : {};
			if(!calendarModel.specialDates[skin]){
				calendarModel.specialDates[skin] = dates;
			}
			else{
				calendarModel.specialDates[skin].push.apply(calendarModel.specialDates[skin], dates)
			}
		}
    },

    formatDate: function(date)
    {
        if(date){
            try{
                if (date instanceof Array){ 
                        date = eval(date);
                        date = date[1+IndexJL] + "/" +date[IndexJL] + "/" + date[2+IndexJL];
                }
            }catch(e){
                date = '';
            }
        }
        return date;
    },
	
    ideDateToString: function(date){
        if (date) {
            try {
                if (date instanceof Array) {
                    date = eval(date);
                    date = date[IndexJL] + "/" + date[1+IndexJL] + "/" + date[2+IndexJL];
                }
            } 
            catch (e) {
                date = '';
            }
        }
        return date;
    },
	
    setCalStyle: function(formid, orientation){
    
        var yuiCal = document.getElementById("container_c");    
        
        var delay = $KU.isAndroid ? ($KU.isAndroid_HTC ? 250 : 100) : 0;
        if( yuiCal && $KG["nativeScroll"] ){ 
           setTimeout(function(){
               yuiCal.style.top = E.getDocumentScrollTop() +  5 + "px";
           }, delay);
        }   
      /*  var platform = $KU.getPlatform().name;
        var screenWidth;
        
        if (platform == "android" || platform == "blackberry") {
            if (orientation === "landscape") {
                screenWidth = screen.width;
            }
            else 
                if (orientation === "portrait") {
                    screenWidth = screen.width;
                }
        }
        else {
            if (orientation === "landscape") {
                screenWidth = screen.height;
            }
            else 
                if (orientation === "portrait") {
                    screenWidth = screen.width;
                }
        }
		        
        if (yuiCal) {
            var calWidthPx = $KU.getStyle(yuiCal,"width");
            var calWidth = parseInt(calWidthPx.substring(0, calWidthPx.indexOf("p")));
			
            var deltaCalWidth = (screenWidth - calWidth) / 2;
						
			
            yuiCal.style.left = (deltaCalWidth) + "px !important";
						
			
            yuiCal.style.width = calWidthPx;
        }
    */
        var calElements = document.getElementsByName("calBody");
        if (calElements) {
            for (var i = 0; i < calElements.length; i++) {
                var calElement = calElements[i];
                $KW.Calendar.setCalElementStyle(calElement, true);
            }
        }
    },
	
    adjustCalendars: function(container){
        var calElements = document.querySelectorAll("#" + container.pf + "_" + container.id + " input[name='calBody']");
        for (var i = 0; i < calElements.length; i++) {
            var calElement = calElements[i];
            $KW.Calendar.setCalElementStyle(calElement, true);
        }
    },
	
    setCalElementStyle: function(calElement, inOrientation){			
        
        if (!inOrientation) {
            calElement = calElement.previousSibling;
        }
        var calParent = calElement.parentNode;
		var calendarModel = $KU.getModelByNode(calParent);
		if(calParent.style.display != "inline-block"){
			var calSibling = calElement.nextSibling;
			var calParentParent = calElement.parentNode.parentNode;
			
			calElement.style.fontFamily = $KU.getStyle(calParent,"font-family");
			calElement.style.fontSize = $KU.getStyle(calParent,"font-size");
			calElement.style.color = $KU.getStyle(calParent,"color");
			calElement.style.fontWeight = $KU.getStyle(calParent,"font-weight");
			calElement.style.fontStyle = $KU.getStyle(calParent,"font-style");
			if(calendarModel && calendarModel.calimgheight)
				calSibling.style.height = calendarModel.calimgheight;
			else
				calSibling.style.height = calElement.clientHeight + "px";
			calSibling.style.width = "auto";
			
			if(kony.appinit.isIE7){
				calElement.style["float"] = "left";
				calElement.style.borderStyle = "none";
			}
			
			var btlr = $KU.getStyle(calParent,"border-top-left-radius");
			var bblr = $KU.getStyle(calParent,"border-bottom-left-radius");
			var btrr = $KU.getStyle(calParent,"border-top-right-radius");
			var bbrr = $KU.getStyle(calParent,"border-bottom-right-radius");
			var tlr = blr = trr = brr = 0;
			if(btlr)
				tlr = parseInt(btlr.substring(0, btlr.indexOf("p")));
			if(bblr)
				blr = parseInt(bblr.substring(0, bblr.indexOf("p")));
			if(btrr)
				trr = parseInt(btrr.substring(0, btrr.indexOf("p")));
			if(bbrr)
				brr = parseInt(bbrr.substring(0, bbrr.indexOf("p")));
			
			var leftRadius = 0;
			var rightRadius = 0;
			
			if (tlr <= blr) {
				leftRadius = parseInt(blr / 2);
				calElement.style.marginLeft = leftRadius + 'px';
			}
			else {
				leftRadius = parseInt(tlr / 2);
				calElement.style.marginLeft = leftRadius + 'px';
			}
			
			if (trr <= brr) {
				rightRadius = parseInt(brr / 2);
				calSibling.style.marginRight = rightRadius + 'px';
			}
			else {
				rightRadius = parseInt(trr / 2);
				calSibling.style.marginRight = rightRadius + 'px';
			}
			
			var calParentStyleWidth = $KU.getStyle(calParent,"width");
			var calParentParentStyleWidth = $KU.getStyle(calParentParent,"width");
			if(calParentParentStyleWidth=="100%")
					calParentParentStyleWidth = calParentParent.clientWidth+'px';
			var parentWidth = parseInt(calParentParentStyleWidth.substring(0, calParentParentStyleWidth.indexOf("p")));

			var calSiblingStyleWidth = $KU.getStyle(calSibling,"width");
			if(calSiblingStyleWidth == "auto"){
					calSiblingStyleWidth = calSibling.clientWidth+'px';
			}
			if(calSiblingStyleWidth != "auto"){
				var imageWidth = parseInt(calSiblingStyleWidth.substring(0, calSiblingStyleWidth.indexOf("p")));
				calElement.style.width = ((parentWidth - (2 * imageWidth) - leftRadius - rightRadius) / parentWidth) * 100 + '%';
				
			}
		}
    }
}

/* 
	Fallback functions, cause these are being used in most of the places
*/

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (needle) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === needle) {
                return i;
            }
        }
        return -1;
    };
}
if(!document.querySelectorAll){
	(function(d, s) {
		d=document, s=d.createStyleSheet();
		d.querySelectorAll = function(r, c, i, j, a) {
			a=d.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
			for (i=r.length; i--;) {
				s.addRule(r[i], 'k:v');
				for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
				s.removeRule(0);
			}
			return c;
		}
	})();
}

$KW.Calendar.__dp = {	
	/*
		Decoupled the HTML template from actual logic for easy maintainance of code.
		Template for year and month navigator. It will recieve current model and ID of the calendar popup in view.
		To Change the view or design of the navigatore it has to be updated here.
	*/
	navigatorTemplate : function(model, id) {
		var selectedYearValue;
		if(arguments.length > 2 && arguments[3] === "fromYearMonth"){
			selectedYearValue = Number(arguments[2]);
		}else{
			selectedYearValue = null;
		}		
		var tabpaneID = model.tabpaneId;
		var WidgetContext = (" kformname='" + model.pf + "' ") + (tabpaneID && " ktabpaneid='" + tabpaneID + "' ");
		var bg = $KU.getImageURL("sprite.png");
		var leftArrowbg = $KU.getImageURL("left-arrow.png");
		var rightArrowbg = $KU.getImageURL("right-arrow.png");
        var str;
        if(kony.appinit.isWindowsPhone){
        	str = "" +
	        "<div w-type='Calendar' id='" + (model.id + "-k-w-c-navigator-") + "' class='-k-w-c-datepicker-navigator' kwidgettype='Calendar' " + WidgetContext + " style='height:" + model.popupHeight + ";width:" + model.popupWidth + ";position:absolute;background-color:White'>" +
	            "<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:15%;width:100%;'>" +
	                "<div w-type='Calendar'  style='display:table-row;width:100%;height:100%'>" +
	                    "<a href='javascript:void(0)' w-type='Calendar'  style='display:table-cell;width:15%;text-align:left;vertical-align:middle' class='-kony-w-c-cancel-nav' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<img w-type='Calendar'  class='-kony-w-c-cancel-nav' style='height:50%;width:50%;' src='" + $KU.getImageURL("k-cancel.png") + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                    "</a>" +
	                    "<div w-type='Calendar' w-type-inactive='true' style='display:table-cell;width:70%;text-align:center;vertical-align:middle' class='-k-w-c-nav-selected-ym'>" +
	                        "" +
	                    "</div>" +
	                    "<a href='javascript:void(0)' w-type='Calendar'  style='display:table-cell;width:15%;text-align:right;vertical-align:middle' class='-kony-w-c-go-nav' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<img w-type='Calendar'  class='-kony-w-c-go-nav' style='height:50%;width:50%;' src='" + $KU.getImageURL("k-go.png") + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                    "</a>" +
	                "</div>" +
	            "</div>";
	        var months = this.months.slice(0);
	        str += "<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:30%;width:100%;border-bottom:1px solid #FAFAFA'>";
	        months = this.chunks(months, 6);
	        /* Months links will be generated here. */
			for (var i = 0; i < months.length; i++) {
	            var list = months[i];
	            str += "<div w-type='Calendar'   style='display:table-row;width:100%;height:50%'>";
	            for (var j = 0; j < list.length; j++) {
	                str += "<a href='javascript:void(0)' w-type='Calendar'  style='display:table-cell;width:15%;text-align:center;vertical-align:middle;font-size:smaller;text-decoration:none;' class='-kony-w-c-navigator-month' k-w-c-hold='" + ( (i * 6) + (j + 1) ) + "' k-w-c-id='" + id + "' kwidgettype='Calendar'" + WidgetContext + " >" +
	                            list[j].substring(0,3) +
	                        "</a>";
	            }
	            str += "</div>";
	        }
	        str += "</div>" +
			"<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:15%;width:100%'>" +
	                "<div w-type='Calendar'   style='display:table-row;width:100%;height:100%'>" +
	                    "<a href='javascript:void(0)' w-type='Calendar' style='display:table-cell;width:15%;text-align:left;vertical-align:middle' class='-kony-w-c-left-ym-p' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<span class='-kony-w-c-left-ym-p' style='height:15px;width:25px;display:inline-block;background:url(" + bg + ") no-repeat 0 -450px' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " ></span>" +
	                    "</a>" +
	                    "<div w-type-inactive='true'  w-type='Calendar' style='display:table-cell;width:70%;text-align:center;vertical-align:middle' class='-k-w-c-nav-yr-range'>" +
	                        "" +
	                    "</div>" +
	                    "<a href='javascript:void(0)' w-type='Calendar'  style='display:table-cell;width:15%;text-align:right;vertical-align:middle' class='-kony-w-c-right-ym-p' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<span w-type='Calendar'  class='-kony-w-c-right-ym-p' style='height:15px;width:25px;display:inline-block;background:url(" + bg + ") no-repeat 0 -500px' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " ></span>" +
	                    "</a>" +
	                "</div>" +
	            "</div>";
	        str += "<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:40%;width:100%'>";
	        var counter = 2001; // Start year in Navigator.	
	        var iterator;
	        if(selectedYearValue != null){
	        	if(selectedYearValue > counter ){
		        	iterator = Math.floor((selectedYearValue - 2001)/16);
		        	for(var temp=0;temp<iterator;temp++){
		        		counter = counter+16;
		        	}
		        }else{
		        	iterator = Math.ceil((2001 - selectedYearValue)/16);
		        	for(var temp=0;temp<iterator;temp++){
		        		counter = counter-16;
		        	}
		        }	
	        }
	        	
	        for (i = 1; i <= 4; i++) { // 4 is number of rows of years We want to display.
	            str += "<div w-type='Calendar'   style='display:table-row;width:100%;height:25%'>";
	            for (j = 1; j <= 4; j++) { //  Number of columns of years I want to display in each row.
				// SO here 4 Columns * 4 Rows = 16 years will be displayed.
	                if((counter > 1900 && counter < 2099 )|| counter == 2099 || counter == 1900){
						str += "<a herf='javascript:void(0)' w-type='Calendar'  style='display:table-cell;width:25%;text-align:center;vertical-align:middle;font-size:smaller;visibility:visible;' class='-kony-w-c-navigator-year' k-w-c-hold='" + counter + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                       counter  +
	                    "</a>";		
					}else{
						str += "<a href='javascript:void(0)' w-type='Calendar'  style='display:table-cell;width:25%;text-align:center;vertical-align:middle;font-size:smaller;visibility:hidden;' class='-kony-w-c-navigator-year' k-w-c-hold='" + counter + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                       counter  +
	                    "</a>";	
					}
	                counter++;
	            }
	            str += "</div>";
	        }
	        str += "</div></div>";
		}else{
			var previousYearsI18Key = $KG["i18nArray"]?$KG["i18nArray"]?$KG["i18nArray"]["platform.calendar.previousYearLink"]:"Previous set of Years":"Previous set of Years";
			var nextYearsI18Key = $KG["i18nArray"]?$KG["i18nArray"]?$KG["i18nArray"]["platform.calendar.nextYearLink"]:"Next set of Years":"Next set of Years";
			var cancelI18Text = $KG["i18nArray"]?$KG["i18nArray"]?$KG["i18nArray"]["platform.calendar.cancelImage"]:"Cancel Selection":"Cancel Selection";
			var doneI18Text = $KG["i18nArray"]?$KG["i18nArray"]?$KG["i18nArray"]["platform.calendar.selectedImage"]:"Done Selecting":"Done Selecting";
        	str = "" +
	        "<div w-type='Calendar' id='" + (model.id + "-k-w-c-navigator-") + "' class='-k-w-c-datepicker-navigator' kwidgettype='Calendar' " + WidgetContext + " style='height:" + model.popupHeight + ";width:" + model.popupWidth + ";position:absolute;background-color:White'>" +
	            "<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:15%;width:100%;'>" +
	                "<div w-type='Calendar'  style='display:table-row;width:100%;height:100%'>" +
	                    "<div w-type='Calendar'  style='display:table-cell;width:15%;text-align:left;vertical-align:middle' class='-kony-w-c-cancel-nav' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<img w-type='Calendar' alt='"+cancelI18Text+"' class='-kony-w-c-cancel-nav' style='height:50%;width:50%;' src='" + $KU.getImageURL("k-cancel.png") + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                    "</div>" +
	                    "<div w-type='Calendar' w-type-inactive='true' style='display:table-cell;width:70%;text-align:center;vertical-align:middle' class='-k-w-c-nav-selected-ym'>" +
	                        "" +
	                    "</div>" +
	                    "<div w-type='Calendar'  style='display:table-cell;width:15%;text-align:right;vertical-align:middle' class='-kony-w-c-go-nav' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<img w-type='Calendar'  alt='"+doneI18Text+"'class='-kony-w-c-go-nav' style='height:50%;width:50%;' src='" + $KU.getImageURL("k-go.png") + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                    "</div>" +
	                "</div>" +
	            "</div>";
	        var months = this.months.slice(0);
	        str += "<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:30%;width:100%;border-bottom:1px solid #FAFAFA'>";
	        months = this.chunks(months, 6);
	        /* Months links will be generated here. */
			for (var i = 0; i < months.length; i++) {
	            var list = months[i];
	            str += "<div w-type='Calendar'   style='display:table-row;width:100%;height:50%'>";
	            for (var j = 0; j < list.length; j++) {
	                str += "<div w-type='Calendar' role='option' aria-label='"+list[j]+"' style='display:table-cell;width:15%;text-align:center;vertical-align:middle;font-size:smaller' class='-kony-w-c-navigator-month' k-w-c-hold='" + ( (i * 6) + (j + 1) ) + "' k-w-c-id='" + id + "' kwidgettype='Calendar'" + WidgetContext + " >" +
	                            list[j].substring(0,3) +
	                        "</div>";
	            }
	            str += "</div>";
	        }
	        str += "</div>" +
			"<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:15%;width:100%'>" +
	                "<div w-type='Calendar'   style='display:table-row;width:100%;height:100%'>" +
	                    "<div w-type='Calendar' style='display:table-cell;width:15%;text-align:left;vertical-align:middle' class='-kony-w-c-left-ym-p' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<img class='-kony-w-c-left-ym-p' src = '" +leftArrowbg+ "' alt='"+previousYearsI18Key +"' style='height:15px;width:25px;display:inline-block' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " />" +
	                    "</div>" +
	                    "<div w-type-inactive='true'  w-type='Calendar' style='display:table-cell;width:70%;text-align:center;vertical-align:middle' class='-k-w-c-nav-yr-range'>" +
	                        "" +
	                    "</div>" +
	                    "<div w-type='Calendar'  style='display:table-cell;width:15%;text-align:right;vertical-align:middle' class='-kony-w-c-right-ym-p' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                        "<img w-type='Calendar'  class='-kony-w-c-right-ym-p' src = '" +rightArrowbg+ "' alt='"+nextYearsI18Key+"'style='height:15px;width:25px;display:inline-block' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " />" +
	                    "</div>" +
	                "</div>" +
	            "</div>";
	        str += "<div w-type='Calendar'  class='-kony-w-c-navigator-table' style='display:table;table-layout:fixed;height:40%;width:100%'>";
	        var counter = 2001; // Start year in Navigator.	
	        var iterator;
	        if(selectedYearValue != null){
	        	if(selectedYearValue > counter ){
		        	iterator = Math.floor((selectedYearValue - 2001)/16);
		        	for(var temp=0;temp<iterator;temp++){
		        		counter = counter+16;
		        	}
		        }else{
		        	iterator = Math.ceil((2001 - selectedYearValue)/16);
		        	for(var temp=0;temp<iterator;temp++){
		        		counter = counter-16;
		        	}
		        }	
	        }
	        	
	        for (i = 1; i <= 4; i++) { // 4 is number of rows of years We want to display.
	            str += "<div w-type='Calendar'   style='display:table-row;width:100%;height:25%'>";
	            for (j = 1; j <= 4; j++) { //  Number of columns of years I want to display in each row.
				// SO here 4 Columns * 4 Rows = 16 years will be displayed.
	                if((counter > 1900 && counter < 2099 )|| counter == 2099 || counter == 1900){
						str += "<div w-type='Calendar' role='option' aria-label = '"+counter+"' style='display:table-cell;width:25%;text-align:center;vertical-align:middle;font-size:smaller;visibility:visible;' class='-kony-w-c-navigator-year' k-w-c-hold='" + counter + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                       counter  +
	                    "</div>";		
					}else{
						str += "<div w-type='Calendar' role='option' aria-label = '"+counter+"' style='display:table-cell;width:25%;text-align:center;vertical-align:middle;font-size:smaller;visibility:hidden;' class='-kony-w-c-navigator-year' k-w-c-hold='" + counter + "' k-w-c-id='" + id + "' kwidgettype='Calendar' " + WidgetContext + " >" +
	                       counter  +
	                    "</div>";	
					}
	                counter++;
	            }
	            str += "</div>";
	        }
	        str += "</div></div>";	
		}
		return str;
    },
	/* 
		Template for a each month in datePicker. Do not change classnames in template. They will be removed/replaced after rendering the popup.
	*/
    template : function(widths, height, width, el){ 
        var tabpaneID = el.tabpaneId;
		var WidgetContext = (" kformname='" + el.pf + "' ") + (tabpaneID && " ktabpaneid='" + tabpaneID + "' ");
		/*
			height : height of the popup.( For Month block)
			width : Width of the popup.( For Month block)
			widths : Widths of 7 columns of dates. It is an array of 7 values specifying widths of 7 columns.
			el : Model
		*/
		var i, template;
		if(kony.appinit.isWindowsPhone){
			template = '<div w-type="Calendar"  style="display:inline-block;" class="-kony-w-c-popup-container" id="{{id}}" style="height:' + height +';width:' + width + ';">' +
            '<div w-type="Calendar"  class="-kony-w-c-topSection">' +
                '<div w-type="Calendar"  class="-kony-w-c-table" style=";width:100%;height:70%;">' +
                    '<div w-type="Calendar"  class="-kony-w-c-row">' +
                    	'<a href="javascript:void(0)" w-type="Calendar"  ' + WidgetContext + ' class="-kony-w-c-cell -kony-w-c-prev-nav" style="width:20%;text-align:left;display:table-cell"><img w-type="Calendar" class="-kony-w-c-next-nav-right-link" alt="Next Month" style="height:15px;width:25px;display:inline-block" /></a>' +
                        '<a href="javascript:void(0)" w-type="Calendar" ' + WidgetContext + ' kwidgettype="Calendar" class="-kony-w-c-cell -kony-w-c-yemo" style="width:60%;display:table-cell;text-align:center;text-decoration:none;color:#000000;"></a>' +
                        '<a href="javascript:void(0)" w-type="Calendar" ' + WidgetContext + ' class="-kony-w-c-cell -kony-w-c-next-nav" style="width:20%;text-align:right;display:table-cell;"><img w-type="Calendar" class="-kony-w-c-next-nav-right-link" alt="Next Month" style="height:15px;width:25px;display:inline-block" /></a>' +
					'</div>' +
                '</div>' +
                '<div w-type="Calendar"  class="-kony-w-c-table -kony-w-c-daysHeader" style="width:100%;height:30%;">' +
                    '<div w-type="Calendar"  class="-kony-w-c-row">';                        
                            // 7 columns in each row, as 7 days in a week.
							for (i = 1; i <= 7; i++){
                                // w-type is required. This name should not changed. If changed, should be changed in Eventhandler and konycore.js too
								template += '<a href="javascript:void(0)" ' + WidgetContext + ' w-type = "Calendar" class="" id="-kony-w-c-cell-' + i + '" style="width:' + widths[i -1] + ';display:table-cell; vertical-align:middle; text-align:center; height:100%;font-size:smaller;text-decoration:none;color:#000000;"></a>';
                            }
                    template += '</div>' +
                '</div>' +
            '</div>' +
            '<div w-type="Calendar" class="kony-w-c-actualDates">';
                /* 
					49 days in total in each month block, including previous month dates and next month dates.
					Please take care in changing this for loop if you want to customize. It is with multiple logic.
				*/
				
				for (; i <= 49; i = i + 7) {
                    var tempString = '<div w-type="Calendar"  class="-kony-w-c-table -kony-w-c-day-table" style="">' +
                                        '<div w-type="Calendar"  class="-kony-w-c-row -kony-w-c-day-row">';
											   var counter = 1;
                                               for (var j = i; j <= i + 6; j++) {
                                                   tempString += '<a href="javascript:void(0)" w-type="Calendar" ' + WidgetContext + ' kwidgettype="Calendar" class="" id="-kony-w-c-cell-' + j + '"  style="width:' + widths[counter -1] + ';display:table-cell; vertical-align:middle; text-align:center; height:100%;font-size:smaller;text-decoration:none;color:inherit;"></a>';
												   counter ++;
                                               }
                                        tempString += '</div>' +
                                      '</div>';
                    for (var j = i; j <= i + 7; j++) {
                        tempString = tempString.replace("{{}}", j);
                    }
                    template += tempString;
                }
            template += '</div>' +
        '</div>';
			
		}else{
			
			var previousMonthI18Text =$KG["i18nArray"]?$KG["i18nArray"]["platform.calendar.previousMonthLink"]?$KG["i18nArray"]["platform.calendar.previousMonthLink"]:"Previous Month":"Previous Month";
			var nextMonthI18Text = $KG["i18nArray"]?$KG["i18nArray"]["platform.calendar.nextMonthLink"]?$KG["i18nArray"]["platform.calendar.nextMonthLink"]:"Next Month":"Next Month";

			template = '<div w-type="Calendar"  style="display:inline-block;" class="-kony-w-c-popup-container" id="{{id}}" style="height:' + height +';width:' + width + ';">' +
            '<div w-type="Calendar"  class="-kony-w-c-topSection">' +
                '<div w-type="Calendar"  class="-kony-w-c-table" style=";width:100%;height:70%;">' +
                    '<div w-type="Calendar"  class="-kony-w-c-row">' +
                    
                    	'<div w-type="Calendar"  ' + WidgetContext + ' class="-kony-w-c-cell -kony-w-c-prev-nav" style="width:20%;text-align:left;display:table-cell"><img w-type="Calendar" class="-kony-w-c-prev-nav-left-link" alt="'+previousMonthI18Text+'" style="height:15px;width:25px;display:inline-block" /></div>' +
                        '<div w-type="Calendar" ' + WidgetContext + ' kwidgettype="Calendar" class="-kony-w-c-cell -kony-w-c-yemo" style="width:60%;display:table-cell;text-align:center;outline-color:#FFFFFF;" tabindex="1"></div>' +
                        '<div w-type="Calendar" ' + WidgetContext + ' class="-kony-w-c-cell -kony-w-c-next-nav" style="width:20%;text-align:right;display:table-cell;"><img w-type="Calendar" class="-kony-w-c-next-nav-right-link" alt="'+nextMonthI18Text+'" style="height:15px;width:25px;display:inline-block" /></div>' +

                    '</div>' +
                '</div>' +
                '<div w-type="Calendar"  class="-kony-w-c-table -kony-w-c-daysHeader" style="width:100%;height:30%;">' +
                    '<div w-type="Calendar"  class="-kony-w-c-row">';                        
                            // 7 columns in each row, as 7 days in a week.
							for (i = 1; i <= 7; i++){
                                // w-type is required. This name should not changed. If changed, should be changed in Eventhandler and konycore.js too
								template += '<div ' + WidgetContext + ' w-type = "Calendar" class="" id="-kony-w-c-cell-' + i + '" style="width:' + widths[i -1] + ';display:table-cell; vertical-align:middle; text-align:center; height:100%;font-size:smaller"></div>';
                            }
                    template += '</div>' +
                '</div>' +
            '</div>' +
            '<div w-type="Calendar" class="kony-w-c-actualDates">';
                /* 
					49 days in total in each month block, including previous month dates and next month dates.
					Please take care in changing this for loop if you want to customize. It is with multiple logic.
				*/
				
				for (; i <= 49; i = i + 7) {
                    var tempString = '<div w-type="Calendar"  class="-kony-w-c-table -kony-w-c-day-table" style="">' +
                                        '<div w-type="Calendar"  class="-kony-w-c-row -kony-w-c-day-row">';
											   var counter = 1;
                                               for (var j = i; j <= i + 6; j++) {
                                                   tempString += '<div w-type="Calendar" ' + WidgetContext + ' kwidgettype="Calendar" class="" id="-kony-w-c-cell-' + j + '"  style="width:' + widths[counter -1] + ';display:table-cell; vertical-align:middle; text-align:center; height:100%;font-size:smaller;"></div>';
												   counter ++;
                                               }
                                        tempString += '</div>' +
                                      '</div>';
                    for (var j = i; j <= i + 7; j++) {
                        tempString = tempString.replace("{{}}", j);
                    }
                    template += tempString;
                }
            template += '</div>' +
        '</div>';
		}
        return template;
    },
	reAssignData:function(calendarModel, undef){
		/*
			To maintain the similarity between model properties generated by Lua and JS, values are reassigned to single property value to maintain consistancy. If any property to be changed like this, it is best to put in this function.
		*/
		if(!calendarModel.datecomponents){
			$KW.Calendar.setCurrentDate(calendarModel);
			calendarModel.minutes = 0;
			calendarModel.hour = 0;
			calendarModel.seconds = 0;
		}
        calendarModel.entereddate = calendarModel.datecomponents;			
		calendarModel.monthsinrow = calendarModel.monthsinrow || 3;
		
		if( calendarModel.noofmonths < 1 || isNaN(calendarModel.noofmonths * 1) ){				
			calendarModel.noofmonths = 1;
		}
		calendarModel.datesGroup = [];
		calendarModel.datesState = calendarModel.datesState || 0;			
		calendarModel.enddate = calendarModel.enddate || calendarModel.validenddate;
		calendarModel.startdate = calendarModel.startdate || calendarModel.validstartdate;
		calendarModel.dateformat = calendarModel.dateformat || calendarModel.format || "dd/mm/yyyy";
		// Default value of popup height, Min of Window height or 300.
		calendarModel.popupHeight = calendarModel.popupHeight || Math.min.apply(Math, [300, window.innerHeight || document.documentElement.clientHeight]) + "px";
		// Default value of popup width, Min of Window width or 300.
		calendarModel.popupWidth = calendarModel.popupWidth || Math.min.apply(Math, [300, window.innerWidth || document.documentElement.clientWidth]) + "px";
		/*
			In Every calendar Sunday will be the first day in popup. That is Son. To change the value from Son to any other day, just change value from 0 - 6. 0 means Son. In javascript days are represented from 0-6.
		*/
		calendarModel.startDay = calendarModel.startDay || 0;
		if(!calendarModel.viewconfig){ // Assinging viewConfig to null if not recieved from IDE.
			calendarModel.viewconfig = {};
			calendarModel.viewconfig.gridConfig = calendarModel.viewconfig.gridconfig = {}
		}
		var config = calendarModel.viewconfig.gridconfig || calendarModel.viewconfig.gridConfig || {};
		config.gridCellWeekendSkin = config.gridCellWeekendSkin || config.gridcellweekendskin || "-kony-w-c-weekend-";
		config.gridCellInactiveDaysSkin = config.gridCellInactiveDaysSkin || config.gridcellinactivedaysskin || "-k-w-c-inactive";
		config.gridCellSkin = config.gridCellSkin || config.gridcellskin || "-kony-w-c-day-skin";
		config.gridCellSelectedSkin = config.gridCellSelectedSkin || config.gridcellselectedskin || "-kony-w-c-selected-";
		config.gridCellTodaySkin = config.gridCellTodaySkin || config.gridcelltodayskin || "-kony-w-c-today-";
		config.doneButtonSkin = config.doneButtonSkin || '-k-w-c-cancel-cal-';
		config.monthHeaderSkin = config.monthHeaderSkin || " -kony-w-c-yemo-skin";
		config.dayHeaderSkin = config.dayHeaderSkin || " -kony-w-c-day-label-cell";
		if( config.allowWeekendSelectable == undef ){
			config.allowWeekendSelectable = config.allowweekendselectable;
		}
		var x,y;
		// x and y represents starting  month and starting year that appear in Calendar popup.
		if(calendarModel.startdate){
			x = calendarModel.startdate[2 + IndexJL];
			y = calendarModel.startdate[1 + IndexJL];
		}		
        var y = calendarModel.year || y || new Date().getFullYear(),
			mn = calendarModel.month || x ||  new Date().getMonth() + 1;		
		calendarModel.displayedMonths = calendarModel.displayedMonths || [mn, y]; // Current displayed months in popup in view. It has two way binding.
		calendarModel.dayTextAlignmentInCell = calendarModel.dayTextAlignmentInCell || "CONTENT _ALIGN_CENTER";
		if(calendarModel.year){
			var yearStored = calendarModel.year.toString(); 
			if(yearStored.length > 4){			 	
				calendarModel.year = yearStored.substr(yearStored.length - 4) * 1;
			}  
		}
		calendarModel.navigatorAlert = $KG["i18nArray"] && $KG["i18nArray"]["gridCalAlertI18Nkey"] ? kony.i18n.getLocalizedString("gridCalAlertI18Nkey") : (calendarModel.navigatorAlert || "Invalid Selection");
	},
	// It generated alignment style string for each cell of popup.
	dayTextAlignmentInCell : function(val){		
		val = val.toLowerCase().split('_');
		var style = {};
		style["vertical-align"] = ( val[2] && val[2] == "center" ? "middle" : val[2]) || "middle";
		style["text-align"] = val[3] || "center";
		return style;
	},
	/* Util methods. Do not remove these. */
	addClass : function(el, cn) {
		if (!this.hasClass(el, cn)) {
			el.className = (el.className === '') ? cn : el.className + ' ' + cn;
		}
	},
	getByClass : function(ele,classN){
		return document.querySelectorAll('#' + ele.id + " ." + classN);
	},
	getBySele : function(ele,selector){
		return document.querySelectorAll('#' + ele.id + " " + selector);
	}
	,
	removeClass : function(el, cn) {
		el.className = this.trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	},
	hasClass : function(el, cn) {
		return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	},trim : function(str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	},div : function(){
		var div = document.createElement('div');		
		return div;
	},
	updateMonthData : function(monthData, calendarModel, template, dateConfig, navigators, div, id){
		/* 
			Render the template based on month data.
			
			div : Will be null on initial invoke of popup. Means on next and previous button it will not be null.
			navigators : It contains left and right buttons display values(true or false) for each month block. When number of months is obe it wil contain true for both left and right buttons. If number of months are 2, then for first month block right will be false and for second month block left will be false.
			template : template used to render the month data.
			dateConfig : Month to be displayed on current block.
			id : Invoked calendar ID.
			monthData : It contains all the dates of months and their information. It is the heart.
		*/
		if(div == 0){
			div = this.div();
			div.innerHTML = template;
			div = div.firstChild;
			document.body.appendChild(div);
			var divFlag = 0;
		}		
		var config = calendarModel.viewconfig.gridconfig || calendarModel.viewconfig.gridConfig || {}, isWeek = config.allowWeekendSelectable, flag = 0;		
		this.addClass(div, config.gridSkin);
		var monthHeader = this.getBySele(div, '.-kony-w-c-yemo')[0];
		if(calendarModel.hideMonthsHeader == true){
			monthHeader.style.display = "none";
		}
		var daysHeader = this.getBySele(div, '.-kony-w-c-daysHeader')[0];
		if(calendarModel.hideDaysHeader == true){
			daysHeader.style.display = "none";
		}
		div.setAttribute('month', dateConfig[0]);
		div.setAttribute('year', dateConfig[1]);
		monthHeader.innerHTML = this.months[dateConfig[0] - 1] + ", " + dateConfig[1];
		this.addClass(monthHeader, config.monthHeaderSkin);
		monthHeader.setAttribute('k-w-c-id', id);
		for(var j = 0; j < monthData.length; j++){
			var unit = monthData[j], 
			element = this.getBySele(div, '#-kony-w-c-cell-' + (j + 1))[0];				
			element.className = "";
			var align = calendarModel.dayTextAlignmentInCell;
			var dayTextAlignmentInCell = this.dayTextAlignmentInCell(align);
			element.style.textAlign = dayTextAlignmentInCell['text-align'];
			element.style.verticalAlign = dayTextAlignmentInCell['vertical-align'];
			if(typeof unit == "number"){ // next and prev month dates
				if(flag == 0){
					element.className = " -k-w-c-lastMonth " + config.gridCellInactiveDaysSkin;
					element.setAttribute('title', 'Previous month');
					element.setAttribute('aria-label', unit);
				}else if(flag == 1){
					element.className = " -k-w-c-nextMonth " + config.gridCellInactiveDaysSkin;
					element.setAttribute('title', 'Next month');
					element.setAttribute('aria-label', unit);
				}
				element.removeAttribute('kwidgettype');
				element.removeAttribute('k-w-c-hold-day');				
				element.innerHTML = unit;
			}else if(typeof unit == "string"){ // dayLabels
				element.innerHTML = unit;
				element.setAttribute('role' , 'option');
				if(unit == "MON" || unit == "SUN" ){
					element.setAttribute('aria-label' , unit.toLowerCase() + 'day');	
				}else if(unit == "TUE"){
					element.setAttribute('aria-label' , 'Tuesday');	
				}else if(unit == "WED"){
					element.setAttribute('aria-label' , 'Wednesday');	
				}else if(unit == "THU"){
					element.setAttribute('aria-label' , 'Thursday');	
				}else if(unit == "FRI"){
					element.setAttribute('aria-label' , 'Friday');	
				}else if(unit == "SAT"){
					element.setAttribute('aria-label' , 'Saturday');	
				}
				
				element.className += " " + config.dayHeaderSkin;
			}else{
				flag = 1;
				var thisDate = new Date(unit[1].y, unit[1].m - 1, unit[1].d);
				if( (unit[2] == 0 || unit[2] == 6) && (isWeek == false) ){
					element.className = " " + config.gridCellInactiveDaysSkin;
					element.innerHTML = ($KG["i18nArray"] && $KG["i18nArray"]["platform.calendar."+unit[0]]) ? $KG["i18nArray"]["platform.calendar."+unit[0]] : unit[0];
					element.removeAttribute('kwidgettype');
				}else{
					element.setAttribute('k-w-c-id', id);
					element.setAttribute('kwidgettype', "Calendar");
					element.setAttribute('weekday', unit[2]);					
					element.className += " -k-w-c-weekday-" + unit[2] + " -kony-w-c-day-";								
					element.setAttribute('k-w-c-hold-day', (unit[1].d + "," + unit[1].m + "," + unit[1].y));
					element.innerHTML = ($KG["i18nArray"] && $KG["i18nArray"]["platform.calendar."+unit[0]]) ? $KG["i18nArray"]["platform.calendar."+unit[0]] : unit[0];
					var string = this.dateFormatter("dddd, do mmmm yyyy", [unit[1].d, unit[1].m , unit[1].y]);
					//element.setAttribute('title',string.string);
					element.setAttribute('role','option');
					//var elementValueInDateFormat = $KW.Calendar.__dp.dateFormatter(calendarModel.dateformat, element.getAttribute("k-w-c-hold-day").split(','));
					//element.setAttribute('aria-label', elementValueInDateFormat.string);
					//currentMonthValue = currentMonthValue.trim().split(' ');
					//currentMonthValue = currentMonthValue[0] + ' ' + $KW.Calendar.__dp.months[calendarModel.month?(calendarModel.month)-1 : new Date().getMonth()]+ ' ' +currentMonthValue[2];
					var currentMonthValue = string.string.split(',')[1];
					element.setAttribute('aria-label', currentMonthValue);
				}
			}				
		}
		var bg = $KU.getImageURL("sprite.png");
		var leftImage = $KU.getImageURL("left-arrow.png");
		var rightImage = $KU.getImageURL("right-arrow.png");
		if(navigators[0] == 1){
			 var ell = this.getByClass(div, '-kony-w-c-prev-nav')[0];				 
			 if(config.leftNavigationImage || config.leftnavigationimage){
				var img = "<img class='-kony-w-c-prev-nav-left-img' style='width:50%;height:50%' kwidgettype='Calendar' />"
				ell.innerHTML = img;
				var imageSrcPrevNavigation = config.leftNavigationImage? config.leftNavigationImage: config.leftnavigationimage;
				ell.firstChild.src = $KU.getImageURL(imageSrcPrevNavigation);
				//ell.firstChild.src = $KU.getImageURL(config.leftNavigationImage);
				ell.firstChild.setAttribute('kformname', calendarModel.pf);
			 }else{
			 	ell.firstChild.setAttribute('src', leftImage );
			 	//ell.firstChild.style['background'] = "url(" + bg + ") no-repeat 0 -450px";
			 }			 
			 ell.setAttribute('k-w-c-id', id);
			 ell.firstChild.setAttribute('k-w-c-id', id);
			 ell.setAttribute('kwidgettype','Calendar');
		}
		if(navigators[1] == 1){
			 var ell = this.getByClass(div, '-kony-w-c-next-nav')[0];
			 if(config.rightNavigationImage || config.rightnavigationimage){
				var img = "<img class='-kony-w-c-next-nav-right-img' style='width:50%;height:50%' kwidgettype='Calendar' />";
				ell.innerHTML = img;
				var imageSrcNextNavigation = config.rightNavigationImage? config.rightNavigationImage : config.rightnavigationimage;
				ell.firstChild.src = $KU.getImageURL(imageSrcNextNavigation);
				//ell.firstChild.src = $KU.getImageURL(config.rightNavigationImage);
				ell.firstChild.setAttribute('kformname', calendarModel.pf);
			 }else{
			 	ell.firstChild.setAttribute('src', rightImage );
				//ell.firstChild.style['background'] = "url(" + bg + ") no-repeat 0 -500px";
			 }
			 ell.setAttribute('k-w-c-id', id);
			 ell.firstChild.setAttribute('k-w-c-id', id);
			 ell.setAttribute('kwidgettype','Calendar');
		}
		if(divFlag == 0){
			return div;
		}else{ return 0; }
	},
	show: function (calendarModel, ms, flag, calDIV ){
		$KW.Calendar.initializeView();
		var tabpaneID = calendarModel.tabpaneId;
		var x, y ,z;
		this.invoked = this.invoked || {};
		if(calDIV != undefined || calDIV != null){
			this.invoked[calDIV.id] = this.invoked[calDIV.id] || { d:calDIV, i:calDIV.firstChild.id, s : "" };	
		}else{
			alert( calendarModel.navigatorAlert );
			return false;
		}
		if(calendarModel.startdate){
			x = calendarModel.startdate[0 + IndexJL];
			y = calendarModel.startdate[1 + IndexJL];
			z = calendarModel.startdate[2 + IndexJL];
		}		
        var ye = calendarModel.year || z || new Date().getFullYear(),
			mn = calendarModel.month || y ||  new Date().getMonth() + 1,
			pr = calendarModel.monthsinrow,
            nfm = calendarModel.noofmonths,
            mArr = [],
			height = calendarModel.popupHeight || "300px",
			width = calendarModel.popupWidth || "300px";
		if(ms && ms[0] && !flag){
			var exists = true;
		}
        ms = ms || this.series(ye, mn, nfm);
		calendarModel.widths = calendarModel.widths || ["14.2857%;","14.2857%;","14.2857%;","14.2857%;","14.2857%;","14.2857%;","14.2857%;"];
		var calendarHTML = "";
		var template = this.template(calendarModel.widths, height, width, calendarModel);
		var element = document.getElementById(calDIV.id + '-k-w-c-datepicker') || this.div();
		if(element.id == ""){
			if(calendarModel.title){
				var title = document.createElement('div');				
				title.className = "-k-w-c-cal-title";
				title.id = "-k-w-c-cal-title";
				title.setAttribute('w-type','Calendar');
				title.innerHTML = calendarModel.title;
				element.appendChild(title);
			}
			element.id = calDIV.id + '-k-w-c-datepicker';
		}
		element.setAttribute('w-type' , 'Calendar');
		this.invoked[calDIV.id].s = "active";
		var active = calDIV.id + '-k-w-c-datepicker';
		var	children = this.getByClass(element, '-kony-w-c-popup-container');
		calendarModel.displayedMonths = [ms[0][0],ms[0][1]];
        for (var i = 0; i < Number(calendarModel.noofmonths); i++){
            //var navigators = [(i === 0 ? 1 : 0), (i === (calendarModel.noofmonths - 1) ? 1 : 0)];
            var navigators = [1,1];
            var monthData = this.month(ms[i][0], ms[i][1], calendarModel.startDay);
			var id = ('-k-w-c-month-cmp-' + ms[i][0] + "-" + ms[i][1]);
			if(children[i]){
				children[i].id = id;
			}
			template = template.replace('{{id}}', id);
			var retDIV = this.updateMonthData(monthData, calendarModel, template, ms[i], navigators, children[i] || 0, calDIV.id);
			if(retDIV != 0){
				element.appendChild(retDIV);				
			}
        }
		if(exists == true){
			this.applySkins(calendarModel);
			return;			
		}
		element.className = "-k-w-c-datepicker-holder-main";
		var pos = this.getOffset(calDIV.id);
		element.style.position = "absolute";		        
		element.style.border = "1px solid #CCC";
		var close = document.createElement('div');
		var localData = $KG["i18nArray"] && $KG["i18nArray"]["gridCalCloseI18Nkey"] ? kony.i18n.getLocalizedString("gridCalCloseI18Nkey") : "Close";
		close.innerHTML = "<a href='#' class='-k-w-c-close-picker' id='calendar_close_link' kformname='" + calendarModel.pf + "' kwidgettype='Calendar' " + (tabpaneID ? "ktabpaneid='" + tabpaneID + "' " : "") + " style='float:right;color:red'>" +  localData + "</a>";
		close.setAttribute('w-type', "Calendar");
		close.firstChild.setAttribute('k-w-c-id', calDIV.id);
		element.appendChild(close);
        element.style.zIndex = "1234";		
		if($KU.isMobile() == true) {			
			element.setAttribute('dummy','a');											
			element.style.display = "none";			
			var ell = element.id;			
			document.getElementById("__MainContainer").appendChild(element);
			var calendarElement = document.getElementById(ell);
			calendarElement.style.display = "inline-block";
			this.reposition(1);
			var scrim = document.createElement('div'); 	
			scrim.className = "k-w-c-scrim-for-popup";
			var documentBody = document.body;
			var documentHeight;
			if(document.height != undefined){
				documentHeight = document.height;
			}else{
				if(documentBody.scrollHeight != undefined && documentBody.offsetHeight != undefined){
					if(!kony.appinit.isWindowsPhone){
						documentHeight = Math.max(documentBody.scrollHeight , documentBody.offsetHeight);		
					}else{
						documentHeight = 100;
					}
				}else{
					documentHeight = documentBody.scrollHeight || documentBody.offsetHeight;
				}
				
			}
			if(!kony.appinit.isWindowsPhone){
				scrim.innerHTML = "<div style='height:"+documentHeight+"px;width:100%;opacity:0;line-height:100%'>&nbsp;</div>";				
			}else{
				scrim.innerHTML = "<div style='height:"+documentHeight+"%;width:100%;opacity:0;line-height:100%'>&nbsp;</div>";			
				scrim.style.height = "100%";
			}			
			scrim.style.position = "absolute";
			scrim.style.top = scrim.style.left = "0px";
			//scrim.style.height = "100%";
			scrim.style.width = "100%";
			scrim.style.zIndex  = "1230";
			document.getElementById("__MainContainer").appendChild(scrim);
			var formElement = document.getElementById(calendarModel.pf);
			formElement.setAttribute('aria-hidden' , true);
			if(calendarModel.context){
				var anchorPos = $KU.getAnchorPosition(calendarModel,element);
				element.style.top = anchorPos.topPos + 'px';
				element.style.left = anchorPos.leftPos + 'px';				
			}
			
		}else{
			var eles = document.getElementById('__MainContainer');  
			eles.appendChild(element);
			element.style.display = "inline-block";
			var windowHeight = window.innerHeight || document.documentElement.clientHeight;
			
			
			element.style.top = pos[1] + calDIV.offsetHeight + "px";
			element.style.left = (((window.innerWidth || document.documentElement.clientWidth) - element.clientWidth) / 2) + "px";
			
			
			var id = element.id;
			element = document.getElementById(id);
		}
		this.active = active;
		this.applySkins(calendarModel);		
    },
    applySkins : function (model) {
        var elements = document.querySelectorAll('#' + this.active + ' [k-w-c-hold-day]');
        var config = model.viewconfig.gridconfig || model.viewconfig.gridConfig || {};
		if(model.day != 0){
			var selected = new Date(model.year, model.month - 1, model.day);
		}
        for (var i = 0; i < elements.length; i++) {
			today = new Date();
			var hold = elements[i].getAttribute('k-w-c-hold-day').split(','), element = elements[i];
			var thisDate = new Date(hold[2],hold[1] - 1, hold[0]);
			var unit = element.getAttribute('weekday') * 1;
			if( selected &&  selected.setHours(0, 0, 0, 0) == thisDate.setHours(0, 0, 0, 0) ){	this.addClass(element, config.gridCellSelectedSkin);
			}else if( thisDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0) ){
				this.addClass(element, config.gridCellTodaySkin); 
				this.removeClass(element, config.gridCellSkin);
			}else if( unit == 0 || unit == 6 ){
				this.addClass(element, config.gridCellWeekendSkin);
			}else{
				this.addClass(element, config.gridCellSkin);
			}		
            var date = element.getAttribute('k-w-c-hold-day').split(',');
            if (model.startdate) {
                var start = new Date(model.startdate[2 + IndexJL], model.startdate[1 + IndexJL] - 1, model.startdate[0 + IndexJL]).setHours(0, 0, 0, 0);
            }
            if (model.enddate) {				              
                var end = new Date(model.enddate[2 + IndexJL], model.enddate[1 + IndexJL] - 1, model.enddate[0 + IndexJL]).setHours(0, 0, 0, 0);
            }
            var datE = thisDate.setHours(0, 0, 0, 0), stateOfthis = 0;
            if ((start && start !== 0) && (end && end !== 0)) {
                if (datE < start || datE > end) {
					stateOfthis = 1;
                }
            } else if (!start && end) {
                if (datE > end) {
					stateOfthis = 1;					
                }
            } else if (!end && start) {
                if (datE < start) {
					stateOfthis = 1;					
                }
            }	
			if(stateOfthis == 1){
				element.setAttribute("kwidgettype","DisabledCal");
				element.className = config.gridCellInactiveDaysSkin;
				element.removeAttribute('kwidgettype');
				element.removeAttribute('k-w-c-hold-day');	
			}
			if(model.datesGroupSimplified){
				var datesAll = model.datesGroupSimplified;
				if (model.datesState == 0 && datesAll.length > 0){
					if (datesAll.indexOf(datE) > -1){
						element.setAttribute("kwidgettype","DisabledCal");
						element.className = config.gridCellInactiveDaysSkin;
						element.removeAttribute('kwidgettype');
						element.removeAttribute('k-w-c-hold-day');						
					}
				}
				if (model.datesState == 1 && datesAll.length > 0) {                
					if (datesAll.indexOf(datE) <= -1) {
						stateOfthis = 1;
						element.setAttribute("kwidgettype","DisabledCal");
						element.className = config.gridCellInactiveDaysSkin;
						element.removeAttribute('kwidgettype');
						element.removeAttribute('k-w-c-hold-day');
						
					}else{						
						this.removeClass(element, config.gridCellWeekendSkin);
						this.removeClass(element, config.gridCellSkin);
						if(!this.hasClass(element, config.gridCellSelectedSkin) && !this.hasClass(element, config.gridCellTodaySkin)){	
							this.addClass(element, model.datesGroupSkin);
						}
					}
				}
			}			
			if(model.specialDates){
				for(var kk in model.specialDates){
					var dates = model.specialDates[kk];
					if(dates){
						for(var jj = 0 + IndexJL; jj < dates.length; jj++){
							if(dates[jj]){
								var dateNN = new Date(dates[jj][2 + IndexJL],dates[jj][1 + IndexJL] - 1,dates[jj][0 + IndexJL]).setHours(0, 0, 0, 0);
								if(new Date(date[2], date[1] - 1, date[0]).setHours(0, 0, 0, 0) == dateNN){					
									this.removeClass(element, config.gridCellWeekendSkin);
									this.removeClass(element, config.gridCellSkin);
									this.removeClass(element, model.datesGroupSkin);
									if(!this.hasClass(element, config.gridCellSelectedSkin) && !this.hasClass(element, config.gridCellTodaySkin)){	
										this.addClass(element, kk);
									}
								}
							}
						}
					}
				}
			}
        }
		
    },
    between: function (from, to) {
        function addDays(inpD, days){
			var dat = new Date(inpD.valueOf());
			dat.setDate(dat.getDate() + days);
			return dat;
		}
		var dateArray = new Array();
		var currentDate = from;
		while (currentDate <= to) {
			dateArray.push( new Date (currentDate).setHours(0, 0, 0, 0) );
			currentDate = addDays(currentDate, 1);
		}
		return dateArray;		
    },
	reposition : function(a){
			var calendarElement = document.querySelectorAll(".-k-w-c-datepicker-holder-main")[0];
			if(calendarElement){
				var calendarElementHeight = calendarElement.clientHeight;				
				var windowWidth = window.innerWidth || document.documentElement.clientWidth;
				var top = (window.pageYOffset + ((window.innerHeight - calendarElementHeight) / 2));
				calendarElement.style.left = "0px";
				var left = ((windowWidth - calendarElement.clientWidth) / 2);
				if((left * 2 + calendarElement.clientWidth) > windowWidth){
					left = 0;
				}
				calendarElement.style.top = (top > 0 ? top : 0) + "px";
				calendarElement.style.left = left + "px";				
				if( a != 1 ){
					calendarElement.innerHTML = calendarElement.innerHTML;
				}
			}
	}
	,
    getDat: function (date, model) {
        if (!date) return;

        var format = (model.dateformat || model.format).toLowerCase().replace(/^\s+|\s+$/g, '').split('/'),
            result = {};
        date = date.split('/');
        for (var i = 0; i < format.length; i++) {
            result[format[i]] = date[i];
        }
        return result;
    },
    series: function (y, mn, nfm) {
        y = parseInt(y, 10);
        mn = parseInt(mn, 10);
        var ms = [
            [mn, y]
        ];
        for (var m = 0; m < nfm - 1; m++) {
            if (mn + 1 > 12) {
                mn = 1;
                y += 1;
                ms.push([mn, y]);
            } else {
                mn += 1;
                ms.push([mn, y]);
            }
        }
        return ms;
    },
	destroyCalendar: function(ele , calendarElement){
		var previousTabIndexClear = document.querySelectorAll('[tabindex]');
		for(var i=0;i < previousTabIndexClear.length;i++){
			previousTabIndexClear[i].removeAttribute('tabindex');
		}
		if(!ele){		
			var elements = document.querySelectorAll('.-k-w-c-datepicker-holder-main,.k-w-c-scrim-for-popup');
			for(var i = 0, l = elements.length; i < l; i++){
				elements[i].parentNode.removeChild(elements[i]);
			}
		}else{
			var elements = document.querySelectorAll('.k-w-c-scrim-for-popup')[0];
			var element = document.getElementById(this.active);
			element && element.parentNode.removeChild(element);
			elements && elements.parentNode.removeChild(elements);
		}
		if(calendarElement){
			calendarElement = document.getElementById(calendarElement);
			if(calendarElement)
			{
			if(calendarElement.tagName == "INPUT"){
				calendarElement = calendarElement.parentElement;
			}
			calendarElement.setAttribute('tabindex' , 1);
			calendarElement.focus();
		}
		}
	},
    month: function (month, year, shift, format) {
        var start = new Date(year, month - 1, 1).getDay(),
            days = [],
            day = 1,
            length = new Date(year, month, 0).getDate();
        var flag, prev = {}, next = {}, prevCount = 0,
            nextCount = 0,
            series;
        series = month == 1 ? this.series(year - 1, 12, 3) : this.series(year, month - 1, 3);
        prev.month = series[0][0];
        prev.year = series[0][1];
        next.month = series[2][0];
        next.year = series[2][1];
        var prevMonth = new Date(prev.year, prev.month, 0).getDate(),
            nextMonth = new Date(next.year, next.month, 0).getDate();
        shift = shift || 0;
        if (shift > start) {
            shift -= 7
        }
        for (var i = 0; i <= 6; i++) {
            days.push(this.days[(i + shift + 7) % 7]);
        }
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j <= 6; j++) {
                if (day <= length && (i > 0 || j + shift >= start)) {
                    days.push([day, {
                        d: day,
                        y: year,
                        m: month
                    },
                    new Date(year, month - 1, day).getDay()]);
                    day++;
                    flag = 1;
                } else {
                    if (flag) {
                        days.push(0);
                        nextCount += 1;
                    } else {
                        days.push(-1);
                        prevCount += 1;
                    }
                }
            }
        }
        for (i = 0; i < days.length; i++){
            if (days[i] == 0) {
                days[i] = flag;
                flag++;
            } else if (days[i] == -1) {
                days[i] = prevMonth - prevCount + 1
                prevCount--;
            }
        }
        return days;
    },    
    chunks: function (array, size) {
        var results = [];
        while (array.length) {
            results.push(array.splice(0, size));
        }
        return results;
    },
    getOffset: function (el) {
        var obj = document.getElementById(el),ppps = $KU.getPosition(obj);        
		return [ppps.left, ppps.top];
    },
    setDisable: function (model, startdate, enddate) {
        model.datesGroup = [startdate + "-" + enddate];
        model.dateState = 0;
    },
    setEnable: function (model, startdate, enddate) {
        model.datesGroup = [startdate + "-" + enddate];
        model.dateState = 0;
    },
	dateFormatter: function(format, date, check,dummy){            
		var trim = function (str) {
			return str.replace(/ +(?= )/g, '').replace(/^\s+|\s+$/g, '').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+(?=_)/g, '').split('_');
		},months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthsS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		DayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],day, month, year, obj = {};
		if (check && format) {
			check = trim(check);
			var fmt = trim(format.toLowerCase());
			if(fmt.length != check.length){ return false; }
			for(var m = 0, n = fmt.length; m < n; m++){
				obj[fmt[m]] = check[m];
			}
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					switch(i){
						case "mmm":
							month = monthsS.indexOf(obj[i]) + 1;
							if (month == 0) return false;
							break;
						case "mmmm":
							month = months.indexOf(obj[i]) + 1;
							if (month == 0) return false;
						break;
						case "mm":
							month = obj[i] * 1;									
							if (month < 1 || month > 12 ) return false;							
						break;
						case "dd":
							day = obj[i] * 1;
							if(day <= 0) return false;								
						break;
						case "do":
							day = parseInt(obj[i], 10);
							if(day <= 0) return false;								
						break;
						case "yy":
						case "yyyy":
							if(obj[i] != ""){
								year = ("" + obj[i]).length > 2 ? (obj[i] * 1) : (obj[i] * 1 + ((Math.floor(dummy / 100) * 100) || 2000));
							}else{
								year = ("" + obj[i]).length > 2 ? (obj[i] * 1) : (obj[i] * 1 + (new Date().getFullYear()));	
							}
							if (year > 2099 || year < 1900) return false;
						break;								
					}							
				}
			}
			var dummyDate = 1; 
			var dateObject = new Date(year, month - 1, day || dummyDate);
			if (Object.prototype.toString.call(dateObject) === "[object Date]") {
				if ((dateObject.getFullYear() == year) && (dateObject.getMonth() + 1 == month) && (dateObject.getDate() == (day || dummyDate))) {
					date = [day || dummyDate, month, year];
				}
				else {
					return false;
				}
			}
		}else if(date){
			try{
				for(var ob = 0; ob < 3; ob++){
					date[ob] = +date[ob];
				}
			} catch(e){
				console.log(e);
			}
		}
		
		if (!format || !date) return false;
		format = '' + format.toLowerCase().replace(/ +(?= )/g, '').replace(/^\s+|\s+$/g, '');
		var dateObj = new Date(date[2], date[1] - 1, date[0]),
			mm = date[1] <= 9 ? "0" + date[1].toString() : date[1] ,
			mmm = monthsS[date[1] - 1],
			mmmm = months[date[1] - 1],
			yy = (date[2] + "").substring(2,4),
			yyyy = date[2],
			dd = (date[0] >= 1 && date[0] < 10 ? "0" + date[0].toString() : date[0]),
			ddd = days[dateObj.getDay()],
			dddd = DayNames[dateObj.getDay()],
			doo = date[0] + ((date[0] <= 20) && date[0] >= 10 ? "th" : ["st","nd","rd"][(date[0] % 10) - 1] || "th");
		return {
			date: date,
			string: format.replace('dddd', dddd).replace('mmmm', mmmm).replace('mmm', mmm).replace('mm', mm).replace('ddd', ddd).replace('dd', dd).replace('yyyy', yyyy).replace('yy', yy).replace('do', doo)
		}
	}
}



/**
 * Calendar As popup is available in advanced clients.
 * This uses yahoo yui.
 *
 */
$KW.Calendar.Popupview = {
    calObj : null,
    showCalenderPopup : function(calendarModel,eid,reg,overlayCorner, contextCorner,title,startDate,endDate,months,weekdays,calendarenableddates,calendarskin,enabledisableflag,enabledstartdate,enabledenddate){
		if(this.calObj){
            this.calObj.destroyCalendar();
		}
		this.calObj = $KW.Calendar.Popupview.calendarObject;
		this.calObj.eid = eid;
		this.calObj.mindate = startDate;
		this.calObj.maxdate = endDate;
		this.calObj.months = months;
		this.calObj.weekdays = weekdays;
		this.calObj.calendarenableddates = calendarenableddates;
		this.calObj.calendarskin = calendarskin;
		this.calObj.enabledisableflag = enabledisableflag;
		this.calObj.enabledstartdate = enabledstartdate;
		this.calObj.enabledenddate = enabledenddate;
		if(enabledstartdate != null)
		{
				var arr1 = this.calObj.enabledstartdate.split("/");
				this.calObj.enabledstartdate = new Date(arr1[1]+"/"+arr1[0]+"/"+arr1[2]);
		}
		if(enabledenddate != null)
		{
				var arr2 = this.calObj.enabledenddate.split("/");
				this.calObj.enabledenddate = new Date(arr2[1]+"/"+arr2[0]+"/"+arr2[2]);
		}
		if(calendarenableddates != null)
		{
				var dates = [];
				for(var i=IndexJL; i<(calendarenableddates.length); i++ ){
					 var dateArray = calendarenableddates[i];

					 if(dateArray) 
					   dates.push($KW.Calendar.ideDateToString(dateArray));
				}

				for (var j=0;j<dates.length;++j) {
						var aDate =dates[j];
						var dateObj = aDate.split("/");
						dates[j] = new Date(dateObj[1]+"/"+dateObj[0]+"/"+dateObj[2]);
				}
				this.calObj.calendarenableddates = dates;
		}
		
		if(title && title != ''){
			// TODO:
			this.calObj.title = title;
		}
                
		this.calObj.createCalendar(calendarModel);	

		var yuiCal = document.getElementById("container_c");
		//yuiCal.style.position = "relative"; 
		
		//#ifdef SPA
		//yuiCal.style.top = "0px !important";
        //yuiCal.style.left = 0;
		//#endif


		
		//yuiCal.style.zIndex = 999999;
		yuiCal.style.zIndex = yuiCal.style.zIndex+1;
		// Fix for cal clicks bleeding through select
		// TODO:
		var yuim = document.getElementById("_yuiResizeMonitor");
		if(yuim)
            yuim.setAttribute("dummy", "a");
		yuiCal.setAttribute("dummy", "a");

		
        this.calObj.dialog.cfg.setProperty("context",[document.getElementById(eid)],true);
        //calObj.dialog.align(overlayCorner,contextCorner );
        //Added below logic to reset current date to previously selected date.
        /*
		var selDates =  this.calObj.calendar.getSelectedDates();
        var resetDate;
        if (selDates.length > 0) {
            resetDate = selDates[0];
        } else {
            resetDate =  this.calObj.calendar.today;
        }
		this.calObj.calendar.cfg.setProperty("pagedate", resetDate);
		*/
		/*if(calendarModel.datecomponents){
			calendarModel.pagedate = calendarModel.datecomponents[1] + "/" + calendarModel.datecomponents[2];
			calendarModel.selectdate = calendarModel.datecomponents[1] + "/" + calendarModel.datecomponents[0] + "/" + calendarModel.datecomponents[2];
		} */

		if(calendarModel.datecomponents){
			calendarModel.pagedate = calendarModel.datecomponents[IndexJL+1] + "/" + calendarModel.datecomponents[IndexJL+2];
			calendarModel.selectdate = calendarModel.datecomponents[IndexJL+1] + "/" + calendarModel.datecomponents[IndexJL+0] + "/" + calendarModel.datecomponents[IndexJL+2];
		}
		if(calendarModel.selectdate){
			this.calObj.calendar.cfg.setProperty("pagedate", calendarModel.pagedate); //mm/yyyy
			this.calObj.calendar.cfg.setProperty("selected", calendarModel.selectdate); //mm/dd/yyyy
		}
		

		this.calObj.calendar.cfg.setProperty("enabledisableflag", this.calObj.enabledisableflag);

        if(this.calObj.calendarskin) {
            this.calObj.calendar.cfg.setProperty("calendarskin", this.calObj.calendarskin);
            /*
            * This code is required when the broder needs to be customized for the enabled date cells.
            if($KU.getCSSPropertyFromRule(this.calObj.calendarskin, 'border')) {
                this.calObj.calendar.renderEvent.subscribe(this.setCellBorder, this, true);
            }
            */
        }
	
	    if(this.calObj.enabledstartdate) {
		   this.calObj.calendar.cfg.setProperty("enabledstartdate", this.calObj.enabledstartdate);
		   this.calObj.calendar.cfg.setProperty("enabledenddate", this.calObj.enabledenddate);
		} else if(calendarModel.issetDateskin) {
                          this.calObj.calendar.cfg.setProperty("enabledisableflag", true);
			  this.calObj.calendar.cfg.setProperty("enableskindatesarray",this.calObj.calendarenableddates);
		}else {
    	  this.calObj.calendar.cfg.setProperty("enableddatesarray",this.calObj.calendarenableddates);
		}
        this.calObj.calendar.render();
        
       //#ifdef SPA
        /*if(overlayCorner && overlayCorner < 0){
            var dialog = this.calObj.dialog.element.clientWidth;
            var clientW = $KW.Utils.scrollInterface.getClientW();
            overlayCorner = Math.floor((clientW - dialog)/2);
        }
        this.calObj.dialog.moveTo(overlayCorner,contextCorner);*/
      //#endif
       

        var dialogW = this.calObj.dialog.element.offsetWidth;
        this.calObj.dialog.moveTo(0,contextCorner + 5);
        yuiCal.style.left = "50%";
        yuiCal.style.marginLeft = -(dialogW / 2) + "px";// Half of the calender width.

        this.calObj.showBtn = 'show'+eid;
        this.calObj.dialog.show();
        this.calObj.addCloser();
        
    }
}
/** Javascript dataformater for format
 *javascript date object in given format
 **/
$KW.Calendar.DateFormater = {
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
                case this.yy    :value = date.getYear() - 100;
                    break;
            }
            if(value < 10){
                value = "0"+value;
            }
            result  = result + value + this.cseperator;
        }
        return result.substr(0, result.length-1);
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
    },
	/**
	 * date: string
	 * dateFormat : string in dd/mm/yyyy or mm/dd/yyyy ot mm/dd/yy
	 */
    convertToModelDate : function(date,dateFormat){
        var dfarray = null;
		var darray = null;
		var modelDate = new Array();
		var dateObj = {};
		
		if (IndexJL) modelDate[0] = null;
		
        if(dateFormat != null && date){
            dfarray = dateFormat.split(this.seperator);
            if (date instanceof Array){ 
                    if (IndexJL) date.shift();
                    darray = date;
            }else{
                    darray = date.split(this.seperator);
            }
            if(dfarray[0] === "dd"){ // dd/mm/yyyy
                modelDate[IndexJL] = darray[0];
                dateObj.day = darray[0];

                modelDate[1+IndexJL] = darray[1];
                dateObj.month = darray[1];

                modelDate[2+IndexJL] = darray[2];
                dateObj.year = darray[2];
				
            }else{
                modelDate[IndexJL] = darray[1];
                dateObj.month = darray[1];

                modelDate[1+IndexJL] = darray[0];
                dateObj.day = darray[0];

                if(dfarray[2] === "yyyy"){ // mm/dd/yyyy			
                    modelDate[2+IndexJL] = darray[2];
                    dateObj.year = darray[2];
                }else{ // mm/dd/yy
                    if(darray[2].length > 3){
                        modelDate[2+IndexJL] = darray[2].substring(2,4);
                        dateObj.year = darray[2];
                    }else{
                        modelDate[2+IndexJL] = darray[2];
                        dateObj.year = darray[2];
                    }

		}
            }
        }
        dateObj.date = modelDate;
        dateObj.dateText = modelDate[IndexJL]+this.seperator+modelDate[1+IndexJL]+this.seperator+modelDate[2+IndexJL];
	dateObj.selectdate = dateObj.month+this.seperator+dateObj.day+this.seperator+dateObj.year;//mm/dd/yyyy
	dateObj.pagedate = dateObj.month+this.seperator+dateObj.year;//mm/yyyy
		
        return dateObj;
    }
}

$KW.Calendar.Popupview.calendarObject = {
    dialog : null,
    calendar : null,
    eid : null,
    title : null,
    showBtn : 'showCal',
    mindate : null, /* (curDate.getMonth() + 1 ) + "/" + curDate.getDate() + "/" + curDate.getFullYear(); */
    maxdate : null,
    calId : 'calContainer',
    
    closeCalendar : function(e, forceClose) {
        if(e) var el = YAHOO.util.Event.getTarget(e);
        var calObj =$KW.Calendar.Popupview.calObj;
        var calEl = YAHOO.util.Dom.get(calObj.calId);
        if ( forceClose || (el != calEl && !YAHOO.util.Dom.isAncestor(calEl, el) && el != YAHOO.util.Dom.get(calObj.showBtn) && !YAHOO.util.Dom.isAncestor(YAHOO.util.Dom.get(calObj.showBtn), el))) 
		{
            calObj.dialog.hide();
			calObj.removeCloser();
			
			var previousYuiCal = document.getElementById("container_c");
			var previousYuiCalIframe = document.getElementById("_yuiResizeMonitor");
			
			previousYuiCal && previousYuiCal.parentNode.removeChild(previousYuiCal);
			previousYuiCalIframe && previousYuiCalIframe.parentNode.removeChild(previousYuiCalIframe);
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
	
    createCalendar : function(calendarModel){
        if(!this.dialog){
            this.dialog = new YAHOO.widget.Dialog("container", {
                
                visible:true,
                width:100,
		
		
                draggable:false,
                //Suma Nov4,2011 added to remove the extra border in Popup calendar
                //underlay:"none",
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
            if(this.weekdays){
               config.locale_weekdays="long";
               config.weekdays_long=this.weekdays;
            }
            else{
               config.locale_weekdays="1char";    
            }
			
			
			this.calendar = new YAHOO.widget.Calendar(this.calId,  config);
			
            this.calendar.render();

            this.calendar.selectEvent.subscribe(function(e) {
                var calObj =$KW.Calendar.Popupview.calObj;
                var el = YAHOO.util.Dom.get(calObj.eid);
                var formater = $KW.Calendar.DateFormater;
                if (calObj.calendar.getSelectedDates().length > 0) {
                    var selDate = calObj.calendar.getSelectedDates()[0];
                    var selDateforLua = formater.format(selDate,"dd/mm/yyyy");
                    var dateObjforLua = formater.convertToModelDate(selDateforLua,"dd/mm/yyyy");
                    if(!calendarModel)
                        calendarModel = kony.model.getWidgetModel(el.getAttribute("kformname"), $KU.getElementID(el.id), el.getAttribute("ktabpaneid"));
                    calendarModel.luadate = dateObjforLua.date;

                    var dateObj = formater.convertToModelDate(calendarModel.luadate,calendarModel.format);
                    /* calendarModel.date = dateObj.dateText; */
					
					calendarModel.selectdate = dateObj.selectdate;
					calendarModel.pagedate = dateObj.pagedate;
					
                    el.setAttribute('value',dateObj.dateText);
                    el.value = dateObj.dateText;
					calendarModel.entereddate = dateObj.dateText;
                    calendarModel.day = parseInt(dateObj.day,10);
                    calendarModel.month = parseInt(dateObj.month,10);
                    calendarModel.year = parseInt(dateObj.year,10);
					calendarModel.hour = calendarModel.minutes = calendarModel.seconds = 0;
					
					if(!calendarModel.datecomponents){
						calendarModel.datecomponents = [];
					}
					calendarModel.datecomponents[IndexJL+0] = calendarModel.day;
					calendarModel.datecomponents[IndexJL+1] = calendarModel.month;
					calendarModel.datecomponents[IndexJL+2] = calendarModel.year;
					calendarModel.datecomponents[IndexJL+3] = calendarModel.hour;
					calendarModel.datecomponents[IndexJL+4] = calendarModel.minutes;
					calendarModel.datecomponents[IndexJL+5] = calendarModel.seconds;
					
					$KW.Calendar.updateCalDOMNode(calendarModel, true);
					
					var parent = el.parentNode;
					if(parent.getAttribute("kcontainerID")) 
						$KW.Utils.updateContainerData(calendarModel, parent, false, true);
                } 
				else {
                    el.value = "";
                }
                calObj.dialog.hide();
				
				var previousYuiCal = document.getElementById("container_c");
				var previousYuiCalIframe = document.getElementById("_yuiResizeMonitor");
				
				previousYuiCal && previousYuiCal.parentNode.removeChild(previousYuiCal);
				previousYuiCalIframe && previousYuiCalIframe.parentNode.removeChild(previousYuiCalIframe);

				var calenEventref = $KU.returnEventReference(calendarModel.ondone || calendarModel.onselection);
                calenEventref && calenEventref.call(calendarModel,calendarModel);
            });

            this.calendar.renderEvent.subscribe(function() {
                // Tell Dialog it's contents have changed, which allows
                // container to redraw the underlay (for IE6/Safari2)
                $KW.Calendar.Popupview.calObj.dialog.fireEvent("changeContent");
            });
        }
    },
	
    destroyCalendar : function(){
        this.dialog = undefined;
        this.calendar = undefined;
		this.title = null;
    }
}


$KW.Calendar.Util = {
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
