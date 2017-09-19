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
 * @class frmCreateMeasurementKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmCreateMeasurementKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmCreateMeasurementKAControllerExtension#
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
//           	alert("RESPONSE IS : "+JSON.stringify(response) + " HEYY -> " + response["segOptionKA"][0]["Plant_id"]);
          	//var formmodel = scopeObj.getController.getFormModel();
       //   alert(response["segOptionKA"][0]["Plant_id"]);
          	scopeObj.setFormModelInfo("PlantId",response["segOptionKA"][0]["Plant_id"]);
          	scopeObj.setFormModelInfo("WorkCenterId",response["segOptionKA"][0]["WorkCenter_id"]);
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
     * @memberof frmCreateMeasurementKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
			var indexData = 0;
			while(data.segOptionKA[indexData]!=null)
			{
				data.segOptionKA[indexData].primaryKeyValueMap.objectType = data.segOptionKA[indexData].ObjectType;
              indexData++;
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
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmCreateMeasurementKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
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
     * @memberof frmCreateMeasurementKAControllerExtension#
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
     * @memberof frmCreateMeasurementKAControllerExtension#
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
     * @memberof frmCreateMeasurementKAControllerExtension#
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
   navigateBackToOrderExecution: function() {
        try {
           this.$class.$superp.showPreviousForm.call(this, true, "frmOrderExecutionKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  createMeasurementTask : function(){
  	  var scopeObj = this;
      var measurementDescriptionScope = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCreateMeasurementDescriptionKA").getControllerExtensionObject(); 
      var description = measurementDescriptionScope.getFormModelInfo("MeasureDescription");
      var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
      var workorderId = orderExecutionScope.getFormModelInfo("WorkOrderId");
      var utilitiesObj = utilities.getUtilityObj();
      var formmodel = scopeObj.getController().getFormModel();
      var selRecord = formmodel.getViewAttributeByProperty("segOptionKA","selectedItems")[0];
        var objectType =  selRecord.primaryKeyValueMap.objectType; 
   		var code =  selRecord.primaryKeyValueMap.Code;
    	var functionalLocationId = selRecord.primaryKeyValueMap.FunctionalLocation_id;
      var recordObject = new kony.sdk.mvvm.persistent.Record(kony.servicesapp.ENTITY_TASK);
          recordObject.set("Description", description);
          recordObject.set("WorkOrder_id", workorderId);
          recordObject.set("Status_id", kony.servicesapp.SCHEDULED);
  		  if(objectType == "IF")
  		    {
              if(functionalLocationId != ""){
  		      recordObject.set("FunctionalLocation_id",functionalLocationId);
              }
 	 	    }
		    else
  		    {
   		     recordObject.set("Asset_id",code);
    		 }
    	  recordObject.set("WorkCenter_id",scopeObj.getFormModelInfo("WorkCenterId"));
    	  recordObject.set("Plant_id",scopeObj.getFormModelInfo("PlantId"));
          recordObject.set("Type_id",kony.servicesapp.TaskTypeIDMeasurement);
    	  recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);          	
          recordObject.setInfo("options", kony.servicesapp.APP_OPTIONS);
          recordObject.setInfo("serviceName", kony.servicesapp.OE_OBJECT_SERVICE_NAME);
      try { 
            scopeObj.saveRecord(recordObject, onSuccess, onError);
          } catch (err){              
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
          }
    function onSuccess(res) {              	
             kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
              if (kony.sdk.mvvm.isNetworkAvailabile()) {
                  kony.servicesapp.backgroundSyncOnStatusChangeKA();
              }
      			//alert("SUCCESS AT BACK END");
              scopeObj.navigateBackToOrderExecution();
          }
    function onError(err) {
             alert(utilitiesObj.geti18nValueKA("i18n.frmNewTaskKA.errorWhileAddingTaskKA" + err));
          }
  }
});