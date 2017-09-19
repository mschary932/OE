
/**
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmCustomerSignOffKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmCustomerSignOffKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.QUESTION_1 = 'question_1';
        this.REASON_1 = 'reason_1';
        this.OTHER_REASON_1 = 'other_reason_1';
        this.COMMENTS = 'comments';
		this.labelSkn = "sknLbl5B7A9AClanProNews28KA";
		this.tbxSkn = "skntbx5E5050ClanProBook28KA";
		this.labelSknFocus = "sknLbl5B7A9AClanProNews28KA ";
		this.tbxSknFocus = "sknTbxA4B2C1BorderFF5D6EBackgroundClanProBook30KA";
		this.questionsSknChange= "sknLblFF5D6EClanProBook28KA"
		this.showPopup = false;
		this.defaultselectedKey = "";
    },  
    fetchData: function() {
    	try {
          	var scopeObj = this;
          	var responseMap = {}
          	var contextData = scopeObj.getController().getContextData();
            scopeObj.setFormModelInfo("WorkOrderId", contextData.getCustomInfo("woInfo").woID);
	    	scopeObj.$class.$superp.fetchData.call(scopeObj,success,err);			
          	function success(response){
				responseMap = response;
				var name = null;
				if (responseMap && responseMap["flxSignatureKA"] && responseMap["flxSignatureKA"][0])
					name = responseMap["flxSignatureKA"][0]["BINARY_NAME"];
				if (name !== null && name !== "" && name !== undefined)
					scopeObj.fetchBinaryContent(name,sucCallback,err);
				else
					scopeObj.bindData(responseMap);
				function sucCallback(response){
					scopeObj.setFormModelInfo("signatureVal",response);
					responseMap["flxSignatureKA"][0]["base64data"] = response;
					scopeObj.bindData(responseMap);
				}
            }          
          	function err(e){
				scopeObj.bindData(responseMap);
				kony.sdk.mvvm.log.error(e.toString())
            }
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
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };

    },
    formatData : function(dataMap){
		try{
			var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME");
			dataMap["form"][0]["PlannedStartDate"] = convertTimeZone(moment(dataMap["form"][0]["PlannedStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);
			dataMap["form"][0]["PlannedEndDate"] = convertTimeZone(moment(dataMap["form"][0]["PlannedEndDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);
			return dataMap;
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatData action : " + err);
        }
    },
    bindData: function(dataMap) {
        try {
			var scopeObj = this;
			var controller = scopeObj.getController();
            var formmodel = controller.getFormModel();
            formmodel.clear();
            dataMap = scopeObj.formatData(dataMap);
            var result = scopeObj.setSegData(dataMap);
			dataMap = result[0];
			var processedData = result[1];
			scopeObj.setUICompleteOrderAcceptance(dataMap);
            var checklist = dataMap["flxProblemKA"];
            if (checklist) {
                var numberOfQuestion = checklist.length;
                var surveyFields = {};              
                var appContext = controller.getApplicationContext();
				var completeOrderControllerExtension = appContext.getFormController("frmCompleteOrderKA").getControllerExtensionObject();
				var SurveyIDsLength=completeOrderControllerExtension.getFormModelInfo("SurveyIDsLength");
              	var surveyDefinitionID = completeOrderControllerExtension.getFormModelInfo("SurveyIDs")[SurveyIDsLength-1];
              	var surveyResponseID = completeOrderControllerExtension.getFormModelInfo("SurveyResponseIDs")[SurveyIDsLength-1];
                scopeObj.setFormModelInfo("surveyDefinitionID", surveyDefinitionID);
                scopeObj.setFormModelInfo("surveyResponseID", surveyResponseID);				               
                var questionBinded = false;
                var commentsBinded = false;
                var otherReason = "";
                var reason = "";
                var reasonIndex = -1;              
                var pickList = [];
                for(var j =0; j < numberOfQuestion; j++){
					if(checklist[j].datatype_id == "PICKLIST_SINGLE" && checklist[j].name == scopeObj.REASON_1){
						if(!surveyFields[checklist[j]["surveyfielddefinition_id"]]){
							surveyFields[checklist[j]["surveyfielddefinition_id"]] = checklist[j]["surveyfieldvalue_id"]; 
							reason = checklist[j].fieldvalue;
						}							
						if(reason == checklist[j].code){
							reasonIndex = pickList.length;                                
						}
						pickList.push(checklist[j]);
					}else if(checklist[j].name == scopeObj.OTHER_REASON_1){
						surveyFields[checklist[j]["surveyfielddefinition_id"]] = checklist[j]["surveyfieldvalue_id"]; 
						otherReason = checklist[j].fieldvalue;
					}                           
				}
                for (var i = 0; i < numberOfQuestion; i ++) {                   
                    if(checklist[i].datatype_id == "BOOL" && checklist[i].name == scopeObj.QUESTION_1){
                        surveyFields[checklist[i]["surveyfielddefinition_id"]] = checklist[i]["surveyfieldvalue_id"];
						scopeObj.setUIForBoolTypeQuestion(checklist[i],otherReason,pickList);
                        questionBinded = true;                             
                    }else if(checklist[i].datatype_id == "TEXT" && checklist[i].name == scopeObj.COMMENTS){
                         surveyFields[checklist[i]["surveyfielddefinition_id"]] = checklist[i]["surveyfieldvalue_id"]; 
						 scopeObj.setUIForTextTypeQuestion(checklist[i]);
                         commentsBinded = true;
                    }
                    if(commentsBinded && questionBinded){
                        break;
                    }
                }
                scopeObj.setFormModelInfo("surveyFields", surveyFields);             
            }
            dataMap["form"] = processedData;
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
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
    completeChecklist: function() {
		try {
			var utilitiesObj = utilities.getUtilityObj(); 
			showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
			var scopeObj = this;
			var controller = scopeObj.getController();
			var configObj = controller.getConfig();
			var formmodel = controller.getFormModel();
			var objHandler = kony.sdk.mvvm.persistent.Record;
			var appContext = controller.getApplicationContext();
			var completeOrderControllerExtension = appContext.getFormController("frmCompleteOrderKA").getControllerExtensionObject();
			var woSurveyIDs = completeOrderControllerExtension.getFormModelInfo("WorkOrderSurveyIDs");
			var workOrderID = completeOrderControllerExtension.getFormModelInfo("WorkOrderId");
			var surveyFields = scopeObj.getFormModelInfo("surveyFields");
			var surveyDefinitionID = scopeObj.getFormModelInfo("surveyDefinitionID");
			var surveyResponseID = scopeObj.getFormModelInfo("surveyResponseID");
			var objServName = configObj.getObjectServiceName();
			var objServOptions = configObj.getObjectServiceOptions();
			var recordObject;
			if(surveyFields !== undefined){
				var result = scopeObj.checkSurveyField(surveyFields);
				var isAllMandatoryFieldsFilled = result[0];
				var recordsTobeUpdated = result[1];
				var skinFieldsToBeUpdated = result[2];       
				if(!isAllMandatoryFieldsFilled){
					kony.sdk.mvvm.Util.callAlert(utilitiesObj.geti18nValueKA("i18n.frmCompleteOrderKA.MandatoryFields"),"info", function(){}, "", "Ok","");				
					for(var mandatoryfields=0; mandatoryfields<skinFieldsToBeUpdated.length; mandatoryfields++){
						formmodel.setViewAttributeByProperty(skinFieldsToBeUpdated[mandatoryfields], "skin",scopeObj.questionsSknChange); 
					}
					dismissLoadingScreen();
					return;              
				}	   
				if(!surveyResponseID){
					recordObject = new objHandler(kony.servicesapp.ENTITY_SURVEYRESPONSE); 
					recordObject.set("SurveyDefinition_id",surveyDefinitionID);
					var childRecordObject, childRecordObjects = [];
					for(var i =0 ; i < recordsTobeUpdated.length ; i++){
						childRecordObject = new objHandler(kony.servicesapp.ENTITY_SURVEYFIELDVALUE);
						childRecordObject.setInfo("serviceName", objServName);
						childRecordObject.setInfo("options", objServOptions);
						childRecordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
						childRecordObject.set("SurveyFieldDefintion_id",recordsTobeUpdated[i].SurveyFieldDefintion_id);
						childRecordObject.set("FieldValue", recordsTobeUpdated[i].FieldValue);
						childRecordObject.set("SurveyDefinition_id", recordsTobeUpdated[i].SurveyDefinition_id);
						childRecordObjects.push(childRecordObject);
					}
					recordObject.set("SurveyFieldValue",childRecordObjects);
					recordObject.setInfo("serviceName", objServName);
					recordObject.setInfo("options", objServOptions);
					recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
				  
					var onSuccess = function(response){
                      	var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);     
						var storedUsername = credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase();
						recordObject = new objHandler(kony.servicesapp.ENTITY_EVENTSURVEY); 
						recordObject.set("SurrveyResponse_id", response.id);			
						//recordObject.set("id", woSurveyIDs[1]);
                        recordObject.set("SurveyDefinition_id", surveyDefinitionID);
                        recordObject.set("EventType_id","WO_ACCEPTANCE");
                        recordObject.set("User_id",storedUsername);
						recordObject.set("Workorder_id", workOrderID);
						recordObject.setInfo("serviceName", objServName);
						recordObject.setInfo("options", objServOptions);                  
						scopeObj.setFormModelInfo("surveyResponseID", response.id);
						var onUpdateSuccess = function(res){
							if(scopeObj.showPopup == true) {
								formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible", true);
								formmodel.performActionOnView("flxMainKA", "setEnabled", [false]);	
								formmodel.performActionOnView("btnCloseKA","setEnabled",[false]);
								formmodel.performActionOnView("btnDoneKA","setEnabled",[false]);	
								dismissPopUp("completeOrderAcceptanceDismiss",3, scopeObj.navigateBack);
								scopeObj.fetchData();
								scopeObj.showPopup = false;
							} else {
								controller.performAction("navigateBack");
							}
							kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
					  
						}                
						var onUpdateError = function(err){
							kony.print("Error in updating"+err.toString());
						}                
						function saveSignature(res){
							var base64 = formmodel.getViewAttributeByProperty("imgSignatureKA", "base64");
							if(base64)
								scopeObj.updateBinaryContent(base64,onUpdateSuccess,onUpdateError);
							else
								onUpdateSuccess();
						}
						scopeObj.saveRecord(recordObject, saveSignature, onUpdateError);                
					};
					var onError = function(){
						kony.print("Error in creating Survey Response");
					};
					scopeObj.saveRecord(recordObject, onSuccess, onError);
				}else{
					var sfvRecords = [];
					var onSuccess = function(){
						if(scopeObj.showPopup == true) {
							formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible", true);
							formmodel.performActionOnView("flxMainKA", "setEnabled", [false]);	
							formmodel.performActionOnView("btnCloseKA","setEnabled",[false]);
							formmodel.performActionOnView("btnDoneKA","setEnabled",[false]);	
							dismissPopUp("completeOrderAcceptanceDismiss",3, scopeObj.navigateBack);
							scopeObj.fetchData();
							scopeObj.showPopup = false;
						} else {
							controller.performAction("navigateBack");
						}
						kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
						/*if (kony.sdk.mvvm.isNetworkAvailabile()) {
						  kony.servicesapp.backgroundSyncOnStatusChangeKA();
						}*/
					};
					var onError = function(){
						kony.print("Update Error");
					};
					var surveyFieldDefinition_id;
					for(var i=0; i < recordsTobeUpdated.length; i++){
						recordObject = new objHandler(kony.servicesapp.ENTITY_SURVEYFIELDVALUE); 
						surveyFieldDefinition_id = recordsTobeUpdated[i].SurveyFieldDefintion_id;
						recordObject.set("SurveyFieldDefintion_id", surveyFieldDefinition_id);
						recordObject.set("FieldValue", recordsTobeUpdated[i].FieldValue);
						if(recordsTobeUpdated[i].id !== undefined && recordsTobeUpdated[i].id !== null){
							recordObject.set("id", recordsTobeUpdated[i].id);
						}
						recordObject.set("SurveyResponse_id", recordsTobeUpdated[i].SurveyResponse_id);
						recordObject.set("SurveyDefinition_id", recordsTobeUpdated[i].SurveyDefinition_id);
						recordObject.setInfo("serviceName", objServName);
						recordObject.setInfo("options", objServOptions);
						sfvRecords.push(recordObject);
					}
					function saveSignature(response){
						if (scopeObj.getFormModelInfo("signatureVal") !== formmodel.getViewAttributeByProperty("imgSignatureKA", "base64")){
							var base64 = formmodel.getViewAttributeByProperty("imgSignatureKA", "base64");
							scopeObj.updateBinaryContent(base64,onSuccess,onError);
						}else
							onSuccess();
					}
					if(sfvRecords.length !== 0)
						scopeObj.saveRecords(sfvRecords, saveSignature, onError);
				}
			}
		}catch (err) {
			kony.sdk.mvvm.log.error(err)
		}
    },
	checkSurveyField: function(surveyFields) {
		try {
			var scopeObj = this;
			var formmodel = scopeObj.getController().getFormModel();
			var fieldIDs = Object.keys(surveyFields);
			var isAllMandatoryFieldsFilled = true;
			var skinFieldsToBeUpdated = [];
			var recordsTobeUpdated = [];
			var selectedKey = "";
			var surveyDefinitionID = scopeObj.getFormModelInfo("surveyDefinitionID");
			var surveyResponseID = scopeObj.getFormModelInfo("surveyResponseID");
			var fieldID, response, name, surveyFieldValue_id, otherKey, otherOptionKey;
			var fieldIDsLength = fieldIDs.length;
			for (var i = 0; i < fieldIDsLength; i++) {
				fieldID = fieldIDs[i];
				response = "";
				name = "";
				surveyFieldValue_id = surveyFields[fieldID];
				if (fieldID == "ACCEP_FD1") {
					response = formmodel.getViewAttributeByProperty("lblProblemSolvedVal1KA", "text")
					name = scopeObj.QUESTION_1;
				} else if (fieldID == "ACCEP_FD2") {
					response = formmodel.getViewAttributeByProperty("ListBoxProblemKA", "selectedKey");
					selectedKey = response;
					name = scopeObj.REASON_1;
				} else if (fieldID == "ACCEP_FD3") {
					response = formmodel.getViewAttributeByProperty("tbxProblemSolved1KA", "text");
					otherKey = scopeObj.getFormModelInfo();
					otherOptionKey = scopeObj.getFormModelInfo("OtherOptionKey");
					if (selectedKey == otherOptionKey) {
						if (!response) {
							isAllMandatoryFieldsFilled = false;
							skinFieldsToBeUpdated.push("lblProblemSolved1KA");
						} else {
							formmodel.setViewAttributeByProperty("lblProblemSolved1KA", "skin", scopeObj.labelSkn);
						}
					}
					name = scopeObj.OTHER_REASON_1;
				} else if (fieldID == "ACCEP_FD5") {
					response = formmodel.getViewAttributeByProperty("tbxProblemSolved2KA", "text")
					name = scopeObj.COMMENTS;
				}
				recordsTobeUpdated.push({
					"SurveyFieldDefintion_id": fieldID,
					"FieldValue": response,
					"SurveyResponse_id": surveyResponseID,
					"SurveyDefinition_id": surveyDefinitionID
				});
				if (surveyFieldValue_id !== undefined && surveyFieldValue_id !== null) {
					recordsTobeUpdated[recordsTobeUpdated.length - 1]["id"] = surveyFieldValue_id;
				}
			}
			return [isAllMandatoryFieldsFilled, recordsTobeUpdated, skinFieldsToBeUpdated];
		} catch (err) {
			kony.sdk.mvvm.log.error("==checkSurveyField==>", err);
		}
	},
   cancelOrderComplete: function() {
		try{
			var scopeObj = this;
			var utilitiesObj = utilities.getUtilityObj();
			kony.sdk.mvvm.Util.callAlert(utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.saveInfo.valueKA"), "confirmation", saveData, "", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"), utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.No"));
			var controller = scopeObj.getController();	
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
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic cancelOrderComplete action : " + err);
        }
    },
    setMasterDataForListBox: function(data) {
        try {
			var scopeObj = this;
            var masterData = [];          
            var formmodel = scopeObj.getController().getFormModel();
            if(data.length === 0 ){
               return;
            }   
			var selectedKey, otherOptionKey, idKey, value1;
            for (var value in data) {
				idKey = data[value]["id"];
                if (data[value]["fieldvalue"] == data[value]["id"]) {
					selectedKey = data[value]["id"];
                }
                if(value == data.length-1){
                    otherOptionKey = data[value]["id"];
                }
                value1 = data[value]["optionitem_name"];
				masterData.push([idKey,value1]);
            }
            formmodel.setViewAttributeByProperty("ListBoxProblemKA", "masterData", masterData);
            if(selectedKey !== ""){
                formmodel.setViewAttributeByProperty("ListBoxProblemKA", "selectedKey",selectedKey);   
            }else{
                formmodel.setViewAttributeByProperty("ListBoxProblemKA", "selectedKey", data[0]["id"]);
            }
            scopeObj.setFormModelInfo("OtherOptionKey", otherOptionKey);
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in setMasterDataForListBox", e);
        }
    },
	onSelectListBox: function(){
		try{
			var scopeObj = this;
			var formmodel = scopeObj.getController().getFormModel();
			var selectedKey = formmodel.getViewAttributeByProperty("ListBoxProblemKA", "selectedKey");
			var otherOptionKey = scopeObj.getFormModelInfo("OtherOptionKey");
			if(selectedKey == otherOptionKey){
				 formmodel.setViewAttributeByProperty("tbxProblemSolved1KA", "isVisible", true);
			}else{
				formmodel.setViewAttributeByProperty("tbxProblemSolved1KA", "isVisible", false);
				formmodel.setViewAttributeByProperty("tbxProblemSolved1KA", "text", "");
			}
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic onSelectListBox action : " + err);
        }
	},
    switchSlideCallback: function() {
		try{
			var scopeObj = this;
			var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
			var controller = scopeObj.getController();
			var formmodel = controller.getFormModel();
			var toggleID = "switchProblemSolved";
			var selectProperty = "selectedIndex";
          	var utilitiesObj = utilities.getUtilityObj();
			var yesValue = 0;
			var noValue = 1;		
			if (formmodel.getViewAttributeByProperty("switchProblemSolved"+"1KA","selectedIndex") == 1) {
				formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + "1KA", "text", utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.no.valueKA"));
				formmodel.setViewAttributeByProperty("ListBoxProblemKA" , "isVisible", true); 
				formmodel.setViewAttributeByProperty("tbxProblemSolved"+"1KA", "skin", scopeObj.tbxSknFocus);
				formmodel.setViewAttributeByProperty("lblProblemSolved"+"1KA", "skin", scopeObj.labelSknFocus);
			} else {                           
				formmodel.setViewAttributeByProperty("tbxProblemSolved" + "1KA" , "isVisible", false);
				formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + "1KA", "text",utilitiesObj.geti18nValueKA("i18n.order.completeorderchecklist.yes.valueKA"));
				formmodel.setViewAttributeByProperty("ListBoxProblemKA"  , "isVisible", false);
				formmodel.setViewAttributeByProperty("ListBoxProblemKA", "selectedKey", scopeObj.defaultselectedKey);
				formmodel.setViewAttributeByProperty("tbxProblemSolved"+"1KA", "skin", scopeObj.tbxSkn);
				formmodel.setViewAttributeByProperty("lblProblemSolved"+"1KA", "skin", scopeObj.labelSkn);
			}
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic switchSlideCallback action : " + err);
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
	navigateBack: function(){ 
	     try{
				try {
					kony.timer.cancel("completeOrderAcceptanceDismiss");
				} catch (e) {
					kony.sdk.mvvm.log.error("error in Blogic cancelTimer : " + e);
				}				
				var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
				var formmodel = controller.getFormModel();
				formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible",false);
				controller=controller.getControllerExtensionObject();
			    controller.$class.$superp.showPreviousForm.call(controller,true,"frmCompleteOrderKA");
			}      
         catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },	
	getSignature : function(){
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			var formmodel = controller.getFormModel();
          	if (formmodel.getViewAttributeByProperty("imgSignatureKA", "base64"))
				return;
			var callback = function(data){
				if(data){
					formmodel.setViewAttributeByProperty("imgSignatureKA", "base64", data);
					formmodel.setViewAttributeByProperty("lblTapToSign", "isVisible", false);
					formmodel.showView();
				}				
			}
			invokeSignatureFFI(callback);
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getSignature action : " + err);
        }
	},
  	updateBinaryContent: function(base64Image,success,error){
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			var configObj = controller.getConfig();
			var configOptions = configObj.getObjectServiceOptions();
			var serviceName = configObj.getObjectServiceName();
			var objSvc = controller.getApplicationContext().getObjectService(configOptions, serviceName);
			var dataObject = new kony.sdk.dto.DataObject(kony.servicesapp.ENTITY_MEDIA);
			var headers = {};
			dataObject.addField("type", "GRAPHICS");
			dataObject.addField("extension", "JPG");
			dataObject.addField("ondemand","true");
			dataObject.addField("description", "Complete Order Images Signature");
			dataObject.addField("url",base64Image);			
			var options = {"dataObject":dataObject, "headers":headers};
			objSvc.create(options,function(response){   
				var media_name = response["name"];
				var objHandler = kony.sdk.mvvm.persistent.Record;
				var recordObject = new objHandler(kony.servicesapp.ENTITY_EAMWOATTACHMENT);
				var seq = Math.floor((Math.random() * 1000));
				recordObject.set("SEQUENCE", seq + "");
				recordObject.set("DOC_TYPE","SIGNATURE");
				recordObject.set("BINARY_NAME", media_name);
				recordObject.set("EXTENSION", "JPG");
				recordObject.set("ATTACH_DESC", "Complete Order Images");
				recordObject.set("ORDER_NUM", scopeObj.getFormModelInfo("WorkOrderId"));
				recordObject.setInfo("serviceName", serviceName);
				recordObject.setInfo("options", configOptions);
				recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
				scopeObj.saveRecord(recordObject, success, error);
			},function(error){
              	kony.print("Failed to update binary metadata : " +JSON.stringify(error));
            });
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic updateBinaryContent action : " + err);
		}
    },  	
  	fetchBinaryContent: function(binaryName,succCallBack,errorCallBack){
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			var configObj = controller.getConfig();
			var objSvc = controller.getApplicationContext().getObjectService(configObj.getObjectServiceOptions(), configObj.getObjectServiceName());
			var dataObject = new kony.sdk.dto.DataObject("media");
			dataObject.addField("name", binaryName);
			objSvc.getBinaryContent({
				"dataObject": dataObject,
				"binaryAttrName": "url",
				"responsetype":"base64string"
			}, success, error);
			function success(binaryData) {
				succCallBack(binaryData);
			}
			function error(err) {
				errorCallBack(err);
				kony.sdk.mvvm.log.error("error while downloading image from media entity");
			}
		}catch(err){
			kony.sdk.mvvm.log.error("==fetchBinaryContent==>", err);
		}
    },
	setUIForBoolTypeQuestion : function(checklist,otherReason,pickList){
		try{
			var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
			var toggleID = "switchProblemSolved";
			var selectProperty = "selectedIndex";
			var yesValue = 0;
			var noValue = 1
			var checkListLabel = checklist.label;
			var checkListFieldVal = checklist.fieldvalue;
			formmodel.setViewAttributeByProperty(toggleID  + "1KA" , "isVisible", true);
			formmodel.setViewAttributeByProperty("lblProblemSolved" + "1KA" , "skin", this.labelSkn);
			formmodel.setViewAttributeByProperty("lblProblemSolved" + "1KA" , "text", checkListLabel);
			formmodel.setViewAttributeByProperty("tbxProblemSolved1KA", "text", "");
			scopeObj.setMasterDataForListBox(pickList);
			scopeObj.defaultselectedKey = pickList[0]["id"];			
			if(checkListFieldVal && (checkListFieldVal.toUpperCase() == "NO" || checkListFieldVal.toUpperCase() == "N")){     
				formmodel.setViewAttributeByProperty(toggleID + "1KA" , selectProperty, noValue);
				formmodel.setViewAttributeByProperty("lblProblemSolvedVal1KA", "text", checkListFieldVal);
				formmodel.setViewAttributeByProperty("tbxProblemSolved1KA", "isVisible", false);
				formmodel.setViewAttributeByProperty("ListBoxProblemKA", "isVisible", true);		
				if(otherReason && otherReason != ""){
					formmodel.setViewAttributeByProperty("tbxProblemSolved1KA", "isVisible", true);
					formmodel.setViewAttributeByProperty("tbxProblemSolved1KA", "text", otherReason);
				}		
			}else{
				formmodel.setViewAttributeByProperty(toggleID + "1KA" , selectProperty, yesValue); 
				formmodel.setViewAttributeByProperty("tbxProblemSolved" + "1KA" , "isVisible", false); 
				formmodel.setViewAttributeByProperty("lblProblemSolved"  + "1KA", "text", checkListLabel);
				formmodel.setViewAttributeByProperty("lblProblemSolvedVal"  + "1KA", "text", "Yes");
				formmodel.setViewAttributeByProperty("ListBoxProblemKA" , "isVisible", false);
			}
		}catch(err){
			kony.sdk.mvvm.log.error("==setUIForBoolTypeQuestion==>", err);
		}	
	},
	setUIForTextTypeQuestion : function(checklist){
		try{
			var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
			var checkListLabel = checklist.label;
			var checkListFieldVal = checklist.fieldvalue;
			formmodel.setViewAttributeByProperty("tbxProblemSolved2KA" , "isVisible", true);
			formmodel.setViewAttributeByProperty("tbxProblemSolved2KA" , "text", "");
			if(checkListFieldVal !== "" && checkListFieldVal){
				formmodel.setViewAttributeByProperty("tbxProblemSolved2KA" , "text", checkListFieldVal);
			}
			formmodel.setViewAttributeByProperty("lblProblemSolved2KA" , "text", checkListLabel);
		}catch(err){
			kony.sdk.mvvm.log.error("==setUIForTextTypeQuestion==>", err);
		}
	},
	setSegData : function(dataMap){
		try{
			var scopeObj = this;
			var formData = dataMap["form"][0];
			var processedData = {};
			var utilitiesObj = utilities.getUtilityObj();
            var addressData = "";  
			var ContactprocessedData = {};
          	processedData["lblStartTimeKA"] = formData["PlannedStartDate"];
            processedData["lblEndTimeKA"] = formData["PlannedEndDate"];
            processedData["lblOrderNumberKA"] = formData["Code"];
            processedData["lblOrderDetailsKA"] = formData["Description"];           
            var contactData = dataMap["flxContactNameKA"]?(dataMap["flxContactNameKA"][0] ? dataMap["flxContactNameKA"][0] : null) : null;
    		if(contactData){
				scopeObj.contactDetail=contactData["id"];
				ContactprocessedData["lblOrderCompletedByKA"] = (contactData["FirstName"] ? contactData["FirstName"] : "") + " " + (contactData["LastName"] ? contactData["LastName"] : "");							
	        }
    		dataMap["flxContactNameKA"] = ContactprocessedData;        
            if (formData["Address"] && formData["Address"][0]) {
              	addressData = utilitiesObj.getOrderAddress(formData["Address"][0]);
              	processedData["lblOrderCompletionAddressKA"] = utilitiesObj.dataTruncation(addressData, 47, 3, "...").value;
            }  
			return [dataMap,processedData];
		}catch(err){
			kony.sdk.mvvm.log.error("==setSegData==>", err);
		}
	},
	setUICompleteOrderAcceptance : function(dataMap){
		try{
			var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
			formmodel.setViewAttributeByProperty("flxToggle1KA" , "width", "58dp");            
            formmodel.setViewAttributeByProperty("flxToggle1KA" , "height", "60%");			
			if(!formmodel.getViewAttributeByProperty("flexPopupKA", "isVisible")){
				formmodel.performActionOnView("flxMainKA", "setEnabled", [true]);	
				formmodel.performActionOnView("btnCloseKA","setEnabled",[true]);
				formmodel.performActionOnView("btnDoneKA","setEnabled",[true]);	
			}
          	if (dataMap["flxSignatureKA"] && dataMap["flxSignatureKA"][0] && dataMap["flxSignatureKA"][0]["base64data"]){
          		formmodel.setViewAttributeByProperty("imgSignatureKA", "base64", dataMap["flxSignatureKA"][0]["base64data"]);  
            }else{
              	formmodel.setViewAttributeByProperty("imgSignatureKA", "src", "handgesture.png");
              	formmodel.setViewAttributeByProperty("lblTapToSign", "isVisible", true);
            }
		}catch(err){
			kony.sdk.mvvm.log.error("==setUICompleteOrderAcceptance==>", err);
		}
	}	
});