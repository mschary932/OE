function frmSetttingsBtnSyncResetOnClickKA(eventobject) {
    return AS_Button_471bc1c4712b41c9aed020bcd75e97a1(eventobject);
}

function AS_Button_471bc1c4712b41c9aed020bcd75e97a1(eventobject) {
    var utilitiesObj = utilities.getUtilityObj();
    if (!kony.sdk.mvvm.isNetworkAvailabile()) {
        alert(utilitiesObj.geti18nValueKA("i18n.common.sync.nonetworkKA"));
        return;
    } else if (kony.servicesapp.BACKGROUNDSYNCINPROGRESS) {
        alert(utilitiesObj.geti18nValueKA("i18n.common.sync.alreadyInprocessKA"));
        return;
    } else kony.sdk.mvvm.Util.callAlert(utilitiesObj.geti18nValueKA("i18n.common.resetDatabaseKA"), "confirmation", resetPreviousUserDB, "", utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.yes"), utilitiesObj.geti18nValueKA("i18n.frmNewReleaseFilterKA.No"));

    function resetPreviousUserDB(response) {
        if (!response) {
            return;
        } else {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
            var watchposID = controllerExtension.getFormModelInfo("watchposID");
            kony.location.clearWatch(watchposID);
            controllerExtension.setFormModelInfo("watchposID", "");
            INSTANCE.getSyncManager().reset(succCallback, errorCallback);
            var utilitiesObj = utilities.getUtilityObj();
            kony.application.showLoadingScreen(null, utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);

            function succCallback(response) {
                kony.sdk.mvvm.log.info("success in resetting sync");
                var text = utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA");
                kony.sdk.mvvm.isSyncInProgress = true
                var syncConfig = {
                    "sessiontasks": {
                        OESyncConfig: {
                            doupload: false,
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
                    "batchsize": kony.servicesapp.LOGIN_BATCH_SIZE
                };
                INSTANCE.getSyncManager().syncData(syncSuccess, syncError, syncConfig);

                function syncSuccess(res) {
                    kony.sdk.mvvm.isSyncInProgress = false
                    kony.application.dismissLoadingScreen();
                    kony.sdk.mvvm.log.info("sync Success");
                    if (hamburgerMenu.IS_MENU_SHOWN) {
                        new hamburgerMenu().execute();
                    }
                    kony.servicesapp.showFormOrderList();

                    function menuEndCallBack() {
                        kony.sdk.mvvm.log.info("hamburger animation ended");
                    }
                }

                function syncError(exception) {
                    kony.application.dismissLoadingScreen();
                    kony.sdk.mvvm.isSyncInProgress = false
                    kony.sdk.mvvm.log.error("error occured while doing sync" + exception.toString());
                }
            }

            function errorCallback(err) {
                kony.application.dismissLoadingScreen();
                kony.sdk.mvvm.log.error("Error while doing reset Sync" + err.toString());
            }
        }
    }
}