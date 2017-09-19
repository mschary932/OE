/*
 * Widget : HBox
 */
 
$KW.HBox =
{
	
	initialize: function(){
    	kony.events.addEvent("click", "HBox", this.eventHandler);
    	kony.events.addEvent("onorientationchange", "HBox", this.orientationHandler);
    },

    orientationHandler: function(formId, orientation)
	{
		var aspectratioNodes = document.querySelectorAll("div[aspect-ratio]");
		for(var i=0; i<aspectratioNodes.length; i++)
		{
			var node = aspectratioNodes[i];
			var aspectratio = node.getAttribute("aspect-ratio");
			var width = node.clientWidth;
			var newHeight = Math.round(1 / aspectratio * width);
			node.style.height = newHeight + 'px';
		}
    },
	
	/**
     * Updates the view of the hbox widget.
     */
    updateView : function(widgetModel, propertyName, propertyValue, oldPropertyValue){		
       
    },

	getExtraNodeWidth : function(boxModel) {
		var sumOfChildwidth = 0;
		for (var i = 0; i < boxModel.children.length; i++) {
			sumOfChildwidth += boxModel[boxModel.children[i]].containerweight;		
		}		
		return (sumOfChildwidth > 100) ? 0 : (100 - sumOfChildwidth);
	},    
	
    render: function(boxModel, context){
        if(!boxModel.buiskin) boxModel.buiskin = boxModel.blockeduiskin;
		
		var parentModel = kony.model.getWidgetModel(boxModel.pf, context.tabpaneID);
		
		
		var layoutDirection = $KW.skins.getWidgetAlignmentSkin(boxModel);
        var topLevel = context.topLevelBox;
		var skinArray = $KW.skins.getSplitSkinsBetweenWidgetAndParentDiv(boxModel, context);
        var computedSkin = skinArray[2];
        computedSkin += " " + $KW.skins.getWidgetAlignmentSkin(boxModel);
		var htmlString = "";
        
        if (!topLevel) {
            htmlString += "<div class = 'krow kwt100' >";
            htmlString += "<div class = 'kcell kwt100' >";
        }       
		computedSkin += $KW.skins.getVisibilitySkin(boxModel); 
            var boxstyle = /* $KW.Utils.getNormalImageStyle(boxModel) + */ " table-layout:fixed;" + $KW.skins.getBaseStyle(boxModel, context);
            
       
			
        htmlString += "<div  class = 'ktable " + computedSkin + "'" + $KW.Utils.getBaseHtml(boxModel, context) + " style='" + boxstyle + "'>";
             htmlString += "<div class = 'krow " + layoutDirection + " kwt100' >";
        if(boxModel.children){
			for (var i = 0; i < boxModel.children.length; i++) {
                var childModel = boxModel[boxModel.children[i]];
				context.vLine = (childModel.wType == "Line") ? true : false;
				if (childModel.wType === "HBox" || childModel.wType === "VBox") {
					context.topLevelBox = false;
					context.ispercent = boxModel.percent;
					if (childModel.wType == "HBox") {
						htmlString += $KW["HBox"].render(childModel, context);
					}
					else {
						htmlString += $KW["VBox"].render(childModel, context);
					}
				}
				else {
					/**
					 * Box Cell is drawn only if it is a percent box.
					 */
					if (boxModel.percent === true) {
						context.ispercent = true;
						var containerWt;
						if(childModel.containerweight)
							containerWt = "kwt" + childModel.containerweight;
						else
							containerWt = "auto";
						var alignment = $KW.skins.getWidgetAlignmentSkin(childModel);
						htmlString += "<div class = 'kcell " + containerWt + " " + alignment + (childModel.wType== 'TPW'? ' konycustomcss' : '') +  "' style='"+ $KW.skins.getChildMarginAsPaddingSkin(childModel) +"' >";
						
					}
					else {
						context.ispercent = false;
					}
						
					htmlString += $KW[childModel.wType].render(childModel, context);   
					
					if (boxModel.percent === true) {
						htmlString += "</div>";
					}
					
				}
			}
			//below snippet added to retain extra space in the dom.
			if($KG.appbehaviors.adherePercentageStrictly == true && boxModel.percent === true)
			{			
				boxModel.dummyNodeWidth = this.getExtraNodeWidth(boxModel);			
				htmlString += "<div class = 'kcell kwt" + boxModel.dummyNodeWidth + "'  ></div>";
			}			
		}   
                    htmlString += "</div></div>";
        if (!topLevel) {
			htmlString += "</div></div>";
        }        
        return htmlString;
    },
	
		
    eventHandler: function(eventObject, target) {
        var widgetModel = $KU.getModelByNode(target), containerId = target.getAttribute("kcontainerID");
        widgetModel.blockeduiskin && $KW.Utils.applyBlockUISkin(widgetModel);
        
        //If the widget is a segment child, update segment data i.e focusedindex and focuseditem 
        if (containerId) {
            $KW.Utils.updateContainerData(widgetModel, target, true);
        } else {
            if (widgetModel.onclick) {
                 widgetModel.onclick(widgetModel);
            } else {
                kony.events.executeBoxEvent(widgetModel);
            }
        }
    },
	
    setProgressIndicator : function(link){
		var progressdiv = $KW.Utils.setProgressIndicator(link);
		link.parentNode.insertBefore( progressdiv,link );
    },    
    
    addChild : function(boxModel, wArray){        
		var box = $KU.getNodeByModel(boxModel);
        if(box && wArray.length > 0){
            var wrapper = document.createElement("div");
            wrapper.innerHTML = $KW.HBox.appendChildren(boxModel, wArray);
			if(boxModel.wType == "HBox" || boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
				box = box.children[0]; //Add childs to row
			while(wrapper.children.length > 0){
				if((boxModel.wType == "HBox" || boxModel.wType == "ScrollBox") && $KG.appbehaviors.adherePercentageStrictly == true && boxModel.percent === true)
					box.insertBefore(wrapper.children[0], box.lastChild || null);
				else
					box.appendChild(wrapper.children[0]);
			}
			if(kony.appinit.isIE && boxModel.wType == "ScrollBox" && boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL){
				$KW.ScrollBox.adjustScrollChildrenWidth(boxModel);
			}
			(boxModel.wType == "FlexContainer") && $KW.FlexContainer.adjustFlexContainer(boxModel);
            (boxModel.wType == "FlexScrollContainer") && $KW.FlexScrollContainer.adjustFlexContainer(boxModel);
			$KW.Utils.initializeNewWidgets(wArray);

			if($KG.appbehaviors.adherePercentageStrictly == true && boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL){
				for (var i = 0; i < wArray.length; i++) {
					boxModel.dummyNodeWidth -= wArray[i].containerweight;
				}	
				box.lastChild.className = "kcell kwt" +boxModel.dummyNodeWidth;			
			}			
			
		}
    },

    addChildat : function(boxModel, wArray, index) {
		var box = $KU.getNodeByModel(boxModel);
        if(box){
            var wrapper = document.createElement("div");
            wrapper.innerHTML = $KW.HBox.appendChildren(boxModel, wArray);
			if(boxModel.wType == "HBox" || boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
				box = box.children[0]; 
			index = index < 0 ? 0 : index;	 
			box.insertBefore(wrapper.childNodes[0], box.childNodes[index] || null);	
			
			if(kony.appinit.isIE && boxModel.wType == "ScrollBox" && boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL){
				$KW.ScrollBox.adjustScrollChildrenWidth(boxModel);
			}
			(boxModel.wType == "FlexContainer") && $KW.FlexContainer.adjustFlexContainer(boxModel);
            (boxModel.wType == "FlexScrollContainer") && $KW.FlexScrollContainer.adjustFlexContainer(boxModel);
			$KW.Utils.initializeNewWidgets(wArray);

			if($KG.appbehaviors.adherePercentageStrictly == true && boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
			{
				for (var i = 0; i < wArray.length; i++) {
					boxModel.dummyNodeWidth -= wArray[i].containerweight;
				}	
				box.lastChild.className = "kcell kwt"+boxModel.dummyNodeWidth;			
			}			
        }
    },

    appendChildren: function(boxModel, wArray) {
		var context = new $KW.WidgetGenerationContext(boxModel.pf);  
		if(boxModel.wType == "FlexContainer"){
			return $KW.FlexContainer.renderChildren(boxModel, wArray, context); 						
		}
        if(boxModel.wType == "FlexScrollContainer"){
			return $KW.FlexScrollContainer.renderChildren(boxModel, wArray, context); 						
		}
		
		var htmlString = '';
		for (var i = 0; i < wArray.length; i++) {
			var childModel = wArray[i];
			if (childModel.wType == "HBox" || childModel.wType == "VBox") {
				context.toplevel = false;
				if (childModel.wType == "HBox") {
					htmlString += $KW["HBox"].render(childModel, context);
				}
				else {
					htmlString += $KW["VBox"].render(childModel, context);
				}
			}
			else {                    
				if (boxModel.wType == "HBox" || boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL) {
					if (boxModel.percent == true ) {
						context.ispercent = true;
						var containerWt = "kwt" + childModel.containerweight;
						var alignment = $KW.skins.getWidgetAlignmentSkin(childModel);
						htmlString += "<div class = 'kcell " + containerWt + " " + alignment +  "' style='"+ $KW.skins.getChildMarginAsPaddingSkin(childModel) +"' >";                            
					}
					else {
						context.ispercent = false;
					}
					
					htmlString += $KW[childModel.wType].render(childModel, context);                
					if (boxModel.percent == true) {
						htmlString += "</div>";
					}
				}
				else
				{
					var vboxComputedSkin = " krow kwt100 ";
					htmlString += "<div class = '" + vboxComputedSkin + "' >";
					layoutDirection = $KW.skins.getWidgetAlignmentSkin(childModel)
					vboxComputedSkin = "kwt100";
					vboxComputedSkin += " kcell " + layoutDirection;                
					htmlString += "<div class = '" + vboxComputedSkin +  "' style='"+ $KW.skins.getChildMarginAsPaddingSkin(childModel) +"' >";                        
					htmlString += $KW[childModel.wType].render(childModel, context);
					htmlString += "</div></div>";
				}
			}
		}                    
		return htmlString;
    }, 

    //Box Methods   	
	add: function() {

		var boxobj = arguments[0];

		if(boxobj && "add" in boxobj) {
			var widarray = [].slice.call(arguments,1);
			boxobj.add(widarray);
		} 	
	},

	addAt: function(boxModel, widgetref, index) {

		if(widgetref == null) return;	
		boxModel && boxModel.addAt(widgetref, index);
	},

	remove: function(boxModel, widgetref){
		boxModel && boxModel.remove(widgetref);
	},

	removeAt: function(boxModel, index) {
		return boxModel && boxModel.removeAt(index);
	},

	widgets: function(boxModel) {
		return boxModel &&  boxModel.widgets();
	},

	DOMremove: function(boxModel, widgetref){
		var box = $KU.getNodeByModel(boxModel);
        if(box && widgetref){
			if(boxModel.wType == "HBox" || (boxModel.wType == "ScrollBox" && boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL))
				box = box.children[0]; 
			for(var i=0; i < boxModel.children.length; i++){	
				if(widgetref.id == boxModel.children[i]){
					box.removeChild(box.children[i]);
					break;
				}	
			}
           /* if(boxModel.wType == "ScrollBox" && boxModel.scrolldirection==constants.BOX_LAYOUT_HORIZONTAL)
                this.resetWidthScrollBox(boxModel,widgetref); */
        }
    },
	
	DOMremoveAll: function(boxModel){
		var box = $KU.getNodeByModel(boxModel);
		if(box){
			if(boxModel.wType == "HBox" || (boxModel.wType == "ScrollBox" && boxModel.orientation == constants.BOX_LAYOUT_HORIZONTAL))
				box = box.children[0];
			box.innerHTML = "";
		}
	},
    
    resetWidthScrollBox: function ( Model,widgetref){
        var box = document.getElementById(Model.pf + "_" + Model.id + "_parent"),cwt=0,scroller = document.getElementById(Model.pf + "_" + Model.id + "_scrollee");
        for(var i=IndexJL;i<Model.children.length;i++)
        {	
            if(widgetref.id==Model.children[i])
                continue;
            if(window[Model.pf][Model.children[i]])
            cwt+=window[Model.pf][Model.children[i]].containerWeight;	
        }
        //scroller.style.width=(cwt<box.offsetWidth*(cwt/100))?(box.offsetWidth+"px"):(box.offsetWidth*(cwt/100)+"px");
        scroller.style.width=(box.offsetWidth*(cwt/100)<box.offsetWidth)?(box.offsetWidth+"px"):(box.offsetWidth*(cwt/100)+"px");
	} 
}
