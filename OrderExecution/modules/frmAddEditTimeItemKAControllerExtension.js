/*
 * Controller Extension class for frmAddEditTimeItemKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmAddEditTimeItemKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmAddEditTimeItemKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.hashOfNameDesc = {};      
        this.masterDataofNames = [];
        this.masterDataofIDs = [];
        this.selectedValue = "";
        this.category_Type = "";
        this.Id = null;
		this.duration="";
		this.TIMEFORMAT = "HH:MM";
        this.$class.$super.call(this, controllerObj);

    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmAddEditTimeItemKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;          	
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            var woTimeExpnsInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
            if(woTimeExpnsInfo["formValue"] == "WorkOrderTimeExpense"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmAddEditTimeItemKAConfig,"form","WorkOrderTimeExpense", kony.servicesapp.TAEADDEDITTIMEWO);
                scopeObj.refreshEntityOfWidgets("WorkOrderTimeExpense");
            }
            else if(woTimeExpnsInfo["formValue"] == "Task"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmAddEditTimeItemKAConfig,"form","TaskTimeExpense", kony.servicesapp.TAEADDEDITTIMETASK);
                scopeObj.refreshEntityOfWidgets("TaskTimeExpense");
            }
            else if(woTimeExpnsInfo["formValue"] == "CompleteOrder"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmAddEditTimeItemKAConfig,"form","WorkOrderTimeExpense", kony.servicesapp.TAEADDEDITTIMECO);
                scopeObj.refreshEntityOfWidgets("WorkOrderTimeExpense");
            }            
            if (this.getController().getContextData().getCustomInfo("from") == 'ADD'){
                this.hashOfNameDesc = {};
                this.masterDataofNames = [];
                this.masterDataofIDs = [];
                this.selectedValue = "";
                this.fetchDataForListBox();
            }
            else{
                this.Id = scopeObj.getController().getContextData().getCustomInfo("Id");
                this.$class.$superp.fetchData.call(this, success, error);   
            }
                
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.fetchDataForListBox(response);
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
    populateDescription: function(Name) {
        var formModel = this.getController().getFormModel();
        this.selectedValue = Name;
        formModel.setViewAttributeByProperty("lblDescKA", "text", this.hashOfNameDesc[Name]);
    },
    refreshEntityOfWidgets:function(entity)
    {
        var scopeObj=this;
        var widgetList=scopeObj.getController().getConfig().getWidgets();
        for (eachWidget in widgetList)
        {
            frmAddEditTimeItemKAConfig[eachWidget]["fieldprops"]["entity"]=entity
        }
    },

    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },

	convertDuration: function(data) {
      	try {
            var len = data.length;
            var dec = parseInt(data.substring(len - 2 , len)) / 60;
            var res = parseFloat(data.substring(0 , len - 3)) + dec;
 			res = Math.round(res*100)/100;
            return res;
        }
      	catch(errr) {
          	kony.sdk.mvvm.log.error("Error in converting duration" + err);
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
	
    saveData: function() {
        try {
            if (this.doMandatoryFieldsExist()) {
                var scopeObj = this;
                var recordInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
                var navigationObject = new kony.sdk.mvvm.NavigationObject();
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var WorkOrderTimeExpenseModelObject = null;
                var dataObject = null;
                if(recordInfo["formValue"] == "WorkOrderTimeExpense" || recordInfo["formValue"] == "CompleteOrder"){
                    WorkOrderTimeExpenseModelObject = INSTANCE.getModel("WorkOrderTimeExpense", kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS);
                    dataObject = new kony.sdk.dto.DataObject("WorkOrderTimeExpense");
                }
                else if(recordInfo["formValue"] == "Task"){
                    WorkOrderTimeExpenseModelObject = INSTANCE.getModel("TaskTimeExpense", kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS);
                    dataObject = new kony.sdk.dto.DataObject("TaskTimeExpense");
                }
                var formModel = this.getController().getFormModel();
                var date = formModel.getViewAttributeByProperty("lblSelectDateKA", "text");
                var billable = formModel.getViewAttributeByProperty("switchBillableToCustomerKA", "selectedIndex");
                var updateField = {};
                updateField.Type = "TIME";
                updateField.Description = formModel.getViewAttributeByProperty("lblDescKA", "text");
                var duration = formModel.getViewAttributeByProperty("lblDurationKA", "text");
              	updateField.Duration = this.convertDuration(duration);
                updateField.ExecutionDate = convertTimeZone(moment(date, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")).format(), null, kony.servicesapp.remoteTimeZone, kony.servicesapp.DB_DATE_FORMAT);
                if(recordInfo["formValue"] == "WorkOrderTimeExpense" || recordInfo["formValue"] == "CompleteOrder"){
                    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                    var frmOrderExecutionControllerExecution = appContext.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
                    updateField.WorkOrder_id = frmOrderExecutionControllerExecution.getFormModelInfo("WorkOrderId");
                }else if(recordInfo["formValue"] == "Task"){
                    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                    var frmOrderExecutionControllerExecution = appContext.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
                    updateField.Task_id = recordInfo["recordID"];
                    updateField.WorkOrder_id = frmOrderExecutionControllerExecution.getFormModelInfo("WorkOrderId");
                }
                updateField.Category_id = this.category_Type;
                updateField.DurationUnit_id = "H";
                if(billable == 0) {
                  	updateField.IsCustomerBillable = "X";
            	}
              	else {
                	updateField.IsCustomerBillable = " ";
                }
                if(!(this.getController().getContextData().getCustomInfo("from") == 'ADD'))
                    updateField.id = scopeObj.getController().getContextData().getCustomInfo("Id");
                dataObject.setRecord(updateField);

                if (this.getController().getContextData().getCustomInfo("from") == 'ADD') {
                    WorkOrderTimeExpenseModelObject.create(dataObject, OnSuccess, OnError);
                } else {
                    WorkOrderTimeExpenseModelObject.update(dataObject, OnSuccess, OnError);
                }

                function OnSuccess(res) {

                    //Successfully created record
                    var navigationObject = new kony.sdk.mvvm.NavigationObject();
                    var recordInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
                    if(scopeObj.getController().getContextData().getCustomInfo("Navigation") == "List"){
                        var recordInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
                        kony.sdk.mvvm.log.info("success saving record ", res);
                        if(recordInfo["formValue"] == "WorkOrderTimeExpense"){
                            navigationObject.addCustomInfo("WorkOrderId", recordInfo["recordID"]);
                            navigationObject.addCustomInfo("WorkOrderStatus", recordInfo["WorkOrderStatus"]);
                            navigationObject.addCustomInfo("WorkOrderTimeExpense", "WorkOrderTimeExpense");
                        }
                        else if(recordInfo["formValue"] == "Task"){
                            navigationObject.addCustomInfo("TaskId", recordInfo["recordID"]);
                            navigationObject.addCustomInfo("TaskStatus", recordInfo["TaskStatus"]);
                            navigationObject.addCustomInfo("Task", "Task");    
                        }else if(recordInfo["formValue"] == "CompleteOrder"){
                            navigationObject.addCustomInfo("WorkOrderId", recordInfo["recordID"]);
                            navigationObject.addCustomInfo("WorkOrderStatus", recordInfo["WorkOrderStatus"]);
                            navigationObject.addCustomInfo("CompleteOrder", "CompleteOrder");
                        }
                        navigationObject.setQueryParams("SegTimeExpenseKA", {
                            'x': recordInfo["recordID"]
                        });
                        scopeObj.navigateTo("frmTimeAndExpenseKA", navigationObject);    
                    }
                    else if(scopeObj.getController().getContextData().getCustomInfo("Navigation") == "Details"){
                        var datamodel = new kony.sdk.mvvm.DataModel();
                        datamodel.setPrimaryKeyValueMap({
                            "x": scopeObj.getController().getContextData().getCustomInfo("Id")
                        });
                        var navigationObject = new kony.sdk.mvvm.NavigationObject();
                        navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
                        navigationObject.setQueryParams("form", {
                            "x": scopeObj.getController().getContextData().getCustomInfo("Id")
                        });
                        navigationObject.addCustomInfo("woTimeExpnsInfo", {
                                "WorkOrderTimeExpenseId" : scopeObj.getController().getContextData().getCustomInfo("Id"),
                                "WorkOrderTimeExpenseType" : scopeObj.getController().getContextData().getCustomInfo("Type"),
                                "recordID": recordInfo["recordID"],
                                "formValue": recordInfo["formValue"],
                                "WorkOrderStatus": recordInfo["WorkOrderStatus"],
                                "TaskStatus": recordInfo["TaskStatus"]
                            });
                        scopeObj.navigateTo("frmExpenseDetailsKA", navigationObject);
                    }
                    if (kony.sdk.mvvm.isNetworkAvailabile()) {
                            kony.servicesapp.backgroundSyncOnStatusChangeKA();
                        }

                }

                function OnError(err) {
                    alert("err" + JSON.stringify(err));
                    //Handle error case
                    kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
                    var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
                    kony.sdk.mvvm.log.error(exception.toString());
                }

            } else {
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.FillAllFieldsKA");
                alert(alertText);
            }
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    fetchDataForListBox: function(data) {
        var scopeObj = this;
        scopeObj.masterDataofNames = [];
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        INSTANCE.getModel("TimeExpenseCategory", kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS).executeSelectQuery("select Description,Name,id from TimeExpenseCategory where TYPE='TIME'", success, error);

        function success(response) {

            for (var i = 0; i < response.length; i++) {
                var id = "lbl" + (i + 1);
                scopeObj.masterDataofNames.push([id, response[i]["Name"]]);
                scopeObj.hashOfNameDesc[response[i]["Name"]] = response[i]["Description"];
                scopeObj.masterDataofIDs.push([response[i]["id"],response[i]["Name"]]);
            }
            scopeObj.bindData(data);
            //kony.print(""+JSON.stringify(respone));
        }

        function error(err) {

            kony.print("" + JSON.stringify(err));

        }

    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmAddEditTimeItemKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmAddEditTimeItemKAControllerExtension#
     */
    bindData: function(data) {
        try {
			var scopeObj=this;
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            // this.$class.$superp.bindData.call(this, data);
            frmAddEditTimeItemKA.listBoxExpenseTypeKA.masterData = this.masterDataofNames;
			formmodel.setViewAttributeByProperty("listBoxExpenseTypeKA", "selectedKey", " ");
			formmodel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", false);
            this.typeHeader = this.getController().getContextData().getCustomInfo("from");
                if (this.getController().getContextData().getCustomInfo("from") == 'ADD') {
					var woTimeExpnsInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
					if(woTimeExpnsInfo["formValue"] == "CompleteOrder")
						{
							scopeObj.setDurationWhileCompleteOrder();							 						
						}
					formmodel.setViewAttributeByProperty("lblTimeKA", "text", kony.i18n.getLocalizedString("i18n.common.AddTimeItemKA"));
					formmodel.setViewAttributeByProperty("lblDurationKA", "text", "HH:MM");
                  	scopeObj.scheduleDate();
                  	inputValue = formmodel.getViewAttributeByProperty("CalenderrBg", "dateComponents");
					var date = inputValue[0] + "/" + inputValue[1] + "/" + inputValue[2];
					formmodel.setViewAttributeByProperty("lblSelectDateKA","text",moment(date, "DD/MM/YYYY").format(kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")));
                } else {
                    formmodel.setViewAttributeByProperty("lblTimeKA", "text", kony.i18n.getLocalizedString("i18n.common.EditTimeItemKA"));
                }
            if(this.getController().getContextData().getCustomInfo("Edit") == 'Edit')
            {
                var FormData = data.form[0];
                var TypeValue = this.getSelectedDescType(data);
              	var selectedIndex;
                formmodel.setViewAttributeByProperty("lblDescKA", "text", FormData["Description"]);
                formmodel.setViewAttributeByProperty("lblDurationKA", "text",  this.convertDurationToHours(FormData["Duration"]));
                formmodel.setViewAttributeByProperty("listBoxExpenseTypeKA", "selectedKey", TypeValue[0]);
                if(FormData["ExecutionDate"]) {
                	formmodel.setViewAttributeByProperty("lblSelectDateKA", "text", convertTimeZone(moment(FormData["ExecutionDate"], kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")));
                }
              	if(FormData["IsCustomerBillable"]=="X") {
                  	selectedIndex = 0;
                } else {
                  	selectedIndex = 1;
                }
              	formmodel.setViewAttributeByProperty("switchBillableToCustomerKA", "selectedIndex", selectedIndex);
				this.selectedValue = TypeValue[1];
                this.category_Type = this.getSelectedID(TypeValue[1]);
            }
            // this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
	
	setDurationWhileCompleteOrder:function()
	{
		try
		{
		var scopeObj=this;
		var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();		  
		var frmOrderExecutionControllerExecution = INSTANCE.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
		var WorkOrder_id = frmOrderExecutionControllerExecution.getFormModelInfo("WorkOrderId");		
		INSTANCE.getModel("WorkOrder", kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS).executeSelectQuery(kony.servicesapp.CALCDURATION+"'"+WorkOrder_id+"'", success, error);

		function success(response) {
		var formModel = scopeObj.getController().getFormModel();
			scopeObj.duration=response.duration;
			scopeObj.formatAndSetData();
			}
			
			function error(err)
			{
			 kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
			}
		}
		catch(err)
		{
			kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
		}
	},		
		/** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmAddEditTimeItemKAControllerExtension#
     */
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmAddEditTimeItemKAControllerExtension#
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
	//formats data according to HH:MM format
	 formatAndSetData : function(dataMap){
       try
         {
       var formmodel = this.getController().getFormModel();
		var duration = utilities.getUtilityObj().dateFormat(this.duration, this.TIMEFORMAT);
		 formmodel.setViewAttributeByProperty("lblDurationKA", "text",duration);
         }
       catch(err)
         {
           kony.sdk.mvvm.log.error(err);
         }
    },
    /** 
     * This method shows form.
     * @memberof frmAddEditTimeItemKAControllerExtension#
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

	doMandatoryFieldsExist: function() {
        var scopeObj = this;
        var formmodel = this.getController().getFormModel();
        var date = formmodel.getViewAttributeByProperty("lblSelectDateKA", "text");
        var duration = formmodel.getViewAttributeByProperty("lblDurationKA", "text");
		duration=parseFloat(duration.replace(":",""));	
        var desc =  formmodel.getViewAttributeByProperty("lblDescKA", "text");   
        var category_id = this.selectedValue;
        this.category_Type = this.getSelectedID(this.selectedValue);
        if (date && duration && category_id && desc)
            return true;
        else
            return false;
    },

    navigateBack: function() {
        try {
            if (this.getController().getContextData().getCustomInfo("from") == 'ADD') {
                var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmAddTimeExpenseKA");
                var formModel = controller.getFormModel();
                formModel.showView();
            } else {
                if(this.getController().getContextData().getCustomInfo("Navigation") == "Details")
                    this.$class.$superp.showPreviousForm.call(this, true, "frmExpenseDetailsKA");
                else if(this.getController().getContextData().getCustomInfo("Navigation") == "List")
                    this.$class.$superp.showPreviousForm.call(this, true, "frmTimeAndExpenseKA");
            }

        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },

    getSelectedDescType: function(data){
        try{
            var i = 0;
            for(;i<this.masterDataofNames.length; i++){
                if(this.masterDataofNames[i][1] == data["form"][0]["TimeExpnsCategory"])
                    return this.masterDataofNames[i];
            }
            return this.masterDataofNames;
        } catch(err){
            kony.sdk.mvvm.log.error("error in Blogic getSelectedDescType action : " + err);      
        }
    },

    getSelectedID: function(data){
        try{
            var i = 0;
            for(;this.masterDataofIDs.length;i++){
                if(this.masterDataofIDs[i][1] == data)
                    return this.masterDataofIDs[i][0];
            }
            return this.masterDataofIDs;
        } catch(err){
            kony.sdk.mvvm.log.error("error in Blogic getSelectedID action : " + err);      
        }
    },
	
	scheduleDate: function(){
      
		var formmodel = this.getController().getFormModel();
		var previousStartDate = formmodel.getWidgetData("lblSelectDateKA").getData();       
		if(previousStartDate){     
        formmodel.setViewAttributeByProperty("CalenderrBg", "dateComponents",[ parseFloat(previousStartDate.substr(0,2)),parseFloat(previousStartDate.substr(3,2)),parseFloat(previousStartDate.substr(6,4))]);          
       
		}
        
		else{
            var momentObj = moment();
			var currentDate = momentObj.format("DDMMYYYY");
			formmodel.setViewAttributeByProperty("CalenderrBg", "dateComponents",[currentDate.substr(0,2), currentDate.substr(2,2), currentDate.substr(4,4)]);
      	}
    },
	
	schedulePopUpTime: function() {

    var formmodel = this.getController().getFormModel();
    var TotalTime = formmodel.getWidgetData("lblDurationKA").getData();


    if (TotalTime) {
        var timeCompList = TotalTime.split(":");
        formmodel.setViewAttributeByProperty("TimePicker", "selectedKeys", timeCompList);
    } else {

        formmodel.setViewAttributeByProperty("TimePicker", "selectedKeys", ["1", "00"]);
    }
	}

});