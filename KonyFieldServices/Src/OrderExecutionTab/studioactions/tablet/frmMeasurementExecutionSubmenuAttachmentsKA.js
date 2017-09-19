function frmMeasurementExecutionSubmenuAttachmentsKA(eventobject) {
    return AS_FlexContainer_6fa5c6b9da4f45eca8f34e4119aa0795(eventobject);
}

function AS_FlexContainer_6fa5c6b9da4f45eca8f34e4119aa0795(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAttachments");
}