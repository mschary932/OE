/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmTaskDetailsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmTaskDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.appfoundation.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(response) {
            kony.appfoundation.log.info("success fetching data ", response);
            scopeObj.formatData(response);
        }

        function error(err) {
            //Error fetching data
            kony.appfoundation.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    formatData: function(data) {
        try {
            var scopeObj = this;
            var formattedData = this.$class.$superp.formatData.call(this, data);
            this.bindData(formattedData);
        } catch (err) {
            //kony.appfoundation.log.error("Error in formatData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        };
    },
    performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (error) {
            kony.appfoundation.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },
    prepareFetchStrategy: function(serviceName, options) {
        try {
            this.$class.$superp.prepareFetchStrategy.call(this, serviceName, options);
        } catch (error) {
            kony.appfoundation.log.error("Error in Blogic prepare fetch and bind data : " + error);
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
    formatTimeData: function(dataMap) {
        var timeFormat = "hh:mm A";
        var dayTimeFormat = "hh:mm A, ddd";
        if (dataMap["form"]) {
            var formData = dataMap["form"][0];
            dataMap["form"][0]["StartDate"] = moment(formData["StartDate"]).isValid() ? convertTimeZone(moment(formData["StartDate"], "YYYYMMDDHHmmss"), kony.servicesapp.remoteTimeZone, null, timeFormat) : "";
            dataMap["form"][0]["PlannedStartDate"] = moment(formData["PlannedStartDate"]).isValid() ? convertTimeZone(moment(formData["PlannedStartDate"], "YYYYMMDDHHmmss"), kony.servicesapp.remoteTimeZone, null, dayTimeFormat) : "";
            dataMap["form"][0]["EndDate"] = moment(formData["EndDate"]).isValid() ? convertTimeZone(moment(formData["EndDate"], "YYYYMMDDHHmmss"), kony.servicesapp.remoteTimeZone, null, timeFormat) : "";
        }
        return dataMap;
    },
    bindData: function(dataMap) {
        try {
            dataMap = this.formatTimeData(dataMap);
            var utilitiesObj = utilities.getUtilityObj();
            this.setFormModelInfo("flexContainerInfoKA", {
                "fullText": "",
                "isTruncated": false,
                "headerText": utilitiesObj.geti18nValueKA("i18n.common.InstructionDescKA")
            });
            if (dataMap["form"]) {
                var formData = dataMap["form"][0];
                var scopeObj = this;
                var formmodel = this.getController().getFormModel();
                var processedData = {};
                var dayTimeFormat = "hh:mm A, ddd";
                var timeFormat = "hh:mm A";
                this.setFormModelInfo("flexContainerInfoKA", {
                    "fullText": "",
                    "isTruncated": false,
                    "headerText": utilitiesObj.geti18nValueKA("i18n.common.InstructionDescKA")
                });
                //var timeFormat = utilitiesObj.geti18nValueKA("i18n.common.TimeFormatKA");
                //var timeFormat1 = utilitiesObj.geti18nValueKA("i18n.order.frmOrderListKA.timeFormat.ValueKA");
                var resources = utilitiesObj.geti18nValueKA("i18n.common.resourcesValueKA");
                var materials = utilitiesObj.geti18nValueKA("i18n.common.materialsValueKA");
                var tools = utilitiesObj.geti18nValueKA("i18n.common.Tools.ValueKA");
                processedData["lblTimeKA"] = formData["PlannedStartDate"];
                processedData["lblHHMMKA"] = formData["StartDate"];
                processedData["lblFinishedTimeKA"] = formData["EndDate"];
                var gestureHandlerVal;
                if (formData["Instructions"]) {
                    var description = utilitiesObj.dataTruncation(formData["Instructions"], 72, 3, "...");
                    this.setFormModelInfo("flexContainerInfoKA", {
                        "fullText": formData["Instructions"],
                        "isTruncated": description["isTruncated"],
                        "headerText": utilitiesObj.geti18nValueKA("i18n.common.InstructionDescKA")
                    });
                    processedData["lblInfoKA"] = description["value"];
                    formmodel.setViewAttributeByProperty("imgDescNavKA", "isVisible", description.isTruncated);
                    if (description["isTruncated"]) {
                        var config1 = {
                            fingers: 1,
                            swipedistance: 50,
                            swipevelocity: 10
                        };
                    }
                }
                var toolsInt = parseInt(formData["Tools"], 10);
                var materialInt = parseInt(formData["Materials"], 10);
                if (!(formData["Tools"] === toolsInt)) {
                    toolsInt = 0;
                }
                if (!(formData["Materials"] === materialInt)) {
                    materialInt = 0;
                }
                processedData["lblMaterialCountKA"] = materials + " (" + materialInt + ")";
                processedData["lblToolsCountKA"] = tools + " (" + toolsInt + ")";
                switch (materialInt + toolsInt) {
                case 1:
                    processedData["lblResourcesCountKA"] = "1 " + utilitiesObj.geti18nValueKA("i18n.common.resourceValueKA");
                    break;
                default:
                    processedData["lblResourcesCountKA"] = materialInt + toolsInt + " " + utilitiesObj.geti18nValueKA("i18n.common.resourcesValueKA");
                    break;
                }
                dataMap["form"] = processedData;
                var bindDataObj;
                this.$class.$superp.bindData.call(this, dataMap);
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
    saveRecord: function(recordObject, entityName, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, entityName, onSuccess, onError);
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
    fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
            var configObj = this.getController().getConfig();
            var serviceName = configObj.getObjectServiceName();
            var options = configObj.getObjectServiceOptions();
            this.$class.$superp.fetchMasterData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterData", e);
        }
    },
    fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterDataForWidget", e);
        }
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmTaskExecutionKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    }
});