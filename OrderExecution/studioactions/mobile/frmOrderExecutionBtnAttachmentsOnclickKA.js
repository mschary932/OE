function frmOrderExecutionBtnAttachmentsOnclickKA(eventobject) {
    return AS_Button_994d14cad3f14f1197f17ff046cb9d03(eventobject);
}

function AS_Button_994d14cad3f14f1197f17ff046cb9d03(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showOrderAttachments");
    } catch (e) {}
}