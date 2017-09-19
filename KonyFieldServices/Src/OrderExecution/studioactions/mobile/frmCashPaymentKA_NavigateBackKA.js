function frmCashPaymentKA_NavigateBackKA(eventobject) {
    return AS_Button_8fa5da3f634840309817b91f0a81abb1(eventobject);
}

function AS_Button_8fa5da3f634840309817b91f0a81abb1(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}