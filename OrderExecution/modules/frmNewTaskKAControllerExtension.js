/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmNewTaskKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmNewTaskKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },    
    fetchData: function() {
        try {
            var scopeObj = this;
            scopeObj.setFormModelInfo("WorkOrderId", scopeObj.getController().getContextData().getCustomInfo("WorkOrderId"));
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
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    bindData: function(dataMap) {
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			scopeObj.setFormModelInfo("WorkOrderId", controller.getContextData().getCustomInfo("WorkOrderId"));
			scopeObj.$class.$superp.bindData.call(this, dataMap);
			controller.getFormModel().showView(); 
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic bindData : " + err);
		}		    
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
	saveTaskKA : function() {
        try {
			var scopeObj = this;
          	var description = scopeObj.getController().getFormModel().getViewAttributeByProperty("txtAreaTaskDescriptionKA", "text");
			description = description.replace(/\n/g," ");
          	var trimDesc = description.trim();
          	var formmodel = scopeObj.getController().getFormModel();
 		    formmodel.setViewAttributeByProperty("txtAreaTaskDescriptionKA", "text","");
          	var utilitiesObj = utilities.getUtilityObj();
          	if(description && trimDesc){
              	var WorkOrderId = scopeObj.getFormModelInfo("WorkOrderId");
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var ORMController = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createORMControllerObject(INSTANCE, kony.servicesapp.APP_OPTIONS);
                INSTANCE.getModel(kony.servicesapp.ENTITY_TASK, kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS).executeSelectQuery("select max(Task_num) Task_num from Task where WorkOrder_id = '"+WorkOrderId+"'", success, error);
                function success(response){                   
                  	var recordObject = new kony.sdk.mvvm.persistent.Record(kony.servicesapp.ENTITY_TASK);
					recordObject.set("Description", description);
                    recordObject.set("WorkOrder_id", WorkOrderId);
                    recordObject.set("Status_id", kony.servicesapp.SCHEDULED);
                 	 recordObject.set("Type_id",kony.servicesapp.TaskTypeIDTask);
                     recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);          	
                    recordObject.setInfo("options", kony.servicesapp.APP_OPTIONS);
                    recordObject.setInfo("serviceName", kony.servicesapp.OE_OBJECT_SERVICE_NAME);
                    try {
                        scopeObj.saveRecord(recordObject, onSuccess, onError);
                    } catch (err) {
                        kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
                    }
                    function onSuccess(res) {              	
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                        if (kony.sdk.mvvm.isNetworkAvailabile()) {
                            kony.servicesapp.backgroundSyncOnStatusChangeKA();
                        }
                        scopeObj.navigateBack();
                    }
                    function onError(err) {
                        alert(utilitiesObj.geti18nValueKA("i18n.frmNewTaskKA.errorWhileAddingTaskKA"));
                    }
                }
                function error(err){
                    alert(utilitiesObj.geti18nValueKA("i18n.frmNewTaskKA.errorWhileAddingTaskKA"));
                }
          	}else{              	
              	alert(utilitiesObj.geti18nValueKA("i18n.frmNewTaskKA.mandDescKA"));
              	return;              	
            }			
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  	 navigateBackToOrderExecution: function() {
        try {
			var scopeObj = this;
  	 	  	var formmodel = scopeObj.getController().getFormModel();
 		    formmodel.setViewAttributeByProperty("txtAreaTaskDescriptionKA", "text","");
	        this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
          
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    }
});