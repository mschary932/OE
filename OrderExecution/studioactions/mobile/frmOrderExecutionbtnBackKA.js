function frmOrderExecutionbtnBackKA(eventobject) {
    return p2kwiet1234563580351_btnHeaderKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580351_btnHeaderKA_onClick_seq0(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showPreviousForm", [true]);
    } catch (err) {}
}