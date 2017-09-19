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
kony.sdk.mvvm.frmTaskExecutionKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
		var scopeObj = this;
        scopeObj.$class.$super.call(scopeObj, controllerObj);
        scopeObj.controllerExtensionGen = undefined;
        scopeObj.taskID = null;
        scopeObj.taskNumber = null;
        scopeObj.tStatusID = null;
        scopeObj.tDuration = 0;
        scopeObj.woID = null;
        scopeObj.woStatusID = null;
        scopeObj.materialIDs = [];
      	scopeObj.records ={};
    },
    fetchData: function() {
		var scopeObj = this;
        try {
            if (Object.keys(kony.servicesapp.swipedIndices).length > 0) {
                var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", true);
                animObj["callbacks"] = {
                    "animationEnd": function() { 
                        var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
                        kony.servicesapp.rowreset = true;
                        kony.servicesapp.swipedIndices = {};
                        kony.servicesapp.coords = [];
                        kony.servicesapp.isAnimationInProgress = false;
                        return controller.$class.$superp.fetchData.call(controller);
                    }
                }
                frmTaskExecutionKA.segSwipeKA.animateRows({
                    rows: [{
                        sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                        rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
                    }],
                    widgets: ["flxChildKA"],
                    animation: animObj
                });
            } else if (kony.servicesapp.isAnimationInProgress && kony.application.getCurrentForm().id == kony.servicesapp.FRMTASKEXECUTIONKA) {
                return;
            } else {
                scopeObj.$class.$superp.fetchData.call(scopeObj);
            }
        } catch (err) {
            kony.appfoundation.log.error("Error in fetchData of controllerExtension");
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
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
            scopeObj.bindData(scopeObj.$class.$superp.formatData.call(scopeObj, data));
        } catch (err) {
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
			function successCallback(res) {
                var woInfo = scopeObj.getController().getContextData().getCustomInfo("woTaskInfo");
                scopeObj.taskID = woInfo["taskID"];
                scopeObj.woStatusID = woInfo["woStatusID"];
                scopeObj.woID = woInfo["woID"];
                scopeObj.taskNumber = woInfo["taskNumber"];
                scopeObj.setFormModelInfo("taskID", woInfo["taskID"]);
                scopeObj.setFormModelInfo("woStatusID", woInfo["woStatusID"]);
                scopeObj.setFormModelInfo("woID", woInfo["woID"]);
                scopeObj.setFormModelInfo("taskNumber", woInfo["taskNumber"]);
                successcallback.call(scopeObj, res);
            };
            function errorCallback(err) {
                errorcallback.call(scopeObj, err);
            };
            scopeObj.$class.$superp.performFetchFormData.call(scopeObj, serviceName, options, successCallback, errorCallback);
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
    removeRecord: function(record, successcallback, errorcallback) {
        try {
            var scopeObj = this;
            function success(res) {
                successcallback.call(scopeObj, res);
            }
            function error(err) {
                //Handle error case
                errorcallback.call(scopeObj, res);
                kony.appfoundation.log.error("In removeData errorcallback in controller extension ", err);
                var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
                kony.appfoundation.log.error(exception.toString());
            }
			scopeObj.$class.$superp.removeRecord.call(scopeObj, record, success, error);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
        }
    },
    formatTime: function(dataMap) {
        try {
            dataMap["form"][0]["StartDate"] = moment(dataMap["form"][0]["StartDate"], kony.servicesapp.DB_DATE_FORMAT).isValid() ? convertTimeZone(moment(dataMap["form"][0]["StartDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME")) : "";
            return dataMap;
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic formatTime : " + error);
        }
    },
    bindData: function(dataMap) {
        try {
            var scopeObj = this;
          	var pData = dataMap["segSwipeKA"];
          	for(var i=0;i<pData.length;i++){
              if((pData[i]["IsLeaf"]=='X')&&(kony.servicesapp.CONNECTOR!="CRM"))
                pData[i]["IsLeaf"] = {"text":"X","isVisible":true};
            }
          	dataMap["segSwipeKA"]=pData;
          	scopeObj.records=pData;
            var formmodel = scopeObj.getController().getFormModel();
            dataMap = scopeObj.formatTime(dataMap);
            formmodel.clear();
            var formData = dataMap["form"][0];
            var segData = [];
            var flexData = [];
            if (dataMap["segSwipeKA"]) {
                segData = dataMap["segSwipeKA"];
            }
            if (dataMap["flxStrtKA"]) {
                flexData = dataMap["flxStrtKA"];
            }
			var sdkcred = kony.store.getItem("SdkCred");
            /*if(sdkcred["CONNECTOR"] == "ECC")
            {
              formmodel.setViewAttributeByProperty("btnTimeAndExpense","isVisible",false);
              formmodel.setViewAttributeByProperty("lblLine7A","isVisible",false);
            } else if(sdkcred["CONNECTOR"] == "CRM"){
				formmodel.setViewAttributeByProperty("btnTimeAndExpense","isVisible",true);
				formmodel.setViewAttributeByProperty("lblLine7A","isVisible",true);
			}*/
            var processedData = {};
            var processedSegData = [];
            var utilitiesObj = utilities.getUtilityObj();
            var woInfo = scopeObj.getController().getContextData().getCustomInfo("woTaskInfo");
            scopeObj.setWOInformation(woInfo, formData)
            processedSegData = scopeObj.formatSegData(segData, scopeObj);
            // The below block of code is to display the group header on task execution form.This need to be removed after UIRT_V2 supports segment header mapping 
            var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segSwipeKA", "widgetDataMap");
            lclWidgetDataMap["lblHeaderKA"] = "lblTaskHeader";
            formmodel.setViewAttributeByProperty("segSwipeKA", "widgetDataMap", lclWidgetDataMap);
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
            dataMap["segSwipeKA"] = {};
            dataMap["segSwipeKA"]["segSwipeKA"] = finalProcessedSegData;
            var result = scopeObj.processSegData(processedData, flexData, formData, woInfo);
            processedData = result[0];
            flexData = result[1];
            var startTimer = function() {
                try {
                    kony.timer.schedule("SecondTimer", updateDuration, kony.servicesapp.TIMER_FREQUENCY, true);
                } catch (e) {
                    kony.sdk.mvvm.log.error("error in Blogic startTimer : " + e);
                }
            };
            var updateDuration = function() {
                var tD = scopeObj.getFormModelInfo("tDuration");
                tD = tD + kony.servicesapp.TIMER_FREQUENCY;
                scopeObj.setFormModelInfo("tDuration", tD);
                formmodel.setViewAttributeByProperty("lblTimerKA", "text", utilitiesObj.dateFormat(tD, kony.servicesapp.TIMER_FORMAT));
            };
            var taskStatus = kony.servicesapp.servicesStatus.key;
            if (formData["Status_id"] == taskStatus.Started) {
                startTimer();
            } else {
                scopeObj.cancelTimer();
            }
            dataMap["form"] = processedData;
            dataMap["flxStrtKA"] = flexData;
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
            formmodel.formatUI();
            formmodel.showView();
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
	//To assign values to processedRowObj from segData and scopeObj
    formatSegData: function(segData, scopeObj) {
        try {
			var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var processedRowObj, materialTypeName, itemNumber, description, taskStatus;
            for (var i in segData) {
                processedRowObj = {};
                processedRowObj["id"] = segData[i]["Material_id"];
                processedRowObj["womID"] = segData[i]["womID"];
                processedRowObj["ItemNumber"] = segData[i]["ItemNumber"];
                processedRowObj["isConsumable"] = segData[i]["isConsumable"];
                processedRowObj["isConsumed"] = segData[i]["isConsumed"];
                processedRowObj["RequestedQuantityNumber"] = segData[i]["RequestedQuantity"];
                processedRowObj["InventoryId"] = segData[i]["InvID"];
                processedRowObj["baseunitId"] = segData[i]["baseunitId"];
                processedRowObj["ReqId"] = segData[i]["ReqId"];
                processedRowObj["InventoryQuantity"] = utilitiesObj.roundNumber(segData[i]["InventoryQuantity"], 2);
                materialTypeName = utilitiesObj.dataTruncation(segData[i]["MaterialType"], kony.servicesapp.MATERIAL_TYPE_SEGMENT_LENGTH, kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION, "...");
                processedRowObj["MaterialName"] = materialTypeName["value"];
                itemNumber = utilitiesObj.dataTruncation(segData[i]["Material_id"], kony.servicesapp.MATERIAL_NUMBER_SEGMENT_LENGTH, kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION, "...");
                processedRowObj["Material_id"] = itemNumber["value"];
                processedRowObj["RequestedQuantity"] = utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2) + "";
                processedRowObj["AvailableQuantity"] = utilitiesObj.roundNumber(segData[i]["AvailableQuantity"], 2) + "";
                processedRowObj["ReqUnitDescription"] = segData[i]["ReqUnitDescription"];
                processedRowObj["IsLeaf"] = segData[i]["IsLeaf"];
              	if (segData[i]["baseUnit"]) {
                    processedRowObj["AvailableQuantity"] += " " + segData[i]["baseUnit"];
                }
                if (segData[i]["ReqUnitDescription"]) {
                    processedRowObj["RequestedQuantity"] += " " + segData[i]["ReqUnitDescription"];
                }
                processedRowObj["MaterialDescription"] = segData[i]["Description"];
                description = utilitiesObj.dataTruncation(segData[i]["Description"], kony.servicesapp.DESCRIPTION_SEGMENT_LENGTH, kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION, "...");
                processedRowObj["Description"] = description["value"];
                taskStatus = scopeObj.getFormModelInfo("tStatusID");
                if (taskStatus.toUpperCase() != "SCHEDULED" && segData[i]["isConsumable"] == 'Y') {
                    switch (taskStatus.toUpperCase()) {
                        case "STARTED":
                            if (segData[i]["isConsumed"].toUpperCase() == "Y") {
                                processedRowObj["isConsumedImage"] = {
                                    skin: kony.servicesapp.BTNCHECKEDENABLEDKA_SKIN,
                                    focusSkin: kony.servicesapp.BTNCHECKEDENABLEDKA_SKIN,
                                    text: " "
                                };
                            } else {
                                scopeObj.materialIDs.push({
                                    "womID": segData[i]["womID"],
                                    "isConsumable": segData[i]["isConsumable"],
                                    "isConsumed": segData[i]["isConsumed"],
                                    "baseunitId": segData[i]["baseunitId"],
                                    "ReqId": segData[i]["ReqId"],
                                    "Material_ID": segData[i]["Material_id"],
                                    "RequestedQuantity": utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2),
                                    "AvailableQuantity": utilitiesObj.roundNumber(segData[i]["AvailableQuantity"], 2),
                                    "InventoryID": segData[i]["InvID"],
                                    "isConsumed": segData[i]["isConsumed"]
                                });
                                if (processedRowObj["RequestedQuantity"] != 0) {
                                    processedRowObj["metaInfo"] = {
                                        editMode: constants.SEGUI_EDIT_MODE_DELETE,
                                        editModeCustomConfig: [{
                                                title: utilitiesObj.geti18nValueKA("i18n.common.delete.valueKA"),
                                                backgroundColor: "ff5d6e",
                                                callback: kony.servicesapp.deleteCallback
                                            }, {
                                                title: utilitiesObj.geti18nValueKA("i18n.common.deitValueKA"),
                                                backgroundColor: "9b9b9b",
                                                callback: kony.servicesapp.editCallback
                                            }

                                        ]
                                    }
                                }
                                processedRowObj["isConsumedImage"] = {
                                    skin: kony.servicesapp.BTNUNCHECKEDENABLEDKA_SKIN ,
                                    focusSkin: kony.servicesapp.BTNUNCHECKEDENABLEDKA_SKIN ,
                                    text: " "
                                };
                            }
                            break;
                        default:
                            if (segData[i]["isConsumed"].toUpperCase() == "Y") {
                                processedRowObj["isConsumedImage"] = {
                                    skin: kony.servicesapp.BTNRESOURCECHECKED_SKIN,
                                    focusSkin: kony.servicesapp.BTNRESOURCECHECKED_SKIN,
                                    text: " "
                                };

                            } else {
                                processedRowObj["isConsumedImage"] = {
                                    skin: kony.servicesapp.BTNRESOURCEUNCHECKED_SKIN,
                                    focusSkin: kony.servicesapp.BTNRESOURCEUNCHECKED_SKIN,
                                    text: " "
                                };
                            }
                    }
                } else {
                    processedRowObj["isConsumedImage"] = {
                        skin: kony.servicesapp.BTNTRANSKA_SKIN,
                        focusSkin: kony.servicesapp.BTNTRANSKA_SKIN,
                        text: " "
                    }
                }
                processedSegData.push(processedRowObj);
            }
            return processedSegData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatSegData : " + err);
        }
    },
    fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
			var scopeObj = this;
            var configObj = scopeObj.getController().getConfig();
            scopeObj.$class.$superp.fetchMasterData.call(scopeObj, configObj.getObjectServiceName(), configObj.getObjectServiceOptions(), successcallback, errorcallback);
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
            scopeObj.$class.$superp.saveData.call(scopeObj, success, error);
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
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    deleteData: function() {
        try {
            var scopeObj = this;
            scopeObj.$class.$superp.deleteData.call(scopeObj, success, error);
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
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
	//This function is used to change the status when it is Completed or Rejected
    changeStatusOnPauseCompleteRejectWorkorder: function(woID, taskID, taskNumber, currentStatusID, updatedStatusID) {
        try {
			var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var configObj = scopeObj.getController().getConfig();
            var taskStatus = kony.servicesapp.servicesStatus.key;
            if (currentStatusID == taskStatus.Scheduled && updatedStatusID == taskStatus.Paused) {
                return;
            }
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(kony.servicesapp.ENTITY_TASK);
            var momentFormat = convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT);
            recordObject.set("WorkOrder_id", woID);
            recordObject.set("Task_num", taskNumber);
            recordObject.set("Status_id", updatedStatusID);
            recordObject.set("id",taskID);
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
                        swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
                        swRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                        swRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                        swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                        var swSuccess = function() {
                            kony.sdk.mvvm.log.info("Update successful");
                        };
                        var swError = function() {
                            kony.sdk.mvvm.log.info(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                        };
                        scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                    }
                }
            }
            var onError = function() {
                alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
            }
            try {
                scopeObj.saveRecord(recordObject, onSuccess, onError);
            } catch (err) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.trycatcherror.ValueKA"));
            };
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changeStatusOnPauseCompleteRejectWorkorder : " + err);
        }
    },
	//This function is used to complete or reject task
    completeOrRejectTask: function() {
        try {
			var scopeObj = this;
			var controller = scopeObj.getController();
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.TaskUpdate.ValueKA"));
            var taskStatus = kony.servicesapp.servicesStatus.key;
            var noofresources = scopeObj.materialIDs.length;
			var objServName = controller.getConfig().getObjectServiceName();
			var objServOptions = controller.getConfig().getObjectServiceOptions();
            var uomentityController = controller.getApplicationContext().getModel("UnitConversion", objServName, objServOptions);
            var statusID = scopeObj.getFormModelInfo("tStatusID");
            var currentStatus = statusID;
            if (currentStatus == taskStatus.Started || currentStatus == taskStatus.Paused) {
                statusID = taskStatus.Completed;
            } else {
                alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                return statusID;
            }
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(kony.servicesapp.ENTITY_TASK);
            recordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("woID"));
            recordObject.set("Task_num", scopeObj.getFormModelInfo("taskNumber"));
            recordObject.set("Status_id", statusID);
            recordObject.set("id", scopeObj.getFormModelInfo("taskID"));
            recordObject.set("EndDate", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
            recordObject.setInfo("serviceName", objServName);
            recordObject.setInfo("options", objServOptions);
            var onSuccess = function(res) {
                var swRecordObject = new objHandler(kony.servicesapp.ENTITY_STOPWATCH);
                swRecordObject.set("Task_id", scopeObj.getFormModelInfo("taskNumber"));
                swRecordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("woID"));
                swRecordObject.set("Status_id", statusID);
                swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
                swRecordObject.setInfo("serviceName", objServName);
                swRecordObject.setInfo("options", objServOptions);
                swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                var swSuccess = function() {
                    var wom_ids = scopeObj.materialIDs;
                    var records = [];
                    for (var wom in wom_ids) {
                        // Form the query in config you get only those resources which are consumable and not conumed so need not check again
                        recordObject = new objHandler(kony.servicesapp.ENTITY_TASKMATERIAL);
                        recordObject.set("isConsumed", 'Y');
                        recordObject.set("Id", wom_ids[wom]["womID"]);
                        recordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("woID"));
                        recordObject.setInfo("serviceName", objServName);
                        recordObject.setInfo("options", objServOptions);
                        records.push(recordObject);
                    }
                    var womId = 0;
                    var invSuccess = function() {
                        invRecords = [];
                        updateInv(womId++);
                    }
                    var womFailure = function() {
                        alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    }
                    var invRecords = [];
                    function updateInv(womId) {
                        if (womId >= noofresources || !noofresources) {
                            /* To check if:
							1.	All resources are consumed
							2.	If all resources are processed						 
							*/
                            scopeObj.fetchData();
                            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                                kony.servicesapp.backgroundSyncOnStatusChangeKA();
                            }
                            return;
                        }
                        try {
                            // Form the query in config you get only those resources which are consumable and not conumed so need not check again
                            recordObject = new objHandler(kony.servicesapp.ENTITY_INVENTORY);
                            var query = "select uom.Factor from UnitConversion uom where uom.UnitFrom_id = '" + wom_ids[womId]["ReqId"] + "' and uom.UnitTo_id = '" + wom_ids[womId]["baseunitId"] + "' and uom.Material_id = '" + wom_ids[womId]["Material_ID"] + "'";
                            var queryobj = new kony.sdk.mvvm.Query(query, "sql");
                            uomentityController.executeSelectQuery(queryobj.getQuery().query, dataSuccess, dataError);
                        } catch (e) {
                            kony.sdk.mvvm.log.info("err" + e);
                        }
                    }
                    var dataSuccess = function(response) {
                        var factor = 1;
                        if (response.length != 0) {
                            factor = response[0]["Factor"];
                        }
                        try {
                            var requestedValueInBase = utilitiesObj.roundNumber(wom_ids[womId]["RequestedQuantity"], 2) * utilitiesObj.roundNumber(factor, 2);             
                            recordObject = new objHandler(kony.servicesapp.ENTITY_INVENTORY);
                            recordObject.set("Quantity", wom_ids[womId]["AvailableQuantity"]);
                            recordObject.set("id", wom_ids[womId]["InventoryID"]);
                            recordObject.setInfo("serviceName", objServName);
                            recordObject.setInfo("options", objServOptions);
                            invRecords.push(recordObject);
                            // Updating each entry as a task can have a resource with different UoM's
                            scopeObj.saveRecords(invRecords, invSuccess, womFailure);
                        } catch (e) {
                            scopeObj.fetchData();
                            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                                kony.servicesapp.backgroundSyncOnStatusChangeKA();
                            }
                        }
                    }
                    var dataError = function(err) {
                        kony.sdk.mvvm.log.info("error while updating inventory in complete task" + err)
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    }
                    var womSuccess = function() {
                        // To prevent asynchronous calls for executing D query used function closure
                        updateInv(womId);
                    }
                    scopeObj.saveRecords(records, womSuccess, womFailure);
                }
                scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
            var swError = function() {
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            };
            var onError = function() {
                alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
            try {
                scopeObj.saveRecord(recordObject, onSuccess, onError);
            } catch (err) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.trycatcherror.ValueKA"));
            };
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic completeOrRejectTask : " + err);
        }
    },
	//This function is used to change status for task
    changeStatusForTask: function() {
        try {
			var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.TaskUpdate.ValueKA"));
            var statusID = scopeObj.getFormModelInfo("tStatusID");
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
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(kony.servicesapp.ENTITY_TASK);
            var configObj = scopeObj.getController().getConfig();
            recordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("woID"));
            recordObject.set("id", scopeObj.getFormModelInfo("taskID"));
            recordObject.set("Task_num", scopeObj.getFormModelInfo("taskNumber"));
            recordObject.set("Status_id", statusID);
            var momentFormat = convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT);
            if (currentStatus == taskStatus.Scheduled) {
                recordObject.set("StartDate", momentFormat);
            }
			var objServName = configObj.getObjectServiceName();
			var objServOptions = configObj.getObjectServiceOptions();
            recordObject.setInfo("serviceName", objServName);
            recordObject.setInfo("options", objServOptions);
            var onSuccess = function(res) {
                var swRecordObject = new objHandler("StopWatch");
                swRecordObject.set("Task_id", scopeObj.getFormModelInfo("taskNumber"));
                swRecordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("woID"));
                swRecordObject.set("Status_id", statusID);
                swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
                swRecordObject.setInfo("serviceName", objServName);
                swRecordObject.setInfo("options", objServOptions);
                swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                var swSuccess = function() {
                    scopeObj.fetchData();
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    if (kony.sdk.mvvm.isNetworkAvailabile()) {
                        kony.servicesapp.backgroundSyncOnStatusChangeKA();
                    }
                };
                var swError = function() {
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                };
                scopeObj.saveRecord(swRecordObject, swSuccess, swError);
            }
            var onError = function() {
                alert(utilitiesObj.geti18nValueKA("i18n.common.taskUpdateError.ValueKA"));
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
            try {
                scopeObj.saveRecord(recordObject, onSuccess, onError);
            } catch (err) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.trycatcherror.ValueKA"));
            };
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changeStatusForTask : " + err);
        }
    },
	//This function is used to update the inventory by subtracting the inventoryQuantityInBase from requestedQuantityInBase
    updateInventory: function(requestedQuantityInBase, inventoryQuantityInBase) {
		try{
			var scopeObj = this;
			var objHandler = kony.sdk.mvvm.persistent.Record;			
			var configObj = scopeObj.getController().getConfig();
			var invRecordObject = new objHandler(kony.servicesapp.ENTITY_INVENTORY);
			invRecordObject.set("Quantity", requestedQuantityInBase - inventoryQuantityInBase);
			invRecordObject.set("id", scopeObj.getFormModelInfo("InventoryID"));
			invRecordObject.set("Material_id", scopeObj.getFormModelInfo("MaterialID"));
			invRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
			invRecordObject.setInfo("options", configObj.getObjectServiceOptions());
			var invSuccess = function() {
				scopeObj.fetchData();
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				if (kony.sdk.mvvm.isNetworkAvailabile()) {
					kony.servicesapp.backgroundSyncOnStatusChangeKA();
				}
			};
			var invError = function() {
				alert(utilities.getUtilityObj().geti18nValueKA("i18n.order.inventoryUpdate.ErrorKA"));
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			};
			scopeObj.saveRecord(invRecordObject, invSuccess, invError);
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic updateInventory : " + err);
        }		
    },
	//This function is used to change the task status to complete
    changeConsumedStatus: function() {
		try {
			var scopeObj = this;
			var objHandler = kony.sdk.mvvm.persistent.Record;
			var controller = scopeObj.getController();
			var configObj = controller.getConfig();
			var selRecord = controller.getFormModel().getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
			var statusID = scopeObj.getFormModelInfo("tStatusID");
			var taskStatus = kony.servicesapp.servicesStatus.key;
			var utilitiesObj = utilities.getUtilityObj();
			var objServName = configObj.getObjectServiceName();
			var objServOptions = configObj.getObjectServiceOptions();
			if (selRecord.isConsumable.toUpperCase() == "Y" && statusID == taskStatus.Started) {
				var isConsumed = selRecord.isConsumed;
				var updatedConsumedStatus = "Y";
				if (isConsumed.toUpperCase() == "Y") {
					updatedConsumedStatus = "N";
				}
				var recordObject = new objHandler(kony.servicesapp.ENTITY_TASKMATERIAL);
				recordObject.set("Id", selRecord.womID);
				recordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("woID"));
				recordObject.set("isConsumed", updatedConsumedStatus);
				recordObject.setInfo("serviceName", objServName);
				recordObject.setInfo("options", objServOptions);
				var onError = function() {
					alert(utilitiesObj.geti18nValueKA("i18n.TaskMaterial.updateerror.ValueKA"));
					kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				}
				var onSuccess = function() {
					var uomentityController = controller.getApplicationContext().getModel("UnitConversion", objServName, objServOptions);
					var query = "select uom.Factor from UnitConversion uom where uom.UnitFrom_id = '" + selRecord.ReqId + "' and uom.UnitTo_id = '" + selRecord.baseunitId + "' and uom.Material_id = '" + selRecord.id + "'";
					var queryobj = new kony.sdk.mvvm.Query(query, "sql");
					kony.sdk.mvvm.log.info("query" + JSON.stringify(query));
					var invError = function(err) {
						kony.sdk.mvvm.log.info("err in updating inventory" + err);
						alert(utilitiesObj.geti18nValueKA("i18n.order.inventoryUpdate.ErrorKA"));
						kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

					}
					var dataSuccess = function(response) {
						scopeObj.successCallbackInventory(response, selRecord, updatedConsumedStatus)
					}
					var dataError = function(response) {
						return -1;
					}
					uomentityController.executeSelectQuery(queryobj.getQuery().query, dataSuccess, dataError);
				}
				scopeObj.saveRecord(recordObject, onSuccess, onError);
			}
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changeConsumedStatus : " + err);
        }	
    },
	///This function is used to show the status in the view 
    showStatusMachine: function(woStatus, tStatus) {
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var taskStatus = kony.servicesapp.servicesStatus.key;
            if (woStatus == taskStatus.Scheduled || woStatus == taskStatus.OnRoute || woStatus == taskStatus.Rejected || woStatus == taskStatus.Paused) {
                formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", false);
                return;
            }
            var constants = kony.servicesapp.constants.getServiceConstantsObj().getValue(kony.servicesapp.TASK_EXECUTION_STATUS, tStatus);
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
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, kony.servicesapp.FRMORDEREXECUTIONKA);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
	//This function is used to show the task details form
    showTaskDetails: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            var taskID = scopeObj.getFormModelInfo("taskID");
            datamodel.setPrimaryKeyValueMap({
                "id": taskID
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x": taskID
            });
            scopeObj.navigateTo(kony.servicesapp.FRMTASKDETAILSKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showTaskDetails : " + err);
        }
    },
	//This function is used to navigate to Resource Execution form
    navigateToResourceExecution: function() {
        try {
            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            var selRecord = formmodel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
            var contextData = scopeObj.getController().getContextData();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": selRecord.id
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.addCustomInfo("TaskId", scopeObj.getFormModelInfo("taskID"));
            navigationObject.addCustomInfo("Quantity", selRecord.RequestedQuantityNumber);
            navigationObject.addCustomInfo("TaskStatus", scopeObj.getFormModelInfo("tStatusID"));
            navigationObject.addCustomInfo("WOStatus", scopeObj.getFormModelInfo("woStatusID"));
            navigationObject.addCustomInfo("womID", selRecord.womID);
            navigationObject.addCustomInfo("MaterialId", selRecord.id);
            navigationObject.setQueryParams("form", {
                "x": selRecord.womID,
                "y": selRecord.id,
            });
            navigationObject.setQueryParams("FlexFetchDataUoMKA", {
                "x": selRecord.id

            });
            scopeObj.navigateTo(kony.servicesapp.FRMRESOURCEEXECUTIONKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToResourceExecution from Task Execution: " + err);
        }
    },
	//This function is used to navigate to Task Resources form
    navigateToTaskResources: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                id: scopeObj.getFormModelInfo("taskID")
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");

            navigationObject.setQueryParams("segSwipeKA", {
                "x": scopeObj.getFormModelInfo("taskID")
            });
            navigationObject.addCustomInfo("TaskId", scopeObj.getFormModelInfo("taskID"));
            navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("woID"));
            scopeObj.navigateTo(kony.servicesapp.FRMTASKRESOURCESLISTKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },
	//This function is used to show ExtendedAttributes form
    showExtendedObjectFormKA: function() {
        try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            var query = "Select * from ExtendedAttributeValue exvalue where exvalue.PARENT_KEY = '{x}' and exvalue.OBJECT_TYPE = '{y}' and exvalue.PARENT_KEY2 = '{z}'";
            navigationObject.setQuery("segExtendedAttributesKA", query, "sql");
            navigationObject.setQueryParams("segExtendedAttributesKA", {
                'x': scopeObj.getFormModelInfo("woID"),
                'y': kony.servicesapp.TASKEXTENDEDATTRIBUTE,
                'z': scopeObj.getFormModelInfo("taskNumber")
            });
            navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("woID"));
            navigationObject.addCustomInfo("from", "TASK");
            scopeObj.navigateTo(kony.servicesapp.FRMEXTENEDEATTRIBUTESKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showExtendedObjectFormKA : " + err);
        }
    },
	//To set the value in Work Order info object
    setWOInformation: function(woInfo, formData) {
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            scopeObj.setFormModelInfo("taskID", woInfo["taskID"]);
            scopeObj.setFormModelInfo("woStatusID", woInfo["woStatusID"]);
            scopeObj.setFormModelInfo("woID", woInfo["woID"]);
            scopeObj.setFormModelInfo("taskNumber", woInfo["taskNumber"]);
            scopeObj.setFormModelInfo("tStatusID", formData["Status_id"]);
            scopeObj.setFormModelInfo("segmentInfo", frmTaskExecutionKA.segSwipeKA);
            formModel.performActionOnView("flexDetailsKA", "setEnabled", [true]);
            formModel.performActionOnView("btnBackKA", "setEnabled", [true]);
            scopeObj.materialIDs = [];
            if (formData["Status_id"] == 'Completed' || woInfo["woStatusID"] == 'Scheduled' || woInfo["woStatusID"] == 'On Route') {
                formModel.setViewAttributeByProperty("segSwipeKA", "height", "77%");
            } else {
                formModel.setViewAttributeByProperty("segSwipeKA", "height", "67%");
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setWOInformation : " + err);
        }
    },
	navigateToTimeAndExpense:function(){
	  try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();            
            var taskId = scopeObj.getFormModelInfo("taskID");
            var taskStatus = scopeObj.getFormModelInfo("tStatusID");
            taskId = taskId && taskId.split("-");
            navigationObject.setQueryParams("SegTimeExpenseKA", {    
                'x': taskId[0]
            });
			navigationObject.addCustomInfo("Status",scopeObj.getFormModelInfo("tStatusID"));
        	kony.servicesapp.STATUSFORTE=scopeObj.getFormModelInfo("tStatusID");
            navigationObject.addCustomInfo("TaskStatus", taskStatus);
            navigationObject.addCustomInfo("Task", "Task");
            navigationObject.addCustomInfo("TaskId", taskId[0]);
            scopeObj.navigateTo("frmTimeAndExpenseKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic ShowTimeAndExpenseFormKA : " + err);
        }
	},
	
	//This function is used to assign values from flexData, formData, woInfo to processegData
    processSegData: function(processegData, flexData, formData, woInfo) {
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            scopeObj.setFormModelInfo("segmentId", "segSwipeKA");
			if(formData["StartDate"]) {
              	formModel.setViewAttributeByProperty("lblDayandTimeKA","isVisible",true);
          		processegData["lblDayandTimeKA"] = formData["StartDate"];
            }
          	else {
              	formModel.setViewAttributeByProperty("lblDayandTimeKA","isVisible",false);
            }
			processegData["lblStatusKA"] = utilitiesObj.getStatusTextKA(formData["Status_id"]);
            var description1 = utilitiesObj.dataTruncation(formData["Description"], kony.servicesapp.DESCRIPTION_LENGTH, kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION, "...");
            processegData["lblTaskDescriptionKA"] = description1["value"];
            if (flexData.length != 0) {
                if (flexData[0]["Timer"] != null) {
                    scopeObj.setFormModelInfo("tDuration", parseInt(flexData[0]["Timer"]));
                } else {
                    scopeObj.setFormModelInfo("tDuration", 0);
                }
            } else {
                scopeObj.setFormModelInfo("tDuration", 0);
            }
            flexData["lblTimerKA"] = utilitiesObj.dateFormat(scopeObj.getFormModelInfo("tDuration"), kony.servicesapp.TIMER_FORMAT);
            scopeObj.taskID = woInfo["taskID"];
            scopeObj.woStatusID = woInfo["woStatusID"];
            scopeObj.woID = woInfo["woID"];
            scopeObj.taskNumber = woInfo["taskNumber"];
            scopeObj.showStatusMachine(woInfo["woStatusID"], formData["Status_id"]);
            formModel.setViewAttributeByProperty("imgPlayPauseKA", "src", utilitiesObj.getStatusImageKA(formData["Status_id"]));
            processegData["lblStatusKA"] = processegData["lblStatusKA"].toUpperCase();
            return [processegData, flexData];
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic processSegData : " + err);
        }
    },
	//This function is the successCallback for select query
    successCallbackInventory: function(response, selRecord, updatedConsumedStatus) {
        try {
            var scopeObj = this;
            var configObj = scopeObj.getController().getConfig();
            var utilitiesObj = utilities.getUtilityObj();
            var factor = 1;
            if (response.length != 0) {
                factor = response[0]["Factor"];
            }
            var requestedValueInBase = utilitiesObj.roundNumber(selRecord.RequestedQuantityNumber, 2) * utilitiesObj.roundNumber(factor, 2);
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var invRecordObject = new objHandler(kony.servicesapp.ENTITY_INVENTORY);
            if (updatedConsumedStatus == 'Y') {
                invRecordObject.set("Quantity", selRecord.InventoryQuantity - requestedValueInBase);
            } else {
                invRecordObject.set("Quantity", selRecord.InventoryQuantity + requestedValueInBase);
            }
            invRecordObject.set("id", selRecord.InventoryId);
            invRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
            invRecordObject.setInfo("options", configObj.getObjectServiceOptions());
            var invSuccess = function() {
                scopeObj.fetchData();
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                if (kony.sdk.mvvm.isNetworkAvailabile()) {
                    kony.servicesapp.backgroundSyncOnStatusChangeKA();
                }
            };
            var invError = function(err) {
                kony.sdk.mvvm.log.info("err in updating inventory" + err);
                alert(utilitiesObj.geti18nValueKA("i18n.order.inventoryUpdate.ErrorKA"));
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
            scopeObj.saveRecord(invRecordObject, invSuccess, invError);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic successCallbackInventory : " + err);
        }
    },
	//This function is used to show Task Attachment form
    showTaskAttachments: function() {
		try {
			var scopeObj = this;
			var utilitiesObj = utilities.getUtilityObj();
			var applicationContext = scopeObj.getController() && scopeObj.getController().getApplicationContext();
			var frmOrderAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMORDERATTACHMENTKA );
			var frmOrderAttachmentsKAFormModel = frmOrderAttachmentsKAController && frmOrderAttachmentsKAController.getFormModel();
			frmOrderAttachmentsKAFormModel && frmOrderAttachmentsKAFormModel.setViewAttributeByProperty("lblOrderAttachmentsKA", "text", utilitiesObj.geti18nValueKA("i18n.orderExecution.frmTaskAttachment.lblHeaderKA.ValueKA"));
			var taskId = scopeObj.getFormModelInfo("taskID");
			taskId = taskId && taskId.split("-");
			var query = "select TaskAttachment .BINARY_NAME AS BINARY_NAME,TaskAttachment .CREATED_TSTAMP AS createdts FROM TaskAttachment  LEFT JOIN media ON TaskAttachment .BINARY_NAME = media.name  WHERE LOWER(media.type) = 'documents' AND TaskAttachment .ORDER_NUM = '{x}' AND TaskAttachment .OPERATION = '{y}' AND LOWER(TaskAttachment .EXTENSION) = 'pdf'";
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.setQuery("segOrderAttachmentKA", query, "sql");
			navigationObject.setQueryParams("segOrderAttachmentKA", {
				"x": scopeObj.getFormModelInfo("woID"),
				"y": taskId[0]
			});
			navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("woID"));
			navigationObject.addCustomInfo("TaskId", taskId[0]);
			var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDERATTACHMENTKA).getControllerExtensionObject();
			controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMTASKEXECUTIONKA);
			scopeObj.navigateTo(kony.servicesapp.FRMORDERATTACHMENTKA, navigationObject);
		} catch (error) {
			kony.sdk.mvvm.log.error("Error in Blogic showTaskAttachments : " + error);
		}
	},
	//This function is used to show Task Attachment form
	showTaskAttachmentForm: function() {
		try {
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			var scopeObj = this;
			var utilitiesObj = utilities.getUtilityObj();
			var applicationContext = scopeObj.getController() && scopeObj.getController().getApplicationContext();
			var frmTaskAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMTASKATTACHMENTKA);
			var frmTaskAttachmentsKAFormModel = frmTaskAttachmentsKAController && frmTaskAttachmentsKAController.getFormModel();
			frmTaskAttachmentsKAFormModel && frmTaskAttachmentsKAFormModel.setViewAttributeByProperty("lblHeaderKA", "text","Task Images");
			var query = "select TaskAttachment.BINARY_NAME FROM TaskAttachment LEFT JOIN media ON TaskAttachment.BINARY_NAME = media.name  WHERE  LOWER(TaskAttachment.DOC_TYPE) != 'signature' AND TaskAttachment.ORDER_NUM = '{x}' and  TaskAttachment.OPERATION='{y}' and (LOWER(TaskAttachment.EXTENSION) = 'png'  OR LOWER(TaskAttachment.EXTENSION) = 'jpeg' OR LOWER(TaskAttachment.EXTENSION) = 'jpg')";
			navigationObject.setQuery("form", query, "sql");
			navigationObject.getQuery(kony.servicesapp.FRMTASKATTACHMENTKA);  
			var taskId = scopeObj.getFormModelInfo("taskID");
			taskId = taskId && taskId.split("-");
			navigationObject.setQueryParams("form", {
				'x': scopeObj.getFormModelInfo("woID"),
				'y': taskId[0]
			});
			navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("woID"));
			navigationObject.addCustomInfo("TaskId", taskId[0]);
			var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var controllerExtension = appContext.getFormController(kony.servicesapp.FRMTASKATTACHMENTKA).getControllerExtensionObject();
			controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMTASKEXECUTIONKA);
			scopeObj.navigateTo(kony.servicesapp.FRMTASKATTACHMENTKA, navigationObject);
		} catch (error) {
			kony.sdk.mvvm.log.error("Error in Blogic showTaskImages : " + error);
		}
	},
  	showBOM:function(segRow){
      try{
        var scopeObj=this;
        var controller = scopeObj.getController();
        var formmodel = controller.getFormModel();
        var index = segRow[1];
        var Mat_id = scopeObj.records[index]["Code"];
        var datamodel = new kony.sdk.mvvm.DataModel();
        var navigationObject = new kony.sdk.mvvm.NavigationObject();
        var query = "&$filter=Parent_id eq '{x}'";
        navigationObject.setQuery("segBOMKA",query,"sql")
        navigationObject.setQueryParams("segBOMKA", {
              	"x":Mat_id,
            });
        	navigationObject.addCustomInfo("WOId",Mat_id);
        	navigationObject.addCustomInfo("Obj_type","MAT");
        	scopeObj.navigateTo("frmBillOfMaterialKA", navigationObject);
      }
      catch(e){
        var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, e);
            kony.sdk.mvvm.log.error(exception.toString());
      }
    }
});