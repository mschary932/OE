function frmResourceExecutionBtnCancelAddKA(eventobject) {
    return AS_Button_ac3890855357483eb01bbbaad4cfdb74(eventobject);
}

function AS_Button_ac3890855357483eb01bbbaad4cfdb74(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelCall");
}