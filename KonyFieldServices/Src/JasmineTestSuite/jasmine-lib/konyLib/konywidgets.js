/* konywidgets. js */

// Form transitions IDE-CSS mapping
$KW.formTransitionsMatrix = {"topCenter":"slidetopin", "bottomCenter":"slidebottomin", "rightCenter":"sliderightin", "leftCenter":"slideleftin", "fadeAnimation":"fadein"};
$KW.formEndTransitionsMatrix = {"rightCenter":"sliderightout", "leftCenter":"slideleftout", "topCenter":"slidetopout", "bottomCenter":"slidebottomout", "fadeAnimation":"fadeout"};
$KW.stringifyScrolldirection = {1:"horizontal", 2:"vertical", 3:"both", 4:"none"};
	
$KW.Widget = {

	/*	$KW.Widget.setvisibility($KG.frmLabel.segvisible1,true);
	 * 
	 * */
	setvisibility: function(widgetModel, value){    
        
        if (widgetModel) 
		{
            widgetModel.isvisible = value;
            var element, element2, tabpaneWidgetModel;
			
			if (widgetModel.wType == "Tab") {
				tabpaneWidgetModel = kony.model.getWidgetModel(widgetModel.pf, widgetModel.parent && widgetModel.parent.id);
				if(tabpaneWidgetModel.view === 'tabview'){
					element = $KU.getElementById(widgetModel.pf + "_" + widgetModel.id + "_Li");
					element2 = $KU.getElementById(widgetModel.pf + "_" + widgetModel.id + "_Body");
				}
				else
					element = $KU.getNodeByModel(widgetModel);
			}
            else 
                element = $KW.Utils.getWidgetNode(widgetModel);
				
            if(element) 
			{
				
				if(widgetModel.wType == 'CheckBoxGroup' || widgetModel.wType == 'ComboBox' ||  widgetModel.wType == 'RadioButtonGroup' ||  widgetModel.wType == 'ListBox' || widgetModel.wType == 'Segment'){
					var data = widgetModel.masterdata || widgetModel.data;
					if(!data || (data && data.length <= 0))
						value = false;
				}
					
				//If widget is inside flex container, set visibility class to wrapper node
				var isFlexWidget = $KU.isFlexWidget(widgetModel);
				var displayNode = isFlexWidget ? element.parentNode : element;	
                if (value.toString() == "false"){
					$KU.addClassName(displayNode, "hide");
                }
                else{
					$KU.removeClassName(displayNode, "hide");
                    if (widgetModel.wType == "Tab" && tabpaneWidgetModel.view === 'tabview') {
                        element.style.display = "inline";
                    }
                }
				
				if(value){
					var wType = widgetModel.wType;
					if(wType == "FlexContainer" || wType == "FlexScrollContainer")
						widgetModel.forceLayout();
				}		
						
				if(isFlexWidget){
					this.onVisibilityChange(widgetModel);
				}
				
				if (widgetModel.viewtype && widgetModel.viewtype == "pageview") {
                    //Hide footer div for seg pageview and imagestrip
                    widgetModel.isvisible && $KW.touch.computeWidths(element, widgetModel);
                    element.nextSibling && $KU.toggleVisibilty(element.nextSibling, widgetModel.data || widgetModel.masterdata, widgetModel, false);
                }
				
				if(value && widgetModel.viewtype == "stripview"){ 
					$KW.HStrip.refreshScroller(widgetModel, element);
				}
				
				if(value && widgetModel.wType === "Switch"){ //Switch
					$KW.Switch.adjustWidth(widgetModel, element, false);
					$KW.Switch.adjustHeight(widgetModel, element);
				}

				if(value && widgetModel.wType === "Calendar"){ //Calendar
					$KW.Calendar.setCalElementStyle(element.childNodes[0],true);
					value && $KW.Calendar.adjustCalendars(widgetModel);
				}
				
				if(value && widgetModel.wType == "Slider"){
					var slider = $KU.getNodeByModel(widgetModel);
					$KW.Slider.imgLoad(slider.childNodes[0]);
				}
				
				value && widgetModel.ownchildrenref && $KW.Utils.reinitializeWidgets(widgetModel);
				if(typeof google != "undefined")
				$KW.Utils.resizeMap(widgetModel);
				//When a SLW is hidden then show other SLW, if a SLW is shown then remove other non-SLW widgets in the form.
				if(widgetModel.screenLevelWidget){
					var formModel = $KG.allforms[widgetModel.pf];
					$KW.Form.addChild(formModel, formModel.ownchildrenref, true);
				}
            }
			else{
				tabpaneWidgetModel = kony.model.getWidgetModel(widgetModel.pf, widgetModel.parent && widgetModel.parent.id);
				if(tabpaneWidgetModel && tabpaneWidgetModel.viewtype === 'tabview'){
					element = $KU.getElementById(widgetModel.pf + "_" + widgetModel.id + "_Li");
					element2 = $KU.getElementById(widgetModel.pf + "_" + widgetModel.id + "_Body");
					
					if (value.toString() == "false") 
						$KU.addClassName(element, "hide");
					else {
						$KU.removeClassName(element, "hide");
						if (tabpaneWidgetModel.viewtype === 'tabview') {
							element.style.display = "inline";
						}
					}
				}
				else
					element = $KU.getNodeByModel(widgetModel);				
			}
			
			if(element2) {
				var index = element.getAttribute("index");
				if (value == false || value == "false") 
					$KU.addClassName(element2, "hide");
				else {
					if(tabpaneWidgetModel && ((tabpaneWidgetModel.activetab - IndexJL) == parseInt(index ))){
						$KU.removeClassName(element2, "hide");
					}
				}
			}
			/* DEF5921 fix
			*/

			if(value){
				if(widgetModel.id){
					var currentFormId = widgetModel.pf || "";
					var widgetElement = $KU.getElementById(currentFormId + "_" + widgetModel.id);
					var lineNodes = widgetElement && widgetElement.querySelectorAll("#" + currentFormId + " div[kwidgettype='Line'][direction='V']");
					if(lineNodes && lineNodes.length > 0){
						$KW.Line.initializeView(currentFormId);		
					}			
				}
			}
        }
    },
	
	onVisibilityChange: function(wModel){
		var parentModel = wModel.parent;
		if(parentModel.layouttype != kony.flex.VBOX_LAYOUT)
			parentModel.forceLayout();
	},
	
	setenabled: function(widgetModel, value)
	{
        if(!widgetModel || typeof value != "boolean")
			return;
		
		widgetModel.disabled = !value;
		var id = widgetModel.pf + "_" + widgetModel.id;
		if((widgetModel.wType == "Tab" || widgetModel.name == "kony.ui.Tab")){
			if(widgetModel.parent.viewtype == "tabview"){
				var tabHeader = $KU.getElementById(id + "_A");
				if(tabHeader){
					tabHeader.disabled = !value;
					tabHeader.setAttribute("kdisabled", !value);
					var tabBody = $KU.getElementById(id + "_Body");
					tabBody.setAttribute("kdisabled", !value);
					id = id + "_Body";
				}
			}
			if(widgetModel.parent.viewtype == "collapsibleview"){
				id = id + "_Tab";
			}	
		}		
		var children = document.querySelectorAll("#" + id + ", #" +  id + " [kwidgettype]");
		var node, widgettype, tpwidgettype;
		for( i=0; i<children.length; i++){
			node = children[i];
			widgettype = node.getAttribute("kwidgettype");
			tpwidgettype = node.getAttribute("tpwidgettype");
			/* For Windows Mango , adding disabled to select tag itself doesn't work
			Traversing through the select tag and disabling all option tags		*/
			if($KU.isWindowsPhone && $KU.isIE9 && node.tagName == 'SELECT'){			
				for(var j=0;j<node.childNodes.length;j++){
					node.children[j].disabled = !value;
				}				
			}
			if(widgettype != "Link" && widgettype != "Label" && widgettype != "HBox" && widgettype != "VBox") // Setting disabled to true to div makes gray look to all its children in ie.  			
				node.disabled = !value;	
				if(widgettype == "Link")
				node.childNodes[0].setAttribute("kdisabled", !value);
				if(widgetModel.wType == "Label")
				{
					if(!!(value && widgetModel.textCopyable))
					{
						$KU.addClassName(node, "enableSelection");
						$KU.removeClassName(node, "disableSelection");
					}
					else
					{
						$KU.addClassName(node, "disableSelection");
						$KU.removeClassName(node, "enableSelection");
					}
				}
			//Replacing href(<a> inside richtext) path to javascript:void(0), when richtext is disabled
			if(widgettype == "RichText") 
				var aEle = document.querySelectorAll("#"+node.id+" a");
			if(widgettype == "RichText" && aEle && !value)
			{
				node.ishref = true;
				node.innerHTML = node.innerHTML.replace(/href=["'].*?["']/g,"href='javascript:void(0)'");
			}
			else if(node.ishref)
			{
				node.innerHTML = widgetModel.text;
			}
			if(widgettype == "Video"){
				
				if(value){	
					node.oncontextmenu = "";
					node.playing && node.paused && node.play();
					if(widgetModel.controls)
						node.setAttribute("controls","controls");
				}
				else{
					node.playing && node.pause();
					node.removeAttribute("controls");
					node.oncontextmenu = function(){return false};
				}
			}
			
			node.setAttribute("kdisabled", !value); //Setting this attribute to apply disabled skin and prevent click event
			
			// the condition check depends on and should be after node.setAttribute
			if(widgetModel.wType === "Map" && (node.getAttribute("kwidgettype") === "Map" || node.getAttribute("tpwidgettype") === "googlemap"))
			{
				widgetModel.disabled = !value;
				$KW.Map.setEnabledMap(widgetModel, node);
			}
		}
    },		
    
    setfocus: function(widgetModel, popupModel, element){
		// TODO: Check if element in a scrollable box is scrolled automatically

		if(!widgetModel.isvisible)
		  return;

		var widgetHTMLObj = (element) ? element : $KU.getNodeByModel(widgetModel);		
		if(!widgetHTMLObj)
			return;
		
		if(widgetModel.wType == 'ScrollBox'){	
			widgetHTMLObj = $KU.getElementById(widgetHTMLObj.id + "_parent");
		}		

		if(!$KG.nativeScroll)
		{
			var scrollerInstance 
			if(popupModel)
				scrollerInstance = $KG[popupModel.id + "_scroller"];
			else{
				//Added to support setFocus api in flexScrollContainers
                if($KU.isFlexWidget(widgetModel)){
                    var scrollBox = $KU.closestElement(widgetHTMLObj, 'kwidgettype', 'FlexScrollContainer');
                    widgetHTMLObj = widgetHTMLObj.parentNode;
                }else{
					var scrollBox = $KU.closestElement(widgetHTMLObj.parentNode, 'kwidgettype', 'ScrollBox');
                }
				scrollerInstance = scrollBox ? $KG[scrollBox.id + "_scroller"] : ($KG["__currentForm"] ? $KG[$KG["__currentForm"].id + "_scroller"] : "");
			}	
			
			if(scrollerInstance)
				scrollerInstance.scrollToElement(widgetHTMLObj, 1000);	// 1s
		}
		else
		{
			// uses window.scrollTo
			$KW.Utils.scrollToElement(widgetHTMLObj, 1000); // 1s
		}
    },

	// Gesture APIs
	setgesturerecognizer: function(widgetModel, gestureType, gestureObj, callback)
	{
		if(!widgetModel)
			return null;
			
		$KW.Widget.removegesturerecognizer(widgetModel, gestureType);
		$KW.Utils.updateModelWithGesture(widgetModel, gestureType, gestureObj, callback);
		return (new $KW.touch.gesture(widgetModel, gestureType, gestureObj, callback)).gestureIdentifier;
	},

	removegesturerecognizer: function(widgetModel, gestureType)
	{
		if(typeof(gestureType) === "string") {
			var gestureIdentifier = ($KG.gestures && $KG.gestures[gestureType]) ? $KG.gestures[gestureType] : null;
			if(!gestureIdentifier) return;
			var identifier = gestureType;
			widgetModel = gestureIdentifier.widgetModel;
			gestureType = gestureIdentifier.gestureType;
			delete $KG.gestures[identifier];
		}

		if(!widgetModel)
			return;
		
        if(gestureType == constants.GESTURE_TYPE_TAP)
		{
			// Remove both single tap and double tap gestures
			$KW.Utils.removegesture(widgetModel, 10);
			$KW.Utils.removegesture(widgetModel, 11);
		}
		else
			$KW.Utils.removegesture(widgetModel, gestureType);
	},

	addgesturerecognizerforallforms: function(gestureType, gestureObj, callback)
	{
		$KW.Widget.removegesturerecognizerforallforms(gestureType);
		$KW.Utils.updateModelWithGesture("", gestureType, gestureObj, callback);
		return (new $KW.touch.gesture("", gestureType, gestureObj, callback)).gestureIdentifier;
	},

	removegesturerecognizerforallforms: function(gestureType)
	{
		if(typeof gestureType == "string") {
			var gestureIdentifier = ($KG.gestures && $KG.gestures[gestureType]) ? $KG.gestures[gestureType] : null;
			if(!gestureIdentifier) return;
			var identifier = gestureType;
			gestureType = gestureIdentifier.gestureType;
			delete $KG.gestures[identifier];
		}
		$KW.Widget.removegesturerecognizer($KG, gestureType);
	},
	
    /*Internal API, added to test Layout Engine.*/
    getPreferredSize: function(widgetModel, conf){
        var preferredSize = {width:0, height:0};
        var element = $KW.Utils.getWidgetNode(widgetModel);
        if(element && conf){
			preferredSize.width = this.getPreferredWidth(widgetModel, element, conf.width);
            preferredSize.height = this.getPreferredHeight(widgetModel, element, conf.height);
			var wrapper = element.parentNode;
			wrapper.style.maxWidth = wrapper.style.maxHeight = '';
        }
        return preferredSize;
    },
	
	getPreferredWidth: function(widgetModel, element, maxWidth){
		var wrapper = element.parentNode;
		var node;
		
		if(widgetModel.wType == 'Label')
			node = element.childNodes[0];
		else 
			node = element;
		
		var defaultWidth = $KW.Utils.getDefaultWidth(widgetModel);
		wrapper.style.width = defaultWidth ? defaultWidth : 'auto';
		element.style.width = '100%';
		
		if(maxWidth == Number.MAX_VALUE)
			wrapper.style.maxWidth = '';
		else	
			wrapper.style.maxWidth = maxWidth + 'px';
		
		if(wrapper.style.width == 'auto'){
			node.style.whiteSpace = 'nowrap';
			node.style.whiteSpace = (wrapper.offsetWidth >= maxWidth) ? 'pre-wrap' : 'nowrap';
		}
		return wrapper.offsetWidth;
	},
	
	getPreferredHeight: function(widgetModel, element, maxHeight){
		var wrapper = element.parentNode;
		var defaultHeight = $KW.Utils.getDefaultHeight(widgetModel);			
		wrapper.style.height = defaultHeight ? defaultHeight : "auto";
		if(widgetModel.wType != 'Switch')
			element.style.height = '100%';
		
		if(widgetModel.wType == 'Image')
			element.childNodes[0].style.height = element.childNodes[0].style.width = 'auto';
			
		if(maxHeight == Number.MAX_VALUE)
			wrapper.style.maxHeight = '';
		else
			wrapper.style.maxHeight = maxHeight + "px";
		
		return wrapper.offsetHeight;
	},	

	convertPointToWidget: function(containerModel, point, toWidget){ 		
		var x = $KW.FlexLayoutEngine.toPointwidget(toWidget, containerModel, point.x, "x");
		var y = $KW.FlexLayoutEngine.toPointwidget(toWidget, containerModel, point.y, "y");
		
		return {"x": x.value+x.unit, "y": y.value+y.unit};
	},
	
	convertPointFromWidget: function(containerModel, point, fromWidget){
		var x = $KW.FlexLayoutEngine.toPointwidget(containerModel, fromWidget, point.x, "x");
		var y = $KW.FlexLayoutEngine.toPointwidget(containerModel, fromWidget, point.y, "y");
		
		return {"x": x.value+x.unit, "y": y.value+y.unit};
	}		
}

/**
 * Holds a list of skin functions that provide the following information.
 *
 * 1. provide the margin skin class
 *
 * 2. provide the padding skin class
 *
 * 3. provide the container weight skin class (after deducting the margins/padding)
 *
 * 4. provide the combined skin list string.
 *
 */
$KW.skins =
{
	

	//It prepares the widget inline base style
	getBaseStyle : function (widgetModel, context)
	{
		var style = "";
		if(widgetModel.backgroundColor) {		
			var validate = $KW.skins.validateHexValue(widgetModel.backgroundColor);
			if(validate) {
				style += "background : " +$KW.skins.convertHexValuetoRGBA(widgetModel.backgroundColor)+ "; ";
			}				
		}
		if(widgetModel.borderColor) {		
			var validate = $KW.skins.validateHexValue(widgetModel.borderColor);
			if(validate) {
				style += "border-color : " +$KW.skins.convertHexValuetoRGBA(widgetModel.borderColor)+ "; ";
			}				
		}

		if(widgetModel.borderWidth)	{
			style += "border-width : " +widgetModel.borderWidth + "px; ";
		}
		
		if(widgetModel.cornerRadius)	{
			style += "border-radius : " +widgetModel.cornerRadius + "px; ";
		}
		if(widgetModel.wType != "DataGrid" )
			style += $KW.skins.getMarginSkin(widgetModel, context);

		if(widgetModel.wType != "Browser" && widgetModel.wType != "Segment" && widgetModel.wType != "FlexContainer" &&  widgetModel.wType != "FlexScrollContainer")
			style += $KW.skins.getPaddingSkin(widgetModel);
		
		return style;
	},	
	
	//Concatenates the margin information provided by the developer and create the margin class as kmg   
    getMarginSkin: function(widgetModel, context)
	{
		if($KU.isFlexWidget(widgetModel))
			return "";
		context = context || {};	
        
		var parentmodel = widgetModel.parent;
		var margin = widgetModel.margin;
		
		if($KG.appbehaviors && $KG.appbehaviors["applyMarginPaddingInBCGMode"] == true)
        {	
			if($KU.isArray(margin))
				return "margin:" + $KU.joinArray(margin, "% ") + "%;";
			else
				return "margin:0;";		
        }
		else {	
			if((!parentmodel || (parentmodel.wType=="HBox" && context.ispercent == false)) || (parentmodel.wType !="HBox" && !( parentmodel.wType =="ScrollBox" && parentmodel.orientation == constants.BOX_LAYOUT_HORIZONTAL))) {
				if($KU.isArray(margin))
					return "margin:" + $KU.joinArray(margin, "% ") + "%;";
				else
					return "margin:0;";
			}
			else
				return "";
		}
    },
 
/**
 * 
 *  This is a special function that returns the child models margin as a padding which is added to the container widget's cell. 
 *	The reason for this conversion are two fold:
 *
 *   1. There are some widgets which do not apply margin when provided directly at the widget level.
 *   2. To maintain parity between the native platforms & SPA
 *   The problem with this approach is there is technical diffrence in the amount of margin that is applied to a widget 
 *
 */
 
 /* 
	 widgetModel : Model of the widget
	 parentModel : Parent of the widget
	 totalWt : total weight of the children inside the parent widget
 */
    getChildMarginAsPaddingSkin: function(widgetModel){
        var parentmodel = $KU.getParentModel(widgetModel);
        if(($KG.appbehaviors["applyMarginPaddingInBCGMode"] == true))
            return "";
        var margin = widgetModel.margin;
		var i=0;
		/*
			when widgets are placed inside horizontal scrollbox and total weight 
			of the children inside scrollbox becomes more than 100, then the padding applied is 
			wrt total weight whereas it should be calculated according to view port area i.e 100
		*/
		if($KU.isArray(margin) && parentmodel && parentmodel.wType =="ScrollBox" && parentmodel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
		{
			var totalWt=parentmodel.totalWt;
			while(i<4)
			{
				margin[i]=totalWt && (margin[i]*100)/totalWt;
				i++;
			}
			return "padding:" + $KU.joinArray(margin, "% ") + "%;";
		}
        if ($KU.isArray(margin))
            return "padding:" + $KU.joinArray(margin, "% ") + "%;";
        else
            return "";
    },
	
	
    /**
     * Concatenates the margin information provided by the developer and create the margin class as kmg
     */
    getPaddingSkin: function(widgetModel){
	
		if(widgetModel.wType == 'FlexContainer' || widgetModel.wType == 'FlexScrollContainer' || (widgetModel.wType == 'Form' && widgetModel.layouttype != kony.flex.VBOX_LAYOUT) || $KU.isFlexWidget(widgetModel))
    		return "";

    		if(widgetModel.wType == 'ListBox' || widgetModel.wType == 'ComboBox' )
    			return "padding:0% ";
		
		var parentmodel = widgetModel.parent;
		var padding = widgetModel.padding;
		var margin = widgetModel.margin;
		/* 
		 	parentlevelpadging: if parentlevelpadding is true, we calculate widget padding w.r.t to parent width other wise we return widget padding
		*/
		if((typeof ($KG.appbehaviors["parentLevelPadding"]) == 'undefined' || $KG.appbehaviors["parentLevelPadding"] == true) && $KG.appbehaviors["applyMarginPaddingInBCGMode"] == false && parentmodel != null && parentmodel.wType == "HBox"&& parentmodel.percent == true)
		{			
			if(padding && $KU.isArray(padding) && margin && $KU.isArray(margin)) {
				var excesspadding = 100/(widgetModel.containerweight-(parseInt(margin[0 + IndexJL]) + parseInt(margin[2 + IndexJL])));
				var x = [];
				var y = widgetModel.padding;
				for(var i=0; i < y.length; i++)
				{
					x[i] = y[i]*excesspadding;
				}
				return "padding:" + $KU.joinArray(x, "% ") + "%;";			
			}				
		}		
		else 
		{
	        if($KU.isArray(padding))
	            return "padding:" + $KU.joinArray(padding, "% ") + "%;";
	        else
	            return "padding:0%;";	        
		}
    },
	
	setMarginPadding: function(element, propertyName, widgetModel, propertyValue, referenceCWt) {
		var element = $KW.Utils.getWidgetNode(widgetModel);
		if(element) {
			if(element){
				if(typeof referenceCWt != "number") 
					referenceCWt = 100;
				var kwidth = $KW.skins.getMarPadAdjustedContainerWeightSkin(widgetModel, referenceCWt);
				element.className = element.className.replace(/\kwt/g, '_');

				$KU.addClassName(element, kwidth);
				element.style[propertyName] = $KU.joinArray(propertyValue, "% ") + "%";
			}
		}
	},

    /**
     * Provides the container weight skin. This skin depending on the widgets reduces the margin and paddings
     * from the over all container wieght assigned to the widget.
     *
     */
    getMarAdjustedContainerWeightSkin: function(widgetModel, referenceCWt){

        var cwt = referenceCWt || ((widgetModel.wType == "HBox") ? "100" : widgetModel.containerweight);		
        if (cwt) {
            var margin = widgetModel.margin;
            if (margin) {
                cwt -= (parseInt(margin[0 + IndexJL]) + parseInt(margin[2 + IndexJL]));                
            }
            if(cwt>100 && $KG["cwtexists"].indexOf(cwt)==-1)
			{
                $KG["cwtexists"].push(cwt);                
                var styleSheetObjs = window.document.styleSheets;
                var konyStyleSheetIndex = $KW.Utils.getKonyStyleSheetIndex(styleSheetObjs);
                if (konyStyleSheetIndex != -1) {
                    var styleSheetObj = styleSheetObjs[konyStyleSheetIndex];
                    var rules = styleSheetObj.cssRules || styleSheetObj.rules;
                    if(styleSheetObj.insertRule)
                        styleSheetObj.insertRule(".kwt"+cwt+"{width:"+cwt+"%;}", rules.length);
                    else
                        styleSheetObj.addRule(".kwt"+cwt,"width:"+cwt+"%;");
                } 
            }
            return "kwt" + cwt;
            
        }
        else 
            return "kwt100";
    },


    /**
     * Provides the container weight skin. This skin depending on the widgets reduces the margin and paddings
     * from the over all container wieght assigned to the widget.
     *
     */
    getMarPadAdjustedContainerWeightSkin: function(widgetModel, referenceCWt){

        var cwt = referenceCWt || widgetModel.containerweight;

        if (cwt) {
			try{
				var margin = widgetModel.margin;
				if (margin) {
					cwt -= (parseInt(margin[0 + IndexJL]) + parseInt(margin[2 + IndexJL]));
				}
				return "kwt" + cwt;
			}
			catch(e){
				console.error("Error occured in getting container weight " + e);
			}
        }
        else 
            return "kwt100";
        
    },
	
     /**
     * Provides the container weight skin. This skin depending on the widgets reduces the margin and paddings
     * from the over all container weight assigned to the widget.
     *
     */
    getWidgetSkin: function(widgetModel, context){
		var skin;
		if(context && context.container){
			var data = context.container.widgetsData;
			var wData = data[widgetModel.id];			
			if(wData && wData.skin)
				skin =  wData.skin;
		}
        return skin || widgetModel.skin || this.getDefaultSkin(widgetModel) || "";
    },
	
	getDefaultSkin: function(widgetModel)
	{
		var skin = "";
		
		if(widgetModel.wType == "Link" || widgetModel.wType == "Label" || widgetModel.wType == "Button" || widgetModel.wType == "DataGrid" || widgetModel.wType == "RichText" || widgetModel.wType == "CheckBoxGroup" || widgetModel.wType == "RadioButtonGroup" || widgetModel.wType == "ComboBox" || widgetModel.wType == "ListBox" || widgetModel.wType == "Switch")
			skin = 'konycustomcss';		
		return skin;
	},
	
    /**
     * Get the list of widget skins
     *
     */
     getWidgetSkinList: function(widgetModel, context, data){
	 
		var skins = [];
		context = context || {};
		
		//When tab is FlexConatiner, don't add skin flex node as it is already added to tab body
		if(!(widgetModel.wType == 'FlexContainer' && widgetModel.parent && widgetModel.parent.wType == "TabPane")) {
			skins.push(this.getWidgetWeight(widgetModel, context));
			skins.push(this.getWidgetSkin(widgetModel, context));
		}
		
		skins.push(this.getWidgetSelectionSkin(widgetModel));
		
		var isFlexWidget = $KU.isFlexWidget(widgetModel);
        if (!isFlexWidget && (!$KW.Utils.isWidgetVisible(widgetModel, context) || (data && data.length <= IndexJL))) //Hide the entire widget (i.e. checkbox, radio etc) if there is no data
            skins.push("hide");
        return skins.join(" ");
    },
	
	getVisibilitySkin: function(wModel){
		var isFlexWidget = $KU.isFlexWidget(wModel);
		return (!isFlexWidget && !wModel.isvisible) ? ' hide ' : '';
	},
	
	getWidgetWeight: function(widgetModel, context){
	
		var	parentmodel = widgetModel.parent;
		if(parentmodel && ((parentmodel.wType == "HBox" || parentmodel.wType == 'ScrollBox') && parentmodel.percent == false) || $KU.isFlexWidget(widgetModel))
			return "";
		
		//Margins set to the widget will not have any effect when the widgets placed inside Flex container
		//TODO: When width is not set, should go by preferred width in flexcontainer
		
		if(parentmodel && ($KG.appbehaviors && $KG.appbehaviors["applyMarginPaddingInBCGMode"] == false && parentmodel.wType == "HBox")){	
			return "kwt100";
		}
		else {
			return this.getMarAdjustedContainerWeightSkin(widgetModel, 100);
		}
		
		/*if (widgetModel.wType == "TextField" || widgetModel.wType == "HBox" || widgetModel.wType == "VBox" || widgetModel.wType == "Label" || widgetModel.wType == "Link" || widgetModel.wType == "TextArea") {
			if (!((widgetModel.wType == "TextField" || widgetModel.wType == "TextArea" || widgetModel.wType == "Label" || widgetModel.wType == "Link") && context && context.ispercent === false)) 
				skins.push(this.getMarPadAdjustedContainerWeightSkin(widgetModel, 100));
		}
		else {
			if (!(context && context.ispercent === false)) 
				skins.push(this.getMarAdjustedContainerWeightSkin(widgetModel, 100));
		}*/		
	},
	
	getWidgetSelectionSkin: function(widgetModel){
		if(widgetModel.wType == "Label" || widgetModel.wType == "Button" || widgetModel.wType == "Line" || widgetModel.wType == "Link" || widgetModel.wType == "Switch" || widgetModel.wType == "ListBox" || widgetModel.wType == "CheckBoxGroup" || widgetModel.wType == "ComboBox" ||  widgetModel.wType == "RadioButtonGroup" || widgetModel.wType == "Calendar")
		{
			return (widgetModel.wType == "Label" && widgetModel.textCopyable) ? "enableSelection" : "disableSelection";
		}
		return "";
	},

    getSplitSkinsBetweenWidgetAndParentDiv : function(widgetModel, context)
    {

        var splitSkins = new Array();
        var marginSkin = "";//this.getMarginSkin(widgetModel);
        var paddingSkin = "";//this.getPaddingSkin(widgetModel);
        var weightSkin = "";
        if (widgetModel.wType == "HBox" || widgetModel.wType == "VBox")
        {
            weightSkin =this.getMarPadAdjustedContainerWeightSkin(widgetModel, 100)
        }
        else
        {
            weightSkin = this.getMarAdjustedContainerWeightSkin(widgetModel, 100);
        }
        var widgetSkin = this.getWidgetSkin(widgetModel, context);        
        splitSkins[0] = marginSkin + " " + paddingSkin + " " + " " + widgetSkin + " ";        
        splitSkins[1] = weightSkin;        
        splitSkins[2] = marginSkin + " " + paddingSkin + " " + " " + widgetSkin + " " + weightSkin;
		        
        return splitSkins;
    },
	
    getWidgetAlignmentSkin : function(widgetModel){	
        var alignment = (widgetModel.wType == "IGallery" ? "middleleftalign" : "middlecenteralign");
        if (widgetModel.wType == "HBox"||  widgetModel.wType == "ScrollBox") {
            return this.getBoxAlignment(widgetModel);
        }
        return this.getAlignment(widgetModel.widgetalign || widgetModel.widgetalignment) || alignment;
    },
	
	getAlignment: function(align){
		switch (parseInt(align)) {
			case 1:
				return "topleftalign";
			
			case 2:
				return "topcenteralign";
				
			case 3:
				return "toprightalign";
			
			case 4:
				return "middleleftalign";
			
			case 5:
				return "middlecenteralign";
				
			case 6:
				return "middlerightalign";
			
			case 7:
				return "bottomleftalign";
			
			case 8:
				return "bottomcenteralign";
			
			case 9:
				return "bottomrightalign";
        }
		return "";
	},
	
	getContentAlignment: function(widgetModel, align){
		var align = align || widgetModel.contentalignment;
		if(widgetModel.wType == "DataGrid"){
			return this.getAlignment(align);
		}
		switch (parseInt(align)) {
			case 1:
			case 4:
			case 7:
				return "left";
			
			case 2:
			case 5:
			case 8:
				return "center";
				
			case 3:
			case 6:
			case 9:
				return "right";
        }
		return "left"; //default
	},
   
    getBoxAlignment: function(widgetModel){
        var widgetlayoutdirection = "middlecenteralign";
        //added below snippet for JSPFQA9069, default alignment for scrollbox is left.
		/*if(widgetModel.wType == "ScrollBox")
			widgetlayoutdirection = "middleleftalign";        
		*/
		if(widgetModel.wType == "VBox"){
		    switch (parseInt(widgetModel.widgetdirection)) {
				case 0:
			   	    widgetlayoutdirection = "topcenteralign";
				    break;
				case 1:
				    widgetlayoutdirection = "middlecenteralign";
				    break;
				case 2:
				    widgetlayoutdirection = "bottomcenteralign";
				    break;
			 }
		} else {
	          switch (parseInt(widgetModel.widgetdirection)) {
		     	case constants.BOX_LAYOUT_ALIGN_FROM_LEFT:
	                widgetlayoutdirection = "middleleftalign";
	                break;
		     	case constants.BOX_LAYOUT_ALIGN_FROM_CENTER:
	                widgetlayoutdirection = "middlecenteralign";
	                break;
		     	case constants.BOX_LAYOUT_ALIGN_FROM_RIGHT:
	                widgetlayoutdirection = "middlerightalign";
	                break;
	          }
		}
        return widgetlayoutdirection;
    },

	validateHexValue : function (value) {
	
		return (/(^[0-9A-F]{8}$)|(^[0-9A-F]{6}$)/i.test(value));
	},
	
	
	convertHexValuetoRGBA : function (value) {
	
		var	r = value.charAt(0) +  value.charAt(1);
		var	g = value.charAt(2) + value.charAt(3);
		var	b = value.charAt(4) + value.charAt(5);
		var a =0;
		if(value.length >6 && value.length <=8)
			a = value.charAt(6) + value.charAt(7);
			
		r = parseInt( r, 16);
		g = parseInt( g, 16);
		b = parseInt( b ,16);
		a = ((100 - parseInt( a ,16))/100).toFixed(2);
		return "rgba(" + r + "," + g + "," + b + "," + a +")";	
	}
}


$KW.Utils = {
    getBaseHtml: function(widgetModel, context, type, accessObj, rowIndex) {
		
		var id = type ? widgetModel.id : (widgetModel.pf + "_" + widgetModel.id);
		
        
        var tabpaneID = context.tabpaneID || "";
        var containerID = (context.container && context.container.id) || "";
        var toolTip = widgetModel.tooltip || "";
        var isDisabled = this.isWidgetDisabled(widgetModel, context) || false;
        if(containerID && (widgetModel.wType == 'Calendar')){
            id = id + "_" + context.container.counter;
        }
        if(tabpaneID) 
			widgetModel.tabpaneId = tabpaneID;
        if(containerID) 
			widgetModel.containerId = containerID;
        var disable = isDisabled ? (" kdisabled='true' " + ((widgetModel.wType != "Image" && widgetModel.wType != "HBox" && widgetModel.wType != "VBox" && widgetModel.wType != "Link" && widgetModel.wType != "Label") ? "disabled=" + isDisabled : "")) : "";
        var contextmenu = widgetModel.contextmenu || "";
		
		
		//Adding aria-label attribute to customize the content during voice over.
		
		
		var accessAttr = "";
		if(widgetModel.wType != "Link" && widgetModel.wType != "Label" && widgetModel.wType != "ScrollBox" && widgetModel.wType != "RadioButtonGroup" && widgetModel.wType != "CheckBoxGroup")
			accessAttr = $KU.getAccessibilityValues(widgetModel, accessObj, null, rowIndex);
		
		//Removing accessibility for containerWidgets parent level, when hidden is set. This is to make child elements accessible when hidden is set true for parent(only for containerWidgets).	
		if((widgetModel.wType=="HBox" || widgetModel.wType=="Segment" || widgetModel.wType=="VBox" || widgetModel.wType=="HStrip") && (accessAttr.indexOf("aria-hidden"))>0){
			accessAttr = "";
		}	
		
		return accessAttr + " id='" + id   + "' kwidgettype='" + widgetModel.wType + "' kformname='" + widgetModel.pf + "'" + (tabpaneID && " ktabpaneid='" + tabpaneID + "'") + (containerID && " kcontainerID = '" + containerID + "'") +  disable + (toolTip ? " title= '" +  toolTip + "'": "") + " ";
		
    },

    isWidgetDisabled: function(wModel, context){		
		if(context && context.container && context.container.widgetsData)
			return this.isContainerWidgetDisabled(wModel, context);
		if(wModel.disabled)
			return true;
		var formId = wModel.pf;
		var pModel = wModel.parent;
		while(pModel) {
			if (pModel.disabled || (formId == (pModel.parent && pModel.parent.id))) {
				return pModel.disabled;
			}
			pModel = pModel.parent;
		}
	},
	
	isContainerWidgetDisabled: function(wModel, context){
	
		var data = context.container.widgetsData;
		var wData = data[wModel.id];			
		if(wData && wData.enable != undefined && wData.enable == false)
			return true;
		var formId = wModel.pf;
		var pData, pDisabled;
		var pModel = wModel.parent;
		while(pModel) {
			pData = data[pModel.id];
			pDisabled = (pData && pData.enable != undefined && pData.enable == false);
			if (pDisabled || (context.container.id == pModel.id)) {
					return pDisabled;
			}
			pModel = pModel.parent;
		}
	},	    
	
	isWidgetVisible: function(wModel, context){
		if( context && context.container && context.container.widgetsData){
			var data = context.container.widgetsData;
			var wData = data[wModel.id];
			if(wData)
				return (wData.visible != undefined ? wData.visible : wModel.isvisible);
		}
		return wModel.isvisible;
	},
	
	//initialize new widgets which are added to a container (like form, box , scrollbox, tab..) after form is rendered.
	initializeNewWidgets: function(wArray){
	
		/*var pf = wArray.length > 0 && wArray[0].pf;
		var topContainer = pf && window[pf];
		var popup = pf && $KU.getElementById(pf);
		var cForm = $KG["__currentForm"];
		if(pf && cForm && ((topContainer.wType == "Form" && cForm.id == topContainer.id) || 
						   (topContainer.isheader && ($KU.inArray(cForm.headers, topContainer) || $KU.inArray(cForm.foooters, topContainer))) || 
						   (topContainer.wType == "Popup" && popup))){*/
		
		if(wArray && wArray.length > 0){		
			for(var i=0; i < wArray.length; i++) {
				var widgetModel = wArray[i];				
				var wType = widgetModel.wType;				
				switch(wType) {        
					case "Segment":
						var segment = $KU.getNodeByModel(widgetModel);
						if(segment){
							if(widgetModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW){
								$KG[segment.id] = new $KW.touch.pageviewScroller(segment, {widgetModel : widgetModel});
								$KW.touch.computeWidths(segment, widgetModel);
							}
							if(widgetModel.screenLevelWidget || widgetModel.needScroller){
								var pNode = segment.parentNode.parentNode;
								$KW.Scroller.initialize([pNode], "Segment");								
							}
						}
						break;
						
					case "HStrip":
						var strip = $KU.getNodeByModel(widgetModel);
						if(widgetModel.viewtype == constants.HORIZONTAL_IMAGESTRIP_VIEW_TYPE_STRIPVIEW){						
							$KW.HStrip.initializeStripView(strip);
						}
						if(widgetModel.viewtype == constants.HORIZONTAL_IMAGESTRIP_VIEW_TYPE_PAGEVIEW){						
							$KG[strip.id] = new $KW.touch.pageviewScroller(strip, {widgetModel : widgetModel});
							$KW.HStrip.initializePageView(widgetModel, false, strip);
							$KW.touch.computeWidths(strip, widgetModel);
						}
						if(widgetModel.viewtype == constants.HORIZONTAL_IMAGESTRIP_VIEW_TYPE_SLOTVIEW){						
							$KW.HStrip.initializeSlotView(widgetModel);
						}
						break;
						
					case "ScrollBox":
						var scrollBox = $KU.getNodeByModel(widgetModel);
						var pNode = scrollBox.parentNode.parentNode;
						$KW.Scroller.initialize([pNode], "ScrollBox");
						$KU.setScrollHeight(widgetModel, scrollBox);
						break;
						
					case "FlexScrollContainer":
						var scrollBox = $KU.getNodeByModel(widgetModel);
						var pNode = scrollBox.parentNode.parentNode;
						$KW.Scroller.initialize([pNode], "FlexScrollContainer");
                        $KW.FlexScrollContainer.forceLayout(widgetModel,$KU.getNodeByModel(widgetModel));
						break;	
						
					case "Slider":
						var slider = $KU.getNodeByModel(widgetModel);
						$KW.Slider.attachSliderEvents(slider.childNodes[0]);
						kony.events.addEventListener(slider.parentNode, "click", $KW.Slider.slideClick);
						break;
						
					case "Switch":
						var switchNode = $KU.getNodeByModel(widgetModel);
						$KW.Switch.adjustWidth(widgetModel, switchNode, true);
						$KW.Switch.adjustHeight(widgetModel, switchNode);
						break;	
					
					/*case "TextField":
						if($KU.isAndroid && (widgetModel.mode == constants.TEXTBOX_INPUT_MODE_PASSWORD || widgetModel.securetextentry) && !$KG.relativeScroll){
							new MaskedPassword($KU.getNodeByModel(widgetModel), '\u25CF');
						} 
						break; */
					
					case "Video":					
						if($KU.isAndroid){
							var video = $KU.getNodeByModel(widgetModel);
							kony.events.addEventListener(video, 'click', function(event){
								event = event || window.event;
								event.srcElement.play();
							}, false);
						}
						break
						
					case "TabPane":
						var tabPane = $KU.getNodeByModel(widgetModel);
						tabPane && $KW.TabPane.setTabsHeight(tabPane.id);
						if(widgetModel.needScroller){
							var pNode = tabPane.parentNode.parentNode;
							$KW.Scroller.initialize([pNode], "TabPane");								
						}
						break

                    case "Map":
                        $KW.Map.loadMapScripts();
                        $KW.Map.setUpInteractiveCanvasMap();
                        break
                }
				
				if(widgetModel.ownchildrenref){
					this.initializeNewWidgets(widgetModel.ownchildrenref);
                    //Added to support gesture and touch events for dynamically widgets to form already rendered.
                    $KW.Utils.initializeGestures(widgetModel);
				}				
                //Added to support gesture and touch events for dynamically widgets to form already rendered.
                $KW.Utils.initializeGestures({'newwidget': widgetModel});
			}
		}
		//}	
	},
	
	//reinitialize widgets in a container if the container widget is made visible thru code.
	reinitializeWidgets: function(containerModel){
	
		var wArray = containerModel.ownchildrenref;
		for(var i=0; i < wArray.length; i++) {
			var widgetModel = wArray[i];				
			var wType = widgetModel.wType;				
			switch(wType) {        
				case "ScrollBox":
					var scrollBox = $KU.getNodeByModel(widgetModel);
					$KW["ScrollBox"]["updateView"](widgetModel,  "totalWt" , widgetModel.totalWt);				
					$KU.setScrollHeight(widgetModel, scrollBox);
					break;
					
				case "Slider":
					var slider = $KU.getNodeByModel(widgetModel);
					$KW.Slider.imgLoad(slider.childNodes[0]);
					//$KW.Slider && $KW.Slider.initializeView(widgetModel.pf);
					break;
					
				case "Calendar":
					var calendar = $KU.getNodeByModel(widgetModel);
					$KW.Calendar.setCalElementStyle(calendar.childNodes[0], true);
					break;

				case "Switch":
					var element = $KU.getNodeByModel(widgetModel);
					$KW.Switch.adjustWidth(widgetModel, element, false);
					$KW.Switch.adjustHeight(widgetModel, element);
					break;
				
				
				case "FlexContainer":
					$KW.FlexContainer.forceLayout(widgetModel);
					break;
					
                case "FlexScrollContainer":
                    $KW.FlexScrollContainer.forceLayout(widgetModel,$KU.getNodeByModel(widgetModel));
                    break;
			}
			
			if(widgetModel.ownchildrenref){
				this.reinitializeWidgets(widgetModel);					
			}				
		}
	},

	//resize the map whenever the setvisibility property is changed dynamically
	resizeMap: function(wModel){					
		var map = document.querySelector("#" + wModel.pf + " div[tpwidgettype='googlemap']");
		if(map){
 				var mapModel = $KU.getModelByNode(map);
 				if(mapModel.mapSource == "non-native")
 				google.maps.event.trigger($KW.Map.map, 'resize'); 
			} 				
  	},
		
	updateContent: function(widgetModel, property, dataArray, action, index, secIndex) {
		//Segment with sections
		var widgetData = widgetModel[property];

        if (widgetModel.wType == "Segment" && widgetModel.hasSections && widgetData && !["setdata","removeall"].contains(action)){
        	$KW.Segment.updateSectionContent(widgetData, dataArray, action, index, secIndex);
			return;
        }
		
        switch (action) {
            case "setdata":
                widgetModel.canUpdateUI = false;
                widgetModel[property] = dataArray;
                widgetModel.canUpdateUI = true;
                break;
                
            case "setdataat":
                 widgetModel[property] && widgetModel[property].length > index && widgetModel[property].splice(index, 1, dataArray);
                break;
                
            case "addall":
                var fillarray = IndexJL ? [null] : [];
				var newDataArray;
                widgetModel.canUpdateUI = false
				widgetModel[property] = widgetModel[property] || fillarray;
				
				// lua dataArray comes with a leading null
				// can't clone a template
				if(IndexJL && !dataArray[0] && (dataArray[1] && !dataArray[1].template))
				{
					newDataArray = $KU.cloneObj(dataArray);
					newDataArray.shift();
				}
                widgetModel.canUpdateUI = true
				$KU.addArray(widgetModel[property], newDataArray || dataArray);
                break;
                
            case "addat":
			case "adddataat":
				if(widgetModel[property]){
					var noOfRows = widgetModel[property].length - IndexJL;
					index = (index <= IndexJL) ? IndexJL : (index > noOfRows ? noOfRows + 1 : index);					
					if($KU.isArray(dataArray)){
						for(var i = IndexJL; i < dataArray.length; i++ ){
						  widgetModel[property].splice(index++, 0, dataArray[i]);
						}  
					}
					else {
						if(!widgetModel[property] || widgetModel[property].length <= IndexJL) {
							widgetModel[property] = (IndexJL) ? [null] : [];
							widgetModel[property].push(dataArray);
						} else {
							widgetModel[property].splice(index, 0, dataArray);
						}
					}
				}
                break;
			                
            case "removeall":
                widgetModel.canUpdateUI = false;
                widgetModel[property] = dataArray;
                widgetModel.canUpdateUI = true;
				if (widgetModel.wType == "Segment" && widgetModel.behavior  != "default")
					widgetModel.selectedindices = null;	
                break;
                
            case "removeat":
                (widgetModel[property] && widgetModel[property].length >= index && widgetModel[property][index]) && widgetModel[property].splice(index, 1);
                break;
        }
    },
	
	updateContainerData: function(childModel, childNode, canExecute){
		var row = $KU.getParentByAttribute(childNode, "index");
		if(row){
			var container = row.parentNode.parentNode;
			var containerModel = $KU.getModelByNode(container);	
			$KW[containerModel.wType].updateData(childModel, childNode, containerModel, row, canExecute);			
		}
		else{
			$KW.MenuContainer && $KW.MenuContainer.eventHandler(childModel, childNode);
		}			
	},
	
	
	getContainerModelById: function(node, containerId){
		var cur = node;
		if(containerId){
			var id;
			while (cur) {
				id = cur.id; 
				if(id){
					id = id.substring(id.lastIndexOf("_") + 1);
				}	
				if (id == containerId) {
					break               
				}				
				cur = cur.parentNode;
			}
		}
		return $KU.getModelByNode(cur);
	},

	updateContainerDataInDOM: function(node, containerId){
		var containerModel = $KW.Utils.getContainerModelById(node, containerId);
		if(containerModel){
			if(containerModel.wType == 'Segment'){
				var rowData;
				var row = $KU.getParentByAttribute(node, "index");
				var index = parseInt(row.getAttribute("index"));
				if(containerModel.hasSections){
					var secIndices = row.getAttribute("secindex").split(',');
					var secIndex = parseInt(secIndices[0]);
					var rowIndex = parseInt(secIndices[1]);
					rowData = (rowIndex == -1) ? containerModel.data[secIndex][IndexJL] : containerModel.data[secIndex][IndexJL + 1][rowIndex];
				}
				else
					rowData = containerModel.data[index];
					
				node.dataObj = {data: rowData, map: containerModel.widgetdatamap, containerModel: containerModel};		
			}
		}
	},

	getContainerModelById: function(node, containerId){
		var cur = node;
		if(containerId){
			var id;
			while (cur) {
				id = cur.id; 
				if(id){
					id = id.substring(id.lastIndexOf("_") + 1);
				}	
				if (id == containerId) {
					break               
				}				
				cur = cur.parentNode;
			}
		}
		return $KU.getModelByNode(cur);
	},	
	
	getSegProperty: function(prop)
	{
		var key = $KU.segmentKeyMap[prop];
		return key || prop;
	},
	
    /* data : {text:"Label1", skin:"sk1", focusSkin: "sk2", I18Nkey : "I18NValue"},
     * or
     * data : "Label1" 
     **/
    updateChildModel: function(childModel, data) {
        childModel.canUpdateUI = false;

        if (data instanceof Object) {
			for (var prop in data) 
			{
				var key =  $KW.Utils.getSegProperty(prop).toLowerCase();
				if(key == "disabled")
					childModel[key] = !data[prop];
				else
					childModel[key] = data[prop];
					
                if(childModel.wType == "Image") 
				{
                    if(prop == "base64")
                        childModel.srcType = 2;
                    else if(prop == "src")
                        childModel.srcType = 1;
                }
				if(childModel.wType == "HBox" || childModel.wType == "VBox" ) 
				{
					if(data.isVisible != undefined)
						childModel.isvisible = data.isVisible;
                }
            }
        } else if(childModel.wType != "Image") {//TODO: Maintain widget property map and use it
            childModel.text = data;
        } else {//Image
            childModel.src = data;
            childModel.srcType = 1;
        }
        childModel.canUpdateUI = true;
    },

    /* widgetData : {text:"Label1", skin:"sk1", focusSkin: "sk2", I18Nkey : "I18NValue"},
     * or
     * widgetData : "Label1"
     **/
    updateLayoutData: function(container, layoutModel, data) {
        if(data instanceof Object) {
            for(var ele in data){
                if(ele != 'template' && ele != 'children' && ele != 'metaInfo') {
                    var mapkey = ele;
                    if(container.widgetdatamap) mapkey = kony.utils.getKey(container.widgetdatamap, ele);
                    var tempModel = layoutModel.parent; //In case of lua, refer to the template instead of hbox.  
                    var eleModel = tempModel ? tempModel[mapkey] : layoutModel[mapkey];
                    if(eleModel) {
                        this.updateChildModel(eleModel, data[ele]);
                    }
                }
            }
        }
    },

	setSelectedKeys: function(widgetModel, checked, keys, value){
    
	    var result = $KU.inArray(keys, value);
	    if (checked && !result[0]) {
	        keys.push(value);
	    }
	    else if (result[0]) {
	            keys.splice(result[1], 1);
	    }
	    widgetModel.selectedkeys = keys.length > IndexJL ? keys : null;

	},
	
	/** Masterdata : [["1", "Checkbox1"], ["2", "Checkbox2"], ["3", "Checkbox3"]]
	 *  selectedkeyvalues : [["1", "Checkbox1"], ["2", "Checkbox2"]]
	 *  selectedkeyvalue : ["1", "Radio1"]
	 */
	
    setSelectedValueProperty: function(widgetModel, choices, property, value){
		        
         switch (property) {

            case "selectedkey":                
				var selectedKey = value || widgetModel.selectedkey;
                for (var i = IndexJL; i < (choices.length); i++) {
                    var key = choices[i][IndexJL];  
                    if (selectedKey == key) {
						widgetModel["selectedkeyvalue"] = choices[i]; 
                        break;
                    }
                }
                break;
                
            case "selectedkeys":
                var retVal = [];
				var selectedKeys = value || widgetModel.selectedkeys;
                var flag = false;
                if(IndexJL == 1)   retVal = [null];   //For lua  Array Semantics
                
                for (i = IndexJL; i < (choices.length); i++) {
                    var key = choices[i][IndexJL];
                    if ($KU.inArray(selectedKeys, key)[0]) {
                        retVal.push(choices[i]);
                        flag = true
                    }
                }
                widgetModel["selectedkeyvalues"] = flag ? retVal : null;
                break;
        }
    },
	
	getMasterData: function(widgetModel){
		                  
        var choices = $KU.cloneObj(widgetModel.masterdata);
        if (!choices) {
            var map = widgetModel.masterdatamap;
            if (map) 
                choices = this.convertmap(widgetModel.masterdatamap);
        }
        if (choices) {
            var data;
            if(widgetModel.needsectionheaders){
                var innerChoices;
                for (var i = IndexJL; i < choices.length ; i++) {
                    innerChoices = choices[i][1+IndexJL];
                    for (var j = IndexJL; j < innerChoices.length; j++)
					{
                        if(choices[i][1+IndexJL] && typeof(data) != "number" && choices[i][1+IndexJL].toLowerCase().indexOf("i18n.getlocalizedstring") != -1) 
                            choices[i][1+IndexJL] = $KU.getI18NValue(choices[i][1+IndexJL]);
                    }
                }
            }
            else{
                for (var i = IndexJL; i < choices.length ; i++) 
				{
                    if (choices[i][1+IndexJL] && typeof(choices[i][1+IndexJL]) != "number" && choices[i][1+IndexJL].toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
                        choices[i][1+IndexJL] = $KU.getI18NValue(choices[i][1+IndexJL]);
                }
             }
        }
            return choices || [];
	},
	
	/** map : [[{Abbr:"A",Conti:"Asia"},{Abbr:"E",Conti:"Europe"},{Abbr:"NA",Conti:"North America"}],"Abbr","Conti" ]
	 *  choices : [["A","Asia"],["E","Europe"],["NA","North America"]]
	 */
	convertmap: function(map){
		
        var len = map.length;
        var key = map[len-2];
        var value = map[len-1];
        var innerMap = map[IndexJL]; 
        var choices = [];

        if(IndexJL == 1) //For lua  Array Semantics
            choices = [null];
		
        for (var i = IndexJL; i < (innerMap.length); i++) {
            var key1 = innerMap[i][key];
            var displayValue1 = innerMap[i][value];		
			var accessConfig = innerMap[i]['accessibilityConfig'];
            if (displayValue1 != "" && key1 != ""){ 
                if(IndexJL == 1) //For lua  Array Semantics
                    choices.push([null, key1, displayValue1]);
		else
                    choices.push(accessConfig ? [key1, displayValue1, accessConfig] : [key1, displayValue1]);
            }
        }
		return choices;
	},
	   
    // skin
    updateDOMSkin: function(widgetModel, newSkin, oldSkin)
	{
		var element = $KU.getNodeByModel(widgetModel);
		if(!element)	// element not rendered yet
			return;

		if(widgetModel.wType == "Phone" ){
			var childElement = element.childNodes[0];
			$KU.removeClassName(childElement, oldSkin);
			$KU.addClassName(childElement, newSkin);
		}
		if(widgetModel.wType == "Switch"){
			var switchOnElement = element.childNodes[0];
			var switchOffElement = element.childNodes[2];
			$KU.removeClassName(switchOnElement, oldSkin + 'on');
			$KU.removeClassName(switchOffElement, oldSkin + 'off');
			$KU.addClassName(switchOnElement, newSkin + 'on');
			$KU.addClassName(switchOffElement, newSkin + 'off');
		}
		// ?? Is this required?
		if(widgetModel.wType == "ScrollBox"){
			while(element.parentNode.id != widgetModel.pf +"_" + widgetModel.id + "_parent") {
				element = element.parentNode;
			}
		}
		$KU.removeClassName(element, oldSkin);
		$KU.addClassName(element, newSkin);	
    },
	
	// focusskin
    updateFocusSkin: function(widgetModel, type)
	{
		
        var focusskin = widgetModel[type];
		var focusskin2;
		if(widgetModel.wType === "TabPane")
			focusskin = widgetModel.activefocusskin;
        var classSelector,classSelector2;
		var wID = "#" + widgetModel.pf + "_" + widgetModel.id;
		
        switch (widgetModel.wType) {
            case "TextArea":
            case "RichText":
            case "TextField":
                classSelector = wID;
                break;
            case "RadioButtonGroup":
            case "CheckBoxGroup":
                classSelector = wID + ">div";
                break;
            case "DataGrid":
                classSelector = wID + " tbody tr";
                break;
            case "Segment":
                classSelector = wID + " [index]";
                break;
            case "Calendar":
                classSelector = wID;
                break;
			case "HStrip":
			case "IGallery":
				classSelector = wID + "_img";
				break
			case "TabPane":
				if(widgetModel.viewtype && (widgetModel.viewtype === 'tabview')){
					focusskin = focusskin + "lia";
					focusskin2 = widgetModel.activefocusskin + "li";
					classSelector = wID + "_Header li a";
					classSelector2 = wID + "_Header li";
				}else{
					 classSelector = wID + " div[active]";
				}
                break;
			case "MenuContainer":
				classSelector = wID + " .KMenu li > div";
				break;
			case "Link":
				if(kony.appinit.isIE10) { classSelector = wID + " a" };
				break;
            default:
                classSelector = wID;
        }
		var pseudo = (type == "focusskin" || type == "rowfocusskin") ? ":active" : ":hover";
	
	if( (!$KU.isBlackBerryNTH ) && ( widgetModel.wType == "TextArea"  || widgetModel.wType == "TextField" ))
			pseudo = ":focus";
                    
		classSelector += pseudo;
        this.applyStyle(focusskin, classSelector,widgetModel.wType);

		if(widgetModel.wType == 'MenuContainer') {
		    this.applyStyle(focusskin, wID + " .KMenu li td > div:hover",widgetModel.wType);
			
		}
		if(widgetModel.viewtype && (widgetModel.viewtype == 'tabview')){
			classSelector2 += pseudo;
			this.applyStyle(focusskin2, classSelector2);
		}
		
    },
	
    applyStyle: function(skin, classSelector, wType){
		
        var styleSheetObjs = window.document.styleSheets;
        var konyStyleSheetIndex = this.getKonyStyleSheetIndex(styleSheetObjs);
        if (konyStyleSheetIndex != -1) {
			var styleSheetObj = styleSheetObjs[konyStyleSheetIndex];
            var skinRuleIndex = this.getClassIndex(styleSheetObj, skin, wType);
			this.removeCSSRule(styleSheetObj, classSelector, wType);
            if (skinRuleIndex != -1) { 
				var rules = styleSheetObj.cssRules || styleSheetObj.rules;
                if(styleSheetObj.insertRule)
					styleSheetObj.insertRule(classSelector + "{" + rules.item(skinRuleIndex).style.cssText + "}", rules.length);
				else
					styleSheetObj.addRule(classSelector, rules.item(skinRuleIndex).style.cssText);
            }
            else {
                kony.print("Specified skin: " + skin + " is  not defined in kony.css");
            }
        }
        else {
            kony.print("Style class not found!");
        }
    },
	
	removeCSSRule: function(styleSheetObj, classSelector){
		var elementFocusRuleIndex = this.getClassIndex(styleSheetObj, classSelector);
		// If el rule already present remove it add focus rule, else add (new) focus rule
		if (elementFocusRuleIndex != -1){ 
			if(styleSheetObj.deleteRule)
				styleSheetObj.deleteRule(elementFocusRuleIndex);
			else	
				styleSheetObj.removeRule(elementFocusRuleIndex);
		}
		
	},
	
	getKonyStyleSheetIndex: function(styleObjs){
		var category = $KG["imagecat"];	
        for (var k = 0; k < styleObjs.length; k++) 
		{
            var hrefObj = styleObjs[k].href;
			if (hrefObj && hrefObj.indexOf("kony") != -1 && hrefObj.indexOf("konyspaiphoneretina") == -1) 
			{
				if(category)
				{
					if(hrefObj.match(category.substring(0,  category.length-1) + ".css"))
						return k;
				}
				else
					return k;
            }
        }
        console.warn("SPA Stylesheet could not be loaded");
        return -1;
    },
	
    getClassIndex: function(styleObj, className){
		
        if (className.indexOf("#") == -1) // ID selectors don't begin with .
            className = "." + className;
		var rules = styleObj.cssRules || styleObj.rules;	
        for (var k = 0; k < rules.length; k++) {
            if (rules[k].selectorText == className) {
                return k;
            }
        }
        return -1;
    },
  
    /**
     * Calculates the page height scrolled by the user with respect to the current view port.
     */
    getScrolledHeight : function()
    {
        var isNetScape = (navigator.appName.indexOf("Netscape") != -1);
        var scrolledHeight  = isNetScape ? pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        return scrolledHeight;
    },

    /**
     * Retrieve the current view port height.
     */
    getViewPortHeight : function()
    {
        var isNetScape = (navigator.appName.indexOf("Netscape") != -1);
        var viewportHeight=isNetScape ? innerHeight : document.documentElement && document.documentElement.clientHeight ?document.documentElement.clientHeight : document.body.clientHeight;
        return viewportHeight;
    },

    /**
     *  Retrieve the current view port width.
     */
    getViewPortWidth : function()
    {
        var isNetScape = (navigator.appName.indexOf("Netscape") != -1);
        var viewportWidth = isNetScape ? innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        return viewportWidth;
    },

    /**
     *  This function creates a Blocking UI using the skins specified against the selected element. i.e. the User clicked/selected
     *  widget ID.
     *
     */
    applyBlockUISkin:function(model)
    {
        
        var scrolledHeight = this.getScrolledHeight();
        var viewPortHeight = this.getViewPortHeight();
        var currentViewPortPosition = viewPortHeight + scrolledHeight - 15;
        viewPortHeight = viewPortHeight / 2 + scrolledHeight;
        
        var viewPortWidth = this.getViewPortWidth();
        viewPortWidth = viewPortWidth / 2;
        
        // Creating the block Div Placeholder. This will be added to the Body element so that the user can not perform
        // Any other action.

        var blockUIDivElement = document.createElement("div");
        blockUIDivElement.id = "blurDiv";
        blockUIDivElement.className = model.blockeduiskin;
        
        var height = window.innerHeight;
        var tempHeight = screen.availHeight;
        blockUIDivElement.style.backgroundImage = "none";
        
        // Adding the blocking UI Div placeholder as a child to the body element.
        document.body.appendChild(blockUIDivElement);
        
        var el = $KU.getElementById("blurDiv");
        
        blockUIDivElement.style.backgroundImage = "";
        var progressindicatorposition = $KU.getStyle(el,"font-family");
        var heightofimage = $KU.getStyle(el,"height");
        var widthofimage = $KU.getStyle(el,"width");
        heightofimage = heightofimage.replace("px", "");
        widthofimage = widthofimage.replace("px", "");
        blockUIDivElement.style.width = "100%";
		
		/*
        if (height > tempHeight) // Covering the entire screen for appmenu if the form height is less than view port height
        {
            blockUIDivElement.style.height = height + "px";
        }
        else {
            blockUIDivElement.style.height = tempHeight + "px";
        }
		*/
		
		var scrimHeight;
		if($KG["nativeScroll"])
		{
			// cover the entire portion
			var mainContainerHeight = document.getElementById("__MainContainer").clientHeight;
			if(mainContainerHeight < (window.innerHeight || document.body.clientHeight))
				scrimHeight = (window.innerHeight || document.body.clientHeight) + "px";
			else
				scrimHeight = mainContainerHeight + "px";
		}
		else
			scrimHeight = "100%";
		blockUIDivElement.style.height = scrimHeight;
		
        if (progressindicatorposition == "Helvetica") //For Centering the BlockUI image on top... top center
        {
            el.style.backgroundImage = "";
            if(widthofimage != "auto")
                el.style.backgroundPosition = (viewPortWidth - (widthofimage / 2)) + "px " + (scrolledHeight) + "px";
        }
        else if (progressindicatorposition == "Verdana") //For Centering the BlockUI image on middle... middle center
        {
            if(widthofimage != "auto")
                el.style.backgroundPosition = (viewPortWidth - (widthofimage / 2)) + "px " + (viewPortHeight - (heightofimage / 2)) + "px";
        }
        else //For Centering the BlockUI image on bottom... bottom center
        {
                // viewPortHeight=viewPortHeight*2;
            var yoffsetforbottom = this.getViewPortHeight() + scrolledHeight;
            if(widthofimage != "auto")
                el.style.backgroundPosition = (viewPortWidth - (widthofimage / 2)) + "px " + (yoffsetforbottom - heightofimage) + "px";
        }

    },

    /**
     * Remove the Block UI Skin element if it is placed on the form.
     */
    removeBlockUISkin: function(){
		
        var blockingPlaceHolder = $KU.getElementById("blurDiv");
        blockingPlaceHolder && blockingPlaceHolder.parentNode.removeChild(blockingPlaceHolder);
    },

    setProgressIndicator: function(node, model) {
		var progressdivcontainer = $KU.getElementById("__progressdiv");
    	if(progressdivcontainer)
    	    progressdivcontainer.parentNode.removeChild(progressdivcontainer);
		var konymodel = $KU.getModelByNode(node);
		var skin = (model && model.skin) || (konymodel && konymodel.skin);
    	var progressdiv = document.createElement('div');
		progressdiv.setAttribute('id', '__progressdiv');
		progressdiv.setAttribute("progressindicator", "true");
		progressdiv.setAttribute("progressskin", skin);
    	progressdiv.setAttribute('style','width:'+node.clientWidth+'px'+';height:'+node.clientHeight+'px'+';position:absolute;opacity:0.6;');
    	return progressdiv;
    },

	updateNormalImage: function(model) 
	{
		var node = $KU.getNodeByModel(model);
		if(!node || !model.backgroundimage)
			return;
		
		// get bg style
		var backgroundimage = model.backgroundimage;
		var style = $KW.Utils.getNormalImageStyle(model);
		// lua index starts from 1
		if(backgroundimage.index)
			node = document.querySelectorAll("#" + node.id)[backgroundimage.index-1];
		
		var imagesrc = $KU.getImageURL(backgroundimage.imageurl);
		$KU.imagePreloader(imagesrc,function(node,style) 
		{
			return function(event) 
			{
				event = event || window.event;
				var srcElement = event.target || event.srcElement;
				
				var model = $KU.getModelByNode(node);
				var backgroundimage = model.backgroundimage;
				
				if(event.type == "error")
				{
					if(backgroundimage.imagewhenfailed)
					{
						var imagesrc = $KU.getImageURL(backgroundimage.imagewhenfailed);
						var heightwidth = backgroundimage.heightwidth;
						node.style.background = "url(" + imagesrc + ") no-repeat center center";
						
						if(heightwidth)
						{
							//node.style.width = heightwidth[2] + 'px';
							node.style.height = heightwidth[1] + 'px';
						}
						return;
					}
				}

				node.setAttribute('style', style);
				// Restore display state
				node.style.display = (model.isvisible ? "" : "none");
				
				if(backgroundimage && backgroundimage.maintainaspectratio)
				{
					var naturalHeight = srcElement.naturalHeight || srcElement.height;
					var naturalWidth = srcElement.naturalWidth || srcElement.width;
					var aspectratio = naturalWidth / naturalHeight;
					if(!isNaN(aspectratio))
					{
						node.setAttribute('aspect-ratio', aspectratio);
						var width = node.clientWidth;
						var newHeight = Math.round(1 / aspectratio * width);
						node.style.height = newHeight + 'px';
					}
				}
			}
		}(node,style));
    },

	/*
		- If landscape image is provided, image will scale "without" distortion in portrait mode.		
		- If portrait image is provided, image will scale "with" distortion in landscape mode (aspect ratio is maintained).
		- In case of retina (2x portrait image), 2x effect will be produced in portrait mode. In landscape mode, 1.3x effect can be seen.
		- If maintainaspectratio is not specified, the image remains fixed in size in portrait and landscape modes and will not be scaled.
	*/
    getNormalImageStyle: function(model) 
	{
		var style = '';
		var backgroundimage = model.backgroundimage;
        if(backgroundimage){
		var maintainaspectratio = backgroundimage.maintainaspectratio;
		var heightwidth = backgroundimage.heightwidth;
		var imagesrc = $KU.getImageURL(backgroundimage.imageurl);
		style += 'background-image: url('+imagesrc+'); background-repeat: no-repeat; ';
        }
		if(maintainaspectratio)
			style += 'background-size:contain; ';
		
		if(heightwidth) 
			style += (maintainaspectratio ? '' : ' width:' + heightwidth[2] + 'px;') + 'height:' + heightwidth[1] + 'px;';
		return style;
    },
	
    convertPhoneAlphabetToNumber:function(input){
        var inputlength = input.length;
        input = input.toLowerCase();
        var phonenumber = "";
        for (var i = 0; i < inputlength; i++) {
            var character = input.charAt(i);
            if(phonenumber.length > 10)
                break;
            switch(character) {
                case '0':
                    phonenumber+="0";
                    break;
                case '1':
                    phonenumber+="1";
                    break;
                case '2':
                    phonenumber+="2";
                    break;
                case '3':
                    phonenumber+="3";
                    break;
                case '4':
                    phonenumber+="4";
                    break;
                case '5':
                    phonenumber+="5";
                    break;
                case '6':
                    phonenumber+="6";
                    break;
                case '7':
                    phonenumber+="7";
                    break;
                case '8':
                    phonenumber+="8";
                    break;
                case '9':
                    phonenumber+="9";
                    break;
                /*case '-':
                    phonenumber+="-";
                    break;*/
                case  'a': case 'b': case 'c':
                    phonenumber+="2";
                    break;
                case  'd': case 'e': case 'f':
                    phonenumber+="3";
                    break;
                case  'g': case 'h': case 'i':
                    phonenumber+="4";
                    break;
                case  'j': case 'k': case 'l':
                    phonenumber+="5";
                    break;
                case  'm': case 'n': case 'o':
                    phonenumber+="6";
                    break;
                case  'p': case 'q': case 'r': case 's':
                    phonenumber+="7";
                    break;
                case  't': case 'u': case 'v':
                    phonenumber+="8";
                    break;
                case  'w': case 'x': case 'y': case 'z':
                    phonenumber+="9";
                    break;
            }
        }
        return phonenumber;
    },
	
	// non-scrollable 
	scrollToElement: function(el, duration, startY, stopY)
	{			
		if(stopY == undefined && (el && (el.tagName == "INPUT" || el.tagName == "SELECT" || el.tagName == "TEXTAREA"))){
			try
			{
				el.focus();
			}
			catch(e){}
			return;
		}
		var elemDim = el && el.getBoundingClientRect();	/* Scroll only if the element is not present in the viewport. */		
		if(!(elemDim && elemDim.top >= 0 && elemDim.bottom <= (window.innerHeight || document.documentElement.clientHeight))){
		
			var displacement, start, end, delta, isForward = true;		
			if(!duration) 
				duration = 1000; // 1s
			if(!startY)
				startY = document.body.scrollTop;
			if(!stopY)
				stopY = (el && $KW.Utils.getOffset(el).top) || 0;
		
			start = startY;
			end = stopY;
			displacement = stopY - startY;
			
			if(Math.abs(displacement) < 50)
			{
				window.scrollTo(0, end);
				try
				{
					el && el.focus();
				}
				catch(e){}
				return;
			}
		
			// calculate delta
			delta = Math.round((displacement * 100) / duration);
			if(startY >= stopY)
				isForward = false;
			
			var timerId = setInterval(function(isForward, start, end, delta){
					return function()
					{
						start = start + delta;
							
						// Reached dest
						if((!isForward && start <= end) || (isForward && start >= end))
						{
							window.scrollTo(0, end);
							try
							{
								el && el.focus();
							}
							catch(e){}
							clearInterval(timerId);
							return;
						}
						window.scrollTo(0, start);
					}
			}(isForward, start, end, delta), 100);
		}
	},
	
	
	getOffset: function(el) {
	
		var left = el.offsetLeft,
			top = el.offsetTop;
			
		while (el = el.offsetParent) 
		{
			left += el.offsetLeft;
			top += el.offsetTop;
		}

		return { left: left, top: top };
	},
	
	initializeTemplateGestures: function(){
		if($KG.gestureTemplates){
			for(var i = IndexJL; i < $KG.gestureTemplates.length; i++) {
				window[$KG.gestureTemplates[i]] && $KW.Utils.initializeGestures(window[$KG.gestureTemplates[i]]);
                window[$KG.gestureTemplates[i]] && $KW.Utils.initializeGestures({ "templatebox" : window[$KG.gestureTemplates[i]]});
			}
		}
	},
	
	// Gesture helper funtions
	// widgetModel.gesture = {TAP: {instance: "", params:{}, closure:{}}, SWIPE: {}, LONGPRESS:{}}
	initializeGestures: function(formModel)
	{
		for(var child in formModel)
		{
			var widgetModel = formModel[child];
			if(!widgetModel || typeof widgetModel != "object" || $KU.isArray(widgetModel) || widgetModel.id == formModel.id)
				continue;
			
			// Loop through each child model of the form and add gesture again
			var gestures = widgetModel.gestures;
			if(gestures)
			{
				for(var k in gestures)
				{
					var gesture = gestures[k];
					if(gesture){
						$KW.Utils.removegesture(widgetModel, gesture.gestureType, false);
						new $KW.touch.gesture(widgetModel, gesture.gestureType, gesture.gestureObj, gesture.callback);
					}
				}
			}
			/* Added to support low level touch events on all widgets.*/
            var touches = widgetModel.touches;
            if(touches)
			{
                for(var k in touches)
				{
                    var touch = touches[k];
                    if(touch){
                        $KW.Utils.removetouch(widgetModel, k, false);
                        var element = $KW.Utils.getWidgetNode(widgetModel);                         
                        if(element){
                            /*Added below line for scroller widgets, touch events should be registered on scrollee, instead of scroller/inner widget div. */
                            if(element.id && element.id.indexOf("_scroller") > 0){
                                 element = element.childNodes[0];
                             }
                           widgetModel.touches[k]["instance"] =  new $KW.touch.TouchEvents(widgetModel, element, k,  touch.callback);
                        }
					}
				}
			}
		}
		var formGestures = formModel.gestures;
		if(formGestures)
		{
			for(var k in formGestures)
			{
				var gesture = formGestures[k];
				if(gesture){
					$KW.Utils.removegesture(formModel, gesture.gestureType, false);
					new $KW.touch.gesture(formModel, gesture.gestureType, gesture.gestureObj, gesture.callback);
				}
			}
		}
	},
	
	updateModelWithGesture: function(widgetModel, gestureType, gestureObj, callback)
	{
		// update model
		if(!widgetModel)
			widgetModel = $KG;
		if(!widgetModel.gestures)
			widgetModel.gestures = {};
		var _gestureType = (gestureType == 1 ? (gestureObj.taps == 1 ? 10: 11) : gestureType);
		widgetModel.gestures[_gestureType] = {gestureObj:gestureObj, callback:callback, gestureType:gestureType};
	},
	
	removegesture: function(widgetModel, gestureType, updateModel)
	{
		if(widgetModel.gestures && widgetModel.gestures[gestureType] && widgetModel.gestures[gestureType]["instance"])
			widgetModel.gestures[gestureType]["instance"].removeGesture(gestureType, updateModel);
	},

    
    updateModelWithTouches: function(widgetModel, touchEventType, callback)
    {
        // update model
        if(!widgetModel)
            widgetModel = $KG;
        if(!widgetModel.touches)
            widgetModel.touches = {};
        if(callback)
            widgetModel.touches[touchEventType] = {callback : callback};
        else
            widgetModel.touches[touchEventType] = undefined;
    },

    removetouch: function(widgetModel, touchEventType, updateModel)
    {
        if(widgetModel.touches && widgetModel.touches[touchEventType] && widgetModel.touches[touchEventType]["instance"])
            widgetModel.touches[touchEventType]["instance"].removeTouch(touchEventType, updateModel);
    },



    scrollInterface : (function(){
        var global = this;
        var notSetUp = true;
        var readScroll = {
            scrollLeft:NaN,
            scrollTop:NaN,
            clientHeight:NaN,
            clientWidth:NaN
        };
        var readScrollX = 'scrollLeft';
        var readScrollY = 'scrollTop';
        var readClientH = 'clientHeight';
        var readClientW = 'clientWidth';

        var itrface = {
            getScrollX:function(){
                return readScroll[readScrollX];
            },
            getScrollY:function(){
                return readScroll[readScrollY];
            },
            getClientH:function(){
                return readScroll[readClientH];
            },
            getClientW:function(){
                return readScroll[readClientW];
            }
        };

        function setUp(){
            if(typeof global.pageXOffset == 'number'){
                readScroll = global;
                readScrollY = 'pageYOffset';
                readScrollX = 'pageXOffset';
                readClientH = 'innerHeight';
                readClientW = 'innerWidth';
            }else{
                if((typeof document.compatMode == 'string')&&
                    (document.compatMode.indexOf('CSS') >= 0)&&
                    (document.documentElement)&&
                    (typeof document.documentElement.scrollLeft=='number')){
                    readScroll =  document.documentElement;
                }else if((document.body)&&
                    (typeof document.body.scrollLeft == 'number')){
                    readScroll =  document.body;
                }
            }
            notSetUp = false; //No need to repeat configuration.
        }
        return (function(){
            if(notSetUp){ //If the - notSetUp - variable is still true.
                setUp();  //Execute the - setUp - function.
            }
            return itrface; //returns a reference to - itrface
        });
    })()(),

    handleLayout: function(container, boxModel, layoutData) {
        var context = container.context;
        var tabpaneID = context.tabpaneID; //Save tabpaneID and set back to context once the template is rendered since tabpaneID shouldn't be passed
        context.container = container;
        context.template_generator = boxModel;
        context.tabpaneID = "";
        if(!boxModel.pf) {
            _konyConstNS.Form2.addHeaderorFooter.call(boxModel, boxModel);
        }
        boxModel.isTemplate = true; //This gets used in HBox render method
        var clonedBoxModel = owl.deepCopy(boxModel);
        $KW.Utils.updateLayoutData(container, clonedBoxModel, layoutData);
        context.setTopLevelBox(true);
        var htmlString = $KW[clonedBoxModel.wType].render(clonedBoxModel, context);
        context.setTopLevelBox(false);
        context.tabpaneID = tabpaneID;
        context.container = "";
        context.template_generator = "";
        return htmlString;
    },


    belongsToSegment: function(element) {
        var checkSegment = document.getElementById([element.getAttribute('kformname'),element.getAttribute('kcontainerID')].join('_'));
        return checkSegment && (checkSegment.getAttribute('kwidgettype') == 'Segment');
    },
	
	setScrollWidth: function(widgetModel, element){
		var scroller = (widgetModel.scrollbar == "arrows") ? element.childNodes[1] : element.childNodes[0];

		scroller.style.width = (scroller.clientWidth - parseInt($KU.getStyle(element, "padding-right").replace("px", ""), 10) - parseInt($KU.getStyle(element, "padding-left").replace("px", ""), 10)) + "px";	
		var scrollerInstance = $KG[widgetModel.pf + "_" + widgetModel.id + "_scroller"];
		scrollerInstance && scrollerInstance.refresh();			
	},

    getTemplateByContainerModelAndRowData: function(model, rowdata, isSection, index) {
        if(model.wType == "MenuContainer") {
            return rowdata.template || model.menutemplate;
        } else if(model.wType == "Segment") {
		    if(isSection) {
			    return model.sectionheadertemplate;
			} else {
                return rowdata.template || model.rowtemplate;
			}
        } else if(model.wType == "DataGrid") {
            if(model.selectedIndex >= IndexJL){
				var colConfig = model.columnheadersconfig[model.selectedcellindex[0]];				
				if(index == '0'){
					return colConfig.columnheadertemplate.template;
				}
				return colConfig.columndatatemplate;
			}
        }
    },

    getRowDataByContainerModelAndIndex: function(model, index) { //index is an array
        if(model.wType === "MenuContainer") {
            return $KW.MenuContainer.getDetails(model, index, 'item');
        } else if(model.wType === "Segment") {
            return $KW.Segment.getRowDataByIndex(model, index);
        } else if(model.wType === "DataGrid") {
            //TODO::
        }
    },

    getIndexAttrNameByContainerModel: function(model) {
        if(model.wType === "MenuContainer") {
            return 'menuindex';
        } else if(model.wType === "Segment") {
            return 'index';
        } else if(model.wType === "DataGrid") {
            return 'index';
        }
    },
	
	getOffsetParent: function(elem) {
		var offsetParent = elem.offsetParent || document.documentElement;
		while ( offsetParent && ( !(elem.nodeName && elem.nodeName.toLowerCase() == "html" ) && $KU.getStyle(elem, "position") === "static" ) ) {
			offsetParent = offsetParent.offsetParent;
		}
		return offsetParent || document.documentElement;
	},
	
	/*
	* Get the elem position relative to offsetParent
	*/
	getOffset: function(elem){ 
		var offsetParent, offset, parentOffset = { top: 0, left: 0 };
		offsetParent = this.getOffsetParent(elem);
		offset = this.getPosition(elem);
		parentOffset = this.getPosition(offsetParent);
		// Add offsetParent borders
		parentOffset.top += $KU.getStyle(offsetParent, "borderTopWidth");
		parentOffset.left += $KU.getStyle(offsetParent, "borderLeftWidth"); 
		
		return {
			top: offset.top - parentOffset.top,  
			left: offset.left - parentOffset.left
		};		
	},
	
	/*
	 * Get the elem position relative to viewport
	 */ 
	getPosition: function(elem){ 
		var box = { top: 0, left: 0 }, docElem = document.documentElement;
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		return {
			top: box.top + window.pageYOffset - docElem.clientTop,
			left: box.left + window.pageXOffset - docElem.clientLeft
		};
	},
	
	/*	Sets FlexContainer & FlexScrollConatiner width & height based on parent widget type
	 *
	 */	
	setFlexContainerStyle: function(flexModel, flexNode){
		var value, unit, parentNode, containerModel; 
		var width = flexModel.width;
		var height = flexModel.height;
		
		width = $KU.isValidCSSLength(width) ? width : $KW.Utils.getDefaultWidth(flexModel, false); 
		height = $KU.isValidCSSLength(height) ? height : $KW.Utils.getDefaultHeight(flexModel, false);
		var parentModel = flexModel.parent;
 		var parent = $KU.getNodeByModel(parentModel);
		
		// When flexContainer is used as RowTemplate in Segment and width n height unit is in %, compute width n height by segment. Segment height is known only when the segment is placed in FlexContainer. If Segment is placed in non-flex, compute height by segment width.
		
		if(!parentModel && flexNode.dataObj){ 
			parentModel = flexNode.dataObj.containerModel.parent;
			containerModel = flexNode.dataObj.containerModel;
			parentNode = $KW.Utils.getWidgetNode(containerModel);
		}
		else
			parentNode = $KU.getNodeByModel(parentModel);
			
		var node = (flexModel.wType == 'FlexContainer') ? flexNode.parentNode : flexNode;
		
		if(parentModel && width){
			var obj = $KU.getValueAndUnit(flexModel, width);
			value = obj.value;
			unit = obj.unit;
			if(unit == kony.flex.PERCENTAGE){
				value = (value * parentNode.offsetWidth) / 100;
			}
			
			if(parentModel.wType == 'HBox' || parentModel.wType == 'VBox' || parentModel.wType == 'ScrollBox' || (parentModel.wType == 'Form' && parentModel.layouttype == kony.flex.VBOX_LAYOUT) || parentModel.wType == 'Popup'){
				if(parentModel.percent == false)
					node.style.width = value + 'px';
				else if(flexModel.hexpand == false){
					if(value <= node.parentNode.offsetWidth){
						node.style.width = value + 'px';
					}	
				}
			}
		}
		
		if(height){
			var obj = $KU.getValueAndUnit(flexModel, height);
			value = obj.value;
			unit = obj.unit;
			if(unit == kony.flex.PERCENTAGE && parentModel){
				if(parentModel.wType == 'FlexContainer' || parentModel.wType == 'FlexScrollContainer' || (parentModel.wType == 'Form' && parentModel.layouttype != kony.flex.VBOX_LAYOUT))
					value = (value * parentNode.offsetHeight) / 100;
				else	
					value = (value * parentNode.offsetWidth) / 100;
			}
			if(containerModel && containerModel.wType == 'Segment' && containerModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW && containerModel.needpageindicator){
				var border = parseInt($KU.getStyle(parentNode, "border-top-width"), 10) + parseInt($KU.getStyle(parentNode, "border-bottom-width"), 10);
				node.style.height = (value - parentNode.childNodes[1].offsetHeight - border) + 'px'; 
			}
			else	
				node.style.height = value + 'px';    
		}
		
		//FlexScrollContainer contentNode dimensions needs to be updated when height/width of scroll container is changed
		if(flexModel.wType == 'FlexScrollContainer'){
			var contentNode = node.childNodes[0].childNodes[0];
			contentNode.style.width = node.clientWidth + 'px';
			contentNode.style.height = node.clientHeight + 'px';
		}
		if(flexModel.wType == 'FlexContainer'){
			node.childNodes[0].style.height = '100%';
		}		
	},	
	
	getFlexLayoutStyle: function(wModel){
		var style = [];		
		//style = this.getDimensions(wModel);	
		style.push('position:absolute');
		wModel.zindex && style.push('z-index:' + wModel.zindex);
		if(kony.appinit.vendor=="webkit")
			style.push("-webkit-transform:" +$KW.animUtils.applyTransform(wModel, wModel.transform));
		else
			style.push("transform:" +$KW.animUtils.applyTransform(wModel, wModel.transform));
		(typeof wModel.opacity != 'undefined' ) &&  style.push('opacity:' + wModel.opacity);
		return style.join(";");			
	},
	
	/* Computes the width by width, minWidth & maxWidth.  
 	 * If width, minWidth & maxWidth are all undefined, it computes the width by positional properties centerX, left, right  
	 */
	
    getWidth: function(wModel, layoutModel, wNode, flexNode, updateUI){
		var style = [];
		var flexContainer = wModel.parent;
		var isWidthSet = false;
		var width, preferredWidth, implicitWidth;
		
		var widthObj = layoutModel.width;	
		
		if(widthObj){
			width = (widthObj.value < 0 ? 0 : widthObj.value) + widthObj.unit;
			isWidthSet = true;
		}
		
		if(!isWidthSet){
			var minWidth = 0;
			var maxWidth = Number.MAX_VALUE;
			var minWidthObj = layoutModel.minWidth;
			var maxWidthObj = layoutModel.maxWidth;
			
			if(minWidthObj){
				minWidth = $KU.getValueByParentFrame(wModel, minWidthObj, 'x');
				minWidth = minWidth < 0 ? 0 : minWidth;
			}
			if(maxWidthObj){
				maxWidth = $KU.getValueByParentFrame(wModel, maxWidthObj, 'x');
				maxWidth = maxWidth < 0 ? 0 : maxWidth;
			}
			
			//Need to do implicit calucation in case of freeform only
			if(flexContainer.layouttype == kony.flex.FREE_FORM){ 
				var flexWidth = flexNode.offsetWidth;
				var centerX, left, right;
				
				if(layoutModel.centerX){
					centerX = $KU.getValueByParentFrame(wModel, layoutModel.centerX, 'x');					
				}	
				if(layoutModel.left){
					left = $KU.getValueByParentFrame(wModel, layoutModel.left, 'x');
				}
				if(layoutModel.right){
					right = $KU.getValueByParentFrame(wModel, layoutModel.right, 'x');
				}
				if(layoutModel.centerX && layoutModel.left)
					implicitWidth = (centerX - left) * 2;
				else if(layoutModel.centerX && layoutModel.right)
					implicitWidth = (flexWidth - centerX - right) * 2;
				else if(layoutModel.left && layoutModel.right)
					implicitWidth = flexWidth - left - right;
					
				if(implicitWidth != undefined){	
					var border = parseInt($KU.getStyle(flexNode, "border-right-width"), 10);
					implicitWidth = implicitWidth - border;
					implicitWidth = (implicitWidth < 0 ? 0 : implicitWidth);
				}
			}
			var calWidth = (implicitWidth != undefined) ? implicitWidth : $KW.Widget.getPreferredWidth(wModel, wNode.childNodes[0], maxWidth);
			width = this.enforceGivenDimension(calWidth, minWidth, maxWidth) + 'px';
		}
		if(widthObj || implicitWidth != undefined)
			$KW.Utils.setPreferredWidth(wModel, wNode);
			
		if(updateUI	== undefined)
			wNode.style.width = width;
		else
			style.push('width:' + width);
		return style;
	},
	
	enforceGivenDimension: function(givenDimension, minDimension, maxDimension){
		var returnDimension = givenDimension;
		if (minDimension <= maxDimension) {
			if (givenDimension < minDimension) {
				returnDimension = minDimension;
			}
			if (givenDimension > maxDimension) {
				returnDimension = maxDimension;
			}
		}
		return returnDimension;
	},
	
	getHeight: function(wModel, layoutModel, wNode, flexNode, updateUI){
		var style = [];
		var flexContainer = wModel.parent;
		var isHeightSet = false;
		var height;
		
		var heightObj = layoutModel.height;
		if(heightObj){
			height = (heightObj.value < 0 ? 0 : heightObj.value) + heightObj.unit;
			isHeightSet = true;
		}
		
		if(!isHeightSet){
			var preferredHeight, implicitHeight;
			var minHeight = 0;
			var maxHeight = Number.MAX_VALUE;
			
			var minHeightObj = layoutModel.minHeight;
			var maxHeightObj = layoutModel.maxHeight;
			
			if(minHeightObj){
				minHeight = $KU.getValueByParentFrame(wModel, minHeightObj, 'y');
				minHeight = minHeight < 0 ? 0 : minHeight;
			}
			
			if(maxHeightObj){
				maxHeight = $KU.getValueByParentFrame(wModel, maxHeightObj, 'y');
				maxHeight = maxHeight < 0 ? 0 : maxHeight;
			}
			
			if(wModel.parent.layouttype == kony.flex.FREE_FORM){
				var flexHeight = flexNode.offsetHeight;
				var centerY, top, bottom;
				
				if(layoutModel.centerY){
					centerY = $KU.getValueByParentFrame(wModel, layoutModel.centerY, 'y');
				}	
				if(layoutModel.top){
					top = $KU.getValueByParentFrame(wModel, layoutModel.top, 'y'); 
				}
				if(layoutModel.bottom){
					bottom = $KU.getValueByParentFrame(wModel, layoutModel.bottom, 'y');
				}
				
				if(layoutModel.centerY && layoutModel.top)
					implicitHeight = (centerY - top) * 2;
				else if(layoutModel.centerY && layoutModel.bottom)
					implicitHeight = (flexHeight - centerY - bottom) * 2;
				else if(layoutModel.top && layoutModel.bottom)
					implicitHeight = flexHeight - top - bottom;
					
				if(typeof implicitHeight != 'undefined'){		
					var border = parseInt($KU.getStyle(flexNode, "border-bottom-width"), 10);
					implicitHeight = implicitHeight - border;
					height = (implicitHeight <0 ? 0 : implicitHeight);
				}	
			}
			var calHeight = (typeof implicitHeight != "undefined") ? implicitHeight : $KW.Widget.getPreferredHeight(wModel, wNode.childNodes[0], maxHeight);
			height = this.enforceGivenDimension(calHeight, minHeight, maxHeight) + 'px';
			
			if(wModel.wType == 'Image' && wModel.imagescalemode == constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO){
				if(typeof implicitHeight == 'undefined' && !minHeightObj && !maxHeightObj){
					var span = wNode.childNodes[0];
					var dimensions = {width: span.offsetWidth + 'px', height:span.offsetHeight + 'px'};
					dimensions = $KU.setImgAspectRatio(wModel, span.childNodes[0], dimensions, false);
					height = dimensions.height;
				}
			}
		}
		
		if(updateUI	== undefined)
			wNode.style.height = height;
		else
			style.push('height:' + height);
		return style;
	},
	
	setDimensions: function(wModel, wNode, flexNode, style){
		if(style){
			var minHeight = wNode.style.minHeight;
			wNode = wNode.childNodes[0]; //Setting width n height to widget node
			var parentModel = wModel.parent;
			
			if(wNode && (parentModel.wType == 'FlexContainer' || parentModel.wType == 'FlexScrollContainer' || (parentModel.wType == 'Form' && parentModel.layouttype != kony.flex.VBOX_LAYOUT)) && wModel.wType != 'Switch') {
				wNode.style.width = '100%';
				wNode.style.height = '100%';
				
				// http://www.456bereastreet.com/archive/201306/height_in_percent_when_parent_has_min-height_and_no_height/
				// Setting min-height to widget node also as 100% height will not work
				//wNode.style.minHeight = minHeight;
				
				if(wModel.wType == 'Image'){
				
					//Horizontally center the image 
					wNode.style.display = 'block'; 
					
					var imgNode = wNode.childNodes[0];
					var dimensions = {width: wNode.offsetWidth + 'px', height:wNode.offsetHeight + 'px'};
					if(wModel.imagescalemode == constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO) {
						$KU.setImgAspectRatio(wModel, imgNode, dimensions);
						$KU.getImageCenterAlign(imgNode, true);	
					}	
					else if(wModel.imagescalemode == constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS){
						$KU.setImgDimensions(wModel, imgNode, dimensions);
					}
					
					//Vertically center the image
					/*var lineHeight = wNode.offsetHeight;
					wNode.style.fontSize = '0px';
					var vBorder = parseInt($KU.getStyle(wNode, "border-top-width"), 10) + parseInt($KU.getStyle(wNode, "border-bottom-width"), 10);
					var vPadding = parseInt($KU.getStyle(wNode, "padding-top"), 10) + parseInt($KU.getStyle(wNode, "padding-bottom"), 10);
					wNode.style.lineHeight = lineHeight - vBorder - vPadding + 'px'; */
					return;
				}
				
				if(wModel.wType == 'FlexContainer')
					wNode.childNodes[0].style.height = '100%'
					
				if(wModel.wType == 'FlexScrollContainer'){
					var contentNode = wNode.childNodes[0].childNodes[0];
					contentNode.style.width = wNode.clientWidth + 'px';
					contentNode.style.height = wNode.clientHeight + 'px';
				}						
			}
			if(wModel.wType == 'Switch'){
				var switchNode = $KU.getNodeByModel(wModel);
				$KW.Switch.adjustWidth(wModel, switchNode, true);
				$KW.Switch.adjustHeight(wModel, switchNode);
			}
			if(wModel.wType == "Slider"){
				var slider = $KU.getNodeByModel(wModel);
				$KW.Slider.imgLoad(slider.childNodes[0]);
			}
			if(wModel.needScroller){
				var scrollerInstance = $KG[wNode.id];
				scrollerInstance && scrollerInstance.refresh();
			}
			//var flexContainer = wModel.parent;
			//flexContainer.ownchildrenref && $KW.Utils.initializeNewWidgets(flexContainer.ownchildrenref);
		}	
	},
		
	/*  When width is not set with all layout properties and implicit calculations, set default width for width driven widgets
	 *	
	 */
	getDefaultWidth: function(wModel, needComplutedValue){
		if(wModel.wType == 'Browser' && !wModel.htmlstring)
			return "";
			
		var defaultWidth = $KU.widgetsWidthMap[wModel.wType];
		if(defaultWidth)
			return (needComplutedValue == false) ? defaultWidth : $KU.getComputedValue(wModel, defaultWidth);	
			
		return "";
	},
	
	// TODO: need to have proper config for default values
	getDefaultHeight: function(wModel, needComplutedValue){
		var defaultHeight = $KU.widgetsHeightMap[wModel.wType];
		if(defaultHeight)
			return (needComplutedValue == false) ? defaultHeight : $KU.getComputedValue(wModel, defaultHeight);
			
		return "";	
	},
	
	/*  When width is not set with all layout properties and implicit calculations, set preferred width for content driven widgets
	 *	
	 */
	setPreferredWidth: function(wModel, wNode){
		var iscontentDriven = $KU.inArray($KU.contentDrivenWidgets, wModel.wType)[0];
		if(iscontentDriven){
			var node;
			if(wModel.wType == 'Label')
				node = wNode.childNodes[0].childNodes[0];
			else 
				node = wNode.childNodes[0];
			node.style.whiteSpace = 'pre-wrap';	
		}		
	},

	getWidgetFrame: function(wNode, needOffset){
		var offset = (typeof needOffset == "undefined") ? $KW.Utils.getOffset(wNode) : {top:0, left:0};
		return {x: parseInt(offset.left, 10),
				y: parseInt(offset.top, 10),
				width: wNode.offsetWidth,
				height: wNode.offsetHeight};
	},
	
	setWidgetFrame: function(wModel, frame, wNode){
		wNode = wNode || $KU.getNodeByModel(wModel);
		wNode.style.left = wNode.style.right = wNode.style.top = wNode.style.bottom = "";
		for(var pos in frame){
			wNode.style[pos] = frame[pos];
		}
		if(!wNode.style.left)
			wNode.style.left = '0px';
		if(!wNode.style.top)
			wNode.style.top = '0px';
	},
		
	getWidgetNode: function(model, parentNode){
		//Modified to get node of form or popup for which there is no pf.
		var widgetID = (model.pf ? model.pf + "_" : "") + model.id;
		var node = parentNode ? parentNode.querySelector('#' + widgetID) : document.getElementById(widgetID);
        return $KW.Utils.getWidgetNodeFromNodeByModel(model,node);
	},
    //Separated as different method from above getWidgetNode function, as below function can be used if node is already available and need to get scroller or other widgets top node.
    getWidgetNodeFromNodeByModel: function(model, node){
        if(node){
			var map = {ScrollBox: 3, TabPane: 2, Segment: 2, Image: 1, Slider: 2, FlexContainer: 1, Browser: 2, FlexScrollContainer: 2};
			
			/*if($KU.isiPhone)
				map.TextField = 1;*/
			if(model.wType == 'Segment' && model.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW)
				map.Segment = 3;
			for (var i = typeof map[model.wType] == 'undefined' ? 0 : map[model.wType]; i > 0; --i)
				node = node.parentNode;				
			return node;
		}
		else 
			return null;
    },
	
	getWidgetIndex: function(wModel){
		var parentModel = wModel.parent;
		if(parentModel){
			var widgets = parentModel.widgets();
			for(var i=0; i<widgets.length; i++){
				if(wModel.id == widgets[i].id){
					return i;
				}	
			}			
		}
		return -1;
	},

	setPaddingByParent: function(wModel, wNode, parentNode){
		if(wModel.wType == 'FlexContainer' || wModel.wType == 'FlexScrollContainer' || (wModel.wType == 'Form' && wModel.layouttype != kony.flex.VBOX_LAYOUT))
			return;
		var parentNode = parentNode || $KW.Utils.getWidgetNode(wModel.parent);
		var padding = wModel.padding;
		if(padding && parentNode && $KU.isArray(padding)){
			var result = '';
			var parentWidth = parentNode.offsetWidth;
			for(var i=0; i < padding.length; i++){
				result += parseInt((padding[i] * parentWidth) / 100, 10) + 'px ';
			}
			wNode.style.padding = result;
		}
	}	
}

/**
 * This Context will be needed to pass widget specific information that is required while rendering the widget.
 * 
 */
$KW.WidgetGenerationContext = function(formID)
{
    this.formID = formID;
    this.topLevelBox = null;    
}

$KW.WidgetGenerationContext.prototype.setTopLevelBox = function(topLevel)
{
    this.topLevelBox = topLevel;

};

$KW.unLoadWidget = function() {
    
        /**
         *  This calls the unload event on the selected widget.
         */
        var progressnode=document.querySelector('[selected="progress"]') || document.querySelector('[selected="progressindtr"]');
        if(progressnode)
        	progressnode.removeAttribute("selected");
        progressnode=document.querySelector('[progressindicator="true"]');
        if(progressnode)
        	progressnode.parentNode.removeChild(progressnode);
        $KW.Utils.removeBlockUISkin()
        var selectedItem = $KG[kony.constants.SELECTED_ITEM];        
        if (selectedItem) {
            var selectedWidget = $KU.getElementById(selectedItem.kWidgetID);
            var widgetEventHandler = selectedItem.kEventHandler;            
             widgetEventHandler && widgetEventHandler(selectedWidget)
        }      
        // Remove the selected Item from globals.
        delete $KG[kony.constants.SELECTED_ITEM];
};

/*
 * Widget : Dummy Implementations for widgets which are not supported
 */
$KW.Camera =
{	
    render : function(widgetID, context)
    {
        return "";
    }
}
$KW.Advertisement =
{	
    render : function(widgetID, context)
    {
        return "";
    }
}
/* Slider is implemented from 5.0
$KW.Slider =
{	
    render : function(widgetID, context)
    {
        return;
    }
}
*/
$KW.SeatMap =
{	
    render : function(widgetID, context)
    {
        return "";
    }
}
$KW.MenuItem =
{	
    render : function(widgetID, context)
    {
        return "";
    }
}

$KW.TPW = {
	render : function(widgetModel, context) {
        var html = "";
		if(typeof widgetModel == 'object')
		{
			//var id = widgetModel.pf + '_' + widgetModel.id + '_tpwPlaceHolder';
			var id = widgetModel.pf + '_' + widgetModel.id;
			$KU.addThirdPartyMeta({id:id, tpwModel:widgetModel});
			var tpwidgettype = $KU.getWidgetTypeByNameSapce(widgetModel.widgetName);
			var computedSkin = $KW.skins.getWidgetSkin(widgetModel, context) + " " + $KW.skins.getMarPadAdjustedContainerWeightSkin(widgetModel, 100);
            var marginpaddingvisible = "";
            marginpaddingvisible += $KW.skins.getMarginSkin(widgetModel,context)+" "+$KW.skins.getPaddingSkin(widgetModel);
			//html += "<div class='kwt"+widgetModel.containerweight+" ktable'>";
			//html += "<div class='krow'>";
			if(widgetModel.isvisible == false || !widgetModel.isvisible == "false" || widgetModel.isVisible == false || !widgetModel.isVisible == "false")
                marginpaddingvisible += "display:none;";
            html += "<div id='" + id + "' class='" + computedSkin + "' tpwidgettype='" + tpwidgettype + "' style='" +marginpaddingvisible + "'></div>";
			return html;
		}
	},
	
	renderWidget : function(formOrPopup) {
		if($KG.thirdPartyWidgetsMeta)
		{
			for(var key in $KG.thirdPartyWidgetsMeta) {
				var placeholder = document.getElementById($KG.thirdPartyWidgetsMeta[key].id);
				//Checking for third party widgets related to the current form
				if(placeholder && $KG.thirdPartyWidgetsMeta[key].tpwModel.pf == formOrPopup)
				{
					var tpwModel = $KG.thirdPartyWidgetsMeta[key].tpwModel;
					var nsArr = tpwModel.widgetName.split('.');
					var namespace = window;
					for(var j=0; j<nsArr.length; j++) {
						namespace = namespace[nsArr[j]];
					}
					if(namespace && typeof namespace['initializeWidget'] == 'function') {
						namespace['initializeWidget'](placeholder, tpwModel);
					} else {
						//console.log('*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$* --  '+'Function '+tpwModel.widgetName+' not found.'+'  -- *$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*');
					}
				}
			}
		}
	}
};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}