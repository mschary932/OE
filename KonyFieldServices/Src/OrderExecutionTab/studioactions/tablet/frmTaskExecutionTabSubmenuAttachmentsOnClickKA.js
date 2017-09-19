function frmTaskExecutionTabSubmenuAttachmentsOnClickKA(eventobject) {
    return AS_FlexContainer_79fd614440794f0c82ac92fd3c7eb323(eventobject);
}

function AS_FlexContainer_79fd614440794f0c82ac92fd3c7eb323(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFourAttachments");
}