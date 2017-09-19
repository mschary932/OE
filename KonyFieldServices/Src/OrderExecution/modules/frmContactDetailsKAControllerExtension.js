//With code fixes
/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmContactDetailsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmContactDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
		var scopeObj = this;
        scopeObj.$class.$super.call(scopeObj,controllerObj);
        scopeObj.getSkinValue = function(skin) {
            return kony.servicesapp.ContactDetailsKA.skins[skin];
        }
    },
    fetchData: function() {
		var scopeObj = this;
        try {           
            scopeObj.$class.$superp.fetchData.call(scopeObj);
        } catch (err) {
            kony.appfoundation.log.error("Error in fetchData of controllerExtension");
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
        function success(response) {
            kony.appfoundation.log.info("success fetching data ", response);
        }
        function error(err) {
            //Error fetching data
            kony.appfoundation.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    formatData: function(data) {
        var scopeObj = this;
        try {
            var formattedData = scopeObj.$class.$superp.formatData.call(scopeObj, data);
            scopeObj.bindData(formattedData);
        } catch (err) {
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        };

    },
    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },
    prepareFetchAndBindDataStrategy: function() {
        try {
            this.$class.$superp.prepareFetchAndBindDataStrategy.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare fetch and bind data : " + error);
        }
    },
    updateBLogicContextData: function(widgetMapping) {
        try {
            this.$class.$superp.updateBLogicContextData.call(this, widgetMapping);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic update context data : " + error);
        }
    },
    fetchAndBindDataByWidgetGroup: function(widgetGroupId) {
        try {
            this.$class.$superp.fetchAndBindDataByWidgetGroup.call(this, widgetGroupId);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data for widget : " + error);
        }
    },
    bindData: function(dataMap) {
        try {
			var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var formData = dataMap["form"][0];
            var processedData = {};
            scopeObj.toggleVisibility(true);
            var contactName = "";            
            var phoneExists = false;
            if(formData["FirstName"]){contactName+=formData["FirstName"]+" ";}
            if(formData["LastName"]){contactName+=formData["LastName"];}
            processedData["lblContactNameValueKA"] = contactName;
			scopeObj.initialSkinsAssignment(formModel);
            if(formData["PrimaryPhone"]){
				phoneExists=true;
				processedData["lblPhoneNumberValueKA"]=utilitiesObj.beautifyPhoneNumber(formData["PrimaryPhone"]+formData["PrimaryExtension"]); 
            }
            if(formData["AlternatePhone"]){
				if(phoneExists){
					processedData["lblAlternatePhoneKA"]=utilitiesObj.beautifyPhoneNumber(formData["AlternatePhone"]);
					processedData["lblPhoneNumberValueKA"] += "("+ utilitiesObj.geti18nValueKA("i18n.order.common.primaryValueKA") +")";
					scopeObj.toggleVisibility(true);
            	}else{
            		processedData["lblPhoneNumberValueKA"]=utilitiesObj.beautifyPhoneNumber(formData["AlternatePhone"]);
            		scopeObj.toggleVisibility(false);
					phoneExists=true;
            	}
            	scopeObj.skinsForAlternatePhone(formModel);
				processedData["lblMessageValueKA"]=utilitiesObj.beautifyPhoneNumber(formData["AlternatePhone"]);
            }else{
				scopeObj.skinsIfNotAlternatePhone(formModel);
				processedData["lblMessageValueKA"] = utilitiesObj.geti18nValueKA("i18n.order.frmContactDetailsKA.lblPhoneNumberValueKA.placeHolderValueKA")//"No phone specified"; 
            	formModel.performActionOnView("btnMsgKA", "setEnabled", [false]);
            	scopeObj.toggleVisibility(false);             	
            }
            if(!phoneExists){ 
            	processedData["lblPhoneNumberValueKA"] = utilitiesObj.geti18nValueKA("i18n.order.frmContactDetailsKA.lblPhoneNumberValueKA.placeHolderValueKA")//"No phone specified";
            	scopeObj.skinsIfPhoneNotExists(formModel);           	
            }
            if (formData["Email"]) {
                processedData["lblEmailValueKA"] = formData["Email"];
                scopeObj.skinsForEmail(formModel);
            } else {
                processedData["lblEmailValueKA"] = utilitiesObj.geti18nValueKA("i18n.order.frmContactDetailsKA.lblEmailValueKA.placeHolderValueKA")//"No email";
				scopeObj.skinsForNotEmail(formModel);
            }
            dataMap["form"] = processedData;
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
			formModel.showView();            
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
	skinsForNotEmail: function(formModel) {
		try{
			var scopeObj = this;
			formModel.setViewAttributeByProperty("btnEmailKA", "skin", scopeObj.getSkinValue("btnEmailDisabled"));
			formModel.performActionOnView("btnEmailKA", "setEnabled", [false]);
			formModel.setViewAttributeByProperty("lblEmailValueKA", "skin", scopeObj.getSkinValue("lblDisabled"));
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic skinsForNotEmail : " + error);
        }		
	},
	skinsForEmail: function(formModel) {
		try{
			var scopeObj = this;
			formModel.setViewAttributeByProperty("btnEmailKA", "skin", scopeObj.getSkinValue("btnEmail"));
			formModel.setViewAttributeByProperty("btnEmailKA", "focusSkin", scopeObj.getSkinValue("btnEmailFocus"));
			formModel.performActionOnView("btnEmailKA", "setEnabled", [true]);
			formModel.setViewAttributeByProperty("lblEmailValueKA", "skin", scopeObj.getSkinValue("lblEnabled"));
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic skinsForEmail : " + error);
        }
	},
	skinsIfPhoneNotExists: function() {
		try{
			var scopeObj = this;
			formModel.setViewAttributeByProperty("btnCallKA", "skin", scopeObj.getSkinValue("btnCallDisabled"));
			formModel.setViewAttributeByProperty("lblMessageValueKA", "skin", scopeObj.getSkinValue("lblDisabled"));
			formModel.setViewAttributeByProperty("btnCallKA", "focusSkin", scopeObj.getSkinValue("btnCallDisabled"));
			formModel.setViewAttributeByProperty("lblPhoneNumberValueKA", "skin", scopeObj.getSkinValue("lblDisabled"));  
			formModel.performActionOnView("btnCallKA", "setEnabled", [false]); 
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic skinsIfPhoneNotExists : " + error);
        }		
	},
	skinsIfNotAlternatePhone: function(formModel) {
		try{
			var scopeObj = this;
			formModel.setViewAttributeByProperty("btnMsgKA", "skin", scopeObj.getSkinValue("btnMessageDisabled"));
			formModel.setViewAttributeByProperty("lblMessageValueKA", "skin", scopeObj.getSkinValue("lblDisabled"));
			formModel.setViewAttributeByProperty("btnMsgKA", "focusSkin", scopeObj.getSkinValue("btnMessageDisabled"));
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic skinsIfNotAlternatePhone : " + error);
        }		
	},
	skinsForAlternatePhone: function(formModel) {
		try{
			var scopeObj = this;
			formModel.setViewAttributeByProperty("lblMessageValueKA", "skin", scopeObj.getSkinValue("lblEnabled"));
			formModel.setViewAttributeByProperty("btnMsgKA", "skin", scopeObj.getSkinValue("btnMessage"));
			formModel.setViewAttributeByProperty("btnMsgKA", "focusSkin", scopeObj.getSkinValue("btnMessageFocus"));
			formModel.performActionOnView("btnMsgKA", "setEnabled", [true]);
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic skinsForAlternatePhone : " + error);
        }		
	},
	initialSkinsAssignment: function(formModel) {
		try{
			var scopeObj = this;
			formModel.setViewAttributeByProperty("lblPhoneNumberValueKA", "skin", scopeObj.getSkinValue("lblEnabled"));
			formModel.setViewAttributeByProperty("btnCallKA", "skin", scopeObj.getSkinValue("btnCall"));            
			formModel.setViewAttributeByProperty("btnCallKA", "focusSkin", scopeObj.getSkinValue("btnCallFocus"));
			formModel.performActionOnView("btnCallKA", "setEnabled", [true]); 
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic initialSkinsAssignment : " + error);
        }		
	},
    fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
            var scopeObj = this;
			var configObj = scopeObj.getController().getConfig();
            var serviceName = configObj.getObjectServiceName();
            var options = configObj.getObjectServiceOptions();
			this.$class.$superp.fetchMasterData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchMasterData : ", e);
        }
    },
    fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {
			this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchMasterDataForWidget", e);
        }
    },
    formatData: function(data) {
        try {
            var scopeObj = this;
            var formattedData = this.$class.$superp.formatData.call(this, data);
            this.bindData(formattedData);
        } catch (err) {
            //kony.appfoundation.log.error("Error in formatData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        };
    },
    saveRecord: function(recordObject, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },
    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            this.$class.$superp.saveRecords.call(this, recordsArray, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
        }
    },
    getEntitiesDataMap: function() {
        try {
            return this.$class.$superp.getEntitiesDataMap.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
        }
    },
    saveData: function() {
        try {
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
        function success(res) {
            //Successfully created record
            kony.appfoundation.log.info("success saving record ", res);
        }
        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    deleteData: function() {
        try {
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
        function success(res) {
            //Successfully deleting record
            kony.appfoundation.log.info("success deleting record " + JSON.stringify(res));
        }
        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },
    callContact: function(phoneNumber) {
        try {
            kony.phone.dial(phoneNumber);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },
    sendMail: function() {
        try {
            var toReceipients = [];
            toReceipients.push(arguments[0]);
            kony.phone.openEmail(toReceipients, [], [], "", arguments[1], false, []);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in opening email action : " + err);
        }
    },
    sendMessage: function(phoneNumber) {
        try {
            kony.phone.sendSMS(this.getController().getFormModel().getViewAttributeByProperty("lblMessageValueKA", "text"), "");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in opening message action : " + err);
        }
    },
    navigateBack: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, true, kony.servicesapp.FRMORDERDETAILSKA);
    },
    toggleVisibility:function(visibility){
    	try{
    	    this.getController().getFormModel().setViewAttributeByProperty("flxSecondaryPhoneKA", "isVisible", visibility);
    	}catch(err){
			kony.sdk.mvvm.log.error("error in toggleVisibility : " + err);
    	}
    },
    deviceBack:function(){
    	utilities.getUtilityObj().doNothingOnDeviceBackKA();
    }
});