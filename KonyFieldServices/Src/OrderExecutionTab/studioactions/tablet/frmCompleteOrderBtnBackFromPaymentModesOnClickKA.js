function frmCompleteOrderBtnBackFromPaymentModesOnClickKA(eventobject) {
    return AS_Button_8ae3ab22bb08465bb6b951ad3e8c937c(eventobject);
}

function AS_Button_8ae3ab22bb08465bb6b951ad3e8c937c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showflexInvoiceReceiptKAKA");
}