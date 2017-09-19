function frmSelectPaymentMethod_OnNavigateToCardPaymentKA(eventobject) {
    return AS_FlexContainer_a8db5f3f7cf94e7eaf74601dcd003e6e(eventobject);
}

function AS_FlexContainer_a8db5f3f7cf94e7eaf74601dcd003e6e(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToCardPayment");
}