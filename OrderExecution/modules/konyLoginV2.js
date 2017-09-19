kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.servicesapp = kony.servicesapp || {};
kony.sdk.mvvm.constants["ENABLE_JSON_STRINGIFY_PRINTS"] = false;
kony.sdk.mvvm.KonyApplicationContext.init(kony.servicesapp.APP_TYPE);
syncResponse = {}; //This is a konymvvm_sdk variable which we are modifying and hence cannot be changed.

kony.sdk.mvvm.LoginAction = function() {
	try {
		kony.sdk.mvvm.log.info("perflogs time:  The time when login button is clicked ....");
		frmLoginKA.btnLoginKA.setEnabled(false);
		//getting device locale
		var deviceLocale = kony.i18n.getCurrentDeviceLocale();
		var country = deviceLocale.country;
		if(country)
			kony.servicesapp.Country = country;
		else
			kony.servicesapp.Country = deviceLocale.slice(6);
		kony.sdk.mvvm.KonyApplicationContext.init(kony.servicesapp.APP_TYPE);
		var username = frmLoginKA.tbxUserIDKA.text;
		if (username && typeof username === 'string')
			username = username.trim();
		var password = frmLoginKA.tbxPasswordKA.text;
		var tenantSuffix = frmTenantKA.tbxAppSecretKA.text || kony.sdk.mvvm.appSecret;
		var tenantServiceURL = frmTenantKA.tbxServiceURLKA.text || kony.sdk.mvvm.serviceURL;
		var utilitiesObj = utilities.getUtilityObj();
		var databaseInterval = kony.servicesapp.databaseResetInterval;
		var passwordExpireMaxLimit = kony.servicesapp.offlineError;
		var syncConfig = {};
		var syncOptions = {};
		var savedUserName = kony.store.getItem("FIRSTLOGIN");
		//validate username
		if (!username) {
			alert(utilitiesObj.geti18nValueKA("i18n.common.login.alert.userNameKA"));
			frmLoginKA.tbxUserIDKA.skin = kony.servicesapp.ERROR_SKIN;
			frmLoginKA.tbxUserIDKA.focusSkin = kony.servicesapp.ERROR_SKIN;
			frmLoginKA.tbxUserIDKA.setFocus(true);
			frmLoginKA.btnLoginKA.setEnabled(true);
			return;
		}
		// validate password
		if (!password) {
			alert(utilitiesObj.geti18nValueKA("i18n.common.login.alert.passwordKA"));
			frmLoginKA.tbxPasswordKA.skin = kony.servicesapp.ERROR_SKIN;
			frmLoginKA.tbxPasswordKA.focusSkin = kony.servicesapp.ERROR_SKIN;
			frmLoginKA.tbxPasswordKA.setFocus(true);
			frmLoginKA.btnLoginKA.setEnabled(true);
			return;
		}
		kony.application.showLoadingScreen(null, utilitiesObj.geti18nValueKA("i18n.common.msg.authenticatingKA"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);    
		//Set global JSON Data to default values
		kony.servicesapp.globalOrdersViewsKA.view = kony.servicesapp.TODAY;
		kony.servicesapp.globalOrdersViewsKA.filters.date.value = moment().format(kony.servicesapp.DATE_FORMAT_YYYYMMDD);
		kony.servicesapp.globalOrdersViewsKA.filters.date.text = kony.servicesapp.TODAY;
		kony.servicesapp.globalOrdersViewsKA.filters.date.index = null;
		kony.servicesapp.globalOrdersViewsKA.filters.status.indices = null;
		kony.servicesapp.globalOrdersViewsKA.filters.status.values = null;
		kony.servicesapp.globalOrdersViewsKA.filters.status.formatValues = null;
		kony.servicesapp.globalOrdersViewsKA.filters.priorities.indices = null;
		kony.servicesapp.globalOrdersViewsKA.filters.priorities.values = null;
		kony.servicesapp.globalOrdersViewsKA.filters.priorities.formatValues = null;
		// SDK init
		if (kony.sdk.mvvm.isNetworkAvailabile()) {
			var sdkCred = kony.store.getItem("SdkCred");
			var appkey = sdkCred ? sdkCred["AppKey"] :  frmTenantKA.tbxAppKeyKA.text;
			var appsecret = sdkCred ? sdkCred["AppSecret"] : frmTenantKA.tbxAppSecretKA.text;
			var serviceurl = sdkCred ? sdkCred["ServiceURL"] : frmTenantKA.tbxServiceURLKA.text;
          	        kony.servicesapp.CONNECTOR=sdkCred?sdkCred["CONNECTOR"]:kony.servicesapp.CONNECTOR;
			konysyncClientSyncConfig.AppID = kony.servicesapp.APP_ID;
			konysyncClientSyncConfig.Version = sdkCred ? sdkCred["Version"] : frmTenantKA.tbxVersion.text;
			var client = new kony.sdk();
			try{
				client.init(appkey, appsecret, serviceurl, function(response) {
					kony.sdk.mvvm.log.info("SDK init succcess");
					kony.servicesapp.kmsObject = client.getMessagingService();
					kony.store.setItem("SDKINIT", true);
					kony.store.setItem("serviceDoc1", JSON.stringify(response.config));
					kony.servicesapp.login(username, password, appkey, tenantSuffix, tenantServiceURL, utilitiesObj, databaseInterval, passwordExpireMaxLimit, syncConfig, syncOptions, savedUserName);
				}, function(error) {
					frmLoginKA.btnLoginKA.setEnabled(true); 
					kony.application.dismissLoadingScreen();
					alert(kony.i18n.getLocalizedString("i18n.common.alert.initfailure"));
				});
			}catch(err){
				frmLoginKA.btnLoginKA.setEnabled(true);
				kony.application.dismissLoadingScreen();
				alert(kony.i18n.getLocalizedString("i18n.common.alert.initfailure"));
			}
		} else {
			if(kony.store.getItem("SDKINIT")){
				var sdkCred = kony.store.getItem("SdkCred");
				var appkey = sdkCred["AppKey"];
				var appsecret = sdkCred["AppSecret"];
				var client = new kony.sdk();
				client.initWithServiceDoc(appkey,appsecret, JSON.parse(kony.store.getItem("serviceDoc1")));
				kony.servicesapp.login(username, password, appkey, tenantSuffix, tenantServiceURL, utilitiesObj, databaseInterval, passwordExpireMaxLimit, syncConfig, syncOptions, savedUserName);
			}else{
				kony.application.dismissLoadingScreen();
				frmLoginKA.btnLoginKA.setEnabled(true);
				alert(utilitiesObj.geti18nValueKA("i18n.common.login.alert.firstUserErrorKA"));
			}
		}
	} catch(err){
		kony.sdk.mvvm.log.error("Failed to login" + err);
	}
}
//Called in Login preShow to prepopulate user info.
kony.servicesapp.populateUserCredentialsFromStore = function() {
	try {
		function setDefaultValues() {
			frmLoginKA.tbxUserIDKA.text = "";
			frmLoginKA.tbxPasswordKA.text = kony.servicesapp.EMPTY_STRING;
			frmLoginKA.switchonoffKA.selectedIndex = kony.servicesapp.SWITCH_TRUE;               
		};
		function setRemembermeFlag() {
			frmLoginKA.switchonoffKA.selectedIndex = kony.servicesapp.SWITCH_FALSE; 
		};
		if (kony.sdk.mvvm.constants[kony.servicesapp.QR_CODE_FLOW]) {
			kony.store.setItem(kony.servicesapp.REMEMBERMEFLAG, true);
			setRemembermeFlag();
			return;
		}
		if (kony.store.getItem(kony.servicesapp.REMEMBERMEFLAG)) {
			var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
			var storedUsername;
			var key;
			if (credStore !== null && credStore !== undefined) {
				key = credStore[kony.sdk.mvvm.credStoreSecretKey];
				storedUsername = credStore[kony.sdk.mvvm.credStoreUsername];
			}
			if (storedUsername !== undefined) {
				frmLoginKA.tbxUserIDKA.text = storedUsername;
				frmLoginKA.tbxPasswordKA.text = kony.servicesapp.EMPTY_STRING;
				setRemembermeFlag();
			} else {
				setDefaultValues();
			}
		} else {
			setDefaultValues();
		}		
	} catch (err) {
		kony.sdk.mvvm.log.info("Error occured while populating the user credentials from credStore");
		kony.sdk.mvvm.log.info(err.toString());
	}
}
//Called when Logout Action is selected.
kony.servicesapp.LogoutAction = function() {
	try {
		if (kony.servicesapp.IS_SYNC_IN_PROGRESS) {
			alert(utilities.getUtilityObj().geti18nValueKA("i18n.logout.syncErrorMessage"));
			return;
		}
		if (hamburgerMenu.IS_MENU_SHOWN) {
			new hamburgerMenu().execute();
		}         
		var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
		var watchposID = controllerExtension.getFormModelInfo("watchposID");
		kony.location.clearWatch(watchposID);
		controllerExtension.setFormModelInfo("watchposID", "");
		kony.sdk.mvvm.isValidBackGroundSyncForm = false;
		kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback);
		function sucCallback() {
			kony.sdk.mvvm.constants[kony.servicesapp.QR_CODE_FLOW] = false;
			TAG.NC.applyFormTransitions(frmLoginKA);
			var currentForm = kony.application.getCurrentForm();
			frmLoginKA.show();
			frmOrderListKA.destroy();
			frmHamburgerMenuWOKA.destroy();
			if (currentForm.id !=frmLoginKA){
				currentForm.destroy();
			}
		};
		function errCallback(err) {
			alert(err.toString());
		};
	} catch (err){
		kony.sdk.mvvm.log.error("Failed to logout" + err);
	}
}
//Called when Remember-Me Selected
kony.servicesapp.rememberMeKA = function() {
	try {
		if (frmLoginKA.switchonoffKA.selectedIndex == kony.servicesapp.SWITCH_FALSE) {
			kony.store.setItem(kony.servicesapp.REMEMBERMEFLAG, true);
		} else {
			kony.store.setItem(kony.servicesapp.REMEMBERMEFLAG, false);
		}
	} catch (err){
		kony.sdk.mvvm.log.error("Failed to set remember me" + err);
	}
}
//called when there is a change in status
kony.servicesapp.backgroundSyncOnStatusChangeKA = function() {
    try {
        if (kony.servicesapp.IS_SYNC_IN_PROGRESS) {
            return;
        }
        kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
		kony.sdk.mvvm.log.info("==backgroundSyncOnStatusChangeKA==>");
        kony.servicesapp.setSyncInProgressSkin();
		kony.servicesapp.SYNCENDPOINT = kony.servicesapp.SYNCSTARTPOINT + kony.servicesapp.SYNC_INCREMENT;
		kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
        kony.servicesapp.IS_SYNC_IN_PROGRESS = true;
        var statusChangeSuccessCallback = function(response) {
			kony.servicesapp.syncSuccessCallBackKA();
        }
        var statusChangeErrorCallback = function(response) {
			kony.servicesapp.syncFailureCallBackKA();
        }
        var syncConfig = {
            "onsyncstart": function(outputparams) {
                kony.servicesapp.onSyncStartCall(outputparams);
            },
            "onbatchprocessingsuccess": function(outputparams) {
                kony.servicesapp.batchProcessSuccessCallBack(outputparams);
            },
            "onuploadsuccess": function(outputparams) {
                kony.servicesapp.uploadSuccessCallBack(outputparams);
            },
            "sessiontasks": {
                OESyncConfig: {
                    doupload: true,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                },
				AvailableOrderSyncScope: {
                    doupload: true,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                },
                GPSTrackingSyncScope: {
                    doupload: false,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                }
            },
            "batchsize": kony.servicesapp.LOGIN_BATCH_SIZE,
			"ondownloadstart": function(outputparams) {	
				var req = outputparams.downloadRequest;
				if (req.clientcontext === undefined) {
					req.clientcontext = {};
				}
				req.clientcontext.BATCH_TIMEOUT = kony.servicesapp.SYNC_BATCH_TIMEOUT;
				outputparams.downloadRequest = req;
			}
        };
        var syncOptions = {
            "syncMetadata": false,
            "syncData": true,
            "syncConfig": syncConfig
        };
        kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getSyncManager().manualSync(syncOptions, statusChangeSuccessCallback, statusChangeErrorCallback);
    } catch (error) {
        kony.sdk.mvvm.log.error("==kony.servicesapp.backgroundSyncOnStatusChangeKA==>" + error);
    }
}
/** Calling sync for pending orders**/
kony.servicesapp.syncPendingOrdersKA = function() {
    try {
        if (kony.servicesapp.IS_SYNC_IN_PROGRESS) {
            return;
        }
        kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
		kony.sdk.mvvm.log.info("==syncPendingOrdersKA==>");
        kony.servicesapp.setSyncInProgressSkin();
		kony.servicesapp.SYNCENDPOINT = kony.servicesapp.SYNCSTARTPOINT + kony.servicesapp.SYNC_INCREMENT;
		kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
        kony.servicesapp.IS_SYNC_IN_PROGRESS = true;
        var statusChangeSuccessCallback = function(response) {
			kony.servicesapp.syncSuccessCallBackKA();
        }
        var statusChangeErrorCallback = function(response) {
			kony.servicesapp.syncFailureCallBackKA();
        }
        var syncConfig = {
            "onsyncstart": function(outputparams) {
                kony.servicesapp.onSyncStartCall(outputparams);
            },
            "onbatchprocessingsuccess": function(outputparams) {
                kony.servicesapp.batchProcessSuccessCallBack(outputparams);
            },
            "onuploadsuccess": function(outputparams) {
                kony.servicesapp.uploadSuccessCallBack(outputparams);
            },
            "sessiontasks": {
				OESyncConfig: {
                    doupload: false,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                },
              	AvailableOrderSyncScope: {
                    doupload: true,
                    dodownload: true,
                    uploaderrorpolicy: "continueonerror"
                },
                GPSTrackingSyncScope: {
                    doupload: false,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                }                               
            },
            "batchsize": kony.servicesapp.LOGIN_BATCH_SIZE,
			"ondownloadstart": function(outputparams) {	
				var req = outputparams.downloadRequest;
				if (req.clientcontext === undefined) {
					req.clientcontext = {};
				}
				req.clientcontext.BATCH_TIMEOUT = kony.servicesapp.SYNC_BATCH_TIMEOUT;
				outputparams.downloadRequest = req;
			}
        };
        var syncOptions = {
            "syncMetadata": false,
            "syncData": true,
            "syncConfig": syncConfig
        };
        kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getSyncManager().manualSync(syncOptions, statusChangeSuccessCallback, statusChangeErrorCallback);
    } catch (error) {
        kony.sdk.mvvm.log.error("==kony.servicesapp.syncPendingOrdersKA==>" + error);
    }
}
kony.servicesapp.syncTechnicianLocationKA = function() {
/** Calling sync for technician location.**/
    try {
        if (kony.servicesapp.IS_SYNC_IN_PROGRESS) {
            return;
        }
        kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
		kony.sdk.mvvm.log.info("==syncTechnicianLocationKA==>");
        kony.servicesapp.setSyncInProgressSkin();
		kony.servicesapp.SYNCENDPOINT = kony.servicesapp.SYNCSTARTPOINT + kony.servicesapp.SYNC_INCREMENT;
		kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
        kony.servicesapp.IS_SYNC_IN_PROGRESS = true;
        var techLocationUpdateSuccessCallback = function(response) {
			kony.servicesapp.syncSuccessCallBackKA();
        }
        var techLocationUpdateErrorCallback = function(response) {
			kony.servicesapp.syncFailureCallBackKA();
        }
        var syncConfig = {
            "onsyncstart": function(outputparams) {
                kony.servicesapp.onSyncStartCall(outputparams);
            },
            "onbatchprocessingsuccess": function(outputparams) {
                kony.servicesapp.batchProcessSuccessCallBack(outputparams);
            },
            "onuploadsuccess": function(outputparams) {
                kony.servicesapp.uploadSuccessCallBack(outputparams);
            },
            "sessiontasks": {
				OESyncConfig: {
                    doupload: false,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                },
              	AvailableOrderSyncScope: {
                    doupload: false,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                },
                GPSTrackingSyncScope: {
                    doupload: true,
                    dodownload: false,
                    uploaderrorpolicy: "continueonerror"
                }                               
            },
            "batchsize": kony.servicesapp.LOGIN_BATCH_SIZE,
			"ondownloadstart": function(outputparams) {	
				var req = outputparams.downloadRequest;
				if (req.clientcontext === undefined) {
					req.clientcontext = {};
				}
				req.clientcontext.BATCH_TIMEOUT = kony.servicesapp.SYNC_BATCH_TIMEOUT;
				outputparams.downloadRequest = req;
			}
        };
        var syncOptions = {
            "syncMetadata": false,
            "syncData": true,
            "syncConfig": syncConfig
        };
        kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getSyncManager().manualSync(syncOptions, techLocationUpdateSuccessCallback, techLocationUpdateErrorCallback);
    } catch (error) {
        kony.sdk.mvvm.log.error("==kony.servicesapp.syncTechnicianLocationKA==>" + error);
    }
}
kony.servicesapp.ShowLoadingScreen = function(text) {
/**Overriding the default MVVM loading screen **/
	try{
		var utilitiesObj = utilities.getUtilityObj();
      	if(kony.application.getCurrentForm().id == 'frmSummaryKA' && text === "Loading Form"){
          kony.application.showLoadingScreen(null, text, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        }else if(kony.application.getCurrentForm().id == 'frmSummaryKA'){
          kony.application.showLoadingScreen(null, utilitiesObj.geti18nValueKA("i18n.common.GeneratingInvoiceKA"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        }
		if (!kony.servicesapp.BACKGROUNDSYNCINPROGRESS) {
			if (text == kony.servicesapp.AUTHENTICATING) {
				text = utilitiesObj.geti18nValueKA("i18n.common.msg.authenticatingKA");
			} else if (text == kony.servicesapp.LOADING_METADATA) {
				text = utilitiesObj.geti18nValueKA("i18n.common.msg.preparingApplicationKA");
			} else if (text == kony.servicesapp.SCOPE_STARTED || text == kony.servicesapp.SYNC_STARTED || text == kony.servicesapp.BATCH_SUCCESS) {
				text = utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA");
			}
			kony.application.showLoadingScreen(null, text, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
		}
	} catch (err){
		kony.sdk.mvvm.log.error("Failed to override loading indicator" + err);
	}
}
kony.servicesapp.initSDK = function() {
	try{
		if (kony.sdk.mvvm.isNetworkAvailabile()) {
			var sdkCred = {};
			sdkCred["AppKey"] = frmTenantKA.tbxAppKeyKA.text;
			sdkCred["AppSecret"] = frmTenantKA.tbxAppSecretKA.text;
			sdkCred["ServiceURL"] = frmTenantKA.tbxServiceURLKA.text;
			sdkCred["Version"] = frmTenantKA.tbxVersion.text;
            sdkCred["CONNECTOR"] = kony.servicesapp.CONNECTOR;
			kony.store.setItem("SdkCred", sdkCred);
		}
	} catch (err){
		kony.sdk.mvvm.log.error("Failed to initSDK" + err);
	}
}
kony.servicesapp.login = function(username, password, tenant, tenantSuffix, tenantServiceURL, utilitiesObj, databaseInterval, passwordExpireMaxLimit, syncConfig, syncOptions, savedUserName) {
    // validate if sync is in progress when a new user is loggin in
	try {
		if ((savedUserName != username) &&
			kony.servicesapp.BACKGROUNDSYNCINPROGRESS) {
			alert(utilitiesObj.geti18nValueKA("i18n.common.login.alert.syncInProgressErrorKA"));
			frmLoginKA.btnLoginKA.setEnabled(true);
			return;
		}
		kony.application.showLoadingScreen(null, utilitiesObj.geti18nValueKA("i18n.common.msg.authenticatingKA"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
		kony.sdk.mvvm.constants["ISCLOUD"] = false;
		kony.servicesapp.INITIAL_SYNC = true;
		syncConfig = {
			"sessiontasks": {
				OESyncConfig: {
					doupload: false,
					dodownload: true,
					uploaderrorpolicy: "continueonerror"
				},
				AvailableOrderSyncScope: {
					doupload: false,
					dodownload: true,
					uploaderrorpolicy: "continueonerror"
				},
				GPSTrackingSyncScope: {
					doupload: true,
					dodownload: false,
					uploaderrorpolicy: "continueonerror"
				},
			},
			"ondownloadstart": function(outputparams) {	
				var req = outputparams.downloadRequest;
				if (req.clientcontext === undefined) {
					req.clientcontext = {};
				}
				req.clientcontext.BATCH_TIMEOUT = kony.servicesapp.SYNC_BATCH_TIMEOUT;
				outputparams.downloadRequest = req;
			},
			"batchsize": kony.servicesapp.LOGIN_BATCH_SIZE
		};
		function confirmReset(handler) {
			/**Sync confirmation message for different user login.**/
			kony.sdk.mvvm.Util.callAlert(
				utilitiesObj.geti18nValueKA("i18n.common.login.alert.deletePreviousUserDataWarningKA"), 
				"confirmation", 
				resetPreviousUserDB, 
				"", 
				utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"), 
				utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.No")
			);
			function resetPreviousUserDB(response) {
				if (response) {
					handler(true);
				} else {
					kony.sdk.mvvm.dismissSyncLoadingScreen();
					frmLoginKA.btnLoginKA.setEnabled(true);
				}
			}
		}
		var configParams = {
			"ShowLoadingScreenFunction": kony.servicesapp.ShowLoadingScreen,
			"ShowSyncLoadingScreenFunction": kony.servicesapp.ShowLoadingScreen
		};
		var authParams = {
			"userid": username,
			"password": password,          
			"callerId" : username+kony.sdk.mvvm.Utils.getDeviceID(),
			"loginOptions": {
				"isOfflineEnabled": true
			}
		}
		if (kony.store.getItem("FIRSTLOGIN") != username) {
			kony.servicesapp.BATCH_DOWNLOAD = true;
			syncOptions = {
				"syncMetadata": false,
				"syncData": true,
				"syncConfig": syncConfig,
				"resetConfirmationHandler": confirmReset
			}
			var params = {
				"authParams": authParams,
				"options": {
					"access": "offline"
				},
				"identityServiceName": "OEIdentityService",
				"syncOptions": syncOptions,
				"configParams": configParams
			}
			kony.setUserID(username);
			kony.sdk.mvvm.KonyApplicationContext.appServicesLogin(params, applicationInitialSuccessCallback, applicationErrorCallback);
		} else {
			var currentDate = moment().format(kony.servicesapp.DATE_FORMAT_YYYYMMDD);
			var lastdevicesynctime = kony.store.getItem("DEVICEDATANEXTSYNCTIME");
			var passwordExpireLimit = kony.store.getItem("PASSWORKEXPIREMAXINTERVAL");
			kony.servicesapp.BATCH_DOWNLOAD = false;
			syncOptions = {
				"syncMetadata": false,
				"syncData": false,
				"syncConfig": syncConfig
			}
			authParams.syncOptions = syncOptions;
			if (kony.sdk.mvvm.isNetworkAvailabile() && currentDate >= lastdevicesynctime) {
				var statusChangeSuccessCallback = function(response) {
					var resetSuccess = function() {
						kony.servicesapp.BATCH_DOWNLOAD = true;
						syncOptions = {
							"syncMetadata": false,
							"syncData": true,
							"syncConfig": syncConfig
						}
						var params = {
							"authParams": authParams,
							"options": {
								"access": "offline"
							},
							"identityServiceName": "OEIdentityService",
							"syncOptions": syncOptions,
							"configParams": configParams
						}
						kony.setUserID(username);
						kony.sdk.mvvm.KonyApplicationContext.appServicesLogin(params, applicationInitialSuccessCallback, applicationErrorCallback);
					}
					var resetError = function() {
						kony.sdk.mvvm.log.error("Error while resetting the application data");
					}
					kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getSyncManager().reset(resetSuccess, resetError);
				}
				var statusChangeErrorCallback = function(response) {
					kony.sdk.mvvm.log.info(JSON.stringify(response));
				}
				var syncConfig = {
					"sessiontasks": {
						OESyncConfig: {
							doupload: true,
							dodownload: false,
							uploaderrorpolicy: "continueonerror"
						},
						AvailableOrderSyncScope: {
							doupload: true,
							dodownload: false,
							uploaderrorpolicy: "continueonerror"
						},
						GPSTrackingSyncScope: {
							doupload: true,
							dodownload: false,
							uploaderrorpolicy: "continueonerror"
						}                  
					},
					"batchsize": kony.servicesapp.LOGIN_BATCH_SIZE,
					"ondownloadstart": function(outputparams) {	
						var req = outputparams.downloadRequest;
						if (req.clientcontext === undefined) {
							req.clientcontext = {};
						}
						req.clientcontext.BATCH_TIMEOUT = kony.servicesapp.SYNC_BATCH_TIMEOUT;
						outputparams.downloadRequest = req;
					}
				};
				var syncOptions = {
					"syncMetadata": false,
					"syncData": true,
					"syncConfig": syncConfig
				};
				kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getSyncManager().manualSync(syncOptions, statusChangeSuccessCallback, statusChangeErrorCallback);
			} else {
				if (!kony.sdk.mvvm.isNetworkAvailabile() && currentDate > passwordExpireLimit) {
					kony.store.removeItem("userCredentials");
					kony.store.removeItem("cred");
				}
				var params = {
					"authParams": authParams,
					"options": {
						"access": "offline"
					},
					"identityServiceName": "OEIdentityService",
					"syncOptions": syncOptions,
					"configParams": configParams
				}
				kony.setUserID(username);
				kony.sdk.mvvm.KonyApplicationContext.appServicesLogin(params, applicationInitialSuccessCallback, applicationErrorCallback);
			}
		}
		function applicationInitialSuccessCallback() {
			/**Success callback of login function.**/
			kony.sdk.mvvm.log.info("perflogs time: The time when Intial sync is completed.......");
			kony.application.showLoadingScreen(null, utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
			kony.servicesapp.INITIAL_SYNC = false;
			if(kony.store.getItem("isTouchIDEnabled")){
				kony.servicesapp.savePassword();
			}
			kony.sdk.mvvm.log.info("syncResponse", syncResponse);
			if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance()) {
				kony.servicesapp.rememberMeKA();
				try {
					kony.sdk.mvvm.appInit(kony.sdk.mvvm.KonyApplicationContext.getAppInstance());
					function success(){
                        if(PreferenceConfigHandeller.getInstance().getPreferenceValue("PREF_IDLE_SESSION_TIMEOUT")!=null){
							kony.application.registerForIdleTimeout(parseFloat(PreferenceConfigHandeller.getInstance().getPreferenceValue("PREF_IDLE_SESSION_TIMEOUT")), timeOutCallback);
                        }
					 var configs=kony.servicesapp.configurations;
                      for(var i in configs){
                        var key=configs[i];
                      if(PreferenceConfigHandeller.getInstance().getPreferenceValue(key)!=null){
                           var val=PreferenceConfigHandeller.getInstance().getPreferenceValue(key);
						   if(!(isNaN(val)))
                            val=Number(val);  
                           var modkey=key;
                           modkey=modkey.replace("PREF_","");
                          kony["servicesapp"][modkey]=val; 
                          
                        }
                           }  	                 
                    }
				kony.servicesapp.loadAndConfigureApp(frmLoginKA.tbxUserIDKA.text,kony.store.getItem("SdkCred")["ServiceURL"],success);
                }  catch (err) {
					applicationErrorCallback(err);
				}
			} else {
				kony.sdk.mvvm.log.error("Application is not initialized");
				applicationErrorCallback("Application is not initialized");
			}
			frmLoginKA.btnLoginKA.setEnabled(true);
			kony.servicesapp.IS_SYNC_IN_PROGRESS = false;
			if ((kony.store.getItem("FIRSTLOGIN") == username) && !kony.servicesapp.BATCH_DOWNLOAD) {
				kony.servicesapp.startManualSync(true, false);
			} else {
				kony.store.setItem("FIRSTLOGIN", username);
				kony.servicesapp.pushRegister();
				kony.store.setItem("DEVICEDATANEXTSYNCTIME", moment().add(databaseInterval, 'days').format(kony.servicesapp.DATE_FORMAT_YYYYMMDD));
				kony.store.setItem("PASSWORKEXPIREMAXINTERVAL", moment().add(passwordExpireMaxLimit, 'days').format(kony.servicesapp.DATE_FORMAT_YYYYMMDD));
			}
		};
		function timeOutCallback() {
			/**Called when application time out occurs. **/
			kony.servicesapp.LogoutAction();
		}
		function applicationErrorCallback(error) {
			/** Error callback of login function. Based on error codes; error message is processed.**/
			kony.application.dismissLoadingScreen();
			kony.servicesapp.IS_SYNC_IN_PROGRESS = false;
			kony.servicesapp.INITIAL_SYNC = false;
			kony.sdk.mvvm.log.info("syncResponse", syncResponse);
			frmLoginKA.btnLoginKA.setEnabled(true);
			kony.sdk.mvvm.log.error("failed to load app" + error);
			if (!error || error === "") {
				error = utilitiesObj.geti18nValueKA("i18n.common.login.alert.intilizeErrorKA");
			}
			if (error instanceof kony.sdk.mvvm.Exception) {
				var storeObj = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataStoreObject();
				var storedCredStore = storeObj.getData(kony.sdk.mvvm.credStoreName);
				switch (error.code) {
					case 12:            
						if (kony.sdk.mvvm.isNetworkAvailabile()) {
							error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.invalidAuthenticationErrorKA");
							frmLoginKA.tbxUserIDKA.skin = kony.servicesapp.ERROR_SKIN;
							frmLoginKA.tbxPasswordKA.skin = kony.servicesapp.ERROR_SKIN;
							frmLoginKA.tbxUserIDKA.focusSkin = kony.servicesapp.ERROR_SKIN;
							frmLoginKA.tbxPasswordKA.focusSkin = kony.servicesapp.ERROR_SKIN;
						}else{
							if(kony.store.getItem("userCredentials")){
								error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.invalidAuthenticationErrorKA");
								frmLoginKA.tbxUserIDKA.skin = kony.servicesapp.ERROR_SKIN;
								frmLoginKA.tbxPasswordKA.skin = kony.servicesapp.ERROR_SKIN;
								frmLoginKA.tbxUserIDKA.focusSkin = kony.servicesapp.ERROR_SKIN;
								frmLoginKA.tbxPasswordKA.focusSkin = kony.servicesapp.ERROR_SKIN;
							}else{
								 error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.firstUserErrorKA");
							}						
						}                                     
						break;
					case 70:
						if(kony.store.getItem("userCredentials")){
							 error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.invalidAuthenticationErrorKA");
							frmLoginKA.tbxUserIDKA.skin = kony.servicesapp.ERROR_SKIN;
							frmLoginKA.tbxPasswordKA.skin = kony.servicesapp.ERROR_SKIN;
							frmLoginKA.tbxUserIDKA.focusSkin = kony.servicesapp.ERROR_SKIN;
							frmLoginKA.tbxPasswordKA.focusSkin = kony.servicesapp.ERROR_SKIN;
						}else{
							 error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.firstUserErrorKA");
						}                                                        
						break;
					case 12:
						error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.networkErrorKA");                  
						break;
					case 13:
						error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.sessionExpireErrorKA");                                   
						break;
					case 126:
						error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.invalidAuthenticationErrorKA");   
						frmLoginKA.tbxUserIDKA.skin = kony.servicesapp.ERROR_SKIN;
						frmLoginKA.tbxPasswordKA.skin = kony.servicesapp.ERROR_SKIN;
						frmLoginKA.tbxUserIDKA.focusSkin = kony.servicesapp.ERROR_SKIN;
						frmLoginKA.tbxPasswordKA.focusSkin = kony.servicesapp.ERROR_SKIN;
						break;
					case 125:
						error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.firstUserErrorKA");
						break;
					default:
						error.message = utilitiesObj.geti18nValueKA("i18n.common.login.alert.authenticationErrorKA");                  
						break;
				}
				alert(error.message);
			} else {
				kony.sdk.mvvm.log.info("Not a MVVM Exception.Throwing alert");
				alert(error);
			}
			kony.sdk.mvvm.dismissSyncLoadingScreen();
		}
	} catch(err){
		kony.sdk.mvvm.log.error("Failed while login" + err);
	}
}
/** To validate if the App key, App Secret, Service URL and Version fields have proper values or not.**/
kony.servicesapp.verifyAppDetails = function() {
	try{
		var utilitiesObj = utilities.getUtilityObj();
		if (!frmTenantKA.tbxAppKeyKA.text) {
			alert(utilitiesObj.geti18nValueKA("i18n.common.Tenant.AppKeyEmpty.ValueKA"));
			frmTenantKA.tbxAppKeyKA.setFocus(false);
			frmTenantKA.btnConnectKA.setEnabled(true);
			return;
		}
		if (!frmTenantKA.tbxAppSecretKA.text) {
			alert(utilitiesObj.geti18nValueKA("i18n.common.Tenant.AppSecretEmpty.ValueKA"));
			frmTenantKA.tbxAppSecretKA.setFocus(false);
			frmTenantKA.btnConnectKA.setEnabled(true);
			return;
		}
		var serviceurl = frmTenantKA.tbxServiceURLKA.text;
		if (!serviceurl) {
			alert(utilitiesObj.geti18nValueKA("i18n.common.Tenant.ServiceURLEmpty.ValueKA"));
			frmTenantKA.tbxServiceURLKA.setFocus(false);
			frmTenantKA.btnConnectKA.setEnabled(true);
			return;
		} else {
			var urlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
			if (!urlRegex.test(serviceurl)) {
				alert(utilitiesObj.geti18nValueKA("i18n.common.Tenant.ServiceURLValid.ValueKA"));
				frmTenantKA.btnConnectKA.setEnabled(true);
				return;
			}
		}
		if (!frmTenantKA.tbxVersion.text) {
			alert(utilitiesObj.geti18nValueKA("i18n.common.Tenant.VersionEmpty.ValueKA"));
			frmTenantKA.tbxVersion.setFocus(false);
			frmTenantKA.btnConnectKA.setEnabled(true);
			return;
		}
		kony.servicesapp.initSDK();
		frmLoginKA.show();
	} catch(err){
		kony.sdk.mvvm.log.error("Failed while verifyAppDetails" + err);
	}
}
/** To save the password for touch ID functionality **/
kony.servicesapp.savePassword = function(){
	try{
		var key = kony.sdk.mvvm.generateAndSaveKey("Notification");
		var cred = {};
		cred["key"] = key;
		cred["password"] = kony.convertToBase64(kony.sdk.mvvm.encryptData(key, frmLoginKA.tbxPasswordKA.text));
		kony.store.setItem("cred",cred);
	} catch(err){
		kony.sdk.mvvm.log.error("Failed to save savePassword" + err);
	}
}
kony.servicesapp.getPassword = function(){
/** To retrieve the password for touch ID functionality **/
	try{
		var credStore = kony.store.getItem("cred");
		var cred = {};
		var key = credStore["key"];
		if(credStore["password"])
			cred["password"] = kony.sdk.mvvm.decryptData(key,kony.convertToRawBytes(credStore["password"]));
		return cred["password"];
	} catch(err){
		kony.sdk.mvvm.log.error("Failed to get getPassword" + err);
	}
}