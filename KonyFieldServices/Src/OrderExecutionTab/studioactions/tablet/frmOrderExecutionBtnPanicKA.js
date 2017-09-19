function frmOrderExecutionBtnPanicKA(eventobject) {
    return AS_Button_d8578c6fdbbf463884b26e3b68e8a1e5(eventobject);
}

function AS_Button_d8578c6fdbbf463884b26e3b68e8a1e5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPanicScreen");
}