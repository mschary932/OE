/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmResourceExecutionKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmResourceExecutionKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    constructor: function(controllerObj) {
        var modelPropertyInfoMap = {};
        var controllerContextData = undefined;
        var controller = undefined;
        var controllerExtensionGen = undefined;
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.formatData(response);
        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
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
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
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
            var formmodel = this.getController().getFormModel();
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var processedData = {};
            var bindDataObj;
            var utilitiesObj = utilities.getUtilityObj();
            var formData = dataMap["form"][0] ? dataMap["form"][0] : {};
            if (formmodel.getViewAttributeByProperty("flxEditKA", "isVisible")) {
                scopeObj.showHidePopUp(true);
                formmodel.setViewAttributeByProperty("tbxQuantityKA", "text", String(utilitiesObj.roundNumber(formData["Quantity"], 2)));
            } else {
                formmodel.setViewAttributeByProperty("btnSaveKA", "isVisible", false);
                formmodel.setViewAttributeByProperty("btnBackKA", "skin", "sknBtnbackarrowKA");
                formmodel.setViewAttributeByProperty("btnBackKA", "focusSkin", "sknBtnbackarrowFocKA");
                formmodel.setViewAttributeByProperty("lblHeaderKA", "text", utilitiesObj.geti18nValueKA("i18n.order.frmResourceExecutionKA.lblHeaderValueKA"));
            }
            processedData["lblResourceNameKA"] = utilitiesObj.dataTruncation(formData["Description"], 22, 3, "...").value;
            processedData["lblResourceNumberKA"] = formData["id"];
            processedData["lblResourceUnitKA"] = String(utilitiesObj.roundNumber(formData["Quantity"], 2));
            processedData["lblModelValueKA"] = formData["ModelNumber"];
            processedData["lblBarcodeValueKA"] = formData["Barcode"];
            processedData["lblMeasureValueKA"] = formData["baseUnitDesc"];
            processedData["lblMaterialTypeKA"] = formData["mat_type"];
            processedData["lblPartNumberValueKA"] = formData["PartNumber"];
            processedData["lblUnitKA"] = formData["ReqUnitDesc"];
            processedData["lblDescriptionValueKA"] = formData["Description"];
            this.setFormModelInfo("workOrderMaterial_Id", formData["key"]);
            this.setFormModelInfo("InventoryID", formData["InvID"]);
            this.setFormModelInfo("InventoryQuantity", utilitiesObj.roundNumber(formData["invQuantity"], 2));
            this.setFormModelInfo("BaseUnitID", formData["baseunitId"]);
            this.setFormModelInfo("RequestedUnitID", formData["ReqId"]);
            this.setFormModelInfo("MaterialID", formData["id"]);
            this.setFormModelInfo("AssignedQuantity", utilitiesObj.roundNumber(formData["Quantity"], 2));
            formmodel.setViewAttributeByProperty("tbxQuantityKA", "text", String(utilitiesObj.roundNumber(formData["Quantity"], 2)));
            if (kony.application.getCurrentForm().id != "frmOrderResourceDetailsKA" && kony.application.getCurrentForm().id != 'frmResourceExecutionKA') {
                this.setFormModelInfo("prevForm", kony.application.getCurrentForm().id);
            }
            if (kony.application.getCurrentForm().id == "frmOrderResourcesListKA") {
                this.setFormModelInfo("workorderStatus", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus"));
            } else if (kony.application.getCurrentForm().id == "frmTaskExecutionKA" || kony.application.getCurrentForm().id == "frmTaskResourcesListKA") {
                var contextData = this.getController().getContextData();
                this.setFormModelInfo("workorderStatus", contextData.getCustomInfo("WOStatus"));
                this.setFormModelInfo("taskStatus", contextData.getCustomInfo("TaskStatus"));
                scopeObj.setMasterDataForListBox(dataMap.FlexFetchDataUoMKA, formData["unitDesc"], formData["uomId"]);
            }
            if (this.getFormModelInfo("prevForm") == 'frmOrderResourcesListKA' || formData["isConsumable"] != 'Y' || formData["isConsumed"] == 'Y' || this.getFormModelInfo("workorderStatus").toLowerCase() != "started" || (this.getFormModelInfo("taskStatus") && this.getFormModelInfo("taskStatus").toLowerCase() != "started")) {
                formmodel.setViewAttributeByProperty("flxFooterKA", "isVisible", false);
            } else {
                formmodel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
            }
            if (!formData["Quantity"] || formData["Quantity"] <= 0) {
                formmodel.setViewAttributeByProperty("btnEditKA", "text", utilitiesObj.geti18nValueKA("i18n.common.addValueKA"));
            } else {
                formmodel.setViewAttributeByProperty("btnEditKA", "text", utilitiesObj.geti18nValueKA("i18n.common.deitValueKA"));
            }
            kony.print("FlexFetchDataUoMKA" + dataMap.FlexFetchDataUoMKA);
            delete dataMap.FlexFetchDataUoMKA;
            dataMap["form"] = processedData;
            this.$class.$superp.bindData.call(this, dataMap);
        } catch (err) {
            //kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    setMasterDataForListBox: function(data, selectedUoMValue, selectedUomId) {
        try {
            var masterData = [];
            masterData.push(["Select", "Select"]);
            var formmodel = this.getController().getFormModel();
            for (var value in data) {
                var lbxValue = [];
                lbxValue.push(data[value]["UnitFrom_id"]);
                lbxValue.push(data[value]["Description"]);
                if (data[value]["UnitFrom_id"] == this.getFormModelInfo("RequestedUnitID")) {
                    //lbxValue.push(true);
                    formmodel.setViewAttributeByProperty("uomListBoxKA", "selectedKey", data[value]["UnitFrom_id"]);
                }
                masterData.push(lbxValue);
            }
            formmodel.setViewAttributeByProperty("uomListBoxKA", "masterData", masterData);
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
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
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    navigateBack: function(doReload) {
        try {
            var formModel = this.getController().getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var scopeObj = this;
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            if (formModel.getViewAttributeByProperty("flxEditKA", "isVisible") == true) {
                scopeObj.showHidePopUp(false);
                formModel.setViewAttributeByProperty("lblHeaderKA", "text", utilitiesObj.geti18nValueKA("i18n.order.frmResourceExecutionKA.lblHeaderValueKA"));
            } else {
                if (this.getFormModelInfo("prevForm") == "frmOrderResourcesListKA" || this.getFormModelInfo("prevForm") == "frmTaskResourcesListKA") {
                    var context = INSTANCE.getFormController(this.getFormModelInfo("prevForm")).getControllerExtensionObject();
                    var viewType = context.getFormModelInfo("viewType");
                    this.setFormModelInfo("viewTypeOfPrevForm", viewType);
                    var navigationObject = new kony.sdk.mvvm.NavigationObject();
                    navigationObject.setQuery("segDetailskA", kony.servicesapp.ResourcesQuery[viewType], "sql");
                    var queryParams = {};
                    var controller = this.getController();
                    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                    /*  if (viewType) {
                        switch (viewType) {
                            case "ORDER":
                                appContext = controller.getApplicationContext();
                                var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
                                queryParams["x"] = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId");
                                break;
                            case "TASK":
                                appContext = controller.getApplicationContext();
                                var taskExecutionFormControllerExtension = appContext.getFormController("frmTaskExecutionKA").getControllerExtensionObject();
                                queryParams["x"] = taskExecutionFormControllerExtension.getFormModelInfo("taskID");
                                break;
                            default:
                                break;
                        }

                        navigationObject.setQueryParams("segDetailskA", queryParams);
                        context.refreshSegData(kony.servicesapp.ResourcesQuery[viewType]);
                    } else {
                        this.$class.$superp.showPreviousForm.call(this, true, this.getFormModelInfo("prevForm"));
                    }*/
                }
                this.$class.$superp.showPreviousForm.call(this, true, this.getFormModelInfo("prevForm"));
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in navigate back of resource execution : " + error);
        }
    },
    navigateToResourceDetails: function() {
        try {
            var contextData = this.getController().getContextData();
            var datamodel = new kony.sdk.mvvm.DataModel();
            var contextData = this.getController().getContextData();
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            datamodel.setPrimaryKeyValueMap({
                "id": contextData.getCustomInfo("MaterialId")
            });
            var queryParams = {};
            var materialInfo = contextData.getCustomInfo("MaterialId");
            queryParams["x"] = materialInfo;
            if (contextData.getCustomInfo("TaskId")) {
                queryParams["z"] = contextData.getCustomInfo("TaskId");
                queryParams["y"] = "";
            } else if (contextData.getCustomInfo("WorkOrderId")) {
                queryParams["y"] = contextData.getCustomInfo("WorkOrderId");
                queryParams["z"] = "";
            }
            if (this.setFormModelInfo("AssignedQuantity") == 0 || this.getFormModelInfo("viewTypeOfPrevForm") == kony.servicesapp.LOCAL) {
                navigationObject.setQuery("form", kony.servicesapp.ResourcesQuery[kony.servicesapp.RESOURCEDETAILS_INVENTORY], "sql");
                queryParams = {};
                queryParams["x"] = materialInfo;
            } else if (this.getFormModelInfo("prevForm") == "frmOrderResourcesListKA") {
                navigationObject.setQuery("form", kony.servicesapp.ResourcesQuery[kony.servicesapp.ORDERRESOURCES_RESOURCEDETAILS], "sql");
            }
            kony.print("navigateToResourceDetails" + JSON.stringify(queryParams));
            //datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", queryParams);
            this.navigateTo("frmOrderResourceDetailsKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToResourceDetails : " + err);
        }
    },
    convertToBase: function(quantity, uomFrom) {
        var contextData = this.getController().getContextData();
        var utilitiesObj = utilities.getUtilityObj();
        var configObj = scopeObj.getController().getConfig();
        var uomentityController = this.getController().getApplicationContext().getModel("UnitConversion", configObj.getObjectServiceName(), configObj.getObjectServiceOptions());
        var query = "select uom.Factor from UnitConversion uom where uom.UnitFrom_id = '" + uomFrom + "' and uom.UnitTo_id = '" + this.getFormModelInfo("BaseUnitID") + "' and uom.Material_id = '" + contextData.getCustomInfo("MaterialId") + "'";
        var queryobj = new kony.sdk.mvvm.Query(query, "sql");
        var scopeObj = this;
        var dataSuccess = function(response) {
                var factor = 1;
                if (response.length != 0) {
                    factor = response[0]["Factor"];
                }
                return quantity * utilitiesObj.roundNumber(factor, 2);
            }
        var dataError = function(response) {
                alert("Unable to fetch conversion");
                return -1;
            }
        uomentityController.fetch(queryobj, dataSuccess, dataError);
    },
    updateQuantity: function(bool) { // bool is true in case of edit, false in case of delete
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var formmodel = this.getController().getFormModel();
            var scopeObj = this,
                uom = undefined;
            var re = new RegExp('^[0-9]{0,12}$|^[0-9]{0,12}.{1}[0-9]{0,3}$');
            var quantity = formmodel.getViewAttributeByProperty("tbxQuantityKA", "text");
            scopeObj.showHidePopUp(false);
            var toBaseQuantity = 0;
            var invQuantity = utilitiesObj.roundNumber(this.getFormModelInfo("InventoryQuantity"), 2);
            if (re.test(quantity)) {
                toBaseQuantity = utilitiesObj.roundNumber(quantity, 2);
            } else {
                alert(utilitiesObj.geti18nValueKA("Enter correct values"));
            }
            kony.sdk.mvvm.v2.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            if (this.getFormModelInfo("RequestedUnitID") !== formmodel.getViewAttributeByProperty("uomListBoxKA", "selectedKey")) {
                quantity = scopeObj.convertToBase(quantity, formmodel.getViewAttributeByProperty("uomListBoxKA", "selectedKey"));
                uom = formmodel.getViewAttributeByProperty("uomListBoxKA", "selectedKey");
            }
            if (toBaseQuantity > invQuantity) {
                alert("Your truck does not have requested quantity of the requested material");
            }
            scopeObj.updateWorkOrderMaterial(quantity, uom);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic updateQuantity : " + err);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
    },
    updateWorkOrderMaterial: function(value, uom) {
        try {
            var objHandler = kony.sdk.mvvm.v2.persistent.Record;
            var utilitiesObj = utilities.getUtilityObj();
            var scopeObj = this;
            var appContext = kony.sdk.mvvm.v2.KonyApplicationContext.getAppInstance();
            var configObj = scopeObj.getController().getConfig();
            var womRecordObject = new objHandler("WorkOrderMaterial");
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var taskExecutionFormControllerExtension = appContext.getFormController("frmTaskExecutionKA").getControllerExtensionObject();
            womRecordObject.set("Quantity", value);
            if (this.getFormModelInfo("workOrderMaterial_Id")) {
                womRecordObject.set("Id", this.getFormModelInfo("workOrderMaterial_Id"));
            } else {
                womRecordObject.set("isConsumable", 'Y');
                womRecordObject.set("TaskComp_id", taskExecutionFormControllerExtension.getFormModelInfo("taskID"));
                womRecordObject.set("Material_id", this.getFormModelInfo("MaterialID"));
            }
            womRecordObject.set("WorkOrder_id", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId"));
            if (uom) {
                womRecordObject.set("RequestedUnit_id", uom);
            }
            womRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
            womRecordObject.setInfo("options", configObj.getObjectServiceOptions());
            var womSuccess = function() {
                    kony.print("Update successful");
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    scopeObj.navigateBack(true);
                };
            var womError = function() {
                    alert(utilitiesObj.geti18nValueKA("i18n.common.materialQuantity.updateError.ValueKA"));
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                };
            this.saveRecord(womRecordObject, womSuccess, womError);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("error in Blogic updateWorkOrderMaterial : " + err);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
    },
    editQuantity: function() {
        try {
            var formModel = this.getController().getFormModel();
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            scopeObj.showHidePopUp(true);
            formModel.setViewAttributeByProperty("lblHeaderKA", "text", utilitiesObj.geti18nValueKA("i18n.common.deitValueKA"));
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic editQuantity : " + err);
        }
    },
    deviceBack: function() {
        utilities.getUtilityObj().doNothingOnDeviceBackKA();
    },
    showHidePopUp: function(showValue) {
        var formModel = this.getController().getFormModel();
        var utilitiesObj = utilities.getUtilityObj();
        switch (showValue) {
        case true:
            formModel.setViewAttributeByProperty("flxEditKA", "isVisible", true);
            formModel.setViewAttributeByProperty("btnBackKA", "skin", "sknBtnWhiteCloseKA");
            formModel.setViewAttributeByProperty("btnBackKA", "focusSkin", "sknBtnWhiteCloseFocKA");
            formModel.setViewAttributeByProperty("btnSaveKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblHeaderKA", "text", utilitiesObj.geti18nValueKA("i18n.common.deitValueKA"));
            break;
        case false:
            formModel.setViewAttributeByProperty("flxEditKA", "isVisible", false);
            formModel.setViewAttributeByProperty("btnBackKA", "skin", "sknBtnbackarrowKA");
            formModel.setViewAttributeByProperty("btnBackKA", "focusSkin", "sknBtnbackarrowFocKA");
            formModel.setViewAttributeByProperty("btnSaveKA", "isVisible", false);
            formModel.setViewAttributeByProperty("lblHeaderKA", "text", utilitiesObj.geti18nValueKA("i18n.order.frmResourceExecutionKA.lblHeaderValueKA"));
            break;
        }
    }
});