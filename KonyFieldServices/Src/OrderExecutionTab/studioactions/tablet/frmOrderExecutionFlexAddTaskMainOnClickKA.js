function frmOrderExecutionFlexAddTaskMainOnClickKA(eventobject) {
    return AS_FlexContainer_1129a3d9cca14c9193fef90a09b6894e(eventobject);
}

function AS_FlexContainer_1129a3d9cca14c9193fef90a09b6894e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}