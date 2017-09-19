var previousCompleted = 0;
var processingEntities = {};

function startManualSync(isManual, showAlert) {
    try {
        var utilitiesObj = utilities.getUtilityObj();
        if (!kony.sdk.mvvm.isNetworkAvailabile()) {
            if (showAlert == undefined || showAlert == null) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.sync.nonetworkKA"));
            }
            return;
        } else if (kony.sdk.mvvm.backGroundSyncInProgress) {
            if (showAlert == undefined || showAlert == null) {
                alert(utilitiesObj.geti18nValueKA("i18n.common.sync.alreadyInprocessKA"));
            }
            return;
        }
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        setSyncInProgressSkin();

        function backGroundSyncSuccess() {
            kony.sdk.mvvm.isSyncInProgress = false;
            var passwordExpireMaxLimit = kony.servicesapp.offlineError;
            kony.store.setItem("PASSWORKEXPIREMAXINTERVAL", moment().add(passwordExpireMaxLimit, 'days').format("YYYY-MM-DD"));
            refreshAppStopSync(utilitiesObj.geti18nValueKA("i18n.common.sync.syncedKA"));
        }

        function backGroundSyncFailure(err) {
            kony.sdk.mvvm.isSyncInProgress = false;
            refreshAppStopSync(utilitiesObj.geti18nValueKA("i18n.common.sync.syncFailedKA"));
        }
        var syncConfig = {
            "onsyncstart": function(outputparams) {
                onSyncStartCall(outputparams);
            },
            "ondownloadstart": function(outputparams) {
                downloadStartCallBack(outputparams);
            },
            "onbatchprocessingstart": function(outputparams) {
                batchProcessingStartCallBack(outputparams);
            },
            "onbatchprocessingsuccess": function(outputparams) {
                batchProcessSuccessCallBack(outputparams);
            },
            "onuploadsuccess": function(outputparams) {
                uploadSuccessCallBack(outputparams);
            }
        };
        var syncOptions = {
            "syncMetaData": false,
            "syncData": true,
            "syncConfig": syncConfig
        };
        kony.sdk.mvvm.isSyncInProgress = true;
        //frmOrderListKA.btnManualSyncKA.skin="sknBtnManualSyncInProgressKA"; 
        INSTANCE.getSyncManager().manualSync(syncOptions, backGroundSyncSuccess, backGroundSyncFailure);
    } catch (error) {
        kony.sdk.mvvm.log.error("==startManualSync==>" + error);
    }
}

function uploadSuccessCallBack(outputparams) {
    kony.sdk.mvvm.syncEndPoint = 10 + kony.sdk.mvvm.syncStartPoint;
    kony.sdk.mvvm.backGroundSyncInProgress = true;
    kony.print("---------------------------------------------------->uploadSucc: " + kony.sdk.mvvm.syncStartPoint + ", " + kony.sdk.mvvm.syncEndPoint);
    startSyncAnimation(kony.sdk.mvvm.syncStartPoint, kony.sdk.mvvm.syncEndPoint, 1);
    if (outputparams != undefined && outputparams != null) {
        if (outputparams.uploadcontext != undefined && outputparams.uploadcontext != null) {
            syncResponse.upload = outputparams.uploadcontext;
        }
    }
}

function downloadStartCallBack(outputparams) {
    kony.sdk.mvvm.syncEndPoint = kony.sdk.mvvm.syncStartPoint + 10;
    kony.sdk.mvvm.backGroundSyncInProgress = true;
    kony.print("---------------------------------------------------->downLoadStart: " + kony.sdk.mvvm.syncStartPoint + ", " + kony.sdk.mvvm.syncEndPoint);
    startSyncAnimation(kony.sdk.mvvm.syncStartPoint, kony.sdk.mvvm.syncEndPoint, 1);
    var req = outputparams.downloadRequest;
    if (req.clientcontext === undefined) {
        req.clientcontext = {};
    }
    req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
    req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
    if (kony.sdk.mvvm.batchtimeout !== -1) req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;
    if (kony.sdk.mvvm.batchdownloadrequestlimit !== -1) req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchdownloadrequestlimit;
    return req;
}

function batchProcessingStartCallBack(outputparams) {
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
            kony.sdk.mvvm.syncEndPoint = percentageCompleted + kony.sdk.mvvm.syncStartPoint;
        }
        kony.sdk.mvvm.backGroundSyncInProgress = true;
        kony.print("---------------------------------------------------->batchStart: " + kony.sdk.mvvm.syncStartPoint + ", " + kony.sdk.mvvm.syncEndPoint);
        startSyncAnimation(kony.sdk.mvvm.syncStartPoint, kony.sdk.mvvm.syncEndPoint, 1);
    }
    var req = outputparams.downloadRequest;
    if (req.clientcontext === undefined) {
        req.clientcontext = {};
    }
    req.clientcontext.channelName = kony.sdk.mvvm.Utils.getChannelName();
    req.clientcontext.platform = kony.sdk.mvvm.Utils.getPlatformName();
    req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
    req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
    if (kony.sdk.mvvm.batchtimeout !== -1) req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;
    if (kony.sdk.mvvm.batchdownloadrequestlimit !== -1) req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchdownloadrequestlimit;
    return req;
}

function batchProcessSuccessCallBack(outputparams) {
    currentObject = null;
    kony.sdk.mvvm.dismissSyncLoadingScreen();
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
            kony.sdk.mvvm.syncEndPoint = percentageCompleted + kony.sdk.mvvm.syncStartPoint;
        }
        kony.sdk.mvvm.backGroundSyncInProgress = true;
        kony.print("---------------------------------------------------->batchSucc: " + kony.sdk.mvvm.syncStartPoint + ", " + kony.sdk.mvvm.syncEndPoint);
        startSyncAnimation(kony.sdk.mvvm.syncStartPoint, kony.sdk.mvvm.syncEndPoint, 1);
    }
}

function onSyncStartCall(outputparams) {
    kony.sdk.mvvm.syncEndPoint = kony.sdk.mvvm.syncStartPoint + 5;
    kony.sdk.mvvm.backGroundSyncInProgress = true;
    kony.print("---------------------------------------------------->onSyncStart: " + kony.sdk.mvvm.syncStartPoint + ", " + kony.sdk.mvvm.syncEndPoint);
    startSyncAnimation(kony.sdk.mvvm.syncStartPoint, kony.sdk.mvvm.syncEndPoint, 1);
}

function refreshAppStopSync(msg) {
    processingEntities = {};
    previousCompleted = 0;
    kony.print("---------------------------------------------------->syncComplete: " + kony.sdk.mvvm.syncStartPoint + ", " + kony.sdk.mvvm.syncEndPoint);
    var duration = ((100 - kony.sdk.mvvm.syncEndPoint) / 25).toFixed();
    var currentForm = kony.application.getCurrentForm();
    if (currentForm.id != "frmLoginKA" && currentForm.id != "frmOrdersViewsKA" && currentForm.id != "frmTenantKA" && currentForm.id != "frmFSLoginKA") {
        kony.sdk.mvvm.backGroundSyncInProgress = true;
        endAnimation(kony.sdk.mvvm.syncEndPoint, 100, duration, msg, refreshSyncCallBack);
    } else {
        var previousForm = kony.sdk.mvvm.previousForm;
        if (previousForm && previousForm.flxHorizontalAnimationaKA) {
            previousForm.lblSyncBarKA.width = "0%";
            previousForm.remove(flxHorizontalAnimationaKA);
        }
        kony.sdk.mvvm.previousForm = undefined;
        kony.sdk.mvvm.backGroundSyncInProgress = false;
        kony.sdk.mvvm.syncStartPoint = 0;
        kony.sdk.mvvm.syncEndPoint = 0;
        refreshSyncCallBack();
    }

    function refreshSyncCallBack() {
        INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        if (controller) {
            var controllerExtension = controller.getControllerExtensionObject();
            controllerExtension.fetchData();
        }
    }
}