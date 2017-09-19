function frmCompleteOrderBtnEditOnClickKA(eventobject) {
    return AS_Button_34b8f89abb054aa5bdeef34348d3d8dd(eventobject);
}

function AS_Button_34b8f89abb054aa5bdeef34348d3d8dd(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showflexInvoiceReceiptKAKA");
}