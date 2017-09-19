function frmCOSOnDeviceBackKA(eventobject) {
    return AS_Form_97dffba6f76244e29ce1d2b4d276753f(eventobject);
}

function AS_Form_97dffba6f76244e29ce1d2b4d276753f(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("checkStartAndEndDate");
}