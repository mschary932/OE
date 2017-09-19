function frmTaskAttachmentImageBtnBackOnClickKA(eventobject) {
    return AS_Button_eb55596180a44b539be7b4b9945a277c(eventobject);
}

function AS_Button_eb55596180a44b539be7b4b9945a277c(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}