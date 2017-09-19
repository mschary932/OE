//With fixes
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
kony.sdk.mvvm.frmCreateNotesKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
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
		var scopeObj = this;
        try {
           var formmodel = scopeObj.getController().getFormModel();
		   formmodel.setViewAttributeByProperty("txtAreaNotesValueKA", "text", '');
           scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);       
           formmodel.showView();
        } catch (error) {           
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
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
    },*/
    saveData: function(recordObject, onSuccess, onError) {
        try {
			var scopeObj = this;
        	var recordObject = scopeObj.getRecordsDataMap();
        	recordObject[0]["createdts"] = convertTimeZone(moment(),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
        	recordObject[0]["createdby"] = kony.store.getItem("FIRSTLOGIN");
            recordObject[0]["WorkOrder_id"] = scopeObj.getController().getContextData().getCustomInfo("workorderid");
			function success(res) {        
				scopeObj.successCallBackSaveRecord(res);
        	}
	        function error(err) {
	        	scopeObj.errorCallBackSaveRecord(err);				
			}
        	scopeObj.saveRecord(recordObject[0],success,error);            	
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },
	errorCallBackSaveRecord: function(err) {
		try {
			var utilitiesObj = utilities.getUtilityObj();
			var errorMsg;
			var rootEx = err.getRootErrorObj();
			if(rootEx && rootEx.message){
				switch(rootEx.message){
					case "Title":
						errorMsg = utilitiesObj.geti18nValueKA("i18n.order.createNotes.EnterTitleKA");	
						break;
					case "Description":
						errorMsg = utilitiesObj.geti18nValueKA("i18n.order.createNotes.EnterDescriptionKA");
						break;
					default :
						errorMsg = utilitiesObj.geti18nValueKA("i18n.order.createNotes.ErrorKA");					
						break;
				}
			}
			alert(errorMsg);
		} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic errorCallBackSaveRecord : " + error);
        }
	},
	successCallBackSaveRecord: function(res) {
		try {
			this.navigateBackToList();
			if (kony.sdk.mvvm.isNetworkAvailabile()) {
				kony.servicesapp.backgroundSyncOnStatusChangeKA();
			}
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic successCallBackSaveRecord : " + error);
        }
	},
	/*saveRecord: function(recordObject, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },
    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            var scopeObj = this;
            scopeObj.$class.$superp.saveData.call(scopeObj, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }
        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },*/	
	navigateBackToList: function(){
		this.$class.$superp.showPreviousForm.call(this, true, "frmNotesListKA");
    },
    /*getEntitiesDataMap: function() {
        try {
            return this.$class.$superp.getEntitiesDataMap.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
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
		try {
			this.$class.$superp.navigateTo.call(this, formId, navObject);
		} 
		catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateTo : " + err);
        }
    },
    performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (error) {
            kony.appfoundation.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    }*/
});