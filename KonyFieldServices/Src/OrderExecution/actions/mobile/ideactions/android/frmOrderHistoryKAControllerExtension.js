/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderHistoryKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderHistoryKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
        }
    },
    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },
    prepareFetchAndBindDataStrategy: function() {
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
    },
    formatData: function(data) {
        try {
            kony.appfoundation.log.info("==formatData==>");
            var scopeObj = this;
            //var formattedData = this.$class.$superp.formatData.call(this, data);
            scopeObj.bindData(data);
        } catch (err) {
            kony.appfoundation.log.error("Error in formatData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        };
    },
    bindData: function(dataMap) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
            var formmodel = controller.getFormModel();
            formmodel.clear();
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var segData = dataMap["segOrderHistoryKA"];
            var bindDataObj;
            processedSegData = scopeObj.formatSegData(segData, scopeObj);
            dataMap["segOrderHistoryKA"] = {};
            dataMap["segOrderHistoryKA"]["segOrderHistoryKA"] = processedSegData;
            /* for (var widgetGroupId in dataMap) {
                bindDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
                bindDataObj.bind(formmodel, dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"]);
            }*/
            this.$class.$superp.bindData.call(this, dataMap);
            scopeObj.getController().getFormModel().formatUI();
            formmodel.showView();
        } catch (err) {
            var exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    fetchMasterData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
        }
    },
    fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterDataForWidget", e);
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
    formatSegData: function(segData, scopeObj) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var processedRowObj = {};
            var timeFormat = "hh:mm A";
            var dateFormat = "MM/DD/YYYY";
            for (var i in segData) {
                processedRowObj = {};
                processedRowObj["Description"] = segData[i]["Description"];
                processedRowObj["Code"] = segData[i]["Code"];
                processedRowObj["Status_id"] = utilitiesObj.getStatusTextKA(segData[i]["Status_id"]);
                var validStartDate = moment(segData[i]["StartDate"]).isValid();
                if (validStartDate) processedRowObj["StartDate"] = moment(segData[i]["StartDate"], "YYYYMMDDHHmmss").format(dateFormat);
                else processedRowObj["StartDate"] = "";
                var validEndDate = moment(segData[i]["StartDate"], "YYYYMMDDHHmmss").isValid();
                if (validEndDate) processedRowObj["EndDate"] = moment(segData[i]["StartDate"], "YYYYMMDDHHmmss").format(timeFormat);
                else processedRowObj["EndDate"] = "";
                processedRowObj["WorkCenter_id"] = (segData[i]["FirstName"] ? segData[i]["FirstName"] : "") + " " + (segData[i]["LastName"] ? segData[i]["LastName"] : "");
                processedRowObj["Duration"] = segData[i]["Type_id"];
                processedRowObj["PhoneNumber"] = segData[i]["MobilePhone"];
                // processedRowObj["StatusImage"] = utilitiesObj.getStatusImageKA(segData[i]["Status_id"]); 
                processedSegData.push(processedRowObj);
            }
            return processedSegData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatSegData : " + err);
        }
    },
    makeCall: function() {
        try {
            var viewModel = this.getController().getFormModel();
            var selRecord = viewModel.getViewAttributeByProperty("segOrderHistoryKA", "selectedItems")[0];
            kony.phone.dial(selRecord.PhoneNumber);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.appfoundation.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.appfoundation.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    /* performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },*/
    navigateBack: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
    }
});