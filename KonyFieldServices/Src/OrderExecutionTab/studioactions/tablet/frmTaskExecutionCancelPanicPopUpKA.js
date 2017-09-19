function frmTaskExecutionCancelPanicPopUpKA(eventobject) {
    return AS_Button_1c634acdf1634278b0aeecb94fbf78f0(eventobject);
}

function AS_Button_1c634acdf1634278b0aeecb94fbf78f0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}