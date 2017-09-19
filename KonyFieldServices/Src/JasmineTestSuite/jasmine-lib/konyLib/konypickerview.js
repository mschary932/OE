/*
 * Widget : PickerView
 * frm1.pickerview104643995911709.masterData = [[["10", "Ten"], ["100", "Hundred"], ["1000", "Thousand"], ["10000", "TenThousand"], ["100000", "Laks"], 50], [["1", "One"], ["2", "Two"], ["3", "Three"], ["4", "Four"], ["5", "Five"], ["6", "Six"], ["7", "Seven"], 50]];

 * frm1.pickerview104643995911709.masterDataMap = [[[{key:"10", value:"Ten"}, {key:"100", value:"Hundred"}, {key:"1000", value:"Thousand"}, {key:"10000", value:"TenThousand"}, {key:"100000", value:"Laks"}], "key", "value", 50], [[{key:"1", value:"One"}, {key:"2", value:"Two"}, {key:"3", value:"Three"}, {key:"4", value:"Four"}, {key:"5", value:"Five"}, {key:"6", value:"Six"}, {key:"7", value:"Seven"}], "key", "value", 50]];
 */
 
$KW.PickerView =
{	
    initialize: function() {
        //kony.events.addEvent("click", "PickerView", this.eventHandler);
    },

    /**
     * Updates the view of the pickerview widget.
     */
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
        return;   //dummy implementation to avoid errors for unsupported features.Program flow returns from here.
        var picker = widgetModel[widgetModel.pf+"_"+widgetModel.id];
        if(!picker)
			return;
			
        switch(propertyName) {
            case "skin":
                $KW.Utils.updateDOMSkin(widgetModel, propertyValue, oldPropertyValue);
                break;

            case "isvisible":
                $KW.Widget.setvisibility(widgetModel, propertyValue);
                break;

            case "margin":
            case "padding":
                picker.picker && (picker.picker.style[propertyName] = $KU.joinArray(propertyValue, "% ") + "%");
                break;

            case "containerweight":
                if(picker.picker){
                    $KU.removeClassName(picker.picker.parentNode, $KW.skins.getMarPadAdjustedContainerWeightSkin(widgetModel, oldPropertyValue));
                    $KU.addClassName(picker.picker.parentNode, $KW.skins.getMarPadAdjustedContainerWeightSkin(widgetModel));
                }
                break;

            case "masterdata":
                widgetModel.selectedkeys = null;
                widgetModel.selectedkeyvalues = null;
                picker.createComponents(propertyValue, picker);
                break;

            case "masterdatamap":
                widgetModel.masterdatamap = propertyValue;
                widgetModel.selectedkeys = null;
                widgetModel.selectedkeyvalues = null;
                this.parseData(widgetModel);
                picker.createComponents(widgetModel.masterdata, picker);
                break;

            case "selectedkeys":
                if((!widgetModel.masterdata && !propertyValue)
                || (widgetModel.masterdata.length == propertyValue.length)) {
                    widgetModel.selectedkeys = propertyValue;
                    picker.setSelectedKeys(propertyValue);
                }
                break;
        }
    },

    render: function(widgetModel, context) {
        return '';   //dummy implementation to avoid errors for unsupported features.Program flow returns from here.
        this.parseData(widgetModel);

        var pickerSettings = {modal:false, display:"inline", wheels:widgetModel.masterdata, widgetModel:widgetModel, context:context};
        var picker = new $KW.konyPicker(widgetModel.pf+"_"+widgetModel.id, pickerSettings);
        return picker.picker.outerHTML;
    },

    setcomponentdata: function(widgetModel, index, data) {
        return;   //dummy implementation to avoid errors for unsupported features.Program flow returns from here.
        if(!widgetModel.masterdata || !data || (index < IndexJL) || (index > (widgetModel.masterdata.length - 1))) return;

        widgetModel.selectedkeys = null;
        widgetModel.selectedkeyvalues = null;

        //Check if data is in the masterdatamap format or masterdata format
        var format = "masterdata";
        if(data.length == (4+IndexJL)) {
            var compdata = data[0+IndexJL], compkey = data[1+IndexJL], compvalue = data[2+IndexJL];
            if(typeof compdata[IndexJL] == "object" && typeof compdata[IndexJL][compkey] != "undefined") {
                format = "masterdatamap";
            }
        }

        if((format=="masterdatamap" && !widgetModel.masterdatamap) || (format=="masterdata" && widgetModel.masterdatamap)) {
            //Throw Error
            return;
        } else if(format=="masterdatamap") {
            widgetModel.masterdatamap.splice(index, 1, data);
            this.parseData();
        } else if(format=="masterdata") {
            if(widgetModel.masterdatamap) {
                widgetModel.masterdatamap = null;
                widgetModel.selectedkeyvalues = null;
            }
            widgetModel.masterdata.splice(index, 1, data);
        }
        var picker = widgetModel[widgetModel.pf+"_"+widgetModel.id];
        picker.createComponents(widgetModel.masterdata, picker);
    },

    setselectedkeyincomponent: function(widgetModel, key, index) {
        return;   //dummy implementation to avoid errors for unsupported features.Program flow returns from here.
        if(!widgetModel.selectedkeys) return;

        if(widgetModel.masterdatamap) {
            var compdata = widgetModel.masterdatamap[index][0+IndexJL]
              , compkey = widgetModel.masterdatamap[index][1+IndexJL]
              , compvalue = widgetModel.masterdatamap[index][2+IndexJL];
            for(var i=IndexJL; i<compdata.length; i++) {
                if(compdata[i][compkey] == key) {
                    var keyvalues = {};
                    keyvalues[compkey] = compdata[i][compkey];
                    keyvalues[compvalue] = compdata[i][compvalue];
                    widgetModel.selectedkeyvalues.splice(index, 1, keyvalues);
                    break;
                }
            }
        }

        var data = widgetModel.masterdata[index];
        for(var i=IndexJL; i<(data.length-1); i++) {
            if(data[i][IndexJL] == key) {
                if(!widgetModel.masterdatamap) {
                    var keyvalues = (!IndexJL) ? [] : [null];
                    keyvalues.push(data[i][IndexJL]);
                    keyvalues.push(data[i][IndexJL+1]);
                    widgetModel.selectedkeyvalues.splice(index, 1, keyvalues);
                }
                widgetModel.selectedkeys.splice(index, 1, key);

                var picker = widgetModel[widgetModel.pf+"_"+widgetModel.id];
                picker.setSelectedKeys(widgetModel.selectedkeys);

                break;
            }
        }
    },

    parseData: function(widgetModel) {
        if(widgetModel.masterdatamap) {
            widgetModel.masterdata = (!IndexJL) ? [] : [null];
            for(var m=IndexJL; m<widgetModel.masterdatamap.length; m++) { //[null, [null, {key:'', value:''}, {key:'', value:''}], key, value, width]
                var tempMasterData = (!IndexJL) ? [] : [null];
                var compdata = widgetModel.masterdatamap[m][0+IndexJL];
                var compkey = widgetModel.masterdatamap[m][1+IndexJL];
                var compvalue = widgetModel.masterdatamap[m][2+IndexJL];
                var copmwidth = widgetModel.masterdatamap[m][3+IndexJL];
                for(var n=IndexJL; n<compdata.length; n++) { //[null, {key:'', value:''}, {key:'', value:''}]
                    var data = (!IndexJL) ? [] : [null];
                    data.push(compdata[n][compkey]);
                    data.push(compdata[n][compvalue]);
                    tempMasterData.push(data);
                }
                tempMasterData.push(copmwidth);
                widgetModel.masterdata.push(tempMasterData);
            }
        }
    },

    eventHandler: function(eventObject, target) { // (arguments.length == 3) came into picture as for the first time the event is not getting fired
        var widgetModel = (arguments.length == 3) ? arguments[2] : $KU.getModelByNode(target);
        var picker = (arguments.length == 3) ? arguments[1] : widgetModel[target.id];
        var componentIndex = (arguments.length == 3) ? arguments[0] : eventObject.data.componentIndex;
        if(picker && picker.picker && widgetModel && widgetModel.wType && ((arguments.length == 3) || (eventObject.type == "click" && eventObject.target.id == picker.picker.id+"_dw_set"))) {
            picker.setValue();
            widgetModel.selectedkeys = picker.getSelectedKeys();
            widgetModel.selectedkeyvalues = picker.getSelectedKeyValues();
            var component = componentIndex; //(widgetModel.masterdatamap) ? widgetModel.masterdatamap[eventObject.data.componentIndex] : widgetModel.masterdata[eventObject.data.componentIndex];
            var selectedkey = widgetModel.selectedkeys[componentIndex];
            var sethandler = $KU.returnEventReference(widgetModel.onselection);
            if(sethandler) sethandler.call(widgetModel, widgetModel, component, selectedkey);
            return false;
        }
    }
};