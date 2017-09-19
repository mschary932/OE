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
kony.sdk.mvvm.frmOrderHistoryKAControllerExtension =  Class(kony.sdk.mvvm.CustomFormControllerExtensionMF,{
   constructor: function(controllerObj) {
          this.$class.$super.call(this,controllerObj);
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
            this.bindData(data);
        } catch (err) {
            kony.appfoundation.log.error("Error in formatData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        };
    },
    bindData: function(dataMap) {
        try {
            var scopeObj = this; 
            var formmodel = scopeObj.getController().getFormModel();
            formmodel.clear();
          	var processedSegData = scopeObj.formatSegData(dataMap["segOrderHistoryKA"], scopeObj);
            dataMap["segOrderHistoryKA"] = {};
	        dataMap["segOrderHistoryKA"]["segOrderHistoryKA"] = processedSegData;
            scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
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
			var validStartDate, validEndDate;
			var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("TIMEHOURSANDMIN");
            var dateFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE");
			for (var i in segData) {
                processedRowObj = {};                
                processedRowObj["Description"] = segData[i]["Description"];
                processedRowObj["PrevOrder_id"] = segData[i]["PrevOrder_id"];
                processedRowObj["Status_id"] = utilitiesObj.getStatusTextKA(segData[i]["Status_id"]);
                validStartDate=moment(segData[i]["StartDate"],kony.servicesapp.DB_DATE_FORMAT).isValid();
                if(validStartDate)
					processedRowObj["StartDate"] = (moment(segData[i]["StartDate"],kony.servicesapp.DB_DATE_FORMAT).format(dateFormat));
				else
					processedRowObj["StartDate"]="";                
                validEndDate=moment(segData[i]["StartDate"],kony.servicesapp.DB_DATE_FORMAT).isValid();
                if(validEndDate)
					processedRowObj["EndDate"] = convertTimeZone(moment(segData[i]["StartDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);
				else
					processedRowObj["EndDate"]="";
  				processedRowObj["WorkCenter_id"] = (segData[i]["FirstName"] ? segData[i]["FirstName"]: "")+" "+ (segData[i]["LastName"] ? segData[i]["LastName"]:"");
  				processedRowObj["Duration"] =  segData[i]["Type_id"];
  				processedRowObj["PhoneNumber"] =  segData[i]["MobilePhone"];
				processedRowObj["StatusImage"] = utilitiesObj.getStatusImageKA(segData[i]["Status_id"]); 
                processedSegData.push(processedRowObj);
            }
            return processedSegData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatSegData : " + err);
        }
    },    
    makeCall: function() {
        try {
            var selRecord = this.getController().getFormModel().getViewAttributeByProperty("segOrderHistoryKA", "selectedItems")[0];
            kony.phone.dial(selRecord.PhoneNumber);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },    
	saveData: function() {
		var scopeObj = this;
        try {
            scopeObj.$class.$superp.saveData.call(scopeObj, success, error);
        } catch (err) {
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
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
        var scopeObj = this;
        try {
            scopeObj.$class.$superp.deleteData.call(scopeObj, success, error);
        } catch (err) {
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
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
    navigateBack: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, true, kony.application.getPreviousForm().id);
    }
});