var LocalAuthController = Class({
    $statics: {
        INSTANCE: null,
        getInstance: function() {
            if (!LocalAuthController.INSTANCE) {
                var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
                if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
                    LocalAuthController.INSTANCE = new LocalAuthControllerIOS();
                } else if (platFormName === kony.sdk.mvvm.Platforms["ANDROID"] || platFormName === kony.sdk.mvvm.Platforms["TABRCANDROID"]) {
                    LocalAuthController.INSTANCE = new LocalAuthControllerANDROID();
                } else {
                    kony.sdk.mvvm.log.error("Functionality not available.");
                }
            }
            return LocalAuthController.INSTANCE;
        },
        preShow: function() {
            LocalAuthController.getInstance().preShow();
        },
        /*****************************************************************
         *	Name    : authenicateTouchId
         *	Author  : Kony 
         *	Purpose : This method will be invoked to locally authenticate on button tap.
         ******************************************************************/
        authenicateTouchId: function() {
            try {
                //TODO : Might need to change if we implement security related changes.
                var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
                if (credStore && Object.keys(credStore).length > 0) {
                    var key = credStore[kony.sdk.mvvm.credStoreSecretKey];
                    var authParams = {};
                    authParams["tenant"] = credStore[kony.sdk.mvvm.credStoreTenant];
                    authParams["hostName"] = credStore[kony.sdk.mvvm.credStoreHostName];
                    authParams["username"] = kony.sdk.mvvm.decryptData(key, credStore[kony.sdk.mvvm.credStoreUsername]);
                    authParams["password"] = kony.sdk.mvvm.decryptData(key, credStore[kony.sdk.mvvm.credStorePassword]);
                    LocalAuthController.getInstance().authenicateTouchId(authParams);
                } else {
                    kony.sdk.mvvm.log.error("Not able to retrieve credentials required for login ..");
                }
            } catch (err) {
                kony.sdk.mvvm.log.error("Error in local auth controller : ", err);
            }
        }
    },
    constructor: function() {}
});
var LocalAuthControllerIOS = Class({
    constructor: function() {},
    preShow: function() {
        if (!kony.localAuthentication) {
            return;
        }
        var authStatus = kony.localAuthentication.getStautusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
        var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
        if (authStatus !== 5000 || !(credStore && Object.keys(credStore).length > 0)) {
            frmLoginKA.flxTouchDKA.setVisibility(false);
            return;
        } else if (kony.store.getItem("isTouchIDEnabled")) {
            frmLoginKA.flxTouchDKA.setVisibility(true);
        } else {
            frmLoginKA.flxTouchDKA.setVisibility(false);
        }
    },
    authenicateTouchId: function(authParams) {
        function performLogin() {
            frmTenantKA.tbxTenantKA.text = authParams["tenant"];
            frmTenantKA.tbxURLKA.text = authParams["hostName"];
            frmLoginKA.tbxUserIDKA.text = authParams["username"];
            frmLoginKA.tbxPasswordKA.text = authParams["password"];
            kony.sdk.mvvm.LoginAction();
        };
        /*****************************************************************
         *	Name    : authCallback
         *	Author  : Kony 
         *	Purpose : This callback method will be invoked on local authentication success/error.
         ******************************************************************/
        function authCallback(respCode, resMsg) {
            var alertMsg;
            if (respCode === 5000) {
                alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthSuccessKA");
                kony.sdk.mvvm.log.info(alertMsg);
                performLogin();
            } else {
                switch (respCode) {
                case 5001:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthFailedKA");
                    break;
                case 5002:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthCancelledKA");
                    break;
                case 5003:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthCancelledKA");
                    break;
                case 5004:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthPasscodeKA");
                    break;
                case 5005:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthPasscodeNotSetKA");
                    break;
                case 5006:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthNotAvailableKA");
                    break;
                case 5007:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthNotAvailableKA");
                    break;
                default:
                    alertMsg = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthFailedKA");
                    break;
                }
                kony.sdk.mvvm.log.info(alertMsg);
                /*kony.sdk.mvvm.v2.util.showInfoAlert({
					text: alertMsg,
					btnConfirmText: utilitiesObj.geti18nValueKA("i18n.common.login.alert.okKA"),
					header: utilitiesObj.geti18nValueKA("i18n.common.login.alert.infoKA")
				});*/
            }
        };
        if (!kony.localAuthentication) {
            return;
        }
        kony.sdk.mvvm.log.info("Before invoking TouchId.");
        var utilitiesObj = utilities.getUtilityObj();
        var authStatus = kony.localAuthentication.getStautusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
        if (authStatus === 5000) {
            var authConfig = {};
            authConfig["promptMessage"] = utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthKA");
            kony.localAuthentication.authenticate(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID, authCallback, authConfig);
        } else {
            kony.sdk.mvvm.log.info(utilitiesObj.geti18nValueKA("i18n.common.login.alert.touchIdAuthDisabledKA"));
        }
        kony.sdk.mvvm.log.info("After invoking TouchId.");
    },
    isTouchIDSupported: function() {
        var authStatus = kony.localAuthentication.getStautusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
        if (authStatus === 5000) {
            return true;
        } else {
            return false;
        }
    }
});
var LocalAuthControllerANDROID = Class({
    constructor: function() {},
    preShow: function() {
        frmLoginKA.flxTouchDKA.setVisibility(false);
    },
    authenicateTouchId: function(storedUsername, storedPassword) {
        kony.sdk.mvvm.log.error("Functionality not implemented.");
    },
    isTouchIDSupported: function() {
        return false;
    }
});