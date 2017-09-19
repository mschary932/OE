function tmpOrderHistoryBtnCallTechonClickKA(eventobject, context) {
    return p2kwiet1234563580719_btnCallTechKA_onClick_seq0(eventobject, context);
}

function p2kwiet1234563580719_btnCallTechKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("makeCall");
}