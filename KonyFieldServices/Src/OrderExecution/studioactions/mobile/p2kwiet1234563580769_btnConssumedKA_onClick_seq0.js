function p2kwiet1234563580769_btnConssumedKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("changeConsumedStatus");
}