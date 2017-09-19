function frmCOIOnDeviceBackKA(eventobject) {
    return AS_Form_1405e5a87e2d401ca74602c13f6d4036(eventobject);
}

function AS_Form_1405e5a87e2d401ca74602c13f6d4036(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}