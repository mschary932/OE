function frmSummaryKA_OnGenerateInvoiceBtnKA(eventobject) {
    return AS_Button_b63dccc8dbd74a19bac8299ed3244ce0(eventobject);
}

function AS_Button_b63dccc8dbd74a19bac8299ed3244ce0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("generateInvoice");
}