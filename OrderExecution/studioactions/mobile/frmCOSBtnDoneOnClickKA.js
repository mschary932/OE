function frmCOSBtnDoneOnClickKA(eventobject) {
    return AS_Button_c2cdb3c3e2304ebbac8f3b940e9e0d00(eventobject);
}

function AS_Button_c2cdb3c3e2304ebbac8f3b940e9e0d00(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("setPickerViewDataKA");
    controller.performAction("calculateDuration");
}