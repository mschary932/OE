/*
 * Controller Extension class for frmReadingExecution
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmReadingExecutionControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmReadingExecutionControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
		this.id = "";
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmReadingExecutionControllerExtension#
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
     * @memberof frmReadingExecutionControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
			data["flxTimeKA"][0]["UpperLimit"] = data["flxTimeKA"][0]["LowerLimit"] + "-" + data["flxTimeKA"][0]["UpperLimit"] + data["flxTimeKA"][0]["Unit_id"];
          	var contextData = this.getController().getContextData();
          	if(contextData.getCustomInfo("Action") !== "ADD"){
				this.id = data["flxValue"][0]["id"];
				data["flxValue"][0]["id"] = Number(data["flxValue"][0]["id"]) < 0 ? "" : data["flxValue"][0]["id"];
            }
			if(contextData.getCustomInfo("Action") === "DISPLAY"){			
				data["flxValue"][0]["MeasureDate"] = moment(data["flxValue"][0]["MeasureDate"], kony.servicesapp.DB_DATE_FORMAT).isValid() ? convertTimeZone(moment(data["flxValue"][0]["MeasureDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME")) : "";
              	if(!data["flxValue"][0]["Comment"]){
                    data["flxValue"][0]["Comment"] = " ";
                }
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
     * @memberof frmReadingExecutionControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
          	var contextData = this.getController().getContextData();
          	var action = contextData.getCustomInfo("Action");
          	if(action === "DISPLAY"){
              	formmodel.performActionOnView("tbxValue","setEnabled", [false]);
				formmodel.performActionOnView("tbxNote","setEnabled", [false]);
              	formmodel.setViewAttributeByProperty("btnDoneKA","isVisible",false);
                formmodel.setViewAttributeByProperty("btnCloseKA","isVisible",false);
                formmodel.setViewAttributeByProperty("btnBackKA","isVisible",true);
            } else {
              	formmodel.performActionOnView("tbxValue","setEnabled", [true]);
				formmodel.performActionOnView("tbxNote","setEnabled", [true]);
              	formmodel.setViewAttributeByProperty("btnDoneKA","isVisible",true);
                formmodel.setViewAttributeByProperty("btnCloseKA","isVisible",true);
                formmodel.setViewAttributeByProperty("btnBackKA","isVisible",false);
            }
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
			if(action !== "DISPLAY") {
				var time = moment().format("hh:mm A");
				formmodel.setViewAttributeByProperty("lblTimeKA","text",time);
			}
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
     * @memberof frmReadingExecutionControllerExtension#
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
     * @memberof frmReadingExecutionControllerExtension#
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
     * @memberof frmReadingExecutionControllerExtension#
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
	showPreviousForm: function(doReload) {
        var contextData = this.getController().getContextData();
        var navigationFrom = contextData.getCustomInfo("navigatingFrom");
        if(navigationFrom && navigationFrom=="MeasurementExecution"){
            this.$class.$superp.showPreviousForm.call(this,doReload,"frmMeasurementExecutionKA");
          }
       else{
        this.$class.$superp.showPreviousForm.call(this, doReload, kony.servicesapp.FRMMEASUREMENTREADINGS);
       }
    },
	saveMeasureValueRecord: function(){
	/** Called when a record is added/edited**/	
		var scopeObj = this;
		var formModel = scopeObj.getController() && scopeObj.getController().getFormModel();
		var value = formModel.getViewAttributeByProperty("tbxValue","text");
		var note = formModel.getViewAttributeByProperty("tbxNote","text");
		if(!value){
      		var utilitiesObj = utilities.getUtilityObj();       	
         	alert(utilitiesObj.geti18nValueKA("i18n.common.PleaseInputReadValue"));
			return;
		} else {
			var recordObject = scopeObj.getRecordObject(value,note);
			try {
				scopeObj.saveRecord(recordObject, onSuccess, onError);
			} catch (err) {
				kony.sdk.mvvm.log.error("error in Blogic saveMeasureValueRecord action : " + err);
			}
			function onSuccess(){
				kony.sdk.mvvm.log.error("Success adding record");
				scopeObj.showPreviousForm(true);
			}
			function onError(){
				kony.sdk.mvvm.log.error("Error while adding/updating value");
			}
		}
	},
	getRecordObject: function(value,note){
	/** To form the record object**/
		try{
			var recordObject = new kony.sdk.mvvm.persistent.Record(kony.servicesapp.ENTITY_MEASUREVALUE);
			var controller = this.getController();
			var contextData = controller.getContextData();
          	var workOrderId = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject().getFormModelInfo("WorkOrderId");
			var action = contextData.getCustomInfo("Action");
			recordObject.set("Value", value);
			recordObject.set("Comment", note);
			recordObject.set("MeasureDate", convertTimeZone(moment().format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT));
			if(action === "EDIT"){
				recordObject.set("id",this.id);
              	recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY); 
			} else if(action === "ADD"){
              	recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD); 
			} 
          	recordObject.set("MeasurePoint_id", contextData.getCustomInfo("MeasurementPoint_id"));
          	recordObject.set("Task_id", contextData.getCustomInfo("Task_id"));
          	recordObject.set("WorkOrder_id", workOrderId);
			recordObject.setInfo("options", kony.servicesapp.APP_OPTIONS);
			recordObject.setInfo("serviceName", kony.servicesapp.OE_OBJECT_SERVICE_NAME);
			return recordObject;
		} catch(err){
			kony.sdk.mvvm.log.error("Error in getRecordObject of controllerExtension");
		}
	}
});