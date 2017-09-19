var ResourcesUtility = Class({
	$statics: {
		scopeObj: null,
		getUtilityObj: function() {
			if (ResourcesUtility.scopeObj) {
				return ResourcesUtility.scopeObj;
			} else {
				ResourcesUtility.scopeObj = new ResourcesUtility();
				return ResourcesUtility.scopeObj;
			}
		}
	},
	deleteQuantity:function(){
		var section = kony.servicesapp.currIndices["secIndex"];
		var row = kony.servicesapp.currIndices["rowIndex"];
		var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();		
		var controller = appContext.getFormController(kony.application.getCurrentForm().id);		
		var currentFormControllerExtension =controller.getControllerExtensionObject();
		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
		var formmodel = controller.getFormModel();
		var rowData = formmodel.getViewAttributeByProperty("segSwipeKA", "data")[section][1][row];
		//showHideHamburgerMenuKA(kony.application.getCurrentForm(),frmHamburgerMenuWOKA,false,"flxDeleteKA");
		formmodel.performActionOnView("flexDetailsKA", "setEnabled", [true]);
		formmodel.performActionOnView("btnBackKA", "setEnabled", [true]);
		currentFormControllerExtension.setFormModelInfo("isDelete",true);
		ResourcesUtility.scopeObj.updateQuantity(false, 0, rowData.InventoryQuantity, rowData.womID, rowData.ReqId, rowData.baseunitId, rowData.Material_id);
	
	},
	updateQuantity: function(bool,quantity,invQuantity,wom_id,reqUnitId,baseUnitId,materialId,isUpdate) { // bool is true in case of edit, false in case of delete
			try {
				var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
				var controller = appContext.getFormController(kony.application.getCurrentForm().id);
				var contextData = controller.getContextData();
				var utilitiesObj = utilities.getUtilityObj();
				var configObj = controller.getConfig();
				var controllerExtension = controller.getControllerExtensionObject();
				var formmodel = controller.getFormModel();
				var isUpdate = true;var IsReturn =false;
				var re = new RegExp(/^[0-9]{0,10}(\.[0-9]{1,3})?$/);            
				if(!bool)quantity = 0;
				quantity=Number(quantity);
				var toBaseQuantity;
				var invQuantity = utilitiesObj.roundNumber(invQuantity, 2);
				if(re.test(quantity)){
				quantity = utilitiesObj.roundNumber(quantity, 2);
				toBaseQuantity=quantity;
				}            
				else{ kony.sdk.mvvm.Util.callAlert(utilitiesObj.geti18nValueKA("i18n.common.quantityLengthErrorValueKA"), "info",function(){}, "", "Ok", ""); }
			
				function updateMaterial(response) {
						if (response) {
							 ResourcesUtility.scopeObj.updateTaskMaterial(bool,quantity,reqUnitId,toBaseQuantity,isUpdate,wom_id,materialId); //update modified quantity with new uom in case uom has also been modified
						} 
					}
				var removeMessage = utilitiesObj.geti18nValueKA("i18n.common.removeMaterialError.ValueKA");
				/*(wom_id) ? (quantity ?  isUpdate=true : (utilitiesObj.roundNumber(this.getFormModelInfo("AssignedQuantity"),2)?(kony.sdk.mvvm.Util.callAlert(removeMessage, "info",updateMaterial, "", "Ok", ""),IsReturn = true):(alert(utilitiesObj.geti18nValueKA("i18n.common.addMaterialError.ValueKA")),IsReturn = true))) :(quantity ?  isUpdate=false : (alert(utilitiesObj.geti18nValueKA("i18n.common.addMaterialError.ValueKA")), IsReturn = true)) */
				
	 
				if(IsReturn)return;
				kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
				if (reqUnitId && reqUnitId !==  baseUnitId ){			
				var uomentityController = controller.getApplicationContext().getModel("UnitConversion",configObj.getObjectServiceName(),configObj.getObjectServiceOptions());
				var query = "select uom.Factor from UnitConversion uom where uom.UnitFrom_id = '" + reqUnitId + "' and uom.UnitTo_id = '" + baseUnitId + "' and uom.Material_id = '" + materialId + "'";
				var queryobj = new kony.sdk.mvvm.Query(query, "sql");            
				var dataSuccess = function(response) {
				var factor = 1;
					if (response.length != 0) {
						factor = response[0]["Factor"];
					}
					toBaseQuantity= quantity* utilitiesObj.roundNumber(factor,2);
					}
					var dataError = function(response) {
					alert("Unable to fetch conversion");
					return -1;
					}
					uomentityController.executeSelectQuery(queryobj.getQuery().query, dataSuccess, dataError);
					//toBaseQuantity = scopeObj.convertToBase(quantity,formmodel.getViewAttributeByProperty("uomListBoxKA", "selectedKey")); // convert entered quantity to base
				   
				}
				if (!re.test(toBaseQuantity)){
				//kony.sdk.mvvm.Util.callAlert(utilitiesObj.geti18nValueKA("i18n.common.quantityLengthErrorValueKA"),"info", function(){}, "","Ok", "");
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();return;}
				else if((toBaseQuantity>invQuantity) && quantity){
				 var message = utilitiesObj.geti18nValueKA("i18n.common.inventoryMaterialError.ValueKA");
				 kony.sdk.mvvm.Util.callAlert(message, "info",updateMaterial, "", "Ok", "");	
				 
				}
				else{
					ResourcesUtility.scopeObj.updateTaskMaterial(bool,quantity,reqUnitId,toBaseQuantity,isUpdate,wom_id,materialId); //update modified quantity with new uom in case uom has also been modified
				}
				
			} catch (err) {
				//this.showHidePopUp(false);
				kony.sdk.mvvm.log.error("error in Blogic updateQuantity : " + err);
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
		},
	  
		updateTaskMaterial: function(bool,value, uom,valueInBase,isUpdate,womid,materialId) { // isUpdate specifies if update/add operation should be performed
			try {
				var objHandler = kony.sdk.mvvm.persistent.Record;
				var utilitiesObj = utilities.getUtilityObj();
				var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
				var controller = appContext.getFormController(kony.application.getCurrentForm().id);
				var configObj = controller.getConfig();			
				var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
				var taskExecutionFormControllerExtension = appContext.getFormController("frmTaskExecutionKA").getControllerExtensionObject();
				var currentFormControllerExtension =controller.getControllerExtensionObject();
                var womRecordObject;
				if(kony.application.getCurrentForm().id=="frmOrderResourcesListKA" && kony.servicesapp.CONNECTOR=="CRM"){
                    womRecordObject = new objHandler("WorkOrderMaterial");
                    womRecordObject.set("RequestedQuantity", value+"");
                    if(womid){
                      womRecordObject.set("Id", womid);
                    }
                    else{
                      womRecordObject.set("isConsumable", 'Y'); 
                      womRecordObject.set("isConsumed", 'N');			                             
                      womRecordObject.set("Material_id", materialId);
                      womRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                    }
                    womRecordObject.set("WorkOrder_id", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId"));
                    womRecordObject.set("RequestedUnit_id", uom);
                    womRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    womRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                }
                else{
                    var womRecordObject = new objHandler("TaskMaterial");
                    womRecordObject.set("RequestedQuantity", value+"");
                    if(womid){
						womRecordObject.set("Id", womid);
                    }
                    else{
						womRecordObject.set("isConsumable", 'Y'); 
						womRecordObject.set("isConsumed", 'N');			
						womRecordObject.set("Task_id", taskExecutionFormControllerExtension.getFormModelInfo("taskNumber"));
						womRecordObject.set("TaskComp_id", taskExecutionFormControllerExtension.getFormModelInfo("taskID"));            
						womRecordObject.set("Material_id", materialId);
						womRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                    }
                    womRecordObject.set("WorkOrder_id", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId"));
                    womRecordObject.set("RequestedUnit_id", uom);
                    womRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
                    womRecordObject.setInfo("options", configObj.getObjectServiceOptions());
                 }
				var womSuccess = function() {
					kony.print("Update successful");
					if(kony.application.getCurrentForm().id=="frmTaskExecutionKA"||kony.application.getCurrentForm().id=="frmTaskResourcesListKA"||kony.application.getCurrentForm().id=="frmResourceExecutionKA"||kony.application.getCurrentForm().id=="frmOrderResourcesListKA"){
					var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
					var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
					var formModel = controller.getFormModel();
					if(currentFormControllerExtension.getFormModelInfo("isDelete")){
						showHideHamburgerMenuKA(kony.application.getCurrentForm(),frmHamburgerMenuWOKA,false,"flxDeleteKA");
						 kony.timer.cancel("deleteResourceTimer");
						 currentFormControllerExtension.setFormModelInfo("isDelete",false);
					}
					else{
					showHideHamburgerMenuKA(kony.application.getCurrentForm(),frmHamburgerMenuWOKA,false,"flxEditKA");
					}
					//formModel.setViewAttributeByProperty("flxEditKA", "isVisible",false);				
					}
					//if(value!=0 || bool){
					currentFormControllerExtension.fetchData();
					kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
					/* if (kony.sdk.mvvm.isNetworkAvailabile()) {
							kony.servicesapp.backgroundSyncOnStatusChangeKA();
						} */
				   // scopeObj.updateInventory(valueInBase);//
				};
				var womError = function(err) {
					kony.sdk.mvvm.Util.callAlert(utilitiesObj.geti18nValueKA("i18n.common.materialQuantity.updateError.ValueKA"),"info",function(){}, "", "Ok","");
					kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				};//kony.print("value"+value+"womid"+womid);
				if(!value && womid){womRecordObject.set("DELETED", 'D');}
				else{womRecordObject.set("DELETED", 'C');}
				currentFormControllerExtension.saveRecord(womRecordObject, womSuccess, womError);
			} catch (err) {
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("error in Blogic updateTaskMaterial : " + err);
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
		}
	});