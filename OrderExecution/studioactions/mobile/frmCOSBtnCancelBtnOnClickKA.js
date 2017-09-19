function frmCOSBtnCancelBtnOnClickKA(eventobject) {
    return AS_Button_3afb081bab29466fbae67507984c8742(eventobject);
}

function AS_Button_3afb081bab29466fbae67507984c8742(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("cancelPickerViewKA");
}