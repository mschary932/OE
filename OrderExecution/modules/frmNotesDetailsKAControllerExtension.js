	
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
kony.sdk.mvvm.frmNotesDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        var scopeObj = this;
        scopeObj.$class.$super.call(scopeObj,controllerObj);
        scopeObj.controllerExtensionGen = undefined;
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
    bindData: function(dataMap) {
        try {    
			var scopeObj = this;
			var utilitiesObj = utilities.getUtilityObj();
			var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("MONTHANDDATE");
			var processedData = {};
			processedData["lblNotesDescKA"] = dataMap["form"][0]["Title"];
			var lclText = (dataMap["form"][0]["modifiedby"] && dataMap["form"][0]["lastmodifiedts"]) ? utilitiesObj.geti18nValueKA("i18n.Notes.frmNotesDetailsKA.lblUpdatedCreatedOnKA.ValueKA") : "";
			var lclTimeStamp = (dataMap["form"][0]["modifiedby"] && dataMap["form"][0]["lastmodifiedts"]) ? dataMap["form"][0]["lastmodifiedts"] : "";
			processedData["lblUpdatedCreatedOnKA"] = (dataMap["form"][0]["modifiedby"] && dataMap["form"][0]["lastmodifiedts"]) ? (lclText + convertTimeZone(moment(lclTimeStamp,kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat)) : "";
			var lclUserName = (dataMap["form"][0]["modifiedby"] && dataMap["form"][0]["lastmodifiedts"]) ? (dataMap["form"][0]["modFirstName"]+" "+dataMap["form"][0]["modFirstName"]) : "";
			processedData["lblUpdatedCreatedByKA"] = lclUserName ? (utilitiesObj.geti18nValueKA("i18n.Notes.frmNotesDetailsKA.lblUpdatedCreatedByKA.ValueKA") + " "+lclUserName) : "";
			processedData["lblDescKA"] = dataMap["form"][0]["Description"];
			processedData["lblCreatedOnValKA"] = convertTimeZone(moment(dataMap["form"][0]["createdts"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);          
			processedData["lblCreatedByValKA"] = dataMap["form"][0]["createdFirstName"]+" "+dataMap["form"][0]["createdLastName"];
			dataMap["form"] = processedData;		  
			scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
			scopeObj.getController().getFormModel().showView();
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },    
    showPreviousForm: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload, "frmNotesListKA");
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
    },
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },    
    performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (error) {
            kony.appfoundation.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    }*/
});
