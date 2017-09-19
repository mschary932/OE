function frmTaskExecutionKAbtnTaskDeailsKAonClick(eventobject) {
    return p2kwiet1234563580554_btnTaskDetailsKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580554_btnTaskDetailsKA_onClick_seq0(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showTaskDetails");
    } catch (e) {}
}