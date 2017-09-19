function frmTaskAttachmentKAbtnImageKAOnclickKA(eventobject) {
    return AS_Button_2db1ddc1336f40cfadc6ad86e2738a41(eventobject);
}

function AS_Button_2db1ddc1336f40cfadc6ad86e2738a41(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showTaskAttachmentForm");
    } catch (e) {}
}