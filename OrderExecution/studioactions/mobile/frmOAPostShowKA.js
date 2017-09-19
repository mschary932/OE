function frmOAPostShowKA(eventobject) {
    return AS_Form_a48d9c017b0148c78414c85e45770871(eventobject);
}

function AS_Form_a48d9c017b0148c78414c85e45770871(eventobject) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controllerExtension = appContext.getFormController("frmOrderAttachmentsKA").getControllerExtensionObject();
    controllerExtension.setFormModelInfo("previousForm", kony.application.getPreviousForm().id);
}