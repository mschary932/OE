function frmTaskExecutionbtnBackSelectStockLocationOnClickKA(eventobject) {
    return AS_Button_cbb37029ba32459a923881e2af22ed6e(eventobject);
}

function AS_Button_cbb37029ba32459a923881e2af22ed6e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backStockLocationFlexOnlineCall");
}