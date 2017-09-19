function frmCompleteOrderBtnBackFromInvoicePdfFinalOnClickKA(eventobject) {
    return AS_Button_d2488c9b41da4ee5abd9e317c1ee87d5(eventobject);
}

function AS_Button_d2488c9b41da4ee5abd9e317c1ee87d5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderCompletion");
}