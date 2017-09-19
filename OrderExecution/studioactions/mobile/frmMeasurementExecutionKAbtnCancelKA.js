function frmMeasurementExecutionKAbtnCancelKA(eventobject) {
    return AS_Button_ad118deda7114d19bc9b798e7766020f(eventobject);
}

function AS_Button_ad118deda7114d19bc9b798e7766020f(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("completeOrRejectTask");
}