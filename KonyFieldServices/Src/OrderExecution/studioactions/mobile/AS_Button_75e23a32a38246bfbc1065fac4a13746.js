function AS_Button_75e23a32a38246bfbc1065fac4a13746(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAttachmentForm");
}