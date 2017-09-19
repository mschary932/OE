function frmMeasurementExecutionFlxViewMainOnClickKA(eventobject) {
    return AS_FlexContainer_1fc82c30524c440dbe7bda7392acfab5(eventobject);
}

function AS_FlexContainer_1fc82c30524c440dbe7bda7392acfab5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}