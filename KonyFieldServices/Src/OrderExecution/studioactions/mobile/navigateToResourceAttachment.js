function navigateToResourceAttachment(eventobject) {
    return AS_Button_8425ef2467b0405081a3142affd390e3(eventobject);
}

function AS_Button_8425ef2467b0405081a3142affd390e3(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToResourceAttachment");
}