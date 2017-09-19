function frmOrderExecutionPanicPopUpCancelKa(eventobject) {
    return AS_Button_c3b2bf06879348f8b432ad52ca5e6dcb(eventobject);
}

function AS_Button_c3b2bf06879348f8b432ad52ca5e6dcb(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}