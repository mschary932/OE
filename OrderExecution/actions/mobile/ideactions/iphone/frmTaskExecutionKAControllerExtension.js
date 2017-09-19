/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmTaskExecutionKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmTaskExecutionKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    $statics: {
        TASKEXECUTION_DATABASE_DATEFORMAT: "YYYYMMDDHHmmss",
        TIMER_FORMAT: "HH:MM",
        TIMER_FREQUENCY: 60,
        DESCRIPTION_LENGTH: 40,
        DESCRIPTION_SEGMENT_LENGTH: 28,
        MATERIAL_NUMBER_SEGMENT_LENGTH: 10,
        MATERIAL_TYPE_SEGMENT_LENGTH: 20,
        NO_OF_DOTS_AFTERTRUNCATION: 3
    },
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
        this.controllerExtensionGen = undefined;
        this.taskID = null;
        this.taskNumber = null;
        this.tStatusID = null;
        this.tDuration = 0;
        this.woID = null;
        this.woStatusID = null;
        this.materialIDs = [];
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
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            var scopeObj = this;
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successCallback, errorCallback);

            function successCallback(res) {
                var contextData = this.getController().getContextData();
                var woInfo = contextData.getCustomInfo("woTaskInfo");
                this.taskID = woInfo["taskID"];
                this.woStatusID = woInfo["woStatusID"];
                this.woID = woInfo["woID"];
                this.taskNumber = woInfo["taskNumber"];
                this.setFormModelInfo("taskID", woInfo["taskID"]);
                this.setFormModelInfo("woStatusID", woInfo["woStatusID"]);
                this.setFormModelInfo("woID", woInfo["woID"]);
                this.setFormModelInfo("taskNumber", woInfo["taskNumber"]);
                successcallback.call(scopeObj, res);
            };

            function errorCallback(err) {
                errorcallback.call(scopeObj, err);
            };
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
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
    formatTime: function(dataMap) {
        var utilitiesObj = utilities.getUtilityObj();
        var timeFormat = utilitiesObj.geti18nValueKA("i18n.common.TimeFormatKA");
        dataMap["form"][0]["StartDate"] = moment(dataMap["form"][0]["StartDate"]).isValid() ? convertTimeZone(dataMap["form"][0]["StartDate"], kony.servicesapp.remoteTimeZone, null, timeFormat) : "";
        return dataMap;
    },
    bindData: function(dataMap) {
        try {
            dataMap = this.formatTime(dataMap);
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            var scopeObj = this;
            var formData = dataMap["form"][0];
            var segData = [];
            var flexData = [];
            if (dataMap["segTaskExecutionKA"]) {
                segData = dataMap["segTaskExecutionKA"];
                kony.print("segData in task execurtion" + segData);
            }
            if (dataMap["flxStrtKA"]) {
                flexData = dataMap["flxStrtKA"];
            }
            var processedData = {};
            var processedSegData = [];
            var processedRowObj;
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.log.info("kony.sdk.mvvm.frmTaskExecutionKAControllerExtension segData : " + JSON.stringify(flexData));
            var contextData = this.getController().getContextData();
            var woInfo = contextData.getCustomInfo("woTaskInfo");
            this.setFormModelInfo("taskID", woInfo["taskID"]);
            this.setFormModelInfo("woStatusID", woInfo["woStatusID"]);
            this.setFormModelInfo("woID", woInfo["woID"]);
            this.setFormModelInfo("taskNumber", woInfo["taskNumber"]);
            this.setFormModelInfo("tStatusID", formData["Status_id"]);
            this.materialIDs = [];
            for (var i in segData) {
                processedRowObj = {};
                processedRowObj["id"] = segData[i]["Material_id"];
                processedRowObj["womID"] = segData[i]["womID"];
                processedRowObj["isConsumable"] = segData[i]["isConsumable"];
                processedRowObj["isConsumed"] = segData[i]["isConsumed"];
                processedRowObj["RequestedQuantityNumber"] = segData[i]["RequestedQuantity"];
                //processedRowObj["Quantity"] = segData[i]["Quantity"];
                var materialTypeName = utilitiesObj.dataTruncation(segData[i]["MaterialType"], kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.MATERIAL_TYPE_SEGMENT_LENGTH, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.NO_OF_DOTS_AFTERTRUNCATION, "...");
                processedRowObj["MaterialName"] = materialTypeName["value"];
                var itemNumber = utilitiesObj.dataTruncation(segData[i]["Material_id"], kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.MATERIAL_NUMBER_SEGMENT_LENGTH, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.NO_OF_DOTS_AFTERTRUNCATION, "...");
                processedRowObj["Material_id"] = itemNumber["value"];
                processedRowObj["RequestedQuantity"] = utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2);
                processedRowObj["AvailableQuantity"] = utilitiesObj.roundNumber(segData[i]["AvailableQuantity"], 2);
                if (segData[i]["baseUnit"]) {
                    processedRowObj["AvailableQuantity"] += " " + segData[i]["baseUnit"];
                }
                if (segData[i]["ReqUnitDescription"]) {
                    processedRowObj["RequestedQuantity"] += " " + segData[i]["ReqUnitDescription"];
                }
                var description = utilitiesObj.dataTruncation(segData[i]["Description"], kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.DESCRIPTION_SEGMENT_LENGTH, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.NO_OF_DOTS_AFTERTRUNCATION, "...");
                processedRowObj["Description"] = description["value"];
                var workorderStatus = this.getFormModelInfo("woStatusID");
                var taskStatus = this.getFormModelInfo("tStatusID");
                if (segData[i]["isConsumable"] && segData[i]["isConsumable"].toUpperCase() == "Y") {
                    if (segData[i]["isConsumed"] && segData[i]["isConsumed"] != "" && segData[i]["isConsumed"].toUpperCase() == "Y") {
                        if (workorderStatus.toUpperCase() == "STARTED" && taskStatus.toUpperCase() == "STARTED") {
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
                        if (workorderStatus.toUpperCase() == "STARTED" && taskStatus.toUpperCase() == "STARTED") {
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
                        focusSkin: "btnResourceCheckedKA",
                        text: "",
                        isVisible: false
                    };
                }
                this.materialIDs.push({
                    "womID": segData[i]["womID"],
                    "isConsumable": segData[i]["isConsumable"],
                    "isConsumed": segData[i]["isConsumed"]
                });
                processedSegData.push(processedRowObj);
            }
            // The below block of code is to display the group header on task execution form.This need to be removed after UIRT_V2 supports segment header mapping 
            var lclWidgetDataMap = this.getController().getFormModel().getViewAttributeByProperty("segTaskExecutionKA", "widgetDataMap");
            lclWidgetDataMap["lblHeaderKA"] = "lblTaskHeader";
            this.getController().getFormModel().setViewAttributeByProperty("segTaskExecutionKA", "widgetDataMap", lclWidgetDataMap);
            //block ends here
            var taskListLength = processedSegData.length;
            if (taskListLength == 1) {
                taskListLength = taskListLength + " " + utilitiesObj.geti18nValueKA("i18n.common.resourceValueKA");;
            } else {
                taskListLength = taskListLength + " " + utilitiesObj.geti18nValueKA("i18n.common.resourcesValueKA");
            }
            var lclTaskHeader = {
                "lblTaskHeader": taskListLength
            };
            var finalProcessedSegData = [
                [lclTaskHeader, processedSegData]
            ];
            dataMap["segTaskExecutionKA"] = {};
            dataMap["segTaskExecutionKA"]["segTaskExecutionKA"] = finalProcessedSegData;
            var timeFormat = utilitiesObj.geti18nValueKA("i18n.common.TimeFormatKA");
            processedData["lblDayandTimeKA"] = formData["StartDate"];
            processedData["lblStatusKA"] = utilitiesObj.getStatusTextKA(formData["Status_id"]);
            var description1 = utilitiesObj.dataTruncation(formData["Description"], kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.DESCRIPTION_LENGTH, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.NO_OF_DOTS_AFTERTRUNCATION, "...");
            processedData["lblTaskDescriptionKA"] = description1["value"];
            if (flexData.length != 0) {
                if (flexData["Timer"] != null) {
                    //this.tDuration = parseInt(flexData[0]["Timer"]);
                    this.setFormModelInfo("tDuration", parseInt(flexData["Timer"]));
                } else {
                    // this.tDuration = 0;
                    this.setFormModelInfo("tDuration", 0);
                }
            } else {
                //this.tDuration = 0;
                this.setFormModelInfo("tDuration", 0);
            }
            flexData["lblTimerKA"] = utilitiesObj.dateFormat(this.getFormModelInfo("tDuration"), kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TIMER_FORMAT);
            //this.tStatusID = formData["Status_id"];
            this.taskID = woInfo["taskID"];
            this.woStatusID = woInfo["woStatusID"];
            this.woID = woInfo["woID"];
            this.taskNumber = woInfo["taskNumber"];
            this.showStatusMachine(woInfo["woStatusID"], formData["Status_id"]);
            this.getController().getFormModel().setViewAttributeByProperty("imgPlayPauseKA", "src", utilitiesObj.getStatusImageKA(formData["Status_id"]));
            processedData["lblStatusKA"] = processedData["lblStatusKA"].toUpperCase();
            var startTimer = function() {
                    try {
                        kony.timer.schedule("SecondTimer", updateDuration, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TIMER_FREQUENCY, true);
                    } catch (e) {
                        kony.sdk.mvvm.log.error("error in Blogic startTimer : " + e);
                    }
                };
            var updateDuration = function() {
                    var tD = scopeObj.getFormModelInfo("tDuration");
                    tD = tD + kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TIMER_FREQUENCY;
                    scopeObj.setFormModelInfo("tDuration", tD);
                    var x = utilitiesObj.dateFormat(tD, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TIMER_FORMAT);
                    scopeObj.getController().getFormModel().setViewAttributeByProperty("lblTimerKA", "text", x);
                };
            var taskStatus = kony.servicesapp.servicesStatus.key;
            if (formData["Status_id"] == taskStatus.Started) {
                startTimer();
            } else {
                this.cancelTimer();
            }
            dataMap["form"] = processedData;
            // dataMap["flxStrtKA"] = flexData;
            //  var bindDataObj;
            //           for (var widgetGroupId in dataMap) {
            //                bindDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
            //                bindDataObj.bind(formmodel, dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"]);
            //            }
            this.$class.$superp.bindData.call(this, dataMap);
            scopeObj.getController().getFormModel().formatUI();
            formmodel.showView();
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
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
    changeStatusOnPauseCompleteRejectWorkorder: function(woID, taskID, taskNumber, currentStatusID, updatedStatusID) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var configObj = this.getController().getConfig();
            //kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Updating task status");
            var taskStatus = kony.servicesapp.servicesStatus.key;
            if (currentStatusID == taskStatus.Scheduled && updatedStatusID == taskStatus.Paused) {
                return;
            }
            var entityName = "Task";
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(entityName);
            var momentFormat = convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TASKEXECUTION_DATABASE_DATEFORMAT);
            // recordObject.set("id", taskID);
            recordObject.set("WorkOrder_id", woID);
            recordObject.set("Task_num", taskNumber);
            recordObject.set("Status_id", updatedStatusID);
            if (currentStatusID == taskStatus.Scheduled && (updatedStatusID == taskStatus.Rejected || updatedStatusID == taskStatus.Completed)) {
                recordObject.set("StartDate", momentFormat);
                recordObject.set("EndDate", momentFormat);
            } else if (currentStatusID == taskStatus.Paused || currentStatusID == taskStatus.Started && (updatedStatusID == taskStatus.Rejected || updatedStatusID == taskStatus.Completed)) {
                recordObject.set("EndDate", momentFormat);
            }
            var onSuccess = function(res) {
                    if (currentStatusID != updatedStatusID && updatedStatusID != taskStatus.Rejected && currentStatusID != taskStatus.Scheduled) {
                        if (currentStatusID == taskStatus.Started || currentStatusID == taskStatus.Paused) {
                            var swRecordObject = new objHandler("StopWatch");
                            // StopWatch requires Task_num instead of Task_id
                            swRecordObject.set("Task_id", taskNumber);
                            swRecordObject.set("WorkOrder_id", woID);
                            swRecordObject.set("Status_id", updatedStatusID);
                            swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TASKEXECUTION_DATABASE_DATEFORMAT));
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
            var onError = function() {
                    alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                }
            try {
                this.saveRecord(recordObject, onSuccess, onError);
            } catch (err) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.trycatcherror.ValueKA"));
            };
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changeStatusOnPauseCompleteRejectWorkorder : " + err);
        }
    },
    completeOrRejectTask: function() {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.TaskUpdate.ValueKA"));
            var taskStatus = kony.servicesapp.servicesStatus.key;
            var appContext = this.getController().getApplicationContext();
            var configObj = this.getController().getConfig();
            var taskExecutionFormControllerExtension = appContext.getFormController("frmTaskExecutionKA").getControllerExtensionObject();
            var statusID = this.getFormModelInfo("tStatusID");
            var currentStatus = statusID;
            if (currentStatus == taskStatus.Started || currentStatus == taskStatus.Paused) {
                statusID = taskStatus.Completed;
            } else {
                alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                return statusID;
            }
            var entityName = "Task";
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(entityName);
            // recordObject.set("id", this.getFormModelInfo("taskID"));
            recordObject.set("WorkOrder_id", this.getFormModelInfo("woID"));
            recordObject.set("Task_num", this.getFormModelInfo("taskNumber"));
            recordObject.set("Status_id", statusID);
            recordObject.set("EndDate", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TASKEXECUTION_DATABASE_DATEFORMAT));
            recordObject.setInfo("serviceName", configObj.getObjectServiceName());
            recordObject.setInfo("options", configObj.getObjectServiceOptions());
            var onSuccess = function(res) {
                    var swRecordObject = new objHandler("StopWatch");
                    swRecordObject.set("Task_id", this.getFormModelInfo("taskNumber"));
                    swRecordObject.set("WorkOrder_id", this.getFormModelInfo("woID"));
                    swRecordObject.set("Status_id", statusID);
                    swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TASKEXECUTION_DATABASE_DATEFORMAT));
                    swRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    swRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                    swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                    var swSuccess = function() {
                            var wom_ids = this.materialIDs;
                            var records = [];
                            for (var wom in wom_ids) {
                                if (wom_ids[wom]["isConsumable"].toUpperCase() == 'Y' && wom_ids[wom]["isConsumed"].toUpperCase() != 'Y') {
                                    recordObject = new objHandler("WorkOrderMaterial");
                                    recordObject.set("isConsumed", 'Y');
                                    recordObject.set("id", wom_ids[wom]["womID"]);
                                    recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                                    recordObject.setInfo("options", configObj.getObjectServiceOptions());
                                    records.push(recordObject);
                                }
                            }
                            var womSuccess = function() {
                                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                                    taskExecutionFormControllerExtension.fetchData();
                                }
                            var womFailure = function() {
                                    alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                                }
                            taskExecutionFormControllerExtension.saveRecords(records, womSuccess, womFailure);
                            //this.fetchData();
                            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                                kony.sdk.mvvm.backgroundSyncOnStatusChangeKA();
                            }
                        };
                    var swError = function() {
                            alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        };
                    this.saveRecord(swRecordObject, swSuccess, swError);
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
            var onError = function() {
                    alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
            try {
                this.saveRecord(recordObject, onSuccess, onError);
            } catch (err) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.trycatcherror.ValueKA"));
            };
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic completeOrRejectTask : " + err);
        }
    },
    changeStatusForTask: function() {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.TaskUpdate.ValueKA"));
            var statusID = this.getFormModelInfo("tStatusID");
            var currentStatus = statusID;
            var taskStatus = kony.servicesapp.servicesStatus.key;
            switch (currentStatus) {
            case taskStatus.Scheduled:
                statusID = taskStatus.Started;
                break;
            case taskStatus.Rejected:
                break;
            case taskStatus.Started:
                statusID = taskStatus.Paused;
                break;
            case taskStatus.Paused:
                statusID = taskStatus.Started;
                break;
            }
            var entityName = "Task";
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(entityName);
            var configObj = this.getController().getConfig();
            recordObject.set("WorkOrder_id", this.getFormModelInfo("woID"));
            recordObject.set("Task_num", this.getFormModelInfo("taskNumber"));
            //    recordObject.set("id", this.getFormModelInfo("taskID"));
            recordObject.set("Status_id", statusID);
            var momentFormat = convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TASKEXECUTION_DATABASE_DATEFORMAT);
            if (currentStatus == taskStatus.Scheduled) {
                recordObject.set("StartDate", momentFormat);
            }
            recordObject.setInfo("serviceName", configObj.getObjectServiceName());
            recordObject.setInfo("options", configObj.getObjectServiceOptions());
            var onSuccess = function(res) {
                    var swRecordObject = new objHandler("StopWatch");
                    swRecordObject.set("Task_id", this.getFormModelInfo("taskNumber"));
                    swRecordObject.set("WorkOrder_id", this.getFormModelInfo("woID"));
                    swRecordObject.set("Status_id", statusID);
                    swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.sdk.mvvm.frmTaskExecutionKAControllerExtension.TASKEXECUTION_DATABASE_DATEFORMAT));
                    swRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    swRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                    swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                    var swSuccess = function() {
                            this.fetchData();
                            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                                kony.sdk.mvvm.backgroundSyncOnStatusChangeKA();
                            }
                        };
                    var swError = function() {
                            alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        };
                    this.saveRecord(swRecordObject, swSuccess, swError);
                }
            var onError = function() {
                    alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
            try {
                this.saveRecord(recordObject, onSuccess, onError);
            } catch (err) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.trycatcherror.ValueKA"));
            };
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changeStatusForTask : " + err);
        }
    },
    changeConsumedStatus: function() {
        var objHandler = kony.sdk.mvvm.persistent.Record;
        var formmodel = this.getController().getFormModel();
        var configObj = this.getController().getConfig();
        var selRecord = formmodel.getViewAttributeByProperty("segTaskExecutionKA", "selectedItems")[0];
        var statusID = this.getFormModelInfo("tStatusID");
        var taskStatus = kony.servicesapp.servicesStatus.key;
        var utilitiesObj = utilities.getUtilityObj();
        if (selRecord.isConsumable.toUpperCase() == "Y" && statusID == taskStatus.Started) {
            var isConsumed = selRecord.isConsumed;
            var updatedConsumedStatus = "Y";
            if (isConsumed.toUpperCase() == "Y") {
                updatedConsumedStatus = "N";
            }
            var recordObject = new objHandler("WorkOrderMaterial");
            recordObject.set("Id", selRecord.womID);
            recordObject.set("WorkOrder_id", this.getFormModelInfo("woID"));
            recordObject.set("isConsumed", updatedConsumedStatus);
            recordObject.setInfo("serviceName", configObj.getObjectServiceName());
            recordObject.setInfo("options", configObj.getObjectServiceOptions());
            var onSuccess = function() {
                    this.fetchData();
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    if (kony.sdk.mvvm.isNetworkAvailabile()) {
                        kony.sdk.mvvm.backgroundSyncOnStatusChangeKA();
                    }
                }
            var onError = function() {
                    alert(utilitiesObj.geti18nValueKA("i18n.workordermaterial.updateerror.ValueKA"));
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
            this.saveRecord(recordObject, onSuccess, onError);
        }
    },
    showStatusMachine: function(woStatus, tStatus) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var taskStatus = kony.servicesapp.servicesStatus.key;
            if (woStatus == taskStatus.Scheduled || woStatus == taskStatus.OnRoute || woStatus == taskStatus.Rejected || woStatus == taskStatus.Paused) {
                this.getController().getFormModel().setViewAttributeByProperty("flxFooterKA", "isVisible", false);
                return;
            }
            var serviceConstantsObj = kony.servicesapp.constants.getServiceConstantsObj();
            var constants = serviceConstantsObj.getValue(kony.servicesapp.TASK_EXECUTION_STATUS, tStatus);
            switch (constants.length) {
            case 1:
                this.getController().getFormModel().setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnCompleteKA", "isVisible", false);
                this.getController().getFormModel().setViewAttributeByProperty("btnHoldKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnHoldKA", "text", constants[0] ? constants[0] : "");
                this.getController().getFormModel().setViewAttributeByProperty("btnHoldKA", "width", "95%");
                this.getController().getFormModel().setViewAttributeByProperty("btnHoldKA", "left", "2%");
                this.getController().getFormModel().setViewAttributeByProperty("btnCancelKA", "isVisible", false);
                break;
            case 2:
                this.getController().getFormModel().setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                //this.getController().getFormModel ().setViewAttributeByProperty("btnCompleteKA", "width","45%");
                this.getController().getFormModel().setViewAttributeByProperty("btnCompleteKA", "text", constants[0] ? constants[0] : "");
                this.getController().getFormModel().setViewAttributeByProperty("btnCompleteKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnCancelKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnHoldKA", "isVisible", false);
                this.getController().getFormModel().setViewAttributeByProperty("btnCancelKA", "text", constants[1] ? constants[1] : "");
                //this.getController().getFormModel ().setViewAttributeByProperty("btnCancelKA", "width","45%");
                break;
            case 3:
                this.getController().getFormModel().setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnCompleteKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnCompleteKA", "text", constants[0] ? constants[0] : "");
                this.getController().getFormModel().setViewAttributeByProperty("btnHoldKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnHoldKA", "text", constants[1] ? constants[1] : "");
                this.getController().getFormModel().setViewAttributeByProperty("btnCancelKA", "isVisible", true);
                this.getController().getFormModel().setViewAttributeByProperty("btnCancelKA", "text", constants[2] ? constants[2] : "");
                break;
            default:
                this.getController().getFormModel().setViewAttributeByProperty("flxFooterKA", "isVisible", false);
                break;
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showStatusMachine : " + err);
        }
    },
    cancelTimer: function() {
        try {
            kony.timer.cancel("SecondTimer");
        } catch (e) {
            kony.sdk.mvvm.log.error("error in Blogic cancelTimer : " + e);
        }
    },
    //onClickBack: function() {
    //        try {
    //            var scopeObj = this;
    //            var formModel = scopeObj.getController().getFormModel();
    //            var woID = this.getFormModelInfo("woID");
    //            var datamodel = new kony.sdk.mvvm.DataModel();
    //            datamodel.setPrimaryKeyValueMap(woID);
    //            datamodel.setMasterEntityName("WorkOrder");
    //            var navigationObject = new kony.sdk.mvvm.NavigationObject();
    //            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
    //            navigationObject.setQueryParams("segDetailsKA", {
    //                "x": woID
    //            });
    //            navigationObject.setQueryParams("FlxTmpOrderListKA", {
    //                "y": woID
    //            });
    //            navigationObject.addCustomInfo("WorkOrderId", woID);
    //            this.navigateTo("frmOrderExecutionKA", navigationObject);
    //        } catch (err) {
    //            kony.sdk.mvvm.log.error("error in Blogic onClickBack : " + err);
    //        }
    //    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    showTaskDetails: function() {
        try {
            //var navController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().navigationController;
            var datamodel = new kony.sdk.mvvm.DataModel();
            var taskID = this.getFormModelInfo("taskID");
            datamodel.setPrimaryKeyValueMap({
                "id": taskID
            });
            // datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x": taskID
            });
            this.navigateTo("frmTaskDetailsKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showTaskDetails : " + err);
        }
    },
    navigateToResourceExecution: function() {
        try {
            var formmodel = this.getController().getFormModel();
            var selRecord = formmodel.getViewAttributeByProperty("segTaskExecutionKA", "selectedItems")[0];
            var contextData = this.getController().getContextData();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": selRecord.id
            });
            // datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.addCustomInfo("TaskId", this.getFormModelInfo("taskID"));
            navigationObject.addCustomInfo("Quantity", selRecord.RequestedQuantityNumber);
            navigationObject.addCustomInfo("TaskStatus", this.getFormModelInfo("tStatusID"));
            navigationObject.addCustomInfo("WOStatus", this.getFormModelInfo("woStatusID"));
            navigationObject.addCustomInfo("MaterialId", selRecord.id);
            navigationObject.setQueryParams("form", {
                "y": selRecord.id,
                "z": this.getFormModelInfo("taskNumber")
            });
            this.navigateTo("frmResourceExecutionKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToResourceExecution from Task Execution: " + err);
        }
    },
    navigateToTaskResources: function() {
        try {
            var datamodel = new kony.sdk.mvvm.DataModel();
            var formmodel = this.getController().getFormModel();
            datamodel.setPrimaryKeyValueMap({
                id: this.getFormModelInfo("taskID")
            });
            // datamodel.setMasterEntityName(this.getController().getConfig().getEntity());
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("segDetailskA", {
                "x": this.getFormModelInfo("taskID")
            });
            navigationObject.addCustomInfo("TaskId", this.getFormModelInfo("taskID"));
            navigationObject.addCustomInfo("WorkOrderId", this.getFormModelInfo("woID"));
            this.navigateTo("frmTaskResourcesListKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    }
});