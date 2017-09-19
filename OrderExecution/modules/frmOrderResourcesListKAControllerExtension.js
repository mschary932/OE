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
kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    $statics: {
        RESOURCELIST_VIEWTYPE_LOCAL: "LOCAL",
        RESOURCELIST_VIEWTYPE_AVAILABLE: kony.servicesapp.AVAILABLE,
        RESOURCELIST_VIEWTYPE_INORDER: "INORDER",
        RESOURCELIST_VIEWTYPE_INORDERCRM: "INORDERCRM",
        RESOURCELIST_VIEWTYPE_GLOBAL: "GLOBAL",
        UNCHECKED_VIEW_IMAGE: "notification_circle_unchecked.png",
        FORWARD_CARET: "bf_forward_caret.png",
        FILTER_UNCHECKED_SKIN: "sknBtnUncheckedCheckboxKA",
        FILTER_CHECKED_SKIN: "sknBtnCheckedCheckboxKA",
        RESOURCES_VIEW: ["i18n.frmOrderViews1.InOrder.ValueKA", "i18n.task.frmTaskViewFiltersKA.Local.ValueKA"],
        BUTTON_CLEAR_SKIN: "sknBtnFF5D6EClanProNews28KA",
		VIEW_ENABLED : false

    },
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
      	this.records = {};
    },
    fetchData: function() {
        try {           
          if( Object.keys(kony.servicesapp.swipedIndices).length>0){
				var animObj=kony.servicesapp.getEndStateTransAnimDefinition("-50%","0%",true);
				animObj["callbacks"]={
					"animationEnd":function(){ 
						var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
						var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
						kony.servicesapp.swipedIndices={};
						kony.servicesapp.coords=[];
						kony.servicesapp.isAnimationInProgress=false;
						return controller.$class.$superp.fetchData.call(controller);
					}
				}
				frmOrderResourcesListKA.segSwipeKA.animateRows({
					rows: [{
						sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
						rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
					}],
					widgets: ["flxChildKA"],
					animation: animObj
				});
			}
            else if(kony.servicesapp.isAnimationInProgress && kony.application.getCurrentForm().id=="frmOrderResourcesListKA"){return;}
			else{this.$class.$superp.fetchData.call(this);}
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        /*function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
         //   this.formatData(response);
        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }*/
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
          	var pData = dataMap["segSwipeKA"];
          	scopeObj.records = dataMap;
          	for(var i=0;i<pData.length;i++){
              if((pData[i]["IsLeaf"]=='X')&&(kony.servicesapp.CONNECTOR!="CRM"))
                pData[i]["IsLeaf"] = {"text":"X","isVisible":true};
            }
          	dataMap["segSwipeKA"]=pData;
          	scopeObj.records=pData;
			kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.VIEW_ENABLED = false;
            //alert("dataMap"+JSON.stringify(dataMap));
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
			scopeObj.setFormModelInfo("fromBarCode", false);
            var resourcesListFormController = appContext.getFormController("frmOrderResourcesListKA");
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var workorderStatus = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus");
            var formmodel = controller.getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var segData = dataMap["segSwipeKA"];
            //scopeObj.bindDataForViews(dataMap);
            var bindDataObj;
            var formmodel = controller.getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var segData = dataMap["segSwipeKA"];
           	formmodel.performActionOnView("flxMainKA","setEnabled", [true]);
			formmodel.performActionOnView("btnOptionsKA","setEnabled",[true]);
			formmodel.performActionOnView("flxMainKA","setEnabled", [true]);	
			formmodel.performActionOnView("flexDetailsKA","setEnabled",[true]);
			formmodel.performActionOnView("btnBackKA","setEnabled",[true]);
			//formmodel.performActionOnView("flexDetailsKA","setEnabled",[true]);
			var viewType = scopeObj.getFormModelInfo("viewType")?scopeObj.getFormModelInfo("viewType"):scopeObj.RESOURCELIST_VIEWTYPE_INORDER;		
//alert(viewType+"viewType in bindData");			
			if(kony.application.getCurrentForm().id != 'frmResourceExecutionKA' && kony.application.getCurrentForm().id != 'frmOrderResourcesListKA'){
					formmodel.setViewAttributeByProperty("tbxSearchKA", "text", '');
					this.setFormModelInfo("prevForm", kony.application.getCurrentForm().id);
                    viewType = kony.servicesapp.CONNECTOR == 'CRM'?scopeObj.RESOURCELIST_VIEWTYPE_INORDERCRM:scopeObj.RESOURCELIST_VIEWTYPE_INORDER;		
                    scopeObj.setFormModelInfo("viewType", viewType);			
					scopeObj.setFormModelInfo("searchData",{});
			}
            /*if(kony.application.getCurrentForm().id != 'frmResourceExecutionKA' && (kony.application.getCurrentForm().id == 'frmOrderResourcesListKA' && kony.servicesapp.CONNECTOR == 'CRM')){
					formmodel.setViewAttributeByProperty("tbxSearchKA", "text", '');
					//this.setFormModelInfo("prevForm", kony.application.getCurrentForm().id);
					viewType = scopeObj.RESOURCELIST_VIEWTYPE_INORDERCRM;
                    scopeObj.setFormModelInfo("viewType", viewType);			
					scopeObj.setFormModelInfo("searchData",{});
			}*/
			if( kony.application.getCurrentForm().id =="frmCompleteOrderKA"){this.setFormModelInfo("isCommpleteOrderFlow",true);}
			//formmodel.setViewAttributeByProperty("segViews1KA", "selectedRowIndex", scopeObj.getIndexOfView(viewType));
			processedSegData = scopeObj.formatSegData(segData, scopeObj);
            //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
            var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segSwipeKA", "widgetDataMap");
            lclWidgetDataMap["lblResourceKA"] = "lblHeader";
            formmodel.setViewAttributeByProperty("segSwipeKA", "widgetDataMap", lclWidgetDataMap);
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
            dataMap["segSwipeKA"] = {};
            dataMap["segSwipeKA"]["segSwipeKA"] = finalProcessedSegData;
				formmodel.performActionOnView("btnOptionsKA","setVisibility", [true]);
			if(controller.getContextData() && controller.getContextData().getCustomInfo("fromForm") === "frmCompleteOrderKA" && kony.servicesapp.CONNECTOR!='CRM'){
              	formmodel.performActionOnView("btnOptionsKA","setVisibility", [false]);
            }
			
            this.$class.$superp.bindData.call(this, dataMap);
            scopeObj.getController().getFormModel().formatUI();
            formmodel.showView();
            //alert("dataMap" + JSON.stringify(dataMap));
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
           // kony.print("segData in order resources" + segData);
            for (var i in segData) {
                processedRowObj = {};
                processedRowObj["Material_id"] = segData[i]["Code"];
                processedRowObj["InvID"] = segData[i]["InvID"];
                processedRowObj["InventoryQuantity"] = segData[i]["InventoryQuantity"];
                processedRowObj["ItemNumber"] = segData[i]["ItemNumber"];
                processedRowObj["RequestedQuantityNumber"] = utilitiesObj.roundNumber(segData[i]["RequestedQuantity"],2);
                processedRowObj["AssignedQuantity"] = utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2);
                processedRowObj["Code"] = utilitiesObj.dataTruncation(segData[i]["Code"], 10, 3, "...").value;
                processedRowObj["Description"] = utilitiesObj.dataTruncation(segData[i]["Description"], 28, 3, "...").value;
                processedRowObj["MaterialDescription"]=segData[i]["Description"];  
                processedRowObj["MaterialType"] = utilitiesObj.dataTruncation(segData[i]["MaterialType"], 20, 3, "...").value;
                processedRowObj["ConsumedQuantity"] = utilitiesObj.roundNumber(segData[i]["ConsumedQuantity"], 2);
                // processedRowObj["RequestedQuantity"] = segData[i]["RequestedQuantity"] ?utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2) + " "+segData[i]["baseUnit"] : " ";
                processedRowObj["RequestedQuantity"] = segData[i]["RequestedQuantity"] ?utilitiesObj.roundNumber(segData[i]["RequestedQuantity"], 2) : " ";
                processedRowObj["AvailableQuantity"] = utilitiesObj.roundNumber(segData[i]["AvailableQuantity"], 2) + " ";
               	processedRowObj["IsLeaf"] = segData[i]["IsLeaf"];
              	processedRowObj["baseunitId"] = segData[i]["baseunitId"];
              	processedRowObj["ReqId"] = segData[i]["ReqId"];
                processedRowObj["ReqUnitDescription"] = segData[i]["ReqUnitDescription"];                
                if (segData[i]["RequestedQuantity"]) {
                     if(kony.servicesapp.CONNECTOR=='CRM' && segData[i]["ReqUnitDescription"]){
                        processedRowObj["RequestedQuantity"] += " "+segData[i]["ReqUnitDescription"];
                        //For CRM-Appending RequestedUnit, as it is only Order's Resources
                     }else{
                        if(segData[i]["baseUnit"]){
                            processedRowObj["RequestedQuantity"] += " "+segData[i]["baseUnit"];
                            //For ECC-Appending BaseUnit, as it is a Consolidation of All Tasks' Resources
                        }
                     }
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
				var isReadOnly =  false;                
				if(workorderStatus.toUpperCase() == "ON ROUTE" || workorderStatus.toUpperCase() == "SCHEDULED"){isReadOnly=true;}
                //else{
				//if(kony.application.getCurrentForm().id =="frmCompleteOrderKA"){isCompleteOrderFlow = true};
                if (!isReadOnly && segData[i]["taskStatus"] && segData[i]["taskStatus"].toUpperCase()!= "SCHEDULED" && segData[i]["isConsumable"] && segData[i]["isConsumable"]=='Y') {
                   switch (taskStatus.toUpperCase()){
				   case "STARTED":
							if (segData[i]["isConsumed"].toUpperCase() == "Y") {
								processedRowObj["isConsumedImage"] = {
									skin: "sknBtnCheckedEnabledKA",
									focusSkin: "sknBtnCheckedEnabledKA",
									text: " "
								};

							} else {
								 if(processedRowObj["RequestedQuantity"]!=0){ 
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
									skin: "sknBtnUncheckedEnabledKA",
									focusSkin: "sknBtnUncheckedEnabledKA",
									text: " "
								};
							}
							break;
					
					 default:
							if (segData[i]["isConsumed"].toUpperCase() == "Y") {
								processedRowObj["isConsumedImage"] = {
									skin: "sknBtnResourceCheckedKA",
									focusSkin: "sknBtnResourceCheckedKA",
									text: " "
								};

							} else {
								processedRowObj["isConsumedImage"] = {
									skin: "sknBtnResourceUncheckedKA",
									focusSkin: "sknBtnResourceUncheckedKA",
									text: " "
								};
							}
					}
                }
              else if(kony.servicesapp.CONNECTOR=='CRM' && !isReadOnly && workorderStatus && workorderStatus.toUpperCase()!= "SCHEDULED" && segData[i]["isConsumable"] && segData[i]["isConsumable"]=='Y'){
                switch (workorderStatus.toUpperCase()){
				   case "STARTED":
							if (segData[i]["isConsumed"].toUpperCase() == "Y") {
								processedRowObj["isConsumedImage"] = {
									skin: "sknBtnCheckedEnabledKA",
									focusSkin: "sknBtnCheckedEnabledKA",
									text: " "
								};

							} else {
								 if(processedRowObj["RequestedQuantity"]!=0){ 
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
									skin: "sknBtnUncheckedEnabledKA",
									focusSkin: "sknBtnUncheckedEnabledKA",
									text: " "
								};
							}
							break;
					
					 default:
							if (segData[i]["isConsumed"].toUpperCase() == "Y") {
								processedRowObj["isConsumedImage"] = {
									skin: "sknBtnResourceCheckedKA",
									focusSkin: "sknBtnResourceCheckedKA",
									text: " "
								};

							} else {
								processedRowObj["isConsumedImage"] = {
									skin: "sknBtnResourceUncheckedKA",
									focusSkin: "sknBtnResourceUncheckedKA",
									text: " "
								};
							}
					}
                }
                 else {
                    processedRowObj["isConsumedImage"] = {
                        skin: "sknBtnTransKA",
                        focusSkin: "sknBtnTransKA",
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



    navigateBack: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, true, this.getFormModelInfo("prevForm"));
    },

    navigateToResourceExecution: function() {

        try {
            var formmodel = this.getController().getFormModel();
            var selRecord = formmodel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
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
				if(kony.servicesapp.CONNECTOR=='CRM')
					navigationObject.setQuery("form", kony.servicesapp.ResourcesQuery[kony.servicesapp.ORDERRESOURCES_RESOURCEEXECUTIONCRM], "sql");
				else  
					navigationObject.setQuery("form", kony.servicesapp.ResourcesQuery[kony.servicesapp.ORDERRESOURCES_RESOURCEEXECUTION], "sql");
                navigationObject.setQueryParams("form", {
                    "y": selRecord.Material_id,
                    "x":woInfo,
					//"z":selRecord.isConsumable'
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
		    var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var configObj = scopeObj.getController().getConfig();
            var selRecord = formmodel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var configObj = scopeObj.getController().getConfig();            
            var orderresourceslistcontrollerextension = appContext.getFormController("frmOrderResourcesListKA").getControllerExtensionObject();
			 var isCompleteOrderFlow = scopeObj.getFormModelInfo("isCommpleteOrderFlow");
				
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var workorderStatus = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus");            
            if ((kony.servicesapp.CONNECTOR!='CRM' && (selRecord.isConsumable && selRecord.isConsumable != '' && selRecord.isConsumable.toUpperCase() == "Y") && workorderStatus.toLowerCase() == "started" && selRecord.taskStatus.toLowerCase() == "started" )&& (selRecord.taskStatus.toLowerCase() != "completed")){

                var isConsumed = selRecord.isConsumed;
                var updatedConsumedStatus = "Y";
                if (isConsumed.toUpperCase() == "Y") {
                    updatedConsumedStatus = "N";
                }
				var TaskMaterialEntityController = scopeObj.getController().getApplicationContext().getModel("TaskMaterial",configObj.getObjectServiceName(),configObj.getObjectServiceOptions());
				var query = "UPDATE TaskMaterial SET isConsumed = '"+updatedConsumedStatus+"' WHERE TaskMaterial.TaskComp_id in  (SELECT tsk.id FROM Task tsk WHERE  tsk.Status_id!='Completed') and WorkOrder_id = '"+orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId") +"' and (isConsumable = 'Y' ) and Material_id ='"+selRecord.Material_id+"' "			
                var queryobj = new kony.sdk.mvvm.Query(query, "sql");
              /*  var recordObject = new objHandler("TaskMaterial");
                recordObject.set("Id", selRecord.womID);
                recordObject.set("isConsumed", updatedConsumedStatus);
                recordObject.set("WorkOrder_id", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId"));
                recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                recordObject.setInfo("options", configObj.getObjectServiceOptions());*/

              //
                var onError = function() {
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
                var invSuccess = function() {
                    this.fetchData();
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    if (kony.sdk.mvvm.isNetworkAvailabile()) {
                        kony.servicesapp.backgroundSyncOnStatusChangeKA();
                    }
                };
				 var invError = function() {
                    alert(utilitiesObj.geti18nValueKA("i18n.order.inventoryUpdate.ErrorKA"));
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                };
               

                var onSuccess = function() {
                    var invRecordObject = new objHandler("Inventory");
                    if (updatedConsumedStatus == 'Y') {
                        invRecordObject.set("Quantity", (selRecord.InventoryQuantity + selRecord.ConsumedQuantity) - selRecord.AssignedQuantity);
                    } else {
                        invRecordObject.set("Quantity", selRecord.InventoryQuantity + (selRecord.ConsumedQuantity));
                    }

                    invRecordObject.set("id", selRecord.InvID);
                    // invRecordObject.set("Material_id", selRecord.Material_id);
                    invRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    invRecordObject.setInfo("options", configObj.getObjectServiceOptions());

                    var orderresourceslistcontrollerextension = appContext.getFormController("frmOrderResourcesListKA").getControllerExtensionObject();
                    orderresourceslistcontrollerextension.saveRecord(invRecordObject, invSuccess, invError);
                }

             //   this.saveRecord(recordObject, onSuccess, onError);
			 
			TaskMaterialEntityController.executeSelectQuery(queryobj.getQuery().query, onSuccess, onError);
            }
          else{
            if (((selRecord.isConsumable && selRecord.isConsumable != '' && selRecord.isConsumable.toUpperCase() == "Y") && workorderStatus.toLowerCase() == "started")&& (workorderStatus.toLowerCase() != "completed")&& kony.servicesapp.CONNECTOR=='CRM'){

                var isConsumed = selRecord.isConsumed;
                var updatedConsumedStatus = "Y";
                if (isConsumed.toUpperCase() == "Y") {
                    updatedConsumedStatus = "N";
                }
				var woMaterialEntityController = scopeObj.getController().getApplicationContext().getModel("WorkOrderMaterial",configObj.getObjectServiceName(),configObj.getObjectServiceOptions());
				var query = "UPDATE WorkOrderMaterial SET isConsumed = '"+updatedConsumedStatus+"' WHERE WorkOrderMaterial. WorkOrder_id = '"+orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId") +"' and (isConsumable = 'Y' ) and Material_id ='"+selRecord.Material_id+"' "			
                var queryobj = new kony.sdk.mvvm.Query(query, "sql");            
                var onError = function() {
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                }
                var invSuccess = function() {
                    this.fetchData();
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    if (kony.sdk.mvvm.isNetworkAvailabile()) {
                        kony.servicesapp.backgroundSyncOnStatusChangeKA();
                    }
                };
				 var invError = function() {
                    alert(utilitiesObj.geti18nValueKA("i18n.order.inventoryUpdate.ErrorKA"));
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                };
               

                var onSuccess = function() {
                    var invRecordObject = new objHandler("Inventory");
                    if (updatedConsumedStatus == 'Y') {
                        invRecordObject.set("Quantity", (selRecord.InventoryQuantity + selRecord.ConsumedQuantity) - selRecord.AssignedQuantity);
                    } else {
                        invRecordObject.set("Quantity", selRecord.InventoryQuantity + (selRecord.ConsumedQuantity));
                    }

                    invRecordObject.set("id", selRecord.InvID);
                    // invRecordObject.set("Material_id", selRecord.Material_id);
                    invRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    invRecordObject.setInfo("options", configObj.getObjectServiceOptions());

                    var orderresourceslistcontrollerextension = appContext.getFormController("frmOrderResourcesListKA").getControllerExtensionObject();
                    orderresourceslistcontrollerextension.saveRecord(invRecordObject, invSuccess, invError);
                }
			woMaterialEntityController.executeSelectQuery(queryobj.getQuery().query, onSuccess, onError);
          }
        } 
        }catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic change status from Order Resources List: " + err);
        }
    },
    showFilters: function(toShow) {
        var formModel = this.getController().getFormModel();
		var scopeObj=this;
		showHideHamburgerMenuKA(frmOrderResourcesListKA,frmHamburgerMenuWOKA,toShow,"flxViews1KA");
		 //showHideHamburgerMenuKA(frmOrderResourcesListKA,frmHamburgerMenuWOKA,toShow);
        if (!toShow) {
			var viewType = scopeObj.getFormModelInfo("viewType");
			scopeObj.setFormModelInfo("viewType", viewType);
			formModel.performActionOnView("flxMainKA","setEnabled", [true]);
			kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.VIEW_ENABLED = false;
        }else{
			scopeObj.bindDataForViews();
			formModel.performActionOnView("flxMainKA","setEnabled", [false]);
			kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.VIEW_ENABLED = true;
		}
    },
    applyView: function(onCancel) {
	  
        var scopeObj = this;
		var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var orderexecutioncontrollerextension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
        var formmodel = this.getController().getFormModel();
		var utilitiesObj = utilities.getUtilityObj();
		var selectedRecords  = scopeObj.getIndexOfView(scopeObj.getFormModelInfo("viewType"));		
		if(!onCancel){
		
         selectedRecords = formmodel.getViewAttributeByProperty("segViews1KA", "selectedRowIndex");
		}
		/*else{
		 //var viewType = scopeObj.getFormModelInfo("viewType");
		 selectedRecords = scopeObj.getFormModelInfo("selectedRecords");
		}*/
        var contextData = this.getController().getContextData();
		formmodel.setViewAttributeByProperty("tbxSearchKA", "text", '');
		scopeObj.setFormModelInfo("searchData",{});
        switch (selectedRecords[1]) {
            case 0:
                if(kony.servicesapp.CONNECTOR == 'CRM')
                  {
                    scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_INORDERCRM);
			         scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.INORDERCRM, {
                    'x': orderexecutioncontrollerextension.getFormModelInfo("WorkOrderId"),
                    'search': '%%'
                });
                  }
            	 else
                 {
                 scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_INORDER);
			     scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.INORDER, {
                    'x': orderexecutioncontrollerextension.getFormModelInfo("WorkOrderId"),
                    'search': '%%'
                });
                }
                break;

            case 1:
                scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_LOCAL);
                scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.LOCAL, {
                    'x': orderexecutioncontrollerextension.getFormModelInfo("WorkOrderId"),
                    'search': '%%'
                });

                break;
            default:
			 scopeObj.setFormModelInfo("viewType", scopeObj.getFormModelInfo("viewType"));
                  alert(utilitiesObj.geti18nValueKA("i18n.order.common.WorkinProgressKA"));
                break;
                /*  case 2:
                      scopeObj.setFormModelInfo("viewType", scopeObj.RESOURCELIST_VIEWTYPE_AVAILABLE);
                      scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.AVAILABLE);
                      break;
                  case 3:
                      scopeObj.setFormModelInfo("viewType", kony.servicesapp.ResourcesQuery.GLOBAL);
                      break; */
        }
		scopeObj.setFormModelInfo("selectedRecords", scopeObj.getIndexOfView(scopeObj.getFormModelInfo("viewType")));
		scopeObj.showFilters(false);
        
    },
    deviceBack: function() {
        utilities.getUtilityObj().doNothingOnDeviceBackKA();
    },
    refreshSegData: function(query, queryParams) { //queryParams 
        var contextData = this.getController().getContextData();
		var utilitiesObj = utilities.getUtilityObj();
        var query = query;
		kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
        var scopeObj = this;
		var sucCallback=function(response){scopeObj.bindData(response); kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}//scopeObj.formatSegData(response, scopeObj)}
		var errorcallback=function(err){ kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
        contextData.setQuery("segSwipeKA", query, "sql");
        if (queryParams) {
            contextData.setQueryParams("segSwipeKA", queryParams);
        }
			//var groupwidgetcontext = this.createGroupWidgetsContext();
      this.fetchDataByWidgetId("segSwipeKA", sucCallback, errorcallback);
        //scopeObj.fetchData("segSwipeKA");
    },
	fetchDataByWidgetId : function(widgetId,successCallback,errorCallback){
	try {
            this.$class.$superp.fetchDataByWidgetId.call(this,widgetId,successCallback,errorCallback);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
	},
    bindDataForViews: function(dataMap) {
        var scopeObj = this;
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var utilitiesObj = utilities.getUtilityObj();
        var controller = this.getController();
        var formmodel = controller.getFormModel();
        var lclSelectedIndex = scopeObj.getIndexOfView(scopeObj.getFormModelInfo("viewType"));
        formmodel.setViewAttributeByProperty("segViews1KA", "selectedRowIndex", lclSelectedIndex);

        var utilitiesObj = utilities.getUtilityObj();
        var viewHeader = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.subHeader.ViewsValueKA");
        var btnClear = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.subHeader.btnClearValueKA");
        var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segViews1KA", "widgetDataMap");
        lclWidgetDataMap["lblHeaderTmpKA"] = "lblHeaderTmpKA";
        formmodel.setViewAttributeByProperty("segViews1KA", "widgetDataMap", lclWidgetDataMap);
        dataMap = [];
        var imgSelect = scopeObj.UNCHECKED_VIEW_IMAGE;
        var processedSegData = [];
        var processedSegRowData;
        var viewValues = "";
        var viewList = scopeObj.RESOURCES_VIEW;
        for (var i in viewList) {
            processedSegRowData = {};
            processedSegRowData["lblTaskViewKA"] = utilitiesObj.geti18nValueKA(viewList[i]); // TODO create i18n for inorder,local,available,global
            processedSegRowData["imgSelectViewKA"] = imgSelect;
			processedSegRowData["lblLineKA"] = " ";
            processedSegData.push(processedSegRowData);
        }
        var lclViewHeader = {
            "lblHeaderTmpKA": viewHeader,
			"lblLineBottomKA":" ",
			"lblLineKA":" "
        };
        var viewFinalSegData = [
            [lclViewHeader, processedSegData]
        ];
       
		formmodel.performActionOnView("segViews1KA", "setData", [viewFinalSegData]);
        formmodel.setViewAttributeByProperty("segViews1KA", "selectedRowIndex", lclSelectedIndex);
    },

    getIndexOfView: function(viewType) {
        try {
            var lclSelectedIndex = [];
            switch (viewType) {
                case kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.RESOURCELIST_VIEWTYPE_INORDER:
                    lclSelectedIndex = [0, 0];
                    break;
                 case kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.RESOURCELIST_VIEWTYPE_INORDERCRM:
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
    },
    doSearch: function() {
        var scopeObj = this;
        var controller = scopeObj.getController();
		 var utilitiesObj = utilities.getUtilityObj();
        var formmodel = controller.getFormModel();
        var contextData = this.getController().getContextData();
		var searchText=formmodel.getViewAttributeByProperty("tbxSearchKA", "text");
		scopeObj.setFormModelInfo("searchData",{"text":searchText,"isSearch":true});
		if(searchText.length!=0 && searchText.length <=2){alert(utilitiesObj.geti18nValueKA("i18n.order.common.searchErrorKA"));return;}
        if(scopeObj.getFormModelInfo("viewType")== scopeObj.RESOURCELIST_VIEWTYPE_LOCAL){
			if(scopeObj.getFormModelInfo("fromBarCode")){
				
				scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.LOCAL_BARCODE, {
					'x': contextData.getCustomInfo("WorkOrderId"),
					'y': '',
					'search': searchText
				});
			}else{
				scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.LOCAL, {
					'x': contextData.getCustomInfo("WorkOrderId"),
					'y': '',
					'search': '%' + searchText+ '%'
				});
			}
		}else{
			if(scopeObj.getFormModelInfo("fromBarCode")){               
                if(kony.servicesapp.CONNECTOR == 'CRM')
                      {
                        scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.INORDERSEARCHCRM, {
                            'x': contextData.getCustomInfo("WorkOrderId"),
                            'y': '',
                            'search': '%' + searchText+ '%'
                        });
                      }
                else{
                  //scopeObj.setFormModelInfo("fromBarCode", false);
                  scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.INORDER_BARCODE, {
                      'x': contextData.getCustomInfo("WorkOrderId"),
                      'search': searchText
                  });
                }
            }else{
                if(kony.servicesapp.CONNECTOR == 'CRM')
                    {
                          scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.INORDERSEARCHCRM, {
                          'x': contextData.getCustomInfo("WorkOrderId"),
                          'y': '',
                          'search': '%' + searchText+ '%'
                      });
                    }
                 else{
                      scopeObj.refreshSegData(kony.servicesapp.ResourcesQuery.INORDER, {
                          'x': contextData.getCustomInfo("WorkOrderId"),
                          'search': '%' + searchText + '%'
                      });
                 }
			}
		}
    },
	deviceBackForAndroidOrderResourcesList : function() {
		try{
			var scopeObj = this;
        	var controller = scopeObj.getController();
			var formModel = controller.getFormModel();
			if(kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.VIEW_ENABLED){
				scopeObj.showFilters(false);
			}else{
				scopeObj.navigateBack(false);
				kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension.VIEW_ENABLED = false;
			}
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic deviceBackForAndroidOrderList : " + err);
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