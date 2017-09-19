function tmpOrderFilterHeaderBtnClearKAOnClickKA(eventobject, context) {
    return p2kwiet1234563580703_btnClearKA_onClick_seq0(eventobject, context);
}

function p2kwiet1234563580703_btnClearKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmOrdersViewsKA");
    controller.performAction("clearAllFilter");
}