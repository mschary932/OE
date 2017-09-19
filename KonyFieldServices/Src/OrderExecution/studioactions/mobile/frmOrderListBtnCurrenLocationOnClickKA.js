function frmOrderListBtnCurrenLocationOnClickKA(eventobject) {
    return p2kwiet1234563580384_btnCurrenLocation_onClick_seq0(eventobject);
}

function p2kwiet1234563580384_btnCurrenLocation_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var utilitiesObj = utilities.getUtilityObj();
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
    controller.performAction("getCurrentLocation", [true]);
}