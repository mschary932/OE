function frmCompleteOrderBtnMakePaymentOnClickKA(eventobject) {
    return AS_Button_a3f60630f1244c2889c561b5750c158a(eventobject);
}

function AS_Button_a3f60630f1244c2889c561b5750c158a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showflexPaymentModesKA");
}