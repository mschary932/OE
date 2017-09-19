function frmTAE_AttachmentDeviceBackOnClick(eventobject) {
    return AS_Form_ddbe880ac7054397a936270a7bef8b6b(eventobject);
}

function AS_Form_ddbe880ac7054397a936270a7bef8b6b(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("clearData");
    controller.performAction("navigateBack");
}