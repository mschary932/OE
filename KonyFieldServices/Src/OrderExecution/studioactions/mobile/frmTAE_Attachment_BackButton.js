function frmTAE_Attachment_BackButton(eventobject) {
    return AS_Button_30054313ea7f43488f3d1b6f5248e5f3(eventobject);
}

function AS_Button_30054313ea7f43488f3d1b6f5248e5f3(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("clearData");
    controller.performAction("navigateBack");
}