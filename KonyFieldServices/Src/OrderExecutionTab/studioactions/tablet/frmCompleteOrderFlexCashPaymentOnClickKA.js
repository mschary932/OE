function frmCompleteOrderFlexCashPaymentOnClickKA(eventobject) {
    return AS_FlexContainer_857536aad21645b8841b26d7a10316f0(eventobject);
}

function AS_FlexContainer_857536aad21645b8841b26d7a10316f0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showflexPaymentModesDrillKA");
}