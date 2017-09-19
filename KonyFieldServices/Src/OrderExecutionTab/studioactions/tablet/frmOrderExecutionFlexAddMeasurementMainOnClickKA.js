function frmOrderExecutionFlexAddMeasurementMainOnClickKA(eventobject) {
    return AS_FlexContainer_a03077fb17064782a625bc592c0e2a2e(eventobject);
}

function AS_FlexContainer_a03077fb17064782a625bc592c0e2a2e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}