function frmTaskAttachmentKAbtnAttachmentOnclickKA(eventobject) {
    return AS_Button_79a1bf816eae4bd696a1dbd4a7de3377(eventobject);
}

function AS_Button_79a1bf816eae4bd696a1dbd4a7de3377(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showTaskAttachments");
    } catch (e) {}
}