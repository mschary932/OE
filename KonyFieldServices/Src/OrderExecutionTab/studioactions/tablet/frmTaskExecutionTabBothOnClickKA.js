function frmTaskExecutionTabBothOnClickKA(eventobject) {
    return AS_Button_8a1a8a4d1dd5497888aee435a00c685c(eventobject);
}

function AS_Button_8a1a8a4d1dd5497888aee435a00c685c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showBothSegment");
}