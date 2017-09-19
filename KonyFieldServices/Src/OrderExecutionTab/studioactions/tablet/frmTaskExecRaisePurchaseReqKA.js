function frmTaskExecRaisePurchaseReqKA(eventobject) {
    return AS_Button_4ef030b86ccd47b398214a58263b0f73(eventobject);
}

function AS_Button_4ef030b86ccd47b398214a58263b0f73(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onRaisePurchaseRequest");
}