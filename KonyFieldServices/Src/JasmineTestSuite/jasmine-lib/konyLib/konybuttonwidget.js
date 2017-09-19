/*
 * Widget : Button
 */ 
$KW.Button = {
	
    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Button widget.
     */
    initialize: function(){
        kony.events.addEvent("click", "Button", this.eventHandler);
    },
	
    /**
     * Updates the view of the button widget.
     */
    updateView : function(widgetModel, propertyName, propertyValue, oldPropertyValue){		
	
		var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
		
		switch (propertyName){ 	
			case "text":
				if($KU.isWindowsTablet)
					element.innerHTML = propertyValue;
				else
					element.value = propertyValue;
				break;
		}	
    },
    
    render: function(buttonModel, context){
		if(!buttonModel.buiskin) 
			buttonModel.buiskin = buttonModel.blockeduiskin;
        var computedSkin = $KW.skins.getWidgetSkinList(buttonModel, context);
		var htmlString = "";
		var skin = buttonModel.skin || "";
		var cAlign = $KW.skins.getContentAlignment(buttonModel);	
		
		if($KU.isWindowsTablet){
			htmlString = "<button" + $KW.Utils.getBaseHtml(buttonModel, context) + "type='button' class = '" + computedSkin + "'" +  " style='text-align:" + $KW.skins.getContentAlignment(buttonModel) + ";white-space:normal;word-wrap:break-word;" + $KW.skins.getBaseStyle(buttonModel, context) + (context.layoutDir && context.ispercent === false ? ";float:" + context.layoutDir : "") + "' kprogressskin='" + skin +"'>" + (buttonModel.displaytext.toString() == "true" ?  $KU.escapeHTMLSpecialEntities(buttonModel.text)  : "") + "</button>";        
		}
		else{
			htmlString = "<input" + $KW.Utils.getBaseHtml(buttonModel, context) + "type='button' class = '" + computedSkin + "'" + " style='text-align:" + $KW.skins.getContentAlignment(buttonModel) + ";white-space:normal;word-wrap:break-word;" + $KW.skins.getBaseStyle(buttonModel, context) + (context.layoutDir && context.ispercent === false ? ";float:" + context.layoutDir : "") + "'" + (buttonModel.displaytext.toString() == "true" ? " value='" + $KU.escapeHTMLSpecialEntities(buttonModel.text) + "'"  : "") + " kprogressskin='" + skin +"'/>";    
		}
			
        return htmlString;
    },
    
    
    /**
     * Event Handler invoked by the SPA framework when button is clicked.
     *
     */
    eventHandler: function(eventObject, target) {
        var buttonModel = $KU.getModelByNode(target), containerId = target.getAttribute("kcontainerID");
        //If the widget is a segment child, update segment data i.e focusedindex and focuseditem
        if(containerId) {
            $KW.Utils.updateContainerData(buttonModel, target, true);
        } 
		else if(buttonModel.onclick) {
            var buttonhandler = $KU.returnEventReference(buttonModel.onclick);
            if(buttonhandler && buttonModel.blockeduiskin) $KW.Utils.applyBlockUISkin(buttonModel);
            // Setting the progress indicator.
            target.setAttribute("selected", "progress");
            // Before making the AJAX call to handle the button event, register for the button unload event
            var buttUnloadEvent = new kony.events.KUnloadEvent(buttonModel.pf, buttonModel.id, "Button", $KW.Button.unloadEventHandler);
            $KG[kony.constants.SELECTED_ITEM] = buttUnloadEvent;            
            buttonhandler.call(buttonModel, buttonModel);
        }
    }
}
