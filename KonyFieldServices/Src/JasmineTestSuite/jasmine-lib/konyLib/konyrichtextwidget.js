/*
 * Widget : RichText
 */
$KW.RichText = {
	
    initialize: function(){
        kony.events.addEvent("click", "RichText", this.eventHandler);
    },
    
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
        var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
			 
        switch (propertyName) 
		{
			case "text":
                element.innerHTML = propertyValue;
				break;
			case "linkskin":
                this.setLinkSkin(widgetModel);
				break;
			case "linkfocusskin":
                this.setLinkFocusSkin(widgetModel);
				break;
        }
    },
    
    render: function(richTextModel, context)
	{
		//DEF5780 : Windows phone 8 spa- menu popup is taking long time to show
		//while rendering richtext in segment, if you try to apply linkskin and linkfocusskin it is taking more time.
		// now we implemented linkskin and linkfocusskin using css generation.for android we are not providing focusskin thorug css.
		if( $KU.isAndroid) {
			this.setLinkSkin(richTextModel);	
			this.setLinkFocusSkin(richTextModel);
		}
		var computedSkin = $KW.skins.getWidgetSkinList(richTextModel, context);
		var htmlString = "<div" + $KW.Utils.getBaseHtml(richTextModel, context) + "class='" + computedSkin + "' style='" + $KW.skins.getBaseStyle(richTextModel, context);
            if (context.ispercent === false) 
                 htmlString += "display:inline-block;" + (context.layoutDir ? ("float:" + context.layoutDir) : "");
		 htmlString += ";text-align:" + $KW.skins.getContentAlignment(richTextModel) + "'>" + richTextModel.text + "</div>";
		if($KW.Utils.isWidgetDisabled(richTextModel,context))
			htmlString = htmlString.replace(/href=["'].*?["']/g,"href='javascript:void(0)'");
		return htmlString;
    },
   
    eventHandler: function(eventObject, target, data) {
        var richWidgetModel = $KU.getModelByNode(target), containerId = target.getAttribute("kcontainerID");
        //If the widget is a segment child, update segment data i.e focusedindex and focuseditem         
        if(containerId) {
            $KW.Utils.updateContainerData(richWidgetModel, target, true);
        } else if(richWidgetModel.onclick) {
            var richtextref = $KU.returnEventReference(richWidgetModel.onclick);
            if (data) 
                richtextref && richtextref.call(richWidgetModel,richWidgetModel, data[0], {href : data[1]});
            else 
                richtextref && richtextref.call(richWidgetModel,richWidgetModel);
        } else if(data && data[1]) {  // Fix for 26388: Support for internal page link if available else does nothing
            if(data[1].charAt(0) == "#"){	// Checking for hyperlink # reference and preventing default event action 
	            // Stopping default actions to prevent native internal page link jumping
	            kony.events.stopPropagation(eventObject);
	            kony.events.preventDefault(eventObject); 
            }
            var aLink = data[1].substring(1, data[1].length);
            var element = document.querySelector('a[name="'+aLink+'"]'); 
            var scrollerInstance = $KG[$KG["__currentForm"].id + '_scroller']; 	 
            if(scrollerInstance && element){
	            scrollerInstance.scrollToElement( element, 200);
            }
        }
    },
	
	setLinkSkin: function(richTextModel)
	{
		var linkSkin = richTextModel.linkskin;
		if(!linkSkin)
			return;
			
		var id = richTextModel.pf + "_" + richTextModel.id;
		var selector = "#" + id + " > a"
		$KW.Utils.applyStyle(linkSkin, selector);
	},	
	
	setLinkFocusSkin: function(richTextModel)
	{
		var linkFocusSkin = richTextModel.linkfocusskin;
		if(!linkFocusSkin)
			return;
		
		var id = richTextModel.pf + "_" + richTextModel.id;
		var selector = "#" + id + " > a:active"
		$KW.Utils.applyStyle(linkFocusSkin, selector);
	}
}