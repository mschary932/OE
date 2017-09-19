function frmCompleteOrderBtnAcknowledgeCrossOnClickKA(eventobject) {
    return AS_Button_11ba60bebfc64d04a76f06075818ad85(eventobject);
}

function AS_Button_11ba60bebfc64d04a76f06075818ad85(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("paymentInCashComplete");
}