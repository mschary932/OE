function frmTaskAttachmentKAonDeviceBackKA(eventobject) {
    return AS_Form_f170bdeb805f4b56ab28a9b69ba23b0d(eventobject);
}

function AS_Form_f170bdeb805f4b56ab28a9b69ba23b0d(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}