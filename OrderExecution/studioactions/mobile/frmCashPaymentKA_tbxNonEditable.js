function frmCashPaymentKA_tbxNonEditable(eventobject) {
    return AS_Form_6749cb13976e48389a47020bd0d6ec8b(eventobject);
}

function AS_Form_6749cb13976e48389a47020bd0d6ec8b(eventobject) {
    var formModel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCashPaymentKA").getFormModel();
    formModel.performActionOnView("tbxAmountKA", "setEnabled", [false]);
}