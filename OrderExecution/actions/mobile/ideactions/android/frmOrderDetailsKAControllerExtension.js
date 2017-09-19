/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderDetailsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
        this.controllerExtensionGen = undefined;
        this.contactDetail = "";
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
    gestureHandler: {
        "flxLocationKA": false,
        "flxInstructionKA": false,
        "flxParentContactKA": false
    },
    formatData: function(dataMap) {
        dataMap["form"][0]["PlannedStartDate"] = convertTimeZone(moment(dataMap["form"][0]["PlannedStartDate"], "YYYYMMDDHHmmss"), kony.servicesapp.remoteTimeZone, null, 'hh:mm A, ddd');
        return dataMap;
    },
    bindData: function(dataMap) {
        try {
            //alert(dataMap);
            dataMap = this.formatData(dataMap);
            var formData = dataMap["form"][0];
            var scopeObj = this;
            var contactData = dataMap["flxParentContactKA"] ? (dataMap["flxParentContactKA"][0] ? dataMap["flxParentContactKA"][0] : null) : null;
            var assetData = dataMap["flxAssetsKA"] ? dataMap["flxAssetsKA"] : [];
            var durationData = dataMap["flxDurationKA"] ? (dataMap["flxDurationKA"][0] ? dataMap["flxDurationKA"][0] : []) : null;
            var ContactprocessedData = {};
            var appContext = this.getController().getApplicationContext();
            var controller = appContext.getFormController("frmOrderDetailsKA");
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            var AssetprocessedData = {};
            var durationprocessedData = {};
            var addressData = "";
            var utilitiesObj = utilities.getUtilityObj();
            this.contactDetail = "";
            this.setFormModelInfo("flxInstructionKA", {
                "fullText": "",
                "isTruncated": false,
                "headerText": utilitiesObj.geti18nValueKA("i18n.common.InstructionDescKA")
            });
            this.setFormModelInfo("flxLocationKA", {
                "fullText": "",
                "isTruncated": false,
                "headerText": utilitiesObj.geti18nValueKA("i18n.common.LocDescKA")
            });
            if (contactData) {
                this.contactDetail = contactData["id"];
                ContactprocessedData["lblContactDescriptionKA"] = (contactData["FirstName"] ? contactData["FirstName"] : "") + " " + (contactData["LastName"] ? contactData["LastName"] : "");
                formmodel.setViewAttributeByProperty("imgContactNavKA", "isVisible", true);
            } else {
                formmodel.setViewAttributeByProperty("imgContactNavKA", "isVisible", false);
            }
            formmodel.setViewAttributeByProperty("imgPriorityKA", "src", utilitiesObj.getPriorityImageKA(formData["Priority"]["Description"]));
            formmodel.setViewAttributeByProperty("imgStatusKA", "src", utilitiesObj.getStatusImageKA(formData["Status_id"]));
            var processedData = {};
            processedData["lblTime"] = formData["PlannedStartDate"];
            processedData["lblOrderValueIDKA"] = formData["id"];
            processedData["lblPriorityValueKA"] = utilitiesObj.getPriorityTextKA(formData["Priority"]["Description"]);
            processedData["lblStatusValueKA"] = utilitiesObj.getStatusTextKA(formData["Status_id"]);
            processedData["blDescriptionKA"] = formData["Description"];
            addressData = utilitiesObj.getOrderAddress(formData["Address_id"]);
            var gestureHandlerVal;
            if (addressData) {
                var locationdesc = utilitiesObj.dataTruncation(addressData, 72, 3, "...");
                this.setFormModelInfo("flxLocationKA", {
                    "fullText": addressData,
                    "isTruncated": locationdesc.isTruncated,
                    "headerText": utilitiesObj.geti18nValueKA("i18n.common.LocDescKA")
                });
                processedData["lblLocationValueKA"] = locationdesc["value"];
                if (locationdesc["isTruncated"]) {
                    formmodel.setViewAttributeByProperty("imgArrowKA", "isVisible", locationdesc.isTruncated);
                } else {
                    formmodel.setViewAttributeByProperty("imgArrowKA", "isVisible", locationdesc.isTruncated);
                }
            } else {
                formmodel.setViewAttributeByProperty("imgArrowKA", "isVisible", false);
            }
            if (formData["Instructions"]) {
                var description = utilitiesObj.dataTruncation(formData["Instructions"], 72, 3, "...");
                this.setFormModelInfo("flxInstructionKA", {
                    "fullText": formData["Instructions"],
                    "isTruncated": description["isTruncated"],
                    "headerText": utilitiesObj.geti18nValueKA("i18n.common.InstructionDescKA")
                });
                processedData["lblInstructionsValueKA"] = description["value"];
                if (description["isTruncated"]) {
                    formmodel.setViewAttributeByProperty("imgArrowInstKA", "isVisible", description.isTruncated);
                } else {
                    formmodel.setViewAttributeByProperty("imgArrowInstKA", "isVisible", description.isTruncated);
                }
            } else {
                formmodel.setViewAttributeByProperty("imgArrowInstKA", "isVisible", false);
            }
            var str_asset = "";
            for (var index = 0; index < assetData.length; index++) {
                if (assetData[index]["Description"]) {
                    str_asset += assetData[index]["Description"] + '\n';
                }
            }
            AssetprocessedData["lblAsset1KA"] = str_asset;
            //		durationprocessedData["lblDurationValueKA"] = utilitiesObj.dateFormat((durationData.duration ? durationData.duration : 0),"HH:MM");//moment().startOf('day').seconds(durationData.duration ? durationData.duration : 0).format('HH:mm');
            dataMap["form"] = processedData;
            //dataMap["flxParentContactKA"] = ContactprocessedData;
            //    		dataMap["flxAssetsKA"] = AssetprocessedData;
            //    		dataMap["flxDurationKA"] = durationprocessedData;
            this.$class.$superp.bindData.call(this, dataMap);
            //  var bindDataObj;
            //            for (var widgetGroupId in dataMap) {
            //                bindDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
            //                bindDataObj.bind(formmodel, dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"]);
            //            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
    fetchMasterData: function(successcallback, errorcallback) {
        this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
    },
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, widgetId, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch metadata : " + error);
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
    showContactDetailsForm: function() {
        try {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var context = INSTANCE.getFormController("frmOrderDetailsKA").getControllerExtensionObject();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap(context.contactDetail);
            kony.print("context.contactDetail" + context.contactDetail);
            if ((context.contactDetail)) {
                var controller = INSTANCE.getFormController("frmContactDetailsKA");
                //datamodel.setMasterEntityName(controller.getConfig().getEntity());
                var navigationObject = new kony.sdk.mvvm.NavigationObject();
                navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
                controller.loadDataAndShowForm(navigationObject);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showContactDetailsForm : " + err);
        }
    },
    navigateBack: function() {
        this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
    },
    deviceBack: function() {
        utilities.getUtilityObj().doNothingOnDeviceBackKA();
    }
});