function frmResourceExecutionBtnImageItemCancelledKA(eventobject) {
    return AS_Button_847d43e09b0f46948982f7c8ead7baca(eventobject);
}

function AS_Button_847d43e09b0f46948982f7c8ead7baca(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelCall");
}