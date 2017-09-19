function p2kwiet1234563580652_btnSelectFilterKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmOrdersViewsKA");
    controller.performAction("checkUncheckFilter");
}