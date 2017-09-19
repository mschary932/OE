function frmCompleteOrderBtnEmailOnClickKA(eventobject) {
    return AS_Button_1de945ec0a3a48d9b6ecd35d44bd238a(eventobject);
}

function AS_Button_1de945ec0a3a48d9b6ecd35d44bd238a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showEmailPopUp");
}