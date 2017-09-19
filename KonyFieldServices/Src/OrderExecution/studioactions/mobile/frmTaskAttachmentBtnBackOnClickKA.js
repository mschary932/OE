function frmTaskAttachmentBtnBackOnClickKA(eventobject) {
    return AS_Button_ade6d680c95f405d9a8443f0dfdfc4e0(eventobject);
}

function AS_Button_ade6d680c95f405d9a8443f0dfdfc4e0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}