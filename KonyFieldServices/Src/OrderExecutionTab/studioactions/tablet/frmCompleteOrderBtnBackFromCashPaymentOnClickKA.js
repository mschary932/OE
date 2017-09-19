function frmCompleteOrderBtnBackFromCashPaymentOnClickKA(eventobject) {
    return AS_Button_7187e582c0654e86804b8f2401d995c4(eventobject);
}

function AS_Button_7187e582c0654e86804b8f2401d995c4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showflexPaymentModesKA");
}