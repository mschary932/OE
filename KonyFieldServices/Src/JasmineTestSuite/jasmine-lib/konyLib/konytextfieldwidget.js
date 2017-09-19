/*
 * Widget: TextBox
 */
 
$KW.TextField =
{
    goeventTriggerd: null,  // This value holds the information if the go has been clicked by the user. This is prevent double submission when go is clicked twice
    focusedTextfieldId: null,
	
    initialize: function() {
		kony.events.addEvent("keydown", "TextField", this.textfieldGoButtonEventHandler);
		kony.events.addEvent("keyup", "TextField", this.textfieldKeyUpEventHandler);
		kony.events.addEvent("onorientationchange", "TextField", this.adjustHeight);
		kony.events.addEvent("change", "TextField", this.eventHandler);
    },
	
    initializeView: function(formId){
		this.adjustHeight(formId);
        setTimeout(function(){
            $KW.TextField.initPasswordField(formId);
        }, 1);
    },

    initPasswordField: function(formId){
		var passElements = document.querySelectorAll("#" + formId + " input[name='konypassword']");
		for (var i = 0; i < passElements.length; i++) {
			var passElement = passElements[i];
			//new MaskedPassword(passElement, '\u25CF');
		}
    },   

    /**
     * Updates the view of the listbox widget.
     */
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue)
	{
		var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
	
		switch (propertyName) 
		{        
            case "text":
	           /* if ($KU.isAndroid && widgetModel.mode == "P") {
	                var dotString = '';
	                for (var i = 0; i < propertyValue.length; i++) 
	                    dotString += '\u25CF';
	                element.value = dotString;
	                element = $KU.getElementById(widgetModel.id + "_value");
					if(element)
					    element.value = propertyValue;
			    }
	            else { */
					if(propertyValue){
	                	element.value = propertyValue;                       
                    }
	                else{
	                	element.value = "";
						if(($KU.isBlackBerry || $KU.isBlackBerryNTH) && element.getAttribute("type") == "number"){	
							var activeElemId = document.activeElement.id;
							var elemId = element.id;
							var temp = document.createElement("div");
							temp.innerHTML = this.render(widgetModel, {tabpaneID: element.getAttribute("ktabpaneid")});
							element.parentNode.replaceChild(temp.firstChild, element);
							if(elemId == activeElemId){ //In case of setting an empty value on textbox focus 
								element = $KU.getNodeByModel(widgetModel);
								element.focus();
							}
						}
                    }
                    	                
                   	this.setPlaceholder(widgetModel, element);
                   
	            
                break;

            case "placeholder":
				element.setAttribute("placeholder", propertyValue);				
                this.setPlaceholder(widgetModel, element);				
                break;

			case "maxtextlength":
                element.maxLength = propertyValue;
                break;			
				
			case "pattern":
                element.setAttribute("pattern", propertyValue);                
                break;
		
            case "autocapitalize":
                var value = propertyValue;
				if($KU.isiPhone && parseInt($KU.getPlatformVersion("iphone")) <= 4 && propertyValue != constants.TEXTBOX_AUTO_CAPITALIZE_NONE){
					value = 'on';
				}				
                element.setAttribute("autocapitalize", value);
                break;

            case "mode":
            case "textinputmode":
				if(propertyValue == constants.TEXTBOX_INPUT_MODE_ANY)
					element.setAttribute("type", "text");
				else if(propertyValue == constants.TEXTBOX_INPUT_MODE_NUMERIC)
					element.setAttribute("type", "number");
			break;
			
			case "securetextentry":
				if(propertyValue)
					element.setAttribute("type", "password");
				else
					this.updateView(widgetModel, "textinputmode", widgetModel.textinputmode);
				break;

            case "keyboardtype":
            case "keyboardstyle":
				(widgetModel.mode != "P") && element.setAttribute("type",propertyValue);
				break;
			case "containerheightmode":
			case "containerheight":
			case "containerheightreference":
				if(widgetModel.containerheightmode == constants.TEXBOX_DEFAULT_PLATFORM_HEIGHT){
					$KU.addClassName(element, "kheight");
					element.style.height = "";
				}else if(widgetModel.containerheightmode == constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT){
					$KU.removeClassName(element, "kheight");
					element.style.height = "";
				}else if(widgetModel.containerheightmode == constants.TEXTBOX_CUSTOM_HEIGHT && widgetModel.containerheight && widgetModel.containerheightreference){
					$KU.removeClassName(element, "kheight");
					this.adjustBoxDimensions(element.id, true);
				}
				break;

			case "name":
				element.name = propertyValue;
				break;
        }
    },
	
    render : function(textModel, context)
    {
		if(typeof textModel.keyboardtype == 'undefined') textModel.keyboardtype = textModel.keyboardstyle;
		if(typeof textModel.mode == 'undefined') textModel.mode = textModel.textinputmode;
		if(!textModel.buiskin) textModel.buiskin = textModel.blockeduiskin;

		var computedSkin = $KW.skins.getWidgetSkinList(textModel, context);
		if(textModel.containerheightmode == constants.TEXBOX_DEFAULT_PLATFORM_HEIGHT) computedSkin += " kheight ";
        var tabpaneID = context.tabpaneID || "";
			
        var type = "text";
        var isDafultPad = false;
        switch (textModel.mode) {
            case constants.TEXTBOX_INPUT_MODE_PASSWORD:
                type = "password";
                break;
            case constants.TEXTBOX_INPUT_MODE_NUMERIC:
                type = "number";
                break;
            default:
                type = "text";
        }

        if(textModel.securetextentry)
             type = "password";

		
		
			 
        if (textModel.keyboardtype && textModel.mode != "P") {
	        switch (textModel.keyboardtype) {
	            case constants.TEXTBOX_KEY_BOARD_STYLE_EMAIL:
	                type = "email";
	                break;
	            case constants.TEXTBOX_KEY_BOARD_STYLE_URL:
	                type = "url";
	                break;
	            case constants.TEXTBOX_KEY_BOARD_STYLE_PHONE_PAD:
	                type = "tel";
	                break;
	            case constants.TEXTBOX_KEY_BOARD_STYLE_NUMBER_PAD:
	                type = "number";
	                break;
				case constants.TEXTBOX_KEY_BOARD_STYLE_DECIMAL:
				    type = "number"; // Added it because end user should be able to enter negative values also
	                break;
		   		case constants.TEXTBOX_VIEW_TYPE_SEARCH_VIEW:
	                type = "search";
	                break;
                default:
			        if($KU.isiPhone && textModel.mode == "N") {
			           type = "number"; // Added it because it should be default number pad if mode is N and contants.XXXX_DEFAULT_VIEW
			           isDafultPad = false;
			        }
		     	break;
	        }
		}


			if(textModel.placeholder && !textModel.text && !kony.utils.placeholderSupported && type == "number"){
			type = "text";
			textModel.__initialMode = constants.TEXTBOX_INPUT_MODE_NUMERIC;
			}
	
        var htmlString = "";
		var style = $KW.skins.getBaseStyle(textModel, context);

        style += ";text-align:" + $KW.skins.getContentAlignment(textModel)+";";
		style += $KG.disableViewPortScroll ? "pointer-events:none;" : "";
        /*if($KU.isAndroid && type == "password" && !$KG.relativeScroll)
		{
            var dotString = "";
            if (textModel.text) {
                for (var i = 0; i < textModel.text; i++) {
                    dotString += '\u25CF';
                }
            }
            var encodedTextforAndroid="";
            if(dotString && dotString!="")
            	encodedTextforAndroid=dotString.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&rsquo;').replace(/"/g,'&rdquo;');
			
            htmlString += "<input name='konypassword' type='text'" + $KW.Utils.getBaseHtml(textModel, context) + "value='" + encodedTextforAndroid + "' class = '" + computedSkin + "'";		
        }*/
        
			var value = textModel.text;
			var encodedText = "";
            if(value && value != "" && (typeof value == "string" || value instanceof String))
            	encodedText = value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&rsquo;').replace(/"/g,'&rdquo;');
			else
				encodedText = value;	
			
			
			if(!kony.utils.placeholderSupported && (textModel.__initialMode == constants.TEXTBOX_INPUT_MODE_NUMERIC)) {
				encodedText = encodedText || textModel.placeholder || "";
				computedSkin += (textModel.placeholder && !textModel.text) ? "konyplaceholder " : "";
			}
			
        	var isFlexWidget = $KU.isFlexWidget(textModel);
			var wrapperDivOpen = ($KU.isiPhone && !isFlexWidget) ? "<div style='overflow:hidden'>" : "";
			var wrapperDivClose = ($KU.isiPhone && !isFlexWidget) ? "</div>" : "";
			htmlString += wrapperDivOpen + "<input" + $KW.Utils.getBaseHtml(textModel, context) + "value='" + encodedText + "' class = '" + computedSkin + "'";
			
			htmlString += textModel.name ? " name='" + textModel.name + "'" : ""; 
			htmlString += " autocapitalize='" + textModel.autocapitalize + "'";
			htmlString += textModel.autocorrect ? " autocorrect='on'" : " autocorrect='off'";
			htmlString += textModel.autocomplete ? " autocomplete='on'" : " autocomplete='off'";
			//htmlString += textModel.autosave ? " autosave='on'" : " autosave='on'";
			htmlString += " type = '" + type + "'";
			htmlString += (textModel.pattern) ? " pattern=" + textModel.pattern : "";
		
		if((textModel.keyboardtype == "digitpad" && textModel.mode == "P") || isDafultPad)
		{
			var pattern="[0-9]*";
			htmlString += " pattern = '" + pattern + "'";
		}
	
		htmlString += (textModel.disabled) ? " disabled='true'" : "";
		htmlString += " onfocus='$KW.TextField.onfocusEventHandler(arguments[0],this)' onblur='$KW.TextField.onblurEventHandler(arguments[0],this)' ";
		htmlString += (textModel.placeholder) ? " placeholder='" + textModel.placeholder + "'" : "";
		
		htmlString += (textModel.maxtextlength) ? " maxlength='" + textModel.maxtextlength + "'" : "";
		htmlString +=" style='" + style + (textModel.securetextentry ? "-" + vendor + "-text-security:disc":"") + "'";
        htmlString += "/>"+wrapperDivClose;     
        return htmlString;
    },
	
	

    textfieldGoButtonEventHandler: function(eventObject, target){
	
		var textModel = $KU.getModelByNode(target);
        eventObject = eventObject || window.event; //For IE where window.event is global object
        if (textModel.ondone && (eventObject.keyCode == 10 || eventObject.keyCode == 13)) 
		{
            textModel.canUpdateUI = false;
			textModel.text = target.value;
			textModel.canUpdateUI = true;
            //Need to modify this code...added for demo            
            kony.events.preventDefault(eventObject);
			kony.events.stopPropagation(eventObject);			
            try {
                if(eventObject.srcElement)
                    eventObject.srcElement.blur();
                else 
                    eventObject.target.blur();
                } catch(e){}

            (textModel.blockeduiskin) && $KW.Utils.applyBlockUISkin(textModel);
			target.getAttribute("kcontainerID") && $KW.Utils.updateContainerData(textModel, target, false, true);
			var textondoneref = $KU.returnEventReference(textModel.ondone);
			textondoneref && textondoneref.call(textModel,textModel);
        }
		if(eventObject.keyCode == 10 || eventObject.keyCode == 13){
			if($KU.isAndroid && eventObject.keyCode == 13)
				target.blur();
			$KU.onHideKeypad(textModel);
		}
		var textkeydownref = $KU.returnEventReference(textModel.onkeydown);
		textkeydownref && textkeydownref.call(textModel,textModel);
    },	
	
	/*
    textfieldClickEventHandler: function(eventObject){
        var domElement = new kony.dom.Element();
        eventObject = eventObject || window.event; //For IE where window.event is global object
        var target = domElement.getEventTarget(eventObject);
        
    },
	
	textfieldKeyUpEventHandler : function(eventObject, target) {

		var targetWidgetID = $KU.getElementID(target.getAttribute("id"));
		var textModel = $KU.getModelByNode(target);
		textModel.text = target.value;
		target.setAttribute("value", target.value); //To update DOM 
        if(textModel.ontextchange) {
            var value = target.value;
            value = value.ltrim();
            if(value.length >= 3){
	var ontextchangeref = $KU.returnEventReference(textModel.ontextchange);
				ontextchangeref && ontextchangeref.call(textModel,textModel,value);
				if(textModel.filterlist)
					$KW.TextField.HandleTextFieldFilterData(textModel.filterlist, eventObject, target)
                //this.textchanged = value;

            }else if(value.length < 3){
                $KW.TextField.AutoComplete.AutoComplete_RemoveDivs(textModel.pf+'_'+targetWidgetID);
            }
        }
    },*/

    HandleTextFieldFilterData: function(response, eventObject, target) {
        var textfieldId = target.getAttribute("id");
        response.shift(); // remove the first element, which is null ( coming from lua )
        var value = target.value;
        value = value.ltrim();

        if(value.length < 1) return;

        if(response.length > 0) {
            this.AutoComplete.AutoComplete_Create(textfieldId, response, 8);
            this.AutoComplete.AutoComplete_ShowDropdown(textfieldId);
        }
    },

    
	eventHandler: function(eventObject, target){
       	var textModel = $KU.getModelByNode(target);
        if (textModel) { 
        	textModel.canUpdateUI = false;	
            textModel.text = target.value;
			textModel.canUpdateUI = true;
			
			var textHandler = $KU.returnEventReference(textModel.ontextchange);          
			textHandler && textHandler.call(textModel,textModel);
		
        }
    },
	textfieldKeyUpEventHandler : function(eventObject, target) {
        var textModel = $KU.getModelByNode(target)
          , targetWidgetID = $KU.getElementID(target.getAttribute("id"));

        if(textModel.text != target.value) {
        	textModel.canUpdateUI = false;
            textModel.text = target.value;
            textModel.canUpdateUI = true;
            var textkeyupref = $KU.returnEventReference(textModel.ontextchange);
            textkeyupref && textkeyupref.call(textModel,textModel);

            if(textModel.autocomplete && $KU.isArray(textModel.filterlist) && textModel.filterlist.length > IndexJL) {
                var value = target.value.ltrim();
                if(value.length >= 1) {
                    this.HandleTextFieldFilterData(textModel.filterlist, eventObject, target);
                } else {
                    this.AutoComplete.AutoComplete_RemoveDivs(textModel.pf+'_'+targetWidgetID);
                }
            }
        }
    },
	
    onfocusEventHandler: function(eventObject, target){
		/*if($KU.isAndroid && target.getAttribute('type') == "password" && target.style.position == 'relative'){
			target.style.top = "auto";
			target.style.webkitTransform = 'none';		
		}*/
		//setTimeout(function (){$KU.setActiveInput(target);}, $KU.isAndroid && target.getAttribute('type') != "number" ? 100 : 0);	
		if(($KU.isWindowsPhone || $KU.isWindowsTablet) && !$KU.nativeScroll)
			document.documentElement.style.msTouchAction = "auto";
		
		/*Calculationg the Version of the Android to avoid Keypad dismissal issues in Andoid Kitkat. Reference Bug : 22829*/
		if($KU.isAndroid && target.getAttribute('type') != "number"){
			var androidVersion = $KU.getPlatformVersion("android");
			if(!(androidVersion.indexOf("4.4") > -1) || kony.appinit.isChrome){
				setTimeout(function (){
					$KU.setActiveInput(target);
				},100);
			}
		}
		else{
			$KU.setActiveInput(target);
		}
		var textModel = $KU.getModelByNode(target);
		
		if (!kony.utils.placeholderSupported && !textModel.text && textModel.placeholder && (textModel.__initialMode == constants.TEXTBOX_INPUT_MODE_NUMERIC)){			
			if(target.type == "text"){
				target.setAttribute("type","number");				
			}
			target.focus();			
			$KU.removeClassName(target, 'konyplaceholder');
		}		
		
		var textonbegineditingref = $KU.returnEventReference(textModel.onbeginediting);
		textonbegineditingref && textonbegineditingref.call(textModel,textModel);
    },
	
    onblurEventHandler: function(eventObject, target){
		var textModel = $KU.getModelByNode(target);
		if(textModel && textModel.text != target.value) {
        	textModel.canUpdateUI = false;
            textModel.text = target.value;
            textModel.canUpdateUI = true;
		}
		
		$KW.TextField.setPlaceholder(textModel, target);	
		
		if(($KU.isWindowsPhone || $KU.isWindowsTablet) && !$KU.nativeScroll)
			document.documentElement.style.msTouchAction = "none";
		$KU.onHideKeypad(textModel);
			
		var textonendeditingref = $KU.returnEventReference(textModel.onendediting);
		textonendeditingref && textonendeditingref.call(textModel,textModel);
    },
	
	
	setPlaceholder: function(textModel, target){
		if(!kony.utils.placeholderSupported && textModel.placeholder && (textModel.__initialMode == constants.TEXTBOX_INPUT_MODE_NUMERIC)){
			var id = target.id;
			if(textModel.text){
				if(target.type == "text"){
					target.setAttribute("type","number");
					target.value = textModel.text;
					$KU.removeClassName(element, 'konyplaceholder');					
				}							
			}
			else{
				if(target.type == "number"){					
					target.setAttribute("type","text");				
				}
				target.value = textModel.placeholder;
				$KU.addClassName(target, 'konyplaceholder');								
			}
		}
	},	
		
	adjustHeight: function(formId){
		var formModel = $KG.allforms[$KG.__currentForm.id];
		if(formId == formModel.header || formId == formModel.footer) return;
		if( !$KG.nativeScroll && formModel.dockablefooter){
			$KW.TextField.adjustBoxDimensions(formModel.footer);
			$KW.Scroller.checkDOMChanges(formModel.id + "_scroller", null, formModel.footer);
		}
		$KW.TextField.adjustBoxDimensions("__MainContainer");
	},
	
	adjustBoxDimensions: function(elemID, updateView){
	
		var textBoxes = updateView ? document.querySelectorAll("#"+ elemID) : document.querySelectorAll("#"+ elemID +" input[kwidgettype='TextField']");
		for (var i = 0; i < textBoxes.length; i++) {
			var boxModel = $KU.getModelByNode(textBoxes[i]);
			if(boxModel.containerheightmode == constants.TEXTBOX_CUSTOM_HEIGHT){
				var boxhtPercent = boxModel.containerheight || 10;
				var kht = 28;
				if (boxhtPercent > 0) {
					if(boxModel.containerheightreference == constants.CONTAINER_HEIGHT_BY_PARENT_WIDTH) {
						var parent = $KU.getElementById(boxModel.pf+ "_"+ boxModel.parent.id);
						if( parent && boxModel.parent.wType == "ScrollBox" )	// Text field inside a ScrollBox
							parent = $KU.getElementById(boxModel.pf+ "_"+ boxModel.parent.id + "_parent");
						if(!parent){
							if ( textBoxes[i].getAttribute("ktabpaneid") )	// Text field inside a Tabpane
								parent = $KU.getElementById(boxModel.pf+ "_"+ textBoxes[i].getAttribute("ktabpaneid"));
							else if( window[boxModel.pf].wType == "Popup" )
									parent = document.getElementById(boxModel.pf);
							else
								parent = document.getElementById(boxModel.pf + '_scroller');
						}
						var parentWidth = (parent && parent.offsetWidth) || window.innerWidth || document.body.clientWidth;
						kht = Math.round((boxhtPercent * parentWidth) / 100);
					} else if(boxModel.containerheightreference == constants.CONTAINER_HEIGHT_BY_FORM_REFERENCE) { 
						var formScroller =  document.getElementById(boxModel.pf + '_scroller');
						var formHeight = (formScroller && formScroller.offsetHeight) || $KU.getWindowHeight() || window.innerHeight || document.body.clientHeight;
						kht = Math.round((boxhtPercent * formHeight) / 100);
					}
				}
				textBoxes[i].style.height = kht + "px";
				if(kony.appinit.isIE8){
					var textbox = $KU.getElementById(textBoxes[i].id);
					textbox.style.lineHeight = kht + "px";
				}				
			}
		}
	}
}
