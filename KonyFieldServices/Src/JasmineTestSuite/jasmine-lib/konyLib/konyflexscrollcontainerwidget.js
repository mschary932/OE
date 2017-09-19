/*
 * Widget : FlexContainer
 */ 
$KW.FlexScrollContainer =
{	
	initialize: function(){
    	kony.events.addEvent("click", "FlexScrollContainer", this.eventHandler);
    	kony.events.addEvent("onorientationchange", "FlexScrollContainer", this.orientationHandler);
    },
	
	initializeView: function(formId){		
        //$KW.FlexContainer.adjustFlexContainers(formId,"FlexScrollContainer");
        $KW.FlexContainer.attachResizeEvent(formId,"FlexScrollContainer");
        $KW.Scroller.initializeFlexScrollContainers(formId);
	},

    orientationHandler: function(formId, orientation){
        //$KW.FlexContainer.adjustFlexContainers(formId, "FlexScrollContainer");
    },
	
    adjustFlexContainer: function(formId){
        $KW.FlexContainer.adjustFlexContainer(formId);
    },
    
    renderChildren: function(flexModel, wArrary, context){
        return $KW.FlexContainer.renderChildren(flexModel, wArrary, context);
    },
	
	/**
     * Updates the view of the FlexContainer widget.
     */
    updateView : function(widgetModel, propertyName, propertyValue, oldPropertyValue){		
       var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
        var scrollerInstance = this.getScrollerInstance(widgetModel);
        if(!scrollerInstance)
            return;
        
        var options =scrollerInstance.options;
		
		switch (propertyName){ 	

            case "enableScrolling":
                options.disableUserScroll = !widgetModel.enablescrolling;
                if(options.disableUserScroll){
					options.vScroll = false;
					options.hScroll = false;
                }else{
                    options.vScroll = true;
                    options.hScroll = true;
                }
                break;
            case "scrollDirection":
                var scrolldirection = $KW.stringifyScrolldirection[widgetModel.scrolldirection];
				if(widgetModel.wType == 'Form')
					scrolldirection = "vertical";
                if (scrolldirection == "vertical") 
                {
                    options.vScroll = true;
                    options.scrollbox = true;
                    //options.vScrollbar = true;
                }
                else if (scrolldirection == "horizontal") 
                {
                    options.hScroll = true;
                    options.scrollbox = true;
                    //options.hScrollbar = true;
                }
                else if (scrolldirection == "both") 	// both
                {
                    options.vScroll = true;
                    //options.vScrollbar = true;
                    options.hScroll = true;
                    //options.hScrollbar = true;
                    options.scrollbox = true;
                }else{
                    options.scrollbox = false;
                    options.vScroll = false;
                    options.hScroll = false;
                    scrollerInstance.options.disableUserScroll = true;
                }
				/*If there is a change in direction scrollee width need to be recalulated. 
				Added updatedDirection flag to force checkDomChanges to cacluate width even if there is no change in content width.*/
                scrollerInstance.updatedDirection = true;
                scrollerInstance._checkDOMChanges();
                scrollerInstance.updatedDirection = false;
                break;
            case "bounces":
            case "allowHorizontalBounce":
            case "allowVerticalBounce":
                options.bounce = widgetModel.bounce;
                options.hBounce = widgetModel.bounce ? widgetModel.allowhorizontalbounce : false;
                options.vBounce = widgetModel.bounce ? widgetModel.allowverticalbounce : false;
                break;
            case "horizontalScrollIndicator":
                options.hScrollbar = widgetModel.horizontalscrollindicator;
                break;
            case "verticalScrollIndicator":
                options.vScrollbar = widgetModel.verticalscrollindicator;
                break;
            case "onScrollStart":
                var onscrollstart = widgetModel.onscrollstart;
                if(onscrollstart)
                    options.onBeforeScrollStart = function(){
                        onscrollstart.call(widgetModel,widgetModel);
                    };
                break;
            case "onScrollTouchReleased":
                break;
            case "onScrolling":
                if(widgetModel.onscrolling){
                    var onscrolling = widgetModel.onscrolling;
                    options.onScrollMove = function(){
                        onscrolling.call(widgetModel,widgetModel);
                    };
                }
                break;
            case "onDecelerationStarted":
                break;
            case "onScrollEnd":
                if(widgetModel.onscrollend){
                    var onscrollend = widgetModel.onscrollend;
                    options.onScrollEnd = function(){
                        onscrollend.call(widgetModel,widgetModel);
                    };
                }
                break;
            case "contentOffset":
                $KW.FlexScrollContainer.setContentOffSet(widgetModel,widgetModel.contentOffset, true,scrollerInstance)
                break;
		}
        scrollerInstance.refresh();
    },
                
    getScrollerInstance : function(widgetModel){
        var scrollerId = widgetModel.pf + "_" + widgetModel.id + "_scroller";
        return $KG[scrollerId];
    },

	render: function(flexModel, context){
		return this.renderTableLayout(flexModel, context);
    },
	
	renderTableLayout: function(flexModel, context){
		var topLevel = context.topLevelBox;
		var computedSkin = "kwt100 " +  " ";
        computedSkin += $KW.skins.getWidgetAlignmentSkin(flexModel);
		var css =  (flexModel.skin || "") + $KW.skins.getVisibilitySkin(flexModel);
		var boxstyle = " table-layout:fixed;position:relative;height:100%" 		
		
		var htmlString = "";
        var wID = flexModel.pf + "_" + flexModel.id;
        var scrolldirection = $KW.stringifyScrolldirection[flexModel.scrolldirection];
        
        htmlString += "<div id='" + wID + "_scroller' kwidgettype='KFlexScrollContainer' name='touchcontainer_KScroller' widgetType='hbox'  swipeDirection='" + scrolldirection + "' class =' scrollerX " + css + "' style='" + $KW.skins.getBaseStyle(flexModel, context) + ";width:100%;height:100%' >";
        var height = "height:100%;";
        if(flexModel.parent.wType =='Form' && (flexModel.parent.layoutType == kony.flex.FLOW_VERTICAL 
                                                   || flexModel.parent.layoutType == kony.flex.FREE_FORM) 
                   || flexModel.parent.wType === "FlexScrollContainer" || flexModel.parent.wType === "FlexContainer"){
            height="height:100%;";
        }
        
        htmlString += "<div style='display:inline-block;width:100%;"+ height +";' id='" + wID + "_scrollee' kwidgettype='KTouchscroller' class=''>";
        
        htmlString += "<div  kformname='" + flexModel.pf + "' class = 'kwt100'" + $KW.Utils.getBaseHtml(flexModel, context) + " style='" + boxstyle + "'>";
			
        
		var wArrary = flexModel.widgets();
        if(wArrary.length > 0){
            htmlString += $KW.FlexContainer.renderChildren(flexModel, wArrary, context);			
		}
		
        htmlString += "</div></div></div>";
        return htmlString;
	},	
	
	forceLayout: function(flexModel, flexNode){
        $KW.FlexContainer.forceLayout(flexModel, flexNode);
        var scrollerInstance = this.getScrollerInstance(flexModel);
        if(!scrollerInstance || scrollerInstance.dragging)
            return;
      //  scrollerInstance.scroller.style.width = scrollerInstance.scroller.scrollWidth + "px"
       // scrollerInstance.scroller.style.height = scrollerInstance.scroller.scrollHeight+ "px"
        scrollerInstance.refresh();
        
	},	
	
    eventHandler: function(eventObject, target) {
        $KW.FlexContainer.eventHandler(eventObject, target);
    },
    
    getContentOffsetMeasured : function(flexModel){
        var contentOffSet = {x:0,y:0};        
        scrollerInstance = $KG[flexModel.pf + "_" + flexModel.id + '_scroller'];
        if(scrollerInstance){
            contentOffSet.x = -scrollerInstance.x;
            contentOffSet.y = -scrollerInstance.y;
        }
        return contentOffSet;
        
    },
    
    getContentSizeMeasured : function(flexModel){
        var contentSize  = {"width":0,"height":0};
        scrollerInstance = $KG[flexModel.pf + "_" + flexModel.id + '_scroller'];
        if(scrollerInstance){
            contentSize.width = scrollerInstance.scrollerW;
            contentSize.height = scrollerInstance.scrollerH;
        }
        return contentSize;
    },
    
    setContentOffSet: function(flexModel,contentOffSet, animate,scrollerInstance){
        
        if( typeof contentOffSet === "undefined" || contentOffSet === null
           || typeof contentOffSet.x === "undefined" 
           ||  typeof contentOffSet.y === "undefined"){
            return;
        }
        if(!scrollerInstance)
            scrollerInstance = $KG[flexModel.pf + "_" + flexModel.id + '_scroller'];
        var that = scrollerInstance;
        var left = 0,top=0;
        
        left = $KU.getValueByParentFrame(flexModel, $KU.getValueAndUnit(flexModel,contentOffSet.x),'x', flexModel.frame);
        top = $KU.getValueByParentFrame(flexModel, $KU.getValueAndUnit(flexModel,contentOffSet.y),'y', flexModel.frame);
        
        var pos = {left: -left, top: -top};
        
       //pos.left += that.wrapperOffsetLeft;
       //pos.top += that.wrapperOffsetTop;

        pos.left = pos.left >= that.minScrollX ? that.minScrollX : pos.left <= that.maxScrollX ? that.maxScrollX : pos.left;
        pos.top = pos.top >= that.minScrollY ? that.minScrollY : pos.top <= that.maxScrollY ? that.maxScrollY : pos.top;
        scrollerInstance.contentoffsetmove = true;
        scrollerInstance.scrollTo(pos.left, pos.top, (animate ? 1000 : 0));
        scrollerInstance.contentoffsetmove = false;
    },
    
    scrollToWidget : function(flexModel,widget, animate){
        if(widget.parent !== flexModel)
            return;
        var scrollerInstance = $KG[flexModel.pf + "_" + flexModel.id + '_scroller'];
        var widgetHTMLObj = $KW.Utils.getWidgetNode(widget);
        if(!widgetHTMLObj)
            return;
        var pos = scrollerInstance.scrollToElement(widgetHTMLObj.parentNode, (animate ? 1000 : 0));
        //scrollerInstance.scrollTo(pos.left, pos.top, (animate ? 1000 : 0));
        
    },
    scrollToEnd : function(flexModel,animate){        
        $KW.Widget.setfocus(flexModel);
        var scrollerInstance = $KG[flexModel.pf + "_" + flexModel.id + '_scroller'];
        if(scrollerInstance)
        {
            switch(flexModel.scrolldirection){
                case kony.flex.SCROLL_HORIZONTAL : 
                        scrollerInstance.scrollTo(scrollerInstance.maxScrollX, 0, 500);
                        break;
                case kony.flex.SCROLL_VERTICAL :
                        scrollerInstance.scrollTo(0, scrollerInstance.maxScrollY, 500);
                        break;
                case kony.flex.SCROLL_BOTH :
                        scrollerInstance.scrollTo(scrollerInstance.maxScrollX, scrollerInstance.maxScrollY, 500);
                        break;
            }
        }
    }
}