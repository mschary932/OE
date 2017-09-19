function frmResourceExecutionBtnEditOnClickKA(eventobject) {
    return p2kwiet1234563580488_btnEditKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580488_btnEditKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("editQuantity");
}