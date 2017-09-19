function frmOrderExecutionBackStepNavKA(eventobject) {
    return AS_Button_0e2ad108db6d47cf9dbb881ea075f402(eventobject);
}

function AS_Button_0e2ad108db6d47cf9dbb881ea075f402(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToMap");
}