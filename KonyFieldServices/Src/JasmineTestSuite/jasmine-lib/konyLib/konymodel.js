kony.model = {
    /**
     *  Updates the Model & DOM
     *  a.  formid.widgetid.widgetprop  - For all the normal widgets with flattened hierarchy
     *  b.  formid.tabpaneid.widgetid.widgetprop - For all the widgets in the tab
     *  c.  app.headers.topbox.widgetid.widgetprop - For widgets in the headers & footers.
     */
    update: function(model, prop, value){
    
        if (model == undefined || model == null) {
            kony.print("kony.model.update:Error in Model,value is undefined or null");
            return;
        }
        if (model["wType"] == undefined || (model[prop] && model[prop]["wType"])) {
            model[prop] = value;
        }
        else {
            var widgetModel = model;
			var wType = widgetModel.wType;
			if(wType == "TPW")
			{
				var nsArr = widgetModel.widgetName.split('.');
				var namespace = window;
				for(var j=0; j<nsArr.length; j++) {
					namespace = namespace[nsArr[j]];
				}
				namespace["modelChange"] && namespace["modelChange"](model, prop, value);
			}
			else
			{		
				var oldValue = widgetModel[prop];            
				$KI.i18n && $KI.i18n.checkI18nStatus(widgetModel, prop);
				widgetModel[prop] = value; 
				this.updateView(widgetModel, prop, value, oldValue);
			}
        }
    },
	
	updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
	
		var element;
		if(widgetModel.wType == "Form")
			element = document.getElementById(widgetModel.id);	
		else if(widgetModel.wType == "ScrollBox")
			element = document.getElementById(widgetModel.pf + "_" + widgetModel.id + "_parent");			
		else
			element = $KU.getNodeByModel(widgetModel);
		
		if(!element )
			element = document.getElementById(widgetModel.pf + "_" + widgetModel.id+"_Body"); //for tabview Tabpane.
	
		switch (propertyName) 
		{
			case "onhover" :
				new $KI.HoverInit(widgetModel);
				
				break;
            case "skin":
				if(widgetModel.wType == "Form")
				{
					var formNode;
					if(!$KG.needScroller && !$KU.isBlackBerryNTH)
						document.body.className = propertyValue || "";
					else if($KU.isBlackBerryNTH)
						formNode = document.getElementById(widgetModel.id + "_container");
					else
						formNode = document.getElementById(widgetModel.id + "_scroller");

					if(formNode)
					{
						$KU.removeClassName(formNode, oldPropertyValue);
						$KU.addClassName(formNode, propertyValue);
					}
				}
				else if(widgetModel.wType == "Tab")
					element = $KU.getElementById(widgetModel.pf + '_' + widgetModel.id + '_Body');

				if (element)
				{
					var defaultSkin = $KW.skins.getDefaultSkin(widgetModel);
					$KU.removeClassName(element, oldPropertyValue || defaultSkin);
					$KU.addClassName(element, propertyValue || defaultSkin);
											
					if(widgetModel.wType == "Line")
						$KW.Line.applySkin(element, propertyValue);
					if(widgetModel.wType == "Calendar")
						element.children[0].style.color = "inherit";
				}			
				else					
					$KW.Utils.updateDOMSkin(widgetModel, propertyValue, oldPropertyValue);

                break;

			case "focusskin":
			case "rowfocusskin":
			case "activefocusskin":
                $KW.Utils.updateFocusSkin(widgetModel, widgetModel.rowfocusskin ? "rowfocusskin" : "focusskin");
                break;	 
			

            case "isvisible":
                $KW.Widget.setvisibility(widgetModel, propertyValue);
                break;

			case "margin":
				if(element && !$KU.isFlexWidget(widgetModel)){
					$KW.skins.setMarginPadding(element, propertyName, widgetModel, propertyValue);
					if(widgetModel.wType == "ScrollBox"){
						var scrollerInstance = $KG[widgetModel.pf + "_" + widgetModel.id + "_scroller"];
						scrollerInstance && scrollerInstance.refresh();		
					}					
				}	
				break;
			
            case "padding":	
				if(widgetModel.wType == 'FlexContainer' || widgetModel.wType == 'FlexScrollContainer' || (widgetModel.wType == 'Form' && widgetModel.layouttype != kony.flex.VBOX_LAYOUT))
					return;
				if(widgetModel.wType == "Segment"){
					if(widgetModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW){
						var segRows = element.childNodes[0].childNodes;
						// Looping each record of Segment and applyling padding.
						for(var i=IndexJL; i<segRows.length; i++) { 
							element = segRows[i].childNodes[0];
							element.style[propertyName] = $KU.joinArray(propertyValue, "% ") + "%";	
						}						
						break;// Applying padding for Segment PAGEVIEW case only.			
					} 					
				}		
				if(widgetModel.wType == "Image")
					element = element.parentNode;
				if(element){
					if($KU.isFlexWidget(widgetModel))
						$KW.Utils.setPaddingByParent(widgetModel, element);
					else	
						element.style[propertyName] = $KU.joinArray(propertyValue, "% ") + "%";
					if(widgetModel.wType == "ScrollBox"){  //hack for setting padding for overflow:hidden div
						$KW.Utils.setScrollWidth(widgetModel, element);	
					}
					if(widgetModel.wType == "VBox" || widgetModel.wType == "HBox" ){  //hack for setting padding for Tab
						var currentMargin = element.style["margin"];
						//var currentMargin = getComputedStyle(element, null).margin;
						element.style["margin"] = "1px";
						setTimeout(function(){
							element.style["margin"] = currentMargin;
						},10);
						
					}
				}
            break;

            case "containerweight":               
                if(element)
				{	
					element = element.parentNode;
					if(widgetModel.wType == "Image")
					{
						element = element.parentNode; //<div class='kcell'><span><img></img><span></div>
					}      
					if(widgetModel.wType == "Slider")
					{
						element = element.parentNode.parentNode; //<div class='kcell'><div><div><img></img></div></div></div>
					}                                             
                    if(widgetModel.wType=="HStrip") 
                    {
                        if(element.parentNode.parentNode.parentNode && element.parentNode.parentNode.parentNode.className.indexOf("kcell")!=-1)
                        element=element.parentNode.parentNode.parentNode;
                    }                    
					$KU.removeClassName(element, "kwt"+oldPropertyValue);
					$KU.addClassName(element, "kwt"+propertyValue);
					
					//BUG: JSPFQA9065: added strictpercentage behaviour in 5.5, if it is true, when there is change in cwt we have to change width to dummy node.
					if($KG.appbehaviors.adherePercentageStrictly == true) {
						var parentmodel = kony.model.getWidgetModel(widgetModel.pf, widgetModel.parent && widgetModel.parent.id);
						if(parentmodel && parentmodel.wType =="HBox") {
							$KU.removeClassName(element.parentNode.lastChild, "kwt"+parentmodel.dummyNodeWidth);
							parentmodel.dummyNodeWidth = $KW.HBox.getExtraNodeWidth(parentmodel);
							$KU.addClassName(element.parentNode.lastChild, "kwt"+parentmodel.dummyNodeWidth);
								
						}
					}					
					if(widgetModel.wType == "HStrip")
					{
						var row = element.parentNode; 
						if(row.childNodes.length == 1) 
							cell.style.display = "inline-block"; //changing display to occupy the allocated width.		
					}	
					else if(widgetModel.wType == "Switch")
					{
						(function(parentForm) {
							var delay = window.setTimeout(function() {
								$KW.Switch.adjustSwitchWidth(parentForm);
								$KW.Switch.adjustSwitchHeight(parentForm);
								window.clearTimeout(delay); delete delay;
							}, 0);
						})(widgetModel.pf);
					}
					else if(widgetModel.wType == "ScrollBox")
					{
						var parentId = element.childNodes[0].id;
						var scrollboxId = parentId.substring(0, parentId.lastIndexOf("_"));
						$KW.ScrollBox.adjustArrowPosition(scrollboxId);
					}
					else if(widgetModel.wType == "Slider") {						
						$KW[widgetModel.wType]["updateView"](widgetModel, "containerweight");						
					}										
				}
                var formModel = $KG.allforms[widgetModel.pf];
                // if template
                if(!formModel)
                    return;
                var parentModel = widgetModel.parent;
                if(parentModel && parentModel.wType == "ScrollBox")
                {
                    $KW.ScrollBox.recalculateScrollBoxWidth(parentModel);
                }
				break;
				
			case "containerheightreference":
			case "containerheight":
				var hasScroller = widgetModel.needScroller;
				$KU.updateScrollFlag(widgetModel);
				//Show all form widgets when setting containerHeight to a screenLevelWidget
				if(hasScroller != true && widgetModel.screenLevelWidget){
					var formModel = $KG.allforms[widgetModel.pf];
					$KW.Form.addChild(formModel, formModel.ownchildrenref, true);
				}
				var node = $KU.getNodeByModel(widgetModel);
				
				if(node){
				
					if(widgetModel.wType == "Popup"){
						var conatiner = document.getElementById(widgetModel.id + "_container");
						var group = $KU.getElementById(widgetModel.id + "_group");	
						var scroller = $KU.getElementById(widgetModel.id + "_scroller");	
						if(!widgetModel.ismodal){
							if(widgetModel.containerheight || widgetModel.containerheight == 0){
								group.style.height = '100%';
								scroller.style.overflow = 'hidden';
							}
							else{
								group.style.height = 'auto';
								scroller.style.overflow = 'visible';
							}
						}
						node = widgetModel.ismodal ? group : conatiner;
					}
					$KW.ScrollBox.adjustDimensionsByNode(widgetModel, node);
					if(widgetModel.needScroller && !$KG[node.id + "_scroller"]){
						var node = (widgetModel.wType == "Popup") ? $KU.getElementById(widgetModel.id + "_scroller") : node.parentNode.parentNode; 
						$KW.Scroller.initialize([node], "ScrollBox");
					}
					if(widgetModel.wType == "Popup"){
						$KW.Popup.adjustPopupDimensions(widgetModel, conatiner.childNodes[1]);	
					}
				}
				break;
							
			case "backgroundimage":
				$KW.Utils.updateNormalImage(widgetModel);
				break;	
            
            case "contentalignment":
			    var cAlign = $KW.skins.getContentAlignment(widgetModel);
                if(element){
					element.style.textAlign = cAlign;
					if(widgetModel.wType == "Calendar" && $KU.isIE10 && element.firstChild){
						element.firstChild.style.textAlign = cAlign;
						var padd = element.firstChild.style.paddingRight;
						element.firstChild.className += " updateTextAlignment";
						window.setTimeout(function(){
							$KU.removeClassName(element.firstChild, 'updateTextAlignment');
							element.firstChild.style.paddingRight = padd;
						},100);					
					}
					if(widgetModel.wType == "Calendar" && $KU.isIE9 && element.firstChild){
					 	element.firstChild.value += "";
					}
				}			
                break;
				
				
			case "accessibilityConfig":
					if(element && widgetModel.wType == 'Link' || widgetModel.wType == 'Label')
						element = element.firstChild;
				if(!element || widgetModel.wType == "RadioButtonGroup" || widgetModel.wType == "CheckBoxGroup")	 return;
				
				$KU.addAriatoElement(element, propertyValue, widgetModel, oldPropertyValue);
				
			break;
			
			case "zindex":
				var element = $KW.Utils.getWidgetNode(widgetModel);
				if(element){
					if($KU.isFlexWidget(widgetModel))
						element.parentNode.style.zIndex = propertyValue;
					else
						element.style.zIndex = propertyValue;
				}
				break;
                
			case "opacity":
				var element = $KW.Utils.getWidgetNode(widgetModel);
				if(element){
					if($KU.isFlexWidget(widgetModel))
						element.parentNode.style.opacity = propertyValue;
					else
						element.style.opacity = propertyValue;
				}
				break;	
                
			case "transform":			
				var element = $KW.Utils.getWidgetNode(widgetModel);		
				if(element) {				
					var style = $KW.animUtils.applyTransform(widgetModel, propertyValue);
					if($KU.isFlexWidget(widgetModel))
						element.parentNode.style[vendor+"Transform"]  = style;
					else
						element.style[vendor+"Transform"]  = style;
				}	
			break;		
				
			case "anchorpoint" :
				var element = $KW.Utils.getWidgetNode(widgetModel);		
				if(element) {	
					if(propertyValue) {
						if((propertyValue.x <0) || (propertyValue.x>1) || ( propertyValue.y <0) || (propertyValue.y > 1) )
							return;
						if($KU.isFlexWidget(widgetModel))	
							element.parentNode.style[vendor+"TransformOrigin"]  = (propertyValue.x*100) +"% "+ (propertyValue.y*100)+"% "; 
						else
							element.style[vendor+"TransformOrigin"]  = (propertyValue.x*100) +"% "+ (propertyValue.y*100)+"% "; 
					}
					else {
						if($KU.isFlexWidget(widgetModel))
							element.parentNode.style[vendor+"TransformOrigin"]  = "50% 50%";
						else
							element.style[vendor+"TransformOrigin"]  = "50% 50%";
					}
				}
			break;

			
			/* Added to support low level touch events on widget itself.*/
            case "touchstart" :
            case "touchmove" :
            case "touchend" :
                if(widgetModel.touches && widgetModel.touches[propertyName] && widgetModel.touches[propertyName].callback === propertyValue )
                    break;
                $KW.Utils.removetouch(widgetModel, propertyName, false);
                $KW.Utils.updateModelWithTouches(widgetModel, propertyName, propertyValue);
                var element = $KW.Utils.getWidgetNode(widgetModel);
                if(element && widgetModel.touches[propertyName]){
                    /*Added below line for scroller widgets, touch events should be registered on scrollee, instead of                         scroller/inner widget div. */
                    if(element.id && element.id.indexOf("_scroller") > 0){
                         element = element.childNodes[0];
                     }
                    widgetModel.touches[propertyName]["instance"] = new $KW.touch.TouchEvents(widgetModel, element, propertyName,  propertyValue);
                }
                break;

			case "backgroundcolor":
			case "bordercolor":
					var validate = $KW.skins.validateHexValue(propertyValue);
					if(validate) {
						var result = $KW.skins.convertHexValuetoRGBA(propertyValue);
					}
					var element  =  $KW.Utils.getWidgetNode(widgetModel);
					if(propertyName == "backgroundcolor")
						element && (element.style.background = result);
					else if (propertyName == "bordercolor")	
						element && (element.style.borderColor = result);
				break;		
				   
			case "borderwidth":
				   var element  =  $KW.Utils.getWidgetNode(widgetModel);
			       element && (element.style.borderWidth = propertyValue + "px");
			   	break;
				   
            case "cornerradius":
            		var element  =  $KW.Utils.getWidgetNode(widgetModel);
			       element && (element.style.borderRadius=propertyValue + "px");
			   break;   
			             		                
			default:	
				var wType = (widgetModel.wType == "Tab") ? "TabPane" : widgetModel.wType;
				var widget = $KW[wType];
				widget["updateView"] && widget["updateView"](widgetModel, propertyName, propertyValue, oldPropertyValue);
        }			
	
	}, 
    
    /**
     *  Retrieves the widget model for a given widget
     *  TODO - Provide only widget specific model and no child models.
     *
     */
	 
	 
	 getWidgetModel: function(formID, widgetID, immediateParentID){
        if (!formID) 
            return null;
        
        var formModel = kony.model.getWidgetRef(formID);         //this.appModel[formID];
        if (immediateParentID && formModel){
            if (widgetID) {
                var widgetModel = formModel[immediateParentID];
                return widgetModel[widgetID];
            }
        }
        
        if (widgetID && formID != widgetID) {
            var widgetModel = formModel[widgetID];
            return widgetModel;
        }
        
        return formModel;        
    },
    
	 

    
    getWidgetRef: function(widgetID) {

       var obj = $KG.allforms[widgetID];             
       if (obj && ["Form","Form2"].contains(obj.wType))
          return obj;
       else
          return ($KG[widgetID] || window[widgetID]);
       
    }
}