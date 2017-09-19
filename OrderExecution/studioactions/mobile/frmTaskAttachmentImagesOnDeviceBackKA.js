function frmTaskAttachmentImagesOnDeviceBackKA(eventobject) {
    return AS_Form_0567f61a1e074f448a64cf6f940a762e(eventobject);
}

function AS_Form_0567f61a1e074f448a64cf6f940a762e(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}