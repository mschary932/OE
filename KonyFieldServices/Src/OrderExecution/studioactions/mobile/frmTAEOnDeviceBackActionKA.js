function frmTAEOnDeviceBackActionKA(eventobject) {
    return AS_Form_67f4613433064f7f8300b6feb149dea8(eventobject);
}

function AS_Form_67f4613433064f7f8300b6feb149dea8(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}