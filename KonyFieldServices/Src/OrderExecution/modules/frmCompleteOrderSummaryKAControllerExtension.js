/*
 * Controller Extension class for frmCompleteOrderSummaryKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmCompleteOrderSummaryKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
		this.TIMEFORMAT = "HH:MM";
		this.DESCRIPTION_LENGTH = 72;
        this.NO_OF_DOTS_AFTERTRUNCATION = 3;
		var modelPropertyInfoMap = {};
        var controllerContextData = undefined;
        var controller = undefined;
        var controllerExtensionGen = undefined;
        this.getModelPropertyInfoMap = function() {
            return modelPropertyInfoMap;
        };
        this.getControllerContextData = function() {
            return controllerContextData;
        };
        this.setControllerContextData = function(contextData) {
            controllerContextData = contextData;
        };
        this.getController = function() {
            return controller;
        };
        this.setController = function(controllerObj) {
            controller = controllerObj;
        };
        this.getControllerExtensionGen = function() {
            return controllerExtensionGen;
        };
        this.setControllerExtensionGen = function(controllerExtensionGenObj) {
            controllerExtensionGen = controllerExtensionGenObj;
        };
        this.$class.$super.call(this, controllerObj);
    },
    fetchData: function() {
    	try {
	    	this.$class.$superp.fetchData.call(this);
          	var contextData = this.getController().getContextData();
            this.setFormModelInfo("WorkOrderId", contextData.getCustomInfo("woInfo").woID);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
		}
    },
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = scopeObj.$class.$superp.processData.call(scopeObj, data);
            scopeObj.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            //kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    formatData : function(dataMap){
		dataMap["form"][0]["duration"] = utilities.getUtilityObj().dateFormat(dataMap["form"][0]["duration"], this.TIMEFORMAT);
		return dataMap;
    },
    bindData: function(dataMap) {
        try {
			var scopeObj = this;
			var controller = scopeObj.getController();
            var formmodel = controller.getFormModel();
            formmodel.clear();
            formmodel.setViewAttributeByProperty("imgStartDateKA", "isVisible", kony.servicesapp.TECHNICIAN_CAN_EDIT_TIME);
            formmodel.setViewAttributeByProperty("imgStartTimeKA", "isVisible", kony.servicesapp.TECHNICIAN_CAN_EDIT_TIME);
            formmodel.setViewAttributeByProperty("imgEndDateKA", "isVisible", kony.servicesapp.TECHNICIAN_CAN_EDIT_TIME);
            formmodel.setViewAttributeByProperty("imgEndTimeKA", "isVisible", kony.servicesapp.TECHNICIAN_CAN_EDIT_TIME);
			dataMap = scopeObj.formatData(dataMap);
            var formData = dataMap["form"][0];
            var processedData = scopeObj.setSegData(formData);
          	dataMap["form"] = processedData;            
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
			scopeObj.setUICompleteOrderSummary(formData);
            controller.getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            //kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
	checkStartAndEndDate : function(){
		try {
			var scopeObj = this;
			var controller = scopeObj.getController();
            var formmodel = controller.getFormModel();
			var ActualStartDate = scopeObj.getFormModelInfo("ActualStartDate");
			var ActualEndDate = scopeObj.getFormModelInfo("ActualEndDate");
			var ActualStartDateNew = formmodel.getWidgetData("lblStartDateKA").getData();
			var ActualEndDateNew = formmodel.getWidgetData("lblEndDateKA").getData();
          	var duration=formmodel.getViewAttributeByProperty("lblDurationValueKA","text");
          	duration=duration.substr(0,2)+duration.substr(3,5);
			var configObj = controller.getConfig();
          	if(duration<9959)
              if(ActualStartDate != ActualStartDateNew || ActualEndDate != ActualEndDateNew){
                  var objHandler = kony.sdk.mvvm.persistent.Record;
                  var recordObject = new objHandler(kony.servicesapp.ENTITY_WORKORDER);
                  recordObject.set("id", scopeObj.getFormModelInfo("WorkOrderId"));
                  recordObject.set("ActualStartDate", ActualStartDateNew);
                  recordObject.set("ActualEndDate", ActualEndDateNew);
                  recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                  recordObject.setInfo("options", configObj.getObjectServiceOptions());
                  var onDateupdateSuccess = function(res) {
                      scopeObj.navigateBack();
                  };
                  var onDateupdateError = function() {                    
                      kony.sdk.mvvm.log.error("Error in updating the record ");
                  };
                  scopeObj.saveRecord(recordObject, onDateupdateSuccess, onDateupdateError);   
              }else{
                  scopeObj.navigateBack();
              }
          	else{
              var utilitiesObj  = utilities.getUtilityObj();
              var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvalidDurationKA");
              alert(alertText);
            }
		} catch (e) {
            kony.sdk.mvvm.log.error("==checkStartAndEndDate==>", e);
        }
	},
    fetchMasterData: function(successcallback, errorcallback) {
        try {

        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
        }
    },
    fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {

        } catch (e) {
            kony.sdk.mvvm.log.error("Error in fetchingMasterDataForWidget", e);
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
	showCalenderWidgetKA: function(widgetID1, widgetID2){
        lblDate = widgetID1;
		lblTime = widgetID2;
		//Need to write code to set previous selected values
		var formModel = this.getController().getFormModel();
		var previousDateTime = formModel.getWidgetData(lblDate).getData();
		if(previousDateTime) {
			var previousDate = convertTimeZone(moment(previousDateTime,kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, "YYYYMMDD");
			formModel.setViewAttributeByProperty("calenderKA", "dateComponents",[previousDate.substr(6,2), previousDate.substr(4,2), previousDate.substr(0,4)]);
		} else {
			var currentDate = moment().format("YYYYMMDD");
			formModel.setViewAttributeByProperty("calenderKA", "dateComponents",[currentDate.substr(6,2), currentDate.substr(4,2), currentDate.substr(0,4)]);
		}
		formModel.setViewAttributeByProperty("flxCalenderKA", "isVisible", true);
    },
    showTimePickerKA: function(widgetID1, widgetID2){      	
		lblDate = widgetID1;
		lblTime = widgetID2;
		var formModel = this.getController().getFormModel();
		var previousDateTime = formModel.getWidgetData(lblDate);
		if(previousDateTime.getData()){
			var ampm, hours, seconds;
			var previousTime = convertTimeZone(moment(previousDateTime.getData(),kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, "HHmmss");
			hours = parseFloat(previousTime.substr(0,2));
			if(hours >= 12){
				ampm = "PM";
				hours = ((hours == 12) ? hours : (hours - 12)) + "";
			}else{
				ampm = "AM";
				hours = ((hours == 0) ? "12" : hours) + "";
			}
			seconds = parseFloat(previousTime.substr(2,2)) + "";
			formModel.setViewAttributeByProperty("pickerViewKA", "selectedKeys", [hours,seconds,ampm]);
		}else{
			formModel.setViewAttributeByProperty("pickerViewKA", "selectedKeys", ["1","0","AM"]);
		}	
		formModel.setViewAttributeByProperty("flxTimePickerKA", "left", "0%");
    },
  	setCalendarDataKA: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		var slectedDateComp = formModel.getViewAttributeByProperty("calenderKA", "dateComponents");
		scopeObj.setFormModelInfo("DateFilter", slectedDateComp);
		var selectedDateDisplay = slectedDateComp[0] + "/" + slectedDateComp[1] + "/" + slectedDateComp[2];
		var selectedDate = (slectedDateComp[2] < 10 ? "0" + slectedDateComp[2]: slectedDateComp[2]) + "" + 
            			   (slectedDateComp[1] < 10 ? "0" + slectedDateComp[1]: slectedDateComp[1]) + "" + 
        				   (slectedDateComp[0] < 10 ? "0" + slectedDateComp[0]: slectedDateComp[0]);
		var previousDateTime = formModel.getWidgetData(lblDate);
		var previousTime;
		if(previousDateTime.getData()){
			previousTime = convertTimeZone(moment(previousDateTime.getData(),kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, "HHmmss");
		}
		if(previousTime){			
			selectedDate = moment(selectedDate + "" + previousTime, kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DB_DATE_FORMAT);
		}else{
			selectedDate = moment(selectedDate + "000000", kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DB_DATE_FORMAT);
		}
      	selectedDate = convertTimeZone(moment(selectedDate, kony.servicesapp.DATE_FORMAT_WITH_TIME).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), null, 
                        kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
		var dataObj = new kony.sdk.mvvm.Data(selectedDate, convertTimeZone(moment(selectedDate, kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")));
        var utilitiesObj = utilities.getUtilityObj();
        if (lblDate == "lblStartDateKA") {
        	if (scopeObj.validate(
			scopeObj.convertDateFormat2(selectedDateDisplay), 
			scopeObj.convertTimeFormat(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblStartTimeKA", "text")), scopeObj.convertDateFormat1(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblEndDateKA", "text")), scopeObj.convertTimeFormat(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblEndTimeKA", "text"))
			)) {              	
              	formModel.setWidgetData(lblDate, dataObj);
            }
            else {
            	alert(utilitiesObj.geti18nValueKA("i18n.orderexecution.frmCOSReqStartLessEnd.ValueKA"));
            }
        }else {              
        	if (scopeObj.validate(
			scopeObj.convertDateFormat1(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblStartDateKA", "text")), scopeObj.convertTimeFormat(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblStartTimeKA", "text")), scopeObj.convertDateFormat2(selectedDateDisplay), 
			scopeObj.convertTimeFormat(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblEndTimeKA", "text")))) {
            	formModel.setWidgetData(lblDate, dataObj);
            }
            else {
            	alert(utilitiesObj.geti18nValueKA("i18n.orderexecution.frmCOSReqStartLessEnd.ValueKA"));
            }
        }
		formModel.setViewAttributeByProperty("flxCalenderKA", "isVisible", false);
    },
    cancelCalendarKA: function(){
      	frmCompleteOrderSummaryKA.flxCalenderKA.setVisibility(false);
    },
  	setPickerViewDataKA: function() {
        var scopeObj = this;
        var formModel = scopeObj.getController().getFormModel();
      	var slectedTimeComp = formModel.getViewAttributeByProperty("pickerViewKA", "selectedKeyValues");
        selectedTime = (slectedTimeComp[0][1] < 10 ? ("0" + slectedTimeComp[0][1]) : slectedTimeComp[0][1]) + ":" + slectedTimeComp[1][1] + " " + slectedTimeComp[2][1];
		var previousDateTime = formModel.getWidgetData(lblDate);
		var previousDate;
		if(previousDateTime.getData()){
			previousDate = convertTimeZone(moment(previousDateTime.getData(),kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, "YYYYMMDD");
		}
		var selectedTimeVal;
		if(slectedTimeComp[2][1] === "PM"){
			if(parseFloat(slectedTimeComp[0][1]) == 12){
				selectedTimeVal = slectedTimeComp[0][1] + "" + slectedTimeComp[1][1] + "00";
			}else{
				selectedTimeVal = (parseFloat(slectedTimeComp[0][1]) + 12 ) + "" + slectedTimeComp[1][1] + "00";
			}			
		}else if(slectedTimeComp[2][1] === "AM"){
			if(parseFloat(slectedTimeComp[0][1]) == 12){
				selectedTimeVal = "00" + slectedTimeComp[1][1] + "00";
			}else if(parseFloat(slectedTimeComp[0][1]) < 10){
				selectedTimeVal = "0" + slectedTimeComp[0][1] + "" + slectedTimeComp[1][1] + "00";
			}else{
				selectedTimeVal = slectedTimeComp[0][1] + "" + slectedTimeComp[1][1] + "00";
			}			
		}
		if(previousDate){
			var selectedDate = moment(previousDate + "" + selectedTimeVal, kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DB_DATE_FORMAT);
          	selectedDate = convertTimeZone(moment(selectedDate, kony.servicesapp.DATE_FORMAT_WITH_TIME).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), null, 
                        kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
			previousDateTime.setData(selectedDate);
			//formModel.setWidgetData(lblDate, previousDateTime);
		}else{
          	var selectedDate = moment(((moment().format("YYYYMMDD")) + selectedTimeVal), kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DB_DATE_FORMAT);
          	selectedDate = convertTimeZone(moment(selectedDate, kony.servicesapp.DATE_FORMAT_WITH_TIME).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), null, 
                        kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
			previousDateTime.setData(selectedDate);
			//formModel.setWidgetData(lblDate, previousDateTime);
        }
		if (lblTime == "lblStartTimeKA") {
			if (scopeObj.validate(
			scopeObj.convertDateFormat1(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblStartDateKA", "text")), scopeObj.convertTimeFormat(selectedTime), 
			scopeObj.convertDateFormat1(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblEndDateKA", "text")), scopeObj.convertTimeFormat(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblEndTimeKA", "text")))) {
				formModel.setWidgetData(lblDate, previousDateTime);
				formModel.setViewAttributeByProperty(lblTime, "text", selectedTime);
			}
			else {
				alert(utilities.getUtilityObj().geti18nValueKA("i18n.orderexecution.frmCOSReqStartLessEnd.ValueKA"));
			}
		}
		else {
			if (scopeObj.validate(
			scopeObj.convertDateFormat1(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblStartDateKA", "text")), scopeObj.convertTimeFormat(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblStartTimeKA", "text")), scopeObj.convertDateFormat1(scopeObj.getController().getFormModel().getViewAttributeByProperty("lblEndDateKA", "text")), scopeObj.convertTimeFormat(selectedTime))) {
				formModel.setWidgetData(lblDate, previousDateTime);
				formModel.setViewAttributeByProperty(lblTime, "text", selectedTime);
			}
			else {
				alert(utilities.getUtilityObj().geti18nValueKA("i18n.orderexecution.frmCOSReqStartLessEnd.ValueKA"));
			}
		}
      	formModel.setViewAttributeByProperty("flxTimePickerKA", "left", "-100%");		
    },
	convertTimeFormat: function(time) {
		return moment(time, "hh:mm A").format("HH:mm");
	},
	convertDateFormat1: function(date) {
		return moment(date, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")).format("YYYY-MM-DD");
	},
	convertDateFormat2: function(date) {
		return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
	},
	validate: function(startDate, startTime, endDate, endTime) {
		if (!startTime || !endTime) 
			return moment(startDate).isBefore(endDate);
		return moment(startDate + " " + startTime).isBefore(endDate + " " + endTime);
	},
    cancelPickerViewKA: function() {
        var scopeObj = this;
        var formModel = scopeObj.getController().getFormModel();
        formModel.setViewAttributeByProperty(lblTime, "text", formModel.getViewAttributeByProperty(lblTime, "text"));
      	formModel.setViewAttributeByProperty("flxTimePickerKA", "left", "-100%");
    },
	calculateDuration: function() {
        var formModel = this.getController().getFormModel();
      	var then = moment(formModel.getViewAttributeByProperty("lblStartDateKA", "text"), kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")).format("DD/MM/YYYY") + " " + moment(formModel.getViewAttributeByProperty("lblStartTimeKA", "text"), ["h:mm A"]).format("HH:mm");
        var now = moment(formModel.getViewAttributeByProperty("lblEndDateKA", "text"), kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")).format("DD/MM/YYYY") + " " + moment(formModel.getViewAttributeByProperty("lblEndTimeKA", "text"), ["h:mm A"]).format("HH:mm");
        var duration = Math.floor(moment.duration(moment(now,"DD/MM/YYYY HH:mm").diff(moment(then,"DD/MM/YYYY HH:mm"))).asHours()) + moment.utc(moment(now,"DD/MM/YYYY HH:mm").diff(moment(then,"DD/MM/YYYY HH:mm"))).format(":mm");
		formModel.setViewAttributeByProperty("lblDurationValueKA", "text", duration);
    },
    navigateBack: function(){ 
		this.$class.$superp.showPreviousForm.call(this,true,"frmCompleteOrderKA");
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
	setSegData : function(formData){
		try{
			var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
			var utilitiesObj = utilities.getUtilityObj(); 
			var materials = utilitiesObj.geti18nValueKA("i18n.common.materialsValueKA");
            var tools = utilitiesObj.geti18nValueKA("i18n.common.Tools.ValueKA");
			var processedData = {};
			processedData["lblOrderNumberValueKA"] = formData["Code"];			
            processedData["lblDurationValueKA"] = formData["duration"];			
            processedData["lblStatusValueKA"] = utilitiesObj.getStatusTextKA(formData["Status_id"]);
			if(formData["Description"]){    
				var description = utilitiesObj.dataTruncation(formData["Description"],scopeObj.DESCRIPTION_LENGTH,scopeObj.NO_OF_DOTS_AFTERTRUNCATION,"...");				
				scopeObj.setFormModelInfo("flxInstructionKA", {"fullText" : formData["Description"],"isTruncated": description["isTruncated"],"headerText" : utilitiesObj.geti18nValueKA("i18n.notification.frmAddNotificationProblemKA.lblProbDescKA.ValueKA")});
				processedData["lblProblemDescriptionValueKA"] = description["value"]; 
				if (description["isTruncated"]) {						
	                formmodel.setViewAttributeByProperty("imgNextKA", "isVisible", description.isTruncated);
                }else{                		
	            	formmodel.setViewAttributeByProperty("imgNextKA", "isVisible", description.isTruncated);
	            } 	
			}else{
            	formmodel.setViewAttributeByProperty("imgNextKA", "isVisible", false);
            }
            var toolsInt = parseInt(formData["Tools"], 10);
            var materialInt = parseInt(formData["Materials"], 10);
            if (!(formData["Tools"] === toolsInt)){
				toolsInt = 0;
            }
            if (!(formData["Materials"] === materialInt)){
				materialInt = 0;
            }
            processedData["lblIMaterialKA"] = materials+" ("  + materialInt  + ")";
            processedData["lblIToolsKA"] = tools+" ("+ toolsInt  + ")";
          	processedData["lblTechnicalResponseValueKA"] = formData["TechnicianName"];
			return processedData;
		}catch(err){
			 kony.sdk.mvvm.log.error("==setSegData==>", err);		
		}	
	},
	setUICompleteOrderSummary : function(formData){
		try{
			var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
			scopeObj.setFormModelInfo("ActualStartDate", formData["ActualStartDate"]);
			scopeObj.setFormModelInfo("ActualEndDate", formData["ActualEndDate"]);
			if(formData["ActualStartDate"]){
              	formmodel.setWidgetData("lblStartDateKA", new kony.sdk.mvvm.Data(formData["ActualStartDate"],convertTimeZone(moment(formData["ActualStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE"))));
              	formmodel.setWidgetData("lblStartTimeKA", new kony.sdk.mvvm.Data("",convertTimeZone(moment(formData["ActualStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, "hh:mm A")));
            }else{
              	formmodel.setWidgetData("lblStartDateKA", "");
              	formmodel.setWidgetData("lblStartTimeKA", "");              
            }
          	if(formData["ActualEndDate"]){
              	formmodel.setWidgetData("lblEndDateKA", new kony.sdk.mvvm.Data(formData["ActualEndDate"],convertTimeZone(moment(formData["ActualEndDate"],kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE"))));
              	formmodel.setWidgetData("lblEndTimeKA", new kony.sdk.mvvm.Data("",convertTimeZone(moment(formData["ActualEndDate"],kony.servicesapp.DB_DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT_WITH_TIME), kony.servicesapp.remoteTimeZone, null, "hh:mm A")));			
            }else{
              	formmodel.setWidgetData("lblEndDateKA", "");
              	formmodel.setWidgetData("lblEndTimeKA", "");
            }
		}catch(err){
			 kony.sdk.mvvm.log.error("==setUICompleteOrderSummary==>", err);
		}	
	}
});