function frmTaskExecutionViewFilterDoNothingKa(eventobject) {
    return AS_FlexContainer_cd0f0a1d051a4d518f9bd15178b6767d(eventobject);
}

function AS_FlexContainer_cd0f0a1d051a4d518f9bd15178b6767d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}