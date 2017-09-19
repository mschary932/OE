kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
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
          	
            if(kony.store.getItem("SDKINIT")){
              	kony.servicesapp.isAppLaunchedFirstTime=false;
                kony.servicesapp.CONNECTOR = kony.store.getItem("SDKINIT").CONNECTOR; 
                return frmLoginKA;
		    }else{
              	kony.servicesapp.isAppLaunchedFirstTime=true;
                return frmFSLoginKA;
            }
        },
        continueLoginFlow: function() {
			kony.sdk.mvvm.KonyApplicationContext.init(kony.servicesapp.APP_TYPE);
            kony.sdk.mvvm.constants[kony.servicesapp.QR_CODE_FLOW] = true;
           	frmTenantKA.show();
            kony.servicesapp.verifyAppDetails();
            kony.timer.schedule("tenantTimer", tenantScreenCallback,2 , false);
            function tenantScreenCallback() {
                kony.sdk.mvvm.LoginAction();
            }
        },
    },
    constructor: function() {
    }
});

var LoginControllerIOS = Class({
    constructor: function() {

    },
    captureBarcode: function() {
        try {
            var barcodeCaptureCallback = function(barcodeData, barcodeDataDummmy) {
                var response = barcodeData.barcodestring;
                kony.sdk.mvvm.log.info("barcode data responce ***" + response);
                var authParams = JSON.parse(response);
				if(authParams && authParams["OrderExecution"]){
					authParams = authParams["OrderExecution"];
				}
                if (authParams && authParams["AppKey"] && authParams["AppSecret"] && authParams["ServiceURL"]) {     
					frmTenantKA.tbxAppKeyKA.text = authParams["AppKey"];
                    frmTenantKA.tbxAppSecretKA.text = authParams["AppSecret"];
					kony.servicesapp.APP_ID = authParams["AppID"] ? authParams["AppID"] : kony.servicesapp.APP_ID;
                    frmTenantKA.tbxVersion.text = authParams["Version"];
					frmTenantKA.tbxServiceURLKA.text = authParams["ServiceURL"];								
                    frmLoginKA.tbxUserIDKA.text = authParams["Username"];
                    frmLoginKA.tbxPasswordKA.text = authParams["Password"];	
					kony.servicesapp.CONNECTOR=authParams["Connector"]?authParams["Connector"]:kony.servicesapp.CONNECTOR;
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
    constructor: function() {
    },
    captureBarcode: function() {
        try {
             var barcodeCaptureCallback = function(barcodeDataDummmy, barcodeData) {
                var response = barcodeData;
                kony.sdk.mvvm.log.info("barcode data responce ***" + response);
                var authParams = JSON.parse(response);
				if (authParams && authParams["OrderExecution"]){
					authParams = authParams["OrderExecution"];
				}
				if (authParams && authParams["AppKey"] && authParams["AppSecret"] && authParams["ServiceURL"]) {
					frmTenantKA.tbxAppKeyKA.text = authParams["AppKey"];
					frmTenantKA.tbxAppSecretKA.text = authParams["AppSecret"];
					kony.servicesapp.APP_ID = authParams["AppID"] ? authParams["AppID"] : kony.servicesapp.APP_ID;
					frmTenantKA.tbxVersion.text = authParams["Version"];
					frmTenantKA.tbxServiceURLKA.text = authParams["ServiceURL"];
					frmLoginKA.tbxUserIDKA.text = authParams["Username"];
					frmLoginKA.tbxPasswordKA.text = authParams["Password"];
					kony.servicesapp.CONNECTOR=authParams["Connector"]?authParams["Connector"]:kony.servicesapp.CONNECTOR;
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