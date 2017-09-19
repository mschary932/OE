function frmAvailableOrderFlxViewMainOnClickKA(eventobject) {
    return AS_FlexContainer_398dedd382a64d30ac56e432cdfdc74e(eventobject);
}

function AS_FlexContainer_398dedd382a64d30ac56e432cdfdc74e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}