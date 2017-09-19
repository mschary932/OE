function frmTaskExecPurchaseCancelKA(eventobject) {
    return AS_Button_f08caec620dd42b3b256d99b4831b121(eventobject);
}

function AS_Button_f08caec620dd42b3b256d99b4831b121(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelPurchasePopUp");
}