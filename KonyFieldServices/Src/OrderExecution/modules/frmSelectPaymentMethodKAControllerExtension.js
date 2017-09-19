/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmSelectPaymentMethodKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmSelectPaymentMethodKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },    
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
  	processData: function(data) {
        try {
           var scopeObj = this;
           var formdata = data["flxTotalKA"];
           formdata[0]["TotalAmount"] = formdata[0]["TotalAmount"] + "$";
           var processedData = scopeObj.$class.$superp.processData.call(this, data);
           scopeObj.getController().bindData(processedData);
           return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    bindData: function(data) {
        try {
          	var scopeObj = this;
            var formmodel = this.getController().getFormModel();
            formmodel.clear();  
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
            this.$class.$superp.showPreviousForm.call(this, true, "frmInvoicePdfKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  	saveRecord: function(recordObject, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },
  	navigateToCardPayment: function() {
      	try {
            var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
			var workOrderID = orderExecutionScope.getFormModelInfo("WorkOrderId");
            var datamodel = new kony.sdk.mvvm.DataModel();
          	var scopeObj = this;
          	var configObj = scopeObj.getController().getConfig();
          	var invEntityController = scopeObj.getController().getApplicationContext().getModel("Invoice",configObj.getObjectServiceName(),configObj.getObjectServiceOptions());
			datamodel.setPrimaryKeyValueMap({"id":workOrderID});
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
          	var query = "Select inv.TotalAmount from Invoice inv WHERE inv.WorkOrder_id='"+workOrderID+"'";
          	var totalAmount;
          	var successCallBack = function (response) {
					totalAmount = response[0]["TotalAmount"];
        			navigationObject.addCustomInfo("invInfo", {
						"TotalAmount": totalAmount
					});	
            		scopeObj.navigateTo("frmCardPaymentKA", navigationObject);
				 
			};
			var dataError = function() {
			};
        	invEntityController.executeSelectQuery(query, successCallBack, dataError);
        } catch(err) {
          	alert("In catch");
            kony.sdk.mvvm.log.error("error in Blogic navigateToCardPayment Method : " + err);
        }
    },
	navigateToCashPayment: function(){
       try {
            var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
			var workOrderID = orderExecutionScope.getFormModelInfo("WorkOrderId");
            var datamodel = new kony.sdk.mvvm.DataModel();
			datamodel.setPrimaryKeyValueMap({"id":workOrderID});
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			navigationObject.setQueryParams("flxPaymentDetailsKA", {"x": workOrderID});
           this.navigateTo("frmCashPaymentKA",navigationObject);
        } catch(err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToCardPayment Method : " + err);
        }
      
    }
  	
});