function frmOrderExecutionTabSubmenuOrderAttachmentsOnClickKA(eventobject) {
    return AS_FlexContainer_b931d415add54b6a8dcb8de4947952bf(eventobject);
}

function AS_FlexContainer_b931d415add54b6a8dcb8de4947952bf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAttachments");
}