function frmORderExecutionbtnDetailsKA(eventobject) {
    return p2kwiet1234563580351_btnOrderDetailsKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580351_btnOrderDetailsKA_onClick_seq0(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showWorkOrderDetailsForm");
    } catch (err) {}
}