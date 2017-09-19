function frmCOBtnAttachmentsOnClickKA(eventobject) {
    return AS_Button_e2edad76a7804c218996dab087c20a7a(eventobject);
}

function AS_Button_e2edad76a7804c218996dab087c20a7a(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAttachmentsFormForWorkOrder");
}