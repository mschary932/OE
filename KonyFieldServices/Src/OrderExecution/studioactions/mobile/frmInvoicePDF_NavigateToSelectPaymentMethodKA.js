function frmInvoicePDF_NavigateToSelectPaymentMethodKA(eventobject) {
    return AS_Button_fdde3e55ef6e455393042f2c48f3438a(eventobject);
}

function AS_Button_fdde3e55ef6e455393042f2c48f3438a(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToSelectPaymentMethod");
}