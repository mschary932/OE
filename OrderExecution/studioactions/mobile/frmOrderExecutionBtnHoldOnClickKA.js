function frmOrderExecutionBtnHoldOnClickKA(eventobject) {
    return p2kwiet1234563580351_btnHoldKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580351_btnHoldKA_onClick_seq0(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("changeStatusForWorkorder");
}