function frmOrderExecutionViewDoNothingKA(eventobject) {
    return AS_FlexContainer_433b0f61f720451e8e01047915d2c4ea(eventobject);
}

function AS_FlexContainer_433b0f61f720451e8e01047915d2c4ea(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}