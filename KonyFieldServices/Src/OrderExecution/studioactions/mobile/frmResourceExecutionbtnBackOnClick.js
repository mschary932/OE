function frmResourceExecutionbtnBackOnClick(eventobject) {
    return p2kwiet1234563580488_btnBackKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580488_btnBackKA_onClick_seq0(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("navigateBack");
    } catch (e) {}
}