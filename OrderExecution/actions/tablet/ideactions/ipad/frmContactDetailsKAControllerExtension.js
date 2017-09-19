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
kony.sdk.mvvm.frmContactDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
        var skins = {
            "lblDisabled": "sknLbl5E5050ClanProBook28Opacity20KA",
            "lblEnabled": "sknLbl5E5050ClanProBook28KA",
            "btnEmailDisabled": "sknBtnEmailDisbaledKA",
            "btnEmail": "sknBtnEmailKA",
            "btnEmailFocus": "sknBtnEmailFocKA",
            "btnCall": "sknBtnCallKA",
            "btnCallFocus": "sknBtnCallFocKA",
            "btnCallDisabled": "sknbtnPhoneDisabledKA",
            "btnMessage": "sknBtnMessageKA",
            "btnMessageDisabled": "sknbtnMessageDisabledKA",
            "btnMessageFocus": "sknBtnMessageFocKA"
        };
        this.getSkinValue = function(skin) {
            return skins[skin];
        }
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.appfoundation.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(response) {
            kony.appfoundation.log.info("success fetching data ", response);
            scopeObj.formatData(response);
        }

        function error(err) {
            //Error fetching data
            kony.appfoundation.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
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
            var formModel = this.getController().getFormModel();
            var utilitiesObj = utilities.getUtilityObj();
            var formData = dataMap["form"][0];
            var processedData = {};
            var scopeObj = this;
            scopeObj.toggleVisibility(true);
            var contactName = "";
            var phoneExists = false;
            if (formData["FirstName"]) {
                contactName += formData["FirstName"] + " ";
            }
            if (formData["LastName"]) {
                contactName += formData["LastName"];
            }
            processedData["lblContactNameValueKA"] = contactName;
            formModel.setViewAttributeByProperty("lblPhoneNumberValueKA", "skin", this.getSkinValue("lblEnabled"));
            formModel.setViewAttributeByProperty("btnCallKA", "skin", this.getSkinValue("btnCall"));
            formModel.setViewAttributeByProperty("btnCallKA", "focusSkin", this.getSkinValue("btnCallFocus"));
            formModel.performActionOnView("btnCallKA", "setEnabled", [true]);
            if (formData["PrimaryPhone"]) {
                phoneExists = true;
                processedData["lblPhoneNumberValueKA"] = utilitiesObj.beautifyPhoneNumber(formData["PrimaryPhone"] + formData["PrimaryExtension"]);
            }
            if (formData["AlternatePhone"]) {
                if (phoneExists) {
                    processedData["lblAlternatePhoneKA"] = utilitiesObj.beautifyPhoneNumber(formData["AlternatePhone"]);
                    processedData["lblPhoneNumberValueKA"] += "(Primary)";
                    scopeObj.toggleVisibility(true);
                } else {
                    processedData["lblPhoneNumberValueKA"] = utilitiesObj.beautifyPhoneNumber(formData["AlternatePhone"]);
                    scopeObj.toggleVisibility(false);
                    phoneExists = true;
                }
                formModel.setViewAttributeByProperty("lblMessageValueKA", "skin", this.getSkinValue("lblEnabled"));
                formModel.setViewAttributeByProperty("btnMsgKA", "skin", this.getSkinValue("btnMessage"));
                formModel.setViewAttributeByProperty("btnMsgKA", "focusSkin", this.getSkinValue("btnMessageFocus"));
                formModel.performActionOnView("btnMsgKA", "setEnabled", [true]);
                processedData["lblMessageValueKA"] = utilitiesObj.beautifyPhoneNumber(formData["AlternatePhone"]);
            } else {
                formModel.setViewAttributeByProperty("btnMsgKA", "skin", this.getSkinValue("btnMessageDisabled"));
                formModel.setViewAttributeByProperty("lblMessageValueKA", "skin", this.getSkinValue("lblDisabled"));
                formModel.setViewAttributeByProperty("btnMsgKA", "focusSkin", this.getSkinValue("btnMessageDisabled"));
                processedData["lblMessageValueKA"] = "No phone specified";
                formModel.performActionOnView("btnMsgKA", "setEnabled", [false]);
                scopeObj.toggleVisibility(false);
            }
            if (!phoneExists) {
                processedData["lblPhoneNumberValueKA"] = "No phone specified";
                formModel.setViewAttributeByProperty("btnCallKA", "skin", this.getSkinValue("btnCallDisabled"));
                formModel.setViewAttributeByProperty("lblMessageValueKA", "skin", this.getSkinValue("lblDisabled"));
                formModel.setViewAttributeByProperty("btnCallKA", "focusSkin", this.getSkinValue("btnCallDisabled"));
                formModel.setViewAttributeByProperty("lblPhoneNumberValueKA", "skin", this.getSkinValue("lblDisabled"));
                formModel.performActionOnView("btnCallKA", "setEnabled", [false]);
            }
            if (formData["Email"]) {
                processedData["lblEmailValueKA"] = formData["Email"];
                formModel.setViewAttributeByProperty("btnEmailKA", "skin", this.getSkinValue("btnEmail"));
                formModel.setViewAttributeByProperty("btnEmailKA", "focusSkin", this.getSkinValue("btnEmailFocus"));
                formModel.performActionOnView("btnEmailKA", "setEnabled", [true]);
                formModel.setViewAttributeByProperty("lblEmailValueKA", "skin", this.getSkinValue("lblEnabled"));
            } else {
                processedData["lblEmailValueKA"] = "No email";
                formModel.setViewAttributeByProperty("btnEmailKA", "skin", this.getSkinValue("btnEmailDisabled"));
                formModel.performActionOnView("btnEmailKA", "setEnabled", [false]);
                formModel.setViewAttributeByProperty("lblEmailValueKA", "skin", this.getSkinValue("lblDisabled"));
            }
            dataMap["form"] = processedData;
            var bindDataObj;
            for (var widgetGroupId in dataMap) {
                bindDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
                bindDataObj.bind(formModel, dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"]);
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
    fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
            var configObj = this.getController().getConfig();
            var serviceName = configObj.getObjectServiceName();
            var options = configObj.getObjectServiceOptions();
            this.$class.$superp.fetchMasterData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterData", e);
        }
    },
    fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterDataForWidget", e);
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
            var scopeObj = this;
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
            var scopeObj = this;
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
        this.$class.$superp.showPreviousForm.call(this, true, "frmOrderDetailsKA");
    },
    toggleVisibility: function(visibility) {
        try {
            var formModel = this.getController().getFormModel();
            formModel.setViewAttributeByProperty("flxSecondaryPhoneKA", "isVisible", visibility);
        } catch (err) {}
    },
    deviceBack: function() {
        utilities.getUtilityObj().doNothingOnDeviceBackKA();
    }
});