
/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderListKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmNotesListKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.controllerExtensionGen = undefined;
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
        }
    },
    /*prepareFetchAndBindDataStrategy: function() {
        try {
            this.$class.$superp.prepareFetchAndBindDataStrategy.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare fetch and bind data : " + error);
        }
    },
    updateBLogicContextData: function(widgetMapping) {
        try {
            this.$class.$superp.updateBLogicContextData.call(this, widgetMapping);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic update context data : " + error);
        }
    },
    fetchAndBindDataByWidgetGroup: function(widgetGroupId) {
        try {
            this.$class.$superp.fetchAndBindDataByWidgetGroup.call(this, widgetGroupId);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data for widget : " + error);
        }
    },*/
    bindData: function(dataMap) { //binding data to segment
        try {
           var scopeObj = this;
           var processedSegData = [];
		   var controller = scopeObj.getController();
           var appContext = controller.getApplicationContext();
	       var OEControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
           var Status_id=OEControllerExtension.statusID;
		   var formModel = scopeObj.getController().getFormModel();
           var segData = dataMap["segNotesListKA"];         
           processedSegData = scopeObj.formatData(segData, scopeObj);
		   dataMap["segNotesListKA"] = {};
           dataMap["segNotesListKA"]["segNotesListKA"] = processedSegData;           
           this.$class.$superp.bindData.call(this,dataMap);
		   scopeObj.getController().getFormModel().showView();
		   scopeObj.enableDisableAddNotesButton(Status_id, formModel);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },    
    formatData: function(segData, scopeObj) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var scopeObj = this;
            var processedRowObj;
			var timeandsecFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("TIMEHOURSANDMIN");
            for (var i in segData) {            	
                processedRowObj = {};                
                processedRowObj["createdby"] = (segData[i]["modifiedby"] && segData[i]["lastmodifiedts"]) ? 
				utilitiesObj.geti18nValueKA("i18n.Notes.frmNotesDetailsKA.lblUpdatedCreatedOnKA.ValueKA") : utilitiesObj.geti18nValueKA("i18n.Notes.frmNotesDetailsKA.lblCreatedOnKA.ValueKA");
                var lclTimeStamp = (segData[i]["modifiedby"] && segData[i]["lastmodifiedts"]) ? segData[i]["lastmodifiedts"] : segData[i]["createdts"];
                processedRowObj["createdts"] = scopeObj.formtaNotesTime(lclTimeStamp,convertTimeZone(moment(lclTimeStamp,kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,kony.servicesapp.DB_DATE_FORMAT),kony.servicesapp.DB_DATE_FORMAT);
                processedRowObj["Note_id"] = convertTimeZone(moment(lclTimeStamp,kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeandsecFormat);
                processedRowObj["Title"] = segData[i]["Title"];           
				var lclUserName = segData[i]["FirstName"]+" "+segData[i]["LastName"];
                processedRowObj["modifiedby"] = utilitiesObj.geti18nValueKA("i18n.Notes.frmNotesDetailsKA.lblUpdatedCreatedByKA.ValueKA") + " "+lclUserName;
                processedRowObj["notes_id"] = segData[i]["Note_id"];
                processedSegData.push(processedRowObj);
            }
            return processedSegData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatData : " + err);
        }
    },    
    formtaNotesTime: function(notesDate,convertedNotesDate,timeFormat){
    	var todayDate = moment().format(kony.servicesapp.DB_DATE_FORMAT);
    	var modifiedNotesDate = moment(convertedNotesDate,timeFormat).add(kony.servicesapp.MAX_ALLOWED_DAYS,"days").format(kony.servicesapp.DB_DATE_FORMAT); 
    	var returnDate;
    	if(notesDate<=todayDate && modifiedNotesDate>todayDate){		
    		returnDate = moment(convertedNotesDate,timeFormat).from(moment());
    	}else{
    		returnDate = (moment(convertedNotesDate,timeFormat).format(kony.servicesapp.NOTES_LIST_DISPLAY_FORMAT));
    	} 
    	return returnDate;  	
    },    
    showPreviousForm: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload, "frmOrderExecutionKA");
    },    
    showNotesDetailsForm: function() { //navigating to Order Execution form with data
        try {
			var scopeObj = this;
			var datamodel = new kony.sdk.mvvm.DataModel();
            var selRecord = scopeObj.getController().getFormModel().getViewAttributeByProperty("segNotesListKA", "selectedItems")[0];
            datamodel.setPrimaryKeyValueMap({"Note_id":selRecord.notes_id});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			navigationObject.setQueryParams("form", {
                "x": selRecord.notes_id
            });
            scopeObj.navigateTo("frmNotesDetailsKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showOrderExecutionForm : " + err);
        }
    },	
	navigateToAdd: function(){
		try {
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
			navigationObject.addCustomInfo("workorderid", this.getController().getContextData().getCustomInfo("workorderid"));
			kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMCREATENOTESKA).loadDataAndShowForm(navigationObject);
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToAdd : " + err);
        }
    	
    },
enableDisableAddNotesButton : function(statusVal,formModel){
		try{
			var workOrderStatus = kony.servicesapp.servicesStatus.key;	
			if(statusVal.toLowerCase() == "started")
           {
                   formModel.setViewAttributeByProperty("btnAddKA", "isVisible", true);
           }

			else{
				formModel.setViewAttributeByProperty("btnAddKA", "isVisible", false);
			}
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic enableDisableAddNotesButton :" +error);
		}
	},
    /*fetchMasterData: function(successcallback, errorcallback) {
        this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
    },
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, widgetId, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch metadata : " + error);
        }
    },
    saveRecord: function(recordObject, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },
    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            this.$class.$superp.saveRecords.call(this, recordsArray, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
        }
    },
    getEntitiesDataMap: function() {
        try {
            return this.$class.$superp.getEntitiesDataMap.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
        }
    },
    saveData: function(successCallback, errorCallback) {
        try {
            this.$class.$superp.saveData.call(this, successCallback, errorCallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save data : " + error);
        }
    },
    deleteData: function() {
        try {
            this.$class.$superp.deleteData.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic delete data : " + error);
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },*/
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    /*performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (error) {
            kony.appfoundation.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    }*/
});
