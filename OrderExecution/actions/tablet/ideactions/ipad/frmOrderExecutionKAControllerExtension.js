/**
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderExecutionKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderExecutionKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
        // this.controllerExtensionGen= undefined;
        this.statusID = "";
        this.tasks = [];
        this.sub_menu_configured = false;
        this.workorderMaterialIds = undefined;
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this);
            var contextData = this.getController().getContextData();
            this.setFormModelInfo("WorkOrderId", contextData.getCustomInfo("WorkOrderId"));
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
        }
    },
    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
            var contextData = this.getController().getContextData();
            this.setFormModelInfo("WorkOrderId", contextData.getCustomInfo("WorkOrderId"));
            //this.workOrderId = contextData.getCustomInfo("WorkOrderId");       
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
    formatData: function(dataMap) {
        var utilitiesObj = utilities.getUtilityObj();
        var timeFormat = utilitiesObj.geti18nValueKA("i18n.common.TimeFormatKA");
        dataMap["form"][0]["PlannedStartDate"] = convertTimeZone(moment(dataMap["form"][0]["PlannedStartDate"], "YYYYMMDDhhmmss"), kony.servicesapp.remoteTimeZone, null, timeFormat);
        return dataMap;
    },
    bindData: function(dataMap) {
        try {
            dataMap = this.formatData(dataMap);
            var scopeObj = this;
            this.tasks = [];
            var formData = dataMap["form"][0];
            var segData = dataMap["segDetailsKA"];
            var contactData = dataMap["FlxTmpOrderListKA"] ? (dataMap["FlxTmpOrderListKA"][0] ? dataMap["FlxTmpOrderListKA"][0] : dataMap["FlxTmpOrderListKA"]) : dataMap["FlxTmpOrderListKA"]; //;
            var processedData = {};
            var formModel = this.getController().getFormModel();
            var processedSegData = [];
            var ContactprocessedData;
            var utilitiesObj = utilities.getUtilityObj();
            var addressData = "";
            var scopeObj = this;
            var processedSegRowData;
            var timeFormat = utilitiesObj.geti18nValueKA("i18n.common.TimeFormatKA");
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var taskList = 0;
            this.workorderMaterialIds = dataMap["FlxTmpWorkOrderMaterialKA"];
            kony.print("OE dataMap-->" + JSON.stringify(dataMap));
            delete dataMap.FlxTmpWorkOrderMaterialKA;
            for (i in segData) {
                processedSegRowData = {};
                processedSegRowData["Description"] = utilitiesObj.dataTruncation(segData[i]["Description"], 32, 3, "...").value;
                processedSegRowData["Status_id"] = utilitiesObj.getStatusTextKA(segData[i]["Status_id"]);
                processedSegRowData["id"] = segData[i]["id"];
                processedSegRowData["taskNumber"] = segData[i]["Task_num"];
                processedSegRowData["StatusImage"] = utilitiesObj.getStatusImageKA(segData[i]["Status_id"]);
                if (segData[i]["Status_id"] == workOrderStatus.Scheduled || segData[i]["Status_id"] == workOrderStatus.Paused || segData[i]["Status_id"] == workOrderStatus.Started) {
                    taskList++;
                }
                processedSegData.push(processedSegRowData);
                //Task number is required for StopWatch	
                this.tasks.push({
                    "taskID": segData[i]["id"],
                    "currentStatusID": segData[i]["Status_id"],
                    "taskNumber": segData[i]["Task_num"]
                });
            }
            //********** code need to be removed after UIRT_V2 supports segment header mapping 
            var lclWidgetDataMap = formModel.getViewAttributeByProperty("segDetailsKA", "widgetDataMap");
            lclWidgetDataMap["lblSegTaskHdearKA"] = "lblTaskHeader";
            formModel.setViewAttributeByProperty("segDetailsKA", "widgetDataMap", lclWidgetDataMap);
            //******* ends here
            var taskListLength = "";
            if (taskList == 1) {
                taskListLength = taskList + " " + utilitiesObj.geti18nValueKA("i18n.order.frmOrderExecution.PendingTask.ValueKA");
            } else if (taskList > 1) {
                taskListLength = taskList + " " + utilitiesObj.geti18nValueKA("i18n.order.frmOrderExecution.PendingTasks.ValueKA");
            } else {
                taskListLength = utilitiesObj.geti18nValueKA("i18n.order.frmOrderExecution.noPendingTasks.ValueKA");
            }
            if (taskListLength.length > 0) {
                var lclTaskHeader = {
                    "lblTaskHeader": taskListLength
                };
                var finalProcessedSegData = [
                    [lclTaskHeader, processedSegData]
                ];
                dataMap["segDetailsKA"] = {};
                dataMap["segDetailsKA"]["segDetailsKA"] = finalProcessedSegData;
            } else {
                dataMap["segDetailsKA"] = processedSegData;
            }
            processedData["lblTimeKA"] = formData["PlannedStartDate"];
            processedData["lblOrderNumKA"] = formData["id"];
            processedData["lblPriorityKA"] = formData["Priority"];
            //  processedData["lblPriorityKA"] = formData["Priority"]["Description"];
            processedData["lblStatusKA"] = formData["Status_id"];
            formModel.setViewAttributeByProperty("imgStatusMachineStartedKA", "src", utilitiesObj.getStatusImageKA(processedData["lblStatusKA"]));
            //    formModel.setViewAttributeByProperty("imgPriorityKA", "src", utilitiesObj.getPriorityImageKA(processedData["lblPriorityKA"]));
            this.setFormModelInfo("WorkOrderStatus", formData["Status_id"]);
            this.statusID = formData["Status_id"];
            processedData["lblInfoKA"] = utilitiesObj.dataTruncation(formData["Description"], 44, 3, "...").value;
            if (contactData != null) {
                ContactprocessedData = {};
                ContactprocessedData["lblNameKA"] = (contactData["FirstName"] ? contactData["FirstName"] : "") + " " + (contactData["LastName"] ? contactData["LastName"] : "");
                dataMap["FlxTmpOrderListKA"] = ContactprocessedData;
            }
            this.showStatusMachine(processedData["lblStatusKA"]);
            //    addressData = utilitiesObj.getOrderAddress(formData["Address_id"]);
            /*    if (formData["Address_id"]) {
                var destinationLat = formData["Address_id"].get("Latitude") ? (formData["Address_id"].get("Latitude")) : "";
                var destinationLon = formData["Address_id"].get("Logitude") ? (formData["Address_id"].get("Logitude")) : "";
                this.setFormModelInfo("destinationLat", destinationLat);
                this.setFormModelInfo("destinationLon", destinationLon);
            }*/
            //       processedData["lblAddressKA"] = utilitiesObj.dataTruncation(addressData, 47, 3, "...").value;
            //       processedData["lblPriorityKA"] = utilitiesObj.getPriorityTextKA(processedData["lblPriorityKA"]);
            //       processedData["lblStatusKA"] = utilitiesObj.getStatusTextKA(processedData["lblStatusKA"]);
            dataMap["form"] = processedData;
            this.setFormModelInfo("WorkOrderStatus", formData["Status_id"]);
            this.$class.$superp.bindData.call(this, dataMap);
            try {
                var hideSegHeader = function() {
                        var segData = scopeObj.getController().getFormModel().getViewAttributeByProperty("segDetailsKA", "data");
                        if (segData && segData[0] && segData[0].length > 1 && segData[0][1]) {
                            segData = segData[0][1];
                            scopeObj.getController().getFormModel().setViewAttributeByProperty("segDetailsKA", "data", segData);
                        }
                    }
                kony.timer.schedule("HideSegHeader", hideSegHeader, 4, false);
            } catch (err) {
                kony.sdk.mvvm.log.error("Error in Blogic bind data timer: " + err);
            }
            //this.$class.$superp.bindData.call(this, dataMap);
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
    showTaskExecutionForm: function() {
        try {
            var viewModel = this.getController().getFormModel();
            var selRecord = [];
            if (viewModel.getViewAttributeByProperty("segDetailsKA", "selectedItems") && viewModel.getViewAttributeByProperty("segDetailsKA", "selectedItems")[0]) {
                selRecord = viewModel.getViewAttributeByProperty("segDetailsKA", "selectedItems")[0];
                var datamodel = new kony.sdk.mvvm.DataModel();
                datamodel.setPrimaryKeyValueMap({
                    "id": selRecord.id
                });
                //	datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
                var navigationObject = new kony.sdk.mvvm.NavigationObject();
                navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
                //	datamodel.setMasterEntityName('Task');
                navigationObject.setQueryParams("segTaskExecutionKA", {
                    "x": selRecord.id
                });
                navigationObject.setQueryParams("flxStrtKA", {
                    "x": selRecord.taskNumber,
                    "y": this.getFormModelInfo("WorkOrderId")
                });
                navigationObject.addCustomInfo("woTaskInfo", {
                    "taskID": selRecord.id,
                    "woStatusID": this.statusID,
                    "woID": this.getFormModelInfo("WorkOrderId"),
                    "taskNumber": selRecord.taskNumber
                });
                this.navigateTo("frmTaskExecutionKA", navigationObject);
            }
        } catch (e) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + e);
        }
    },
    showPreviousForm: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload, "frmOrderListKA");
    },
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    showStatusMachine: function(currentStatus) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var formModel = this.getController().getFormModel();
            var serviceConstantsObj = kony.servicesapp.constants.getServiceConstantsObj();
            var constants = serviceConstantsObj.getValue(kony.servicesapp.ORDER_EXECUTION_STATUS, currentStatus);
            switch (constants.length) {
            case 1:
                formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnCompleteKA", "isVisible", false);
                formModel.setViewAttributeByProperty("btnHoldKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnHoldKA", "text", constants[0] ? constants[0] : "");
                formModel.setViewAttributeByProperty("btnHoldKA", "width", "95%");
                formModel.setViewAttributeByProperty("btnHoldKA", "left", "2%");
                formModel.setViewAttributeByProperty("btnCancelKA", "isVisible", false);
                break;
            case 2:
                formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnCompleteKA", "text", constants[0] ? constants[0] : "");
                formModel.setViewAttributeByProperty("btnCompleteKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnCancelKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnHoldKA", "isVisible", false);
                formModel.setViewAttributeByProperty("btnCancelKA", "text", constants[1] ? constants[1] : "");
                break;
            case 3:
                formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnCompleteKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnCompleteKA", "text", constants[0] ? constants[0] : "");
                formModel.setViewAttributeByProperty("btnHoldKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnHoldKA", "text", constants[1] ? constants[1] : "");
                formModel.setViewAttributeByProperty("btnCancelKA", "isVisible", true);
                formModel.setViewAttributeByProperty("btnCancelKA", "text", constants[2] ? constants[2] : "");
                break;
            default:
                formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", false);
                break;
            }
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
    showWorkOrderDetailsForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            //var navController =  this.getController().getNavigController();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": this.getFormModelInfo("WorkOrderId")
            });
            //datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("flxParentContactKA", {
                "x": this.getFormModelInfo("WorkOrderId")
            });
            navigationObject.setQueryParams("flxAssetsKA", {
                "x": this.getFormModelInfo("WorkOrderId")
            });
            navigationObject.setQueryParams("flxDurationKA", {
                "x": this.getFormModelInfo("WorkOrderId")
            });
            this.navigateTo("frmOrderDetailsKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
    completeOrRejectWorkorder: function() {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.WorkorderUpdate.ValueKA"));
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var statusID = this.statusID;
            var currentStatus = statusID;
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var configObj = scopeObj.getController().getConfig();
            switch (currentStatus) {
            case workOrderStatus.Scheduled:
                statusID = workOrderStatus.Rejected;
                break;
            case workOrderStatus.Started:
                statusID = workOrderStatus.Completed;
                break;
            case workOrderStatus.Paused:
                statusID = workOrderStatus.Completed;
                break;
            }
            var currentLocation = {};
            var proccessRecordsAfterCurrentLocation = function() {
                    var entityName = "WorkOrder";
                    var recordObject = new objHandler(entityName);
                    recordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                    recordObject.set("Status_id", statusID);
                    recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    recordObject.setInfo("options", configObj.getObjectServiceOptions());
                    var onSuccess = function(res) {
                            var swRecordObject = new objHandler("StopWatch");
                            // StopWatch requires Task_num instead of Task_id
                            if (statusID == workOrderStatus.Rejected) {
                                swRecordObject.set("Longitude", currentLocation.lon);
                                swRecordObject.set("Latitude", currentLocation.lat);
                            }
                            swRecordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("WorkOrderId"));
                            swRecordObject.set("Task_id", "");
                            swRecordObject.set("Status_id", statusID);
                            swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, "YYYYMMDDHHmmss"));
                            swRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                            swRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                            swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                            var processRecordsAfterWOMsUpdate = function() {
                                    var appContext = scopeObj.getController().getApplicationContext();
                                    var tList = scopeObj.tasks;
                                    for (var i in tList) {
                                        var t = tList[i];
                                        var controller = appContext.getFormController("frmOrderExecutionKA");
                                        controller.performAction("changeStatusOnPauseCompleteRejectWorkorder", [scopeObj.getFormModelInfo("WorkOrderId"), t["taskID"], t["taskNumber"], t["currentStatusID"], statusID]);
                                    }
                                    if (statusID == workOrderStatus.Rejected) {
                                        scopeObj.showPreviousForm(true);
                                    } else {
                                        scopeObj.fetchData();
                                    }
                                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                                    if (kony.sdk.mvvm.isNetworkAvailabile()) {
                                        kony.sdk.mvvm.backgroundSyncOnStatusChangeKA();
                                    }
                                }
                            var swSuccess = function() {
                                    if (statusID == workOrderStatus.Completed) {
                                        var wom_ids = scopeObj.workorderMaterialIds;
                                        var records = [];
                                        var recordObject1;
                                        // update workorder material table to set isConsumed to true for all the resources assoscicated to the workorder
                                        for (var wom in wom_ids) {
                                            if (wom_ids[wom]["isConsumable"] && wom_ids[wom]["isConsumable"].toUpperCase() == 'Y' && wom_ids[wom]["isConsumed"] && wom_ids[wom]["isConsumed"].toUpperCase() != 'Y') {
                                                recordObject1 = new objHandler("WorkOrderMaterial");
                                                recordObject1.set("isConsumed", 'Y');
                                                recordObject1.set("id", wom_ids[wom]["id"]);
                                                recordObject1.setInfo("serviceName", configObj.getObjectServiceName());
                                                recordObject1.setInfo("options", configObj.getObjectServiceOptions());
                                                records.push(recordObject1);
                                            }
                                        }
                                        var womSuccess = function() {
                                                processRecordsAfterWOMsUpdate();
                                            }
                                        var womFailure = function() {
                                                alert(utilitiesObj.geti18nValueKA("i18n.workordermaterial.updateerror.ValueKA"));
                                            }
                                        scopeObj.saveRecords(records, womSuccess, womFailure);
                                    } else {
                                        processRecordsAfterWOMsUpdate();
                                    }
                                };
                            var swError = function() {
                                    alert(utilitiesObj.geti18nValueKA("i18n.common.workorderUpdateError.ValueKA"));
                                };
                            scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                        }
                    var onError = function() {
                            alert(utilitiesObj.geti18nValueKA("i18n.common.workorderUpdateError.ValueKA"));
                            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        }
                    scopeObj.saveRecord(recordObject, onSuccess, onError);
                }
            var gpsSuccess = function(location) {
                    currentLocation.lat = location.coords.latitude;
                    currentLocation.lon = location.coords.longitude;
                    proccessRecordsAfterCurrentLocation();
                }
            var gpsFailure = function(err) {
                    var utilitiesObj = utilities.getUtilityObj();
                    var msg = utilitiesObj.geti18nValueKA("i18n.common.map.enableGPS.ValueKA");
                    var appContext = scopeObj.getController().getApplicationContext();
                    var controllerExtension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
                    var flag = controllerExtension.getFormModelInfo("EnableGPS");
                    flag = flag ? true : false;
                    if (!flag) {
                        controllerExtension.setFormModelInfo("EnableGPS", true);
                        alert(msg);
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    } else {
                        currentLocation.lat = "0.0000";
                        currentLocation.lon = "0.0000";
                        proccessRecordsAfterCurrentLocation();
                    }
                }
            if (statusID == workOrderStatus.Rejected) {
                kony.location.getCurrentPosition(gpsSuccess, gpsFailure);
            } else {
                proccessRecordsAfterCurrentLocation();
            }
        } catch (err) {
            kony.sdk.mvvm.log.error(err)
        };
    },
    changeStatusForWorkorder: function() {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.WorkorderUpdate.ValueKA"));
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var statusID = this.statusID;
            var currentStatus = statusID;
            switch (currentStatus) {
            case workOrderStatus.Scheduled:
                statusID = workOrderStatus.OnRoute;
                break;
            case workOrderStatus.OnRoute:
                statusID = workOrderStatus.Started;
                break;
            case workOrderStatus.Started:
                statusID = workOrderStatus.Paused;
                break;
            case workOrderStatus.Paused:
                statusID = workOrderStatus.Started;
                break;
            }
            var currentLocation = {};
            var proccessRecordsAfterCurrentLocation = function() {
                    var entityName = "WorkOrder";
                    var objHandler = kony.sdk.mvvm.persistent.Record;
                    var recordObject = new objHandler(entityName);
                    recordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                    recordObject.set("Status_id", statusID);
                    var configObj = scopeObj.getController().getConfig();
                    recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    recordObject.setInfo("options", configObj.getObjectServiceOptions());
                    var onSuccess = function(res) {
                            var swRecordObject = new objHandler("StopWatch");
                            var workOrderRecordObject = new objHandler("WorkOrder");
                            workOrderRecordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                            swRecordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("WorkOrderId"));
                            if (statusID == workOrderStatus.Started && currentStatus == workOrderStatus.OnRoute) {
                                swRecordObject.set("Longitude", currentLocation.lon);
                                swRecordObject.set("Latitude", currentLocation.lat);
                            }
                            swRecordObject.set("Task_id", "");
                            swRecordObject.set("Status_id", statusID);
                            swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, "YYYYMMDDHHmmss"));
                            swRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                            swRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                            swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                            var swSuccess = function() {
                                    var appContext = scopeObj.getController().getApplicationContext();
                                    if (statusID == workOrderStatus.Paused) {
                                        var tList = scopeObj.tasks;
                                        for (var i in tList) {
                                            var t = tList[i];
                                            if (t["currentStatusID"] != workOrderStatus.Scheduled && t["currentStatusID"] != workOrderStatus.Completed) {
                                                var controller = appContext.getFormController("frmOrderExecutionKA");
                                                controller.performAction("changeStatusOnPauseCompleteRejectWorkorder", [scopeObj.getFormModelInfo("WorkOrderId"), t["taskID"], t["taskNumber"], t["currentStatusID"], statusID]);
                                            }
                                        }
                                    }
                                    scopeObj.fetchData();
                                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                                    if (kony.sdk.mvvm.isNetworkAvailabile()) {
                                        kony.sdk.mvvm.backgroundSyncOnStatusChangeKA();
                                    }
                                };
                            var swError = function() {
                                    alert(utilitiesObj.geti18nValueKA("i18n.common.workorderUpdateError.ValueKA"));
                                };
                            scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                        }
                    var onError = function() {
                            alert(utilitiesObj.geti18nValueKA("i18n.common.workorderUpdateError.ValueKA"));
                            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        }
                    scopeObj.saveRecord(recordObject, onSuccess, onError);
                }
            var gpsSuccess = function(location) {
                    currentLocation.lat = location.coords.latitude;
                    currentLocation.lon = location.coords.longitude;
                    proccessRecordsAfterCurrentLocation();
                }
            var gpsFailure = function(err) {
                    var utilitiesObj = utilities.getUtilityObj();
                    var msg = utilitiesObj.geti18nValueKA("i18n.common.map.enableGPS.ValueKA");
                    var appContext = scopeObj.getController().getApplicationContext();
                    var controllerExtension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
                    var flag = controllerExtension.getFormModelInfo("EnableGPS");
                    flag = flag ? true : false;
                    if (!flag) {
                        controllerExtension.setFormModelInfo("EnableGPS", true);
                        alert(msg);
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    } else {
                        currentLocation.lat = "0.0000";
                        currentLocation.lon = "0.0000";
                        proccessRecordsAfterCurrentLocation();
                    }
                }
            if (statusID == workOrderStatus.Started && currentStatus == workOrderStatus.OnRoute) {
                //            kony.location.getCurrentPosition(gpsSuccess, gpsFailure);
                proccessRecordsAfterCurrentLocation();
            } else {
                proccessRecordsAfterCurrentLocation();
            }
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
    showWorkOrderHistoryForm: function() {
        try {
            // alert("Work In Progress");
            var formmodel = this.getController().getFormModel();
            //var navController =  this.getController().getNavigController();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": this.getFormModelInfo("WorkOrderId")
            });
            //  datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            // datamodel.setMasterEntityName('WorkOrderHistory');
            navigationObject.setQueryParams("segOrderHistoryKA", {
                "x": this.getFormModelInfo("WorkOrderId")
            });
            this.navigateTo("frmOrderHistoryKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
    showWorkOrderResourcesForm: function() {
        try {
            var datamodel = new kony.sdk.mvvm.DataModel();
            var formmodel = this.getController().getFormModel();
            datamodel.setPrimaryKeyValueMap({
                "id": this.getFormModelInfo("WorkOrderId")
            });
            //  datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("segDetailskA", {
                "x": this.getFormModelInfo("WorkOrderId")
            });
            navigationObject.addCustomInfo("WorkOrderId", this.getFormModelInfo("WorkOrderId"));
            this.navigateTo("frmOrderResourcesListKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },
    onClickBack: function() {
        showFormOrderList();
    },
    changeStatusOnPauseCompleteRejectWorkorder: function(woID, taskID, taskNumber, currentStatusID, updatedStatusID) {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var configObj = this.getController().getConfig();
            //kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Updating task status");
            if (currentStatusID == workOrderStatus.Scheduled && updatedStatusID == workOrderStatus.Paused) {
                return;
            }
            var entityName = "Task";
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(entityName);
            var momentFormat = convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, "YYYYMMDDHHmmss");
            //   recordObject.set("id", taskID);
            recordObject.set("WorkOrder_id", woID);
            recordObject.set("Task_num", taskNumber);
            recordObject.set("Status_id", updatedStatusID);
            recordObject.setInfo("serviceName", configObj.getObjectServiceName());
            recordObject.setInfo("options", configObj.getObjectServiceOptions());
            if (currentStatusID == workOrderStatus.Scheduled && (updatedStatusID == workOrderStatus.Rejected || updatedStatusID == workOrderStatus.Completed)) {
                recordObject.set("StartDate", momentFormat);
                recordObject.set("EndDate", momentFormat);
            } else if (currentStatusID == workOrderStatus.Paused || currentStatusID == workOrderStatus.Started && (updatedStatusID == workOrderStatus.Rejected || updatedStatusID == workOrderStatus.Completed)) {
                recordObject.set("EndDate", momentFormat);
            }
            var onSuccess = function(res) {
                    if (currentStatusID != updatedStatusID && updatedStatusID != workOrderStatus.Rejected && currentStatusID != workOrderStatus.Scheduled) {
                        if (currentStatusID == workOrderStatus.Started || currentStatusID == workOrderStatus.Paused) {
                            var swRecordObject = new objHandler("StopWatch");
                            swRecordObject.set("Task_id", taskNumber);
                            swRecordObject.set("WorkOrder_id", woID);
                            swRecordObject.set("Status_id", updatedStatusID);
                            swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, "YYYYMMDDHHmmss"));
                            swRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                            swRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                            swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                            var swSuccess = function() {
                                    //do nothing
                                    kony.print("Update successful");
                                };
                            var swError = function() {
                                    alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                                };
                            this.saveRecord(swRecordObject, swSuccess, swError);
                        }
                    }
                }
            var onError = function(error) {
                    alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                }
            this.saveRecord(recordObject, onSuccess, onError);
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
    showFrmDirectionKA: function() {
        try {
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controller = appContext.getFormController("frmDirectionsKA");
            var formmodel = controller.getFormModel();
            var lat = this.getFormModelInfo("destinationLat");
            var lon = this.getFormModelInfo("destinationLon");
            if (lat && lon) {
                formmodel.performActionOnView("mapDirectionKA", "clear", []);
                this.navigateTo("frmDirectionsKA", null);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showFrmDirectionKA : " + err);
        }
    },
    cancelTimer: function() {
        try {
            kony.timer.cancel("HideSegHeader");
        } catch (e) {
            kony.sdk.mvvm.log.error("error in Blogic cancelTimer : " + e);
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    }
});