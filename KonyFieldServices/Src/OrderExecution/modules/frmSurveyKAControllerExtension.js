
/* * Controller Extension class for frmSurveyKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};


/**
 * Creates a new Form Controller Extension.
 * @class frmSurveyKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmSurveyKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension,{
    constructor: function(controllerObj) {
      var scopeObj=this;
        scopeObj.SectionQuestions = [];
        scopeObj.surveyData = [];
        scopeObj.sectionNames = [];
        scopeObj.SurveyResponseID = null;
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmSurveyKAControllerExtension#
     */
    parseResponse: function(res) {
        var formattedResponse = {
            "SurveyFieldDefinitions": []
        };
        var finalResponse = [];
        var questions = [];
        res.forEach(formatItem);

        function formatItem(item) {
            if (questions.indexOf(item.surveyfielddefinition_id) == -1) {
                questions.push(item.surveyfielddefinition_id);
                finalResponse.push({
                    "SurveyFieldDefintion_Id": item.surveyfielddefinition_id,
                    "SurveyDefinition_Id": item.surveydefinition_id,
                    "label": item.label,
                    "name": item.name,
                    "isRequired": item.isRequired,
                    "datatype_id": item.datatype_id,
                    "surveySectionID": item.surveysection_id,
                    "surveySectionName": item.surveysectionname,
                    "fieldvalue": item.fieldvalue,
                  	"surveyfieldvalue_id":item.surveyfieldvalue_id,
                    "SurveyFieldValues": [
                        [
                            item.code,
                            item.optionitem_name

                        ]
                    ]
                });
            } else {
                finalResponse[questions.indexOf(item.surveyfielddefinition_id)]["SurveyFieldValues"].push([
                    item.code,
                    item.optionitem_name
                ]);
            }
        }
        formattedResponse.SurveyFieldDefinitions = finalResponse;
        return formattedResponse;
    },
    cloneIt: function(surveyData, ques, section) {
        var scopeObj = this;
        var formmodel = this.getController().getFormModel();
        var wType;
        var flxQuestion = frmTemplateKA.flxQuestion.clone("dyn" + ques);
        var flxImage = frmTemplateKA.flxImage.clone("dyn" + ques);
        if (surveyData["SurveyFieldDefinitions"][ques]["isRequired"] == "X") {
            flxImage["dyn" + ques + "imgQuesType"].src = "group.png";
            var secIndex = sectionArray.indexOf(surveyData["SurveyFieldDefinitions"][ques]["surveySectionID"]);
            formmodel.setViewAttributeByProperty("dyn" + secIndex + "imgMandatory", "isVisible", true);
        }
        var flxQues = frmTemplateKA.flxQues.clone("dyn" + ques);
        flxQues["dyn" + ques + "lblQues"]["text"] = surveyData["SurveyFieldDefinitions"][ques]["label"];
        flxQues["dyn"+ques+"lblResponse"]["text"]="";
        var input;
        var dataTypeID = surveyData["SurveyFieldDefinitions"][ques]["datatype_id"];

        var widgetMappings = kony.servicesapp.EVENT_SURVEY_DATATYPE_WIDGET_MAPPINGS;
        var widgetToBeCloned = widgetMappings[dataTypeID] && widgetMappings[dataTypeID]['WIDGET'];
        var validWidgets = widgetMappings[dataTypeID]['POSSIBLE_WIDGETS'];
        var masterData = [];
        if (validWidgets.indexOf(widgetToBeCloned) < 0) {
            widgetToBeCloned = widgetMappings[dataTypeID]['DEFAULT_FALLBACK_WIDGET'];
        }

        if (widgetToBeCloned) {
            switch (widgetToBeCloned) {
                case "RADIO":
                    masterData = [];
                    input = frmTemplateKA.Radio.clone("dyn" + ques);
                    break;
                case "TIME_PICKER":
                    input = frmTemplateKA.flxTimePicker.clone("dyn" + ques);
                    break;
                case "CALENDAR":
                    input = frmTemplateKA.flxCalenderr.clone("dyn" + ques);
                    break;
                case "TEXT_BOX_NUM":
                    input = frmTemplateKA.NumTextBox.clone("dyn" + ques);
                    break;
                case "LIST_BOX":
                    masterData = [];
                    input = frmTemplateKA.picklistSingle.clone("dyn" + ques);
                    masterData[0] = ["Select", "Select"];
                    for (var i = 0; i < surveyData["SurveyFieldDefinitions"][ques]["SurveyFieldValues"].length; i++)
                        masterData[i + 1] = surveyData["SurveyFieldDefinitions"][ques]["SurveyFieldValues"][i];
                    break;
                case "TEXT_AREA":
                    input = frmTemplateKA.TextBox.clone("dyn" + ques);
                    break;
                default:
                    input = frmTemplateKA.TextBox.clone("dyn" + ques);
                    break;
            }

        } else {
            input = frmTemplateKA.TextBox.clone("dyn" + ques);
        }

        flxQues.add(input);
        flxQuestion.add(flxImage, flxQues);
        frmSurveyKA["dyn" + section + "flxScrollQues"].add(flxQuestion);
        if (widgetToBeCloned == "RADIO")
            formmodel.setViewAttributeByProperty("dyn" + ques + "Radio", "masterData", surveyData["SurveyFieldDefinitions"][ques]["SurveyFieldValues"]);
        else if (widgetToBeCloned == "LIST_BOX") {
            formmodel.setViewAttributeByProperty("dyn" + ques + "picklistSingle", "masterData", masterData);
        }
      	scopeObj.setExistingAnswers(widgetToBeCloned,ques,surveyData);
      

    },
    fetchData: function() {
        var scopeObj = this;
        var formmodel = this.getController().getFormModel();
        try {

            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            this.defaultConfig = frmSurveyKAConfig;
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
          	scopeObj.SurveyResponseID=scopeObj.getController().getContextData().getCustomInfo("SResp_id");
            if (frmSurveyKAConfig.flxSurveyKA) {
                var inputJSON = {
                    "formid": "Mainfrm",
                    "responseValueEntity": "SurveyFieldValue",
                    "dependentValues": [{
                        "fieldName": "SurveyDefinition_id",
                        "fieldAliasName": "lblSurveyDefinitionid",
                        "requiredForEdit": false
                    }, {
                        "fieldName": "SurveyFieldDefintion_id",
                        "fieldAliasName": "lblSurveyFieldDefintionid",
                        "requiredForEdit": false
                    }],                    
                    "parentFlx": "frmSurveyKA",
                    "ValueField": "FieldValue",
                    "id": "id"
                };
                if (response.flxSurveyKA.length === 0) {
                    return;
                }
                var utilitiesObj = utilities.getUtilityObj();
                var surveyName = response.flxSurveyKA[0]['surveyname'];
                this.surveyData = scopeObj.parseResponse(response.flxSurveyKA);
                var SectionLabel=[];
                SectionLabel = utilitiesObj.geti18nValueKA("i18n.surveys.sectionLabel.ValueKA").split(',');
                
                noOfSections = scopeObj.calculateSections(this.surveyData);
                this.SectionQuestions = new Array(noOfSections);
                for (var i = 0; i < noOfSections; i++)
                    this.SectionQuestions[i] = new Array();
                for (var i = 0; i < noOfSections; i++) {
                    var FlxScrollQues = frmTemplateKA.flxScrollQues.clone("dyn" + i);
                    frmSurveyKA.flxAllSections.add(FlxScrollQues);
                    var Section = frmTemplateKA.flxSectionNumber.clone("dyn" + i);
                    Section["dyn" + i + "lblSectionNum"].text = SectionLabel[i];
                    frmSurveyKA.flxSection.add(Section);
                }
                formmodel.setViewAttributeByProperty("dyn0flxSectionInside", "skin", "sknActiveSectionKA");
                formmodel.setViewAttributeByProperty("dyn0lblSectionNum", "skin", "SknlblFFFFFFSectionNameKA");
                formmodel.setViewAttributeByProperty("lblSectionName", "text", SectionLabel[0] + ". " + sectionName[0]);
                formmodel.setViewAttributeByProperty("dyn0flxScrollQues", "isVisible", true);   
          		surveyName = utilitiesObj.dataTruncation(surveyName,kony.servicesapp.surveyname.MAXLENGTH,kony.servicesapp.surveyname.NO_OF_CHARS_TO_TRUNCATE, "...");   
                formmodel.setViewAttributeByProperty("lblHeaderKA","text",surveyName.value);
                for (var i = 0; i < scopeObj.surveyData["SurveyFieldDefinitions"].length; i++) {
                    var sectionId = scopeObj.surveyData["SurveyFieldDefinitions"][i]["surveySectionID"];
                    index = sectionArray.indexOf(sectionId);
                    scopeObj.cloneIt(scopeObj.surveyData, i, index);
                    scopeObj.SectionQuestions[index].push(i);
                    frmSurveyKAConfig = scopeObj.addWidgetToConfig(i, inputJSON, frmSurveyKAConfig);
                }
              	 
                if(!scopeObj.SurveyResponseID){
                  delete frmSurveyKAConfig.lblSurveyResponseID;
                }else{
                  formmodel.setViewAttributeByProperty("lblSurveyResponseID","text",scopeObj.SurveyResponseID);
                }
                
                delete frmSurveyKAConfig.flxSurveyKA;
                scopeObj.$class.$superp.refreshConfig.call(scopeObj, frmSurveyKAConfig);

                formmodel.clear();
                scopeObj.$class.$superp.fetchData.call(scopeObj, success2, error);

                function success2(res) {
                    scopeObj.getController().processData(res);
                }

            } else {
                scopeObj.getController().processData(response);
            }

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
     * @memberof frmSurveyKAControllerExtension#
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
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmSurveyKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            var contextData = this.getController().getContextData();
            var surveyInfo = contextData.getCustomInfo("SurveyInfo");
            var surveyData = this.surveyData;

            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
            var count = 0;
            for (i = 0; i < surveyData["SurveyFieldDefinitions"].length; i++) {
				data["dyn"+count+"flxQues"]["dyn" + count + "lblResponse"]=surveyData["SurveyFieldDefinitions"][i]["fieldvalue"];
                data["dyn" + count + "flxQues"]["dyn" + count + "lblSurveyDefinitionid"] = surveyData["SurveyFieldDefinitions"][i]["SurveyDefinition_Id"];
                data["dyn" + count + "flxQues"]["dyn" + count + "lblSurveyFieldDefintionid"] = surveyData["SurveyFieldDefinitions"][i]["SurveyFieldDefintion_Id"];
              	data["dyn" + count + "flxQues"]["dyn" + count + "lblSFVid"] = surveyData["SurveyFieldDefinitions"][i]["surveyfieldvalue_id"];

                count++;
            }
			data["flxEventSurveyKA"]["lblEventTypeid"]= surveyInfo["eventID"];
          	data["flxEventSurveyKA"]["lblUserid"]= surveyInfo["User_id"];
          	data["flxEventSurveyKA"]["lblEventSurveyDefinitionid"]= surveyData["SurveyFieldDefinitions"][0]["SurveyDefinition_Id"];
            data["flxEventSurveyKA"]["lblWorkorderid"]= surveyInfo["WorkOrderID"];
          	
          	data["form"]["lblSurveyDefinitionID"] = surveyData["SurveyFieldDefinitions"][0]["SurveyDefinition_Id"];
          	data["form"]["lblSurveyResponseID"]=this.SurveyResponseID;
            this.$class.$superp.bindData.call(this, data);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

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
     * @memberof frmSurveyKAControllerExtension#
     */
    saveData: function(isCancel) {
        var scopeObj = this;
        var formmodel = this.getController().getFormModel();

        try {
            //var scopeObj = this;
           if(isCancel)
               formmodel.setViewAttributeByProperty("lblStatusId","text",kony.servicesapp.STATUSCANCEL);
          else
              formmodel.setViewAttributeByProperty("lblStatusId","text",kony.servicesapp.STATUSCOMPLETE);
            scopeObj.$class.$superp.saveData.call(scopeObj, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
          	var scopeObj = this;
          	if(!(scopeObj.SurveyResponseID))
            {
              var formmodel = scopeObj.getController().getFormModel();
            var controller = scopeObj.getController();
			var configObj = controller.getConfig();
            var objServName = configObj.getObjectServiceName();
			var objServOptions = configObj.getObjectServiceOptions();
            var objHandler = kony.sdk.mvvm.persistent.Record;
            var recordObject = new objHandler(kony.servicesapp.ENTITY_EVENTSURVEY); 
          	var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);     
			var storedUsername = credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase();
          	recordObject.set("User_id",storedUsername);
			recordObject.set("SurrveyResponse_id", res.id);			
			recordObject.set("EventType_id", formmodel.getViewAttributeByProperty('lblEventTypeid', 'text'));
			recordObject.set("Workorder_id", formmodel.getViewAttributeByProperty('lblWorkorderid', 'text'));
           	recordObject.set("User_id", formmodel.getViewAttributeByProperty('lblUserid', 'text'));
            recordObject.set('SurveyDefinition_id', formmodel.getViewAttributeByProperty('lblEventSurveyDefinitionid', 'text'));
			recordObject.setInfo("serviceName", objServName);
			recordObject.setInfo("options", objServOptions);                
          	recordObject.setInfo("serviceName", objServName);
			recordObject.setInfo("options", objServOptions);
			recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
            
            function onSuccess(response){
              kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
              kony.sdk.mvvm.log.info("success saving record ", res);
              if(!isCancel){
                 formmodel.setViewAttributeByProperty("flxConfirmbg", "isVisible", false);
                 formmodel.setViewAttributeByProperty("flxSubmitBg", "isVisible", true);
              }else{
                 scopeObj.navigateBack();				                
              }
             
              frmSurveyKAConfig = this.copy(kony.servicesapp.DEFAULT_SURVEY_CONFIG);
              //scopeObj.$class.$superp.showPreviousForm.call(scopeObj,false);
              scopeObj.$class.$superp.refreshConfig.call(scopeObj, frmSurveyKAConfig);
            }	
            
            function onError(err){
               //Handle error case
              //alert("Failure" + JSON.stringify(err));
              kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
              kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
              var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
              kony.sdk.mvvm.log.error(exception.toString());
              
            }
                    
            scopeObj.saveRecord(recordObject, onSuccess, onError);
            }
          else
            {
              var scopeObj=this;
              var formmodel = scopeObj.getController().getFormModel();
              kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
              kony.sdk.mvvm.log.info("success saving record ", res);
              if(!isCancel){
                 formmodel.setViewAttributeByProperty("flxConfirmbg", "isVisible", false);
                 formmodel.setViewAttributeByProperty("flxSubmitBg", "isVisible", true);
              }else{
                 scopeObj.navigateBack();				                
              }
             
              frmSurveyKAConfig = this.copy(kony.servicesapp.DEFAULT_SURVEY_CONFIG);
              //scopeObj.$class.$superp.showPreviousForm.call(scopeObj,false);
              scopeObj.$class.$superp.refreshConfig.call(scopeObj, frmSurveyKAConfig);

            }
        }

        function error(err) {
            //Handle error case
            //alert("Failure" + JSON.stringify(err));
          	kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
  cancelSurvey:function()
  {
    var scopeObj=this;
    
    frmSurveyKAConfig = this.copy(kony.servicesapp.DEFAULT_SURVEY_CONFIG);
    //scopeObj.$class.$superp.showPreviousForm.call(scopeObj,false);
    scopeObj.$class.$superp.refreshConfig.call(scopeObj, frmSurveyKAConfig);
    scopeObj.navigateBack();
  },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmSurveyKAControllerExtension#
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
     * @memberof frmSurveyKAControllerExtension#
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
    navigateBack: function() {
        try {
            var scopeObj=this;    
            scopeObj.SurveyResponseID = null;
            scopeObj.showPreviousForm(true,kony.application.getPreviousForm().id);
          	frmSurveyKAConfig = this.copy(kony.servicesapp.DEFAULT_SURVEY_CONFIG);
            scopeObj.$class.$superp.refreshConfig.call(scopeObj, frmSurveyKAConfig);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },


    saveInputValue: function(flexNumber, WidgetType) {
        var scopeObj = this;
        var formmodel = this.getController().getFormModel();
        var widgetType = WidgetType;
        var inputValue = "";
      	var isAnswered=false;
        switch (widgetType) {
            case "Radio":

                    inputValue = formmodel.getViewAttributeByProperty("dyn" + flexNumber + "Radio", "selectedKey");
                    isAnswered=true;
                break;
            case "Time":
                inputValue = formmodel.getViewAttributeByProperty("TimePicker", "selectedKeys");
            	formmodel.setViewAttributeByProperty("dyn"+flexNumber+"lblTime","text",inputValue[0]+":"+inputValue[1]+" "+inputValue[2]);
                isAnswered=true;
                break;
            case "Date":
                inputValue = formmodel.getViewAttributeByProperty("CalenderrBg", "dateComponents");
            	formmodel.setViewAttributeByProperty("dyn"+flexNumber+"lblDate","text",inputValue[0]+"/"+inputValue[1]+"/"+inputValue[2]);
				isAnswered=true;
                break;
            case "Num":
              inputValue = formmodel.getViewAttributeByProperty("dyn" + flexNumber + "NumTextBox", "text");
			  if(inputValue!="")
  				isAnswered=true;
			  else
  				isAnswered=false;
              break;
            case "picklistSingle":
                inputValue = formmodel.getViewAttributeByProperty("dyn" + flexNumber + "picklistSingle", "selectedKey");
                if(inputValue==="Select")
                    isAnswered=false;
				else
  					isAnswered=true;
 			 break;
        }
      	scopeObj.setIconSkin(flexNumber,isAnswered);
		formmodel.setViewAttributeByProperty("dyn" + flexNumber + "lblResponse", "text", inputValue);
    },
    saveCompleteData: function(isCancel) {
        try{
          	var utilitiesObj = utilities.getUtilityObj();
			kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            var scopeObj = this;
              if(isCancel){
                if(kony.application.getPreviousForm().id=='frmCompleteOrderKA')
              		scopeObj.navigateBack();
            	else
                scopeObj.saveData(isCancel);
              }
              else {
                  var callSave = scopeObj.checkForMandatoryFields();
                  if (callSave)
                    scopeObj.saveData(isCancel);
                  else {
                      var utilitiesObj  = utilities.getUtilityObj();
                      var alertText = utilitiesObj.geti18nValueKA("i18n.common.FillMandatoryFields");
                      alert(alertText);
                  }
              }
        }catch(e){
          kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
          kony.sdk.mvvm.log.error("error in Blogic saveCompleteData action : " + e);
        }
    },
    makeSectionVisible: function(SectionId) {
        var AttemptedSection = 0;
        var scopeObj = this;
        var utilitiesObj = utilities.getUtilityObj();
       
      	var sectionLabel = utilitiesObj.geti18nValueKA("i18n.surveys.sectionLabel.ValueKA").split(',')//kony.servicesapp.SECTION_LABEL;
        var formmodel = this.getController().getFormModel();
        for (var i = 0; i < noOfSections; i++) 
            formmodel.setViewAttributeByProperty("dyn" + i + "flxScrollQues", "isVisible", false);
        formmodel.setViewAttributeByProperty("dyn" + SectionId + "flxScrollQues", "isVisible", true);
        formmodel.setViewAttributeByProperty("lblSectionName", "text",sectionLabel[SectionId]+". "+sectionName[SectionId]);
    },



    checkForMandatoryFields: function() {
        var i;
      var utilitiesObj = utilities.getUtilityObj();
      var callSave = true;
        var formmodel = this.getController().getFormModel();
        for (i = 0; i < this.surveyData["SurveyFieldDefinitions"].length; i++) {
          
            if (this.surveyData["SurveyFieldDefinitions"][i].isRequired === "X") {
                var lblText = formmodel.getViewAttributeByProperty("dyn" + i + "lblResponse", "text");
                if (lblText == "" || lblText == null|| lblText ==utilitiesObj.geti18nValueKA("i18n.common.AnswerHereKA")) {
                    callSave = false;

                    formmodel.setViewAttributeByProperty("flxConfirmbg", "isVisible", false);
                    formmodel.setViewAttributeByProperty("flxCancelBg", "isVisible", false);

                    break;


                } else
                    continue;
            }
        }
        return callSave;
    },



    calculateSections: function(surveyData) {
        var flag = true;
        sectionArray = [surveyData["SurveyFieldDefinitions"][0]["surveySectionID"]];
        sectionName = [surveyData["SurveyFieldDefinitions"][0]["surveySectionName"]];
        for (var i = 1; i < surveyData["SurveyFieldDefinitions"].length; i++) {
            flag = true;
            var sectionId = surveyData["SurveyFieldDefinitions"][i]["surveySectionID"];
            for (var j = 0; j < sectionArray.length; j++) {
                if (sectionArray[j] == sectionId) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                sectionArray[sectionArray.length] = sectionId;
                sectionName[sectionName.length] = surveyData["SurveyFieldDefinitions"][i]["surveySectionName"];
            }
        }
        return sectionArray.length;
    },
    changeFlexSkins: function(flexNum) {
        var scopeObj = this;
        var formmodel = this.getController().getFormModel();
        for (var i = 0; i < scopeObj.surveyData["SurveyFieldDefinitions"].length; i++)
            if (i != flexNum)
            {    formmodel.setViewAttributeByProperty("dyn" + i + "flxQuestion", "skin", "sknFlexFFFFFFQuestionKA");
            
            }formmodel.setViewAttributeByProperty("dyn" + flexNum + "flxQuestion", "skin", "sknFlxFocusD1D6DAKA");
    },
    changeToAttemptedState: function(sectionID) {
        var scopeObj = this;
        var formmodel = scopeObj.getController().getFormModel();
       formmodel.setViewAttributeByProperty("dyn" + sectionID + "flxSectionInside", "skin", "sknActiveSectionKA");
        formmodel.setViewAttributeByProperty("dyn" + sectionID + "lblSectionNum", "skin", "SknlblFFFFFFSectionNameKA");

      for(var i=0;i<scopeObj.SectionQuestions.length;i++){ 
        if(i!=sectionID)
        {var attempted = scopeObj.checkforMandatoryQuestions(scopeObj.SectionQuestions[i]);

        if(attempted)
          {  formmodel.setViewAttributeByProperty("dyn" + i + "flxSectionInside", "skin", "sknAttemptedSectionKA");
        formmodel.setViewAttributeByProperty("dyn" + i + "lblSectionNum", "skin", "SknlblFFFFFFSectionNameKA");
       }
          else {
        if(i!=sectionID)
        {formmodel.setViewAttributeByProperty("dyn" + i + "flxSectionInside", "skin", "sknInActiveSectionKA");
            formmodel.setViewAttributeByProperty("dyn" + i + "lblSectionNum", "skin", "sknFontBlueKA");
        }
      }
     }
      }
    },
    checkforMandatoryQuestions: function(SectionQuestion) {
      var attempted = true;  
      var formmodel = this.getController().getFormModel();
        for (i = 0; i < SectionQuestion.length; i++) {
          
            var txt = formmodel.getViewAttributeByProperty("dyn" + SectionQuestion[i] + "lblResponse", "text");
            if ((txt == "") || (txt == null)) {
                attempted = false;
                break;
            } else
                continue;
        }

        return attempted;

    },
    addWidgetToConfig: function(flexNumber, inputJSON, SurveyConfig) {

        SurveyConfig["dyn" + flexNumber + "flxQues"] = {
            "fieldprops": {
                "entity": inputJSON["responseValueEntity"],
                "widgettype": "flexcontainer",
                "parent": inputJSON["parentFlx"]
            }
        };
        SurveyConfig["dyn" + flexNumber + "lblResponse"] = {
            "fieldprops": {
                "entity": inputJSON["responseValueEntity"],
                "widgettype": "Label",
                "field": inputJSON["ValueField"],
                "text": inputJSON["ValueField"],
                "parent": "dyn" + flexNumber + "flxQues"
            }
        };
      	if(this.SurveyResponseID!=null)
      		SurveyConfig["dyn" + flexNumber + "lblSFVid"] = {
              "fieldprops": {
                  "entity": inputJSON["responseValueEntity"],
                  "widgettype": "Label",
                  "field": inputJSON["id"],
                  "text": inputJSON["id"],
                  "parent": "dyn" + flexNumber + "flxQues"
                  }
              };
        for (var i = 0; i < inputJSON["dependentValues"].length; i++) {
            SurveyConfig["dyn" + flexNumber + inputJSON["dependentValues"][i]["fieldAliasName"]] = {
                "fieldprops": {
                    "entity": inputJSON["responseValueEntity"],
                    "widgettype": "Label",
                    "field": inputJSON["dependentValues"][i]["fieldName"],
                    "text": inputJSON["dependentValues"][i]["fieldName"],
                    "parent": "dyn" + flexNumber + "flxQues"
                }
            };
        }

        return SurveyConfig;
    },

    refreshConfig: function(formName, config) {
        kony.print("refreshConfig config ----> " + config);
        var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var ConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(config);
        var ControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm." + formName + "Controller", appContext, ConfigObj);
        var ControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm." + formName + "ControllerExtension", ControllerObj);
        ControllerObj.setControllerExtensionObject(ControllerExtObj);
        var FormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm." + formName + "FormModel", ControllerObj);
        var FormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm." + formName + "FormModelExtension", FormModelObj);
        FormModelObj.setFormModelExtensionObj(FormModelExtObj);
        appContext.setFormController(formName, ControllerObj);
        kony.print("refreshConfig config END----> " + config);
    },
    copy: function(o) {
         var scopeObj = this;
         var output, v, key;
         output = Array.isArray(o) ? [] : {};
         for (key in o) {
             v = o[key];
             output[key] = (typeof v === "object") ? scopeObj.copy(v) : v;
         }
         return output;
    },
  /**
		'showPreviousForm' will show previous form
		doReload - true - will reload the form / false will not reload the form
		formName - name of the form
	*/
    showPreviousForm: function(doReload, formName) {
		try {
			var utilitiesObj = utilities.getUtilityObj();
			kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
			var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var navigateTo = formName ? formName : kony.application.getPreviousForm().id;
			var prevController = INSTANCE.getFormController(navigateTo);
			if (doReload) {			
				prevController.loadDataAndShowForm(prevController.getContextData());	
                //frmSurveyKA.destroy();
			} else {
				var konyform = prevController.getFormModel().getView().getKonyForm();
                TAG.NC.applyFormTransitions(konyform);
				prevController.getFormModel().showView();
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                //frmSurveyKA.destroy();
			}
		} catch (error) {
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
        }
    },
    setTextArea:function(selectedQuestion){
      var scopeObj=this;
      var utilitiesObj = utilities.getUtilityObj(); 
      var formModel=scopeObj.getController().getFormModel();
      var textAreaHeader = formModel.getViewAttributeByProperty("lblSectionName","text");
      var textAreaQues = formModel.getViewAttributeByProperty("dyn"+selectedQuestion+"lblQues","text");
      formModel.setViewAttributeByProperty("lblTextAreaQuestionKA","text",textAreaQues);
      formModel.setViewAttributeByProperty("lblTextAreaHeaderKA","text",textAreaHeader);
      var textAreaAnswer= formModel.getViewAttributeByProperty("dyn"+selectedQuestion+"lblResponse","text");
      if(textAreaAnswer!=utilitiesObj.geti18nValueKA("i18n.common.AnswerHereKA"))
      formModel.setViewAttributeByProperty("lblTextAreaAnswerKA","text",textAreaAnswer);
      else
      formModel.setViewAttributeByProperty("lblTextAreaAnswerKA","text","");
      formModel.setViewAttributeByProperty("lblTextAreaAnswerKA","text",textAreaAnswer);
      formModel.setViewAttributeByProperty("dyn"+selectedQuestion+"TextBox","text",textAreaAnswer);
      formModel.setViewAttributeByProperty("flxTextArea","isVisible",true);
      formModel.setViewAttributeByProperty("flxTextArea","setFocus",true);
    },
    setTextField:function(status){
	  var scopeObj = this;
      var formModel=scopeObj.getController().getFormModel();
      var answer
      if(status=='CANCEL')
        answer = formModel.getViewAttributeByProperty("dyn"+selectedQuestion+"lblResponse","text");
      else
     	answer = formModel.getViewAttributeByProperty("lblTextAreaAnswerKA","text");
      var utilitiesObj = utilities.getUtilityObj();
	  var shortAnswer = utilitiesObj.dataTruncation(answer,kony.servicesapp.surveyname.ANSWER_MAXLENGTH,kony.servicesapp.surveyname.NO_OF_CHARS_TO_TRUNCATE, "..."); 
      if(answer!=""&&answer!=null)
      {
        scopeObj.setIconSkin(selectedQuestion,true);
        formModel.setViewAttributeByProperty("dyn"+selectedQuestion+"TextBox","text",shortAnswer.value);
      
      }
      else
	  {
		  scopeObj.setIconSkin(selectedQuestion,false);
		  formModel.setViewAttributeByProperty("dyn"+selectedQuestion+"TextBox","text",utilitiesObj.geti18nValueKA("i18n.common.AnswerHereKA"));
	  }
      formModel.setViewAttributeByProperty("dyn"+selectedQuestion+"lblResponse","text",answer);
      formModel.setViewAttributeByProperty("flxTextArea","isVisible",false);
	  formModel.setViewAttributeByProperty("dyn"+selectedQuestion+"TextBox","setFocus",true);
      formModel.setViewAttributeByProperty("dyn"+selectedQuestion+"TextBox","setFocus",true);
      formModel.setViewAttributeByProperty("lblTextAreaAnswerKA","text","");


    },
  	deviceBack:function(){
      var scopeObj=this;
      var formmodel = scopeObj.getController().getFormModel();
      if(formmodel.getViewAttributeByProperty("flxCancelBg","isVisible"))
        formmodel.setViewAttributeByProperty("flxCancelBg","isVisible",false);
      else if(formmodel.getViewAttributeByProperty("flxCalenderrBg","isVisible"))
        formmodel.setViewAttributeByProperty("flxCalenderrBg","isVisible",false);
      else if(formmodel.getViewAttributeByProperty("flxTimePickerBg","isVisible"))
        formmodel.setViewAttributeByProperty("flxTimePickerBg","isVisible",false);
      else if(formmodel.getViewAttributeByProperty("flxConfirmbg","isVisible"))
        formmodel.setViewAttributeByProperty("flxConfirmbg","isVisible",false);
      else if(formmodel.getViewAttributeByProperty("flxSubmitBg","isVisible"))
          scopeObj.navigateBack();
      else if(formmodel.getViewAttributeByProperty("flxTextArea","isVisible"))
        formmodel.setViewAttributeByProperty("flxTextArea","isVisible",false);
      else
        formmodel.setViewAttributeByProperty("flxCancelBg","isVisible",true);
        
      
    },
  	setExistingAnswers:function(widgetToBeCloned,ques,surveyData){
		try{
          var scopeObj=this;
          var formmodel = this.getController().getFormModel();
          var survFieldDefinitions = surveyData.SurveyFieldDefinitions;
          var value = survFieldDefinitions[ques].fieldvalue;
          var utilitiesObj = utilities.getUtilityObj();
          var SFV=survFieldDefinitions[ques].surveyfieldvalue_id;
          if(value!=null &&value!="")
          {
            switch(widgetToBeCloned){
              case 'RADIO':
                  formmodel.setViewAttributeByProperty("dyn"+ques+"Radio","selectedKey",value);
                 
              break;
              case 'TEXT_AREA':
	      	var shortAnswer = utilitiesObj.dataTruncation(value,kony.servicesapp.surveyname.ANSWER_MAXLENGTH,kony.servicesapp.surveyname.NO_OF_CHARS_TO_TRUNCATE, "...");
                formmodel.setViewAttributeByProperty("dyn"+ques+"TextBox","text",shortAnswer.value);
              break;              
            }
            formmodel.setViewAttributeByProperty("dyn"+ques+"lblResponse","text",value);
            formmodel.setViewAttributeByProperty("dyn"+ques+"imgQuesType","src","answered.png");
            formmodel.setViewAttributeByProperty("dyn"+ques+"lblSFVid","text",SFV);
          }
        }
        catch(err){
          kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, err);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, err);
        }
    },
  	setIconSkin:function(flexNumber,isAnswered){
      try{
        var scopeObj=this;
        var formmodel=scopeObj.getController().getFormModel();
        var SurveyData=this.surveyData["SurveyFieldDefinitions"];
        if(isAnswered===true)
          formmodel.setViewAttributeByProperty("dyn"+flexNumber+"imgQuesType","src","answered.png");
        else
          {
            if(SurveyData[flexNumber].isRequired==='X')
              formmodel.setViewAttributeByProperty("dyn"+flexNumber+"imgQuesType","src","group.png");
            else
              formmodel.setViewAttributeByProperty("dyn"+flexNumber+"imgQuesType","src","not_answered_questions.png");
          }
      }catch(e){
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("error in Blogic fetchChildObjects action : " + e);
      }
      
    }
});