function CashPaymentConfirmation(eventobject) {
    return AS_FlexContainer_fb8ffa4bd4334e21bb1a84c5f1971c50(eventobject);
}

function AS_FlexContainer_fb8ffa4bd4334e21bb1a84c5f1971c50(eventobject) {
    var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA").getFormModel();
    formmodel.setViewAttributeByProperty("flxPaymentConfirmation", "isVisible", false);
}