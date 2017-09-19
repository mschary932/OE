function frmCompleteOrderBtnInvoiceEmailCrossOnClickKA(eventobject) {
    return AS_Button_b9bec37e3b574548825b4860a9798ad3(eventobject);
}

function AS_Button_b9bec37e3b574548825b4860a9798ad3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelEmailPopUp");
}