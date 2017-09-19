/* 
 * Widget : Label
 */
$KW.Label =
{
	 initialize: function(){             
     	kony.events.addEvent("click", "Label", this.eventHandler);
    },

    updateView : function(widgetModel, propertyName, propertyValue, oldPropertyValue)
    {
        var element = $KU.getNodeByModel(widgetModel);
        if(!element)
            return;

        switch (propertyName) {     
			case "text":
				if(!$KW.Utils.belongsToSegment(element))
					element.childNodes[0].innerHTML = propertyValue;
				break;		
			case "textCopyable":
				if(propertyValue && !widgetModel.disabled){
					$KU.addClassName(element, "enableSelection");
					$KU.removeClassName(element, "disableSelection");
				}
				else{
					$KU.addClassName(element, "disableSelection");
					$KU.removeClassName(element, "enableSelection");
				}
				break;	                 
        }
    },
  
    render: function(labelModel, context){
		
        var computedSkin = $KW.skins.getWidgetSkinList(labelModel, context);  
		var cAlign = $KW.skins.getContentAlignment(labelModel);	
        var htmlString ="";
         htmlString = "<div" + $KW.Utils.getBaseHtml(labelModel, context)  + "class = '" + computedSkin + "' style='text-align:" + cAlign + ";xoverflow:hidden;" + $KW.skins.getBaseStyle(labelModel, context);

        if(context.ispercent === false) 
            htmlString += "display:inline-block;" + (context.layoutDir ? ("float:" + context.layoutDir) : "");

        htmlString += "'";
			
		var accessAttr = $KU.getAccessibilityValues(labelModel);
		
        htmlString += "><label  " + accessAttr + " style='white-space:pre-wrap;word-wrap:break-word;text-align:" + cAlign + ";'>" + $KU.escapeHTMLSpecialEntities(labelModel.text) + "</label></div>";            
        return htmlString;
    },
	
	eventHandler: function(eventObject, target) {
        var labWidgetModel = $KU.getModelByNode(target), containerId = target.getAttribute("kcontainerID");
        //If the widget is a segment child, update segment data i.e focusedindex and focuseditem         
        if(containerId) {
            $KW.Utils.updateContainerData(labWidgetModel, target, true);
        } else {
            kony.events.executeBoxEvent(labWidgetModel);
        }
    }
}
