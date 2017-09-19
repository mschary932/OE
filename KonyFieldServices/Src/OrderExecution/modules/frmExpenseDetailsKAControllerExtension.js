/*
 * Controller Extension class for frmExpenseDetailsKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmExpenseDetailsKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmExpenseDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        var scopeObj = this ;
        scopeObj.TimeExpenseType = null;
        scopeObj.formValue = null;
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmExpenseDetailsKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            var groupWidgetsList=[];
            var woTimeExpnsInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
            scopeObj.TimeExpenseType = woTimeExpnsInfo["WorkOrderTimeExpenseType"];
           if(woTimeExpnsInfo["formValue"] == "WorkOrderTimeExpense"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmExpenseDetailsKAConfig,"form","WorkOrderTimeExpense", kony.servicesapp.TAEDETAILSWO);                
                scopeObj.formValue = woTimeExpnsInfo["formValue"];
				groupWidgetsList=scopeObj.refreshEntityOfWidgets("WorkOrderTimeExpense");
            }
            else if(woTimeExpnsInfo["formValue"] == "Task"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmExpenseDetailsKAConfig,"form","TaskTimeExpense", kony.servicesapp.TAEDETAILSTASK);
                scopeObj.formValue = woTimeExpnsInfo["formValue"];
				groupWidgetsList=scopeObj.refreshEntityOfWidgets("TaskTimeExpense");
            }else if(woTimeExpnsInfo["formValue"] == "CompleteOrder"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmExpenseDetailsKAConfig,"form","WorkOrderTimeExpense", kony.servicesapp.TAEDETAILSCO);                
                scopeObj.formValue = woTimeExpnsInfo["formValue"];
                groupWidgetsList=scopeObj.refreshEntityOfWidgets("WorkOrderTimeExpense");
            }
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            if(groupWidgetsList && groupWidgetsList.length)
                this.$class.$superp.fetchData.call(this, success, error);
            else
                scopeObj.fetchData();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.getController().processData(response);
            //scopeObj.bindData(response);
        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmExpenseDetailsKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
             if(data&&data["form"]&&data["form"][0]&&data["form"][0]["ExecutionDate"]) {
              	var date = convertTimeZone(moment(data["form"][0]["ExecutionDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE"));
            	data["form"][0]["ExecutionDate"] = date;
            }
			if(scopeObj.TimeExpenseType == "EXPE"){
               	var amountDecimal = data["form"][0]["Amount"];
                var processedAmount = parseFloat(amountDecimal).toFixed(2);
                data["form"][0]["Amount"]=processedAmount;
                data["form"][0]["Currency_id"] = "USD";
            }
          	var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
	refreshEntityOfWidgets:function(entity)
	{
		var scopeObj=this;
		var widgetList=scopeObj.getController().getConfig().getWidgets();
		for (eachWidget in widgetList)
		{
			frmExpenseDetailsKAConfig[eachWidget]["fieldprops"]["entity"]=entity
		}
        var groupContext = scopeObj.getBaseFormControllerExtensionObj().createGroupWidgetsContext();
        var groupWidgets = groupContext.getFetchWidgetList() || [];
       return groupWidgets;
	},
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmExpenseDetailsKAControllerExtension#
     */
    bindData: function(data) {
        try {
			var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();			
			var woTimeExpnsInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo")
			formmodel.setViewAttributeByProperty("flxFooterKA" , "isVisible", true);					
            if(woTimeExpnsInfo["formValue"] == "WorkOrderTimeExpense"){
               if(woTimeExpnsInfo["WorkOrderStatus"].toUpperCase() == "STARTED") 
                    formmodel.setViewAttributeByProperty("flxFooterKA" , "isVisible", true);
               else
                    formmodel.setViewAttributeByProperty("flxFooterKA" , "isVisible", false);

            }else if(woTimeExpnsInfo["formValue"] =="Task"){
                if(woTimeExpnsInfo["TaskStatus"].toUpperCase() == "STARTED") 
                    formmodel.setViewAttributeByProperty("flxFooterKA" , "isVisible", true);
                else
                    formmodel.setViewAttributeByProperty("flxFooterKA" , "isVisible", false);
            }
			if(woTimeExpnsInfo["fromForm"]=="CompleteOrder"){
              if(kony.servicesapp.paymentDone)
              	{
					formmodel.setViewAttributeByProperty("flxFooterKA" , "isVisible", false);
				}
            }              
			
				if (data["form"]) {
                if(scopeObj.TimeExpenseType == "EXPE"){
                    formmodel.setViewAttributeByProperty("lblTaskDetailsKA", "text", kony.i18n.getLocalizedString("i18n.common.ExpenseDetailsKA"));
                    formmodel.setViewAttributeByProperty("lblExpenseKA", "text", kony.i18n.getLocalizedString("i18n.common.ExpenseKA")); 
                    formmodel.setViewAttributeByProperty("lblHeadingDurationKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblDurationKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblLineKA6" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblDurationUnitsKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblDurationValueKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblLineKA7" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("Image0cd4f36f19a6e4a", "src", "expense_small.png");
                    formmodel.setViewAttributeByProperty("lblHeadingAmountKA" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblAmountKA" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblLineKA3" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblHeadingCurrencyKA" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblCurrencyKA" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblLineKA4" , "isVisible", true);
					if(data["form"]["lblBillKA"].getData() == "X") {
                      	data["form"]["lblBillKA"].setData(kony.i18n.getLocalizedString("i18n.order.completeorderchecklist.yes.valueKA"));
                    }
                  	else {
                      	data["form"]["lblBillKA"].setData(kony.i18n.getLocalizedString("i18n.order.completeorderchecklist.no.valueKA"));
                    }
                  	formmodel.setViewAttributeByProperty("lblBillKA", "isVisible", true);
                }
                else if(scopeObj.TimeExpenseType == "TIME"){
                    formmodel.setViewAttributeByProperty("lblTaskDetailsKA", "text", kony.i18n.getLocalizedString("i18n.common.TimeDetailsKA"));
                    formmodel.setViewAttributeByProperty("lblExpenseKA", "text", kony.i18n.getLocalizedString("i18n.common.TimeKA"));
                    formmodel.setViewAttributeByProperty("lblHeadingDurationKA" , "isVisible", true);
					var duration = scopeObj.convertDurationToHours(data["form"]["lblDurationKA"].getData());
                  	data["form"]["lblDurationKA"].setData(duration);
                    formmodel.setViewAttributeByProperty("lblDurationKA" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblLineKA6" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblDurationUnitsKA" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblDurationValueKA" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("lblLineKA7" , "isVisible", true);
                    formmodel.setViewAttributeByProperty("Image0cd4f36f19a6e4a", "src", "time_small.png");
                    formmodel.setViewAttributeByProperty("lblHeadingAmountKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblAmountKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblLineKA3" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblHeadingCurrencyKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblCurrencyKA" , "isVisible", false);
                    formmodel.setViewAttributeByProperty("lblLineKA4" , "isVisible", false);
					if(data["form"]["lblBillKA"].getData() == "X") {
                      	data["form"]["lblBillKA"].setData(kony.i18n.getLocalizedString("i18n.order.completeorderchecklist.yes.valueKA"));
                    }
                  	else {
                      	data["form"]["lblBillKA"].setData(kony.i18n.getLocalizedString("i18n.order.completeorderchecklist.no.valueKA"));
                    }
					formmodel.setViewAttributeByProperty("lblBillKA", "isVisible", true);
                }
                
            }
			

            this.$class.$superp.bindData.call(this, data);
            //this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmExpenseDetailsKAControllerExtension#
     */
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
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmExpenseDetailsKAControllerExtension#
     */
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
    /** 
     * This method shows form.
     * @memberof frmExpenseDetailsKAControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
  
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
  
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmTimeAndExpenseKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
	
	convertDurationToHours: function(data) {
      	try {
          	var min = (data - Math.floor(data)) * 60;
            min = Math.round(min,2);
          	if(min < 10) {
				var res = Math.floor(data) + ":0" + min;
            }
          	else {
              var res = Math.floor(data) + ":" + min;
            }
          	return res;
        }
      catch(err) {
        	kony.sdk.mvvm.log.error("Error in converting duration : " + err);
      }
	},
  
    navigateToEditScreen: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            var TimeExpenCatgInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
            var recordID = TimeExpenCatgInfo["recordID"];
            var formmodel = scopeObj.getController().getFormModel();   
            var woTimeExpnsInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
            datamodel.setPrimaryKeyValueMap({
                "id": TimeExpenCatgInfo["WorkOrderTimeExpenseId"]
            });                                 
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x": TimeExpenCatgInfo["WorkOrderTimeExpenseId"]
            });
            if(scopeObj.formValue == "WorkOrderTimeExpense" || scopeObj.formValue == "CompleteOrder"){
                navigationObject.addCustomInfo("WorkOrderStatus",TimeExpenCatgInfo["WorkOrderStatus"]);
            }
            else if(scopeObj.formValue == "Task"){
                navigationObject.addCustomInfo("TaskStatus",TimeExpenCatgInfo["TaskStatus"]);
            }
            navigationObject.addCustomInfo("recordID",recordID);
            navigationObject.addCustomInfo("Edit","Edit");
            navigationObject.addCustomInfo("Id", TimeExpenCatgInfo["WorkOrderTimeExpenseId"]);
            navigationObject.addCustomInfo("Type", scopeObj.TimeExpenseType);
            navigationObject.addCustomInfo("Navigation", "Details");
            navigationObject.addCustomInfo("woTimeExpnsInfo", {
                "recordID": recordID,
                "formValue": woTimeExpnsInfo["formValue"],
                "WorkOrderStatus": TimeExpenCatgInfo["WorkOrderStatus"],
                "TaskStatus": TimeExpenCatgInfo["TaskStatus"]
            });
            if(scopeObj.TimeExpenseType == "TIME")
                scopeObj.navigateTo("frmAddEditTimeItemKA", navigationObject);
            else if(scopeObj.TimeExpenseType == "EXPE")
                scopeObj.navigateTo("frmAddEditExpenseItemKA", navigationObject);
          
    } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToAddEditTime/ExpenseForm from AddTimeExpenseKA: " + err);
        }
    },

    showTimeAndExpenseAttachmentImages: function(){
        try {
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var applicationContext = scopeObj.getController() && scopeObj.getController().getApplicationContext();
            var TimeExpenCatgInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
            var frmTimeAndExpenseAttachmentsKAController = applicationContext && applicationContext.getFormController("frmTimeAndExpenseAttachmentKA");
            var frmTimeAndExpenseAttachmentsKAFormModel = frmTimeAndExpenseAttachmentsKAController && frmTimeAndExpenseAttachmentsKAController.getFormModel();
            if(scopeObj.TimeExpenseType == "TIME")
                frmTimeAndExpenseAttachmentsKAFormModel && frmTimeAndExpenseAttachmentsKAFormModel.setViewAttributeByProperty("lblHeaderKA", "text",kony.i18n.getLocalizedString("i18n.common.TimeImagesKA.HeaderKA"));
            else if(scopeObj.TimeExpenseType == "EXPE")
                frmTimeAndExpenseAttachmentsKAFormModel && frmTimeAndExpenseAttachmentsKAFormModel.setViewAttributeByProperty("lblHeaderKA", "text",kony.i18n.getLocalizedString("i18n.common.ExpenseImagesKA.HeaderKA"));
            var Status = TimeExpenCatgInfo["TaskStatus"] || TimeExpenCatgInfo["WorkOrderStatus"];
            navigationObject.setQueryParams("form", {
                "x": TimeExpenCatgInfo["WorkOrderTimeExpenseId"]
            });
            navigationObject.addCustomInfo("recordID", TimeExpenCatgInfo["recordID"]);
            navigationObject.addCustomInfo("TimeExpenseID", TimeExpenCatgInfo["WorkOrderTimeExpenseId"]);
            navigationObject.addCustomInfo("formValue", scopeObj.formValue);
            navigationObject.addCustomInfo("Status", Status);
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controllerExtension = appContext.getFormController("frmTimeAndExpenseAttachmentKA").getControllerExtensionObject();
            controllerExtension.setFormModelInfo("previousForm", "frmTimeAndExpenseKA");            
            scopeObj.navigateTo("frmTimeAndExpenseAttachmentKA", navigationObject);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic showOrderAttachments : " + error);
        }
    },
	
	
	removeRecord: function() {
		try{
      	var scopeObj = this;
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
		var formModel = controller.getFormModel();
      	var Category_id =  formModel.getViewAttributeByProperty("lblExpenseDetailsKa" , "text");
      	var Description =  formModel.getViewAttributeByProperty("lblDescKA" , "text");
    	var oid = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
      	formModel.performActionOnView("flexMainKA","setEnabled",[false]);
		formModel.setViewAttributeByProperty("flxDeleteKA","isVisible",true);
    	formModel.setViewAttributeByProperty("lblIdKA", "text", Category_id);
        formModel.setViewAttributeByProperty("lblTypeKA", "text", Description);
       	dismissPopUp("deleteTimeExpenseRecord",3, scopeObj.updateRecord);
		}
		catch(err)
		{
			kony.sdk.mvvm.log.error(err.toString());
		}
 	},
  
  	updateRecord: function() {
		try{
		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
      	var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);	
      	var formModel = controller.getFormModel(); 
		var modelObj=controller.getConfig().getEntity();
      	var toid =controller.getContextData().getCustomInfo("woTimeExpnsInfo");
        var TimeExpenseModelObject = INSTANCE.getModel(modelObj, kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS);
        var dataObject = new kony.sdk.dto.DataObject(modelObj);
        var updateField = {};
        updateField.id = toid["WorkOrderTimeExpenseId"];
        updateField.DELETED = "D";
        dataObject.setRecord(updateField);
        TimeExpenseModelObject.update(dataObject, OnSuccess.bind(this), OnError);

        function OnSuccess(res) {
		
          formModel.setViewAttributeByProperty("flxDeleteKA","isVisible",false); 
          formModel.performActionOnView("flexMainKA","setEnabled",[true]);
          controller.performAction("navigateBack");          
          kony.timer.cancel("deleteTimeExpenseRecord");
          kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));

        }

        function OnError(err) {
			formModel.setViewAttributeByProperty("flxDeleteKA","isVisible",false); 
			formModel.performActionOnView("flexMainKA","setEnabled",[true]);
			controller.performAction("navigateBack");          
            kony.sdk.mvvm.log.error("In DeleteData errorcallback in controller extension ", err);            
            kony.sdk.mvvm.log.error(err.toString());
			kony.timer.cancel("deleteTimeExpenseRecord");
        } 
      
		}
	catch(err){
		kony.sdk.mvvm.log.error(err.toString());
		}
  	}
});