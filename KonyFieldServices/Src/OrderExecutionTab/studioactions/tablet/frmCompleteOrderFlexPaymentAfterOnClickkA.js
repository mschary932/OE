function frmCompleteOrderFlexPaymentAfterOnClickkA(eventobject, x, y) {
    return AS_FlexContainer_6c6df5023ba54fad89ee451ecf88f9a6(eventobject, x, y);
}

function AS_FlexContainer_6c6df5023ba54fad89ee451ecf88f9a6(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPaymentReceipt");
}