function frmCompleteOrderBtnPaymentDoneOnClickKA(eventobject) {
    return AS_Button_045ffc15c96a46f1a6e9656840881489(eventobject);
}

function AS_Button_045ffc15c96a46f1a6e9656840881489(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showflexPaymentAcknowledgePopUpKA");
}