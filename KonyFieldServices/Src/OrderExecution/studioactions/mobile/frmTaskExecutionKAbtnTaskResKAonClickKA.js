function frmTaskExecutionKAbtnTaskResKAonClickKA(eventobject) {
    return p2kwiet1234563580554_btnTaskResKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580554_btnTaskResKA_onClick_seq0(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("navigateToTaskResources");
    } catch (e) {}
}