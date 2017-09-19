function frmTaskExecCancelConfirmationPopUpKA(eventobject) {
    return AS_Button_f504b1ee3d6c4282befc13e6f203205c(eventobject);
}

function AS_Button_f504b1ee3d6c4282befc13e6f203205c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelConfirmation");
}