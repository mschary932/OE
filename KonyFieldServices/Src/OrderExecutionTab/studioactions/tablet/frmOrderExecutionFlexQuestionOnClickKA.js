function frmOrderExecutionFlexQuestionOnClickKA(eventobject) {
    return AS_FlexContainer_2da8eeb37c7443e597f873388bf28d5f(eventobject);
}

function AS_FlexContainer_2da8eeb37c7443e597f873388bf28d5f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}