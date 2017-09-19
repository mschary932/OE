function frmCompleteOrderBtnSignTickOnClickKA(eventobject) {
    return AS_Button_885bcc40e73549e880a6d8d57ef6ca01(eventobject);
}

function AS_Button_885bcc40e73549e880a6d8d57ef6ca01(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCompleteOrderMainPageOne");
}