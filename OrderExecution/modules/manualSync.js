var previousCompleted = 0;
var processingEntities = {};
kony.servicesapp.startManualSync = function(isManual,showAlert){
    try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.startManualSync==>");
        var utilitiesObj = utilities.getUtilityObj();
        if (!kony.sdk.mvvm.isNetworkAvailabile()) {
            if(showAlert == undefined || showAlert ==  null){
        		alert(utilitiesObj.geti18nValueKA("i18n.common.sync.nonetworkKA"));
        	}
            return;
        } else if (kony.servicesapp.BACKGROUNDSYNCINPROGRESS) {
            if(showAlert == undefined || showAlert ==  null){
            	alert(utilitiesObj.geti18nValueKA("i18n.common.sync.alreadyInprocessKA"));
            }
            return;
        }
		kony.servicesapp.setSyncInProgressSkin();
		kony.servicesapp.SYNCENDPOINT = kony.servicesapp.SYNCSTARTPOINT + 10;
		kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
        function backGroundSyncSuccess() {
			kony.sdk.mvvm.log.info("==backGroundSyncSuccess==>");
            kony.sdk.mvvm.log.info("perflogs time: The time when Delta sync is completed......."); 
        	kony.servicesapp.syncSuccessCallBackKA();
        }
        function backGroundSyncFailure(err) {
			kony.sdk.mvvm.log.info("==backGroundSyncFailure==>");
        	kony.servicesapp.syncFailureCallBackKA();
        }
        var syncConfig = {
            "onsyncstart": function(outputparams) {
                kony.servicesapp.onSyncStartCall(outputparams);
            },
            "ondownloadstart": function(outputparams) {
                kony.servicesapp.downloadStartCallBack(outputparams);
            },
            "onbatchprocessingstart": function(outputparams) {
                kony.servicesapp.batchProcessingStartCallBack(outputparams);
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
                    dodownload: true,
                    uploaderrorpolicy: "continueonerror"
                },
				AvailableOrderSyncScope: {
                    doupload: true,
                    dodownload: true,
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
            	req.clientcontext.BATCH_TIMEOUT = 40000;
            	outputparams.downloadRequest = req;
          	}
        };
        var syncOptions = {
            "syncMetaData": false,
            "syncData": true,
            "syncConfig": syncConfig
        };
        kony.servicesapp.IS_SYNC_IN_PROGRESS = true; 
        kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getSyncManager().manualSync(syncOptions, backGroundSyncSuccess, backGroundSyncFailure);
    }catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.startManualSync==>" + error);
    }
}
kony.servicesapp.uploadSuccessCallBack = function(outputparams){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.uploadSuccessCallBack==>");
		kony.servicesapp.SYNCENDPOINT = 10 + kony.servicesapp.SYNCSTARTPOINT;
		kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
		kony.sdk.mvvm.log.info("==uploadSucc==>"+kony.servicesapp.SYNCSTARTPOINT+", "+kony.servicesapp.SYNCENDPOINT);
		kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
		if (outputparams != undefined && outputparams != null) {
			if (outputparams.uploadcontext != undefined && outputparams.uploadcontext != null) {
				syncResponse.upload = outputparams.uploadcontext;
			}
		}
	}catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.uploadSuccessCallBack==>" + error);
    }
}
kony.servicesapp.downloadStartCallBack = function(outputparams){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.downloadStartCallBack==>");
		kony.servicesapp.SYNCENDPOINT = kony.servicesapp.SYNCSTARTPOINT + 10;
		kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
		kony.sdk.mvvm.log.info("==downLoadStart==>"+kony.servicesapp.SYNCSTARTPOINT+", "+kony.servicesapp.SYNCENDPOINT);
		kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
		var req = outputparams.downloadRequest;
		if (req.clientcontext === undefined) {
			req.clientcontext = {};
		}
		req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
		req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
		if (kony.sdk.mvvm.batchtimeout !== -1)
			req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;

		if (kony.sdk.mvvm.batchdownloadrequestlimit !== -1)
			req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchdownloadrequestlimit;
		return req;
	}catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.downloadStartCallBack==>" + error);
    }
}
kony.servicesapp.batchProcessingStartCallBack = function(outputparams){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.batchProcessingStartCallBack==>");
		if (outputparams.hasOwnProperty("lastsynctimestamp") && outputparams.lastsynctimestamp !== "") {
			if (outputparams && outputparams.batchcontext && outputparams.batchcontext.objectlevelinfo) {
				for (var key in outputparams.batchcontext.objectlevelinfo) {
					if (!processingEntities[key]) {
						processingEntities[key] = true;
					}
				}
				var completed = 0;
				for (var key in processingEntities) {
					completed++;
				}
				var percentageCompleted = Math.abs(completed - previousCompleted) * 2;
				previousCompleted = completed;
				kony.servicesapp.SYNCENDPOINT = percentageCompleted + kony.servicesapp.SYNCSTARTPOINT;
			}
			kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
			kony.sdk.mvvm.log.info("==batchStart==>"+kony.servicesapp.SYNCSTARTPOINT+", "+kony.servicesapp.SYNCENDPOINT);
			kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
		}
		var req = outputparams.downloadRequest;
		if (req.clientcontext === undefined) {
			req.clientcontext = {};
		}
		req.clientcontext.channelName = kony.sdk.mvvm.Utils.getChannelName();
		req.clientcontext.platform = kony.sdk.mvvm.Utils.getPlatformName();
		req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
		req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
		if (kony.sdk.mvvm.batchtimeout !== -1)
			req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;
		if (kony.sdk.mvvm.batchdownloadrequestlimit !== -1)
			req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchdownloadrequestlimit;
		return req;
	}catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.batchProcessingStartCallBack==>" + error);
    }
}
kony.servicesapp.batchProcessSuccessCallBack = function(outputparams){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.batchProcessSuccessCallBack==>");
		currentObject = null;
		kony.application.dismissLoadingScreen();
		if (outputparams.hasOwnProperty("lastsynctimestamp") && outputparams.lastsynctimestamp !== "") {
			if (outputparams && outputparams.batchcontext && outputparams.batchcontext.objectlevelinfo) {
				for (var key in outputparams.batchcontext.objectlevelinfo) {
					if (!processingEntities[key]) {
						processingEntities[key] = true;
					}
				}
				var completed = 0;
				for (var key in processingEntities) {
					completed++;
				}
				var percentageCompleted = Math.abs(completed - previousCompleted) * 2;
				previousCompleted = completed;
				kony.servicesapp.SYNCENDPOINT = percentageCompleted + kony.servicesapp.SYNCSTARTPOINT;
			}
			kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
			kony.sdk.mvvm.log.info("==batchSucc==>"+kony.servicesapp.SYNCSTARTPOINT+", "+kony.servicesapp.SYNCENDPOINT);
			kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
		}
	}catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.batchProcessSuccessCallBack==>" + error);
    }
}
kony.servicesapp.onSyncStartCall = function(outputparams){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.onSyncStartCall==>");
		kony.servicesapp.SYNCENDPOINT = kony.servicesapp.SYNCSTARTPOINT + 5;
		kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
		kony.sdk.mvvm.log.info("==onSyncStart==>"+kony.servicesapp.SYNCSTARTPOINT+", "+kony.servicesapp.SYNCENDPOINT);
		kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT,kony.servicesapp.SYNCENDPOINT,1);
	}catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.onSyncStartCall==>" + error);
    }
}
kony.servicesapp.refreshAppStopSync = function(msg){
	try{
		processingEntities = {};
		previousCompleted = 0;
		kony.sdk.mvvm.log.info("==syncComplete==>"+kony.servicesapp.SYNCSTARTPOINT+", "+kony.servicesapp.SYNCENDPOINT);
		var duration = ((100-kony.servicesapp.SYNCENDPOINT)/25).toFixed();
		var currentForm = kony.application.getCurrentForm();
		if(kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id] && kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id]["processBar"]){
			kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
			kony.servicesapp.endAnimation(kony.servicesapp.SYNCENDPOINT,100,duration,msg, refreshSyncCallBack);
		}else{
			var previousForm = kony.servicesapp.PREVIOUSFORM;
			if(previousForm && previousForm.flxHorizontalAnimationaKA){
				previousForm.remove(flxHorizontalAnimationaKA);
			}
			kony.servicesapp.BACKGROUNDSYNCINPROGRESS = false;
			kony.servicesapp.SYNCSTARTPOINT = 0;
			kony.servicesapp.SYNCENDPOINT = 0;
			refreshSyncCallBack();
		}
		function refreshSyncCallBack(){
			kony.sdk.mvvm.log.info("==refreshSyncCallBack==>");
			kony.servicesapp.resetSyncSkin();
			var currentForm = kony.application.getCurrentForm();
			var previousForm = kony.servicesapp.PREVIOUSFORM;
			if (currentForm && currentForm.flxHorizontalAnimationaKA) currentForm.remove(flxHorizontalAnimationaKA);
			if (previousForm && previousForm.flxHorizontalAnimationaKA) previousForm.remove(flxHorizontalAnimationaKA);
			kony.servicesapp.PREVIOUSFORM = undefined;
			INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();			
			var currentForm = kony.application.getCurrentForm();			
			if(kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id] && kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id]["refresh"]){//Need to change with Do Not refresh forms
				var controller = INSTANCE.getFormController(currentForm.id);
				if (controller) {
					kony.print("perflogs time: The time when background sync is completed.......");
					var controllerExtension = controller.getControllerExtensionObject();
					controllerExtension.fetchData();
				}							
			}
		}
    }catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.refreshAppStopSync==>" + error);
    }
}
/** Called On Sync Success **/
kony.servicesapp.syncSuccessCallBackKA = function(){
	try{
		kony.sdk.mvvm.log.info("==syncSuccessCallBackKA==>");
		kony.servicesapp.IS_SYNC_IN_PROGRESS = false;
		kony.servicesapp.resetSyncSkin();
		kony.store.setItem("PASSWORKEXPIREMAXINTERVAL", moment().add(kony.servicesapp.offlineError, 'days').format(kony.servicesapp.DATE_FORMAT_YYYYMMDD));
		kony.servicesapp.refreshAppStopSync(utilities.getUtilityObj().geti18nValueKA("i18n.common.sync.syncedKA"));
	} catch(err){
		kony.sdk.mvvm.log.error("Failed syncSuccessCallBackKA==>" + err);
	}
}
/** Called On Sync Failure **/
kony.servicesapp.syncFailureCallBackKA = function(){
	try{
		kony.sdk.mvvm.log.info("==syncFailureCallBackKA==>");
		kony.servicesapp.resetSyncSkin();
		kony.servicesapp.IS_SYNC_IN_PROGRESS = false;
		kony.servicesapp.refreshAppStopSync(utilities.getUtilityObj().geti18nValueKA("i18n.common.sync.syncFailedKA"));
	} catch(err){
		kony.sdk.mvvm.log.error("Failed syncFailureCallBackKA==>" + err);
	}
}