//With code fixes
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
kony.sdk.mvvm.frmResourceExecutionKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        var modelPropertyInfoMap = {};
        var controllerContextData = undefined;
        var controller = undefined;
        var controllerExtensionGen = undefined;
        this.$class.$super.call(this,controllerObj);
    },
   fetchData: function() {
        try {           
            this.$class.$superp.fetchData.call(this);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    formatData: function(data) {
        try {
            var scopeObj = this;
            var formattedData = scopeObj.$class.$superp.formatData.call(scopeObj, data);
            scopeObj.bindData(formattedData);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
	removeRecord: function(record, successcallback, errorcallback) {
        try {
            this.$class.$superp.removeRecord.call(this, record, success, error);
			function success(res) {
				//Successfully removed record
				successcallback.call(scopeObj, res);
			}
			function error(err) {
				//Handle error case
				errorcallback.call(scopeObj, err);
				kony.appfoundation.log.error("In removeData errorcallback in controller extension ", err);
				var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
				kony.appfoundation.log.error(exception.toString());
			}
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
        }
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
            var formmodel = controller.getFormModel();
            var appContext = controller.getApplicationContext();
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var processedData = {};
            var utilitiesObj = utilities.getUtilityObj();
            var formData = dataMap["form"][0] ? dataMap["form"][0] : {}; 
			formData["Quantity"]=formData["Quantity"]?utilitiesObj.roundNumber(formData["Quantity"], 2):0;
			processedData = scopeObj.assignValues(formData);
			if (formmodel.getViewAttributeByProperty("flxEdit1KA", "isVisible")) {
                scopeObj.showHidePopUp(true);
                formmodel.setViewAttributeByProperty("tbxQuantity1KA", "text", processedData["lblResourceUnitKA"]?String(processedData["lblResourceUnitKA"]):"1");
            } else {
				scopeObj.assignSkins(formmodel);
			}
            if (kony.application.getCurrentForm().id != "frmOrderResourceDetailsKA" && kony.application.getCurrentForm().id != 'frmResourceExecutionKA') {
                scopeObj.setFormModelInfo("prevForm", kony.application.getCurrentForm().id);
            }
            if (kony.application.getCurrentForm().id == "frmOrderResourcesListKA") {
                scopeObj.setFormModelInfo("workorderStatus", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus"));
            } else if (kony.application.getCurrentForm().id == "frmTaskExecutionKA" || kony.application.getCurrentForm().id == "frmTaskResourcesListKA" || kony.application.getCurrentForm().id == "frmOrderResourcesListKA") {
                scopeObj.setFormModelInfo("workorderStatus", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderStatus"));
                scopeObj.setFormModelInfo("taskStatus",  appContext.getFormController("frmTaskExecutionKA").getControllerExtensionObject().getFormModelInfo("tStatusID"));
                scopeObj.setMasterDataForListBox(dataMap.FlexFetchDataUoMKA, formData["unitDesc"], formData["uomId"]);
            }
			var toDisplayFooter= !formData["key"] || formData["Quantity"]; // To check if it is from local inventory or from Workordermaterial with quantity 0 i.e deleted resource
            var prevFormFlag = (scopeObj.getFormModelInfo("prevForm") == 'frmOrderResourcesListKA' && kony.servicesapp.CONNECTOR=="CRM") || kony.application.getCurrentForm().id == "frmTaskExecutionKA" || kony.application.getCurrentForm().id == "frmTaskResourcesListKA";
            if ((prevFormFlag&& formData["isConsumable"] != 'N'&&  formData["isConsumed"] != 'Y' && (scopeObj.getFormModelInfo("workorderStatus") && scopeObj.getFormModelInfo("workorderStatus").toLowerCase() == "started" )&& (scopeObj.getFormModelInfo("taskStatus") && scopeObj.getFormModelInfo("taskStatus").toLowerCase() == "started"))&& toDisplayFooter) {
                formmodel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
            }
            else if(scopeObj.getFormModelInfo("prevForm") == 'frmOrderResourcesListKA' && kony.servicesapp.CONNECTOR=="CRM" && (scopeObj.getFormModelInfo("workorderStatus") && scopeObj.getFormModelInfo("workorderStatus").toLowerCase() == "started" )){
            formmodel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
            }
            else {
                formmodel.setViewAttributeByProperty("flxFooterKA", "isVisible", false);
            }
			formmodel.setViewAttributeByProperty("tbxQuantity1KA", "text", processedData["lblResourceUnitKA"]?processedData["lblResourceUnitKA"]:"1");
			var isEditFlow = true;
			var btnEditWidth = "49%";
			var editText = utilitiesObj.geti18nValueKA("i18n.common.deitValueKA");
            if(!scopeObj.getFormModelInfo("workOrderMaterial_Id")){  
				isEditFlow = false;
				btnEditWidth = "100%";
				editText = utilitiesObj.geti18nValueKA("i18n.common.addValueKA");
                
                var contextData = scopeObj.getController().getContextData();
                var isGlobalSearchOn=contextData.getCustomInfo("isGlobalSearch");
                
                if (isGlobalSearchOn || (kony.application.getCurrentForm().id == "frmStockLocationListKA")) {
                    editText = utilitiesObj.geti18nValueKA("i18n.common.RaisePurchaseRequest");
                    formmodel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                    formmodel.setViewAttributeByProperty("btnEditKA", "isVisible", true);
                }		
			}else if(!utilitiesObj.roundNumber(formData["Quantity"], 2)){
				btnEditWidth = "100%";
				isEditFlow = false;
                editText = utilitiesObj.geti18nValueKA("i18n.common.addValueKA");
                formmodel.setViewAttributeByProperty("flxFooterKA", "isVisible", true);
                formmodel.setViewAttributeByProperty("btnEditKA", "isVisible", true);
			}
			formmodel.setViewAttributeByProperty("btnEditKA", "text",editText );
			formmodel.setViewAttributeByProperty("btnDeleteKA", "isVisible", isEditFlow);
			formmodel.setViewAttributeByProperty("btnEditKA", "width", btnEditWidth);
            delete dataMap.FlexFetchDataUoMKA;
            dataMap["form"] = processedData;
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
			formmodel.showView();
        } catch (err) {
            var exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
	assignSkins: function(formmodel) {
		try {
			formmodel.setViewAttributeByProperty("btnSaveKA", "isVisible", false);
			formmodel.setViewAttributeByProperty("btnBackKA", "skin", "sknBtnbackarrowKA");
			formmodel.setViewAttributeByProperty("btnBackKA", "focusSkin", "sknBtnbackarrowFocKA");
			formmodel.setViewAttributeByProperty("lblHeaderKA", "text", utilities.getUtilityObj().geti18nValueKA("i18n.order.frmResourceExecutionKA.lblHeaderValueKA"));
		} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic assignSkins : " + error);
        }
	},
	assignValues: function(formData) {
		try {
			var scopeObj = this;
			var processedData = {};
			var utilitiesObj = utilities.getUtilityObj();
			processedData["lblResourceName1KA"] = utilitiesObj.dataTruncation(formData["Description"], 22, 3, "...").value;
			processedData["lblResourceNumberKA"] = formData["id"];
			processedData["lblResourceUnitKA"] = formData["Quantity"]?formData["Quantity"]+"":"";
			processedData["lblMeasureValueKA"] = formData["baseUnitDesc"];
			processedData["lblMaterialTypeKA"] = formData["mat_type"];
			if(formData["ModelNumber"]=="NULL")
                 processedData["lblModelValueKA"] = "";
            else
              processedData["lblModelValueKA"] = formData["ModelNumber"];
            if(formData["Barcode"]=="NULL")
                processedData["lblBarcodeValueKA"] = "";
            else
              processedData["lblBarcodeValueKA"] = formData["Barcode"];
            if(formData["PartNumber"]=="NULL")   
              processedData["lblPartNumberValueKA"] = "";
            else
              processedData["lblPartNumberValueKA"] = formData["PartNumber"];
			processedData["lblUnit1KA"] = formData["Quantity"]?formData["ReqUnitDesc"]:"";
			processedData["lblDescriptionValueKA"] = formData["Description"];
			scopeObj.setFormModelInfo("workOrderMaterial_Id", formData["key"]);
			scopeObj.setFormModelInfo("InventoryID", formData["InvID"]);
			scopeObj.setFormModelInfo("InventoryQuantity", utilitiesObj.roundNumber(formData["invQuantity"], 2));
			scopeObj.setFormModelInfo("BaseUnitID", formData["baseunitId"]);
			scopeObj.setFormModelInfo("RequestedUnitID", formData["ReqId"]);
			scopeObj.setFormModelInfo("MaterialID", formData["id"]);
			scopeObj.setFormModelInfo("isConsumable",formData["isConsumable"]);
			scopeObj.setFormModelInfo("AssignedQuantity",formData["Quantity"]);
			return processedData;
		} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic assignValues : " + error);
        }
	},
    setMasterDataForListBox: function(data, selectedUoMValue, selectedUomId) {
        try {
            var masterData = [];
			var scopeObj = this;
            var selectedKey;
            var formmodel = scopeObj.getController().getFormModel();
            if(data.length === 0 ){
				formmodel.setViewAttributeByProperty("uomListBoxKA", "masterData", [[ formmodel.getViewAttributeByProperty("lblUnit1KA","text"),scopeObj.getFormModelInfo("RequestedUnitID")]]);
				return;
            }
			var lbxValue;
			var RequestedUnitID = scopeObj.getFormModelInfo("RequestedUnitID");
			var AssignedQuantity = scopeObj.getFormModelInfo("AssignedQuantity");
            for (var value in data) {
                lbxValue = [];
                lbxValue.push(data[value]["UnitFrom_id"]);
                lbxValue.push(data[value]["Description"]);
                if (data[value]["UnitFrom_id"] == RequestedUnitID) {
					selectedKey = data[value]["UnitFrom_id"];
                }else if(!AssignedQuantity){
					selectedKey = scopeObj.getFormModelInfo("BaseUnitID");
				}
                masterData.push(lbxValue);
            }
            formmodel.setViewAttributeByProperty("uomListBoxKA", "masterData", masterData);
			formmodel.setViewAttributeByProperty("uomListBoxKA","selectedKey",selectedKey);
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in setMasterDataForListBox", e);
        }
    },
    fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
			var scopeObj = this;
			var configObj = scopeObj.getController().getConfig();
			scopeObj.$class.$superp.fetchMasterData.call(scopeObj, configObj.getObjectServiceName(), configObj.getObjectServiceOptions(), successcallback, errorcallback);
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
            scopeObj.$class.$superp.saveData.call(scopeObj, success, error);
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
            scopeObj.$class.$superp.deleteData.call(scopeObj, success, error);
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
			var scopeObj = this;	
			var controller = scopeObj.getController();
            var formModel = controller.getFormModel();
			var appContext = controller.getApplicationContext();
            if (formModel.getViewAttributeByProperty("flxEdit1KA", "isVisible") == true) {
                scopeObj.showHidePopUp(false);
                formModel.setViewAttributeByProperty("lblHeaderKA", "text", utilities.getUtilityObj().geti18nValueKA("i18n.order.frmResourceExecutionKA.lblHeaderValueKA"));
            } else {
                if (scopeObj.getFormModelInfo("prevForm") == "frmOrderResourcesListKA" || scopeObj.getFormModelInfo("prevForm") == "frmTaskResourcesListKA") {
                    var viewType = appContext.getFormController(scopeObj.getFormModelInfo("prevForm")).getControllerExtensionObject().getFormModelInfo("viewType");
                    var navigationObject = new kony.sdk.mvvm.NavigationObject();
                    navigationObject.setQuery("segSwipeKA", kony.servicesapp.ResourcesQuery[viewType], "sql");
                    var queryParams = {};
					var search='';
					var searchInfo = appContext.getFormController(scopeObj.getFormModelInfo("prevForm")).getControllerExtensionObject().getFormModelInfo("searchData");
					if(searchInfo && searchInfo.isSearch){search = searchInfo.text;}
					var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
					var taskExecutionFormControllerExtension = appContext.getFormController("frmTaskExecutionKA").getControllerExtensionObject();                    
                    if (viewType) {
                        switch (viewType) {
                            case "ORDER":
                                queryParams["x"] = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId");
                                break;
                            case "TASK":
                                queryParams["x"] = taskExecutionFormControllerExtension.getFormModelInfo("taskID");
                                break;
                            default:
							    queryParams["x"] = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId");
							    queryParams["y"] = taskExecutionFormControllerExtension.getFormModelInfo("taskID")?taskExecutionFormControllerExtension.getFormModelInfo("taskID"):"";
                                break;
                        }
						queryParams["search"]="%"+search+"%";
                        navigationObject.setQueryParams("segSwipeKA", queryParams);
                    } 
                }
                scopeObj.$class.$superp.showPreviousForm.call(scopeObj, true, scopeObj.getFormModelInfo("prevForm"));
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in navigate back of resource execution : " + error);
        }
    },
	navigateToResourceDetails: function() {
        try {
			var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            var contextData = scopeObj.getController().getContextData();
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            datamodel.setPrimaryKeyValueMap({"id":contextData.getCustomInfo("MaterialId")});
            var queryParams = {};
            var materialInfo = contextData.getCustomInfo("MaterialId");
            queryParams["x"] = materialInfo;
            if (contextData.getCustomInfo("womID")) {
                queryParams["y"] = contextData.getCustomInfo("womID");               
            } 
            if(!scopeObj.getFormModelInfo("AssignedQuantity")  || scopeObj.getFormModelInfo("viewTypeOfPrevForm") == kony.servicesapp.LOCAL ){
            	navigationObject.setQuery("form",kony.servicesapp.ResourcesQuery[kony.servicesapp.RESOURCEDETAILS_INVENTORY], "sql");
            	queryParams={};
            	queryParams["x"] = materialInfo;
            }else if( scopeObj.getFormModelInfo("prevForm") == "frmOrderResourcesListKA" ){			
				navigationObject.setQuery("form",kony.servicesapp.ResourcesQuery[kony.servicesapp.ORDERRESOURCES_RESOURCEDETAILS], "sql");	
				queryParams["y"] = contextData.getCustomInfo("WorkOrderId");
				queryParams["z"] = scopeObj.getFormModelInfo("isConsumable")
			}
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", queryParams);
            scopeObj.navigateTo("frmOrderResourceDetailsKA", navigationObject);        
        }catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic navigateToResourceDetails : " + err);
		}
    },
    convertToBase:function(quantity,uomFrom){
		try {
			var scopeObj = this;
			var controller = scopeObj.getController();			
            var configObj = controller.getConfig();
    		var uomentityController = controller.getApplicationContext().getModel("UnitConversion",configObj.getObjectServiceName(),configObj.getObjectServiceOptions());
            var query = "select uom.Factor from UnitConversion uom where uom.UnitFrom_id = '" + uomFrom + "' and uom.UnitTo_id = '" + scopeObj.getFormModelInfo("BaseUnitID") + "' and uom.Material_id = '" + controller.getContextData().getCustomInfo("MaterialId") + "'";
            var queryobj = new kony.sdk.mvvm.Query(query, "sql");
            var dataSuccess = function(response) {
				var factor = 1;
				if (response.length != 0) {
					factor = response[0]["Factor"];
				}
				return quantity * utilities.getUtilityObj().roundNumber(factor, 2);
			}
			var dataError = function(response) {
				alert("Unable to fetch conversion");
				return -1;
			}
			uomentityController.executeSelectQuery(queryobj.getQuery().query, dataSuccess, dataError);
		} catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic convertToBase : " + err);
		}		
    },
    updateQuantity: function(bool) { // bool is true in case of edit, false in case of delete
        try {
			var scopeObj = this;
			var controller = scopeObj.getController();
            var utilitiesObj = utilities.getUtilityObj();
			var configObj = controller.getConfig();
            var formmodel = controller.getFormModel();
            var isUpdate = true;
			var IsReturn = false;
			var re = new RegExp(/^[0-9]{0,10}(\.[0-9]{1,3})?$/);
            var quantity = formmodel.getViewAttributeByProperty("tbxQuantity1KA", "text");
			if(!bool)quantity = 0;
            var toBaseQuantity;
			var invQuantity = utilitiesObj.roundNumber(scopeObj.getFormModelInfo("InventoryQuantity"), 2);		
            if(re.test(quantity)){
				quantity = utilitiesObj.roundNumber(quantity, 2);
				toBaseQuantity=quantity;
            }else{alert(utilitiesObj.geti18nValueKA("i18n.common.quantityLengthErrorValueKA"));return;} //CREATE I18
				function updateMaterial(response) {
					if (response) {
						scopeObj.updateTaskMaterial(quantity,formmodel.getViewAttributeByProperty("uomListBoxKA", "selectedKey"),toBaseQuantity,isUpdate); //update modified quantity with new uom in case uom has also been modified
					} 
				}
			var removeMessage = utilitiesObj.geti18nValueKA("i18n.common.removeMaterialError.ValueKA");
			(scopeObj.getFormModelInfo("workOrderMaterial_Id")) ? (quantity ?  isUpdate=true : (utilitiesObj.roundNumber(scopeObj.getFormModelInfo("AssignedQuantity"),2)?(kony.sdk.mvvm.Util.callAlert(removeMessage, "info",updateMaterial, "", "Ok", ""),IsReturn = true):(alert(utilitiesObj.geti18nValueKA("i18n.common.addMaterialError.ValueKA")),IsReturn = true))) :(quantity ?  isUpdate=false : (alert(utilitiesObj.geti18nValueKA("i18n.common.addMaterialError.ValueKA")), IsReturn = true)) 
			if(IsReturn)return;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            if (scopeObj.getFormModelInfo("RequestedUnitID") && scopeObj.getFormModelInfo("RequestedUnitID") !==  scopeObj.getFormModelInfo("BaseUnitID") ){
				var uomentityController = controller.getApplicationContext().getModel("UnitConversion",configObj.getObjectServiceName(),configObj.getObjectServiceOptions());
				var query = "select uom.Factor from UnitConversion uom where uom.UnitFrom_id = '" + scopeObj.getFormModelInfo("RequestedUnitID") + "' and uom.UnitTo_id = '" + scopeObj.getFormModelInfo("BaseUnitID") + "' and uom.Material_id = '" + controller.getContextData().getCustomInfo("MaterialId") + "'";
				var queryobj = new kony.sdk.mvvm.Query(query, "sql");
				var dataSuccess = function(response) {
				var factor = 1;
				if (response.length != 0) {
					factor = response[0]["Factor"];
				}
				toBaseQuantity= quantity* utilitiesObj.roundNumber(factor,2);
				}
				var dataError = function(response) {
					alert("Unable to fetch conversion"); //create i18n
					return -1;
				}
				uomentityController.executeSelectQuery(queryobj.getQuery().query, dataSuccess, dataError);
            }
			if (!re.test(toBaseQuantity)){alert(utilitiesObj.geti18nValueKA("i18n.common.quantityLengthErrorValueKA"));kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();return;}
			if((toBaseQuantity>invQuantity) && quantity){
				var message = utilitiesObj.geti18nValueKA("i18n.common.inventoryMaterialError.ValueKA");
				kony.sdk.mvvm.Util.callAlert(message, "info",updateMaterial, "", "Ok", "");	
			}else{
				scopeObj.updateTaskMaterial(quantity,formmodel.getViewAttributeByProperty("uomListBoxKA", "selectedKey"),toBaseQuantity,isUpdate); //update modified quantity with new uom in case uom has also been modified
			}
        } catch (err) {
			this.showHidePopUp(false);
            kony.sdk.mvvm.log.error("error in Blogic updateQuantity : " + err);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
    },  
    updateTaskMaterial: function(value, uom,valueInBase,isUpdate) { // isUpdate specifies if update/add operation should be performed
        try {
			var scopeObj = this;
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var utilitiesObj = utilities.getUtilityObj();
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var configObj = scopeObj.getController().getConfig();
			value = Number(value);
            var orderExecutionFormControllerExtension = appContext.getFormController("frmOrderExecutionKA").getControllerExtensionObject();
            var taskExecutionFormControllerExtension = appContext.getFormController("frmTaskExecutionKA").getControllerExtensionObject();
			var womRecordObject;
			if(kony.application.getPreviousForm().id=='frmOrderResourcesListKA' && kony.servicesapp.CONNECTOR=='CRM'){
				womRecordObject = new objHandler("WorkOrderMaterial");
            }	
            else{
				womRecordObject = new objHandler(kony.servicesapp.ENTITY_TASKMATERIAL);
            }
            womRecordObject = scopeObj.assignValuesToWOMRecordObject(womRecordObject, value, orderExecutionFormControllerExtension, taskExecutionFormControllerExtension, uom);
            var womSuccess = function() {
				scopeObj.showHidePopUp(false);
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                scopeObj.navigateBack(true);
            };
            var womError = function(err) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.materialQuantity.updateError.ValueKA"));
				scopeObj.showHidePopUp(false);
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            };
			if(!value && scopeObj.getFormModelInfo("workOrderMaterial_Id")){
				womRecordObject.set("DELETED", 'D');
			}else{
				if(scopeObj.getFormModelInfo("workOrderMaterial_Id")){
					womRecordObject.set("DELETED", 'C');
				}else{
					womRecordObject.set("DELETED", 'A');
				}				
			}
            scopeObj.saveRecord(womRecordObject, womSuccess, womError);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			this.showHidePopUp(false);
            kony.sdk.mvvm.log.error("error in Blogic updateTaskMaterial : " + err);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
    },
    assignValuesToWOMRecordObject: function(womRecordObject, value, orderExecutionFormControllerExtension, taskExecutionFormControllerExtension, uom) {
		try {
			var scopeObj = this;
			var configObj = scopeObj.getController().getConfig();
			womRecordObject.set("RequestedQuantity", value);
			if(scopeObj.getFormModelInfo("workOrderMaterial_Id")){
				womRecordObject.set("Id", scopeObj.getFormModelInfo("workOrderMaterial_Id"));
			}else{
				womRecordObject.set("isConsumable", 'Y'); 
				womRecordObject.set("isConsumed", 'N'); 			
				womRecordObject.set("Task_id", taskExecutionFormControllerExtension.getFormModelInfo("taskNumber"));
				womRecordObject.set("TaskComp_id", taskExecutionFormControllerExtension.getFormModelInfo("taskID"));
				womRecordObject.set("Material_id", scopeObj.getFormModelInfo("MaterialID"));
				womRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
			}
			womRecordObject.set("WorkOrder_id", orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId"));
			womRecordObject.set("RequestedUnit_id", uom);
			womRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
			womRecordObject.setInfo("options", configObj.getObjectServiceOptions());
			return womRecordObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic assignValuesToWOMRecordObject : " + err);
        }
	},
    editQuantity: function() {
        try {
            var scopeObj=this;
            var contextData = scopeObj.getController().getContextData();
            var isGlobalSearchOn=contextData.getCustomInfo("isGlobalSearch");
            if (isGlobalSearchOn){
                var controller = scopeObj.getController();
                var formmodel = controller.getFormModel();
                var baseUnit=formmodel.getViewAttributeByProperty("lblMeasureValueKA","text");
                var materialDescription="Purchase Request";
                var requestedQuantityNumber="1";
                var reqUnitDescription=baseUnit;
                var selRecord ={
                    "MaterialDescription":materialDescription,
                    "RequestedQuantityNumber":requestedQuantityNumber,
                    "ReqUnitDescription":reqUnitDescription
                };
                var utilitiesObj = utilities.getUtilityObj();
                utilitiesObj.editQuantity(selRecord);
            }else{
                this.showHidePopUp(true);    
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic editQuantity : " + err);
        }
    },
    requestPurchase: function(quantity) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var formmodel = controller.getFormModel();

            var materialDescription=formmodel.getViewAttributeByProperty("lblResourceNumberKA", "text");
            var requestedQuantityNumber=quantity;
            var rowData ={
                "MaterialName":materialDescription,
                "RequestedQuantityNumber":requestedQuantityNumber
            };
            
            var utilitiesObj = utilities.getUtilityObj();
            utilitiesObj.showStockTransferPopup(true, rowData);
            formmodel.setViewAttributeByProperty("flxEditKA", "isVisible",true);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },  
    deviceBack: function() {
        utilities.getUtilityObj().doNothingOnDeviceBackKA();
    },
    showHidePopUp: function (showValue){
		try {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			var utilitiesObj = utilities.getUtilityObj();
			switch(showValue){
				case true:
					formModel.setViewAttributeByProperty("flxEdit1KA", "isVisible", true);
					formModel.performActionOnView("btnEditKA", "setEnabled", [false]);
					formModel.performActionOnView("btnDeleteKA", "setEnabled", [false]);
					formModel.setViewAttributeByProperty("btnBackKA", "skin", "sknBtnWhiteCloseKA");
					formModel.setViewAttributeByProperty("btnBackKA", "focusSkin", "sknBtnWhiteCloseFocKA"); 
					formModel.setViewAttributeByProperty("btnSaveKA", "isVisible", true);
					formModel.setViewAttributeByProperty("lblHeaderKA", "text", (scopeObj.getFormModelInfo("AssignedQuantity") ? utilitiesObj.geti18nValueKA("i18n.common.deitValueKA") : utilitiesObj.geti18nValueKA("i18n.common.addValueKA")));
					break;
				case false:
					formModel.setViewAttributeByProperty("flxEdit1KA", "isVisible", false);
					formModel.performActionOnView("btnEditKA", "setEnabled", [true]);
					formModel.performActionOnView("btnDeleteKA", "setEnabled", [true]);			
					formModel.setViewAttributeByProperty("flxFooterKA", "setEnabled", [true]);
					formModel.setViewAttributeByProperty("btnBackKA", "skin", "sknBtnbackarrowKA");
					formModel.setViewAttributeByProperty("btnBackKA", "focusSkin", "sknBtnbackarrowFocKA"); 
					formModel.setViewAttributeByProperty("btnSaveKA", "isVisible", false);
					formModel.setViewAttributeByProperty("lblHeaderKA", "text", utilitiesObj.geti18nValueKA("i18n.order.frmResourceExecutionKA.lblHeaderValueKA"));
					formModel.setViewAttributeByProperty("tbxQuantity1KA", "text", (formModel.getViewAttributeByProperty("lblResourceUnitKA","text")?formModel.getViewAttributeByProperty("lblResourceUnitKA","text"):"1"));
					formModel.setViewAttributeByProperty("uomListBoxKA","selectedKey",(scopeObj.getFormModelInfo("RequestedUnitID")?scopeObj.getFormModelInfo("RequestedUnitID"):scopeObj.getFormModelInfo("BaseUnitID")));
					break;  		
		    } 	
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showHidePopUp : " + err);
        }
    },
	showExtendedObjectFormKA: function() {
		try {
			var scopeObj = this;
			var orderExecutionFormControllerExtension = scopeObj.getController().getApplicationContext().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
			var workOrderId = orderExecutionFormControllerExtension.getFormModelInfo("WorkOrderId");
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			var query = "Select * from ExtendedAttributeValue exvalue where exvalue.PARENT_KEY = '{x}' and exvalue.OBJECT_TYPE = '{y}' and exvalue.PARENT_KEY2 = '{z}'";
			navigationObject.setQuery("segExtendedAttributesKA", query, "sql");
			navigationObject.setQueryParams( "segExtendedAttributesKA" , {
						'x': workOrderId,
						'y': kony.servicesapp.RESOURCEEXTENDEDATTRIBUTE,
						'z' :  scopeObj.getFormModelInfo("workOrderMaterial_Id")
					});
			navigationObject.addCustomInfo("WorkOrderId", workOrderId);
			navigationObject.addCustomInfo("from", "RESOURCE");
			scopeObj.navigateTo("frmExtendedAttributesKA", navigationObject);
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showExtendedObjectFormKA : " + err);
        }
	},
    showTaskAttachmentFormKA: function() {
		try {
			var scopeObj = this;
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			var applicationContext = scopeObj.getController() && scopeObj.getController().getApplicationContext();
			var frmTaskAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMTASKATTACHMENTKA);
			var frmTaskAttachmentsKAFormModel = frmTaskAttachmentsKAController && frmTaskAttachmentsKAController.getFormModel();
			frmTaskAttachmentsKAFormModel && frmTaskAttachmentsKAFormModel.setViewAttributeByProperty("lblHeaderKA", "text",  utilities.getUtilityObj().geti18nValueKA("i18n.common.ResourceImages.lblHeaderKA"));
			var query = "select MaterialAttachment.Media_Id AS BINARY_NAME FROM MaterialAttachment LEFT JOIN media ON MaterialAttachment.Media_Id = media.name INNER JOIN AttachmentType ON MaterialAttachment.AttachmentType_Id = AttachmentType.id  WHERE MaterialAttachment.Material_Id = '{x}'  AND  LOWER(AttachmentType.name) = 'images'";
			navigationObject.setQuery("form", query, "sql");
            navigationObject.getQuery(kony.servicesapp.FRMTASKATTACHMENTKA);
			navigationObject.setQueryParams("form", {
				'x': scopeObj.getFormModelInfo("MaterialID")
			});
			navigationObject.addCustomInfo("MaterialId", scopeObj.getFormModelInfo("MaterialID"));
			var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMTASKATTACHMENTKA).getControllerExtensionObject();
			controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMRESOURCEEXECUTIONKA);
			scopeObj.navigateTo(kony.servicesapp.FRMTASKATTACHMENTKA, navigationObject);
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showTaskAttachmentFormKA : " + err);
        }
	}, 
    navigateToResourceAttachment : function(){
       try{
       var scopeObj = this;
    var applicationContext = scopeObj.getController() && scopeObj.getController().getApplicationContext();
    var frmOrderAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMORDERATTACHMENTKA );
    var frmOrderAttachmentsKAFormModel = frmOrderAttachmentsKAController && frmOrderAttachmentsKAController.getFormModel();
    frmOrderAttachmentsKAFormModel && frmOrderAttachmentsKAFormModel.setViewAttributeByProperty("lblOrderAttachmentsKA", "text", utilities.getUtilityObj().geti18nValueKA("i18n.common.ResourceAttachmentTxtTitleKA"));
    var materialId = scopeObj.getFormModelInfo("MaterialID");
    var query = "select MaterialAttachment.Media_Id AS BINARY_NAME  FROM MaterialAttachment LEFT JOIN AttachmentType ON MaterialAttachment.AttachmentType_Id = AttachmentType.id LEFT JOIN media ON MaterialAttachment.Media_Id = media.name  WHERE AttachmentType.Name = 'Documents' AND Material_Id = '{x}'";
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    navigationObject.setQuery("segOrderAttachmentKA", query, "sql");
    navigationObject.setQueryParams("segOrderAttachmentKA", {
      "x": scopeObj.getFormModelInfo("MaterialID"),
    });
    navigationObject.addCustomInfo("MaterialId", scopeObj.getFormModelInfo("MaterialID"));
    var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDERATTACHMENTKA).getControllerExtensionObject();
    controllerExtension.setFormModelInfo("previousForm", "frmResourceExecutionKA");
    scopeObj.navigateTo(kony.servicesapp.FRMORDERATTACHMENTKA, navigationObject);
    }
  catch(err)
    {
        kony.sdk.mvvm.log.error("Error in Blogic showTaskAttachments : " + err);
    }
  }
});