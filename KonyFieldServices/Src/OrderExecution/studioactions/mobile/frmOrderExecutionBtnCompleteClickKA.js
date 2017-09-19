function frmOrderExecutionBtnCompleteClickKA(eventobject) {
    return p2kwiet1234563580351_btnCancelKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580351_btnCancelKA_onClick_seq0(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("completeOrRejectWorkorder");
}