
/*
 * Widget : ListBox
 */
$KW.ListBox = {
   
    initialize: function(){    
        kony.events.addEvent("change", "ListBox", this.eventHandler);
      	 kony.events.addEvent("click", "ListBox", this.initializeEvents);
    },
    
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
		var element = $KU.getNodeByModel(widgetModel);
        switch (propertyName) {
			
            case "masterdatamap":
            case "masterdata":			
				var data = $KW.Utils.getMasterData(widgetModel);
                widgetModel.selectedkey = widgetModel.selectedkeys = widgetModel.selectedkeyvalue = widgetModel.selectedkeyvalues = null;


                if(element){
                    // IE fails to set innerHTML of select - 276228
					widgetModel.context.ispercent = "";

					var temp = document.createElement("div");
					temp.innerHTML = this.generateList(widgetModel, data, widgetModel.context);
					element.parentNode.replaceChild(temp.firstChild, element);
					//element.parentNode.innerHTML = this.generateList(widgetModel, data, widgetModel.context);
                    $KU.toggleVisibilty($KU.getNodeByModel(widgetModel), data, widgetModel);
                }
                break;
                
			case "selectedkeys":
				$KW.Utils.setSelectedValueProperty(widgetModel, $KW.Utils.getMasterData(widgetModel), "selectedkeys");
	            if (element){				
					if(element.tagName == 'SELECT') {
	                    var choices = element.options;
	                    if (choices.length > 0) {						
							for (var i = 0; i < choices.length; i++) {
								if (widgetModel.selectedkeys && $KU.inArray(widgetModel.selectedkeys, choices[i].value)[0]) 
									choices[i].selected = true;
								else 
									choices[i].selected = false;
							}
							if(!widgetModel.selectedkeys){
								if(!widgetModel.multiple)choices[0].selected = true; //Select the first option
								widgetModel.selectedkeyvalues = null;

							}						                      
	                    }
	                }
	                else if(element.tagName == 'DIV'){
						if(widgetModel.selectedkeys) {
							element.innerText = widgetModel.selectedkeyvalues[1][2];
						} else {
							element.innerText = widgetModel.masterdata[1][2];
						}
					}					
	            }
                break;
                
            case "selectedkey":
	            /*var element = $KU.getNodeByModel(widgetModel);
	            if (element) {
                    var choices = element.options;
                    if (choices.length > 0) {
						
						for (var i = 0; i < choices.length; i++) {
							if (widgetModel.selectedkey && $KU.inArray(widgetModel.selectedkey, choices[i].value)[0]) 
								choices[i].selected = true;
							else 
								choices[i].selected = false;
						}
						widgetModel.selectedkey &&	$KW.Utils.setSelectedValueProperty(widgetModel, $KW.Utils.getMasterData(widgetModel), "selectedkey");
						if(!widgetModel.selectedkey){
							if(!widgetModel.multiple)choices[0].selected = true; //Select the first option
							widgetModel.selectedKeyValue = null;
						}						                      
                    }
					
	            }*/
	            if (element) {
                    var key = widgetModel.selectedkey;
                    //widgetModel.selectedkey = key ? key : element.firstChild.value;
                    element.value = widgetModel.selectedkey;
                }
				$KW.Utils.setSelectedValueProperty(widgetModel, $KW.Utils.getMasterData(widgetModel), "selectedkey");
				widgetModel.selectedkeys = (widgetModel.selectedkey && ($KU.isArray(widgetModel.selectedkey) ? widgetModel.selectedkey : (IndexJL ? [null, widgetModel.selectedkey] : [widgetModel.selectedkey]))) || null;
				$KW.Utils.setSelectedValueProperty(widgetModel, $KW.Utils.getMasterData(widgetModel), "selectedkeys");
                break;          		
        }
    },
    
   render: function(listboxModel, context){
		if(!listboxModel.buiskin) listboxModel.buiskin = listboxModel.blockeduiskin;
		if(typeof $KW.konyPicker !== 'function' || listboxModel.view === 'popup') {
            listboxModel.view = 'native';
        }
		var data = $KW.Utils.getMasterData(listboxModel);
        data.ispercent = context.ispercent;	
		listboxModel.context = context;	
        return this.generateList(listboxModel, data, context);		
    },
	
    generateList: function(listboxModel, data, context){
            var computedSkin = $KW.skins.getWidgetSkinList(listboxModel, context, data) + " kselect";
        
        var multiple = listboxModel.multiple ? " multiple" : "";
        var size = listboxModel.multiselectrows ? " size=" + parseInt(listboxModel.multiselectrows) : ""
        var htmlString = "";

        if(!listboxModel.view || listboxModel.view == 'native')
		{
			//Giving right align support for CONTENT_ALIGN_MIDDLE_RIGHT using dir HTML property.
			var align = listboxModel.contentalignment == constants.CONTENT_ALIGN_MIDDLE_RIGHT ? " dir='rtl'":'';
            htmlString = "<select" + align + $KW.Utils.getBaseHtml(listboxModel, context) + "class='" + computedSkin + "' " + (listboxModel.disabled ? "disabled='true' " : "") + multiple + size + " style='" + $KW.skins.getBaseStyle(listboxModel, context)+ "'" +  ((kony.appinit.isIE8 || kony.appinit.isIE7) ? 'onchange=$KW.ListBox.eventHandler(arguments[0],this)' : '') + ">";
        

	        if (data.length > IndexJL) {
	            listboxModel.selectedkey && $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkey");
	            listboxModel.selectedkeys && $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkeys");
	            if (listboxModel.needsectionheaders) 
	                htmlString += this.generateGroupOptions(listboxModel, data);
	            else 
	                htmlString += this.generateOptions(listboxModel, data);
	        }
        	htmlString += "</select>";
        }
		else // custom dropdowns
		{
            var skin = 'kselect';
            skin += (listboxModel.skin) ? ' '+listboxModel.skin : ' klistbox';
            //Review -- make changes in markup as above
            htmlString += "<div " + $KW.Utils.getBaseHtml(listboxModel, context) + "  class='" + skin + ' ' + computedSkin + ' idevice kddicon" ' + (listboxModel.disabled ? 'disabled="true" ' : '') + multiple + ' style="text-align:left;">';

            if(!listboxModel.selectedkeys || listboxModel.selectedkeys.length < 1) {
                listboxModel.selectedkeys = [null, listboxModel.masterdata[IndexJL][IndexJL]];


                listboxModel.selectedkeys && $KW.Utils.setSelectedValueProperty(listboxModel, $KW.Utils.getMasterData(listboxModel), "selectedkeys");
                htmlString += listboxModel.masterdata[IndexJL][IndexJL+1];
            } else {
                for(var d=IndexJL; d<listboxModel.masterdata.length; d++) {
                    if(listboxModel.masterdata[d][IndexJL] === listboxModel.selectedkeys[IndexJL]) {
                        htmlString += listboxModel.masterdata[d][IndexJL+1];
                        break;
                    }
                }
            }

            htmlString += '</div>';
        }

        return htmlString;
    },
    initializeEvents: function(eventObject, target, sourceFormID){
        var listboxModel = $KU.getModelByNode(target);        
        if (listboxModel) {
            var data = $KW.Utils.getMasterData(listboxModel);
            if(target.tagName === 'DIV' && eventObject.type == 'click') {
                var picker = $KG[target.id];
                config = {display:'popup', wheels:[{'':data}]}; //config = {preset:'date'}  config = {wheels:[{data:data}]}

                if(listboxModel.view === 'spinningWheel') {
                    config.mode = 'scroller';
                    if(listboxModel.viewstyle === 'iphone') {
                        config.theme = 'ios';
                        config.dock = ($KU.isiPhone) ? 'bottom' : '';
                    } else if(listboxModel.viewstyle === 'android') {
                        config.theme = 'android';
                        config.dock = '';
                    } else if(listboxModel.viewstyle === 'native') {
                        if($KU.isIDevice) {
                            config.theme = 'ios';
                            config.dock = ($KU.isiPhone) ? 'bottom' : '';
                        } else if($KU.isAndroid) {
                            config.theme = 'android';
                            config.dock = '';
                        }
                    }
                } else if(listboxModel.view === 'clickPick') {
                    config.mode = 'clickpick';
                    if(listboxModel.viewstyle === 'iphone') {
                        config.theme = 'ios';
                        config.dock = '';
                    } else if(listboxModel.viewstyle === 'android') {
                        config.theme = 'android';
                        config.dock = '';
                    } else if(listboxModel.viewstyle === 'native') {
                        if($KU.isIDevice) {
                            config.theme = 'ios';
                            config.dock = '';
                        } else if($KU.isAndroid) {
                            config.theme = 'android';
                            config.dock = '';
                        }
                    }
                } else if(listboxModel.view === 'popup') {
                    if(listboxModel.viewstyle === 'iphone') {
                        //
                    } else if(listboxModel.viewstyle === 'android') {
                        //
                    } else if(listboxModel.viewstyle === 'native') {
                        if($KU.isIDevice) {
                            //
                        } else if($KU.isAndroid) {
                            //
                        }
                    }
                }

                if(picker) {
                    picker.show();
                } else {
                    picker = new $KW.konyPicker(target.id, config);
                }
            }
        }
    },
	
	
    generateOptions: function(listboxModel, data){
        var htmlString = "";
        var selected = false;
        for (var i = IndexJL; i < data.length; i++) {
            if (data[i][IndexJL] != null) {
                if (listboxModel.selectedkey) 
                    selected = (listboxModel.selectedkey == data[i][IndexJL]) ? "selected" : "";
                else 
                    selected = (listboxModel.selectedkeys && $KU.inArray(listboxModel.selectedkeys, data[i][IndexJL])[0]) ? "selected" : "";
				var ariaString	= $KU.getAccessibilityValues(listboxModel, data[i][2+IndexJL], data[i][IndexJL]);
                htmlString += "<option value=\"" + data[i][IndexJL] + "\" " + selected + ariaString + ">" + $KU.escapeHTMLSpecialEntities(data[i][1 + IndexJL] ) + "</option>";
            }
        }
        return htmlString;
    },
	
    eventHandler: function(eventObject, target){
		
        var listboxModel = $KU.getModelByNode(target);
        if (listboxModel) {
        	var data = $KW.Utils.getMasterData(listboxModel);
			var selectedkeys = (IndexJL == 1 ? [null] : []);
			if(target.tagName == 'SELECT') {
                for (var i=0; i < target.options.length; i++) {
                    if(target.options[i].selected) {
                    	listboxModel.selectedkey = target.options[i].value;


                        selectedkeys.push(target.options[i].value);
                    }
                }
            } else if(target.tagName == 'DIV') {
                var prevSelectedKeys = listboxModel.selectedkeys;
                var picker = $KG[target.id];
                if(picker) {
                    selectedkeys.push(picker.val);
                }
            }
			listboxModel.selectedkeys = selectedkeys;


            var inputElements=target.childNodes;
            for(var i=0;i<inputElements.length;i++){
                    inputElements[i].removeAttribute("selected");
            }
            if(listboxModel.multiple){
                for(var j=0;j<listboxModel.selectedkeys.length;j++){
                    for(var i=0;i<inputElements.length;i++){
                         var selectElement= (listboxModel.selectedkeys[j] == data[i][0]) ? "selected" : "";
                         if( selectElement=="selected"){
                         target.childNodes[i].setAttribute("selected","");
                         break;
                        }
                    }
                }
            }else{
                for(var i=0;i<inputElements.length;i++){
                     var selectElement= (listboxModel.selectedkey == data[i][0]) ? "selected" : "";
                     if( selectElement=="selected"){
                     target.childNodes[i].setAttribute("selected","");
                     break;
                    }
                }
            }

            $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkey");
			$KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkeys");
            if (( listboxModel.ondone || listboxModel.onselection ) && listboxModel.blockeduiskin) {
                $KW.Utils.applyBlockUISkin(listboxModel);                
            }

            if(target.tagName == 'SELECT' || (target.tagName == 'DIV' && picker && prevSelectedKeys && prevSelectedKeys[IndexJL] !== picker.val)) {           
	            var listboxHandlr = $KU.returnEventReference(listboxModel.ondone || listboxModel.onselection);
	            listboxHandlr && listboxHandlr.call(listboxModel,listboxModel);
	        }
        }
    }
}
