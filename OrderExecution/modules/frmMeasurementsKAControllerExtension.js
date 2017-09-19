/*
 * Controller Extension class for frmMeasurementsKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmMeasurementsKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmMeasurementsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
		var scopeObj = this;
        this.$class.$super.call(this, controllerObj);
      	scopeObj.selectedIndex = 0;
		scopeObj.IS_VIEW_ENABLED = false;
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmMeasurementsKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
          	frmHamburgerMenuWOKA.segViewsMeasurementViewKA.selectedRowIndex = [0,0];
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
     * @memberof frmMeasurementsKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
			var length = data["segMeasurementPointsKA"].length;
          	for(var index = 0;index < length; index ++){
              	var utilitiesObj = utilities.getUtilityObj();
				if(data["segMeasurementPointsKA"][index]["reading_count"] == 0) {
					data["segMeasurementPointsKA"][index]["reading_count"] = utilitiesObj.geti18nValueKA("i18n.common.noMesurementReadingsTextKA");
				} else if (data["segMeasurementPointsKA"][index]["reading_count"] == 1){
					data["segMeasurementPointsKA"][index]["reading_count"] = data["segMeasurementPointsKA"][index]["reading_count"] + " " + utilitiesObj.geti18nValueKA("i18n.common.readingKA");
				}
				else{
				  data["segMeasurementPointsKA"][index]["reading_count"] = data["segMeasurementPointsKA"][index]["reading_count"] + " " + utilitiesObj.geti18nValueKA("i18n.common.readingsKA");
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
     * @memberof frmMeasurementsKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
			if(kony.application.getCurrentForm().id != 'frmMeasurementsKA'){formmodel.setViewAttributeByProperty("tbxSearchKA","text","");}
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
     * @memberof frmMeasurementsKAControllerExtension#
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
     * @memberof frmMeasurementsKAControllerExtension#
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
     * @memberof frmMeasurementsKAControllerExtension#
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
  	applyViews: function(flag){
	/** To show/hide the views flex**/
      	try{
          	var scopeObj = this;
          	var formModel = scopeObj.getController().getFormModel();
            showHideHamburgerMenuKA(frmMeasurementsKA,frmHamburgerMenuWOKA,flag,"flxMeasurementViewsKA");
            if (!flag) {
				scopeObj.IS_VIEW_ENABLED = false;
                formModel.performActionOnView("flxBodyKA","setEnabled", [true]);
            }else{
                scopeObj.IS_VIEW_ENABLED = true;
                formModel.performActionOnView("flxBodyKA","setEnabled", [false]);
            }
        } catch(err){
          	kony.sdk.mvvm.log.error("Error in blogic applyViews"+err);
        }
    },
  	getDataForViews: function(){
	/** To apply the selected view to the form.**/
      	try{
          	var scopeObj = this;
			var controller = scopeObj.getController();
			var formModel = controller.getFormModel();
			var selectedIndex = formModel.getViewAttributeByProperty("segViewsMeasurementViewKA", "selectedRowIndex");
          	scopeObj.selectedIndex = selectedIndex[1];
          	var query = kony.servicesapp.MeasurementPointQuery + kony.servicesapp.MeasurementSearchQuery + kony.servicesapp.MeasurementViewsQuery[selectedIndex[1]];
          	scopeObj.applyViews(false);
			var contextData = controller.getContextData();
          	var task_num = contextData.getCustomInfo("taskID");
			contextData.setQuery("segMeasurementPointsKA", query, "sql");
          	contextData.setQueryParams("segMeasurementPointsKA",{"Task_id": task_num,"search_text":"%%"});
			var sucCallback=function(response){scopeObj.processData(response); kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
			var errorcallback=function(err){ kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
			scopeObj.fetchDataByWidgetId("segMeasurementPointsKA", sucCallback, errorcallback); 
        } catch(err){
          	kony.sdk.mvvm.log.error("Error in blogic getDataForViews"+err);
        }
    },
	fetchDataByWidgetId : function(widgetId,successCallback,errorCallback){
		try {
			this.$class.$superp.fetchDataByWidgetId.call(this,widgetId,successCallback,errorCallback);
		} catch (err) {
			kony.sdk.mvvm.log.error("Error in fetchDataByWidgetId of controllerExtension");
			var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
			kony.sdk.mvvm.log.error(exception.toString());
		}
      },
  	navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
  	navigateToMeasurementReadings: function(){
	/** To navigate to Measurement Readings Screen**/
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			var formModel = controller.getFormModel();
			var selectedRecord = formModel.getViewAttributeByProperty("segMeasurementPointsKA","selectedItems")[0];
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.setQueryParams("form", {
			"id": selectedRecord.primaryKeyValueMap.id
			});
			var task_num = controller.getContextData().getCustomInfo("taskID");
			navigationObject.addCustomInfo("MeasurementPoint_id", selectedRecord.primaryKeyValueMap.id);
			navigationObject.addCustomInfo("Task_id", task_num);
          	var workOrderID = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject().getFormModelInfo("WorkOrderId");
			navigationObject.setQueryParams("segSwipeKA", {"Task_id":task_num,"MeasurePoint_id":selectedRecord.primaryKeyValueMap.id});
          	navigationObject.setQueryParams("flxTimeKA", {"Task_id":task_num,"wo_id":workOrderID});
          	navigationObject.setQueryParams("flexDetailsKA", {"Task_id":task_num});
			scopeObj.navigateTo(kony.servicesapp.FRMMEASUREMENTREADINGS, navigationObject);
		} catch(err){
			kony.sdk.mvvm.log.error("Error in navigateToMeasurementReadings of controllerExtension");
		}
    },
  	doSearch: function(){
	/** To fetch the search results and show them **/
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			var formModel = controller && controller.getFormModel();
			var contextData = controller.getContextData();
			var searchText = formModel.getViewAttributeByProperty("tbxSearchKA","text");
			var query = kony.servicesapp.MeasurementPointQuery + kony.servicesapp.MeasurementSearchQuery + kony.servicesapp.MeasurementViewsQuery[scopeObj.selectedIndex]; 
			var task_num = contextData.getCustomInfo("taskID");
			contextData.setQuery("segMeasurementPointsKA", query, "sql");
			contextData.setQueryParams("segMeasurementPointsKA",{"Task_id": task_num,"search_text":'%'+searchText+'%'});
			var sucCallback=function(response){scopeObj.processData(response); kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
			var errorcallback=function(err){ kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
			scopeObj.fetchDataByWidgetId("segMeasurementPointsKA", sucCallback, errorcallback);
		} catch(err){
			kony.sdk.mvvm.log.error("Error in doSearch of controllerExtension");
		}
    },
	applyView: function(onCancel) {
		try{
          	var scopeObj = this;
			var formModel = this.getController().getFormModel();
          	if(onCancel){formModel.setViewAttributeByProperty("tbxSearchKA","text","");}
			scopeObj.doSearch();
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic applyView : " + err);
        }
    },
	showPreviousForm: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload, kony.servicesapp.FRMMEASUREMENTEXECUTIONKA);
    },
	deviceBackForAndroid: function(doReload){
	/** Called on device back on android**/
		try{
			var scopeObj = this;
			if(scopeObj.IS_VIEW_ENABLED){
				scopeObj.applyViews(false);
			} else{
				scopeObj.showPreviousForm(doReload);
			}
		} catch(err){
			kony.sdk.mvvm.log.error("Error in deviceBackForAndroid of controllerExtension");
		}
	}
});