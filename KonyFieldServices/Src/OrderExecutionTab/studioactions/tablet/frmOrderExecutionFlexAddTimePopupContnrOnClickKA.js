function frmOrderExecutionFlexAddTimePopupContnrOnClickKA(eventobject) {
    return AS_FlexContainer_c012f67c421d426bbae9667e242d5dbb(eventobject);
}

function AS_FlexContainer_c012f67c421d426bbae9667e242d5dbb(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}