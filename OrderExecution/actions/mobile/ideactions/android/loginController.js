kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.constants["QR_CODE_FLOW"] = false;
var LoginController = Class({
    $statics: {
        INSTANCE: null,
        getInstance: function() {
            if (!LoginController.INSTANCE) {
                var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
                if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
                    LoginController.INSTANCE = new LoginControllerIOS();
                } else if (platFormName === kony.sdk.mvvm.Platforms["ANDROID"] || platFormName === kony.sdk.mvvm.Platforms["TABRCANDROID"]) {
                    LoginController.INSTANCE = new LoginControllerANDROID();
                } else {
                    kony.sdk.mvvm.log.error("Functionality not available.");
                }
            }
            return LoginController.INSTANCE;
        },
        captureBarcode: function() {
            try {
                LoginController.getInstance().captureBarcode();
            } catch (err) {
                kony.sdk.mvvm.log.error("Error in barcode controller : ", err);
            }
        },
        postAppInit: function() {
            var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
            if (credStore && Object.keys(credStore).length > 0) {
                kony.servicesapp.isAppLaunchedFirstTime = false;
                var key = credStore[kony.sdk.mvvm.credStoreSecretKey];
                var authParams = {};
                //	authParams["tenant"] = credStore[kony.sdk.mvvm.credStoreTenant];
                //authParams["hostname"] = credStore[kony.sdk.mvvm.credStoreHostName];
                authParams["username"] = kony.sdk.mvvm.decryptData(key, credStore[kony.sdk.mvvm.credStoreUsername]);
                authParams["password"] = kony.sdk.mvvm.decryptData(key, credStore[kony.sdk.mvvm.credStorePassword]);
                //	frmTenantKA.tbxTenantKA.text = authParams["tenant"];
                //	frmTenantKA.tbxURLKA.text = authParams["hostname"];
                frmLoginKA.tbxUserIDKA.text = authParams["username"];
                frmLoginKA.tbxPasswordKA.text = authParams["password"];
                //  return frmLoginKA;
            } else {
                kony.servicesapp.isAppLaunchedFirstTime = true;
            }
            return frmLoginKA;
        },
        continueLoginFlow: function() {
            //frmTenantKA.show();
            //var utilitiesObj = utilities.getUtilityObj();
            //            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            //			kony.timer.schedule("tenantTimer",tenantScreenCallback,2,false);
            //			function tenantScreenCallback(){				
            //				LoginController.verifyTenantURL();
            //				kony.sdk.mvvm.LoginAction();
            //			}
            kony.sdk.mvvm.LoginAction();
        },
        verifyTenantURL: function() {
            var tenant = frmTenantKA.tbxTenantKA.text;
            var tenantURL = frmTenantKA.tbxURLKA.text;
            var errMessage;
            var utilitiesObj = utilities.getUtilityObj();
            if (!tenant) {
                errMessage = utilitiesObj.geti18nValueKA("i18n.common.Tenant.alert.tenantNameKA");
                kony.sdk.mvvm.v2.util.showInfoAlert({
                    text: errMessage,
                    btnConfirmText: utilitiesObj.geti18nValueKA("i18n.common.login.alert.okKA"),
                    header: utilitiesObj.geti18nValueKA("i18n.common.login.alert.infoKA")
                });
                return;
            } else if (!tenantURL) {
                errMessage = utilitiesObj.geti18nValueKA("i18n.common.Tenant.alert.tenantURLKA");
                kony.sdk.mvvm.v2.util.showInfoAlert({
                    text: errMessage,
                    btnConfirmText: utilitiesObj.geti18nValueKA("i18n.common.login.alert.okKA"),
                    header: utilitiesObj.geti18nValueKA("i18n.common.login.alert.infoKA")
                });
                return;
            }
            //TODO: replace hardcoded strings with proper i18n strings.
            /*var succMessage = "You have successfully setup Kony Order Execution app. You can now login";
			var headerMessage = "Success!";
			var loginText = "Login";
			var showLoginForm = function(res){
				kony.sdk.mvvm.constants["QR_CODE_FLOW"] = true;
				frmLoginKA.show();
			};
			kony.sdk.mvvm.v2.util.showInfoAlert({
				text: succMessage,
				callback: showLoginForm,
				btnConfirmText: loginText,
				header: headerMessage
			});*/
            //Enable this code to show a message on successful tenant setup
            kony.sdk.mvvm.constants["QR_CODE_FLOW"] = true;
            frmLoginKA.show();
        }
    },
    constructor: function() {}
});
var LoginControllerIOS = Class({
    constructor: function() {},
    captureBarcode: function() {
        try {
            var barcodeCaptureCallback = function(barcodeData, barcodeDataDummmy) {
                    var responce = barcodeData.barcodestring;
                    kony.sdk.mvvm.log.info("barcode data responce ***" + responce);
                    var authParams = JSON.parse(responce);
                    //TODO : Add more validation
                    if (authParams && authParams["Tenant"] && authParams["Domain"]) {
                        frmTenantKA.tbxTenantKA.text = authParams["Tenant"];
                        frmTenantKA.tbxURLKA.text = authParams["Domain"];
                        frmLoginKA.tbxUserIDKA.text = authParams["Username"];
                        frmLoginKA.tbxPasswordKA.text = authParams["Password"];
                        LoginController.continueLoginFlow();
                    } else {
                        kony.sdk.mvvm.log.error("Error in barcode scan, wrong text params");
                    }
                };
            Barcode.captureBarcode(barcodeCaptureCallback);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in barcode scan **", err);
        }
    }
});
var LoginControllerANDROID = Class({
    constructor: function() {},
    captureBarcode: function() {
        try {
            var barcodeCaptureCallback = function(barcodeDataDummmy, barcodeData) {
                    var responce = barcodeData;
                    kony.sdk.mvvm.log.info("barcode data responce ***" + responce);
                    var authParams = JSON.parse(responce);
                    //TODO : Add more validation
                    if (authParams && authParams["Tenant"] && authParams["Domain"]) {
                        frmTenantKA.tbxTenantKA.text = authParams["Tenant"];
                        frmTenantKA.tbxURLKA.text = authParams["Domain"];
                        frmLoginKA.tbxUserIDKA.text = authParams["Username"];
                        frmLoginKA.tbxPasswordKA.text = authParams["Password"];
                        LoginController.continueLoginFlow();
                    } else {
                        kony.sdk.mvvm.log.error("Error in barcode scan, wrong text params");
                    }
                };
            Barcode.captureBarcode(barcodeCaptureCallback);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in barcode scan **", err);
        }
    }
});