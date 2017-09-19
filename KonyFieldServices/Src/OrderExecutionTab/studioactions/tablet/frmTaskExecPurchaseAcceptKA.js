function frmTaskExecPurchaseAcceptKA(eventobject) {
    return AS_Button_a79dd1917ad348bf9874d2c735f2326c(eventobject);
}

function AS_Button_a79dd1917ad348bf9874d2c735f2326c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onAcceptPurchasePopUp");
}