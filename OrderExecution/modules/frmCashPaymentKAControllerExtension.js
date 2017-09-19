/*
 * Controller Extension class for frmOrderObjectKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmCashPaymentKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmCashPaymentKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
      	this.id = "";
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmCashPaymentKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.getController().processData(response);
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
     * @memberof frmCashPaymentKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
           var scopeObj = this;
           var processedData = scopeObj.$class.$superp.processData.call(this, data);
           scopeObj.getController().bindData(processedData);
           return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmCashPaymentKAControllerExtension#
     */
    bindData: function(data) {
        try {
          	var scopeObj = this;
            var formmodel = this.getController().getFormModel();
            formmodel.clear();  
			data["flxPaymentDetailsKA"]["lblTotalValueKA"].setData(data["flxPaymentDetailsKA"]["lblTotalValueKA"].getData()+"$");
            this.$class.$superp.bindData.call(this, data);
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
     * @memberof frmCashPaymentKAControllerExtension#
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
     * @memberof frmCashPaymentKAControllerExtension#
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
     * @memberof frmCashPaymentKAControllerExtension#
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
          	var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
			var workOrderID = orderExecutionScope.getFormModelInfo("WorkOrderId");
            var datamodel = new kony.sdk.mvvm.DataModel();
			datamodel.setPrimaryKeyValueMap({"id":workOrderID});
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			navigationObject.setQueryParams("flxTotalKA", {"x": workOrderID});
          	this.navigateTo("frmSelectPaymentMethodKA",navigationObject);
        } catch(err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToSelectPaymentMethod : " + err);
        }
    },
   saveRecord: function(recordObject, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },
	/*This method is used to Format the UI when partial payment is done*/
  	FormatUI:function(){
		try{
      	     var scopeObj = this;
		     var controller = scopeObj.getController();
             var formmodel = controller.getFormModel();
		     var paid = scopeObj.getFormModelInfo("totalPaid");
		     var balance = scopeObj.getFormModelInfo("Balance");
		     formmodel.setViewAttributeByProperty("lblPaymentSummaryKA", "text", kony.i18n.getLocalizedString("i18n.common.PaymentSummaryKA"));
      	     formmodel.setViewAttributeByProperty("flxPaymentDetailsKA","isVisible",false);
      	     formmodel.setViewAttributeByProperty("flxPaymentBalanceDetailsKA","isVisible",true);
		     formmodel.setViewAttributeByProperty("lblTotalPaidValueKA","text",paid);
		     formmodel.setViewAttributeByProperty("lblBalanceValueKA","text",balance);
		     formmodel.setViewAttributeByProperty("tbxAmountKA","text",balance);
		}
		catch(err){
		      kony.log.info("error in BLogic of CashPayment FormatUI "+err);
		}
		
    },
    /* shows popup of payment confirmation and navigates to Complete Order screen */ 
  	navigateToCompleteOrder:function(workOrderID,paid){
	         var scopeObj = this;
	         var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA").getFormModel();
             formmodel.setViewAttributeByProperty("flxPaymentConfirmation","isVisible",true);
             formmodel.setViewAttributeByProperty("lblAmountKA","text",paid+"$");
             formmodel.setViewAttributeByProperty("lblWorkorderKA","text", workOrderID);
             var datamodel = new kony.sdk.mvvm.DataModel();
			 datamodel.setPrimaryKeyValueMap({"id":workOrderID});
		     var navigationObject = new kony.sdk.mvvm.NavigationObject();
			 navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			 navigationObject.setQueryParams("flxContactNameKA", {"x": workOrderID});
             navigationObject.setQueryParams("flxContainerPaymentKA", {"x": workOrderID});
			 navigationObject.setQueryParams("flexDetailsKA", {"x": workOrderID});
			 navigationObject.addCustomInfo("woInfo", {
							"woStatusID": "Completed",
							"woID": workOrderID
			});		    
			scopeObj.navigateTo("frmCompleteOrderKA", navigationObject);
      		dismissPopUp("PaymentConfirmation",3,scopeObj.doAutoSync);
		

    },
    /* Hides the popup and performs a Sync */
    doAutoSync : function(){
            var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA").getFormModel();
            formmodel.setViewAttributeByProperty("flxPaymentConfirmation","isVisible",false);
            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                            kony.servicesapp.backgroundSyncOnStatusChangeKA();
            }
            kony.timer.cancel("PaymentConfirmation");
    },
	/* This method is used to create a record in Payments table*/
	createPaymentRecord:function(){
		try{
			   var scopeObj = this;
			   var controller = scopeObj.getController();
			   var formmodel = controller.getFormModel();
			   var objHandler = kony.sdk.mvvm.persistent.Record;
			   var recordObject = new objHandler("Payment");
			   if(formmodel.getViewAttributeByProperty("flxPaymentDetailsKA","isVisible")===true){
			        var total = parseFloat(parseFloat(formmodel.getViewAttributeByProperty("lblTotalValueKA", "text")).toFixed(2));
					var paid = parseFloat(parseFloat(formmodel.getViewAttributeByProperty("tbxAmountKA", "text")).toFixed(2));
			        scopeObj.setFormModelInfo("totalAmount", total);
					scopeObj.setFormModelInfo("totalPaid",paid);
					recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
				}
				else{
					var paid = scopeObj.getFormModelInfo("totalPaid")+parseFloat(parseFloat(formmodel.getViewAttributeByProperty("tbxAmountKA", "text")).toFixed(2));
					scopeObj.setFormModelInfo("totalPaid",paid);
				}
				var total = scopeObj.getFormModelInfo("totalAmount");
				var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
				var workOrderID = orderExecutionScope.getFormModelInfo("WorkOrderId");		
                recordObject.set("WorkOrder_id",workOrderID );
				recordObject.set("PaymentType_id","CASH");
				recordObject.set("TotalAmount",total);
				recordObject.set("PaidAmount",paid);
          		scopeObj.setFormModelInfo("Balance",total-paid);
				var configObj = controller.getConfig();
				recordObject.setInfo("serviceName", configObj.getObjectServiceName());
				recordObject.setInfo("options", configObj.getObjectServiceOptions());
				var OnSuccess = function(res) {
						kony.sdk.mvvm.log.info("Update successful");
						scopeObj.navigateToCompleteOrder(workOrderID,paid);
				};
				var OnError = function(res) {
						kony.sdk.mvvm.log.info("Update Failed");
				};
				if(paid<=total){
						scopeObj.saveRecord(recordObject, OnSuccess, OnError);
						/*if(paid<total)
						  scopeObj.FormatUI();*/
				}
				else{
						alert("Paid amount should be less than total amount");
				}
		  
		}
		catch(err){
				kony.sdk.log.info("error in Blogic of createPaymentRecord "+err);
	}
   }
});