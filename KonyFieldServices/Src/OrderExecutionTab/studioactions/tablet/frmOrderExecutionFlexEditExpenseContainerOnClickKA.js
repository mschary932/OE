function frmOrderExecutionFlexEditExpenseContainerOnClickKA(eventobject) {
    return AS_FlexContainer_1e4f8ac68bc848b58fc73a809ab0f347(eventobject);
}

function AS_FlexContainer_1e4f8ac68bc848b58fc73a809ab0f347(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}