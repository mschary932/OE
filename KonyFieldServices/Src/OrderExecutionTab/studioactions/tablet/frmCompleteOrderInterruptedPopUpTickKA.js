function frmCompleteOrderInterruptedPopUpTickKA(eventobject) {
    return AS_Button_cd003ef005b84cc1a3f8d954df4fb57c(eventobject);
}

function AS_Button_cd003ef005b84cc1a3f8d954df4fb57c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onTickInterruptedPaymentPopUpCall");
}