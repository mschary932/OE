/*
 * Widget : TextArea
 */
 
$KW.TextArea =
{	
    initialize: function(){
        kony.events.addEvent("change", "TextArea", this.eventHandler);
		kony.events.addEvent("keyup", "TextArea", this.keyUpEventHandler);
    },

    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue)
	{
        var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
			
		switch (propertyName) 
		{
           case "text":		   
				element.value = propertyValue;
				break;
            
			case "maxtextlength":
            case "length":
				element.maxLength = propertyValue;
				break;
			
			case "placeholder":                
				element.setAttribute("placeholder", propertyValue);
				break;
            
            case "numberofvisiblelines":
                 element.setAttribute("rows", propertyValue);
            break;

            // for backward compatibility
            case "numberofrows":
                  element.setAttribute("rows", propertyValue);
            break;
            
            case "mode":
            case "textinputmode":
                if(propertyValue == constants.TEXTAREA_INPUT_MODE_ANY)
                    element.setAttribute("type", "text");
                else if(propertyValue == constants.TEXTAREA_INPUT_MODE_NUMERIC)
                        element.setAttribute("type", "number");
				break;   

            case "autocapitalize":
                element.setAttribute("autocapitalize", propertyValue == constants.TEXTAREA_AUTO_CAPITALIZE_NONE ? 'off' : 'on');
				break;

            case "keyboardtype":
            case "keyboardstyle":
                (textModel.mode != "P") && element.setAttribute("type",propertyValue);
				break;  
        }
    },

    render: function(textAreaModel, context){
		if(typeof textAreaModel.mode == 'undefined') textAreaModel.mode = textAreaModel.textinputmode;
		var computedSkin = $KW.skins.getWidgetSkinList(textAreaModel, context);
        switch (textAreaModel.mode) {
            case constants.TEXTAREA_INPUT_MODE_NUMERIC:
                type = "number";
                break;
            default:
                type = "text";
        }
        if (textAreaModel.keyboardtype) {
            switch (textAreaModel.keyboardtype) {
                case constants.TEXTAREA_KEY_BOARD_STYLE_EMAIL:
                    type = "email";
                    break;
                case constants.TEXTAREA_KEY_BOARD_STYLE_URL:
                    type = "url";
                    break;
                case constants.TEXTAREA_KEY_BOARD_STYLE_CHAT:
                    type = "chat";
                    break;
                case constants.TEXTAREA_KEY_BOARD_STYLE_DECIMAL:
                case constants.TEXTAREA_KEY_BOARD_STYLE_NUMBER_PAD:
                    type = "number";
                    break;
                case constants.TEXTAREA_KEY_BOARD_STYLE_PHONE_PAD:
                    type = "tel";
                    break;
            }
        }
		
		var style = $KG.disableViewPortScroll ? "pointer-events:none;" : "";
		style    += ";text-align:" + $KW.skins.getContentAlignment(textAreaModel) + ";";
		var maxtextlength = textAreaModel.length ||  textAreaModel.maxtextlength; //For backward compatibility
        var htmlString = "<textarea" + $KW.Utils.getBaseHtml(textAreaModel, context) + "class = '" + computedSkin + "' " + (textAreaModel.disabled ? "disabled='true'" : "") + " cols='15' rows='" + (textAreaModel.numberofvisiblelines || textAreaModel.numberofrows) + (textAreaModel.placeholder ? "' placeholder='" + textAreaModel.placeholder + "'" : "'") + (typeof maxtextlength === "number" ? "'  maxlength='"+maxtextlength+"'" : "'") + "' style='" + style + $KW.skins.getBaseStyle(textAreaModel, context) + " -" + vendor + "-text-security:" + (textAreaModel.securetextentry ? "circle":"none")  + (context.layoutDir && context.ispercent === false ? ";float:" + context.layoutDir : "") + "' type = '" + type+"' " + ((textAreaModel.autocapitalize) ? " autocapitalize='on'" : " autocapitalize='off'") + " onfocus='$KU.setActiveInput(this)' onblur='$KW.TextArea.onblurEventHandler(arguments[0], this)'>" + textAreaModel.text  +  "</textarea>";
		return htmlString;
		
    },
	
	onblurEventHandler: function(eventObject, target){
		var textModel = $KU.getModelByNode(target);
		textModel && $KU.onHideKeypad(textModel);
	},
	
    eventHandler: function(eventObject, target){    
      	var textModel = $KU.getModelByNode(target);
        if (textModel) {
			textModel.canUpdateUI = false;
            textModel.text = target.value;
			textModel.canUpdateUI = true;
			target.getAttribute("kcontainerID") && $KW.Utils.updateContainerData(textModel, target, false);
			var textref = $KU.returnEventReference(textModel.ontextchange);
			//(textModel.blockeduiskin) && $KW.Utils.applyBlockUISkin(textModel);
            textref && textref.call(textModel,textModel);
           
        }
    },
	keyUpEventHandler : function(eventObject, target) {
        var textModel = $KU.getModelByNode(target);
		
		if(textModel) {
			textModel.canUpdateUI = false;
			textModel.text = target.value;
			textModel.canUpdateUI = true;
		}
		
        if (textModel.ondone && (eventObject.keyCode == 10 || eventObject.keyCode == 13))
        {           
            if (textModel) {
                target.getAttribute("kcontainerID") && $KW.Utils.updateContainerData(textModel, target, false, true);	
                var textref = $KU.returnEventReference(textModel.done || textModel.ondone);
                (textModel.blockeduiskin) && $KW.Utils.applyBlockUISkin(textModel);
                textref && textref.call(textModel,textModel);
            }
        }
		var textkeyupref = $KU.returnEventReference(textModel.onkeyup);
		textkeyupref && textkeyupref.call(textModel,textModel);
    }
	
}