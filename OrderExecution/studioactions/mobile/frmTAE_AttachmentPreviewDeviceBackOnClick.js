function frmTAE_AttachmentPreviewDeviceBackOnClick(eventobject) {
    return AS_Form_b81b1e5437684d039b5d078fe3eb8a52(eventobject);
}

function AS_Form_b81b1e5437684d039b5d078fe3eb8a52(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}