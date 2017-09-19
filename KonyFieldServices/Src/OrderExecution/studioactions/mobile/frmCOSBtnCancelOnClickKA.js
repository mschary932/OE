function frmCOSBtnCancelOnClickKA(eventobject) {
    return AS_Button_2c955cb966414db598744d97d22da49d(eventobject);
}

function AS_Button_2c955cb966414db598744d97d22da49d(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("cancelCalendarKA");
}