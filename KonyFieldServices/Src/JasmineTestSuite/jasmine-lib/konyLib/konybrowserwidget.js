/*
 * Widget : Browser
 */

$KW.Browser = {
    initialize: function(){
        kony.events.addEvent("onorientationchange", "Browser", this.orientationHandler);
    },
	
	initializeView: function(formId){
		$KU.setScrollBoxesHeight(formId, "Browser");
    },

	orientationHandler: function(formId, orientation) {
		$KU.setScrollBoxesHeight(formId, "Browser");
    },
    
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
       switch(propertyName){            
            case "requesturlconfig":
				if(IndexJL){
					widgetModel.url = propertyValue.url;
					widgetModel.method = propertyValue.requestmethod;
					widgetModel.data = propertyValue.requestdata;
				}
				var element = $KU.getNodeByModel(widgetModel);
				if(element)
					this.openUrllink(widgetModel.url, widgetModel.method, widgetModel.data, [widgetModel.pf,widgetModel.id].join('_'));
				break;
				
            case "htmlstring":
                var element = $KU.getNodeByModel(widgetModel);
                if(element)   
                    element.innerHTML = propertyValue;
				break; 
		}
    },

    openUrllink: function(url, method,  data, name){
      if(url) { 
       if(data && !data[0].length == 0){       
            var args = [];
            if(data instanceof Array && data[0] instanceof Array) {
                for(var i=0; i<data.length; i++) {
                    args.push([data[i][0] , data[i][1] ].join("="));
                }
            } else {
                for(var k in data) {
                    args.push(k + "=" + data[k]);
                }
            }
            args = args.join("&");
            if(args)
                url = url + "?" + args;
         }  
                
		window.open(url); 
                 
        }        
    },
    
    render: function(browserModel, context){
        var htmlString = "";
        var computedSkin = $KW.skins.getWidgetSkinList(browserModel, context); 
		$KU.updateScrollFlag(browserModel);
		htmlString += "<div  id='" + browserModel.pf + "_" + browserModel.id + "_scroller' class='scrollerX  " + computedSkin + "' kwidgettype='KScrollBox' name='touchcontainer_KScroller' swipeDirection ='vertical' style='" + $KW.skins.getBaseStyle(browserModel, context) + "'>" + 
		"<div id='" + browserModel.pf + "_" + browserModel.id + "_scrollee' class='form_scrollee' kwidgettype='KTouchscrollee'>";
					
		htmlString += "<div " + $KW.Utils.getBaseHtml(browserModel, context) + " style='" + $KW.skins.getPaddingSkin(browserModel) + "'>";
        if(browserModel.htmlstring)   
            htmlString += browserModel.htmlstring;
        else 
			this.openUrllink(browserModel.url, browserModel.method , browserModel.data, [browserModel.pf,browserModel.id].join('_'));
        htmlString += "</div>";
		
		htmlString += "</div></div>"; 		
        return htmlString;
    },

    eventHandler: function(eventObject, target){
    },
    
    unloadEventHandler: function(widget){
    
    },
    cangoback: function(webwidgetID){
            
    },
        
    cangoforward:function(webwidgetID) {
    
    },
        
    clearhistory:function(webwidgetID){
    
    },
    
    goback:function(webwidgetID){
        
    },
    goforward:function (webwidgetID){
        
    },
    reload:function (webwidgetID){
        
    }
}
