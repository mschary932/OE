function frmMeasurementExecutionBackKA(eventobject) {
    return AS_Button_00879a890bf14bce88d57128c2a56cfb(eventobject);
}

function AS_Button_00879a890bf14bce88d57128c2a56cfb(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}