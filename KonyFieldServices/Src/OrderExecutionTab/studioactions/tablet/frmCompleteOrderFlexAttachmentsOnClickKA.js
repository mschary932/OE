function frmCompleteOrderFlexAttachmentsOnClickKA(eventobject) {
    return AS_FlexContainer_e30e0773cd0f48f8a25079e65289a26f(eventobject);
}

function AS_FlexContainer_e30e0773cd0f48f8a25079e65289a26f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderAttachments");
}