function frmOrderExecutionPanicPopUpKA(eventobject) {
    return AS_FlexContainer_e670de78e85a4042933ebacc8f2a9c78(eventobject);
}

function AS_FlexContainer_e670de78e85a4042933ebacc8f2a9c78(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}