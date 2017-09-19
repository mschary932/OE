/*
 * Controller Extension class for frmCompleteOrderKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmCompleteOrderKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
        this.isOrderComplete = false;
        this.ADDRESS_LENGTH = 47;
        this.NO_OF_DOTS_AFTERTRUNCATION = 3;
		this.paymentId = null;
      	this.SResp_id=null;
      	this.SurveyIDsLength=null;
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this);
            var contextData = this.getController().getContextData();
            this.setFormModelInfo("WorkOrderId", contextData.getCustomInfo("woInfo").woID);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
        }
    },
    processData: function(data) {
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
          	scopeObj.SurveyIDsLength=null;
            var processedData = scopeObj.$class.$superp.processData.call(scopeObj, data);
            scopeObj.setFormModelInfo("WorkOrderId", controller.getContextData().getCustomInfo("woInfo").woID);
            controller.bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            //kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };

    },
    formatData: function(dataMap) {
        var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME");
        dataMap["form"][0]["ActualStartDate"] = convertTimeZone(moment(dataMap["form"][0]["ActualStartDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, timeFormat);
        dataMap["form"][0]["ActualEndDate"] = convertTimeZone(moment(dataMap["form"][0]["ActualEndDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, timeFormat);
        return dataMap;
    },
    bindData: function(dataMap) {
        try {
            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            formmodel.clear();
            dataMap = scopeObj.formatData(dataMap);
            var formData = dataMap["form"][0];
            var isResponseSaved = true;
            var utilitiesObj = utilities.getUtilityObj();
            var addressData;
            var processedData = scopeObj.setSegData(formData);
			var paymentID = dataMap["flxContainerPaymentKA"] ? dataMap["flxContainerPaymentKA"] : null;
           	scopeObj.paymentId = paymentID;
            var surveyIDs = dataMap["flexDetailsKA"] ? dataMap["flexDetailsKA"] : null;
            if (surveyIDs) {
                isResponseSaved = scopeObj.setUICompleteOrder(surveyIDs, isResponseSaved);
            }
            if(kony.servicesapp.CONNECTOR !== "CRM"){
			formmodel.setViewAttributeByProperty("flxContainerPaymentKA", "isVisible", true);
            if (paymentID.length !== 0 ){
					kony.servicesapp.paymentDone = true;
                	paymentdone = true;
                    formmodel.setViewAttributeByProperty("btnFourKA", "skin", "sknBtnFF5D6EClanProNews24KA");
                    formmodel.setViewAttributeByProperty("btnFourKA", "focusSkin", "sknBtnFF5D6EClanProNews24KA");
            } else {
					kony.servicesapp.paymentDone = false;
                    paymentdone = false;
                    formmodel.setViewAttributeByProperty("btnFourKA", "skin", "sknBtn1C3F64ClanProNews24KA");
                    formmodel.setViewAttributeByProperty("btnFourKA", "focusSkin", "sknBtn1C3F64ClanProNews24KA");
            }
            }
           else {
				kony.servicesapp.paymentDone = false;
                formmodel.setViewAttributeByProperty("flxContainerPaymentKA", "isVisible", false);
                paymentdone = true;
                formmodel.setViewAttributeByProperty("btnThreeKA", "text","3");
            }
            formmodel.setViewAttributeByProperty("btnDoneKA", "isVisible", (isResponseSaved && paymentdone));
          	var contactData = dataMap["flxContactNameKA"] ? (dataMap["flxContactNameKA"][0] ? dataMap["flxContactNameKA"][0] : null) : null;
            var ContactprocessedData = {};
            if (contactData) {
                scopeObj.contactDetail = contactData["id"];
                var contactName = (contactData["FirstName"] ? contactData["FirstName"] : "") + " " + (contactData["LastName"] ? contactData["LastName"] : "");
                ContactprocessedData["lblNameKA"] = contactName;
                ContactprocessedData["lblOrderCompletedByKA"] = contactName;
            }
            dataMap["flxContactNameKA"] = ContactprocessedData;
            if (formData["Address"] && formData["Address"][0]) {
                addressData = utilitiesObj.getOrderAddress(formData["Address"][0]);
                processedData["lblOrderCompletionAddressKA"] = utilitiesObj.dataTruncation(addressData, scopeObj.ADDRESS_LENGTH, scopeObj.NO_OF_DOTS_AFTERTRUNCATION, "...").value;
            }
            dataMap["form"] = processedData;
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
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
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }
        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(res) {
            //Successfully deleting record
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }
        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    showWorkConfirmationform: function() {
        try {
            var scopeObj = this;
            var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
            var surveyDefinition_id = scopeObj.getFormModelInfo("SurveyIDs")[0];
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": workOrderID
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("flxContactNameKA", {
                "x": workOrderID
            });
            navigationObject.setQueryParams("flxProblemKA", {
                "x": workOrderID,
                "y": surveyDefinition_id
            });
            navigationObject.addCustomInfo("woInfo", {
                "woStatusID": scopeObj.statusID,
                "woID": workOrderID
            });
            if (surveyDefinition_id)
                scopeObj.navigateTo("frmWorkConfirmationKA", navigationObject);
            else
                alert(utilities.getUtilityObj().geti18nValueKA("i18n.order.frmCompleteOrder.noDataAlert"));
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    saveOrderComplete: function() {
        try {
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").performAction("completeWorkorder");
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    cancelOrderComplete: function() {
        try {
            var scopeObj = this;
            scopeObj.getController().getApplicationContext().getFormController("frmOrderResourcesListKA").getControllerExtensionObject().setFormModelInfo("isCommpleteOrderFlow", false);
            scopeObj.navigateBack();
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic cancelOrderComplete action : " + err);
        }
    },
    showCustomerSignOffForm: function() {
        try {
            var scopeObj = this;
            var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
          	var accept_index=scopeObj.SurveyIDsLength-1;
            var surveyDefinition_id = scopeObj.getFormModelInfo("SurveyIDs")[accept_index];
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": workOrderID
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("flxContactNameKA", {
                "x": workOrderID
            });
            navigationObject.setQueryParams("flxProblemKA", {
                "x": workOrderID,
                "y": surveyDefinition_id
            });
            navigationObject.setQueryParams("flxSignatureKA", {
                "x": workOrderID
            });
            navigationObject.addCustomInfo("woInfo", {
                "woStatusID": scopeObj.statusID,
                "woID": workOrderID
            });
            if (surveyDefinition_id)
                scopeObj.navigateTo("frmCustomerSignOffKA", navigationObject);
            else
                alert(utilities.getUtilityObj().geti18nValueKA("i18n.order.frmCompleteOrder.noDataAlert"));
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    showCompleteOrderSummaryform: function() {
        try {
            var scopeObj = this;
            var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
            var viewModel = scopeObj.getController().getFormModel();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": workOrderID
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x": workOrderID
            });
            navigationObject.addCustomInfo("woInfo", {
                "woStatusID": scopeObj.statusID,
                "woID": workOrderID
            });
            scopeObj.navigateTo("frmCompleteOrderSummaryKA", navigationObject);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },

    showAttachmentForm: function() {
        try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setQueryParams({
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTaskAttachmentKA").getControllerExtensionObject().setFormModelInfo("previousForm", "frmCompleteOrderKA");
            scopeObj.navigateTo("frmTaskAttachmentKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showAttachmentForm action : " + err);
        }
    },

    showWorkOrderResourcesForm: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            var formmodel = scopeObj.getController().getFormModel();
            datamodel.setPrimaryKeyValueMap({
                "id": scopeObj.getFormModelInfo("WorkOrderId")
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            var query;
          	if(kony.servicesapp.CONNECTOR=='CRM')
              query=kony.servicesapp.ResourcesQuery[kony.servicesapp.INORDERCRM];
            else if(kony.servicesapp.CONNECTOR=='ECC')
              query=kony.servicesapp.ResourcesQuery[kony.servicesapp.INORDERECC];
            navigationObject.setQuery("segSwipeKA",query,"sql");
            navigationObject.setQueryParams("segSwipeKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
            navigationObject.addCustomInfo("fromForm", "frmCompleteOrderKA");
            scopeObj.navigateTo("frmOrderResourcesListKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    showWorkOrderHistoryForm: function() {
        try {
            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": scopeObj.getFormModelInfo("WorkOrderId")
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("segOrderHistoryKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            scopeObj.navigateTo("frmOrderHistoryKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error(err);
        };
    },
    showCompleteImagesForm: function() {
		try {
			var scopeObj = this;
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			var applicationContext = scopeObj.getController() && scopeObj.getController().getApplicationContext();
			var frmTaskAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMTASKATTACHMENTKA);
			var frmTaskAttachmentsKAFormModel = frmTaskAttachmentsKAController && frmTaskAttachmentsKAController.getFormModel();
			frmTaskAttachmentsKAFormModel.setViewAttributeByProperty("lblHeaderKA", "text", utilities.getUtilityObj().geti18nValueKA("i18n.frmOrderAttachmentImagesKA.Title.ValueKA"));
			var query = "select BINARY_NAME from EAM_WO_ATTACHMENT where ORDER_NUM = '{x}' AND DOC_TYPE != 'SIGNATURE' UNION select BINARY_NAME from TaskAttachment where ORDER_NUM = '{x}'";
			navigationObject.setQuery("form", query, "sql");
            navigationObject.getQuery(kony.servicesapp.FRMTASKATTACHMENTKA);
			navigationObject.setQueryParams("form", {
				'x': scopeObj.getFormModelInfo("WorkOrderId")
			});
			navigationObject.addCustomInfo("WorkOrderID", scopeObj.getFormModelInfo("WorkOrderId"));
			var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMTASKATTACHMENTKA).getControllerExtensionObject();
			controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMCOMPLETEORDERKA);
			scopeObj.navigateTo(kony.servicesapp.FRMTASKATTACHMENTKA, navigationObject);
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showCompleteImagesForm : " + err);
        }
	}, 
    //this method navigates to images screen
    showOrderAttachments: function() {
        try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setQueryParams({
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTaskAttachmentKA").getControllerExtensionObject().setFormModelInfo("previousForm", "frmCompleteOrderKA");
            scopeObj.navigateTo("frmTaskAttachmentKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action showAttachmentsForm: " + err);
        }
    },
    showAttachmentsFormForWorkOrder: function() {
        try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
          	var utilitiesObj = utilities.getUtilityObj();
          	var applicationContext = scopeObj.getController() && scopeObj.getController().getApplicationContext();
          	var frmOrderAttachmentsKAController = applicationContext && applicationContext.getFormController(kony.servicesapp.FRMORDERATTACHMENTKA );
			var frmOrderAttachmentsKAFormModel = frmOrderAttachmentsKAController && frmOrderAttachmentsKAController.getFormModel();
			frmOrderAttachmentsKAFormModel.setViewAttributeByProperty("lblOrderAttachmentsKA", "text", utilitiesObj.geti18nValueKA("i18n.frmOrderAttachmentKA.Header.ValueKA"));
            navigationObject.setQueryParams("segOrderAttachmentKA", {
                "x": scopeObj.getFormModelInfo("WorkOrderId")
            });
            navigationObject.addCustomInfo("WorkOrderId", scopeObj.getFormModelInfo("WorkOrderId"));
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderAttachmentsKA").getControllerExtensionObject().setFormModelInfo("previousForm", "frmCompleteOrderKA");
            scopeObj.navigateTo("frmOrderAttachmentsKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action showAttachmentsForm: " + err);
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },
    setSegData: function(formData) {
        try {
            var processedData = {};
            processedData["lblStartDateKA"] = formData["ActualStartDate"];
            processedData["lblEndDateKA"] = formData["ActualEndDate"];
            processedData["lblCodeKA"] = formData["Code"];
            processedData["lblDescriptionKA"] = formData["Description"];
            processedData["lblStartTimeKA"] = formData["ActualStartDate"];
            processedData["lblEndTimeKA"] = formData["ActualEndDate"];
            processedData["lblOrderNumberKA"] = formData["Code"];
            processedData["lblOrderDetailsKA"] = formData["Description"];
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.log.error("==setSegData==>", err);
        }
    },
    setUICompleteOrder: function(surveyIDs, isResponseSaved) {
        try {
            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            var surveyIDsArray = [];
            var surveyResponseIDArray = [];
            var WorkOrderSurveyIDs = [];
            var responseID;
            var btnName = "Two";
          	for(var i = 0; i < surveyIDs.length; i++){
              if(surveyIDs[i].EventType_id==kony.servicesapp.WOCHECKLIST)
                btnName = "Two";
              else if(surveyIDs[i].EventType_id==kony.servicesapp.WOFINISH)
                {
                  if(surveyIDs[i].Status!='CANCELLED')
                  {  
                  btnName = "One";
                  scopeObj.SResp_id=surveyIDs[i].SurveyResponse_id;
                  }
                }
              else if(surveyIDs[i].EventType_id==kony.servicesapp.WOACCEPTANCE)
                btnName = "Three";
              surveyIDsArray.push(surveyIDs[i].SurveyDefinition_id);
                WorkOrderSurveyIDs.push(surveyIDs[i].id);
                responseID = surveyIDs[i].SurveyResponse_id;
                if (responseID) {
                    formmodel.setViewAttributeByProperty("btn" + btnName + "KA", "skin", "sknBtnFF5D6EClanProNews24KA");
                    formmodel.setViewAttributeByProperty("btn" + btnName + "KA", "focusSkin", "sknBtnFF5D6EClanProNews24KA");
                } else {
					if(btnName!="One")
						isResponseSaved = false;
                    formmodel.setViewAttributeByProperty("btn" + btnName + "KA", "skin", "sknBtn1C3F64ClanProNews24KA");
                    formmodel.setViewAttributeByProperty("btn" + btnName + "KA", "focusSkin", "sknBtn1C3F64ClanProNews24KA");
                }
                surveyResponseIDArray.push(responseID);
            }
            scopeObj.setFormModelInfo("WorkOrderSurveyIDs", WorkOrderSurveyIDs);
            scopeObj.setFormModelInfo("SurveyIDs", surveyIDsArray);
          	scopeObj.SurveyIDsLength = surveyIDsArray.length;
            scopeObj.setFormModelInfo("SurveyResponseIDs", surveyResponseIDArray);
          	 scopeObj.setFormModelInfo("SurveyIDsLength", scopeObj.SurveyIDsLength);
          	return isResponseSaved;
        } catch (err) {
            kony.sdk.mvvm.log.error("==setUICompleteOrder==>", err);
        }
    },
  	showCheckListform:function(){
      try {
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
			var eventId = kony.servicesapp.WOFINISH;
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
              	"x": workOrderID
            });
          
            navigationObject.addCustomInfo("SurveyInfo", {
                "WorkOrderID": workOrderID,
                "eventID": eventId,
              	"User_id":User_id,
            });
			navigationObject.addCustomInfo("SResp_id",scopeObj.SResp_id);        		
            
            scopeObj.navigateTo("frmSurveyKA", navigationObject);            

        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
      
    },
  	destroySurveyForm: function(){
		try {
           if(kony.application.getPreviousForm().id == "frmSurveyKA"||kony.application.getPreviousForm().id == "frmCompleteOrderKA"){
             frmSurveyKA.destroy();
           }                    

        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
    },
	navigateToTimeAndExpense:function(){
	  try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
            navigationObject.setQueryParams("SegTimeExpenseKA", {    
                'x': workOrderID,
            });
            navigationObject.addCustomInfo("WorkOrderStatus", "STARTED");
        	navigationObject.addCustomInfo("Status", "STARTED");
        	if(kony.servicesapp.paymentDone)
              {
               kony.servicesapp.STATUSFORTE="SCHEDULED"; 
              }
        	else
              {
            kony.servicesapp.STATUSFORTE="STARTED";
              }
            navigationObject.addCustomInfo("WorkOrderId", workOrderID);
            navigationObject.addCustomInfo("CompleteOrder", "CompleteOrder");
            scopeObj.navigateTo("frmTimeAndExpenseKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic ShowTimeAndExpenseFormKA : " + err);
        }
	},
	
	navigateToSummaryScreen: function(){
      try {
        var scopeObj = this;
        var formmodel = scopeObj.getController().getFormModel();
        if(scopeObj.paymentId && scopeObj.paymentId.length === 0) {
            
        	var workOrderID = scopeObj.getFormModelInfo("WorkOrderId");
        	var datamodel = new kony.sdk.mvvm.DataModel();
        	datamodel.setPrimaryKeyValueMap({"id":workOrderID});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
        	navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("flxSummaryKA", {"x": workOrderID});
			navigationObject.setQueryParams("flxDataKA", {"y": workOrderID});
        	navigationObject.addCustomInfo("woInfo", {
				"woID": workOrderID
			});	
        	navigationObject.setQueryParams("SegItemDetailsKA", {"y": workOrderID});
            scopeObj.navigateTo("frmSummaryKA", navigationObject);
        }
        
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action navigateToSummaryScreen: " + err);
        }
    }
});