function frmExpenseDetails_OnClick_NavigateToExpenseAttachments(eventobject) {
    return AS_Button_c54a29092202468da6f1ba66d1ed3c8f(eventobject);
}

function AS_Button_c54a29092202468da6f1ba66d1ed3c8f(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimeAndExpenseAttachmentImages");
}