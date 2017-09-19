function frmCompleteOrderBtnBackFromInoiceOnClickKA(eventobject) {
    return AS_Button_62b7d217af974c4aa9265a1c8b8f4468(eventobject);
}

function AS_Button_62b7d217af974c4aa9265a1c8b8f4468(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showflexPaymentMainContainerKA");
}