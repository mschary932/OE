/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */

/*
 * bussiness/orchestration/mediation logic class for frmDescriptionDetailsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmDescriptionDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.controllerExtensionGen = undefined;
        this.longDescription = "";
    },
    fetchData: function() {
    	try {
	    	this.$class.$superp.fetchData.call(this);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
		}
    },
    performFetchAndBindFormData: function(successcallback, errorcallback){
    	try {
	    	this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
		}
    },
    prepareFetchAndBindDataStrategy: function() {
    	try {
	    	this.$class.$superp.prepareFetchAndBindDataStrategy.call(this);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic prepare fetch and bind data : " + error);
		}
    },
   	updateBLogicContextData: function(widgetMapping){
    	try {
	    	this.$class.$superp.updateBLogicContextData.call(this, widgetMapping);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic update context data : " + error);
		}
    },
    fetchAndBindDataByWidgetGroup: function(widgetGroupId){
    	try{
    		this.$class.$superp.fetchAndBindDataByWidgetGroup.call(this, widgetGroupId);
    	}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic fetch data for widget : " + error);
		}
    },
   	bindData: function(dataMap) {
    	try {
			var scopeObj = this;
    		var descDetails = scopeObj.getFormModelInfo("descDetails");
    		var formmodel = scopeObj.getController().getFormModel();
    		formmodel.setViewAttributeByProperty("rchTxtDescriptionDetailsKA", "text", descDetails.fullText);
    		formmodel.setViewAttributeByProperty("lblHeaderKA", "text", descDetails.headerText);
			formmodel.showView();
        }catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
		}
    },
    fetchMasterData: function(successcallback, errorcallback){
    	this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
    },
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback){
    	try {
    		this.$class.$superp.fetchMasterDataForWidget.call(this, widgetId, successcallback, errorcallback);
    	}catch(error){
    		kony.sdk.mvvm.log.error("Error in Blogic fetch metadata : " + error);
    	}
    },
    saveRecord: function(recordObject, entityName, onSuccess, onError){
    	try{
    		this.$class.$superp.saveRecord.call(this, recordObject, entityName, onSuccess, onError);
    	}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
		}
    },
   	saveRecords: function(recordsArray, successcallback, errorcallback){
    	try{
    		this.$class.$superp.saveRecords.call(this, recordsArray, successcallback, errorcallback);
	    }catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
		}
    },
    getEntitiesDataMap: function(){
    	try{
	    	return this.$class.$superp.getEntitiesDataMap.call(this);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
		}
    },
    saveData: function(successCallback, errorCallback) {
    	try{
    		this.$class.$superp.saveData.call(this, successCallback, errorCallback);
        }catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic save data : " + error);
		}
    },
    deleteData: function() {
    	try{
    		this.$class.$superp.deleteData.call(this);
        }catch(error){
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
    navigateBack: function(){   
		try {
			this.$class.$superp.showPreviousForm.call(this,false);
		} catch(err) {
			kony.sdk.mvvm.log.error("error in Blogic navigateBack : " + err);
		}
    }
});