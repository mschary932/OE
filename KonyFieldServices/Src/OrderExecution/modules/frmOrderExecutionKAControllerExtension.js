
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
kony.sdk.mvvm.frmOrderExecutionKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.statusID = "";
        this.technicianLat="";
        this.technicianLon="";
        this.tasks = [];
        this.sub_menu_configured = false;        
        this.workorderMaterialIds=undefined;
	this.eventIds = ['WO_START'];
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this);
            this.setFormModelInfo("WorkOrderId", this.getController().getContextData().getCustomInfo("WorkOrderId"));
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
        }
    },
    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
            this.setFormModelInfo("WorkOrderId", this.getController().getContextData().getCustomInfo("WorkOrderId"));
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
    bindData: function(dataMap) {
        try {
            var scopeObj = this;
			var utilitiesObj = utilities.getUtilityObj();
			var formModel = scopeObj.getController().getFormModel();
			var servConsObj = kony.servicesapp.constants.getServiceConstantsObj();
        	dataMap["form"][0]["PlannedStartDate"] = convertTimeZone(moment(dataMap["form"][0]["PlannedStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, servConsObj.getDateTimeFormat("DAYANDTIME"));
            scopeObj.tasks = [];
            var formData = dataMap["form"][0];                      
            var addressData = "";
			var eventIds = dataMap["FlxTmpEventIdsKA"];
			//scopeObj.eventIds = dataMap["FlxTmpEventIdsKA"];
            scopeObj.workorderMaterialIds = dataMap["FlxTmpWorkOrderMaterialKA"];
            delete dataMap.FlxTmpWorkOrderMaterialKA;
			formModel.setViewAttributeByProperty("flxScrollTypesKA","left","0%");
            /********** code need to be removed after UIRT_V2 supports segment header mapping */
            var lclWidgetDataMap = formModel.getViewAttributeByProperty("segDetailsKA", "widgetDataMap");
            lclWidgetDataMap["lblSegTaskHdearKA"] = "lblTaskHeader";
            formModel.setViewAttributeByProperty("segDetailsKA", "widgetDataMap", lclWidgetDataMap);
            /********** ends here  */
			dataMap = scopeObj.formatTaskSegData(dataMap, utilitiesObj);   
			dataMap = scopeObj.setContactName(dataMap);
			var processedData = {};
            processedData["lblTimeKA"] = formData["PlannedStartDate"];
            processedData["lblOrderNumKA"] = formData["Code"];
			processedData["lblTypeKA"] = formData["Type_id"];
            processedData["lblPriorityKA"] = formData["Priority"] ? formData["Priority"] : "";
		    var workOrderObj = {};
			workOrderObj.woPriority = processedData["lblPriorityKA"];
			workOrderObj.woStatus = formData["Status_id"];
			workOrderObj.woTime = formData["PlannedStartDate"];
			workOrderObj.woDesc = (utilitiesObj.dataTruncation(formData["Description"], 30,3, "...")).value;
			scopeObj.setFormModelInfo("workOrderObj", workOrderObj);
            processedData["lblStatusKA"] = formData["Status_id"];
			formModel.setViewAttributeByProperty("imgStatusMachineStartedKA", "src", utilitiesObj.getStatusImageKA(processedData["lblStatusKA"]));
            formModel.setViewAttributeByProperty("FlxTmpStatusPriorityKA", "skin", utilitiesObj.getPrioritySkinKA(processedData["lblPriorityKA"]));
			if(processedData["lblPriorityKA"]){
				formModel.setViewAttributeByProperty("ImgMapIconKA", "src", utilitiesObj.getOEpriorityMapPinImageKA(processedData["lblPriorityKA"]));
			}
			scopeObj.setFormModelInfo("WorkOrderPriority", processedData["lblPriorityKA"]);
            scopeObj.setFormModelInfo("WorkOrderStatus", formData["Status_id"]);
            scopeObj.statusID = formData["Status_id"];
            processedData["lblInfoKA"] = utilitiesObj.dataTruncation(formData["Description"], 44, 3, "...").value;
			scopeObj.showStatusMachine(processedData["lblStatusKA"], utilitiesObj, formModel);
			if (formData["Address"] && formData["Address"][0]) {
              	addressData = utilitiesObj.getOrderAddress(formData["Address"][0]);
              	processedData["lblAddressKA"] = utilitiesObj.dataTruncation(addressData, 47, 3, "...").value;
                scopeObj.setFormModelInfo("destinationLat", (formData["Address"][0]["Latitude"] ? (formData["Address"][0]["Latitude"]) : ""));
                scopeObj.setFormModelInfo("destinationLon", (formData["Address"][0]["Longitude"] ? (formData["Address"][0]["Longitude"]) : ""));
				scopeObj.setFormModelInfo("destinationAddress",addressData);
              	 formModel.setViewAttributeByProperty("ImgMapIconKA","isVisible",true);  
            }  
            else{          
            formModel.setViewAttributeByProperty("ImgMapIconKA","isVisible",false);    
			}
            processedData["lblPriorityKA"] = utilitiesObj.getPriorityTextKA(processedData["lblPriorityKA"]);
            processedData["lblStatusKA"] = utilitiesObj.getStatusTextKA(processedData["lblStatusKA"]);
            dataMap["form"] = processedData;
			scopeObj.enableDisableAdddTaskButton(formData["Status_id"], formModel);
			scopeObj.setFormModelInfo("WorkOrderStatus", formData["Status_id"]);
            scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
			formModel.showView();
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
	setContactName : function(dataMap){
		try{
			var contactData = dataMap["FlxTmpOrderListKA"] ? (dataMap["FlxTmpOrderListKA"][0] ? dataMap["FlxTmpOrderListKA"][0] : dataMap["FlxTmpOrderListKA"]) : dataMap["FlxTmpOrderListKA"];
			if (contactData != null) {
                var ContactprocessedData = {};
                ContactprocessedData["lblNameKA"] = (contactData["FirstName"] ? contactData["FirstName"] : "") + " " + (contactData["LastName"] ? contactData["LastName"] : "");
                dataMap["FlxTmpOrderListKA"] = ContactprocessedData;
            }
			return dataMap;
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic setContactName : " + error);
        }
	},
	enableDisableAdddTaskButton : function(statusVal, formModel){
		try{
			var workOrderStatus = kony.servicesapp.servicesStatus.key;
			if(statusVal == workOrderStatus.Started || statusVal == workOrderStatus.Paused){
				formModel.setViewAttributeByProperty("btnAddTaskKA", "isVisible", true);
			}else{
				formModel.setViewAttributeByProperty("btnAddTaskKA", "isVisible", false);
			}
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic enableDisableAdddTaskButton : " + error);
        }
	},
   navigateToTimeAndExpense:function(){
	  try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();            
            var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
            var workOrderStatus = this.getFormModelInfo("WorkOrderStatus");
            navigationObject.setQueryParams("SegTimeExpenseKA", {    
                'x': workOrderID
            });
            navigationObject.addCustomInfo("WorkOrderStatus", workOrderStatus);
            navigationObject.addCustomInfo("WorkOrderId", workOrderID);
			navigationObject.addCustomInfo("Status",scopeObj.statusID);
        	kony.servicesapp.STATUSFORTE=scopeObj.statusID;
            navigationObject.addCustomInfo("WorkOrderTimeExpense", "WorkOrderTimeExpense");
            scopeObj.navigateTo("frmTimeAndExpenseKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic ShowTimeAndExpenseFormKA : " + err);
        }
	},
	formatTaskSegData : function(dataMap, utilitiesObj){
		try{
            var scopeObj = this;
			var processedSegData = [];			
            var processedSegRowData;			
			var taskList = 0;
			var segData = dataMap["segDetailsKA"];
			var taskListLength = "";
			var workOrderStatus = kony.servicesapp.servicesStatus.key;
			var measStatus = kony.servicesapp.servicesStatus.meas;
			for (i in segData) {                
                processedSegRowData = {};
                processedSegRowData["Description"] = utilitiesObj.dataTruncation(segData[i]["Description"], 32, 3, "...").value;
                processedSegRowData["Status_id"] = utilitiesObj.getStatusTextKA(segData[i]["Status_id"]);
                processedSegRowData["id"] = segData[i]["id"];
                processedSegRowData["taskNumber"] = segData[i]["Task_num"];
                processedSegRowData["StatusImage"] = utilitiesObj.getStatusImageKA(segData[i]["Status_id"]);
				if (segData[i]["Status_id"] == workOrderStatus.Scheduled || segData[i]["Status_id"] == 	workOrderStatus.Paused || segData[i]["Status_id"] == workOrderStatus.Started) {
                    taskList++;
                }
				//Measurement label on tasks
              	if(segData[i]["Type_id"] == measStatus.MEAS  && kony.servicesapp.CONNECTOR!="CRM"){
                  processedSegRowData["Type_id"]={"isVisible":true,"text":utilitiesObj.geti18nValueKA("i18n.common.MeasurementTextLabelKA")};
				  processedSegRowData["MeasurementImage"] = utilitiesObj.getMeasurementIconKA(segData[i]["Type_id"]);
                  }
              	else
				{
				  processedSegRowData["Type_id"]={"isVisible":false,"text":""};
				  processedSegRowData["MeasurementImage"] = {"isVisible" : false};
				}
                processedSegData.push(processedSegRowData);
                scopeObj.tasks.push({
                    "taskID" : segData[i]["id"],
                    "currentStatusID" : segData[i]["Status_id"],
                    "taskNumber" : segData[i]["Task_num"]
                });
            }
            if (taskList == 1) {
                taskListLength = taskList + " "+utilitiesObj.geti18nValueKA("i18n.order.frmOrderExecution.PendingTask.ValueKA");
            } else if (taskList > 1) {
                taskListLength = taskList + " "+utilitiesObj.geti18nValueKA("i18n.order.frmOrderExecution.PendingTasks.ValueKA");
            } else {
                taskListLength = utilitiesObj.geti18nValueKA("i18n.order.frmOrderExecution.noPendingTasks.ValueKA");
            }
            if(taskListLength.length >0){
	            var lclTaskHeader = {
	                "lblTaskHeader": taskListLength
	            };
	            var finalProcessedSegData = [
	                [lclTaskHeader, processedSegData]
	            ];
	            dataMap["segDetailsKA"] = {};
	            dataMap["segDetailsKA"]["segDetailsKA"] = finalProcessedSegData;
            }else{
            	dataMap["segDetailsKA"] = processedSegData;
			}
			return dataMap;
		} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic formatTaskSegData : " + error);
        }
	},
    fetchMasterData: function(successcallback, errorcallback) {
        this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
    },
    showAttachmentForm: function(){
		try{
            var scopeObj = this;
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			var utilitiesObj = utilities.getUtilityObj();
            var controller = scopeObj.getController();
			var applicationContext =  controller && controller.getApplicationContext();
			var frmTaskAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMTASKATTACHMENTKA);
			var frmTaskAttachmentsKAFormModel = frmTaskAttachmentsKAController && frmTaskAttachmentsKAController.getFormModel();
			frmTaskAttachmentsKAFormModel && frmTaskAttachmentsKAFormModel.setViewAttributeByProperty("lblHeaderKA", "text", utilitiesObj.geti18nValueKA("i18n.orderExecution.frmOrderAttachmentImagesKA.Title.ValueKA"));
            frmTaskAttachmentsKAFormModel && frmTaskAttachmentsKAFormModel.setViewAttributeByProperty("lblHeaderKA", "text", "Order Images");
			navigationObject.setQueryParams({"x" : scopeObj.getFormModelInfo("WorkOrderId")});
			navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
			var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var controllerExtension = appContext.getFormController(kony.servicesapp.FRMTASKATTACHMENTKA).getControllerExtensionObject();
			controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMORDEREXECUTIONKA);            
			scopeObj.navigateTo(kony.servicesapp.FRMTASKATTACHMENTKA, navigationObject);
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic showAttachmentForm : " + error);
        }
    },
    showOrderAttachments: function(){
		try {
            var scopeObj = this;
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
            var controller = scopeObj.getController();
			var applicationContext =  controller && controller.getApplicationContext();
			var frmOrderAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMORDERATTACHMENTKA);
			var frmOrderAttachmentsKAFormModel = frmOrderAttachmentsKAController && frmOrderAttachmentsKAController.getFormModel();
			//frmOrderAttachmentsKAFormModel && frmOrderAttachmentsKAFormModel.setViewAttributeByProperty("lblOrderAttachmentsKA", "text", utilitiesObj.geti18nValueKA("i18n.orderExecution.frmOrderAttachmentImagesKA.Title.ValueKA"));
            frmOrderAttachmentsKAFormModel && frmOrderAttachmentsKAFormModel.setViewAttributeByProperty("lblOrderAttachmentsKA", "text", utilities.getUtilityObj().geti18nValueKA("i18n.frmOrderAttachmentKA.Header.ValueKA"));
			navigationObject.setQueryParams("segOrderAttachmentKA", {"x" : scopeObj.getFormModelInfo("WorkOrderId")});
			navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
			var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var controllerExtension = appContext.getFormController(kony.servicesapp.FRMORDERATTACHMENTSKA).getControllerExtensionObject();
			controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMORDEREXECUTIONKA);
			scopeObj.navigateTo(kony.servicesapp.FRMORDERATTACHMENTSKA, navigationObject);
		} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic showOrderAttachments : " + error);
        }
    },
	showExtendedObjectFormKA: function(){
		var scopeObj = this;
		try{
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.setQueryParams("segExtendedAttributesKA", {"x" : scopeObj.getFormModelInfo("WorkOrderId"),"y":kony.servicesapp.WORKORDEREXTENDEDATTRIBUTE});
			navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
			navigationObject.addCustomInfo("from", "ORDEREXECUTION");
			scopeObj.navigateTo(kony.servicesapp.FRMEXTENDEDATTRIBUTESKA, navigationObject);
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic showExtendedObjectFormKA : " + error);
        }
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
            var scopeObj = this;
            var viewModel = scopeObj.getController().getFormModel();
            var selRecord = viewModel.getViewAttributeByProperty("segDetailsKA", "selectedItems");
			var utilitiesObj = utilities.getUtilityObj();
           if(selRecord && selRecord[0]){
		        if(selRecord[0]["Type_id"]["text"]==utilitiesObj.geti18nValueKA("i18n.common.MeasurementTextLabelKA")){
                scopeObj.showMeasurementExecutionForm();
                return;
                }
				selRecord = selRecord[0];
				var datamodel = new kony.sdk.mvvm.DataModel();
				datamodel.setPrimaryKeyValueMap({"id" : selRecord.id});
				var navigationObject = new kony.sdk.mvvm.NavigationObject();
				navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
				navigationObject.setQueryParams("segSwipeKA", {
					"x" : selRecord.id
				});
				navigationObject.setQueryParams("flxStrtKA", {
					"x" : selRecord.taskNumber,
					"y" : scopeObj.getFormModelInfo("WorkOrderId")
				});				
				navigationObject.addCustomInfo("woTaskInfo", {
					"taskID" : selRecord.id,
					"woStatusID" : scopeObj.statusID,
					"woID" : scopeObj.getFormModelInfo("WorkOrderId"),
					"taskNumber" : selRecord.taskNumber
				});
				scopeObj.navigateTo(kony.servicesapp.FRMTASKEXECUTIONKA, navigationObject);
			}
        } catch (e) {
            kony.sdk.mvvm.log.error("error in Blogic showTaskExecutionForm : " + e);
        }
    },
    showPreviousForm: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload, kony.servicesapp.FRMORDERLISTKA);
    },
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    showStatusMachine: function(currentStatus, utilitiesObj, formModel) {
        try {
            var constants = kony.servicesapp.constants.getServiceConstantsObj().getValue(kony.servicesapp.ORDER_EXECUTION_STATUS, currentStatus);
            switch (constants.length) {
                case 1:
                    formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnCompleteKA", "isVisible", false);
                    formModel.setViewAttributeByProperty("btnHoldKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnHoldKA", "text", constants[0] ? constants[0] : "");
                    formModel.setViewAttributeByProperty("btnHoldKA", "width", "95%");
                    formModel.setViewAttributeByProperty("btnHoldKA", "left", "2%");
                    formModel.setViewAttributeByProperty("btnCancelKA", "isVisible", false);
					formModel.setViewAttributeByProperty("segDetailsKA", "height", "54%");
                    break;
                case 2:
                    formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnCompleteKA", "text", constants[0] ? constants[0] : "");
                    formModel.setViewAttributeByProperty("btnCompleteKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnCancelKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnHoldKA", "isVisible", false);
                    formModel.setViewAttributeByProperty("btnCancelKA", "text", constants[1] ? constants[1] : "");
					formModel.setViewAttributeByProperty("segDetailsKA", "height", "54%");
                    break;
                case 3:
                    formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnCompleteKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnCompleteKA", "text", constants[0] ? constants[0] : "");
                    formModel.setViewAttributeByProperty("btnHoldKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnHoldKA", "text", constants[1] ? constants[1] : "");
                    formModel.setViewAttributeByProperty("btnCancelKA", "isVisible", true);
                    formModel.setViewAttributeByProperty("btnCancelKA", "text", constants[2] ? constants[2] : "");
					formModel.setViewAttributeByProperty("segDetailsKA", "height", "54%");
                    break;
                default:
                    formModel.setViewAttributeByProperty("flxFooterKA", "isVisible", false);
					formModel.setViewAttributeByProperty("segDetailsKA", "height", "64%");
                    break;
            }
        } catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic showStatusMachine : " + err);
        };
    },
		showMeasurementExecutionForm: function() {
			try {
			var scopeObj = this;
			var viewModel = scopeObj.getController().getFormModel();
			var selRecord = viewModel.getViewAttributeByProperty("segDetailsKA", "selectedItems");
			   if(selRecord && selRecord[0]){
				selRecord = selRecord[0];
				var datamodel = new kony.sdk.mvvm.DataModel();
				datamodel.setPrimaryKeyValueMap({"id" : selRecord.id});
				var navigationObject = new kony.sdk.mvvm.NavigationObject();
				navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
				navigationObject.setQueryParams("segMeasurementKA", {
				 "x" : selRecord.taskNumber,
				 "y" : scopeObj.getFormModelInfo("WorkOrderId")
				});
				navigationObject.setQueryParams("flxStrtKA", {
				 "x" : selRecord.taskNumber,
				 "y" : scopeObj.getFormModelInfo("WorkOrderId")
				});   
                 
                 navigationObject.setQueryParams("flxObjectNameKA", {
				 "x" : scopeObj.getFormModelInfo("WorkOrderId")				
				}); 
                 
				navigationObject.addCustomInfo("woTaskInfo", {
				 "taskID" : selRecord.id,
				 "woStatusID" : scopeObj.statusID,
				 "woID" : scopeObj.getFormModelInfo("WorkOrderId"),
				 "taskNumber" : selRecord.taskNumber
				});
				scopeObj.navigateTo("frmMeasurementExecutionKA", navigationObject);
			   }
			} catch (e) {
			kony.sdk.mvvm.log.error("error in Blogic showMeasurementExecutionForm : " + e);
			}
		},
    showWorkOrderDetailsForm: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({"id":scopeObj.getFormModelInfo("WorkOrderId")});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("flxParentContactKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
          	navigationObject.addCustomInfo("workorderId",scopeObj.getFormModelInfo("WorkOrderId"));
            navigationObject.setQueryParams("flxObjectKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            navigationObject.setQueryParams("flxDurationKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            scopeObj.navigateTo(kony.servicesapp.FRMORDERDETAILSKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showWorkOrderDetailsForm : " + err);
        };
    },
    completeOrRejectWorkorder: function() {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.WorkorderUpdate.ValueKA"));
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var statusID = scopeObj.statusID;
            var currentStatus = statusID;
            var objHandler = kony.sdk.mvvm.persistent.Record;
			var controller = scopeObj.getController();
            var configObj = controller.getConfig();            
            var appContext = controller.getApplicationContext();
			var wom_ids = scopeObj.workorderMaterialIds;
            var noofresources = wom_ids.length;            
			var objServiceName = configObj.getObjectServiceName();
			var objServiceOptions = configObj.getObjectServiceOptions();
            var uomentityController = appContext.getModel("UnitConversion", objServiceName, objServiceOptions);
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
            var proccessRecordsAfterCurrentLocation = function(currLoc) {
				if(currLoc){
					currentLocation = currLoc;
				}				
                var recordObject = new objHandler(kony.servicesapp.ENTITY_WORKORDER);
                recordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                recordObject.set("Status_id", statusID);
                recordObject.setInfo("serviceName", objServiceName);
                recordObject.setInfo("options", objServiceOptions);
                var onSuccess = function(res) {
                    var swRecordObject = new objHandler(kony.servicesapp.ENTITY_STOPWATCH);
					swRecordObject.set("Longitude", currentLocation.lon);
					swRecordObject.set("Latitude", currentLocation.lat);
                    swRecordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("WorkOrderId"));
                    swRecordObject.set("Task_id", "ORD");
                    swRecordObject.set("Status_id", statusID);
                    swRecordObject.set("ChangeTime", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
                    swRecordObject.setInfo("serviceName", objServiceName);
                    swRecordObject.setInfo("options", objServiceOptions);
                    swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                    var processRecordsAfterWOMsUpdate = function() {
                        var tList = scopeObj.tasks;
						var taskRec;
                        for (var i in tList) {
                            taskRec = tList[i];
                            controller.performAction("changeStatusOnPauseCompleteRejectWorkorder", [scopeObj.getFormModelInfo("WorkOrderId"), taskRec["taskID"], taskRec["taskNumber"], taskRec["currentStatusID"], statusID]);
                        }
                        if (statusID == workOrderStatus.Rejected) {
                            scopeObj.showPreviousForm(true);
                        } else {
                            scopeObj.fetchData();
                        }
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        if (kony.sdk.mvvm.isNetworkAvailabile()) {
                            kony.servicesapp.backgroundSyncOnStatusChangeKA();
                        }
                    }
                    var womId = 0;
					var invRecords = [];
					function updateInv(womId) {
						if (womId == noofresources-1 || !noofresources ) {
							scopeObj.saveRecords(invRecords, processRecordsAfterWOMsUpdate, womFailure);
							return;
						}
                        try {
							//if (wom_ids[womId]["isConsumable"].toUpperCase() == 'Y' && wom_ids[womId]["isConsumed"].toUpperCase() != 'Y') {
                                recordObject = new objHandler(kony.servicesapp.ENTITY_INVENTORY);
                                var query = "select uom.Factor from UnitConversion uom where uom.UnitFrom_id = '" + wom_ids[womId]["RequestedUnit_id"] + "' and uom.UnitTo_id = '" + wom_ids[womId]["baseunitId"] + "' and uom.Material_id = '" + wom_ids[womId]["Material_ID"] + "'";
                                var queryobj = new kony.sdk.mvvm.Query(query, "sql");
                                uomentityController.executeSelectQuery(queryobj.getQuery().query, dataSuccess, dataError);
							/*}else{//If it is a Tool invoke the function for next material
								updateInv(womId++);
							}*/						
                        } catch (e) {
							kony.sdk.mvvm.log.error("error in Blogic completeOrRejectWorkorder catch : " + e);
                            alert("err" + e);
                        }
                    }                    
                    var dataSuccess = function(response) {
                        var factor = 1;                        
                        if (response.length != 0) {
                            factor = response[0]["Factor"];
                        }
                        var requestedValueInBase = utilitiesObj.roundNumber(wom_ids[womId]["RequestedQuantity"], 2) *utilitiesObj.roundNumber(factor, 2);
                        recordObject = new objHandler(kony.servicesapp.ENTITY_INVENTORY);
						recordObject.set("Quantity", wom_ids[womId]["InventoryQuantity"] - requestedValueInBase);
						recordObject.set("id", wom_ids[womId]["InvID"]);
						recordObject.setInfo("serviceName", objServiceName);
						recordObject.setInfo("options", objServiceOptions);
						invRecords.push(recordObject);
						updateInv(womId++);
                    }
                    var dataError = function(err) {
                        kony.sdk.mvvm.log.error("error while completeOrRejectWorkorder updating inventory in complete task : " + err)
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    }
                    var womSuccess = function() {
                        updateInv(womId);
                    }
                    var womFailure = function(err) {
                    	kony.sdk.mvvm.log.error("error while completeOrRejectWorkorder updating workordermaterial in complete task : "+err);
                    }
                    var swSuccess = function() {
                        if (statusID == workOrderStatus.Completed) {
                            var records = [];
                            var recordObject1;
                            // update workorder material table to set isConsumed to true for all the resources assoscicated to the workorder
                            for (var wom in wom_ids) {
								recordObject1 = new objHandler(kony.servicesapp.ENTITY_TASKMATERIAL);
								recordObject1.set("isConsumed", 'Y');
								recordObject1.set("Id", wom_ids[wom]["Id"]);
								recordObject1.set("WorkOrder_id", scopeObj.getFormModelInfo("WorkOrderId"));
								recordObject1.setInfo("serviceName", objServiceName);
								recordObject1.setInfo("options", objServiceOptions);
								records.push(recordObject1);
                            }
							if(records.length > 0){
								scopeObj.saveRecords(records, womSuccess, womFailure);
							}else{
								processRecordsAfterWOMsUpdate();
							}
                        } else {
                            processRecordsAfterWOMsUpdate();
                        }
                    };
                    var swError = function() {
                      kony.sdk.mvvm.log.error("error while completeOrRejectWorkorder swError : "+err);
                    };
                    scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                }
                var onError = function() {
					kony.sdk.mvvm.log.error("error while completeOrRejectWorkorder onError : "+err);
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
                scopeObj.saveRecord(recordObject, onSuccess, onError);
            }
            var gpsSuccess = function(location) {
				scopeObj.gpsSuccessKA(currentLocation, location, proccessRecordsAfterCurrentLocation);
            }
            var gpsFailure = function(err) {
                scopeObj.gpsFailureKA(currentLocation, proccessRecordsAfterCurrentLocation, appContext, utilitiesObj);
            }
			if (statusID == workOrderStatus.Completed) {
				var recordObject = new objHandler(kony.servicesapp.ENTITY_WORKORDER);
                recordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                recordObject.set("ActualEndDate", convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_WITH_TIME), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
                recordObject.setInfo("serviceName", objServiceName);
                recordObject.setInfo("options", objServiceOptions);
				var onEndDateUpdateSuccess = function(res) {
					try {
						var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
						var datamodel = new kony.sdk.mvvm.DataModel();
						datamodel.setPrimaryKeyValueMap({"id":workOrderID});
						var navigationObject = new kony.sdk.mvvm.NavigationObject();
						navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
						navigationObject.setQueryParams("flxContactNameKA", {"x": workOrderID});
						navigationObject.setQueryParams("flxContainerPaymentKA", {"x": workOrderID});
						navigationObject.setQueryParams("flexDetailsKA", {"x": workOrderID});
						navigationObject.addCustomInfo("woInfo", {
							"woStatusID": scopeObj.statusID,
							"woID": workOrderID
						});						
						scopeObj.navigateTo(kony.servicesapp.FRMCOMPLETEORDERKA, navigationObject);		            
					} catch (e) {
						kony.sdk.mvvm.log.error("error in Blogic completeOrRejectWorkorder onendDateupdateSuccess : " + err);
					}
				}
                var onEndDateUpdateError = function() {                    
					kony.sdk.mvvm.log.error("error in Blogic completeOrRejectWorkorder onendDateupdateSuccess : " + err);
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
				scopeObj.saveRecord(recordObject, onEndDateUpdateSuccess, onEndDateUpdateError);					
			} else if (statusID == workOrderStatus.Rejected) {
				var positionoptions = {
					timeout:kony.servicesapp.MAP_GPS_TIMEOUT,
					enableHighAccuracy : true
				};
				kony.location.getCurrentPosition(gpsSuccess, gpsFailure, positionoptions);
			} else {   
				proccessRecordsAfterCurrentLocation();
			}
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic completeOrRejectWorkorder : " + err);
        };
	},
	gpsSuccessKA : function(currentLocation, location, proccessRecordsAfterCurrentLocation) {
		try {
			currentLocation.lat = location.coords.latitude;
			currentLocation.lon = location.coords.longitude;
            this.technicianLat=currentLocation.lat;
            this.technicianLon=currentLocation.lon;
			proccessRecordsAfterCurrentLocation(currentLocation);
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic gpsSuccessKA : " + err);
        };
	},
	gpsFailureKA : function(currentLocation, proccessRecordsAfterCurrentLocation, appContext, utilitiesObj) {
		try {
			var controllerExtension = appContext.getFormController(kony.servicesapp.FRMORDERLISTKA).getControllerExtensionObject();
			if (!controllerExtension.getFormModelInfo("EnableGPS")) {
				controllerExtension.setFormModelInfo("EnableGPS", true);
				alert(utilitiesObj.geti18nValueKA("i18n.common.map.enableGPS.ValueKA"));
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			} else {
				currentLocation.lat = kony.servicesapp.DEFAULT_LATITUDE;
				currentLocation.lon = kony.servicesapp.DEFAULT_LONGITUDE;
				proccessRecordsAfterCurrentLocation(currentLocation);
			}
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic gpsSuccessKA : " + err);
        };
	},
    completeWorkorder : function() {
        try {
        	var scopeObj = this;
        	var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.WorkorderUpdate.ValueKA"));
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var statusID = scopeObj.statusID;
            var currentStatus = statusID;           
            var objHandler = kony.sdk.mvvm.persistent.Record;
			var controller = scopeObj.getController();
            var configObj = controller.getConfig();            
            var appContext = controller.getApplicationContext();
            var wom_ids = scopeObj.workorderMaterialIds;
			var objServiceName = configObj.getObjectServiceName();
			var objServiceOptions = configObj.getObjectServiceOptions();
			var womentityController = appContext.getModel(kony.servicesapp.ENTITY_TASKMATERIAL, objServiceName, objServiceOptions);
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
            var proccessRecordsAfterCurrentLocation = function(currLoc) {
				if(currLoc){
					currentLocation = currLoc;
				}
                var recordObject = new objHandler(kony.servicesapp.ENTITY_WORKORDER);
                recordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                recordObject.set("Status_id", statusID);
				recordObject.set("ActualEndDate", convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_WITH_TIME), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
                var checkListContrtoller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMWORKCONFIRMATIONKA).getControllerExtensionObject();				
                var surveyResponseID = checkListContrtoller.getFormModelInfo("surveyResponseID") ? checkListContrtoller.getFormModelInfo("surveyResponseID") : "";
                if(surveyResponseID != "") {
                	recordObject.set("SurveyResponse_id", surveyResponseID);             
                }
                recordObject.setInfo("serviceName", objServiceName);
				recordObject.setInfo("options", objServiceOptions);
                var onSuccess = function(res) {                	
                    var swRecordObject = new objHandler(kony.servicesapp.ENTITY_STOPWATCH);
					swRecordObject.set("Longitude", currentLocation.lon);
					swRecordObject.set("Latitude", currentLocation.lat);
                    swRecordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("WorkOrderId"));
                    swRecordObject.set("Task_id", "ORD");
                    swRecordObject.set("Status_id", statusID);
                    swRecordObject.set("ChangeTime", convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_WITH_TIME), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
                    swRecordObject.setInfo("serviceName", objServiceName);
					swRecordObject.setInfo("options", objServiceOptions);
					swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                    var processRecordsAfterWOMsUpdate = function() {
                        var tList = scopeObj.tasks;
						var taskRec;
                        for (var i in tList) {
                            taskRec = tList[i];
                            controller.performAction("changeStatusOnPauseCompleteRejectWorkorder", [scopeObj.getFormModelInfo("WorkOrderId"), taskRec["taskID"],taskRec["taskNumber"], taskRec["currentStatusID"], statusID]);
                        }
						var frmCompleteOrderKAController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMCOMPLETEORDERKA);						
						var frmCompleteOrderKAFormmodel = frmCompleteOrderKAController.getFormModel();
						frmCompleteOrderKAFormmodel.setViewAttributeByProperty("flexPopupKA", "isVisible", true);
						kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        function endCallBack() {
							kony.timer.cancel("completeOrderConfirmation");
                            kony.servicesapp.showFormOrderList();
                            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                                kony.servicesapp.backgroundSyncOnStatusChangeKA();
                            }
                         }
						 try{
							dismissPopUp("completeOrderConfirmation",3, endCallBack);
						 }catch(e){}
                    }
                    var womId = 0;
					var invRecords=[]; 
					var womSuccess = function() {
                       for(var womId in wom_ids){
							recordObject = new objHandler(kony.servicesapp.ENTITY_INVENTORY);
							recordObject.set("Quantity", wom_ids[womId]["InventoryQuantity"] - (wom_ids[womId]["RequestedQuantity"]-wom_ids[womId]["ConsumedQuantity"]));
							recordObject.set("id", wom_ids[womId]["InvID"]);
							recordObject.setInfo("serviceName", objServiceName);
							recordObject.setInfo("options", objServiceOptions);
							invRecords.push(recordObject);
						}
						scopeObj.saveRecords(invRecords, processRecordsAfterWOMsUpdate, womFailure);	
                    }
                    var womFailure = function(err) {
                    	kony.sdk.mvvm.log.error("error in Blogic completeWorkorder womFailure : " + err);
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    }
                    var swSuccess = function() {                    	
                        if (statusID == workOrderStatus.Completed) {
                            var wom_ids = scopeObj.workorderMaterialIds;                            
							if(wom_ids.length == 0){
								processRecordsAfterWOMsUpdate();
							}                            
							var query = "update TaskMaterial set isConsumed='Y' where WorkOrder_id='"+scopeObj.getFormModelInfo("WorkOrderId")+"' and isConsumable='Y'";
							var queryobj = new kony.sdk.mvvm.Query(query, "sql");
							womentityController.executeSelectQuery(queryobj.getQuery().query, womSuccess, womFailure);
                        } else {
                            processRecordsAfterWOMsUpdate();
                        }
                    };
                    var swError = function() {
						kony.sdk.mvvm.log.error("error in Blogic completeWorkorder swError : " + err);
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    };
                    scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                }
                var onError = function() {
					kony.sdk.mvvm.log.error("error in Blogic completeWorkorder onError : " + err);
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
                scopeObj.saveRecord(recordObject, onSuccess, onError);
            }
			var gpsSuccess = function(location) {
				scopeObj.gpsSuccessKA(currentLocation, location, proccessRecordsAfterCurrentLocation);
            }
            var gpsFailure = function(err) {
                scopeObj.gpsFailureKA(currentLocation, proccessRecordsAfterCurrentLocation, appContext, utilitiesObj);
            }
			var positionoptions = {
				timeout : kony.servicesapp.MAP_GPS_TIMEOUT,
				enableHighAccuracy : true
			};
			kony.location.getCurrentPosition(gpsSuccess, gpsFailure,positionoptions);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic completeWorkorder : " + err);
        };
    },
    changeStatusForWorkorder: function() {
        try {
        	var scopeObj = this;        
			var utilitiesObj = utilities.getUtilityObj();
			var controller = scopeObj.getController();
			var configObj = controller.getConfig();
			var appContext = controller.getApplicationContext();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.WorkorderUpdate.ValueKA"));
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var statusID = scopeObj.statusID;
            var currentStatus = statusID;
			var objHandler = kony.sdk.mvvm.persistent.Record;
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
			var objServiceName = configObj.getObjectServiceName();
			var objServiceOptions = configObj.getObjectServiceOptions();
            var proccessRecordsAfterCurrentLocation = function(currLoc) {   
				if(currLoc){
					currentLocation = currLoc;
				}
                var recordObject = new objHandler(kony.servicesapp.ENTITY_WORKORDER);
                recordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                recordObject.set("Status_id", statusID);
                if (statusID == workOrderStatus.Started && currentStatus == workOrderStatus.OnRoute) {
					recordObject.set("ActualStartDate", convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_WITH_TIME),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT));
                }                
                recordObject.setInfo("serviceName", objServiceName);
				recordObject.setInfo("options", objServiceOptions);
                var onSuccess = function(res) {                	
                    var swRecordObject = new objHandler(kony.servicesapp.ENTITY_STOPWATCH);
                    var workOrderRecordObject = new objHandler(kony.servicesapp.ENTITY_WORKORDER);
                    workOrderRecordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                    swRecordObject.set("WorkOrder_id", scopeObj.getFormModelInfo("WorkOrderId"));
					swRecordObject.set("Longitude", currentLocation.lon);
					swRecordObject.set("Latitude", currentLocation.lat);
                    swRecordObject.set("Task_id", "ORD");
                    swRecordObject.set("Status_id", statusID);
                    swRecordObject.set("ChangeTime", convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_WITH_TIME),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT));
                    swRecordObject.setInfo("serviceName", objServiceName);
					swRecordObject.setInfo("options", objServiceOptions);
					swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);					
                    var swSuccess = function() {
                        if (statusID == workOrderStatus.Paused) {
                            var tList = scopeObj.tasks;
							var taskRec;
                            for (var i in tList) {
                                taskRec = tList[i];
                                if (taskRec["currentStatusID"] != workOrderStatus.Scheduled && taskRec["currentStatusID"] != workOrderStatus.Completed) {
                                    var controller = appContext.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA);
                                    controller.performAction("changeStatusOnPauseCompleteRejectWorkorder", [scopeObj.getFormModelInfo("WorkOrderId"), taskRec["taskID"], taskRec["taskNumber"], taskRec["currentStatusID"], statusID]);
                                }
                            }
                        }
						// Check if there is a survey attached to the event 
						if(currentStatus == workOrderStatus.OnRoute && statusID == workOrderStatus.Started &&  scopeObj.eventIds.indexOf('WO_START') > -1){
							scopeObj.showEventSurvey('WO_START');							
						}else{
   	                        scopeObj.fetchData();

                        }		
                        
						
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        if (kony.sdk.mvvm.isNetworkAvailabile()) {
                            kony.servicesapp.backgroundSyncOnStatusChangeKA();
                        }
                    };
                    var swError = function(err) {
                        kony.sdk.mvvm.log.error("error in Blogic changeStatusForWorkorder swError : " + err);
                    };
                    scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                }
                var onError = function(err) {
                    kony.sdk.mvvm.log.error("error in Blogic changeStatusForWorkorder onError : " + err);
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
                scopeObj.saveRecord(recordObject, onSuccess, onError);
            }
            var gpsSuccess = function(location) {
				scopeObj.gpsSuccessKA(currentLocation, location, proccessRecordsAfterCurrentLocation);
            }
            var gpsFailure = function(err) {
                scopeObj.gpsFailureKA(currentLocation, proccessRecordsAfterCurrentLocation, appContext, utilitiesObj);
            }
			var positionoptions = {
				timeout : kony.servicesapp.MAP_GPS_TIMEOUT,
				enableHighAccuracy : true
			};
			kony.location.getCurrentPosition(gpsSuccess, gpsFailure,positionoptions);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changeStatusForWorkorder : " + err);
        };
    },
    showWorkOrderHistoryForm: function() {
        try {
			var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({"id":scopeObj.getFormModelInfo("WorkOrderId")});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("segOrderHistoryKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            scopeObj.navigateTo(kony.servicesapp.FRMORDERHISTORYKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showWorkOrderHistoryForm : " + err);
        };
    },
    showWorkOrderResourcesForm: function() {
        try {
			var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({"id":scopeObj.getFormModelInfo("WorkOrderId")});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
          	var query;
          	if(kony.servicesapp.CONNECTOR=='CRM')
              query=kony.servicesapp.ResourcesQuery[kony.servicesapp.INORDERCRM];
            else if(kony.servicesapp.CONNECTOR=='ECC')
              query=kony.servicesapp.ResourcesQuery[kony.servicesapp.INORDERECC];
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			navigationObject.setQuery("segSwipeKA",query,"sql");
          	navigationObject.setQueryParams("segSwipeKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
            scopeObj.navigateTo(kony.servicesapp.FRMORDERRESOURCESLISTKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showWorkOrderResourcesForm : " + err);
        }
    },
    onClickBack: function() {
        kony.servicesapp.showFormOrderList();
    },
    changeStatusOnPauseCompleteRejectWorkorder: function(woID, taskID, taskNumber, currentStatusID, updatedStatusID) {
        try {
        	var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var configObj = scopeObj.getController().getConfig();
            if (currentStatusID == workOrderStatus.Scheduled && updatedStatusID == workOrderStatus.Paused) {
                return;
            }
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(kony.servicesapp.ENTITY_TASK);
            var momentFormat = convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_WITH_TIME),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
			recordObject.set("WorkOrder_id", woID);
			recordObject.set("Task_num", taskNumber);
          	recordObject.set("id",taskID);
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
                        var swRecordObject = new objHandler(kony.servicesapp.ENTITY_STOPWATCH);  
                        swRecordObject.set("Task_id", taskNumber);
                        swRecordObject.set("WorkOrder_id", woID);
                        swRecordObject.set("Status_id", updatedStatusID);
                        swRecordObject.set("ChangeTime", convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_WITH_TIME),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT));
                        swRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
						swRecordObject.setInfo("options", configObj.getObjectServiceOptions());
						swRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                        var swSuccess = function() {
                            kony.sdk.mvvm.log.error("changeStatusOnPauseCompleteRejectWorkorder Update successful");
                        };
                        var swError = function() {
							kony.sdk.mvvm.log.error("changeStatusOnPauseCompleteRejectWorkorder Update Error");
                        };
                        scopeObj.saveRecord(swRecordObject, swSuccess, swError);
                    }
                }
            }
            var onError = function(error) {
                kony.sdk.mvvm.log.error("error in Blogic changeStatusOnPauseCompleteRejectWorkorder onError : " + error);
            }
            scopeObj.saveRecord(recordObject, onSuccess, onError);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changeStatusOnPauseCompleteRejectWorkorder : " + err);
        };
    },
    showFrmDirectionKA: function() {
        try {
			var scopeObj = this;
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var formmodel = appContext.getFormController(kony.servicesapp.FRMDIRECTIONSKA).getFormModel();
			var lat = scopeObj.getFormModelInfo("destinationLat");
            var lon = scopeObj.getFormModelInfo("destinationLon");
			var controllerExtension = appContext.getFormController(kony.servicesapp.FRMDIRECTIONSKA).getControllerExtensionObject();
            if(lat && lon){
				formmodel.performActionOnView("mapDirectionKA", "clear", []);
                kony.servicesapp.ISFROMORDEREXECUTION=true;
				controllerExtension.bindData(true);
            }else{
				kony.sdk.mvvm.log.error("Lattitude and Longitude are not available for this workorder");
			}
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showFrmDirectionKA : " + err);
        }
	},    
	showWorkOrderNotesForm: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({"id":scopeObj.getFormModelInfo("WorkOrderId")});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("segNotesListKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            navigationObject.addCustomInfo("workorderid",scopeObj.getFormModelInfo("WorkOrderId"));
            scopeObj.navigateTo(kony.servicesapp.FRMNOTESLISTKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
	addNewTaskKA: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
			var WorkOrderId = scopeObj.getController().getContextData().getCustomInfo("WorkOrderId");
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.addCustomInfo("WorkOrderId", WorkOrderId);
			navigationObject.setQueryParams("form", {
                "x": WorkOrderId
            });
            scopeObj.navigateTo(kony.servicesapp.FRMNEWTASKKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
    cancelTimer: function() {
        try {
            kony.timer.cancel("HideSegHeader1");
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
    },
    createForGPSInTechTrack: function(curlatlon){
        try{
			var scopeObj=this;                  
			var objHandler = kony.sdk.mvvm.persistent.Record;
			var recordObject = new objHandler(kony.servicesapp.ENTITY_GEOLOCATIONLOG);
			var configObj = scopeObj.getController().getConfig();
			var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);     
			var storedUsername = credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase(); 			
			var currentDateTime = convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT)                   
			recordObject.set("User_id",storedUsername);    
			recordObject.set("CaptureTime",currentDateTime);
			recordObject.set("Longitude", curlatlon.lon);
			recordObject.set("Latitude", curlatlon.lat);    
			recordObject.setInfo("serviceName", kony.servicesapp.GPS_OBJECT_SERVICE_NAME);
			recordObject.setInfo("options", configObj.getObjectServiceOptions());
			recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
			var onSuccess = function(res) {
				kony.sdk.mvvm.log.info("Create successful for GeolocationLog");                     
				if (kony.sdk.mvvm.isNetworkAvailabile()) {
					kony.servicesapp.syncTechnicianLocationKA();
				}
			}                            
			var onError = function(error) {
				kony.sdk.mvvm.log.error("Create failed for GeolocationLog"+error); 
			}
			scopeObj.saveRecord(recordObject, onSuccess, onError);
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic createForGPSInTechTrack action : " + err);
		}      
    },
    watchLocation:function(){
		try{
			var scopeObj = this;  
			if(!scopeObj.getFormModelInfo("watchposID")){
				var successcallback1 = function(position) {  
					kony.sdk.mvvm.log.info("In successcallback of watchLocation");
					var curlatlon={};
					curlatlon.lat=position.coords.latitude;
					curlatlon.lon=position.coords.longitude;   
					if(scopeObj.technicianLat != curlatlon.lat ||scopeObj.technicianLon != curlatlon.lon){               
						scopeObj.technicianLat=curlatlon.lat ;
						scopeObj.technicianLon=curlatlon.lon ;
						scopeObj.createForGPSInTechTrack(curlatlon);
					}
				}
				var errorcallback1 = function(error) {
				    var utilitiesObj = utilities.getUtilityObj();
					if(kony.servicesapp.WATCHPOSITIONCALLEDFIRSTTIME){
						kony.servicesapp.WATCHPOSITIONCALLEDFIRSTTIME = false;
						alert(utilitiesObj.geti18nValueKA("i18n.common.enableGPS.ValueKA"));
						kony.sdk.mvvm.log.info(error.message);
						kony.sdk.mvvm.log.error("error in watchLocation errorcallback1"+error);
					}					
					kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				}
				var positionoptions = {
					maximumAge : kony.servicesapp.MAXIMUMAGE_GPS,
					enableHighAccuracy : true,              
					minimumTime : kony.servicesapp.GPS_MINIMUMTIMER_FREQUENCY
				};
				var watchPosID = kony.location.watchPosition(successcallback1, errorcallback1, positionoptions);
				scopeObj.setFormModelInfo("watchposID",watchPosID);
			}			
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic watchLocation action : " + err);
		} 		
	},
  
  destroySurveyForm: function(){
		try {
           if(kony.application.getPreviousForm().id == "frmSurveyKA"){
             frmSurveyKA.destroy();
           }                    

        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
  },    
   showEventSurvey: function(eventId) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
			eventId = 'WO_START';
            var scopeObj = this;
            var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
            var viewModel = scopeObj.getController().getFormModel();
			var datamodel = new kony.sdk.mvvm.DataModel();  
          	var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
          	var User_id = credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase();
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
           
            navigationObject.setQueryParams("flxSurveyKA", {
                "y": eventId,
              	"x":workOrderID,
            });
          
            navigationObject.addCustomInfo("SurveyInfo", {
                "WorkOrderID": workOrderID,
                "eventID": eventId,
                "User_id":User_id,
            });
            
            scopeObj.navigateTo("frmSurveyKA", navigationObject);            

        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
    },
  	showOrderObjectFromExecution:function(){
      try{
        	var scopeObj = this;
        	var workorderId=scopeObj.getController().getContextData().getCustomInfo("WorkOrderId");
        	//var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({"Order_number":workorderId});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x":workorderId
            });
        	navigationObject.addCustomInfo("prevFormName",kony.application.getCurrentForm().id);
        	scopeObj.navigateTo("frmOrderAssetKA", navigationObject);
      }
      catch(err){
        kony.sdk.mvvm.log.error("error in Blogic showOrderObjectForm : " + err);
      };
    }
});