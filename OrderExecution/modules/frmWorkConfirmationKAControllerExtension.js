/*
 * Controller Extension class for frmWorkConfirmationKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */
 /* The below questions are considered as Standard Questions for Complete Order Checklist in the below order
	1.	End Date 
	2.	End Time
	3.	Duration
	4.	Action or Resolution Code 
	5.	Action or Resolution Description 
	6.	Is the problem solved? (Y/N)
	In case N, I expect the app to follow a specific work flow, as described in following user stories. Next questions (#6 to #9) won't appear in this case in the screen.
	In case Y, show the below questions:
	7.	Did you perform all required tests (Y/N)
	8.	Did you registered all resources used in the order execution? (Y/N)
	9.	Did you clear the work order location (Y/N)
	10.	Is the customer prepared for a final acceptance (Y/N)
	11.	Do you want to close this work order (Y/N)
	In case I select N, I expect the app to show me a messaging, informing that the work order will be returned to the back office as a rescheduled work order, for further planning and execution. Once I tap OK, I expect the application to return me to the My Order screen, and update the status of the work order to "Reschedule", and start an immediately auto back ground sync. With the reschedule status I understand that once the sync is complete, I will not be able to see this order in my order list anymore.
	In case I select Y, I expect the application to show me exactly same questions # 6 to 9 from previous user story, with one additional question:
	12.	Do you want to open a new work order (Y/N) 
 */
 

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmWorkConfirmationKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
		this.START_QUE_NO = 7;
        this.SECTION_ONE_QUE_START = 9;
		this.SECTION_ONE_QUE_END = 15;
		this.SECTION_TWO_QUE = 17;
		this.SECTION_THREE_QUE = 19;
		
		this.REASON_QUE_NO_START = 21;
		this.REASON_QUE_NO_END = 27;
		
		this.START_QUE_NO_IDX = 5;
        this.SECTION_ONE_QUE_START_IDX = 6;
		this.SECTION_ONE_QUE_END_IDX = 9;
		this.SECTION_TWO_QUE_IDX = 10;
		this.SECTION_THREE_QUE_IDX = 11;
		
      	this.isReschedule = false;
      	this.createWorkOrder = false;
		this.isProblemSolved = true;
		this.labelSkn = "sknLbl5B7A9AClanProNews28KA";
		this.tbxSkn = "skntbx5E5050ClanProBook28KA";
		this.labelSknFocus = "sknLblFF5D6EClanProBook28KA ";
		this.tbxSknFocus = "sknTbxA4B2C1BorderFF5D6EBackgroundClanProBook30KA";
        this.questionsSknChange= "sknLblFF5D6EClanProBook28KA";
		this.showPopup = false;
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this);
           
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
        }
    },
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            //kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };

    },
    formatData : function(dataMap){
    	var utilitiesObj = utilities.getUtilityObj();
    	//var timeFormat = utilitiesObj.geti18nValueKA("i18n.common.TimeFormatKA");
		var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME");
    	dataMap["form"][0]["ActualStartDate"] = convertTimeZone(moment(dataMap["form"][0]["ActualStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);
    	dataMap["form"][0]["ActualEndDate"] = convertTimeZone(moment(dataMap["form"][0]["ActualEndDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);
    	return dataMap;
    },
    bindData: function(dataMap) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            var processedData = {}; 
          	processedData["endDateTimeVal"] = dataMap["form"][0]["ActualEndDate"];
    		processedData["duration"] = this.calculateDuration(dataMap["form"][0]["ActualEndDate"],dataMap["form"][0]["ActualStartDate"]);
          	
            dataMap = this.formatData(dataMap);
            var formData = dataMap["form"][0];
			if(!formmodel.getViewAttributeByProperty("flexPopupKA", "isVisible")) {
				formmodel.performActionOnView("flexMainKA", "setEnabled", [true]);	
				formmodel.performActionOnView("btnBackKA","setEnabled",[true]);
				formmodel.performActionOnView("btnSaveKA","setEnabled",[true]);	
			}			
            processedData["lblEndDateTimeValKA"] = formData["ActualEndDate"];
            processedData["lblActionCodeCalKA"] = formData["Code"];
          	processedData["lblStartTimeKA"] = formData["ActualStartDate"];
            processedData["lblEndTimeKA"] = formData["ActualEndDate"];
            processedData["lblOrderNumberKA"] = formData["Code"];
            processedData["lblOrderDetailsKA"] = formData["Description"];
            
            var contactData = dataMap["flxContactNameKA"]?(dataMap["flxContactNameKA"][0] ? dataMap["flxContactNameKA"][0] : null) : null;
    		var ContactprocessedData = {};
    		if(contactData){
				this.contactDetail=contactData["id"];
				ContactprocessedData["lblOrderCompletedByKA"] = (contactData["FirstName"] ? contactData["FirstName"] : "") + " " + (contactData["LastName"] ? contactData["LastName"] : "");							
	        }
    		dataMap["flxContactNameKA"] = ContactprocessedData; 
          	var utilitiesObj = utilities.getUtilityObj();
            var addressData = "";          
          	if (formData["Address"] && formData["Address"][0]) {
              	addressData = utilitiesObj.getOrderAddress(formData["Address"][0]);
              	processedData["lblOrderCompletionAddressKA"] = utilitiesObj.dataTruncation(addressData, 47, 3, "...").value;
            }  

            for (var i = 5; i <= 11 ; i ++) {
            	  formmodel.setViewAttributeByProperty("flxSwitch" + i + "KA" , "width", "58dp");
            	  if(i == 5 || i == 6 || i == 8 || i == 10){
            	  	formmodel.setViewAttributeByProperty("flxSwitch" + i + "KA" , "height", "60%");	
            	  }else if(i == 7){
            	  	formmodel.setViewAttributeByProperty("flxSwitch" + i + "KA" , "height", "52%");		
            	  }else if(i == 9){
            	  	formmodel.setViewAttributeByProperty("flxSwitch" + i + "KA" , "height", "50%");		
            	  }else if(i == 11){
            	  	formmodel.setViewAttributeByProperty("flxSwitch" + i + "KA" , "height", "55%");		
            	  }				  				  
			}
          	
          	var checklist = dataMap["flxProblemKA"];
            if (checklist) {
                var surveyFields = {};
               
                var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
                var toggleID = "";
				var selectProperty = "";
				var yesValue = "";
				var noValue = "";
				var pickList = [];
				var controller = this.getController();
				var appContext = controller.getApplicationContext();
				var completeOrderControllerExtension = appContext.getFormController("frmCompleteOrderKA").getControllerExtensionObject();
				var surveyDefinitionID = completeOrderControllerExtension.getFormModelInfo("SurveyIDs")[0];
				var surveyResponseID = completeOrderControllerExtension.getFormModelInfo("SurveyResponseIDs")[0];
              	var utilitiesObj = utilities.getUtilityObj();
                this.setFormModelInfo("surveyDefinitionID", surveyDefinitionID);
                this.setFormModelInfo("surveyResponseID", surveyResponseID);
				toggleID = "switchProblemSolved";
				selectProperty = "selectedIndex";
				yesValue = 0;
				noValue = 1;
				
				for (var i = 5; i <= 11 ; i ++) {
				  formmodel.setViewAttributeByProperty("flxToggle" + i + "KA" , "isVisible", false);
				  formmodel.setViewAttributeByProperty("tbxProblemSolved" + i + "KA" , "text", "");
				}

				for(var j =0; j < checklist.length ; j++) {
					if(checklist[j].datatype_id == "PICKLIST_SINGLE"){
						var idKey = checklist[j].code;						
						pickList.push(checklist[j]);
					}                         
				}
            	for (var i = 0, j=0; (i <= this.SECTION_THREE_QUE)&&j<=11 ; i++,j++) {					
					if(i == 0){
						j = i + 1;
					}
					
                    surveyFields[checklist[i]["surveyfielddefinition_id"]] = checklist[i]["surveyfieldvalue_id"];
					if(checklist[i].datatype_id == "BOOL"){ 
						if(i == this.START_QUE_NO){		
							var showQue = false;
							formmodel.setViewAttributeByProperty("tbxProblemSolved" + j + "KA", "skin", this.tbxSkn);
							formmodel.setViewAttributeByProperty("lblProblemSolved" + j + "KA", "skin", this.labelSkn);
							formmodel.setViewAttributeByProperty("flxToggle" + j + "KA" , "isVisible", true);
							formmodel.setViewAttributeByProperty("lblProblemSolved"  + j + "KA", "text", checklist[i].label);
							formmodel.setViewAttributeByProperty("lblLine"  + j + "KA", "isVisible", true);
							
							if(checklist[i].fieldvalue && (checklist[i].fieldvalue.toUpperCase() == utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.no.valueKA") || checklist[i].fieldvalue.toUpperCase() == "N")){
								this.isProblemSolved = false;			
								formmodel.setViewAttributeByProperty(toggleID + j + "KA" , selectProperty, noValue); 
								formmodel.setViewAttributeByProperty("tbxProblemSolved" + j + "KA" , "isVisible", true); 
								formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + j + "KA", "text", checklist[i].fieldvalue);
								showQue = true;
								var reason_id = this.REASON_QUE_NO_START + ((i - this.START_QUE_NO)/2);
								formmodel.setViewAttributeByProperty("tbxProblemSolved" + j + "KA" , "text", checklist[reason_id].fieldvalue);	
								
							}else{
								this.isProblemSolved = true;			
								formmodel.setViewAttributeByProperty(toggleID + j + "KA" , selectProperty, yesValue); 
								formmodel.setViewAttributeByProperty("tbxProblemSolved" + j + "KA" , "isVisible", false); 
								formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + j + "KA", "text", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"));
							}
							
							var k = this.SECTION_ONE_QUE_START_IDX;	
							
							formmodel.setViewAttributeByProperty("tbxProblemSolved" + k + "KA", "skin", this.tbxSkn);
							formmodel.setViewAttributeByProperty("lblProblemSolved" + k + "KA", "skin", this.labelSkn);
							formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", showQue); 
							formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", showQue);
							formmodel.setViewAttributeByProperty("lblProblemSolved"  + k + "KA", "text", checklist[this.SECTION_TWO_QUE].label);
							formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + k + "KA", "text", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"));                     
							
							surveyFields[checklist[this.SECTION_TWO_QUE]["surveyfielddefinition_id"]] = checklist[this.SECTION_TWO_QUE]["surveyfieldvalue_id"];
							
							if(checklist[this.SECTION_TWO_QUE].fieldvalue && (checklist[this.SECTION_TWO_QUE].fieldvalue.toUpperCase() == utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.no.valueKA") || checklist[this.SECTION_TWO_QUE].fieldvalue.toUpperCase() == "N")){
								this.isReschedule = true;
								formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, noValue); 
								formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + k + "KA", "text", checklist[this.SECTION_TWO_QUE].fieldvalue);
								formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", true);			
								var reason_id = this.REASON_QUE_NO_START + ((this.SECTION_TWO_QUE - this.START_QUE_NO)/2);
								formmodel.setViewAttributeByProperty("tbxProblemSolved" + k + "KA" , "text", checklist[reason_id].fieldvalue);	
								
							}else{
								formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue); 
								formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
								this.isReschedule = false;	
							}
							
							k++;
							
							var l = this.SECTION_ONE_QUE_START;
							for(; k <= (this.SECTION_ONE_QUE_END_IDX+1) ; k++, l=l+2){
								formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue); 
								formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", true); 
								formmodel.setViewAttributeByProperty("lblProblemSolved"  + k + "KA", "text", checklist[l].label);
								formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + k + "KA", "text", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"));                                    
								formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
								formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", true);
								formmodel.setViewAttributeByProperty("tbxProblemSolved" + k + "KA", "skin", this.tbxSkn);
								formmodel.setViewAttributeByProperty("lblProblemSolved" + k + "KA", "skin", this.labelSkn);
								surveyFields[checklist[l]["surveyfielddefinition_id"]] = checklist[l]["surveyfieldvalue_id"];
								
								if(checklist[l].fieldvalue && (checklist[l].fieldvalue.toUpperCase() == utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.no.valueKA") || checklist[l].fieldvalue.toUpperCase() == "N")){
									formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, noValue);				
									formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + k + "KA", "text", checklist[l].fieldvalue);
									formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", true);				
									var reason_id = this.REASON_QUE_NO_START + ((l - this.START_QUE_NO)/2);
									formmodel.setViewAttributeByProperty("tbxProblemSolved" + k + "KA" , "text", checklist[reason_id].fieldvalue);
								}			
							}
									 
							formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", showQue); 
							formmodel.setViewAttributeByProperty("lblProblemSolved"  + k + "KA", "text", checklist[this.SECTION_THREE_QUE].label);
							formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", showQue);
							formmodel.setViewAttributeByProperty("tbxProblemSolved" + k + "KA", "skin", this.tbxSkn);
							formmodel.setViewAttributeByProperty("lblProblemSolved" + k + "KA", "skin", this.labelSkn);
							surveyFields[checklist[this.SECTION_THREE_QUE]["surveyfielddefinition_id"]] = checklist[this.SECTION_THREE_QUE]["surveyfieldvalue_id"];
									
							if(checklist[this.SECTION_THREE_QUE].fieldvalue && (checklist[this.SECTION_THREE_QUE].fieldvalue.toUpperCase() == utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.no.valueKA") || checklist[this.SECTION_THREE_QUE].fieldvalue.toUpperCase() == "N")){
								this.createWorkOrder = false;
								formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, noValue);
								formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + k + "KA", "text", checklist[this.SECTION_THREE_QUE].fieldvalue);
								formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", true);
								var reason_id = this.REASON_QUE_NO_START + ((this.SECTION_THREE_QUE - this.START_QUE_NO)/2);
								formmodel.setViewAttributeByProperty("tbxProblemSolved" + k + "KA" , "text", checklist[reason_id].fieldvalue);
							}else{
								this.createWorkOrder = true;
								formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue);
								formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + k + "KA", "text", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"));
								formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
							}
							i = this.SECTION_THREE_QUE;
						}
						i++;
					} else if(checklist[i].datatype_id == "PICKLIST_SINGLE"){						
						this.setMasterDataForListBox(pickList);					
						formmodel.setViewAttributeByProperty("tbxProblemSolved" + j + "KA" , "isVisible", false);
                        formmodel.setViewAttributeByProperty(toggleID + j + "KA" , "isVisible", false);
						formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + j + "KA", "text", checklist[i].fieldvalue);
						formmodel.setViewAttributeByProperty("lblProblemSolved" + j + "KA" , "text", checklist[i].label); 
						formmodel.setViewAttributeByProperty("lblProblemSolvedVal"+ j + "KA","isVisible",false);
						formmodel.setViewAttributeByProperty("ListBoxActionCode3KA","isVisible",true);
						i = this.START_QUE_NO_IDX;
					} else if(checklist[i].datatype_id !== "NULL"){
						 formmodel.setViewAttributeByProperty("tbxProblemSolved" + j + "KA" , "isVisible", false);
                         formmodel.setViewAttributeByProperty(toggleID + j + "KA" , "isVisible", false);
						 if(i == 0){						
							var date = convertTimeZone(moment(processedData["endDateTimeVal"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,"YYYY-MM-DD hh:mm:ss A");
                            date = date.toString();
                            date = date.substring(5,10) + " / " + date.substring(11,16) + " " + date.substring(20,22);
							formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + j + "KA", "text",date);
							formmodel.setViewAttributeByProperty("lblProblemSolved" + j + "KA" , "text", checklist[i].label + " / " + checklist[i+1].label);
							surveyFields[checklist[i+1]["surveyfielddefinition_id"]] = checklist[i+1]["surveyfieldvalue_id"];
							i = i + 1;
						}else{
							formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + j + "KA", "text", processedData["duration"]);
							formmodel.setViewAttributeByProperty("lblProblemSolved" + j + "KA" , "text", checklist[i].label );
							formmodel.setViewAttributeByProperty("lblProblemSolved" + j + "KA" , "skin", this.labelSkn);
						}
						if(i == 6){
							formmodel.setViewAttributeByProperty("tbxProblemSolved"+ j + "KA","isVisible",true);
							formmodel.setViewAttributeByProperty("lblProblemSolvedVal"+ j + "KA","isVisible",false);
							formmodel.setViewAttributeByProperty("tbxProblemSolved"  + j + "KA", "text", checklist[i].fieldvalue);							
						}
                    }
		     	}
				
				for(i=this.REASON_QUE_NO_START; i<=this.REASON_QUE_NO_END; i++){
					surveyFields[checklist[i]["surveyfielddefinition_id"]] = checklist[i]["surveyfieldvalue_id"];
				}
                this.setFormModelInfo("surveyFields", surveyFields);              

            }
            dataMap["form"] = processedData;
            this.$class.$superp.bindData.call(this, dataMap);
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            //kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
	setMasterDataForListBox: function(data) {
        try {
            var masterData = []; 
			var selectedKey = "";
            var formmodel = this.getController().getFormModel();
            if(data.length === 0 ){
               return;
            }
            for (var value in data) {  
				var key = data[value]["id"];
				var fieldvalue = data[value]["optionitem_name"];
                if (data[value]["fieldvalue"] == fieldvalue) {
					selectedKey = key;
					formmodel.setViewAttributeByProperty("lblProblemSolvedVal3KA", "text", fieldvalue);
                }
                masterData.push([key,fieldvalue]);
            }
            formmodel.setViewAttributeByProperty("ListBoxActionCode3KA", "masterData", masterData);
            if(selectedKey != ""){
            	formmodel.setViewAttributeByProperty("ListBoxActionCode3KA", "selectedKey",selectedKey);
            }else{
				formmodel.setViewAttributeByProperty("ListBoxActionCode3KA", "selectedKey",data[0]["id"]);            	
            }
			
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in setMasterDataForListBox", e);
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
    clearData: function() {
        formmodel.performActionOnView("flxScrollOuterKA", "removeAll");
        formmodel.performActionOnView("flxScrollOuterKA", "forceLayout");
    },

    completeChecklist: function() {
      try {
	    var utilitiesObj = utilities.getUtilityObj(); 
	    showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
        var scopeObj = this;
		var entityName = "";
        var configObj = this.getController().getConfig();
        var formmodel = this.getController().getFormModel();
      	var objHandler = kony.sdk.mvvm.persistent.Record;
		var controller = scopeObj.getController();
        var appContext = controller.getApplicationContext();
		var completeOrderControllerExtension = appContext.getFormController("frmCompleteOrderKA").getControllerExtensionObject();
        var woSurveyIDs = completeOrderControllerExtension.getFormModelInfo("WorkOrderSurveyIDs");
		var workOrderID = completeOrderControllerExtension.getFormModelInfo("WorkOrderId");
		var surveyFields = this.getFormModelInfo("surveyFields");
        var surveyDefinitionID = this.getFormModelInfo("surveyDefinitionID");
        var surveyResponseID = this.getFormModelInfo("surveyResponseID");
      	if(surveyFields !== undefined){
          var fieldIDs = Object.keys(surveyFields);
          var recordsTobeUpdated = [];
          
          var isAllMandatoryFieldsFilled = true;
          var skinFieldsToBeUpdated = [];
		  
          var actionDesc = formmodel.getViewAttributeByProperty("tbxProblemSolved4KA", "text");  
		  formmodel.setViewAttributeByProperty("lblProblemSolvedVal4KA", "text", actionDesc);
          
          /*if(!actionDesc){
            isAllMandatoryFieldsFilled = false; 
            skinFieldsToBeUpdated.push("lblProblemSolved4KA");
          }else{
            formmodel.setViewAttributeByProperty("lblProblemSolved4KA", "skin", this.labelSkn);           
          }*/
          
		  
		  var reasonIDLength = fieldIDs.length-7;
		  for(i=3,j=3; j<reasonIDLength; i++,j++){
              var fieldID = fieldIDs[i];
              var response = formmodel.getViewAttributeByProperty("lblProblemSolvedVal"  + j + "KA", "text");  
              if(response == utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.no.valueKA")){
                var txtResponse = formmodel.getViewAttributeByProperty("tbxProblemSolved"  + j + "KA", "text");  
                if(txtResponse == ""){
                  	isAllMandatoryFieldsFilled = false; 
                    skinFieldsToBeUpdated.push("lblProblemSolved"  + j + "KA");
                }else{
                  formmodel.setViewAttributeByProperty("lblProblemSolved" + j + "KA", "skin", this.labelSkn);                  
                }
                
              }else{
                if(j == 4){
              		 formmodel.setViewAttributeByProperty("lblProblemSolved" + j + "KA", "skin", this.labelSkn);                  
                }
              }
			  var surveyFieldValue_id = surveyFields[fieldID];
              recordsTobeUpdated.push({"SurveyFieldDefintion_id": fieldID, "FieldValue" : response, "SurveyResponse_id" : surveyResponseID, "SurveyDefinition_id" : surveyDefinitionID});
			   if(surveyFieldValue_id !== undefined && surveyFieldValue_id !== null){
				recordsTobeUpdated[recordsTobeUpdated.length-1]["id"] = surveyFieldValue_id;
			   }
          }
          
          if(!isAllMandatoryFieldsFilled){
            var utilitiesObj = utilities.getUtilityObj();
			kony.sdk.mvvm.Util.callAlert(utilitiesObj.geti18nValueKA("i18n.frmCompleteOrderKA.MandatoryFields"),"info", function(){}, "", "Ok","");
			for(var mandatoryfields=0; mandatoryfields<skinFieldsToBeUpdated.length; mandatoryfields++){
            	formmodel.setViewAttributeByProperty(skinFieldsToBeUpdated[mandatoryfields], "skin",this.questionsSknChange); 
            }
			dismissLoadingScreen();
            return;
              
          }
          
		  /*
		  for(var i=reasonIDLength, j=5; (i < fieldIDs.length); i++, j++){
              var fieldID = fieldIDs[i];
              var response = formmodel.getViewAttributeByProperty("tbxProblemSolved"  + j + "KA", "text");  
			  var surveyFieldValue_id = surveyFields[fieldID];
              recordsTobeUpdated.push({"SurveyFieldDefintion_id": fieldID, "FieldValue" : response, "SurveyResponse_id" : surveyResponseID, "SurveyDefinition_id" : surveyDefinitionID});
			  if(surveyFieldValue_id !== undefined && surveyFieldValue_id !== null){
				recordsTobeUpdated[recordsTobeUpdated.length-1]["id"] = surveyFieldValue_id;
			   }
          }*/

			var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
			var toggleID = "";
			var selectProperty = "";
			var yesValue = "";
			var noValue = "";
				  
			toggleID = "switchProblemSolved";
			selectProperty = "selectedIndex";
			yesValue = 0;
			noValue = 1;			
			
			if (formmodel.getViewAttributeByProperty("switchProblemSolved5KA","selectedIndex") == 1) {
			  for(var i=reasonIDLength, j=5; (i < fieldIDs.length-2); i++, j++){
				  if(j==6)
					j++;
				  var fieldID = fieldIDs[i];
				  var response = formmodel.getViewAttributeByProperty("tbxProblemSolved"  + j + "KA", "text");  
				  var surveyFieldValue_id = surveyFields[fieldID];
				  recordsTobeUpdated.push({"SurveyFieldDefintion_id": fieldID, "FieldValue" : response, "SurveyResponse_id" : surveyResponseID, "SurveyDefinition_id" : surveyDefinitionID});
				  if(surveyFieldValue_id !== undefined && surveyFieldValue_id !== null){
					recordsTobeUpdated[recordsTobeUpdated.length-1]["id"] = surveyFieldValue_id;
				   }
			  } 
			  var fieldID = fieldIDs[i];
			  var response = formmodel.getViewAttributeByProperty("tbxProblemSolved6KA", "text");  
			  var surveyFieldValue_id = surveyFields[fieldID];
			  recordsTobeUpdated.push({"SurveyFieldDefintion_id": fieldID, "FieldValue" : response, "SurveyResponse_id" : surveyResponseID, "SurveyDefinition_id" : surveyDefinitionID});
			  if(surveyFieldValue_id !== undefined && surveyFieldValue_id !== null){
				recordsTobeUpdated[recordsTobeUpdated.length-1]["id"] = surveyFieldValue_id;
			   } 
			  i++;
			  fieldID = fieldIDs[i];
			  response = formmodel.getViewAttributeByProperty("tbxProblemSolved11KA", "text");  
			  surveyFieldValue_id = surveyFields[fieldID];
			  recordsTobeUpdated.push({"SurveyFieldDefintion_id": fieldID, "FieldValue" : response, "SurveyResponse_id" : surveyResponseID, "SurveyDefinition_id" : surveyDefinitionID});
			  if(surveyFieldValue_id !== undefined && surveyFieldValue_id !== null){
				recordsTobeUpdated[recordsTobeUpdated.length-1]["id"] = surveyFieldValue_id;
			   }
			}else{
				for(var i=reasonIDLength, j=5; (i < fieldIDs.length); i++, j++){
				  var fieldID = fieldIDs[i];
				  var response = formmodel.getViewAttributeByProperty("tbxProblemSolved"  + j + "KA", "text");  
				  var surveyFieldValue_id = surveyFields[fieldID];
				  recordsTobeUpdated.push({"SurveyFieldDefintion_id": fieldID, "FieldValue" : response, "SurveyResponse_id" : surveyResponseID, "SurveyDefinition_id" : surveyDefinitionID});
				  if(surveyFieldValue_id !== undefined && surveyFieldValue_id !== null){
					recordsTobeUpdated[recordsTobeUpdated.length-1]["id"] = surveyFieldValue_id;
				   }
			  }
			}
                    
          if(!surveyResponseID){
              entityName = "SurveyResponse";
              var recordObject = new objHandler(entityName);  
              recordObject.set("SurveyDefinition_id",surveyDefinitionID);
              
		      var childRecordObjects = [];
			  

			 for(var i =0 ; i < recordsTobeUpdated.length ; i++){
				  var childRecordObject = new objHandler("SurveyFieldValue");
				  childRecordObject.setInfo("serviceName", configObj.getObjectServiceName());
				  childRecordObject.setInfo("options", configObj.getObjectServiceOptions());
				  childRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
				  childRecordObject.set("SurveyFieldDefintion_id",recordsTobeUpdated[i].SurveyFieldDefintion_id);
				  childRecordObject.set("FieldValue", recordsTobeUpdated[i].FieldValue);
				  childRecordObject.set("SurveyDefinition_id", recordsTobeUpdated[i].SurveyDefinition_id);				
				  childRecordObjects.push(childRecordObject);
			}
              recordObject.set("SurveyFieldValue",childRecordObjects);
              recordObject.setInfo("serviceName", configObj.getObjectServiceName());
              recordObject.setInfo("options", configObj.getObjectServiceOptions());
              recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
              
			  var onSuccess = function(response){
				
				entityName = "EventSurvey";
                var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);     
				var storedUsername = credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase();
          	
                var recordObject = new objHandler(kony.servicesapp.ENTITY_EVENTSURVEY); 
				recordObject.set("SurrveyResponse_id", response.id);			
				//recordObject.set("id", woSurveyIDs[1]);
                recordObject.set("SurveyDefinition_id", surveyDefinitionID);
                recordObject.set("EventType_id","WO_CHECKLIST");
                recordObject.set("User_id",storedUsername);
				recordObject.set("Workorder_id", workOrderID);
				recordObject.setInfo("serviceName", configObj.getObjectServiceName());
				recordObject.setInfo("options", configObj.getObjectServiceOptions());
								
				this.setFormModelInfo("surveyResponseID", response.id);
				
				
				var onUpdateSuccess = function(res){
				  if(scopeObj.showPopup) {
					formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible", true);
					dismissPopUp("completeOrderConfirmation",3, scopeObj.navigateBack);
					formmodel.performActionOnView("flexMainKA", "setEnabled", [false]);	
					formmodel.performActionOnView("btnBackKA","setEnabled",[false]);
					formmodel.performActionOnView("btnSaveKA","setEnabled",[false]);	
                    scopeObj.showPopup = true;					
					scopeObj.fetchData();					
				  } else {
					  var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
					  controller.performAction("navigateBack");
				  }
                  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                  /*if (kony.sdk.mvvm.isNetworkAvailabile()) {
                    kony.servicesapp.backgroundSyncOnStatusChangeKA();
                  }*/
				}
				
				var onUpdateError = function(err){
				 // alert("Error in updating WorkOrder");
				}
				
				scopeObj.saveRecord(recordObject, onUpdateSuccess, onUpdateError);                
              };
              var onError = function(){
               // alert("Error in creating Survey Response");
              };
              scopeObj.saveRecord(recordObject, onSuccess, onError);
          }else{
              entityName = "SurveyFieldValue";
              var sfvRecords = [];
              var onSuccess = function(){
				if(scopeObj.showPopup == true) {
					formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible", true);
					dismissPopUp("completeOrderConfirmation",3, scopeObj.navigateBack);
					formmodel.performActionOnView("flexMainKA", "setEnabled", [false]);	
                    formmodel.performActionOnView("btnBackKA","setEnabled",[false]);
					formmodel.performActionOnView("btnSaveKA","setEnabled",[false]);	
					scopeObj.showPopup = true;
					scopeObj.fetchData();
				} else {
					var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
					controller.performAction("navigateBack");
                }
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                /*if (kony.sdk.mvvm.isNetworkAvailabile()) {
                  kony.servicesapp.backgroundSyncOnStatusChangeKA();
                }*/
              };
              var onError = function(){
                //alert("Update Error");
              };
              for(var i=0; i < recordsTobeUpdated.length; i++){
                  var recordObject = new objHandler(entityName); 
				  var surveyFieldDefinition_id = recordsTobeUpdated[i].SurveyFieldDefintion_id;
                  recordObject.set("SurveyFieldDefintion_id", surveyFieldDefinition_id);
                  recordObject.set("FieldValue", recordsTobeUpdated[i].FieldValue);
				  if(recordsTobeUpdated[i].id !== undefined && recordsTobeUpdated[i].id !== null){
					recordObject.set("id", recordsTobeUpdated[i].id);
				  }
                  recordObject.set("SurveyResponse_id", recordsTobeUpdated[i].SurveyResponse_id);
                  recordObject.set("SurveyDefinition_id", recordsTobeUpdated[i].SurveyDefinition_id);
                  recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                  recordObject.setInfo("options", configObj.getObjectServiceOptions());
                  sfvRecords.push(recordObject);
              }
			  if(sfvRecords.length !== 0)
				scopeObj.saveRecords(sfvRecords, onSuccess, onError);
          }
        }
	  }catch (err) {
        kony.sdk.mvvm.log.error(err)
      }
    },
    cancelOrderComplete: function() {
	  var scopeObj = this;
      var utilitiesObj = utilities.getUtilityObj();  
      var message = utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.saveInfo.valueKA");
      var lclYesMessage = utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes");
      var lclNoMessage = utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.No");
      kony.sdk.mvvm.Util.callAlert(message, "confirmation", saveData, "", lclYesMessage, lclNoMessage);
	  var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");	
      function saveData(response) {
        if(response == true) {
		  // save the data intermittently	
		  showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
		  scopeObj.showPopup = true;
		  controller.performAction("completeChecklist");
	    } else {
		  scopeObj.showPopup = false;
		  controller.performAction("navigateBack");
	    }
      }	
    },
	switchSlideCallback: function(idx) {
		var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
		var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
		var formmodel = controller.getFormModel();
      	var utilitiesObj = utilities.getUtilityObj();
		var toggleID = "";
		var selectProperty = "";
		var yesValue = "";
		var noValue = "";
	  
		toggleID = "switchProblemSolved";
		selectProperty = "selectedIndex";
		yesValue = 0;
		noValue = 1;
                
		if (formmodel.getViewAttributeByProperty("switchProblemSolved"+idx+"KA","selectedIndex") == 1) {
			formmodel.setViewAttributeByProperty("lblProblemSolvedVal"+idx+"KA", "text", utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.no.valueKA"));
			formmodel.setViewAttributeByProperty("tbxProblemSolved"+idx+"KA", "text", "");
			formmodel.setViewAttributeByProperty("tbxProblemSolved"+idx+"KA", "isVisible", true);
			formmodel.setViewAttributeByProperty("tbxProblemSolved"+idx+"KA", "skin", this.tbxSknFocus);
			formmodel.setViewAttributeByProperty("lblProblemSolved"+idx+"KA", "skin", this.labelSknFocus);
			if(idx == this.START_QUE_NO_IDX){
				var k = this.SECTION_ONE_QUE_START_IDX;
				var queEnd = this.SECTION_ONE_QUE_END_IDX;
				if(this.isProblemSolved){
				  formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue); 
				  formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", true); 					  
				  formmodel.setViewAttributeByProperty("lblProblemSolvedVal" + k + "KA", "text",utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"));
				  formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
				  formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", true);
				  queEnd++;
				  this.isProblemSolved = false;
				}k++;
				for( ; k <= queEnd ; k++){ 
				  formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", true); 
				  formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", true);
				}
				for( ; k <= this.SECTION_THREE_QUE_IDX ; k++){
				  formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue); 
				  formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", true);
				  formmodel.setViewAttributeByProperty("lblProblemSolvedVal" + k + "KA", "text", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes")); 
				  formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
				  formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", true);
				}
			} else if(idx == (this.START_QUE_NO_IDX + 1) && !(this.isProblemSolved)){
				for(var k = (idx + 1) ; k <= this.SECTION_THREE_QUE_IDX ; k++){
				  formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue); 
				  formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", false); 
				  formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
				  formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", false);
				}
				/*
				var message = "The work order will be returned to the back office as a rescheduled work order for further planning and execution";
				var lclYesMessage = "Ok";
				var lclNoMessage = "Cancel";
				kony.sdk.mvvm.Util.callAlert(message, "confirmation", saveData, "", lclYesMessage, lclNoMessage);

				function saveData(response) {
				  if(response == true) {
					// change the status to RESCHEDULE
					// navigate to Order List form
					frmOrderListKA.show();
				  }
				}	
				*/
			}       				
		} else {
			if(idx == this.START_QUE_NO_IDX){
				var k = this.SECTION_ONE_QUE_START_IDX;
				var queEnd = this.SECTION_ONE_QUE_END_IDX;
				if(!this.isProblemSolved){
				  formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue); 
				  formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", false); 
				  formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
				  formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", false);
				  queEnd++;
				  this.isProblemSolved = true;
				} k++;
				for( ; k <= queEnd ; k++){
				  formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", true); 
				  formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", true);
				}
				for( ; k <= this.SECTION_THREE_QUE_IDX ; k++){
				  formmodel.setViewAttributeByProperty(toggleID + k + "KA" , selectProperty, yesValue); 
				  formmodel.setViewAttributeByProperty("flxToggle" + k + "KA" , "isVisible", false); 
				  formmodel.setViewAttributeByProperty("tbxProblemSolved"  + k + "KA", "isVisible", false);
				  formmodel.setViewAttributeByProperty("lblLine"  + k + "KA", "isVisible", false);
				}
			}						
			formmodel.setViewAttributeByProperty("lblProblemSolvedVal"+idx+"KA", "text", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"));
			formmodel.setViewAttributeByProperty("tbxProblemSolved"+idx+"KA", "isVisible", false);
			formmodel.setViewAttributeByProperty("tbxProblemSolved"+idx+"KA", "skin", this.tbxSkn);
			formmodel.setViewAttributeByProperty("lblProblemSolved"+idx+"KA", "skin", this.labelSkn);
		} 
	},
	navigateBack: function(){ 
	     try{
			try {
					kony.timer.cancel("completeOrderConfirmation");
				} catch (e) {
					kony.sdk.mvvm.log.error("error in Blogic cancelTimer : " + e);
				}
				var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
				var formmodel = controller.getFormModel();
				formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible",false);
				var controllerExtensionObject=controller.getControllerExtensionObject();
				controllerExtensionObject.showPopup = false;
			    controllerExtensionObject.$class.$superp.showPreviousForm.call(controllerExtensionObject,true,"frmCompleteOrderKA");
			
			
			}      
         catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  	calculateDuration: function(endDate,startDate){
        endDate = convertTimeZone(moment(endDate,"YYYY-MM-DD HH:mm:ss").format(),null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss");
        startDate = convertTimeZone(moment(startDate,"YYYY-MM-DD HH:mm:ss").format(),null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss");
        var diff = moment(endDate,"YYYY-MM-DD HH:mm:ss").diff(moment(startDate,"YYYY-MM-DD HH:mm:ss"),"seconds");
      	var utilitiesObj = utilities.getUtilityObj();
      	diff = utilitiesObj.dateFormat(diff, "HH:MM");
        return diff;
	},
  	setListBox: function(){
      	var frmModel = this.getController().getFormModel();
		frmModel.setViewAttributeByProperty("lblProblemSolvedVal3KA","text",frmModel.getViewAttributeByProperty("ListBoxActionCode3KA","selectedKeyValues")[0][1]);     
    }
});