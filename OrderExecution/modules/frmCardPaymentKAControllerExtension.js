/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmCardPaymentKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmCardPaymentKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },    
    fetchData: function() {
        try {
            var scopeObj = this;
            scopeObj.$class.$superp.fetchData.call(scopeObj, success, error);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension"+err.toString());
        }
        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.bindData(response);
        }
        function error(err) {
            kony.sdk.mvvm.log.info("In fetchData errorcallback in controller extension "+JSON.stringify(err));
        }
    },    
  	bindData:function(data)
  	{
  		var formmodel=this.getController().getFormModel();
      	formmodel.showView();
	},
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmCompleteOrderKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  	navigateToSummaryForm: function() {
        try {
			var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSummaryKA");
      		var formModel = controller.getFormModel();
      		formModel.showView();
          
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToSummaryForm method : " + err);
        }
    },
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
  	createPaymentRecord: function(amount) {
      	try {
        	var scopeObj = this;
      		var controller = scopeObj.getController();
      		var formmodel = controller.getFormModel();
      		var objHandler = kony.sdk.mvvm.persistent.Record;
      		var recordObject = new objHandler("Payment");
          	var total = parseFloat(amount);
          	var paid = parseFloat(amount);
          	scopeObj.setFormModelInfo("totalAmount", total);
     		scopeObj.setFormModelInfo("totalPaid",paid);
     		recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
          	var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
    		var workOrderID = orderExecutionScope.getFormModelInfo("WorkOrderId");  
            recordObject.set("WorkOrder_id",workOrderID );
    		recordObject.set("PaymentType_id","PAYPAL");
    		recordObject.set("TotalAmount",total);
    		recordObject.set("PaidAmount",paid);
          	var configObj = controller.getConfig();
    		recordObject.setInfo("serviceName", configObj.getObjectServiceName());
    		recordObject.setInfo("options", configObj.getObjectServiceOptions());
          	var OnSuccess = function(res) {
      			kony.sdk.mvvm.log.info("Update successful");
                scopeObj.navigateToCompleteOrder(workOrderID,paid);
			};
          	var OnError = function(res) {
              	alert("Error saving record!");
      			kony.sdk.mvvm.log.info("Update Failed");
    		};
          	if(paid <= total){
      			scopeObj.saveRecord(recordObject, OnSuccess, OnError);
    		}
   			else{
      			alert("Paid amount should be less than total amount");
    		}
        } catch(err) {
          kony.sdk.mvvm.log.error("error in Blogic createPaymentRecord method : " + err);
        }
    }
  	
});