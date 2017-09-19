function frmCompleteOrderShowPaymentKA(eventobject, x, y) {
    return AS_FlexContainer_6fb4e82364dd42a7b9de4156ded34982(eventobject, x, y);
}

function AS_FlexContainer_6fb4e82364dd42a7b9de4156ded34982(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPayment");
}