function frmResourceExecutionBtnImagesOnClickKA(eventobject) {
    return AS_Button_ecb0689b233c4ed285a6e1c02d4ed93d(eventobject);
}

function AS_Button_ecb0689b233c4ed285a6e1c02d4ed93d(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskAttachmentFormKA");
}