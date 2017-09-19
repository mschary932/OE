function frmTaskExecutionViewFilterOneHidePopUpKa(eventobject) {
    return AS_FlexContainer_390429d26957432995043a0dd65076d9(eventobject);
}

function AS_FlexContainer_390429d26957432995043a0dd65076d9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}