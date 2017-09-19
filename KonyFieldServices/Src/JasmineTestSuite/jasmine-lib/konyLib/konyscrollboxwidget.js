/*
 * Widget : Scrollbox 
 * 		(orientation = 1 | 2 == horizontal | vertical)
 *		(scrolldirection = 1 | 2| 3 | 4 == horizontal | vertical | both | none)	
 */
$KW.ScrollBox = {
	
    initialize: function(){
		kony.events.addEvent("click", "ScrollBox", this.eventHandler);
        kony.events.addEvent("onorientationchange", "ScrollBox", this.adjustBoxDimensions);
    },
	
	initializeView: function(formId){		
        this.adjustBoxDimensions(formId);
	},
	
    updateView : function(widgetModel, propertyName, propertyValue, oldPropertyValue){		
        switch (propertyName) 
		{
			case "heightreference":
			case "containerheightreference":
				if(propertyValue > 0){
					widgetModel.containerheightreference = widgetModel.heightreference = propertyValue;
					var boxNode = $KU.getNodeByModel(widgetModel);
					boxNode && $KU.setScrollHeight(widgetModel, boxNode);
				}
				break;
				
			case "container_height":
			case "containerheight":
				widgetModel.containerheight = widgetModel.container_height = propertyValue;
				var boxNode = $KU.getNodeByModel(widgetModel);
				boxNode && $KU.setScrollHeight(widgetModel, boxNode);
				break;
				
			case "totalWt":
				var boxNode = $KU.getNodeByModel(widgetModel);
				if(boxNode && widgetModel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
				{
					// scrollee
					boxNode.parentNode.style.width = propertyValue + "%";
					var scrollerInstance = $KG[widgetModel.pf + "_" + widgetModel.id + '_scroller'];
					scrollerInstance && scrollerInstance.refresh();
				}
				break;
			
			case "showscrollbars":
				if(widgetModel.scrollArrowConfig || widgetModel.scrollarrowconfig) 
					return;

				var scrollerId = widgetModel.pf + "_" + widgetModel.id + "_scroller";
				var scrollerInstance = $KG[scrollerId];
				if(!scrollerInstance)
					return;
				
				if(scrollerInstance.hScroll)
				{
					scrollerInstance.hScrollbar = propertyValue;
					!!propertyValue && scrollerInstance._scrollbar('h');
				}
				if(scrollerInstance.vScroll)
				{
					scrollerInstance.vScrollbar = propertyValue;
					!!propertyValue && scrollerInstance._scrollbar('v');
				}
                break;
			
			// scroll events
			case "scrollingevents":
				// do nothing
				break;

			case "onpull":
			case "onpush":
				// Dynamically append node pull / push
				// destroy n initialize scrollbox
				var _scrolleeId = widgetModel.pf + "_" + widgetModel.id + "_scrollee";
				var _scrollerId = widgetModel.pf + "_" + widgetModel.id + "_scroller";
				var wId = widgetModel.pf + "_" + widgetModel.id;
				var scrolleeNode = $KU.getElementById(_scrolleeId);
				if(!scrolleeNode)
					return;
					
				var div = document.createElement('div');
				
				if(propertyName == "onpull")
				{
					var pullDownEl = document.querySelector("#" + wId + "_pullDown");
					if(pullDownEl)
						return;

					div.innerHTML = $KU.getPullString(widgetModel);
					scrolleeNode.insertAdjacentElement("afterBegin", div.childNodes[0]);	// pull
				}
				else
				{
					var pullUpEl = document.querySelector("#" + wId + "_pullUp");
					if(pullUpEl)
						return;
					
					div.innerHTML = $KU.getPushString(widgetModel);
					scrolleeNode.insertAdjacentElement("afterEnd", div.childNodes[0]);		// push
				}
				
			// destroy n initialize scrollbox
			case "onreachingbeginning":
			case "onreachingend":
				var _scrollerId = widgetModel.pf + "_" + widgetModel.id + "_scroller";
				var scrollerNode = document.getElementById(_scrollerId);
				if(!scrollerNode)
					return;

				// destroy
                var scrollerInstance = $KG[_scrollerId];
                scrollerInstance && scrollerInstance.destroy();
				
				// initialize
                $KW.Scroller.initialize([scrollerNode]);
				break;
		}
    },
		
	render: function(widgetModel, context)
	{
		var htmlString = "";
		context.scrollBoxID = widgetModel.id; //to adjust scroll width once all the imgs are loaded in scrollbox
		
		if (IndexJL) this.setarrowconfigs(widgetModel);
		if($KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9))
		{
			widgetModel.scrollbar = "arrows";
			if(widgetModel.orientation == constants.BOX_LAYOUT_HORIZONTAL){	
				widgetModel.leftarrowimage =  widgetModel.leftarrowimage || "prvarw.png";
				widgetModel.rightarrowimage =  widgetModel.rightarrowimage || "nxtarw.png";
			}
			else{
				widgetModel.toparrowimage =  widgetModel.toparrowimage || "toparw.png";
				widgetModel.bottomarrowimage =  widgetModel.bottomarrowimage || "botarw.png";
			}
		}
		
		var accessAttr = $KU.getAccessibilityValues(widgetModel);

		//Removing accessibility for scrollbox widget,when hidden is set. This is to make child elements accessible when hidden is set true for parent(only for containerWidgets).
		if(accessAttr.indexOf("aria-hidden")>0) {
			accessAttr = "";
		}
		
		if(widgetModel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
		    htmlString = $KW.ScrollBox.renderHBox(widgetModel, context, accessAttr);
		else	// vertical
		    htmlString = $KW.ScrollBox.renderVBox(widgetModel, context, accessAttr);
		
		context.scrollBoxID = "";
		return htmlString;
	},
	
	// hbox
    renderHBox: function(boxModel, context, accessAttr)
	{        
		var parentModel = kony.model.getWidgetModel(boxModel.pf, context.tabpaneID);
        var htmlString = "";
        var layoutDirection = $KW.skins.getWidgetAlignmentSkin(boxModel);
		var wID = boxModel.pf + "_" + boxModel.id;
		var scrollingevents = boxModel.scrollingevents;
		var cellWidth = "";
		
		var computedSkin = "", marginpadding = "";
        marginpadding += $KW.skins.getBaseStyle(boxModel, context);
       
		
		if (context.topLevelBox) 
		{
            var skinArray = $KW.skins.getSplitSkinsBetweenWidgetAndParentDiv(boxModel, context);
            computedSkin = skinArray[2];
            computedSkin += " " + $KW.skins.getWidgetAlignmentSkin(boxModel);
        }
        else 
		{
            htmlString += "<div class = 'krow kwt100' >";
				htmlString += "<div class = 'kcell kwt100' >";
            skinArray = $KW.skins.getSplitSkinsBetweenWidgetAndParentDiv(boxModel, context);
            computedSkin = skinArray[2];
            computedSkin += " " + $KW.skins.getWidgetAlignmentSkin(boxModel);
        }
		computedSkin += (!$KW.Utils.isWidgetVisible(boxModel, context)) ? " hide" : ""; 
		//the default aligmnent of widgets in side percentage scrollbox is left
		var scrollBoxAlignment = boxModel.percent? "text-align: left; vertical-align:top;":"";
        htmlString += "<div " + accessAttr + " id='" + wID + "_parent' class ='scrollerX " + computedSkin + "' style='" + marginpadding + scrollBoxAlignment+ "'>";
       
        
		if(boxModel.scrollbar == "arrows" && boxModel.leftarrowimage && boxModel.rightarrowimage)
            htmlString += $KW.touch.fadeHImages(boxModel);

		// scroller + scrollee
		var scrolldirection = $KW.stringifyScrolldirection[boxModel.scrolldirection];
        // Initialize scroller irrespective of scrolldirection
		//if (scrolldirection != "none")
		{
			// the minimum width of non percent box is 100%
			//if(boxModel.percent == false && boxModel.totalWt < 100) boxModel.totalWt = 100; //modified this if statement as the totalweight of the scrollbox should be minimum 100% even in case of percent as true
			if(boxModel.totalWt < 100) boxModel.totalWt = 100;
            htmlString += "<div id='" + wID + "_scroller' kwidgettype='KScrollBox' name='touchcontainer_KScroller' widgetType='hbox'  swipeDirection='" + scrolldirection + "' class ='kwt100 scrollerX' kformname='" + boxModel.pf + "' >";
				htmlString += "<div style='display:inline-block;xheight:100%;width:" + boxModel.totalWt + "%' id='" + wID + "_scrollee' kwidgettype='KTouchscroller' class=''>";
			
			computedSkin = "kwt100";
		}

        htmlString += "<div style='table-layout:fixed' class = 'ktable kwt100'" + $KW.Utils.getBaseHtml(boxModel, context) + ">";
			htmlString += "<div class = 'krow " + layoutDirection + " kwt100' >";

				// TODO:
				//htmlString += (scrollingevents && scrollingevents.onpull) ? this.getPullString() : "" ;
						
		var len = boxModel.children ? boxModel.children.length : 0;
        for (var i=0; i<len; i++) 
		{
            var childModel = parentModel[boxModel.children[i]];
			context.vLine = (childModel.wType == "Line") ? true : false;
            if (childModel.wType === "HBox" || childModel.wType === "VBox" || childModel.wType === "ScrollBox") 
			{
                context.topLevelBox = false;
                if (childModel.wType == "HBox")
                    htmlString += $KW["HBox"].render(childModel, context);
                else
                    htmlString += $KW["VBox"].render(childModel, context);
            }
            else 
			{
                /**
                 * Box Cell is drawn only if it is a percent box.
                 */
				 if (boxModel.percent == true) 
				 {
                    context.ispercent = true;
						cellWidth = childModel.containerweight;
					if(boxModel.totalWt && kony.appinit.isIE) //Table cells get hidden when their total width is more than 100 in IE
						cellWidth = Math.floor((100 * childModel.containerweight) / boxModel.totalWt);
                    var containerWt = "kwt"+cellWidth; // widgetModel.$KW.skins.getMarAdjustedContainerWeightSkin(childModel, (cellWidth || ""));
                    var alignment = $KW.skins.getWidgetAlignmentSkin(childModel);
                    //JSPFQA8899: in applymarginpaddinginbcgmode, we have to apply child margin as padding in kell node 
                    htmlString += "<div class = 'kcell " + containerWt + " " + alignment + "' style='"+ $KW.skins.getChildMarginAsPaddingSkin(childModel) +"' >";                   
                }
                else 
				{
                    context.ispercent = false;
                }
				
				htmlString += $KW[childModel.wType].render(childModel, context);
                if (boxModel.percent) 
                    htmlString += "</div>";
            }
        }
			//below snippet added to retain extra space in the dom.
			if($KG.appbehaviors.adherePercentageStrictly == true &&  boxModel.percent === true )
			{	
				boxModel.dummyNodeWidth= $KW.HBox.getExtraNodeWidth(boxModel);			
				htmlString+= "<div class = 'kcell kwt" + boxModel.dummyNodeWidth + "'  ></div>";
			}	        
		
		//TODO:
		//htmlString += (scrollingevents && scrollingevents.onpush) ? this.getPushString() : "" ;

        htmlString += "</div></div>"
		
        //if(scrolldirection != "none") 
		    htmlString += "</div></div>";
		htmlString += "</div>";
        if(!context.topLevelBox) 
            htmlString += "</div></div>";
    
		return htmlString;
    },
	
	// vbox
	renderVBox : function(boxModel, context, accessAttr)
    {
        var parentModel = kony.model.getWidgetModel(boxModel.pf, context.tabpaneID);
        var topLevelBox = context.toplevel;
        var layoutDirection = $KW.skins.getWidgetAlignmentSkin(boxModel);
        var htmlString = "";
		var wID = boxModel.pf + "_" + boxModel.id;
        var computedSkin = $KW.skins.getWidgetSkin(boxModel, context) + " " + $KW.skins.getMarPadAdjustedContainerWeightSkin(boxModel, 100);
		var scrollingevents = boxModel.scrollingevents;
		
        var marginpadding = "";		
        marginpadding += " " + $KW.skins.getBaseStyle(boxModel, context);    

        computedSkin += computedSkin + (!$KW.Utils.isWidgetVisible(boxModel, context) ? " hide" : "");        
		htmlString += "<div " + accessAttr + " id='" + wID + "_parent' class ='scrollerX " + computedSkin + "' style='"+marginpadding+"'>";
		
		if(boxModel.scrollbar == "arrows" && boxModel.bottomarrowimage && boxModel.toparrowimage)
            htmlString += $KW.touch.fadeVImages(boxModel);
			
		// scroller + scrollee
        var scrolldirection = $KW.stringifyScrolldirection[boxModel.scrolldirection];
        //if (scrolldirection != "none")
		{
            htmlString += "<div id='" + wID + "_scroller' kwidgettype='KScrollBox' name='touchcontainer_KScroller' widgetType='vbox' swipeDirection='" + scrolldirection + "' class ='scrollerX' kformname='" + boxModel.pf + "'>";
				htmlString += "<div id='" + wID + "_scrollee' style='xheight:100%;" + (scrolldirection == "vertical" ? "white-space: pre-line;" : "" ) + "' kwidgettype='KTouchscroller' class='scrolleeX'>";
		}	

		htmlString += (scrollingevents && scrollingevents.onpull) ? $KU.getPullString(boxModel) : "" ;

		if (topLevelBox)
		{
            htmlString += "<div style='table-layout:fixed' class = '" + computedSkin + "' id='" + wID + "' kformname='"+boxModel.pf+"'>";
        }
        else 
		{
            //var vboxComputedSkin = "kwt" + boxModel.containerweight + " " + layoutDirection + (!boxModel.isvisible ? " hide" : "");
            var vboxComputedSkin = "kwt100" + " " + layoutDirection + (!$KW.Utils.isWidgetVisible(boxModel, context) ? " hide" : "");			
            var skinArray = $KW.skins.getSplitSkinsBetweenWidgetAndParentDiv(boxModel, context);
            vboxComputedSkin = skinArray[2];
            htmlString += "<div style='table-layout:fixed' class='ktable kwt100'" + $KW.Utils.getBaseHtml(boxModel, context) + ">";
        }
        
        var len = boxModel.children ? boxModel.children.length : 0;
        for (var i=0; i<len; i++) 
		{
            var childModel = parentModel[boxModel.children[i]];
            if (childModel.wType === "HBox" || childModel.wType === "VBox" || childModel.wType === "ScrollBox") {
                context.topLevelBox = false;
                
                if (childModel.wType == "HBox") {
                    context.ispercent = boxModel.percent;
                    htmlString += $KW["HBox"].render(childModel, context);
                }
                else {
                    htmlString += $KW["VBox"].render(childModel, context);
                }
            }
            else {
                vboxComputedSkin = " krow kwt100 ";
                htmlString += "<div class = '" + vboxComputedSkin + "' >";
                layoutDirection = $KW.skins.getWidgetAlignmentSkin(childModel)
                vboxComputedSkin = $KW.skins.getMarAdjustedContainerWeightSkin(childModel, "100");
                vboxComputedSkin += " kcell " + layoutDirection;                
                htmlString += "<div class = '" + vboxComputedSkin + "' >";                
				htmlString += $KW[childModel.wType].render(childModel, context);
                htmlString += "</div></div>";
            }
        }
        
         htmlString += "</div>";
        if (topLevelBox)
            htmlString += "</div>";
		
		htmlString += (scrollingevents && scrollingevents.onpush) ? $KU.getPushString(boxModel) : "" ;

        //if (scrolldirection != "none")
			htmlString += "</div></div>";
		
		htmlString += "</div>";
        
        return htmlString;
    },
	
    eventHandler: function(eventObject, target, sourceFormID){
		
       	var boxWidgetModel = $KU.getModelByNode(target);		
		//If the widget is a segment child, update segment data i.e focusedindex and focuseditem         
        target.getAttribute("kcontainerID") && $KW.Utils.updateContainerData(boxWidgetModel, target, !boxWidgetModel.onclick);
        var scrollboxref = $KU.returnEventReference(boxWidgetModel.onclick);		
        scrollboxref && scrollboxref.call(boxWidgetModel,boxWidgetModel);
    },  
	
    adjustBoxDimensions: function(formId){
		$KU.setScrollBoxesHeight(formId, "ScrollBox");
	},
	
    adjustArrowPosition: function(id)
    {
		var vFades = document.querySelectorAll("#" + id + "_scrollFades_V > div");
		var hFades = document.querySelectorAll("#" + id + "_scrollFades_H > div");
		
		if(hFades.length > 0)
		{
			
			hFades[0].style.top = Math.floor((hFades[0].parentNode.offsetHeight - (hFades[0].childNodes[0].naturalHeight || hFades[0].childNodes[0].height)) / 2) + "px";
			hFades[1].style.top = Math.floor((hFades[1].parentNode.offsetHeight - (hFades[1].childNodes[0].naturalHeight
			|| hFades[1].childNodes[0].height)) / 2) + "px";
		}
		if(vFades.length > 0)
		{
			vFades[0].style.left = Math.floor((vFades[0].parentNode.offsetWidth - (vFades[0].childNodes[0].naturalHeight || vFades[0].childNodes[0].height)) / 2) + "px";
			vFades[1].style.left = Math.floor((vFades[1].parentNode.offsetWidth - (vFades[1].childNodes[0].naturalHeight
			|| vFades[0].childNodes[0].height)) / 2) + "px";
		}
    },

    setarrowconfigs: function(widgetModel){
	
		var scrollArrowConfig = widgetModel.scrollarrowconfig;
		if (scrollArrowConfig)
			widgetModel.scrollbar = "arrows";
		if (scrollArrowConfig && scrollArrowConfig.length >= 4){
			widgetModel.leftarrowimage = scrollArrowConfig[IndexJL];
			widgetModel.toparrowimage = scrollArrowConfig[IndexJL + 1];
			widgetModel.rightarrowimage = scrollArrowConfig[IndexJL + 2];
			widgetModel.bottomarrowimage = scrollArrowConfig[IndexJL + 3];
		}	
    },
	
	scrollToBeginning : function(widgetModel){
	
		//Bringing scrollbox also into view when scrolltoBegninging is called
		var node = $KU.getNodeByModel(widgetModel);
		if(node){
			var formScroller = $KG[widgetModel.pf + "_scroller"];		
			if(formScroller) 
				formScroller.scrollTo(0, node.offsetTop, 500);
			else
				window.scrollTo(0, node.offsetTop);
			var scrollerInstance = $KG[widgetModel.pf + "_" + widgetModel.id + '_scroller'];
			if(scrollerInstance)
			{
				if(widgetModel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
					scrollerInstance.scrollTo(scrollerInstance.minScrollX, 0, 500);
				else
					scrollerInstance.scrollTo(0, scrollerInstance.minScrollY, 500);
			}
		}
	},
    
	scrollToEnd : function(widgetModel)
	{
		//Bringing scrollbox also into view when scrolltoEnd is called
		$KW.Widget.setfocus(widgetModel);
		var scrollerInstance = $KG[widgetModel.pf + "_" + widgetModel.id + '_scroller'];
		if(scrollerInstance)
		{
			if(widgetModel.orientation == constants.BOX_LAYOUT_HORIZONTAL)
				scrollerInstance.scrollTo(scrollerInstance.maxScrollX, 0, 500);
			else
				scrollerInstance.scrollTo(0, scrollerInstance.maxScrollY, 500);
		}
	},
	
	adjustScrollChildrenWidth: function(boxModel)
	{
		var boxNode = $KU.getNodeByModel(boxModel);
		if(boxModel.percent && boxModel.totalWt && kony.appinit.isIE)
		{
			var row = boxNode.firstChild;
			var cells = row.childNodes;
			var totalWidth = boxModel.totalWt || 0;
			for(var i = 0; i < cells.length; i++) 
			{
				var childModel = boxModel[cells[i].firstChild.id.split("_")[1]];	
				var cellWt = Math.floor((100 * childModel.containerweight) / boxModel.totalWt);
				var newWt = kony.widgets.skins.getMarAdjustedContainerWeightSkin(childModel, cellWt || "");				
				cells[i].className = cells[i].className.replace(new RegExp("(^|\\s+)kwt([0-9]+)(\\s+|$)"), ' ');
				$KU.addClassName(cells[i], newWt);				
			}
		}
	},
	
	recalculateScrollBoxWidth: function(boxModel)
	{
		if(boxModel.orientation != constants.BOX_LAYOUT_HORIZONTAL)
			return;
			
	    var children = boxModel.ownchildrenref;
		var totalWt = 0;
		for (var i=0; i<children.length; i++)
		{
			totalWt += children[i].containerweight;
		}
		
		boxModel.totalWt = totalWt;
		// scrollee
		var boxNode = $KU.getNodeByModel(boxModel);
		if(boxNode == null)
            return;
		boxNode.parentNode.style.width = totalWt + "%";
		var scrollerInstance = $KG[boxModel.pf + "_" + boxModel.id + '_scroller'];
		scrollerInstance && scrollerInstance.refresh();
	}
}
