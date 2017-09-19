/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */

/*
 * bussiness/orchestration/mediation logic class for frmExtendedAttributesKA.
 */
kony = kony || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmExtendedAttributesKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.formatData(response);
        }
        function error(err) {
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    formatData: function(data) {
        try {
			this.bindData(data);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    bindData: function(dataMap) {
        try {
			var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
			formModel.clear();
			var lclWidgetDataMap = formModel.getViewAttributeByProperty("segExtendedAttributesKA", "widgetDataMap");
			lclWidgetDataMap["lblAttributeNameKA"] = "LDB_LABEL";
			lclWidgetDataMap["lblAttributeValueKA"] = "VALUE";
			formModel.setViewAttributeByProperty("segExtendedAttributesKA", "widgetDataMap", lclWidgetDataMap);
			var processedSegData = dataMap["segExtendedAttributesKA"];
			dataMap["segExtendedAttributesKA"] = {};
            dataMap["segExtendedAttributesKA"]["segExtendedAttributesKA"] = processedSegData;
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
            scopeObj.getController().getFormModel().formatUI();
            formModel.showView();
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    fetchMasterData: function(successcallback, errorcallback) {
        try {

        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
        }
    },
    fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {

        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterDataForWidget", e);
        }
    },
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(res) {
			kony.sdk.mvvm.log.info("success saving record ", res);
        }
        function error(err) {
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(res) {
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }
        function error(err) {
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
	showPreviousForm: function(doReload) {
		var fromForm = this.getController().getContextData().getCustomInfo("from");
		if(fromForm == 'ORDEREXECUTION'){
			this.$class.$superp.showPreviousForm.call(this, doReload, "frmOrderExecutionKA");
		}else if(fromForm == 'TASK'){
			this.$class.$superp.showPreviousForm.call(this, doReload, "frmTaskExecutionKA");
		}else if(fromForm == 'RESOURCE'){
			this.$class.$superp.showPreviousForm.call(this, doReload, "frmResourceExecutionKA");
		}        
    },    
    doSearch: function(){
		this.$class.$superp.doSearch.call(this, "segDetailsKA", "tbxSearchKA");
	},
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    }
});