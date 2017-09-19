function frmCompleteOrderKA_PaymentConfirmation(eventobject) {
    return AS_Button_fa6d3a0a55cd44e8bf57751364c5b455(eventobject);
}

function AS_Button_fa6d3a0a55cd44e8bf57751364c5b455(eventobject) {
    var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA").getFormModel();
    formmodel.setViewAttributeByProperty("flxPaymentConfirmation", "isVisible", false);
}