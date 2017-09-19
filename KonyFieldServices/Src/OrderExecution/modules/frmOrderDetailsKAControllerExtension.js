/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */

/*
 * bussiness/orchestration/mediation logic class for frmOrderDetailsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.controllerExtensionGen = undefined;
        this.contactDetail="";
    },
    fetchData: function() {
    	try {
	    	this.$class.$superp.fetchData.call(this);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
		}
    },
    performFetchAndBindFormData: function(successcallback, errorcallback){
    	try {
	    	this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
		}
    },
    prepareFetchAndBindDataStrategy: function() {
    	try {
	    	this.$class.$superp.prepareFetchAndBindDataStrategy.call(this);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic prepare fetch and bind data : " + error);
		}
    },
   	updateBLogicContextData: function(widgetMapping){
    	try {
	    	this.$class.$superp.updateBLogicContextData.call(this, widgetMapping);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic update context data : " + error);
		}
    },
    fetchAndBindDataByWidgetGroup: function(widgetGroupId){
    	try{
    		this.$class.$superp.fetchAndBindDataByWidgetGroup.call(this, widgetGroupId);
    	}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic fetch data for widget : " + error);
		}
    },
    gestureHandler : {
		"flxLocationKA" : false, 
		"flxInstructionKA" : false, 
		"flxParentContactKA" :false
	},
    formatData: function(dataMap){
		dataMap["form"][0]["PlannedStartDate"] = convertTimeZone(moment(dataMap["form"][0]["PlannedStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("TIMEANDDAY"));
   		return dataMap;
    },
   	bindData: function(dataMap) {
    	try {
    		var scopeObj = this;
    		dataMap = scopeObj.formatData(dataMap);
    		var formData = dataMap["form"][0];
    		var contactData = dataMap["flxParentContactKA"]?(dataMap["flxParentContactKA"][0] ? dataMap["flxParentContactKA"][0] : null) : null;
    		var assetData = dataMap["flxObjectKA"]? (dataMap["flxObjectKA"][0]?dataMap["flxObjectKA"]:null):null;
    		var durationData = dataMap["flxDurationKA"] ? (dataMap["flxDurationKA"][0] ? dataMap["flxDurationKA"][0] : []): null;
    		var ContactprocessedData = {};
    		var formmodel = scopeObj.getController().getFormModel();
    		formmodel.clear();
    		var AssetprocessedData = {};
    		var durationprocessedData = {};
    		var addressData ="";
    		var utilitiesObj= utilities.getUtilityObj();    
    		scopeObj.contactDetail = "";   		
    		scopeObj.setFormModelInfo("flxInstructionKA", {"fullText" : "","isTruncated": false,"headerText" : utilitiesObj.geti18nValueKA("i18n.common.InstructionDescKA")});
    		scopeObj.setFormModelInfo("flxLocationKA", {"fullText" : "","isTruncated":false, "headerText" : utilitiesObj.geti18nValueKA("i18n.common.LocDescKA")});
    		if(contactData){
				scopeObj.contactDetail=contactData["id"];
				ContactprocessedData["lblContactDescriptionKA"] = (contactData["FirstName"] ? contactData["FirstName"] : "") + " " + (contactData["LastName"] ? contactData["LastName"] : "");							
	            formmodel.setViewAttributeByProperty("imgContactNavKA","isVisible",true);
            }else{
            	formmodel.setViewAttributeByProperty("imgContactNavKA","isVisible",false); 
            } 	
            var priorityVal = formData["Priority"] ? formData["Priority"] : "";	
			formmodel.setViewAttributeByProperty("imgStatusKA",kony.servicesapp.SOURCE,utilitiesObj.getStatusImageKA(formData["Status_id"]));
			var processedData = {};
    		processedData["lblTime"] = formData["PlannedStartDate"];
    		processedData["lblOrderValueIDKA"] = formData["Code"];
			if(priorityVal){
				formmodel.setViewAttributeByProperty("imgPriorityKA",kony.servicesapp.SOURCE,utilitiesObj.getPriorityImageKA(priorityVal));
				processedData["lblPriorityValueKA"] = utilitiesObj.getPriorityTextKA(priorityVal);
			}   		
    		processedData["lblStatusValueKA"] = utilitiesObj.getStatusTextKA(formData["Status_id"]);
    		processedData["blDescriptionKA"] = formData["Description"];
			if(formData["Address"] && formData["Address"][0]){
				addressData = utilitiesObj.getOrderAddress(formData["Address"][0]);    	
			}
    		if(addressData){
				var locationdesc = utilitiesObj.dataTruncation(addressData,72,3,"...");
				scopeObj.setFormModelInfo("flxLocationKA", {"fullText" : addressData,"isTruncated":locationdesc.isTruncated, "headerText" : utilitiesObj.geti18nValueKA("i18n.common.LocDescKA")});
				processedData["lblLocationValueKA"] = locationdesc["value"];
				if (locationdesc["isTruncated"]) {
	                formmodel.setViewAttributeByProperty("imgArrowKA", "isVisible", locationdesc.isTruncated);
                }else{                
                	formmodel.setViewAttributeByProperty("imgArrowKA", "isVisible", locationdesc.isTruncated);
                }
            }else{
            	formmodel.setViewAttributeByProperty("imgArrowKA", "isVisible", false);
            }
    		if(formData["Instructions"]){    			
				var description=utilitiesObj.dataTruncation(formData["Instructions"],72,3,"...");
				scopeObj.setFormModelInfo("flxInstructionKA", {"fullText" : formData["Instructions"],"isTruncated": description["isTruncated"],"headerText" : utilitiesObj.geti18nValueKA("i18n.common.InstructionDescKA")});
				processedData["lblInstructionsValueKA"] = description["value"]; 
				if (description["isTruncated"]) {						
	                formmodel.setViewAttributeByProperty("imgArrowInstKA", "isVisible", description.isTruncated);
                }else{                		
	            	formmodel.setViewAttributeByProperty("imgArrowInstKA", "isVisible", description.isTruncated);
	            } 	
			}else{
            	formmodel.setViewAttributeByProperty("imgArrowInstKA", "isVisible", false);
            }
          	if(assetData){
              var str_asset ="";
              var assetDataLength = assetData.length;
              var index=0,isAsset = false;
              for(var i=0;i<assetDataLength;i++){
                if(assetData[i]["ObjectType"]=='IE')
                  {
                    isAsset=true;
                    index=i;
                    break;
                  }
              }
              str_asset+=assetData[index]["Description"];
              AssetprocessedData["lblObjectDescriptionKA"] = str_asset;
              scopeObj.setFormModelInfo("ObjectName",str_asset);
              formmodel.setViewAttributeByProperty("imgArrowObjectKA","isVisible",true);
              formmodel.setViewAttributeByProperty("flxObjectKA","setEnabled",true);
            }
          	else{
              formmodel.setViewAttributeByProperty("imgArrowObjectKA","isVisible",false);
              formmodel.setViewAttributeByProperty("flxObjectKA","setEnabled",false);
            }
    		durationprocessedData["lblDurationValueKA"] = utilitiesObj.dateFormat((durationData.duration ? durationData.duration : 0),"HH:MM");
    		dataMap["form"] = processedData;
    		dataMap["flxParentContactKA"] = ContactprocessedData;
			dataMap["flxObjectKA"] = AssetprocessedData;
    		dataMap["flxDurationKA"] = durationprocessedData;
			scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
			formmodel.showView();
        }catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
		}
    },
    fetchMasterData: function(successcallback, errorcallback){
    	this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
    },
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback){
    	try {
    		this.$class.$superp.fetchMasterDataForWidget.call(this, widgetId, successcallback, errorcallback);
    	}catch(error){
    		kony.sdk.mvvm.log.error("Error in Blogic fetch metadata : " + error);
    	}
    },
    saveRecord: function(recordObject, entityName, onSuccess, onError){
    	try{
    		this.$class.$superp.saveRecord.call(this, recordObject, entityName, onSuccess, onError);
    	}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
		}
    },
   	saveRecords: function(recordsArray, successcallback, errorcallback){
    	try{
    		this.$class.$superp.saveRecords.call(this, recordsArray, successcallback, errorcallback);
	    }catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
		}
    },
    getEntitiesDataMap: function(){
    	try{
	    	return this.$class.$superp.getEntitiesDataMap.call(this);
		}catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
		}
    },
    saveData: function(successCallback, errorCallback) {
    	try{
    		this.$class.$superp.saveData.call(this, successCallback, errorCallback);
        }catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic save data : " + error);
		}
    },
    deleteData: function() {
    	try{
    		this.$class.$superp.deleteData.call(this);
        }catch(error){
			kony.sdk.mvvm.log.error("Error in Blogic delete data : " + error);
		}
    },
    performAction: function(actionName, argsArray) {
        try {
        	return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    } ,    
    showContactDetailsForm: function(){
		try{
			var context = this.getController().getControllerExtensionObject();
			var dataModel = new kony.sdk.mvvm.DataModel();
			if(context.contactDetail){
				var primaryKeyMap = {};
				primaryKeyMap.id = context.contactDetail;
				dataModel.setPrimaryKeyValueMap(primaryKeyMap);
				var navigationObject = new kony.sdk.mvvm.NavigationObject();
				navigationObject.setDataModel(dataModel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
				kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmContactDetailsKA").loadDataAndShowForm(navigationObject);
			}
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showContactDetailsForm : " + err);
        }
    },
	navigateBack: function(){ 
		this.$class.$superp.showPreviousForm.call(this,true,"frmOrderExecutionKA");
    },
	deviceBack : function(){    
     	utilities.getUtilityObj().doNothingOnDeviceBackKA();
    },
  	showOrderObjectForm :function(){
      try{
        	var scopeObj = this;
        	var workorderId=scopeObj.getController().getContextData().getCustomInfo("workorderId");
        	//var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({"Order_number":workorderId});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x":workorderId
            });
        	navigationObject.addCustomInfo("prevFormName",kony.application.getCurrentForm().id);
        	scopeObj.navigateTo("frmOrderAssetKA", navigationObject);
      }
      catch(err){
        kony.sdk.mvvm.log.error("error in Blogic showOrderObjectForm : " + err);
      };
    }
});