/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderResourcesListKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    $statics: {
        RESOURCELIST_VIEWTYPE_LOCAL: kony.servicesapp.LOCAL,
        RESOURCELIST_VIEWTYPE_AVAILABLE: kony.servicesapp.AVAILABLE,
        RESOURCELIST_VIEWTYPE_INORDER: kony.servicesapp.INORDER,
        RESOURCELIST_VIEWTYPE_GLOBAL: "GLOBAL",
        UNCHECKED_VIEW_IMAGE: "notification_circle_unchecked.png",
        FORWARD_CARET: "bf_forward_caret.png",
        FILTER_UNCHECKED_SKIN: "sknBtnUncheckedCheckboxKA",
        FILTER_CHECKED_SKIN: "sknBtnCheckedCheckboxKA",
        RESOURCES_VIEW: ["In Order", "Local", "Available", "Global"],
        BUTTON_CLEAR_SKIN: "sknBtnFF5D6EClanProNews28KA"
    },
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.formatData(response);
        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    formatData: function(data) {
        try {
            var scopeObj = this;
            var formattedData = this.$class.$superp.formatData.call(this, data);
            this.bindData(formattedData);
        } catch (err) {
            //kony.sdk.mvvm.log.error("Error in formatData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },
    prepareFetchStrategy: function(serviceName, options) {
        try {
            this.$class.$superp.prepareFetchStrategy.call(this, serviceName, options);
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
    bindData: function(dataMap) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
            var resourcesListFormController = appContext.getFormController("frmOrderResourcesListKA");
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var workorderStatus = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus");
            var formmodel = controller.getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var segData = dataMap["segDetailskA"];
            //scopeObj.bindDataForViews(dataMap);
            var bindDataObj;
            var formmodel = controller.getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var segData = dataMap["segDetailskA"];
            formmodel.setViewAttributeByProperty("flxViewsKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("flxMainKA", "isVisible", true);
            var lclSelectedIndex = scopeObj.getIndexOfView(scopeObj.getFormModelInfo("viewType"));
            formmodel.setViewAttributeByProperty("segViewsKA", "selectedRowIndex", lclSelectedIndex);
            processedSegData = scopeObj.formatSegData(segData, scopeObj);
            //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
            var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segDetailskA", "widgetDataMap");
            lclWidgetDataMap["lblResourceKA"] = "lblHeader";
            formmodel.setViewAttributeByProperty("segDetailskA", "widgetDataMap", lclWidgetDataMap);
            //******* ends here
            var resourcesLength = processedSegData.length;
            if (resourcesLength == 1) {
                resourcesLength = resourcesLength + " " + utilitiesObj.geti18nValueKA("i18n.common.resourceValueKA");
            } else {
                resourcesLength = resourcesLength + " " + utilitiesObj.geti18nValueKA("i18n.common.resourcesValueKA");
            }
            var lclTaskHeader = {
                "lblHeader": resourcesLength
            };
            var finalProcessedSegData = [
                [lclTaskHeader, processedSegData]
            ];
            dataMap["segDetailskA"] = {};
            dataMap["segDetailskA"]["segDetailskA"] = finalProcessedSegData;
            this.$class.$superp.bindData.call(this, dataMap);
            scopeObj.getController().getFormModel().formatUI();
            formmodel.showView();
        } catch (err) {
            var exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
            var configObj = this.getController().getConfig();
            var serviceName = configObj.getObjectServiceName();
            var options = configObj.getObjectServiceOptions();
            this.$class.$superp.fetchMasterData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
        }
    },
    fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterDataForWidget", e);
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
            var appContext = this.getController().getApplicationContext();
            var processedRowObj = {};
            kony.print("segData in order resources" + segData);
            for (var i in segData) {
                processedRowObj = {};
                processedRowObj["Material_id"] = segData[i]["Code"];
                processedRowObj["InvID"] = segData[i]["InvID"];
                processedRowObj["InventoryQuantity"] = segData[i]["InventoryQuantity"];
                processedRowObj["ItemNumber"] = segData[i]["ItemNumber"];
                processedRowObj["AssignedQuantity"] = utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2);
                processedRowObj["Code"] = utilitiesObj.dataTruncation(segData[i]["Code"], 10, 3, "...").value;
                processedRowObj["Description"] = utilitiesObj.dataTruncation(segData[i]["Description"], 28, 3, "...").value;
                processedRowObj["MaterialType"] = utilitiesObj.dataTruncation(segData[i]["MaterialType"], 20, 3, "...").value;
                processedRowObj["AssignedQuantity"] = utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2);
                processedRowObj["RequestedQuantity"] = utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2) + " ";
                processedRowObj["AvailableQuantity"] = utilitiesObj.roundNumber(segData[i]["AvailableQuantity"], 2) + " ";
                if (segData[i]["ReqUnitDesc"]) {
                    processedRowObj["RequestedQuantity"] += segData[i]["ReqUnitDesc"];
                }
                if (segData[i]["baseUnit"]) {
                    processedRowObj["AvailableQuantity"] += segData[i]["baseUnit"];
                }
                var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
                var workorderStatus = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus");
                var taskStatus = segData[i]["taskStatus"];
                processedRowObj["isConsumable"] = segData[i]["isConsumable"];
                processedRowObj["isConsumed"] = segData[i]["isConsumed"];
                processedRowObj["womID"] = segData[i]["womID"];
                processedRowObj["taskStatus"] = segData[i]["taskStatus"];
                if (segData[i]["isConsumable"] && segData[i]["isConsumable"] != '' && segData[i]["isConsumable"].toUpperCase() == "Y") {
                    if (segData[i]["isConsumed"] && segData[i]["isConsumed"] != '' && segData[i]["isConsumed"].toUpperCase() == "Y") {
                        if (workorderStatus.toUpperCase() == "STARTED" && taskStatus.toUpperCase() == 'STARTED') {
                            processedRowObj["isConsumedImage"] = {
                                skin: "sknBtnCheckedEnabledKA",
                                focusSkin: "sknBtnCheckedEnabledKA",
                                text: ""
                            };
                        } else {
                            processedRowObj["isConsumedImage"] = {
                                skin: "btnResourceCheckedKA",
                                focusSkin: "btnResourceCheckedKA",
                                text: ""
                            };
                        }
                    } else {
                        if (workorderStatus.toUpperCase() == "STARTED" && taskStatus.toUpperCase() == 'STARTED') {
                            processedRowObj["isConsumedImage"] = {
                                skin: "sknBtnUncheckedEnabledKA",
                                focusSkin: "sknBtnUncheckedEnabledKA",
                                text: ""
                            };
                        } else {
                            processedRowObj["isConsumedImage"] = {
                                skin: "btnResourceUncheckedKA",
                                focusSkin: "btnResourceUncheckedKA",
                                text: ""
                            };
                        }
                    }
                } else {
                    processedRowObj["isConsumedImage"] = {
                        skin: "btnResourceCheckedKA",
                        text: "",
                        focusSkin: "btnResourceCheckedKA",
                        isVisible: false
                    };
                }
                processedSegData.push(processedRowObj);
            }
            return processedSegData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatSegData : " + err);
        }
    },
    navigateBack: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
    },
    navigateToResourceExecution: function() {
        try {
            var formmodel = this.getController().getFormModel();
            var selRecord = formmodel.getViewAttributeByProperty("segDetailskA", "selectedItems")[0];
            var contextData = this.getController().getContextData();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": selRecord.Code
            });
            var contextData = this.getController().getContextData();
            var woInfo = contextData.getCustomInfo("WorkOrderId");
            //datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.addCustomInfo("WorkOrderId", woInfo);
            navigationObject.addCustomInfo("MaterialId", selRecord.Material_id);
            kony.print("navigateToResourceExecution" + JSON.stringify(selRecord));
            if (selRecord.AssignedQuantity > 0) {
                navigationObject.addCustomInfo("WorkOrderId", woInfo);
                navigationObject.setQuery("form", kony.servicesapp.ResourcesQuery[kony.servicesapp.ORDERRESOURCES_RESOURCEEXECUTION], "sql");
                navigationObject.setQueryParams("form", {
                    "y": selRecord.Material_id,
                    "x": woInfo
                });
            } else {
                navigationObject.setQuery("form", kony.servicesapp.ResourcesQuery[kony.servicesapp.RESOURCEEXECINVENTORY], "sql");
                navigationObject.setQueryParams("form", {
                    "x": selRecord.Material_id
                });
            }
            navigationObject.setQueryParams("FlexFetchDataUoMKA", {
                "x": selRecord.Material_id
            });
            this.navigateTo("frmResourceExecutionKA", navigationObject);
        } catch (err) {
            kony.print("navigateToResEx" + JSON.stringify(err));
            kony.sdk.mvvm.log.error("error in Blogic navigateToResourceExecution from Order Resources List: " + err);
        }
    },
    changeConsumedStatus: function() {
        try {
            var formmodel = this.getController().getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var configObj = this.getController().getConfig();
            var selRecord = formmodel.getViewAttributeByProperty("segDetailskA", "selectedItems")[0];
            var controller = this.getController();
            var appContext = controller.getApplicationContext();
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var configObj = scopeObj.getController().getConfig();
            var orderresourceslistcontrollerextension = appContext.getFormController("frmOrderResourcesListKA").getControllerExtensionObject();
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var workorderStatus = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus");
            if ((selRecord.isConsumable && selRecord.isConsumable != '' && selRecord.isConsumable.toUpperCase() == "Y") && workorderStatus.toLowerCase() == "started" && selRecord.taskStatus.toUpperCase() == "STARTED") {
                var isConsumed = selRecord.isConsumed;
                var updatedConsumedStatus = "Y";
                if (isConsumed.toUpperCase() == "Y") {
                    updatedConsumedStatus = "N";
                }
                var recordObject = new objHandler("WorkOrderMaterial");
                recordObject.set("Id", selRecord.womID);
                recordObject.set("isConsumed", updatedConsumedStatus);
                recordObject.set("WorkOrder_id", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId"));
                recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                recordObject.setInfo("options", configObj.getObjectServiceOptions());
                var invSuccess = function() {
                        this.fetchData();
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        if (kony.appfoundation.isNetworkAvailabile()) {
                            kony.appfoundation.backgroundSyncOnStatusChangeKA();
                        }
                    }
                var onError = function() {
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    }
                var onSuccess = function() {
                        this.fetchData();
                        kony.appfoundation.v2.KonyApplicationContext.dismissLoadingScreen();
                        if (kony.appfoundation.isNetworkAvailabile()) {
                            kony.appfoundation.backgroundSyncOnStatusChangeKA();
                        }
                        /*  var invQuantity=utilitiesObj.roundNumber(selRecord.InventoryQuantity,2);
                  var assignedQuantity = utilitiesObj.roundNumber(selRecord.AssignedQuantity,2);
		                recordObject = new objHandler("Inventory");
		                recordObject.set("id", selRecord.InvID);
		                if(updatedConsumedStatus == 'Y'){
		               		 invQuantity -= assignedQuantity;
		                }
		                else{invQuantity += assignedQuantity;}
		                recordObject.set("Quantity", invQuantity);
		                orderresourceslistcontrollerextension.saveRecord(recordObject,invSuccess,onError);*/
                    }
                this.saveRecord(recordObject, onSuccess, onError);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic change status from Order Resources List: " + err);
        }
    },
    showFilters: function(toShow) {
        var formModel = this.getController().getFormModel();
        if (toShow) {
            formModel.setViewAttributeByProperty("flxViewsKA", "isVisible", true);
            formModel.setViewAttributeByProperty("flxMainKA", "isVisible", false);
        } else {
            formModel.setViewAttributeByProperty("flxViewsKA", "isVisible", false);
            formModel.setViewAttributeByProperty("flxMainKA", "isVisible", true);
        }
    },
    applyView: function() {
        var scopeObj = this;
        var formmodel = this.getController().getFormModel();
        var selectedRecords = formmodel.getViewAttributeByProperty("segViewsKA", "selectedRowIndex");
        var contextData = this.getController().getContextData();
        switch (selectedRecords[1]) {
        case 0:
            scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_INORDER);
            scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.INORDER, {
                'x': contextData.getCustomInfo("WorkOrderId")
            });
            break;
        case 1:
            scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_LOCAL);
            scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.LOCAL, {
                'x': contextData.getCustomInfo("WorkOrderId"),
                'y': ''
            });
            break;
        default:
            alert("Work In Progress");
            break;
            /*  case 2:
                scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_AVAILABLE);
                scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.AVAILABLE);
                break;
            case 3:
                scopeObj.setFormModelInfo("viewType", kony.servicesapp.ResourcesQuery.GLOBAL);
                break; */
        }
        scopeObj.showFilters(false);
    },
    deviceBack: function() {
        utilities.getUtilityObj().doNothingOnDeviceBackKA();
    },
    refreshSegData: function(query, queryParams) { //queryParams 
        var contextData = this.getController().getContextData();
        var query = query;
        var scopeObj = this;
        contextData.setQuery("segDetailskA", query, "sql");
        if (queryParams) {
            contextData.setQueryParams("segDetailskA", queryParams);
        }
        scopeObj.fetchData("segDetailskA");
    },
    bindDataForViews: function(dataMap) {
        var scopeObj = this;
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var utilitiesObj = utilities.getUtilityObj();
        var controller = this.getController();
        var formmodel = controller.getFormModel();
        var lclSelectedIndex = scopeObj.getIndexOfView(scopeObj.getFormModelInfo("viewType"));
        formmodel.setViewAttributeByProperty("segViewsKA", "selectedRowIndex", lclSelectedIndex);
        var utilitiesObj = utilities.getUtilityObj();
        var viewHeader = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.subHeader.ViewsValueKA");
        var btnClear = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.subHeader.btnClearValueKA");
        var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segViewsKA", "widgetDataMap");
        lclWidgetDataMap["lblHeaderTmpKA"] = "lblHeaderTmpKA";
        formmodel.setViewAttributeByProperty("segViewsKA", "widgetDataMap", lclWidgetDataMap);
        dataMap = [];
        var imgSelect = scopeObj.UNCHECKED_VIEW_IMAGE;
        var processedSegData = [];
        var processedSegRowData;
        var viewValues = "";
        var viewList = scopeObj.RESOURCES_VIEW;
        for (var i in viewList) {
            processedSegRowData = {};
            processedSegRowData["lblTaskViewKA"] = viewList[i]; // TODO create i18n for inorder,local,available,global
            processedSegRowData["imgSelectViewKA"] = imgSelect;
            processedSegData.push(processedSegRowData);
        }
        var lclViewHeader = {
            "lblHeaderTmpKA": viewHeader
        };
        var viewFinalSegData = [
            [lclViewHeader, processedSegData]
        ];
        dataMap["segViewsKA"] = viewFinalSegData;
        formmodel.setViewAttributeByProperty("segViewsKA", "selectedRowIndex", lclSelectedIndex);
        return dataMap;
    },
    doSearch: function(formId, tbxName, segName, query) {
        this.$class.$superp.doSearch.call(this, formId, tbxName, segName, query);
    },
    getIndexOfView: function(viewType) {
        try {
            var lclSelectedIndex = [];
            switch (viewType) {
            case kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.RESOURCELIST_VIEWTYPE_INORDER:
                lclSelectedIndex = [0, 0];
                break;
            case kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.RESOURCELIST_VIEWTYPE_LOCAL:
                lclSelectedIndex = [0, 1];
                break;
            case kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.RESOURCELIST_VIEWTYPE_AVAILABLE:
                lclSelectedIndex = [0, 2];
                break;
            case kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.RESOURCELIST_VIEWTYPE_GLOBAL:
                lclSelectedIndex = [0, 3];
                break;
            default:
                lclSelectedIndex = [0, 0];
            }
            return lclSelectedIndex;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getIndexOfView Resources: " + err);
        }
    },
    clearFilters: function() {
        var scopeObj = this;
        scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_INORDER);
        var contextData = this.getController().getContextData();
        scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.ORDER, {
            'x': contextData.getCustomInfo("WorkOrderId")
        });
    }
});