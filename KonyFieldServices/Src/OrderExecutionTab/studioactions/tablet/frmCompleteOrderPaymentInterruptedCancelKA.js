function frmCompleteOrderPaymentInterruptedCancelKA(eventobject) {
    return AS_Button_0c976bec84e24d7b9778f0f471e85d3c(eventobject);
}

function AS_Button_0c976bec84e24d7b9778f0f471e85d3c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelInterruptedPopUp");
}