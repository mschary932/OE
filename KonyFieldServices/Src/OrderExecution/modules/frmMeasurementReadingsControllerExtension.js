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
 * @class frmMeasurementReadingsControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmMeasurementReadingsControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
      	var scopeObj = this;
        scopeObj.$class.$super.call(scopeObj, controllerObj);
      	scopeObj.id = "";
      	scopeObj.dateFlag="";
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmMeasurementReadingsControllerExtension#
     */
    fetchData: function() {
        try {
          	var scopeObj = this;
			scopeObj.$class.$superp.fetchData.call(scopeObj,success,error);
        }catch (err) {
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
     * @memberof frmMeasurementReadingsControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
          	var controller = this.getController();
          /*	var task_num = controller.getContextData().getCustomInfo("Task_id");
          	if(data["form"][0]["Task_id"] === task_num){
              	var date = moment(data["form"][0]["MeasureDate"], kony.servicesapp.DB_DATE_FORMAT).isValid() ? convertTimeZone(moment(data["form"][0]["MeasureDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME")) : "";
              	if(date !== ""){
                    date = date.split(",");
                    date = date[1].trimLeft() + "," + date[0];
                }
                data["form"][0]["MeasureDate"] = date;
            } else{
              	data["form"][0]["MeasureDate"] = "";
            } */
          	if(data["flexDetailsKA"] && data["flexDetailsKA"][0]){
                var date = moment(data["flexDetailsKA"][0]["MeasureDate"], kony.servicesapp.DB_DATE_FORMAT).isValid() ? convertTimeZone(moment(data["flexDetailsKA"][0]["MeasureDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME")) : "";
                if(date !== ""){
                  date = date.split(",");
                  date = date[1].trimLeft() + "," + date[0];
                  frmMeasurementReadings.lblTimeKA["isVisible"] = true;
             	  frmMeasurementReadings.lblMeasurementName["top"] = "14%";
                }
              	this.dateFlag=date;
                data["flexDetailsKA"][0]["MeasureDate"] = date;
            }
			var unit_id = data["form"][0]["Unit_id"];
			var length = data["segSwipeKA"].length;
			for(var index = 0; index < length; index++){
				data["segSwipeKA"][index]["Value"] = data["segSwipeKA"][index]["Value"] + unit_id;
				data["segSwipeKA"][index]["id"] = Number(data["segSwipeKA"][index]["id"]) < 0 ? "" : data["segSwipeKA"][index]["id"];
				data["segSwipeKA"][index]["MeasureDate"] = "Read At : " + convertTimeZone(moment(data["segSwipeKA"][index]["MeasureDate"],kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("TIMEHOURSANDMIN"));
			}
            var processedData = this.$class.$superp.processData.call(this, data);
            controller.bindData(processedData);
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
     * @memberof frmMeasurementReadingsControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
          	var segListWidgetDataMap = formmodel.getViewAttributeByProperty("segSwipeKA", "widgetDataMap");
            segListWidgetDataMap["lblHeaderKA"] = "sectionHeader";
            formmodel.setViewAttributeByProperty("segSwipeKA", "widgetDataMap", segListWidgetDataMap);
          	var segData = data["segSwipeKA"]["segSwipeKA"].getData();
          	var segHeader = segData.length;
          	var utilitiesObj = utilities.getUtilityObj();
			if(segHeader == 0) {
				segHeader = utilitiesObj.geti18nValueKA("i18n.common.noMesurementReadingsTextKA");
			} else if (segHeader == 1){
				segHeader = segHeader + " " + utilitiesObj.geti18nValueKA("i18n.task.frmMeasurementReading.lblTitleKA.ValueKA");
			}
			else{
			  segHeader = segHeader + " " + utilitiesObj.geti18nValueKA("i18n.common.MeasurementReadingsTextKA");
			}
          	if(this.dateFlag=="" || this.dateFlag==null || this.dateFlag==undefined)
              {
                frmMeasurementReadings.lblTimeKA["isVisible"] = false;
                frmMeasurementReadings.lblMeasurementName["top"] = "28%";
              }
          	else
              {
                frmMeasurementReadings.lblTimeKA["isVisible"] = true;
                frmMeasurementReadings.lblMeasurementName["top"] = "14%";
              }
          	var segLen = segData.length;
          	var status = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMMEASUREMENTEXECUTIONKA).getControllerExtensionObject().getFormModelInfo("tStatusID");
          	if (status && status.toUpperCase() == "STARTED"){
              	formmodel.setViewAttributeByProperty("btnAddReadingKA", "isVisible", true);
            } else {
              	formmodel.setViewAttributeByProperty("btnAddReadingKA", "isVisible", false);
            }
          	for(var index = 0; index < segLen; index++){
              	if (status && status.toUpperCase() == "STARTED"){
                  segData[index]["metainfo"] = {
                      editMode : constants.SEGUI_EDIT_MODE_DELETE,
                      editModeCustomConfig : [{
                          title : "DELETE",
                          backgroundColor : "ff5d6e",
                          callback : kony.servicesapp.deleteMeasurementReadingCallback
                      }, {
                          title : "EDIT",
                          backgroundColor : "9b9b9b",
                          callback : kony.servicesapp.editMeasurementReadingCallback
                      }]
                  }
                }
          	}
          	var header = {"sectionHeader":segHeader};
          	var finalData = [[header,segData]];
          	data["segSwipeKA"]["segSwipeKA"].setData(finalData);
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
     * @memberof frmMeasurementReadingsControllerExtension#
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
     * @memberof frmMeasurementReadingsControllerExtension#
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
     * @memberof frmMeasurementReadingsControllerExtension#
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
  	addMeasurementReading: function(){
	/* To be called when adding a measurement reading */
		try{
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.addCustomInfo("Action", "ADD");
			this.navigateToReadingsExecution(navigationObject);
		} catch(err){
            kony.sdk.mvvm.log.error("Error in addMeasurementReading of controllerExtension");
        }
	},
	editMeasurementReading: function(){
	/* To be called when editing a measurement reading */
		try{
			var scopeObj = this;
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
          	navigationObject.addCustomInfo("Action", "EDIT"); 
          	if(kony.os.deviceInfo().name.toLowerCase() == "android"){
				var selectedRecord = scopeObj.getController().getFormModel().getViewAttributeByProperty("segSwipeKA","selectedItems")[0];
              	navigationObject.setQueryParams("flxValue", {"id":selectedRecord.primaryKeyValueMap.id});
            }
			else{
              	navigationObject.setQueryParams("flxValue", {"id":this.id});
            }
			scopeObj.navigateToReadingsExecution(navigationObject);
		} catch(err){
            kony.sdk.mvvm.log.error("Error in editMeasurementReading of controllerExtension");
        }
	},
  	navigateToReadingsExecution: function(navigationObject){
	/* To navigate to readings execution screen*/
      	try{
            var scopeObj = this;
          	var contextData = scopeObj.getController().getContextData();
            var measurePoint_id = contextData.getCustomInfo("MeasurementPoint_id");
            navigationObject.addCustomInfo("MeasurementPoint_id", measurePoint_id);
          	var task_num = contextData.getCustomInfo("Task_id");
			navigationObject.addCustomInfo("Task_id", task_num);
            navigationObject.setQueryParams("flxTimeKA", {"id":measurePoint_id});
          	var workOrderID = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject().getFormModelInfo("WorkOrderId");
          	navigationObject.setQueryParams("flxUnit", {"Task_id":task_num,"wo_id":workOrderID});
            scopeObj.navigateTo(kony.servicesapp.FRMREADINGEXECUTION, navigationObject);
        } catch(err){
            kony.sdk.mvvm.log.error("Error in navigateToReadingsExecution of controllerExtension");
        }
    },
	showPreviousForm: function(doReload) {
      	this.segmentOnTouchStart();
        var contextData = this.getController().getContextData();
		var navigationFrom = contextData.getCustomInfo("navigatingFrom");
		if(navigationFrom && navigationFrom=="MeasurementExecution"){
			this.$class.$superp.showPreviousForm.call(this,doReload,kony.servicesapp.FRMMEASUREMENTEXECUTIONKA);
		  }
		else{
		  this.$class.$superp.showPreviousForm.call(this, doReload, kony.servicesapp.FRMMEASUREMENTSKA);
		}
    },
	showHistoryForm: function() {
        try {
			var scopeObj = this;
         	var datamodel = new kony.sdk.mvvm.DataModel();
         	var measurePoint_id = this.getController().getContextData().getCustomInfo("MeasurementPoint_id");
			datamodel.setPrimaryKeyValueMap({"id" : measurePoint_id});
	        var navigationObject = new kony.sdk.mvvm.NavigationObject();
 			navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form"); 
          	navigationObject.setQueryParams("form", {
                "id": measurePoint_id
            });
          	navigationObject.setQueryParams("segHistoryKA", {
                "y": measurePoint_id
            });
          	scopeObj.navigateTo(kony.servicesapp.FRMHISTORY, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showReadingHistoryForm : " + err);
        };
    },
  	segmentOnRowClick : function(){
        if(kony.servicesapp.isAnimationInProgress){
            return;
        }
        else if(((Object.keys(kony.servicesapp.swipedIndices).length>0) || kony.servicesapp.coords.length !== 0 )) { 
            frmMeasurementReadings.segSwipeKA.animateRows({
                rows: [{
                    sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                    rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
                }],
                widgets: ["flexReadingKA"],
                animation: kony.servicesapp.getEndStateTransAnimDefinition("-50%","0%",true)
            });
        }
      	else if(kony.servicesapp.coords.length == 0 ){
            //var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
            //controller.performAction("displayReadingValue");
          	this.displayReadingValue();
        }
    },
  	segmentOnTouchStart : function(){
        if(kony.servicesapp.isAnimationInProgress){
            return;
        }
        else if(((Object.keys(kony.servicesapp.swipedIndices).length>0) || kony.servicesapp.coords.length !== 0 )) {
            frmMeasurementReadings.segSwipeKA.animateRows({
                rows: [{
                    sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                    rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
                }],
                widgets: ["flexReadingKA"],
                animation: kony.servicesapp.getEndStateTransAnimDefinition("-50%","0%",true)
            });
        }
    },
  	editReadingCallback : function(seguiWidget, section, row){
      	var scopeObj = this;
      	var formModel = scopeObj.getController() && scopeObj.getController().getFormModel();
      	scopeObj.id = formModel.getViewAttributeByProperty("segSwipeKA", "data")[0][1][row].primaryKeyValueMap.id;
      	scopeObj.editMeasurementReading();
    },
  	deleteMeasurementReading : function(){
        var recordObject = new kony.sdk.mvvm.persistent.Record(kony.servicesapp.ENTITY_MEASUREVALUE);
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
      	var controllerExtn = controller.getControllerExtensionObject();
      	var formModel = controller.getFormModel();
      	formModel.performActionOnView("btnBackKA","setEnabled",[true]);
        var contextData = controller.getContextData();
        var workOrderId = INSTANCE.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject().getFormModelInfo("WorkOrderId");
        recordObject.set("OPMODE","D");
      	if(kony.os.deviceInfo().name.toLowerCase() == "android"){
            var selectedRecord = controller.getFormModel().getViewAttributeByProperty("segSwipeKA","selectedItems")[0];
          	recordObject.set("id", selectedRecord.primaryKeyValueMap.id);
        }
      	else {
          	recordObject.set("id", controllerExtn.id);
        }
        recordObject.set("MeasurePoint_id", contextData.getCustomInfo("MeasurementPoint_id"));
        recordObject.set("WorkOrder_id", workOrderId);
        recordObject.setInfo("options", kony.servicesapp.APP_OPTIONS);
        recordObject.setInfo("serviceName", kony.servicesapp.OE_OBJECT_SERVICE_NAME);
      	showHideHamburgerMenuKA(kony.application.getCurrentForm(),frmHamburgerMenuWOKA,false,"flxRemoveReadingKA");
      	kony.timer.cancel("deleteMeasureReadingTimer"); 
        try {
            controllerExtn.saveRecord(recordObject, onSuccess, onError);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic saveMeasureValueRecord action : " + err);
        }
        function onSuccess(){
            kony.print("Success in deleting record");
          	if(kony.os.deviceInfo().name.toLowerCase() !== "android"){
              	controllerExtn.segmentOnTouchStart();
            }
            controllerExtn.fetchData();
        }
        function onError(){
            kony.print("Error while deleting value");
        }
    },
  	showDeletePopup: function(){
      	var scopeObj = this;
      	var formModel = scopeObj.getController().getFormModel();
  		showHideHamburgerMenuKA(kony.application.getCurrentForm(),frmHamburgerMenuWOKA,true,"flxRemoveReadingKA");			  
        dismissPopUp("deleteMeasureReadingTimer",3, scopeObj.deleteMeasurementReading);
        var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];			
        formModel.setViewAttributeByProperty("lblMeasureReadingNameKA","text","");
      	/*if(kony.os.deviceInfo().name.toLowerCase() == "android"){
        	formModel.setViewAttributeByProperty("lblReadingIdKa","text",selRecord.primaryKeyValueMap.id);
        } else {
          	formModel.setViewAttributeByProperty("lblReadingIdKa","text",scopeObj.id);
        }*/
      	var id;
        if(kony.os.deviceInfo().name.toLowerCase() == "android"){
          	id = selRecord.primaryKeyValueMap.id;
        } else {
          	id = scopeObj.id;
        }
        if(Number(id) < 0){
         	formModel.setViewAttributeByProperty("lblReadingIdKa","text","");
        } else {
         	formModel.setViewAttributeByProperty("lblReadingIdKa","text",id);
        }
      	//formModel.performActionOnView("flexDetailsKA","setEnabled",[false]);
        formModel.performActionOnView("btnBackKA","setEnabled",[false]);
	},
  	deleteReadingCallback: function(seguiWidget, section, row){
      	var scopeObj = this;
      	var formModel = scopeObj.getController() && scopeObj.getController().getFormModel();
      	scopeObj.id = formModel.getViewAttributeByProperty("segSwipeKA", "data")[0][1][row].primaryKeyValueMap.id;
      	scopeObj.showDeletePopup();
    },
  	displayReadingValue: function(){
      	try{
			var scopeObj = this;
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
          	navigationObject.addCustomInfo("Action", "DISPLAY");
          	var selectedRecord = scopeObj.getController().getFormModel().getViewAttributeByProperty("segSwipeKA","selectedItems")[0];
            navigationObject.setQueryParams("flxValue", {"id":selectedRecord.primaryKeyValueMap.id});
            scopeObj.navigateToReadingsExecution(navigationObject);
		} catch(err){
            kony.sdk.mvvm.log.error("Error in editMeasurementReading of controllerExtension");
        }
    }
});